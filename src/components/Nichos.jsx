import { useState } from 'react'

const nichos = [
  {
    num: '01',
    label: 'Inmobiliarias',
    desc: 'Convertí cada propiedad en contenido que genera confianza antes de la primera reunión.',
    accent: '#00C4CC',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M9 21V7l6-4v18M9 7H3v14M15 11h2M15 15h2M9 11H7M9 15H7" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Gastronomía',
    desc: 'Tu plato merece más que una foto. Convertilo en contenido que llena mesas.',
    accent: '#00A889',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.66 1.34 3 3 3s3-1.34 3-3V2M6 12v10M15 2c0 0 0 6 2.5 8S21 12 21 12v10" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Marca Personal',
    desc: 'Tu historia es tu diferencial. Hacemos que el mundo la conozca.',
    accent: '#00B4A0',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'Startups',
    desc: 'Construís algo grande. Que la gente lo sepa mientras sucede.',
    accent: '#0088CC',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    num: '05',
    label: 'Fitness',
    desc: 'Tu método tiene resultados. Mostráselos a quienes todavía no te encontraron.',
    accent: '#00CC88',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
]

function NichoCard({ num, label, desc, accent, icon }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '200px',
        background: '#0A1628',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        cursor: 'default',
        boxShadow: hovered ? `0 0 24px ${accent}44` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Contenido por defecto: icono + nombre */}
      <div style={{ color: accent, lineHeight: 0, transition: 'opacity 0.25s ease, transform 0.25s ease', opacity: hovered ? 0 : 1, transform: hovered ? 'translateY(-8px)' : 'translateY(0)' }}>
        {icon}
      </div>
      <div style={{ transition: 'opacity 0.25s ease, transform 0.25s ease', opacity: hovered ? 0 : 1, transform: hovered ? 'translateY(-8px)' : 'translateY(0)' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: accent, display: 'block', marginBottom: 4 }}>
          {num}
        </span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, margin: 0 }}>
          {label}
        </h3>
      </div>

      {/* Overlay en hover: icono pequeño + nombre + texto */}
      <div style={{
        position: 'absolute', inset: 0, padding: '20px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px',
        background: `linear-gradient(135deg, ${accent}14, rgba(10,22,40,0.97))`,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: accent, lineHeight: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {icon.props.children}
            </svg>
          </span>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>{label}</h3>
        </div>
        <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function Nichos() {
  return (
    <section id="nichos" className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">Para quién es</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">¿Cuál es tu historia?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {nichos.map((n) => <NichoCard key={n.num} {...n} />)}
        </div>
      </div>
    </section>
  )
}
