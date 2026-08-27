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
          DEFAULT: '#E8DDD3',
          light: '#F4ECE4',
          card: '#FAF7F4',
          subtle: '#E2D3C6',
        },
        burgundy: {
          50: '#FBF3F4',
          100: '#F5E4E6',
          200: '#E6BDC1',
          400: '#A4424D',
          600: '#82343E',
          700: '#722F37',
          800: '#5A232A',
          900: '#3D151B',
        },
        gold: {
          100: '#F7EEDF',
          300: '#DFC89F',
          500: '#B8944F',
          600: '#9E7C3C',
          700: '#82642C',
        },
        ink: {
          primary: '#2C1810',
          secondary: '#5A4A41',
          muted: '#8D7B70',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(44, 24, 16, 0.04)',
        'warm': '0 8px 24px -4px rgba(44, 24, 16, 0.08), 0 4px 8px -2px rgba(44, 24, 16, 0.04)',
        'warm-lg': '0 16px 36px -6px rgba(44, 24, 16, 0.12), 0 8px 16px -4px rgba(44, 24, 16, 0.06)',
        'gold-glow': '0 0 20px rgba(184, 148, 79, 0.25)',
      },
      borderRadius: {
        'luxury': '16px',
      }
    },
  },
  plugins: [],
}
