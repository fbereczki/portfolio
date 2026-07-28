import { ArrowRight, ShieldCheck, Cpu, Database, FileSignature } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

const PIPELINE_ICONS = [Database, FileSignature, Cpu, ShieldCheck];

export function CodeWitnessSpotlight() {
  const { t } = useI18n();
  const cw = t.cwSpotlight;

  return (
    <Section id="codewitness-spotlight" kicker={cw.kicker} title="CodeWitness">
      {/* Key-evidence banner — oxblood stamp colour = key evidence */}
      <div className="rule-double" />
      <div className="flex items-center bg-oxblood py-3 text-paper">
        <span className="px-4 font-mono text-[11px] uppercase tracking-[0.28em]">
          {cw.banner}
        </span>
      </div>
      <div className="rule-double" />

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="accent-italic display-serif text-[26px] leading-tight sm:text-[32px]">
            {cw.tagline}
          </p>
          <p className="prose-just mt-5 max-w-2xl font-serif text-[17px] leading-[1.7] text-ink-soft">
            {cw.lead}
          </p>
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <div className="paper-card p-5">
            <div className="label-mono mb-2 text-oxblood">— {cw.ledger.title}</div>
            <dl className="space-y-1.5 font-serif text-[14px] text-ink-soft">
              {cw.ledger.rows.map((row) => (
                <div key={row.k} className="flex justify-between">
                  <dt>{row.k}</dt>
                  <dd className="font-mono text-[12px]">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-14">
        <div className="label-mono mb-5 text-oxblood">— {cw.pipelineTitle}</div>
        <div className="grid gap-0 md:grid-cols-4">
          {cw.pipeline.map((p, i) => {
            const Icon = PIPELINE_ICONS[i] || Database;
            return (
              <div
                key={p.step}
                className={`relative paper-card p-5 ${i > 0 ? 'md:-ml-px' : ''}`}
              >
                <div className="flex items-center gap-2 text-oxblood">
                  <Icon size={18} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                    step {i + 1}/4
                  </span>
                </div>
                <div className="mt-2 display-serif text-[20px] text-ink">{p.step}</div>
                <p className="mt-2 font-serif text-[14px] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
                {i < 3 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <ArrowRight size={14} className="text-oxblood" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Maturity table */}
      <div className="mt-14">
        <div className="label-mono mb-5 text-oxblood">— {cw.maturityTitle}</div>
        <div className="paper-card overflow-hidden">
          <table className="w-full text-left font-serif text-[14px]">
            <thead className="bg-paper-deep/60 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <tr>
                <th className="px-5 py-3">{cw.maturityHead.level}</th>
                <th className="px-5 py-3">{cw.maturityHead.tag}</th>
                <th className="px-5 py-3">{cw.maturityHead.value}</th>
                <th className="px-5 py-3">{cw.maturityHead.risk}</th>
              </tr>
            </thead>
            <tbody>
              {cw.maturityLevels.map((m, i) => {
                const isCritical =
                  ['critical', 'kritikus'].includes((m.risk as string).toLowerCase()) ||
                  i === 1 ||
                  i === 4;
                const isStandard = i === 3;
                return (
                  <tr
                    key={m.level}
                    className={`border-t border-paper-rule ${isStandard ? 'bg-oxblood/[0.07]' : ''}`}
                  >
                    <td className="px-5 py-3 font-semibold text-ink">{m.level}</td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          isCritical
                            ? 'pill-oxblood'
                            : isStandard
                            ? 'pill-sage'
                            : 'pill-ink'
                        }
                      >
                        {m.tag}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ink-soft">{m.value}</td>
                    <td
                      className={`px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] ${
                        isCritical ? 'text-oxblood' : 'text-sage'
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
      </div>

      {/* Proofs */}
      <div className="mt-14">
        <div className="label-mono mb-5 text-oxblood">— {cw.proofTitle}</div>
        <div className="grid gap-5 lg:grid-cols-3">
          {cw.proofs.map((p) => (
            <div key={p.who} className="paper-card p-6">
              <div className="label-mono mb-3 text-oxblood">— {p.who}</div>
              <p className="font-serif text-[14.5px] leading-relaxed text-ink">{p.proof}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="mt-14">
        <div className="label-mono mb-5 text-oxblood">— {cw.tiersTitle}</div>
        <div className="grid gap-5 md:grid-cols-3">
          {cw.tiers.map((tier, i) => {
            // K3: no semaphore colours as decoration — highlighted tier gets ink, rest paper-rule.
            const accentBorder = i === 1 ? 'border-ink' : 'border-paper-rule';
            return (
              <div key={tier.name} className={`paper-card p-6 border-2 ${accentBorder}`}>
                <div className="display-serif text-[28px] text-ink">{tier.name}</div>
                <p className="mt-2 font-serif text-[14px] leading-relaxed text-ink-soft">
                  {tier.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-10 text-center font-serif italic text-ink-mute">{cw.cta}</p>
    </Section>
  );
}
