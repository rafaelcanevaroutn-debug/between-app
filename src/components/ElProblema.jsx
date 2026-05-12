import { motion } from 'framer-motion'

export default function ElProblema() {
  return (
    <section id="el-problema" className="py-48 relative overflow-hidden bg-[#030712]">
      {/* Background Decorative Elements - High Intensity Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Optical Lens Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent -rotate-6 pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: The Agency Reality */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-8">System Diagnostic</p>
            <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              EL NEGOCIO <br />
              <span className="text-white/20">INVISIBLE.</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-white/60 text-xl leading-relaxed max-w-md">
                Las agencias te cobran por 5 posteos a la semana. El community manager va una vez, graba lo mismo de siempre y se va. 
              </p>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-red-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative p-8 rounded-3xl bg-[#0A1628]/40 backdrop-blur-2xl border border-white/5 overflow-hidden">
                    {/* Grain Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
                    <p className="text-white font-bold text-2xl leading-tight italic">
                        "Pagás. Y tu negocio sigue invisible."
                    </p>
                    <div className="mt-4 w-16 h-1 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: The Between Solution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Solution Card with intense depth */}
            <div className="relative group">
              {/* Brilliant Cyan Glow Border */}
              <div className="absolute -inset-[2px] bg-gradient-to-br from-cyan via-cyan/20 to-transparent rounded-[2.5rem] opacity-30 group-hover:opacity-60 blur-[1px] transition-opacity duration-700" />
              
              <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-[#0A1628]/60 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(0,196,204,0.1)] overflow-hidden">
                {/* Grain Texture */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
                
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                  <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2v20M2 12h20" />
                    <path d="m4.93 4.93 14.14 14.14M4.93 19.07 19.07 4.93" />
                  </svg>
                </div>

                <h3 className="text-cyan text-xs font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                    <span className="w-8 h-px bg-cyan/30" />
                    El Diagnóstico
                </h3>
                
                <div className="space-y-6">
                    <p className="text-white/40 text-2xl font-bold leading-tight">
                        El problema no es que no tenés contenido. 
                    </p>
                    <p className="text-white text-3xl md:text-4xl font-black leading-[1.1] uppercase italic" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        Es que no tenés un <span className="text-cyan underline decoration-cyan/30 underline-offset-8">sistema</span> que prediga qué funciona y lo ejecute en volumen.
                    </p>
                </div>

                <div className="mt-16 flex items-center gap-6">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A1628] bg-cyan/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        </div>
                    ))}
                  </div>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] font-monospace text-cyan/50 tracking-[0.3em]">PREDICTIVE_UNIT_v4</span>
                </div>
              </div>
            </div>

            {/* Decorative Orbitals */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-cyan/5 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-white/5 rounded-full animate-[spin_35s_linear_infinite]" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
