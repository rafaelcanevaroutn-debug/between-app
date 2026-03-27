export const config = { runtime: 'edge' }

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const { nombre, nicho, descripcion } = await request.json()

  if (!nombre || !nicho) {
    return new Response(JSON.stringify({ error: 'nombre y nicho son requeridos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = {
    model: 'claude-haiku-4-5',
    max_tokens: 1500,
    system: 'Sos un estratega de contenido para Between, un estudio de marca personal. Respondé SOLO en JSON válido, sin markdown ni backticks.',
    messages: [
      {
        role: 'user',
        content: `Generá un ecosistema de 5 cuentas de TikTok para:
Nombre: ${nombre}
Nicho: ${nicho}
Descripción: ${descripcion || 'No especificada'}

Devolvé exactamente este JSON con handles creativos y específicos para el nicho (en minúsculas, sin espacios, máximo 20 chars):
{
  "cuentas": [
    {
      "handle": "@handle_sin_espacios",
      "nombre": "Nombre visible corto",
      "bio": "Bio corta de máximo 80 caracteres que describa el canal",
      "videos": ["Título video 1 corto", "Título video 2 corto", "Título video 3 corto"],
      "enfoque": "Descripción del enfoque en 3 palabras"
    }
  ]
}

Importante: los handles deben derivar del nombre "${nombre}" + sufijo del nicho. Los títulos de videos deben ser específicos para "${nicho}".`,
      },
    ],
  }

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
    return new Response(JSON.stringify({ error: 'Error al llamar a Anthropic' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = await response.json()
  const text = data.content[0].text.trim()

  return new Response(text, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
