import { useState } from 'react';
import { ExternalLink, FileText, Calculator } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// BEACON modal — two tabs:
// 1. "Effort Planner" — iframe of /mnt/d/DEV/RFQ/wp-planner.html (single-file build)
// 2. "RFQ Audit" — custom scan↔digital PDF requirement extractor + BOM
// Paper main + dark accents, matching the wp-planner design language.

const C = {
  paper: '#F4EFE3',
  paperDeep: '#EAE2CF',
  paperRule: '#C9BFA4',
  paperCard: '#FBF7EC',
  ink: '#1A1B22',
  inkSoft: '#3A3B43',
  inkMute: '#6B6A63',
  inkFaint: '#8E8B7E',
  side: '#1A1B22',
  sideDeep: '#0E0F14',
  sideText: '#E8E2CC',
  sideMute: '#8A8676',
  oxblood: '#7E1E1B',
  oxbloodSoft: '#A85049',
  amber: '#9C6F1A',
  sage: '#3F6B47',
  teal: '#1F5566',
};

const FRAUNCES = '"Fraunces", Georgia, serif';
const SPECTRAL = '"Spectral", Georgia, serif';
const MONO = '"JetBrains Mono", monospace';

export function WpPlannerDemo() {
  const { lang } = useI18n();
  const [tab, setTab] = useState<'planner' | 'audit'>('planner');

  return (
    <div
      style={{
        background: C.paper,
        minHeight: 720,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar with tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: C.side,
          color: C.sideText,
          borderBottom: `1px solid ${C.sideDeep}`,
        }}
      >
        <div
          style={{
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: FRAUNCES,
              fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 1',
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: '-0.01em',
            }}
          >
            BEACON
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.sideMute,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            v1.4 · paper edition
          </span>
        </div>

        <div style={{ display: 'flex', marginLeft: 12 }}>
          <Tab
            active={tab === 'planner'}
            onClick={() => setTab('planner')}
            icon={<Calculator size={12} />}
          >
            Effort Planner
          </Tab>
          <Tab
            active={tab === 'audit'}
            onClick={() => setTab('audit')}
            icon={<FileText size={12} />}
          >
            RFQ Audit
          </Tab>
        </div>

        <span style={{ flex: 1 }} />

        <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.sideMute,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            HOPE-OEM-X · Driver-Assist Gateway
          </span>
          <a
            href={tab === 'planner' ? '/wp-planner-app/app.html' : '#'}
            target={tab === 'planner' ? '_blank' : undefined}
            rel="noreferrer"
            onClick={(e) => {
              if (tab !== 'planner') e.preventDefault();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              color: tab === 'planner' ? C.oxbloodSoft : C.inkFaint,
              textDecoration: 'none',
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: tab === 'planner' ? 1 : 0.4,
            }}
          >
            {lang === 'hu' ? 'Új ablakban' : 'Open in new tab'}
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {tab === 'planner' ? <PlannerView lang={lang} /> : <AuditView lang={lang} />}
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 0,
        padding: '12px 16px',
        color: active ? C.sideText : C.sideMute,
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: active ? 600 : 400,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        borderBottom: active ? `2px solid ${C.oxbloodSoft}` : '2px solid transparent',
        marginBottom: -1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

function PlannerView({ lang }: { lang: 'hu' | 'en' }) {
  return (
    <>
      <iframe
        src="/wp-planner-app/app.html"
        title="BEACON WP Effort Planner"
        style={{
          width: '100%',
          height: 660,
          border: 0,
          background: C.paper,
          display: 'block',
        }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      <div
        style={{
          padding: '8px 18px',
          background: C.side,
          color: C.sideMute,
          fontFamily: SPECTRAL,
          fontSize: 12,
          fontStyle: 'italic',
          textAlign: 'center',
          borderTop: `1px solid ${C.sideDeep}`,
        }}
      >
        {lang === 'hu'
          ? 'Eredeti single-file build · 66 munkacsomag, 172 task, 468 MD baseline · localStorage perzisztencia'
          : 'Original single-file build · 66 work packages, 172 tasks, 468 MD baseline · localStorage persistence'}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// RFQ Audit view — scan↔digital + BOM
// ─────────────────────────────────────────────────────────────────────

type Reqkind = 'R' | 'I' | 'X';

const SCAN_LINES: { y: number; w: number; kind?: Reqkind; id?: string }[] = [
  { y: 8, w: 160 }, // header text
  { y: 18, w: 110 },
  { y: 32, w: 200, kind: 'R', id: 'CVS35-014' },
  { y: 42, w: 175, kind: 'R', id: 'CVS35-014' },
  { y: 56, w: 120 },
  { y: 70, w: 195, kind: 'I' },
  { y: 80, w: 168, kind: 'I' },
  { y: 94, w: 200, kind: 'R', id: 'F_SESS1-08' },
  { y: 104, w: 145, kind: 'R', id: 'F_SESS1-08' },
  { y: 118, w: 90 },
  { y: 132, w: 195, kind: 'X', id: 'F_SECU1' },
  { y: 142, w: 120, kind: 'X', id: 'F_SECU1' },
  { y: 156, w: 170, kind: 'R', id: 'CVS34-141' },
  { y: 166, w: 188, kind: 'R', id: 'CVS34-141' },
  { y: 180, w: 100 },
];

const DIGITAL_REQS: {
  id: string;
  kind: Reqkind;
  text: { hu: string; en: string };
  conf: number;
}[] = [
  {
    id: 'CVS35-014',
    kind: 'R',
    text: {
      hu: 'A rendszernek titkosítania kell minden CAN-üzenetet AES-128-CMAC-cal a 0x100–0x3FF azonosító-tartományon.',
      en: 'The system shall encrypt all CAN messages on identifier range 0x100–0x3FF using AES-128-CMAC.',
    },
    conf: 0.98,
  },
  {
    id: 'F_SESS1-08',
    kind: 'R',
    text: {
      hu: 'A session-token élettartama nem haladhatja meg a 8 órát; megújításnál újra kell hitelesíteni.',
      en: 'Session token lifetime shall not exceed 8 hours; re-authentication required on renewal.',
    },
    conf: 0.94,
  },
  {
    id: 'F_SECU1-§3.2',
    kind: 'X',
    text: {
      hu: '[Section header] 3.2 Cryptographic Material Management — promóció hibás, csak fejezetjelölő.',
      en: '[Section header] 3.2 Cryptographic Material Management — wrongly promoted, marker only.',
    },
    conf: 0.42,
  },
  {
    id: 'CVS34-141',
    kind: 'R',
    text: {
      hu: 'A diagnosztikai szerviznek tagadnia kell a 0x10 0x02 hozzáférést érvényes seed/key pár nélkül.',
      en: 'The diagnostic service shall deny 0x10 0x02 access without a valid seed/key pair.',
    },
    conf: 0.91,
  },
  {
    id: 'INFO-09',
    kind: 'I',
    text: {
      hu: 'A megelőző fejezetben már leírt threat-modell ide hivatkozott — nem új követelmény.',
      en: 'Re-references threat model from earlier section — not a new requirement.',
    },
    conf: 0.88,
  },
];

const BOM = [
  { code: 'GW-A1', name: 'Gateway ECU primary', cpu: 38, ram: 1024, flash: 4096, trace: '0x1A4F', reqs: 124 },
  { code: 'TCU-B2', name: 'Telematics control', cpu: 22, ram: 512, flash: 2048, trace: '0x1B91', reqs: 68 },
  { code: 'BCM-C3', name: 'Body controller', cpu: 14, ram: 256, flash: 1024, trace: '0x1C03', reqs: 42 },
  { code: 'IVI-D4', name: 'Infotainment HMI', cpu: 56, ram: 4096, flash: 16384, trace: '0x1D77', reqs: 198 },
  { code: 'ADAS-E5', name: 'Advanced driver assistance', cpu: 72, ram: 8192, flash: 32768, trace: '0x1E22', reqs: 312 },
];

const KIND_COLOR: Record<Reqkind, string> = {
  R: C.sage,
  I: C.teal,
  X: C.oxblood,
};

const KIND_LABEL = (k: Reqkind, lang: 'hu' | 'en') =>
  ({
    R: lang === 'hu' ? 'Követelmény' : 'Requirement',
    I: lang === 'hu' ? 'Információ' : 'Information',
    X: lang === 'hu' ? 'Téves promóció' : 'False positive',
  })[k];

function AuditView({ lang }: { lang: 'hu' | 'en' }) {
  const [hovered, setHovered] = useState<string | null>('CVS35-014');

  return (
    <div style={{ padding: '24px 28px', overflowY: 'auto', maxHeight: 700 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
        <span
          style={{
            fontFamily: MONO,
            fontSize: 11,
            color: C.oxblood,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          § 02
        </span>
        <h2
          style={{
            fontFamily: FRAUNCES,
            fontVariationSettings: '"opsz" 144, "SOFT" 0, "WONK" 1',
            fontWeight: 600,
            fontSize: 32,
            letterSpacing: '-0.02em',
            margin: 0,
            color: C.ink,
          }}
        >
          RFQ{' '}
          <em
            style={{
              fontStyle: 'italic',
              color: C.oxblood,
              fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
            }}
          >
            Audit
          </em>
        </h2>
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: MONO,
            fontSize: 10,
            color: C.inkMute,
            letterSpacing: '0.12em',
          }}
        >
          22 PDF · 406 oldal · 955 req · 12 finding
        </span>
      </div>
      <p
        style={{
          fontFamily: SPECTRAL,
          fontStyle: 'italic',
          fontSize: 14,
          color: C.inkSoft,
          marginTop: 4,
          marginBottom: 22,
          maxWidth: 700,
          lineHeight: 1.55,
        }}
      >
        {lang === 'hu'
          ? 'Side-by-side scan ↔ digitalizált nézet. Minden sor osztályozva: követelmény / információ / téves promóció. Bármelyik markup-on egér fölé kell vinni a részletes extrahált rekordhoz.'
          : 'Side-by-side scan ↔ digitised view. Every line classified: requirement / information / false positive. Hover any markup for the full extracted record.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Scanned PDF */}
        <div>
          <PanelHead label={lang === 'hu' ? '— Scannelt forrás (CVS35-A.pdf, p.14)' : '— Scanned source (CVS35-A.pdf, p.14)'} />
          <div
            style={{
              background: '#FAF7EC',
              border: `1px solid ${C.paperRule}`,
              borderRadius: 4,
              padding: 16,
              boxShadow: '0 2px 0 rgba(26,27,34,.04), 0 14px 40px -22px rgba(26,27,34,.18)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Scan grain texture */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: 'repeating-linear-gradient(0deg, rgba(26,27,34,.03) 0 1px, transparent 1px 3px)',
                opacity: 0.6,
              }}
            />
            <svg viewBox="0 0 240 200" style={{ width: '100%', height: 'auto', display: 'block', position: 'relative' }}>
              {SCAN_LINES.map((l, i) => {
                const isHover = l.id && hovered === l.id;
                return (
                  <g
                    key={i}
                    onMouseEnter={() => l.id && setHovered(l.id)}
                    style={{ cursor: l.kind ? 'pointer' : 'default' }}
                  >
                    {l.kind && (
                      <rect
                        x={4}
                        y={l.y - 2}
                        width={l.w + 8}
                        height={9}
                        fill={KIND_COLOR[l.kind]}
                        opacity={isHover ? 0.18 : 0.07}
                      />
                    )}
                    {/* mock text — gray rectangles imitating scanned letters */}
                    <rect x={8} y={l.y} width={l.w} height={3.2} fill={C.ink} opacity={0.62} rx={0.5} />
                    {l.kind && (
                      <text
                        x={l.w + 18}
                        y={l.y + 3.5}
                        fill={KIND_COLOR[l.kind]}
                        fontSize={3.6}
                        fontFamily={MONO}
                        fontWeight={600}
                        letterSpacing="0.4"
                      >
                        {l.kind}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            <div
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: `1px solid ${C.paperRule}`,
                fontFamily: MONO,
                fontSize: 9,
                color: C.inkMute,
                letterSpacing: '0.08em',
                display: 'flex',
                gap: 14,
              }}
            >
              <Legend swatch={C.sage} text="R · req" />
              <Legend swatch={C.teal} text="I · info" />
              <Legend swatch={C.oxblood} text="X · promoted" />
            </div>
          </div>
        </div>

        {/* Digital extraction */}
        <div>
          <PanelHead label={lang === 'hu' ? '— Digitalizált rekordok' : '— Digitised records'} />
          <div
            style={{
              background: C.paperCard,
              border: `1px solid ${C.paperRule}`,
              borderRadius: 4,
              boxShadow: '0 2px 0 rgba(26,27,34,.04), 0 14px 40px -22px rgba(26,27,34,.18)',
              maxHeight: 400,
              overflowY: 'auto',
            }}
          >
            {DIGITAL_REQS.map((r) => {
              const isHover = hovered === r.id;
              return (
                <div
                  key={r.id}
                  onMouseEnter={() => setHovered(r.id)}
                  style={{
                    padding: '10px 12px',
                    borderBottom: `1px solid ${C.paperRule}`,
                    background: isHover ? `${KIND_COLOR[r.kind]}10` : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          padding: '1px 6px',
                          background: `${KIND_COLOR[r.kind]}15`,
                          color: KIND_COLOR[r.kind],
                          fontFamily: MONO,
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          borderRadius: 2,
                        }}
                      >
                        {r.kind} · {KIND_LABEL(r.kind, lang)}
                      </span>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 11,
                          color: C.oxblood,
                          fontWeight: 600,
                        }}
                      >
                        {r.id}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: r.conf > 0.9 ? C.sage : r.conf > 0.7 ? C.amber : C.oxblood,
                      }}
                    >
                      conf {(r.conf * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: SPECTRAL,
                      fontSize: 13,
                      color: C.inkSoft,
                      lineHeight: 1.5,
                    }}
                  >
                    {r.text[lang]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOM table */}
      <div style={{ marginTop: 24 }}>
        <PanelHead
          label={lang === 'hu' ? '— BOM · ECU bontás' : '— BOM · ECU breakdown'}
          hint={lang === 'hu' ? 'követelmény-fedettséggel' : 'with requirement coverage'}
        />
        <div
          style={{
            background: C.paperCard,
            border: `1px solid ${C.paperRule}`,
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 2px 0 rgba(26,27,34,.04), 0 14px 40px -22px rgba(26,27,34,.18)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: SPECTRAL, fontSize: 13.5 }}>
            <thead style={{ background: C.paperDeep }}>
              <tr
                style={{
                  fontFamily: MONO,
                  fontSize: 9.5,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: C.inkMute,
                }}
              >
                <th style={th}>Code</th>
                <th style={th}>{lang === 'hu' ? 'ECU' : 'ECU'}</th>
                <th style={{ ...th, textAlign: 'right' }}>CPU%</th>
                <th style={{ ...th, textAlign: 'right' }}>RAM (KB)</th>
                <th style={{ ...th, textAlign: 'right' }}>Flash (KB)</th>
                <th style={th}>Trace</th>
                <th style={{ ...th, textAlign: 'right' }}>Reqs</th>
              </tr>
            </thead>
            <tbody>
              {BOM.map((row) => (
                <tr key={row.code} style={{ borderTop: `1px solid ${C.paperRule}` }}>
                  <td style={{ ...td, fontFamily: MONO, color: C.oxblood, fontWeight: 600 }}>
                    {row.code}
                  </td>
                  <td style={{ ...td, color: C.ink }}>{row.name}</td>
                  <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: row.cpu > 60 ? C.oxblood : row.cpu > 40 ? C.amber : C.sage }}>
                    {row.cpu}%
                  </td>
                  <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: C.inkSoft }}>
                    {row.ram.toLocaleString()}
                  </td>
                  <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: C.inkSoft }}>
                    {row.flash.toLocaleString()}
                  </td>
                  <td style={{ ...td, fontFamily: MONO, fontSize: 11, color: C.teal }}>{row.trace}</td>
                  <td style={{ ...td, textAlign: 'right', fontFamily: MONO, fontWeight: 600 }}>
                    {row.reqs}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${C.ink}`, background: C.paperDeep }}>
                <td style={{ ...td, fontFamily: MONO, color: C.inkMute, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Σ
                </td>
                <td style={{ ...td, fontFamily: SPECTRAL, fontStyle: 'italic', color: C.inkMute }}>
                  {lang === 'hu' ? '5 ECU összesen' : '5 ECUs total'}
                </td>
                <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: C.oxblood, fontWeight: 700 }}>
                  {BOM.reduce((a, b) => a + b.cpu, 0)}%
                </td>
                <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: C.ink, fontWeight: 600 }}>
                  {BOM.reduce((a, b) => a + b.ram, 0).toLocaleString()}
                </td>
                <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: C.ink, fontWeight: 600 }}>
                  {BOM.reduce((a, b) => a + b.flash, 0).toLocaleString()}
                </td>
                <td style={td}></td>
                <td style={{ ...td, textAlign: 'right', fontFamily: MONO, fontWeight: 700, color: C.oxblood }}>
                  {BOM.reduce((a, b) => a + b.reqs, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p
          style={{
            marginTop: 10,
            fontFamily: SPECTRAL,
            fontStyle: 'italic',
            fontSize: 12.5,
            color: C.inkMute,
            lineHeight: 1.5,
          }}
        >
          {lang === 'hu'
            ? '⚠ ΣCPU = 202% — a naív összegzés fizikailag lehetetlen. A finding F-09 erre mutat rá: ECU-szintű envelope-modell szükséges.'
            : '⚠ ΣCPU = 202% — naive summation is physically impossible. Finding F-09 flags this: an ECU-level envelope model is required.'}
        </p>
      </div>
    </div>
  );
}

function PanelHead({ label, hint }: { label: string; hint?: string }) {
  return (
    <div
      style={{
        fontFamily: MONO,
        fontSize: 10.5,
        color: C.oxblood,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        fontWeight: 600,
        marginBottom: 8,
      }}
    >
      {label}
      {hint && (
        <span
          style={{
            marginLeft: 10,
            color: C.inkMute,
            fontStyle: 'italic',
            textTransform: 'none',
            letterSpacing: 0,
            fontWeight: 400,
          }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

function Legend({ swatch, text }: { swatch: string; text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 10, height: 4, background: swatch }} />
      {text}
    </span>
  );
}

const th: React.CSSProperties = { textAlign: 'left', padding: '8px 12px', fontWeight: 500 };
const td: React.CSSProperties = { padding: '8px 12px' };
