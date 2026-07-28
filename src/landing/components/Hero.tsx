import { Reveal, VerdictStat } from '../ui';
import { Beam } from './Shell';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border bg-bg">
      <Beam />
      <div className="relative mx-auto max-w-[1120px] px-6 pb-16 pt-24 max-md:px-4 max-md:pt-16">
        <Reveal>
          <p className="text-meta font-emph uppercase tracking-[0.42em] text-text-muted">
            Governed AI software delivery
          </p>
          <h1 className="mt-4 max-w-[760px] text-display font-hero tracking-tight text-text-strong max-md:text-hero">
            AI is not omnipotent. <span className="text-accent-strong">Yet.</span>
          </h1>
          <p className="mt-5 max-w-[700px] text-lead leading-relaxed text-text">
            That is why it needs a framework. imwy.ai builds the layer that keeps AI-assisted
            engineering under expert human control: CodeWitness gives your AI the discipline of a
            senior engineer, Mimir gives you a memory that never resets and measures how you improve,
            Beacon turns the work into plans and reports humans can act on. So you can prove that
            software was built by following predetermined goals, tools and paths — not by chance.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 grid grid-cols-3 gap-4 max-md:grid-cols-1">
          <VerdictStat
            label="Peak weekly leverage"
            value="×156"
            verdict="computed from our own delivery ledger — measured, not claimed"
            hint="Lines added ÷ active hours ÷ 12.5 (calibrated solo baseline of 100 production-ready lines per 8h day). Closed calendar week of 2026-07-20."
          />
          <VerdictStat
            label="Show-stopper escapes"
            value="2 → 0"
            verdict="controlled experiment, frozen control vs. methodology — at 1.2× wall-time"
            tone="ok"
            hint="cw-v3 H0 experiment, 2026-05: the frozen control slice let 2 design show-stoppers reach live E2E; the treated slices let 0 escape."
          />
          <VerdictStat
            label="Review rounds to seal"
            value="5 → 1"
            verdict="the methodology compounds — each delivery slice needs fewer correction rounds"
            hint="Rounds of adversarial review needed before a delivery slice passed its strict seal, slice s2 through s11."
          />
        </Reveal>
      </div>
    </section>
  );
}
