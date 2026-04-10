import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logosinfondoletrasblancas.png'

const linkStyle = {
  background: 'linear-gradient(135deg, #00C4CC, #00A889)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  opacity: 0.7,
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md gradient-border-top">
      <div className="w-full px-6 md:px-16 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Between"
            className="h-14 md:h-24 w-auto"
            style={{ filter: 'drop-shadow(0 0 3px rgba(0,196,204,0.35))' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && ['Servicios', 'Cómo funciona', 'Nichos', 'Contacto'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
              className="text-base font-medium transition-all duration-200"
              style={linkStyle}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7' }}
            >
              {link}
            </a>
          ))}

          {/* Quién soy — siempre visible */}
          <Link
            to="/quien-soy"
            className="text-base font-medium transition-all duration-200"
            style={{
              ...linkStyle,
              opacity: pathname === '/quien-soy' ? 1 : 0.7,
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = pathname === '/quien-soy' ? '1' : '0.7' }}
          >
            Quién soy
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href={isHome ? '#contacto' : '/#contacto'}
            className="btn-gradient px-6 py-3 rounded-full text-base font-semibold text-white"
          >
            Quiero ser protagonista
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4">
          {isHome && ['Servicios', 'Cómo funciona', 'Nichos', 'Contacto'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
              className="text-sm text-gray hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <Link
            to="/quien-soy"
            className="text-sm text-gray hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Quién soy
          </Link>
          <a
            href={isHome ? '#contacto' : '/#contacto'}
            className="btn-gradient px-5 py-2.5 rounded-full text-sm font-semibold text-white text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Quiero ser protagonista
          </a>
        </div>
      )}
    </nav>
  )
}
