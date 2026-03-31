import logo from '../assets/logosinfondoletrasblancas.png'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      {/* Gradient top line */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, #00C4CC, #00A889)' }} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#">
            <img
              src={logo}
              alt="Between"
              style={{
                height: '80px',
                width: 'auto',
                filter: 'drop-shadow(0 0 4px rgba(0,196,204,0.4))',
              }}
            />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {['Servicios', 'Cómo funciona', 'Nichos', 'Planes', 'Contacto'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
                className="text-sm text-gray hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Mail + Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <a
              href="mailto:rafacanevaro@hotmail.com"
              className="text-sm transition-colors"
              style={{ color: '#7A9AB0' }}
              onMouseEnter={e => e.target.style.color = '#00C4CC'}
              onMouseLeave={e => e.target.style.color = '#7A9AB0'}
            >
              rafacanevaro@hotmail.com
            </a>
            <p className="text-xs text-gray">© 2026 Between — Tucumán, Argentina</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
