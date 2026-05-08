import { ShieldAlert, Sparkles, Cpu, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

export function Blockchain() {
  const { t } = useI18n();
  const b = t.blockchain;

  return (
    <Section id="blockchain" kicker={b.kicker} title={b.title} lead={b.lead} number="06">
      {/* Tagline accent line */}
      <p className="display-serif mb-12 max-w-3xl text-[24px] leading-tight text-ink sm:text-[28px]">
        <span className="accent-italic">{b.tagline}</span>
      </p>

      {/* Two pillars — Academic + Product */}
      <div className="mb-16">
        <div className="label-mono mb-4 text-oxblood">— {b.pillars.title}</div>
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Academic */}
          <article className="paper-card border-l-2 border-amber p-6">
            <div className="mb-2 inline-block bg-amber/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
              {b.pillars.academic.tag}
            </div>
            <h3 className="display-serif text-[22px] leading-tight text-ink">
              {b.pillars.academic.title}
            </h3>
            <p className="mt-1 font-serif text-[14px] italic text-ink-mute">
              {b.pillars.academic.subtitle}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {b.pillars.academic.stats.map((s) => (
                <div key={s.label} className="border border-paper-rule bg-paper-deep/30 p-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                    {s.label}
                  </div>
                  <div className="display-serif mt-0.5 text-[20px] text-amber">{s.value}</div>
                </div>
              ))}
            </div>
            <p className="prose-just mt-4 font-serif text-[14.5px] leading-relaxed text-ink-soft">
              {b.pillars.academic.body}
            </p>
          </article>

          {/* Product */}
          <article className="paper-card border-l-2 border-sage p-6">
            <div className="mb-2 inline-block bg-sage/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-sage">
              {b.pillars.product.tag}
            </div>
            <h3 className="display-serif text-[22px] leading-tight text-ink">
              {b.pillars.product.title}
            </h3>
            <p className="mt-1 font-serif text-[14px] italic text-ink-mute">
              {b.pillars.product.subtitle}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {b.pillars.product.stats.map((s) => (
                <div key={s.label} className="border border-paper-rule bg-paper-deep/30 p-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-mute">
                    {s.label}
                  </div>
                  <div className="display-serif mt-0.5 text-[16px] leading-tight text-sage">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
            <p className="prose-just mt-4 font-serif text-[14.5px] leading-relaxed text-ink-soft">
              {b.pillars.product.body}
            </p>
          </article>
        </div>

        {/* Bridge arrow between pillars */}
        <div className="mt-3 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          <span>2022 academic seed</span>
          <ArrowRight size={12} className="text-oxblood" />
          <span>2026 production</span>
        </div>
      </div>

      {/* 01 · Hash-chain */}
      <div className="mb-16">
        <h3 className="display-serif text-[22px] leading-tight text-ink">
          {b.hashchain.title}
        </h3>
        <p className="prose-just mt-3 max-w-3xl font-serif text-[15px] leading-relaxed text-ink-soft">
          {b.hashchain.body}
        </p>
        <div className="rule-thin my-5" />
        <HashChainSvg legendData={b.hashchain.legendData} legendHash={b.hashchain.legendHash} />
      </div>

      {/* 02 · Consensus */}
      <div className="mb-16">
        <h3 className="display-serif text-[22px] leading-tight text-ink">{b.consensus.title}</h3>
        <p className="prose-just mt-3 max-w-3xl font-serif text-[15px] italic leading-relaxed text-ink-soft">
          {b.consensus.intro}
        </p>
        <div className="paper-card mt-5 overflow-hidden">
          <table className="w-full text-left font-serif text-[14px]">
            <thead className="bg-paper-deep/60 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              <tr>
                <th className="px-4 py-3 font-semibold">—</th>
                <th className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-2 text-oxblood">
                    <Cpu size={12} /> PoW · GamfCoin
                  </div>
                </th>
                <th className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-2 text-teal">
                    <Sparkles size={12} /> PoS · GamfCoin
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {b.consensus.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-t border-paper-rule ${i % 2 === 1 ? 'bg-paper-deep/20' : ''}`}
                >
                  <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-ink">{row.pow}</td>
                  <td className="px-4 py-3 text-ink">{row.pos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 03 · Verifiable voting */}
      <div className="mb-16">
        <h3 className="display-serif text-[22px] leading-tight text-ink">{b.voting.title}</h3>
        <p className="prose-just mt-3 max-w-3xl font-serif text-[15px] leading-relaxed text-ink-soft">
          {b.voting.body}
        </p>
        <div className="rule-thin my-5" />
        <VotingFlowSvg steps={b.voting.steps} />
      </div>

      {/* Stack pills */}
      <div className="mb-12">
        <div className="label-mono mb-3 text-oxblood">— {b.stack.title}</div>
        <div className="flex flex-wrap gap-2">
          {b.stack.items.map((s) => (
            <span
              key={s}
              className="border border-ink/30 bg-paper-deep/40 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* PoC disclaimer — strong */}
      <div
        className="border-2 border-oxblood bg-oxblood/[0.04] p-5"
        style={{ borderLeftWidth: 6 }}
      >
        <div className="flex items-start gap-3">
          <ShieldAlert size={20} className="mt-0.5 shrink-0 text-oxblood" />
          <div>
            <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-oxblood">
              {b.disclaimer.tag}
            </div>
            <p
              className="prose-just font-serif text-[14.5px] leading-relaxed text-ink"
              dangerouslySetInnerHTML={{
                __html: b.disclaimer.body.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Hash-chain SVG — 4 blocks with prev_hash arrows
// ─────────────────────────────────────────────────────────────────────
function HashChainSvg({ legendData, legendHash }: { legendData: string; legendHash: string }) {
  const blocks = [
    { idx: 0, prev: '0x000000', hash: '0x4e7c…d182' },
    { idx: 1, prev: '0x4e7c…d182', hash: '0x9f3a…ab21' },
    { idx: 2, prev: '0x9f3a…ab21', hash: '0xc1f2…7a44' },
    { idx: 3, prev: '0xc1f2…7a44', hash: '0x82d9…0e6b' },
  ];

  return (
    <div className="paper-card overflow-x-auto p-6">
      <svg viewBox="0 0 880 200" className="block w-full" style={{ minWidth: 700 }}>
        {/* Genesis label */}
        <text
          x="20"
          y="20"
          fontFamily='"JetBrains Mono", monospace'
          fontSize="10"
          fill="var(--ink-mute)"
          letterSpacing="2"
        >
          GENESIS
        </text>
        {/* Blocks */}
        {blocks.map((b, i) => {
          const x = 20 + i * 215;
          return (
            <g key={i}>
              <rect
                x={x}
                y={40}
                width={180}
                height={130}
                fill="var(--paper-shadow)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              {/* Block header */}
              <rect x={x} y={40} width={180} height={26} fill="var(--ink)" />
              <text
                x={x + 12}
                y={57}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="10"
                fill="var(--paper)"
                letterSpacing="2"
              >
                BLOCK #{b.idx}
              </text>
              <text
                x={x + 168}
                y={57}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="9"
                fill="var(--paper-rule)"
                textAnchor="end"
              >
                +{i * 13}s
              </text>
              {/* prev_hash field */}
              <text
                x={x + 12}
                y={84}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="8.5"
                fill="var(--ink-mute)"
                letterSpacing="1"
              >
                PREV_HASH
              </text>
              <text
                x={x + 12}
                y={97}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="11"
                fill="var(--ink-soft)"
              >
                {b.prev}
              </text>
              {/* data field */}
              <text
                x={x + 12}
                y={117}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="8.5"
                fill="var(--ink-mute)"
                letterSpacing="1"
              >
                DATA
              </text>
              <text
                x={x + 12}
                y={130}
                fontFamily="Spectral, serif"
                fontSize="11"
                fontStyle="italic"
                fill="var(--ink-soft)"
              >
                tx · {3 + i * 2} entries
              </text>
              {/* hash field — oxblood accent */}
              <text
                x={x + 12}
                y={150}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="8.5"
                fill="var(--ink-mute)"
                letterSpacing="1"
              >
                HASH
              </text>
              <text
                x={x + 12}
                y={163}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="11"
                fill="var(--oxblood)"
                fontWeight="600"
              >
                {b.hash}
              </text>

              {/* Arrow to next block */}
              {i < blocks.length - 1 && (
                <g>
                  <line
                    x1={x + 180}
                    y1={105}
                    x2={x + 215}
                    y2={105}
                    stroke="var(--oxblood)"
                    strokeWidth="2"
                    markerEnd="url(#chainArrow)"
                  />
                </g>
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
            <path d="M0,0 L0,6 L9,3 z" fill="var(--oxblood)" />
          </marker>
        </defs>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-3 bg-paper-shadow border border-ink" />
          {legendData}
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-3 bg-oxblood" />
          {legendHash}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Voting flow SVG — 5 step horizontal flow
// ─────────────────────────────────────────────────────────────────────
function VotingFlowSvg({ steps }: { steps: ReadonlyArray<{ label: string; sub: string }> }) {
  const stepW = 200;
  const stepH = 96;
  const gap = 28;
  const totalW = steps.length * stepW + (steps.length - 1) * gap;
  const tones = ['var(--teal)', 'var(--amber)', 'var(--ink-mute)', 'var(--oxblood)', 'var(--sage)'];

  return (
    <div className="paper-card overflow-x-auto p-6">
      <svg
        viewBox={`0 0 ${totalW + 40} ${stepH + 40}`}
        className="block w-full"
        style={{ minWidth: 880 }}
      >
        {steps.map((step, i) => {
          const x = 20 + i * (stepW + gap);
          const tone = tones[i] ?? 'var(--ink-mute)';
          return (
            <g key={i}>
              <rect
                x={x}
                y={20}
                width={stepW}
                height={stepH}
                fill="var(--paper-shadow)"
                stroke={tone}
                strokeWidth="2"
              />
              {/* index badge — moved to top-left corner */}
              <circle cx={x + 18} cy={38} r={11} fill={tone} />
              <text
                x={x + 18}
                y={42}
                fontFamily='"JetBrains Mono", monospace'
                fontSize="11"
                fontWeight="600"
                fill="var(--paper)"
                textAnchor="middle"
              >
                {i + 1}
              </text>
              {/* label + sub via foreignObject for proper word-wrap */}
              <foreignObject x={x + 38} y={28} width={stepW - 50} height={stepH - 16}>
                <div
                  style={{
                    fontFamily: 'Fraunces, Georgia, serif',
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--ink)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                    marginTop: 0,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 9.5,
                    color: 'var(--ink-mute)',
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
                  stroke="var(--ink-mute)"
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
            <path d="M0,0 L0,6 L9,3 z" fill="var(--ink-mute)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
