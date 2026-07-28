import { Fragment } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Badge, Card, Panel, Reveal } from '../landing/ui';
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
    >
      {/* Chain of custody — the career as an unbroken hand-over chain */}
      <Reveal>
        <ChainOfCustody
          title={t.experience.custody.title}
          note={t.experience.custody.note}
          stations={t.experience.custody.stations}
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-12 gap-8 max-lg:gap-6">
        {/* Timeline of roles */}
        <div className="col-span-8 space-y-4 max-lg:col-span-12">
          {profile.experience.map((exp, idx) => {
            const co = typeof exp.company === 'string' ? exp.company : exp.company[lang];
            const isCurrent = idx === 0;
            return (
              <Reveal key={`${co}-${exp.period.en}`} delay={idx * 0.05}>
                <Panel
                  heading={exp.role[lang]}
                  aside={
                    <Badge
                      tone={isCurrent ? 'accent' : 'neutral'}
                      title={`${exp.period[lang]} · ${exp.duration?.[lang] ?? ''}`.trim()}
                    >
                      {exp.period[lang]}
                    </Badge>
                  }
                >
                  <div className="text-dense text-text-muted">
                    <span className="font-emph text-accent">{co}</span>
                    {'employmentType' in exp && exp.employmentType && (
                      <span> · {exp.employmentType[lang]}</span>
                    )}
                    <span> · {exp.location}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {exp.bullets[lang].map((b) => (
                      <li key={b} className="flex gap-2.5 text-dense leading-relaxed text-text">
                        <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              </Reveal>
            );
          })}
        </div>

        {/* Sidebar — achievements + education + LinkedIn-endorsed skills */}
        <div className="col-span-4 space-y-4 max-lg:col-span-12">
          <Reveal>
            <Panel heading={t.experience.achievementsTitle}>
              <ul className="space-y-3">
                {profile.achievements.map((a) => (
                  <li key={a.title.en} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="text-dense font-emph text-text-strong">{a.title[lang]}</div>
                    <div className="mt-0.5 text-dense leading-snug text-text-muted">{a.detail[lang]}</div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={0.05}>
            <Panel heading={t.experience.eduTitle}>
              <ul className="space-y-3">
                {profile.education.map((e) => (
                  <li key={e.year} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <div className="text-dense font-emph text-text-strong">{e.title[lang]}</div>
                    <div className="mt-0.5 flex items-baseline justify-between gap-2 text-dense text-text-muted">
                      <span>{e.school}</span>
                      <span className="num shrink-0 text-meta text-text-faint">{e.year}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={0.1}>
            <Panel heading={t.experience.extraTitle}>
              <div className="space-y-4">
                {(['industry', 'interpersonal', 'standards'] as const).map((groupKey) => {
                  const items = profile.skills[groupKey];
                  const heading = {
                    industry: 'Industry',
                    interpersonal: 'Interpersonal',
                    standards: 'Standards & credentials',
                  }[groupKey];
                  return (
                    <div key={groupKey}>
                      <div className="mb-2 text-meta font-emph uppercase tracking-[0.1em] text-text-faint">
                        {heading}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((s) => (
                          <span
                            key={s.en}
                            title={s.n > 0 ? `${s.n} LinkedIn endorsements` : undefined}
                            className="inline-flex items-baseline gap-1 rounded-[5px] border border-border px-2 py-0.5 text-meta text-text-muted"
                          >
                            {s[lang]}
                            {s.n > 0 && <span className="num text-accent">·{s.n}</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ── Chain of custody — 5 stations, animated dashed hand-over links ───────
   Horizontal from md up (System.tsx FLOWS recipe: dashed stroke, drifting
   dashoffset), vertical rail on mobile. */

type Station = { year: string; org: string; note: string };

function ChainOfCustody({
  title,
  note,
  stations,
}: {
  title: string;
  note: string;
  stations: ReadonlyArray<Station>;
}) {
  const reduce = useReducedMotion();

  return (
    <Card className="p-6 max-md:p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-meta font-emph uppercase tracking-[0.2em] text-accent" title={note}>
          {title}
        </p>
        <span className="text-meta text-text-faint">{note}</span>
      </div>

      {/* md+ : one row of five stations, links flowing left → right */}
      <div className="mt-6 hidden grid-cols-5 md:grid">
        {stations.map((s, i) => (
          <div key={s.org} className="min-w-0">
            <div className="flex items-center">
              <span
                aria-hidden
                className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent-rgb)/0.7)]"
              />
              {i < stations.length - 1 && <LinkLine reduce={!!reduce} />}
            </div>
            <div className="mt-3 pr-4">
              {s.year ? (
                <div className="num text-meta font-emph text-accent">{s.year}</div>
              ) : (
                <div className="text-meta text-text-faint" title="Career origin — enterprise operations era">
                  origin
                </div>
              )}
              <div className="mt-1 text-dense font-emph leading-snug text-text-strong">{s.org}</div>
              <div className="mt-0.5 text-meta uppercase tracking-[0.08em] text-text-muted">
                {s.note}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* below md : vertical rail */}
      <div className="mt-4 md:hidden">
        {stations.map((s, i) => (
          <Fragment key={s.org}>
            {i > 0 && (
              <div aria-hidden className="ml-[4px] h-6 w-px border-l border-dashed border-accent/50" />
            )}
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-1 size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent-rgb)/0.7)]"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  {s.year && <span className="num text-meta font-emph text-accent">{s.year}</span>}
                  <span className="text-dense font-emph text-text-strong">{s.org}</span>
                </div>
                <div className="mt-0.5 text-meta uppercase tracking-[0.08em] text-text-muted">
                  {s.note}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </Card>
  );
}

function LinkLine({ reduce }: { reduce: boolean }) {
  return (
    <svg className="mx-2 h-[2px] w-full min-w-0 flex-1" aria-hidden>
      <motion.line
        x1="0"
        y1="1"
        x2="100%"
        y2="1"
        stroke="rgb(var(--accent-rgb) / 0.55)"
        strokeWidth="2"
        strokeDasharray="5 5"
        {...(!reduce
          ? {
              initial: { strokeDashoffset: 0 },
              animate: { strokeDashoffset: -40 },
              transition: { duration: 4, repeat: Infinity, ease: 'linear' },
            }
          : {})}
      />
    </svg>
  );
}
