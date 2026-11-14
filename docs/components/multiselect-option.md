# Multiselect option — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Multiselect option`. Status: beta. Level: unknown.
- Figma: Components, страница «Multiselect» (`355:3674`), набор `170:1565`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Multiselect». Надстройка над `_List row` (вложенный раскрытый экземпляр): ось State — на корне; Label, Description, слот Leading, Selected, Focus ring и зоны — во вложенном экземпляре.

## 2. Intent
- Строка списка выбора (Select, Multiselect, Menu): слева необязательный слот под монету, аватар или иконку, затем подпись с необязательным описанием, справа галочка выбранного. Это строка, а не чекбокс: нажимается вся строка.
- Когда использовать: пункты списка с множественным выбором (сети, монеты, воркеры).
- Когда нет: независимые переключатели в форме — Checkbox.
- Правило выбора варианта:
  - State: Default / Hover — отклик строки; Disabled — пункт недоступен для выбора; Pressed — отклик на нажатие.
  - Selected (свойство `_List row`) — пункт выбран: галочка справа; это не значение State, поэтому выбранную строку можно навести и нажать.
  - Leading — только когда у пункта есть монета, аватар или иконка; слот не обязателен.
  - Description — только когда подписи недостаточно.
- Не делаем: галочка у невыбранного; нажатие только по галочке.

## 3. Anatomy
- Корень — вложенный `_List row`: отступы `space/12` / `space/8`, зазор `space/12`, `radius/inner`, min-height `size/row/min`.
- Внутри `_List row`: слот Leading → Label + Description → галочка выбранного; служебные слои (`focus ring`, зоны, `safe area · outer`) — тоже в базе.
- Вложено: `_List row` ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — без подложки; Hover / Pressed — слой `state/layer` × `state/hover` / `state/pressed`; Disabled — погашенный текст, без Hover.
- Selected=On сочетается с любым значением State.
- Кольцо фокуса: 2 px + зазор 2 px (`border/focus-ring`), свойство Focus ring базы. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Disabled · Pressed | Default |

Матрица полная: 4 вариантов.

- Своих свойств у набора нет: Label, Description, Leading, Selected, Focus ring, Show hit area, Safe margin — свойства вложенного `_List row`.

## 6. Content / slots
- Длинный текст: подпись и описание — до 2 строк, дальше многоточие (база `_List row`); строка растёт по высоте.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Галочка — у конца строки.
- Языки (de, ar, hi, th, ja, kk) — без обрезки по высоте (проверено на стенде).
- Текст 200 %: строка растёт по высоте, обрезки нет (проверено на стенде).

## 7. Events
- `click` по всей строке → переключение выбора; у Disabled событий нет.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="option"`, `aria-selected`; Пробел выбирает; выбранное озвучивается.

## 10. Tokens
- `_List row`: интервал `space/12`; minh `size/row/min`; отступы `space/12`, `space/8`; радиус `radius/inner`.
- Значений без переменной: 4 (напр. `(root):w=280`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Multiselect option`, вариантов 4 из 4; оси: State.
- Борда: «Multiselect option — борда · шаблон v3», разделов 12.
- Описание: 1085 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Кольцо фокуса:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMultiselectOption>`; Flutter: `DsMultiselectOption`.
- Props: нет.
- Состояния (Default, Hover, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; свойства вложенного `_List row` (Selected, Leading, Description, Focus ring, Show hit area, Safe margin) не просмотрены — у набора своих свойств нет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `Selectable list item` → Multiselect option; DS App — нет. State=Selected заменён булевым Selected базы `_List row`.

Осталось доделать (после пакета правок beta 2026-11-13):
- Порядок оси State: Pressed после Disabled — поставить Default, Hover, Pressed, Disabled.
- Описание Figma: «описание в одну строку», база `_List row` — до 2 строк; свести.
- Ширина корня 280 — числом.
