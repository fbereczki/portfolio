# Self-hosted webfonts

The cockpit's fonts are **self-hosted** — there is NO runtime CDN / Google-Fonts
fetch. The `@font-face` rules live in `apps/app/src/fonts.css` (imported from
`main.tsx`, bundled by Vite) and point at the local woff2 in this directory.
The family strings are single-sourced from
`packages/design-system/src/theme/fontStacks.ts` (`UI_FONT_STACK` /
`SERIF_DISPLAY_STACK` / `MONO_FONT_STACK`) — the whole UI follows one source (U2).

## The faces (all full Latin-Extended — Hungarian ő ű Ő Ű covered)

| Family | Role | Files (latin + latin-ext) |
|--------|------|---------------------------|
| **Hanken Grotesk** (var 100–900) | the ONE UI + heading face | `HankenGrotesk-latin.woff2`, `HankenGrotesk-latin-ext.woff2` |
| **Fraunces** (var 100–900) | editorial display serif (WITNESS_SERIF) | `Fraunces-latin.woff2`, `Fraunces-latin-ext.woff2` |
| **IBM Plex Mono** (400 · 600) | evidence face (hashes / IDs / timestamps) | `IBMPlexMono-latin-400.woff2`, `IBMPlexMono-latin-ext-400.woff2`, `IBMPlexMono-latin-600.woff2`, `IBMPlexMono-latin-ext-600.woff2` |

Each `@font-face` is split by `unicode-range` (`latin` vs `latin-ext`) so the
browser fetches the Latin-Extended subset only when the text needs it — full
Hungarian coverage with no extra bytes on ASCII-only screens.

## Why these files were replaced (2026-07-22 glyph-audit)

The previous woff2 set was subsetted to **Basic-Latin only** (no Latin-Extended-A),
so every Hungarian double-acute — **ő ű Ő Ű** (U+0150/0151/0170/0171) — was absent
from all faces and fell back to a mismatched system serif (the "broken character").
The old heading face (Space Grotesk) never shipped a binary at all, and IBM Plex
Sans (the retired proto body) had the same missing-glyph subset. The current set
ships both Latin subsets per family and covers the full Hungarian alphabet.

## To update a face

Any ONE of:

1. `npm pack @fontsource-variable/<font>` (or `@fontsource/<font>` for static),
   extract, and copy the `*-latin-*.woff2` + `*-latin-ext-*.woff2` here.
2. Download the upstream OFL release woff2 and save with the names above.

Then update the family string in `fontStacks.ts` and the `@font-face`
`src`/`unicode-range` in `fonts.css`. No per-component change is needed — the UI
reads the family from `UI_FONT_STACK`.

Licences: Hanken Grotesk (OFL-1.1), Fraunces (OFL-1.1), IBM Plex Mono (OFL-1.1) —
embedding / self-hosting permitted.
