import { useState } from 'react'
import hollywood from '../assets/hollywoodnoexistemas copy.jpg'

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
        background: 'rgba(6,13,24,0.65)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `3px solid ${hovered ? '#00E5EE' : '#00C4CC'}`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-left-color 0.25s ease',
        boxShadow: hovered ? '0 0 30px rgba(0,196,204,0.2)' : '0 4px 16px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'default',
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36,
        background: 'rgba(0,196,204,0.12)',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,196,204,0.15)',
        flexShrink: 0,
      }}>
        <div style={{ transform: 'scale(0.625)', lineHeight: 0 }}>{icon}</div>
      </div>
      <div style={{ height: '1px', background: 'rgba(0,196,204,0.3)' }} />
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1rem', fontWeight: 400, color: '#FFFFFF', letterSpacing: '0.05em', margin: 0, lineHeight: 1.2 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: 0 }}>
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
      {/* Overlay Layers */}
      <div className="absolute inset-0 bg-[#060D18]/30" />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, #060D18 0%, rgba(6,13,24,0.8) 35%, rgba(6,13,24,0.2) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(0,196,204,0.1) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-5xl md:text-9xl text-white leading-none mb-6" style={{ letterSpacing: '-0.02em' }}>
            Hollywood no <span className="gradient-text">existe más.</span>
          </h2>
          <p className="text-gray text-lg md:text-2xl leading-relaxed">
            Hoy cualquiera puede generar contenido.{' '}
            <span className="text-white text-lg md:text-2xl leading-relaxed font-bold"> Tenés algo real. Estás viviendo una historia.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
