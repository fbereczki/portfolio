import { ShieldAlert, Sparkles, Cpu, ArrowRight } from 'lucide-react';
import { Badge, Card, Reveal } from '../landing/ui';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

export function Blockchain() {
  const { t } = useI18n();
  const b = t.blockchain;

  return (
    <Section id="blockchain" kicker={b.kicker} title={b.title} lead={b.lead} tone="sunken">
      {/* Tagline accent line */}
      <Reveal>
        <p className="mb-10 max-w-3xl text-hero font-hero leading-tight tracking-tight text-accent-strong">
          {b.tagline}
        </p>
      </Reveal>

      {/* Two pillars — Academic + Product */}
      <div className="mb-12">
        <p className="mb-4 text-meta font-emph uppercase tracking-[0.2em] text-accent">
          {b.pillars.title}
        </p>
        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          {/* Academic */}
          <Reveal>
            <Card className="h-full p-6 max-md:p-4">
              <Badge tone="neutral" title="Academic proof-of-concept — not a product">
                {b.pillars.academic.tag}
              </Badge>
              <h3 className="mt-3 text-title font-emph leading-tight text-text-strong">
                {b.pillars.academic.title}
              </h3>
              <p className="mt-1 text-dense text-text-muted">{b.pillars.academic.subtitle}</p>
              <div className="mt-4 grid grid-cols-4 gap-2 max-sm:grid-cols-2">
                {b.pillars.academic.stats.map((s) => (
                  <div key={s.label} title={s.tip} className="rounded border border-border bg-surface-2 p-2">
                    <div className="text-meta uppercase tracking-[0.1em] text-text-muted">
                      {s.label}
                    </div>
                    <div className="num mt-1 text-dense font-strong text-text-strong">{s.value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-dense leading-relaxed text-text">{b.pillars.academic.body}</p>
            </Card>
          </Reveal>

          {/* Product */}
          <Reveal delay={0.08}>
            <Card className="h-full p-6 max-md:p-4">
              <Badge tone="ok" title="The principles shipped in a live product">
                {b.pillars.product.tag}
              </Badge>
              <h3 className="mt-3 text-title font-emph leading-tight text-text-strong">
                {b.pillars.product.title}
              </h3>
              <p className="mt-1 text-dense text-text-muted">{b.pillars.product.subtitle}</p>
              <div className="mt-4 grid grid-cols-4 gap-2 max-sm:grid-cols-2">
                {b.pillars.product.stats.map((s) => (
                  <div key={s.label} title={s.tip} className="rounded border border-border bg-surface-2 p-2">
                    <div className="text-meta uppercase tracking-[0.1em] text-text-muted">
                      {s.label}
                    </div>
                    <div className="num mt-1 text-dense font-strong leading-tight text-text-strong">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-dense leading-relaxed text-text">{b.pillars.product.body}</p>
            </Card>
          </Reveal>
        </div>

        {/* Bridge arrow between pillars */}
        <div className="mt-4 flex items-center justify-center gap-3 text-meta uppercase tracking-[0.14em] text-text-muted">
          <span>{b.bridge.from}</span>
          <ArrowRight size={12} className="text-accent" />
          <span>{b.bridge.to}</span>
        </div>
      </div>

      {/* 01 · Hash-chain */}
      <Reveal className="mb-12">
        <h3 className="text-title font-emph leading-tight text-text-strong">{b.hashchain.title}</h3>
        <p className="mt-2 max-w-3xl text-dense leading-relaxed text-text">{b.hashchain.body}</p>
        <div className="mt-4">
          <HashChainSvg legendData={b.hashchain.legendData} legendHash={b.hashchain.legendHash} />
        </div>
      </Reveal>

      {/* 02 · Consensus */}
      <Reveal className="mb-12">
        <h3 className="text-title font-emph leading-tight text-text-strong">{b.consensus.title}</h3>
        <p className="mt-2 max-w-3xl text-dense leading-relaxed text-text-muted">
          {b.consensus.intro}
        </p>
        <Card className="mt-4 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-surface-2 text-meta font-emph uppercase tracking-[0.1em] text-text-muted">
                  <th className="px-4 py-3 font-emph">—</th>
                  <th className="px-4 py-3 font-emph">
                    {/* categorical column hues from the chart palette (K13) */}
                    <div className="flex items-center gap-2 text-accent">
                      <Cpu size={12} /> PoW · GamfCoin
                    </div>
                  </th>
                  <th className="px-4 py-3 font-emph">
                    <div className="flex items-center gap-2 text-seg-2">
                      <Sparkles size={12} /> PoS · GamfCoin
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {b.consensus.rows.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <td className="px-4 py-3 text-meta uppercase tracking-[0.1em] text-text-muted">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 text-dense text-text">{row.pow}</td>
                    <td className="px-4 py-3 text-dense text-text">{row.pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Reveal>

      {/* 03 · Verifiable voting */}
      <Reveal className="mb-12">
        <h3 className="text-title font-emph leading-tight text-text-strong">{b.voting.title}</h3>
        <p className="mt-2 max-w-3xl text-dense leading-relaxed text-text">{b.voting.body}</p>
        <div className="mt-4">
          <VotingFlowSvg steps={b.voting.steps} />
        </div>
      </Reveal>

      {/* Stack pills */}
      <div className="mb-10">
        <p className="mb-3 text-meta font-emph uppercase tracking-[0.2em] text-accent">
          {b.stack.title}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {b.stack.items.map((s) => (
            <span
              key={s}
              className="rounded-[5px] border border-border px-2 py-0.5 text-meta text-text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* PoC disclaimer — warn carries real meaning here: not a product */}
      <Reveal>
        <div className="rounded-md border border-warn/40 bg-warn-quiet p-5 max-md:p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert size={18} className="mt-0.5 shrink-0 text-warn" aria-hidden />
            <div>
              <div className="mb-1 text-meta font-emph uppercase tracking-[0.2em] text-warn">
                {b.disclaimer.tag}
              </div>
              <p
                className="text-dense leading-relaxed text-text"
                dangerouslySetInnerHTML={{
                  __html: b.disclaimer.body.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Hash-chain SVG — 4 blocks with prev_hash arrows (ecosystem tokens)
// ─────────────────────────────────────────────────────────────────────
function HashChainSvg({ legendData, legendHash }: { legendData: string; legendHash: string }) {
  const blocks = [
    { idx: 0, prev: '0x000000', hash: '0x4e7c…d182' },
    { idx: 1, prev: '0x4e7c…d182', hash: '0x9f3a…ab21' },
    { idx: 2, prev: '0x9f3a…ab21', hash: '0xc1f2…7a44' },
    { idx: 3, prev: '0xc1f2…7a44', hash: '0x82d9…0e6b' },
  ];
  const mono = 'ui-monospace, Menlo, monospace';

  return (
    <Card className="overflow-x-auto p-6 max-md:p-4">
      <svg viewBox="0 0 880 200" className="block w-full" style={{ minWidth: 700 }}>
        {/* Genesis label */}
        <text x="20" y="20" fontFamily={mono} fontSize="10" fill="rgb(var(--text-faint-rgb))" letterSpacing="2">
          GENESIS
        </text>
        {/* Blocks */}
        {blocks.map((blk, i) => {
          const x = 20 + i * 215;
          return (
            <g key={i}>
              <rect
                x={x}
                y={40}
                width={180}
                height={130}
                rx={6}
                fill="rgb(var(--surface-2-rgb))"
                stroke="rgb(var(--border-strong-rgb))"
                strokeWidth="1.4"
              />
              {/* Block header */}
              <path
                d={`M${x} ${46} q0 -6 6 -6 h168 q6 0 6 6 v20 h-180 Z`}
                fill="rgb(var(--surface-3-rgb))"
              />
              <text x={x + 12} y={57} fontFamily={mono} fontSize="10" fill="rgb(var(--text-strong-rgb))" letterSpacing="2">
                BLOCK #{blk.idx}
              </text>
              <text x={x + 168} y={57} fontFamily={mono} fontSize="10" fill="rgb(var(--text-faint-rgb))" textAnchor="end">
                +{i * 13}s
              </text>
              {/* prev_hash field */}
              <text x={x + 12} y={84} fontFamily={mono} fontSize="10" fill="rgb(var(--text-muted-rgb))" letterSpacing="1">
                PREV_HASH
              </text>
              <text x={x + 12} y={97} fontFamily={mono} fontSize="10" fill="rgb(var(--text-rgb))">
                {blk.prev}
              </text>
              {/* data field */}
              <text x={x + 12} y={117} fontFamily={mono} fontSize="10" fill="rgb(var(--text-muted-rgb))" letterSpacing="1">
                DATA
              </text>
              <text x={x + 12} y={130} fontSize="10" fill="rgb(var(--text-rgb))">
                tx · {3 + i * 2} entries
              </text>
              {/* hash field — accent */}
              <text x={x + 12} y={150} fontFamily={mono} fontSize="10" fill="rgb(var(--text-muted-rgb))" letterSpacing="1">
                HASH
              </text>
              <text x={x + 12} y={163} fontFamily={mono} fontSize="10" fill="rgb(var(--accent-rgb))" fontWeight="600">
                {blk.hash}
              </text>

              {/* Arrow to next block */}
              {i < blocks.length - 1 && (
                <line
                  x1={x + 180}
                  y1={105}
                  x2={x + 215}
                  y2={105}
                  stroke="rgb(var(--accent-rgb))"
                  strokeWidth="2"
                  markerEnd="url(#chainArrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker
            id="chainArrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="rgb(var(--accent-rgb))" />
          </marker>
        </defs>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-meta uppercase tracking-[0.12em] text-text-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-3 rounded-[2px] border border-border-strong bg-surface-2" />
          {legendData}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-3 rounded-[2px] bg-accent" />
          {legendHash}
        </span>
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Voting flow SVG — 5 step horizontal flow (one accent, K3)
// ─────────────────────────────────────────────────────────────────────
function VotingFlowSvg({ steps }: { steps: ReadonlyArray<{ label: string; sub: string }> }) {
  const stepW = 200;
  const stepH = 96;
  const gap = 28;
  const totalW = steps.length * stepW + (steps.length - 1) * gap;
  const mono = 'ui-monospace, Menlo, monospace';

  return (
    <Card className="overflow-x-auto p-6 max-md:p-4">
      <svg viewBox={`0 0 ${totalW + 40} ${stepH + 40}`} className="block w-full" style={{ minWidth: 880 }}>
        {steps.map((step, i) => {
          const x = 20 + i * (stepW + gap);
          return (
            <g key={i}>
              <rect
                x={x}
                y={20}
                width={stepW}
                height={stepH}
                rx={8}
                fill="rgb(var(--surface-2-rgb))"
                stroke="rgb(var(--accent-rgb))"
                strokeOpacity="0.5"
                strokeWidth="1.4"
              />
              {/* index badge */}
              <circle cx={x + 18} cy={38} r={11} fill="rgb(var(--accent-rgb))" />
              <text
                x={x + 18}
                y={42}
                fontFamily={mono}
                fontSize="10"
                fontWeight="600"
                fill="var(--on-accent)"
                textAnchor="middle"
              >
                {i + 1}
              </text>
              {/* label + sub via foreignObject for proper word-wrap */}
              <foreignObject x={x + 38} y={28} width={stepW - 50} height={stepH - 16}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'rgb(var(--text-strong-rgb))',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: 10,
                    color: 'rgb(var(--text-muted-rgb))',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    lineHeight: 1.4,
                    marginTop: 6,
                  }}
                >
                  {step.sub}
                </div>
              </foreignObject>
              {/* Arrow to next */}
              {i < steps.length - 1 && (
                <line
                  x1={x + stepW}
                  y1={20 + stepH / 2}
                  x2={x + stepW + gap - 4}
                  y2={20 + stepH / 2}
                  stroke="rgb(var(--text-faint-rgb))"
                  strokeWidth="1.5"
                  markerEnd="url(#voteArrow)"
                />
              )}
            </g>
          );
        })}
        <defs>
          <marker
            id="voteArrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="rgb(var(--text-faint-rgb))" />
          </marker>
        </defs>
      </svg>
    </Card>
  );
}
