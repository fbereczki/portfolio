import { useI18n } from '../i18n/I18nProvider';
import { profile } from '../data/profile';
import { PRESS_YEAR } from '../data/press';

export function Footer() {
  const { t, lang } = useI18n();
  return (
    <footer className="border-t border-paper-rule bg-paper-deep/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rule-double mb-8" />
        <div className="ornament mb-8 font-mono">·&nbsp;·&nbsp;·</div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
            {t.footer.colophon}
          </div>
          <div className="font-serif italic text-ink-soft">
            {lang === 'hu' ? 'Szedve: ' : 'Set in '}
            <span className="accent-italic">Fraunces</span>,{' '}
            <span className="accent-italic">Spectral</span> &amp;{' '}
            <span className="accent-italic">JetBrains Mono</span>.
          </div>
          <div className="font-serif text-[13.5px] italic text-ink-mute">{t.footer.built}</div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            © {PRESS_YEAR} · {profile.name} ·{' '}
            {lang === 'hu' ? 'Minden jog fenntartva' : 'All rights reserved'}
          </div>
        </div>
      </div>
    </footer>
  );
}
