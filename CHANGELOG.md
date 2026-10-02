# Changelog

All notable changes to EMCD DS 2.0 libraries and tokens. Format: [Keep a Changelog](https://keepachangelog.com), versions: [SemVer](https://semver.org).

- **MAJOR** — something removed or renamed in a way that breaks consumers (variable/style/component deleted, mode removed).
- **MINOR** — new tokens, styles, components, icons, illustrations, brands or modes.
- **PATCH** — value tweaks and fixes that keep names and structure.

One version covers all libraries released together. In the Figma *Publish* dialog write only `vX.Y.Z — <one line>` and keep the details here.

## [Unreleased]

### Added
- `text/on-warning` (neutral/950 in both themes) — text and icons on `status/warning/solid` (amber/500). White on amber fails contrast (2.15:1), dark passes (9.8:1).
- Exported to repo: `control/box`, `control/box-hover`, `control/track-hover`, `control/track-disabled`, `control/knob`, `control/knob-disabled`, `touch/is-fine`, `touch/is-coarse` (were in Figma, missing in `figma/export-*.json`).
- `surface/nested` (level 2: dark #1a1a1a, light #fafafa); surface level rules and button pairing in `docs/components.md`.
- Button-aligned tokens: `action/success/*`, `action/inverse/*`, `radius/control-sm`, `radius/focus-ring(-sm)`, `focus/offset`, `control/height/xl`, `control/padding-x/xl`.
- Accessibility rules for all components (focus, keyboard map, VoiceOver/TalkBack, touch targets, reduced motion) in `docs/components.md`.

### Changed
- Control fills are translucent so controls read on every surface level (L0 / L1 / L2 / raised) in both themes: `control/track` black 12% / white 16%, `-hover` 16% / 24%, `-disabled` 4% / 8%; `control/box` dark white 8%, `-hover` 12%; `control/knob-disabled` dark white 24%; `control/surface/disabled` black 4% / white 4% (disabled no longer darker than its background).
- Components: Checkbox, Radio, Toggle rebuilt on `control/*` tokens, label centred on the control; Toggle has no Danger. Button, Icon button, Checkbox, Radio, Toggle: two hit-area layers — `fine` max(size, 24) shown by `touch/is-fine`, `coarse` max(size, 44) shown by `touch/is-coarse`.
- Control heights 32 / 40 / 48 / 56 (S/M/L/XL), paddings 10 / 14 / 16 / 20.
- Dark theme matches current products: `action/secondary/*`, `action/disabled` = #1a1a1a; danger/success fills = legacy Error/Success; EMCD primary hover = violet/700.
- EMCD focus colour = lime (lime/500 dark, lime/700 light); `border/accent` now brand `accent/solid` (not focus).
- `Focus/Ring` effect: two-layer gap ring (2px background gap + 2px `border/focus`).
- `docs/color-migration.csv` + Figma page «🔁 Migration · legacy → DS 2.0» in Foundations: 66 legacy colour tokens (DS Web, DS App, DS Site) mapped to DS 2.0 Theme tokens with status (= / ≈ / Δ).
- Lite mode `build/css/perf-low.css`: no blur, opaque glass for `[data-perf="low"]`, reduced transparency, no backdrop-filter.
- Icons in repo: `icons/svg` (118, strokes, currentColor, non-scaling stroke), `icons/flutter` (outlined), `icons/manifest.json`; `npm run icons` exports from Figma.
- Blur: primitives `blur/*`, semantic `effect/blur/glass-sm|md|lg`, `effect/blur/edge`, `effect/blur/backdrop` (Platform), `layout/edge-fade`; Glass styles bound to tokens; progressive `Edge/Top`, `Edge/Bottom` styles; `docs/effects.md`.
- `docs/icons.md`: icon rules — strokes not outlines, stroke weight token, optical keylines, sizes, colour, export (web SVG strokes / Flutter outlined).
- `stroke/1-7`; `icon/stroke/regular` is now 1.7 on App (Web/Site 1.5).
- `docs/icons-audit.csv`: usage audit of icons in Mining Web App + App (52 pages), mapping legacy names → `icon/<name>`; audit board in Figma (Icons › Audit).
- `CONTRIBUTING.md`: simple rules for designers (who edits, how to propose a change, naming, versioning).

### Fixed
- Boolean tokens (`mode/is-*`, `touch/is-*`) were built as `dimension` (`truepx`, `NaNrem`); now `$type: boolean`.

## [0.2.0] — 2026-10-01

### Added
- **Brand** mode *Performa* (experimental, other business unit) with yellow ramp; brand-aware `accent/fg-on-light|dark`, `accent/fg-strong-on-light|dark`, `accent/focus-on-light|dark` so accent text and focus stay ≥4.5:1 / ≥3:1 on every brand.
- **Theme**: `fixed/light`, `fixed/dark`, `shadow/ambient|key|strong`, `surface/glass`, boolean `mode/is-light`, `mode/is-dark` (drive theme-specific art layers).
- **Fonts**: `font/family/mono` (IBM Plex Mono) for tables, charts, hashes; free fallbacks IBM Plex Sans Thai, IBM Plex Sans Hebrew, Noto Sans Arabic. WL Default switched to IBM Plex Sans.
- **Styles** (Figma): 20 text styles bound to Brand font family and Viewport size/line-height; 9 effect styles (Elevation 1–4, Hairline, Focus ring, Glass S/M/L); grid styles `Layout/Columns` (adaptive 4/8/12) and `Layout/Baseline 4`.
- **Code syntax** on every variable (Dev Mode shows `var(--token-name)`).
- **Build**: rem output for sizes, px for strokes, em media queries, fluid type 360→1600 px, root scaling at 2560/3840/7680 px, Flutter JSON with numeric sizes.
- **Icons** (pilot, 12): single glyph bound to `icon/primary` and `icon/size/md`, hidden editable `source` layer.
- **Illustrations**: `status/success|pending|error|warning|attention`, `security/2fa|api-keys` — square, theme-switching art layers.

### Changed
- Dimension primitives renamed to rem notation: `dimension/16` → `dimension/x1` (1rem), `dimension/4` → `dimension/x0-25`.
- `shadow/color` → `shadow/key`.

### Fixed
- CSS layer order: default (`:root`) layers are imported first so `[data-brand|theme|platform]` overrides win.

## [0.1.0] — 2026-10-01

### Added
- Foundations: Primitives (Color, Scale), Brand (EMCD, Geometria, WL Default), Theme (Light, Dark), Platform (Web, App, Site), Viewport (Compact → XLarge). WCAG 2.2 AA checked semantic colours.
- Repo: Figma export → DTCG tokens → Style Dictionary (CSS layers, Flutter JSON).
