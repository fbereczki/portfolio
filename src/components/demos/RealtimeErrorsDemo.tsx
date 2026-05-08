import { useEffect, useState } from 'react';
import { AlertTriangle, X, ChevronDown } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

const POOL = [
  { type: 'TypeError', msg: "Cannot read properties of undefined (reading 'id')", file: 'UserCard.tsx:42', sev: 'error' },
  { type: 'NetworkError', msg: 'Failed to fetch /api/projects (502)', file: 'projects.service.ts:18', sev: 'warn' },
  { type: 'UnhandledRejection', msg: 'Login token expired', file: 'auth/refresh.ts:91', sev: 'error' },
  { type: 'ResourceLoad', msg: 'Failed to load: /static/img/banner.webp', file: 'Hero.tsx:11', sev: 'info' },
  { type: 'TypeError', msg: "Cannot read properties of null (reading 'addEventListener')", file: 'Modal.tsx:7', sev: 'error' },
];

type Ev = { id: number; ts: string; type: string; msg: string; file: string; sev: string };

export function RealtimeErrorsDemo() {
  const { lang } = useI18n();
  const [events, setEvents] = useState<Ev[]>([]);

  useEffect(() => {
    let id = 0;
    const i = setInterval(() => {
      const p = POOL[Math.floor(Math.random() * POOL.length)];
      const ts = new Date().toLocaleTimeString();
      setEvents((es) => [{ id: ++id, ts, ...p }, ...es].slice(0, 10));
    }, 1400);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="min-h-[500px] bg-[#0d0f15] p-6 text-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
            Realtime Error Monitoring
          </div>
          <div className="text-lg font-bold text-white">
            {lang === 'hu' ? 'Élő error stream' : 'Live error stream'}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Stat
            label="error/min"
            value={(events.filter((e) => e.sev === 'error').length * 2).toString()}
            tone="red"
          />
          <Stat label="active" value={events.length.toString()} tone="cyan" />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
        <div className="grid grid-cols-[80px_120px_1fr_180px_50px] border-b border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-wider text-slate-400">
          <div>Time</div>
          <div>Type</div>
          <div>Message</div>
          <div>File</div>
          <div className="text-center">×</div>
        </div>
        <div className="max-h-[360px] overflow-y-auto">
          {events.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-slate-500">
              {lang === 'hu' ? 'Várakozás eseményekre…' : 'Waiting for events…'}
            </div>
          )}
          {events.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-[80px_120px_1fr_180px_50px] border-b border-white/5 px-4 py-2.5 text-xs hover:bg-white/[0.02]"
            >
              <div className="font-mono text-slate-500">{e.ts}</div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle
                  size={11}
                  className={
                    e.sev === 'error'
                      ? 'text-red-400'
                      : e.sev === 'warn'
                      ? 'text-amber-400'
                      : 'text-sky-400'
                  }
                />
                <span
                  className={
                    e.sev === 'error'
                      ? 'text-red-300'
                      : e.sev === 'warn'
                      ? 'text-amber-300'
                      : 'text-sky-300'
                  }
                >
                  {e.type}
                </span>
              </div>
              <div className="text-slate-200">{e.msg}</div>
              <div className="font-mono text-slate-400">{e.file}</div>
              <div className="cursor-pointer text-center text-slate-600 hover:text-slate-300">
                <X size={12} className="inline" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 text-[10px] text-slate-500">
          <span>SDK · TypeScript · v0.6.2 · queue · auto-retry</span>
          <ChevronDown size={12} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: 'red' | 'cyan' }) {
  const c = tone === 'red' ? 'text-red-400' : 'text-cyan-400';
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-center">
      <div className={`font-mono text-lg font-bold ${c}`}>{value}</div>
      <div className="text-[9px] uppercase text-slate-500">{label}</div>
    </div>
  );
}
