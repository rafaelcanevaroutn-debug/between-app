import { useState, useEffect } from 'react'
import astronauta from '../assets/astronauta2.png'
import Particles from './Particles'

const FRASES = [
  [
    { text: 'Dejá de construir ', color: null },
    { text: 'en silencio.', color: '#00C4CC' },
  ],
  [
    { text: 'No sos ', color: null },
    { text: 'invisible.', color: '#00C4CC' },
    { text: ' Todavía no\nte encontraron.', color: null },
  ],
  [
    { text: 'No es lo que hacés.\nEs que ', color: null },
    { text: 'nadie te ve.', color: '#00C4CC' },
  ],
  [
    { text: 'Ya construiste lo suficiente.\nEs hora de ', color: null },
    { text: 'que te vean.', color: '#00C4CC' },
  ],
]

const STAGGER    = 38
const ENTER_DUR  = 420
const EXIT_DUR   = 320
const DISPLAY_MS = 4200

function buildChars(phraseIdx) {
  const chars = []
  let staggerIdx = 0
  for (const seg of FRASES[phraseIdx]) {
    for (const ch of seg.text) {
      if (ch === '\n') {
        chars.push({ ch, color: seg.color, staggerIdx: null, isBreak: true })
      } else {
        chars.push({ ch, color: seg.color, staggerIdx: staggerIdx++, isBreak: false })
      }
    }
  }
  return chars
}

export default function Hero() {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charState, setCharState] = useState('entering')

  const chars = buildChars(phraseIdx)
  const visibleCount = chars.filter(c => !c.isBreak).length
  const enterDone = visibleCount * STAGGER + ENTER_DUR
  const exitDone  = visibleCount * STAGGER + EXIT_DUR

  useEffect(() => {
    const t1 = setTimeout(() => setCharState('visible'), enterDone)
    const t2 = setTimeout(() => setCharState('exiting'), enterDone + DISPLAY_MS)
    const t3 = setTimeout(() => {
      setPhraseIdx(i => (i + 1) % FRASES.length)
      setCharState('entering')
    }, enterDone + DISPLAY_MS + exitDone)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [phraseIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id="servicios"
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        backgroundImage: `url(${astronauta})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right 30%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <style>{`
        @keyframes charIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes charOut {
          from { opacity: 1; transform: translateY(0);    }
          to   { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      {/* Overlay gradiente principal */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(6,13,24,0.95) 0%, rgba(6,13,24,0.7) 50%, rgba(6,13,24,0.2) 100%)',
          zIndex: 1,
        }}
      />

      {/* Dot grid sobre el overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,196,204,0.12) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          zIndex: 2,
        }}
      />

      <Particles count={35} />

      {/* Glow verde inferior derecha */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: 600, height: 400,
          background: 'radial-gradient(ellipse at bottom right, rgba(0,168,137,0.12) 0%, transparent 70%)',
          zIndex: 2,
        }}
      />

      {/* Contenido */}
      <div
        className="relative flex flex-col justify-center h-full"
        style={{ zIndex: 10, paddingLeft: 'clamp(2rem, 6vw, 7rem)', paddingRight: '2rem', paddingTop: '5rem', width: '55%' }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-8 self-start">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="text-xs text-gray font-medium tracking-wider uppercase">Plataforma de visibilidad</span>
        </div>

        {/* Headline rotativo */}
        <div className="mb-4" style={{ minHeight: 150 }}>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', width: '100%', overflow: 'visible' }}>
            {chars.map(({ ch, color, staggerIdx, isBreak }, i) => {
              if (isBreak) return <br key={`br-${phraseIdx}-${i}`} />

              const delay = `${staggerIdx * STAGGER}ms`
              const charColor = color || '#fff'
              const glow = color === '#00C4CC' ? '0 0 16px rgba(0,196,204,0.6)' : 'none'

              let spanStyle
              if (charState === 'entering') {
                spanStyle = {
                  display: 'inline-block', opacity: 0, color: charColor, textShadow: glow,
                  animation: `charIn ${ENTER_DUR}ms ease forwards`, animationDelay: delay,
                }
              } else if (charState === 'visible') {
                spanStyle = { display: 'inline-block', opacity: 1, color: charColor, textShadow: glow }
              } else {
                spanStyle = {
                  display: 'inline-block', opacity: 1, color: charColor, textShadow: glow,
                  animation: `charOut ${EXIT_DUR}ms ease forwards`, animationDelay: delay,
                }
              }

              return (
                <span key={`${phraseIdx}-${i}`} style={spanStyle}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              )
            })}
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-gray text-lg leading-relaxed mb-10" style={{ maxWidth: 440 }}>
          Contá tu historia. Nosotros nos encargamos de que el mundo la escuche.
        </p>

        {/* CTA */}
        <a
          href="#contacto"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-300 self-start"
          style={{
            background: 'linear-gradient(135deg, #00C4CC, #00A889)',
            boxShadow: '0 0 28px rgba(0,196,204,0.4)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 0 44px rgba(0,196,204,0.65)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 0 28px rgba(0,196,204,0.4)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Quiero ser protagonista
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Card SISTEMA ACTIVO — arriba derecha */}
      <div
        className="absolute hidden lg:flex flex-col gap-1"
        style={{
          top: '18%', right: '4%',
          background: 'rgba(6,13,24,0.88)',
          border: '1px solid rgba(0,196,204,0.25)',
          borderRadius: 10, padding: '12px 18px',
          backdropFilter: 'blur(12px)',
          zIndex: 25,
          boxShadow: '0 0 20px rgba(0,196,204,0.1)',
        }}
      >
        <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: '#00C4CC' }}>
          <span style={{ fontSize: 8 }}>●</span> SISTEMA ACTIVO
        </span>
        <span className="text-xs mt-0.5" style={{ color: '#7A9AB0' }}>1 cliente · 5 canales activos</span>
      </div>

      {/* Indicador SCROLL — centro inferior */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 20 }}
      >
        <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(122,154,176,0.7)' }}>SCROLL</span>
        <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(0,196,204,0.5), transparent)' }} />
      </div>

      {/* Card quote — abajo derecha */}
      <div
        className="absolute hidden lg:block"
        style={{
          right: '3%', bottom: '10%', maxWidth: 260,
          background: 'rgba(6,13,24,0.85)',
          border: '1px solid rgba(0,196,204,0.18)',
          borderRadius: 12, padding: '22px 26px',
          backdropFilter: 'blur(10px)',
          zIndex: 20,
          boxShadow: '0 0 24px rgba(0,196,204,0.07)',
        }}
      >
        <p className="leading-relaxed" style={{ color: '#7A9AB0', fontSize: 14 }}>
          "El astronauta flotando solo en el espacio no está perdido.
          Está en el lugar más visible del universo.
          Solo necesitaba el traje correcto para llegar ahí.{' '}
          <span style={{ color: '#00C4CC', fontWeight: 700 }}>Between es el traje.</span>"
        </p>
      </div>

    </section>
  )
}
