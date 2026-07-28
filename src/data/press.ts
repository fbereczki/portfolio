import type { Lang } from '../i18n/translations';

/**
 * Lapzárta — press date of this edition. A build-time constant, NOT a runtime
 * "today": the masthead date only changes when a new edition actually ships.
 * Update manually on publish.
 */
export const PRESS_DATE = '2026-07-28';

export const PRESS_YEAR = Number(PRESS_DATE.slice(0, 4));

export function formatPressDate(lang: Lang): string {
  const d = new Date(`${PRESS_DATE}T00:00:00`);
  return d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
}
