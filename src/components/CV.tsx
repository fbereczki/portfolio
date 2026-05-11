import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Briefcase, GraduationCap, Linkedin, Mail, MapPin, Phone, Globe } from 'lucide-react';
import { profile } from '../data/profile';
import { useI18n } from '../i18n/I18nProvider';

const summary = {
  hu: 'Cybersecurity Project Manager 20+ év IT-tapasztalattal — üzemeltetés, szoftverfejlesztés, nagyléptékű állami biztonsági projektek. Jelenleg automotive cybersecurity-t szállítok a Knorr-Bremse R&D Centernél, eközben a CodeWitness — AI-asszisztált fejlesztéshez készülő compliance-ready audit-platform — alapítója vagyok. Az AI nem helyettesíti a senior mérnököket, hanem felerősíti őket.',
  en: 'Cybersecurity Project Manager with 20+ years across IT operations, software engineering, and large-scale public-sector security programmes. Currently delivering automotive cybersecurity at the Knorr-Bremse R&D Center while founding CodeWitness — a compliance-ready audit platform for AI-assisted development. AI does not replace senior engineers; it amplifies them.',
};

const expertiseTags = {
  hu: ['Kiberbiztonság', 'AI', 'Projektmenedzsment', 'Programozás', 'Kockázatmenedzsment', 'Blokklánc'],
  en: ['Cybersecurity', 'AI', 'Project Management', 'Programming', 'Risk Management', 'Blockchain'],
};

const aiStack = {
  hu: ['MCP-szerverek', 'Agent orchestration', 'RAG · Vector DB', 'Prompt engineering', 'LLM evals', 'AI compliance', 'VibeCode Fixer'],
  en: ['MCP servers', 'Agent orchestration', 'RAG · Vector DB', 'Prompt engineering', 'LLM evals', 'AI compliance', 'VibeCode Fixer'],
};

const leadership = {
  hu: ['Csapatvezetés', 'Stakeholder-menedzsment', 'Mentoring', 'Konferencia-előadás', 'Crisis management'],
  en: ['Team leadership', 'Stakeholder management', 'Mentoring', 'Public speaking', 'Crisis management'],
};

const credentials = {
  hu: [
    'Nemzetbiztonsági átvilágítás',
    'ISO/SAE 21434 · UN-ECE R155/R156',
    'EU AI Act · SOC 2 Type II',
    'IBTV · ISO 27001',
    'B2 Angol',
  ],
  en: [
    'National security clearance',
    'ISO/SAE 21434 · UN-ECE R155/R156',
    'EU AI Act · SOC 2 Type II',
    'IBTV · ISO 27001',
    'English B2',
  ],
};

const labels = {
  hu: {
    contact: 'Elérhetőség',
    achievements: 'Eredmények',
    expertise: 'Szakterület',
    leadership: 'Vezetés',
    aiStack: 'AI · Tech',
    credentials: 'Szabványok',
    experience: 'Munkatapasztalat',
    education: 'Oktatás',
  },
  en: {
    contact: 'Contact',
    achievements: 'Achievements',
    expertise: 'Expertise',
    leadership: 'Leadership',
    aiStack: 'AI · Tech',
    credentials: 'Credentials',
    experience: 'Experience',
    education: 'Education',
  },
};

const TOP_ACHIEVEMENTS_EN = [
  'Award of the Minister of Interior',
  '600-person training reach',
  'SIL — original methodology',
];

