/**
 * Cliente contra la app web de Apps Script.
 *
 * Existe porque muchas organizaciones de Google bloquean por defecto la
 * creación de claves de cuenta de servicio (`iam.disableServiceAccountKeyCreation`,
 * parte de "Secure by default"). Sin clave no hay forma de firmar el JWT y la
 * API de Sheets queda fuera de alcance.
 *
 * Apps Script no tiene ese problema: corre con la cuenta del dueño de la
 * planilla, sin credenciales que administrar. El motivo por el que no servía
 * al principio era que `doPost(e)` no lee headers HTTP, y HelpKnow sólo
 * autentica por header. Con Vercel en el medio deja de importar: HelpKnow
 * autentica contra Vercel por header, y Vercel autentica contra Apps Script
 * con un secreto en el cuerpo, que Apps Script sí lee.
 *
 *   HelpKnow --header--> Vercel --secreto en el body--> Apps Script --> planilla
 *
 * Expone la misma interfaz que el cliente de la API oficial, así que la lógica
 * de negocio de arriba no se entera de cuál de los dos está usando.
 */

/**
 * Apps Script responde siempre 200: no puede fijar códigos de estado. El
 * resultado real viaja en el cuerpo, así que los errores se levantan acá.
 */
async function llamar(url, token, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // redirect: Apps Script contesta con un 302 hacia googleusercontent.com.
    redirect: 'follow',
    body: JSON.stringify({ token, ...payload }),
  })

  if (!response.ok) {
    throw new Error(`Apps Script respondió ${response.status}`)
  }

  const texto = await response.text()
  let data
  try {
    data = JSON.parse(texto)
  } catch {
    // Cuando el script falla al cargar, Apps Script devuelve una página HTML
    // de error en lugar de JSON.
    throw new Error(`Apps Script no devolvió JSON: ${texto.slice(0, 200)}`)
  }

  if (!data.ok) {
    throw new Error(`Apps Script: ${data.error || 'error desconocido'}`)
  }
  return data
}

export function createAppsScriptClient({ url, token }) {
  return {
    /** Lee varios rangos en una sola llamada. */
    async getMany(ranges) {
      const data = await llamar(url, token, { op: 'get', ranges })
      return data.values
    },

    /** Escribe varios rangos en una sola llamada. */
    async batchUpdate(data) {
      if (!data.length) return { totalUpdatedCells: 0 }
      const res = await llamar(url, token, { op: 'update', data })
      return { totalUpdatedCells: res.updatedCells }
    },
  }
}
