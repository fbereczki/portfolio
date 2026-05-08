import { ArrowUpRight, Cpu, PlayCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import type { Project } from '../data/projects';

const phasePill: Record<Project['phase'], string> = {
  prod: 'pill-sage',
  test: 'pill-amber',
  dev: 'pill-teal',
};

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t, lang } = useI18n();
  const hasAI = project.ai.length > 0;
  const hasDemo = project.demo !== null;
  const spotlightLabel =
    project.spotlight === 'primary'
      ? lang === 'hu' ? 'Fő fókusz' : 'Primary'
      : project.spotlight === 'secondary'
      ? lang === 'hu' ? 'Második' : 'Secondary'
      : project.spotlight === 'tertiary'
      ? lang === 'hu' ? 'Harmadik' : 'Tertiary'
      : null;

  return (
    <article className="paper-card paper-card-hover group flex flex-col p-6 transition-transform hover:-translate-y-0.5">
      {/* Header strip — initials block, no logo */}
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center border border-ink bg-paper font-mono text-[12px] font-bold tracking-wide text-ink">
          {project.name
            .replace(/[^A-Za-z0-9 ]/g, '')
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')
            .toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="display-serif text-[20px] leading-tight text-ink">{project.name}</h3>
          <p className="mt-0.5 line-clamp-2 font-serif text-[13px] italic leading-snug text-ink-mute">
            {project.tagline[lang]}
          </p>
        </div>
      </div>

      <div className="rule-thin my-4" />

      {/* Meta strip */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={phasePill[project.phase]}>{t.projects.phase[project.phase]}</span>
        {spotlightLabel && <span className="pill-oxblood">★ {spotlightLabel}</span>}
        {hasAI && (
          <span className="pill-ink">
            <Cpu size={9} className="-mt-px" /> {project.ai.length} AI
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-3 font-serif text-[14.5px] leading-relaxed text-ink-soft">
        {project.purpose[lang]}
      </p>

      {/* Stack */}
      <div className="mt-5">
        <div className="label-mono mb-2">— Stack</div>
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 6).map((s) => (
            <span
              key={s}
              className="border border-paper-rule bg-paper-deep/30 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="px-1.5 py-0.5 font-mono text-[10px] text-ink-mute">
              +{project.stack.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 pt-6">
        <button onClick={onOpen} className="btn-ghost-ink flex-1 justify-center">
          {t.projects.readMore}
          <ArrowUpRight size={13} />
        </button>
        {hasDemo && (
          <button onClick={onOpen} className="btn-oxblood justify-center" title={t.projects.runDemo}>
            <PlayCircle size={14} />
          </button>
        )}
      </div>
    </article>
  );
}
