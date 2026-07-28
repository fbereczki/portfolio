import { Badge, Card, Panel, Reveal, SectionShell, VerdictStat } from '../ui';

/* Beacon — project control. Demo table uses the anonymized seed projects of
   the product (real seed data, OEM names anonymized per the honesty rules). */

const GATE_ROWS = [
  { project: 'Truck ECU platform', customer: 'European commercial-vehicle OEM', gate: 'G30', cpm: 'W21 2027', status: 'on track', tone: 'ok' as const, hint: 'The resource-levelled critical path lands before the committed gate date.' },
  { project: 'Central gateway', customer: 'European commercial-vehicle OEM', gate: 'G20', cpm: 'W44 2026', status: 'float 11 wd', tone: 'ok' as const, hint: '11 working days of schedule slack remain between the forecast and the committed gate date.' },
  { project: 'ADAS domain controller', customer: 'North-American truck OEM', gate: 'G20', cpm: 'W02 2027', status: 'commit at risk', tone: 'warn' as const, hint: 'The forecast has consumed the float behind the committed date — counter-moves are ranked by cheapest option that still holds the gate.' },
  { project: 'Battery management system', customer: 'European commercial-vehicle OEM', gate: 'G10', cpm: 'W38 2026', status: 'on track', tone: 'ok' as const, hint: 'The resource-levelled critical path lands before the committed gate date.' },
];

const PROOF_POINTS = [
  'Work-package catalogue: 43 active ISO/SAE 21434 work products, 156 tasks, 369.5 engineering days — tailored per project, never copy-pasted',
  'Resource-constrained critical path: FTE buys parallelism, not speed — a full-time task never gets faster by throwing people at it',
  'One engine, one truth: the screen, the DOCX, the XLSX and the status deck all read the same calculation — a document may not round differently',
  'Honest by construction: empty is —, zero is 0, a rate column refuses to be summed, and “not enough comparable history” is an answer',
];

export function ProductBeacon() {
  return (
    <SectionShell
      id="beacon"
      kicker="Beacon — the control room"
      title="What it costs, when it lands, and whether the gate holds."
      lead="AI-first project management: Beacon takes the work CodeWitness governs and the KPIs Mimir reports, and makes them plannable, trackable and presentable for humans. Cost, schedule, gates and customer-grade documents all come from one engine — so no two artifacts can disagree. Built for ISO/SAE 21434 programs first."
    >
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        <VerdictStat
          label="Reference project total"
          value="€536,818.75"
          verdict="protected by a regression shield — the engine cannot drift silently"
          hint="A dedicated regression test proves the reference project total stays byte-identical no matter what is built on top of the cost engine."
        />
        <VerdictStat
          label="Change-order delta"
          value="−€86,874"
          verdict="scope change re-priced by the same engine — with the −37 day schedule effect"
          hint="Removing one validation work package: the cost and schedule deltas come from the identical calculation the original quote used."
        />
        <VerdictStat
          label="Reference-class check"
          value="5 similar"
          verdict="your plan is compared against completed projects before you commit to it"
          hint="Weighted similarity across complexity, work-package overlap and size. Below 3 comparables Beacon says so and refuses to show a band."
        />
      </div>
      <Reveal className="mt-6">
        <Panel
          heading="Delivery plan — gate commitments"
          aside={<Badge tone="neutral" title="Anonymized seed projects from the product demo database.">demo data</Badge>}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-dense">
              <thead>
                <tr>
                  {['Project', 'Customer', 'Next gate', 'CPM forecast', 'Verdict'].map((h) => (
                    <th key={h} className="whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-left text-meta font-emph uppercase tracking-[0.04em] text-text-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GATE_ROWS.map((r) => (
                  <tr key={r.project} className="border-b border-border transition-colors last:border-0 hover:bg-surface-2">
                    <td className="whitespace-nowrap px-3 py-2 text-text-strong">{r.project}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-text-muted">{r.customer}</td>
                    <td className="num whitespace-nowrap px-3 py-2 text-text">{r.gate}</td>
                    <td className="num whitespace-nowrap px-3 py-2 text-text">{r.cpm}</td>
                    <td className="whitespace-nowrap px-3 py-2"><Badge tone={r.tone} title={r.hint}>{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-meta text-text-faint">
            Week-precision on purpose: the schedule engine knows calendar days, but “24 May 2028” would claim a precision the plan does not have.
          </p>
        </Panel>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {PROOF_POINTS.map((p, i) => (
          <Reveal key={p} delay={i * 0.04}>
            <Card className="flex gap-3 p-4">
              <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent" />
              <p className="text-dense leading-relaxed text-text">{p}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
