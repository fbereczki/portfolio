import { useState } from 'react';
import {
  CheckCircle,
  ShieldCheck,
  Bot,
  User,
  GitCommit,
  FileSignature,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// Custom traceability demo — line-blame view + audit log + HMAC chain.
// Shows the CodeWitness value prop: every AI-generated line has provenance.
// Linear-inspired SaaS palette (sourced from PromptLensPlatform/.../design-system.ts)

const C = {
  bgDeep: '#0B0F19',
  bgMain: '#10141F',
  bgCard: '#12172A',
  bgElevated: '#161B30',
  border: '#1E2438',
  text: '#EDEDEF',
  textSecondary: '#8A8A96',
  textMuted: '#52525B',
  accent: '#5B7FFF',
  accentSubtle: '#5B7FFF20',
  accentWash: '#5B7FFF0A',
  gold: '#F59E0B',
  goldSubtle: '#F59E0B20',
  green: '#10B981',
  greenSubtle: '#10B98126',
  red: '#EF4444',
  rose: '#F43F5E',
};

const FONT = '"Inter", -apple-system, "Segoe UI", sans-serif';
const MONO = '"JetBrains Mono", "Fira Code", monospace';

type Author = 'human' | 'ai' | 'mixed';
type Line = {
  n: number;
  code: string;
  by: Author;
  agent?: string;
  prompt?: string;
  ts?: string;
};

const LINES: Line[] = [
  { n: 1, code: 'export function verifyToken(token: string): AuthResult {', by: 'human', ts: '08:14' },
  { n: 2, code: '  const session = sessionStore.lookup(token);', by: 'human', ts: '08:14' },
  { n: 3, code: '  if (!session || session.revoked) {', by: 'ai', agent: 'claude-opus-4.7', prompt: 'add session-revocation guard', ts: '08:21' },
  { n: 4, code: '    return { ok: false, reason: \'invalid_session\' };', by: 'ai', agent: 'claude-opus-4.7', prompt: 'add session-revocation guard', ts: '08:21' },
  { n: 5, code: '  }', by: 'ai', agent: 'claude-opus-4.7', prompt: 'add session-revocation guard', ts: '08:21' },
  { n: 6, code: '  if (session.expiresAt < Date.now()) {', by: 'mixed', agent: 'cursor-tab', ts: '08:23' },
  { n: 7, code: '    metrics.increment(\'auth.expired\');', by: 'ai', agent: 'claude-opus-4.7', prompt: 'emit audit event on hash(token), see ADR-008', ts: '08:24' },
  { n: 8, code: '    return { ok: false, reason: \'expired\' };', by: 'human', ts: '08:25' },
  { n: 9, code: '  }', by: 'human', ts: '08:25' },
  { n: 10, code: '  audit.emit({ type: \'auth.verify\', tokenHash: hash(token) });', by: 'ai', agent: 'claude-opus-4.7', prompt: 'emit audit event on hash(token), see ADR-008', ts: '08:26' },
  { n: 11, code: '  return { ok: true, userId: session.userId };', by: 'human', ts: '08:27' },
  { n: 12, code: '}', by: 'human', ts: '08:14' },
];

const TIMELINE = [
  { ts: '08:14', icon: GitCommit, label: 'Session opened', detail: 'Branch: refactor/auth-mw · Commit base 326015a' },
  { ts: '08:18', icon: User, label: 'BEAM gate: PLAN', detail: 'fbereczki advanced PLAN → CODE · operation_scope=[Edit,Bash]' },
  { ts: '08:21', icon: Bot, label: 'Prompt → claude-opus-4.7', detail: '"add session-revocation guard" · 5 lines added (3–5)' },
  { ts: '08:23', icon: Sparkles, label: 'cursor-tab completion', detail: 'Line 6: expiresAt comparison · accepted by human' },
  { ts: '08:26', icon: Bot, label: 'Prompt → claude-opus-4.7', detail: '"emit audit event on hash(token), see ADR-008" · lines 7, 10' },
  { ts: '08:31', icon: ShieldCheck, label: 'GUARD pattern check', detail: 'GP-014 (raw token logging) — PASS · GP-021 (hash-only audit) — PASS' },
  { ts: '08:32', icon: FileSignature, label: 'HMAC chain anchored', detail: 'Event 0x9f3a…ab21 · prev=0x4e7c…d182 · Ed25519 signed' },
];

const SCORE = { complexity: 8.4, drift: 1.8, ai: 64, human: 36 };

export function CodeWitnessFrontend() {
  const { lang } = useI18n();
  const [hover, setHover] = useState<number | null>(null);
  const focused = hover !== null ? LINES[hover - 1] : null;

  return (
    <div
      style={{
        background: C.bgDeep,
        color: C.text,
        fontFamily: FONT,
        minHeight: 720,
      }}
    >
      {/* Topbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 22px',
          background: C.bgMain,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: C.accent,
              display: 'grid',
              placeItems: 'center',
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            CW
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500 }}>Session cw_8f3a21 · auth-refactor</div>
            <div
              style={{
                fontSize: 11,
                color: C.textSecondary,
                marginTop: 1,
                fontFamily: MONO,
                letterSpacing: '0.04em',
              }}
            >
              src/auth/middleware.ts · {LINES.length} lines · 7 events captured
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Stat label="Score" value="92" tone={C.green} />
          <Stat label="Complexity" value={SCORE.complexity.toFixed(1)} tone={C.text} />
          <Stat label="Drift" value={`${SCORE.drift}%`} tone={C.green} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px' }}>
        {/* Left: code with line-blame */}
        <div style={{ padding: '20px 22px', background: C.bgDeep }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: C.textSecondary,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              {lang === 'hu' ? 'Sor-szintű attribúció' : 'Line-level attribution'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11 }}>
              <Legend swatch={C.green} text="human" />
              <Legend swatch={C.accent} text="AI" />
              <Legend swatch={C.gold} text="mixed" />
            </div>
          </div>

          <div
            style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              overflow: 'hidden',
            }}
          >
            {LINES.map((line) => {
              const tone =
                line.by === 'human' ? C.green : line.by === 'ai' ? C.accent : C.gold;
              const isHover = hover === line.n;
              return (
                <div
                  key={line.n}
                  onMouseEnter={() => setHover(line.n)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 4px 1fr',
                    fontFamily: MONO,
                    fontSize: 12.5,
                    lineHeight: '24px',
                    background: isHover ? C.bgElevated : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 80ms',
                  }}
                >
                  <span style={{ textAlign: 'right', paddingRight: 8, color: C.textMuted, userSelect: 'none' }}>
                    {line.n}
                  </span>
                  <span style={{ background: tone, opacity: isHover ? 1 : 0.7 }} />
                  <span style={{ paddingLeft: 12, color: C.text, whiteSpace: 'pre' }}>
                    {syntax(line.code)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hovered-line detail */}
          <div
            style={{
              marginTop: 12,
              minHeight: 84,
              padding: '12px 14px',
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              transition: 'opacity 120ms',
              opacity: focused ? 1 : 0.5,
            }}
          >
            {focused ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        background:
                          focused.by === 'human'
                            ? C.greenSubtle
                            : focused.by === 'ai'
                            ? C.accentSubtle
                            : C.goldSubtle,
                        color:
                          focused.by === 'human'
                            ? C.green
                            : focused.by === 'ai'
                            ? C.accent
                            : C.gold,
                        fontFamily: MONO,
                        fontSize: 9.5,
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        borderRadius: 3,
                      }}
                    >
                      {focused.by}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>Line {focused.n}</span>
                    {focused.agent && (
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          color: C.textSecondary,
                        }}
                      >
                        · {focused.agent}
                      </span>
                    )}
                  </div>
                  {focused.ts && (
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        color: C.textMuted,
                        letterSpacing: '0.04em',
                      }}
                    >
                      08:23 · 2026-05-08
                    </span>
                  )}
                </div>
                {focused.prompt && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: '8px 10px',
                      background: C.bgDeep,
                      border: `1px solid ${C.border}`,
                      borderRadius: 4,
                      fontFamily: MONO,
                      fontSize: 11.5,
                      color: C.textSecondary,
                      fontStyle: 'italic',
                    }}
                  >
                    <span style={{ color: C.gold }}>prompt</span>{' '}
                    <span style={{ color: C.text }}>"{focused.prompt}"</span>
                  </div>
                )}
                {focused.by === 'human' && (
                  <div style={{ marginTop: 8, fontSize: 12, color: C.textSecondary }}>
                    {lang === 'hu'
                      ? 'Humán szerző · nincs AI-prompt erre a sorra. Felelősség: senior review.'
                      : 'Human author · no AI prompt for this line. Accountability: senior review.'}
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  fontStyle: 'italic',
                  textAlign: 'center',
                  paddingTop: 18,
                }}
              >
                {lang === 'hu'
                  ? '← Vidd az egeret egy sor fölé a teljes attribúcióhoz'
                  : '← Hover any line above for full attribution'}
              </div>
            )}
          </div>
        </div>

        {/* Right: timeline */}
        <aside
          style={{
            background: C.bgMain,
            borderLeft: `1px solid ${C.border}`,
            padding: '20px 18px',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.textSecondary,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            {lang === 'hu' ? 'Audit-trail · esemény-napló' : 'Audit trail · event log'}
          </div>

          <div style={{ position: 'relative' }}>
            {/* timeline rail */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 7,
                width: 2,
                background: C.border,
              }}
            />
            {TIMELINE.map((ev, i) => {
              const Icon = ev.icon;
              const last = i === TIMELINE.length - 1;
              return (
                <div
                  key={ev.ts + ev.label}
                  style={{
                    position: 'relative',
                    paddingLeft: 28,
                    marginBottom: last ? 0 : 14,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 2,
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      background: last ? C.accent : C.bgCard,
                      border: `1px solid ${last ? C.accent : C.border}`,
                      display: 'grid',
                      placeItems: 'center',
                      color: last ? '#fff' : C.textSecondary,
                    }}
                  >
                    <Icon size={9} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      color: C.textMuted,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {ev.ts} · 2026-05-08
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 1 }}>{ev.label}</div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: C.textSecondary,
                      marginTop: 2,
                      lineHeight: 1.45,
                    }}
                  >
                    {ev.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* HMAC chain summary */}
          <div
            style={{
              marginTop: 22,
              padding: '12px 14px',
              border: `1px solid ${C.gold}40`,
              background: C.goldSubtle,
              borderRadius: 6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.gold }}>
              <CheckCircle size={11} />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                HMAC chain · verified
              </span>
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10.5,
                color: C.textSecondary,
                marginTop: 6,
                lineHeight: 1.7,
              }}
            >
              hash &nbsp;&nbsp;0x9f3a…ab21
              <br />
              prev &nbsp;&nbsp;0x4e7c…d182
              <br />
              sign &nbsp;&nbsp;Ed25519 ✓
              <br />
              kdf &nbsp;&nbsp;&nbsp;Argon2id
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div
      style={{
        padding: '4px 10px',
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 8.5,
          color: C.textMuted,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: tone, marginTop: 1 }}>
        {value}
      </div>
    </div>
  );
}

