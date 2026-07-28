import { useEffect } from 'react';
import { X, Cpu, ListChecks, Target, PlayCircle } from 'lucide-react';
import { Badge, Card } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import type { Project } from '../data/projects';
import { BeaconDemo } from './demos/BeaconDemo';
import { MimirDemo } from './demos/MimirDemo';
import { CodeWitnessCockpit } from './demos/CodeWitnessCockpit';
import { CivixDemo } from './demos/CivixDemo';
import { MagusDemo } from './demos/MagusDemo';
import { PgpDemo } from './demos/PgpDemo';
import { RealtimeErrorsDemo } from './demos/RealtimeErrorsDemo';
import { WpPlannerDemo } from './demos/WpPlannerDemo';
import { BlockchainDemo } from './demos/BlockchainDemo';

/* K3: badge colours carry meaning — ok = live production, neutral = in
   progress, accent = key evidence. */
const phaseTone: Record<Project['phase'], 'ok' | 'neutral'> = {
  prod: 'ok',
  test: 'neutral',
  dev: 'neutral',
};

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, lang } = useI18n();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const Demo = renderDemo(project.demo);
  const spotlightLabel = project.spotlight ? t.projects.spotlight[project.spotlight] : null;
  const isKeyEvidence = project.spotlight === 'primary';

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-md border border-border bg-bg shadow-panel">
        {/* Sticky masthead */}
        <div className="sticky top-0 z-10 border-b border-border bg-bg/90 px-6 py-4 backdrop-blur-md sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-meta uppercase tracking-[0.2em] text-text-faint">
                {t.projects.dossier}
              </div>
              <h3 className="mt-1 text-hero font-hero leading-tight tracking-tight text-text-strong">
                {project.name}
              </h3>
              <p className="mt-1 text-dense text-text-muted">{project.tagline[lang]}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {isKeyEvidence ? (
                  <Badge tone="accent" title={t.projects.statusTip}>
                    ★ {t.projects.status.key}
                  </Badge>
                ) : (
                  <Badge tone={phaseTone[project.phase]} title={t.projects.statusTip}>
                    {t.projects.phase[project.phase]}
                  </Badge>
                )}
                {!isKeyEvidence && spotlightLabel && <Badge tone="neutral">{spotlightLabel}</Badge>}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex size-9 shrink-0 items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-border-strong hover:text-text-strong"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body — 2-column on lg */}
        <div className="grid grid-cols-12 gap-8 px-6 py-8 max-lg:gap-6 sm:px-8">
          {/* main column */}
          <div className="col-span-8 space-y-8 max-lg:col-span-12">
            <Block icon={<Target size={14} />} title={t.projects.sections.purpose}>
              <p className="text-body leading-relaxed text-text">{project.purpose[lang]}</p>
            </Block>

            {project.ai.length > 0 && (
              <Block icon={<Cpu size={14} />} title={t.projects.sections.ai}>
                <ul className="space-y-2">
                  {project.ai.map((item) => (
                    <li key={item} className="flex gap-2.5 text-dense leading-relaxed text-text">
                      <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block icon={<ListChecks size={14} />} title={t.projects.sections.highlights}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.highlights[lang].map((h) => (
                  <li key={h} className="flex gap-2.5 text-dense leading-relaxed text-text">
                    <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* sidebar — meta block */}
          <aside className="col-span-4 space-y-4 max-lg:col-span-12">
            <Card className="p-4">
              <div className="mb-3 text-meta font-emph uppercase tracking-[0.14em] text-accent">
                {t.projects.sections.stack}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-[5px] border border-border px-2 py-0.5 text-meta text-text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Card>

            {Demo && (
              <div className="rounded-md border border-accent-line bg-accent-quiet p-4">
                <div className="flex items-center gap-2 text-accent">
                  <PlayCircle size={14} />
                  <span className="text-meta font-emph uppercase tracking-[0.14em]">
                    {t.projects.runDemo}
                  </span>
                </div>
                <p className="mt-2 text-dense text-text-muted">
                  An interactive demo with mock data — see below.
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Demo — full width strip. The demos themselves are untouched
            self-styled product replicas; only this frame is ecosystem-dark. */}
        {Demo && (
          <div className="px-6 pb-8 sm:px-8">
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-meta font-emph uppercase tracking-[0.14em] text-accent">
                {t.projects.runDemo} · {project.demo}
              </span>
              <span
                className="text-meta uppercase tracking-[0.14em] text-text-faint"
                title="Every demo runs fully client-side on mock data — no backend, nothing leaves the page"
              >
                {t.projects.mock}
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-md border border-border bg-surface">
              <Demo />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Block({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2 border-b border-border pb-3 text-accent">
        {icon}
        <span className="text-meta font-emph uppercase tracking-[0.14em]">{title}</span>
      </div>
      {children}
    </div>
  );
}

function renderDemo(kind: Project['demo']): React.FC | null {
  switch (kind) {
    case 'codewitness-frontend':
      return CodeWitnessCockpit;
    case 'civix':
      return CivixDemo;
    case 'beacon':
      return BeaconDemo;
    case 'mimir':
      return MimirDemo;
    case 'magus':
      return MagusDemo;
    case 'pgp':
      return PgpDemo;
    case 'realtime-errors':
      return RealtimeErrorsDemo;
    case 'wp-planner':
      return WpPlannerDemo;
    case 'blockchain':
      return BlockchainDemo;
    default:
      return null;
  }
}
