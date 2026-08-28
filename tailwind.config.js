/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#E2E8F0',
        },
        burgundy: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          400: '#FB7185',
          600: '#E11D48',
          700: '#9F1239',
          800: '#881337',
          900: '#4C0519',
          950: '#2A040F',
        },
        gold: {
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        ink: {
          primary: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
        },
      },
      fontFamily: {
        serif: ['"Fredoka"', '"Paytone One"', 'cursive', 'sans-serif'],
        display: ['"Fredoka"', '"Paytone One"', 'cursive', 'sans-serif'],
        sans: ['"Fredoka"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'warm': '0 8px 24px -4px rgba(15, 23, 42, 0.07), 0 4px 8px -2px rgba(15, 23, 42, 0.03)',
        'warm-lg': '0 16px 36px -6px rgba(15, 23, 42, 0.10), 0 8px 16px -4px rgba(15, 23, 42, 0.05)',
        'gold-glow': '0 0 20px rgba(245, 158, 11, 0.35)',
      },
      borderRadius: {
        'luxury': '20px',
      }
    },
  },
  plugins: [],
}
