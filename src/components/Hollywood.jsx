import hollywood from '../assets/Gemini_Generated_Image_j16834j16834j168.png'

const cards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 6H24" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 23V10" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 15L14 10L19 15" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Una sola cuenta tiene un techo',
    desc: 'Depender de un único canal es poner todos los huevos en una canasta que no controlás.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14C4 14 8 8 14 8C20 8 24 14 24 14C24 14 20 20 14 20C8 20 4 14 4 14Z" stroke="#00C4CC" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="3" stroke="#00C4CC" strokeWidth="1.8" />
        <path d="M5 5L23 23" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'El contenido se crea pero nadie lo ve',
    desc: 'Sin distribución estratégica, el mejor contenido muere en el algoritmo.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 6V11M14 6L11 9M14 6L17 9" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 14H17M22 14L19 11M22 14L19 17" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 14H11M6 14L9 11M6 14L9 17" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Sin sistema, sin consistencia, sin resultados',
    desc: 'Publicar cuando hay tiempo no es una estrategia. Es esperar que algo funcione solo.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="#00C4CC" strokeWidth="1.8" />
        <path d="M7 22c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19 6L23 10M23 6L19 10" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: 'Los community managers murieron',
    desc: 'Una cuenta, un CM, una esperanza. No alcanza más.',
  },
]

export default function Hollywood() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hollywood})` }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,13,24,0.85) 0%, rgba(6,13,24,0.4) 60%, rgba(6,13,24,0.3) 100%)' }} />
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl md:text-7xl text-white leading-none mb-6" style={{ letterSpacing: '-0.02em' }}>
            Hollywood no<br />
            <span className="gradient-text">existe más.</span>
          </h2>
          <p className="text-gray text-lg md:text-xl leading-relaxed">
            Hoy cualquiera puede generar contenido,{' '}
            <span className="text-white font-semibold">pero nadie puede generarte a vos.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 card-hover"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
