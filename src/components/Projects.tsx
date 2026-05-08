import { useMemo, useState } from 'react';
import { useI18n } from '../i18n/I18nProvider';
import { projects, type Project } from '../data/projects';
import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';

type Filter = 'all' | 'prod' | 'dev' | 'ai';

export function Projects() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filter === 'all') return true;
      if (filter === 'prod') return p.phase === 'prod';
      if (filter === 'dev') return p.phase === 'dev' || p.phase === 'test';
      if (filter === 'ai') return p.tags.some((tag) => tag === 'ai' || tag === 'mcp' || tag === 'rag');
      return true;
    });
  }, [filter]);

  const open: Project | undefined = projects.find((p) => p.id === openId);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.projects.filters.all },
    { key: 'prod', label: t.projects.filters.prod },
    { key: 'dev', label: t.projects.filters.dev },
    { key: 'ai', label: t.projects.filters.ai },
  ];

  return (
    <Section
      id="projects"
      kicker={t.projects.kicker}
      title={t.projects.title}
      lead={t.projects.lead}
      number="08"
    >
      <div className="mb-10 flex items-center gap-3">
        <span className="label-mono">— Filter</span>
        <div className="flex flex-wrap gap-0">
          {filters.map((f, i) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
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
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </Section>
  );
}
