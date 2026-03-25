import { useState } from 'react'
import BetweenAI from './BetweenAI'
import { sendLeadEmail } from '../services/emailjs'

export default function BetweenGrowth() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setEstado('loading')
    const ok = await sendLeadEmail(email, 'Between Growth')
    setEstado(ok ? 'success' : 'error')
  }

  return (
    <section className="py-24 dot-grid" style={{ background: '#060D18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: '#0A1628',
            border: '1px solid rgba(139,92,246,0.2)',
            boxShadow: '0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(0,196,204,0.15)',
          }}
        >
          <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row gap-12 md:items-center">

            {/* LEFT — text content */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="mb-6">
                <span
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(139,92,246,0.15)',
                    border: '1px solid rgba(139,92,246,0.45)',
                    color: '#8B5CF6',
                  }}
                >
                  PRÓXIMAMENTE
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-extrabold leading-tight mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff' }}
              >
                Between Growth
              </h2>
              <p className="text-xl font-semibold mb-10" style={{ color: '#7A9AB0' }}>
                Lo que viene.
              </p>

              {/* Three lines */}
              <div className="flex flex-col gap-5 mb-12">
                {[
                  'Analizamos tu contenido y lo comparamos con lo que funciona en tu nicho.',
                  'Te decimos qué corregir antes de publicar.',
                  'Benchmarks reales contra los top creators de tu industria.',
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="shrink-0 rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        marginTop: 10,
                        background: i === 0 ? '#8B5CF6' : i === 1 ? '#00C4CC' : '#00A889',
                      }}
                    />
                    <p className="text-white font-semibold leading-relaxed" style={{ fontSize: 16 }}>
                      {line}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {estado === 'success' ? (
                <div>
                  <p className="font-bold text-xl mb-1" style={{ color: '#00A889' }}>¡Listo! Te contactamos pronto 🎬</p>
                  <p style={{ color: '#7A9AB0', fontSize: 14 }}>
                    Te avisamos cuando Between Growth esté disponible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="flex-1 rounded-full px-5 py-3.5 text-sm text-white"
                    style={{ background: '#060D18', border: '1px solid #1a2a3a', outline: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(139,92,246,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#1a2a3a'; e.target.style.boxShadow = 'none' }}
                  />
                  <button
                    type="submit"
                    disabled={estado === 'loading'}
                    className="shrink-0 px-7 py-3.5 rounded-full font-bold text-white transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #00C4CC)',
                      fontSize: 14,
                      boxShadow: '0 0 20px rgba(139,92,246,0.35)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(139,92,246,0.55)' }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.35)' }}
                  >
                    {estado === 'loading' ? 'Enviando...' : 'Quiero acceso anticipado'}
                  </button>
                </form>
              )}
              {estado === 'error' && (
                <p className="mt-2 text-sm" style={{ color: '#FF6B6B' }}>
                  Hubo un error.{' '}
                  <a href="https://wa.me/5493815971971" target="_blank" rel="noopener noreferrer" className="underline">
                    Escribinos por WhatsApp.
                  </a>
                </p>
              )}
            </div>

            {/* RIGHT — BetweenAI */}
            <div className="flex-shrink-0 flex items-center justify-center md:pr-4">
              <BetweenAI />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
