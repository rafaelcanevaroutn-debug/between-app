import { useState, useRef, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import { generateEcosystem } from '../services/generateEcosystem'

import startups1 from '../assets/nichos/startups-1.jpg'
import startups2 from '../assets/nichos/startups-2.jpg'
import startups3 from '../assets/nichos/startups-3.jpg'
import startups4 from '../assets/nichos/startups-4.jpg'
import startups5 from '../assets/nichos/startups-5.jpg'
import startups6 from '../assets/nichos/startups-6.jpg'
import inmobiliarias1 from '../assets/nichos/inmobiliarias-1.jpg'
import inmobiliarias2 from '../assets/nichos/inmobiliarias-2.jpg'
import inmobiliarias3 from '../assets/nichos/inmobiliarias-3.jpg'
import inmobiliarias4 from '../assets/nichos/inmobiliarias-4.jpg'
import inmobiliarias5 from '../assets/nichos/inmobiliarias-5.jpg'
import inmobiliarias6 from '../assets/nichos/inmobiliarias-6.jpg'
import gastronomia1 from '../assets/nichos/gastronomia-1.jpg'
import gastronomia2 from '../assets/nichos/gastronomia-2.jpg'
import gastronomia3 from '../assets/nichos/gastronomia-3.jpg'
import gastronomia4 from '../assets/nichos/gastronomia-4.jpg'
import gastronomia5 from '../assets/nichos/gastronomia-5.jpg'
import gastronomia6 from '../assets/nichos/gastronomia-6.jpg'
import fitness1 from '../assets/nichos/fitness-1.jpg'
import fitness2 from '../assets/nichos/fitness-2.jpg'
import fitness3 from '../assets/nichos/fitness-3.jpg'
import fitness4 from '../assets/nichos/fitness-4.jpg'
import fitness5 from '../assets/nichos/fitness-5.jpg'
import fitness6 from '../assets/nichos/fitness-6.jpg'
import marcapersonal1 from '../assets/nichos/marcapersonal-1.jpg'
import marcapersonal2 from '../assets/nichos/marcapersonal-2.jpg'
import marcapersonal3 from '../assets/nichos/marcapersonal-3.jpg'
import marcapersonal4 from '../assets/nichos/marcapersonal-4.jpg'
import marcapersonal5 from '../assets/nichos/marcapersonal-5.jpg'
import marcapersonal6 from '../assets/nichos/marcapersonal-6.jpg'

const NICHO_IMAGES = {
  Startups: [startups1, startups2, startups3, startups4, startups5, startups6],
  Inmobiliarias: [inmobiliarias1, inmobiliarias2, inmobiliarias3, inmobiliarias4, inmobiliarias5, inmobiliarias6],
  Gastronomía: [gastronomia1, gastronomia2, gastronomia3, gastronomia4, gastronomia5, gastronomia6],
  Fitness: [fitness1, fitness2, fitness3, fitness4, fitness5, fitness6],
  'Marca Personal': [marcapersonal1, marcapersonal2, marcapersonal3, marcapersonal4, marcapersonal5, marcapersonal6],
}

const NICHO_CUENTAS = {
  Inmobiliarias: [
    { sufijo: '', bio: 'Propiedades premium en tu ciudad. El mercado inmobiliario en tiempo real.' },
    { sufijo: 'Inversiones', bio: 'Rentabilidad y oportunidades de inversión. Todo lo que necesitás saber.' },
    { sufijo: 'Casas', bio: 'Tu próximo hogar, acá. Propiedades seleccionadas para cada estilo de vida.' },
    { sufijo: 'Luxury', bio: 'Real estate de alto standing. Propiedades exclusivas para clientes exigentes.' },
    { sufijo: 'Tips', bio: 'Todo lo que nadie te cuenta del mercado. Consejos directos, sin filtro.' },
  ],
  Gastronomía: [
    { sufijo: '', bio: 'Sabores que no se olvidan. Cocina auténtica con identidad propia.' },
    { sufijo: 'Recetas', bio: 'Lo que sale de la cocina. Recetas exclusivas y técnicas de chef.' },
    { sufijo: 'Behind', bio: 'El detrás de escena. Lo que pasa antes de que llegue a tu mesa.' },
    { sufijo: 'Chef', bio: 'La mente detrás del menú. Filosofía, proceso y pasión culinaria.' },
    { sufijo: 'Cultura', bio: 'Comer bien es un estilo de vida. Gastronomía, viajes y experiencias.' },
  ],
  'Marca Personal': [
    { sufijo: '', bio: 'Tu historia, tu marca. Construyendo autoridad con autenticidad.' },
    { sufijo: 'Podcast', bio: 'Conversaciones que importan. Ideas que transforman perspectivas.' },
    { sufijo: 'Mentorship', bio: 'Lo que aprendí en el camino. Lecciones reales para crecer.' },
    { sufijo: 'Daily', bio: 'Un día en mi vida. Rutinas, hábitos y decisiones que marcan la diferencia.' },
    { sufijo: 'Insights', bio: 'Ideas que cambian perspectivas. Reflexiones sobre negocios y vida.' },
  ],
  Startups: [
    { sufijo: '', bio: 'Construyendo el futuro desde cero. Startup life sin filtros.' },
    { sufijo: 'Build', bio: 'El proceso de crear algo nuevo. Cada decisión, cada iteración.' },
    { sufijo: 'Founder', bio: 'Lo que no te enseñan en libros. La verdad del emprendimiento.' },
    { sufijo: 'Growth', bio: 'Estrategias que escalan. De 0 a tracción real, paso a paso.' },
    { sufijo: 'Tech', bio: 'Tecnología para humanos. Innovación accesible y con impacto.' },
  ],
  Fitness: [
    { sufijo: '', bio: 'Tu transformación empieza hoy. Método, constancia y resultados reales.' },
    { sufijo: 'Training', bio: 'Métodos que dan resultados. Entrenamientos probados y efectivos.' },
    { sufijo: 'Nutrición', bio: 'Come bien, rendí mejor. Nutrición funcional para rendimiento.' },
    { sufijo: 'Mindset', bio: 'El músculo más importante. Mentalidad ganadora para cada objetivo.' },
    { sufijo: 'Rutinas', bio: 'Consistencia sobre intensidad. Hábitos que construyen cuerpos.' },
  ],
}

const PASOS_LOADING = [
  { texto: 'Analizando tu perfil...', icono: '🔍' },
  { texto: 'Diseñando tus canales...', icono: '🎨' },
  { texto: 'Armando identidad visual...', icono: '✦' },
  { texto: 'Generando tu ecosistema...', icono: '🚀' },
]

const gradStyle = {
  background: 'linear-gradient(135deg,#00C4CC,#00A889)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}

const CARD_STYLES = [
  { ring: '#00C4CC', glow: 'rgba(0,196,204,0.28)', avatarBg: '#00C4CC' },
  { ring: '#00A889', glow: 'rgba(0,168,137,0.28)', avatarBg: '#00A889' },
  { ring: '#FF0050', glow: 'rgba(255,0,80,0.22)', avatarBg: '#1a1a2e' },
  { ring: 'rgba(0,196,204,0.7)', glow: 'rgba(0,196,204,0.15)', avatarBg: '#0d2137' },
  { ring: 'rgba(0,168,137,0.7)', glow: 'rgba(0,168,137,0.15)', avatarBg: '#0d3726' },
]

const FAKE_FOLLOWERS = [2400, 1800, 3100, 892, 1200]
const FAKE_VIDEOS = [18, 12, 24, 9, 15]


const GROWTH_DATA = [
  { mes: 'Mes 1', seguidores: 1200,  label: 'Arranque' },
  { mes: 'Mes 2', seguidores: 4800,  label: 'Tracción' },
  { mes: 'Mes 3', seguidores: 12000, label: 'Despegue' },
  { mes: 'Mes 4', seguidores: 28000, label: 'Velocidad' },
  { mes: 'Mes 5', seguidores: 58000, label: 'Dominio' },
  { mes: 'Mes 6', seguidores: 100000,label: 'Autoridad' },
]

function fakeViews(handle, idx) {
  const vals = [847300, 23100, 4500, 12800, 58000, 1200, 8700, 32000, 15400, 4800, 28000, 16000]
  let hash = 0
  const s = String(handle) + String(idx)
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) % vals.length
  return vals[Math.abs(hash)]
}

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return String(n)
}

