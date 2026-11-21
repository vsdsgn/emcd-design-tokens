# Date range panel — контракт (2026-11-21)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Date range panel`. Status: beta. Level: unknown.
- Figma: Components, страница «Date range panel» (`1663:6984`), набор `1663:8388`. Платформы: Web, Mobile web, iOS, Android.
- Organism; открывается из Date range field. Собран из Menu item (пресеты), Calendar (Mode=Range) и Button (футер).

## 2. Intent
- Панель выбора периода: слева пресеты («Сегодня», «7 дней», «30 дней», «Квартал», «Год», «Свой период»), справа календарь с диапазоном, внизу «Сбросить» и «Применить».
- Когда использовать: выбор периода для выгрузки, фильтра, отчёта — из Date range field.
- Когда нет: одна дата — Calendar (Single) в Input; быстрый выбор без календаря — Chip или Segmented.
- Правило выбора варианта:
  - Presets: On — Web, пресеты слева от календаря; Off — мобильный, панель в Sheet без пресетов, чипы периодов над календарём.
  - Show reset: On — по умолчанию, есть выбор для сброса; Off — сбрасывать нечего (обязательный фильтр).
  - Пресет подставляет диапазон в календарь; «Свой период» включает ручной выбор.
  - Применение: Web — только по «Применить»; мобильный (в Sheet) — сразу при выборе второй даты.
  - Недоступные даты — Date cell Disabled, ограничение — в подсказке Date range field.
- Не делаем: применение периода без «Применить» на Web; пресет, не совпадающий с диапазоном в календаре; пресеты на мобильном (Presets=On в Sheet).

## 3. Anatomy
- Корень — `material/thick` (fill + blur), обводка `border/subtle`, `radius/control`, отступ `space/12`, интервал `space/16`, тень `shadow/ambient` + `shadow/key`.
- Слева — список Menu item (6 пресетов), выбранный — с галочкой.
- `calendar column` (интервал `space/12`): Calendar Mode=Range без своей подложки, тени, отступов и радиуса (внутри панели — одна поверхность, исправлено 2026-11-15); `footer` (интервал `space/8`, прижат к концу) — `reset` (текстовая Button) и `apply` (Button `action/primary/default`, `control/height/sm`).
- Своих служебных слоёв нет: кольцо фокуса и зоны нажатия — у Menu item, Date cell, Button.
- Вложено: `Menu item` ×12, `Calendar` ×2, `Button` ×4.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Контейнер: своих состояний нет; состояния — у Menu item, Calendar (Date cell) и Button.
- Своих состояний нет. Выбранный пресет — Menu item с галочкой; период — Range start / middle / end в Calendar.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Presets | On · Off | On |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show reset | булево | вкл | 2 из 2 |

- Show reset (по умолчанию On) — кнопка «Сбросить» в футере.

## 6. Content / slots
- Пресеты — короткие периоды («7 дней»); длинный текст переносится на вторую строку и усекается многоточием (проверено на стенде).
- Кнопки — глагол: «Сбросить», «Применить». «Сбросить» — до 140, одна строка с многоточием; «Применить» всегда у конца строки (2026-11-16).
- RTL: пресеты переходят вправо, календарь зеркалится, кнопки футера меняются местами. На стенде направление не переключается: ar проверен только на обрезку.
- Текст 200 %: пресеты и кнопки растут без обрезки; шапка Calendar растёт, заголовок месяца усекается многоточием.

## 7. Events
- `select` пресета → диапазон в календаре; «Свой период» — ручной выбор.
- `change` — выбран период в календаре.
- «Применить» → `apply`, панель закрывается, период уходит в Date range field; «Сбросить» → `reset`.
- Esc — закрывает без применения, фокус возвращается на поле.

## 8. Behavior
- Открывается из Date range field; на мобильном — в Sheet и применяется по второй дате.
- Смена пресета и диапазона — без анимации; тайминги вложенных — их собственные.

## 9. Accessibility
- `role=dialog` с `aria-label` «Период»; Esc закрывает и возвращает фокус на поле.
- Пресеты — `role=listbox`; календарь — `role=grid`, стрелки двигают дату, Enter выбирает начало и конец.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Menu item, Date cell, Button.

## 10. Tokens
- `корень`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; интервал `space/16`; отступы `space/12`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `calendar column`: интервал `space/12`.
- `calendar`: интервал `space/12`.
- `footer`: интервал `space/8`.
- `reset`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `apply`: заливка / цвет `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Date range panel`, вариантов 2 из 2; оси: Presets.
- Борда: «Date range panel — борда · шаблон v3», разделов 11.
- Описание: 1050 знаков, разделы: Status: Level: Панель выбора периода: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`DateRangePanel`), Vue `packages/vue/src/DsDateRangePanel.vue`, CSS `claude-ds/components/DateRangePanel/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsDateRangePanel>`; Flutter: `DsDateRangePanel`.
- Props: `presets`: boolean; `showReset`: boolean = true.

## 14. Acceptance (2026-11-21)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячейки — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства (Show reset); RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web `DateRange.Panel` → Date range panel (Presets On | Off, Show reset); `PeriodPresets.List` → Menu item; `PeriodGrid` → Calendar Mode=Range.

Осталось доделать (после пакета правок beta 2026-11-13):
- Presets=Off: чипов периодов над календарём (по описанию) нет — слот панели или Sheet, решить.
