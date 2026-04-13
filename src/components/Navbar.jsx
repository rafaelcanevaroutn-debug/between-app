import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
            className="h-16 md:h-24 w-auto transition-all duration-300"
            style={{ filter: 'drop-shadow(0 0 3px rgba(0,196,204,0.35))' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            ['Servicios', 'Cómo funciona', 'Nichos', 'Contacto'].map((link) => (
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
            ))
          ) : (
            <Link
              to="/"
              className="text-base font-medium transition-all duration-200"
              style={linkStyle}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7' }}
            >
              Inicio
            </Link>
          )}

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
            Quienes somos
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
          className="md:hidden w-10 h-10 flex items-center justify-center relative focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5 items-center justify-center w-6">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-cyan rounded-full block origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="w-full h-0.5 bg-gray rounded-full block"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-full h-0.5 bg-cyan rounded-full block origin-center"
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            {isHome ? (
              ['Servicios', 'Cómo funciona', 'Nichos', 'Contacto'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s/g, '-').replace('ó', 'o')}`}
                  className="text-sm text-gray hover:text-white transition-colors py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))
            ) : (
              <Link
                to="/"
                className="text-sm text-gray hover:text-white transition-colors py-1"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
            )}
            <Link
              to="/quien-soy"
              className="text-sm text-gray hover:text-white transition-colors py-1"
              style={{ color: pathname === '/quien-soy' ? '#00C4CC' : undefined }}
              onClick={() => setMenuOpen(false)}
            >
              Quién soy
            </Link>
            <a
              href={isHome ? '#contacto' : '/#contacto'}
              className="btn-gradient px-5 py-3 rounded-full text-sm font-semibold text-white text-center mt-2 group"
              onClick={() => setMenuOpen(false)}
            >
              Quiero ser protagonista
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
