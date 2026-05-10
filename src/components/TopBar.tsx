import { Download, Github, Languages, Linkedin, Menu } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { t: _t, lang, setLang } = useI18n();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-4 border-b border-[#0E0F14] px-4 sm:px-6"
      style={{ background: '#1A1B22', color: '#E8E2CC' }}
    >
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="grid h-9 w-9 place-items-center text-[#E8E2CC] hover:bg-white/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Brand */}
      <a href="#top" className="flex items-baseline gap-2 min-w-0">
        <span
          className="text-[19px] font-bold leading-none"
          style={{
            fontFamily: '"Fraunces", serif',
            fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
            letterSpacing: '-0.01em',
          }}
        >
          BERECZKI{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: '#A85049',
              fontVariationSettings: '"opsz" 144, "SOFT" 60, "WONK" 1',
            }}
          >
            Ferenc
          </em>
        </span>
        <span
          className="hidden font-mono text-[10px] uppercase tracking-[0.12em] sm:inline"
          style={{ color: '#8A8676' }}
        >
          v.2026 · paper edition
        </span>
      </a>

      {/* Project info — current role */}
      <div
        className="hidden items-baseline gap-3 border-l pl-4 md:flex"
        style={{ borderColor: '#2A2B33' }}
      >
        <span
          className="font-mono text-[12px] font-semibold tracking-[0.08em]"
          style={{ color: '#A85049' }}
        >
          KB-CYBSEC
        </span>
        <span className="font-serif text-[13px] italic" style={{ color: '#E8E2CC' }}>
          {profile.currentRole[lang]}
        </span>
        <span
          className="font-mono text-[9.5px] uppercase tracking-[0.14em]"
          style={{
            padding: '3px 8px',
            border: '1px solid rgba(168,80,73,0.4)',
            color: '#A85049',
          }}
        >
          {lang === 'hu' ? 'Aktív' : 'Active'}
        </span>
      </div>

      <span className="flex-1" />

      {/* Action buttons */}
      <div className="flex items-center gap-1.5">
        {profile.links.github && (
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-8 w-8 place-items-center text-[#E8E2CC]/70 hover:text-[#A85049]"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        )}
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="grid h-8 w-8 place-items-center text-[#E8E2CC]/70 hover:text-[#A85049]"
          aria-label="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <button
          onClick={() => window.print()}
          className="ml-1 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] hover:bg-white/5"
          style={{
            border: '1px solid #2A2B33',
            color: '#E8E2CC',
          }}
          aria-label={lang === 'hu' ? 'Önéletrajz letöltése' : 'Download CV'}
          title={lang === 'hu' ? 'Önéletrajz letöltése (PDF)' : 'Download CV (PDF)'}
        >
          <Download size={12} />
          {lang === 'hu' ? 'CV' : 'CV'}
        </button>
        <button
          onClick={() => setLang(lang === 'hu' ? 'en' : 'hu')}
          className="ml-1 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] hover:bg-white/5"
          style={{
            border: '1px solid #2A2B33',
            color: '#E8E2CC',
          }}
          aria-label="Toggle language"
        >
          <Languages size={12} />
          {lang === 'hu' ? 'EN' : 'HU'}
        </button>
      </div>
    </header>
  );
}
