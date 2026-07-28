import { Car, Fingerprint, GitPullRequestArrow, Link2, ShieldCheck, Smartphone, Workflow } from 'lucide-react';
import { Badge, Card, Panel, Reveal, SectionShell } from '../ui';

/* Flagship product. Module taxonomy is closed at code level: web (base),
   automotive (licensed), mobile (honest placeholder). Demo numbers are real
   figures from the reference tenant — labeled as demo data, never invented. */

const MODULES = [
  {
    icon: Fingerprint,
    eyebrow: 'WEB PLATFORM',
    pill: { label: 'Included', tone: 'accent' as const, hint: 'The base module — active in every account, cannot be cancelled.' },
    body: 'Witnessed agent activity, human oversight gates, compliance evidence and full traceability — in every account. Requirements import (Word · Excel · ReqIF · PDF), EARS decomposition, V-model trace graph, line-by-line certified human review, code provenance down to who — human or AI — wrote each line.',
    verdict: '→ The base module. Active in every account, on every plan.',
    facts: ['Agent board + human gates (EU AI Act Art. 14)', 'Capture from Claude Code, Cursor, Aider, Copilot, git hooks', 'Go · Python · TS · Rust · C/C++ · Java · Kotlin · Swift · C# repos'],
  },
  {
    icon: Car,
    eyebrow: 'AUTOMOTIVE',
    pill: { label: 'Licensed module', tone: 'accent' as const, hint: 'Activated per account. An expired licence restricts access but never deletes data.' },
    body: 'ISO/SAE 21434 cybersecurity engineering on the same evidence chain: item definition, HARA, TARA, risk treatment and V&V that pentests a simulated ECU compiled from the sealed security concept.',
    verdict: '→ Every pentest also runs with the control ablated — a test that passes without its control is reported as tautology, not green.',
    facts: [
      'HARA: severity × exposure × controllability → ASIL QM…D, derived deterministically — never AI-guessed',
      'TARA: STRIDE threats, attack graphs with EVITA feasibility ordinals',
      'Typed interface register: CAN · CAN-FD · LIN · FlexRay · Ethernet',
      'Real silicon catalogue: AURIX TC397, NXP S32K344, TJA1153',
    ],
  },
  {
    icon: Smartphone,
    eyebrow: 'MOBILE',
    pill: { label: 'Coming soon', tone: 'neutral' as const, hint: 'Ships no surfaces yet — listed so the module catalogue stays honest.' },
    body: 'Planned module for mobile-specific delivery surfaces. It ships no surfaces yet — it is listed here so the module catalogue stays honest. Mobile codebases (Kotlin, Swift) are already captured and audited today by the web platform.',
    verdict: '→ Not yet available. We list it so licensing stays honest — never vapor-sold.',
    facts: [],
  },
];

const CAPABILITIES = [
  {
    icon: ShieldCheck,
    title: 'Tamper-evident ledger',
    body: 'Every AI action lands on a per-tenant HMAC-SHA256 hash chain. Database triggers forbid mutation; a /verify endpoint re-chains from canonical bytes on demand.',
  },
  {
    icon: Workflow,
    title: 'BEAM enforcement',
    body: 'Six enforcement layers keep the AI inside the workflow: state-machine gates, mandatory checks, no skip paths — fail closed, default deny.',
  },
  {
    icon: GitPullRequestArrow,
    title: 'Review that cannot self-certify',
    body: 'A single AI self-review is not acceptable by rule: minimum three independent reviewer roles, and human sign-off wherever a policy demands it.',
  },
  {
    icon: Link2,
    title: 'Fleet capture, 1:1',
    body: 'Verbatim record of the conductor and every concurrent agent — gap-free sequence numbers per span, so a dropped event is detectable, not deniable.',
  },
];

