/**
 * Mapeo de la planilla Consultas-Renzo-Franco.
 *
 * Hoja nativa 1_YlPorjULhc9gtpjuOQ2depb2cXU7q5As-gWuKBeOmA
 * Pestana Consultas, gid 2088791631.
 * Encabezados en la fila 5 (A5:AK5). Datos en las filas 6 a 205.
 *
 * Las 37 columnas se declaran una sola vez aca. Cualquier cambio en la
 * planilla se replica editando esta lista y nada mas.
 */

export const SHEET_TITLE = 'Consultas'
export const HEADER_ROW = 5
export const FIRST_DATA_ROW = 6
export const LAST_DATA_ROW = 205

/** Las 37 columnas, en orden A..AK. */
export const COLUMNS = [
  'ID consulta',
  'Estado',
  'Motivo de derivación',
  'Nombre',
  'WhatsApp',
  'Correo',
  'Destino',
  'Tipo de viaje',
  'Resumen y preferencias',
  'Actualizado el',
  'Recibido por el equipo',
  'Contactado el',
  'Cotización enviada el',
  'Próxima acción',
  'Notas del vendedor',
  'Usuario Instagram',
  'Enlace conversación',
  'ID publicación',
  'Fecha del viaje y año',
  'Flexibilidad',
  'Ciudad de salida',
  'Noches',
  'Adultos',
  'Menores',
  'Edades exactas al viajar',
  'Total viajeros',
  'Perfil del viaje',
  'Presupuesto',
  'Moneda',
  'Base del presupuesto',
  'Permiso para contacto',
  'Datos faltantes',
  'Datos completos',
  'No contactar',
  'Es prueba',
  'Contacto previsto hasta',
  'Cotización prevista hasta',
]

/**
 * Columnas que edita el equipo comercial de Franco. El puente las escribe
 * al crear la fila y NUNCA al actualizarla: sobrescribirlas borraria el
 * trabajo del vendedor. Regla del traspaso, seccion 9.
 */
export const VENDOR_COLUMNS = [
  'Estado',
  'Contactado el',
  'Cotización enviada el',
  'Próxima acción',
  'Notas del vendedor',
]

/** Columnas AJ:AK: las calcula la planilla. El puente jamas las escribe. */
export const FORMULA_COLUMNS = [
  'Contacto previsto hasta',
  'Cotización prevista hasta',
]

/** Estados validos. Lista cerrada tomada de la pestana Guia. */
export const ESTADOS = [
  'Nuevo',
  'En calificación',
  'Faltan datos',
  'A nutrir',
  'Listo para cotizar',
  'Cierre grupal',
  'Consulta especial',
  'Error de entrega',
  'Contactado',
  'Cotizado',
  'En seguimiento',
  'Cerrado',
  'Perdido',
  'No contactar',
]

/** Indice 0-based de cada columna, por nombre. */
export const COLUMN_INDEX = Object.fromEntries(COLUMNS.map((name, i) => [name, i]))

/** Convierte un indice 0-based en letra de columna A1. 0 -> A, 26 -> AA. */
export function columnLetter(index) {
  let n = index + 1
  let out = ''
  while (n > 0) {
    const rem = (n - 1) % 26
    out = String.fromCharCode(65 + rem) + out
    n = Math.floor((n - 1) / 26)
  }
  return out
}

/** Ultima columna que el puente puede escribir (AI, antes de las formulas). */
export const LAST_WRITABLE_INDEX = COLUMNS.length - FORMULA_COLUMNS.length - 1

/**
 * Bloques contiguos escribibles en una actualizacion: todo menos la clave,
 * las columnas del vendedor y las formulas. Se calculan desde las listas de
 * arriba para que no queden desincronizados.
 */
export function updatableBlocks() {
  const blocked = new Set([
    'ID consulta',
    ...VENDOR_COLUMNS,
    ...FORMULA_COLUMNS,
  ])
  const blocks = []
  let current = null
  for (let i = 0; i <= LAST_WRITABLE_INDEX; i++) {
    if (blocked.has(COLUMNS[i])) {
      current = null
      continue
    }
    if (current && current.end === i - 1) {
      current.end = i
    } else {
      current = { start: i, end: i }
      blocks.push(current)
    }
  }
  return blocks
}
