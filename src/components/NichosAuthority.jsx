import { motion } from 'framer-motion';
import logo from '../assets/logosinfondoletrasblancas.png'
import npc1 from '../assets/NPC1.png';
import npc2 from '../assets/NPC2.png';
import npc3 from '../assets/NPC3.png';
import npc4 from '../assets/NPC4.png';

const nichosData = [
  {
    num: '01',
    label: 'Inmobiliarias',
    pilotName: 'Martín A.',
    pilotRole: 'Founder @ EstateTech',
    title: 'THE ESTATE SERIES',
    color: '#00C4CC',
    img: npc1,
    sells: ['Luxury Listings', 'Property Tours', 'Agent Authority'],
    episodes: [
      { id: '01', title: 'starting', status: 'done' },
      { id: '02', title: 'first listings', status: 'done' },
      { id: '03', title: 'narrative trust', status: 'done' },
      { id: '04', title: 'scaling', status: 'active' },
      { id: '05', title: 'expansion', status: 'pending' },
    ]
  },
  {
    num: '02',
    label: 'Gastronomía',
    pilotName: 'Valentina G.',
    pilotRole: 'Creative Director',
    title: 'THE FLAVOR ARCHIVE',
    color: '#00A889',
    img: npc4,
    sells: ['Menu Experience', 'Chef Identity', 'Gastro-Consulting'],
    episodes: [
      { id: '01', title: 'the concept', status: 'done' },
      { id: '02', title: 'plating visual', status: 'done' },
      { id: '03', title: 'operations', status: 'done' },
      { id: '04', title: 'opening', status: 'active' },
      { id: '05', title: 'franchise', status: 'pending' },
    ]
  },
  {
    num: '03',
    label: 'Marca Personal',
    pilotName: 'Sofía C.',
    pilotRole: 'Identity Strategist',
    title: 'THE AUTHORITY LOG',
    color: '#8B5CF6',
    img: npc3,
    sells: ['Personal Brand', 'Identity Strategy', 'Storytelling'],
    episodes: [
      { id: '01', title: 'origin story', status: 'done' },
      { id: '02', title: 'the method', status: 'done' },
      { id: '03', title: 'social authority', status: 'done' },
      { id: '04', title: 'monetization', status: 'active' },
      { id: '05', title: 'legacy', status: 'pending' },
    ]
  },
  {
    num: '04',
    label: 'Startups',
    pilotName: 'Lucas R.',
    pilotRole: 'Growth Lead',
    title: 'THE GROWTH FILES',
    color: '#0088CC',
    img: npc2,
    sells: ['VC Pitching', 'Product Vision', 'Growth Narrative'],
    episodes: [
      { id: '01', title: 'the problem', status: 'done' },
      { id: '02', title: 'mvp launch', status: 'done' },
      { id: '03', title: 'pmf signals', status: 'done' },
      { id: '04', title: 'series a', status: 'active' },
      { id: '05', title: 'ipo path', status: 'pending' },
    ]
  }
];

