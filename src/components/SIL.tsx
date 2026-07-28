import { useState } from 'react';
import { Check, Copy, Layers, Scale, Workflow, Smartphone } from 'lucide-react';
import { Badge, Card, Panel, Reveal } from '../landing/ui';
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
    <Section id="sil" kicker={t.sil.kicker} title={t.sil.title} tone="sunken">
      {/* Tagline + lead */}
      <div className="grid grid-cols-12 gap-8 max-lg:gap-6">
        <Reveal className="col-span-7 max-lg:col-span-12">
          <p className="text-hero font-hero leading-tight tracking-tight text-accent-strong">
            {t.sil.tagline}
          </p>
          <p className="mt-4 max-w-[640px] text-body leading-relaxed text-text">{t.sil.lead}</p>
        </Reveal>

        {/* Two-layer card */}
        <Reveal delay={0.08} className="col-span-5 max-lg:col-span-12">
          <Panel
            heading={t.sil.layers.title}
            aside={<Layers size={14} className="text-accent" aria-hidden />}
          >
            <ul className="space-y-3">
              {t.sil.layers.items.map((it) => (
                <li key={it.layer} className="border-l-2 border-accent pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="text-title font-emph text-text-strong">{it.layer}</span>
                    <span className="text-meta uppercase tracking-[0.1em] text-text-faint">
                      {it.who}
                    </span>
                  </div>
                  <p className="mt-1 text-dense leading-relaxed text-text">{it.what}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>

      {/* Principles + Primitives + Scale */}
      <div className="mt-8 grid grid-cols-3 gap-4 max-md:grid-cols-1">
        <Reveal>
          <IconCard icon={<Smartphone size={14} />} title={t.sil.principles.title}>
            <ol className="space-y-2">
              {t.sil.principles.items.map((line, i) => (
                <li key={line} className="flex gap-2 text-dense leading-relaxed text-text">
                  <span className="num shrink-0 text-meta font-emph text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </IconCard>
        </Reveal>
        <Reveal delay={0.06}>
          <IconCard icon={<Workflow size={14} />} title={t.sil.primitives.title}>
            <ul className="space-y-1.5">
              {t.sil.primitives.items.map((line) => (
                <li key={line} className="font-mono text-dense uppercase tracking-[0.08em] text-text-strong">
                  {line}
                </li>
              ))}
            </ul>
          </IconCard>
        </Reveal>
        <Reveal delay={0.12}>
          <IconCard icon={<Scale size={14} />} title={t.sil.scale.title}>
            <ul className="space-y-2.5">
              {t.sil.scale.items.map((it) => (
                <li key={it.type}>
                  <span className="text-meta font-emph uppercase tracking-[0.14em] text-accent">
                    {it.type}
                  </span>
                  <p className="mt-0.5 text-dense leading-relaxed text-text">{it.body}</p>
                </li>
              ))}
            </ul>
          </IconCard>
        </Reveal>
      </div>

      {/* Example block — both layers, token colors on ecosystem CSS vars */}
      <Reveal className="mt-10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-meta uppercase tracking-[0.14em] text-text-muted">
            {t.sil.example}
            <Badge tone="accent" title="SIL specification v1.1 — file extension .sil">
              .sil · v1.1
            </Badge>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLineWrap((w) => !w)}
              className="inline-flex h-7 items-center rounded border border-border bg-surface px-2.5 text-meta font-emph uppercase tracking-[0.1em] text-text-muted transition-colors hover:border-border-strong hover:text-text-strong"
              title="Toggle line wrapping in the example"
            >
              {lineWrap ? t.common.noWrap : t.common.wrap}
            </button>
            <button
              onClick={copy}
              className="inline-flex h-7 items-center gap-1.5 rounded border border-border bg-surface px-2.5 text-meta font-emph uppercase tracking-[0.1em] text-text-muted transition-colors hover:border-border-strong hover:text-text-strong"
              title="Copy the full example to the clipboard"
            >
              {copied ? <Check size={11} /> : <Copy size={11} />}
              {copied ? t.common.copied : t.common.copy}
            </button>
          </div>
        </div>
        <pre
          className={`overflow-x-auto rounded-md border border-border bg-bg-sunken p-6 font-mono text-dense leading-[1.7] text-text max-md:p-4 ${
            lineWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'
          }`}
        >
          {EXAMPLE.split('\n').map((line, i) => (
            <div key={i} className="flex">
              <span className="num mr-4 inline-block w-7 shrink-0 select-none text-right text-text-faint">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
            </div>
          ))}
        </pre>
        <p className="mt-3 max-w-[820px] text-dense leading-relaxed text-text-muted">
          {t.sil.reuseNote}
        </p>
      </Reveal>
    </Section>
  );
}

function IconCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full p-4">
      <div className="mb-3 flex items-center gap-2 border-b border-border pb-3 text-accent">
        {icon}
        <span className="text-meta font-emph uppercase tracking-[0.14em]">{title}</span>
      </div>
      {children}
    </Card>
  );
}

// SIL syntax highlighter — single-pass tokenizer. One alternation regex walks the
// raw line (comment | string | key: | arrow | keyword | number); each match is
// colored on its own and escaped exactly once. Never chain .replace() rounds that
// re-scan injected HTML — that is what previously mangled the style="..." quotes.
//
// Token colors are ecosystem CSS vars so both themes stay readable (K3: the one
// accent for keywords; ok/warn only as categorical code-highlight hues here):
//   keyword/primitive → accent · string → ok · field key → text-strong ·
//   comment → text-faint · number → warn

const C = {
  keyword: 'rgb(var(--accent-rgb))',
  string: 'rgb(var(--ok-rgb))',
  fieldKey: 'rgb(var(--text-strong-rgb))',
  comment: 'rgb(var(--text-faint-rgb))',
  number: 'rgb(var(--warn-rgb))',
  arrow: 'rgb(var(--accent-strong-rgb))',
} as const;

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
  if (banner) return banner[1] + span(C.keyword, banner[2], 600);

  let out = '';
  let last = 0;
  TOKEN_RE.lastIndex = 0;
  for (let m = TOKEN_RE.exec(line); m !== null; m = TOKEN_RE.exec(line)) {
    out += escape(line.slice(last, m.index));
    const [, comment, str, key, colon, arrow, keyword, num] = m;
    if (comment !== undefined) {
      out += span(C.comment, comment);
    } else if (str !== undefined) {
      out += span(C.string, str);
    } else if (key !== undefined) {
      // UPPERCASE primitive at the start of a section vs. plain field key
      const isPrimitive =
        SECTION_PRIMITIVES.has(key) && /^\s*$/.test(line.slice(0, m.index));
      out += isPrimitive ? span(C.keyword, key, 700) : span(C.fieldKey, key, 500);
      out += span(C.comment, colon);
    } else if (arrow !== undefined) {
      out += span(C.arrow, arrow);
    } else if (keyword !== undefined) {
      out += span(C.keyword, keyword, 600);
    } else if (num !== undefined) {
      out += span(C.number, num);
    }
    last = m.index + m[0].length;
  }
  return out + escape(line.slice(last));
}

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
