/**
 * Lógica pura del puente: validar, sanitizar, armar fila y decidir escritura.
 * Sin red y sin Google, para poder probarla entera en local.
 */

import crypto from 'node:crypto'

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
 * Claves que el contrato espera dentro de `lead`. Se listan acá porque un
 * llamador que arma el cuerpo desde un formulario puede mandarlas sueltas en
 * la raíz en vez de anidadas.
 */
const LEAD_FIELDS = [
  'nombre', 'whatsapp', 'correo', 'destino', 'tipo_viaje', 'resumen',
  'usuario_instagram', 'enlace_conversacion', 'id_publicacion', 'fecha_viaje',
  'flexibilidad', 'ciudad_salida', 'noches', 'adultos', 'menores',
  'edades_menores', 'total_viajeros', 'perfil', 'presupuesto', 'moneda',
  'base_presupuesto', 'permiso_contacto', 'datos_faltantes', 'datos_completos',
]

const VERDADEROS = new Set(['true', 'si', 'sí', 'yes', '1'])
const FALSOS = new Set(['false', 'no', '0'])

/**
 * Texto a booleano, sólo para valores inequívocos. Lo que no reconoce lo
 * devuelve intacto para que la validación lo rechace: un `test` vacío o raro
 * no puede terminar valiendo true por descuido.
 */
function aBooleano(valor) {
  if (typeof valor !== 'string') return valor
  const texto = valor.trim().toLowerCase()
  if (VERDADEROS.has(texto)) return true
  if (FALSOS.has(texto)) return false
  return valor
}

/** Texto a entero, sólo si son puros dígitos. */
function aEntero(valor) {
  if (typeof valor !== 'string') return valor
  const texto = valor.trim()
  return /^\d+$/.test(texto) ? Number.parseInt(texto, 10) : valor
}

/**
 * Normaliza el cuerpo antes de validarlo.
 *
 * El llamador real es un plugin de HelpKnow configurado desde un formulario
 * web, y un formulario manda todo como texto: `"1"` en vez de `1`, `"true"`
 * en vez de `true`. La validación exigía tipos nativos y rechazaba con 400
 * sobres que eran correctos en todo salvo las comillas. Eso costó una ronda
 * entera de pruebas contra Instagram.
 *
 * Acá se arregla en el borde, que es donde corresponde: adentro la lógica
 * sigue trabajando con tipos nativos y las reglas de seguridad no se aflojan.
 * Un valor que no se puede interpretar sin ambigüedad se deja como vino.
 */
export function normalizeEnvelope(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body

  const sobre = { ...body }

  if (typeof sobre.operation === 'string') sobre.operation = sobre.operation.trim()
  if (typeof sobre.account === 'string') sobre.account = sobre.account.trim()

  sobre.schema_version = aEntero(sobre.schema_version)
  sobre.revision = aEntero(sobre.revision)
  sobre.test = aBooleano(sobre.test)
  sobre.no_contactar = aBooleano(sobre.no_contactar)

  // El lead puede venir como objeto, como texto JSON, o desarmado en la raíz.
  let lead = sobre.lead
  if (typeof lead === 'string') {
    try {
      const parsed = JSON.parse(lead)
      lead = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
    } catch {
      lead = {}
    }
  }
  if (!lead || typeof lead !== 'object' || Array.isArray(lead)) lead = {}

  const planos = {}
  for (const campo of LEAD_FIELDS) {
    if (lead[campo] === undefined && sobre[campo] !== undefined) planos[campo] = sobre[campo]
  }

  const combinado = { ...planos, ...lead }
  for (const campo of ['permiso_contacto', 'datos_completos']) {
    if (campo in combinado) combinado[campo] = aBooleano(combinado[campo])
  }

  // Un campo vacío es un campo que el modelo no completó: que no ocupe celda.
  for (const [clave, valor] of Object.entries(combinado)) {
    if (valor === '' || valor === null || valor === undefined) delete combinado[clave]
  }

  sobre.lead = combinado
  return sobre
}

/**
 * Valida el sobre del contrato. Identidad, caso y revisión tienen que venir
 * del sistema, nunca del cliente ni del modelo: si faltan, se rechaza.
 */
/** Una consulta identificada por identidad deja que el endpoint derive el resto. */
export function identificaPorIdentidad(body) {
  return typeof body?.identidad === 'string' && body.identidad.trim().length > 0
}

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
  if (identificaPorIdentidad(body)) {
    const identidad = String(body.identidad).trim()
    if (identidad.length < 3 || identidad.length > 200) {
      errors.push('identidad debe tener entre 3 y 200 caracteres')
    }
  } else if (!body.contact_id || !/^[0-9A-Za-z_-]{3,64}$/.test(String(body.contact_id))) {
    errors.push('contact_id ausente o con formato inválido')
  }
  if (body.operation === 'upsert') {
    if (typeof body.test !== 'boolean') {
      errors.push('test debe ser booleano explícito')
    }
    // Dos formas válidas de identificar la consulta: los tres identificadores
    // explícitos, o una identidad de la que el endpoint los deriva.
    if (!identificaPorIdentidad(body)) {
      if (!body.case_id || !/^[0-9A-Za-z_-]{3,64}$/.test(String(body.case_id))) {
        errors.push('case_id ausente o con formato inválido')
      }
      if (!Number.isInteger(body.revision) || body.revision < 1) {
        errors.push('revision debe ser entero >= 1')
      }
    }
  }
  if (body.estado !== undefined && !ESTADOS.includes(body.estado)) {
    errors.push('estado fuera de la lista de la Guía')
  }
  return errors
}

/**
 * HelpKnow no expone ningún identificador de contacto ni de conversación como
 * variable de sistema: el único atributo de sistema que ofrece es el número
 * de turno de la IA. Lo que sí puede inyectar en el prompt son los atributos
 * del contacto en SaleSmartly, y dos de ellos juntos —nombre y fecha de
 * creación— identifican a una persona de forma prácticamente única.
 *
 * De ahí sale `contact_id`: una huella digital de la cuenta más esa identidad.
 * El modelo deja de manejar identificadores y sólo copia un texto que el
 * sistema ya le puso delante.
 *
 * Que sea huella y no el texto crudo tiene dos ventajas: el nombre de la
 * persona no queda escrito dentro del identificador, y el formato siempre
 * cumple la validación sin importar qué caracteres traiga la identidad.
 */
export function derivarContactId({ account, identidad }) {
  const normalizada = String(identidad).trim().replace(/\s+/g, ' ').toLowerCase()
  const huella = crypto.createHash('sha256').update(`${account}|${normalizada}`).digest('hex')
  return `c${huella.slice(0, 24)}`
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
 * - baja persistente: ni el contacto ni la fila dados de baja se reactivan
 * - revisión no monotónica: se descarta como reintento viejo
 * - fila nueva: insert, siempre que quede capacidad
 */
export function decideWrite({ existing, contactBaja, envelope }) {
  const esBajaNueva = envelope.no_contactar === true

  // La baja del traspaso es por CONTACTO, no por consulta: un contacto dado
  // de baja no vuelve a entrar abriendo un caso nuevo.
  if (contactBaja === true && !esBajaNueva) {
    return { action: 'skip', reason: 'baja_persistente_contacto' }
  }
  if (!existing) {
    return { action: 'insert' }
  }
  if (existing.noContactar === true && !esBajaNueva) {
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
