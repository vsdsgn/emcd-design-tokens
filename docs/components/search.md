# Search — контракт (2026-11-22)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Search`. Status: beta. Level: unknown.
- Figma: Components, страница «Search» (`2233:839`), набор `2233:913`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Search». Вложены иконка лупы и Icon button Ghost S (крестик «Очистить»). Beta 20.11 по репо: Status в описании набора в Figma меняется отдельно.

## 2. Intent
- Поле поиска: лупа, текст, крестик «Очистить» (когда введено). Поиск воркеров, монет, операций.
- Когда использовать: поиск по списку на экране: воркеры, монеты, операции; строка фильтров списка или таблицы.
- Когда нет: поле формы — Input; поиск внутри выпадающего списка — поле Menu (Input M); глобальный поиск с выпадающими результатами — в системе нет (парковка, `docs/patterns.md`).
- Правило выбора варианта:
  - Size: M 40 (`control/height/md`) — рядом с полями и Select M; S 32 (`control/height/sm`) — рядом с контролами S. Размер = размер соседних контролов.
  - State: Default — пусто, подсказка `text/tertiary`; Hover — указатель над полем; Focus — идёт ввод, обводка `border/focus`; Filled — текст введён, появляется крестик; Disabled — поиск недоступен, текст `text/disabled`.
  - Крестик «Очистить» — Icon button Ghost S, только в Filled; Esc очищает поле.
  - Подписи над полем нет: подсказка говорит, что ищем («Поиск воркеров»), она же — доступное имя.
- Не делаем: Search как поле формы; крестик в пустом поле; свои варианты под содержимое.

## 3. Anatomy
- Корень — ряд, зазор `space/8`, высота `control/height/md` (M) / `control/height/sm` (S), отступы `space/12` в начале и `space/4` в конце; подложка `surface/level-2`, обводка `border/subtle` (Focus — `border/focus`), `border/width/default`, `radius/control`; ширина образца 320 числом.
- `icon` — лупа `icon/size/md` (20); в коде цвет `icon/tertiary`.
- `text` — `font/family/text`, `font-weight/medium`: M `type/body/md`, S `type/body/sm`; подсказка `text/tertiary`, введённый текст `text/primary`, Disabled `text/disabled`.
- `clear` — Icon button Ghost S: `control/height/sm`, `radius/sm`, зазор `space/6`; только в Filled.
- Вложено: иконки ×10, `Icon button` ×2.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле (как Input): Hover — слой состояния 6 %; Pressed нет; Focus — обводка `border/focus`, с клавиатуры — кольцо; Disabled — `text/disabled`.
- Default — подсказка `text/tertiary`, обводка `border/subtle`.
- Hover — слой состояния 6 % поверх подложки (в коде `state/layer` × `state/hover`).
- Focus — обводка `border/focus`, каретка.
- Filled — текст `text/primary`, крестик «Очистить».
- Disabled — лупа и текст `text/disabled`, крестика нет, Hover нет.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). В Figma слоя кольца у набора нет (раздел 14); в коде — `outline` `border/focus-ring` при `:focus-visible`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| State | Default · Hover · Focus · Filled · Disabled | Default |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «Поиск» | 10 из 10 |

- Text — подсказка, по умолчанию «Поиск»; в коде `text` = `placeholder`.

## 6. Content / slots
- Подсказка — что ищем, одна строка («Поиск воркеров»); введённый текст — одна строка, усечение многоточием.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Лупа в начале, крестик в конце (logical properties).

## 7. Events
- `update:modelValue` (React `onChange(value, event)`) — ввод; без `value` — неуправляемое (React), Vue — `v-model`.
- `clear` (React `onClear`) — крестик или Esc.

## 8. Behavior
- Esc при введённом тексте очищает поле; крестик появляется, когда есть текст и поле не Disabled.
- Смена обводки и слоя Hover — `motion/duration/feedback`, `motion/easing/standard`; «Уменьшить движение» — без перехода.

## 9. Accessibility
- `role="search"` на корне, поле `type="search"` с `aria-label` (по умолчанию — подсказка).
- Крестик — Icon button с именем «Очистить».
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 10. Tokens
- `корень`: заливка / цвет `surface/level-2`; интервал `space/8`; высота `control/height/md`, `control/height/sm`; отступы `space/12`, `space/4`; радиус `radius/control`; обводка `border/focus`, `border/subtle`; толщина обводки `border/width/default`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `text`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `clear`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- Значений без переменной: 10 (напр. `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Search`, вариантов 10 из 10; оси: Size, State.
- Борда: «Search — борда · шаблон v3», разделов 11.
- Описание: 1115 знаков, разделы: Status: Level: Search — Когда использовать: Правила: A11y: Beta (20.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Search`), Vue `packages/vue/src/DsSearch.vue`, CSS `claude-ds/components/Search/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsSearch>`; Flutter: `DsSearch`.
- Props: `size`: s | m; `text`: string или слот.
- Состояния (Default, Hover, Focus, Filled, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.
- `text` / `placeholder` — подсказка (по умолчанию «Поиск»); `label` — доступное имя (по умолчанию — подсказка); `clearLabel` — по умолчанию «Очистить»; `disabled`.

## 14. Acceptance (2026-11-22)
- `audit.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `variables-check.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `audit-parity.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд (Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, 200 %, RTL); в Figma нет кольца фокуса, зон нажатия и безопасного поля (`npm run draft-audit`: SERVICE); код есть (React / Vue / CSS), манифеста кода нет — parity props пропущена.

## 15. Migration
- DS Web `Search` в Dropdown — поле поиска внутри Menu (Input M), не этот набор (`docs/migration/components.csv`).
- Продукт: поиск воркеров в меню экрана майнинга (на Compact — рядом с переключателем вида, `docs/patterns.md`).

Осталось доделать (после пакета правок beta 2026-11-13):
- Figma: служебные слои — кольцо фокуса, зоны нажатия (Web 24 / касание 44), безопасное поле (draft-audit SERVICE).
- Figma: Status в описании набора → beta.
- Вариант по умолчанию Size в Figma не сверен (в коде `m`).
- Крестик у Size S: в Figma `control/height/sm`, в коде `control/height/xs` — сверить.
- Hover в Figma: токенов слоя состояния в манифесте набора нет — сверить с кодом (6 %).
- Плагины audit / variables-check / audit-parity и стенд.
