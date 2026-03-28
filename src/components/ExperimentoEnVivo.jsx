const PLACEHOLDERS = [
  { handle: '@rafacane.inmobiliario', label: 'Inmobiliarias' },
  { handle: '@rafacane.founder',      label: 'Marca Personal' },
  { handle: '@rafacane.build',        label: 'Startups' },
  { handle: '@rafacane.daily',        label: 'Daily' },
  { handle: '@rafacane.insights',     label: 'Insights' },
]

function PlaceholderCard({ handle, label }) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        background: '#000',
        border: '1px solid #1a1a1a',
        borderRadius: '12px',
        minHeight: 280,
      }}
    >
      {/* Badge */}
      <div className="flex justify-end px-3 pt-3 pb-1">
        <span
          className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(0,196,204,0.1)', border: '1px solid rgba(0,196,204,0.3)', color: '#00C4CC' }}
        >
          BETWEEN
        </span>
      </div>

      {/* Avatar placeholder */}
      <div className="flex flex-col items-center px-3 pb-3 gap-2">
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: 48, height: 48,
            background: 'rgba(0,196,204,0.08)',
            border: '2px dashed rgba(0,196,204,0.3)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="7" r="3.5" stroke="rgba(0,196,204,0.5)" strokeWidth="1.5" />
            <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="rgba(0,196,204,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="text-center">
          <p className="font-bold text-white" style={{ fontSize: 12 }}>Rafa Canevaro</p>
          <p style={{ color: '#555', fontSize: 10, marginTop: 2 }}>{handle}</p>
          <p style={{ color: 'rgba(0,196,204,0.4)', fontSize: 9, marginTop: 4, fontFamily: 'monospace' }}>
            Próximamente
          </p>
        </div>

        <div
          className="font-bold text-center w-full"
          style={{ background: '#111', borderRadius: 4, padding: '5px 0', fontSize: 12, color: '#333', border: '1px solid #222' }}
        >
          Seguir
        </div>
      </div>

      <div style={{ height: 1, background: '#1a1a1a' }} />

      {/* Video grid placeholder */}
      <div className="grid grid-cols-2 flex-1" style={{ gap: 1, background: '#1a1a1a' }}>
        {[0,1,2,3,4,5].map(i => (
          <div
            key={i}
            style={{
              aspectRatio: '3/4',
              background: '#0a0a0a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#1a1a1a', fontSize: 18 }}>▶</span>
          </div>
        ))}
      </div>

      {/* Label footer */}
      <div className="flex justify-center py-2" style={{ background: '#000' }}>
        <span style={{ color: '#333', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          {label.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default function ExperimentoEnVivo() {
  return (
    <section className="py-24 dot-grid" style={{ background: '#060D18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,60,60,0.12)', border: '1px solid rgba(255,60,60,0.35)', color: '#FF3C3C' }}
            >
              ● EN VIVO
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            El experimento en vivo.
          </h2>
          <p className="text-lg" style={{ color: '#7A9AB0' }}>
            Soy mi primer cliente. Seguí el proceso en tiempo real.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {PLACEHOLDERS.map((p) => (
            <PlaceholderCard key={p.handle} {...p} />
          ))}
        </div>

        <p className="text-xs mt-6 text-center" style={{ color: '#4A6A7A', fontFamily: 'monospace' }}>
          Actualizando en tiempo real.
        </p>
      </div>
    </section>
  )
}