/* Cockpit mock — real figures from the reference tenant, presented as demo data. */
function CockpitDemo() {
  const rows = [
    { stage: 'Safety & Security', metric: 'TARA: 130 threats', state: '14 high-risk open', tone: 'warn' as const, hint: '14 threat scenarios at risk level 4–5 still await a treatment decision — flagged until a human decides.' },
    { stage: 'Safety & Security', metric: 'HARA: ASIL D derived', state: '1 goal open', tone: 'warn' as const, hint: 'ASIL is derived deterministically from severity × exposure × controllability — never AI-guessed. One safety goal awaits bilateral acceptance.' },
    { stage: 'Design', metric: 'Item definition: 45 elements', state: '7 interfaces typed', tone: 'ok' as const, hint: 'Every external interface carries a typed protocol, direction and trust-boundary flag in the interface register.' },
    { stage: 'Governance', metric: 'Traceability: 230 links', state: 'no suspect links', tone: 'ok' as const, hint: 'Bidirectional V-model trace: a changed requirement marks its links suspect until re-reviewed. None are suspect right now.' },
    { stage: 'Governance', metric: 'Witness chain: 200 entries', state: 'intact · verified', tone: 'ok' as const, hint: 'The HMAC hash chain re-verified from canonical bytes — any tampering would break it at a detectable point.' },
  ];
  return (
    <Panel
      heading="Cockpit — stage verdicts"
      aside={<Badge tone="ok" title="The HMAC evidence chain of this demo tenant verifies end-to-end.">chain intact</Badge>}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-dense">
          <thead>
            <tr>
              <th className="whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-left text-meta font-emph uppercase tracking-[0.04em] text-text-muted max-md:hidden">Stage</th>
              <th className="whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-left text-meta font-emph uppercase tracking-[0.04em] text-text-muted">Signal</th>
              <th className="whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-left text-meta font-emph uppercase tracking-[0.04em] text-text-muted">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric} className="border-b border-border transition-colors last:border-0 hover:bg-surface-2">
                <td className="whitespace-nowrap px-3 py-2 text-text-muted max-md:hidden">{r.stage}</td>
                <td className="num whitespace-nowrap px-3 py-2 text-text-strong">{r.metric}</td>
                <td className="whitespace-nowrap px-3 py-2">
                  <Badge tone={r.tone} title={r.hint}>{r.state}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 flex gap-2 text-dense leading-snug text-text">
        <span className="shrink-0 font-emph text-accent">→</span>
        Demo tenant, real product figures — and the platform under it is load-tested: ~1.6M concurrent requests across 12 tenant scopes, 0 cross-tenant leaks, 0 server errors.
      </p>
    </Panel>
  );
}

export function ProductCodeWitness() {
  return (
    <SectionShell
      id="codewitness"
      kicker="CodeWitness — the flagship"
      title="Engineering you can prove."
      lead="Senior engineering knowledge, delivered as a service to your AI. CodeWitness does not run the model — it surrounds it: gates, independent reviews, provenance and requirements trace force precise, verifiable work, and every artifact lands on an append-only, tamper-evident ledger. Integrity, not veracity: the record cannot be quietly rewritten."
    >
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {MODULES.map((m, i) => (
          <Reveal key={m.eyebrow} delay={i * 0.07}>
            <Card className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2.5">
                  <m.icon size={16} strokeWidth={1.6} className="text-accent" />
                  <span className="text-meta font-emph uppercase tracking-[0.12em] text-text-muted">{m.eyebrow}</span>
                </span>
                <Badge tone={m.pill.tone} title={m.pill.hint}>{m.pill.label}</Badge>
              </div>
              <p className="mt-4 text-dense leading-relaxed text-text">{m.body}</p>
              {m.facts.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {m.facts.map((f) => (
                    <li key={f} className="flex gap-2 text-dense text-text-muted">
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-auto border-t border-border pt-3 text-dense font-emph leading-snug text-text-strong first-line:text-accent">
                {m.verdict}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-[1.2fr_1fr] items-start gap-4 max-md:grid-cols-1">
        <Reveal>
          <CockpitDemo />
        </Reveal>
        <div className="grid gap-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <Card className="flex gap-4 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-accent">
                  <c.icon size={16} strokeWidth={1.6} />
                </span>
                <div>
                  <h4 className="text-body font-emph text-text-strong">{c.title}</h4>
                  <p className="mt-1 text-dense leading-relaxed text-text-muted">{c.body}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
