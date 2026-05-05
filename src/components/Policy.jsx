import { useState } from 'react'
import Footer from './Footer'

export default function Policy() {
  const [lang, setLang] = useState('en')

  const content = {
    en: {
      title: 'Privacy Policy',
      updated: 'Last Updated: May 2026',
      intro: 'Between ("we", "us", or the "Platform") is committed to protecting the privacy of its users. This policy describes how we handle data obtained through the official TikTok API integration.',
      sections: [
        {
          title: 'A. Data We Collect via TikTok API',
          text: 'By using the TikTok Login Kit within Between, we request access to the following data with your explicit consent:',
          items: [
            'Basic Profile Information (user.info.basic): Username and profile picture used to personalize your Between dashboard.',
            'User Statistics (user.info.stats): Real-time metrics for followers, following, and total likes to track account growth.',
            'Video List (video.list): Access to your public posts to display individual video performance within the Between interface.'
          ]
        },
        {
          title: 'B. How We Use This Information',
          text: 'At Between, we use this data exclusively to:',
          items: [
            'Visualize content performance through interactive charts on the Between dashboard.',
            'Enable personal brands and businesses to adjust their content strategies based on authentic TikTok metrics.'
          ]
        }
      ]
    },
    es: {
      title: 'Política de Privacidad',
      updated: 'Última actualización: Mayo 2026',
      intro: 'Between ("nosotros", "nuestro" o la "Plataforma") se compromete a proteger la privacidad de sus usuarios. Esta política describe cómo gestionamos los datos obtenidos a través de la integración oficial con la API de TikTok.',
      sections: [
        {
          title: 'A. Datos que Recopilamos mediante TikTok API',
          text: 'Al utilizar el Login Kit de TikTok en Between, solicitamos acceso a los siguientes datos bajo tu consentimiento explícito:',
          items: [
            'Información de Perfil (user.info.basic): Nombre de usuario y foto de perfil para personalizar tu dashboard en Between.',
            'Estadísticas de Usuario (user.info.stats): Métricas de seguidores, seguidos y likes totales para análisis de crecimiento.',
            'Listado de Videos (video.list): Acceso a tus publicaciones para mostrar rendimiento individual por video dentro de nuestra interfaz.'
          ]
        },
        {
          title: 'B. Uso de la Información',
          text: 'En Between, utilizamos estos datos exclusivamente para:',
          items: [
            'Visualizar el rendimiento de tu contenido mediante gráficos interactivos en el dashboard de Between.',
            'Permitir a las marcas personales y empresas ajustar sus estrategias de contenido basadas en métricas reales de TikTok.'
          ]
        }
      ]
    }
  }

  const t = content[lang]

  return (
    <div className="min-h-screen bg-bg">
      <section className="pt-32 md:pt-44 pb-20 dot-grid">
        <div className="max-w-4xl mx-auto px-6 md:px-16">
          
          {/* Language Toggle */}
          <div className="flex justify-end mb-8">
            <div className="inline-flex p-1 bg-card rounded-lg border border-border">
              <button 
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${lang === 'en' ? 'bg-bg text-cyan shadow-lg' : 'text-gray hover:text-white'}`}
              >
                ENGLISH
              </button>
              <button 
                onClick={() => setLang('es')}
                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${lang === 'es' ? 'bg-bg text-cyan shadow-lg' : 'text-gray hover:text-white'}`}
              >
                ESPAÑOL
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">
              BETWEEN // LEGAL
            </span>
            <h1 className="text-4xl md:text-6xl font-bebas tracking-wider text-white">
              {t.title.toUpperCase()}
            </h1>
            <p className="text-sm font-mono text-gray">
              {t.updated}
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-10">
            <p className="text-lg text-white/80 leading-relaxed font-medium">
              {t.intro}
            </p>

            <div className="grid gap-12">
              {t.sections.map((sec, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="w-8 h-px bg-cyan/50" />
                    {sec.title}
                  </h2>
                  <p className="text-gray leading-relaxed text-base mb-2">
                    {sec.text}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {sec.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-white/70 text-sm md:text-base bg-card/50 p-4 rounded-xl border border-border/50">
                        <span className="text-cyan font-bold">0{j+1}.</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
