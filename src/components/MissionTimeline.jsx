import { motion } from 'framer-motion';
import missionLog from '../assets/mission-log.png';

export default function MissionTimeline() {
  const roadmap = [
    {
      week: "Semana 1",
      title: "Activación de Narrativa",
      items: [
        "Se define la narrativa base.",
        "Se identifican líneas de contenido.",
        "Se realiza la primera entrevista."
      ],
      outcome: "De ahí salen las primeras piezas y episodios. Se establece la base de la serie."
    },
    {
      week: "Semanas 2 y 3",
      title: "Registro de Campo",
      items: [
        "El cliente graba momentos reales de su proceso.",
        "Eso se transforma en contenido.",
        "Se mantiene la continuidad de la serie.",
        "Se ajusta lo que funciona."
      ]
    },
    {
      week: "Semana 4",
      title: "Cierre de Ciclo y Sincronización",
      items: [
        "Nueva entrevista.",
        "Profundización de temas.",
        "Se generan nuevos episodios para el siguiente ciclo."
      ]
    },
    {
      week: "Resultado",
      title: "Misión en Órbita",
      items: [
        "Una serie en marcha.",
        "Contenido constante.",
        "Presencia sostenida."
      ],
      outcome: "Más gente entiende qué hacés. Más gente te escribe. Más oportunidades aparecen."
    }
  ];

  return (
    <section id="como-funciona" className="relative py-32 overflow-hidden bg-[#060D18]">
      {/* Background with technical overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${missionLog})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060D18] via-transparent to-[#060D18] z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#060D18_100%)] z-1" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Process Visualization</span>
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Cómo se ve esto <span className="text-cyan">en la práctica</span>
          </h2>
          <p className="text-xl text-white/60">Ejemplo de cómo una historia se convierte en una serie.</p>
        </motion.div>

        {/* Vertical Timeline Path */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px bg-dashed-line border-l border-dashed border-cyan/30 z-0" />

          <div className="space-y-24 relative z-10">
            {roadmap.map((step, idx) => (
              <motion.div 
                key={idx}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, x: typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : (idx % 2 === 0 ? -30 : 30) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              >
                {/* week indicator node */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 -translate-x-1/2 md:translate-x-[-50%] w-8 h-8 rounded-full bg-[#060D18] border-2 border-cyan shadow-[0_0_15px_rgba(0,196,204,0.5)] z-20 flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                </div>

                {/* Content Card */}
                <div className={`w-[calc(100%-3.5rem)] md:w-[45%] flex flex-col ${idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'} ml-14 md:ml-0`}>
                  <div className={`p-6 md:p-8 rounded-2xl border border-white/5 bg-[#0A1628]/60 backdrop-blur-xl relative group hover:border-cyan/30 transition-colors duration-500`}>
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                      <span className="text-4xl font-black text-white italic">{idx + 1}</span>
                    </div>
                    
                    <span className="text-cyan text-xs font-black uppercase tracking-widest mb-3 block">{step.week}</span>
                    <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                      {step.title}
                    </h3>
                    
                    <ul className={`space-y-3 mb-6 ${idx % 2 !== 0 ? 'md:items-end' : ''}`}>
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray/70">
                          {idx % 2 === 0 ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan/40 mt-1.5 shrink-0" />
                          ) : (
                            <div className="hidden md:block flex-1" />
                          )}
                          <span className="flex-1">{item}</span>
                          {idx % 2 !== 0 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan/40 mt-1.5 shrink-0" />
                          )}
                        </li>
                      ))}
                    </ul>

                    {step.outcome && (
                      <div className={`pt-6 border-t border-white/5 text-xs italic text-cyan/70 font-medium`}>
                        {step.outcome}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Closure Block */}
        <motion.div 
          className="mt-40 text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-16 h-[1px] bg-cyan/30" />
          <h4 
            className="text-white text-3xl md:text-5xl font-black italic max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            NO CAMBIA LO QUE HACÉS. <br />
            <span className="text-cyan">CAMBIA CÓMO SE VE, CÓMO SE ENTIENDE Y CÓMO CRECE.</span>
          </h4>
        </motion.div>

      </div>
    </section>
  );
}