function VideoThumb({ nicho, thumbIdx, handle, titulo }) {
  const imgs = NICHO_IMAGES[nicho] || NICHO_IMAGES['Marca Personal']
  const src = imgs[thumbIdx % imgs.length]
  const views = fakeViews(handle, thumbIdx)
  return (
    <div className="overflow-hidden" style={{
      position: 'relative',
      width: '100%',
      aspectRatio: '3/4',
      backgroundColor: '#111',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}
      />
      {/* Video title */}
      {titulo && (
        <div className="absolute bottom-5 left-1 right-1 z-10">
          <p style={{
            color: '#fff',
            fontSize: '7.5px',
            fontWeight: '700',
            lineHeight: 1.3,
            textShadow: '0 1px 4px rgba(0,0,0,1)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {titulo}
          </p>
        </div>
      )}
      {/* View count */}
      <div className="absolute bottom-1 left-1 flex items-center gap-0.5 z-10">
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M1 5C2 3 3.5 1.5 5 1.5C6.5 1.5 8 3 9 5C8 7 6.5 8.5 5 8.5C3.5 8.5 2 7 1 5Z" stroke="white" strokeWidth="1" fill="none" />
          <circle cx="5" cy="5" r="1.5" fill="white" />
        </svg>
        <span style={{ color: '#fff', fontSize: '8px', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
          {formatNum(views)}
        </span>
      </div>
    </div>
  )
}

function TikTokCard({ cuenta, foto, nombreUsuario, cardIndex, nicho }) {
  const [hovered, setHovered] = useState(false)
  const { handle, nombre, bio, videos = [] } = cuenta
  const style = CARD_STYLES[cardIndex] || CARD_STYLES[0]
  const followers = FAKE_FOLLOWERS[cardIndex] || 1200
  const videoCount = FAKE_VIDEOS[cardIndex] || 12
  const displayName = nombre || nombreUsuario || 'Usuario'
  const avatarSrc = foto || `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent((handle || '') + cardIndex)}&backgroundColor=0a1628`

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col overflow-hidden transition-all duration-300"
      style={{
        background: '#000000',
        border: `1px solid ${hovered ? style.ring : '#1a1a1a'}`,
        borderRadius: '12px',
        boxShadow: hovered ? `0 0 28px ${style.glow}` : 'none',
        transform: hovered ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)',
      }}
    >
      {/* Badge row */}
      <div className="flex justify-end px-3 pt-3 pb-1">
        <span
          className="text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            background: style.glow,
            border: `1px solid ${style.ring}`,
            color: style.ring,
          }}
        >
          BETWEEN
        </span>
      </div>

      {/* Profile section */}
      <div className="flex flex-col items-center px-3 pb-3 gap-2">
        {/* Avatar with gradient ring */}
        <div
          className="p-[2px] rounded-full"
          style={{
            background: `linear-gradient(135deg, ${style.ring}, ${style.avatarBg})`,
          }}
        >
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 48, height: 48, background: style.avatarBg }}
          >
            <img src={avatarSrc} alt="" className="w-full h-full object-cover block" />
          </div>
        </div>

        {/* Name & handle */}
        <div className="text-center">
          <p className="text-white font-bold leading-tight" style={{ fontSize: 13 }}>
            {displayName}
          </p>
          <p style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{handle}</p>
          {bio && (
            <p style={{ color: '#aaa', fontSize: 9, marginTop: 4, lineHeight: 1.35 }}>
              {bio}
            </p>
          )}
        </div>

        {/* Seguir button */}
        <button
          className="font-bold text-white"
          style={{
            background: '#FE2C55',
            borderRadius: 4,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 13,
            border: 'none',
            cursor: 'default',
            width: '100%',
          }}
        >
          Seguir
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#1a1a1a' }} />

      {/* 2×3 video grid */}
      <div
        className="grid grid-cols-2"
        style={{ gap: 1, background: '#1a1a1a' }}
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <VideoThumb
            key={i}
            nicho={nicho}
            thumbIdx={cardIndex + i}
            handle={handle}
            titulo={videos[i] || ''}
          />
        ))}
      </div>

      {/* Stats footer */}
      <div
        className="flex justify-center gap-6 py-3"
        style={{ background: '#000' }}
      >
        <div className="text-center">
          <p className="text-white font-bold" style={{ fontSize: 13 }}>
            {formatNum(followers)}
          </p>
          <p style={{ color: '#888', fontSize: 10 }}>Seguidores</p>
        </div>
        <div style={{ width: 1, background: '#1a1a1a' }} />
        <div className="text-center">
          <p className="text-white font-bold" style={{ fontSize: 13 }}>
            {videoCount}
          </p>
          <p style={{ color: '#888', fontSize: 10 }}>Videos</p>
        </div>
      </div>
    </div>
  )
}

