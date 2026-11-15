# Calendar — контракт (2026-11-15)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Calendar`. Status: beta. Level: unknown.
- Figma: Components, страница «Calendar» (`355:2079`), набор `169:1713`. Платформы: Web, Mobile web, iOS, Android.
- Organism; источник — сетка периода Monitoring (PeriodGrid). Собран из Icon button (листание месяцев) и Date cell (дни).

## 2. Intent
- Календарь выбора даты или периода (Datepicker): шапка с месяцем и стрелками, строка дней недели, сетка дней из Date cell.
- Когда использовать: выбор конкретной даты или произвольного периода — выгрузки, история, статистика.
- Когда нет: стандартные периоды — Segmented (24 ч · 7 дней · 30 дней) рядом; дата рождения — три поля или ввод с маской; на App без диапазона — системный пикер.
- Правило выбора варианта:
  - Mode: Single — одна дата; Range — период (начало, середина, конец).
  - Сегодня — обводкой (Date cell Today); недоступные даты (будущие для истории) — Date cell Disabled.
  - Неделя начинается по локали (CLDR); в ru — с понедельника.
  - Размещение: на Web — в Dropdown panel или Date range panel; на Compact — в Sheet.
- Не делаем: два календаря для начала и конца периода вместо Mode=Range; сегодня заливкой (заливка — только выбранное); недоступные даты кликабельными.

## 3. Anatomy
- Корень — карточка `surface/raised`, `radius/container`, отступ `space/16`, интервал `space/12`; тень Elevation/2 (`shadow/ambient` + `shadow/key`).
- Шапка: `previous month` / `next month` — Icon button `control/height/sm`; `month` — «Месяц ГГГГ», `font/family/display`, `type/heading/md`, `text/primary`.
- `weekdays` — 7 подписей `type/body/sm`, `text/secondary`, интервал `space/2`.
- `days` — сетка 6 × 7 из Date cell (`control/height/md`), интервал `space/2`.
- Своих служебных слоёв и свойств нет: кольцо фокуса и зоны нажатия — у Date cell и Icon button.
- Вложено: `Icon button` ×4, `Date cell` ×84.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Контейнер: своих состояний нет; Hover / Pressed / Focus / Disabled — у вложенных Date cell и Icon button.
- Single — сегодня обводкой, одна выбранная дата заливкой `action/primary/default`.
- Range — края периода заливкой (Range start / Range end), дни внутри — `accent/subtle` без скругления.
- Дни соседних месяцев — Outside; недоступные — Disabled (состояния Date cell).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Mode | Single · Range | Single |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Заголовок — месяц и год по локали; дни недели — короткие имена по CLDR; дни — числа.
- Длинный текст: заголовок месяца — одна строка, многоточие (исправлено 2026-11-15); дни недели — без обрезки.
- RTL: стрелки листания отражаются, сетка идёт справа налево, цифры не зеркалятся. На стенде направление не переключается.
- Текст 200 %: шапка и строка дней недели растут по высоте (мин. 32 / 20), заголовок усекается многоточием; числа дней помещаются в ячейки.

## 7. Events
- `click` по дню → выбор даты (Single) или начала / конца (Range); у Disabled событий нет.
- `click` по стрелкам → предыдущий / следующий месяц.
- `change` — выбрана дата или обе даты периода.

## 8. Behavior
- Смена месяца и выбор дня — без анимации; Hover и тайминги — у Date cell и Icon button.
- Range: первый выбор — начало, второй — конец; второй раньше первого — периоды меняются местами (решает код).

## 9. Accessibility
- `role=grid`; стрелки — по дням, PageUp / PageDown — месяцы, Home / End — начало / конец недели.
- Выбранная дата озвучивается полностью («14 октября 2026, выбрано»); сегодня — `aria-current="date"`.
- Кнопки месяцев — с именем («Предыдущий месяц», «Следующий месяц»).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у Date cell и Icon button.

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; интервал `space/12`; отступы `space/16`; радиус `radius/container`.
- `previous month`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `month`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/md`.
- `next month`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `weekdays`: интервал `space/2`.
- `Frame`: интервал `space/2`.
- `Пн`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Вт`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Ср`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Чт`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Пт`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Сб`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Вс`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `days`: интервал `space/2`.
- `Date cell`: заливка / цвет `accent/subtle`, `action/primary/default`; высота `control/height/md`; радиус `radius/control-sm`; обводка `border/accent`; толщина обводки `border/width/default`; ширина `control/height/md`.

## 11. Platforms
- Web — в Dropdown panel или Date range panel; Compact — в Sheet.
- App — системный пикер, если не нужен диапазон.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Calendar`, вариантов 2 из 2; оси: Mode.
- Борда: «Calendar — борда · шаблон v3», разделов 12.
- Описание: 958 знаков, разделы: Status: Level: Когда использовать: Single — A11y: Тень: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCalendar>`; Flutter: `DsCalendar`.
- Props: `mode`: single | range.

## 14. Acceptance (2026-11-15)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячейки — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств у набора нет; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- Legacy в описании Figma не указан; источник — Monitoring `PeriodGrid` → Calendar (Mode Single | Range) из Date cell.

Осталось доделать (после пакета правок beta 2026-11-13):
- Disabled-дни не зачёркнуты и отличаются от Outside только оттенком — править в Date cell (его todo).
