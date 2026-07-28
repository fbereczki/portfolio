import { useEffect, useState } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

/* Frame around the real single-file build served from /pgp-app/app.html
   (PGP Encryption Tool · v4.1 workbench — OpenPGP.js, JSZip and pako embedded,
   its own strict CSP with connect-src 'none'). The tool is untouched; only
   this chrome follows the site. It reads its theme from localStorage at boot,
   so we hand it ours before the frame mounts. */
export function PgpDemo() {
  const { lang } = useI18n();
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
      localStorage.setItem('pgp-ui-theme', theme);
    } catch {
      /* private mode — the tool falls back to prefers-color-scheme */
    }
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col bg-bg-sunken">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2.5">
          <ShieldCheck size={13} className="shrink-0 text-accent" />
          <span className="truncate text-meta font-emph uppercase tracking-[0.14em] text-text-muted">
            PGP Encryption Tool · v4.1 workbench · single-file build
          </span>
        </span>
        <a
          href="/pgp-app/app.html"
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center gap-1.5 text-meta font-emph uppercase tracking-[0.14em] text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
        >
          {lang === 'hu' ? 'Új ablakban' : 'Open in new tab'}
          <ExternalLink size={11} />
        </a>
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
            src="/pgp-app/app.html"
            title="PGP Encryption Tool"
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
            ? 'A valódi build, nem mockup: OpenPGP.js beágyazva, kulcsgenerálás, titkosítás, aláírás és fájl-kezelés 100%-ban a böngészőben. Az eszköz saját CSP-je connect-src ’none’ — hálózati hívás nem létezik benne, adat nem hagyja el a gépet.'
            : 'The real build, not a mockup: OpenPGP.js embedded, key generation, encryption, signing and file handling entirely in the browser. The tool ships its own CSP with connect-src ’none’ — there is no network call in it, and nothing leaves your machine.'}
        </p>
      </div>
    </div>
  );
}
