import type { ReactNode } from 'react';

type Props = {
  id: string;
  kicker?: string;
  title?: string;
  /** If provided, this is rendered as italic-em accent after `title`. Otherwise the last word of `title` is auto-italicised. */
  titleAccent?: string;
  lead?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  number?: string;
};

function splitTitle(title: string): { head: string; tail: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length === 1) return { head: '', tail: title };
  return { head: parts.slice(0, -1).join(' '), tail: parts[parts.length - 1] };
}

export function Section({
  id,
  kicker,
  title,
  titleAccent,
  lead,
  actions,
  children,
  number,
  className = '',
}: Props) {
  const { head, tail } = title ? splitTitle(title) : { head: '', tail: '' };
  const accent = titleAccent ?? tail;
  const head2 = titleAccent ? title : head;

  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-14 ${className}`}
    >
      {(number || kicker || title || lead || actions) && (
        <header
          className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-[3px] border-double border-ink pb-3.5"
        >
          {number && (
            <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-oxblood">
              §&nbsp;{number}
            </span>
          )}
          {title && (
            <h2 className="display-serif m-0 text-[34px] leading-none text-ink sm:text-[42px]">
              {head2 && <span>{head2} </span>}
              {accent && <span className="accent-italic">{accent}</span>}
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
