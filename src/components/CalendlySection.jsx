import { InlineWidget } from 'react-calendly'

const BULLETS = [
  'Entendemos tu negocio y tu contenido',
  'Te mostramos el simulador con tu nicho',
  'Te decimos exactamente qué haríamos por vos',
]

export default function CalendlySection() {
  return (
    <section className="py-24 dot-grid" style={{ background: '#060D18' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="flex flex-col justify-center lg:pt-8">
            {/* Tag */}
            <div className="mb-6">
              <span
                className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{
                  color: '#00C4CC',
                  border: '1px solid rgba(0,196,204,0.4)',
                  background: 'rgba(0,196,204,0.07)',
                }}
              >
                Sesión gratuita
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Agendá tu llamada{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00C4CC, #00A889)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                gratuita.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg leading-relaxed mb-10" style={{ color: '#7A9AB0' }}>
              30 minutos. Sin compromiso.{' '}
              Te mostramos cómo Between puede hacer crecer tu marca.
            </p>

            {/* Bullets */}
            <ul className="flex flex-col gap-4 mb-10">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="shrink-0 rounded-full mt-2"
                    style={{ width: 7, height: 7, background: '#00C4CC', boxShadow: '0 0 8px rgba(0,196,204,0.6)' }}
                  />
                  <span className="text-white font-medium leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            {/* WhatsApp secondary */}
            <a
              href="https://wa.me/5493815971971"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold transition-colors duration-200 self-start"
              style={{ color: '#25D366' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#25D366'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              O escribinos por WhatsApp →
            </a>
          </div>

          {/* RIGHT — Calendly widget */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid #122030',
              boxShadow: '0 0 40px rgba(0,196,204,0.08)',
            }}
          >
            <InlineWidget
              url="https://calendly.com/rafaelcanevaroutn/30min"
              styles={{
                height: '700px',
                minWidth: '320px',
              }}
              pageSettings={{
                backgroundColor: '060D18',
                primaryColor: '00C4CC',
                textColor: 'ffffff',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
