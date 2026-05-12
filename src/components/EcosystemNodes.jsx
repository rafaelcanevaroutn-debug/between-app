import { motion } from 'framer-motion'

const NODES = [
  // TikTok Nodes
  { id: 'tt1', type: 'tiktok', x: -300, y: -150, size: 56 },
  { id: 'tt2', type: 'tiktok', x: -150, y: -250, size: 40 },
  { id: 'tt3', type: 'tiktok', x: -350, y: 50, size: 48 },
  // Instagram Nodes
  { id: 'ig1', type: 'instagram', x: 300, y: -150, size: 56 },
  { id: 'ig2', type: 'instagram', x: 150, y: -250, size: 40 },
  { id: 'ig3', type: 'instagram', x: 350, y: 50, size: 48 },
  // YouTube Nodes
  { id: 'yt1', type: 'youtube', x: 0, y: 250, size: 64 },
  { id: 'yt2', type: 'youtube', x: -180, y: 180, size: 44 },
  { id: 'yt3', type: 'youtube', x: 180, y: 180, size: 44 },
  // Density Nodes
  { id: 'd1', type: 'tiktok', x: -280, y: 150, size: 32 },
  { id: 'd2', type: 'instagram', x: 280, y: 150, size: 32 },
]

const LOGOS = {
  tiktok: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.67c0 2.106-1.707 3.813-3.813 3.813a3.813 3.813 0 0 1-3.813-3.813c0-2.106 1.707-3.813 3.813-3.813.429 0 .831.071 1.203.201V8.604a7.261 7.261 0 0 0-1.203-.101c-4.012 0-7.259 3.247-7.259 7.259 0 4.012 3.247 7.259 7.259 7.259 4.012 0 7.259-3.247 7.259-7.259V8.053a8.231 8.231 0 0 0 5.483 2.083V6.686h-1.458z"/>
    </svg>
  ),
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  ),
  youtube: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

const COLORS = {
  tiktok: '#00F2EA',
  instagram: '#FF0050',
  youtube: '#FF0000',
}

export default function EcosystemNodes() {
  return (
    <section className="py-40 relative bg-[#030712] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] bg-cyan/[0.03] blur-[200px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Header */}
        <div className="mb-32">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan text-[10px] font-black uppercase tracking-[0.5em] mb-8"
          >
            Omnichannel Automation
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-white leading-tight uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            UN SISTEMA CENTRALIZADO QUE <br />
            <span className="text-white/20">ALIMENTA TODOS TUS CANALES.</span>
          </motion.h2>
        </div>

        {/* The Ecosystem Map - CONTAINER MUST HAVE NO FLEX */}
        <div className="relative h-[700px] w-full">
          
          {/* SVG Links & Particles (Origin must be 50% 50%) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="linkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,196,204,0)" />
                <stop offset="50%" stopColor="rgba(0,196,204,0.4)" />
                <stop offset="100%" stopColor="rgba(0,196,204,0)" />
              </linearGradient>
            </defs>
            {NODES.map((node) => (
              <g key={node.id}>
                <motion.line
                  x1="50%" y1="50%"
                  x2={`calc(50% + ${node.x}px)`} y2={`calc(50% + ${node.y}px)`}
                  stroke="url(#linkGrad)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                />
                
                <motion.circle
                  r="1.5"
                  fill="#00C4CC"
                  animate={{ 
                    cx: ["50%", `calc(50% + ${node.x}px)`],
                    cy: ["50%", `calc(50% + ${node.y}px)`],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 2
                  }}
                />

                <motion.circle
                  r="1"
                  fill="#FFFFFF"
                  animate={{ 
                    cx: [`calc(50% + ${node.x}px)`, "50%"],
                    cy: [`calc(50% + ${node.y}px)`, "50%"],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: 1 + Math.random() * 2
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Central Core - EXACT CENTER */}
          <motion.div 
            className="absolute z-20 w-64 h-64 rounded-full flex items-center justify-center overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ 
                left: '50%', 
                top: '50%', 
                x: '-50%',
                y: '-50%',
                background: '#030712',
                border: '1px solid rgba(0,196,204,0.3)',
                boxShadow: '0 0 60px rgba(0,196,204,0.15)'
            }}
          >
            {/* Multi-layered Glow */}
            <div className="absolute inset-0 bg-cyan blur-[80px] opacity-20 animate-pulse" />
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center backdrop-blur-3xl rounded-full border border-white/5">
                <span className="text-cyan text-[10px] font-black uppercase tracking-widest mb-3 block">Intelligence Core</span>
                <h3 className="text-white font-black text-3xl leading-none uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    2 Horas <br /> <span className="text-white/20">DE</span> CONTEXTO
                </h3>
            </div>

            {/* Rotating Rings */}
            <motion.div 
                className="absolute inset-[-20px] border border-white/5 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Satellite Nodes */}
          {NODES.map((node, i) => (
            <motion.div
              key={node.id}
              className="absolute z-30"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                x: node.x,
                y: node.y
              }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              style={{
                left: '50%',
                top: '50%',
                width: node.size,
                height: node.size,
                marginLeft: -(node.size/2),
                marginTop: -(node.size/2),
              }}
            >
                <div className="relative group w-full h-full">
                    <div 
                        className="absolute inset-0 rounded-full blur-[20px] opacity-0 group-hover:opacity-40 transition-all duration-500"
                        style={{ backgroundColor: COLORS[node.type] }}
                    />
                    <div className="relative w-full h-full rounded-full bg-[#0A1628]/90 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:border-white/30 transition-all duration-300">
                        <div className="scale-[0.7] text-white/50 group-hover:text-white group-hover:scale-100 transition-all duration-500">
                            {LOGOS[node.type]}
                        </div>
                    </div>
                </div>
            </motion.div>
          ))}

        </div>

        {/* Footer Message */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 max-w-2xl mx-auto"
        >
            <p className="text-white/30 text-xl font-medium">
                Toda la data recolectada de cada canal regresa al núcleo en tiempo real, permitiendo que la IA optimice la próxima tanda de contenido de forma automática.
            </p>
        </motion.div>

      </div>
    </section>
  )
}
