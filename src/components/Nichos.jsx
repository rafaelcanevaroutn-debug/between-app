import { useState } from 'react'

const nichos = [
  {
    label: 'Inmobiliarias',
    accent: '#00C4CC',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M9 21V7l6-4v18M9 7H3v14M15 11h2M15 15h2M9 11H7M9 15H7" />
      </svg>
    ),
  },
  {
    label: 'Gastronomía',
    accent: '#00A889',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.66 1.34 3 3 3s3-1.34 3-3V2M6 12v10M15 2c0 0 0 6 2.5 8S21 12 21 12v10" />
      </svg>
    ),
  },
  {
    label: 'Marca Personal',
    accent: '#00B4A0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0M12 19v3M8 22h8" />
      </svg>
    ),
  },
  {
    label: 'Startups',
    accent: '#0088CC',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
  {
    label: 'Fitness',
    accent: '#00CC88',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
]

function NichoPill({ label, accent, icon }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 18px',
        borderRadius: '999px',
        background: hovered ? `${accent}18` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? accent : 'rgba(255,255,255,0.1)'}`,
        transition: 'all 0.2s ease',
        cursor: 'default',
        boxShadow: hovered ? `0 0 16px ${accent}33` : 'none',
      }}
    >
      <span style={{ color: accent, lineHeight: 0 }}>{icon}</span>
      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: hovered ? '#fff' : 'rgba(255,255,255,0.75)', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
        {label}
      </span>
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

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {nichos.map((n) => (
            <NichoPill key={n.label} {...n} />
          ))}
        </div>
      </div>
    </section>
  )
}
