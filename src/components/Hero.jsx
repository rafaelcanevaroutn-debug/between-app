import { useState, useEffect } from 'react'
import astronauta from '../assets/astronauta.jpg'
import Particles from './Particles'
import Typewriter from './Typewriter'
import { sendLeadEmail } from '../services/emailjs'

const PHRASES = [
  { before: 'Dejá de construir ', highlight: 'en silencio', after: '.' },
  { before: 'No sos ', highlight: 'invisible', after: '. Todavía no te encontraron.' },
  { before: 'No es lo que hacés. Es que ', highlight: 'nadie te ve', after: '.' },
  { before: 'Ya construiste lo suficiente. Es hora de ', highlight: 'que te vean', after: '.' },
]

const cyanText = { color: '#00C4CC' }

const statNumStyle = {
  color: '#00C4CC',
  textShadow: '0 0 10px rgba(0,196,204,0.6)',
}

const dotGridStyle = {
  backgroundImage: 'radial-gradient(circle, rgba(0,196,204,0.15) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
}

const stats = [
  { value: '5', label: 'Canales' },
  { value: '260+', label: 'Videos' },
  { value: '2', label: 'Entrevistas' },
  { value: 'USD 300', label: 'desde' },
]

export default function Hero() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | loading | success | error
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setPhraseIndex(i => (i + 1) % PHRASES.length)
        setVisible(true)
      }, 350)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setEstado('loading')
    const ok = await sendLeadEmail(email, 'Hero Landing')
    setEstado(ok ? 'success' : 'error')
  }

  return (
    <section
      id="servicios"
      className="relative min-h-screen flex items-center pt-28 overflow-hidden"
      style={dotGridStyle}
    >
      {/* Partículas flotantes */}
      <Particles count={35} />

      {/* Astronauta — imagen absoluta lado derecho, opacidad 40% */}
      <img
        src={astronauta}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-auto max-w-[60%] object-cover object-left pointer-events-none select-none"
        style={{ opacity: 0.4 }}
      />

      {/* Fade izquierda para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent pointer-events-none" />

      {/* Glow verde sutil inferior derecha */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at bottom right, rgba(0,168,137,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full px-6 pl-8 md:pl-16 lg:pl-24 pt-6 pb-24" style={{ zIndex: 10 }}>
        <div className="max-w-2xl text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs text-gray font-medium tracking-wider uppercase">Estudio de marca personal</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.35s ease' }}
          >
            <span className="text-white">{PHRASES[phraseIndex].before}</span>
            <span style={{ color: '#00C4CC' }}>{PHRASES[phraseIndex].highlight}</span>
            <span className="text-white">{PHRASES[phraseIndex].after}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray text-lg md:text-xl leading-relaxed max-w-lg">
            Tomamos quien sos y lo convertimos en un ecosistema de canales.{' '}
            <span className="text-white font-medium">Nosotros dirigimos. Vos protagonizás.</span>
          </p>

          {/* Typewriter */}
          <Typewriter />

          {/* Whitelist form */}
          <div className="mt-8 mb-16">
            {estado === 'success' ? (
              <p className="text-base font-bold" style={{ color: '#00A889' }}>
                ¡Listo! Te contactamos pronto 🎬
              </p>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 rounded-full px-5 py-3.5 text-sm text-white"
                    style={{
                      background: 'rgba(10,22,40,0.85)',
                      border: '1px solid #1a2a3a',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = '#00C4CC'; e.target.style.boxShadow = '0 0 0 3px rgba(0,196,204,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#1a2a3a'; e.target.style.boxShadow = 'none' }}
                  />
                  <button
                    type="submit"
                    disabled={estado === 'loading'}
                    className="shrink-0 px-7 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #00C4CC, #00A889)',
                      boxShadow: '0 0 20px rgba(0,196,204,0.4)',
                      opacity: estado === 'loading' ? 0.7 : 1,
                      cursor: estado === 'loading' ? 'wait' : 'pointer',
                    }}
                  >
                    {estado === 'loading' ? 'Enviando...' : 'Quiero empezar'}
                  </button>
                </form>
                {estado === 'error' && (
                  <p className="mt-2 text-sm" style={{ color: '#FF6B6B' }}>
                    Hubo un error.{' '}
                    <a href="https://wa.me/5493815971971" target="_blank" rel="noopener noreferrer" className="underline">
                      Escribinos por WhatsApp.
                    </a>
                  </p>
                )}
                <a
                  href="#como-funciona"
                  className="inline-block mt-3 text-sm transition-colors duration-200"
                  style={{ color: '#7A9AB0' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = '#7A9AB0'}
                >
                  Ver cómo funciona →
                </a>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-left">
                <div className="text-3xl font-extrabold" style={statNumStyle}>{value}</div>
                <div className="text-xs text-gray uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
