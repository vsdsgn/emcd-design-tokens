# Chart tooltip — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart tooltip`. Status: draft. Level: molecule.
- Figma: Components, страница «Chart tooltip» (`1012:18`), набор `101:974`.

## 2. Intent
- Тултип точки графика: дата и время + строки «маркер серии — название — значение». Rows 1–4 (больше — первые 4 и «ещё N»).
- Когда использовать: значения серий в выбранной точке графика.
- Когда нет: пояснение элемента интерфейса — Tooltip.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `header`, `date`, `time`, `row 1`, `series`, `value`, `row 2`, `row 3`, `row 4`.
- Вложено: `Legend swatch` ×10.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Rows | 1 · 2 · 3 · 4 | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show date | булево | вкл | 4 из 4 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="status" с aria-live=polite, текст содержит дату, серии и значения; закрывается Esc.

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; интервал `space/6`; отступы `space/10`, `space/12`; радиус `radius/sm`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/16`.
- `date`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `time`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `row 1`: интервал `space/8`.
- `series`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `row 2`: интервал `space/8`.
- `row 3`: интервал `space/8`.
- `row 4`: интервал `space/8`.
- Min / max корня: minWidth 168 числом.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Chart tooltip`, вариантов 4 из 4; оси: Rows.
- Борда: «Chart tooltip — борда · шаблон v3», разделов 9.
- Описание: 719 знаков, разделы: Status: Level: Тултип точки графика: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartTooltip>`; Flutter: `DsChartTooltip`.
- Props: `rows`: 1 | 2 | 3 | 4; `showDate`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - MINMAX: minw=168
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: тултипы в «Песочнице графиков» (monitoring, WL Users, mining).
