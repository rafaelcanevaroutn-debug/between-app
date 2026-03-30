const ITEMS = [
  { label: 'BASE', parts: [
    { text: 'BASE', cyan: true },
    { text: ' · ' },
    { text: '3 CANALES', cyan: true },
    { text: ' · ' },
    { text: '+156 VIDEOS/MES', cyan: true },
    { text: ' · ' },
    { text: '1 ENTREVISTA/MES', cyan: true },
  ]},
  { label: 'sep1', parts: [{ text: ' ⬡ ', cyan: false }] },
  { label: 'GROWTH', parts: [
    { text: 'GROWTH', cyan: true },
    { text: ' · ' },
    { text: '5 CANALES', cyan: true },
    { text: ' · ' },
    { text: '+390 VIDEOS/MES', cyan: true },
    { text: ' · ' },
    { text: '2 ENTREVISTAS/MES', cyan: true },
  ]},
  { label: 'sep2', parts: [{ text: ' ⬡ ', cyan: false }] },
  { label: 'STUDIO', parts: [
    { text: 'STUDIO', cyan: true },
    { text: ' · ' },
    { text: '10 CANALES', cyan: true },
    { text: ' · ' },
    { text: '+780 VIDEOS/MES', cyan: true },
    { text: ' · ' },
    { text: '4 ENTREVISTAS/MES', cyan: true },
  ]},
  { label: 'sep3', parts: [{ text: ' ⬡ ', cyan: false }] },
]

function TickerContent({ suffix }) {
  return (
    <>
      {ITEMS.map(({ label, parts }) =>
        parts.map(({ text, cyan }, pi) => (
          <span
            key={`${suffix}-${label}-${pi}`}
            style={{ color: cyan ? '#00C4CC' : 'rgba(255,255,255,0.75)' }}
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
        padding: '12px 0',
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
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.06em;
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
