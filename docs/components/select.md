# Select — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Select`. Status: beta. Level: unknown.
- Figma: Components, страница «Select» (`353:6`), набор `51:1753`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Поле выбора одного значения из списка (сеть вывода, кошелёк, монета, валюта). Поле как у Input (размеры, лейбл, helper, ошибка), справа шеврон; по нажатию открывает Menu (на Compact — Sheet).
- Когда использовать: 5+ вариантов или длинные названия вариантов.
- Когда нет: 2–4 варианта — Segmented / Radio; ввод с подсказками — Input + Menu (combobox); множественный выбор — Multiselect (позже).
- Правило выбора варианта:
  - Size: M | L | XL = размер соседних полей формы (тот же Size, что у Input рядом).
  - State: Default — пусто, плейсхолдер «Выберите …»; Hover — наведение указателя; Open — список открыт; Filled — значение выбрано; Error — ошибка выбора; Disabled — выбор недоступен; Loading — варианты грузятся; Skeleton — форма грузится.
  - Лейбл всегда Above; плейсхолдер — «Выберите …» (что выбрать).
  - Ширина Menu = ширине поля; выбранный пункт в Menu — Selected (галочка).
  - Монета / сеть / иконка выбранного значения — в слот Leading поля: Show leading у вложенного Input, иконка — Coin или Coin stack.
- Не делаем: Select для 2–4 вариантов; ввод текста в поле Select; множественный выбор в Select; Menu уже или шире поля; лейбл сбоку или внутри поля.

## 3. Anatomy
- Корень — экземпляр Input (вложен во все 24 варианта): лейбл, поле, helper / ошибка под полем; min-width корня и `field` — `size/field/min`.
- Справа в поле — шеврон (Input addon / Chevron): `icon/chevron-down`, в Open — `icon/chevron-up`; в Loading перед шевроном — спиннер; слева — необязательный слот Leading (Show leading у вложенного Input).
- Служебный слой `focus ring` (`border/focus-ring`, `border/width/focus-ring`, радиусы `radius/focus-ring-sm` / `radius/focus-ring-inner`) — свойство Focus ring.
- Вложено: `Input` ×24.
- Служебные слои (вариантов из 24): кольцо фокуса 24 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле: Hover — слой `state/layer` × `state/hover`, обводка остаётся `control/border/default`; Pressed нет; Focus — обводка `control/border/focus` + кольцо; Disabled — токены `*/disabled`; Skeleton — загрузка.
- Default — плейсхолдер «Выберите …», helper под полем.
- Hover — заливка поля меняется, рамка та же.
- Open — рамка фокуса, шеврон вверх (`icon/chevron-up`), без каретки, значение `text/primary`; под полем — Menu / Sheet.
- Filled — выбранное значение основным цветом текста.
- Error — рамка ошибки, сообщение вместо helper.
- Disabled — лейбл, значение, helper и шеврон (`icon/disabled`) погашены.
- Loading — спиннер перед шевроном, плейсхолдер; список ещё не получен.
- Skeleton — плашка поля скелетоном, лейбл виден, helper скрыт.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L · XL | M |
| State | Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton | Default |

Матрица полная: 24 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 24 из 24 · служебное |

- Своё свойство одно — Focus ring. Лейбл, helper, плейсхолдер, значение и Show leading меняются у вложенного Input.

## 6. Content / slots
- Длинный текст: значение и плейсхолдер — одна строка, усечение многоточием; лейбл и helper / ошибка переносятся.
- Языки (de, ar, hi, th, ja, kk): без обрезки по высоте; de — лейбл переносится, значение усечено многоточием.
- Текст 200 %: высота поля не растёт, текст помещается без обрезки; ошибка переносится; в Loading плейсхолдер усекается многоточием из-за спиннера.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Шеврон вниз / вверх от направления не зависит.

## 7. Events
- `click` / Enter / Space / ↓ по полю — открыть Menu (на Compact — Sheet), State=Open.
- `change` — выбран пункт, список закрывается, State=Filled.
- Esc — закрыть без изменения.

## 8. Behavior
- Loading — пока грузятся варианты; Skeleton — пока грузится вся форма.
- Hover — только с указателем; движение рамки и Hover — из Input.

## 9. Accessibility
- `role=combobox`, `aria-expanded`, `aria-controls` → `listbox`; лейбл связан с полем.
- Клавиатура: Enter / Space / ↓ — открыть; ↑ / ↓ — выбор; Enter — подтвердить; Esc — закрыть; ввод букв — прыжок к пункту.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 10. Tokens
- `корень`: мин. ширина `size/field/min`.
- `field`: мин. ширина `size/field/min`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring`.
- Min / max корня: minWidth 160 size/field/min.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Select`, вариантов 24 из 24; оси: Size, State.
- Борда: «Select — борда · шаблон v3», разделов 11.
- Описание: 1240 знаков, разделы: Status: Level: Select: Когда использовать: Правила: Состояния: A11y: Поиск: Legacy: Слот слева:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSelect>`; Flutter: `DsSelect`.
- Props: `size`: m | l | xl.
- Состояния (Default, Hover, Open, Filled, Error, Disabled, Loading, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; правки Open и Disabled стендом не перепроверены; RTL стенд не проверяет; код — HTML/CSS.

## 15. Migration
- DS Web `Selector small`, `Dropdown` (Type=Net / Wallet / Coins …) → Select (Size M | L | XL, State); иконка сети / кошелька / монеты — слот Leading вложенного Input (Coin / Coin stack).

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Hover — заливка фиксированного цвета, на Light L1 / L2 и Dark L1 почти сливается с поверхностью; слой `state/hover` поверх `surface/current`.
- Focus ring включается у Disabled и Skeleton — записать в описании «не включать».
- Борда: нет разделов 05, 07, 08.
