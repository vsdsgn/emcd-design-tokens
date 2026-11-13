# Select compact — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Select compact`. Status: beta. Level: unknown.
- Figma: Components, страница «Select» (`353:6`), набор `75:1449`. Платформы: Web, Mobile web, iOS, Android.
- Лежит на странице Select.

## 2. Intent
- Компактный селектор без лейбла: выбор монеты, сети, валюты внутри строки, карточки, шапки виджета («USDT ▾»). По нажатию открывает Menu, на Compact — Sheet.
- Когда использовать: значение выбирается «на месте», рядом с суммой или заголовком.
- Когда нет: поле формы с лейблом и ошибкой — Select.
- Правило выбора варианта:
  - State: Default — покой; Hover — указатель; Open — список открыт (шеврон вверх); Disabled — выбор недоступен (legacy Inactive); Pressed — нажатие.
  - Show leading: On — у значения есть монета или иконка; Off — только текст (сеть, валюта без знака).
  - Leading — слот: принимает Coin или Coin stack (перетащить компонент в слот); по умолчанию одна монета.
  - Высота `size/row/compact` (36), ширина — по содержимому, не больше `size/select-compact/max` (200).
  - Один в строке; список — Menu, на Compact — Sheet.
- Не делаем: лейбл и текст ошибки; два Select compact в одной строке; замена Select в форме.

## 3. Anatomy
- Корень: подложка `action/secondary/default`, `radius/control-sm`, отступ `space/8`, зазор `space/16` между значением и шевроном; высота `size/row/compact`, max-width `size/select-compact/max`.
- `value` (зазор `space/6`): слот `Leading` (монета 24) + `text` (`type/label/md`, `font-weight/medium`, `text/primary`; max-width 122) → шеврон 16.
- `state layer` — `state/layer` × `state/hover` / `state/pressed`, `radius/control-sm`.
- Служебные слои: `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer`.
- Вложено: `smbl-bitcoin-btc` ×5, иконки ×5, `_Hit area` ×10, `_Safe margin` ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 5 · зона Web 5 · зона касания 5 · безопасное поле 5.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — подложка `action/secondary/default`.
- Hover — слой `state/hover`; Pressed — подложка `action/secondary/pressed` + слой `state/pressed`.
- Open — подложка темнее Default, шеврон вверх; держится, пока открыт список.
- Disabled — подложка `action/disabled`, текст `text/disabled`, шеврон `icon/disabled`, монета погашена.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Open · Disabled · Pressed | Default |

Матрица полная: 5 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «USDT» | 5 из 5 |
| Show leading | булево | вкл | 5 из 5 |
| Leading | SLOT | `undefined` | 5 из 5 |
| Focus ring | булево | выкл | 5 из 5 · служебное |
| Show hit area | булево | выкл | 5 из 5 · служебное |
| Safe margin | булево | выкл | 5 из 5 · служебное |

## 6. Content / slots
- Длинный текст: одна строка, `text` усекается многоточием по max-width 122 (= 200 − отступы 8 + 8 − зазор 16 − шеврон 16 − монета 24 − зазор 6); шеврон всегда внутри подложки.
- Языки (стенд): de, ar, hi, th, ja, kk — усечение многоточием, шеврон внутри, по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Текст 200 %: высота остаётся 36, текст по высоте не обрезан, ширина растёт до max-width.

## 7. Events
- `click` — открывает Menu (Compact — Sheet).
- `change` — выбрано другое значение; список закрывается.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Open держится, пока открыт список; закрытие — выбор или Esc.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `button` с `aria-haspopup="listbox"` и `aria-expanded`.
- Доступное имя — что выбирается и текущее значение: «Монета: USDT».
- Enter / Space / ↓ — открыть, ↑ / ↓ — выбор, Enter — подтвердить, Esc — закрыть.

## 10. Tokens
- `корень`: заливка / цвет `action/disabled`, `action/secondary/default`, `action/secondary/pressed`; интервал `space/16`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `value`: интервал `space/6`.
- `text`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control-sm`.
- Min / max корня: maxWidth 200 size/select-compact/max.
- Значений без переменной: 10 (напр. `hit area · web:w=114`, `hit area · web:h=36`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Список: Web — Menu, Compact — Sheet.

## 12. Figma projection
- Набор `Select compact`, вариантов 5 из 5; оси: State.
- Борда: «Select — борда · шаблон v3», разделов 11.
- Описание: 1126 знаков, разделы: Status: Level: Когда использовать: A11y: Поиск: Legacy: Правила: Длинный текст:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSelectCompact>`; Flutter: `DsSelectCompact`.
- Props: `text`: string или слот; `showLeading`: boolean = true; `leading`: string или слот.
- Состояния (Default, Hover, Open, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (text 122).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `Selector small` (Type=Default | Inactive) → Select compact (State Default | Disabled); Hover, Open, Pressed — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- Порядок оси State: Pressed стоит после Disabled — на решение (Default, Hover, Pressed, Open, Disabled).
- На решение: Disabled — подложка `action/disabled` на вид совпадает с Default, гаснет только содержимое.
