import { motion } from 'framer-motion';
import astronautaBg from '../assets/supernova.png';

export default function SeriesSystem() {
  const steps = [
    {
      num: "01",
      title: "Contás tu historia con foco",
      status: "FOCUSING",
      desc: "Between te arma preguntas y ángulos para que sepas exactamente qué grabar día a día. Nos juntamos por Meet o presencialmente para sumar entrevistas"
    },
    {
      num: "02",
      title: "Lo convertimos en episodios",
      status: "PROCESSING",
      desc: "De una sesión salen múltiples piezas. Pero no son clips sueltos: se organizan como capítulos de una serie que construye tu narrativa mes a mes. Cada episodio suma al anterior."
    },
    {
      num: "03",
      title: "Tu historia se mueve sola",
      status: "SYNCING",
      desc: "El contenido se distribuye en múltiples canales y formatos. Sin que vos tengas que hacer nada más. Mientras seguís haciendo lo tuyo, la serie sigue avanzando."
    }
  ];

  return (
    <section id="servicios" className="relative py-32 overflow-hidden bg-[#060D18]">
      {/* Cinematic Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${astronautaBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.4
        }}
      />

      {/* Tech Overlay: Scanlines & Vignette */}
      <div
        className="absolute inset-0 z-1"
        style={{
          background: 'radial-gradient(circle, transparent 20%, rgba(6,13,24,0.9) 100%)',
          pointerEvents: 'none'
        }}
      />
      <div className="absolute inset-0 z-1 opacity-[0.03] pointer-events-none bg-[repeating-linear-gradient(rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_4px)]" />

      {/* Viewfinder UI Elements */}
      <div className="absolute inset-6 md:inset-12 border border-white/10 z-2 pointer-events-none rounded-sm">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40" />

        {/* REC & Timecode */}
        <div className="absolute top-4 left-6 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
          <span className="font-mono text-sm font-bold text-white tracking-widest">● REC</span>
        </div>
        <div className="absolute top-4 right-6 font-mono text-sm text-white/60 tracking-tighter">
          00:00:24:12
        </div>
        <div className="absolute bottom-4 left-6 font-mono text-xs text-white/40 tracking-widest uppercase">
          Production Mode: ACTIVE
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">

        {/* Main Header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            className="mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              lineHeight: 0.9,
              color: '#fff',
              letterSpacing: '-0.02em'
            }}
          >
            CONVERTIMOS TU EXPERIENCIA EN UNA <br />
            <span className="gradient-text">SERIE QUE AVANZA TODOS LOS MESES.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium">
            Between toma lo que ya estás viviendo y lo transforma en contenido <br className="hidden md:block" /> estructurado, constante y con dirección. No empezás de cero. <br className="hidden md:block" /> Trabajamos sobre lo que ya estás construyendo.
          </p>
        </motion.div>

        {/* Intermediate Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#fff',
            letterSpacing: '0.05em'
          }}>
            BIENVENIDO AL SET. <span className="text-cyan">NOSOTROS DIRIGIMOS.</span>
          </h3>
          <div className="w-24 h-1 bg-cyan mt-2" />
        </motion.div>

        {/* Console Monitors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="relative group p-8 rounded-sm border border-white/10 overflow-hidden bg-[#0A1628]/60 backdrop-blur-md transition-all duration-300 hover:border-cyan/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              {/* Card Scanlines Overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[repeating-linear-gradient(rgba(0,196,204,0.1)_0px,rgba(0,196,204,0.1)_1px,transparent_1px,transparent_2px)]" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                  <span className="font-mono text-xs text-cyan/70 font-bold tracking-widest">{step.num}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    <span className="font-mono text-[10px] text-cyan uppercase tracking-tighter">{step.status}</span>
                  </div>
                </div>

                <h3
                  className="text-2xl font-bold mb-4 text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
                >
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed whitespace-pre-line group-hover:text-white/90 transition-colors">
                  {step.desc}
                </p>

                {/* Decorative Bottom Bar */}
                <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan/20 w-1/3 group-hover:w-full transition-all duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CRITICAL DATA BLOCK */}
        <motion.div
          className="relative group max-w-5xl mx-auto mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-cyan/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative p-8 md:p-12 border border-cyan/30 rounded-sm bg-[#060D18]/80 backdrop-blur-2xl text-center md:text-left">
            {/* Corners Accent */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-2 py-0.5 bg-cyan/10 text-cyan text-[10px] font-bold border border-cyan/20">CORE INSIGHT</span>
                  <div className="flex-1 h-[1px] bg-cyan/20" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  ESTO NO ES CONTENIDO. <br />
                  <span className="text-cyan">ES ACUMULACIÓN.</span>
                </h3>
                <div className="space-y-4">
                  {[
                    "Cada mes suma. Cada episodio construye.",
                    "Cada aparición refuerza quién sos.",
                    "No empezás de cero. Trabajamos sobre lo que ya estás construyendo."
                  ].map((txt, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-white/70 justify-center md:justify-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                    >
                      <div className="w-1.5 h-1.5 bg-cyan rotate-45" />
                      <p className="text-sm md:text-base font-semibold italic">{txt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 w-px h-32 bg-cyan/20 hidden md:block" />

              <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <p className="text-sm text-white/40 uppercase tracking-[0.3em] font-bold mb-4">Final Verdict</p>
                <h4 className="text-xl md:text-2xl font-bold text-white leading-snug">
                  "Lo importante no es subir más. <br />
                  Se trata de que lo que subas <br />
                  <span className="text-cyan">construya algo real."</span>
                </h4>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CALL TO ACTION */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="font-mono text-cyan text-sm tracking-[0.4em] mb-8 uppercase">Ready to Start</p>
          <h2 className="text-white text-4xl md:text-6xl font-black mb-10 uppercase tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            VOS CONSTRUÍS. <span className="text-cyan">NOSOTROS HACEMOS QUE EL MUNDO LO VEA.</span>
          </h2>
          <a
            href="#contacto"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-cyan text-[#060D18] font-bold text-lg uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,196,204,0.4)]"
          >
            → Quiero entrar al set
          </a>
        </motion.div>

      </div>
    </section>
  );
}
