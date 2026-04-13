const ITEMS = [
  {
    label: 'plan1', parts: [
      { text: '1 entrevista mensual', cyan: true },
      { text: ' · ' },
      { text: 'Dirección para grabar contenido propio', cyan: true },
      { text: ' · ' },
      { text: 'Producción de episodios y clips del mes', cyan: true },
    ]
  },
  { label: 'sep1', parts: [{ text: '  ⬡  ', cyan: false }] },
  {
    label: 'plan2', parts: [
      { text: '2 entrevistas mensuales', cyan: true },
      { text: ' · ' },
      { text: 'Mayor volumen de contenido', cyan: true },
      { text: ' · ' },
      { text: 'Narrativa más trabajada y con continuidad', cyan: true },
    ]
  },
  { label: 'sep2', parts: [{ text: '  ⬡  ', cyan: false }] },
  {
    label: 'plan3', parts: [
      { text: '4 entrevistas mensuales', cyan: true },
      { text: ' · ' },
      { text: 'Activacion de mas canales', cyan: true },
      { text: ' · ' },
      { text: 'Seguimiento estrategico', cyan: true },
    ]
  },
  { label: 'sep3', parts: [{ text: '  ⬡  ', cyan: false }] },
]

function TickerContent({ suffix }) {
  return (
    <>
      {ITEMS.map(({ label, parts }) =>
        parts.map(({ text, cyan }, pi) => (
          <span
            key={`${suffix}-${label}-${pi}`}
            style={{ color: '#00C4CC' }}
          >
            {text}
          </span>
        ))
      )}
    </>
  )
}

export default function TickerPlanes() {
  return (
    <div
      style={{
        background: '#0A1628',
        borderTop: '1px solid rgba(0,196,204,0.3)',
        borderBottom: '1px solid rgba(0,196,204,0.3)',
        overflow: 'hidden',
        padding: '16px 0',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: tickerScroll 25s linear infinite;
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.1rem;
          letter-spacing: 0.15em;
          color: #00C4CC;
          text-transform: uppercase;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="ticker-track">
        {/* Duplicado para loop suave sin salto */}
        <span style={{ paddingRight: '4rem' }}><TickerContent suffix="a" /></span>
        <span style={{ paddingRight: '4rem' }}><TickerContent suffix="b" /></span>
      </div>
    </div>
  )
}
