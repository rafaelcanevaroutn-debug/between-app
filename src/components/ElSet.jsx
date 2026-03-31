const pasos = [
  {
    num: '01',
    label: 'Contás tu historia',
    desc: 'Te pasamos preguntas y ángulos para que sepas qué grabar. Nos juntamos por Meet o presencialmente. Podés mandarnos crudos o editados, nosotros clippeamos todo.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6h20v14H2z" />
        <path d="M7 6V4M17 6V4M7 2h10" strokeWidth="2.2" />
        <path d="M7 6l2-4M12 6l2-4M17 6l2-4" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Lo convertimos en contenido',
    desc: 'Nuestro equipo edita, adapta y produce todo listo para distribuir en múltiples canales y formatos.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <circle cx="16" cy="12" r="2" />
        <path d="M2 8h20M2 16h20M8 4v16M16 4v16" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Tu contenido se mueve todos los días',
    desc: 'Un sistema de canales distribuye tu historia constantemente. Sin que vos tengas que hacer nada más.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="#00C4CC" />
      </svg>
    ),
  },
]

export default function ElSet() {
  return (
    <section id="como-funciona" className="py-24 dot-grid overflow-hidden">
      <style>{`
        @media (max-width: 767px) {
          .elset-grid { grid-template-columns: 1fr !important; }
          .elset-col { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 40px; }
          .elset-col:last-child { padding-bottom: 0; }
          .elset-topline { display: none; }
          .elset-watermark { display: none; }
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Encabezado */}
        <div className="mb-16">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-4">El proceso</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '0.04em', color: '#fff', margin: 0, lineHeight: 1 }}>
            BIENVENIDO AL SET.{' '}
            <span style={{ background: 'linear-gradient(135deg, #00C4CC, #00A889)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              NOSOTROS DIRIGIMOS.
            </span>
          </h2>
        </div>

        {/* Línea horizontal superior + 3 columnas */}
        <div style={{ position: 'relative' }}>

          {/* Línea cyan superior que conecta las 3 columnas */}
          <div className="elset-topline" style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(to right, transparent, #00C4CC 10%, #00C4CC 90%, transparent)',
          }} />

          <div className="elset-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            paddingTop: 40,
          }}>
            {pasos.map(({ num, label, desc, icon }, idx) => (
              <div
                key={num}
                className="elset-col"
                style={{
                  position: 'relative',
                  borderRight: idx < 2 ? '1px solid rgba(0,196,204,0.12)' : 'none',
                  paddingRight: idx < 2 ? 40 : 0,
                  paddingLeft: idx > 0 ? 40 : 0,
                }}
              >
                {/* Número watermark */}
                <div className="elset-watermark" style={{
                  position: 'absolute',
                  top: -20,
                  right: idx < 2 ? 24 : 0,
                  left: idx > 0 ? 24 : 0,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '10rem',
                  fontWeight: 400,
                  color: 'rgba(0,196,204,0.06)',
                  lineHeight: 1,
                  pointerEvents: 'none',
                  userSelect: 'none',
                  textAlign: 'right',
                }}>
                  {num}
                </div>

                {/* Icono */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44,
                  background: 'rgba(0,196,204,0.1)',
                  borderRadius: '10px',
                  marginBottom: 20,
                  position: 'relative', zIndex: 1,
                }}>
                  {icon}
                </div>

                {/* Título */}
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.8rem',
                  fontWeight: 400,
                  color: '#fff',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                  margin: '0 0 12px',
                  position: 'relative', zIndex: 1,
                }}>
                  {label}
                </h3>

                {/* Descripción */}
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  margin: 0,
                  position: 'relative', zIndex: 1,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frase cierre */}
        <div style={{ marginTop: 72, textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            margin: '0 0 32px',
          }}>
            <span style={{ color: '#fff' }}>VOS CONSTRUÍS. </span>
            <span style={{ background: 'linear-gradient(135deg, #00C4CC, #00A889)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              NOSOTROS HACEMOS QUE EL MUNDO LO VEA.
            </span>
          </p>
          <a
            href="#contacto"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #00C4CC, #00A889)',
              boxShadow: '0 0 20px rgba(0,196,204,0.35)',
              fontSize: '1rem',
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            Quiero entrar al set
          </a>
        </div>

      </div>
    </section>
  )
}
