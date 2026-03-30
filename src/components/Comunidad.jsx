const miembros = [
  { initials: 'MA', name: 'Martín A.',    nicho: 'Inmobiliarias',   gradient: 'linear-gradient(135deg, #006B6F, #00C4CC)' },
  { initials: 'SC', name: 'Sofía C.',     nicho: 'Marca Personal',  gradient: 'linear-gradient(135deg, #004D6B, #0088CC)' },
  { initials: 'LR', name: 'Lucas R.',     nicho: 'Startups',        gradient: 'linear-gradient(135deg, #005C4A, #00A889)' },
  { initials: 'VG', name: 'Valentina G.', nicho: 'Gastronomía',     gradient: 'linear-gradient(135deg, #006B6F, #00B4A0)' },
  { initials: 'EM', name: 'Esteban M.',   nicho: 'Fitness',         gradient: 'linear-gradient(135deg, #004A6B, #00CC88)' },
  { initials: 'DP', name: 'Diego P.',     nicho: 'Inmobiliarias',   gradient: 'linear-gradient(135deg, #00585C, #00C4CC)' },
  { initials: 'CR', name: 'Camila R.',    nicho: 'Marca Personal',  gradient: 'linear-gradient(135deg, #003D5C, #0088CC)' },
  { initials: 'JT', name: 'Julián T.',    nicho: 'Startups',        gradient: 'linear-gradient(135deg, #004038, #00A889)' },
  { initials: 'AL', name: 'Ana L.',       nicho: 'Gastronomía',     gradient: 'linear-gradient(135deg, #005C58, #00B4A0)' },
  { initials: 'MV', name: 'Matías V.',    nicho: 'Fitness',         gradient: 'linear-gradient(135deg, #003850, #00CC88)' },
]

const NICHO_COLORS = {
  'Inmobiliarias':  '#00C4CC',
  'Marca Personal': '#0088CC',
  'Startups':       '#00A889',
  'Gastronomía':    '#00B4A0',
  'Fitness':        '#00CC88',
}

function Avatar({ initials, name, nicho, gradient }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {/* Círculo con indicador activo */}
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: '50%',
          background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(0,196,204,0.2)',
          border: '2px solid rgba(255,255,255,0.1)',
          fontSize: '1.1rem',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '0.05em',
        }}>
          {initials}
        </div>
        {/* Indicador activo */}
        <span style={{
          position: 'absolute', top: 2, right: 2,
          width: 12, height: 12,
          borderRadius: '50%',
          background: '#22C55E',
          border: '2px solid #060D18',
          animation: 'pulse 2s infinite',
        }} />
      </div>
      {/* Nombre */}
      <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, textAlign: 'center' }}>
        {name}
      </span>
      {/* Badge nicho */}
      <span style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        padding: '2px 8px',
        borderRadius: 999,
        background: `${NICHO_COLORS[nicho]}18`,
        border: `1px solid ${NICHO_COLORS[nicho]}44`,
        color: NICHO_COLORS[nicho],
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {nicho}
      </span>
    </div>
  )
}

export default function Comunidad() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#060D18' }}>
      {/* Glow central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: 700, height: 500,
        background: 'radial-gradient(ellipse at center, rgba(0,196,204,0.05) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,196,204,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16">

        {/* Badge + Título */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, transparent, #00C4CC)' }} />
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ border: '1px solid rgba(0,196,204,0.4)', color: '#00C4CC', background: 'rgba(0,196,204,0.06)' }}>
              Comunidad
            </span>
            <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, #00C4CC, transparent)' }} />
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 400, letterSpacing: '0.04em', color: '#fff', margin: 0, lineHeight: 1 }}>
            NO ESTÁS SOLO.
          </h2>
        </div>

        {/* Grid de avatares — 5 por fila */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '28px 16px', marginBottom: 56 }}>
          {miembros.map((m) => (
            <Avatar key={m.initials} {...m} />
          ))}
        </div>

        {/* Frase final */}
        <div className="text-center" style={{ marginTop: 72 }}>
          <p style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            margin: 0,
          }}>
            <span style={{ color: '#fff' }}>ESTAR EN BETWEEN ES UN DIFERENCIAL </span>
            <span style={{ color: '#00C4CC' }}>EN SÍ MISMO.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
