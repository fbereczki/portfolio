import { useI18n } from '../i18n/I18nProvider';
import { skills, type SkillCat } from '../data/skills';
import { Section } from './Section';

const order: SkillCat[] = ['backend', 'frontend', 'ai', 'data', 'compliance', 'mobile'];

const accent: Record<SkillCat, string> = {
  backend: 'text-teal',
  frontend: 'text-sage',
  ai: 'text-oxblood',
  data: 'text-amber',
  compliance: 'text-oxblood',
  mobile: 'text-teal',
};

export function Skills() {
  const { t } = useI18n();

  return (
    <Section id="skills" kicker={t.skills.kicker} title={t.skills.title} number="03">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((cat) => {
          const items = skills.filter((s) => s.category === cat);
          return (
            <div key={cat} className="paper-card paper-card-hover p-6">
              <div className={`label-mono-ink mb-4 ${accent[cat]}`}>
                — {t.skills.categories[cat]}
              </div>
              <ul className="space-y-1.5">
                {items.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-baseline justify-between border-b border-paper-rule/60 pb-1.5 last:border-0 last:pb-0"
                  >
                    <span
                      className={`font-serif text-[15px] ${
                        s.level === 3 ? 'font-semibold text-ink' : 'text-ink-soft'
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="ml-3 flex items-center gap-0.5">
                      {[1, 2, 3].map((dot) => (
                        <span
                          key={dot}
                          className={`h-1.5 w-1.5 rounded-full ${
                            dot <= s.level ? 'bg-oxblood' : 'bg-paper-rule'
                          }`}
                        />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
