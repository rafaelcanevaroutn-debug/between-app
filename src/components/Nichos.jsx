import { useState } from 'react'

const nichos = [
  {
    num: '01',
    label: 'Inmobiliarias',
    desc: 'Convertí cada propiedad en contenido que genera confianza antes de la primera reunión.',
    glowColor: 'rgba(0,196,204,0.35)',
    borderHover: '#00C4CC',
    accent: '#00C4CC',
  },
  {
    num: '02',
    label: 'Gastronomía',
    desc: 'Tu plato merece más que una foto. Convertilo en contenido que llena mesas.',
    glowColor: 'rgba(139,92,246,0.35)',
    borderHover: '#8B5CF6',
    accent: '#8B5CF6',
  },
  {
    num: '03',
    label: 'Marca Personal',
    desc: 'Tu historia es tu diferencial. Hacemos que el mundo la conozca.',
    glowColor: 'rgba(0,196,204,0.35)',
    borderHover: '#00C4CC',
    accent: '#00C4CC',
  },
  {
    num: '04',
    label: 'Startups',
    desc: 'Construís algo grande. Que la gente lo sepa mientras sucede.',
    glowColor: 'rgba(139,92,246,0.35)',
    borderHover: '#8B5CF6',
    accent: '#8B5CF6',
  },
  {
    num: '05',
    label: 'Fitness',
    desc: 'Tu método tiene resultados. Mostráselos a quienes todavía no te encontraron.',
    glowColor: 'rgba(0,196,204,0.35)',
    borderHover: '#00C4CC',
    accent: '#00C4CC',
  },
]

function NichoCard({ num, label, desc, glowColor, borderHover, accent }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'rgba(10,22,40,0.95)'
          : 'rgba(8,18,32,0.85)',
        border: `1px solid ${hovered ? borderHover : 'rgba(255,255,255,0.06)'}`,
        boxShadow: hovered ? `0 0 28px ${glowColor}, inset 0 0 20px rgba(0,0,0,0.3)` : 'none',
        borderRadius: '16px',
        padding: '28px 28px 24px',
        cursor: 'default',
        transition: 'all 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Número */}
      <span
        style={{
          fontFamily: 'monospace',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: hovered ? accent : 'rgba(255,255,255,0.25)',
          transition: 'color 0.25s ease',
        }}
      >
        {num}
      </span>

      {/* Nombre */}
      <h3
        style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          color: hovered ? '#FFFFFF' : 'rgba(255,255,255,0.85)',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          transition: 'color 0.25s ease',
          margin: 0,
        }}
      >
        {label}
      </h3>

      {/* Separador */}
      <div
        style={{
          height: '1px',
          background: hovered
            ? `linear-gradient(90deg, ${borderHover}, transparent)`
            : 'rgba(255,255,255,0.05)',
          transition: 'background 0.25s ease',
        }}
      />

      {/* Descripción */}
      <p
        style={{
          fontSize: '0.875rem',
          lineHeight: 1.55,
          color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.35)',
          margin: 0,
          transition: 'color 0.25s ease',
        }}
      >
        {desc}
      </p>
    </div>
  )
}

export default function Nichos() {
  return (
    <section id="nichos" className="py-24 dot-grid">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-14">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">Para quién es</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">¿Cuál es tu historia?</h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}
        >
          {nichos.map((nicho) => (
            <NichoCard key={nicho.num} {...nicho} />
          ))}
        </div>
      </div>
    </section>
  )
}
