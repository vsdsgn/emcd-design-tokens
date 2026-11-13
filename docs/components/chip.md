# Chip — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chip`. Status: beta. Level: atom.
- Figma: Components, страница «Chip» (`355:34251`), набор `47:364`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Фильтр или выбор варианта из набора, который видно целиком (сроки «90 / 180 / 360 дней», монеты, статусы в фильтре).
- Когда использовать: несколько вариантов в ряд или с переносом, выбор одного или нескольких; выбранные фильтры с крестиком.
- Когда нет: режим или период из 2–4 — Segmented; разделы — Tabs; неинтерактивная метка — Badge.
- Правило выбора варианта:
  - Size: S 32 — фильтры над таблицами и списками; M 40 — выбор варианта в форме или виджете.
  - Selected=On — инверсия (`action/inverse`).
  - Meta — вторичное значение («8 %»); Remove — только у выбранных фильтров в строке активных фильтров; иконка или монета — слева, одна.
- Не делаем: вертикальная раскладка (убрана 2026-10-18); две иконки слева.

## 3. Anatomy
- Корень: подложка + обводка `control/border/default`, радиус `radius/control*`.
- `icon` · `label` · `meta` · `trailing icon` / `remove`.
- Служебные: `state layer` (на выбранном — `state/layer-inverse`), `focus ring`, зоны, `safe area · outer`.
- Вложено: иконки ×48.
- Служебные слои (вариантов из 16): кольцо фокуса 16 · зона Web 16 · зона касания 16 · безопасное поле 16.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`; на выбранном — `state/layer-inverse`.
- Default, Hover, Pressed, Disabled × Selected Off | On.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Selected | Off · On | Off |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 16 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «360 дней» | 16 из 16 |
| Meta | булево | выкл | 16 из 16 |
| Meta text | текст | «8%» | 16 из 16 |
| Icon | булево | выкл | 16 из 16 |
| Icon · swap | замена экземпляра | `icon/plus` | 16 из 16 |
| Remove | булево | выкл | 16 из 16 |
| Focus ring | булево | выкл | 16 из 16 · служебное |
| Show hit area | булево | выкл | 16 из 16 · служебное |
| Safe margin | булево | выкл | 16 из 16 · служебное |
| Trailing icon | булево | выкл | 16 из 16 |
| Trailing icon · swap | замена экземпляра | `icon/plus` | 16 из 16 |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 240 (подпись 192); полный текст — в `title` / тултипе.
- Ряд чипов переносится на следующую строку; на Compact допускается горизонтальный скролл.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- `change` / `update:selected`; `remove` — у чипа с Remove.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.
- Хаптик: `haptic/selection` при выборе на касании.

## 9. Accessibility
- Одиночный выбор — `role="radio"` в `radiogroup`; множественный — `role="checkbox"` или `aria-pressed`.
- Remove — отдельная кнопка, `aria-label` «Убрать фильтр …»; Пробел / Enter — выбрать.

## 10. Tokens
- `корень`: заливка / цвет `action/disabled`, `action/inverse/default`; интервал `space/6`; высота `control/height/md`, `control/height/sm`; maxw `size/chip/max`; отступы `control/padding-x/sm`, `space/12`; радиус `radius/control`, `radius/control-sm`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `label`: заливка / цвет `text/disabled`, `text/inverse`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `meta`: заливка / цвет `text/disabled`, `text/inverse`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`, `state/layer-inverse`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`, `radius/control-sm`.
- Min / max корня: maxWidth 240 size/chip/max.
- Значений без переменной: 32 (напр. `hit area · web:w=84`, `hit area · web:h=32`, `hit area · web:w=82`, `hit area · web:w=88`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Chip`, вариантов 16 из 16; оси: Size, Selected, State.
- Борда: «Chip — борда · шаблон v3», разделов 12.
- Описание: 1118 знаков, разделы: Status: Level: Чип: Когда использовать: Правила: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChip>`; Flutter: `DsChip`.
- Props: `size`: s | m; `selected`: boolean; `label`: string или слот; `meta`: boolean = false; `metaText`: string или слот; `icon`: boolean = false; `remove`: boolean = false; `trailingIcon`: boolean = false.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 192 @label` числом (корень — `size/chip/max`).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseChip / base --1.5`: size md | sm → Size M | S (44 → 40, 36 → 32); active → Selected; state + disable → State.
- subtext → Meta; focus → Focus ring; `baseChip / vertical` — не переносим.
- Строка csv «Layout=Vertical» устарела: раскладка убрана 2026-10-18.

Осталось доделать (после пакета правок beta 2026-11-13):
- max-width подписи 192 — числом (вложенный слой).
