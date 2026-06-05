/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04071a',
          900: '#0B0F2A',
          800: '#111638',
          700: '#1a2050',
        },
        gold: {
          300: '#e8cc7a',
          400: '#C9A84C',
          500: '#a8862e',
        },
        ivory: '#F5F0E8',
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Serif TC', 'serif'],
        body: ['Inter', 'Noto Sans TC', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.4s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 20px 6px rgba(201,168,76,0.2)' },
        },
      },
      backgroundImage: {
        'star-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.06'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='0' cy='0' r='0.5'/%3E%3Ccircle cx='60' cy='0' r='0.5'/%3E%3Ccircle cx='0' cy='60' r='0.5'/%3E%3Ccircle cx='60' cy='60' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [],
}
