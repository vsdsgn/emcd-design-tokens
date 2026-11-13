# Multiselect — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Multiselect`. Status: beta. Level: unknown.
- Figma: Components, страница «Multiselect (контейнер)» (`1516:175`), набор `1516:1052`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Multiselect (контейнер)», молекула. Собран из вложенных Select (поле), Menu со строками Multiselect option и Chip; своих свойств и служебных слоёв нет.

## 2. Intent
- Поле множественного выбора: Select + список Multiselect option в Menu. Выбранное показывается строкой «Выбрано: N» в поле (Count) или чипами под полем (Chips).
- Когда использовать: фильтры, выбор нескольких сетей, монет или воркеров.
- Когда нет: 2–4 варианта — Checkbox group; один вариант — Select.
- Правило выбора варианта:
  - Display: Count — мобильные и фильтры (высота поля постоянна, в поле «Выбрано: N»); Chips — формы с редким выбором: чипы под полем, не больше 3 чипов и «+N».
  - State: Default — меню закрыто; Open — меню открыто, идёт выбор; Error — выбор не прошёл проверку, сообщение вместо подсказки; Disabled — выбор недоступен.
  - Меню остаётся открытым при выборе. Мобильные: список в Sheet с кнопкой «Применить».
- Не делаем: больше 3 чипов без «+N»; закрытие меню после каждого выбора; Multiselect для 2–4 вариантов или одного значения.

## 3. Anatomy
- Корень — вертикальный стек, зазор `space/8`: Select (подпись, поле с шевроном, подсказка / ошибка; min-width `size/field/min`) → Menu (только Open) → `selected` (только Chips).
- Menu: строки Multiselect option, отступ `space/8`, зазор `space/4`, `radius/control`, ширина `size/menu/min` … `size/menu/max`; оболочка и обводка — по контракту Menu.
- `selected` — ряд Chip с переносом, зазор `space/8`; Chip: высота `control/height/sm`, `radius/control-sm`, фон `action/inverse/default` (Disabled — `action/disabled`), max-width `size/chip/max`, крестик удаления.
- Кольцо фокуса, зона нажатия и безопасное поле — у вложенных Select, Multiselect option и Chip.
- Вложено: `Select` ×8, `Menu` ×2, `Chip` ×12.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле ввода: состояние — цветом рамки и сообщения, слоя `state/layer` нет; Disabled — токены `*/disabled` (всё из Select). Строки меню и чипы — по своим контрактам (Multiselect option, Chip).
- Default — Count: «Выбрано: N» `text/primary`; Chips: плейсхолдер `text/tertiary` в поле, чипы выбранного под подсказкой.
- Open — тёмная рамка, без каретки, шеврон вверх; значение `text/primary` (Count), плейсхолдер `text/tertiary` (Chips); под полем Menu, выбранные пункты — с галочкой.
- Error — красная рамка, сообщение об ошибке вместо подсказки; чипы остаются; в Chips плейсхолдер `text/tertiary`.
- Disabled — серая заливка; подпись, значение, подсказка, шеврон (`icon/disabled`) и чипы погашены, у чипов нет крестика.
- Hover в наборе нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Display | Count · Chips | Count |
| State | Default · Open · Error · Disabled | Default |

Матрица полная: 8 вариантов.

- Своих свойств у набора нет: подпись, значение, подсказка и ошибка — свойства вложенного Select; подписи пунктов — в Multiselect option; подписи чипов — в Chip.

## 6. Content / slots
- Count — строка «Выбрано: N»; Chips — плейсхолдер в поле и до 3 чипов + «+N»; подсказка — пояснение к выбору, ошибка — что не так.
- Длинный текст: значение и плейсхолдер — одна строка, многоточие; подпись и подсказка переносятся. Пункт меню — подпись и описание до 2 строк, `hint` ≤ 160 в 1 строку (Multiselect option). Чип — усечение по `size/chip/max`.
- Языки (de, ar, hi, th, ja, kk) — без обрезки по высоте (вариант Count · Default; чипы и пункты меню с языками не проверены).
- RTL: шеврон и галочки — у конца строки, крестик чипа — у конца чипа.
- Текст 200 %: высота поля не растёт, значение не обрезано; подсказка и ошибка переносятся; чипы переносятся на следующую строку.

## 7. Events
- `click` / Enter / Пробел / ↓ по полю — открывает меню (на мобильных — Sheet).
- `change` — пункт отмечен или снят (Пробел / нажатие по строке); на мобильных — по кнопке «Применить».
- `click` по крестику чипа — снимает выбор пункта (Chips).
- Esc — закрывает меню. У Disabled событий нет.

## 8. Behavior
- Меню не закрывается при выборе; закрытие — Esc, нажатие вне меню или «Применить» в Sheet.
- Count: высота поля постоянна при любом числе выбранных. Chips: блок растёт вниз на ряд чипов.
- Рамка — из Select; меню — по правилам Menu.

## 9. Accessibility
- `role="combobox"`; список — `role="listbox"` с `aria-multiselectable`; пункты — Multiselect option.
- Выбранное озвучивается как «Выбрано: 3»; ↑ / ↓ — по пунктам, Пробел отмечает пункт, Esc закрывает меню.
- Ошибка различается не только цветом — текстом сообщения.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Select, Multiselect option, Chip.

## 10. Tokens
- `корень`: интервал `space/8`.
- `Select`: мин. ширина `size/field/min`.
- `Menu`: интервал `space/4`; maxw `size/menu/max`; мин. ширина `size/menu/min`; отступы `space/8`; радиус `radius/control`.
- `selected`: интервал `space/8`.
- `Chip`: заливка / цвет `action/disabled`, `action/inverse/default`; интервал `space/6`; высота `control/height/sm`; maxw `size/chip/max`; отступы `control/padding-x/sm`; радиус `radius/control-sm`.
- Значений без переменной: 8 (напр. `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Multiselect`, вариантов 8 из 8; оси: Display, State.
- Борда: «Multiselect — борда · шаблон v3», разделов 10.
- Описание: 742 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMultiselect>`; Flutter: `DsMultiselect`.
- Props: `display`: count | chips.
- Состояния (Default, Open, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текст и языки — только Count · Default; правки 13.11 (Select, плейсхолдер Chips) стендом не перепроверены; кода нет — parity props пропущена.

## 15. Migration
- Legacy в описании Figma не указан («—»): новый компонент 2.0 на базе Select, Menu, Multiselect option, Chip.

Осталось доделать (после пакета правок beta 2026-11-13):
- На проверку: при тексте 200 % первая строка меню не увеличивается — проверить текстовый слой первого Multiselect option в Menu.
- Пункты меню по умолчанию — пять одинаковых «Bitcoin (BTC)»: развести подписи и согласовать с чипами; «+N» в Chips в наборе не показан.
- Ширина корня 320 — числом.
- Hover на оси State нет — на решение: добавить или записать «только в коде».
