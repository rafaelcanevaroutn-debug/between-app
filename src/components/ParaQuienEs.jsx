import { motion } from 'framer-motion'

const AUDIENCES = [
  {
    title: 'Founders y emprendedores',
    desc: 'Que construyen algo real y nadie lo sabe.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    title: 'Pymes y negocios',
    desc: 'Que necesitan presencia constante sin perder tiempo.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 3v18M15 3v18" />
      </svg>
    )
  },
  {
    title: 'Marcas con producto',
    desc: 'Que quieren volumen sin equipo de producción.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 8V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
        <path d="M17 5H7a2 2 0 0 0-2 2v1h14V7a2 2 0 0 0-2-2z" />
      </svg>
    )
  },
  {
    title: 'Guías y experiencias',
    desc: 'Que necesitan llenar cupos de forma constante.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  }
]

export default function ParaQuienEs() {
  return (
    <section id="para-quien-es" className="py-48 relative bg-[#030712] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-cyan/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          {/* Header */}
          <div className="lg:w-2/5 lg:sticky lg:top-32">
            <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-8"
            >
                Targeting System
            </motion.p>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-9xl font-black text-white leading-[0.85] uppercase mb-12" 
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PARA <br />
              <span className="text-white/20">QUIÉN ES.</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/40 text-xl leading-relaxed max-w-sm"
            >
              Diseñamos Between para aquellos que tienen una visión clara pero no tienen el tiempo para ser su propia agencia de contenido.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-8">
            {AUDIENCES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group h-[340px]"
              >
                {/* Glow Background */}
                <div className="absolute -inset-1 bg-cyan/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative h-full p-10 md:p-12 rounded-[2.5rem] bg-[#0A1628]/40 backdrop-blur-2xl border border-white/5 group-hover:border-cyan/30 transition-all duration-700 overflow-hidden flex flex-col">
                  {/* Grain Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-cyan/5 border border-white/5 flex items-center justify-center text-cyan mb-10 group-hover:bg-cyan group-hover:text-bg group-hover:shadow-[0_0_20px_rgba(0,196,204,0.4)] transition-all duration-700">
                    <div className="scale-125">{item.icon}</div>
                  </div>
                  
                  <h3 className="text-white text-2xl font-black mb-4 uppercase tracking-tight leading-none group-hover:text-cyan transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-lg leading-snug group-hover:text-white/70 transition-colors">
                    {item.desc}
                  </p>

                  <div className="mt-auto pt-6 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-cyan/20 group-hover:bg-cyan group-hover:shadow-[0_0_10px_#00C4CC] transition-all duration-500" />
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
