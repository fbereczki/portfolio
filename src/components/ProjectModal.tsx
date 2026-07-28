import { useEffect } from 'react';
import { X, Cpu, ListChecks, Target, PlayCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import type { Project } from '../data/projects';
import { BeaconCharts } from './demos/BeaconCharts';
import { CodeWitnessFrontend } from './demos/CodeWitnessFrontend';
import { CivixDemo } from './demos/CivixDemo';
import { MagusDemo } from './demos/MagusDemo';
import { PgpDemo } from './demos/PgpDemo';
import { RealtimeErrorsDemo } from './demos/RealtimeErrorsDemo';
import { WpPlannerDemo } from './demos/WpPlannerDemo';
import { BlockchainDemo } from './demos/BlockchainDemo';

/* Stamp colours carry meaning: sage = live/closed, amber = in progress. */
const phasePill: Record<Project['phase'], string> = {
  prod: 'pill-sage',
  test: 'pill-amber',
  dev: 'pill-amber',
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
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-ink bg-paper shadow-paper-hover">
        {/* Sticky masthead */}
        <div className="sticky top-0 z-10 border-b-[3px] border-double border-ink bg-paper px-6 py-4 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                  {t.projects.dossier} · No. {project.id}
                </div>
                <h3 className="display-serif text-[28px] leading-tight text-ink sm:text-[34px]">
                  {project.name}
                </h3>
                <p className="mt-1 font-serif text-[14px] italic text-ink-mute">
                  {project.tagline[lang]}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {isKeyEvidence ? (
                    <span className="pill-oxblood" title={t.projects.statusTip}>
                      ★ {t.projects.status.key}
                    </span>
                  ) : (
                    <span className={phasePill[project.phase]} title={t.projects.statusTip}>
                      {t.projects.phase[project.phase]}
                    </span>
                  )}
                  {!isKeyEvidence && spotlightLabel && (
                    <span className="pill-ink">{spotlightLabel}</span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center border border-ink bg-paper text-ink hover:bg-ink hover:text-paper"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body — editorial 2-column on lg */}
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-12 lg:gap-10">
          {/* main column */}
          <div className="lg:col-span-8 space-y-8">
            <Block icon={<Target size={14} />} title={t.projects.sections.purpose}>
              <p className="prose-just font-serif text-[16px] leading-[1.8] text-ink">
                {project.purpose[lang]}
              </p>
            </Block>

            {project.ai.length > 0 && (
              <Block icon={<Cpu size={14} />} title={t.projects.sections.ai}>
                <ul className="space-y-2">
                  {project.ai.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 font-serif text-[14.5px] leading-relaxed text-ink-soft"
                    >
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block icon={<ListChecks size={14} />} title={t.projects.sections.highlights}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.highlights[lang].map((h) => (
                  <li
                    key={h}
                    className="flex gap-3 font-serif text-[14.5px] leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* sidebar — meta block */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="paper-card p-5">
              <div className="label-mono mb-3 text-oxblood">— {t.projects.sections.stack}</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-paper-rule bg-paper-deep/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {Demo && (
              <div className="border border-oxblood bg-oxblood/[0.03] p-4">
                <div className="flex items-center gap-2 text-oxblood">
                  <PlayCircle size={14} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    — {t.projects.runDemo}
                  </span>
                </div>
                <p className="mt-2 font-serif text-[12.5px] italic text-ink-mute">
                  {lang === 'hu'
                    ? 'Interaktív demó mock-adatokkal — ld. lent.'
                    : 'An interactive demo with mock data — see below.'}
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Demo — full width strip */}
        {Demo && (
          <div className="px-6 pb-8 sm:px-8">
            <div className="rule-double mb-4" />
            <div className="flex items-center justify-between">
              <span className="label-mono text-oxblood">
                — {t.projects.runDemo} · {project.demo}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                {t.projects.mock}
              </span>
            </div>
            <div className="rule-double mt-4" />
            <div className="mt-4 border border-paper-rule bg-paper">
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
      <div className="mb-3 flex items-center gap-2 text-oxblood">
        {icon}
        <span className="label-mono-ink">— {title}</span>
      </div>
      <div className="rule-thin mb-4" />
      {children}
    </div>
  );
}

function renderDemo(kind: Project['demo']): React.FC | null {
  switch (kind) {
    case 'codewitness-frontend':
      return CodeWitnessFrontend;
    case 'civix':
      return CivixDemo;
    case 'beacon':
      return BeaconCharts;
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
