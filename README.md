# EMCD Design Tokens · DS 2.0

Tokens for all EMCD products (Mining web app, mobile app on Flutter, site, white-label B2B/B2C, Geometria, Monitoring, Firmware).
Source of truth today: Figma file **◆ EMCD DS 2.0 — Foundations** (https://www.figma.com/design/5rTB91UqoGpBncDTUqPP7A).

## Layers

| Layer | Figma collection | Modes | Code prefix |
|---|---|---|---|
| Primitives | Primitives · Color, Primitives · Scale | — | `color.*`, `dimension.*`, `font-size.*` … |
| Brand | Brand | EMCD · Geometria · WL Default | `brand.*` |
| Theme | Theme | Light · Dark | `bg.*`, `surface.*`, `text.*`, `action.*`, `status.*` … |
| Platform | Platform | Web · App · Site | `control.*`, `icon.size.*`, `space.*`, `radius.control` … |
| Viewport | Viewport | Compact · Medium · Expanded · Large · XLarge | `layout.*`, `type.*`, `space.section` |

Primitives are private: products use Theme / Platform / Viewport tokens only.
Contrast of semantic text/icon/action pairs is checked against WCAG 2.2 AA (4.5:1 text, 3:1 control borders).

## Structure

```
figma/export-*.json   raw export of Figma variables (compact)
tokens/**             W3C DTCG token files, one file per collection mode
build/css/            CSS custom properties, one file per layer + index.css (dev) + ds.css / ds.min.css (one-file bundle)
build/json/           fully resolved flat tokens per brand × theme (App, Compact) for Flutter
scripts/              figma-to-dtcg.mjs (export → DTCG), build.mjs (Style Dictionary v4)
```

## Use (web)

```html
<script src="build/js/perf.js"></script>            <!-- perf guard, before CSS -->
<link rel="stylesheet" href="build/css/ds.min.css"> <!-- prod: one file; index.css = dev -->
<html data-brand="geometria" data-theme="light" data-platform="web">
```

Defaults on `:root`: brand `emcd`, theme `dark`, platform `web`. Viewport switches automatically by media queries
(600 / 840 / 1200 / 1600 px).

## Units and adaptivity (320×640 → 8K)

Figma works in px; names carry the rem value: `dimension/x1` = 16px = 1rem, `dimension/x0-25` = 4px = 0.25rem.

| Where | Unit | Why |
|---|---|---|
| Web: spacing, sizes, type, radii | `rem` | Follows the user's browser font size (WCAG 1.4.4 text resize) |
| Web: strokes, `radius/full` | `px` | Hairlines must stay crisp |
| Web: breakpoints | `em` media queries | Correct with browser zoom |
| Web: type scale | fluid `clamp()` 360→1600px | No jumps between steps |
| Web: very wide screens | root font-size 112.5% ≥2560px, 125% ≥3840px, 150% ≥7680px | 4K/8K at 100% OS scaling |
| Flutter | numbers (logical px / dp) | Flutter applies the system text scale itself |

TV (10-foot UI: remote, focus, reading distance) will be a separate Platform mode, not a Viewport step.

## Update flow

1. Change variables in Figma Foundations.
2. Re-export (Claude + Figma MCP for now, a sync plugin later) into `figma/export-*.json`.
3. `npm run all` → review the diff in `tokens/` and `build/` → open a PR.
4. After merge, publish the Figma library manually.

Reverse direction (git → Figma) is planned via a custom Figma plugin.

## Scripts

```
npm install
npm run all      # convert + build
```
