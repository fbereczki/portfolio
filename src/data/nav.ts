// Single source of truth for section order, §-numbering and exhibit letters.
// Sidebar, Section headers and the Hero masthead all derive from this list —
// never hardcode a § number in a component.

export const CASE_NO = 'BF-2026';

export type NavGroup = 'case' | 'evidence' | 'closing';

export type NavEntry = {
  /** DOM id of the section (anchor target without '#') */
  id: string;
  /** §-number, zero-padded — unique across the document */
  num: string;
  /** Exhibit letter for evidence sections (A = key evidence) */
  exhibit?: 'A' | 'B' | 'C' | 'D' | 'E';
  group: NavGroup;
};

export const NAV: NavEntry[] = [
  { id: 'top', num: '00', group: 'case' },
  { id: 'about', num: '01', group: 'case' },
  { id: 'experience', num: '02', group: 'case' },
  { id: 'skills', num: '03', group: 'case' },
  { id: 'codewitness-spotlight', num: '04', exhibit: 'A', group: 'evidence' },
  { id: 'sil', num: '05', exhibit: 'B', group: 'evidence' },
  { id: 'projects', num: '06', exhibit: 'C', group: 'evidence' },
  { id: 'ai', num: '07', exhibit: 'D', group: 'evidence' },
  { id: 'blockchain', num: '08', exhibit: 'E', group: 'evidence' },
  { id: 'compliance', num: '09', group: 'closing' },
  { id: 'contact', num: '10', group: 'closing' },
];

export function navEntry(id: string): NavEntry | undefined {
  return NAV.find((n) => n.id === id);
}
