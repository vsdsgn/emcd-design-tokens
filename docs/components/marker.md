# Marker — контракт (2026-11-24)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Marker`. Status: beta. Level: unknown.
- Figma: Components, страница «Marker» (`1012:16`), набор `84:595`. Платформы: Web, Mobile web, iOS, Android.
- Вложен в Legend item (exposed).

## 2. Intent
- Метка — цветная точка или отрезок линии: серия графика (легенда, тултип) или статус (точка у Status, Chip, Tab). 22.11: Legend swatch и _Dot слиты в Marker.
- Когда использовать: серия графика в легенде и тултипе (Size L 12); точка статуса внутри Status, Chip, Tab (Size S 6 / M 8).
- Когда нет: статус с подписью — Status (в нём Marker); число — Badge Content=Number.
- Правило выбора варианта:
  - Shape: Dot — столбцы, области, точки, статусы; Line — линии графика (только Size L).
  - Color: Series 1–8 — серии графика (Series 1 = `border/accent`, 2–8 = `data/*`); Success · Warning · Danger · Info · Neutral — статусы (`status/*/solid`).
  - Size: L 12 — легенда и тултип графика; S 6 / M 8 — точка статуса.
  - Series: 1–8 = `data/1`…`data/8`; не больше 8 серий.
  - Серии различаются не только цветом: у линий Series 5–8 — пунктир (5 — 4/2, 6 — 2/2, 7 — 6/2/2/2, 8 — 1/2), Series 1–4 — сплошные.
- Не делаем: девятая серия; цвет вне `data/*`; маркер без названия серии рядом.

## 3. Anatomy
- Корень `size/legend-swatch` (12 × 12); `marker` — точка или отрезок, цвет `data/1`…`data/8`, `radius/chip`; у Line — линия толщиной `chart/stroke`, Series 5–8 пунктиром.
- Служебные слои (вариантов из 26): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Shape | Dot · Line | — |
| Color | Series 1 · Series 2 · Series 3 · Series 4 · Series 5 · Series 6 · Series 7 · Series 8 · Success · Warning · Danger · Info · Neutral | — |
| Size | L · S · M | — |

Матрица: 26 из 78.

## 6. Content / slots
- Текста нет; название серии — в Legend item.
- Текст 200 %: маркер не растёт.
- RTL: маркер — со стороны начала строки, порядок задаёт Legend item.

## 7. Events
- Нет.

## 8. Behavior
- Статичен.

## 9. Accessibility
- Декоративен (`aria-hidden`): название серии всегда рядом в тексте.
- Контраст маркера с фоном — не ниже 3:1.
- Серии различаются не только цветом: у линий разный штрих начиная с 5-й серии (WCAG 1.4.1).

## 10. Tokens
- `корень`: высота `size/dot/md`, `size/dot/sm`, `size/legend-swatch`; ширина `size/dot/md`, `size/dot/sm`, `size/legend-swatch`.
- `marker`: заливка / цвет `border/accent`, `data/2`, `data/3`, `data/4`, `data/5`, `data/6`, `data/7`, `data/8`; радиус `radius/chip`; обводка `data/5`, `data/6`, `data/7`, `data/8`.
- `dot`: заливка / цвет `status/danger/solid`, `status/info/solid`, `status/neutral/solid`, `status/success/solid`, `status/warning/solid`; высота `size/dot/md`, `size/dot/sm`; ширина `size/dot/md`, `size/dot/sm`.
- Значений без переменной: 4 (напр. `marker:sw=2`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Цвета `data/*` зависят только от темы; от бренда и режима Platform не зависят.

## 12. Figma projection
- Набор `Marker`, вариантов 26 из 78; оси: Shape, Color, Size.
- Борда: «Legend swatch — борда · шаблон v3», разделов 12.
- Описание: 472 знаков, разделы: Status: Level: Метка — Серия 1 —

## 13. Code projection
Кода в репо пока нет; прод (DSP / ui-emcd-web, Flutter) недоступен (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs`.

- Vue: `<DsMarker>`; Flutter: `DsMarker`.
- Props: `shape`: dot | line; `color`: series-1 | series-2 | series-3 | series-4 | series-5 | series-6 | series-7 | series-8 | success | warning | danger | info | neutral; `size`: l | s | m.

## 14. Acceptance (2026-11-24)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), 200 %; текстовых и булевых свойств нет — длинный текст и языки неприменимы; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `legend marker` → Legend swatch: Marker Dot | Line, Series 1–8.
