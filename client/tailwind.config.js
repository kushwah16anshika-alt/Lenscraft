/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080808',
          secondary: '#111111',
          card: '#171717',
          cardHover: '#1f1f1f',
          elevated: '#222222',
        },
        ivory: {
          DEFAULT: '#FBF9F5',
          100: '#FFFFFF',
          200: '#FBF9F5',
          300: '#EAE6DF',
          400: '#D5D0C6',
          500: '#A39E93',
          600: '#7A756B',
          700: '#545048',
          800: '#33302B',
          900: '#1A1815',
        },
        gold: {
          DEFAULT: '#C5A059',
          50: '#FBF7EE',
          100: '#F5ECD3',
          200: '#EBD8A3',
          300: '#DEC272',
          400: '#D4AF37',
          500: '#C5A059',
          600: '#A6823B',
          700: '#7F6228',
          800: '#574218',
          900: '#33260C',
        },
        amberAccent: {
          DEFAULT: '#D97706',
          glow: 'rgba(217, 119, 6, 0.3)',
        },
        border: {
          subtle: '#262626',
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          card: 'rgba(255, 255, 255, 0.1)',
          gold: 'rgba(197, 160, 89, 0.3)',
        },
        status: {
          pending: '#D97706',
          accepted: '#10B981',
          completed: '#C5A059',
          cancelled: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card-subtle': '0 4px 20px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-hover': '0 12px 36px 0 rgba(0, 0, 0, 0.8), 0 0 20px 0 rgba(197, 160, 89, 0.15), inset 0 0 0 1px rgba(197, 160, 89, 0.3)',
        'gold-glow': '0 0 25px -4px rgba(197, 160, 89, 0.4)',
        'gold-glow-lg': '0 0 45px -8px rgba(197, 160, 89, 0.5)',
      },
      borderRadius: {
        'xs': '3px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slow-zoom': 'slowZoom 24s ease-in-out infinite alternate',
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
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
