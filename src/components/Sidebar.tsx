import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { CASE_NO, NAV, type NavEntry, type NavGroup } from '../data/nav';
import type { Translations } from '../i18n/translations';

const GROUP_ORDER: NavGroup[] = ['case', 'evidence', 'closing'];

function labelFor(entry: NavEntry, t: Translations): string {
  switch (entry.id) {
    case 'top': return t.nav.overview;
    case 'about': return t.nav.about;
    case 'experience': return t.nav.experience;
    case 'skills': return t.nav.skills;
    case 'codewitness-spotlight': return t.nav.codewitness;
    case 'sil': return t.nav.sil;
    case 'projects': return t.nav.projects;
    case 'ai': return t.nav.ai;
    case 'blockchain': return t.nav.blockchain;
    case 'compliance': return t.nav.compliance;
    case 'contact': return t.nav.contact;
    default: return entry.id;
  }
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useI18n();
  const [activeId, setActiveId] = useState<string>('top');

  // Track scroll position to highlight active section
  useEffect(() => {
    const onScroll = () => {
      const offsets = NAV
        .map((entry) => {
          const el = document.getElementById(entry.id);
          if (!el) return null;
          return { id: entry.id, top: el.getBoundingClientRect().top };
        })
        .filter((x): x is { id: string; top: number } => x !== null);
      const center = window.innerHeight / 3;
      const above = offsets.filter((o) => o.top <= center);
      const cur = above.length > 0 ? above[above.length - 1].id : offsets[0]?.id;
      if (cur) setActiveId(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
        {GROUP_ORDER.map((groupKey, gi) => {
          const items = NAV.filter((n) => n.group === groupKey);
          return (
            <div key={groupKey} className={gi === 0 ? '' : 'mt-5'}>
              <h4 className="px-6 pb-2 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#8A8676]">
                {t.nav.groups[groupKey]}
              </h4>
              <nav>
                {items.map((it) => {
                  const isActive = activeId === it.id;
                  return (
                    <a
                      key={it.id}
                      href={`#${it.id}`}
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
                      <span className="min-w-0 flex-1 truncate">{labelFor(it, t)}</span>
                      {it.exhibit && (
                        <span
                          className="font-mono text-[9px] font-semibold tracking-[0.08em]"
                          style={{ color: isActive ? '#A85049' : '#8A8676' }}
                          title={`Exhibit ${it.exhibit}`}
                        >
                          {it.exhibit}
                        </span>
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>
          );
        })}

        {/* Case stamp at bottom */}
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
          {lang === 'hu' ? 'Ügyirat' : 'Case'} № {CASE_NO}
          <div className="mt-1.5 text-[8.5px] tracking-[0.12em]" style={{ color: '#8A8676' }}>
            HU · EN · 2026
          </div>
        </div>
      </aside>
    </>
  );
}
