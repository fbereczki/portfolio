import { BrainCircuit, CalendarClock, Route, Search } from 'lucide-react';
import { Badge, Card, Panel, Reveal, SectionShell } from '../ui';

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'One memory, every surface',
    body: 'Decisions, preferences, project state, session summaries and full documents — one logical memory served to Claude Code, Desktop, Web and any MCP-capable client. Every session boots with a bundle: pinned context, open tasks, déjà-vu matches.',
  },
  {
    icon: Search,
    title: 'Déjà-vu recall',
    body: 'Hybrid search — full-text fused with vector embeddings computed inside the platform, no third-party AI API in the loop — surfaces the precedent before you repeat the mistake. Ask-your-memory answers cite their sources.',
  },
  {
    icon: Route,
    title: 'Coach reports → Beacon',
    body: 'Weekly, ledger-computed reports on your own leverage, re-prompt rate and steering — the numbers behind the ×156 story — reported onward to Beacon so plans rest on measured performance.',
  },
  {
    icon: CalendarClock,
    title: 'Checkpoint · handoff · resume',
    body: 'Hit a quota wall mid-task, switch account or surface, and resume with the exact working set — down to verbatim replay of the last forty turns.',
  },
];

/* Capture coverage — the product publishes its own limits (honesty doctrine). */
const COVERAGE = [
  { surface: 'Claude Code', capture: 'Automatic, ~100%', how: 'deterministic transcript hook — model-independent', tone: 'ok' as const, hint: 'A lifecycle hook ingests the full transcript 1:1 — prompts, reasoning, tool calls, file diffs, tokens. No model cooperation needed.' },
  { surface: 'claude.ai (web)', capture: 'Opt-in', how: 'browser extension, per turn', tone: 'accent' as const, hint: 'A browser extension captures each turn when the user enables it.' },
  { surface: 'Desktop / other MCP clients', capture: 'Recall-only', how: 'no lifecycle hooks exist — published as a limit, not hidden', tone: 'neutral' as const, hint: 'These clients can read the memory but cannot write reliable captures — the product states this openly.' },
];

export function ProductMimir() {
  return (
    <SectionShell
      id="mimir"
      kicker="Mimir — the memory"
      title="The memory that makes the engineer better."
      lead="Mimir serves you, the human in the loop. It captures the full engineering record — prompts, reasoning, tool calls, file changes, tokens — into one hash-chained ledger, then works for your growth: its déjà-vu system recalls the last time you faced this exact problem, and its coach reports turn the ledger into KPIs about your own progress and performance, which feed straight into Beacon's planning. Part of the platform like everything else — and the one piece you can also run self-hosted on request."
      tone="sunken"
    >
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.05}>
            <Card className="flex h-full gap-4 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-accent">
                <f.icon size={18} strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-title font-emph text-text-strong">{f.title}</h3>
                <p className="mt-2 text-dense leading-relaxed text-text-muted">{f.body}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <Panel
          heading="Capture coverage — published, not promised"
          aside={<Badge tone="accent" title="~97,500 events captured on the reference install, all from the deterministic hook.">≈97.5k events</Badge>}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-dense">
              <thead>
                <tr>
                  {['Surface', 'Capture', 'Mechanism'].map((h) => (
                    <th key={h} className="whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-left text-meta font-emph uppercase tracking-[0.04em] text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COVERAGE.map((c) => (
                  <tr key={c.surface} className="border-b border-border transition-colors last:border-0 hover:bg-surface-2">
                    <td className="px-3 py-2 text-text-strong">{c.surface}</td>
                    <td className="whitespace-nowrap px-3 py-2"><Badge tone={c.tone} title={c.hint}>{c.capture}</Badge></td>
                    <td className="px-3 py-2 text-text-muted">{c.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex gap-2 text-dense leading-snug text-text">
            <span className="shrink-0 font-emph text-accent">→</span>
            A memory product that overstates its own capture would be worthless as evidence. Mimir publishes the table above inside the product.
          </p>
        </Panel>
      </Reveal>
    </SectionShell>
  );
}
