import astronautaStory from '../assets/astronautalogo.png';

export default function StorySeries() {
  const blocks = [
    {
      title: "Grabás lo que vivís, pero no hay estructura.",
      text: "Mostrás momentos reales, avances, decisiones. Pero no hay un hilo que conecte todo.\n\nEntonces lo que hacés se ve fragmentado."
    },
    {
      title: "Tenés experiencia, pero no está transformada.",
      text: "Sabés, aprendiste, ejecutás todos los días. Pero no hay un sistema que convierta eso en contenido claro.\n\nEntonces lo que construís no se transmite."
    },
    {
      title: "Falta consistencia real.",
      text: "No alcanza con tener buenos momentos. Necesitás aparecer de forma constante.\n\nSin consistencia, no hay historia que avance."
    },
    {
      title: "Todo depende de vos.",
      text: "Si no grabás, no hay contenido. Si no pensás qué subir, no pasa nada.\n\nY eso hace imposible sostener presencia en el tiempo."
    }
  ];

  return (
    <section
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${astronautaStory})`,
        backgroundSize: 'cover',
        backgroundPosition: '65% center', // Ajuste estratégico para que el astronauta se vea bien
        backgroundAttachment: 'fixed',
        backgroundColor: '#060D18'
      }}
    >
      {/* Overlay global sutil para amalgamar la imagen */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(6,13,24,0.7) 0%, rgba(6,13,24,0.85) 100%)',
          zIndex: 1
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col gap-12">

        {/* Header - Caja de cristal */}
        <div
          className="max-w-3xl p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl"
          style={{
            background: 'rgba(6, 13, 24, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              lineHeight: 1,
              color: '#fff',
            }}
          >
            Between transforma tu experiencia <span style={{ color: '#00C4CC' }}>en una serie.</span>
          </h2>

          <div className="space-y-4">
            <p className="text-gray/90 text-md md:text-base leading-relaxed">
              Tenés algo real. Estás viviendo una historia.
            </p>
          </div>
        </div>

        {/* Grid de bloques - Estilo Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-3/4 lg:w-2/3">
          {blocks.map((block, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-cyan/30"
              style={{
                background: 'rgba(10, 22, 40, 0.5)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <h3
                className="mb-3 text-sm md:text-base font-bold uppercase tracking-wider transition-colors"
                style={{ color: '#00C4CC' }}
              >
                {block.title}
              </h3>
              <p className="text-white/60 text-xs md:text-sm leading-relaxed whitespace-pre-line group-hover:text-white/80 transition-colors">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Cierre - Floating Quote */}
        <div className="max-w-2xl mt-4">
          <div
            className="inline-block p-6 md:p-8 rounded-2xl border-l-4 border-cyan backdrop-blur-md"
            style={{ background: 'rgba(6,13,24,0.6)' }}
          >
            <h3 className="text-lg md:text-xl font-bold text-white italic leading-relaxed">
              "No se trata de subir contenido. Se trata de convertir lo que vivís en una historia que avance, se vea y se entienda."
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
