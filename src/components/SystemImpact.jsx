import { motion } from 'framer-motion';

export default function SystemImpact() {
  const points = [
    "Más gente te entiende.",
    "Más gente te ubica.",
    "Más gente te escribe.",
    "Más gente te compra."
  ];

  return (
    <section className="relative py-40 overflow-hidden bg-[#060D18]">
      {/* Deep Space Background / Expansion effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,196,204,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#060D18_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Header Title */}
        <motion.div 
          className="text-center mb-32"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 
            className="text-white uppercase tracking-tighter leading-none italic opacity-50 text-sm md:text-base font-bold mb-8"
            style={{ letterSpacing: '0.4em' }}
          >
            The Momentum
          </h2>
          <h3 
            className="text-white text-4xl md:text-6xl font-black uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Qué cambia cuando esto <span className="text-cyan">empieza a correr</span>
          </h3>
        </motion.div>

        {/* Impact List */}
        <div className="flex flex-col items-center gap-6 mb-32">
          {points.map((point, idx) => {
            const [prefix, ...rest] = point.split(' ');
            const mainAction = rest.join(' ');
            
            return (
              <motion.div 
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <h4 
                  className="text-white font-black uppercase tracking-tight"
                  style={{ 
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                    lineHeight: 0.9,
                    textShadow: '0 0 40px rgba(255,255,255,0.05)'
                  }}
                >
                  <span className="opacity-90">{prefix} {rest[0]}</span> <span className="text-cyan">{mainAction.replace(rest[0], '').trim()}</span>
                </h4>
              </motion.div>
            );
          })}
        </div>

        {/* The Final Punchline */}
        <div className="max-w-5xl mx-auto text-center relative">
          {/* Decorative lines */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-16 w-px h-12 bg-cyan/30" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-white/50 mb-10 font-medium">
              No por un video.
            </p>
            
            <h5 
              className="text-white font-black leading-tight uppercase"
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2.5rem, 7vw, 6rem)'
              }}
            >
              Por la <span className="text-cyan">acumulación de tu historia</span> <br />
              <span className="relative">
                en el tiempo.
                <motion.div 
                  className="absolute -bottom-2 left-0 h-2 bg-cyan/40 rounded-full blur-[2px]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                />
              </span>
            </h5>
          </motion.div>
        </div>

      </div>

      {/* Background Decorative "Orbital" dots */}
      <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-cyan rounded-full animate-pulse" />
      <div className="absolute bottom-[30%] right-[15%] w-1.5 h-1.5 bg-cyan rounded-full animate-pulse delay-700" />
    </section>
  );
}
