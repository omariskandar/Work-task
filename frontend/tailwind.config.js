/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#0ea5e9',
          foreground: '#ecfeff'
        }
      },
      backgroundImage: {
        'grid-gradient':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)'
      }
    },
  },
  plugins: [],
}
