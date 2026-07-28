import { useEffect, useState } from 'react';
import { Download, Moon, Sun } from 'lucide-react';

/* Portfolio shell — same recipe as the imwy.ai landing Nav (sticky, blurred,
   hairline bottom border). The brand mark links BACK to the mothership; the
   "/ portfolio" suffix marks which room of the house you are in. */

const NAV = [
  { href: '#about', label: 'Case file' },
  { href: '#experience', label: 'Experience' },
  { href: '#codewitness-spotlight', label: 'Exhibit A' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

/* Same hook + same 'imwy_theme' storage key as the landing Shell — the theme
   choice follows the visitor between imwy.ai and portfolio.imwy.ai. */
function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('imwy_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('imwy_theme', theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}

/* Hexagon-beam logo — hand-drawn, echoes the beacon rail mark on the landing. */
export function Mark() {
  return (
    <span className="flex size-8 items-center justify-center rounded-md bg-accent-quiet text-accent">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 1.8 17 6v8l-7 4.2L3 14V6l7-4.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 6.5v7M6.8 8.4l6.4 3.2M13.2 8.4l-6.4 3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Nav() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between gap-4 px-6 max-md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <a
            href="https://imwy.ai/"
            title="Back to the imwy.ai platform"
            className="flex shrink-0 items-center gap-3"
          >
            <Mark />
            <span className="text-title font-emph tracking-[0.08em] text-text-strong">imwy.ai</span>
          </a>
          <span className="truncate text-title text-text-muted" aria-hidden>
            / portfolio
          </span>
        </div>
        <nav className="flex items-center gap-1 max-md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded px-2.5 py-1.5 text-dense text-text-muted transition-colors hover:bg-surface-2 hover:text-text-strong"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex size-8 items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-border-strong hover:text-text-strong"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => window.print()}
            title="Download CV (PDF) — opens the print dialog with a one-page paper CV"
            className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded border border-border bg-surface px-3 text-dense font-emph text-text-strong transition-colors hover:border-border-strong"
          >
            <Download size={12} />
            CV
          </button>
        </div>
      </div>
    </header>
  );
}
