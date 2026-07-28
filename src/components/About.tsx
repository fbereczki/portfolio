import { Panel, Reveal } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { Section } from './Section';

export function About() {
  const { t, lang } = useI18n();

  return (
    <Section id="about" kicker={t.about.kicker} title={t.about.title}>
      <div className="grid grid-cols-12 gap-8 max-lg:gap-6">
        {/* Main narrative column */}
        <Reveal className="col-span-8 max-lg:col-span-12">
          {profile.bio[lang].split(/\n{2,}/).map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'text-lead leading-relaxed text-text-strong'
                  : 'mt-4 max-w-[680px] text-body leading-relaxed text-text'
              }
            >
              {para}
            </p>
          ))}
          <p className="mt-8 text-meta uppercase tracking-[0.22em] text-text-faint">
            — {profile.name}, {profile.location[lang]}
          </p>
        </Reveal>

        {/* Sidebar — current role + focus */}
        <Reveal delay={0.08} className="col-span-4 max-lg:col-span-12">
          <div className="space-y-4">
            <Panel heading={t.about.currentRole}>
              <div className="text-body font-emph text-text-strong">{profile.currentRole[lang]}</div>
              <div className="mt-1 text-dense text-text-muted">{profile.location[lang]}</div>
            </Panel>
            <Panel heading={t.about.focus}>
              <ul className="space-y-2.5">
                {t.about.focusItems.map((item, i) => (
                  <li key={item} className="flex gap-3 text-dense leading-relaxed text-text">
                    <span className="num shrink-0 text-meta font-emph text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
