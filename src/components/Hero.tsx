import { ArrowRight, Linkedin, Mail } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';

export function Hero() {
  const { t, lang } = useI18n();
  const today = new Date().toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <header
      id="top"
      className="mx-auto w-full max-w-6xl px-6 pt-10 pb-12 sm:px-10 sm:pt-14 lg:px-14"
    >
      {/* View head — wp-planner pattern */}
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-[3px] border-double border-ink pb-3.5">
        <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-oxblood">
          §&nbsp;00
        </span>
        <h1 className="display-serif m-0 text-[34px] leading-none text-ink sm:text-[42px]">
          {lang === 'hu' ? 'Portfolio · ' : 'Portfolio · '}
          <span className="accent-italic">2026</span>
        </h1>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
          · {t.hero.eyebrow}
        </span>
        <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
          {today}
        </span>
      </div>

      {/* Lead — view-lead style */}
      <p className="prose-just mb-9 mt-4 max-w-[820px] font-serif text-[16px] italic leading-[1.55] text-ink-soft">
        {t.hero.lead}
      </p>

      {/* Two-column body — type + portrait */}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="display-serif text-[44px] leading-[1.05] text-ink sm:text-[56px] lg:text-[68px]">
            <span className="block">{t.hero.titleA}</span>
            <span className="accent-italic block text-[40px] sm:text-[52px] lg:text-[62px]">
              {t.hero.titleB}
            </span>
            <span className="mt-3 block font-serif text-[18px] font-light leading-snug text-ink-soft sm:text-[22px] lg:text-[24px]">
              {t.hero.titleC}
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-oxblood">
              {t.hero.ctaPrimary}
              <ArrowRight size={14} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost-ink"
            >
              <Linkedin size={14} />
              {t.hero.ctaSecondary}
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost-ink">
              <Mail size={14} />
              Email
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
            <span className="h-px w-10 bg-ink-mute" />
            <span>
              {profile.name} · {profile.location}
            </span>
          </div>
        </div>

        {/* Portrait — paper card with stamps */}
        <div className="lg:col-span-5">
          <figure className="relative mx-auto w-full max-w-[250px] lg:ml-auto lg:max-w-[312px]">
            <div className="absolute -top-3 -left-3 z-10 hidden lg:block">
              <span className="stamp">No. 2026 / 05</span>
            </div>
            <div className="absolute -bottom-3 -right-3 z-10 hidden lg:block">
              <span
                className="stamp stamp-sage"
                style={{ transform: 'rotate(2deg)' }}
              >
                Available
              </span>
            </div>
            <div
              className="border bg-paper p-3"
              style={{ borderColor: 'var(--ink)', boxShadow: 'var(--shadow-card)' }}
            >
              <img
                src={profile.portrait}
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover"
                style={{ imageRendering: 'auto' }}
                loading="eager"
                decoding="async"
              />
              <figcaption className="mt-3 flex items-baseline justify-between border-t border-paper-rule pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                  Plate I
                </span>
                <span className="font-serif italic text-[13px] text-ink">
                  {profile.name}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>

      {/* KPI strip — wp-planner kpis style */}
      <div
        className="mt-12 grid grid-cols-2 divide-x divide-paper-rule sm:grid-cols-3 lg:grid-cols-6"
        style={{ border: '1px solid var(--ink)', background: 'var(--paper-shadow)' }}
      >
        {t.hero.stats.map((s) => (
          <div
            key={s.label}
            className="flex min-h-[120px] flex-col items-center justify-start px-3 pt-8 pb-5 text-center sm:px-4"
          >
            <div
              className="display-serif text-oxblood"
              style={{
                fontVariationSettings: '"opsz" 144',
                fontSize: 32,
                lineHeight: '40px',
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
              }}
            >
              {s.value}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-ink-mute">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
