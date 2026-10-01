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
build/css/            CSS custom properties, one file per layer + index.css
build/json/           fully resolved flat tokens per brand × theme (App, Compact) for Flutter
scripts/              figma-to-dtcg.mjs (export → DTCG), build.mjs (Style Dictionary v4)
```

## Use (web)

```html
<link rel="stylesheet" href="build/css/index.css">
<html data-brand="geometria" data-theme="light" data-platform="web">
```

Defaults on `:root`: brand `emcd`, theme `dark`, platform `web`. Viewport switches automatically by media queries
(600 / 840 / 1200 / 1600 px).

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
