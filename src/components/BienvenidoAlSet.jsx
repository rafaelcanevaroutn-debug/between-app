const cards = [
  {
    label: 'Tu historia',
    desc: 'Traés quien sos. Nosotros lo convertimos en contenido auténtico.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 6H24C25.105 6 26 6.895 26 8V26L22 23L18 26L14 23L10 26L6 23V8C6 6.895 6.895 6 8 6Z" stroke="#00C4CC" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M11 13H21M11 17H17" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Tu nicho',
    desc: 'Definimos tu posicionamiento y construimos tu autoridad.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="16" cy="16" r="5" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="16" cy="16" r="2" fill="#00C4CC" />
      </svg>
    ),
  },
  {
    label: 'Tu banda sonora',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M12 25V10L26 8V23" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="25" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="23" cy="23" r="3" stroke="#00C4CC" strokeWidth="1.8" />
      </svg>
    ),
    desc: 'Integramos Spotify y tu música para crear una identidad sonora única.',
    badge: 'Spotify',
  },
  {
    label: 'Acción',
    desc: 'Grabamos, editamos y publicamos. Vos solo tenés que aparecer.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#00C4CC" strokeWidth="1.8" />
        <path d="M13 10L22 16L13 22V10Z" stroke="#00C4CC" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function BienvenidoAlSet() {
  return (
    <section className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">El set te espera</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Bienvenido al{' '}
            <span className="gradient-text">set.</span>
          </h2>
          <p className="text-gray mt-4 text-lg max-w-xl mx-auto">
            Todo lo que necesitás para construir tu ecosistema de contenido está acá.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map(({ label, desc, icon, badge }) => (
            <div
              key={label}
              className="card-hover bg-card border border-border rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="p-3 rounded-xl bg-bg border border-border w-fit">
                {icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold text-lg">{label}</h3>
                  {badge && (
                    <span className="text-[10px] font-bold text-green bg-green/10 border border-green/30 rounded-full px-2 py-0.5">
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-gray text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#contacto"
            className="btn-gradient inline-block px-10 py-4 rounded-full text-base font-semibold text-white"
          >
            Quiero entrar al set
          </a>
        </div>
      </div>
    </section>
  )
}
