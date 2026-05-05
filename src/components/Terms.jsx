import { useState } from 'react'
import Footer from './Footer'

export default function Terms() {
  const [lang, setLang] = useState('en')

  const content = {
    en: {
      title: 'Terms of Service',
      updated: 'Last Updated: May 2026',
      intro: 'Welcome to Between. By accessing our platform, you agree to these Terms of Service governing your use of the Between analytics tool.',
      sections: [
        {
          title: 'A. Nature of the Service',
          text: 'Between is a data analytics platform for creators and brands utilizing TikTok. The service allows for the connection of official accounts via the TikTok API for performance metric visualization and content management.'
        },
        {
          title: 'B. Data Ownership and Usage',
          text: 'By connecting your TikTok account to Between, authorize the platform to query and display your public statistics and video metrics. Between does not post content on your behalf without authorization and is limited to data reading for personal brand optimization purposes.'
        },
        {
          title: 'C. Limitation of Liability',
          text: 'Between strives to provide accurate data based on information supplied by the official TikTok API; however, we are not responsible for external discrepancies or changes in third-party policies.'
        }
      ]
    },
    es: {
      title: 'Términos de Servicio',
      updated: 'Última actualización: Mayo 2026',
      intro: 'Bienvenido a Between. Al acceder a nuestra plataforma, aceptas estos Términos de Servicio que rigen tu uso de la herramienta de analítica Between.',
      sections: [
        {
          title: 'A. Naturaleza del Servicio',
          text: 'Between es una plataforma de análisis de datos para creadores y marcas que utilizan TikTok. El servicio permite conectar cuentas oficiales mediante la API de TikTok para la visualización de métricas de rendimiento y gestión de contenido.'
        },
        {
          title: 'B. Propiedad y Uso de los Datos',
          text: 'Al conectar tu cuenta de TikTok con Between, autorizas a la plataforma a consultar y mostrar tus estadísticas públicas y métricas de video. Between no publica contenido en tu nombre sin autorización y se limita a la lectura de datos para fines de optimización de marca personal.'
        },
        {
          title: 'C. Limitación de Responsabilidad',
          text: 'Between se esfuerza por proporcionar datos precisos basados en la información suministrada por la API oficial de TikTok; sin embargo, no nos hace responsables por discrepancias externas o cambios en las políticas de terceros.'
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
                  <p className="text-gray leading-relaxed text-base">
                    {sec.text}
                  </p>
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
