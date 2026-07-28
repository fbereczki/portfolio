import { useState } from 'react';
import { BrainCircuit, CornerDownLeft, Search } from 'lucide-react';
import { Badge, Card } from '../../landing/ui';
import { SpeedupChart } from '../../landing/charts';
import { useI18n } from '../../i18n/I18nProvider';

/* Mimir demo — every figure here is real, taken from the reference install's
   own ledger (the same numbers the landing evidence section publishes). The
   recall panel replays an actual mimir_search result shape; the blocks listed
   are real stored blocks, quoted by title and type. */

const STATS = [
  {
    label: 'Captured events',
    value: '≈97.5k',
    verdict: 'all from the deterministic hook — no model cooperation needed',
  },
  {
    label: 'Peak weekly leverage',
    value: '×156',
    verdict: 'computed from lines, hours and agent share on the ledger itself',
  },
  {
    label: 'Re-prompt rate',
    value: '21.7% → 2.7%',
    verdict: 'fewer corrections per unit of output as the memory compounds',
  },
];

const RECALL_HITS = [
  {
    title: 'Your Week: Leverage peaked at x156 speedup',
    type: 'document',
    workspace: 'default',
    excerpt:
      '120.8k lines across 62 active hours with 81% of work flowing through agents. That x156 speedup is 10% faster than last week’s x142, despite 26 fewer hours logged.',
  },
  {
    title: 's6-review-engine — rounds-to-seal = 2, SF-IMPL-1 prevented entirely',
    type: 'document',
    workspace: 'cw-v3',
    excerpt:
      'The first slices where the accumulated methodology prevented the defect class at implementation time, rather than catching it later.',
  },
  {
    title: 'Branding: the product is CodeWitness, the company is imwy.ai',
    type: 'project',
    workspace: 'cw-v3',
    excerpt:
      'Owner-set decision, recalled automatically whenever a surface needs company or product attribution.',
  },
];

export function MimirDemo() {
  const { lang } = useI18n();
  const [query, setQuery] = useState('leverage report');
  const [submitted, setSubmitted] = useState('leverage report');

  return (
    <div className="flex flex-col bg-bg-sunken">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2.5">
          <BrainCircuit size={13} className="shrink-0 text-accent" />
          <span className="truncate text-meta font-emph uppercase tracking-[0.14em] text-text-muted">
            Mimir · memory ledger · figures from the reference install
          </span>
        </span>
        <a
          href="https://imwy.ai/#mimir"
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 text-meta font-emph uppercase tracking-[0.14em] text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
        >
          imwy.ai/#mimir
        </a>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {STATS.map((s) => (
            <Card key={s.label} className="flex flex-col p-4">
              <span className="text-meta font-emph uppercase tracking-[0.07em] text-text-muted">
                {s.label}
              </span>
              <span className="num mt-2 text-value font-value leading-none tracking-tight text-text-strong">
                {s.value}
              </span>
              <span className="mt-3 flex gap-2 border-t border-border pt-3 text-dense leading-snug text-text">
                <span className="shrink-0 font-emph text-accent">→</span>
                {s.verdict}
              </span>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <h4 className="text-title font-emph text-text-strong">Weekly leverage, six weeks</h4>
            <Badge tone="accent" title="Lines added ÷ active hours ÷ 12.5 — a calibrated solo baseline, published as an estimate.">
              ledger-computed
            </Badge>
          </div>
          <div className="px-4 py-3">
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <SpeedupChart />
              </div>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-border px-4 py-3">
            <h4 className="text-title font-emph text-text-strong">Déjà-vu recall</h4>
            <p className="mt-1 text-dense text-text-muted">
              {lang === 'hu'
                ? 'Hibrid keresés: teljes szöveg ⊕ vektor, RRF-fúzióval. A találatok valós, tárolt blokkok.'
                : 'Hybrid search: full-text ⊕ vector, fused with RRF. The hits below are real stored blocks.'}
            </p>
          </div>
          <div className="px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(query.trim() || 'leverage report');
              }}
              className="flex items-center gap-2"
            >
              <span className="flex h-9 flex-1 items-center gap-2 rounded border border-border bg-surface-2 px-3">
                <Search size={14} className="shrink-0 text-text-faint" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="mimir_search query"
                  className="w-full bg-transparent text-dense text-text-strong outline-none placeholder:text-text-faint"
                  placeholder="mimir_search …"
                />
              </span>
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1.5 rounded bg-accent px-3 text-dense font-emph text-on-accent transition-opacity hover:opacity-90"
              >
                {lang === 'hu' ? 'Keresés' : 'Recall'}
                <CornerDownLeft size={13} />
              </button>
            </form>

            <p className="mt-3 font-mono text-meta text-text-faint">
              mimir_search(q: “{submitted}”) → {RECALL_HITS.length} hits
            </p>

            <ul className="mt-2 space-y-2">
              {RECALL_HITS.map((h) => (
                <li key={h.title} className="rounded border border-border bg-surface-2 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="neutral" title={`Block type: ${h.type}`}>{h.type}</Badge>
                    <Badge tone="neutral" title="Workspace the block belongs to">{h.workspace}</Badge>
                    <span className="text-dense font-emph text-text-strong">{h.title}</span>
                  </div>
                  <p className="mt-1.5 text-dense leading-snug text-text-muted">{h.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="flex gap-2 text-dense leading-snug text-text-muted">
          <span className="shrink-0 font-emph text-accent">→</span>
          {lang === 'hu'
            ? 'A keresőmező él, de a találatkészlet rögzített: valódi, tárolt blokkok idézve — a demó nem hív élő backendet, és nem is talál ki eredményt.'
            : 'The search box is live, but the result set is fixed: real stored blocks, quoted verbatim. This demo calls no backend, and it invents nothing.'}
        </p>
      </div>
    </div>
  );
}
