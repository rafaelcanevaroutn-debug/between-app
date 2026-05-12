import { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'

// Assets
import npc1 from '../assets/NPC1.png'
import npc2 from '../assets/NPC2.png'
import npc3 from '../assets/NPC3.png'

const CHART_DATA = [
  { time: '00:00', conversion: 1.2 },
  { time: '04:00', conversion: 1.8 },
  { time: '08:00', conversion: 2.5 },
  { time: '12:00', conversion: 4.8 },
  { time: '16:00', conversion: 5.2 },
  { time: '20:00', conversion: 6.8 },
  { time: '23:59', conversion: 7.3 },
]

const FEED_ITEMS = [
  { 
    id: 1, platform: 'TikTok', score: '94%', label: 'Analyzing', 
    title: 'Hook: La gran mentira de...', 
    img: npc1 
  },
  { 
    id: 2, platform: 'Reels', score: '88%', label: 'Predicted', 
    title: 'Contexto: Cómo escalar si...', 
    img: npc2 
  },
  { 
    id: 3, platform: 'Shorts', score: '97%', label: 'Optimizing', 
    title: 'Conversion: El sistema...', 
    img: npc3 
  },
]

function Counter({ value }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        onUpdate: (val) => setDisplayValue(val.toFixed(1)),
        ease: "easeOut"
      })
      return () => controls.stop()
    } else {
      setDisplayValue(0)
    }
  }, [value, isInView])

  return <span ref={ref}>+{displayValue}X</span>
}

export default function PredictiveDashboard() {
  return (
    <section className="py-40 relative bg-[#030712] overflow-hidden group/section">
      
      {/* Global Scanning Beam - The "Green Line" */}
      <motion.div 
          className="absolute inset-x-0 h-[1px] bg-cyan/40 z-50 pointer-events-none"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
          <div className="absolute inset-0 bg-cyan shadow-[0_0_15px_rgba(0,196,204,0.8)]" />
          {/* Scan Glow trailing effect */}
          <div className="absolute left-0 right-0 h-[120px] bg-gradient-to-b from-cyan/20 to-transparent -translate-y-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
            >
                <p className="text-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-8">Intelligence Unit</p>
                <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    PREDICCIÓN <br /> <span className="text-white/20">Y MÉTRICAS</span>
                </h2>
                <p className="text-white/40 text-xl font-medium leading-relaxed mb-12">
                    Nuestro sistema IA analiza cada pieza de contenido antes de ser publicada, prediciendo su impacto y optimizando los ganchos narrativos para maximizar tu retorno.
                </p>

                <div className="space-y-6 border-l border-white/10 pl-8">
                    {[
                        { label: 'Predicción de Engagement', val: '94.2%' },
                        { label: 'Optimización de Ganchos', val: 'Real-time' },
                        { label: 'Feedback de Conversión', val: 'Automatizado' },
                    ].map((stat, i) => (
                        <div key={i} className="flex justify-between items-center group">
                            <span className="text-white/40 text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">{stat.label}</span>
                            <span className="text-cyan font-black tracking-tighter">{stat.val}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
          </div>

          {/* Right Column: High Fidelity Dashboard */}
          <div className="lg:col-span-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                className="relative bg-[#0A1628]/60 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl overflow-hidden shadow-2xl"
            >
                {/* Grain Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    
                    {/* Processing Feed Area */}
                    <div className="relative group">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-10">Neural_Processing_Feed</p>
                        
                        <div className="space-y-4">
                            {FEED_ITEMS.map((item, i) => (
                                <motion.div 
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ delay: i * 0.15 }}
                                    className="relative flex items-center gap-5 bg-white/[0.03] border border-white/5 p-5 rounded-3xl overflow-hidden group/item hover:bg-white/[0.06] transition-colors"
                                >
                                    {/* Astronaut Avatar */}
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                                        <img src={item.img} alt="" className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-cyan text-[10px] font-black uppercase tracking-widest">{item.platform}</span>
                                            <span className="text-white/20 text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
                                        </div>
                                        <p className="text-white font-black text-sm truncate uppercase tracking-tight mb-2">{item.title}</p>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full bg-cyan shadow-[0_0_15px_rgba(0,196,204,0.6)]"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: item.score }}
                                                viewport={{ once: false }}
                                                transition={{ duration: 2, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <span className="text-white font-black text-2xl tracking-tighter">{item.score}</span>
                                        <p className="text-white/20 text-[8px] font-black uppercase tracking-widest">Confidence</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-10">Conversion_Intelligence_Lift</p>
                        
                        <div className="flex-1 min-h-[300px] relative">
                            <motion.div 
                                className="absolute -top-6 left-0 z-10"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                            >
                                <span className="text-7xl md:text-8xl font-black text-white tracking-tighter leading-none">
                                    <Counter value={7.3} />
                                </span>
                                <p className="text-cyan text-[10px] font-black uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-cyan rounded-full animate-ping" />
                                    Performance Lift Realized
                                </p>
                            </motion.div>

                            <div className="absolute inset-0 top-12">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={CHART_DATA} margin={{ top: 40, right: 0, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00C4CC" stopOpacity={0.4}/>
                                                <stop offset="95%" stopColor="#00C4CC" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area 
                                            type="monotone" 
                                            dataKey="conversion" 
                                            stroke="#00C4CC" 
                                            strokeWidth={4}
                                            fillOpacity={1} 
                                            fill="url(#colorConv)" 
                                            animationDuration={3000}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-white/[0.04] border border-white/10 rounded-3xl backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <p className="text-xs text-white/50 italic leading-relaxed relative z-10">
                                "El sistema identifica automáticamente los patrones de mayor retención de tu audiencia para iterar el guion del próximo ciclo."
                            </p>
                        </div>
                    </div>

                </div>

                {/* Corners Decoration */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  )
}
