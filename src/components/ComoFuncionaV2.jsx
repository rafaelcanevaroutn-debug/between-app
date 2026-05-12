import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MARCA_PERSONAL = [
  { num: '01', title: 'Extracción de contexto', desc: 'Mapeamos quién sos. Tu historia, tu negocio, tu forma de hablar. Todo lo que hace que tu narrativa sea única.' },
  { num: '02', title: 'Construcción del personaje', desc: 'Armamos tu personaje digital. Atributos, tono, ángulos narrativos. El ADN de todo el contenido.' },
  { num: '03', title: 'Predicción de contenido', desc: 'El sistema analiza qué está funcionando en tu nicho ahora mismo. El filmmaker llega sabiendo exactamente qué grabar antes de prender la cámara.' },
  { num: '04', title: 'Arquitectura de canales', desc: 'Diseñamos el ecosistema de cuentas. Cada canal tiene un rol, una audiencia y un objetivo distinto.' },
  { num: '05', title: 'Grabación y producción', desc: '2 horas al mes. Un filmmaker va a donde estés con todo el contexto cargado. De esas 2 horas salen decenas de piezas.' },
  { num: '06', title: 'Distribución e iteración', desc: 'El contenido circula. El sistema analiza, ajusta y mejora. Cada mes es mejor que el anterior.' },
]

const PRODUCTOS = [
  { num: '01', title: 'Brief del producto', desc: 'Nos contás qué vendés, a quién le hablás y qué querés comunicar.' },
  { num: '02', title: 'Construcción del contexto de marca', desc: 'Mapeamos tu producto, competencia, nicho y audiencia. El ADN de contenido de tu marca.' },
  { num: '03', title: 'Arquitectura de canales', desc: 'Diseñamos el ecosistema de cuentas según tu nicho y objetivo de venta.' },
  { num: '04', title: 'Generación automatizada', desc: 'La IA genera el contenido de tu producto todos los días. Sin que vos toques nada.' },
  { num: '05', title: 'Distribución e iteración', desc: 'El sistema analiza qué convierte, ajusta y mejora el próximo ciclo.' },
]

export default function ComoFuncionaV2() {
  const [activeTab, setActiveTab] = useState('marca')

  return (
    <section id="como-funciona" className="py-48 relative bg-[#060D18] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-8"
          >
            The Protocol
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black text-white leading-tight uppercase mb-16" 
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CÓMO <span className="text-white/20">FUNCIONA.</span>
          </motion.h2>

          {/* Tab Switcher - High Fidelity Design */}
          <div className="relative p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-1">
            <div 
              className="absolute h-[calc(100%-12px)] top-1.5 transition-all duration-500 ease-[0.16,1,0.3,1] bg-cyan rounded-full shadow-[0_0_20px_rgba(0,196,204,0.4)]"
              style={{ 
                left: activeTab === 'marca' ? '6px' : 'calc(50% + 3px)',
                width: 'calc(50% - 9px)'
              }}
            />
            <button
              onClick={() => setActiveTab('marca')}
              className={`relative z-10 px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${activeTab === 'marca' ? 'text-bg' : 'text-white/40 hover:text-white'}`}
            >
              Marca Personal
            </button>
            <button
              onClick={() => setActiveTab('producto')}
              className={`relative z-10 px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${activeTab === 'producto' ? 'text-bg' : 'text-white/40 hover:text-white'}`}
            >
              Productos
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <div className="md:col-span-2 lg:col-span-3 mb-12 relative group">
                <div className="absolute -inset-1 bg-cyan/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                <div className="relative p-10 md:p-14 rounded-[2.5rem] bg-[#0A1628]/40 backdrop-blur-3xl border border-white/10 overflow-hidden text-center">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
                    <p className="text-white text-3xl md:text-5xl font-black italic uppercase leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {activeTab === 'marca' ? (
                          <>2 horas tuyas al mes. <span className="text-cyan">El sistema hace el resto.</span></>
                        ) : (
                          <>Solo necesitamos el brief. <span className="text-cyan">El sistema hace todo.</span></>
                        )}
                    </p>
                </div>
              </div>

              {(activeTab === 'marca' ? MARCA_PERSONAL : PRODUCTOS).map((step, i) => (
                <StepCard key={step.num} {...step} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function StepCard({ num, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-[1px] transition-opacity duration-500" />
      <div className="relative h-full p-10 rounded-3xl bg-[#0A1628]/40 backdrop-blur-2xl border border-white/5 hover:border-cyan/30 transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
        
        <div className="flex items-center justify-between mb-8">
          <span className="text-5xl font-black text-cyan/10 group-hover:text-cyan/30 transition-all duration-700 leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {num}
          </span>
          <div className="w-12 h-[1px] bg-white/5 group-hover:bg-cyan/20 transition-all duration-700" />
        </div>
        
        <h3 className="text-white text-xl font-bold mb-4 uppercase tracking-tight group-hover:text-cyan transition-colors duration-500">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-500">{desc}</p>

        {/* Corner Accent */}
        <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-20 transition-opacity">
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-cyan" />
        </div>
      </div>
    </motion.div>
  )
}
