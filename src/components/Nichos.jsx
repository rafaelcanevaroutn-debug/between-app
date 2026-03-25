import { useState } from 'react'

const nichos = [
  {
    num: '01',
    label: 'Inmobiliarias',
    desc: 'Convertí cada propiedad, proyecto y operación en contenido que posiciona tu marca y genera confianza antes de la primera reunión.',
  },
  {
    num: '02',
    label: 'Gastronomía',
    desc: 'Tu restaurante, bar o marca gastronómica merece una audiencia propia. Construimos el ecosistema de contenido que llena mesas y fideliza clientes.',
  },
  {
    num: '03',
    label: 'Marca Personal',
    desc: 'Tu voz, tu historia, tu autoridad. Convertimos tu experiencia en contenido que atrae oportunidades, clientes y colaboraciones.',
  },
  {
    num: '04',
    label: 'Startups',
    desc: 'El contenido es el canal de adquisición más barato. Construimos tracción real con narrativas que posicionan a los founders y a la empresa.',
  },
  {
    num: '05',
    label: 'Fitness',
    desc: 'Tu método y tu transformación son el producto. Construimos tu comunidad, amplificamos tu alcance y monetizamos tu conocimiento.',
  },
]

export default function Nichos() {
  const [active, setActive] = useState(0)

  return (
    <section id="nichos" className="py-24 dot-grid">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div className="mb-12">
          <p className="text-cyan text-sm font-semibold uppercase tracking-widest mb-3">Para quién es</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">¿Cuál es tu historia?</h2>
        </div>

        <div className="flex flex-col">
          {nichos.map(({ num, label, desc }, i) => {
            const isActive = active === i
            return (
              <div
                key={num}
                className="border-b border-border cursor-pointer group"
                style={{ borderColor: isActive ? 'rgba(0,196,204,0.4)' : undefined }}
                onClick={() => setActive(i)}
              >
                {/* Row */}
                <div className="flex items-center gap-6 py-5 select-none">
                  <span
                    className="text-sm font-mono font-bold w-8 shrink-0 transition-colors duration-200"
                    style={{ color: isActive ? '#00C4CC' : '#7A9AB0' }}
                  >
                    {num}
                  </span>
                  <span
                    className="text-2xl md:text-4xl font-extrabold tracking-tight transition-all duration-200"
                    style={{
                      color: isActive ? '#FFFFFF' : '#7A9AB0',
                      borderBottom: isActive ? '2px solid #00C4CC' : '2px solid transparent',
                      paddingBottom: '2px',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="ml-auto text-gray transition-transform duration-300"
                    style={{ transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10H15M10 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isActive ? '120px' : '0px', opacity: isActive ? 1 : 0 }}
                >
                  <div className="pb-6 pl-14 flex items-start justify-between gap-8">
                    <p className="text-gray text-base leading-relaxed max-w-xl">{desc}</p>
                    <a
                      href="#contacto"
                      className="shrink-0 px-5 py-2 rounded-full text-sm font-semibold border border-cyan text-cyan hover:bg-cyan/10 transition-colors"
                    >
                      Ver propuesta
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
