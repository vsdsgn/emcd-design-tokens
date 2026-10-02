# Changelog

All notable changes to EMCD DS 2.0 libraries and tokens. Format: [Keep a Changelog](https://keepachangelog.com), versions: [SemVer](https://semver.org).

- **MAJOR** — something removed or renamed in a way that breaks consumers (variable/style/component deleted, mode removed).
- **MINOR** — new tokens, styles, components, icons, illustrations, brands or modes.
- **PATCH** — value tweaks and fixes that keep names and structure.

One version covers all libraries released together. In the Figma *Publish* dialog write only `vX.Y.Z — <one line>` and keep the details here.

## [Unreleased]

### Added
- `docs/icons.md`: icon rules — strokes not outlines, stroke weight token, optical keylines, sizes, colour, export (web SVG strokes / Flutter outlined).
- `stroke/1-7`; `icon/stroke/regular` is now 1.7 on App (Web/Site 1.5).
- `docs/icons-audit.csv`: usage audit of icons in Mining Web App + App (52 pages), mapping legacy names → `icon/<name>`; audit board in Figma (Icons › Audit).
- `CONTRIBUTING.md`: simple rules for designers (who edits, how to propose a change, naming, versioning).

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
