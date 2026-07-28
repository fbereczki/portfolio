import { Anchor, FileCheck2, GitBranch, ShieldQuestion } from 'lucide-react';
import { Card, Reveal, SectionShell } from '../ui';

const PILLARS = [
  {
    icon: Anchor,
    title: 'Goals cannot drift silently',
    body: 'The ordered scope is enumerated up front and machine-reconciled at every planning gate. If the delivered decomposition stops adding up to the mandate, the work blocks and stops — scope cannot quietly shrink to what was convenient.',
  },
  {
    icon: FileCheck2,
    title: '“Done” is never self-attested',
    body: 'A claim of completion counts only with prospective evidence from the real path — real binaries, real data, real browser. Reasoning that something “should work” is not evidence, and a later contradiction automatically reopens the work.',
  },
  {
    icon: ShieldQuestion,
    title: 'The judge never sees the code',
    body: 'Expected outcomes are written by an isolated test designer working only from the stated intent — masked from the design, the implementation and the implementer. Whoever builds the system cannot also grade it.',
  },
  {
    icon: GitBranch,
    title: 'The framework audits itself — and publishes the failures',
    body: 'The methodology applies its own gates to its own changes. Practices that measurably caught nothing were retired; headline numbers its adversarial layer could not defend were withdrawn. Its own status label is honest: still converging.',
  },
];

export function Vision() {
  return (
    <SectionShell
      id="vision"
      kicker="The thesis"
      title="Supervised beats unsupervised — provably."
      lead="Autonomous AI writes impressive code and unverifiable claims with equal fluency. The difference between a demo and an asset is a framework in which a human can supervise, coordinate and prove what actually happened. Four rules make that enforceable:"
      tone="sunken"
    >
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {PILLARS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <Card className="flex h-full gap-4 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-3 text-accent">
                <p.icon size={18} strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="text-title font-emph text-text-strong">{p.title}</h3>
                <p className="mt-2 text-dense leading-relaxed text-text-muted">{p.body}</p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
