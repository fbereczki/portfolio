import { ArrowRight, ArrowUpRight, ShieldCheck, Cpu, Database, FileSignature } from 'lucide-react';
import { Badge, Card, Panel, Reveal } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import { Section, SubHead } from './Section';

const PIPELINE_ICONS = [Database, FileSignature, Cpu, ShieldCheck];

/* Risk semaphore for the maturity table (K3: colour == verdict). Keyed by the
   rendered label so the table stays correct in either language. */
const RISK_TONE: Record<string, 'ok' | 'warn' | 'bad'> = {
  low: 'ok',
  alacsony: 'ok',
  medium: 'warn',
  közepes: 'warn',
  high: 'bad',
  magas: 'bad',
  critical: 'bad',
  kritikus: 'bad',
};

export function CodeWitnessSpotlight() {
  const { t } = useI18n();
  const cw = t.cwSpotlight;

  return (
    <Section id="codewitness-spotlight" kicker={cw.kicker} title="CodeWitness">
      {/* Key-evidence banner — accent carries the "this is the one" meaning */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-accent-line bg-accent-quiet px-4 py-3">
          <span className="text-meta font-emph uppercase tracking-[0.28em] text-accent">
            {cw.banner}
          </span>
          <a
            href="https://imwy.ai/#codewitness"
            className="inline-flex items-center gap-1.5 text-dense font-emph text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
            title="CodeWitness is a product of the imwy.ai platform — the full product story lives there"
          >
            Read the full product story on imwy.ai
            <ArrowUpRight size={13} />
          </a>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-12 gap-8 max-lg:gap-6">
        <Reveal className="col-span-8 max-lg:col-span-12">
          <p className="text-hero font-hero leading-tight tracking-tight text-accent-strong">
            {cw.tagline}
          </p>
          <p className="mt-4 max-w-[640px] text-body leading-relaxed text-text">{cw.lead}</p>
        </Reveal>
        <Reveal delay={0.08} className="col-span-4 max-lg:hidden">
          <Panel heading={cw.ledger.title}>
            <dl className="space-y-2">
              {cw.ledger.rows.map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-3">
                  <dt className="text-meta uppercase tracking-[0.08em] text-text-muted">{row.k}</dt>
                  <dd className="text-dense font-emph text-text-strong">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>
      </div>

      {/* Pipeline */}
      <SubHead>{cw.pipelineTitle}</SubHead>
      <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        {cw.pipeline.map((p, i) => {
          const Icon = PIPELINE_ICONS[i] || Database;
          return (
            <Reveal key={p.step} delay={i * 0.06} className="relative">
              <Card className="h-full p-4">
                <div className="flex items-center justify-between gap-2 text-accent">
                  <Icon size={16} />
                  <span className="num text-meta text-text-faint">step {i + 1}/4</span>
                </div>
                <div className="mt-3 text-title font-emph text-text-strong">{p.step}</div>
                <p className="mt-2 text-dense leading-relaxed text-text">{p.body}</p>
              </Card>
              {i < 3 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-accent lg:block">
                  <ArrowRight size={14} />
                </div>
              )}
            </Reveal>
          );
        })}
      </div>

      {/* Maturity table */}
      <SubHead>{cw.maturityTitle}</SubHead>
      <Reveal>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-surface-2 text-meta font-emph uppercase tracking-[0.1em] text-text-muted">
                  <th className="px-4 py-3 font-emph">{cw.maturityHead.level}</th>
                  <th className="px-4 py-3 font-emph">{cw.maturityHead.tag}</th>
                  <th className="px-4 py-3 font-emph">{cw.maturityHead.value}</th>
                  <th className="px-4 py-3 font-emph">{cw.maturityHead.risk}</th>
                </tr>
              </thead>
              <tbody>
                {cw.maturityLevels.map((m) => {
                  const tone = RISK_TONE[m.risk.toLowerCase()] ?? 'warn';
                  const isGolden = m.mark === 'golden';
                  const isStandard = m.mark === 'standard';
                  return (
                    <tr
                      key={m.level}
                      className={`border-t border-border ${
                        isGolden ? 'bg-accent-quiet' : isStandard ? 'bg-surface-2' : ''
                      }`}
                    >
                      <td className="px-4 py-3 align-top text-dense font-emph text-text-strong">
                        {m.level}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <Badge
                          tone={isGolden ? 'accent' : tone === 'bad' ? 'bad' : 'neutral'}
                          title={
                            isGolden
                              ? 'The profile CodeWitness exists to move engineers into'
                              : isStandard
                                ? 'Where good teams are today — and where the bottleneck appears'
                                : undefined
                          }
                        >
                          {m.tag}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 align-top text-dense leading-snug text-text">
                        {m.value}
                      </td>
                      {/* K3: the risk column is a semaphore — tone always matches the verdict */}
                      <td
                        title={m.riskWhy}
                        className={`px-4 py-3 align-top text-meta font-emph uppercase tracking-[0.1em] ${
                          tone === 'ok' ? 'text-ok' : tone === 'warn' ? 'text-warn' : 'text-bad'
                        }`}
                      >
                        {m.risk}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* K6 — the table's verdict line */}
          <div className="border-t border-border px-4 py-3.5">
            <p className="max-w-4xl text-dense leading-relaxed text-text">
              <span className="font-emph text-accent">{cw.maturityVerdict.slice(0, 1)}</span>
              {cw.maturityVerdict.slice(1)}
            </p>
          </div>
        </Card>
      </Reveal>

      {/* Proofs */}
      <SubHead>{cw.proofTitle}</SubHead>
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
        {cw.proofs.map((p, i) => (
          <Reveal key={p.who} delay={i * 0.06}>
            <Panel heading={p.who}>
              <p className="text-dense leading-relaxed text-text">{p.proof}</p>
            </Panel>
          </Reveal>
        ))}
      </div>

      {/* Tiers */}
      <SubHead>{cw.tiersTitle}</SubHead>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
        {cw.tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.06}>
            <Card className={`h-full p-4 ${i === 1 ? 'border-accent-line' : ''}`}>
              <div className="text-title font-emph text-text-strong">{tier.name}</div>
              <p className="mt-2 text-dense leading-relaxed text-text">{tier.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-dense text-text-muted">{cw.cta}</p>
    </Section>
  );
}
