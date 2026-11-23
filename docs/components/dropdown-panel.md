# Dropdown panel — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Dropdown panel`. Status: beta. Level: unknown.
- Figma: Components, страница «Dropdown panel» (`1661:2`), набор `1661:300`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Dropdown panel», организм. Собран из вложенных _Overlay surface (Kind=Popover), Tabs, Button («Сбросить всё»), Input (поиск) и Multiselect option; служебных слоёв у корня нет.

## 2. Intent
- Панель выпадающего списка выбора: вкладки-категории, «Сбросить всё», поиск и список пунктов Multiselect option; при пустом результате поиска — «Ничего не нашли» с подсказкой.
- Когда использовать: выбор из длинного списка с категориями и поиском (монеты, воркеры, аккаунты).
- Когда нет: короткое меню действий — Menu; список до 7 пунктов без поиска — Select с Menu.
- Правило выбора варианта:
  - Content: List — есть результаты, список Multiselect option; Empty — поиск ничего не нашёл: заголовок «Ничего не нашли» и подсказка.
  - Show tabs — список делится на категории; Off — категорий нет.
  - Show reset — только когда есть выбранные пункты; нет выбранных — Off.
  - Show search — поиск всегда над списком; Off — только для списка без поиска (редко: тогда чаще Select с Menu).
  - Список ограничен по высоте `size/dropdown-panel/max-height` (320) и прокручивается; шапка и поиск остаются на месте.
  - На мобильном панель открывается в Sheet.
- Не делаем: поиск под списком; «Сбросить всё» без выбранных пунктов; пустой список без Content=Empty; Dropdown panel для короткого меню действий.

## 3. Anatomy
- Корень — вертикальный стек, отступ `space/12`, зазор `space/12`, `radius/control`, ширина 480 числом (было 460: вкладки по умолчанию не помещались рядом со «Сбросить всё»).
- Поверхность — слой `overlay surface`, экземпляр _Overlay surface (Kind=Popover): `material/thick/fill` + `material/thick/blur`, обводка `border/subtle` × `border/width/default`, тени `shadow/key` + `shadow/ambient`, `radius/control`.
- `header` (зазор `space/8`): `tabs` — Tabs (зазор `space/20`, линия `border/subtle`) → `reset` — Button «Сбросить всё» (`space/4`, зазор `space/2`, `radius/xs`, min-width `size/button/min`).
- `search` — Input (min-width `size/field/min`) → `list` — Multiselect option (max-height `size/dropdown-panel/max-height`).
- `empty` (Content=Empty; отступ `space/24`, зазор `space/4`): `empty title` — `type/label/lg`, `text/primary`; `empty hint` — `type/label/md`, `text/secondary`.
- Вложено: `_Overlay surface` ×2, `Tabs` ×2, `Button` ×2, `Input` ×2, `Multiselect option` ×5.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Tabs, Button, Input, Multiselect option.
- Оси State нет: Hover / Pressed / Focus / Disabled — у вложенных Tabs, Button, Input, Multiselect option.
- Content=List — список с галочками у выбранных; Content=Empty — вместо списка заголовок и подсказка по центру, шапка и поиск на месте.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Content | List · Empty | List |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show tabs | булево | вкл | 2 из 2 |
| Show reset | булево | вкл | 2 из 2 |
| Show search | булево | вкл | 2 из 2 |

- Show tabs, Show reset, Show search — по умолчанию On. Подписи вкладок, кнопки, поиска и пунктов — свойства вложенных Tabs, Button, Input, Multiselect option.

## 6. Content / slots
- Вкладки: длинная подпись усекается многоточием. Пункты: подпись переносится (long — на 2 строки). Empty: подсказка переносится.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk. Ширина панели (480; на стенде 2026-11-15 — 460) больше ячейки стенда 360 — правый край (усечение пунктов, «Сбросить всё») при длинном тексте не проверен.
- Текст 200 %: список, поиск и Empty растут без обрезки; вкладки занимают остаток шапки и клипуются внутри панели (в коде — горизонтальный скролл), «Сбросить всё» всегда видна (исправлено 2026-11-15).

## 7. Events
- `click` по вкладке — смена категории списка.
- `input` в поиске — фильтр списка; пусто — Content=Empty.
- `change` — пункт отмечен или снят (Multiselect option).
- `click` «Сбросить всё» — снимает весь выбор.
- Esc — закрывает панель, фокус возвращается на поле.

## 8. Behavior
- Список прокручивается внутри max-height 320; шапка и поиск не прокручиваются.
- Панель не закрывается при выборе пункта. На мобильном — в Sheet.
- Движение появления — по правилам Menu / _Overlay surface.

## 9. Accessibility
- `role="dialog"` или `role="listbox"` с `aria-multiselectable`; поиск — `role="searchbox"` с `aria-controls` на список.
- Результат поиска озвучивается («Найдено 5»); Esc закрывает, фокус возвращается на поле.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Tabs, Button, Input, Multiselect option.

## 10. Tokens
- `корень`: интервал `space/12`; отступы `space/12`; радиус `radius/control`.
- `overlay surface`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/8`.
- `tabs`: интервал `space/20`; обводка `border/subtle`.
- `reset`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `search`: мин. ширина `size/field/min`.
- `list`: maxh `size/dropdown-panel/max-height`.
- `empty`: интервал `space/4`; отступы `space/24`.
- `empty title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `empty hint`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Значений без переменной: 2 (напр. `(root):w=480`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Dropdown panel`, вариантов 2 из 2; оси: Content.
- Борда: «Dropdown panel — борда · шаблон v3», разделов 11.
- Описание: 1028 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены: Поверхность —

## 13. Code projection
Кода в репо пока нет; прод (DSP / ui-emcd-web, Flutter) недоступен (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs`.

- Vue: `<DsDropdownPanel>`; Flutter: `DsDropdownPanel`.
- Props: `content`: list | empty; `showTabs`: boolean = true; `showReset`: boolean = true; `showSearch`: boolean = true.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня 480 — числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; ширина 460 больше текстовой ячейки 360 — правый край не проверен; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web Dropdown wrapper: Default → Content=List; Scroll → список с max-height `size/dropdown-panel/max-height`; With divider → линия Tabs (`border/subtle`); Not found → Content=Empty.
