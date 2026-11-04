/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0b2545',
          navyDark: '#07162c',
          blue: '#134074',
          accent: '#1d4ed8',
          gold: '#f59e0b',
          goldDark: '#d97706',
          red: '#dc2626',
          emerald: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
