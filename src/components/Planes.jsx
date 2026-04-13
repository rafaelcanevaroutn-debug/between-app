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
      'Contenido listo para publicar en tus cuentas.',
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

const CALENDLY = 'https://calendly.com/rafaelcanevaroutn'
const WHATSAPP = 'https://wa.me/5493815971971'

function Check({ highlight }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
      <circle cx="9" cy="9" r="9" fill={highlight ? 'rgba(0,196,204,0.15)' : 'rgba(0,196,204,0.08)'} />
      <path d="M5 9L7.5 11.5L13 6.5" stroke="#00C4CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Planes() {
  return (
    <section id="planes" className="py-32 relative overflow-hidden bg-[#060D18]">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,196,204,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan text-sm font-bold uppercase tracking-[0.3em] mb-4">Membresías</p>
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Elegí cómo querés <span className="text-cyan">construir tu serie.</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-white/80 font-medium">Es el mismo sistema.</p>
            <p className="text-gray/60 mt-1">Cambia la frecuencia, la profundidad y el alcance.</p>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl flex flex-col transition-all duration-500`}
              style={{
                background: '#0A1628',
                border: plan.highlight ? '2px solid rgba(0,196,204,0.5)' : '1px solid rgba(122,154,176,0.1)',
                boxShadow: plan.highlight ? '0 20px 50px rgba(0,196,204,0.1)' : 'none',
                padding: '40px 32px',
                transform: plan.highlight ? 'scale(1.02)' : 'scale(1)',
                zIndex: plan.highlight ? 10 : 1,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -12, 
                transition: { duration: 0.3 },
                boxShadow: plan.highlight 
                  ? '0 30px 60px rgba(0,196,204,0.25)' 
                  : '0 20px 40px rgba(0,196,204,0.08)',
                borderColor: plan.highlight 
                  ? 'rgba(0,196,204,0.8)' 
                  : 'rgba(0,196,204,0.3)'
              }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-6 py-2 rounded-full text-[10px] font-black text-white tracking-[0.2em] uppercase bg-gradient-to-r from-cyan to-[#00A889] shadow-[0_0_20px_rgba(0,196,204,0.4)]">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {plan.name}
                </h3>
                <p className="text-xs text-gray/60 leading-relaxed min-h-[40px]">
                  {plan.desc}
                </p>
              </div>

              <div className="h-px w-full bg-white/5 my-6" />

              <ul className="flex flex-col gap-4 flex-1">
                {plan.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <Check highlight={plan.highlight} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden px-8 py-4 rounded-full text-xs font-black text-center tracking-widest uppercase transition-all duration-300"
                  style={
                    plan.highlight
                      ? { background: 'linear-gradient(135deg,#00C4CC,#00A889)', color: '#fff' }
                      : { border: '1px solid rgba(0,196,204,0.3)', color: '#00C4CC' }
                  }
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Agendá una charla
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-on Section */}
        <motion.div 
          className="max-w-4xl mx-auto p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="bg-cyan/10 p-4 rounded-xl border border-cyan/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-2">Add-on: Canales adicionales</h4>
              <p className="text-gray/60 text-sm">
                Podés sumar más canales estratégicos para amplificar tu contenido. <br />
                Cada canal extra tiene un costo adicional.
              </p>
            </div>
            <div className="shrink-0">
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-cyan text-xs font-bold uppercase tracking-widest hover:underline transition-all">
                    Consultar extras →
                </a>
            </div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-cyan/50 to-transparent mx-auto mb-8" />
          <h4 
            className="text-3xl md:text-5xl font-black text-white uppercase italic leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
          >
            No cambia lo que hacemos. <br />
            <span className="text-cyan">Cambia qué tan fuerte y rápido crece tu serie.</span>
          </h4>
        </motion.div>

      </div>
    </section>
  )
}
