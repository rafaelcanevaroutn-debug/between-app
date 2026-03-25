import Anthropic from '@anthropic-ai/sdk'

const FALLBACK = {
  Inmobiliarias: [
    { handle: '@tu_cuenta', nombre: 'Nombre principal', bio: 'Propiedades premium en tu ciudad. El mercado inmobiliario en tiempo real.', videos: ['5 errores al comprar tu primera propiedad', 'Cómo invertir con poco capital', 'El barrio que va a explotar este año'], enfoque: 'Cuenta principal' },
    { handle: '@tu_cuentainversiones', nombre: 'Inversiones', bio: 'Rentabilidad y oportunidades de inversión. Todo lo que necesitás saber.', videos: ['ROI real en propiedades 2026', 'Fideicomiso vs. compra directa', 'Cómo diversificar en real estate'], enfoque: 'Inversiones' },
    { handle: '@tu_cuentacasas', nombre: 'Casas', bio: 'Tu próximo hogar, acá. Propiedades seleccionadas para cada estilo de vida.', videos: ['Tour: casa 3 amb en Palermo', 'Qué preguntar antes de firmar', 'Cómo negociar el precio'], enfoque: 'Vivienda' },
    { handle: '@tu_cuentaluxury', nombre: 'Luxury', bio: 'Real estate de alto standing. Propiedades exclusivas para clientes exigentes.', videos: ['Penthouse en Recoleta', 'El mercado premium en números', 'Clientes de alto perfil: cómo captarlos'], enfoque: 'Premium' },
    { handle: '@tu_cuentatips', nombre: 'Tips', bio: 'Todo lo que nadie te cuenta del mercado. Consejos directos, sin filtro.', videos: ['Cómo detectar una mala inversión', 'Trucos de los brokers top', '3 preguntas que salvan negocios'], enfoque: 'Educación' },
  ],
  'Marca Personal': [
    { handle: '@tu_cuenta', nombre: 'Principal', bio: 'Tu historia, tu marca. Construyendo autoridad con autenticidad.', videos: ['Mi historia de 0 a experto', 'La decisión que cambió todo', 'Qué aprendí fallando'], enfoque: 'Narrativa' },
    { handle: '@tu_cuentapodcast', nombre: 'Podcast', bio: 'Conversaciones que importan. Ideas que transforman perspectivas.', videos: ['Ep. 1: El inicio del camino', 'Invitado especial: lección clave', 'Lo que no te contaron sobre crecer'], enfoque: 'Audio / Video largo' },
    { handle: '@tu_cuentamentorship', nombre: 'Mentorship', bio: 'Lo que aprendí en el camino. Lecciones reales para crecer.', videos: ['Cómo encontrar tu primer mentor', 'Preguntas que aceleran tu carrera', '30 días con un solo objetivo'], enfoque: 'Educación' },
    { handle: '@tu_cuentadaily', nombre: 'Daily', bio: 'Un día en mi vida. Rutinas, hábitos y decisiones que marcan la diferencia.', videos: ['Mi rutina matutina', 'Cómo organizo mi semana', 'Lo que consumo cada día'], enfoque: 'Lifestyle' },
    { handle: '@tu_cuentainsights', nombre: 'Insights', bio: 'Ideas que cambian perspectivas. Reflexiones sobre negocios y vida.', videos: ['La trampa del perfeccionismo', 'Por qué los mejores delegan', 'Foco vs. multitarea: el resultado'], enfoque: 'Pensamiento' },
  ],
  Gastronomía: [
    { handle: '@tu_cuenta', nombre: 'Principal', bio: 'Sabores que no se olvidan. Cocina auténtica con identidad propia.', videos: ['El plato que nos define', 'Una semana en cocina', 'Nuestro ingrediente secreto'], enfoque: 'Marca' },
    { handle: '@tu_cuentarecetas', nombre: 'Recetas', bio: 'Lo que sale de la cocina. Recetas exclusivas y técnicas de chef.', videos: ['Pasta en 10 minutos', 'Cómo hacer el caldo perfecto', '3 salsas que cambian todo'], enfoque: 'Recetas' },
    { handle: '@tu_cuentabehind', nombre: 'Behind', bio: 'El detrás de escena. Lo que pasa antes de que llegue a tu mesa.', videos: ['Preparamos 300 platos en un día', 'El mise en place del chef', 'Una noche de sábado en cocina'], enfoque: 'BTS' },
    { handle: '@tu_cuentachef', nombre: 'Chef', bio: 'La mente detrás del menú. Filosofía, proceso y pasión culinaria.', videos: ['Por qué elegí la gastronomía', 'Mi filosofía de cocina', 'El error que me enseñó más'], enfoque: 'Persona' },
    { handle: '@tu_cuentacultura', nombre: 'Cultura', bio: 'Comer bien es un estilo de vida. Gastronomía, viajes y experiencias.', videos: ['Los mejores mercados de LATAM', 'Comida callejera que vale la pena', 'Maridaje para no expertos'], enfoque: 'Estilo de vida' },
  ],
  Startups: [
    { handle: '@tu_cuenta', nombre: 'Principal', bio: 'Construyendo el futuro desde cero. Startup life sin filtros.', videos: ['Cómo nació esta startup', 'Semana 1 vs. semana 52', 'La reunión que lo cambió todo'], enfoque: 'Historia' },
    { handle: '@tu_cuentabuild', nombre: 'Build', bio: 'El proceso de crear algo nuevo. Cada decisión, cada iteración.', videos: ['Cómo validamos nuestra idea', 'MVP en 2 semanas: qué hicimos', 'La feature que los usuarios amaron'], enfoque: 'Producto' },
    { handle: '@tu_cuentafounder', nombre: 'Founder', bio: 'Lo que no te enseñan en libros. La verdad del emprendimiento.', videos: ['Cómo levanté mi primera ronda', 'El momento en que quise tirar todo', 'Mis 5 errores de founder'], enfoque: 'Founder journey' },
    { handle: '@tu_cuentagrowth', nombre: 'Growth', bio: 'Estrategias que escalan. De 0 a tracción real, paso a paso.', videos: ['De 0 a 1000 usuarios sin ads', 'El canal que más nos funcionó', 'Cómo medimos lo que importa'], enfoque: 'Crecimiento' },
    { handle: '@tu_cuentatech', nombre: 'Tech', bio: 'Tecnología para humanos. Innovación accesible y con impacto.', videos: ['El stack que elegimos y por qué', 'IA en producción: lo real', 'Cómo automatizamos con 0 presupuesto'], enfoque: 'Tecnología' },
  ],
  Fitness: [
    { handle: '@tu_cuenta', nombre: 'Principal', bio: 'Tu transformación empieza hoy. Método, constancia y resultados reales.', videos: ['Mi transformación en 90 días', 'Por qué fallás en el gym', 'El hábito que lo cambia todo'], enfoque: 'Transformación' },
    { handle: '@tu_cuentatraining', nombre: 'Training', bio: 'Métodos que dan resultados. Entrenamientos probados y efectivos.', videos: ['Rutina full body sin equipos', 'Cómo progresar cada semana', 'Los ejercicios que más trabajan'], enfoque: 'Entrenamiento' },
    { handle: '@tu_cuentanutricion', nombre: 'Nutrición', bio: 'Come bien, rendí mejor. Nutrición funcional para rendimiento.', videos: ['Qué como en un día de entreno', 'Proteína: cuánta y cuándo', 'Meal prep en 30 minutos'], enfoque: 'Nutrición' },
    { handle: '@tu_cuentamindset', nombre: 'Mindset', bio: 'El músculo más importante. Mentalidad ganadora para cada objetivo.', videos: ['Cómo mantener la motivación', 'Lo que separa a los que logran', 'Disciplina vs. motivación'], enfoque: 'Mental' },
    { handle: '@tu_cuentarutinas', nombre: 'Rutinas', bio: 'Consistencia sobre intensidad. Hábitos que construyen cuerpos.', videos: ['Mi rutina matutina fitness', 'Cómo organizo mi semana de entreno', '30 días de disciplina: resultado'], enfoque: 'Hábitos' },
  ],
}

export async function generateEcosystem({ nombre, nicho, descripcion }) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey || apiKey === 'your-api-key-here') {
    return getFallback(nombre, nicho)
  }

  try {
    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

    const response = await client.messages.create({
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
    })

    const raw = response.content[0].text.trim()
    const parsed = JSON.parse(raw)

    if (!parsed.cuentas || parsed.cuentas.length !== 5) {
      return getFallback(nombre, nicho)
    }

    return parsed.cuentas

  } catch (err) {
    console.warn('API error, usando fallback:', err.message)
    return getFallback(nombre, nicho)
  }
}

function getFallback(nombre, nicho) {
  const base = FALLBACK[nicho] || FALLBACK['Marca Personal']
  const slug = nombre.toLowerCase().replace(/\s+/g, '').slice(0, 12)
  return base.map((c, i) => ({
    ...c,
    handle: i === 0 ? `@${slug}` : `@${slug}${c.handle.replace('@tu_cuenta', '')}`,
  }))
}
