# Tab — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Tab`. Status: beta. Level: atom.
- Figma: Components, страница «Tab» (`1012:8`), набор `45:155`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Переключение разделов одного экрана (История: Начисления / Выплаты / Воркеры). Выбранный — подчёркивание.
- Когда использовать: 2–7 разделов одного уровня, контент меняется под табами.
- Когда нет: выбор значения или режима в форме — Segmented; фильтр списка — Chip; переход на другой экран — навигация.
- Правило выбора варианта:
  - Size: S 32 — мини-табы внутри виджета или карточки; M 48 — App и мобильный веб; L 56 — Web, разделы внутри страницы; XL 64 (текст 20) — табы-заголовок страницы. В одном баре один размер.
  - Counter — `Counter` Neutral; Accent / Danger — только если требует действия.
  - Icon — редко, только если у всех табов.

## 3. Anatomy
- Корень: `icon` · `label` · `Counter`; `indicator` — подчёркивание выбранного (3 px у L / XL, 2 px у S / M).
- Служебные: `state layer`, `focus ring`, зоны, `safe area · outer`.
- Вложено: иконки ×36, `Counter` ×36.
- Служебные слои (вариантов из 36): кольцо фокуса 36 · зона Web 36 · зона касания 36 · безопасное поле 36.

## 4. States
- Группа модели состояний (`docs/components.md`): Навигация: индикатор `border/accent`; Hover / Pressed — слой состояния и цвет текста.
- Default, Hover, Pressed, Disabled × Selected Off | On; Skeleton — загрузка (без Selected: 36 из 40).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L · XL · S | M |
| Selected | Off · On | Off |
| State | Default · Hover · Pressed · Disabled · Skeleton | Default |

Матрица: 36 из 40.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Воркеры» | 36 из 36 |
| Counter | булево | выкл | 36 из 36 |
| Icon | булево | выкл | 36 из 36 |
| Icon · swap | замена экземпляра | `icon/plus` | 36 из 36 |
| Focus ring | булево | выкл | 36 из 36 · служебное |
| Show hit area | булево | выкл | 36 из 36 · служебное |
| Safe margin | булево | выкл | 36 из 36 · служебное |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 240 (подпись); полный текст — в `title` / тултипе.
- Overflow: бар скроллится по горизонтали, без «Ещё».
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Порядок табов и направление скролла зеркалятся.

## 7. Events
- Собственных нет: `change` / `update:modelValue` испускает Tabs.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Смена выбранного: индикатор переезжает (в Tabs); хаптик `haptic/selection` на касании.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="tab"` в `role="tablist"`, `aria-selected`, `aria-controls` → панель.
- ← / → — переход, Home / End — края, Tab — выход в панель.

## 10. Tokens
- `корень`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `label`: заливка / цвет `text/disabled`, `text/primary`, `text/secondary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/lg`, `type/label/lg`, `type/label/md`, `type/label/sm`.
- `counter`: заливка / цвет `action/secondary/default`; высота `size/counter-height/md`, `size/counter-height/sm`; maxw `size/counter/max`; отступы `space/2xs`, `space/6`; радиус `radius/full`.
- `indicator`: заливка / цвет `border/accent`, `border/default`, `control/border/default`, `icon/disabled`; высота `size/tab-indicator/lg`, `size/tab-indicator/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`, `radius/control-xs`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Значений без переменной: 120 (напр. `hit area · web:w=60`, `hit area · web:h=48`, `indicator:r=1`, `indicator:w=60`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Размер по умолчанию: Web — L, App и Mobile web — M.

## 12. Figma projection
- Набор `Tab`, вариантов 36 из 40; оси: Size, Selected, State.
- Борда: «Tab — борда · шаблон v3», разделов 13.
- Описание: 1278 знаков, разделы: Status: Level: Таб: Когда использовать: Правила: Матрица: Overflow: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTab>`; Flutter: `DsTab`.
- Props: `size`: m | l | xl | s; `selected`: boolean; `label`: string или слот; `counter`: boolean = false; `icon`: boolean = false.
- Состояния (Default, Hover, Pressed, Disabled, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 240 @label` числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `base tab item`, `tab item`: size desktop | mobile → Size L | M (60 → 56, 44 → 48); selected → Selected; state skeleton | default | hover | pressed | disabled → State; focus → Focus ring; counter badge → Counter.
- `widget Navigation header / .tab` → Size XL / M; `.tabs` в bar widget (30) → Size S (32).

Осталось доделать (после пакета правок beta 2026-11-13):
- max-width подписи 240 — числом (вложенный слой).
