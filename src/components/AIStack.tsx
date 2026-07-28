import { Cpu, Database, FileSignature, Languages } from 'lucide-react';
import { Card, Reveal } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

export function AIStack() {
  const { t } = useI18n();
  // K3: one accent for all four domains — no semaphore colours as decoration.
  const items = [
    { icon: <Cpu size={16} />, key: 'mcp' as const, n: '01' },
    { icon: <Database size={16} />, key: 'rag' as const, n: '02' },
    { icon: <FileSignature size={16} />, key: 'attribution' as const, n: '03' },
    { icon: <Languages size={16} />, key: 'sil' as const, n: '04' },
  ];
  return (
    <Section id="ai" kicker={t.ai.kicker} title={t.ai.title} lead={t.ai.lead}>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {items.map((it, i) => {
          const block = t.ai.blocks[it.key];
          return (
            <Reveal key={it.key} delay={i * 0.05}>
              <Card className="h-full p-6 max-md:p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2 text-accent">
                    {it.icon}
                    <span className="num text-meta font-emph uppercase tracking-[0.14em]">
                      Stack · {it.n}
                    </span>
                  </div>
                  <span className="text-meta uppercase tracking-[0.14em] text-text-faint">
                    {it.key}
                  </span>
                </div>
                <h3 className="mt-4 text-title font-emph leading-tight text-text-strong">
                  {block.title}
                </h3>
                <p className="mt-3 border-t border-border pt-3 text-dense leading-relaxed text-text">
                  {block.body}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
