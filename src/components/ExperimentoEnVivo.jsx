export default function ExperimentoEnVivo() {
  return (
    <section className="py-24 dot-grid" style={{ background: '#060D18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,60,60,0.12)', border: '1px solid rgba(255,60,60,0.35)', color: '#FF3C3C' }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse" style={{ verticalAlign: 'middle' }} />
              EN VIVO
            </span>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, letterSpacing: '0.04em', color: '#fff', margin: '0 0 12px', lineHeight: 1 }}>
            EL EXPERIMENTO EN VIVO.
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#7A9AB0' }}>
            Soy mi primer cliente. Las cuentas se activan esta semana.
          </p>
        </div>

        {/* Bloque central */}
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: 'rgba(10,22,40,0.8)',
            border: '1px solid rgba(0,196,204,0.2)',
            borderRadius: '16px',
            padding: '40px 48px',
            backdropFilter: 'blur(8px)',
          }}>
            {/* Icono */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 52, height: 52,
              background: 'rgba(0,196,204,0.1)',
              borderRadius: '12px',
              marginBottom: 20,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" fill="#00C4CC" />
              </svg>
            </div>

            {/* Texto principal */}
            <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
              5 canales en proceso de activación
            </p>

            {/* Barra de progreso */}
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 999, height: 8, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{
                width: '20%', height: '100%',
                background: 'linear-gradient(90deg, #00C4CC, #00A889)',
                borderRadius: 999,
                boxShadow: '0 0 10px rgba(0,196,204,0.5)',
              }} />
            </div>

            {/* Labels de la barra */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: '0.75rem', color: '#00C4CC', fontWeight: 700 }}>20%</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Warmup semana 1</span>
            </div>

            {/* Footer */}
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              Actualizando en tiempo real · Semana 1 de 4
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
