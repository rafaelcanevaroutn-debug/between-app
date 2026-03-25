const pasos = [
  {
    num: '01',
    label: 'Set de producción',
    desc: 'Venís a nuestro set. Grabamos todo en un solo día.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="7" width="22" height="16" rx="2" stroke="#00C4CC" strokeWidth="1.8" />
        <path d="M25 12L29 10V22L25 20" stroke="#00C4CC" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="14" cy="15" r="3" stroke="#00C4CC" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Producción',
    desc: 'Nuestro equipo edita, adapta y produce todo el contenido.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26L10 22L14 26L18 18L22 24L26 12" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="#00C4CC" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Distribución',
    desc: 'Publicamos en todos tus canales con estrategia y timing.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="6" cy="10" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="26" cy="10" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="6" cy="22" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="26" cy="22" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <path d="M9 10.5L13 14M19 14L23 10.5M9 21.5L13 18M19 18L23 21.5" stroke="#00C4CC" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Crecimiento',
    desc: 'Medimos, ajustamos y escalamos tu ecosistema de canales.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 24L10 16L16 20L22 10L28 6" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6H28V12" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">El proceso</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Entrá al set.{' '}
            <span className="gradient-text">Nosotros dirigimos.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-px bg-gradient-to-r from-cyan to-green opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {pasos.map(({ num, label, desc, icon }, i) => (
              <div key={num} className="relative flex flex-col items-center text-center">
                {/* Mobile connector */}
                {i < pasos.length - 1 && (
                  <div className="md:hidden absolute left-1/2 top-[72px] w-px h-8 bg-gradient-to-b from-cyan to-green opacity-30" />
                )}

                {/* Icon circle */}
                <div className="relative w-16 h-16 rounded-full bg-card border-2 border-border flex items-center justify-center mb-5 z-10">
                  {icon}
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-cyan bg-bg border border-cyan/40 rounded-full w-6 h-6 flex items-center justify-center">
                    {num}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{label}</h3>
                <p className="text-gray text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
