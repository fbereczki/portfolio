import { useEffect, useState } from 'react';
import { Languages, Github, Linkedin, Palette } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { useTheme } from '../theme/ThemeProvider';
import { profile } from '../data/profile';

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items: [string, string][] = [
    ['#about', t.nav.about],
    ['#experience', t.nav.experience],
    ['#projects', t.nav.projects],
    ['#codewitness-spotlight', t.nav.codewitness],
    ['#ai', t.nav.ai],
    ['#sil', t.nav.sil],
    ['#compliance', t.nav.compliance],
    ['#contact', t.nav.contact],
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? 'border-b border-paper-rule bg-paper/95 backdrop-blur-[2px]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center border border-ink bg-paper font-mono text-[14px] font-bold tracking-[0.05em] text-ink">
            FB
          </div>
          <div className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate font-serif text-[15px] font-semibold text-ink">
              {profile.name}
            </span>
            <span className="hidden truncate font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute xl:inline-block xl:max-w-[260px]">
              {profile.currentRole[lang]}
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {items.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-oxblood"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center text-ink-soft transition-colors hover:text-oxblood"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
          )}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="grid h-9 w-9 place-items-center text-ink-soft transition-colors hover:text-oxblood"
            aria-label="LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <button
            onClick={toggle}
            className="ml-1 inline-flex items-center gap-1.5 border border-ink bg-paper px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
            aria-label="Toggle theme"
            title={theme === 'paper' ? 'Switch to Swiss' : 'Switch to Paper'}
          >
            <Palette size={13} />
            {theme === 'paper' ? 'Swiss' : 'Paper'}
          </button>
          <button
            onClick={() => setLang(lang === 'hu' ? 'en' : 'hu')}
            className="inline-flex items-center gap-1.5 border border-ink bg-paper px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper"
            aria-label="Toggle language"
          >
            <Languages size={13} />
            {lang === 'hu' ? 'EN' : 'HU'}
          </button>
        </div>
      </div>
    </nav>
  );
}
