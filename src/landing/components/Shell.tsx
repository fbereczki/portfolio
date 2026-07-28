import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const NAV = [
  { href: '#system', label: 'Platform' },
  { href: '#codewitness', label: 'CodeWitness' },
  { href: '#mimir', label: 'Mimir' },
  { href: '#beacon', label: 'Beacon' },
  { href: '#method', label: 'Method' },
  { href: '#evidence', label: 'Evidence' },
];

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

/* Hexagon-beam logo — hand-drawn, echoes the beacon rail mark. */
function Mark() {
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
        <a href="#top" className="flex items-center gap-3">
          <Mark />
          <span className="text-title font-emph tracking-[0.08em] text-text-strong">imwy.ai</span>
        </a>
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
          <a
            href="https://portfolio.imwy.ai/"
            className="inline-flex h-8 items-center whitespace-nowrap rounded border border-border bg-surface px-3 text-dense font-emph text-text-strong transition-colors hover:border-border-strong"
          >
            Founder&nbsp;→
          </a>
        </div>
      </div>
    </header>
  );
}

/* Beacon-beam hero backdrop: quiet radial glow + slow sweep, no gradient blobs. */
export function Beam() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-260px] h-[520px] w-[820px] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent-rgb) / 0.14), transparent 70%)' }}
      />
      {!reduce && (
        <motion.div
          className="absolute left-1/2 top-[-40px] h-[420px] w-[2px] origin-top"
          style={{ background: 'linear-gradient(to bottom, rgb(var(--accent-rgb) / 0.5), transparent)' }}
          initial={{ rotate: -24 }}
          animate={{ rotate: 24 }}
          transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-sunken">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-start justify-between gap-8 px-6 py-12 max-md:px-4">
        <div className="max-w-[360px]">
          <div className="flex items-center gap-3">
            <Mark />
            <span className="text-title font-emph tracking-[0.08em] text-text-strong">imwy.ai</span>
          </div>
          <p className="mt-3 text-dense leading-relaxed text-text-muted">
            The governance layer for AI-assisted software delivery. Memory, evidence and project
            control — engineered in the EU, measured on our own ledger.
          </p>
        </div>
        <div className="flex gap-16 max-md:gap-10">
          <div>
            <p className="text-meta font-emph uppercase tracking-[0.1em] text-text-faint">Products</p>
            <ul className="mt-3 space-y-2 text-dense">
              <li><a className="text-text-muted transition-colors hover:text-text-strong" href="#codewitness">CodeWitness</a></li>
              <li><a className="text-text-muted transition-colors hover:text-text-strong" href="#mimir">Mimir</a></li>
              <li><a className="text-text-muted transition-colors hover:text-text-strong" href="#beacon">Beacon</a></li>
            </ul>
          </div>
          <div>
            <p className="text-meta font-emph uppercase tracking-[0.1em] text-text-faint">Company</p>
            <ul className="mt-3 space-y-2 text-dense">
              <li><a className="text-text-muted transition-colors hover:text-text-strong" href="https://portfolio.imwy.ai/">Founder portfolio</a></li>
              <li><a className="text-text-muted transition-colors hover:text-text-strong" href="mailto:ferenc.bereczki@imwy.ai">ferenc.bereczki@imwy.ai</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-2 px-6 py-4 text-meta text-text-faint max-md:px-4">
          <span>© 2026 imwy.ai — one platform, delivered as SaaS from the EU. Company-hosted deployments on request.</span>
          <span>Every number on this page traces to a ledger entry or a commit.</span>
        </div>
      </div>
    </footer>
  );
}
