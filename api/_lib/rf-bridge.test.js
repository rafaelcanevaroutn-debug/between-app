/**
 * Pruebas del puente. Sin red y sin Google: cubren las reglas del traspaso
 * que, si se rompen, pisan el trabajo del vendedor o cargan datos inventados.
 *
 *   node --test api/_lib/rf-bridge.test.js
 */

import test from 'node:test'
import assert from 'node:assert/strict'

import {
  COLUMNS,
  LAST_WRITABLE_INDEX,
  columnLetter,
  updatableBlocks,
} from './rf-mapping.js'
import {
  blankVendorColumns,
  buildRow,
  decideWrite,
  sanitizeCell,
  stripForbidden,
  validateEnvelope,
} from './rf-core.js'
import { findCase, insertPayload, updatePayload } from './rf-repo.js'

const NOW = '17/9/2026, 19:11:00'

function envelope(overrides = {}) {
  return {
    schema_version: 1,
    operation: 'upsert',
    account: 'renzoyfranco.viajes',
    contact_id: '1384513880563214',
    case_id: 'rf-1384513880563214-1',
    revision: 1,
    test: true,
    reason: 'datos_completos',
    lead: {},
    ...overrides,
  }
}

test('la planilla tiene 37 columnas y la última escribible es AI', () => {
  assert.equal(COLUMNS.length, 37)
  assert.equal(columnLetter(LAST_WRITABLE_INDEX), 'AI')
  assert.equal(columnLetter(COLUMNS.length - 1), 'AK')
})

test('los bloques de actualización saltean la clave, el vendedor y las fórmulas', () => {
  const ranges = updatableBlocks().map((b) => `${columnLetter(b.start)}:${columnLetter(b.end)}`)
  assert.deepEqual(ranges, ['C:K', 'P:AI'])
})

test('una actualización nunca toca Estado ni las notas del vendedor', () => {
  const values = new Array(LAST_WRITABLE_INDEX + 1).fill('x')
  const payload = updatePayload({ row: 6, values })
  const covered = payload.map((p) => p.range)
  assert.ok(!covered.some((r) => /![B]6/.test(r)), 'Estado quedó incluido')
  assert.ok(!covered.some((r) => /![LMNO]6/.test(r)), 'columnas del vendedor quedaron incluidas')
  assert.deepEqual(covered, ['Consultas!C6:K6', 'Consultas!P6:AI6'])
})

test('un insert llega hasta AI y deja intactas las fórmulas AJ:AK', () => {
  const values = new Array(LAST_WRITABLE_INDEX + 1).fill('x')
  const payload = insertPayload({ row: 6, values })
  assert.equal(payload[0].range, 'Consultas!A6:AI6')
  assert.equal(payload[0].values[0].length, 35)
})

test('neutraliza fórmulas inyectadas en una celda', () => {
  assert.equal(sanitizeCell('=IMPORTXML("evil","//x")'), "'=IMPORTXML(\"evil\",\"//x\")")
  assert.equal(sanitizeCell('+1'), "'+1")
  assert.equal(sanitizeCell('@user'), "'@user")
  assert.equal(sanitizeCell('-5'), "'-5")
  assert.equal(sanitizeCell('Cancún'), 'Cancún')
})

test('descarta documentos y tarjetas aunque el modelo los mande', () => {
  const clean = stripForbidden({
    nombre: 'Rafa',
    dni: '30111222',
    numero_pasaporte: 'AA1234',
    tarjeta_credito: '4111111111111111',
    destino: 'México',
  })
  assert.deepEqual(Object.keys(clean).sort(), ['destino', 'nombre'])
})

test('rechaza un sobre que no cumple el contrato', () => {
  assert.deepEqual(validateEnvelope(null), ['cuerpo ausente o no es JSON'])
  assert.ok(validateEnvelope(envelope({ schema_version: 2 })).length)
  assert.ok(validateEnvelope(envelope({ account: 'caminantes' })).length)
  assert.ok(validateEnvelope(envelope({ contact_id: '' })).length)
  assert.ok(validateEnvelope(envelope({ revision: 0 })).length)
  assert.ok(validateEnvelope(envelope({ test: 'si' })).length)
  assert.ok(validateEnvelope(envelope({ estado: 'Inventado' })).length)
  assert.equal(validateEnvelope(envelope()).length, 0)
})

test('exige identidad y caso: no los puede poner el cliente por omisión', () => {
  assert.ok(validateEnvelope(envelope({ case_id: undefined })).length)
  assert.ok(validateEnvelope(envelope({ contact_id: 'no; drop' })).length)
})

test('marca Es prueba y recorta el resumen a 480 caracteres', () => {
  const row = buildRow({ envelope: envelope({ lead: { resumen: 'a'.repeat(600) } }), now: NOW })
  const resumen = row[COLUMNS.indexOf('Resumen y preferencias')]
  assert.equal(resumen.length, 480)
  assert.equal(row[COLUMNS.indexOf('Es prueba')], 'Sí')
  assert.equal(row[COLUMNS.indexOf('Actualizado el')], NOW)

  const real = buildRow({ envelope: envelope({ test: false }), now: NOW })
  assert.equal(real[COLUMNS.indexOf('Es prueba')], 'No')
})

test('deja vacío Recibido por el equipo: entrega confirmada la marca el equipo', () => {
  const row = buildRow({ envelope: envelope(), now: NOW })
  assert.equal(row[COLUMNS.indexOf('Recibido por el equipo')], '')
})

