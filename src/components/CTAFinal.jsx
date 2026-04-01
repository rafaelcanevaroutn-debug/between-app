import { useState } from 'react'
import { generateEcosystem } from '../services/generateEcosystem'
import logoOutline from '../assets/logo-outline.png'

const CALENDLY = 'https://calendly.com/rafaelcanevaroutn/30min'
const WHATSAPP = 'https://wa.me/5493815971971'

const inputStyle = {
  background: '#060D18',
  border: '1px solid rgba(0,196,204,0.25)',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'monospace',
}

export default function CTAFinal() {
  const [simAbierto, setSimAbierto] = useState(false)
  const [nombre, setNombre] = useState('')
  const [nicho, setNicho] = useState('')
  const [descripcion, setDescripcion] = useState('')

  const puedeGenerar = nombre.trim() && nicho

  const handleGenerar = () => {
    generateEcosystem({ nombre, nicho, descripcion })
  }

  return (
    <section id="contacto" className="relative py-32 overflow-hidden dot-grid">
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fade-in-up { animation: fadeInUp 0.4s ease forwards; }
        .sim-select option { background: #060D18; color: #fff; }
      `}</style>

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
          ¿Listo para{' '}
          <span className="gradient-text">ser visto?</span>
        </h2>
        <p className="text-gray text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Coordinamos un café y te muestro cómo funciona en tu caso.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient px-10 py-4 rounded-full text-base font-bold text-white transition-all duration-200"
            style={{ boxShadow: '0 0 24px rgba(0,196,204,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 40px rgba(0,196,204,0.5)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 24px rgba(0,196,204,0.3)'}
          >
            Quiero ser protagonista
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            O escribinos por WhatsApp →
          </a>
        </div>

        {/* Simulador toggle link */}
        <button
          onClick={() => setSimAbierto(v => !v)}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
          style={{ color: 'rgba(0,196,204,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = '#00C4CC'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,196,204,0.7)'}
        >
          ¿Querés ver cómo quedaría tu ecosistema? Generalo acá {simAbierto ? '↑' : '→'}
        </button>

        {/* Formulario del simulador */}
        {simAbierto && (
          <div className="max-w-xl mx-auto fade-in-up relative mt-8 text-left">
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,204,0.06) 0%, transparent 65%)' }} />
            <div className="relative rounded-2xl overflow-hidden" style={{ background: '#0A1628', border: '1px solid rgba(0,196,204,0.2)' }}>
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #00C4CC, transparent)' }} />

              <div className="flex items-center px-6 py-4" style={{ borderBottom: '1px solid rgba(0,196,204,0.1)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#00C4CC', boxShadow: '0 0 6px rgba(0,196,204,0.8)' }} />
                  <span style={{ color: '#00C4CC', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em' }}>
                    BETWEEN_SIM // INIT
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label style={{ color: '#00C4CC', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.15em' }}>
                    // NOMBRE O MARCA
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ej: Rafael Díaz"
                    className="rounded-xl px-4 py-3 text-sm"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#00C4CC'; e.target.style.boxShadow = '0 0 0 2px rgba(0,196,204,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,196,204,0.25)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label style={{ color: '#00C4CC', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.15em' }}>
                    // NICHO
                  </label>
                  <select
                    value={nicho}
                    onChange={e => setNicho(e.target.value)}
                    className="sim-select rounded-xl px-4 py-3 text-sm"
                    style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' }}
                    onFocus={e => { e.target.style.borderColor = '#00C4CC'; e.target.style.boxShadow = '0 0 0 2px rgba(0,196,204,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,196,204,0.25)'; e.target.style.boxShadow = 'none' }}
                  >
                    <option value="">— Seleccioná tu nicho —</option>
                    <option value="Inmobiliarias">Inmobiliarias</option>
                    <option value="Gastronomía">Gastronomía</option>
                    <option value="Marca Personal">Marca Personal</option>
                    <option value="Startups">Startups</option>
                    <option value="Fitness">Fitness</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label style={{ color: '#00C4CC', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.15em' }}>
                    // DESCRIPCIÓN <span style={{ color: 'rgba(0,196,204,0.4)', fontWeight: 400 }}>(opcional)</span>
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder="Ej: Vendo propiedades en Tucumán desde hace 10 años..."
                    rows={3}
                    className="rounded-xl px-4 py-3 text-sm resize-none"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#00C4CC'; e.target.style.boxShadow = '0 0 0 2px rgba(0,196,204,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,196,204,0.25)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <button
                  onClick={handleGenerar}
                  disabled={!puedeGenerar}
                  className="w-full py-4 rounded-xl text-base font-bold transition-all duration-300"
                  style={{
                    background: puedeGenerar ? 'linear-gradient(135deg,#00C4CC,#00A889)' : 'rgba(0,196,204,0.05)',
                    color: puedeGenerar ? '#fff' : 'rgba(0,196,204,0.3)',
                    boxShadow: puedeGenerar ? '0 0 28px rgba(0,196,204,0.35)' : 'none',
                    cursor: puedeGenerar ? 'pointer' : 'not-allowed',
                    border: puedeGenerar ? 'none' : '1px solid rgba(0,196,204,0.15)',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                  }}
                  onMouseEnter={e => { if (puedeGenerar) { e.currentTarget.style.boxShadow = '0 0 48px rgba(0,196,204,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { if (puedeGenerar) { e.currentTarget.style.boxShadow = '0 0 28px rgba(0,196,204,0.35)'; e.currentTarget.style.transform = 'translateY(0)' } }}
                >
                  {puedeGenerar ? 'Activar sistema →' : '— Completá nombre y nicho —'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
