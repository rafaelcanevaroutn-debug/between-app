export default function LogoSVG({ size = 32, opacity = 1, className = '' }) {
  const id = `grad-${size}`
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      opacity={opacity}
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="100%" stopColor="#00A889" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
      <circle cx="40" cy="20" r="18" stroke={`url(#${id})`} strokeWidth="2.5" fill="none" />
    </svg>
  )
}
