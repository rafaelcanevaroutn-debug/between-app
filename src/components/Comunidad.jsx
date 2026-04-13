import { motion } from 'framer-motion';
import npc1  from '../assets/NPC1.png'
import npc2  from '../assets/NPC2.png'
import npc3  from '../assets/NPC3.png'
import npc4  from '../assets/NPC4.png'
import npc5  from '../assets/NPC5.png'
import npc6  from '../assets/NPC6.png'
import npc7  from '../assets/NPC7.png'
import npc8  from '../assets/NPC8.png'
import npc9  from '../assets/NPC9.png'
import npc10 from '../assets/NPC10.png'
import npc11 from '../assets/NPC11.png'
import npc12 from '../assets/NPC12.png'
import npc13 from '../assets/NPC13.png'
import npc14 from '../assets/NPC14.png'

const liveSeries = [
  { 
    name: 'Martín A.', 
    series: 'The Strategy Log', 
    nicho: 'Inmobiliarias',  
    img: npc1, 
    reach: '1.2M', 
    episodes: '48', 
    continuity: '92%',
    tag: 'Season 1'
  },
  { 
    name: 'Sofía C.',  
    series: 'Narrativa Digital', 
    nicho: 'Marca Personal', 
    img: npc2, 
    reach: '890K',  
    episodes: '61', 
    continuity: '96%',
    tag: 'On Air'
  },
  { 
    name: 'Lucas R.',  
    series: 'Inside Startups', 
    nicho: 'Startups',        
    img: npc3, 
    reach: '2.4M', 
    episodes: '93', 
    continuity: '98%',
    tag: 'Exclusive'
  },
]

const networkPartners = [
  { name: 'Valentina G.', nicho: 'Gastronomía',   img: npc3  },
  { name: 'Esteban M.',   nicho: 'Fitness',        img: npc5  },
  { name: 'Diego P.',     nicho: 'Inmobiliarias',  img: npc6  },
  { name: 'Camila R.',    nicho: 'Marca Personal', img: npc7  },
  { name: 'Julián T.',    nicho: 'Startups',       img: npc8  },
  { name: 'Ana L.',       nicho: 'Gastronomía',    img: npc9  },
  { name: 'Matías V.',    nicho: 'Fitness',        img: npc10 },
  { name: 'Franco R.',    nicho: 'Startups',       img: npc11 },
  { name: 'Nadia G.',     nicho: 'Marca Personal', img: npc12 },
  { name: 'Pablo L.',     nicho: 'Inmobiliarias',  img: npc13 },
  { name: 'Romina V.',    nicho: 'Gastronomía',    img: npc14 },
  { name: 'Santiago E.',  nicho: 'Fitness',        img: npc1  },
  { name: 'Laura B.',     nicho: 'Marca Personal', img: npc2  },
  { name: 'Gonzalo M.',   nicho: 'Startups',       img: npc4  },
]

const NICHO_COLORS = {
  'Inmobiliarias':  '#00C4CC',
  'Marca Personal': '#8B5CF6',
  'Startups':       '#00A889',
  'Gastronomía':    '#F59E0B',
  'Fitness':        '#10B981',
}

function AuthorityCard({ name, series, nicho, img, reach, episodes, continuity, tag }) {
  const color = NICHO_COLORS[nicho] || '#00C4CC'
  
  return (
    <motion.div 
      className="relative group h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Background Glow */}
      <div 
        className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-xl px-1"
        style={{ background: color }}
      />
      
      <div className="relative h-full flex flex-col items-center bg-[#0A1628]/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        {/* Header Tag */}
        <div className="flex w-full justify-between items-center mb-10">
          <span 
            className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border border-white/10 text-white/40"
            style={{ fontFamily: 'monospace' }}
          >
            {tag}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#00C4CC]" />
            <span className="text-[10px] font-bold text-cyan uppercase tracking-widest">Active</span>
          </div>
        </div>

        {/* Series Info */}
        <div className="text-center mb-8">
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{nicho}</p>
          <h3 
            className="text-white text-3xl md:text-5xl font-black uppercase leading-none mb-2 drop-shadow-2xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {series}
          </h3>
          <p className="text-cyan text-sm font-bold tracking-tight lowercase">{name}</p>
        </div>

        {/* Main Avatar Center */}
        <div className="relative mb-12">
          {/* Stage Light Effect */}
          <div 
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 opacity-40 blur-xl rounded-full"
            style={{ background: color }}
          />
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-b from-white/10 to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/5 ring-4 ring-black/50 overflow-hidden relative">
              <img src={img} alt={name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-auto w-full grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
          <div className="text-center">
            <p className="text-white text-xl md:text-2xl font-black mb-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{reach}</p>
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Reach</p>
          </div>
          <div className="text-center">
            <p className="text-white text-xl md:text-2xl font-black mb-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{episodes}</p>
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Eps</p>
          </div>
          <div className="text-center">
            <p className="text-white text-xl md:text-2xl font-black mb-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{continuity}</p>
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Level</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function SmallAvatar({ name, img }) {
  return (
    <motion.div 
      className="flex flex-col items-center gap-3 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="w-14 h-14 rounded-full border border-white/10 p-0.5 group-hover:border-cyan/40 transition-all duration-500">
        <div className="w-full h-full rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>
      <p className="text-[9px] font-black text-white/30 group-hover:text-white uppercase tracking-tighter transition-colors">{name}</p>
    </motion.div>
  )
}

export default function Comunidad() {
  return (
    <section className="relative py-48 overflow-hidden bg-[#030712]">
      {/* Editorial Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
      
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 pb-12 border-b border-white/5">
          <div className="max-w-2xl">
            <motion.p 
              className="text-cyan text-xs font-black uppercase tracking-[0.5em] mb-6"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              The Authority Network
            </motion.p>
            <motion.h2 
              className="text-6xl md:text-9xl font-black text-white leading-[0.8] uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              NO ESTÁS <br />
              <span className="text-white/20">SOLO.</span>
            </motion.h2>
          </div>
          <motion.p 
            className="text-white/40 text-lg md:text-xl font-medium max-w-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Nuestros creadores no hacen contenido. Construyen sistemas de autoridad personal.
          </motion.p>
        </div>

        {/* Featured Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-40">
          {liveSeries.map((series, idx) => (
            <AuthorityCard key={idx} {...series} />
          ))}
        </div>

        {/* Elite Network Grid */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-12">Network Partners</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-14 gap-8">
            {networkPartners.map((partner, idx) => (
              <SmallAvatar key={idx} {...partner} />
            ))}
          </div>
        </div>

        {/* Final Statement */}
        <div className="text-center pt-32">
          <motion.h4 
            className="text-white/30 text-2xl md:text-4xl font-black italic uppercase leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Ser parte de Between es una declaración de <br />
            <span className="text-white">estándares superiores.</span>
          </motion.h4>
        </div>

      </div>
    </section>
  )
}
