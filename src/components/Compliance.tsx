import { ExternalLink, Gavel, ShieldCheck } from 'lucide-react';
import { Card, Reveal } from '../landing/ui';
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
      tone="sunken"
    >
      <div className="grid grid-cols-12 gap-4">
        <Reveal className="col-span-7 max-lg:col-span-12">
          <Card className="h-full p-6 max-md:p-4">
            <ShieldCheck size={22} className="text-accent" aria-hidden />
            <h3 className="mt-3 text-title font-emph leading-tight text-text-strong">
              {t.compliance.cwTitle}
            </h3>
            <p className="mt-3 border-t border-border pt-3 text-dense leading-relaxed text-text">
              {t.compliance.cwBody}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 max-sm:grid-cols-1">
              <Stat label="HMAC chain" value="SHA-256" tip={t.compliance.statTips.hmac} />
              <Stat label="Sign" value="Ed25519" tip={t.compliance.statTips.sign} />
              <Stat label="KDF" value="Argon2id" tip={t.compliance.statTips.kdf} />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.08} className="col-span-5 max-lg:col-span-12">
          <Card className="h-full p-6 max-md:p-4">
            <div className="flex items-center gap-2 text-accent">
              <Gavel size={14} aria-hidden />
              <span className="text-meta font-emph uppercase tracking-[0.14em]">
                {t.compliance.legalLinkLabel}
              </span>
            </div>
            <h3 className="mt-3 text-title font-emph leading-tight text-text-strong">
              {t.compliance.legalTitle}
            </h3>
            <p className="mt-3 border-t border-border pt-3 text-dense leading-relaxed text-text">
              {t.compliance.legalBody}
            </p>
            <a
              href={LEGAL_LINK}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-1.5 text-dense font-emph text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
            >
              {t.compliance.visit}
              <ExternalLink size={12} />
            </a>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function Stat({ label, value, tip }: { label: string; value: string; tip: string }) {
  return (
    <div className="rounded border border-border bg-surface-2 p-3" title={tip}>
      <div className="text-meta uppercase tracking-[0.14em] text-text-muted">{label}</div>
      <div className="num mt-1 font-mono text-dense font-strong text-text-strong">{value}</div>
    </div>
  );
}
