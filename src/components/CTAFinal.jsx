import { useState } from 'react'
import logoOutline from '../assets/logo-outline.png'
import { sendLeadEmail } from '../services/emailjs'

export default function CTAFinal() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setEstado('loading')
    const ok = await sendLeadEmail(email, 'CTA Final')
    setEstado(ok ? 'success' : 'error')
  }

  return (
    <section id="contacto" className="relative py-32 overflow-hidden dot-grid">
      {/* Logo outline — decorativo */}
      <img
        src={logoOutline}
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          opacity: 0.06,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-5">Es tu momento</p>
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          ¿Listo para ser el{' '}
          <span className="gradient-text">protagonista?</span>
        </h2>
        <p className="text-gray text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Sumate a los que ya convirtieron su historia en un ecosistema de contenido que trabaja para ellos.
        </p>

        {/* Email form */}
        {estado === 'success' ? (
          <div
            className="inline-flex flex-col items-center gap-2 rounded-2xl px-10 py-6 mb-8"
            style={{ background: 'rgba(0,196,204,0.08)', border: '1px solid rgba(0,196,204,0.25)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="rgba(0,196,204,0.15)" />
              <path d="M9 16L13.5 20.5L23 11.5" stroke="#00C4CC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-bold text-xl" style={{ color: '#00A889' }}>¡Listo! Te contactamos pronto 🎬</p>
            <p style={{ color: '#7A9AB0', fontSize: 14 }}>Revisá tu casilla — en breve te escribimos.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 rounded-full px-6 py-4 text-base text-white"
              style={{
                background: 'rgba(10,22,40,0.9)',
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
              className="shrink-0 btn-gradient px-8 py-4 rounded-full text-base font-bold text-white transition-all duration-200"
              style={{
                opacity: estado === 'loading' ? 0.7 : 1,
                cursor: estado === 'loading' ? 'wait' : 'pointer',
              }}
            >
              {estado === 'loading' ? 'Enviando...' : 'Quiero ser protagonista'}
            </button>
          </form>
        )}

        {estado === 'error' && (
          <p className="text-sm mb-4" style={{ color: '#FF6B6B' }}>
            Hubo un error.{' '}
            <a href="https://wa.me/5493815971971" target="_blank" rel="noopener noreferrer" className="underline">
              Escribinos por WhatsApp.
            </a>
          </p>
        )}

        {/* Calendly secondary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="https://calendly.com/rafaelcanevaroutn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-base font-semibold transition-colors duration-200"
            style={{ color: '#00C4CC' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = '#00C4CC'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 1.5V4M12 1.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M2 7h14" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 11h2M10 11h2M6 13.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Agendá tu sesión gratuita →
          </a>
        </div>

        {/* Email directo */}
        <div className="flex items-center justify-center gap-2 text-gray">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 4.5H15C15.828 4.5 16.5 5.172 16.5 6V13.5C16.5 14.328 15.828 15 15 15H3C2.172 15 1.5 14.328 1.5 13.5V6C1.5 5.172 2.172 4.5 3 4.5Z" stroke="#7A9AB0" strokeWidth="1.5" />
            <path d="M1.5 6L9 10.5L16.5 6" stroke="#7A9AB0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <a href="mailto:rafacanevaro@hotmail.com" className="text-sm hover:text-cyan transition-colors">
            rafacanevaro@hotmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
