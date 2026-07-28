import { Fragment, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, FilterX, PlayCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { projects, type Project } from '../data/projects';
import { Section } from './Section';
import { ProjectModal } from './ProjectModal';

type Filter = 'all' | 'prod' | 'dev' | 'ai';

const TOP_N = 6;

/** Lower = stronger evidence. Spotlight rank first, then production status. */
function evidenceWeight(p: Project): number {
  const spot =
    p.spotlight === 'primary' ? 0 : p.spotlight === 'secondary' ? 1 : p.spotlight === 'tertiary' ? 2 : 3;
  if (spot < 3) return spot * 10;
  const phase = p.phase === 'prod' ? 0 : p.phase === 'test' ? 1 : 2;
  return 30 + phase;
}

type StatusKind = 'key' | 'prod' | 'wip';

function statusOf(p: Project): StatusKind {
  if (p.spotlight === 'primary') return 'key';
  return p.phase === 'prod' ? 'prod' : 'wip';
}

const statusPill: Record<StatusKind, string> = {
  key: 'pill-oxblood',
  prod: 'pill-sage',
  wip: 'pill-amber',
};

export function Projects() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const [showAll, setShowAll] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...projects].sort((a, b) => evidenceWeight(a) - evidenceWeight(b)),
    []
  );

  /** Stable № from the full sorted list — rows keep their number under any filter. */
  const orderById = useMemo(
    () => new Map(sorted.map((p, i) => [p.id, i + 1] as const)),
    [sorted]
  );

  const filtered = useMemo(() => {
    return sorted.filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'prod') return p.phase === 'prod';
      if (filter === 'dev') return p.phase === 'dev' || p.phase === 'test';
      if (filter === 'ai') return p.tags.some((tag) => tag === 'ai' || tag === 'mcp' || tag === 'rag');
      return true;
    });
  }, [sorted, filter]);

  const visible = showAll ? filtered : filtered.slice(0, TOP_N);
  const hiddenCount = filtered.length - visible.length;

  const open: Project | undefined = projects.find((p) => p.id === openId);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.projects.filters.all },
    { key: 'prod', label: t.projects.filters.prod },
    { key: 'dev', label: t.projects.filters.dev },
    { key: 'ai', label: t.projects.filters.ai },
  ];

  const statusLabel: Record<StatusKind, string> = {
    key: t.projects.status.key,
    prod: t.projects.status.prod,
    wip: t.projects.status.wip,
  };

  return (
    <Section
      id="projects"
      kicker={t.projects.kicker}
      title={t.projects.title}
      lead={t.projects.lead}
    >
      {/* Filter strip */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="label-mono">— {t.projects.filterLabel}</span>
        <div className="flex flex-wrap gap-0">
          {filters.map((f, i) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setShowAll(false);
              }}
              className={`border border-ink/40 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                filter === f.key
                  ? 'border-ink bg-ink text-paper'
                  : 'bg-paper text-ink hover:bg-paper-deep'
              } ${i > 0 ? '-ml-px' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span
          className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute sm:inline"
          title={t.projects.countTip
            .replace('{n}', String(filtered.length))
            .replace('{m}', String(projects.length))}
        >
          {filtered.length} / {projects.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        /* Empty filter state (K5) */
        <div className="border border-paper-rule bg-paper-deep/30 px-6 py-12 text-center">
          <div className="font-serif text-[17px] font-semibold text-ink">
            {t.projects.empty.title}
          </div>
          <p className="mt-1 font-serif text-[14px] italic text-ink-mute">
            {t.projects.empty.body}
          </p>
          <button
            onClick={() => setFilter('all')}
            className="btn-ghost-ink mt-5 justify-center"
          >
            <FilterX size={13} />
            {t.projects.empty.reset}
          </button>
        </div>
      ) : (
        <div className="border border-ink bg-paper" style={{ boxShadow: 'var(--shadow-card)' }}>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-paper-deep/60 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                <th className="w-12 px-3 py-3 text-right font-medium">{t.projects.table.no}</th>
                <th className="px-3 py-3 font-medium">{t.projects.table.project}</th>
                <th className="px-3 py-3 font-medium" title={t.projects.statusTip}>
                  {t.projects.table.status}
                </th>
                <th className="hidden px-3 py-3 font-medium lg:table-cell">
                  {t.projects.table.stack}
                </th>
                <th className="hidden px-3 py-3 font-medium sm:table-cell">
                  {t.projects.table.demo}
                </th>
                <th className="w-10 px-3 py-3" />
              </tr>
            </thead>
            <tbody>
              {visible.map((p) => {
                const st = statusOf(p);
                const isOpen = openRow === p.id;
                return (
                  <Fragment key={p.id}>
                    <tr
                      className={`cursor-pointer border-t border-paper-rule transition-colors hover:bg-paper-deep/30 ${
                        isOpen ? 'bg-paper-deep/30' : ''
                      }`}
                      onClick={() => setOpenRow(isOpen ? null : p.id)}
                      aria-expanded={isOpen}
                    >
                      <td
                        className="px-3 py-3.5 text-right align-top font-mono text-[11px] text-ink-mute"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {String(orderById.get(p.id) ?? 0).padStart(2, '0')}
                      </td>
                      <td className="px-3 py-3.5 align-top">
                        <div className="display-serif text-[17px] leading-tight text-ink">
                          {p.name}
                        </div>
                        <div className="mt-0.5 hidden font-serif text-[12.5px] italic leading-snug text-ink-mute sm:block">
                          {p.tagline[lang]}
                        </div>
                      </td>
                      <td className="px-3 py-3.5 align-top">
                        <span
                          className={`${statusPill[st]} whitespace-nowrap`}
                          title={t.projects.statusTip}
                        >
                          {statusLabel[st]}
                        </span>
                      </td>
                      <td className="hidden px-3 py-3.5 align-top lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {p.stack.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              className="border border-paper-rule bg-paper-deep/30 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-soft"
                            >
                              {s}
                            </span>
                          ))}
                          {p.stack.length > 3 && (
                            <span
                              className="px-1 py-0.5 font-mono text-[9.5px] text-ink-mute"
                              style={{ fontVariantNumeric: 'tabular-nums' }}
                              title={p.stack.slice(3).join(' · ')}
                            >
                              +{p.stack.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="hidden px-3 py-3.5 align-top sm:table-cell">
                        {p.demo ? (
                          <span
                            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-oxblood"
                            title={t.projects.runDemo}
                          >
                            <PlayCircle size={13} /> {t.projects.table.demo}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-ink-faint">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 align-top">
                        <ChevronDown
                          size={15}
                          className={`text-ink-mute transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </td>
                    </tr>

                    {isOpen && (
                      <tr className="border-t border-paper-rule/60 bg-paper-deep/20">
                        <td />
                        <td colSpan={5} className="px-3 pb-5 pt-2">
                          <p className="prose-just max-w-3xl font-serif text-[14.5px] leading-relaxed text-ink-soft">
                            {p.purpose[lang]}
                          </p>
                          <ul className="mt-3 max-w-3xl space-y-1.5">
                            {p.highlights[lang].slice(0, 3).map((h) => (
                              <li
                                key={h}
                                className="flex gap-2.5 font-serif text-[13.5px] leading-relaxed text-ink-soft"
                              >
                                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-oxblood" />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenId(p.id);
                              }}
                              className="btn-ghost-ink"
                            >
                              {t.projects.readMore}
                              <ArrowUpRight size={13} />
                            </button>
                            {p.demo && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenId(p.id);
                                }}
                                className="btn-oxblood"
                              >
                                <PlayCircle size={14} />
                                {t.projects.runDemo}
                              </button>
                            )}
                            {p.id === 'codewitness' && (
                              <a
                                href="#codewitness-spotlight"
                                onClick={(e) => e.stopPropagation()}
                                className="ml-1 font-mono text-[10px] uppercase tracking-[0.14em] text-oxblood hover:underline"
                              >
                                ↑ {t.projects.exhibitARef}
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>

          {/* Progressive disclosure — top-N + show all (K7/K8) */}
          {(hiddenCount > 0 || showAll) && filtered.length > TOP_N && (
            <button
              onClick={() => setShowAll((v) => !v)}
              className="flex w-full items-center justify-center gap-2 border-t border-ink bg-paper-deep/40 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {showAll ? (
                t.projects.showLess
              ) : (
                <>
                  {t.projects.showAll}
                  <span style={{ fontVariantNumeric: 'tabular-nums' }}>(+{hiddenCount})</span>
                </>
              )}
              <ChevronDown size={13} className={showAll ? 'rotate-180' : ''} />
            </button>
          )}
        </div>
      )}

      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </Section>
  );
}
