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
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 2s3 4 3 10-3 10-3 10M12 2s-3 4-3 10 3 10 3 10M2 12h20" />
        <path d="M9 4.5C6 7 4 9.5 4 12s2 5 5 7.5M15 4.5c3 2.5 5 5 5 7.5s-2 5-5 7.5" />
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
        background: '#0A1628',
        border: '1px solid rgba(255,255,255,0.07)',
        borderLeft: `3px solid ${accent}`,
        borderRadius: '12px',
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        cursor: 'default',
        boxShadow: hovered ? `0 0 28px ${accent}44, 0 8px 24px rgba(0,0,0,0.3)` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Icono */}
      <div style={{ color: accent, lineHeight: 0 }}>{icon}</div>

      {/* Número + título */}
      <div>
        <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: accent, display: 'block', marginBottom: 4 }}>
          {num}
        </span>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>
          {label}
        </h3>
      </div>

      <div style={{ height: '1px', background: hovered ? `linear-gradient(90deg, ${accent}, transparent)` : 'rgba(255,255,255,0.06)', transition: 'background 0.25s ease' }} />

      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
        {desc}
      </p>
    </div>
  )
}

export default function Nichos() {
  const first4 = nichos.slice(0, 4)
  const last1  = nichos.slice(4)

  return (
    <section id="nichos" className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="mb-14">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">Para quién es</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">¿Cuál es tu historia?</h2>
        </div>

        {/* 4 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}
             className="hidden md:grid">
          {first4.map((n) => <NichoCard key={n.num} {...n} />)}
        </div>

        {/* Fitness centrado */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}
             className="hidden md:flex">
          <div style={{ width: 'calc(25% - 9px)' }}>
            <NichoCard {...last1[0]} />
          </div>
        </div>

        {/* Mobile: columna simple */}
        <div className="md:hidden" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {nichos.map((n) => <NichoCard key={n.num} {...n} />)}
        </div>
      </div>
    </section>
  )
}
