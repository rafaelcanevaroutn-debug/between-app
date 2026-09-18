/**
 * Puente HelpKnow -> Google Sheets para @renzoyfranco.viajes.
 *
 * Existe porque Apps Script no puede leer headers HTTP: doPost(e) expone
 * parameter, postData y queryString, nada más. HelpKnow sólo autentica por
 * Header o Query, y el secreto no puede viajar en la URL. Una función de
 * Vercel sí lee el header, y el token vive en una variable de entorno.
 *
 * Detrás puede escribir de dos maneras, según lo que la cuenta de Google
 * permita:
 *
 *   - Apps Script (RF_APPSSCRIPT_URL): corre con la cuenta del dueño de la
 *     planilla. No necesita clave, así que sirve aunque la organización
 *     bloquee la creación de claves de cuenta de servicio.
 *   - API de Sheets (RF_GOOGLE_CLIENT_EMAIL + RF_GOOGLE_PRIVATE_KEY).
 *
 * Si están las dos, gana Apps Script.
 *
 * Arranca en modo TEST_ONLY: rechaza cualquier consulta que no venga marcada
 * como prueba. Se abre a producción recién con evidencia de un E2E.
 *
 * La lógica vive en `procesar`, que no sabe nada de HTTP: recibe método,
 * token y cuerpo, y devuelve estado y respuesta. El handler de abajo es sólo
 * el adaptador al runtime de Node, que es el que corre en este proyecto.
 */

import crypto from 'node:crypto'
import { getAccessToken, createSheetsClient } from './_lib/rf-sheets.js'
import { createAppsScriptClient } from './_lib/rf-appsscript.js'
import {
  buildRow,
  decideWrite,
  derivarContactId,
  identificaPorIdentidad,
  normalizeEnvelope,
  validateEnvelope,
} from './_lib/rf-core.js'
import { findCase, insertPayload, updatePayload, ledgerPayload } from './_lib/rf-repo.js'

const TIMEZONE = 'America/Argentina/Tucuman'

