import { useState } from 'react';
import { Check, Copy, Layers, Scale, Workflow, Smartphone } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { Section } from './Section';

// Real example from SIL_Specification_v1.1.docx §5.3 (Mobile Application Auth)
const EXAMPLE = `# ─── SIMPLE LAYER ─── any stakeholder can read and validate this

INTENT: UserLogin
  business_goal: User securely accesses their own data
  user_value:    "I can sign in and see my things"
  risk:          "If broken — zero active users"

SCENARIO: SuccessfulLogin
  given: user exists  AND  account not locked
  when:  user submits valid email + password
  then:  user sees their dashboard
         AND  session created in secure storage

# ─── STRICT LAYER ─── developer / AI / test engineer uses this

FLOW: login
  precondition: STATE = UNAUTHENTICATED  AND  failed_attempts < 5
  steps:
    1. Validate email (RFC5322) + password (min 8 chars)
    2. POST /auth/login                  [HTTPS, cert-pinned]
    3. SET STATE → AUTHENTICATED
  postcondition: STATE = AUTHENTICATED
                 AND  AuthSession stored in secure enclave
  error_cases:
    - invalid credentials       → increment failed_attempts
    - failed_attempts >= 5      → SET STATE → LOCKED
    - network error             → retry-with-backoff (3 attempts)

ENTITY: AuthSession
  fields:
    user_id:     "TEXT NOT NULL"
    issued_at:   "TIMESTAMPTZ NOT NULL"
    expires_at:  "TIMESTAMPTZ NOT NULL"
    refresh_id:  "TEXT NOT NULL"
  invariant: >                          # MANDATORY — runtime assertion
    expires_at > issued_at  AND
    expires_at - issued_at <= 8 hours

STATE: AuthLifecycle
  initial: UNAUTHENTICATED
  states:  [UNAUTHENTICATED, AUTHENTICATED, LOCKED]
  transitions:
    - "UNAUTHENTICATED → AUTHENTICATED  : WHEN login.success"
    - "UNAUTHENTICATED → LOCKED         : WHEN failed_attempts >= 5"
    - "AUTHENTICATED   → UNAUTHENTICATED: WHEN logout OR expires_at"
    - "LOCKED          → UNAUTHENTICATED: WHEN admin.unlock"
  invariant: "LOCKED has no outbound transitions except admin.unlock"

CHANGE:
  id:    add_biometric_fallback
  type:  story
  traces_to: [REQ-AUTH-014, ISO-27001-A.9.4.2]
  evidence:
    tests:    "11/11 pass · coverage 96%"
    review:   { gate: security, decision: APPROVED }
`;

