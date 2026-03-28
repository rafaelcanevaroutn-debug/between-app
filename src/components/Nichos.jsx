import { useState } from 'react'

const nichos = [
  {
    num: '01',
    label: 'Inmobiliarias',
    desc: 'Convertí cada propiedad en contenido que genera confianza antes de la primera reunión.',
  },
  {
    num: '02',
    label: 'Gastronomía',
    desc: 'Tu plato merece más que una foto. Convertilo en contenido que llena mesas.',
  },
  {
    num: '03',
    label: 'Marca Personal',
    desc: 'Tu historia es tu diferencial. Hacemos que el mundo la conozca.',
  },
  {
    num: '04',
    label: 'Startups',
    desc: 'Construís algo grande. Que la gente lo sepa mientras sucede.',
  },
  {
    num: '05',
    label: 'Fitness',
    desc: 'Tu método tiene resultados. Mostráselos a quienes todavía no te encontraron.',
  },
]

function NichoCard({ num, label, desc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0A1628',
        border: `1px solid ${hovered ? '#00C4CC' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? '0 0 24px rgba(0,196,204,0.25)' : 'none',
        borderRadius: '12px',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        cursor: 'default',
      }}
    >
      <span style={{ fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#00C4CC' }}>
        {num}
      </span>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>
        {label}
      </h3>
      <div style={{ height: '1px', background: hovered ? 'linear-gradient(90deg, #00C4CC, transparent)' : 'rgba(255,255,255,0.06)', transition: 'background 0.2s ease' }} />
      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.45)', margin: 0 }}>
        {desc}
      </p>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '10px',
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
