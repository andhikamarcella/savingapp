import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 8px 30px rgba(15,23,42,.08)',
      },
      colors: {
        primary: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        gold: {
          50: '#fcfaf0',
          100: '#f7f2d6',
          200: '#f0e3ad',
          300: '#ead176',
          400: '#e1ae40',
          500: '#d99424',
          600: '#bf731b',
          700: '#9f541a',
          800: '#83421b',
          900: '#6c3619',
        }
      },
    },
  },
  plugins: [],
}

export default config
