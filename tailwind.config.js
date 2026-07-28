/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './landing.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — resolve to CSS variables set per data-theme
        paper: {
          DEFAULT: 'var(--paper)',
          deep: 'var(--paper-deep)',
          rule: 'var(--paper-rule)',
          shadow: 'var(--paper-shadow)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          mute: 'var(--ink-mute)',
          faint: 'var(--ink-faint)',
        },
        oxblood: {
          DEFAULT: 'var(--oxblood)',
          soft: 'var(--oxblood-soft)',
          deep: 'var(--oxblood-deep)',
        },
        sage: { DEFAULT: 'var(--sage)', soft: 'var(--sage-soft)' },
        amber: { DEFAULT: 'var(--amber)', soft: 'var(--amber-soft)' },
        teal: { DEFAULT: 'var(--teal)', soft: 'var(--teal-soft)' },
        // Dark product palette — used inside project demos so they look like the real apps
        bg: { 950: '#070a13', 900: '#0b101e', 800: '#111a2e' },
        accent: { DEFAULT: '#7c5cff', soft: '#a892ff', hot: '#ff5ec1', cyan: '#39e6c8' },
      },
      fontFamily: {
        display: 'var(--font-display)',
        serif: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      boxShadow: {
        paper: 'var(--shadow-card)',
        'paper-hover': 'var(--shadow-card-hover)',
        stamp: '0 0 0 1.5px rgba(126,30,27,0.65), 0 0 0 4px var(--paper)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
