import { profile } from '../data/profile';
import { useI18n } from '../i18n/I18nProvider';

const summary = {
  hu: 'Cybersecurity Project Manager 20+ év IT-tapasztalattal — üzemeltetés, szoftverfejlesztés, nagyléptékű állami biztonsági projektek. Jelenleg automotive cybersecurity-t szállítok a Knorr-Bremse R&D Centernél, eközben a CodeWitness — AI-asszisztált fejlesztéshez készülő compliance-ready audit-platform — alapítója vagyok. Az AI nem helyettesíti a senior mérnököket, hanem felerősíti őket.',
  en: 'Cybersecurity Project Manager with 20+ years across IT operations, software engineering, and large-scale public-sector security programmes. Currently delivering automotive cybersecurity at the Knorr-Bremse R&D Center while founding CodeWitness — a compliance-ready audit platform for AI-assisted development. AI does not replace senior engineers; it amplifies them.',
};

const skillsForCV = {
  hu: {
    industry: ['Kiberbiztonság', 'AI', 'Projektmenedzsment', 'Programozás', 'Kockázatmenedzsment', 'Blokklánc'],
    standards: ['ISO/SAE 21434', 'UN-ECE R155/R156', 'EU AI Act', 'SOC 2 Type II', 'GDPR', 'IBTV · ISO 27001'],
  },
  en: {
    industry: ['Cybersecurity', 'AI', 'Project Management', 'Programming', 'Risk Management', 'Blockchain'],
    standards: ['ISO/SAE 21434', 'UN-ECE R155/R156', 'EU AI Act', 'SOC 2 Type II', 'GDPR', 'IBTV · ISO 27001'],
  },
};

const labels = {
  hu: {
    summary: 'Összefoglaló',
    experience: 'Tapasztalat',
    education: 'Tanulmányok',
    achievements: 'Eredmények',
    skills: 'Készségek',
    industry: 'Szakterület',
    standards: 'Szabványok',
  },
  en: {
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    achievements: 'Achievements',
    skills: 'Skills',
    industry: 'Industry',
    standards: 'Standards',
  },
};

const ACHIEVEMENT_ORDER_EN = [
  'National security clearance',
  'CodeWitness — startup founder',
  'Award of the Minister of Interior',
  'SIL — original methodology',
];

function nameWithAccent(fullName: string) {
  const parts = fullName.split(' ');
  if (parts.length < 2) return <span>{fullName}</span>;
  const last = parts[0];
  const first = parts.slice(1).join(' ');
  return (
    <>
      <span style={{ fontWeight: 700 }}>{last.toUpperCase()}</span>{' '}
      <em
        style={{
          fontStyle: 'italic',
          color: 'var(--oxblood-soft)',
        }}
      >
        {first}
      </em>
    </>
  );
}

export function CV() {
  const { lang } = useI18n();
  const L = labels[lang];

  const topAchievements = ACHIEVEMENT_ORDER_EN
    .map((title) => profile.achievements.find((a) => a.title.en === title))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="cv-print-container" aria-hidden>
      {/* ===== HEADER ===== */}
      <header className="cv-header">
        <div className="cv-header-name">
          <div className="cv-name display-serif">{nameWithAccent(profile.name)}</div>
          <div className="cv-headline accent-italic">{profile.headline[lang]}</div>
        </div>
        <div className="cv-header-meta">
          <div>{profile.location}</div>
          <div>{profile.phone}</div>
          <div>{profile.email}</div>
          <div>linkedin.com/in/ferenc-bereczki</div>
          <div>imwy.ai</div>
        </div>
      </header>

      <div className="cv-rule" />

      {/* ===== SUMMARY ===== */}
      <section className="cv-section">
        <div className="cv-section-head">
          <span className="cv-section-num">01</span>
          <span className="cv-section-label label-mono">— {L.summary}</span>
          <span className="cv-section-line" />
        </div>
        <p className="cv-summary drop-cap prose-just">{summary[lang]}</p>
      </section>

      {/* ===== TWO COLUMN BODY ===== */}
      <div className="cv-grid">
        <main className="cv-main">
          <section className="cv-section">
            <div className="cv-section-head">
              <span className="cv-section-num">02</span>
              <span className="cv-section-label label-mono">— {L.experience}</span>
              <span className="cv-section-line" />
            </div>

            {profile.experience.map((exp, idx) => {
              const co = typeof exp.company === 'string' ? exp.company : exp.company[lang];
              return (
                <div key={idx} className="cv-exp">
                  <div className="cv-exp-period label-mono">{exp.period[lang]}</div>
                  <h3 className="cv-exp-role display-serif">{exp.role[lang]}</h3>
                  <div className="cv-exp-company accent-italic">{co}</div>
                  <ul className="cv-exp-bullets">
                    {exp.bullets[lang].slice(0, 2).map((b) => (
                      <li key={b}>
                        <span className="cv-bullet-dot" aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </section>
        </main>

        <aside className="cv-side">
          <section className="cv-side-section">
            <div className="cv-side-head label-mono">— {L.education}</div>
            <ul className="cv-side-list">
              {profile.education.map((e) => (
                <li key={e.year}>
                  <div className="cv-side-title">{e.title[lang]}</div>
                  <div className="cv-side-meta">
                    <span>{e.school}</span>
                    <span className="cv-side-year">{e.year}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-side-section">
            <div className="cv-side-head label-mono">— {L.achievements}</div>
            <ul className="cv-side-list">
              {topAchievements.map((a) => (
                <li key={a.title.en}>
                  <div className="cv-side-title">{a.title[lang]}</div>
                  <div className="cv-side-detail">{a.detail[lang]}</div>
                </li>
              ))}
            </ul>
          </section>

          <section className="cv-side-section">
            <div className="cv-side-head label-mono">— {L.skills}</div>
            <div className="cv-skill-block">
              <div className="cv-skill-head">{L.industry}</div>
              <div className="cv-skill-tags">
                {skillsForCV[lang].industry.map((s) => (
                  <span key={s} className="cv-skill-tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="cv-skill-block">
              <div className="cv-skill-head">{L.standards}</div>
              <div className="cv-skill-tags">
                {skillsForCV[lang].standards.map((s) => (
                  <span key={s} className="cv-skill-tag">{s}</span>
                ))}
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
