const PLANS = [
  {
    name: 'Starter',
    price: 'USD 300',
    badge: null,
    highlight: false,
    items: [
      '5 canales activos en TikTok',
      '300 videos distribuidos por mes',
      'Clipeo con IA incluido',
      'Estrategia por canal',
      'Guiones semanales para grabarte solo',
      'Materiales y estructura para grabar tus crudos',
      'Reporte semanal',
      'Canales = activos de Between',
    ],
    cta: 'Empezar con Starter',
  },
  {
    name: 'Growth',
    price: 'USD 700',
    badge: 'RECOMENDADO',
    highlight: true,
    items: [
      'Todo lo del plan Starter',
      '2 sesiones de grabación por Meet/mes',
      '2 sesiones presenciales/mes',
      'Edición y producción incluida',
      'Estrategia avanzada por canal',
    ],
    cta: 'Empezar con Growth',
  },
  {
    name: 'Scale',
    price: 'USD 1.000',
    badge: null,
    highlight: false,
    items: [
      'Todo lo del plan Growth',
      'Set de producción completo',
      'Equipo dedicado',
      'Dashboard de métricas en tiempo real',
      'Between Growth — acceso anticipado',
    ],
    cta: 'Empezar con Scale',
  },
]

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
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">Precios</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Elegí tu plan</h2>
          <p className="text-gray mt-4 text-lg">Sin contratos largos. Sin sorpresas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-3xl p-8 flex flex-col transition-all duration-300"
              style={{
                background: plan.highlight ? '#0A1628' : '#0A1628',
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
                  className="text-sm font-semibold uppercase tracking-widest mb-2"
                  style={{ color: plan.highlight ? '#00C4CC' : '#7A9AB0' }}
                >
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-gray mb-1">/mes</span>
                </div>
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

              {/* CTA */}
              <a
                href="#contacto"
                className="mt-8 px-6 py-3 rounded-full text-sm font-semibold text-center block transition-all duration-300"
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
                {plan.cta}
              </a>

              {/* Calendly secondary */}
              <a
                href="https://calendly.com/rafaelcanevaroutn"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs font-medium text-center block transition-colors duration-200"
                style={{ color: '#7A9AB0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00C4CC'}
                onMouseLeave={e => e.currentTarget.style.color = '#7A9AB0'}
              >
                Agendá una llamada gratuita →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
