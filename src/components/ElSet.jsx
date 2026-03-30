const pasos = [
  {
    num: '01',
    label: 'Contás tu historia',
    desc: 'Te pasamos preguntas y ángulos para que sepas qué grabar. Nos juntamos por Meet o presencialmente. Podés mandarnos crudos o editados, nosotros clippeamos todo.',
    side: 'left',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6h20v14H2zM7 6V4M17 6V4" />
        <path d="M2 10h20" />
        <path d="M7 2h10" strokeWidth="2.5" />
        <path d="M7 6l2-4M12 6l2-4M17 6l2-4" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Lo convertimos en contenido',
    desc: 'Nuestro equipo edita, adapta y produce todo listo para distribuir en múltiples canales y formatos.',
    side: 'right',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
        <path d="M2 8h20M2 16h20M8 4v16M16 4v16" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Tu contenido se mueve todos los días',
    desc: 'Un sistema de canales distribuye tu historia constantemente. Sin que vos tengas que hacer nada más.',
    side: 'left',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8a9 9 0 0 1 0 8" strokeDasharray="2 2" />
      </svg>
    ),
  },
]

export default function ElSet() {
  return (
    <section id="como-funciona" className="py-24 dot-grid overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-16">

        {/* Título */}
        <div className="text-center mb-20">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-4">El proceso</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1, letterSpacing: '0.04em', color: '#fff', margin: 0 }}>
            BIENVENIDO AL SET.<br />
            <span style={{ background: 'linear-gradient(135deg, #00C4CC, #00A889)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              NOSOTROS DIRIGIMOS.
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea central vertical */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0"
            style={{ width: 2, background: 'linear-gradient(to bottom, transparent, #00C4CC 10%, #00C4CC 90%, transparent)' }}
          />

          <div className="flex flex-col gap-16">
            {pasos.map(({ num, label, desc, side, icon }) => {
              const isLeft = side === 'left'
              return (
                <div key={num} className="relative flex items-center">

                  {/* Dot en la línea */}
                  <div
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
                    style={{
                      width: 14, height: 14,
                      borderRadius: '50%',
                      background: '#00C4CC',
                      boxShadow: '0 0 16px rgba(0,196,204,0.7)',
                    }}
                  />

                  {/* Contenido — alterna izq/der en desktop */}
                  <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}`}>
                    <div
                      style={{
                        background: 'rgba(10,22,40,0.8)',
                        border: '1px solid rgba(0,196,204,0.2)',
                        borderRadius: '16px',
                        padding: '24px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {/* Número + icono */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', fontWeight: 400, color: '#00C4CC', lineHeight: 1 }}>
                          {num}
                        </span>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 48, height: 48,
                          background: 'rgba(0,196,204,0.12)',
                          borderRadius: '10px',
                          boxShadow: '0 0 14px rgba(0,196,204,0.2)',
                          flexShrink: 0,
                        }}>
                          {icon}
                        </div>
                      </div>

                      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', fontWeight: 400, color: '#fff', letterSpacing: '0.04em', margin: '0 0 8px' }}>
                        {label}
                      </h3>
                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Frase final + CTA */}
        <div className="mt-20 text-center">
          <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'rgba(255,255,255,0.55)', marginBottom: 28 }}>
            Vos construís.{' '}
            <span style={{ color: '#fff', fontWeight: 600 }}>Nosotros hacemos que el mundo lo vea.</span>
          </p>
          <a
            href="#contacto"
            className="inline-block px-10 py-4 rounded-full text-base font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, #00C4CC, #00A889)',
              boxShadow: '0 0 20px rgba(0,196,204,0.35)',
            }}
          >
            Quiero entrar al set
          </a>
        </div>

      </div>
    </section>
  )
}
