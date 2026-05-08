import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, AlertTriangle, TrendingUp } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// Beacon Enterprise — UI gallery.
// Mix of: (a) authentic screenshots that contain no production-sensitive
// data (login + project-details + regulations-map), and (b) React-rendered
// mock UI for screens that would otherwise leak real customer / project
// data (dashboard + projects kanban). All numbers below are fictional.

const C = {
  bg: '#1a1f2e',
  bg2: '#242937',
  bg3: '#2d3343',
  bgCard: '#323848',
  text: '#ffffff',
  textSecondary: '#a8b2d1',
  textMuted: '#64748b',
  primary: '#0066CC',
  primaryLight: '#1976D2',
  primaryDark: '#0052A3',
  accent: '#FF6B00',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  border: 'rgba(255,255,255,0.1)',
  borderStrong: 'rgba(255,255,255,0.2)',
};

const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const MONO = '"JetBrains Mono", "Fira Code", monospace';

type Shot =
  | {
      kind: 'image';
      file: string;
      title: { hu: string; en: string };
      caption: { hu: string; en: string };
      category: 'auth' | 'dashboard' | 'projects' | 'map';
    }
  | {
      kind: 'mock';
      mockId: 'dashboard' | 'projects';
      title: { hu: string; en: string };
      caption: { hu: string; en: string };
      category: 'auth' | 'dashboard' | 'projects' | 'map';
    };

const SHOTS: Shot[] = [
  {
    kind: 'mock',
    mockId: 'dashboard',
    title: { hu: 'Dashboard — áttekintés', en: 'Dashboard overview' },
    caption: {
      hu: 'KPI-k, csapat-utilization, bottleneck-detect — mock adatokkal.',
      en: 'KPIs, team utilization, bottleneck detection — mock data.',
    },
    category: 'dashboard',
  },
  {
    kind: 'image',
    file: '08-regulations-map.png',
    title: { hu: 'Globális szabályozási térkép', en: 'Global regulations map' },
    caption: {
      hu: 'Országonként ISO/SAE 21434, UN R155 és lokális framework-követelmények — color-coded heat-map.',
      en: 'Per-country ISO/SAE 21434, UN R155 and local framework requirements — color-coded heat-map.',
    },
    category: 'map',
  },
  {
    kind: 'mock',
    mockId: 'projects',
    title: { hu: 'Projektek — kanban', en: 'Projects — kanban' },
    caption: {
      hu: 'Phase-onként kanban — Concept / Design / Implementation / Verification. Mock projekt-adatok.',
      en: 'Per-phase kanban — Concept / Design / Implementation / Verification. Mock project data.',
    },
    category: 'projects',
  },
  {
    kind: 'image',
    file: '05-project-details.png',
    title: { hu: 'Projekt-részletek', en: 'Project details' },
    caption: {
      hu: 'GATE-roadmap, role-bontás, MD-baseline → effective számítás (overhead 1,63×).',
      en: 'GATE roadmap, role breakdown, MD-baseline → effective calculation (1.63× overhead).',
    },
    category: 'projects',
  },
  {
    kind: 'image',
    file: '01-login-page.png',
    title: { hu: 'Login', en: 'Login' },
    caption: {
      hu: 'JWT + 2FA · Active Directory SSO · enterprise-grade auth.',
      en: 'JWT + 2FA · Active Directory SSO · enterprise-grade auth.',
    },
    category: 'auth',
  },
  {
    kind: 'image',
    file: '02-login-filled.png',
    title: { hu: 'Login (kitöltve)', en: 'Login (filled)' },
    caption: {
      hu: 'Tenant-választó SSO-bejelentkezés után.',
      en: 'Tenant picker after SSO login.',
    },
    category: 'auth',
  },
];

const CATS: { key: Shot['category']; hu: string; en: string }[] = [
  { key: 'dashboard', hu: 'Dashboard', en: 'Dashboard' },
  { key: 'map', hu: 'Reg. térkép', en: 'Regulations map' },
  { key: 'projects', hu: 'Projektek', en: 'Projects' },
  { key: 'auth', hu: 'Auth', en: 'Auth' },
];

