/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060D18',
        card: '#0A1628',
        border: '#122030',
        cyan: '#00C4CC',
        green: '#00A889',
        gray: '#7A9AB0',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #00C4CC, #00A889)',
      },
    },
  },
  plugins: [],
}
