/**
 * Prueba de humo del puente contra el endpoint YA DESPLEGADO.
 *
 * Recorre los escenarios que el traspaso exige antes de dar la integración
 * por buena: alta, reintento, actualización que respeta al vendedor, baja
 * persistente, aislamiento de cuenta y rechazo de consultas reales.
 *
 * Todo lo que escribe va marcado Es prueba = Sí y con un contacto sintético.
 * No toca datos de nadie.
 *
 *   RF_ENDPOINT=https://tu-app.vercel.app/api/rf-consulta \
 *   RF_BRIDGE_TOKEN=... \
 *   node scripts/rf-smoke.mjs
 */

const ENDPOINT = process.env.RF_ENDPOINT
const TOKEN = process.env.RF_BRIDGE_TOKEN

if (!ENDPOINT || !TOKEN) {
  console.error('Faltan RF_ENDPOINT y/o RF_BRIDGE_TOKEN en el entorno.')
  process.exit(1)
}

// Contacto sintético, distinto en cada corrida: nunca choca con un caso real
// ni con una corrida anterior.
const SUFIJO = Date.now().toString().slice(-8)
const CONTACTO = `prueba${SUFIJO}`
const CASO = `rf-prueba-${SUFIJO}-1`
const CASO_2 = `rf-prueba-${SUFIJO}-2`

function sobre(extra = {}) {
  return {
    schema_version: 1,
    operation: 'upsert',
    account: 'renzoyfranco.viajes',
    contact_id: CONTACTO,
    case_id: CASO,
    revision: 1,
    test: true,
    reason: 'prueba_de_humo',
    lead: {
      nombre: 'Lead sintético',
      destino: 'México',
      tipo_viaje: 'Grupal',
      usuario_instagram: 'prueba_no_contactar',
      resumen: 'Fila generada por scripts/rf-smoke.mjs. No contactar.',
      adultos: 2,
      menores: 0,
    },
    ...extra,
  }
}

async function llamar(cuerpo, { token = TOKEN } = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-RF-Token': token },
    body: JSON.stringify(cuerpo),
  })
  let json = null
  try {
    json = await res.json()
  } catch {
    json = { _sin_json: true }
  }
  return { status: res.status, json }
}

const resultados = []
let filaDelCaso = null

async function paso(nombre, ejecutar, esperado) {
  try {
    const { status, json } = await ejecutar()
    const problema = esperado({ status, json })
    resultados.push({
      nombre,
      ok: !problema,
      detalle: problema || `${status} ${JSON.stringify(json)}`,
    })
  } catch (error) {
    resultados.push({ nombre, ok: false, detalle: `excepción: ${error.message}` })
  }
}

await paso(
  'un contacto nuevo no figura ni está de baja',
  () => llamar({ ...sobre(), operation: 'check_contact' }),
  ({ status, json }) => {
    if (status !== 200) return `esperaba 200, vino ${status}`
    if (json.existe !== false) return 'el contacto sintético ya existía'
    if (json.no_contactar !== false) return 'vino marcado de baja sin motivo'
    return null
  },
)

await paso(
  'el alta escribe una fila',
  () => llamar(sobre()),
  ({ status, json }) => {
    if (status !== 200 || json.ok !== true) return `${status} ${JSON.stringify(json)}`
    if (json.accion !== 'insert') return `esperaba insert, hizo ${json.accion}`
    filaDelCaso = json.fila
    return null
  },
)

await paso(
  'el mismo envío repetido no duplica la fila',
  () => llamar(sobre()),
  ({ json }) => {
    if (json.aplicado !== false) return 'volvió a escribir: la idempotencia falla'
    if (json.motivo !== 'revision_no_monotonica') return `motivo inesperado: ${json.motivo}`
    return null
  },
)

await paso(
  'una revisión más nueva actualiza la MISMA fila',
  () => llamar(sobre({ revision: 2, lead: { ...sobre().lead, adultos: 3 } })),
  ({ json }) => {
    if (json.accion !== 'update') return `esperaba update, hizo ${json.accion}`
    if (json.fila !== filaDelCaso) return `cambió de fila: ${filaDelCaso} -> ${json.fila}`
    return null
  },
)

await paso(
  'la baja se registra',
  () => llamar(sobre({ revision: 3, no_contactar: true })),
  ({ json }) => (json.aplicado === true ? null : `no aplicó la baja: ${JSON.stringify(json)}`),
)

await paso(
  'después de la baja, una actualización no reabre el caso',
  () => llamar(sobre({ revision: 4 })),
  ({ json }) => {
    if (json.aplicado !== false) return 'reactivó un contacto dado de baja'
    if (!String(json.motivo).startsWith('baja_persistente')) return `motivo: ${json.motivo}`
    return null
  },
)

