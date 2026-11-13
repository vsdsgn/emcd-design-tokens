# Segment — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Segment`. Status: beta. Level: atom.
- Figma: Components, страница «Segment» (`1012:9`), набор `46:336`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Элемент Segmented. Отдельно не используется.
- Когда использовать: только внутри Segmented (режим или период из 2–4).
- Когда нет: фильтры — Chip; разделы экрана — Tab.
- Правило выбора варианта:
  - Tone: Neutral — по умолчанию; Accent — режим с промо или главным действием (редко); Success / Danger — только направление сделки (Купить / Продать).
  - Size — из Segmented: S, M, L, XL.
  - Show label=false — сегмент только с иконкой.

## 3. Anatomy
- Корень: `icon` · `label`; подложка выбранного.
- Служебные: `state layer`, `focus ring`, зоны, `safe area · outer`.
- Вложено: иконки ×36.
- Служебные слои (вариантов из 36): кольцо фокуса 36 · зона Web 36 · зона касания 36 · безопасное поле 36.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default, Hover, Pressed, Disabled × Selected Off | On.
- Матрица 36 из 128: тона Accent / Success / Danger — только там, где они видны (выбранный сегмент); полный перечень — в описании набора при замене.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L · XL | S |
| Selected | Off · On | Off |
| State | Default · Hover · Disabled · Pressed | Default |
| Tone | Neutral · Accent · Success · Danger | Neutral |

Матрица: 36 из 128.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Купить» | 36 из 36 |
| Show label | булево | вкл | 36 из 36 |
| Icon | булево | выкл | 36 из 36 |
| Icon · swap | замена экземпляра | `icon/plus` | 36 из 36 |
| Focus ring | булево | выкл | 36 из 36 · служебное |
| Show hit area | булево | выкл | 36 из 36 · служебное |
| Safe margin | булево | выкл | 36 из 36 · служебное |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 200 (подпись); полный текст — в `title` / тултипе. Сегменты в Segmented — равной ширины.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- Собственных нет: `change` испускает Segmented.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Смена выбранного — подложка переезжает (правила — у Segmented); хаптик `haptic/selection`.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="radio"` внутри `role="radiogroup"` (Segmented); Стрелки меняют выбор.
- Сегмент только с иконкой — `aria-label`.

## 10. Tokens
- `корень`: заливка / цвет `control/checked`, `control/segment`, `status/danger/solid`, `status/success/solid`, `surface/disabled`; интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `label`: заливка / цвет `text/disabled`, `text/on-accent`, `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`, `type/label/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`, `radius/focus-ring-xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/sm`, `radius/xs`.
- Значений без переменной: 72 (напр. `hit area · web:w=60`, `hit area · web:h=24`, `hit area · web:w=71`, `hit area · web:h=32`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Segment`, вариантов 36 из 128; оси: Size, Selected, State, Tone.
- Борда: «Segment — борда · шаблон v3», разделов 13.
- Описание: 798 знаков, разделы: Status: Level: Сегмент — Tone: Только внутри Segmented. Поиск: Legacy: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSegment>`; Flutter: `DsSegment`.
- Props: `size`: s | m | l | xl; `selected`: boolean; `tone`: neutral | accent | success | danger; `label`: string или слот; `showLabel`: boolean = true; `icon`: boolean = false.
- Состояния (Default, Hover, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 200 @label` числом.
- `audit-parity.plugin.js` — DESC: сущности; MATRIX: 36 из 128 без строки «Матрица:»; AXES: Selected булева, State не последняя (Size, Selected, State, Tone).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `base segmented picker item / text | icon only`: status | color neutral | brand | danger | success → Tone; size lg | sm → Size XL | M; active → Selected; icon only → Show label=false.

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- Описание: строка «Матрица:» с перечнем допустимых сочетаний (36 из 128).
- Порядок осей: State — последней; ось Selected — решение по булевым осям.
- Убрать экранированные сущности (`&amp;…quot;`) из описания.
