export const config = { runtime: 'nodejs' }

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const buffers = [];
  for await (const chunk of request) {
    buffers.push(chunk);
  }
  const { nombre, nicho, descripcion } = JSON.parse(Buffer.concat(buffers).toString());

  if (!nombre || !nicho) {
    return new Response(JSON.stringify({ error: 'nombre y nicho son requeridos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = (process.env.ANTHROPIC_API_KEY || '').replace(/^"|"$/g, '').trim()
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
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

  console.log('=== PROMPT A CLAUDE ===\nSYSTEM:', body.system, '\nUSER:', body.messages[0].content, '\n======================')
  console.log('PROMPT ENVIADO:', JSON.stringify({nombre, nicho, descripcion}))

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
    console.error('ERROR ANTHROPIC:', response.status, errorBody)
    return new Response(JSON.stringify({ error: errorBody }), { status: 500 })
  }

  const data = await response.json()
  const text = data.content[0].text.trim()

  return new Response(text, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