await paso(
  'el mismo contacto tampoco entra con un caso NUEVO',
  () => llamar(sobre({ case_id: CASO_2, revision: 1 })),
  ({ json }) => {
    if (json.aplicado !== false) return 'la baja no es por contacto, solo por caso'
    if (json.motivo !== 'baja_persistente_contacto') return `motivo: ${json.motivo}`
    return null
  },
)

await paso(
  'check_contact ahora reporta la baja',
  () => llamar({ ...sobre(), operation: 'check_contact' }),
  ({ json }) => (json.no_contactar === true ? null : 'no reporta la baja del contacto'),
)

await paso(
  'otra cuenta queda afuera',
  () => llamar(sobre({ account: 'caminantes', case_id: `${CASO}-x` })),
  ({ status }) => (status === 400 ? null : `esperaba 400, vino ${status}`),
)

await paso(
  'un token equivocado no entra',
  () => llamar(sobre(), { token: 'token-invalido' }),
  ({ status }) => (status === 401 ? null : `esperaba 401, vino ${status}`),
)

await paso(
  'en TEST_ONLY una consulta real se rechaza',
  () => llamar(sobre({ test: false, case_id: `${CASO}-real` })),
  ({ status, json }) => {
    if (status === 200) return 'ESCRIBIÓ una consulta real: TEST_ONLY está apagado'
    if (status !== 409) return `esperaba 409, vino ${status} ${JSON.stringify(json)}`
    return null
  },
)

// --- sólo contra la planilla falsa ----------------------------------------
// Comprueba la garantía más importante: que una actualización del puente no
// pise lo que escribió el vendedor. Contra producción no corre, porque haría
// falta escribir celdas a mano.

if (process.env.RF_FAKE === '1') {
  const base = new URL(ENDPOINT).origin
  const ESTADO = 1 // columna B
  const NOTAS = 14 // columna O
  const CONTACTADO = 11 // columna L

  const CASO_V = `rf-vendedor-${SUFIJO}`
  const sobreV = (extra) => ({ ...sobre(), case_id: CASO_V, contact_id: `vend${SUFIJO}`, ...extra })

  const alta = await llamar(sobreV())
  const fila = alta.json.fila

  const sembrar = (columna, valor) =>
    fetch(`${base}/debug/consultas/${fila}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ columna, valor }),
    })

  // El vendedor trabaja la fila.
  await sembrar(ESTADO, 'Contactado')
  await sembrar(CONTACTADO, '17/9/2026')
  await sembrar(NOTAS, 'Llamé, quiere salir en enero. Mando cotización el lunes.')

  // Llega una actualización del bot.
  await llamar(sobreV({ revision: 2, lead: { nombre: 'Nombre actualizado', destino: 'Perú' } }))

  const despues = await (await fetch(`${base}/debug/consultas/${fila}`)).json()
  const celdas = despues.celdas

  await paso(
    'una actualización NO pisa el trabajo del vendedor',
    async () => ({ status: 200, json: {} }),
    () => {
      if (celdas[ESTADO] !== 'Contactado') return `Estado pisado: "${celdas[ESTADO]}"`
      if (celdas[CONTACTADO] !== '17/9/2026') return `Contactado el pisado: "${celdas[CONTACTADO]}"`
      if (!celdas[NOTAS].startsWith('Llamé')) return `Notas pisadas: "${celdas[NOTAS]}"`
      return null
    },
  )

  await paso(
    'pero sí actualiza los datos del cliente',
    async () => ({ status: 200, json: {} }),
    () => (celdas[3] === 'Nombre actualizado' ? null : `Nombre no se actualizó: "${celdas[3]}"`),
  )

}

// --- informe ---------------------------------------------------------------

console.log('\nPrueba de humo del puente\n')
for (const r of resultados) {
  console.log(`${r.ok ? '  OK  ' : ' FALLA'}  ${r.nombre}`)
  if (!r.ok) console.log(`         ${r.detalle}`)
}

const fallan = resultados.filter((r) => !r.ok).length
console.log(`\n${resultados.length - fallan}/${resultados.length} en verde`)

if (filaDelCaso) {
  console.log(
    `\nLa corrida dejó filas de prueba en la planilla (Es prueba = Sí),\n` +
      `a partir de la fila ${filaDelCaso}, contacto "${CONTACTO}".\n` +
      `Borralas a mano cuando termines de revisarlas.`,
  )
}

process.exit(fallan ? 1 : 0)
