import { useState } from 'react';
import { AlertTriangle, Car, Shield, ShieldCheck, FileText, Activity } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// Faithful 1:1 reproduction of /mnt/d/DEV/AEGIS - 5/frontend/src/index.css
// AEGIS dark theme — pure black + silver accent + navy depth.

const C = {
  bgPrimary: '#000000',
  bgSecondary: '#0a0a0a',
  bgTertiary: '#141414',
  bgNavy: '#1a2332',
  silver: '#c0c0c0',
  lightSilver: '#e5e5e5',
  darkSilver: '#8a8a8a',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#2a2a2a',
  // Status (TARA severities)
  high: '#FF6B6B',
  medium: '#FFD93D',
  low: '#6BCB77',
  // Accent for selection
  navyTransparent: 'rgba(26, 35, 50, 0.5)',
};

const FONT = '"Inter", -apple-system, "Segoe UI", sans-serif';
const MONO = '"JetBrains Mono", monospace';

const VEHICLES = [
  { id: 'OEM-X-2030', model: 'Sedan EV-Pro', asil: 'D', threats: 12, mitigated: 11 },
  { id: 'OEM-X-2031', model: 'SUV Hybrid', asil: 'C', threats: 8, mitigated: 8 },
  { id: 'OEM-X-2032', model: 'Truck Auto', asil: 'B', threats: 5, mitigated: 4 },
];

const NAV = [
  { icon: Activity, label: 'Overview', active: true },
  { icon: Car, label: 'Vehicles' },
  { icon: FileText, label: 'TARA / HARA' },
  { icon: ShieldCheck, label: 'Compliance' },
  { icon: AlertTriangle, label: 'Incidents' },
];

export function AegisDashboard() {
  const { lang } = useI18n();
  const [selected, setSelected] = useState(0);
  const v = VEHICLES[selected];
  const compliance = Math.round((v.mitigated / v.threats) * 100);

  return (
    <div
      style={{
        background: C.bgPrimary,
        color: C.text,
        fontFamily: FONT,
        minHeight: 540,
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: C.bgSecondary,
          borderRight: `1px solid ${C.border}`,
          padding: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <Shield size={18} color={C.silver} strokeWidth={1.5} />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: C.silver,
            }}
          >
            AEGIS
          </span>
        </div>

        <div style={{ display: 'grid', gap: 2 }}>
          {NAV.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  borderLeft: `2px solid ${it.active ? C.silver : 'transparent'}`,
                  background: it.active ? C.bgNavy : 'transparent',
                  color: it.active ? C.lightSilver : C.textSecondary,
                  fontSize: 12.5,
                  fontWeight: it.active ? 500 : 400,
                  cursor: 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                <Icon size={13} strokeWidth={1.5} />
                {it.label}
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 32,
            padding: 12,
            border: `1px solid ${C.border}`,
            borderRadius: 4,
            background: C.bgTertiary,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 9.5,
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: C.darkSilver,
              textTransform: 'uppercase',
            }}
          >
            Standards
          </div>
          <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
            ISO/SAE 21434
            <br />
            ISO 26262 (ASIL)
            <br />
            UN R155 / R156
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ padding: 24 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingBottom: 16,
            borderBottom: `1px solid ${C.border}`,
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: C.darkSilver,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              {lang === 'hu' ? 'Jármű kiválasztva' : 'Selected vehicle'}
            </div>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4, letterSpacing: '-0.01em' }}>
              {v.model}{' '}
              <span style={{ fontFamily: MONO, fontSize: 13, color: C.darkSilver, fontWeight: 400 }}>
                · {v.id}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {VEHICLES.map((veh, i) => (
              <button
                key={veh.id}
                onClick={() => setSelected(i)}
                style={{
                  background: i === selected ? C.lightSilver : 'transparent',
                  border: `1px solid ${i === selected ? C.lightSilver : C.border}`,
                  color: i === selected ? '#000' : C.textSecondary,
                  padding: '7px 14px',
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  marginLeft: i > 0 ? -1 : 0,
                }}
              >
                {veh.id}
              </button>
            ))}
          </div>
        </div>

        {/* KPI tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          <Tile label={lang === 'hu' ? 'ASIL szint' : 'ASIL level'} value={v.asil} accent={C.silver} />
          <Tile label={lang === 'hu' ? 'Fenyegetések' : 'Threats'} value={String(v.threats)} accent={C.medium} />
          <Tile label={lang === 'hu' ? 'Mitigálva' : 'Mitigated'} value={String(v.mitigated)} accent={C.low} />
          <Tile
            label={lang === 'hu' ? 'Megfelelés' : 'Compliance'}
            value={`${compliance}%`}
            accent={compliance > 95 ? C.low : C.medium}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
          {/* TARA panel */}
          <div
            style={{
              background: C.bgSecondary,
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: C.silver,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              — {lang === 'hu' ? 'TARA fenyegetésvektorok' : 'TARA threat vectors'}
            </div>
            {[
              { name: 'CAN bus injection', sev: 'High' },
              { name: 'OTA update MITM', sev: 'High' },
              { name: 'Telematics replay', sev: 'Medium' },
              { name: 'Bluetooth pairing flood', sev: 'Low' },
            ].map((tt) => {
              const sevColor = tt.sev === 'High' ? C.high : tt.sev === 'Medium' ? C.medium : C.low;
              return (
                <div
                  key={tt.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: `1px solid ${C.border}`,
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: C.text }}>{tt.name}</span>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9.5,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      border: `1px solid ${sevColor}`,
                      color: sevColor,
                      fontWeight: 600,
                    }}
                  >
                    {tt.sev}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SIL/HIL pipeline */}
          <div
            style={{
              background: C.bgSecondary,
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                color: C.silver,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              — {lang === 'hu' ? 'SIL/HIL teszt-folyamat' : 'SIL/HIL test pipeline'}
            </div>
            {[
              { step: 'unit-tests', state: 'pass' },
              { step: 'static-analysis (MISRA-C)', state: 'pass' },
              { step: 'SIL simulation · ECU-A', state: 'pass' },
              { step: 'SIL simulation · ECU-B', state: 'pass' },
              { step: 'HIL bench · CAN/LIN', state: 'running' },
              { step: 'fault-injection · OTA', state: 'queued' },
            ].map((s) => {
              const stateColor =
                s.state === 'pass' ? C.low : s.state === 'running' ? C.silver : C.darkSilver;
              return (
                <div
                  key={s.step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderBottom: `1px solid ${C.border}`,
                    background: s.state === 'running' ? C.navyTransparent : 'transparent',
                    fontFamily: MONO,
                    fontSize: 11.5,
                  }}
                >
                  <span style={{ color: C.textSecondary }}>{s.step}</span>
                  <span
                    style={{
                      color: stateColor,
                      fontWeight: 600,
                      animation: s.state === 'running' ? 'pulse 2s infinite' : 'none',
                    }}
                  >
                    {s.state}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      style={{
        background: C.bgSecondary,
        border: `1px solid ${C.border}`,
        borderRadius: 4,
        padding: '14px 16px',
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          color: C.darkSilver,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 32,
          fontWeight: 700,
          color: accent,
          marginTop: 6,
          letterSpacing: '-0.02em',
        }}
      >
        {value}
      </div>
    </div>
  );
}
