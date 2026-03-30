const GRADIENTS = [
  'linear-gradient(135deg, #060D18, #00C4CC)',
  'linear-gradient(135deg, #0A2040, #0088CC)',
  'linear-gradient(135deg, #060D18, #00A889)',
  'linear-gradient(135deg, #0A1628, #00B4A0)',
  'linear-gradient(135deg, #0A2040, #00CC88)',
  'linear-gradient(135deg, #060D18, #006B8F)',
  'linear-gradient(135deg, #0A1628, #00C4CC)',
  'linear-gradient(135deg, #071220, #00A889)',
  'linear-gradient(135deg, #0A2040, #00B4A0)',
  'linear-gradient(135deg, #060D18, #0088CC)',
  'linear-gradient(135deg, #0A1628, #00CC88)',
  'linear-gradient(135deg, #071220, #00C4CC)',
  'linear-gradient(135deg, #0A2040, #00A889)',
  'linear-gradient(135deg, #060D18, #00B4A0)',
  'linear-gradient(135deg, #0A1628, #0088CC)',
  'linear-gradient(135deg, #071220, #00CC88)',
  'linear-gradient(135deg, #060D18, #006B8F)',
]

const liveCards = [
  { name: 'Martín A.', nicho: 'Inmobiliarias',  grad: GRADIENTS[0],  seguidores: '1.2K', videos: '48', dias: '32' },
  { name: 'Sofía C.',  nicho: 'Marca Personal', grad: GRADIENTS[1],  seguidores: '890',  videos: '61', dias: '41' },
  { name: 'Lucas R.',  nicho: 'Startups',        grad: GRADIENTS[2],  seguidores: '2.1K', videos: '93', dias: '58' },
]

const avatares = [
  { name: 'Valentina G.', nicho: 'Gastronomía',   grad: GRADIENTS[3]  },
  { name: 'Esteban M.',   nicho: 'Fitness',        grad: GRADIENTS[4]  },
  { name: 'Diego P.',     nicho: 'Inmobiliarias',  grad: GRADIENTS[5]  },
  { name: 'Camila R.',    nicho: 'Marca Personal', grad: GRADIENTS[6]  },
  { name: 'Julián T.',    nicho: 'Startups',       grad: GRADIENTS[7]  },
  { name: 'Ana L.',       nicho: 'Gastronomía',    grad: GRADIENTS[8]  },
  { name: 'Matías V.',    nicho: 'Fitness',        grad: GRADIENTS[9]  },
  { name: 'Franco R.',    nicho: 'Startups',       grad: GRADIENTS[10] },
  { name: 'Nadia G.',     nicho: 'Marca Personal', grad: GRADIENTS[11] },
  { name: 'Pablo L.',     nicho: 'Inmobiliarias',  grad: GRADIENTS[12] },
  { name: 'Romina V.',    nicho: 'Gastronomía',    grad: GRADIENTS[13] },
  { name: 'Santiago E.',  nicho: 'Fitness',        grad: GRADIENTS[14] },
  { name: 'Laura B.',     nicho: 'Marca Personal', grad: GRADIENTS[15] },
  { name: 'Gonzalo M.',   nicho: 'Startups',       grad: GRADIENTS[16] },
]

const NICHO_COLORS = {
  'Inmobiliarias':  '#00C4CC',
  'Marca Personal': '#0088CC',
  'Startups':       '#00A889',
  'Gastronomía':    '#00B4A0',
  'Fitness':        '#00CC88',
}

const HelmetIcon = ({ size = 22, color = '#00C4CC' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7"/>
    <path d="M5 12a7 7 0 0 1 14 0"/>
    <rect x="9" y="14" width="6" height="3" rx="1"/>
    <circle cx="12" cy="11" r="2.5" fill={color} opacity="0.3"/>
  </svg>
)

function AstroCircle({ grad, size = 72 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: grad,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '2px solid rgba(0,196,204,0.3)',
      boxShadow: '0 0 14px rgba(0,196,204,0.15)',
      flexShrink: 0,
    }}>
      <HelmetIcon size={Math.round(size * 0.44)} />
    </div>
  )
}

