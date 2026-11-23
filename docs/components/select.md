# Select — контракт (2026-11-23)

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
  - Шеврон (19.11): справа в слоте Trailing — `icon/chevron-down` (в Open — `chevron-up`), `icon/secondary` (Disabled — `icon/disabled`); единица «USDT» из базы поля в Select не ставится; подсказка по умолчанию выключена (в Error — текст ошибки)
  - Size: M | L = размер соседних полей формы (тот же Size, что у Input рядом); XL снят 2026-11-17.
  - State: Default — пусто, плейсхолдер «Выберите …»; Hover — наведение указателя; Open — список открыт; Filled — значение выбрано; Error — ошибка выбора; Disabled — выбор недоступен; Loading — варианты грузятся; Skeleton — форма грузится.
  - Лейбл: Above — по умолчанию (формы); On border — в разрыве рамки, только в панелях фильтров и калькуляторах (patterns.md 0, п. 12; экраны «История» 19.11) — как Label position у Input. В одной панели одно положение. Плейсхолдер — «Выберите …» (что выбрать).
  - Ширина Menu = ширине поля; выбранный пункт в Menu — Selected (галочка).
  - Монета / сеть / иконка выбранного значения — в слот Leading (Show leading): Coin или Coin stack.
- Не делаем: Select для 2–4 вариантов; ввод текста в поле Select; множественный выбор в Select; Menu уже или шире поля; лейбл сбоку или внутри поля.

## 3. Anatomy
- Корень — собственная разметка поля (22.11: вложенный Input снят — его слот Trailing показывал «USDT» и не правился из Select): лейбл (Above) или подпись в разрыве рамки (On border), поле, helper / ошибка; оси Size × Label position × State — 32 варианта; свойства Label, Value, Helper, Show label, Show leading, слот Leading; min-width — `size/field/min`.
- Справа в поле — шеврон (иконка в слоте Trailing): `icon/chevron-down`, в Open — `icon/chevron-up`; в Loading перед шевроном — спиннер; слева — необязательный слот Leading (Show leading у вложенного Input).
- Служебный слой `focus ring` (`border/focus-ring`, `border/width/focus-ring`, радиусы `radius/focus-ring-sm` / `radius/focus-ring-inner`) — свойство Focus ring.
- Вложено: иконки ×56, `_Focus ring` ×32, `_Hit area` ×64, `_Safe margin` ×32, `_State layer` ×4, `Spinner` ×4.
- Служебные слои (вариантов из 32): кольцо фокуса 32 · зона Web 32 · зона касания 32 · безопасное поле 32.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле: Hover — обводка `control/border/hover` + слой `state/layer` × `state/hover`; Pressed нет; Focus — обводка `control/border/focus` + кольцо; Disabled — токены `*/disabled`; Skeleton — загрузка (всё из `_Field base` вложенного Input).
- Default — плейсхолдер «Выберите …», helper под полем.
- Hover — обводка `control/border/hover` и слой состояния (из `_Field base`): отличается от Default и Disabled.
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
| Size | M · L | M |
| Label position | Above · On border | — |
| State | Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton | Default |

Матрица полная: 32 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 32 из 32 · служебное |
| Label | текст | «Сеть» | 30 из 32 |
| Value | текст | «Выберите сеть» | 32 из 32 |
| Helper | текст | «Выберите сеть» | 32 из 32 |
| Show label | булево | вкл | 30 из 32 |
| Show leading | булево | выкл | 32 из 32 |
| Leading | слот | — | 32 из 32 |

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
- `field`: заливка / цвет `control/surface/default`, `control/surface/disabled`, `skeleton/base`; интервал `space/12`; высота `control/height/lg`, `control/height/md`; мин. ширина `size/field/min`; отступы `control/padding-x/lg`, `control/padding-x/md`, `space/none`; радиус `radius/control`, `radius/control-sm`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`, `control/border/hover`; толщина обводки `border/width/default`.
- `Field`: интервал `space/6`; мин. ширина `size/field/min`; отступы `space/8`.
- `label`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `Leading`: интервал `space/4`.
- `icon/search`: высота `icon/size/md`; ширина `icon/size/md`.
- `caret`: заливка / цвет `border/focus`.
- `value`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `Inline`: интервал `space/6`.
- `Trailing`: интервал `space/8`.
- `icon/chevron-down`: высота `icon/size/md`; ширина `icon/size/md`.
- `helper row`: интервал `space/8`; отступы `space/4`.
- `helper`: заливка / цвет `text/danger`, `text/disabled`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `counter`: заливка / цвет `text/disabled`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `icon/chevron-up`: высота `icon/size/md`; ширина `icon/size/md`.
- `spinner`: высота `icon/size/sm`; ширина `icon/size/sm`.
- `notch label`: отступы `space/2`.
- `border gap`: заливка / цвет `control/surface/default`, `control/surface/disabled`.
- `notch text`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`, `radius/focus-ring-inner`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`; радиус `radius/control`, `radius/control-sm`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 80 (напр. `hit area · web:w=320`, `hit area · web:h=40`, `hit area · web:h=48`, `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Select`, вариантов 32 из 32; оси: Size, Label position, State.
- Борда: «Select — борда · шаблон v3», разделов 12.
- Описание: 1614 знаков, разделы: Status: Level: Select: Когда использовать: Правила: Состояния: A11y: Поиск: Legacy: Слот слева:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Select`), Vue `packages/vue/src/DsSelect.vue`, CSS `claude-ds/components/Select/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsSelect>`; Flutter: `DsSelect`.
- Props: `size`: m | l; `labelPosition`: above | on-border; `label`: string или слот; `value`: string или слот; `helper`: string или слот; `showLabel`: boolean = true; `showLeading`: boolean = false; `leading`: string или слот.
- Состояния (Default, Hover, Open, Filled, Error, Disabled, Loading, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading`, `skeleton` — props.
- React `Select` / Vue `DsSelect`: `labelPosition: 'above' | 'on-border'` (19.11), по умолчанию `above` — формы; `on-border` — панели фильтров и калькуляторы (История Web, «Монета» на мобильном). Класс поля `emcd-field--on-border`, как у Input / Date range field.
- Остальные props: `size` (`m` | `l`), `label`, `hint`, `error`, `state`, `placeholder`, `options`, `value` / `defaultValue` / `onChange`, `open` / `defaultOpen` / `onOpenChange`, `leading`, `menuSize`.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; правки Open и Disabled стендом не перепроверены; RTL стенд не проверяет; код — HTML/CSS.

## 15. Migration
- DS Web `Selector small`, `Dropdown` (Type=Net / Wallet / Coins …) → Select (Size M | L, State); иконка сети / кошелька / монеты — слот Leading вложенного Input (Coin / Coin stack).

Осталось доделать (после пакета правок beta 2026-11-13):
- Борда: нет разделов 05, 07, 08.
- Свойство Label position у набора Select в Figma (сейчас только Above) — при Publish, по образцу Input.