function NichoAuthorityCard({ pilotName, pilotRole, title, color, img, sells, episodes, index }) {
  return (
    <motion.div
      className="relative group w-full"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1] 
        } 
      }}
      viewport={{ once: false, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
    >
      {/* Background Glow */}
      <div
        className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-xl px-1"
        style={{ background: color }}
      />

      <div className="relative h-full flex flex-col bg-[#0A1628]/40 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 overflow-hidden group-hover:border-white/10 transition-colors">
        {/* Grain Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

        {/* Header: Pilot ID */}
        <div className="flex flex-col mb-8 text-center lg:text-left">
          <h4 className="text-white text-xl md:text-2xl font-black leading-tight uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {pilotName}
          </h4>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
            {pilotRole}
          </p>
        </div>

        {/* Main Content: Two Panel Layout */}
        <div className="flex flex-col lg:flex-row gap-10 h-full">

          {/* Left Panel: Profile */}
          <div className="flex-1 flex flex-col pt-2 border-r border-white/5 lg:pr-8">
            {/* Porthole Avatar */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 mb-8 mx-auto lg:mx-0">
              <div
                className="absolute inset-0 rounded-full blur-md opacity-20"
                style={{ background: color }}
              />
              <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-br from-white/20 via-white/5 to-transparent relative z-10">
                <div className="w-full h-full rounded-full border-2 border-white/10 overflow-hidden ring-4 ring-black/40">
                  <img
                    src={img}
                    alt={pilotName}
                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h3 className="text-white text-lg md:text-xl font-bold uppercase tracking-widest mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {title}
              </h3>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Season 1 — in progress</p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-4 mb-8 text-white/40">
              {/* Instagram */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center hover:text-[#E4405F] hover:border-[#E4405F]/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center hover:text-[#00f2ea] hover:border-[#00f2ea]/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center hover:text-[#0A66C2] hover:border-[#0A66C2]/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>

            <div className="mt-auto">
              <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-center lg:text-left">What this profile sells</p>
              <ul className="space-y-2">
                {sells.map(s => (
                  <li key={s} className="text-white/70 text-sm font-medium flex items-center gap-2 justify-center lg:justify-start">
                    <div className="w-1 h-1 rounded-full bg-cyan/40" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Episode Timeline */}
          <div className="w-full lg:w-[220px] flex flex-col pt-2">
            <h5 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-center lg:text-left">Season 1</h5>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[7px] top-2 bottom-0 w-px bg-white/5" />

              <ul className="space-y-6 relative">
                {episodes.map(ep => (
                  <li key={ep.id} className="flex items-center gap-4 group/item">
                    <div className="relative">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 z-10 relative transition-all duration-500
                            ${ep.status === 'active' ? 'bg-cyan border-cyan shadow-[0_0_10px_#00C4CC]' :
                            ep.status === 'done' ? 'bg-[#0A1628] border-white/20' : 'bg-transparent border-white/5'}`}
                      />
                      {ep.status === 'active' && (
                        <div className="absolute -inset-2 bg-cyan/20 blur-md rounded-full animate-pulse" />
                      )}
                    </div>
                    <div className={`flex flex-col leading-none ${ep.status === 'active' ? 'bg-white/5 py-2 px-3 rounded-lg border border-white/5' : ''}`}>
                      <span className={`text-[10px] font-bold uppercase tracking-tighter transition-colors
                          ${ep.status === 'active' ? 'text-white' : 'text-white/20'}`}>
                        EP {ep.id} — {ep.title}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Branding */}
            <div className="mt-14 pt-8 border-t border-white/5 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-all duration-500">
              <img
                src={logo}
                alt="Between"
                className="h-24 w-auto"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(0,196,204,0.7)) grayscale(1) brightness(2)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NichosAuthority() {
  return (
    <section id="nichos" className="relative py-48 overflow-hidden bg-[#030712]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />

      {/* Optical Lens Flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent rotate-12 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24 pb-12 border-b border-white/5">
          <div className="max-w-2xl">
            <motion.p
              className="text-cyan text-xs font-black uppercase tracking-[0.5em] mb-6"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              Industry Missions
            </motion.p>
            <motion.h2
              className="text-6xl md:text-9xl font-black text-white leading-[0.8] uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              ¿CUÁL ES TU <br />
              <span className="text-white/20">HISTORIA?</span>
            </motion.h2>
          </div>
          <motion.p
            className="text-white/40 text-lg md:text-xl font-medium max-w-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Nuestros pilotos están listos para convertir tu trayectoria en una serie de alto impacto espacial.
          </motion.p>
        </div>

        {/* Restore Grid: 2 columns to allow for wider cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {nichosData.map((nicho, idx) => (
            <NichoAuthorityCard key={idx} {...nicho} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
