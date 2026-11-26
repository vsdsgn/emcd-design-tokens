# Sparkline — контракт · draft (2026-11-26)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Sparkline`. Status: draft. Level: unknown.
- Figma: Components, страница «Sparkline» (`2480:2976`), набор `2480:3080`.

## 2. Intent
- Мини-график тренда без осей и сетки — в строке таблицы, плитке, List item. Типы — все виды Chart plot (Line, Area, Bars, Line + Bars, Multi-line, Dual area, Stacked bars), цвета серий те же. 80 × 24, растягивается.
- Когда использовать: тренд рядом с числом (хешрейт по монете, доход за 7 дней), когда шкала и точные значения не нужны.
- Когда нет: нужен анализ, период, подсказка по точке — Chart card / Chart plot.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `bar`, `line`, `area`, `line 1`, `line 2`, `line 3`, `line 4`, `segment 1`, `segment 2`, `segment 3`, `segment 4`.
- Служебные слои (вариантов из 7): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Bars · Line · Area · Line + Bars · Multi-line · Dual area · Stacked bars | — |

Матрица полная: 7 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- рядом с числом — aria-hidden; если несёт смысл — role=img + aria-label («Хешрейт за 7 дней: рост на 12 %»).

## 10. Tokens
- `bar`: заливка / цвет `border/accent`, `data/4`; радиус `radius/2xs`.
- `line`: обводка `border/accent`; толщина обводки `chart/stroke`.
- `area`: заливка / цвет `border/accent`, `data/4`.
- `line 1`: обводка `border/accent`; толщина обводки `chart/stroke`.
- `line 2`: обводка `data/2`, `data/4`; толщина обводки `chart/stroke`.
- `line 3`: обводка `data/3`; толщина обводки `chart/stroke`.
- `line 4`: обводка `data/4`; толщина обводки `chart/stroke`.
- `segment 1`: заливка / цвет `border/accent`; радиус `radius/2xs`.
- `segment 2`: заливка / цвет `data/2`; радиус `radius/2xs`.
- `segment 3`: заливка / цвет `data/3`; радиус `radius/2xs`.
- `segment 4`: заливка / цвет `data/4`; радиус `radius/2xs`.
- Значений без переменной: 17 (напр. `(root):w=80`, `(root):h=24`, `area:o=0.45`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Sparkline`, вариантов 7 из 7; оси: Type.
- Борда: шаблона v3 нет.
- Описание: 815 знаков, разделы: Status: Level: Sparkline: Размер: Когда использовать: A11y: Поиск:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Sparkline`), Vue `packages/vue/src/DsSparkline.vue`, CSS `claude-ds/components/Sparkline/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsSparkline>`; Flutter: `DsSparkline`.
- Props: `type`: bars | line | area | line-bars | multi-line | dual-area | stacked-bars.

## 14. Acceptance (2026-11-26)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - RAW: `area:o=0.45`
  - BOARD: нет борды v3

## 15. Migration
- Legacy: —
