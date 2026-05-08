import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';

type NavItem = { href: string; num: string; label: string };

const buildItems = (
  t: { nav: { about: string; experience: string; projects: string; codewitness: string; ai: string; sil: string; compliance: string; contact: string } },
  lang: 'hu' | 'en'
): { group: string; items: NavItem[] }[] => [
  {
    group: lang === 'hu' ? 'Profil' : 'Profile',
    items: [
      { href: '#top', num: '01', label: lang === 'hu' ? 'Áttekintés' : 'Overview' },
      { href: '#about', num: '02', label: t.nav.about },
      { href: '#experience', num: '03', label: t.nav.experience },
      { href: '#skills', num: '04', label: lang === 'hu' ? 'Készségek' : 'Skills' },
    ],
  },
  {
    group: lang === 'hu' ? 'Munka' : 'Work',
    items: [
      { href: '#projects', num: '05', label: t.nav.projects },
      { href: '#codewitness-spotlight', num: '06', label: t.nav.codewitness },
      { href: '#ai', num: '07', label: t.nav.ai },
      { href: '#sil', num: '08', label: t.nav.sil },
      { href: '#blockchain', num: '09', label: lang === 'hu' ? 'Blockchain' : 'Blockchain' },
    ],
  },
  {
    group: lang === 'hu' ? 'Egyéb' : 'Other',
    items: [
      { href: '#compliance', num: '10', label: t.nav.compliance },
      { href: '#contact', num: '11', label: t.nav.contact },
    ],
  },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useI18n();
  const groups = buildItems(t, lang);
  const [activeHref, setActiveHref] = useState<string>('#top');

  // Track scroll position to highlight active section
  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((i) => i.href));
    const onScroll = () => {
      const offsets = ids
        .map((href) => {
          const el = document.querySelector(href);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { href, top: rect.top };
        })
        .filter((x): x is { href: string; top: number } => x !== null);
      // Pick the one whose top is just above viewport center
      const center = window.innerHeight / 3;
      const above = offsets.filter((o) => o.top <= center);
      const cur = above.length > 0 ? above[above.length - 1].href : offsets[0]?.href;
      if (cur) setActiveHref(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <>
      {/* Mobile backdrop */}
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-[260px] overflow-y-auto border-r border-[#0E0F14] bg-[#1A1B22] py-6 text-[#E8E2CC] transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #1A1B22, #0E0F14 100%)',
        }}
      >
        {groups.map((group, gi) => (
          <div key={group.group} className={gi === 0 ? '' : 'mt-5'}>
            <h4 className="px-6 pb-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#8A8676]">
              {group.group}
            </h4>
            <nav>
              {group.items.map((it) => {
                const isActive = activeHref === it.href;
                return (
                  <a
                    key={it.href}
                    href={it.href}
                    onClick={onClose}
                    className="group flex items-center gap-2.5 border-l-[3px] py-1.5 pl-4 pr-5 font-serif text-[14px] transition-colors"
                    style={{
                      borderLeftColor: isActive ? '#A85049' : 'transparent',
                      background: isActive ? 'rgba(168,80,73,0.12)' : 'transparent',
                      color: isActive ? '#A85049' : '#E8E2CC',
                      fontWeight: isActive ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'rgba(168,80,73,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.08em]"
                      style={{ width: 22, color: isActive ? '#A85049' : '#8A8676' }}
                    >
                      {it.num}
                    </span>
                    {it.label}
                  </a>
                );
              })}
            </nav>
          </div>
        ))}

        {/* Stamp at bottom */}
        <div
          className="mx-6 mt-7 px-3 py-3 text-center font-mono text-[9.5px] uppercase leading-[1.6] tracking-[0.18em]"
          style={{
            border: '1.5px dashed #A85049',
            color: '#A85049',
            background: 'rgba(168,80,73,0.04)',
            transform: 'rotate(-1deg)',
          }}
        >
          <b className="block text-[13px] tracking-[0.06em]" style={{ marginBottom: 4 }}>
            {profile.name.split(' ')[0].toUpperCase()}
          </b>
          {lang === 'hu' ? 'Portfolio' : 'Portfolio'} · v1
          <div className="mt-1.5 text-[8.5px] tracking-[0.12em]" style={{ color: '#8A8676' }}>
            HU · EN · 2026
          </div>
        </div>
      </aside>
    </>
  );
}