/** Comparación en tiempo constante: evita distinguir el token por latencia. */
function tokenMatches(provided, expected) {
  if (!provided || !expected) return false
  const a = Buffer.from(String(provided))
  const b = Buffer.from(String(expected))
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

/** Los headers de Node llegan en minúsculas y ya normalizados. */
export function readToken(headers = {}) {
  const header = headers['x-rf-token']
  if (header) return String(header).trim()
  const auth = String(headers.authorization || '')
  if (auth.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim()
  return null
}

/**
 * Describe la forma del cuerpo para los logs: qué claves llegaron y de qué
 * tipo. Nunca los valores, porque son datos personales de un cliente.
 */
function describirForma(valor, profundidad = 0) {
  if (valor === null) return 'null'
  if (Array.isArray(valor)) return `array(${valor.length})`
  if (typeof valor !== 'object') return typeof valor
  if (profundidad > 1) return 'object'
  const forma = {}
  for (const [clave, v] of Object.entries(valor)) forma[clave] = describirForma(v, profundidad + 1)
  return forma
}

function nowInArgentina() {
  return new Intl.DateTimeFormat('es-AR', {
    timeZone: TIMEZONE,
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date())
}

/**
 * Toda la decisión del endpoint, sin HTTP de por medio.
 * Devuelve { status, cuerpo }.
 */
export async function procesar({ method, token, body, jsonInvalido = false }) {
  const responder = (cuerpo, status = 200) => ({ status, cuerpo })

  const expectedToken = (process.env.RF_BRIDGE_TOKEN || '').trim()
  const appsScriptUrl = (process.env.RF_APPSSCRIPT_URL || '').trim()
  const appsScriptToken = (process.env.RF_APPSSCRIPT_TOKEN || '').trim()
  const spreadsheetId = (process.env.RF_SHEET_ID || '').trim()
  const clientEmail = (process.env.RF_GOOGLE_CLIENT_EMAIL || '').trim()
  const privateKey = (process.env.RF_GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  const testOnly = (process.env.RF_TEST_ONLY || 'true').toLowerCase() !== 'false'

  const viaAppsScript = Boolean(appsScriptUrl && appsScriptToken)
  const viaApiOficial = Boolean(spreadsheetId && clientEmail && privateKey)

  /**
   * Chequeo de salud. Dice si el puente quedó configurado y por dónde va a
   * escribir, sin revelar ningún secreto: sólo informa si cada variable está
   * presente. Sirve para verificar un despliegue desde el navegador, sin
   * herramientas ni credenciales.
   */
  if (method === 'GET') {
    return responder({
      ok: viaAppsScript || viaApiOficial,
      servicio: 'rf-consulta',
      configurado: Boolean(expectedToken) && (viaAppsScript || viaApiOficial),
      backend: viaAppsScript ? 'apps_script' : viaApiOficial ? 'api_sheets' : null,
      modo: testOnly ? 'solo_pruebas' : 'acepta_consultas_reales',
      variables: {
        RF_BRIDGE_TOKEN: Boolean(expectedToken),
        RF_APPSSCRIPT_URL: Boolean(appsScriptUrl),
        RF_APPSSCRIPT_TOKEN: Boolean(appsScriptToken),
      },
    })
  }

  if (method !== 'POST') {
    return responder({ ok: false, error: 'method_not_allowed' }, 405)
  }

  if (!expectedToken || (!viaAppsScript && !viaApiOficial)) {
    console.error('rf-consulta: faltan variables de entorno')
    return responder({ ok: false, error: 'bridge_no_configurado' }, 500)
  }

  if (!tokenMatches(token, expectedToken)) {
    return responder({ ok: false, error: 'no_autorizado' }, 401)
  }

  if (jsonInvalido) {
    return responder({ ok: false, error: 'json_invalido' }, 400)
  }

  // El plugin arma el cuerpo desde un formulario y manda los valores como
  // texto. Se normalizan acá, en el borde, antes de validar.
  body = normalizeEnvelope(body)

  const errors = validateEnvelope(body)
  if (errors.length) {
    // Sin esto un 400 es mudo: Vercel registra el status pero no el cuerpo, y
    // averiguar qué campo falló cuesta otra ronda de pruebas contra Instagram.
    // Se registran los nombres y tipos de lo que llegó, nunca los valores:
    // el cuerpo trae datos personales del cliente.
    console.error(
      'rf-consulta contrato_invalido:',
      JSON.stringify({
        motivos: errors,
        recibido: describirForma(body),
      }),
    )
    return responder({ ok: false, error: 'contrato_invalido', detalle: errors }, 400)
  }

  if (testOnly && body.test !== true) {
    return responder(
      { ok: false, error: 'modo_test_only', detalle: 'el puente todavía no acepta consultas reales' },
      409,
    )
  }

  try {
    const sheets = viaAppsScript
      ? createAppsScriptClient({ url: appsScriptUrl, token: appsScriptToken })
      : createSheetsClient({
          token: await getAccessToken({ clientEmail, privateKey }),
          spreadsheetId,
        })

    // La identidad, cuando viene, reemplaza a los tres identificadores: el
    // contacto sale de una huella digital y el caso y la revisión los resuelve
    // el registro. El modelo no maneja ninguno de los tres.
    const porIdentidad = identificaPorIdentidad(body)
    const contactId = porIdentidad
      ? derivarContactId({ account: body.account, identidad: body.identidad })
      : body.contact_id

    if (body.operation === 'check_contact') {
      // La baja se consulta por contacto: preguntar solo por el caso dejaria
      // pasar a alguien que se dio de baja en una consulta anterior.
      const found = await findCase(sheets, {
        caseId: porIdentidad ? null : body.case_id || null,
        contactId,
      })
      const bajaDeLaFila = found.existing ? found.existing.noContactar : false
      return responder({
        ok: true,
        operation: 'check_contact',
        existe: Boolean(found.existing),
        no_contactar: found.contactBaja || bajaDeLaFila,
      })
    }

    const found = await findCase(sheets, {
      caseId: porIdentidad ? null : body.case_id,
      contactId,
    })

    // A partir de acá se trabaja con el sobre ya resuelto, venga como venga.
    const sobre = porIdentidad
      ? { ...body, contact_id: contactId, case_id: found.caso, revision: found.proximaRevision }
      : body

    const decision = decideWrite({
      existing: found.existing,
      contactBaja: found.contactBaja,
      envelope: sobre,
    })

    if (decision.action === 'skip') {
      return responder({
        ok: true,
        operation: 'upsert',
        aplicado: false,
        motivo: decision.reason,
        revision_guardada: decision.stored ?? null,
      })
    }

    const now = nowInArgentina()
    const values = buildRow({ envelope: sobre, now })

    let targetRow
    let data
    if (decision.action === 'insert') {
      if (found.firstFreeRow === -1) {
        console.error('rf-consulta: planilla sin filas libres')
        return responder({ ok: false, error: 'planilla_llena' }, 507)
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
        caseId: sobre.case_id,
        revision: sobre.revision,
        contactId: sobre.contact_id,
        now,
        noContactar: sobre.no_contactar === true,
      }),
    )

    const result = await sheets.batchUpdate(data)

    return responder({
      ok: true,
      operation: 'upsert',
      aplicado: true,
      accion: decision.action,
      fila: targetRow,
      caso: sobre.case_id,
      revision: sobre.revision,
      celdas: result.totalUpdatedCells ?? null,
    })
  } catch (error) {
    console.error('rf-consulta:', error.message)
    return responder({ ok: false, error: 'fallo_escritura' }, 502)
  }
}

/**
 * Adaptador al runtime de Node de Vercel, que entrega (req, res) y espera que
 * la respuesta se cierre con res.end(). Un handler de estilo web que devuelve
 * un Response deja el pedido colgado hasta que expira.
 */
export default async function handler(req, res) {
  let body = null
  let jsonInvalido = false

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const trozos = []
    for await (const trozo of req) trozos.push(trozo)
    const crudo = Buffer.concat(trozos).toString()
    if (crudo) {
      try {
        body = JSON.parse(crudo)
      } catch {
        jsonInvalido = true
      }
    }
  }

  const { status, cuerpo } = await procesar({
    method: req.method,
    token: readToken(req.headers),
    body,
    jsonInvalido,
  })

  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(cuerpo))
}