function LiveCard({ name, nicho, grad, seguidores, videos, dias }) {
  return (
    <div style={{
      background: '#0A1628',
      border: '1px solid rgba(0,196,204,0.25)',
      borderRadius: 16,
      padding: '20px 24px',
      boxShadow: '0 0 24px rgba(0,196,204,0.08)',
      flex: 1,
    }}>
      {/* Badge EN VIVO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
          padding: '3px 10px', borderRadius: 999,
          background: 'rgba(255,60,60,0.12)', border: '1px solid rgba(255,60,60,0.35)', color: '#FF3C3C',
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF3C3C', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
          EN VIVO
        </span>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>between.app</span>
      </div>

      {/* Avatar + nombre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <AstroCircle grad={grad} size={52} />
        <div>
          <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '0.75rem', color: NICHO_COLORS[nicho], margin: '2px 0 0', fontWeight: 600 }}>{nicho}</p>
        </div>
      </div>

      {/* Separador */}
      <div style={{ height: 1, background: 'rgba(0,196,204,0.12)', marginBottom: 16 }} />

      {/* Métricas */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {[
          { label: 'Seguidores', val: seguidores },
          { label: 'Videos',     val: videos     },
          { label: 'Días activo', val: dias       },
        ].map(({ label, val }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00C4CC', margin: 0 }}>{val}</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0', letterSpacing: '0.05em' }}>{label.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Avatar({ name, nicho, grad }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative' }}>
        <AstroCircle grad={grad} size={72} />
        <span style={{
          position: 'absolute', top: 2, right: 2,
          width: 12, height: 12, borderRadius: '50%',
          background: '#22C55E', border: '2px solid #060D18',
          animation: 'pulse 2s infinite',
        }} />
      </div>
      <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>{name}</span>
      <span style={{
        fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.05em',
        padding: '1px 7px', borderRadius: 999,
        background: `${NICHO_COLORS[nicho]}15`,
        border: `1px solid ${NICHO_COLORS[nicho]}40`,
        color: NICHO_COLORS[nicho],
        textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        {nicho}
      </span>
    </div>
  )
}

export default function Comunidad() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#060D18' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{
        width: 800, height: 600,
        background: 'radial-gradient(ellipse at center, rgba(0,196,204,0.04) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,196,204,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">

        {/* Badge + Título */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-5">
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

        {/* Fila superior — 3 cards EN VIVO */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 48 }} className="flex-col sm:flex-row">
          {liveCards.map((c) => <LiveCard key={c.initials} {...c} />)}
        </div>

        {/* Quote central */}
        <div style={{
          textAlign: 'center', marginBottom: 48,
          padding: '24px 32px',
          background: 'rgba(0,196,204,0.04)',
          border: '1px solid rgba(0,196,204,0.15)',
          borderRadius: 12,
          maxWidth: 600, margin: '0 auto 48px',
        }}>
          <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.85)', margin: '0 0 10px', lineHeight: 1.6 }}>
            "Between cambió la forma en que mi marca llega a la gente."
          </p>
          <span style={{ fontSize: '0.8rem', color: '#00C4CC', fontWeight: 600 }}>
            — Diego A., Inmobiliarias · Cliente activo
          </span>
        </div>

        {/* Grid de 14 avatares — 7 por fila */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '24px 12px', marginBottom: 64 }}>
          {avatares.map((a) => <Avatar key={a.initials} {...a} />)}
        </div>

        {/* Frase final */}
        <div className="text-center">
          <p style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.2, margin: 0,
          }}>
            <span style={{ color: '#fff' }}>ESTAR EN BETWEEN ES UN DIFERENCIAL </span>
            <span style={{ color: '#00C4CC' }}>EN SÍ MISMO.</span>
          </p>
        </div>

      </div>
    </section>
  )
}
