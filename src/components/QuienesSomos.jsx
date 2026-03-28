import fotoperfil from '../assets/fotoperfil.jpg'

const STATS = [
  { value: '5.000+', label: 'usuarios orgánicos' },
  { value: '9', label: 'clientes gestionados' },
  { value: '2', label: 'startups construidas' },
]

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

export default function QuienesSomos() {
  return (
    <section className="pt-40 pb-28 dot-grid" style={{ background: '#060D18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 items-start">

          {/* LEFT — foto + stats */}
          <div className="flex flex-col items-center gap-6">

            {/* Foto circular con ring */}
            <div
              className="p-[3px] rounded-full"
              style={{
                background: 'linear-gradient(135deg, #00C4CC, #00A889)',
                boxShadow: '0 0 40px rgba(0,196,204,0.25)',
              }}
            >
              <div
                className="rounded-full overflow-hidden"
                style={{ width: 280, height: 280 }}
              >
                <img
                  src={fotoperfil}
                  alt="Rafael Canevaro"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Nombre + título + ubicación */}
            <div className="text-center">
              <h3 className="text-2xl font-extrabold text-white mb-1">Rafael Canevaro</h3>
              <p className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: '#00C4CC' }}>
                Founder @ Between
              </p>
              <p className="text-sm" style={{ color: '#7A9AB0' }}>Tucumán, Argentina · 24 años</p>
            </div>

            {/* Links sociales */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/rafael-canevaro-940905242"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{ color: '#00C4CC' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(0,196,204,0.6))' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#00C4CC'; e.currentTarget.style.filter = 'none' }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.instagram.com/rafacanevaro"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{ color: '#00C4CC' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(0,196,204,0.6))' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#00C4CC'; e.currentTarget.style.filter = 'none' }}
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>

            {/* Stats pills */}
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                  style={{ background: '#0A1628', border: '1px solid #122030' }}
                >
                  <span className="font-extrabold text-sm" style={{ color: '#00C4CC' }}>{value}</span>
                  <span className="text-xs" style={{ color: '#7A9AB0' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — texto */}
          <div className="flex flex-col justify-center lg:pt-16">
            <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-4">Quién soy</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
              La historia{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00C4CC, #00A889)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                detrás.
              </span>
            </h2>

            <p className="text-base leading-relaxed mb-8" style={{ color: '#7A9AB0', maxWidth: 580 }}>
              Construí mi primera startup de cero — una plataforma de comunidades deportivas que salía a la montaña cada fin de semana con gente real. Sin pauta, sin inversión. Solo contenido orgánico y comunidad genuina. Después estuve del otro lado: operando distribución de contenido para múltiples marcas y negocios en simultáneo. Aprendí exactamente qué funciona, qué no, y por qué la mayoría de los servicios fallan. Between nació de eso. No es una agencia. Es lo que yo hubiera querido tener cuando estaba construyendo.
            </p>

            <p className="mb-10 text-base font-medium italic" style={{ color: '#00C4CC' }}>
              — Rafa, Founder
            </p>

            {/* Thinking subsección */}
            <div
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ background: '#0A1628', border: '1px solid #122030', maxWidth: 580 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00C4CC' }}>Thinking</p>
              <p className="text-sm leading-relaxed" style={{ color: '#7A9AB0' }}>
                Lo que pasa por mi cabeza mientras construyo.
              </p>
              <a
                href="https://substack.com/@rafaelcanevaroutn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 self-start"
                style={{ color: '#00C4CC' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#00C4CC'}
              >
                Leer en Substack →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
