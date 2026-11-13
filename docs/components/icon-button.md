# Icon button — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Icon button`. Status: beta. Level: atom.
- Figma: Components, страница «Icon button» (`301:2237`), набор `301:4958`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Кнопка-иконка: закрыть, «…», копировать, фильтр, обновить. Та же основа, что у Button.
- Когда использовать: частое узнаваемое действие без подписи; тулбары, строки таблиц, шапки.
- Когда нет: действие, которое не читается по иконке, — Button с подписью.
- Правило выбора варианта:
  - Type: Ghost — самый частый (без подложки, подложка появляется слоем состояния); Primary — главное действие иконкой («+»), одна на группу; Secondary — второе по важности; Tertiary / Tertiary outline — нейтральное с подложкой / обводкой (L2–L3 — outline); Text — иконка цвета бренда; Inverted — на тёмных и цветных подложках.
  - Tone=Danger — только Primary, Secondary, Text (отсюда 240 из 280).
  - Size: квадрат S 32 · M 40 · L 48 · XL 56; иконка S 16 · M 20 (касание 24) · L / XL 24 (касание 28). Рядом с Button — того же размера.
- Не делаем: иконку без Label; две Primary рядом; Ghost на пёстрой подложке (там Inverted); размер иконки вне шкалы.

## 3. Anatomy
- Квадрат: `icon` (замена экземпляра) или `Spinner` (Loading).
- `tooltip` с `_Tooltip arrow` — в Hover, только Web.
- Служебные: `state layer`, `focus ring`, зоны, `safe area · outer`.
- Вложено: `Spinner` ×240, иконки ×240, `_Tooltip arrow` ×48.
- Служебные слои (вариантов из 240): кольцо фокуса 240 · зона Web 240 · зона касания 240 · безопасное поле 240.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`; Pressed — масштаб 0.96; у Ghost и Text подложка — только слой состояния.
- Default, Hover, Pressed, Disabled — ось State. Loading — свойство False / True (спиннер вместо иконки, кнопка не нажимается); только при State = Default.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо 2 px, зазор 2, повторяет скругление.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Primary · Secondary · Tertiary · Tertiary outline · Ghost · Text · Inverted | Ghost |
| Tone | Default · Danger | Default |
| Size | S · M · L · XL | M |
| Loading | False · True | False |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица: 240 из 448.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Скопировать» | 48 из 240 |
| Icon | замена экземпляра | `icon/plus` | 240 из 240 |
| Focus ring | булево | выкл | 240 из 240 · служебное |
| Show hit area | булево | выкл | 240 из 240 · служебное |
| Safe margin | булево | выкл | 240 из 240 · служебное |

## 6. Content / slots
- Label обязателен: действие, а не «Иконка» («Скопировать адрес», «Закрыть»). Показывается в тултипе (Web) и читается скринридером.
- Тултип — одна строка, min-width 58; длинный Label переносит Tooltip по своим правилам.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- `click`; при Loading и Disabled не испускается.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed — как у Button: слой 10 % + масштаб 0.96, 120 мс; хаптик `haptic/press` на касании.
- Тултип: в Hover с указателем; сверху, у края экрана — переворот или сдвиг; в тулбаре между соседними кнопками — без задержки. В приложении тултипа нет.
- Зона: S 32 на касании расширяется до 44. Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `<button>` с `aria-label` = Label; Loading — `aria-busy`; Disabled — `aria-disabled`.
- Тултип не заменяет имя: связан через `aria-describedby` только если текст отличается от Label.

## 10. Tokens
- `корень`: заливка / цвет `action/accent/default`, `action/danger-subtle/default`, `action/danger/default`, `action/disabled`, `action/inverse/default`, `action/primary/default`, `action/secondary/default`, `action/tertiary/default`; интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xl`; радиус `radius/container`, `radius/control`, `radius/control-sm`; обводка `control/border/default`, `control/border/error`; толщина обводки `border/width/default`; ширина `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xl`.
- `spinner`: высота `icon/size/lg`, `icon/size/md`, `icon/size/sm`; ширина `icon/size/lg`, `icon/size/md`, `icon/size/sm`.
- `icon`: высота `icon/size/lg`, `icon/size/md`, `icon/size/sm`; ширина `icon/size/lg`, `icon/size/md`, `icon/size/sm`.
- `tooltip`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; отступы `space/10`, `space/16`; радиус `radius/container`; обводка `control/border/default`; толщина обводки `border/width/default`; видимость `touch/is-fine`.
- `Скопировать`: заливка / цвет `text/danger`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`, `state/layer-inverse`; прозрачность `state/hover`, `state/pressed`; радиус `radius/container`, `radius/control`, `radius/control-sm` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid`; толщина обводки `border/width/default` · `hit area · app`: видимость `touch/is-coarse` · `focus ring`: радиус `radius/focus-ring`, `radius/focus-ring-lg`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `safe area · content`: заливка / цвет `status/success/solid` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Значений без переменной: 480 (напр. `hit area · web:w=32`, `hit area · web:h=32`, `hit area · web:w=40`, `hit area · web:h=40`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Иконка крупнее на касании (режим Platform): M 20 → 24, L / XL 24 → 28.

## 12. Figma projection
- Набор `Icon button`, вариантов 240 из 448; оси: Type, Tone, Size, Loading, State.
- Борда: «Icon button — борда · шаблон v3», разделов 11.
- Описание: 2646 знаков, разделы: Status: Level: Кнопка-иконка: Когда использовать: Матрица: • Ghost — • Primary — • Secondary — • Text — • Inverted — Квадрат: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsIconButton>`; Flutter: `DsIconButton`.
- Props: `type`: primary | secondary | tertiary | tertiary-outline | ghost | text | inverted; `tone`: default | danger; `size`: s | m | l | xl; `loading`: boolean; `label`: string или слот.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.
- `label` → `aria-label` и текст тултипа; `icon` — слот.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `minWidth 58 @tooltip` числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseButton` (Has text=false) и `.button circle` → Icon button; типы — как у Button, плюс Ghost (самый частый).
- Строка Icon button в `docs/migration/components.csv` обновлена под типы Figma 2026-11-12.
