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
 * columnas ni las 200 filas de Consultas. Sin ella no hay forma de saber qué
 * revisión ya se aplicó, y los reintentos dejarían de ser idempotentes.
 */
export const LEDGER_TITLE = '_integracion'
const LEDGER_RANGE = `${LEDGER_TITLE}!A2:D501`

const ID_COLUMN = columnLetter(COLUMN_INDEX['ID consulta'])
const NO_CONTACTAR_COLUMN = columnLetter(COLUMN_INDEX['No contactar'])

/**
 * Busca el caso en la planilla y en el ledger.
 * Devuelve null si el caso nunca se escribió.
 */
export async function findCase(sheets, caseId) {
  const [ids, ledger] = await Promise.all([
    sheets.getValues(`${SHEET_TITLE}!${ID_COLUMN}${FIRST_DATA_ROW}:${ID_COLUMN}${LAST_DATA_ROW}`),
    sheets.getValues(LEDGER_RANGE),
  ])

  const offset = ids.findIndex((cell) => (cell[0] || '').trim() === caseId)
  const ledgerIndex = ledger.findIndex((cell) => (cell[0] || '').trim() === caseId)
  const ledgerEntry = ledgerIndex >= 0 ? ledger[ledgerIndex] : null

  if (offset < 0) {
    return {
      existing: null,
      firstFreeRow: firstFreeRow(ids),
      ledgerRow: ledgerIndex >= 0 ? ledgerIndex + 2 : ledger.length + 2,
    }
  }

  const row = FIRST_DATA_ROW + offset
  const flags = await sheets.getValues(
    `${SHEET_TITLE}!${NO_CONTACTAR_COLUMN}${row}:${NO_CONTACTAR_COLUMN}${row}`,
  )
  const noContactar = ((flags[0] && flags[0][0]) || '').trim().toLowerCase().startsWith('s')

  return {
    existing: {
      row,
      noContactar,
      revision: ledgerEntry ? Number.parseInt(ledgerEntry[1], 10) : null,
    },
    firstFreeRow: null,
    ledgerRow: ledgerIndex >= 0 ? ledgerIndex + 2 : ledger.length + 2,
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

/** Deja registrada la revisión aplicada para que el próximo reintento la vea. */
export function ledgerPayload({ ledgerRow, caseId, revision, contactId, now }) {
  return {
    range: `${LEDGER_TITLE}!A${ledgerRow}:D${ledgerRow}`,
    values: [[caseId, String(revision), contactId, now]],
  }
}