test('un caso nuevo se inserta', () => {
  assert.deepEqual(decideWrite({ existing: null, envelope: envelope() }), { action: 'insert' })
})

test('una baja explícita no se reactiva con una actualización posterior', () => {
  const decision = decideWrite({
    existing: { row: 6, noContactar: true, revision: 1 },
    envelope: envelope({ revision: 2 }),
  })
  assert.equal(decision.action, 'skip')
  assert.equal(decision.reason, 'baja_persistente')
})

test('un reintento con revisión vieja o repetida no pisa la fila', () => {
  const stale = decideWrite({
    existing: { row: 6, noContactar: false, revision: 3 },
    envelope: envelope({ revision: 2 }),
  })
  assert.equal(stale.reason, 'revision_no_monotonica')

  const repeat = decideWrite({
    existing: { row: 6, noContactar: false, revision: 3 },
    envelope: envelope({ revision: 3 }),
  })
  assert.equal(repeat.reason, 'revision_no_monotonica')
})

test('una revisión más nueva actualiza la misma fila, sin duplicar', () => {
  const decision = decideWrite({
    existing: { row: 42, noContactar: false, revision: 3 },
    envelope: envelope({ revision: 4 }),
  })
  assert.deepEqual(decision, { action: 'update', row: 42 })
})

test('blankVendorColumns borra las cinco columnas del equipo', () => {
  const values = new Array(LAST_WRITABLE_INDEX + 1).fill('x')
  const safe = blankVendorColumns(values)
  for (const column of ['Estado', 'Contactado el', 'Cotización enviada el', 'Próxima acción', 'Notas del vendedor']) {
    assert.equal(safe[COLUMNS.indexOf(column)], '', `${column} no se limpió`)
  }
  assert.equal(safe[COLUMNS.indexOf('Nombre')], 'x')
})

// --- baja por contacto -------------------------------------------------
// El traspaso pide baja persistente "por contacto/cuenta". Chequear solo la
// fila del caso dejaba entrar al mismo contacto abriendo una consulta nueva.

test('un contacto dado de baja no entra abriendo un caso nuevo', () => {
  const decision = decideWrite({
    existing: null,
    contactBaja: true,
    envelope: envelope({ case_id: 'rf-1384513880563214-2' }),
  })
  assert.equal(decision.action, 'skip')
  assert.equal(decision.reason, 'baja_persistente_contacto')
})

test('registrar la baja en si misma siempre se permite', () => {
  const decision = decideWrite({
    existing: null,
    contactBaja: true,
    envelope: envelope({ no_contactar: true }),
  })
  assert.equal(decision.action, 'insert')
})

test('sin baja previa el caso nuevo entra normal', () => {
  const decision = decideWrite({ existing: null, contactBaja: false, envelope: envelope() })
  assert.equal(decision.action, 'insert')
})

// --- lectura de planilla y ledger --------------------------------------

function fakeSheets({ ids = [], ledger = [], bajas = [] }) {
  return {
    async getMany(ranges) {
      return ranges.map((range) => {
        if (range.includes('_integracion')) return ledger
        if (/Consultas!A\d+:A\d+$/.test(range)) return ids
        return bajas
      })
    },
  }
}

test('findCase ubica el caso en su fila real de la planilla', async () => {
  const sheets = fakeSheets({
    ids: [['rf-a-1'], ['rf-b-1'], ['rf-c-1']],
    ledger: [['rf-c-1', '4', '999', 'ayer', 'No']],
  })
  const found = await findCase(sheets, { caseId: 'rf-c-1', contactId: '999' })
  assert.equal(found.existing.row, 8) // fila 6 + offset 2
  assert.equal(found.existing.revision, 4)
  assert.equal(found.contactBaja, false)
})

test('findCase devuelve la primera fila libre para un caso nuevo', async () => {
  const sheets = fakeSheets({ ids: [['rf-a-1'], ['rf-b-1']], ledger: [] })
  const found = await findCase(sheets, { caseId: 'rf-nuevo', contactId: '999' })
  assert.equal(found.existing, null)
  assert.equal(found.firstFreeRow, 8)
  assert.equal(found.ledgerRow, 2)
})

test('findCase detecta la baja del contacto en una consulta anterior', async () => {
  const sheets = fakeSheets({
    ids: [['rf-viejo-1']],
    ledger: [
      ['rf-viejo-1', '2', '1384513880563214', 'ayer', 'Sí'],
      ['rf-otro-1', '1', '777', 'ayer', 'No'],
    ],
  })
  const found = await findCase(sheets, {
    caseId: 'rf-nuevo-9',
    contactId: '1384513880563214',
  })
  assert.equal(found.existing, null, 'el caso nuevo todavia no existe')
  assert.equal(found.contactBaja, true, 'pero el contacto ya estaba de baja')
  assert.equal(found.ledgerRow, 4) // dos entradas ocupadas: 2 y 3
})

test('findCase no confunde la baja de otro contacto', async () => {
  const sheets = fakeSheets({
    ids: [],
    ledger: [['rf-otro-1', '1', '777', 'ayer', 'Sí']],
  })
  const found = await findCase(sheets, { caseId: 'rf-x-1', contactId: '1384513880563214' })
  assert.equal(found.contactBaja, false)
})
