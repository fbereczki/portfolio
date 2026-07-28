import { Fragment, useMemo, useState } from 'react';
import { ArrowUpRight, ChevronDown, FilterX, PlayCircle } from 'lucide-react';
import { Badge, Card, Reveal } from '../landing/ui';
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

/* K3: accent = key evidence, ok = live production, neutral = in progress —
   no semaphore colour without meaning. */
const statusTone: Record<StatusKind, 'accent' | 'ok' | 'neutral'> = {
  key: 'accent',
  prod: 'ok',
  wip: 'neutral',
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
      <Reveal className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-meta font-emph uppercase tracking-[0.14em] text-text-muted">
          {t.projects.filterLabel}
        </span>
        <div className="flex flex-wrap overflow-hidden rounded border border-border">
          {filters.map((f, i) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setShowAll(false);
              }}
              className={`px-3 py-1.5 text-dense font-emph transition-colors ${
                filter === f.key
                  ? 'bg-accent text-on-accent'
                  : 'bg-surface text-text-muted hover:bg-surface-2 hover:text-text-strong'
              } ${i > 0 ? 'border-l border-border' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span
          className="num ml-auto text-meta text-text-faint max-sm:hidden"
          title={t.projects.countTip
            .replace('{n}', String(filtered.length))
            .replace('{m}', String(projects.length))}
        >
          {filtered.length} / {projects.length}
        </span>
      </Reveal>

      {filtered.length === 0 ? (
        /* Empty filter state (K5) */
        <Card className="px-6 py-12 text-center">
          <div className="text-title font-emph text-text-strong">{t.projects.empty.title}</div>
          <p className="mt-1 text-dense text-text-muted">{t.projects.empty.body}</p>
          <button
            onClick={() => setFilter('all')}
            className="mt-5 inline-flex h-8 items-center gap-1.5 rounded border border-border bg-surface px-3 text-dense font-emph text-text-strong transition-colors hover:border-border-strong"
          >
            <FilterX size={13} />
            {t.projects.empty.reset}
          </button>
        </Card>
      ) : (
        <Reveal>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="bg-surface-2 text-meta font-emph uppercase tracking-[0.1em] text-text-muted">
                    <th className="w-12 px-3 py-3 text-right font-emph">{t.projects.table.no}</th>
                    <th className="px-3 py-3 font-emph">{t.projects.table.project}</th>
                    <th className="px-3 py-3 font-emph" title={t.projects.statusTip}>
                      {t.projects.table.status}
                    </th>
                    <th className="hidden px-3 py-3 font-emph lg:table-cell">
                      {t.projects.table.stack}
                    </th>
                    <th className="hidden px-3 py-3 font-emph sm:table-cell">
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
                          className={`cursor-pointer border-t border-border transition-colors hover:bg-surface-2 ${
                            isOpen ? 'bg-surface-2' : ''
                          }`}
                          onClick={() => setOpenRow(isOpen ? null : p.id)}
                          aria-expanded={isOpen}
                        >
                          <td className="num px-3 py-3.5 text-right align-top text-dense text-text-faint">
                            {String(orderById.get(p.id) ?? 0).padStart(2, '0')}
                          </td>
                          <td className="px-3 py-3.5 align-top">
                            <div className="text-dense font-emph leading-tight text-text-strong">
                              {p.name}
                            </div>
                            <div className="mt-0.5 hidden text-dense leading-snug text-text-muted sm:block">
                              {p.tagline[lang]}
                            </div>
                          </td>
                          <td className="px-3 py-3.5 align-top">
                            <Badge tone={statusTone[st]} title={t.projects.statusTip}>
                              {st === 'key' ? '★ ' : ''}
                              {statusLabel[st]}
                            </Badge>
                          </td>
                          <td className="hidden px-3 py-3.5 align-top lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {p.stack.slice(0, 3).map((s) => (
                                <span
                                  key={s}
                                  className="rounded-[5px] border border-border px-1.5 py-0.5 text-meta text-text-muted"
                                >
                                  {s}
                                </span>
                              ))}
                              {p.stack.length > 3 && (
                                <span
                                  className="num px-1 py-0.5 text-meta text-text-faint"
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
                                className="inline-flex items-center gap-1.5 text-meta font-emph uppercase tracking-[0.1em] text-accent"
                                title={t.projects.runDemo}
                              >
                                <PlayCircle size={13} /> {t.projects.table.demo}
                              </span>
                            ) : (
                              <span className="text-meta text-text-faint" title="No live demo for this entry">
                                —
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3.5 align-top">
                            <ChevronDown
                              size={15}
                              className={`text-text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </td>
                        </tr>

                        {isOpen && (
                          <tr className="border-t border-border bg-bg-sunken">
                            <td colSpan={6} className="px-3 pb-5 pt-2">
                              {/* sticky-left keeps the prose readable inside the
                                  horizontally scrolling table on narrow screens */}
                              <div className="sticky left-0 max-w-[calc(100vw-56px)] sm:max-w-none">
                              <p className="max-w-3xl text-dense leading-relaxed text-text">
                                {p.purpose[lang]}
                              </p>
                              <ul className="mt-3 max-w-3xl space-y-1.5">
                                {p.highlights[lang].slice(0, 3).map((h) => (
                                  <li
                                    key={h}
                                    className="flex gap-2.5 text-dense leading-relaxed text-text-muted"
                                  >
                                    <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
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
                                  className="inline-flex h-8 items-center gap-1.5 rounded border border-border bg-surface px-3 text-dense font-emph text-text-strong transition-colors hover:border-border-strong"
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
                                    className="inline-flex h-8 items-center gap-1.5 rounded bg-accent px-3 text-dense font-emph text-on-accent transition-opacity hover:opacity-90"
                                  >
                                    <PlayCircle size={14} />
                                    {t.projects.runDemo}
                                  </button>
                                )}
                                {p.id === 'codewitness' && (
                                  <a
                                    href="#codewitness-spotlight"
                                    onClick={(e) => e.stopPropagation()}
                                    className="ml-1 text-meta font-emph uppercase tracking-[0.1em] text-accent underline-offset-2 hover:underline"
                                  >
                                    ↑ {t.projects.exhibitARef}
                                  </a>
                                )}
                              </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Progressive disclosure — top-N + show all (K7/K8) */}
            {(hiddenCount > 0 || showAll) && filtered.length > TOP_N && (
              <button
                onClick={() => setShowAll((v) => !v)}
                className="flex w-full items-center justify-center gap-2 border-t border-border bg-surface-2 py-3 text-dense font-emph text-text-muted transition-colors hover:bg-surface-3 hover:text-text-strong"
              >
                {showAll ? (
                  t.projects.showLess
                ) : (
                  <>
                    {t.projects.showAll}
                    <span className="num">(+{hiddenCount})</span>
                  </>
                )}
                <ChevronDown size={13} className={showAll ? 'rotate-180' : ''} />
              </button>
            )}
          </Card>
        </Reveal>
      )}

      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </Section>
  );
}
