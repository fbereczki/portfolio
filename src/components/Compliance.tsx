import { ExternalLink, Gavel, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

const LEGAL_LINK = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj';

export function Compliance() {
  const { t, lang } = useI18n();
  const isPlaceholderLink = LEGAL_LINK.includes('eur-lex.europa.eu');

  return (
    <Section
      id="compliance"
      kicker={t.compliance.kicker}
      title={t.compliance.title}
      lead={t.compliance.lead}
      number="07"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <article className="paper-card border-2 border-sage p-8">
          <ShieldCheck size={28} className="mb-4 text-sage" />
          <h3 className="display-serif text-[28px] leading-tight text-ink">
            {t.compliance.cwTitle}
          </h3>
          <div className="rule-thin my-4" />
          <p className="prose-just font-serif text-[15.5px] leading-relaxed text-ink-soft">
            {t.compliance.cwBody}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="HMAC chain" value="SHA-256" />
            <Stat label="Sign" value="Ed25519" />
            <Stat label="KDF" value="Argon2id" />
          </div>
        </article>

        <article className="paper-card p-8">
          <div className="mb-3 flex items-center gap-2 text-amber">
            <Gavel size={14} />
            <span className="label-mono-ink">— {t.compliance.legalLinkLabel}</span>
          </div>
          <p className="font-serif text-[14.5px] italic leading-relaxed text-ink-soft">
            {t.compliance.legalLinkPlaceholder}
          </p>
          <div className="mt-4 border border-paper-rule bg-paper-deep/30 p-4 font-mono text-[12px] leading-relaxed">
            <div className="mb-1 text-ink-faint">// portfolio/src/components/Compliance.tsx</div>
            <div className="text-ink-soft">
              const LEGAL_LINK = <span className="text-sage">"{LEGAL_LINK}"</span>;
            </div>
          </div>
          <a
            href={LEGAL_LINK}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood hover:underline"
          >
            {t.compliance.visit} {isPlaceholderLink ? '(EU AI Act — placeholder)' : ''}
            <ExternalLink size={12} />
          </a>
          <p className="mt-3 font-serif text-[13px] italic text-ink-mute">
            {lang === 'hu'
              ? 'Csere: küldd el a pontos URL-t (sajátos szektor-rendelet vagy nemzeti átültetés), és beillesztem a fenti konstansba.'
              : 'Swap: send me the exact URL (sector-specific rule or national transposition) and I will paste it into the constant above.'}
          </p>
        </article>
      </div>
    </Section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-paper-rule bg-paper-deep/30 p-3">
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute">{label}</div>
      <div className="mt-1 font-mono text-[14px] font-bold text-sage">{value}</div>
    </div>
  );
}
