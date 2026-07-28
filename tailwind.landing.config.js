/** @type {import('tailwindcss').Config} */
// Landing (imwy.ai) — Beacon/Mimir ecosystem design language.
// Tokens follow beacon-light frontend-next/src/styles/tokens.css (RGB triplets
// so Tailwind opacity modifiers compose). Loaded via @config from landing.css —
// the portfolio keeps its own tailwind.config.js untouched.
export default {
  content: ['./landing.html', './src/landing/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      bg: {
        DEFAULT: 'rgb(var(--bg-rgb) / <alpha-value>)',
        sunken: 'rgb(var(--bg-sunken-rgb) / <alpha-value>)',
      },
      surface: {
        DEFAULT: 'rgb(var(--surface-rgb) / <alpha-value>)',
        2: 'rgb(var(--surface-2-rgb) / <alpha-value>)',
        3: 'rgb(var(--surface-3-rgb) / <alpha-value>)',
      },
      border: {
        DEFAULT: 'rgb(var(--border-rgb) / <alpha-value>)',
        strong: 'rgb(var(--border-strong-rgb) / <alpha-value>)',
      },
      text: {
        strong: 'rgb(var(--text-strong-rgb) / <alpha-value>)',
        DEFAULT: 'rgb(var(--text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
        faint: 'rgb(var(--text-faint-rgb) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
        strong: 'rgb(var(--accent-strong-rgb) / <alpha-value>)',
        quiet: 'rgb(var(--accent-rgb) / 0.13)',
        line: 'rgb(var(--accent-rgb) / 0.35)',
      },
      'on-accent': 'var(--on-accent)',
      bad: { DEFAULT: 'rgb(var(--bad-rgb) / <alpha-value>)', quiet: 'rgb(var(--bad-rgb) / 0.14)' },
      warn: { DEFAULT: 'rgb(var(--warn-rgb) / <alpha-value>)', quiet: 'rgb(var(--warn-rgb) / 0.15)' },
      ok: { DEFAULT: 'rgb(var(--ok-rgb) / <alpha-value>)', quiet: 'rgb(var(--ok-rgb) / 0.14)' },
      seg: {
        1: 'rgb(var(--accent-rgb) / <alpha-value>)',
        2: 'rgb(var(--seg-2-rgb) / <alpha-value>)',
        3: 'rgb(var(--seg-3-rgb) / <alpha-value>)',
        4: 'rgb(var(--seg-4-rgb) / <alpha-value>)',
      },
    },
    fontFamily: {
      sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['ui-monospace', 'SF Mono', 'Cascadia Code', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
    },
    fontSize: {
      tick: ['10px', { lineHeight: '1.2' }],
      meta: ['11px', { lineHeight: '1.35', letterSpacing: '0.06em' }],
      dense: ['12.5px', { lineHeight: '1.45' }],
      body: ['14px', { lineHeight: '1.5' }],
      title: ['15px', { lineHeight: '1.4' }],
      lead: ['18px', { lineHeight: '1.45' }],
      value: ['24px', { lineHeight: '1', letterSpacing: '-0.01em' }],
      hero: ['30px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      display: ['44px', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
    },
    fontWeight: {
      hero: '200',
      value: '300',
      body: '400',
      emph: '500',
      strong: '600',
    },
    extend: {
      spacing: { 1: '4px', 2: '8px', 3: '12px', 4: '16px', 6: '24px', 8: '32px', 12: '48px', 16: '64px', 24: '96px' },
      borderRadius: { DEFAULT: '6px', md: '8px', lg: '11px' },
      boxShadow: { panel: 'var(--shadow)' },
    },
  },
  plugins: [],
};
