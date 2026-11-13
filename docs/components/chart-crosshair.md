# Chart crosshair — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart crosshair`. Status: draft. Level: molecule.
- Figma: Components, страница «Chart crosshair» (`1012:15`), набор `101:981`.

## 2. Intent
- Перекрестие под курсором: Line — вертикальная линия + точка серии (цвет data/N в инстансе), Bar — подсветка полосы для столбцов. Работает вместе с Chart tooltip.
- Когда использовать: линия или полоса выбранной точки при наведении или выборе стрелками.
- Когда нет: выделение столбца без перекрестия — Chart plot, состояние Hover.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `line`, `halo`, `point`, `band`.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Target | Line · Bar | — |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Стрелки Влево и Вправо двигают перекрестие, значение озвучивается через aria-live=polite («23.06, 32 °C»); при reduced motion — без плавного движения.

## 10. Tokens
- `line`: заливка / цвет `border/default`.
- `halo`: заливка / цвет `data/1`.
- `point`: заливка / цвет `data/1`; обводка `surface/level-1`; толщина обводки `border/width/focus`.
- `band`: заливка / цвет `action/secondary/default`.
- Значений без переменной: 5 (напр. `(root):w=24`, `(root):h=200`, `halo:o=0.24`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Chart crosshair`, вариантов 2 из 2; оси: Target.
- Борда: «Chart crosshair — борда · шаблон v3», разделов 9.
- Описание: 754 знаков, разделы: Status: Level: Перекрестие под курсором: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartCrosshair>`; Flutter: `DsChartCrosshair`.
- Props: `target`: line | bar.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - RAW: 5 (напр. `(root):w=24`, `(root):h=200`)
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: DS Web widget Graph (crosshair).
