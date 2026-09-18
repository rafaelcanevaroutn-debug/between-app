/**
 * Cliente mínimo de Google Sheets con service account.
 *
 * Firma el JWT con crypto de Node y habla HTTP directo contra la API, sin
 * agregar googleapis al bundle. La hoja se comparte únicamente con el email
 * del service account: nunca con "Cualquier persona con el enlace".
 */

import crypto from 'node:crypto'

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets'
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets'

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

/** Arma y firma el JWT de service account. */
function signAssertion({ clientEmail, privateKey }) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  )
  const signingInput = `${header}.${claims}`
  const signature = crypto.createSign('RSA-SHA256').update(signingInput).sign(privateKey, 'base64url')
  return `${signingInput}.${signature}`
}

/**
 * Cambia el JWT por un access token. Se pide uno por invocación: las
 * funciones de Vercel son efímeras y cachearlo no aporta.
 */
export async function getAccessToken({ clientEmail, privateKey }) {
  const assertion = signAssertion({ clientEmail, privateKey })
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`no se pudo obtener access token: ${response.status} ${detail.slice(0, 300)}`)
  }
  const data = await response.json()
  return data.access_token
}

export function createSheetsClient({ token, spreadsheetId }) {
  async function call(path, { method = 'GET', body } = {}) {
    const response = await fetch(`${SHEETS_API}/${spreadsheetId}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (!response.ok) {
      const detail = await response.text()
      throw new Error(`Sheets ${method} ${path}: ${response.status} ${detail.slice(0, 300)}`)
    }
    return response.json()
  }

  return {
    /** Lee un rango en notación A1. Devuelve filas, sin rellenar los huecos. */
    async getValues(range) {
      const data = await call(`/values/${encodeURIComponent(range)}`)
      return data.values || []
    },

    /** Escribe varios rangos en una sola llamada atómica. */
    async batchUpdate(data) {
      if (!data.length) return { totalUpdatedCells: 0 }
      return call('/values:batchUpdate', {
        method: 'POST',
        body: { valueInputOption: 'RAW', data },
      })
    },
  }
}
