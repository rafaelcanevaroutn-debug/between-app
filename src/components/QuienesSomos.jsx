import fotoperfilRafa from '../assets/fotoperfil.jpg'
import fotoperfilMatias from '../assets/fotoperfil2.jpg'

const DATOS_FOUNDERS = [
  {
    nombre: "Rafael Canevaro",
    titulo: "Co-founder @ Between",
    ubicacion: "Tucumán, Argentina",
    edad: 24,
    img: fotoperfilRafa,
    redes: {
      linkedin: "https://linkedin.com/in/rafael-canevaro-940905242",
      instagram: "https://instagram.com/rafacanevaro",
    },
  },
  {
    nombre: "Matias Piovesan",
    titulo: "Co-founder @ Between",
    ubicacion: "Tucumán, Argentina",
    edad: 31,
    img: fotoperfilMatias,
    redes: {
      linkedin: "https://www.linkedin.com/in/matias-garcia-piovesan-341266147/",
      instagram: "https://instagram.com/matiaspiovesan.16",
    },
  },
];

const HISTORIACOPY = ["Somos Rafa y Matías. Co-fundamos Trivo, una plataforma deportiva que creció a miles de usuarios en menos de tres meses sin pauta. Lo que nos enseñó Trivo no fue el producto — fue que el contenido bien distribuido es el motor real de cualquier negocio. Cerramos Trivo, nos quedamos con ese aprendizaje y construimos Between."]

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

export default function QuienesSomos() {
  return (
    <section className="pt-28 md:pt-40 pb-16 md:pb-28 dot-grid" style={{ background: '#060D18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="flex flex-col gap-10 lg:gap-16 items-center">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Badge */}
            <div>
              <span style={{
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em',
                padding: '4px 14px', borderRadius: 999,
                border: '1px solid rgba(0,196,204,0.4)', color: '#00C4CC',
                background: 'rgba(0,196,204,0.06)', textTransform: 'uppercase',
              }}>
                Quienes somos
              </span>
            </div>

            {/* Título */}
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '0.04em', color: '#fff', margin: 0, lineHeight: 1.05 }}>
              LA HISTORIA DETRÁS.
            </h2>

            {/* Texto */}
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
              {HISTORIACOPY}
            </p>
          </div>

          {/* ── IZQUIERDA ── */}
          <div className='flex gap-[90px] flex-wrap items-center justify-center'>
            {DATOS_FOUNDERS.map((founder) => (
              <div key={founder.nombre} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>

                {/* Foto circular */}
                <div style={{
                  width: 200, height: 200,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 0 0 3px #00C4CC, 0 0 32px rgba(0,196,204,0.45)',
                  flexShrink: 0,
                }}>
                  <img
                    src={founder.img} alt={founder.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Nombre + título + ubicación */}
                <div style={{ textAlign: 'center' }}>
                  <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.2rem', fontWeight: 400, letterSpacing: '0.05em', color: '#fff', margin: '0 0 4px' }}>
                    {founder.nombre}
                  </h1>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: '#00C4CC', textTransform: 'uppercase', margin: '0 0 6px' }}>
                    {founder.titulo}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                    {founder.ubicacion} · {founder.edad} años
                  </p>
                </div>

                {/* Social links */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <a href={founder.redes.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#00C4CC'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    <LinkedInIcon />
                  </a>
                  <a href={founder.redes.instagram} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#00C4CC'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>

            ))}
          </div>

          {/* ── DERECHA ── */}

        </div>
      </div>
    </section>
  )
}
