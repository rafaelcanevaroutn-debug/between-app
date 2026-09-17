/**
 * Lógica pura del puente: validar, sanitizar, armar fila y decidir escritura.
 * Sin red y sin Google, para poder probarla entera en local.
 */

import {
  COLUMNS,
  COLUMN_INDEX,
  ESTADOS,
  LAST_WRITABLE_INDEX,
  VENDOR_COLUMNS,
} from './rf-mapping.js'

export const SCHEMA_VERSION = 1
export const ACCOUNT = 'renzoyfranco.viajes'

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g
const FORMULA_START = /^[=+\-@\t\r]/

/**
 * Neutraliza formula injection. Una celda que arranca con = + - @ o un
 * carácter de control la interpreta Sheets como fórmula: le anteponemos
 * apóstrofe para que quede como texto literal.
 */
export function sanitizeCell(value) {
  if (value === null || value === undefined) return ''
  let text = String(value)
  text = text.replace(CONTROL_CHARS, '')
  if (FORMULA_START.test(text)) text = "'" + text
  return text.slice(0, 5000)
}

/** Campos que jamás se guardan, por más que el modelo los mande. */
const FORBIDDEN_FIELDS = ['dni', 'pasaporte', 'passport', 'tarjeta', 'card', 'cvv', 'cbu']

export function stripForbidden(lead) {
  const clean = {}
  for (const [key, value] of Object.entries(lead || {})) {
    const lower = key.toLowerCase()
    if (FORBIDDEN_FIELDS.some((f) => lower.includes(f))) continue
    clean[key] = value
  }
  return clean
}

/**
 * Valida el sobre del contrato. Identidad, caso y revisión tienen que venir
 * del sistema, nunca del cliente ni del modelo: si faltan, se rechaza.
 */
export function validateEnvelope(body) {
  const errors = []
  if (!body || typeof body !== 'object') return ['cuerpo ausente o no es JSON']

  if (body.schema_version !== SCHEMA_VERSION) {
    errors.push(`schema_version debe ser ${SCHEMA_VERSION}`)
  }
  if (!['upsert', 'check_contact'].includes(body.operation)) {
    errors.push('operation debe ser upsert o check_contact')
  }
  if (body.account !== ACCOUNT) {
    errors.push(`account debe ser ${ACCOUNT}`)
  }
  if (!body.contact_id || !/^[0-9A-Za-z_-]{3,64}$/.test(String(body.contact_id))) {
    errors.push('contact_id ausente o con formato inválido')
  }
  if (body.operation === 'upsert') {
    if (!body.case_id || !/^[0-9A-Za-z_-]{3,64}$/.test(String(body.case_id))) {
      errors.push('case_id ausente o con formato inválido')
    }
    if (!Number.isInteger(body.revision) || body.revision < 1) {
      errors.push('revision debe ser entero >= 1')
    }
    if (typeof body.test !== 'boolean') {
      errors.push('test debe ser booleano explícito')
    }
  }
  if (body.estado !== undefined && !ESTADOS.includes(body.estado)) {
    errors.push('estado fuera de la lista de la Guía')
  }
  return errors
}

const SI = 'Sí'
const NO = 'No'

function bool(value) {
  if (value === true) return SI
  if (value === false) return NO
  return ''
}

/**
 * Arma los 35 valores de A..AI. Las fórmulas AJ:AK no se tocan nunca.
 * `now` se inyecta para que los tests sean deterministas.
 */
export function buildRow({ envelope, now }) {
  const lead = stripForbidden(envelope.lead)
  const row = new Array(LAST_WRITABLE_INDEX + 1).fill('')
  const put = (column, value) => {
    const i = COLUMN_INDEX[column]
    if (i === undefined || i > LAST_WRITABLE_INDEX) return
    row[i] = sanitizeCell(value)
  }

  put('ID consulta', envelope.case_id)
  put('Estado', envelope.estado || 'Nuevo')
  put('Motivo de derivación', envelope.reason)
  put('Nombre', lead.nombre)
  put('WhatsApp', lead.whatsapp)
  put('Correo', lead.correo)
  put('Destino', lead.destino)
  put('Tipo de viaje', lead.tipo_viaje)
  put('Resumen y preferencias', String(lead.resumen || '').slice(0, 480))
  put('Actualizado el', now)
  put('Recibido por el equipo', '')
  put('Usuario Instagram', lead.usuario_instagram)
  put('Enlace conversación', lead.enlace_conversacion)
  put('ID publicación', lead.id_publicacion)
  put('Fecha del viaje y año', lead.fecha_viaje)
  put('Flexibilidad', lead.flexibilidad)
  put('Ciudad de salida', lead.ciudad_salida)
  put('Noches', lead.noches)
  put('Adultos', lead.adultos)
  put('Menores', lead.menores)
  put('Edades exactas al viajar', lead.edades_menores)
  put('Total viajeros', lead.total_viajeros)
  put('Perfil del viaje', lead.perfil)
  put('Presupuesto', lead.presupuesto)
  put('Moneda', lead.moneda)
  put('Base del presupuesto', lead.base_presupuesto)
  put('Permiso para contacto', bool(lead.permiso_contacto))
  put(
    'Datos faltantes',
    Array.isArray(lead.datos_faltantes) ? lead.datos_faltantes.join(', ') : lead.datos_faltantes,
  )
  put('Datos completos', bool(lead.datos_completos))
  put('No contactar', bool(envelope.no_contactar))
  put('Es prueba', envelope.test ? SI : NO)

  return row
}

/**
 * Decide qué hacer con un upsert.
 *
 * - baja persistente: una fila marcada No contactar = Sí no se reactiva
 * - revisión no monotónica: se descarta como reintento viejo
 * - fila nueva: insert, siempre que quede capacidad
 */
export function decideWrite({ existing, envelope }) {
  if (!existing) {
    return { action: 'insert' }
  }
  if (existing.noContactar === true && envelope.no_contactar !== true) {
    return { action: 'skip', reason: 'baja_persistente' }
  }
  if (Number.isInteger(existing.revision) && envelope.revision <= existing.revision) {
    return { action: 'skip', reason: 'revision_no_monotonica', stored: existing.revision }
  }
  return { action: 'update', row: existing.row }
}

/**
 * En una actualización vacía los valores de las columnas del vendedor para
 * que los bloques contiguos no las pisen. Defensa en profundidad: los rangos
 * ya las excluyen, esto cubre un error de cálculo de rangos.
 */
export function blankVendorColumns(row) {
  const copy = row.slice()
  for (const column of VENDOR_COLUMNS) {
    const i = COLUMN_INDEX[column]
    if (i !== undefined && i < copy.length) copy[i] = ''
  }
  return copy
}

export { COLUMNS }
