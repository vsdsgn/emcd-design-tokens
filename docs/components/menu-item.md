# Menu item — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Menu item`. Status: beta. Level: unknown.
- Figma: Components, страница «Menu item» (`1012:21`), набор `407:1987`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Menu item», молекула. Надстройка над `_List row` (вложенный раскрытый экземпляр): оси Size, Tone, State — на корне; Label, Description, слоты Leading / Trailing, Selected, Show selection, Focus ring и зоны — во вложенном экземпляре.

## 2. Intent
- Пункт меню: слева необязательный слот (иконка, монета, аватар, эмодзи), затем подпись с необязательным описанием, справа необязательный слот (Badge, Counter, значение, шеврон подменю, кнопка). Нажимается вся строка, одно действие на пункт.
- Когда использовать: пункт Menu, Dropdown panel или списка выбора.
- Когда нет: строка списка на странице — List item; навигация — Nav item.
- Правило выбора варианта:
  - Size: M (44) — меню действий и выпадающие списки; L (56) — выбор монеты, кошелька, сети (с описанием и крупной иконкой). В одном меню — один размер.
  - Tone: Default — обычное действие; Danger — разрушающее действие, последним пунктом после разделителя.
  - State: Default / Hover / Pressed — отклик строки; Disabled — пункт недоступен.
  - Show selection (свойство `_List row`) — множественный выбор: глиф Checkbox слева.
  - Selected (свойство `_List row`) — галочка у выбранного в одиночном выборе; только у одного пункта.
  - Leading — иконка 20 / 24, монета 32 (только L), аватар или эмодзи. Trailing — Badge, Counter, значение, шеврон подменю или кнопка.
- Не делаем: больше одного действия в пункте; описание длиннее строки; Danger не последним или без разделителя; Selected у нескольких пунктов одиночного выбора; разные размеры в одном меню.

## 3. Anatomy
- Корень — вложенный `_List row`: отступы `space/10` / `space/12` (M) и `space/16` (L), зазор `space/12`, `radius/sm`; высота M 44 / L 56.
- Внутри `_List row`: слот Leading → Label + Description → слот Trailing; глиф выбора, галочка Selected и служебные слои (Focus ring, зоны) — тоже в базе.
- Вложено: `_List row` ×16.
- Служебные слои (вариантов из 16): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — без подложки; Hover / Pressed — слой `state/layer` во всю строку (Pressed плотнее Hover); Disabled — погашенные иконка и подпись, без подложки.
- Tone=Danger: иконка и подпись — цветом ошибки во всех состояниях, кроме Disabled (там как у Default).
- Selected и Show selection (свойства базы) сочетаются с любым значением State.
- Кольцо фокуса — вокруг плашки, свойство Focus ring базы. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | M |
| Tone | Default · Danger | Default |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 16 вариантов.

- Своих свойств у набора нет: Label, Description, Leading, Trailing, Selected, Show selection, Focus ring, зоны — свойства вложенного `_List row`.

## 6. Content / slots
- Длинный текст: подпись и описание — до 2 строк, дальше многоточие; `hint` — одна строка ≤ 160 (правило `_List row`).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Языки (стенд): de, ar, hi, th, ja, kk — без обрезки по высоте.
- Текст 200 %: подпись переносится на 2 строки, строка растёт по высоте, обрезки нет; иконка Leading не растёт.

## 7. Events
- `click` / `select` по всей строке → действие пункта или выбор; у Disabled событий нет.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Шеврон в Trailing — пункт открывает подменю.
- Нажимается вся строка; вложенные контролы в Trailing — отдельные цели.

## 9. Accessibility
- `role="menuitem"` в меню, `role="option"` в списке выбора; стрелки перемещают фокус, Enter / Пробел активирует; Disabled — `aria-disabled`.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 10. Tokens
- `_List row`: интервал `space/12`; отступы `space/10`, `space/12`, `space/16`; радиус `radius/sm`.
- Значений без переменной: 16 (напр. `(root):w=290`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Menu item`, вариантов 16 из 16; оси: Size, Tone, State.
- Борда: «Menu item — борда · шаблон v3», разделов 10.
- Описание: 1613 знаков, разделы: Status: Level: Пункт меню. • Leading — • Trailing — • M — • Show selection — • Tone = Danger — A11y: Кольцо фокуса: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMenuItem>`; Flutter: `DsMenuItem`.
- Props: `size`: m | l; `tone`: default | danger.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; своих булевых свойств нет — Description, Trailing, Selected, Show selection, Focus ring, зоны (свойства `_List row`) не просмотрены; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web Dropdown item (44, отступы 10 / 12, слот слева, подпись 16 + описание 12, слот справа) → Size=M, слоты Leading / Trailing, Description; новое в 2.0: Size=L 56, Tone=Danger, состояния слоем `state/layer`, Show selection, Selected, Focus ring, зоны.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 290 — числом (пункт не растягивается по панели меню).
- На решение: иконка Leading при тексте 200 % не растёт и выглядит мелкой.
