import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

/* Frame around the REAL CodeWitness cockpit build served from
   /codewitness-app/app.html — the product's own React SPA (cw-v3 apps/app),
   not a replica. It normally reads a fleet of Go services; in the portfolio a
   demo shim (public/codewitness-app/cw-demo-api.js) answers every /api call
   from fixtures, so the cockpit's OWN verdict-derivation code renders the
   figures. See scripts/install-codewitness-build.sh for how the build is
   mounted. */

const PROJECT_ID = '01JD8Z3K5N7Q9R2T4V6X8Y0A1B';

type Surface = {
  key: string;
  route: string;
  label: { hu: string; en: string };
};

const SURFACES: Surface[] = [
  { key: 'cockpit', route: `/p/${PROJECT_ID}`, label: { hu: 'Cockpit', en: 'Cockpit' } },
  {
    key: 'requirements',
    route: `/p/${PROJECT_ID}/stage/requirements`,
    label: { hu: 'Követelmények', en: 'Requirements' },
  },
  {
    key: 'safety',
    route: `/p/${PROJECT_ID}/stage/safety`,
    label: { hu: 'Safety & Security', en: 'Safety & Security' },
  },
  { key: 'vv', route: `/p/${PROJECT_ID}/stage/vv`, label: { hu: 'V&V', en: 'V&V' } },
  {
    key: 'governance',
    route: `/p/${PROJECT_ID}/stage/governance`,
    label: { hu: 'Governance', en: 'Governance' },
  },
];

const SRC = '/codewitness-app/app.html';

export function CodeWitnessCockpit() {
  const { lang } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(SURFACES[0].key);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setMounted(true), []);

  const src = useMemo(() => {
    const surface = SURFACES.find((s) => s.key === active) ?? SURFACES[0];
    return `${SRC}?route=${encodeURIComponent(surface.route)}`;
  }, [active]);

  function open(key: string) {
    if (key === active) return;
    setLoaded(false);
    setActive(key);
  }

  return (
    <div className="flex flex-col bg-bg-sunken">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2.5">
          <ShieldCheck size={13} className="shrink-0 text-accent" />
          <span className="truncate text-meta font-emph uppercase tracking-[0.14em] text-text-muted">
            CodeWitness cockpit · {lang === 'hu' ? 'éles build, demó-adatokkal' : 'production build, demo data'}
          </span>
        </span>
        <a
          href={src}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center gap-1.5 text-meta font-emph uppercase tracking-[0.14em] text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
        >
          {lang === 'hu' ? 'Új ablakban' : 'Open in new tab'}
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Surface picker — each chip reloads the cockpit on that stage route */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2">
        {SURFACES.map((s) => {
          const on = s.key === active;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => open(s.key)}
              aria-pressed={on}
              className={`rounded border px-2.5 py-1 text-meta font-emph uppercase tracking-[0.12em] transition-colors ${
                on
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-text-muted hover:border-border-strong hover:text-text-strong'
              }`}
            >
              {s.label[lang === 'hu' ? 'hu' : 'en']}
            </button>
          );
        })}
      </div>

      <div className="relative min-h-[760px]">
        {/* K5 loading state — skeleton, never a spinner */}
        {!loaded && (
          <div className="absolute inset-0 space-y-3 p-6" aria-hidden>
            {[70, 92, 55, 80, 40, 64].map((w, i) => (
              <div
                key={i}
                className="h-3 animate-shimmer rounded-md bg-[length:400%_100%]"
                style={{
                  width: `${w}%`,
                  backgroundImage:
                    'linear-gradient(90deg, rgb(var(--surface-3-rgb)) 25%, rgb(var(--surface-2-rgb)) 37%, rgb(var(--surface-3-rgb)) 63%)',
                }}
              />
            ))}
          </div>
        )}
        {mounted && (
          <iframe
            key={active}
            src={src}
            title="CodeWitness cockpit"
            onLoad={() => setLoaded(true)}
            className="h-[760px] w-full border-0 bg-bg"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox"
          />
        )}
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="flex gap-2 text-dense leading-snug text-text-muted">
          <span className="shrink-0 font-emph text-accent">→</span>
          {lang === 'hu'
            ? 'A termék éles frontend-buildje fut az iframe-ben, nem újraépített replika. Backend helyett egy demó-réteg válaszol a hívásokra: a verdiktsorokat (ASIL D · 14 nyitott magas kockázatú fenyegetés · 230 traceability-él suspect nélkül · 200 bejegyzéses, ép witness-lánc) a cockpit SAJÁT kiértékelő kódja számolja ki a fixtúrákból. Adat nem hagyja el a böngészőt.'
            : 'The product’s real frontend build runs in the frame — not a rebuilt replica. With no backend, a demo layer answers the calls: every verdict line (ASIL D · 14 open high-risk threats · 230 trace edges with no suspect link · a 200-entry intact witness chain) is computed by the cockpit’s OWN derivation code from those fixtures. Nothing leaves the browser.'}
        </p>
      </div>
    </div>
  );
}
