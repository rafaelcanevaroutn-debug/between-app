import { useState, useEffect } from 'react'
import astronauta from '../assets/astronauta2.png'
import Particles from './Particles'

const FRASES = [
  [
    { text: 'Construí tu historia ', color: null },
    { text: 'como una serie.', color: '#00C4CC' },
  ],
]

const STAGGER = 38
const ENTER_DUR = 420
const EXIT_DUR = 320
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
  const exitDone = visibleCount * STAGGER + EXIT_DUR

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
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        backgroundImage: `url(${astronauta})`,
        backgroundSize: 'cover',
        backgroundPosition: 'clamp(60%, 80%, 100%) 30%',
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
          background: 'linear-gradient(to right, rgba(6,13,24,0.92) 0%, rgba(6,13,24,0.55) 45%, rgba(6,13,24,0.05) 100%)',
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
        className="relative flex flex-col justify-center h-full w-full md:w-[55%]"
        style={{ zIndex: 10, paddingLeft: 'clamp(1.25rem, 7vw, 7rem)', paddingRight: 'clamp(1.25rem, 4vw, 3rem)', paddingTop: '5rem' }}
      >
        {/* Headline rotativo */}
        <div className="mb-4" style={{ minHeight: 'clamp(100px, 25vw, 160px)' }}>
          <h1 style={{ fontSize: 'clamp(2.1rem, 9vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '0.01em', width: '100%', overflow: 'visible', fontFamily: "'Bebas Neue', sans-serif", wordBreak: 'keep-all', hyphens: 'none', overflowWrap: 'normal' }}>
            {(() => {
              // Agrupar chars en tokens: word | space | break
              // Así cada palabra es un inline-block atómico y no se corta
              const tokens = []
              let currentWord = []
              chars.forEach((charObj, i) => {
                if (charObj.isBreak) {
                  if (currentWord.length) { tokens.push({ type: 'word', chars: currentWord }); currentWord = [] }
                  tokens.push({ type: 'break', key: `br-${phraseIdx}-${i}` })
                } else if (charObj.ch === ' ') {
                  if (currentWord.length) { tokens.push({ type: 'word', chars: currentWord }); currentWord = [] }
                  tokens.push({ type: 'space', charObj, key: `sp-${phraseIdx}-${i}` })
                } else {
                  currentWord.push({ ...charObj, idx: i })
                }
              })
              if (currentWord.length) tokens.push({ type: 'word', chars: currentWord })

              const getCharStyle = (staggerIdx, color) => {
                const delay = `${staggerIdx * STAGGER}ms`
                const charColor = color || '#fff'
                const glow = color === '#00C4CC' ? '0 0 16px rgba(0,196,204,0.6)' : 'none'
                if (charState === 'entering') return { display: 'inline-block', opacity: 0, color: charColor, textShadow: glow, animation: `charIn ${ENTER_DUR}ms ease forwards`, animationDelay: delay }
                if (charState === 'visible') return { display: 'inline-block', opacity: 1, color: charColor, textShadow: glow }
                return { display: 'inline-block', opacity: 1, color: charColor, textShadow: glow, animation: `charOut ${EXIT_DUR}ms ease forwards`, animationDelay: delay }
              }

              return tokens.map((token, ti) => {
                if (token.type === 'break') return <br key={token.key} />
                if (token.type === 'space') {
                  const s = getCharStyle(token.charObj.staggerIdx, null)
                  return <span key={token.key} style={{ ...s, color: undefined, textShadow: undefined }}>{'\u00A0'}</span>
                }
                return (
                  <span key={`word-${phraseIdx}-${ti}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {token.chars.map(({ ch, color, staggerIdx, idx }) => (
                      <span key={`${phraseIdx}-${idx}`} style={getCharStyle(staggerIdx, color)}>{ch}</span>
                    ))}
                  </span>
                )
              })
            })()}
          </h1>
        </div>

        {/* Subheadline */}
        <p className="leading-relaxed mb-1 whitespace-pre-line" style={{ maxWidth: 520, fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>
          Between produce series personales de contenido recurrente desde tu experiencia.
        </p>
        <p className="leading-relaxed mb-6" style={{ maxWidth: 520, fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}>
          Vos grabás con una dirección clara. Nosotros convertimos eso en episodios y contenido que se publica de forma constante en tus canales.
        </p>

        {/* Línea destacada */}
        <p className="mb-10 whitespace-pre-line" style={{ maxWidth: 600, fontSize: '0.95rem', color: '#00C4CC', fontWeight: 600, lineHeight: 1.5 }}>
          No son piezas sueltas.{"\n"}
          Es tu historia avanzando todos los meses.
        </p>

        {/* CTA */}
        <a
          href="#contacto"
          className="inline-flex items-center gap-3 rounded-full text-white transition-all duration-300 self-start"
          style={{
            padding: '18px 40px',
            fontSize: '1.1rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
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
          Quiero empezar mi serie
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
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
          right: '1%', bottom: '2%', maxWidth: 260,
          background: 'rgba(6,13,24,0.85)',
          border: '1px solid rgba(0,196,204,0.18)',
          borderRadius: 12, padding: '22px 26px',
          backdropFilter: 'blur(10px)',
          zIndex: 20,
          boxShadow: '0 0 24px rgba(0,196,204,0.07)',
        }}
      >
        <p className="leading-relaxed" style={{ color: '#7A9AB0', fontSize: 14 }}>
          "El astronauta flotando solo en el espacio no está perdido. Está en el lugar más visible del universo."
        </p>
      </div>

    </section>
  )
}
