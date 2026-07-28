import type { ReactNode } from 'react';
import { navEntry } from '../data/nav';

type Props = {
  id: string;
  kicker?: string;
  title?: string;
  /** Explicit accent rendered in italic Fraunces after `title`. No auto-italics. */
  titleAccent?: string;
  lead?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Dossier section frame. The §-number and the exhibit letter both come from
 * the nav data (src/data/nav.ts) — the single source of section numbering.
 */
export function Section({
  id,
  kicker,
  title,
  titleAccent,
  lead,
  actions,
  children,
  className = '',
}: Props) {
  const nav = navEntry(id);

  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-14 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 ${className}`}
    >
      {(nav || kicker || title || lead || actions) && (
        <header className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-[3px] border-double border-ink pb-3.5">
          {nav && (
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-oxblood">
              §&nbsp;{nav.num}
            </span>
          )}
          {nav?.exhibit && (
            <span
              className={`border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] ${
                nav.exhibit === 'A' ? 'border-oxblood text-oxblood' : 'border-ink text-ink'
              }`}
            >
              Exhibit&nbsp;{nav.exhibit}
            </span>
          )}
          {title && (
            <h2 className="display-serif m-0 text-[34px] leading-none text-ink sm:text-[42px]">
              <span>{title}</span>
              {titleAccent && <span className="accent-italic"> {titleAccent}</span>}
            </h2>
          )}
          {kicker && (
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
              · {kicker}
            </span>
          )}
          {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
        </header>
      )}
      {lead && (
        <p className="prose-just mb-7 max-w-[820px] font-serif text-[16px] italic leading-[1.55] text-ink-soft">
          {lead}
        </p>
      )}
      {children}
    </section>
  );
}

/** Sub-section heading styled like wp-planner h3.sub */
export function SubHead({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <h3 className="display-serif mb-3 mt-7 text-[21px] font-semibold tracking-[-0.012em] text-ink">
      {children}
      {hint && (
        <span className="ml-3 font-mono text-[10.5px] font-medium tracking-[0.14em] text-ink-mute">
          {hint}
        </span>
      )}
    </h3>
  );
}
