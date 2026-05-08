import { useEffect, useMemo, useState } from 'react';
import { Hash, Cpu, Coins, Vote, ShieldAlert, Play, RefreshCw } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

// GamfCoin PoC — interactive blockchain primer.
// Four small playgrounds matching the §06 Blockchain section:
//   1. Hash-chain (live SHA-like hashing of typed text)
//   2. PoW miner (loop until hash starts with N zeros)
//   3. PoS lot selection (weighted random by stake)
//   4. Voting cycle (5-step animation)

const C = {
  paper: '#F4EFE3',
  paperDeep: '#EAE2CF',
  paperRule: '#C9BFA4',
  paperCard: '#FBF7EC',
  ink: '#1A1B22',
  inkSoft: '#3A3B43',
  inkMute: '#6B6A63',
  inkFaint: '#8E8B7E',
  oxblood: '#7E1E1B',
  oxbloodSoft: '#A85049',
  amber: '#9C6F1A',
  sage: '#3F6B47',
  teal: '#1F5566',
};
const FRAUNCES = '"Fraunces", Georgia, serif';
const SPECTRAL = '"Spectral", Georgia, serif';
const MONO = '"JetBrains Mono", monospace';

// ── tiny FNV-1a-ish hash (NOT cryptographic — illustrative only) ──
function tinyHash(s: string): string {
  let h = 0xcbf29ce484222325n;
  const FNV_PRIME = 0x100000001b3n;
  for (let i = 0; i < s.length; i++) {
    h ^= BigInt(s.charCodeAt(i));
    h = (h * FNV_PRIME) & 0xffffffffffffffffn;
  }
  // mix more for visual diversity
  h ^= h << 13n;
  h ^= h >> 7n;
  h &= 0xffffffffffffffffn;
  return '0x' + h.toString(16).padStart(16, '0').slice(0, 12);
}

