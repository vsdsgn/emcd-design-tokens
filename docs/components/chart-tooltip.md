# Chart tooltip — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart tooltip`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart tooltip» (`1012:18`), набор `101:974`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Тултип точки графика: дата и время, под ними строки «маркер серии — название — значение».
- Когда использовать: значения серий в выбранной точке графика.
- Когда нет: пояснение элемента интерфейса — Tooltip.
- Правило выбора варианта:
  - Rows: 1–4 — по числу серий в точке; серий больше четырёх — показываем 4 главные и «+N».
  - Show date: On (по умолчанию) — дата и время сверху; Off — без шапки, строки серий на месте.
  - Значение вне нормы — токеном статуса (`text/danger`, `text/warning`) в экземпляре.
- Не делаем: больше четырёх строк; перекрывать курсор; использовать как подсказку к элементу интерфейса.

## 3. Anatomy
- Корень — карточка: `surface/raised`, обводка `border/subtle` (`border/width/default`), `radius/sm`, тени `shadow/ambient` + `shadow/key`, отступы `space/10` / `space/12`, зазор `space/6`; ширина min `size/chart-tooltip/min` (168), max `size/tooltip/max` (320).
- `header` — `date` (Fill) и `time`, оба `text/tertiary`, `type/body/sm`, зазор `space/16`; скрывается свойством Show date.
- `row 1`…`row 4` (зазор `space/8`): Legend swatch (`size/legend-swatch`) + `series` (`text/secondary`) + `value` (`text/primary`), оба `type/label/sm`, medium.
- Вложено: `Legend swatch` ×10.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет: показан, пока выбрана точка графика, иначе скрыт.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Rows | 1 · 2 · 3 · 4 | 1 |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show date | булево | вкл | 4 из 4 |

## 6. Content / slots
- Дата и время — в формате локали; значения — число с единицей, выравнивание по концу строки.
- Длинный текст: тултип растёт до `size/tooltip/max` (320); дата — одна строка с многоточием, зазор до времени сохраняется; название серии переносится, значение — одна строка.
- Языки (стенд): de, ar, hi, th, ja, kk по высоте не обрезаны; маркер — у первой строки названия. RTL: строки зеркалятся (маркер и название — со стороны начала, значение — с конца), цифры и время — нет.
- Текст 200 %: строки растут по высоте без обрезки; дата усекается, зазор `header` держится.

## 7. Events
- Нет своих: показ, скрытие и положение выставляет график по выбранной точке. Esc — закрыть.

## 8. Behavior
- Появляется у выбранной точки, не перекрывает курсор, у края прижимается к границе графика.

## 9. Accessibility
- `role=status` с `aria-live=polite`; текст содержит дату, серии и значения.
- Закрывается Esc.
- Серия не только цветом маркера: название серии всегда текстом.

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; интервал `space/6`; maxw `size/tooltip/max`; мин. ширина `size/chart-tooltip/min`; отступы `space/10`, `space/12`; радиус `radius/sm`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/16`.
- `date`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `time`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `row 1`: интервал `space/8`.
- `swatch`: высота `size/legend-swatch`; ширина `size/legend-swatch`.
- `series`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `row 2`: интервал `space/8`.
- `row 3`: интервал `space/8`.
- `row 4`: интервал `space/8`.
- Min / max корня: minWidth 168 size/chart-tooltip/min, maxWidth 320 size/tooltip/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Chart tooltip`, вариантов 4 из 4; оси: Rows.
- Борда: «Chart tooltip — борда · шаблон v3», разделов 9.
- Описание: 706 знаков, разделы: Status: Level: Тултип точки графика: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartTooltip>`; Flutter: `DsChartTooltip`.
- Props: `rows`: 1 | 2 | 3 | 4; `showDate`: boolean = true.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- Тултипы в «Песочнице графиков» (monitoring, WL Users, mining) → Rows 1–4, Show date; маркер серии → Legend swatch.

Осталось доделать (после пакета правок beta 2026-11-13):
- Описание: «значения моноширинные», в наборе `value` — `font/family/text`; привести к одному.
- Правило длинного названия серии и значения в описании не записано (сейчас: название переносится, значение — одна строка).
