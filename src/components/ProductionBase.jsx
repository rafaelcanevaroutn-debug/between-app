import { motion } from 'framer-motion';
import supernova from '../assets/supernova.png';

export default function ProductionBase() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#060D18]">
      {/* Cosmic Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${supernova})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.3
        }}
      />
      
      {/* Atmosphere overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060D18] via-transparent to-[#060D18] z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,196,204,0.1),transparent_50%)] z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Section Header */}
        <motion.div 
          className="max-w-4xl mb-20"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cyan text-xs font-bold uppercase tracking-[.4em] mb-4">Production Module: 02</p>
          <h2 
            className="mb-8"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif", 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)', 
              lineHeight: 1,
              color: '#fff',
            }}
          >
            VOS GRABÁS. <span style={{ color: '#00C4CC' }}>DE AHÍ SALE TODO.</span>
          </h2>
          <div className="space-y-6">
            <p className="text-xl md:text-2xl font-bold text-white/90">
              Registrás lo que ya estás viviendo, con una dirección clara.
            </p>
            <p className="text-lg text-gray/80 leading-relaxed max-w-2xl">
              Between toma eso — junto con las entrevistas — y lo convierte en una serie de contenido que se sostiene en el tiempo.
            </p>
          </div>
        </motion.div>

        {/* Content Structure Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Block 1: The Interviews */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-10 rounded-sm border border-white/10 bg-[#0A1628]/40 backdrop-blur-xl h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center border border-cyan/20">
                  <span className="font-mono text-cyan text-sm font-bold">1-4</span>
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Base de Producción</h3>
              </div>
              <div className="space-y-6 flex-1">
                <p className="text-white font-semibold">En cada mes hay una base clara de producción.</p>
                <div className="space-y-4">
                  <div className="p-4 border-l-2 border-cyan/30 bg-cyan/5">
                    <p className="text-gray/90 text-sm">Se parte de una a cuatro entrevistas según el plan. De ahí salen múltiples piezas de contenido listas para publicar.</p>
                  </div>
                  <div className="p-4 border-l-2 border-cyan/30 bg-cyan/5">
                    <p className="text-gray/90 text-sm">Se definen líneas de contenido que se sostienen en el tiempo. Los episodios se conectan entre sí y construyen continuidad.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Block 2: The Moments */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan/20 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000 delay-150"></div>
            <div className="relative p-10 rounded-sm border border-white/10 bg-[#0A1628]/40 backdrop-blur-xl h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center border border-cyan/20">
                  <span className="font-mono text-cyan text-sm font-bold">2-4</span>
                </div>
                <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Registro Semanal</h3>
              </div>
              <div className="space-y-6 flex-1">
                <p className="text-white font-semibold">Además, grabás entre dos y cuatro momentos por semana según tu rutina.</p>
                <div className="space-y-4">
                  <div className="p-4 border-l-2 border-cyan/30 bg-cyan/5">
                    <p className="text-gray/90 text-sm">Sabés qué registrar y por qué. Todo eso se transforma en contenido sin frenar tu día a día.</p>
                  </div>
                </div>
                {/* Tech Deco Elements */}
                <div className="mt-8 pt-6 border-t border-white/5 flex gap-2">
                  {[1,2,3,4,5,6,7].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-cyan' : 'bg-white/10'}`} />
                  ))}
                  <span className="text-[10px] text-cyan ml-2 font-mono">SIGNAL_OK</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Closing Card */}
        <motion.div 
          className="text-center relative py-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-16 bg-gradient-to-b from-cyan to-transparent opacity-50" />
          <div className="max-w-3xl mx-auto pt-20">
            <h4 
              className="text-4xl md:text-5xl font-black text-white italic mb-6 leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}
            >
              NO PARTÍS DE CERO. <br />
              <span className="text-cyan">TRABAJAMOS SOBRE LO QUE YA ESTÁS HACIENDO.</span>
            </h4>
            <div className="w-24 h-1 bg-cyan mx-auto rounded-full blur-[1px]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