// Crypto-strong hex used inside browsers for the PoW miner (need hex prefix matching)
async function sha256Hex(s: string): Promise<string> {
  const buf = new TextEncoder().encode(s);
  const dig = await crypto.subtle.digest('SHA-256', buf);
  return '0x' + Array.from(new Uint8Array(dig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function BlockchainDemo() {
  const { lang } = useI18n();
  const [tab, setTab] = useState<'chain' | 'pow' | 'pos' | 'vote'>('chain');

  return (
    <div style={{ background: C.paper, minHeight: 720, fontFamily: SPECTRAL, color: C.ink }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 22px',
          background: C.ink,
          color: C.paper,
          borderBottom: `1px solid ${C.paperRule}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              border: `1.5px dashed ${C.oxbloodSoft}`,
              display: 'grid',
              placeItems: 'center',
              fontFamily: FRAUNCES,
              fontWeight: 700,
              fontSize: 13,
              fontStyle: 'italic',
              color: C.oxbloodSoft,
              transform: 'rotate(-3deg)',
            }}
          >
            G
          </div>
          <div>
            <div
              style={{
                fontFamily: FRAUNCES,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: '-0.01em',
              }}
            >
              GamfCoin{' '}
              <em style={{ color: C.oxbloodSoft, fontStyle: 'italic' }}>PoC</em>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, color: '#8A8676', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              GAMF · 2022 thesis · 99 pages · 30+ tests
            </div>
          </div>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            border: `1.5px dashed ${C.oxbloodSoft}`,
            color: C.oxbloodSoft,
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          <ShieldAlert size={11} /> Proof-of-concept · NOT production
        </span>
      </div>

      {/* Tab strip */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          background: C.paperDeep,
          borderBottom: `1px solid ${C.paperRule}`,
        }}
      >
        <Tab active={tab === 'chain'} onClick={() => setTab('chain')} icon={<Hash size={13} />}>
          {lang === 'hu' ? 'Hash-chain' : 'Hash-chain'}
        </Tab>
        <Tab active={tab === 'pow'} onClick={() => setTab('pow')} icon={<Cpu size={13} />}>
          PoW miner
        </Tab>
        <Tab active={tab === 'pos'} onClick={() => setTab('pos')} icon={<Coins size={13} />}>
          PoS lot
        </Tab>
        <Tab active={tab === 'vote'} onClick={() => setTab('vote')} icon={<Vote size={13} />}>
          {lang === 'hu' ? 'Szavazás' : 'Voting'}
        </Tab>
      </div>

      <div style={{ padding: 22, maxHeight: 600, overflowY: 'auto' }}>
        {tab === 'chain' && <HashChainDemo lang={lang} />}
        {tab === 'pow' && <PowDemo lang={lang} />}
        {tab === 'pos' && <PosDemo lang={lang} />}
        {tab === 'vote' && <VotingDemo lang={lang} />}
      </div>

      {/* Bottom disclaimer — strong */}
      <div
        style={{
          padding: '10px 22px',
          background: C.ink,
          color: C.paper,
          borderTop: `1px solid ${C.paperRule}`,
          fontFamily: SPECTRAL,
          fontSize: 12,
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        {lang === 'hu'
          ? '⚠ Akadémiai célú PoC · 2022-es szakdolgozat · NEM termék · NEM auditált · NEM produkción használt. Az elvek élesedtek a Civix Platform-ban.'
          : '⚠ Academic PoC · 2022 thesis · NOT a product · NOT audited · NOT deployed. The principles graduated to Civix Platform.'}
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
        background: active ? C.paper : 'transparent',
        color: active ? C.oxblood : C.inkMute,
        border: 0,
        borderBottom: active ? `2px solid ${C.oxblood}` : '2px solid transparent',
        padding: '10px 16px',
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: active ? 600 : 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
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

// ─────────────────────────────────────────────────────────────────────
// 1. Hash-chain demo — type text, see the chain mutate
// ─────────────────────────────────────────────────────────────────────
function HashChainDemo({ lang }: { lang: 'hu' | 'en' }) {
  const [b1, setB1] = useState('alice → bob: 5 CRED');
  const [b2, setB2] = useState('bob → carol: 2 CRED');
  const [b3, setB3] = useState('carol → dave: 1 CRED');
  const [tampered, setTampered] = useState(false);

  // Compute chained hashes — block N hash includes block N-1 hash
  const chain = useMemo(() => {
    const genesis = '0x000000000000';
    const data = [b1, b2, b3];
    const out: { idx: number; data: string; prev: string; hash: string }[] = [];
    let prev = genesis;
    for (let i = 0; i < data.length; i++) {
      const hash = tinyHash(`${i}|${prev}|${data[i]}`);
      out.push({ idx: i, data: data[i], prev, hash });
      prev = hash;
    }
    return out;
  }, [b1, b2, b3]);

  // If tampered: recompute from b2 onward but show that ALL subsequent prev_hashes are now mismatched
  const tamperedB1 = 'alice → bob: 500 CRED';
  const tamperedChain = useMemo(() => {
    if (!tampered) return null;
    const genesis = '0x000000000000';
    const data = [tamperedB1, b2, b3];
    const out: { idx: number; data: string; prev: string; hash: string }[] = [];
    let prev = genesis;
    for (let i = 0; i < data.length; i++) {
      const hash = tinyHash(`${i}|${prev}|${data[i]}`);
      out.push({ idx: i, data: data[i], prev, hash });
      prev = hash;
    }
    return out;
  }, [tampered, b2, b3]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
        <h3 style={{ fontFamily: FRAUNCES, fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-0.02em' }}>
          {lang === 'hu' ? 'Hash-chain ' : 'Hash-chain '}
          <em style={{ color: C.oxblood, fontStyle: 'italic' }}>
            {lang === 'hu' ? 'élőben' : 'live'}
          </em>
        </h3>
        <button
          onClick={() => setTampered((v) => !v)}
          style={{
            marginLeft: 'auto',
            background: tampered ? C.oxblood : 'transparent',
            color: tampered ? C.paper : C.oxblood,
            border: `1px solid ${C.oxblood}`,
            padding: '5px 12px',
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          {tampered
            ? lang === 'hu' ? '✓ Módosítás bekapcsolva' : '✓ Tamper enabled'
            : lang === 'hu' ? 'Próbáld módosítani Block 0-t' : 'Try tampering with Block 0'}
        </button>
      </div>
      <p style={{ fontFamily: SPECTRAL, fontStyle: 'italic', color: C.inkMute, fontSize: 13, margin: '0 0 18px' }}>
        {lang === 'hu'
          ? 'Írj bármilyen szöveget a block-okba — a hash-ek azonnal frissülnek. A "Próbáld módosítani"-val visszamenőleg írunk az 1. blockba — látszik, hogy az ÖSSZES utána lévő hash megváltozik.'
          : 'Type anything into the blocks — hashes update live. "Try tampering" rewrites Block 0 retroactively — watch every subsequent hash change.'}
      </p>

      <div style={{ display: 'grid', gap: 10 }}>
        {(tamperedChain ?? chain).map((blk, i) => {
          const setters = [setB1, setB2, setB3];
          const original = chain[i];
          const isMismatch = tampered && i > 0 && blk.prev !== chain[i - 1].hash;
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 1.5fr 1fr',
                gap: 10,
                padding: '10px 12px',
                border: `1px solid ${C.paperRule}`,
                background: C.paperCard,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FRAUNCES,
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.ink,
                  textAlign: 'center',
                  background: C.paperDeep,
                  padding: '4px 0',
                }}
              >
                #{i}
              </div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: C.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  data
                </div>
                <input
                  value={tampered && i === 0 ? tamperedB1 : [b1, b2, b3][i]}
                  onChange={(e) => !tampered && setters[i](e.target.value)}
                  disabled={tampered && i === 0}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    borderBottom: `1px solid ${C.paperRule}`,
                    fontFamily: SPECTRAL,
                    fontSize: 14,
                    color: C.ink,
                    padding: '4px 0',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: C.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  prev_hash
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: isMismatch ? C.oxblood : C.inkSoft,
                    fontWeight: isMismatch ? 700 : 400,
                    padding: '4px 0',
                  }}
                >
                  {blk.prev}
                  {isMismatch && (
                    <span style={{ marginLeft: 6, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                      ⚠ mismatch
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: C.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  hash
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: tampered && original.hash !== blk.hash ? C.oxblood : C.oxblood,
                    fontWeight: 700,
                    padding: '4px 0',
                  }}
                >
                  {blk.hash}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {tampered && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            border: `2px solid ${C.oxblood}`,
            background: 'rgba(126,30,27,0.05)',
            color: C.oxblood,
            fontFamily: SPECTRAL,
            fontSize: 13.5,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          {lang === 'hu'
            ? '↑ A Block #0 adata "5 CRED"-ről "500 CRED"-re módosítva. A hash megváltozott, és mivel Block #1 prev_hash-e a régire mutat, az egész chain érvénytelenné válik. Ez a manipuláció matematikai lehetetlensége.'
            : '↑ Block #0 data changed from "5 CRED" to "500 CRED". The hash mutated, and since Block #1 prev_hash points to the old one, the entire chain is now invalid. This is the mathematical impossibility of tampering.'}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 2. PoW miner — find nonce so SHA-256 starts with N zeros
// ─────────────────────────────────────────────────────────────────────
function PowDemo({ lang }: { lang: 'hu' | 'en' }) {
  const [difficulty, setDifficulty] = useState(3);
  const [data, setData] = useState('block-data-2026');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ nonce: number; hash: string; ms: number; tries: number } | null>(null);

  async function mine() {
    setRunning(true);
    setResult(null);
    const target = '0' + '0'.repeat(difficulty); // "0x" + N zeros
    const t0 = performance.now();
    let nonce = 0;
    let hash = '';
    while (true) {
      hash = await sha256Hex(`${data}|${nonce}`);
      if (hash.slice(0, 2 + difficulty) === target) break;
      nonce++;
      if (nonce > 200000) break; // safety cap
      if (nonce % 5000 === 0) {
        // yield to UI
        await new Promise((r) => setTimeout(r, 0));
      }
    }
    const ms = Math.round(performance.now() - t0);
    setResult({ nonce, hash, ms, tries: nonce + 1 });
    setRunning(false);
  }

  return (
    <div>
      <h3 style={{ fontFamily: FRAUNCES, fontSize: 22, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
        PoW miner — <em style={{ color: C.oxblood, fontStyle: 'italic' }}>find a valid nonce</em>
      </h3>
      <p style={{ fontFamily: SPECTRAL, fontStyle: 'italic', color: C.inkMute, fontSize: 13, margin: '0 0 18px' }}>
        {lang === 'hu'
          ? `A miner addig próbál nonce-okat, amíg a SHA-256(data|nonce) ${difficulty} darab nullával nem kezdődik. Ez a "computational work" — ${Math.pow(16, difficulty)} ~ ${(Math.pow(16, difficulty) / 1000).toFixed(0)}K várható próba.`
          : `The miner tries nonces until SHA-256(data|nonce) starts with ${difficulty} zeros. This is "computational work" — ~${Math.pow(16, difficulty).toLocaleString()} expected tries.`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
        <Field label={lang === 'hu' ? 'Block data' : 'Block data'}>
          <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            disabled={running}
            style={inputStyle}
          />
        </Field>
        <Field label={`${lang === 'hu' ? 'Nehézség' : 'Difficulty'} · ${difficulty} ${lang === 'hu' ? 'nulla' : 'zeros'}`}>
          <input
            type="range"
            min={1}
            max={5}
            value={difficulty}
            onChange={(e) => setDifficulty(parseInt(e.target.value))}
            disabled={running}
            style={{ width: '100%' }}
          />
        </Field>
      </div>

      <button
        onClick={mine}
        disabled={running}
        style={{
          background: C.oxblood,
          color: C.paper,
          border: 0,
          padding: '10px 22px',
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: running ? 'wait' : 'pointer',
          opacity: running ? 0.6 : 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {running ? <RefreshCw size={12} className="animate-spin" /> : <Play size={12} />}
        {running ? (lang === 'hu' ? 'Bányászik…' : 'Mining…') : lang === 'hu' ? 'Bányászás indít' : 'Start mining'}
      </button>

      {result && (
        <div
          style={{
            marginTop: 18,
            padding: 14,
            background: C.paperCard,
            border: `1px solid ${C.sage}`,
            borderLeft: `4px solid ${C.sage}`,
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 10, color: C.sage, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
            ✓ Block found
          </div>
          <div style={{ fontFamily: MONO, fontSize: 12, color: C.ink, lineHeight: 1.8 }}>
            nonce&nbsp;&nbsp;<span style={{ color: C.oxblood, fontWeight: 700 }}>{result.nonce.toLocaleString()}</span>
            <br />
            hash&nbsp;&nbsp;&nbsp;<span style={{ color: C.oxblood, fontWeight: 700 }}>{result.hash.slice(0, 18)}…{result.hash.slice(-6)}</span>
            <br />
            tries&nbsp;&nbsp;{result.tries.toLocaleString()}
            <br />
            time&nbsp;&nbsp;&nbsp;{result.ms} ms
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 3. PoS lot — weighted random by stake
// ─────────────────────────────────────────────────────────────────────
function PosDemo({ lang }: { lang: 'hu' | 'en' }) {
  const [validators, setValidators] = useState([
    { name: 'Alice', stake: 800 },
    { name: 'Bob', stake: 500 },
    { name: 'Carol', stake: 200 },
    { name: 'Dave', stake: 100 },
  ]);
  const [seed, setSeed] = useState('block-1481209');
  const [winner, setWinner] = useState<{ name: string; lot: number; threshold: number } | null>(null);

  const totalStake = validators.reduce((s, v) => s + v.stake, 0);

  async function draw() {
    setWinner(null);
    // deterministic: hash(seed) → bigint mod totalStake
    const hash = await sha256Hex(seed);
    const bn = BigInt('0x' + hash.slice(2, 18)); // first 16 hex chars = 64-bit
    const lot = Number(bn % BigInt(totalStake));
    let acc = 0;
    let chosen = validators[0];
    for (const v of validators) {
      acc += v.stake;
      if (lot < acc) {
        chosen = v;
        break;
      }
    }
    setWinner({ name: chosen.name, lot, threshold: totalStake });
  }

  return (
    <div>
      <h3 style={{ fontFamily: FRAUNCES, fontSize: 22, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
        PoS lot — <em style={{ color: C.oxblood, fontStyle: 'italic' }}>weighted random forger selection</em>
      </h3>
      <p style={{ fontFamily: SPECTRAL, fontStyle: 'italic', color: C.inkMute, fontSize: 13, margin: '0 0 18px' }}>
        {lang === 'hu'
          ? 'A forger-t (block-író) a stake súlyozottan determinisztikusan választjuk: hash(seed) mod totalStake = lot. A nagyobb stake-kel rendelkező validator-ok arányosan többször nyernek — energia-fogyasztás nélkül.'
          : 'The forger (block writer) is selected stake-weighted and deterministically: hash(seed) mod totalStake = lot. Validators with higher stake win proportionally — without energy consumption.'}
      </p>

      <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        {validators.map((v, i) => {
          const pct = (v.stake / totalStake) * 100;
          const isWinner = winner?.name === v.name;
          return (
            <div
              key={v.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 90px 60px',
                gap: 10,
                alignItems: 'center',
                padding: '10px 12px',
                background: isWinner ? 'rgba(63,107,71,0.08)' : C.paperCard,
                border: `1px solid ${isWinner ? C.sage : C.paperRule}`,
                borderLeft: isWinner ? `4px solid ${C.sage}` : `1px solid ${C.paperRule}`,
              }}
            >
              <div style={{ fontFamily: SPECTRAL, fontSize: 14, fontWeight: 600 }}>
                {v.name} {isWinner && <span style={{ color: C.sage, marginLeft: 4 }}>✓</span>}
              </div>
              <div style={{ height: 8, background: C.paperDeep, position: 'relative' }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: isWinner ? C.sage : C.oxblood,
                    transition: 'width 200ms',
                  }}
                />
              </div>
              <input
                type="number"
                min={50}
                max={2000}
                step={50}
                value={v.stake}
                onChange={(e) => {
                  const next = [...validators];
                  next[i] = { ...v, stake: parseInt(e.target.value) || 0 };
                  setValidators(next);
                }}
                style={{
                  ...inputStyle,
                  fontFamily: MONO,
                  textAlign: 'right',
                  fontSize: 13,
                }}
              />
              <span style={{ fontFamily: MONO, fontSize: 11, color: C.inkMute, textAlign: 'right' }}>
                {pct.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <Field label={lang === 'hu' ? 'Seed (block-id)' : 'Seed (block-id)'}>
          <input value={seed} onChange={(e) => setSeed(e.target.value)} style={inputStyle} />
        </Field>
        <button
          onClick={draw}
          style={{
            alignSelf: 'flex-end',
            background: C.oxblood,
            color: C.paper,
            border: 0,
            padding: '10px 22px',
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Coins size={12} /> {lang === 'hu' ? 'Sorsolás' : 'Draw'}
        </button>
      </div>

      {winner && (
        <div
          style={{
            padding: 14,
            background: C.paperCard,
            border: `1px solid ${C.sage}`,
            borderLeft: `4px solid ${C.sage}`,
            fontFamily: MONO,
            fontSize: 12,
            color: C.ink,
            lineHeight: 1.8,
          }}
        >
          <div style={{ fontSize: 10, color: C.sage, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
            ✓ Forger selected
          </div>
          winner&nbsp;&nbsp;<span style={{ color: C.oxblood, fontWeight: 700 }}>{winner.name}</span>
          <br />
          lot&nbsp;&nbsp;&nbsp;&nbsp;{winner.lot} / {winner.threshold}
          <br />
          method&nbsp;&nbsp;hash(seed) mod totalStake
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 4. Voting cycle — 5-step animation with cast → mempool → block → tally
// ─────────────────────────────────────────────────────────────────────
function VotingDemo({ lang }: { lang: 'hu' | 'en' }) {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const stages = [
    { key: 'cast', hu: 'Voter — szavazat leadása', en: 'Voter — cast ballot' },
    { key: 'sign', hu: 'Encrypt + sign — ECDSA aláírás', en: 'Encrypt + sign — ECDSA signature' },
    { key: 'mempool', hu: 'Mempool — p2p broadcast', en: 'Mempool — p2p broadcast' },
    { key: 'block', hu: 'Block — konszenzus pecsét', en: 'Block — consensus seal' },
    { key: 'tally', hu: 'Tally — public aggregation', en: 'Tally — public aggregation' },
  ];

  async function play() {
    setRunning(true);
    setStage(0);
    for (let i = 0; i < stages.length; i++) {
      setStage(i + 1);
      await new Promise((r) => setTimeout(r, 700));
    }
    setRunning(false);
  }

  return (
    <div>
      <h3 style={{ fontFamily: FRAUNCES, fontSize: 22, fontWeight: 600, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
        {lang === 'hu' ? 'Szavazási ciklus ' : 'Voting cycle '}
        <em style={{ color: C.oxblood, fontStyle: 'italic' }}>
          {lang === 'hu' ? 'animálva' : 'animated'}
        </em>
      </h3>
      <p style={{ fontFamily: SPECTRAL, fontStyle: 'italic', color: C.inkMute, fontSize: 13, margin: '0 0 18px' }}>
        {lang === 'hu'
          ? 'A szavazó identitása az aláírás után elválik a tartalomtól: a chain az anonim szavazatokat aggregálja, az identitás csak a "sign" lépésig látszik. Tamper-evident, mégis titkosság-megőrző.'
          : 'After signing, voter identity is detached from content: the chain aggregates anonymous ballots, identity is visible only up to the "sign" step. Tamper-evident yet secrecy-preserving.'}
      </p>

      <div style={{ display: 'flex', gap: 0, marginBottom: 18 }}>
        {stages.map((s, i) => {
          const reached = stage > i;
          const current = stage === i + 1;
          const tones = [C.teal, C.amber, C.inkMute, C.oxblood, C.sage];
          const tone = tones[i] ?? C.inkMute;
          return (
            <div
              key={s.key}
              style={{
                flex: 1,
                position: 'relative',
                padding: '14px 12px',
                background: reached || current ? C.paperCard : C.paperDeep,
                border: `2px solid ${reached || current ? tone : C.paperRule}`,
                borderRight: i < stages.length - 1 ? 'none' : `2px solid ${reached || current ? tone : C.paperRule}`,
                opacity: reached || current ? 1 : 0.5,
                transition: 'all 250ms',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: 12,
                  background: reached || current ? tone : C.paperRule,
                  color: C.paper,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  fontFamily: FRAUNCES,
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.ink,
                  marginTop: 6,
                }}
              >
                {s[lang].split(' — ')[0]}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  color: C.inkMute,
                  letterSpacing: '0.12em',
                }}
              >
                {s[lang].split(' — ')[1] || ''}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={play}
        disabled={running}
        style={{
          background: C.oxblood,
          color: C.paper,
          border: 0,
          padding: '10px 22px',
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: running ? 'wait' : 'pointer',
          opacity: running ? 0.6 : 1,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Play size={12} /> {running ? (lang === 'hu' ? 'Fut…' : 'Running…') : lang === 'hu' ? 'Lejátszás' : 'Play cycle'}
      </button>

      {stage === stages.length && (
        <div
          style={{
            marginTop: 16,
            padding: 14,
            background: C.paperCard,
            border: `1px solid ${C.sage}`,
            borderLeft: `4px solid ${C.sage}`,
            fontFamily: SPECTRAL,
            fontSize: 13.5,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          {lang === 'hu'
            ? '✓ Szavazási ciklus lefutott. Az aggregált eredmény publikus, a szavazók identitása nem deríthető ki — paper-ballot helyett tamper-evident számolás.'
            : '✓ Voting cycle complete. The aggregated tally is public; voter identity is not recoverable — tamper-evident counting in lieu of paper ballots.'}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: MONO, fontSize: 9.5, color: C.inkMute, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 5 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: C.paperCard,
  border: `1px solid ${C.paperRule}`,
  fontFamily: SPECTRAL,
  fontSize: 14,
  color: C.ink,
  padding: '7px 10px',
  outline: 'none',
};
