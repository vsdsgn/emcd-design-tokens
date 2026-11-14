# Legend swatch — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Legend swatch`. Status: beta. Level: unknown.
- Figma: Components, страница «Legend swatch» (`1012:16`), набор `84:595`. Платформы: Web, Mobile web, iOS, Android.
- Вложен в Legend item (exposed).

## 2. Intent
- Маркер серии графика: цветная точка или отрезок линии.
- Когда использовать: маркер серии в легенде и тултипе графика.
- Когда нет: индикатор статуса — Status.
- Правило выбора варианта:
  - Marker: Dot — столбцы, области, точки; Line — линии.
  - Series: 1–8 = `data/1`…`data/8`; не больше 8 серий.
  - Серии различаются не только цветом: у линий Series 5–8 — пунктир (5 — 4/2, 6 — 2/2, 7 — 6/2/2/2, 8 — 1/2), Series 1–4 — сплошные.
- Не делаем: девятая серия; цвет вне `data/*`; маркер без названия серии рядом.

## 3. Anatomy
- Корень `size/legend-swatch` (12 × 12); `marker` — точка или отрезок, цвет `data/1`…`data/8`, `radius/chip`; у Line — линия толщиной `chart/stroke`, Series 5–8 пунктиром.
- Служебные слои (вариантов из 16): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Marker | Dot · Line | Dot |
| Series | 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 | 1 |

Матрица полная: 16 вариантов.

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
- `корень`: высота `size/legend-swatch`; ширина `size/legend-swatch`.
- `marker`: заливка / цвет `data/1`, `data/2`, `data/3`, `data/4`, `data/5`, `data/6`, `data/7`, `data/8`; радиус `radius/chip`; обводка `data/5`, `data/6`, `data/7`, `data/8`; толщина обводки `chart/stroke`.

## 11. Platforms
- Цвета `data/*` зависят только от темы; от бренда и режима Platform не зависят.

## 12. Figma projection
- Набор `Legend swatch`, вариантов 16 из 16; оси: Marker, Series.
- Борда: «Legend swatch — борда · шаблон v3», разделов 12.
- Описание: 641 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsLegendSwatch>`; Flutter: `DsLegendSwatch`.
- Props: `marker`: dot | line; `series`: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), 200 %; текстовых и булевых свойств нет — длинный текст и языки неприменимы; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `legend marker` → Legend swatch: Marker Dot | Line, Series 1–8.

Осталось доделать (после пакета правок beta 2026-11-13):
- Палитра `data/*`: в Dark Series 3 и 7, 2 и 4 почти неразличимы, в Light — 2 и 4 близки — на решение, вопрос к палитре.
