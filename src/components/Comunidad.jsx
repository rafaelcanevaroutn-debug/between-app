function dicebear(seed) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0a1628&radius=50`
}

const liveCards = [
  {
    initials: 'MA', name: 'Martín A.', nicho: 'Inmobiliarias',
    avatar: dicebear('Martin'),
    seguidores: '1.2K', videos: '48', dias: '32',
  },
  {
    initials: 'SC', name: 'Sofía C.', nicho: 'Marca Personal',
    avatar: dicebear('Sofia'),
    seguidores: '890', videos: '61', dias: '41',
  },
  {
    initials: 'LR', name: 'Lucas R.', nicho: 'Startups',
    avatar: dicebear('Lucas'),
    seguidores: '2.1K', videos: '93', dias: '58',
  },
]

const avatares = [
  { initials: 'VG', name: 'Valentina G.', nicho: 'Gastronomía',   avatar: dicebear('Valentina') },
  { initials: 'EM', name: 'Esteban M.',   nicho: 'Fitness',        avatar: dicebear('Esteban')   },
  { initials: 'DP', name: 'Diego P.',     nicho: 'Inmobiliarias',  avatar: dicebear('Diego')     },
  { initials: 'CR', name: 'Camila R.',    nicho: 'Marca Personal', avatar: dicebear('Camila')    },
  { initials: 'JT', name: 'Julián T.',    nicho: 'Startups',       avatar: dicebear('Julian')    },
  { initials: 'AL', name: 'Ana L.',       nicho: 'Gastronomía',    avatar: dicebear('Ana')       },
  { initials: 'MV', name: 'Matías V.',    nicho: 'Fitness',        avatar: dicebear('Matias')    },
  { initials: 'FR', name: 'Franco R.',    nicho: 'Startups',       avatar: dicebear('Franco')    },
  { initials: 'NG', name: 'Nadia G.',     nicho: 'Marca Personal', avatar: dicebear('Nadia')     },
  { initials: 'PL', name: 'Pablo L.',     nicho: 'Inmobiliarias',  avatar: dicebear('Pablo')     },
  { initials: 'RV', name: 'Romina V.',    nicho: 'Gastronomía',    avatar: dicebear('Romina')    },
  { initials: 'SE', name: 'Santiago E.',  nicho: 'Fitness',        avatar: dicebear('Santiago')  },
  { initials: 'LB', name: 'Laura B.',     nicho: 'Marca Personal', avatar: dicebear('Laura')     },
  { initials: 'GM', name: 'Gonzalo M.',   nicho: 'Startups',       avatar: dicebear('Gonzalo')   },
]

const NICHO_COLORS = {
  'Inmobiliarias':  '#00C4CC',
  'Marca Personal': '#0088CC',
  'Startups':       '#00A889',
  'Gastronomía':    '#00B4A0',
  'Fitness':        '#00CC88',
}

function LiveCard({ name, nicho, avatar, seguidores, videos, dias }) {
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
        <img src={avatar} alt={name} style={{
          width: 52, height: 52, borderRadius: '50%',
          flexShrink: 0, boxShadow: '0 0 12px rgba(0,196,204,0.25)',
          border: '2px solid rgba(255,255,255,0.1)',
          objectFit: 'cover',
        }} />
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

function Avatar({ name, nicho, avatar }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative' }}>
        <img src={avatar} alt={name} style={{
          width: 72, height: 72, borderRadius: '50%',
          boxShadow: '0 0 14px rgba(0,196,204,0.18)',
          border: '2px solid rgba(0,196,204,0.25)',
          objectFit: 'cover',
        }} />
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
