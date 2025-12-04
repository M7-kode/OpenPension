/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'vodoun-red': '#DC2626',
        'vodoun-gold': '#F59E0B',
        'vodoun-green': '#059669',
        'vodoun-purple': '#7C3AED',
        'vodoun-orange': '#EA580C',
        'cyber-black': '#050505',
        'cyber-gray': '#121212',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #7C3AED, 0 0 20px #7C3AED' },
          'to': { boxShadow: '0 0 20px #DC2626, 0 0 30px #DC2626' },
        }
      }
    },
  },
  plugins: [],
}