/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B192C',
          800: '#0F233B',
          700: '#14274E',
          600: '#1E3E62',
          500: '#2A528A',
        },
        brand: {
          navy: '#0B192C',
          royal: '#1B4D89',
          green: '#10B981',
          greenDark: '#059669',
          orange: '#FF6B35',
          orangeDark: '#EA580C',
          lightBg: '#F8FAFC',
          lightGray: '#F1F5F9',
          border: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(11, 25, 44, 0.08), 0 2px 6px -1px rgba(11, 25, 44, 0.04)',
        'card-hover': '0 20px 30px -5px rgba(11, 25, 44, 0.12), 0 10px 15px -3px rgba(11, 25, 44, 0.08)',
        'glow-orange': '0 4px 20px rgba(255, 107, 53, 0.35)',
        'glow-green': '0 4px 20px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
