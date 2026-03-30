import { useState } from 'react'

const nichos = [
  {
    num: '01',
    label: 'Inmobiliarias',
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
    accent: '#00CC88',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
]

function NichoCard({ num, label, accent, icon }) {
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
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        cursor: 'default',
        boxShadow: hovered ? `0 0 24px ${accent}44` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div style={{ color: accent, lineHeight: 0 }}>{icon}</div>
      <div>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: accent, display: 'block', marginBottom: 4 }}>
          {num}
        </span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, margin: 0 }}>
          {label}
        </h3>
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

        {/* Desktop: 5 columnas, una hilera */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {nichos.map((n) => <NichoCard key={n.num} {...n} />)}
        </div>

        {/* Mobile: 2 columnas */}
        <div className="md:hidden" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {nichos.map((n) => <NichoCard key={n.num} {...n} />)}
        </div>
      </div>
    </section>
  )
}
