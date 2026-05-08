import { ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// Loads the actual Flutter-web build from /public/magus-app/.
// The build is the production output of /mnt/d/DEV/M.A.G.U.S/magus_character_sheet
// — running, mock-data wired in via Hive (local-first storage).

export function MagusDemo() {
  const { lang } = useI18n();

  return (
    <div
      style={{
        background: '#2C3E50',
        minHeight: 720,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar with status + open-in-new */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          background: '#1A1F2A',
          borderBottom: '1px solid rgba(212,175,55,0.2)',
          color: '#D4AF37',
          fontFamily: '"Cinzel", serif',
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#28A745',
              boxShadow: '0 0 6px #28A745',
            }}
          />
          M.A.G.U.S Karakterlap · Flutter web build
        </span>
        <a
          href="/magus-app/app.html"
          target="_blank"
          rel="noreferrer noopener"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#D4AF37',
            textDecoration: 'none',
            fontSize: 11,
            letterSpacing: '0.14em',
          }}
        >
          {lang === 'hu' ? 'Új ablakban' : 'Open in new tab'}
          <ExternalLink size={11} />
        </a>
      </div>

      {/* iframe — the actual Flutter app */}
      <iframe
        src="/magus-app/app.html"
        title="M.A.G.U.S Karakterlap"
        style={{
          flex: 1,
          width: '100%',
          height: 720,
          border: 0,
          background: '#2C3E50',
        }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />

      {/* Footnote */}
      <div
        style={{
          padding: '8px 18px',
          background: '#1A1F2A',
          borderTop: '1px solid rgba(212,175,55,0.15)',
          color: '#8B7355',
          fontFamily: '"Crimson Text", Georgia, serif',
          fontSize: 12,
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        {lang === 'hu'
          ? 'Eredeti Flutter web-build · Hive lokális adatbázis · ~12 MB első betöltés (Flutter runtime + canvaskit)'
          : 'Original Flutter web build · Hive local database · ~12 MB first load (Flutter runtime + canvaskit)'}
      </div>
    </div>
  );
}
