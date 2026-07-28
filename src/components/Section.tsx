import type { ReactNode } from 'react';
import { SectionShell } from '../landing/ui';
import { navEntry } from '../data/nav';

type Props = {
  id: string;
  kicker?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  tone?: 'default' | 'sunken';
};

/**
 * Dossier section frame on the landing SectionShell. The §-number and the
 * exhibit letter both come from the nav data (src/data/nav.ts) — the single
 * source of section numbering; they are folded into the kicker line.
 */
export function Section({ id, kicker, title, lead, children, tone }: Props) {
  const nav = navEntry(id);
  const kickerFull = [
    nav ? `§ ${nav.num}` : null,
    nav?.exhibit ? `Exhibit ${nav.exhibit}` : null,
    kicker || null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <SectionShell id={id} kicker={kickerFull} title={title} lead={lead} tone={tone}>
      {children}
    </SectionShell>
  );
}

/** Sub-section heading — meta-voice label above a block (K2: one size, one weight). */
export function SubHead({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <h3 className="mb-4 mt-12 text-meta font-emph uppercase tracking-[0.2em] text-accent" title={hint}>
      {children}
    </h3>
  );
}
