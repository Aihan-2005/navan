import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1E3A8A', // آبی تیره
        'primary-dark': '#0B0B0D', // مشکی ملایم
        'primary-light': '#2563EB', // آبی روشن برای hover
      },
      borderRadius: {
        'soft-lg': '1rem',
        'soft-xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(0,0,0,0.3)',
        glow: '0 0 25px rgba(37, 99, 235, 0.4)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards',
        float: 'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
