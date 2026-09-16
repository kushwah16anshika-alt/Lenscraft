/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#09090B',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
        bg: {
          main: '#FAFAFA',
          secondary: '#F4F4F5',
          card: '#FFFFFF',
          dark: '#09090B',
          darkSurface: '#18181B',
        },
        text: {
          primary: '#09090B',
          secondary: '#52525B',
          muted: '#71717A',
          light: '#A1A1AA',
        },
        border: {
          subtle: '#F4F4F5',
          DEFAULT: '#E4E4E7',
          medium: '#D4D4D8',
          dark: '#27272A',
        },
        // Refined Minimalist Status Tones
        status: {
          pending: '#854D0E',
          pendingBg: '#FEFCE8',
          pendingBorder: '#FEF08A',
          accepted: '#166534',
          acceptedBg: '#F0FDF4',
          acceptedBorder: '#BBF7D0',
          completed: '#166534',
          completedBg: '#F0FDF4',
          completedBorder: '#BBF7D0',
          cancelled: '#991B1B',
          cancelledBg: '#FEF2F2',
          cancelledBorder: '#FECACA',
          progress: '#334155',
          progressBg: '#F8FAFC',
          progressBorder: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'soft-md': '0 6px 18px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 12px 28px -6px rgba(0, 0, 0, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}
