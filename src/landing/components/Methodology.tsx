import { Badge, Card, Panel, Reveal, SectionShell } from '../ui';

/* SIL / SIDM — the method section. Chronology and claims sourced from the
   evidence dossiers; the honesty framing (DRAFT/N=0) is deliberate. */

const TIMELINE = [
  {
    date: '1995',
    title: 'The seed: SSADM convergence',
    body: 'Goodland & Slater’s three-view convergence: independent authors write separate views of a system, and the real defects are the ones visible only when the views are compared. Back then, a human review meeting did the comparing.',
  },
  {
    date: 'Apr 2026',
    title: 'SIL v1.1 — intent becomes a language',
    body: 'The Structured Intent Language: 11 typed primitives covering a change from business intent to deployment evidence. Design stops being prose an AI can quietly reinterpret — it becomes lintable, schema-validated artifacts with mandatory invariants.',
  },
  {
    date: 'May 2026',
    title: 'The decide-or-die pilot',
    body: 'Two delivery slices, pre-registered hypotheses, and a kill criterion the authors could not amend afterwards. The pilot was allowed to fail. It survived — on proxy evidence it reported honestly: six silent design bugs caught before implementation, roughly 18 person-days of avoided rework for 8–12 days of overhead.',
  },
  {
    date: 'May 2026',
    title: 'CW-DSM — the process discipline',
    body: 'Five structurally isolated design views (process, data, event, invariant, chaos), ten mechanical cross-checks, five isolated reviewer personas including a Skeptic. Then fourteen version steps in three days — every amendment traced to a named defect an earlier version missed.',
  },
  {
    date: 'Jun 2026',
    title: 'The split: SIL is the language, SIDM is the methodology',
    body: 'One name had been carrying both. SIL v1.3 is the notation — like SQL or TLA+. SIDM 3.0 is the process — like Scrum or the V-model: eight invariants, a 0→8 delivery spine, gates that are specified at design time and fire at assembly time.',
  },
  {
    date: 'Jun–Jul 2026',
    title: 'The living lab: an autonomous mobile-game factory',
    body: 'Rapid Android game development as a methodology forge: every game is a full 0→8 cycle producing telemetry, deviations and retro evidence. Real APKs on real emulators, adversarial verification during play, cross-device feedback — the framework literally lives and evolves on its own output. An A/B meta-experiment tests every proposed amendment; by its own rule, two wins out of two are still not conclusive.',
  },
];

const INVARIANT_SAMPLES = [
  { code: 'INV-1', text: '“Done” requires prospective evidence from the real path. Self-attestation is, by definition, not evidence.' },
  { code: 'INV-2', text: 'Expected outcomes are authored by an isolated test designer, masked from the code. Generation and grading never share a context.' },
  { code: 'INV-5', text: 'The ordered scope is the denominator. If the delivered sum stops matching it, the work blocks and stops.' },
  { code: 'INV-6', text: 'A detector counts only after a closed loop proves it actually fires on the defect it claims to catch.' },
];

export function Methodology() {
  return (
    <SectionShell
      id="method"
      kicker="SIL · SIDM — the method"
      title="A methodology that is allowed to fail — and says so."
      lead="The products enforce a way of working. That way of working was not invented in a slide deck: it evolved from a 1995 systems-analysis idea into a machine-checked language and an evidence-gated delivery process, version by version, each step triggered by a named, documented failure."
      tone="sunken"
    >
      <div className="grid grid-cols-[1.25fr_1fr] gap-8 max-md:grid-cols-1">
        <ol className="relative space-y-8 border-l border-border pl-6">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05}>
              <li className="relative">
                <span className="absolute -left-[31px] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent" />
                <p className="num text-meta font-emph uppercase tracking-[0.1em] text-accent">{t.date}</p>
                <h3 className="mt-1 text-title font-emph text-text-strong">{t.title}</h3>
                <p className="mt-1.5 text-dense leading-relaxed text-text-muted">{t.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="space-y-4">
          <Reveal>
            <Panel heading="Four of the eight invariants" aside={<Badge tone="accent" title="Structured Intent Design Methodology 3.0 — the process layer built on the SIL language.">SIDM 3.0</Badge>}>
              <ul className="space-y-3">
                {INVARIANT_SAMPLES.map((s) => (
                  <li key={s.code} className="flex gap-3">
                    <span className="num mt-0.5 shrink-0 font-mono text-meta font-emph text-accent">{s.code}</span>
                    <p className="text-dense leading-relaxed text-text">{s.text}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={0.08}>
            <Card className="p-5">
              <p className="text-meta font-emph uppercase tracking-[0.1em] text-text-muted">The proof it applies to itself</p>
              <ul className="mt-3 space-y-2.5 text-dense leading-relaxed text-text-muted">
                <li className="flex gap-2"><span className="shrink-0 font-emph text-accent">→</span>Its authors failed their own cross-propagation rule three times in a row while writing it — the three-strike rule stopped them, exactly as designed.</li>
                <li className="flex gap-2"><span className="shrink-0 font-emph text-accent">→</span>A mandatory formal-verification layer caught zero bugs over two slices — so it was retired, on the record.</li>
                <li className="flex gap-2"><span className="shrink-0 font-emph text-accent">→</span>Two headline numbers were withdrawn because the framework’s own adversarial layer could not defend them.</li>
                <li className="flex gap-2"><span className="shrink-0 font-emph text-accent">→</span>Its self-assigned status is still “draft, converging” — a methodology this honest about itself will not lie about your delivery either.</li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