function Legend({ swatch, text }: { swatch: string; text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: swatch }} />
      <span style={{ fontFamily: MONO, fontSize: 10, color: C.textSecondary, letterSpacing: '0.06em' }}>
        {text}
      </span>
    </span>
  );
}

function syntax(line: string): string | React.ReactNode {
  // Simple TS-ish coloring: keywords + strings + comments
  const tokens = line.split(/(\s+|"[^"]*"|'[^']*'|\/\/.*$|[(){}[\];,.])/);
  return tokens.map((t, i) => {
    if (!t) return null;
    if (/^"|^'/.test(t))
      return (
        <span key={i} style={{ color: '#86EFAC' }}>
          {t}
        </span>
      );
    if (/^\/\//.test(t))
      return (
        <span key={i} style={{ color: C.textMuted, fontStyle: 'italic' }}>
          {t}
        </span>
      );
    if (/^(export|function|const|let|return|if|true|false|null|undefined)$/.test(t))
      return (
        <span key={i} style={{ color: '#A78BFA' }}>
          {t}
        </span>
      );
    if (/^(string|boolean|number|AuthResult)$/.test(t))
      return (
        <span key={i} style={{ color: '#FBBF24' }}>
          {t}
        </span>
      );
    return (
      <span key={i} style={{ color: C.text }}>
        {t}
      </span>
    );
  });
}
