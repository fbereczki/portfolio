import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { Section } from './Section';

export function Experience() {
  const { t, lang } = useI18n();

  return (
    <Section
      id="experience"
      kicker={t.experience.kicker}
      title={t.experience.title}
      lead={t.experience.lead}
      number="02"
    >
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Editorial timeline */}
        <ol className="space-y-10">
          {profile.experience.map((exp, idx) => {
            const co = typeof exp.company === 'string' ? exp.company : exp.company[lang];
            const isCurrent = idx === 0;
            return (
              <li key={idx} className="relative">
                <div className="grid grid-cols-12 gap-4">
                  {/* date column */}
                  <div className="col-span-12 sm:col-span-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
                      {exp.period[lang]}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      {('duration' in exp && (exp as { duration?: { hu: string; en: string } }).duration?.[lang]) || ''}
                    </div>
                    {isCurrent && (
                      <div className="mt-2">
                        <span className="stamp">{t.experience.now}</span>
                      </div>
                    )}
                  </div>

                  {/* body */}
                  <div className="col-span-12 sm:col-span-9">
                    <div className="rule-thin mb-4" />
                    <h3 className="display-serif text-[22px] leading-tight text-ink sm:text-[26px]">
                      {exp.role[lang]}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="accent-italic text-[16px]">{co}</span>
                      {'employmentType' in exp && (exp as { employmentType?: { hu: string; en: string } }).employmentType && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                          ·{' '}
                          {(exp as { employmentType: { hu: string; en: string } }).employmentType[lang]}
                        </span>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {exp.bullets[lang].map((b) => (
                        <li
                          key={b}
                          className="flex gap-3 font-serif text-[15px] leading-relaxed text-ink-soft"
                        >
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Sidebar — achievements + education + skills */}
        <aside className="space-y-7">
          <div className="paper-card p-6">
            <div className="label-mono mb-4 text-oxblood">— {t.experience.achievementsTitle}</div>
            <ul className="space-y-3">
              {profile.achievements.map((a) => (
                <li key={a.title.hu} className="border-b border-paper-rule pb-3 last:border-0 last:pb-0">
                  <div className="font-serif text-[15px] font-semibold text-ink">{a.title[lang]}</div>
                  <div className="mt-0.5 font-serif text-[13px] italic text-ink-mute">
                    {a.detail[lang]}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="paper-card p-6">
            <div className="label-mono mb-4 text-oxblood">— {t.experience.eduTitle}</div>
            <ul className="space-y-3">
              {profile.education.map((e) => (
                <li key={e.year} className="border-b border-paper-rule pb-3 last:border-0 last:pb-0">
                  <div className="font-serif text-[15px] font-semibold text-ink">{e.title[lang]}</div>
                  <div className="mt-0.5 flex items-baseline justify-between font-serif text-[13px] italic text-ink-mute">
                    <span>{e.school}</span>
                    <span className="font-mono text-[11px] not-italic text-ink-faint">{e.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="paper-card p-6">
            <div className="label-mono mb-4 text-oxblood">— {t.experience.extraTitle}</div>
            <div className="space-y-4">
              {(['industry', 'interpersonal', 'standards'] as const).map((groupKey) => {
                const items = profile.skills[groupKey];
                const heading = {
                  industry: { hu: 'Szakterület', en: 'Industry' },
                  interpersonal: { hu: 'Soft skill', en: 'Interpersonal' },
                  standards: { hu: 'Szabványok / képesítések', en: 'Standards & credentials' },
                }[groupKey];
                return (
                  <div key={groupKey}>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                      {heading[lang]}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span
                          key={s.en}
                          className="inline-flex items-baseline gap-1.5 border border-ink/30 bg-paper-deep/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink"
                        >
                          {s[lang]}
                          {s.n > 0 && (
                            <span className="font-mono text-[9px] text-oxblood">·{s.n}</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}
