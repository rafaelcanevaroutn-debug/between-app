export default function Comunidad() {
  return (
    <section className="relative py-32 overflow-hidden" style={{ background: '#060D18' }}>
      {/* Glow central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(0,196,204,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Grid de puntos decorativos */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,196,204,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-10">
          <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg, transparent, #00C4CC)' }} />
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ border: '1px solid rgba(0,196,204,0.4)', color: '#00C4CC', background: 'rgba(0,196,204,0.06)' }}
          >
            Comunidad
          </span>
          <div style={{ height: 1, width: 48, background: 'linear-gradient(90deg, #00C4CC, transparent)' }} />
        </div>

        {/* Título */}
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-10">
          No estás solo.
        </h2>

        {/* Cuerpo */}
        <p className="text-lg md:text-xl leading-relaxed mb-12" style={{ color: '#7A9AB0', maxWidth: 640, margin: '0 auto 3rem' }}>
          Between es el lugar donde los que construyen se vuelven visibles juntos. Founders, emprendedores y marcas de todos los rubros — todos con el mismo objetivo: que su historia llegue a más gente. No importa de dónde seas ni qué construyas. Si tenés algo real para dar, acá encontrás tu lugar.
        </p>

        {/* Frase destacada */}
        <div
          className="inline-block rounded-2xl px-8 py-5"
          style={{ background: 'rgba(0,196,204,0.05)', border: '1px solid rgba(0,196,204,0.2)' }}
        >
          <p className="text-xl md:text-2xl font-bold text-white">
            "Estar en Between es un diferencial en sí mismo."
          </p>
        </div>
      </div>
    </section>
  )
}
