/**
 * Capa de acceso a la planilla: buscar la fila de un caso, leer el estado de
 * integración y escribir respetando las columnas del vendedor y las fórmulas.
 */

import {
  COLUMN_INDEX,
  FIRST_DATA_ROW,
  LAST_DATA_ROW,
  LAST_WRITABLE_INDEX,
  SHEET_TITLE,
  columnLetter,
  updatableBlocks,
} from './rf-mapping.js'
import { blankVendorColumns } from './rf-core.js'

/**
 * Pestaña oculta con el estado de cada caso. Es aditiva: no toca las 37
 * columnas ni las 200 filas de Consultas.
 *
 *   A case_id | B revision | C contact_id | D actualizado_el | E no_contactar
 *
 * Sin ella no hay forma de saber qué revisión ya se aplicó, y los reintentos
 * dejarían de ser idempotentes. La columna E existe porque la baja del
 * traspaso es por CONTACTO, no por caso: un contacto dado de baja no puede
 * volver a entrar abriendo una consulta nueva.
 */
export const LEDGER_TITLE = '_integracion'
export const LEDGER_COLUMNS = ['case_id', 'revision', 'contact_id', 'actualizado_el', 'no_contactar']
const LEDGER_RANGE = `${LEDGER_TITLE}!A2:E501`

const ID_COLUMN = columnLetter(COLUMN_INDEX['ID consulta'])
const NO_CONTACTAR_COLUMN = columnLetter(COLUMN_INDEX['No contactar'])

const isSi = (value) => String(value || '').trim().toLowerCase().startsWith('s')

/**
 * Lee planilla y ledger en una sola llamada, y arma todo lo que decideWrite
 * necesita saber: la fila del caso si existe, la revisión aplicada, y si el
 * CONTACTO está dado de baja en cualquiera de sus consultas anteriores.
 *
 * Si no le pasan `caseId`, lo resuelve desde el registro y además calcula la
 * próxima revisión: así ni el caso ni la revisión dependen del modelo.
 */
export async function findCase(sheets, { caseId, contactId }) {
  // Una sola ida y vuelta: contra Apps Script cada llamada cuesta segundos,
  // y HelpKnow corta la herramienta si tarda demasiado.
  const [ids, bajas, ledger] = await sheets.getMany([
    `${SHEET_TITLE}!${ID_COLUMN}${FIRST_DATA_ROW}:${ID_COLUMN}${LAST_DATA_ROW}`,
    `${SHEET_TITLE}!${NO_CONTACTAR_COLUMN}${FIRST_DATA_ROW}:${NO_CONTACTAR_COLUMN}${LAST_DATA_ROW}`,
    LEDGER_RANGE,
  ])

  const delContacto = ledger.filter((entry) => (entry[2] || '').trim() === contactId)
  const contactBaja = delContacto.some((entry) => isSi(entry[4]))

  // Sin case_id explícito, se resuelve desde el registro: la última consulta
  // de este contacto, o una nueva si nunca tuvo. Así el modelo no necesita
  // manejar identificadores.
  const caso =
    caseId ||
    (delContacto.length ? (delContacto[delContacto.length - 1][0] || '').trim() : `${contactId}-1`)

  const ledgerIndex = ledger.findIndex((entry) => (entry[0] || '').trim() === caso)
  const ledgerEntry = ledgerIndex >= 0 ? ledger[ledgerIndex] : null
  const ledgerRow = ledgerIndex >= 0 ? ledgerIndex + 2 : ledger.length + 2

  const revisionGuardada = ledgerEntry ? Number.parseInt(ledgerEntry[1], 10) : null
  const proximaRevision = (Number.isInteger(revisionGuardada) ? revisionGuardada : 0) + 1

  const offset = ids.findIndex((cell) => (cell[0] || '').trim() === caso)

  if (offset < 0) {
    return {
      existing: null,
      caso,
      proximaRevision,
      contactBaja,
      firstFreeRow: firstFreeRow(ids),
      ledgerRow,
    }
  }

  return {
    existing: {
      row: FIRST_DATA_ROW + offset,
      noContactar: isSi(bajas[offset] && bajas[offset][0]),
      revision: revisionGuardada,
    },
    caso,
    proximaRevision,
    contactBaja,
    firstFreeRow: null,
    ledgerRow,
  }
}

/** Primera fila libre dentro de las 200 preparadas. -1 si está llena. */
function firstFreeRow(ids) {
  for (let i = 0; i <= LAST_DATA_ROW - FIRST_DATA_ROW; i++) {
    const cell = ids[i] && ids[i][0]
    if (!cell || !String(cell).trim()) return FIRST_DATA_ROW + i
  }
  return -1
}

/** Inserta una fila nueva: escribe A..AI completo, nunca las fórmulas AJ:AK. */
export function insertPayload({ row, values }) {
  const last = columnLetter(LAST_WRITABLE_INDEX)
  return [
    {
      range: `${SHEET_TITLE}!A${row}:${last}${row}`,
      values: [values.slice(0, LAST_WRITABLE_INDEX + 1)],
    },
  ]
}

/**
 * Actualiza una fila existente por bloques contiguos, salteando la clave,
 * las columnas del vendedor y las fórmulas. Hoy son C:K y P:AI.
 */
export function updatePayload({ row, values }) {
  const safe = blankVendorColumns(values)
  return updatableBlocks().map((block) => ({
    range: `${SHEET_TITLE}!${columnLetter(block.start)}${row}:${columnLetter(block.end)}${row}`,
    values: [safe.slice(block.start, block.end + 1)],
  }))
}

/** Deja registrada la revisión aplicada y la baja, para el próximo reintento. */
export function ledgerPayload({ ledgerRow, caseId, revision, contactId, now, noContactar }) {
  return {
    range: `${LEDGER_TITLE}!A${ledgerRow}:E${ledgerRow}`,
    values: [[caseId, String(revision), contactId, now, noContactar ? 'Sí' : 'No']],
  }
}
