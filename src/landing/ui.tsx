import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/* House primitives — Beacon component recipes (Card / VerdictStat / Panel /
   Badge / Section shell). K-codex: K1 8px grid, K2 two sizes per component,
   K3 one accent, K6 verdict lines, K10 tooltips via title attributes. */

export function Card({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-md border border-border bg-surface shadow-panel ${className}`}>
      {children}
    </div>
  );
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`min-w-0 ${className}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** K6: a number without a verdict is noise — verdict is a required prop. */
export function VerdictStat({
  label,
  value,
  verdict,
  tone = 'accent',
  hint,
}: {
  label: string;
  value: string;
  verdict: ReactNode;
  tone?: 'accent' | 'ok' | 'warn';
  hint?: string;
}) {
  const toneText = tone === 'ok' ? 'text-ok' : tone === 'warn' ? 'text-warn' : 'text-accent';
  return (
    <Card className="flex min-w-0 flex-col p-4" >
      <div className="text-meta font-emph uppercase tracking-[0.07em] text-text-muted" title={hint}>
        {label}
      </div>
      <div className="num mt-2 text-value font-value leading-none tracking-tight text-text-strong">{value}</div>
      <div className="mt-3 flex gap-2 border-t border-border pt-3 text-dense leading-snug text-text">
        <span className={`shrink-0 font-emph ${toneText}`}>→</span>
        <span>{verdict}</span>
      </div>
    </Card>
  );
}

export function SectionShell({
  id,
  kicker,
  title,
  lead,
  children,
  tone = 'default',
}: {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
  children: ReactNode;
  tone?: 'default' | 'sunken';
}) {
  return (
    <section id={id} className={`${tone === 'sunken' ? 'bg-bg-sunken' : 'bg-bg'} scroll-mt-14 border-t border-border`}>
      <div className="mx-auto max-w-[1120px] px-6 py-16 max-md:px-4 max-md:py-12">
        <Reveal>
          <p className="text-meta font-emph uppercase tracking-[0.2em] text-accent">{kicker}</p>
          <h2 className="mt-3 max-w-[720px] text-hero font-hero leading-tight tracking-tight text-text-strong">
            {title}
          </h2>
          {lead && <p className="mt-4 max-w-[680px] text-lead font-body leading-relaxed text-text">{lead}</p>}
        </Reveal>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Badge({
  tone = 'neutral',
  children,
  title,
}: {
  tone?: 'neutral' | 'accent' | 'ok' | 'warn' | 'bad';
  children: ReactNode;
  title?: string;
}) {
  const cls =
    tone === 'accent'
      ? 'bg-accent-quiet text-accent'
      : tone === 'ok'
        ? 'bg-ok-quiet text-ok'
        : tone === 'warn'
          ? 'bg-warn-quiet text-warn'
          : tone === 'bad'
            ? 'bg-bad-quiet text-bad'
            : 'border border-border text-text-muted';
  return (
    <span title={title} className={`inline-flex items-center whitespace-nowrap rounded-[5px] px-2 py-0.5 text-meta font-emph ${cls}`}>
      {children}
    </span>
  );
}

export function Panel({ heading, aside, children }: { heading: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-2.5 border-b border-border px-4 py-3.5">
        <h3 className="text-title font-emph text-text-strong">{heading}</h3>
        {aside}
      </div>
      <div className="px-4 py-3.5">{children}</div>
    </Card>
  );
}
