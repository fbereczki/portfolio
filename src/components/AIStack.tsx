import { Cpu, Database, FileSignature, Languages } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

export function AIStack() {
  const { t } = useI18n();
  const items = [
    { icon: <Cpu size={18} />, key: 'mcp' as const, accent: 'text-oxblood', n: '01' },
    { icon: <Database size={18} />, key: 'rag' as const, accent: 'text-teal', n: '02' },
    { icon: <FileSignature size={18} />, key: 'attribution' as const, accent: 'text-sage', n: '03' },
    { icon: <Languages size={18} />, key: 'sil' as const, accent: 'text-amber', n: '04' },
  ];
  return (
    <Section id="ai" kicker={t.ai.kicker} title={t.ai.title} lead={t.ai.lead} number="04">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((it) => {
          const block = t.ai.blocks[it.key];
          return (
            <article key={it.key} className="paper-card paper-card-hover p-7">
              <div className="flex items-baseline justify-between">
                <div className={`flex items-center gap-2 ${it.accent}`}>
                  {it.icon}
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    Stack · {it.n}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                  {it.key}
                </span>
              </div>
              <h3 className="display-serif mt-4 text-[24px] leading-tight text-ink">
                {block.title}
              </h3>
              <div className="rule-thin my-4" />
              <p className="prose-just font-serif text-[15px] leading-relaxed text-ink-soft">{block.body}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
