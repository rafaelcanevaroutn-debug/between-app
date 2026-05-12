import { motion } from 'framer-motion';

const PLANS = [
  {
    name: 'SERIES',
    desc: 'Para empezar a construir tu historia con consistencia y dirección.',
    badge: null,
    highlight: false,
    items: [
      'Incluye una entrevista mensual.',
      'Dirección para grabar contenido propio.',
      'Producción de episodios y clips del mes.',
      'Contenido listo para publicar en tus canales.',
      'Estructura narrativa base para sostener tu historia.',
      'Análisis de contenido y ajustes de enfoque.',
      'Testeo de líneas de contenido.'
    ],
  },
  {
    name: 'STUDIO',
    desc: 'Para sostener presencia y empezar a amplificar.',
    badge: 'RECOMENDADO',
    highlight: true,
    items: [
      'Incluye dos entrevistas mensuales.',
      'Mayor volumen de contenido y episodios.',
      'Narrativa más trabajada y con continuidad.',
      'Contenido listo para publicar.',
      'Activación en canales estratégicos.',
      'Análisis y optimización continua.',
      'Evolución de formatos según resultados.'
    ],
  },
  {
    name: 'ORIGINAL',
    desc: 'Para llevar tu serie a un nivel de presencia sostenida.',
    badge: null,
    highlight: false,
    items: [
      'Incluye cuatro entrevistas mensuales.',
      'Alto volumen de contenido en formato serie.',
      'Múltiples líneas narrativas.',
      'Contenido listo y flujo constante.',
      'Activación en más canales estratégicos.',
      'Gestión prioritaria del sistema.',
      'Seguimiento estratégico continuo.'
    ],
  },
]

const CALENDLY = 'https://calendly.com/rafaelcanevaroutn/30min'
const WHATSAPP = 'https://wa.me/5493815971971'

function Check({ highlight }) {
  return (
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan/10 flex items-center justify-center border border-cyan/20">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L4.5 8L9.5 3" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

export default function Planes() {
  return (
    <section id="planes" className="py-48 relative overflow-hidden bg-[#060D18]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,196,204,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-8"
          >
            Subscription Models
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white leading-[0.85] uppercase mb-16" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ELEGÍ CÓMO <br />
            <span className="text-white/20">CONSTRUIR.</span>
          </motion.h2>
          <div className="max-w-2xl">
            <p className="text-white/60 text-xl md:text-2xl font-medium leading-relaxed">
              Es el mismo sistema. Cambia la frecuencia, la profundidad y el alcance.
            </p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-32">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group flex flex-col"
            >
              {/* Highlight Glow Border */}
              <div className={`absolute -inset-[2px] rounded-[2.5rem] transition-all duration-700 blur-[1px] opacity-20 group-hover:opacity-60 ${plan.highlight ? 'bg-gradient-to-br from-cyan via-emerald to-transparent' : 'bg-white/10'}`} />
              
              <div className="relative flex-1 flex flex-col p-10 md:p-14 rounded-[2.5rem] bg-[#0A1628]/60 backdrop-blur-3xl border border-white/5 group-hover:border-white/10 transition-all duration-700 overflow-hidden">
                {/* Grain Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

                {plan.badge && (
                  <div className="absolute top-10 right-10">
                    <span className="px-5 py-2 rounded-full text-[10px] font-black text-white tracking-[0.2em] uppercase bg-cyan shadow-[0_0_20px_rgba(0,196,204,0.4)]">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-12">
                  <h3 className="text-5xl font-black text-white leading-none uppercase mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {plan.name}
                  </h3>
                  <p className="text-white/40 text-lg leading-tight italic">
                    {plan.desc}
                  </p>
                </div>

                <div className="w-full h-px bg-white/5 mb-10" />

                <ul className="space-y-6 flex-1 mb-12">
                  {plan.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-white/50 group-hover:text-white/70 transition-colors text-sm font-medium">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-6 rounded-full text-center text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 ${plan.highlight ? 'bg-cyan text-bg shadow-[0_0_30px_rgba(0,196,204,0.3)]' : 'border border-cyan/30 text-cyan hover:bg-cyan/5 hover:border-cyan'}`}
                >
                  Agendar charla
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-on Section - High Fidelity */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group max-w-5xl mx-auto"
        >
          <div className="absolute -inset-1 bg-cyan/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative p-10 md:p-14 rounded-[3rem] bg-white/[0.02] backdrop-blur-2xl border border-white/5 overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
            
            <div className="w-24 h-24 rounded-3xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shadow-[inset_0_0_20px_rgba(0,196,204,0.1)]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-3xl font-black text-white uppercase mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Add-on: Canales adicionales</h4>
              <p className="text-white/40 text-lg leading-relaxed">
                Podés sumar más canales estratégicos para amplificar tu contenido. <br />
                Cada canal extra tiene un costo adicional.
              </p>
            </div>
            
            <a 
              href={WHATSAPP} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-5 rounded-full border border-white/10 text-white/40 text-xs font-black uppercase tracking-[0.2em] hover:text-cyan hover:border-cyan transition-all duration-500"
            >
              Consultar extras
            </a>
          </div>
        </motion.div>

        {/* Closing Quote */}
        <div className="mt-48 text-center">
            <div className="w-px h-24 bg-gradient-to-b from-cyan/30 to-transparent mx-auto mb-12" />
            <motion.h3 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl md:text-6xl font-black italic text-white uppercase leading-[0.9] max-w-4xl mx-auto"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
                No cambia lo que hacemos. <br />
                <span className="text-cyan">Cambia qué tan fuerte y rápido crece tu serie.</span>
            </motion.h3>
        </div>

      </div>
    </section>
  )
}