export function SIL() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [lineWrap, setLineWrap] = useState(false);

  function copy() {
    navigator.clipboard.writeText(EXAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Section id="sil" kicker={t.sil.kicker} title={t.sil.title}>
      {/* Tagline + lead */}
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="display-serif text-[24px] leading-tight text-ink sm:text-[28px]">
            <span className="accent-italic">{t.sil.tagline}</span>
          </p>
          <p className="prose-just mt-5 max-w-2xl font-serif text-[16px] leading-[1.75] text-ink-soft">
            {t.sil.lead}
          </p>
        </div>

        {/* Two-layer card */}
        <div className="lg:col-span-5">
          <div className="paper-card p-5">
            <div className="mb-3 flex items-center gap-2 text-oxblood">
              <Layers size={14} />
              <span className="label-mono-ink">— {t.sil.layers.title}</span>
            </div>
            <ul className="space-y-3">
              {t.sil.layers.items.map((it) => (
                <li key={it.layer} className="border-l-2 border-oxblood pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="display-serif text-[18px] text-ink">{it.layer}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                      {it.who}
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-[13.5px] leading-relaxed text-ink-soft">
                    {it.what}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Principles + Primitives + Scale — three editorial cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <Card icon={<Smartphone size={14} />} title={t.sil.principles.title} accent="text-oxblood">
          <ol className="space-y-2 font-serif text-[13px] leading-relaxed text-ink-soft">
            {t.sil.principles.items.map((line, i) => (
              <li key={line} className="flex gap-2">
                <span className="font-mono text-[11px] text-oxblood">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </Card>
        <Card icon={<Workflow size={14} />} title={t.sil.primitives.title} accent="text-oxblood">
          <ul className="space-y-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-ink">
            {t.sil.primitives.items.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Card>
        <Card icon={<Scale size={14} />} title={t.sil.scale.title} accent="text-oxblood">
          <ul className="space-y-2.5">
            {t.sil.scale.items.map((it) => (
              <li key={it.type}>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-oxblood">
                  {it.type}
                </span>
                <p className="mt-0.5 font-serif text-[13.5px] leading-relaxed text-ink-soft">
                  {it.body}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Example block — both layers */}
      <div className="mt-12">
        <div className="mb-3 flex items-center justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            {t.sil.example}{' '}
            <span className="ml-2 inline-block border border-oxblood px-1.5 py-0.5 text-[9px] font-bold text-oxblood">
              .sil · v1.1
            </span>
          </div>
          <div className="flex gap-0">
            <button
              onClick={() => setLineWrap((w) => !w)}
              className="-mr-px border border-ink/40 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-paper-deep"
            >
              {lineWrap ? t.common.noWrap : t.common.wrap}
            </button>
            <button
              onClick={copy}
              className="border border-ink/40 bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
            >
              {copied ? (
                <>
                  <Check size={11} className="mr-1 inline" /> {t.common.copied}
                </>
              ) : (
                <>
                  <Copy size={11} className="mr-1 inline" /> {t.common.copy}
                </>
              )}
            </button>
          </div>
        </div>
        <pre
          className={`overflow-x-auto border border-ink bg-ink p-6 font-mono text-[12.5px] leading-[1.7] text-paper ${
            lineWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'
          }`}
        >
          {EXAMPLE.split('\n').map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-7 shrink-0 select-none text-right text-ink-faint">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
            </div>
          ))}
        </pre>
        <p className="prose-just mt-3 font-serif text-[13px] italic leading-relaxed text-ink-mute">
          {t.sil.reuseNote}
        </p>
      </div>
    </Section>
  );
}

function Card({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="paper-card p-5">
      <div className={`mb-3 flex items-center gap-2 ${accent}`}>
        {icon}
        <span className="label-mono-ink">— {title}</span>
      </div>
      <div className="rule-thin mb-4" />
      {children}
    </div>
  );
}

// SIL syntax highlighter — single-pass tokenizer. One alternation regex walks the
// raw line (comment | string | key: | arrow | keyword | number); each match is
// colored on its own and escaped exactly once. Never chain .replace() rounds that
// re-scan injected HTML — that is what previously mangled the style="..." quotes.

const SECTION_PRIMITIVES = new Set([
  'INTENT', 'SCENARIO', 'UI_FLOW', 'UI_SCREEN', 'FLOW', 'ENTITY', 'STATE',
  'EVENT', 'RULE', 'INTERFACE', 'CHANGE', 'SYSTEM', 'ACTOR',
]);

// Layer banners (full-width comment) get their own line-level style.
const BANNER_RE = /^(\s*)(#\s*─+\s*[A-Z]+\s+LAYER.*)$/;

const TOKEN_RE =
  /(#.*)|("[^"]*"|'[^']*')|([A-Za-z_][A-Za-z0-9_]*)(:)(?=\s|$)|(→|->)|((?:REQ|ISO)-[A-Z0-9][A-Z0-9.-]*|HMAC-SHA256|RFC5322|HTTPS|\b(?:MANDATORY|UNAUTHENTICATED|AUTHENTICATED|LOCKED|APPROVED|RESOLVED)\b)|\b(true|false|null|\d+(?:\.\d+)?)\b/g;

function span(color: string, text: string, weight?: number): string {
  const w = weight ? `;font-weight:${weight}` : '';
  return `<span style="color:${color}${w}">${escape(text)}</span>`;
}

function highlight(line: string): string {
  const banner = BANNER_RE.exec(line);
  if (banner) return banner[1] + span('#A85049', banner[2], 600);

  let out = '';
  let last = 0;
  TOKEN_RE.lastIndex = 0;
  for (let m = TOKEN_RE.exec(line); m !== null; m = TOKEN_RE.exec(line)) {
    out += escape(line.slice(last, m.index));
    const [, comment, str, key, colon, arrow, keyword, num] = m;
    if (comment !== undefined) {
      out += span('#8E8B7E', comment);
    } else if (str !== undefined) {
      out += span('#6E9070', str);
    } else if (key !== undefined) {
      // UPPERCASE primitive at the start of a section vs. plain field key
      const isPrimitive =
        SECTION_PRIMITIVES.has(key) && /^\s*$/.test(line.slice(0, m.index));
      out += isPrimitive ? span('#A85049', key, 700) : span('#C49447', key);
      out += span('#8E8B7E', colon);
    } else if (arrow !== undefined) {
      out += span('#4F7E8E', arrow);
    } else if (keyword !== undefined) {
      out += span('#A85049', keyword, 600);
    } else if (num !== undefined) {
      out += span('#A85049', num);
    }
    last = m.index + m[0].length;
  }
  return out + escape(line.slice(last));
}

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