export function CV() {
  const { lang } = useI18n();
  const L = labels[lang];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const topAchievements = TOP_ACHIEVEMENTS_EN
    .map((title) => profile.achievements.find((a) => a.title.en === title))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const nameParts = profile.name.split(' ');
  const surname = nameParts[0] ?? profile.name;
  const firstName = nameParts.slice(1).join(' ');

  const cvNode = (
    <div className="cv-print-container" aria-hidden>
      {/* ===================== SIDEBAR ===================== */}
      <aside className="cv-sidebar">
        <div className="cv-portrait-wrap">
          <img src={profile.portrait} alt="" className="cv-portrait" />
        </div>

        {/* CONTACT */}
        <div className="cv-pill">{L.contact}</div>
        <ul className="cv-contact-list">
          <li>
            <span className="cv-icon-circle"><Phone size={9} strokeWidth={2.2} /></span>
            <span>{profile.phone}</span>
          </li>
          <li>
            <span className="cv-icon-circle"><Mail size={9} strokeWidth={2.2} /></span>
            <span>{profile.email}</span>
          </li>
          <li>
            <span className="cv-icon-circle"><Mail size={9} strokeWidth={2.2} /></span>
            <span>{profile.emailPersonal}</span>
          </li>
          <li>
            <span className="cv-icon-circle"><Linkedin size={9} strokeWidth={2.2} /></span>
            <span>linkedin.com/in/ferenc-bereczki</span>
          </li>
          <li>
            <span className="cv-icon-circle"><Globe size={9} strokeWidth={2.2} /></span>
            <span>imwy.ai</span>
          </li>
          <li>
            <span className="cv-icon-circle"><MapPin size={9} strokeWidth={2.2} /></span>
            <span>{profile.location}</span>
          </li>
        </ul>

        {/* ACHIEVEMENTS */}
        <div className="cv-pill">{L.achievements}</div>
        <ul className="cv-side-blocks">
          {topAchievements.map((a) => (
            <li key={a.title.en}>
              <div className="cv-side-block-title">{a.title[lang]}</div>
              <div className="cv-side-block-detail">{a.detail[lang]}</div>
            </li>
          ))}
        </ul>

        {/* EXPERTISE */}
        <div className="cv-pill">{L.expertise}</div>
        <div className="cv-tag-cloud">
          {expertiseTags[lang].map((t) => (
            <span key={t} className="cv-tag">{t}</span>
          ))}
        </div>

        {/* LEADERSHIP */}
        <div className="cv-pill">{L.leadership}</div>
        <div className="cv-tag-cloud">
          {leadership[lang].map((t) => (
            <span key={t} className="cv-tag">{t}</span>
          ))}
        </div>

        {/* AI · TECH */}
        <div className="cv-pill">{L.aiStack}</div>
        <div className="cv-tag-cloud">
          {aiStack[lang].map((t) => (
            <span key={t} className="cv-tag">{t}</span>
          ))}
        </div>

        {/* CREDENTIALS */}
        <div className="cv-pill">{L.credentials}</div>
        <ul className="cv-bullet-list">
          {credentials[lang].map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </aside>

      {/* ===================== MAIN COLUMN ===================== */}
      <main className="cv-main">
        <header className="cv-name-block">
          <h1 className="cv-name">
            <span className="cv-name-surname">{surname.toUpperCase()}</span>{' '}
            <em className="cv-name-first">{firstName}</em>
          </h1>
          <div className="cv-headline">{profile.headline[lang]}</div>
          <div className="cv-name-rule" />
        </header>

        <p className="cv-summary">{summary[lang]}</p>

        {/* EXPERIENCE */}
        <div className="cv-main-head">
          <span className="cv-main-head-icon"><Briefcase size={11} strokeWidth={2.2} /></span>
          <span className="cv-main-head-label">{L.experience}</span>
        </div>

        <div className="cv-timeline">
          {profile.experience.map((exp, idx) => {
            const co = typeof exp.company === 'string' ? exp.company : exp.company[lang];
            return (
              <div key={idx} className="cv-tl-item">
                <span className="cv-tl-dot" aria-hidden />
                <div className="cv-tl-period">{exp.period[lang]}</div>
                <div className="cv-tl-role-line">
                  <span className="cv-tl-role">{exp.role[lang]}</span>
                  <span className="cv-tl-sep"> · </span>
                  <span className="cv-tl-company">{co}</span>
                </div>
                <ul className="cv-tl-bullets">
                  {exp.bullets[lang].slice(0, 2).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* EDUCATION */}
        <div className="cv-main-head">
          <span className="cv-main-head-icon"><GraduationCap size={11} strokeWidth={2.2} /></span>
          <span className="cv-main-head-label">{L.education}</span>
        </div>

        <div className="cv-timeline cv-timeline-tight">
          {profile.education.map((e) => (
            <div key={e.year} className="cv-tl-item cv-tl-item-edu">
              <span className="cv-tl-dot" aria-hidden />
              <div className="cv-tl-period">{e.year}</div>
              <div className="cv-tl-role-line">
                <span className="cv-tl-role">{e.title[lang]}</span>
              </div>
              <div className="cv-tl-edu-school">{e.school}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  if (!mounted) return null;
  return createPortal(cvNode, document.body);
}
