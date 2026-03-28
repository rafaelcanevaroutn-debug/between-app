const PLANS = [
  {
    name: 'Base',
    badge: null,
    highlight: false,
    items: [
      '3 cuentas activas',
      '2 videos/día/cuenta',
      'Clippeo incluido',
      'Preguntas y ángulos para grabarte solo',
      'Estrategia por canal',
      'Reporte mensual',
      '1 entrevista/mes por Meet',
    ],
  },
  {
    name: 'Growth',
    badge: 'RECOMENDADO',
    highlight: true,
    items: [
      '5 cuentas activas',
      '3 videos/día/cuenta',
      'Todo Base incluido',
      '2 entrevistas/mes por Meet',
      'Estrategia avanzada por canal',
    ],
  },
  {
    name: 'Studio',
    badge: null,
    highlight: false,
    items: [
      '10 cuentas activas',
      '3-5 videos/día/cuenta',
      'Todo Growth incluido',
      'Grabaciones presenciales',
      'Equipo dedicado',
      'Dashboard de métricas en tiempo real',
    ],
  },
]

const CALENDLY = 'https://calendly.com/rafaelcanevaroutn'
const WHATSAPP = 'https://wa.me/5493815971971'

function Check({ highlight }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="9" fill={highlight ? 'rgba(0,196,204,0.15)' : 'rgba(0,196,204,0.08)'} />
      <path d="M5 9L7.5 11.5L13 6.5" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Planes() {
  return (
    <section id="planes" className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">Planes</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Elegí tu plan</h2>
          <p className="text-gray mt-4 text-lg">Sin contratos largos. Sin sorpresas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-3xl p-8 flex flex-col"
              style={{
                background: '#0A1628',
                border: plan.highlight ? '2px solid #00C4CC' : '1px solid #122030',
                boxShadow: plan.highlight ? '0 0 40px rgba(0,196,204,0.2)' : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="px-5 py-1.5 rounded-full text-xs font-bold text-white tracking-wider uppercase"
                    style={{ background: 'linear-gradient(135deg,#00C4CC,#00A889)' }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <p
                  className="text-sm font-semibold uppercase tracking-widest"
                  style={{ color: plan.highlight ? '#00C4CC' : '#7A9AB0' }}
                >
                  {plan.name}
                </p>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-3 flex-1">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: '#7A9AB0' }}>
                    <Check highlight={plan.highlight} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-semibold text-center block transition-all duration-300"
                  style={
                    plan.highlight
                      ? { background: 'linear-gradient(135deg,#00C4CC,#00A889)', color: '#fff', boxShadow: '0 0 20px rgba(0,196,204,0.3)' }
                      : { border: '1px solid #00C4CC', color: '#00C4CC' }
                  }
                  onMouseEnter={e => {
                    if (!plan.highlight) e.currentTarget.style.background = 'rgba(0,196,204,0.08)'
                    else e.currentTarget.style.boxShadow = '0 0 32px rgba(0,196,204,0.5)'
                  }}
                  onMouseLeave={e => {
                    if (!plan.highlight) e.currentTarget.style.background = 'transparent'
                    else e.currentTarget.style.boxShadow = '0 0 20px rgba(0,196,204,0.3)'
                  }}
                >
                  Agendá una charla →
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full text-sm font-semibold text-center block transition-colors duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  Escribinos →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
