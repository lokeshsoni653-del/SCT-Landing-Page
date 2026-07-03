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
          50:  '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3f51b5',
          600: '#3949ab',
          700: '#303f9f',
          800: '#283593',
          900: '#1a237e',  // primary navy blue #1a237e
          950: '#0d134a',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',  // primary gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        sct: {
          navy:    '#1a237e',
          navyMid: '#283593',
          navyLight:'#3f51b5',
          gold:    '#f5c518',
          goldDark:'#d4a017',
          white:   '#ffffff',
          offWhite:'#f8fafc',
          gray:    '#94a3b8',
          grayDark:'#64748b',
        }
      },
      fontFamily: {
        sans:    ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #1a237e 0%, #283593 50%, #0d134a 100%)',
        'gold-gradient':    'linear-gradient(135deg, #f5c518 0%, #d4a017 100%)',
        'card-gradient':    'linear-gradient(145deg, rgba(40,53,147,0.8) 0%, rgba(26,35,126,0.95) 100%)',
        'section-gradient': 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up':     'slideUp 0.6s ease-out forwards',
        'fade-in':      'fadeIn 0.8s ease-out forwards',
        'shimmer':      'shimmer 2s linear infinite',
        'spin-slow':    'spin 20s linear infinite',
        'bounce-slow':  'bounce 3s infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 5px rgba(245, 197, 24, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 197, 24, 0.8), 0 0 40px rgba(245, 197, 24, 0.4)' },
        },
      },
      boxShadow: {
        'gold':     '0 4px 20px rgba(245, 197, 24, 0.4)',
        'gold-lg':  '0 8px 40px rgba(245, 197, 24, 0.3)',
        'navy':     '0 4px 20px rgba(10, 22, 40, 0.4)',
        'card':     '0 8px 32px rgba(10, 22, 40, 0.15)',
        'glow':     '0 0 30px rgba(245, 197, 24, 0.2)',
        'inner-glow':'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs':  '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
