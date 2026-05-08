import { useEffect, useMemo, useState } from 'react';
import { Map, Vote, Users, Coins } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// Civix taster — Hungarian counties + EU members map.
// Real geometry from /mnt/d/DEV/hope/.../static/data/{hungary-counties.json, world-map-paths.json}
// Civix dark theme (gold + teal accent)

const C = {
  bg: '#0f0f14',
  bg2: '#18181f',
  bg3: '#1a1a2e',
  surface: '#18181f',
  text: '#f0f0f5',
  textSecondary: '#a8a8b8',
  textMuted: '#6e6e80',
  border: '#2d2d45',
  borderLight: '#1e1e30',
  gold: '#FFB74D',
  goldDark: '#F57C00',
  goldLight: 'rgba(255,183,77,0.12)',
  goldBorder: 'rgba(255,183,77,0.3)',
  teal: '#14b8a6',
  tealLight: 'rgba(20,184,166,0.12)',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

const FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';
const MONO = '"JetBrains Mono", monospace';

// Mock voter turnout per county (0–1)
const TURNOUT: Record<string, number> = {
  Budapest: 0.78,
  Pest: 0.72,
  'Borsod-Abaúj-Zemplén': 0.61,
  'Hajdú-Bihar': 0.66,
  'Szabolcs-Szatmár-Bereg': 0.58,
  'Jász-Nagykun-Szolnok': 0.62,
  'Bács-Kiskun': 0.65,
  Békés: 0.6,
  Csongrád: 0.69,
  Fejér: 0.73,
  'Győr-Moson-Sopron': 0.74,
  Heves: 0.64,
  'Komárom-Esztergom': 0.67,
  Nógrád: 0.59,
  Somogy: 0.63,
  Tolna: 0.66,
  Baranya: 0.7,
  Vas: 0.71,
  Veszprém: 0.69,
  Zala: 0.68,
};

const POPULATION: Record<string, number> = {
  Budapest: 1750000, Pest: 1300000, 'Borsod-Abaúj-Zemplén': 660000,
  'Hajdú-Bihar': 540000, 'Szabolcs-Szatmár-Bereg': 560000,
  'Jász-Nagykun-Szolnok': 380000, 'Bács-Kiskun': 520000, Békés: 350000,
  Csongrád: 410000, Fejér: 430000, 'Győr-Moson-Sopron': 450000, Heves: 300000,
  'Komárom-Esztergom': 310000, Nógrád: 190000, Somogy: 320000, Tolna: 230000,
  Baranya: 380000, Vas: 260000, Veszprém: 360000, Zala: 280000,
};

// EU members (minus UK which is in europe-paths.json but no longer EU)
const EU_MEMBERS = new Set([
  'Hungary', 'Germany', 'France', 'Italy', 'Spain', 'Poland', 'Romania',
  'Netherlands', 'Belgium', 'Greece', 'Portugal', 'Czech Republic', 'Sweden',
  'Austria', 'Ireland', 'Denmark', 'Finland', 'Bulgaria', 'Slovakia',
  'Croatia', 'Lithuania', 'Slovenia', 'Latvia', 'Estonia', 'Cyprus',
  'Luxembourg', 'Malta',
]);

// HU bbox for projection
const HU = { lngMin: 16.0, lngMax: 23.0, latMin: 45.7, latMax: 48.6 };
const HU_W = 460;
const HU_H = 280;

// Equirectangular projection — fine for small areas like HU
function projectHu(lng: number, lat: number): [number, number] {
  const x = ((lng - HU.lngMin) / (HU.lngMax - HU.lngMin)) * HU_W;
  const y = ((HU.latMax - lat) / (HU.latMax - HU.latMin)) * HU_H;
  return [x, y];
}

function ringToPath(ring: number[][]): string {
  return ring
    .map((c, i) => {
      const [x, y] = projectHu(c[0], c[1]);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ') + 'Z';
}

function geomToPath(geom: { type: string; coordinates: unknown }): string {
  if (geom.type === 'Polygon') {
    return (geom.coordinates as number[][][]).map(ringToPath).join(' ');
  }
  if (geom.type === 'MultiPolygon') {
    return (geom.coordinates as number[][][][])
      .map((poly) => poly.map(ringToPath).join(' '))
      .join(' ');
  }
  return '';
}

// turnout → color (gold gradient: low=dim, high=bright)
function turnoutColor(pct: number): string {
  // 0.55 → 0.80 typical range
  const t = Math.min(1, Math.max(0, (pct - 0.55) / 0.25));
  const r = Math.round(245 - (245 - 255) * t); // 245 → 255
  const g = Math.round(124 + (203 - 124) * t); // 124 → 203
  const b = Math.round(0 + (128 - 0) * t); // 0 → 128
  return `rgb(${r},${g},${b})`;
}

type HuFeature = { properties: { megye: string }; geometry: { type: string; coordinates: unknown } };

// Compute bbox from a collection of pre-projected SVG path strings
function pathsBBox(paths: string[]): { x: number; y: number; w: number; h: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of paths) {
    const tokens = p.match(/-?\d+(?:\.\d+)?/g);
    if (!tokens) continue;
    for (let i = 0; i < tokens.length; i += 2) {
      const x = parseFloat(tokens[i]);
      const y = parseFloat(tokens[i + 1]);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

export function CivixDemo() {
  const { lang } = useI18n();
  const [huData, setHuData] = useState<HuFeature[] | null>(null);
  const [euData, setEuData] = useState<Record<string, string> | null>(null);
  const [hovered, setHovered] = useState<string | null>('Budapest');

  // EU map pan + zoom state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    fetch('/hu-counties-real.json')
      .then((r) => r.json())
      .then((d: { features: HuFeature[] }) => setHuData(d.features))
      .catch(() => setHuData([]));
    fetch('/europe-paths.json')
      .then((r) => r.json())
      .then((d: Record<string, string>) => setEuData(d))
      .catch(() => setEuData({}));
  }, []);

  // Compute EU map bbox from EU+EFTA member paths only
  const euBBox = useMemo(() => {
    if (!euData) return { x: 250, y: 100, w: 360, h: 420 };
    const memberPaths = Object.entries(euData)
      .filter(([k]) => EU_MEMBERS.has(k) || ['Norway', 'Switzerland', 'United Kingdom'].includes(k))
      .map(([, v]) => v);
    const bb = pathsBBox(memberPaths);
    if (!Number.isFinite(bb.x)) return { x: 250, y: 100, w: 360, h: 420 };
    const pad = Math.max(bb.w, bb.h) * 0.04;
    return { x: bb.x - pad, y: bb.y - pad, w: bb.w + pad * 2, h: bb.h + pad * 2 };
  }, [euData]);

  const viewBox = useMemo(() => {
    const w = euBBox.w / zoom;
    const h = euBBox.h / zoom;
    const x = euBBox.x + (euBBox.w - w) / 2 + pan.x;
    const y = euBBox.y + (euBBox.h - h) / 2 + pan.y;
    return `${x} ${y} ${w} ${h}`;
  }, [euBBox, zoom, pan]);

  const huPaths = useMemo(() => {
    if (!huData) return [];
    return huData.map((f) => ({
      name: f.properties.megye,
      d: geomToPath(f.geometry),
    }));
  }, [huData]);

  const focused = hovered || 'Budapest';
  const turnout = TURNOUT[focused] ?? 0;
  const pop = POPULATION[focused] ?? 0;

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
              width: 30,
              height: 30,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldDark} 100%)`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: C.bg3,
            }}
          >
            CX
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Civix Platform</div>
            <div style={{ fontSize: 10, color: C.textSecondary, marginTop: 1 }}>
              Civic engagement · transparency · Hope chain
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              border: `1px solid ${C.goldBorder}`,
              background: C.goldLight,
              color: C.gold,
              fontSize: 11,
              fontWeight: 600,
              borderRadius: 6,
            }}
          >
            <Coins size={11} /> CRED token live
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              color: C.textSecondary,
              padding: '4px 10px',
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              letterSpacing: '0.06em',
            }}
          >
            106 OEVK · 2026
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 280px', gap: 0, minHeight: 600 }}>
        {/* HU map */}
        <div style={{ background: C.bg2, borderRight: `1px solid ${C.border}`, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Map size={13} color={C.gold} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: C.gold,
                textTransform: 'uppercase',
              }}
            >
              — Magyarország · választókerületek
            </span>
          </div>
          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: 12,
              position: 'relative',
            }}
          >
            <svg viewBox={`0 0 ${HU_W} ${HU_H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              {huPaths.length === 0 && (
                <text x={HU_W / 2} y={HU_H / 2} fill={C.textMuted} fontSize="10" textAnchor="middle" fontFamily={MONO}>
                  loading geometry…
                </text>
              )}
              {huPaths.map((p) => {
                const t = TURNOUT[p.name] ?? 0.65;
                const isFocused = p.name === focused;
                return (
                  <path
                    key={p.name}
                    d={p.d}
                    fill={isFocused ? C.gold : turnoutColor(t)}
                    fillOpacity={isFocused ? 0.9 : 0.55}
                    stroke={C.bg}
                    strokeWidth={0.6}
                    onMouseEnter={() => setHovered(p.name)}
                    style={{ cursor: 'pointer', transition: 'fill-opacity 100ms' }}
                  />
                );
              })}
            </svg>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: MONO,
                fontSize: 9.5,
                color: C.textMuted,
                letterSpacing: '0.06em',
              }}
            >
              <span>Részvétel</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span>55%</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: 80,
                    height: 6,
                    background: `linear-gradient(90deg, rgb(245,124,0), rgb(255,203,128))`,
                    borderRadius: 2,
                  }}
                />
                <span>80%</span>
              </div>
            </div>
          </div>
        </div>

        {/* EU map */}
        <div style={{ background: C.bg2, borderRight: `1px solid ${C.border}`, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <Map size={13} color={C.teal} />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.16em',
                color: C.teal,
                textTransform: 'uppercase',
              }}
            >
              — EU · tagállamok
            </span>
          </div>
          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: 12,
              position: 'relative',
            }}
          >
            <svg
              viewBox={viewBox}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                cursor: drag ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
              onMouseDown={(e) => {
                setDrag({ x: e.clientX, y: e.clientY, px: pan.x, py: pan.y });
              }}
              onMouseMove={(e) => {
                if (!drag) return;
                const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
                const scale = euBBox.w / zoom / rect.width;
                setPan({
                  x: drag.px - (e.clientX - drag.x) * scale,
                  y: drag.py - (e.clientY - drag.y) * scale,
                });
              }}
              onMouseUp={() => setDrag(null)}
              onMouseLeave={() => setDrag(null)}
              onWheel={(e) => {
                e.preventDefault();
                const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
                setZoom((z) => Math.min(8, Math.max(0.5, z * factor)));
              }}
            >
              {!euData && (
                <text x={380} y={270} fill={C.textMuted} fontSize="10" textAnchor="middle" fontFamily={MONO}>
                  loading geometry…
                </text>
              )}
              {euData &&
                Object.entries(euData).map(([country, d]) => {
                  const isMember = EU_MEMBERS.has(country);
                  const isHu = country === 'Hungary';
                  return (
                    <path
                      key={country}
                      d={d}
                      fill={isHu ? C.gold : isMember ? C.teal : C.bg3}
                      fillOpacity={isHu ? 0.9 : isMember ? 0.5 : 0.18}
                      stroke={C.bg}
                      strokeWidth={0.4}
                    />
                  );
                })}
            </svg>

            {/* Zoom controls */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <ZoomBtn onClick={() => setZoom((z) => Math.min(8, z * 1.3))}>+</ZoomBtn>
              <ZoomBtn onClick={() => setZoom((z) => Math.max(0.5, z / 1.3))}>−</ZoomBtn>
              <ZoomBtn
                onClick={() => {
                  setZoom(1);
                  setPan({ x: 0, y: 0 });
                }}
                title="Reset"
              >
                ⌂
              </ZoomBtn>
            </div>

            <div
              style={{
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                fontFamily: MONO,
                fontSize: 9.5,
                color: C.textMuted,
                letterSpacing: '0.06em',
              }}
            >
              <div style={{ display: 'flex', gap: 12 }}>
                <Legend swatch={C.gold} text="HU" />
                <Legend swatch={C.teal} text="EU member" />
                <Legend swatch={C.bg3} text="other" />
              </div>
              <span style={{ color: C.textSecondary }}>
                drag · scroll {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar with focused-county data */}
        <aside style={{ background: C.bg2, padding: 18 }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 9.5,
              color: C.textMuted,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {lang === 'hu' ? 'Megye' : 'County'}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, lineHeight: 1.1 }}>{focused}</div>

          <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
            <Stat label={lang === 'hu' ? 'Részvétel' : 'Turnout'} value={`${(turnout * 100).toFixed(1)}%`} tone={C.gold} />
            <Stat label={lang === 'hu' ? 'Lakosság' : 'Population'} value={pop.toLocaleString('hu-HU')} tone={C.text} />
            <Stat label={lang === 'hu' ? 'OEVK kerület' : 'OEVK districts'} value={(focused === 'Budapest' ? 18 : focused === 'Pest' ? 10 : Math.max(2, Math.round(pop / 110000))).toString()} tone={C.teal} />
          </div>

          <div
            style={{
              marginTop: 18,
              padding: 12,
              background: C.tealLight,
              border: `1px solid ${C.teal}40`,
              borderRadius: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.teal }}>
              <Vote size={12} />
              <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {lang === 'hu' ? 'Aktív szavazás' : 'Active vote'}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 5 }}>
              {lang === 'hu' ? 'Lakossági fórum — közlekedés' : 'Town-hall — transport'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: C.textSecondary, marginTop: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Users size={10} /> 4 932
              </span>
              <span style={{ fontFamily: MONO, color: C.warning }}>3 ó hátra</span>
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              padding: 10,
              background: C.bg3,
              border: `1px solid ${C.borderLight}`,
              borderRadius: 6,
              fontFamily: MONO,
              fontSize: 10,
              color: C.textSecondary,
              lineHeight: 1.7,
            }}
          >
            <div style={{ color: C.teal }}>chain Civix-Net</div>
            <div>block #1 481 209</div>
            <div>tx 0x9f3a…ab21</div>
            <div>gas 0.0008 CRED</div>
          </div>
        </aside>
      </div>

      {/* Footer hint */}
      <div
        style={{
          padding: '10px 22px',
          background: C.bg2,
          borderTop: `1px solid ${C.border}`,
          fontFamily: MONO,
          fontSize: 10,
          color: C.textMuted,
          letterSpacing: '0.06em',
          textAlign: 'center',
        }}
      >
        {lang === 'hu'
          ? 'Vidd az egeret bármelyik megye fölé · adatok mock — geometria valódi (Civix /static/data/)'
          : 'Hover any county · data is mocked — geometry is real (Civix /static/data/)'}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: '10px 12px' }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 9.5,
          color: C.textMuted,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: tone, marginTop: 3, letterSpacing: '-0.01em' }}>
        {value}
      </div>
    </div>
  );
}

function Legend({ swatch, text }: { swatch: string; text: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <span style={{ width: 9, height: 9, background: swatch, borderRadius: 1 }} />
      {text}
    </span>
  );
}

function ZoomBtn({
  onClick,
  children,
  title,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 26,
        height: 26,
        background: C.bg2,
        border: `1px solid ${C.border}`,
        color: C.textSecondary,
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
        borderRadius: 4,
        display: 'grid',
        placeItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = C.goldLight;
        e.currentTarget.style.color = C.gold;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = C.bg2;
        e.currentTarget.style.color = C.textSecondary;
      }}
    >
      {children}
    </button>
  );
}
