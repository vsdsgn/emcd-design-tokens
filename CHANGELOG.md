# Changelog

All notable changes to EMCD DS 2.0 libraries and tokens. Format: [Keep a Changelog](https://keepachangelog.com), versions: [SemVer](https://semver.org).

- **MAJOR** — something removed or renamed in a way that breaks consumers (variable/style/component deleted, mode removed).
- **MINOR** — new tokens, styles, components, icons, illustrations, brands or modes.
- **PATCH** — value tweaks and fixes that keep names and structure.

One version covers all libraries released together. In the Figma *Publish* dialog write only `vX.Y.Z — <one line>` and keep the details here.

## [Unreleased]

### Changed
- Components brought back to legacy form and logic (migration ±4 px, axes 1:1), map in `docs/migration/components.csv`:
  Badge (lg 36 / md 24 / sm 20, Close, Counter, Chevron, State Skeleton); Table cell (9 legacy types, Align = mirror, Skeleton), Table row Regular 72, Table header cell Skeleton; Menu item (label 16, 44/62, Checkbox) and Menu (padding 8, Search); Toast (416, padding 20, icon 24, title 16, Timer, full-width Button); Alert (tinted + tone text, no border, icon optional); Banner (Buttons: Bottom filled / Bottom hug / Right hug / None, Align Center, 24 icon, tone border, radius 12); Tabs (indicator 3/2, Skeleton, Size XL 64 = Navigation header); Chip (Layout Vertical 64×64); Tooltip (1.5 form: 320, radius 16, text 16, Content Text/Custom); Empty state (illustration 200, Layout H/V, Dashed background); Modal (Header Title/Coin/Empty × Footer Single/Stacked/Horizontal/None, 540, Display/MD, XL buttons); List item (Content types, Style Plain/Card, Size L/M, Leading 36); Legend item (State Default/Hover/Active/Skeleton + Legend swatch); Sheet (Type Menu = bottom sheet menu); Nav item (36, radius 12, icon 24, text 16); Sidebar (header 72, Balance widget, nav divider).
- Added: Select compact (legacy Selector small), Balance widget, Legend swatch.

### Added
- Components (Status: beta): Menu item + Menu (slots Leading/Trailing/Items), Select (built from Input instances), Alert, Banner, Toast, Empty state (slots Illustration/Actions), Progress + Progress circle, Legend item, Modal, Sheet, Side panel (slots Header actions/Body/Footer), List item, Stat card (Default + Skeleton), Table header cell, Table cell, Table row, Table (slots Toolbar/Rows/Footer), Nav item, Tab bar item, Tab bar, Sidebar, Top bar, Page header, Shell (Large/Compact, slot Content). Reference screen «Дашборд Mining» (Large Light/Dark, Compact) on 🧪 Playground.
- Icons: `alert-circle`, `check-circle`, `alert-triangle` (Lucide geometry on the keyline).
- `status/{success,warning,danger,info}/on-subtle`, `accent/on-subtle` — text on subtle tints, ≥ 5.7:1 in both themes (light 700, amber 800; dark 300).
- Components (Status: beta): Tab + Tabs (M 48 / L 56, underline, Counter), Segment + Segmented (S/M/L/XL = field sizes, tone only on the selected segment: Neutral / Accent / Success / Danger), Chip (S 32 / M 40, selected = inverse, Meta, Remove), Badge (6 tones × Subtle/Solid × S/M/L, non-interactive), Counter (S/M, Neutral/Accent/Danger), Status (dot + label, 5 tones), Tooltip (Top/Bottom/Left/Right/None). Every component has the usage block (when / when not / rules / a11y / search / legacy).
- `control/segment-track`, `control/segment`, `control/segment-hover` (Segmented; translucent so it reads on L1 and L2).
- `text/on-warning` (neutral/950 in both themes) — text and icons on `status/warning/solid` (amber/500). White on amber fails contrast (2.15:1), dark passes (9.8:1).
- Exported to repo: `control/box`, `control/box-hover`, `control/track-hover`, `control/track-disabled`, `control/knob`, `control/knob-disabled`, `touch/is-fine`, `touch/is-coarse` (were in Figma, missing in `figma/export-*.json`).
- `surface/nested` (level 2: dark #1a1a1a, light #fafafa); surface level rules and button pairing in `docs/components.md`.
- Button-aligned tokens: `action/success/*`, `action/inverse/*`, `radius/control-sm`, `radius/focus-ring(-sm)`, `focus/offset`, `control/height/xl`, `control/padding-x/xl`.
- Accessibility rules for all components (focus, keyboard map, VoiceOver/TalkBack, touch targets, reduced motion) in `docs/components.md`.

### Changed
- Dark `status/*/subtle` and `accent/subtle` 900 → 950 (`accent/subtle-hover` 850 → 900) — matches legacy tinted surfaces.
- Rebound after publish: Segment/Segmented → `control/segment*`; Badge Subtle text → `on-subtle`, Badge Warning Solid → `text/on-warning`; Alert/Banner/Toast status icons → `check-circle` / `alert-triangle` / `alert-circle`.
- Colour ramps regenerated in OKLCH (violet, green, red, amber, blue, lime, yellow, electric-green, electric-blue): step 500 is the anchor and keeps its hex; lightness evenly spaced to 50 / 950; dark half keeps the 500 hue; one chroma curve; sRGB clip. Fixes lime (flat 50–500, cliff at 600, olive drift from 700), electric-green (400 darker than 500), yellow (cliff 700→800). Neutral and alpha unchanged. Before/after page «🎨 Ramps · OKLCH» in Foundations.
- EMCD `accent/focus-on-light` lime/700 → lime/800 (5.0:1 on white); `data/8` light lime/600 → lime/800.
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
- Icons: `icon/arrow-up` pointed down (copy of `arrow-down` without rotation).
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
