import { ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// Loads /mnt/d/DEV/PGP/PGP_Encryption_Tool_V2Local.html — single-file
// PGP/GPG encrypt + sign + verify utility with embedded OpenPGP.js.

export function PgpDemo() {
  const { lang } = useI18n();

  return (
    <div
      style={{
        background: '#0e1018',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 720,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          background: '#0a0c14',
          color: '#e8e8ec',
          borderBottom: '1px solid rgba(76,175,80,0.25)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#4CAF50',
              boxShadow: '0 0 6px #4CAF50',
            }}
          />
          PGP Encryption Tool · single-file build · v2 local
        </span>
        <a
          href="/pgp-app/app.html"
          target="_blank"
          rel="noreferrer noopener"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#4CAF50',
            textDecoration: 'none',
          }}
        >
          {lang === 'hu' ? 'Új ablakban' : 'Open in new tab'}
          <ExternalLink size={11} />
        </a>
      </div>

      <iframe
        src="/pgp-app/app.html"
        title="PGP Encryption Tool"
        style={{
          flex: 1,
          width: '100%',
          height: 720,
          border: 0,
          background: '#0e1018',
        }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />

      <div
        style={{
          padding: '8px 18px',
          background: '#0a0c14',
          color: '#6e7080',
          borderTop: '1px solid rgba(76,175,80,0.2)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 12,
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        {lang === 'hu'
          ? 'Eredeti single-file build · OpenPGP.js beágyazva · kulcsok és műveletek 100%-ban a böngészőben — semmi adat nem hagyja el a gépet'
          : 'Original single-file build · OpenPGP.js embedded · keys and operations 100% in-browser — no data leaves your machine'}
      </div>
    </div>
  );
}
