import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { Section } from './Section';

export function About() {
  const { t, lang } = useI18n();

  return (
    <Section id="about" kicker={t.about.kicker} title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-12">
        {/* Main editorial column */}
        <div className="lg:col-span-8">
          {profile.bio[lang]
            .split(/\n{2,}/)
            .map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'drop-cap prose-just font-serif text-[19px] leading-[1.8] text-ink sm:text-[20px]'
                    : 'prose-just mt-5 font-serif text-[18px] leading-[1.75] text-ink sm:text-[19px]'
                }
              >
                {para}
              </p>
            ))}

          <div className="mt-10 flex items-baseline gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
              — {profile.name}, {profile.location[lang]}
            </span>
            <span className="h-px flex-1 bg-paper-rule" />
          </div>
        </div>

        {/* Sidebar — Current role + Focus */}
        <aside className="lg:col-span-4">
          <div className="paper-card p-6">
            <div className="label-mono mb-2">{t.about.currentRole}</div>
            <div className="font-serif text-[18px] font-semibold leading-snug text-ink">
              {profile.currentRole[lang]}
            </div>
            <div className="mt-1 font-serif text-sm italic text-ink-mute">
              {profile.location[lang]}
            </div>
          </div>

          <div className="paper-card mt-5 p-6">
            <div className="label-mono mb-3">— {t.about.focus}</div>
            <ul className="space-y-2.5">
              {t.about.focusItems.map((item, i) => (
                <li key={item} className="flex gap-3 font-serif text-[15px] leading-relaxed text-ink-soft">
                  <span className="font-mono text-[11px] text-oxblood">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Section>
  );
}
