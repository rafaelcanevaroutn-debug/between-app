/**
 * Genera el ecosistema de cuentas que muestra el simulador de la landing.
 *
 * Escrito con la forma que espera el runtime de Node de Vercel: recibe
 * (req, res) y cierra la respuesta con res.end(). Un handler de estilo web
 * que devuelve un Response deja el pedido colgado hasta que expira.
 */

export const config = { runtime: 'nodejs' }

function responder(res, status, cuerpo, tipo = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': tipo })
  res.end(typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return responder(res, 405, 'Method not allowed', 'text/plain; charset=utf-8')
  }

  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  let entrada
  try {
    entrada = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    return responder(res, 400, { error: 'cuerpo inválido' })
  }

  const { nombre, nicho, descripcion } = entrada

  if (!nombre || !nicho) {
    return responder(res, 400, { error: 'nombre y nicho son requeridos' })
  }

  const apiKey = (process.env.ANTHROPIC_API_KEY || '').replace(/^"|"$/g, '').trim()
  if (!apiKey) {
    return responder(res, 500, { error: 'API key no configurada' })
  }

  const body = {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    system: 'Sos un estratega de contenido para Between. Respondé SOLO en JSON válido, sin markdown ni backticks.',
    messages: [
      {
        role: 'user',
        content: `Generá un ecosistema de 5 cuentas de TikTok para una persona con estas características:
- Nombre: ${nombre}
- Actividad/Profesión: ${descripcion || 'No especificada'}
- Nicho de contenido: ${nicho}

IMPORTANTE: Las bios, nombres de canales y títulos de videos DEBEN ser específicos a "${descripcion || nicho}". No uses frases genéricas. Si es profe de matemáticas, los canales hablan de matemáticas, ejercicios, aprendizaje, etc.

Devolvé este JSON:
{
  "cuentas": [
    {
      "handle": "@handle_basado_en_nombre_max20chars",
      "nombre": "Nombre corto que combine nombre + enfoque específico",
      "bio": "Bio de max 80 chars específica a su profesión/actividad",
      "videos": ["título 1", "título 2", "título 3", "título 4", "título 5", "título 6"],
      "enfoque": "3 palabras del enfoque"
    }
  ]
}`,
      },
    ],
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('generate: la API respondió', response.status, errorBody.slice(0, 300))
      return responder(res, 502, { error: 'no se pudo generar el ecosistema' })
    }

    const data = await response.json()
    const text = data.content[0].text.trim()

    return responder(res, 200, text)
  } catch (error) {
    console.error('generate:', error.message)
    return responder(res, 502, { error: 'no se pudo generar el ecosistema' })
  }
}
