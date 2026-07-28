import { Compass } from 'lucide-react';
import { Badge, Card } from '../../landing/ui';
import { useI18n } from '../../i18n/I18nProvider';

/* Beacon demo — the current ISO/SAE 21434 project-control product, shown with
   the seed dataset the product itself ships (customer names anonymised). The
   catalogue and engine figures are the real ones. */

const TILES = [
  {
    label: 'Work-package catalogue',
    value: '369.5 MD',
    verdict: '43 active work products · 156 tasks · tailored per project, never copy-pasted',
  },
  {
    label: 'Reference project total',
    value: '€536,818.75',
    verdict: 'held byte-identical by a regression shield — the cost engine cannot drift silently',
  },
  {
    label: 'Complexity multipliers',
    value: '0.85 / 1.00 / 1.15',
    verdict: 'simple · normal · complex — the only knob that scales a tailored plan',
  },
];

const GATES = [
  { code: 'DEMO-ECU', name: 'Truck ECU platform', customer: 'EU commercial-vehicle OEM', gate: 'G30', cpm: 'W21 2027', tone: 'ok' as const, status: 'on track', why: 'The resource-levelled critical path lands before the committed gate date.' },
  { code: 'DEMO-GW', name: 'Central gateway', customer: 'EU commercial-vehicle OEM', gate: 'G20', cpm: 'W44 2026', tone: 'ok' as const, status: 'float 11 wd', why: '11 working days of slack remain between the forecast and the committed date.' },
  { code: 'DEMO-ADAS', name: 'ADAS domain controller', customer: 'NA truck OEM', gate: 'G20', cpm: 'W02 2027', tone: 'warn' as const, status: 'commit at risk', why: 'The forecast has eaten the float — counter-moves ranked by cheapest option that still holds the gate.' },
  { code: 'DEMO-BMS', name: 'Battery management system', customer: 'EU commercial-vehicle OEM', gate: 'G10', cpm: 'W38 2026', tone: 'ok' as const, status: 'on track', why: 'The resource-levelled critical path lands before the committed gate date.' },
];

const CATALOGUE = [
  { code: 'NI-09', name: 'Cybersecurity RFQ', source: 'Non-ISO', md: '43.0' },
  { code: 'WP-07-01', name: 'Cybersecurity interface agreement', source: 'ISO §7', md: '8.0' },
  { code: 'WP-06-01', name: 'Cybersecurity plan & case', source: 'ISO §6', md: '13.5' },
  { code: 'WP-09-01', name: 'Item definition', source: 'ISO §9', md: '23.0' },
  { code: 'WP-09-02', name: 'TARA', source: 'ISO §9', md: '38.0' },
];

export function BeaconDemo() {
  const { lang } = useI18n();

  return (
    <div className="flex flex-col bg-bg-sunken">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2.5">
          <Compass size={13} className="shrink-0 text-accent" />
          <span className="truncate text-meta font-emph uppercase tracking-[0.14em] text-text-muted">
            Beacon · delivery plan · seeded demo projects
          </span>
        </span>
        <a
          href="https://imwy.ai/#beacon"
          target="_blank"
          rel="noreferrer noopener"
          className="shrink-0 text-meta font-emph uppercase tracking-[0.14em] text-accent underline-offset-2 transition-colors hover:text-accent-strong hover:underline"
        >
          imwy.ai/#beacon
        </a>
      </div>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
          {TILES.map((t) => (
            <Card key={t.label} className="flex flex-col p-4">
              <span className="text-meta font-emph uppercase tracking-[0.07em] text-text-muted">
                {t.label}
              </span>
              <span className="num mt-2 text-value font-value leading-none tracking-tight text-text-strong">
                {t.value}
              </span>
              <span className="mt-3 flex gap-2 border-t border-border pt-3 text-dense leading-snug text-text">
                <span className="shrink-0 font-emph text-accent">→</span>
                {t.verdict}
              </span>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
            <h4 className="text-title font-emph text-text-strong">Gate commitments</h4>
            <Badge tone="neutral" title="The product's own seed dataset; customer names anonymised.">
              demo data
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-dense">
              <thead>
                <tr>
                  {['Project', 'Customer', 'Next gate', 'CPM forecast', 'Verdict'].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-left text-meta font-emph uppercase tracking-[0.04em] text-text-muted"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GATES.map((g) => (
                  <tr key={g.code} className="border-b border-border transition-colors last:border-0 hover:bg-surface-2">
                    <td className="whitespace-nowrap px-3 py-2">
                      <span className="font-emph text-text-strong">{g.name}</span>
                      <span className="num ml-2 text-meta text-text-faint">{g.code}</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-text-muted">{g.customer}</td>
                    <td className="num whitespace-nowrap px-3 py-2 text-text">{g.gate}</td>
                    <td className="num whitespace-nowrap px-3 py-2 text-text">{g.cpm}</td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <Badge tone={g.tone} title={g.why}>{g.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-border px-4 py-2.5 text-meta text-text-faint">
            {lang === 'hu'
              ? 'Hét-pontosságú dátumok: a motor naptári napot számol, de a terv alatt munkanapok vannak ünnepnap-modell nélkül — a nap-pontosság hamis pontosság lenne.'
              : 'Week-precision dates on purpose: the engine computes calendar days, but under the plan there are working days with no holiday model — a day-precise date would claim precision the plan does not have.'}
          </p>
        </Card>

        <Card className="overflow-hidden">
          <div className="border-b border-border px-4 py-3">
            <h4 className="text-title font-emph text-text-strong">Work-package catalogue — sample</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-dense">
              <thead>
                <tr>
                  {['Code', 'Work product', 'Source', 'Effort'].map((h, i) => (
                    <th
                      key={h}
                      className={`whitespace-nowrap border-b border-border bg-surface-2 px-3 py-2 text-meta font-emph uppercase tracking-[0.04em] text-text-muted ${
                        i === 3 ? 'text-right' : 'text-left'
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATALOGUE.map((w) => (
                  <tr key={w.code} className="border-b border-border transition-colors last:border-0 hover:bg-surface-2">
                    <td className="num whitespace-nowrap px-3 py-2 text-text-muted">{w.code}</td>
                    <td className="px-3 py-2 text-text-strong">{w.name}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-text-muted">{w.source}</td>
                    <td className="num whitespace-nowrap px-3 py-2 text-right text-text">{w.md} MD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-border px-4 py-2.5 text-meta text-text-faint">
            {lang === 'hu'
              ? 'Minden munkacsomag ≤3–3,5 napos taskokra bontva, saját verifikációs review-val — a katalógus a tervezés alapja, a tailoring teszi projekt-specifikussá.'
              : 'Every work package is broken into tasks of ≤3–3.5 days with its own verification review — the catalogue is the baseline, tailoring makes it project-specific.'}
          </p>
        </Card>
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="flex gap-2 text-dense leading-snug text-text-muted">
          <span className="shrink-0 font-emph text-accent">→</span>
          {lang === 'hu'
            ? 'A számok a termék valós motorjából és katalógusából valók; a projektek a beépített demo-készlet, anonimizált ügyfelekkel. A képernyő, a DOCX, az XLSX és a PPTX mind ugyanebből a számításból olvas.'
            : 'The figures come from the product’s real engine and catalogue; the projects are its built-in demo set with customers anonymised. Screen, DOCX, XLSX and PPTX all read this same calculation.'}
        </p>
      </div>
    </div>
  );
}
