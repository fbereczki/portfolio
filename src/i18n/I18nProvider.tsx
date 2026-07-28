import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { translations, type Lang, type Translations } from './translations';

// English-only surface (K11): the HU branch stays in translations.ts as an
// archive, but is not reachable — no toggle, no persistence.
const LANG: Lang = 'en';

type Ctx = {
  lang: Lang;
  t: Translations;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useMemo<Ctx>(() => ({ lang: LANG, t: translations[LANG] as Translations }), []);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