export function BeaconCharts() {
  const { lang } = useI18n();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const prev = () => setActive((i) => (i - 1 + SHOTS.length) % SHOTS.length);
  const next = () => setActive((i) => (i + 1) % SHOTS.length);
  const shot = SHOTS[active];

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: FONT, minHeight: 720 }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 22px',
          background: C.bg2,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryLight} 100%)`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            BC
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Beacon Enterprise</div>
            <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 1 }}>
              Cybersecurity portfolio analytics · Knorr-Bremse R&D
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              padding: '3px 9px',
              borderRadius: 999,
              background: 'rgba(76,175,80,0.15)',
              border: `1px solid ${C.success}`,
              color: C.success,
              fontSize: 10.5,
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Production
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.textSecondary,
              padding: '3px 8px',
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              letterSpacing: '0.06em',
            }}
          >
            {SHOTS.length} {lang === 'hu' ? 'képernyő' : 'screens'} · mock data
          </span>
        </div>
      </div>

      {/* Category strip */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: '10px 18px',
          background: C.bg2,
          borderBottom: `1px solid ${C.border}`,
          overflowX: 'auto',
        }}
      >
        {CATS.map((c) => {
          const count = SHOTS.filter((s) => s.category === c.key).length;
          const isActiveCat = shot.category === c.key;
          return (
            <button
              key={c.key}
              onClick={() => {
                const firstIdx = SHOTS.findIndex((s) => s.category === c.key);
                if (firstIdx >= 0) setActive(firstIdx);
              }}
              style={{
                background: isActiveCat ? C.primary : 'transparent',
                color: isActiveCat ? '#fff' : C.textSecondary,
                border: 0,
                padding: '7px 14px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: isActiveCat ? 600 : 500,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {c[lang]}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9.5,
                  opacity: 0.7,
                  background: isActiveCat ? 'rgba(255,255,255,0.2)' : C.bg3,
                  padding: '1px 6px',
                  borderRadius: 3,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main viewer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 0 }}>
        <div style={{ padding: 18, position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: C.textMuted,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {String(active + 1).padStart(2, '0')} / {String(SHOTS.length).padStart(2, '0')} ·{' '}
                {shot.category} ·{' '}
                {shot.kind === 'mock' ? (lang === 'hu' ? 'mock UI' : 'mock UI') : 'screenshot'}
              </div>
              <h3 style={{ margin: '4px 0 4px', fontSize: 18, fontWeight: 600 }}>
                {shot.title[lang]}
              </h3>
              <p style={{ margin: 0, fontSize: 12.5, color: C.textSecondary, fontStyle: 'italic' }}>
                {shot.caption[lang]}
              </p>
            </div>
            {shot.kind === 'image' && (
              <button
                onClick={() => setZoom(true)}
                style={{
                  background: 'transparent',
                  border: `1px solid ${C.border}`,
                  color: C.textSecondary,
                  padding: '6px 10px',
                  borderRadius: 6,
                  fontSize: 11,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <ZoomIn size={12} /> {lang === 'hu' ? 'Nagyítás' : 'Zoom'}
              </button>
            )}
          </div>

          <div
            style={{
              background: C.bg2,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: shot.kind === 'image' ? 12 : 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {shot.kind === 'image' ? (
              <img
                src={`/beacon-shots/${shot.file}`}
                alt={shot.title.en}
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  maxHeight: 540,
                  objectFit: 'contain',
                  borderRadius: 4,
                  cursor: 'zoom-in',
                }}
                onClick={() => setZoom(true)}
              />
            ) : shot.mockId === 'dashboard' ? (
              <DashboardMock lang={lang} />
            ) : (
              <ProjectsKanbanMock lang={lang} />
            )}

            <button
              onClick={prev}
              style={{
                position: 'absolute',
                left: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)',
                border: `1px solid ${C.border}`,
                color: '#fff',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                zIndex: 5,
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute',
                right: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)',
                border: `1px solid ${C.border}`,
                color: '#fff',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                zIndex: 5,
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <aside
          style={{
            background: C.bg2,
            borderLeft: `1px solid ${C.border}`,
            padding: '14px 12px',
            maxHeight: 700,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 9.5,
              color: C.textMuted,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 10,
              padding: '0 4px',
            }}
          >
            {lang === 'hu' ? 'Képernyők' : 'Screens'}
          </div>
          <div style={{ display: 'grid', gap: 6 }}>
            {SHOTS.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.kind === 'image' ? s.file : s.mockId}
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: 5,
                    background: isActive ? 'rgba(0,102,204,0.1)' : C.bg3,
                    border: `1px solid ${isActive ? C.primary : C.border}`,
                    borderRadius: 6,
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: isActive ? C.text : C.textSecondary,
                  }}
                >
                  {s.kind === 'image' ? (
                    <img
                      src={`/beacon-shots/${s.file}`}
                      alt=""
                      style={{
                        width: 64,
                        height: 40,
                        objectFit: 'cover',
                        borderRadius: 3,
                        flexShrink: 0,
                        background: '#000',
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 64,
                        height: 40,
                        background: `linear-gradient(135deg, ${C.primary}40 0%, ${C.accent}40 100%)`,
                        borderRadius: 3,
                        flexShrink: 0,
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: MONO,
                        fontSize: 9,
                        color: C.text,
                        letterSpacing: '0.14em',
                      }}
                    >
                      MOCK
                    </div>
                  )}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 9,
                        color: C.textMuted,
                        letterSpacing: '0.1em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                      {s.kind === 'mock' ? ' · MOCK' : ''}
                    </div>
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: isActive ? 600 : 500,
                        marginTop: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {s.title[lang]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      <div
        style={{
          padding: '10px 22px',
          background: C.bg2,
          color: C.textMuted,
          borderTop: `1px solid ${C.border}`,
          fontFamily: FONT,
          fontSize: 12,
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        {lang === 'hu'
          ? 'Beacon Enterprise UI izelítő · 4 screenshot + 2 React mock · minden adat 100% kitalált'
          : 'Beacon Enterprise UI taster · 4 screenshots + 2 React mocks · all data 100% fictional'}
      </div>

      {zoom && shot.kind === 'image' && (
        <div
          onClick={() => setZoom(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.92)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'zoom-out',
            padding: 30,
          }}
        >
          <img
            src={`/beacon-shots/${shot.file}`}
            alt={shot.title.en}
            style={{ maxWidth: '95%', maxHeight: '95%', objectFit: 'contain', borderRadius: 6 }}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Dashboard mock — KPIs, team table, bottleneck callout
// ─────────────────────────────────────────────────────────────────────
function DashboardMock({ lang }: { lang: 'hu' | 'en' }) {
  const teams = [
    { name: 'Cyber-Sec EU Central', region: 'EU', alloc: 10.1, total: 12.0, util: 84 },
    { name: 'Automotive Compliance', region: 'DE', alloc: 5.7, total: 8.0, util: 71 },
    { name: 'TARA & HARA Specialists', region: 'EU', alloc: 5.5, total: 6.0, util: 92 },
    { name: 'Verification & Validation', region: 'IT', alloc: 7.0, total: 9.0, util: 78 },
    { name: 'Cloud-Sec & DevSecOps', region: 'PL', alloc: 4.6, total: 7.0, util: 66 },
  ];
  const bottleneck = teams.reduce((a, b) => (b.util > a.util ? b : a));
  const avgUtil = Math.round(teams.reduce((s, t) => s + t.util, 0) / teams.length);
  const overloaded = teams.filter((t) => t.util >= 85).length;

  return (
    <div style={{ padding: 22, maxHeight: 540, overflowY: 'auto' }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        <Kpi label={lang === 'hu' ? 'Aktív projekt' : 'Active projects'} value="14" tone={C.text} sub="↑ 2 / Q" />
        <Kpi label={lang === 'hu' ? 'Portfolio €' : 'Portfolio €'} value="4.57M" tone={C.primaryLight} sub="+11% YoY" />
        <Kpi label={lang === 'hu' ? 'Átlag util.' : 'Avg utilization'} value={`${avgUtil}%`} tone={C.accent} sub="cap 7 800 MD" />
        <Kpi
          label={lang === 'hu' ? 'Túlterhelt' : 'Overloaded'}
          value={`${overloaded}/${teams.length}`}
          tone={overloaded > 0 ? C.warning : C.success}
          sub={overloaded > 0 ? '⚠' : 'ok'}
        />
      </div>

      {/* Bottleneck callout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          background: 'rgba(255,107,0,0.08)',
          border: `1px solid ${C.accent}40`,
          borderLeft: `3px solid ${C.accent}`,
          borderRadius: 6,
          marginBottom: 18,
        }}
      >
        <AlertTriangle size={18} color={C.accent} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            {lang === 'hu' ? 'Bottleneck team detektálva' : 'Bottleneck team detected'}
          </div>
          <div style={{ fontSize: 11.5, color: C.textSecondary, marginTop: 2 }}>
            <strong>{bottleneck.name}</strong> ·{' '}
            {lang === 'hu' ? 'utilization' : 'utilization'}{' '}
            <span style={{ fontFamily: MONO, color: C.accent, fontWeight: 700 }}>{bottleneck.util}%</span>{' '}
            {lang === 'hu' ? '— hiring vagy scope-reduction javasolt' : '— hiring or scope reduction recommended'}
          </div>
        </div>
        <button
          style={{
            background: C.accent,
            color: '#fff',
            border: 0,
            padding: '6px 12px',
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
          }}
        >
          {lang === 'hu' ? 'Részletek' : 'Details'}
        </button>
      </div>

      {/* Team table */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
        <h4 style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>
          {lang === 'hu' ? 'Csapat-utilization' : 'Team utilization'}
        </h4>
        <span style={{ fontFamily: MONO, fontSize: 10, color: C.textMuted, letterSpacing: '0.08em' }}>
          ↻ 30s auto-refresh
        </span>
      </div>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead style={{ background: C.bg2 }}>
            <tr style={{ fontFamily: MONO, fontSize: 9.5, color: C.textMuted, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              <th style={th}>Team</th>
              <th style={th}>Region</th>
              <th style={{ ...th, textAlign: 'right' }}>FTE</th>
              <th style={th}>Utilization</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => {
              const tone = t.util >= 85 ? C.warning : t.util >= 70 ? C.primaryLight : C.success;
              return (
                <tr
                  key={i}
                  style={{ borderTop: `1px solid ${C.border}`, background: t.util >= 90 ? 'rgba(255,107,0,0.06)' : 'transparent' }}
                >
                  <td style={td}>{t.name}</td>
                  <td style={{ ...td, fontFamily: MONO, fontSize: 10.5, color: C.textSecondary }}>
                    {t.region}
                  </td>
                  <td style={{ ...td, textAlign: 'right', fontFamily: MONO, color: C.text }}>
                    {t.alloc.toFixed(1)} / {t.total.toFixed(1)}
                  </td>
                  <td style={td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 5, background: C.bg, borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${t.util}%`, height: '100%', background: tone }} />
                      </div>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 11.5,
                          fontWeight: 600,
                          color: tone,
                          minWidth: 38,
                          textAlign: 'right',
                        }}
                      >
                        {t.util}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Trend strip */}
      <div
        style={{
          marginTop: 14,
          background: C.bgCard,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <TrendingUp size={16} color={C.success} />
        <div style={{ flex: 1, fontSize: 12 }}>
          <strong>+11%</strong> {lang === 'hu' ? 'portfolio-érték YoY' : 'portfolio value YoY'}
          <span style={{ color: C.textSecondary, marginLeft: 6 }}>
            · {lang === 'hu' ? '4 új projekt H2-ben' : '4 new projects in H2'}
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 10, color: C.textMuted, letterSpacing: '0.08em' }}>
          FY 2026
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Projects kanban mock — 4 columns, draggable cards
// ─────────────────────────────────────────────────────────────────────
function ProjectsKanbanMock({ lang }: { lang: 'hu' | 'en' }) {
  const cols = [
    {
      key: 'concept',
      title: { hu: 'Koncepció', en: 'Concept' },
      tone: C.primary,
      cards: [
        { code: 'KB-FUT-001', name: 'Future Mobility ECU', complexity: 'Normal', md: 320, customer: 'OEM-A', deadline: '2026-Q4' },
        { code: 'KB-FLE-002', name: 'Fleet Telemetry Edge', complexity: 'Simple', md: 180, customer: 'OEM-B', deadline: '2026-Q3' },
      ],
    },
    {
      key: 'design',
      title: { hu: 'Tervezés', en: 'Design' },
      tone: C.primaryLight,
      cards: [
        { code: 'KB-OEM-Y', name: 'OEM-Y Telematics Hub', complexity: 'Normal', md: 521, customer: 'OEM-Y', deadline: '2027-Q1' },
        { code: 'KB-CAN-005', name: 'CAN Bus Hardening', complexity: 'Complex', md: 612, customer: 'OEM-A', deadline: '2027-Q2' },
        { code: 'KB-IVI-008', name: 'IVI Secure Update', complexity: 'Normal', md: 380, customer: 'Tier-1 IT', deadline: '2027-Q1' },
      ],
    },
    {
      key: 'impl',
      title: { hu: 'Implementáció', en: 'Implementation' },
      tone: C.accent,
      cards: [
        { code: 'KB-OEM-X', name: 'OEM-X Driver-Assist Gateway', complexity: 'Complex', md: 762, customer: 'OEM-X', deadline: '2026-Q4' },
        { code: 'KB-T1-ECU', name: 'Tier-1 ECU SecureBoot', complexity: 'Complex', md: 668, customer: 'Tier-1 DE', deadline: '2026-Q4' },
      ],
    },
    {
      key: 'verif',
      title: { hu: 'Verifikáció', en: 'Verification' },
      tone: C.success,
      cards: [
        { code: 'KB-DGW-011', name: 'Diagnostic Gateway V2', complexity: 'Normal', md: 410, customer: 'OEM-Z', deadline: '2026-Q3' },
        { code: 'KB-OTA-014', name: 'OTA Update Pipeline', complexity: 'Complex', md: 580, customer: 'Tier-1 PL', deadline: '2026-Q3' },
      ],
    },
  ];

  return (
    <div style={{ padding: 18, maxHeight: 540, overflowY: 'auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
          {lang === 'hu' ? 'Aktív projektek — fázisonként' : 'Active projects — by phase'}
        </h4>
        <span style={{ fontFamily: MONO, fontSize: 10, color: C.textMuted, letterSpacing: '0.08em' }}>
          {cols.reduce((s, c) => s + c.cards.length, 0)} {lang === 'hu' ? 'projekt' : 'projects'} · drag &amp; drop
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {cols.map((col) => (
          <div
            key={col.key}
            style={{
              background: C.bg2,
              border: `1px solid ${C.border}`,
              borderTop: `3px solid ${col.tone}`,
              borderRadius: 6,
              padding: 10,
              minHeight: 380,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: col.tone,
                }}
              >
                {col.title[lang]}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  color: C.textMuted,
                  background: C.bg,
                  padding: '1px 7px',
                  borderRadius: 3,
                }}
              >
                {col.cards.length}
              </span>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              {col.cards.map((card) => {
                const cTone = card.complexity === 'Complex' ? C.warning : card.complexity === 'Simple' ? C.success : C.primaryLight;
                return (
                  <div
                    key={card.code}
                    style={{
                      background: C.bgCard,
                      border: `1px solid ${C.border}`,
                      borderRadius: 5,
                      padding: '8px 10px',
                      cursor: 'grab',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ fontFamily: MONO, fontSize: 9.5, color: C.primaryLight, letterSpacing: '0.04em' }}>
                        {card.code}
                      </span>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 9,
                          padding: '1px 5px',
                          borderRadius: 3,
                          color: cTone,
                          border: `1px solid ${cTone}`,
                          letterSpacing: '0.06em',
                        }}
                      >
                        {card.complexity}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>
                      {card.name}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: MONO,
                        fontSize: 9.5,
                        color: C.textMuted,
                        letterSpacing: '0.06em',
                      }}
                    >
                      <span>{card.customer}</span>
                      <span>{card.md} MD</span>
                    </div>
                    <div
                      style={{
                        marginTop: 4,
                        fontFamily: MONO,
                        fontSize: 9,
                        color: C.textSecondary,
                        letterSpacing: '0.04em',
                      }}
                    >
                      ⏱ {card.deadline}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kpi({ label, value, tone, sub }: { label: string; value: string; tone: string; sub?: string }) {
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: '12px 14px',
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: C.textSecondary,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 22,
          fontWeight: 700,
          color: tone,
          marginTop: 4,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: MONO,
            fontSize: 9.5,
            color: C.textMuted,
            marginTop: 2,
            letterSpacing: '0.08em',
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

const th: React.CSSProperties = { textAlign: 'left', padding: '8px 12px', fontWeight: 500 };
const td: React.CSSProperties = { padding: '9px 12px' };
