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
          DEFAULT: '#171717',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#171717',
        },
        bg: {
          main: '#F7F5F2',
          secondary: '#EEEAE4',
          card: '#FFFFFF',
        },
        bronze: {
          DEFAULT: '#B88A5A',
          50: '#faf7f3',
          100: '#f4ede4',
          200: '#e8dbca',
          300: '#d7c2a7',
          400: '#c5a581',
          500: '#B88A5A',
          600: '#9e7146',
          700: '#7f5637',
          800: '#684630',
          900: '#553a29',
        },
        text: {
          primary: '#171717',
          secondary: '#6B6258',
          muted: '#8C8276',
        },
        border: {
          subtle: '#E5E0D8',
          medium: '#D6CFC4',
        },
        // Subtle Muted Status Tones
        status: {
          pending: '#9B6E28',
          pendingBg: '#FBF5EB',
          accepted: '#3D7055',
          acceptedBg: '#EDF5F0',
          completed: '#3D7055',
          completedBg: '#EDF5F0',
          cancelled: '#99453F',
          cancelledBg: '#FDF2F1',
          progress: '#3B5B75',
          progressBg: '#EFF4F8',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(23, 23, 23, 0.04), 0 1px 4px -1px rgba(23, 23, 23, 0.02)',
        'soft-md': '0 8px 24px -4px rgba(23, 23, 23, 0.06), 0 2px 8px -2px rgba(23, 23, 23, 0.03)',
        'soft-lg': '0 16px 36px -6px rgba(23, 23, 23, 0.08), 0 4px 12px -2px rgba(23, 23, 23, 0.04)',
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
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
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