const STAGE_LABELS = {
  1200: 'Arranque',
  4800: 'Tracción',
  12000: 'Despegue',
  28000: 'Velocidad',
  58000: 'Dominio',
  100000: 'Autoridad',
}

const STAGE_PILLS = [
  { label: 'Arranque', desc: 'Primeras publicaciones y comunidad inicial.' },
  { label: 'Tracción', desc: 'El algoritmo empieza a distribuir.' },
  { label: 'Despegue', desc: 'Crecimiento orgánico sostenido.' },
  { label: 'Velocidad', desc: 'El contenido trabaja solo.' },
  { label: 'Dominio', desc: 'Referente en tu nicho.' },
  { label: 'Autoridad', desc: 'El ecosistema genera oportunidades.' },
]

function GrowthTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { mes, seguidores, label } = payload[0].payload
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: '#0A1628',
        border: '1px solid rgba(139,92,246,0.5)',
        boxShadow: '0 0 20px rgba(139,92,246,0.2)',
      }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#8B5CF6' }}>
        {mes} · {label}
      </p>
      <p className="text-white font-extrabold text-lg">{formatNum(seguidores)}</p>
      <p className="text-xs" style={{ color: '#7A9AB0' }}>seguidores acumulados</p>
    </div>
  )
}

function GrowthDot(props) {
  const { cx, cy } = props
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="rgba(139,92,246,0.12)" />
      <circle cx={cx} cy={cy} r={5} fill="url(#dotGrad)" stroke="#060D18" strokeWidth={2} />
    </g>
  )
}

