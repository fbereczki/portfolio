import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-paper-rule bg-paper-deep/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rule-double mb-8" />
        <div className="ornament mb-8 font-mono">·&nbsp;·&nbsp;·</div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
            colophon
          </div>
          <div className="font-serif italic text-ink-soft">
            Set in <span className="accent-italic">Fraunces</span>,{' '}
            <span className="accent-italic">Spectral</span> &amp;{' '}
            <span className="accent-italic">JetBrains Mono</span>.
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            © {year} · {profile.name} ·{' '}
            {lang === 'hu' ? 'Minden jog fenntartva' : 'All rights reserved'}
          </div>
          {t.footer.built && (
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              {t.footer.built}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
