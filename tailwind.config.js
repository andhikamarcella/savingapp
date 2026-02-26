/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
