import { ExternalLink, Gavel, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

const LEGAL_LINK = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';

export function Compliance() {
  const { t } = useI18n();

  return (
    <Section
      id="compliance"
      kicker={t.compliance.kicker}
      title={t.compliance.title}
      lead={t.compliance.lead}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="paper-card border-2 border-paper-rule p-8">
          <ShieldCheck size={28} className="mb-4 text-ink" />
          <h3 className="display-serif text-[28px] leading-tight text-ink">
            {t.compliance.cwTitle}
          </h3>
          <div className="rule-thin my-4" />
          <p className="prose-just font-serif text-[15.5px] leading-relaxed text-ink-soft">
            {t.compliance.cwBody}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="HMAC chain" value="SHA-256" tip={t.compliance.statTips.hmac} />
            <Stat label="Sign" value="Ed25519" tip={t.compliance.statTips.sign} />
            <Stat label="KDF" value="Argon2id" tip={t.compliance.statTips.kdf} />
          </div>
        </article>

        <article className="paper-card p-8">
          <div className="mb-3 flex items-center gap-2 text-oxblood">
            <Gavel size={14} />
            <span className="label-mono-ink">— {t.compliance.legalLinkLabel}</span>
          </div>
          <h3 className="display-serif text-[22px] leading-tight text-ink">
            {t.compliance.legalTitle}
          </h3>
          <div className="rule-thin my-4" />
          <p className="prose-just font-serif text-[14.5px] leading-relaxed text-ink-soft">
            {t.compliance.legalBody}
          </p>
          <a
            href={LEGAL_LINK}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood hover:underline"
          >
            {t.compliance.visit}
            <ExternalLink size={12} />
          </a>
        </article>
      </div>
    </Section>
  );
}

function Stat({ label, value, tip }: { label: string; value: string; tip: string }) {
  return (
    <div className="border border-paper-rule bg-paper-deep/30 p-3" title={tip}>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute">{label}</div>
      <div className="mt-1 font-mono text-[14px] font-bold text-ink">{value}</div>
    </div>
  );
}
