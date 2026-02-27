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
        hk: {
          50: '#fdf2f8', // softest pink
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4', // softer pink
          400: '#f472b6',
          500: '#ec4899', // hot pink
          600: '#db2777', // deeper pink
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        'hk-red': {
          400: '#ef4444',
          500: '#ef4444', // iconic bow red
          600: '#dc2626',
        }
      },
    },
  },
  plugins: [],
}

export default config