function ProyeccionCrecimiento({ nicho }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#8B5CF6' }}>
          Between Growth Model
        </p>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
          La consistencia es la inversión.
        </h3>
        <p className="mt-3 text-base leading-relaxed max-w-xl" style={{ color: '#7A9AB0' }}>
          Los resultados no son de la noche a la mañana. Son el resultado de aparecer todos los días.
        </p>
      </div>

      {/* Chart card */}
      <div
        className="rounded-2xl px-4 pt-8 pb-6 md:px-8 md:pt-10"
        style={{ background: '#0A1628', border: '1px solid #122030' }}
      >
        <div style={{ width: '100%', height: 260, opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GROWTH_DATA} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#00C4CC" />
                  <stop offset="100%" stopColor="#00A889" />
                </linearGradient>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.18} />
                  <stop offset="100%" stopColor="#00A889" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dotGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#00C4CC" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="mes"
                tick={{ fill: '#7A9AB0', fontSize: 12 }}
                axisLine={{ stroke: '#122030' }}
                tickLine={false}
              />
              <YAxis
                ticks={[1200, 4800, 12000, 28000, 58000, 100000]}
                tickFormatter={(val) => STAGE_LABELS[val] || ''}
                tick={{ fill: '#7A9AB0', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <Tooltip
                content={<GrowthTooltip />}
                cursor={{ stroke: 'rgba(139,92,246,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="seguidores"
                stroke="url(#lineGrad)"
                strokeWidth={2.5}
                fill="url(#areaFill)"
                dot={<GrowthDot />}
                activeDot={{ r: 7, fill: '#8B5CF6', stroke: '#060D18', strokeWidth: 2 }}
                isAnimationActive={visible}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stage pills */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6 pt-6" style={{ borderTop: '1px solid #122030' }}>
          {STAGE_PILLS.map(({ label, desc }, i) => (
            <div
              key={label}
              className="rounded-xl px-3 py-2.5"
              style={{ background: '#060D18', border: '1px solid #122030' }}
            >
              <p className="text-xs font-bold mb-0.5" style={{ color: i < 2 ? '#8B5CF6' : i < 4 ? '#00C4CC' : '#00A889' }}>
                {label}
              </p>
              <p style={{ color: '#7A9AB0', fontSize: 11, lineHeight: 1.4 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-center mt-4" style={{ color: '#4A6A7A' }}>
        Proyección orientativa. Los resultados varían por nicho y engagement.
      </p>
    </div>
  )
}


function FieldWrap({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#7A9AB0' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputBase = {
  background: '#060D18',
  border: '1px solid #122030',
  color: '#fff',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}
const focusStyle = { borderColor: '#00C4CC', boxShadow: '0 0 0 3px rgba(0,196,204,0.1)' }
const blurStyle = { borderColor: '#122030', boxShadow: 'none' }

export default function Simulador() {
  const [nombre, setNombre] = useState('')
  const [nicho, setNicho] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [foto, setFoto] = useState(null)
  const [fase, setFase] = useState('form')
  const [pasoActual, setPasoActual] = useState(0)
  const [cuentas, setCuentas] = useState([])
  const fileRef = useRef(null)

  const puedeGenerar = nombre.trim() && nicho

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setFoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleGenerar = async () => {
    setFase('loading')
    setPasoActual(0)
    setCuentas([])

    let step = 0
    const iv = setInterval(() => {
      step++
      if (step < PASOS_LOADING.length) {
        setPasoActual(step)
      } else {
        clearInterval(iv)
      }
    }, 1500)

    try {
      const resultado = await generateEcosystem({ nombre, nicho, descripcion })
      clearInterval(iv)
      setCuentas(resultado)
      setTimeout(() => setFase('resultado'), 300)
    } catch {
      clearInterval(iv)
      setFase('resultado')
    }
  }

  const reset = () => {
    setFase('form')
    setNombre('')
    setNicho('')
    setDescripcion('')
    setFoto(null)
    setCuentas([])
  }

  return (
    <section className="py-24 dot-grid" style={{ background: '#060D18' }}>
      <style>{`
        @keyframes progress { from{width:0%} to{width:100%} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fade-in-up { animation: fadeInUp 0.4s ease forwards; }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: '#00C4CC' }}>
            Simulador
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Visualizá tu ecosistema{' '}
            <span style={gradStyle}>de canales</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg leading-relaxed" style={{ color: '#7A9AB0' }}>
            Subí una foto, contanos tu nicho y generá una vista previa de tu sistema de distribución Between.
          </p>
        </div>

        {/* ── FORMULARIO ── */}
        {fase === 'form' && (
          <div className="max-w-2xl mx-auto fade-in-up relative">
            {/* Subtle glow behind card */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,196,204,0.07) 0%, transparent 65%)' }} />

            <div className="relative rounded-3xl overflow-hidden" style={{ background: '#0A1628', border: '1px solid #122030' }}>
              {/* Top accent line */}
              <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #00C4CC, #00A889, transparent)' }} />

              <div className="p-8 md:p-10 flex flex-col gap-5">

                {/* Photo upload card */}
                <div className="rounded-2xl p-6 flex flex-col items-center gap-4" style={{ background: '#060D18', border: '1px solid #122030' }}>
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="relative rounded-full overflow-hidden transition-all duration-300 flex items-center justify-center"
                    style={{
                      width: 120, height: 120,
                      background: foto ? 'transparent' : 'radial-gradient(circle, rgba(0,196,204,0.07) 0%, transparent 70%)',
                      border: foto ? '3px solid #00C4CC' : '2px dashed rgba(0,196,204,0.3)',
                      boxShadow: foto ? '0 0 30px rgba(0,196,204,0.35)' : '0 0 0 rgba(0,0,0,0)',
                      cursor: 'pointer',
                    }}
                  >
                    {foto ? (
                      <img src={foto} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M16 8v12M10 13l6-6 6 6" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5 24v2a2 2 0 002 2h18a2 2 0 002-2v-2" stroke="#7A9AB0" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span style={{ color: '#7A9AB0', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>SUBIR FOTO</span>
                      </div>
                    )}
                  </button>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{foto ? 'Foto cargada' : 'Tu foto de perfil'}</p>
                    <p style={{ color: '#7A9AB0', fontSize: 12 }}>{foto ? 'Click para cambiar' : 'Aparecerá en tus canales (opcional)'}</p>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />
                </div>

                {/* Nombre card */}
                <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: '#060D18', border: '1px solid #122030' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,196,204,0.1)', border: '1px solid rgba(0,196,204,0.2)' }}>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="#00C4CC" strokeWidth="1.5" />
                        <path d="M2 14c0-3.31 2.686-6 6-6s6 2.69 6 6" stroke="#00C4CC" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00C4CC' }}>Tu nombre o marca</label>
                  </div>
                  <input
                    type="text"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Ej: Rafael Díaz"
                    className="rounded-xl px-4 py-3.5 text-sm"
                    style={{ background: '#0A1628', border: '1px solid #1a2a3a', color: '#fff', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    onFocus={e => { e.target.style.borderColor = '#00C4CC'; e.target.style.boxShadow = '0 0 0 3px rgba(0,196,204,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#1a2a3a'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* Nicho card */}
                <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: '#060D18', border: '1px solid #122030' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,196,204,0.1)', border: '1px solid rgba(0,196,204,0.2)' }}>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.5L9.8 5.5H14L10.8 8L12 12L8 9.8L4 12L5.2 8L2 5.5H6.2L8 1.5Z" stroke="#00C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00C4CC' }}>Tu nicho</label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'Startups', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C10 2 4 7 4 12a6 6 0 0012 0c0-5-6-10-6-10z" stroke="#00C4CC" strokeWidth="1.5" fill="none"/><circle cx="10" cy="12" r="2" fill="#00C4CC"/></svg> },
                      { key: 'Inmobiliarias', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M2 19V9l8-7 8 7v10H2z" stroke="#00C4CC" strokeWidth="1.5" strokeLinejoin="round"/><rect x="7" y="13" width="6" height="6" stroke="#00C4CC" strokeWidth="1.5"/></svg> },
                      { key: 'Gastronomía', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#00C4CC" strokeWidth="1.5"/><path d="M7 7v6M10 6v8M13 7v6" stroke="#00C4CC" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                      { key: 'Fitness', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 10h2m10 0h2M5 10l1-3h8l1 3M5 10l1 3h8l1-3" stroke="#00C4CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                      { key: 'Marca Personal', icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="#00C4CC" strokeWidth="1.5"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#00C4CC" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                    ].map(({ key, icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNicho(key)}
                        className="rounded-xl px-3 py-3 text-sm font-semibold text-left transition-all duration-200 flex flex-col items-start gap-2"
                        style={{
                          background: nicho === key ? 'rgba(0,196,204,0.1)' : '#0A1628',
                          border: `1px solid ${nicho === key ? '#00C4CC' : '#1a2a3a'}`,
                          color: nicho === key ? '#00C4CC' : '#7A9AB0',
                          boxShadow: nicho === key ? '0 0 16px rgba(0,196,204,0.15)' : 'none',
                        }}
                      >
                        {icon}
                        <span style={{ fontSize: 13 }}>{key}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Descripción card */}
                <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: '#060D18', border: '1px solid #122030' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(0,196,204,0.1)', border: '1px solid rgba(0,196,204,0.2)' }}>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12M2 7.5h8M2 11h10" stroke="#00C4CC" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <label className="text-xs font-bold uppercase tracking-widest" style={{ color: '#00C4CC' }}>Descripción breve <span style={{ color: '#4A6A7A', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span></label>
                  </div>
                  <textarea
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder="Ej: Vendo propiedades en Tucumán desde hace 10 años..."
                    rows={3}
                    className="rounded-xl px-4 py-3.5 text-sm resize-none"
                    style={{ background: '#0A1628', border: '1px solid #1a2a3a', color: '#fff', outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                    onFocus={e => { e.target.style.borderColor = '#00C4CC'; e.target.style.boxShadow = '0 0 0 3px rgba(0,196,204,0.1)' }}
                    onBlur={e => { e.target.style.borderColor = '#1a2a3a'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                {/* CTA */}
                <button
                  onClick={handleGenerar}
                  disabled={!puedeGenerar}
                  className="w-full py-5 rounded-2xl text-lg font-bold transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: puedeGenerar ? 'linear-gradient(135deg,#00C4CC,#00A889)' : '#0d1e2e',
                    color: puedeGenerar ? '#fff' : '#4A6A7A',
                    boxShadow: puedeGenerar ? '0 0 36px rgba(0,196,204,0.4), 0 8px 24px rgba(0,0,0,0.3)' : 'none',
                    cursor: puedeGenerar ? 'pointer' : 'not-allowed',
                    border: puedeGenerar ? 'none' : '1px solid #122030',
                  }}
                  onMouseEnter={e => { if (puedeGenerar) { e.currentTarget.style.boxShadow = '0 0 52px rgba(0,196,204,0.6), 0 8px 32px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)' } }}
                  onMouseLeave={e => { if (puedeGenerar) { e.currentTarget.style.boxShadow = '0 0 36px rgba(0,196,204,0.4), 0 8px 24px rgba(0,0,0,0.3)'; e.currentTarget.style.transform = 'translateY(0)' } }}
                >
                  {puedeGenerar ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 2.5L13.8 8H19L14.8 11.5L16.5 17L11 13.8L5.5 17L7.2 11.5L3 8H8.2L11 2.5Z" fill="white"/>
                      </svg>
                      Generar mi ecosistema
                    </span>
                  ) : (
                    'Completá nombre y nicho para continuar'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {fase === 'loading' && (
          <div className="max-w-md mx-auto fade-in-up">
            <div
              className="rounded-3xl p-10 flex flex-col gap-7"
              style={{ background: '#0A1628', border: '1px solid #122030', boxShadow: '0 0 60px rgba(0,196,204,0.07)' }}
            >
              <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#00C4CC' }}>
                Generando tu ecosistema
              </p>
              {PASOS_LOADING.map(({ texto, icono }, i) => {
                const done = i < pasoActual
                const active = i === pasoActual
                return (
                  <div
                    key={texto}
                    className="flex items-start gap-4 transition-all duration-500"
                    style={{ opacity: done || active ? 1 : 0.35 }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0 transition-all duration-500"
                      style={{
                        background: done ? 'linear-gradient(135deg,#00C4CC,#00A889)' : active ? 'rgba(0,196,204,0.15)' : '#122030',
                        border: active ? '1px solid #00C4CC' : '1px solid transparent',
                        boxShadow: active ? '0 0 16px rgba(0,196,204,0.4)' : 'none',
                      }}
                    >
                      {done
                        ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#060D18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        : <span>{icono}</span>
                      }
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p
                        className="text-sm font-medium"
                        style={{ color: active ? '#fff' : done ? '#00C4CC' : '#7A9AB0' }}
                      >
                        {texto}
                      </p>
                      {active && (
                        <div className="mt-2.5 h-1 rounded-full overflow-hidden" style={{ background: '#122030' }}>
                          <div
                            className="h-full rounded-full"
                            style={{ background: 'linear-gradient(90deg,#00C4CC,#00A889)', animation: 'progress 1.4s ease-out forwards' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── RESULTADO ── */}
        {fase === 'resultado' && (
          <div className="flex flex-col items-center gap-12 fade-in-up">
            {/* Title */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                🎬 Tu ecosistema Between está listo,{' '}
                <span style={gradStyle}>{nombre}</span>
              </h3>
              <p className="mt-2 text-sm" style={{ color: '#7A9AB0' }}>
                5 canales listos para dominar {nicho}
              </p>
            </div>

            {/* TikTok cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
              {cuentas.map((cuenta, i) => (
                <TikTokCard
                  key={i}
                  cuenta={cuenta}
                  foto={foto}
                  nombreUsuario={nombre}
                  cardIndex={i}
                  nicho={nicho}
                />
              ))}
            </div>

            {/* Growth projection */}
            <ProyeccionCrecimiento nicho={nicho} />

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contacto"
                className="px-10 py-4 rounded-full text-base font-bold text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg,#00C4CC,#00A889)',
                  boxShadow: '0 0 28px rgba(0,196,204,0.4)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 44px rgba(0,196,204,0.65)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 28px rgba(0,196,204,0.4)'}
              >
                Quiero mis multicuentas
              </a>
              <a
                href="#contacto"
                className="px-10 py-4 rounded-full text-base font-bold transition-all duration-300"
                style={{ border: '1px solid #00C4CC', color: '#00C4CC', background: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,196,204,0.08)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,196,204,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none' }}
              >
                Entrar a whitelist
              </a>
            </div>

            <button
              onClick={reset}
              className="text-sm underline underline-offset-4 transition-colors"
              style={{ color: '#7A9AB0' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = '#7A9AB0'}
            >
              Generar otro
            </button>

            <p className="text-xs text-center max-w-sm" style={{ color: '#7A9AB0' }}>
              Esta es una simulación visual. Tu ecosistema real se define en el onboarding.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
