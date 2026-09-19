/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#02050e',
          900: '#030712',
          800: '#060b19',
          700: '#0a1128',
          600: '#0f1738',
          500: '#16204d',
        },
        electric: {
          cyan: '#00d2ff',
          sky: '#38bdf8',
          indigo: '#6366f1',
          violet: '#a855f7',
          purple: '#c084fc',
        },
        glass: {
          bg: 'rgba(6, 11, 25, 0.72)',
          border: 'rgba(56, 189, 248, 0.15)',
          hover: 'rgba(10, 17, 40, 0.85)',
          glow: 'rgba(0, 210, 255, 0.25)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -4px rgba(0, 210, 255, 0.5)',
        'cyan-glow-lg': '0 0 45px -5px rgba(0, 210, 255, 0.7)',
        'indigo-glow': '0 0 30px -4px rgba(99, 102, 241, 0.5)',
        'glass-card': '0 12px 36px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'ken-burns': 'kenBurnsSlow 28s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurnsSlow: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1.02) translate(1%, 0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
}
