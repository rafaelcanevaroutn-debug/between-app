import { useState, useEffect } from 'react'
import logoGlow from '../assets/logo-glow.png'

const MSGS = [
  'Analizando tu último video... el hook de los primeros 3 segundos necesita más impacto.',
  'Tu nicho de inmobiliarias tiene un 34% más de engagement los martes. Te recomiendo publicar mañana.',
  '@rafacanevarobuild creció un 12% esta semana. El contenido de proceso funciona muy bien para tu audiencia.',
  'Detecté que tus competidores usan música lo-fi en el 70% de sus videos. ¿Querés que ajustemos tu banda sonora?',
  'Tu mejor horario de publicación es entre las 19 y 21hs. Tenés 3 videos listos para programar.',
  'El canal @rafacanevarofounder necesita más consistencia. Llevás 4 días sin publicar.',
  'Nuevo trend en Startups: "día a día de un founder". Tus seguidores lo están buscando.',
]

const RING_COLORS = ['#00C4CC', '#8B5CF6', '#00A889']

export default function BetweenAI() {
  const [idx, setIdx]       = useState(0)
  const [typed, setTyped]   = useState('')
  const [visible, setVisible] = useState(true)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    const msg = MSGS[idx]
    let charIdx = 0
    setTyped('')
    setVisible(true)
    setSpeaking(true)

    // Typewriter: ~20ms per char
    const typeTimer = setInterval(() => {
      charIdx++
      setTyped(msg.slice(0, charIdx))
      if (charIdx >= msg.length) {
        clearInterval(typeTimer)
        setSpeaking(false)
      }
    }, 20)

    // Fade out before switching
    const fadeTimer = setTimeout(() => setVisible(false), 3600)

    // Next message
    const nextTimer = setTimeout(() => {
      setIdx(prev => (prev + 1) % MSGS.length)
    }, 4100)

    return () => {
      clearInterval(typeTimer)
      clearTimeout(fadeTimer)
      clearTimeout(nextTimer)
    }
  }, [idx])

  return (
    <div className="flex flex-col items-center gap-6 select-none">

      {/* Label */}
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: '#00C4CC', letterSpacing: '0.15em' }}
        >
          Between AI
        </span>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#00A889',
            display: 'inline-block',
            animation: 'dotPulse 1.2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Circle + rings */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 160, height: 160 }}
      >
        {/* 3 expanding rings */}
        {RING_COLORS.map((color, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 160,
              height: 160,
              border: `1.5px solid ${color}`,
              animation: `siriRing ${speaking ? '1.8s' : '3s'} ease-out infinite`,
              animationDelay: `${i * (speaking ? 0.6 : 1)}s`,
              opacity: speaking ? 0.8 : 0.5,
            }}
          />
        ))}

        {/* Central circle */}
        <div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 100,
            height: 100,
            background: 'rgba(10,22,40,0.95)',
            border: '1px solid rgba(0,196,204,0.25)',
            boxShadow: speaking
              ? '0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(0,196,204,0.2)'
              : '0 0 16px rgba(0,196,204,0.15)',
            transition: 'box-shadow 0.5s ease',
            zIndex: 1,
          }}
        >
          <img
            src={logoGlow}
            alt=""
            style={{
              width: '78%',
              mixBlendMode: 'screen',
              animation: 'glowPulse 4s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Message bubble */}
      <div
        style={{
          width: '100%',
          maxWidth: 320,
          minHeight: 76,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      >
        <div
          className="rounded-xl px-4 py-3"
          style={{
            background: 'rgba(6,13,24,0.9)',
            border: '1px solid rgba(0,196,204,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: 13,
              color: '#e2e8f0',
              lineHeight: 1.65,
              margin: 0,
              minHeight: '2.6em',
              overflowWrap: 'break-word',
              wordBreak: 'normal'
            }}
          >
            {typed}
            <span style={{ animation: 'cursorBlink 0.75s step-end infinite', color: '#00C4CC' }}>
              ▌
            </span>
          </p>
        </div>
      </div>

    </div>
  )
}
