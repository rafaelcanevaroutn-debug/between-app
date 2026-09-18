/**
 * Puente HelpKnow -> Google Sheets para @renzoyfranco.viajes.
 *
 * Existe porque Apps Script no puede leer headers HTTP: doPost(e) expone
 * parameter, postData y queryString, nada más. HelpKnow sólo autentica por
 * Header o Query, y el secreto no puede viajar en la URL. Una función de
 * Vercel sí lee el header, y el token vive en una variable de entorno.
 *
 * Arranca en modo TEST_ONLY: rechaza cualquier consulta que no venga marcada
 * como prueba. Se abre a producción recién con evidencia de un E2E.
 */

import crypto from 'node:crypto'
import { getAccessToken, createSheetsClient } from './_lib/rf-sheets.js'
import { buildRow, decideWrite, validateEnvelope } from './_lib/rf-core.js'
import { findCase, insertPayload, updatePayload, ledgerPayload } from './_lib/rf-repo.js'

export const config = { runtime: 'nodejs' }

const TIMEZONE = 'America/Argentina/Tucuman'

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/** Comparación en tiempo constante: evita distinguir el token por latencia. */
function tokenMatches(provided, expected) {
  if (!provided || !expected) return false
  const a = Buffer.from(String(provided))
  const b = Buffer.from(String(expected))
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

function readToken(request) {
  const header = request.headers.get('x-rf-token')
  if (header) return header.trim()
  const auth = request.headers.get('authorization') || ''
  if (auth.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim()
  return null
}

function nowInArgentina() {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: TIMEZONE,
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date())
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405)
  }

  const expectedToken = (process.env.RF_BRIDGE_TOKEN || '').trim()
  const spreadsheetId = (process.env.RF_SHEET_ID || '').trim()
  const clientEmail = (process.env.RF_GOOGLE_CLIENT_EMAIL || '').trim()
  const privateKey = (process.env.RF_GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  const testOnly = (process.env.RF_TEST_ONLY || 'true').toLowerCase() !== 'false'

  if (!expectedToken || !spreadsheetId || !clientEmail || !privateKey) {
    console.error('rf-consulta: faltan variables de entorno')
    return json({ ok: false, error: 'bridge_no_configurado' }, 500)
  }

  if (!tokenMatches(readToken(request), expectedToken)) {
    return json({ ok: false, error: 'no_autorizado' }, 401)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'json_invalido' }, 400)
  }

  const errors = validateEnvelope(body)
  if (errors.length) {
    return json({ ok: false, error: 'contrato_invalido', detalle: errors }, 400)
  }

  if (testOnly && body.test !== true) {
    return json({ ok: false, error: 'modo_test_only', detalle: 'el puente todavía no acepta consultas reales' }, 409)
  }

  try {
    const token = await getAccessToken({ clientEmail, privateKey })
    const sheets = createSheetsClient({ token, spreadsheetId })

    if (body.operation === 'check_contact') {
      // La baja se consulta por contacto: preguntar solo por el caso dejaria
      // pasar a alguien que se dio de baja en una consulta anterior.
      const found = await findCase(sheets, {
        caseId: body.case_id || null,
        contactId: body.contact_id,
      })
      const bajaDeLaFila = found.existing ? found.existing.noContactar : false
      return json({
        ok: true,
        operation: 'check_contact',
        existe: Boolean(found.existing),
        no_contactar: found.contactBaja || bajaDeLaFila,
      })
    }

    const found = await findCase(sheets, {
      caseId: body.case_id,
      contactId: body.contact_id,
    })
    const decision = decideWrite({
      existing: found.existing,
      contactBaja: found.contactBaja,
      envelope: body,
    })

    if (decision.action === 'skip') {
      return json({
        ok: true,
        operation: 'upsert',
        aplicado: false,
        motivo: decision.reason,
        revision_guardada: decision.stored ?? null,
      })
    }

    const now = nowInArgentina()
    const values = buildRow({ envelope: body, now })

    let targetRow
    let data
    if (decision.action === 'insert') {
      if (found.firstFreeRow === -1) {
        console.error('rf-consulta: planilla sin filas libres')
        return json({ ok: false, error: 'planilla_llena' }, 507)
      }
      targetRow = found.firstFreeRow
      data = insertPayload({ row: targetRow, values })
    } else {
      targetRow = decision.row
      data = updatePayload({ row: targetRow, values })
    }

    data.push(
      ledgerPayload({
        ledgerRow: found.ledgerRow,
        caseId: body.case_id,
        revision: body.revision,
        contactId: body.contact_id,
        now,
        noContactar: body.no_contactar === true,
      }),
    )

    const result = await sheets.batchUpdate(data)

    return json({
      ok: true,
      operation: 'upsert',
      aplicado: true,
      accion: decision.action,
      fila: targetRow,
      revision: body.revision,
      celdas: result.totalUpdatedCells ?? null,
    })
  } catch (error) {
    console.error('rf-consulta:', error.message)
    return json({ ok: false, error: 'fallo_escritura' }, 502)
  }
}
