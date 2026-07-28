import defaultColors from 'tailwindcss/colors';
import landing from './tailwind.landing.config.js';

/** @type {import('tailwindcss').Config} */
// Portfolio (portfolio.imwy.ai) — same ecosystem design language as the
// landing, plus (a) Tailwind default colors so the self-styled product demos
// keep their palette classes, and (b) legacy paper tokens for the printable CV.
export default {
  ...landing,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...landing.theme,
    extend: {
      ...landing.theme.extend,
      // Skeleton shimmer for the iframed product demos (K5 loading state).
      keyframes: {
        ...landing.theme.extend?.keyframes,
        shimmer: { from: { backgroundPosition: '100% 0' }, to: { backgroundPosition: '-100% 0' } },
      },
      animation: { ...landing.theme.extend?.animation, shimmer: 'shimmer 1.4s ease infinite' },
    },
    colors: {
      ...defaultColors,
      ...landing.theme.colors,
      // legacy paper palette — used only by the printable CV document view
      paper: { DEFAULT: '#F4EFE3', deep: '#EAE2CF', rule: '#C9BFA4', shadow: '#D9CFB6' },
      ink: { DEFAULT: '#1A1B22', soft: '#3A3B43', mute: '#6B6A63', faint: '#8E8B7E' },
      oxblood: { DEFAULT: '#7E1E1B', soft: '#A85049', deep: '#5C1614' },
    },
  },
};
