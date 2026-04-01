import logoOutline from '../assets/logo-outline.png'

const CALENDLY = 'https://calendly.com/rafaelcanevaroutn/30min'
const WHATSAPP = 'https://wa.me/5493815971971'

export default function CTAFinal() {
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
          ¿Listo para{' '}
          <span className="gradient-text">ser visto?</span>
        </h2>
        <p className="text-gray text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
          Coordinamos un café y te muestro cómo funciona en tu caso.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </div>
    </section>
  )
}
