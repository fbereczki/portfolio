import { motion, useReducedMotion } from 'framer-motion';

/* Hand-made SVG charts (playbook §0 — no chart kits). K13: 10px ticks,
   categorical colours from house tokens only. All data is real, ledger-sourced. */

export const SPEEDUP_WEEKS = [
  { week: 'Jun 08', x: 10 },
  { week: 'Jun 15', x: 61 },
  { week: 'Jun 22', x: 81 },
  { week: 'Jun 29', x: 99 },
  { week: 'Jul 06', x: 142 },
  { week: 'Jul 13', x: 46 },
  { week: 'Jul 20', x: 156 },
];

/** Weekly leverage curve ×10 → ×156 (mimir ledger, closed weeks). */
export function SpeedupChart() {
  const reduce = useReducedMotion();
  const W = 560;
  const H = 220;
  const padL = 40;
  const padR = 16;
  const padT = 18;
  const padB = 30;
  const max = 160;
  const stepX = (W - padL - padR) / (SPEEDUP_WEEKS.length - 1);
  const px = (i: number) => padL + i * stepX;
  const py = (v: number) => padT + (H - padT - padB) * (1 - v / max);
  const line = SPEEDUP_WEEKS.map((d, i) => `${i === 0 ? 'M' : 'L'}${px(i).toFixed(1)},${py(d.x).toFixed(1)}`).join(' ');
  const area = `${line} L${px(SPEEDUP_WEEKS.length - 1).toFixed(1)},${py(0)} L${px(0)},${py(0)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Weekly leverage multiplier, ×10 in early June rising to ×156 by late July">
      {[0, 40, 80, 120, 160].map((v) => (
        <g key={v}>
          <line x1={padL} x2={W - padR} y1={py(v)} y2={py(v)} stroke="rgb(var(--border-rgb))" strokeWidth="1" strokeDasharray={v === 0 ? undefined : '2 4'} />
          <text x={padL - 8} y={py(v) + 3} textAnchor="end" fontSize="10" fill="rgb(var(--text-faint-rgb))">
            ×{v}
          </text>
        </g>
      ))}
      {SPEEDUP_WEEKS.map((d, i) => (
        <text key={d.week} x={px(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="rgb(var(--text-faint-rgb))">
          {d.week}
        </text>
      ))}
      <path d={area} fill="rgb(var(--accent-rgb))" opacity="0.1" />
      <motion.path
        d={line}
        fill="none"
        stroke="rgb(var(--accent-rgb))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      />
      {SPEEDUP_WEEKS.map((d, i) => (
        <circle key={d.week} cx={px(i)} cy={py(d.x)} r={i === SPEEDUP_WEEKS.length - 1 ? 3.4 : 2.4} fill="rgb(var(--accent-rgb))">
          <title>{`${d.week}: ×${d.x} — lines added ÷ active hours ÷ 12.5 (calibrated solo baseline)`}</title>
        </circle>
      ))}
      <text x={px(SPEEDUP_WEEKS.length - 1) - 6} y={py(156) - 10} textAnchor="end" fontSize="10" fontWeight="600" fill="rgb(var(--accent-strong-rgb))">
        ×156
      </text>
    </svg>
  );
}

const SEAL_ROUNDS = [
  { slice: 's2', rounds: 5 },
  { slice: 's3', rounds: 3 },
  { slice: 's4', rounds: 2 },
  { slice: 's5', rounds: 2 },
  { slice: 's6', rounds: 2 },
  { slice: 's7', rounds: 1 },
  { slice: 's8', rounds: 1 },
  { slice: 's9', rounds: 3 },
  { slice: 's10', rounds: 1 },
  { slice: 's11', rounds: 1 },
];

/** Review rounds needed to seal each delivery slice — 5 → 1. */
export function SealRoundsChart() {
  const W = 560;
  const H = 190;
  const padL = 28;
  const padR = 12;
  const padT = 14;
  const padB = 28;
  const max = 5;
  const bw = (W - padL - padR) / SEAL_ROUNDS.length;
  const py = (v: number) => padT + (H - padT - padB) * (1 - v / max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Review rounds to seal per delivery slice, falling from 5 to 1">
      {[1, 3, 5].map((v) => (
        <g key={v}>
          <line x1={padL} x2={W - padR} y1={py(v)} y2={py(v)} stroke="rgb(var(--border-rgb))" strokeWidth="1" strokeDasharray="2 4" />
          <text x={padL - 6} y={py(v) + 3} textAnchor="end" fontSize="10" fill="rgb(var(--text-faint-rgb))">
            {v}
          </text>
        </g>
      ))}
      {SEAL_ROUNDS.map((d, i) => {
        const x = padL + i * bw + bw * 0.22;
        const isOutlier = d.slice === 's9';
        return (
          <g key={d.slice}>
            <rect
              x={x}
              y={py(d.rounds)}
              width={bw * 0.56}
              height={py(0) - py(d.rounds)}
              rx="3"
              fill={isOutlier ? 'rgb(var(--seg-2-rgb))' : 'rgb(var(--accent-rgb))'}
              opacity={isOutlier ? 0.85 : 0.9}
            >
              <title>
                {isOutlier
                  ? `${d.slice}: 3 rounds — a genuinely new defect class, not a methodology regression`
                  : `${d.slice}: ${d.rounds} review round${d.rounds > 1 ? 's' : ''} to strict seal`}
              </title>
            </rect>
            <text x={x + bw * 0.28} y={H - 8} textAnchor="middle" fontSize="10" fill="rgb(var(--text-faint-rgb))">
              {d.slice}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** SF-IMPL-1 class: static gates 0/5 vs live E2E 5/5. */
export function CatchRateChart() {
  const rows = [
    { label: 'Static gates', caught: 0, total: 5, cls: 'rgb(var(--seg-3-rgb))' },
    { label: 'Live E2E', caught: 5, total: 5, cls: 'rgb(var(--accent-rgb))' },
  ];
  const W = 560;
  const H = 96;
  const padL = 90;
  const padR = 40;
  const rowH = 40;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="SF-IMPL-1 defect class: static gates caught 0 of 5, live end-to-end verification caught 5 of 5">
      {rows.map((r, ri) => {
        const y = 12 + ri * rowH;
        return (
          <g key={r.label}>
            <text x={padL - 10} y={y + 14} textAnchor="end" fontSize="10" fill="rgb(var(--text-muted-rgb))">
              {r.label}
            </text>
            {Array.from({ length: r.total }, (_, i) => (
              <rect
                key={i}
                x={padL + i * ((W - padL - padR) / 5)}
                y={y}
                width={(W - padL - padR) / 5 - 6}
                height={20}
                rx="3"
                fill={i < r.caught ? r.cls : 'rgb(var(--surface-3-rgb))'}
                stroke="rgb(var(--border-rgb))"
                strokeWidth="1"
              >
                <title>{`${r.label}: caught ${r.caught} of ${r.total} occurrences of the SF-IMPL-1 runtime defect class`}</title>
              </rect>
            ))}
            <text x={W - padR + 8} y={y + 14} fontSize="10" fontWeight="600" fill="rgb(var(--text-rgb))">
              {r.caught}/5
            </text>
          </g>
        );
      })}
    </svg>
  );
}
