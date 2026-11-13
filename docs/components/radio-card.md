# Radio card — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Radio card`. Status: beta. Level: unknown.
- Figma: Components, страница «Radio card» (`1597:2`), набор `1597:106`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Radio card», уровень — молекула. Внутри — вложенный Radio (круг); подпись и детали — свои слои карточки.

## 2. Intent
- Выбираемая карточка: радио, подпись и необязательные детали, которые раскрываются у выбранной. Нажимается вся карточка.
- Когда использовать: выбор одного из нескольких вариантов с пояснением (расписание выгрузки, тариф, способ вывода).
- Когда нет: короткий выбор без пояснений — Radio group; 2–4 варианта-переключателя — Segmented.
- Правило выбора варианта:
  - Status: Off — не выбрана; On — выбрана: обводка `border/accent`, детали показаны. В группе выбрана одна.
  - State: Default | Hover | Disabled | Pressed — по модели плашки; Disabled — нажатие недоступно.
  - Show details — включено у выбранной карточки (Status = On); у невыбранных выключается.
  - У карточек одной группы одинаковая ширина.
- Не делаем: одиночная карточка; несколько выбранных в группе; разная ширина карточек одной группы; Hover / Pressed сменой заливки вместо слоя `state/layer`.

## 3. Anatomy
- Корень: подложка `surface/level-2`, `radius/surface`, отступы `space/16`, обводка `border/subtle` (Off) | `border/accent` (On) толщиной `border/width/default`; колонка `header` → `details` через `space/8`.
- `header` — Radio (круг, у первой строки подписи) + `label` (`type/label/lg`, Medium, `text/primary`) через `space/12`; `details` — пояснение (`type/label/md`, Medium, `text/secondary`), несколько строк.
- Служебные: `state layer` (`state/layer`, `radius/surface`), `focus ring` вокруг карточки (`radius/focus-ring-surface`), `hit area · web` / `hit area · app` на всю карточку, `safe area · outer`.
- Вложено: `Radio` ×8, `_Hit area` ×16, `_Safe margin` ×8.
- Служебные слои (вариантов из 8): кольцо фокуса 8 · зона Web 8 · зона касания 8 · безопасное поле 8.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — подложка `surface/level-2`; Off — обводка `border/subtle`, On — `border/accent` и радио с точкой.
- Hover / Pressed — только слой `state/layer` (`state/hover` / `state/pressed`) поверх карточки; обводка и текст не меняются.
- Disabled — подпись и детали `text/disabled`, радио погашено, нажатие недоступно; у On обводка остаётся `border/accent`.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — вокруг всей карточки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On | Off |
| State | Default · Hover · Disabled · Pressed | Default |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Раз в три месяца» | 8 из 8 |
| Details | текст | «День недели: 1-го числа квартала
Время отправки: 12:00
Период выгрузки: предыдущий квартал» | 8 из 8 |
| Show details | булево | вкл | 8 из 8 |
| Focus ring | булево | выкл | 8 из 8 · служебное |
| Show hit area | булево | выкл | 8 из 8 · служебное |
| Safe margin | булево | выкл | 8 из 8 · служебное |

- Свойства: Label, Details (текст), Show details (по умолчанию вкл.), служебные Focus ring, Show hit area, Safe margin.

## 6. Content / slots
- Label — название варианта; Details — пояснение, строки через перенос («День недели…», «Время отправки…», «Период выгрузки…»).
- Длинный текст: подпись и детали переносятся, не усекаются, карточка растёт по высоте; круг радио — у первой строки подписи.
- Языки (de, ar, hi, th, ja, kk) — без обрезки по высоте.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Текст 200 %: карточка растёт по высоте, детали переносятся, обрезки и наложений нет; круг остаётся 20.

## 7. Events
- `change` (значение группы) — нажатие в любом месте карточки. У Disabled событий нет.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Выбранная карточка показывает детали; у невыбранных детали скрыты.
- Нажимается вся карточка. Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="radiogroup"` на группе карточек, у карточки `role="radio"` и `aria-checked`.
- Стрелки меняют выбор, Tab входит в группу один раз.
- Детали связаны с карточкой через `aria-describedby`.
- Выбор виден не только цветом обводки: точка в радио.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-2`; интервал `space/8`; отступы `space/16`; радиус `radius/surface`; обводка `border/accent`, `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/12`.
- `radio`: maxw `size/field/max`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `details`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-surface`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/surface`.
- Значений без переменной: 24 (напр. `(root):w=400`, `hit area · web:w=400`, `hit area · web:h=126`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Radio card`, вариантов 8 из 8; оси: Status, State.
- Борда: «Radio card — борда · шаблон v3», разделов 10.
- Описание: 925 знаков, разделы: Status: Level: Выбираемая карточка: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsRadioCard>`; Flutter: `DsRadioCard`.
- Props: `status`: boolean; `label`: string или слот; `details`: string или слот; `showDetails`: boolean = true.
- Состояния (Default, Hover, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; положение радио у первой строки после правки 13.11 стендом не перепроверено; кода нет — parity props пропущена.

## 15. Migration
- Продукт «Выгрузка»: радио-карточки расписания → Radio card (Status, State, Label, Details, Show details).

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: на L2 заливка `surface/level-2` совпадает с фоном, карточку держит только `border/subtle` (в Light у Disabled контур почти не виден) — заливка от текущей поверхности или запрет на L2.
- На решение: On · Disabled — обводка `border/accent` не погашена.
- Ширина корня 400 и `hit area · web` 400 × 126 — числом.
