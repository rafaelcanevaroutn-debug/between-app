export default function Operadores() {
  return (
    <section style={{ background: '#0A1628', borderTop: '1px solid rgba(0,196,204,0.1)' }} className="py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-16 text-center">
        <p className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: 'rgba(0,196,204,0.6)' }}>
          Únite al equipo
        </p>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, letterSpacing: '0.04em', color: '#fff', margin: '0 0 16px', lineHeight: 1.05 }}>
          ¿QUERÉS TRABAJAR CON NOSOTROS?
        </h2>
        <p className="mb-10 mx-auto" style={{ fontSize: '1.05rem', color: '#7A9AB0', lineHeight: 1.7, maxWidth: 540 }}>
          Between está creciendo. Buscamos operadores que quieran trabajar con contenido y creadores.
        </p>
        <a
          href="https://wa.me/5493815971971"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 rounded-full text-base font-bold text-white transition-all duration-300"
          style={{
            border: '1px solid rgba(0,196,204,0.5)',
            color: '#00C4CC',
            background: 'rgba(0,196,204,0.05)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,196,204,0.12)'; e.currentTarget.style.borderColor = '#00C4CC' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,196,204,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,196,204,0.5)' }}
        >
          Quiero ser operador →
        </a>
      </div>
    </section>
  )
}
