import { useEffect, useState } from 'react'

const WORDS = ['Inmobiliarias', 'Founders', 'Gastronomía', 'Marcas Personales', 'Startups', 'Fitness']
const TYPE_SPEED = 80
const DELETE_SPEED = 40
const PAUSE = 1500

export default function Typewriter() {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const word = WORDS[wordIndex]

    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), PAUSE)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, wordIndex])

  return (
    <p className="text-base md:text-lg font-medium mt-4 mb-2 h-7">
      <span className="text-white">Para </span>
      <span style={{ color: '#00C4CC' }}>{displayed}</span>
      <span
        className="inline-block w-0.5 h-5 ml-0.5 align-middle"
        style={{
          backgroundColor: '#00C4CC',
          animation: 'blink 1s step-end infinite',
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </p>
  )
}
