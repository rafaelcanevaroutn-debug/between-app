import { useState } from 'react'
import hollywood from '../assets/Gemini_Generated_Image_j16834j16834j168.png'

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Barra que frena */}
        <path d="M6 8H26" strokeWidth="2.5" />
        {/* Flecha hacia arriba que choca */}
        <path d="M16 26V12" />
        <path d="M10 18L16 12L22 18" />
      </svg>
    ),
    title: 'Una sola cuenta tiene un techo',
    desc: 'Depender de un único canal es poner todos los huevos en una canasta que no controlás.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Ojo tachado */}
        <path d="M4 16s4-8 12-8 12 8 12 8-4 8-12 8S4 16 4 16z" />
        <circle cx="16" cy="16" r="3" />
        <path d="M5 5L27 27" strokeWidth="2.2" />
      </svg>
    ),
    title: 'El contenido se crea pero nadie lo ve',
    desc: 'Sin distribución estratégica, el mejor contenido muere en el algoritmo.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Engranaje con X */}
        <path d="M16 10a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
        <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.2 7.2l2.1 2.1M22.7 22.7l2.1 2.1M7.2 24.8l2.1-2.1M22.7 9.3l2.1-2.1" />
        <path d="M13 13l6 6M19 13l-6 6" strokeWidth="2.2" />
      </svg>
    ),
    title: 'Sin sistema, sin consistencia, sin resultados',
    desc: 'Publicar cuando hay tiempo no es una estrategia. Es esperar que algo funcione solo.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Persona con círculo prohibido */}
        <circle cx="16" cy="10" r="4" />
        <path d="M8 26c0-4.418 3.582-8 8-8s8 3.582 8 8" />
        <circle cx="22" cy="22" r="6" />
        <path d="M17.8 17.8L26.2 26.2" strokeWidth="2.2" />
      </svg>
    ),
    title: 'Los community managers murieron',
    desc: 'Una cuenta, un CM, una esperanza. No alcanza más.',
  },
]

function HollywoodCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #0A1628, #060D18)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `3px solid ${hovered ? '#00E5EE' : '#00C4CC'}`,
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-left-color 0.25s ease',
        boxShadow: hovered ? '0 0 30px rgba(0,196,204,0.2)' : '0 4px 16px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'default',
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 60, height: 60,
        background: 'rgba(0,196,204,0.12)',
        borderRadius: '8px',
        boxShadow: '0 0 12px rgba(0,196,204,0.15)',
      }}>
        <div style={{ transform: 'scale(1.25)', lineHeight: 0 }}>{icon}</div>
      </div>
      <div style={{ height: '1px', background: 'rgba(0,196,204,0.3)' }} />
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.05em', margin: 0, lineHeight: 1.2 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>
        {desc}
      </p>
    </div>
  )
}

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
            <HollywoodCard key={title} icon={icon} title={title} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  )
}
