import { Panel, Reveal } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import { skills, type SkillCat } from '../data/skills';
import { Section } from './Section';

const order: SkillCat[] = ['backend', 'frontend', 'ai', 'data', 'compliance', 'mobile'];

export function Skills() {
  const { t } = useI18n();

  return (
    <Section id="skills" kicker={t.skills.kicker} title={t.skills.title} tone="sunken">
      <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
        {order.map((cat, ci) => {
          const items = skills.filter((s) => s.category === cat);
          return (
            <Reveal key={cat} delay={ci * 0.04}>
              <Panel heading={t.skills.categories[cat]}>
                <ul className="space-y-1.5">
                  {items.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-baseline justify-between gap-3 border-b border-border pb-1.5 last:border-0 last:pb-0"
                    >
                      <span
                        className={`text-dense ${
                          s.level === 3 ? 'font-emph text-text-strong' : 'text-text'
                        }`}
                      >
                        {s.name}
                      </span>
                      {/* K6: a verdict instead of a score */}
                      <span
                        className={`shrink-0 text-meta uppercase tracking-[0.08em] ${
                          s.level === 3 ? 'text-accent' : 'text-text-muted'
                        }`}
                        title={t.skills.levelsTip}
                      >
                        {t.skills.levels[s.level]}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
