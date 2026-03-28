function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-label="TikTok">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.79 1.53V6.78a4.85 4.85 0 01-1.02-.09z"/>
    </svg>
  )
}

function ReelsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-label="Instagram Reels">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#fff" strokeWidth="1.8" fill="none"/>
      <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" fill="none"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954" aria-label="Spotify">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.424c-.176.27-.545.354-.815.176-2.23-1.363-5.044-1.67-8.355-.914-.317.072-.634-.128-.706-.445-.072-.317.128-.634.445-.706 3.623-.827 6.734-.47 9.255 1.058.27.177.354.546.176.831zm1.2-2.67c-.22.337-.677.443-1.013.223-2.553-1.569-6.444-2.024-9.464-1.107-.392.12-.805-.1-.925-.49-.12-.392.1-.806.49-.924 3.45-1.047 7.741-.539 10.682 1.258.337.22.443.678.222 1.04h.008zm.103-2.78c-3.06-1.817-8.107-1.983-11.024-1.097-.467.142-.96-.12-1.101-.588-.142-.468.12-.961.588-1.101 3.353-1.017 8.928-.821 12.454 1.268.424.25.562.797.312 1.22-.25.423-.797.561-1.22.311l-.009-.013z"/>
    </svg>
  )
}

const pasos = [
  {
    num: '01',
    label: 'Contás tu historia',
    desc: 'Te pasamos preguntas y ángulos para que sepas qué grabar. Nos juntamos por Meet o presencialmente si hay alguien en tu ciudad. Podés mandarnos crudos o editados, nosotros clippeamos todo.',
  },
  {
    num: '02',
    label: 'Lo convertimos en contenido',
    desc: 'Nuestro equipo edita, adapta y produce todo listo para distribuir.',
  },
  {
    num: '03',
    label: 'Tu contenido se mueve todos los días',
    desc: 'Un sistema de canales distribuye tu historia constantemente. Sin que vos tengas que hacer nada más.',
  },
]

const onboarding = [
  {
    label: 'Tu historia',
    desc: 'Traés quien sos. Nosotros lo convertimos en contenido auténtico.',
  },
  {
    label: 'Tu nicho',
    desc: 'Definimos tu posicionamiento y construimos tu autoridad.',
  },
  {
    label: 'Tu banda sonora',
    desc: 'Integramos Spotify y tu música para crear una identidad sonora única.',
    badge: 'Spotify',
  },
  {
    label: 'Acción',
    desc: 'Grabamos, editamos y publicamos. Vos solo tenés que aparecer.',
  },
]

export default function ElSet() {
  return (
    <section id="como-funciona" className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Title */}
        <div className="mb-16">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">El proceso</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Bienvenido al set.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00C4CC, #00A889)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Nosotros dirigimos.
            </span>
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-12">
          {/* Left — proceso */}
          <div>
            <p className="text-xs text-gray font-semibold uppercase tracking-widest mb-8 border-b border-border pb-3">
              Cómo funciona
            </p>
            <div className="flex flex-col gap-8">
              {pasos.map(({ num, label, desc }) => (
                <div key={num} className="flex gap-5">
                  <span
                    className="text-sm font-mono font-bold shrink-0 mt-1"
                    style={{ color: '#00C4CC' }}
                  >
                    {num}
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{label}</h3>
                    <p className="text-gray text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden md:block w-px self-stretch"
            style={{ background: 'linear-gradient(to bottom, transparent, #00C4CC, #00A889, transparent)' }}
          />

          {/* Right — onboarding */}
          <div>
            <p className="text-xs text-gray font-semibold uppercase tracking-widest mb-8 border-b border-border pb-3 mt-12 md:mt-0">
              Tu onboarding
            </p>
            <div className="flex flex-col gap-8">
              {onboarding.map(({ label, desc, badge }) => (
                <div key={label} className="flex gap-5">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                    style={{ background: 'linear-gradient(135deg, #00C4CC, #00A889)' }}
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg">{label}</h3>
                      {badge && (
                        <span className="flex items-center gap-1 rounded-full px-2 py-0.5"
                          style={{ background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.35)' }}>
                          <SpotifyIcon />
                          <span style={{ color: '#1DB954', fontSize: 10, fontWeight: 700 }}>{badge}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
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
          <p
            className="mt-8 text-lg md:text-xl font-semibold"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Vos construís.{' '}
            <span className="text-white">Nosotros hacemos que el mundo lo vea.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
