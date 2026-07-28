import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, SectionShell } from '../ui';

/* The trio — one connected system, three audiences:
   CodeWitness serves the AI (senior discipline as a service),
   Mimir serves the engineer (memory, déjà-vu, growth KPIs),
   Beacon serves the humans around the work (AI-first PM).
   Flows: Mimir reports KPIs to Beacon; Beacon presents CodeWitness's work;
   Mimir and CodeWitness exchange memory and evidence. */

const NODES = [
  {
    id: 'mimir',
    x: 130,
    y: 84,
    name: 'Mimir',
    role: 'grows the engineer',
    audience: 'serves you',
    desc: 'Remembers every piece of work across every AI surface, surfaces déjà-vu before you repeat a mistake, and coaches you with KPI reports on your own progress and performance.',
  },
  {
    id: 'codewitness',
    x: 430,
    y: 84,
    name: 'CodeWitness',
    role: 'disciplines the AI',
    audience: 'serves your AI',
    desc: 'Senior engineering knowledge delivered as services to your AI: gates, reviews, provenance and full traceability, so the AI works precisely, correctly and verifiably — EU AI Act evidence included.',
  },
  {
    id: 'beacon',
    x: 280,
    y: 268,
    name: 'Beacon',
    role: 'plans for humans',
    audience: 'serves your stakeholders',
    desc: 'AI-first project management: turns the work CodeWitness governs into something humans can plan, track and present — cost, schedule, gates and customer-grade documents.',
  },
];

const FLOWS = [
  { from: [188, 106], to: [372, 106], label: 'memory ↔ evidence', reverse: true },
  { from: [396, 140], to: [318, 240], label: 'work, made presentable' },
  { from: [164, 140], to: [242, 240], label: 'KPI reports' },
];

export function System() {
  const reduce = useReducedMotion();
  return (
    <SectionShell
      id="system"
      kicker="The platform"
      title="Three systems. One goal: provable delivery."
      lead="Each product serves a different party in the same delivery loop. CodeWitness gives your AI the discipline of a senior engineer. Mimir gives you a memory that never resets — and honest numbers about how you are improving. Beacon gives everyone else a plan they can trust. One platform, one service in several parts, delivered as SaaS — with the entire stack available company-hosted on request."
    >
      <Reveal className="max-md:hidden">
        <div className="rounded-md border border-border bg-surface shadow-panel">
          <svg viewBox="0 0 560 314" className="w-full" role="img" aria-label="Diagram: CodeWitness disciplines the AI, Mimir grows the engineer and reports KPIs to Beacon, Beacon presents the work to humans">
            <defs>
              <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 Z" fill="rgb(var(--text-faint-rgb))" />
              </marker>
            </defs>
            {FLOWS.map((f, i) => {
              const d = `M${f.from[0]},${f.from[1]} L${f.to[0]},${f.to[1]}`;
              return (
                <g key={i}>
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="rgb(var(--border-strong-rgb))"
                    strokeWidth="1.4"
                    strokeDasharray="5 5"
                    markerEnd="url(#arr)"
                    {...(f.reverse ? { markerStart: 'url(#arr)' } : {})}
                    {...(!reduce
                      ? {
                          initial: { strokeDashoffset: 0 },
                          animate: { strokeDashoffset: -40 },
                          transition: { duration: 4, repeat: Infinity, ease: 'linear' },
                        }
                      : {})}
                  />
                  <text
                    x={(f.from[0] + f.to[0]) / 2}
                    y={(f.from[1] + f.to[1]) / 2 - 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="rgb(var(--text-faint-rgb))"
                  >
                    {f.label}
                  </text>
                </g>
              );
            })}
            {NODES.map((n) => (
              <g key={n.id}>
                <a href={`#${n.id}`}>
                  <rect
                    x={n.x - 70}
                    y={n.y - 34}
                    width="140"
                    height="68"
                    rx="8"
                    fill="rgb(var(--surface-2-rgb))"
                    stroke="rgb(var(--accent-rgb))"
                    strokeOpacity="0.5"
                    strokeWidth="1.4"
                  />
                  <text x={n.x} y={n.y - 10} textAnchor="middle" fontSize="14" fontWeight="600" fill="rgb(var(--text-strong-rgb))">
                    {n.name}
                  </text>
                  <text x={n.x} y={n.y + 8} textAnchor="middle" fontSize="10" fill="rgb(var(--accent-rgb))" letterSpacing="1.2">
                    {n.role.toUpperCase()}
                  </text>
                  <text x={n.x} y={n.y + 24} textAnchor="middle" fontSize="10" fill="rgb(var(--text-faint-rgb))">
                    {n.audience}
                  </text>
                  <title>{n.desc}</title>
                </a>
              </g>
            ))}
          </svg>
        </div>
      </Reveal>
      <p className="mt-3 text-dense text-text-muted max-md:mt-0">
        The three share one design language, one honesty doctrine and one MCP agent surface — an
        agent session can reach all of them as tools.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {NODES.map((n, i) => (
          <Reveal key={n.id} delay={i * 0.06}>
            <a
              href={`#${n.id}`}
              className="block h-full rounded-md border border-border bg-surface p-4 shadow-panel transition-colors hover:border-accent-line"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-title font-emph text-text-strong">{n.name}</span>
                <span className="text-meta font-emph uppercase tracking-[0.1em] text-accent">{n.role}</span>
              </div>
              <p className="mt-2 text-dense leading-relaxed text-text-muted">{n.desc}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
