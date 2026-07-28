import { Badge, Card, Panel, Reveal, SectionShell } from '../ui';
import { CatchRateChart, SealRoundsChart, SpeedupChart } from '../charts';

/* Evidence — every figure ledger-sourced from the reference install (n=1),
   framed exactly as the source frames it: measured, not claimed. */

const COHORT = [
  { metric: 'Surviving lines per active hour', value: '×8.7', note: 'methodology cohort vs. other workspaces, same calendar window' },
  { metric: 'Steering (prompts per kLOC)', value: '×4.7 less', note: 'the framework needs fewer human corrections per unit of output' },
  { metric: 'Token conversion (tokens per surviving line)', value: '×5.6 better', note: 'less burn per line that actually ships and survives' },
];

export function Evidence() {
  return (
    <SectionShell
      id="evidence"
      kicker="Evidence"
      title="×156 leverage. Measured, not claimed."
      lead="One senior engineer, the full framework, six weeks of ledger data: weekly leverage grew from ×10 to ×156 — while weekly hours fell. This is what the combination of expertise, memory, evidence and governance compounds into. Every figure below traces to a ledger entry or a commit."
    >
      <div className="grid grid-cols-[1.35fr_1fr] gap-4 max-md:grid-cols-1">
        <Reveal>
          <Panel heading="Weekly leverage multiplier">
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <SpeedupChart />
              </div>
            </div>
            <p className="mt-2 flex gap-2 text-dense leading-snug text-text">
              <span className="shrink-0 font-emph text-accent">→</span>
              The peak week shipped 120.8k lines in 62 active hours with 81% of the work flowing through supervised agents — re-prompt rate down from 21.7% to as low as 2.7% along the way.
            </p>
            <p className="mt-2 text-meta text-text-faint">
              Computed as lines added ÷ active hours ÷ 12.5 — a calibrated solo baseline. A convention-based estimate, published as such.
            </p>
          </Panel>
        </Reveal>
        <div className="grid gap-4">
          <Reveal delay={0.05}>
            <Panel heading="Review rounds to seal a slice">
              <div className="overflow-x-auto">
                <div className="min-w-[440px]">
                  <SealRoundsChart />
                </div>
              </div>
              <p className="mt-2 flex gap-2 text-dense leading-snug text-text">
                <span className="shrink-0 font-emph text-accent">→</span>
                From 5 correction rounds to 1 as the methodology compounds. The s9 uptick was a genuinely new defect class — logged as such, not smoothed away.
              </p>
            </Panel>
          </Reveal>
          <Reveal delay={0.1}>
            <Panel heading="One defect class, two instruments">
              <div className="overflow-x-auto">
                <div className="min-w-[440px]">
                  <CatchRateChart />
                </div>
              </div>
              <p className="mt-2 flex gap-2 text-dense leading-snug text-text">
                <span className="shrink-0 font-emph text-accent">→</span>
                Five occurrences of a runtime defect class: static gates caught none, live end-to-end verification caught all five — and two later slices prevented the class entirely.
              </p>
            </Panel>
          </Reveal>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {COHORT.map((c, i) => (
          <Reveal key={c.metric} delay={i * 0.05}>
            <Card className="flex h-full flex-col p-4">
              <p className="text-meta font-emph uppercase tracking-[0.07em] text-text-muted">{c.metric}</p>
              <p className="num mt-2 text-value font-value text-text-strong">{c.value}</p>
              <p className="mt-3 flex gap-2 border-t border-border pt-3 text-dense leading-snug text-text">
                <span className="shrink-0 font-emph text-accent">→</span>
                {c.note}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <Card className="border-border-strong p-6">
          <p className="text-meta font-emph uppercase tracking-[0.12em] text-text-muted">What we do not claim</p>
          <p className="mt-3 max-w-[860px] text-dense leading-relaxed text-text-muted">
            These are self-measurements from one reference install (n=1), computed from a hash-chained
            ledger. The leverage multiplier is a convention-based estimate against a calibrated solo
            baseline — the product labels it that way too. Cohort comparisons share a time window but
            not a project mix, so we do not claim causality. And the methodology’s own A/B experiment
            says two wins are not yet conclusive. We publish the limits with the numbers — that is the
            product.
          </p>
        </Card>
      </Reveal>
    </SectionShell>
  );
}
