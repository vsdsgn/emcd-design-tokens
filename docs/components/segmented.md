# Segmented — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Segmented`. Status: beta. Level: unknown.
- Figma: Components, страница «Segmented» (`355:33993`), набор `46:549`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Выбор одного значения из 2–4 взаимоисключающих; результат применяется сразу (период графика, Купить / Продать, вид список / сетка).
- Когда использовать: режим или фильтр-значение внутри карточки, виджета, формы.
- Когда нет: разделы экрана — Tabs; больше 4 вариантов или длинные подписи — Select; множественный выбор — Chip.
- Правило выбора варианта:
  - Size = размер соседнего поля или кнопки: S 32 · M 40 · L 48 · XL 56.
  - Items: 2, 3 или 4 — по числу значений; больше 4 — Select. При Items=4 — короткие подписи («24 ч», «7 д», «30 д», «Год»).
  - Сегменты равной ширины.
  - Тон выбранного — по правилам Segment: Success / Danger — только направление сделки.
  - Только иконки — Show label = off у вложенных Segment, обязательно `aria-label`.
  - Ставится на L1 и L2: подложка полупрозрачная.
- Не делаем: больше 4 сегментов; длинные подписи; сегменты разной ширины; навигация между разделами экрана.

## 3. Anatomy
- Корень — дорожка `control/segment-track` (отступ `space/4`, зазор `space/2`, `radius/control` / `radius/control-sm`).
- `segment 1` … `segment 4` — экземпляры Segment; выбранный — на подложке `control/segment`; подпись — Fill, по центру, одна строка.
- Подпись, иконка и Show label открыты у вложенных Segment; своих свойств у набора нет.
- Служебные слои (кольцо фокуса, зоны, безопасное поле) — у Segment.
- Вложено: `Segment` ×36.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует от Segment: Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Оси State у набора нет: Default, Hover, Pressed, Disabled и Selected — у вложенных Segment.
- Выбран всегда ровно один сегмент.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L · XL | S |
| Items | 2 · 3 · 4 | 2 |

Матрица полная: 12 вариантов.

- Свойств у набора нет: подпись, иконка, Show label, Selected и Tone — у вложенных Segment.

## 6. Content / slots
- Подписи — одно короткое слово («День», «Неделя», «Купить»); длинные подписи — это Select. При Items=4 в S сегмент ≈ 57: «Неделя» не помещается — сокращения («7 д»).
- Длинный текст: одна строка, по центру сегмента, усечение многоточием по ширине сегмента; подписи не накладываются.
- Языки (de, ar, hi, th, ja, kk): длинная фраза усекается внутри сегмента.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Текст 200 %: по высоте не обрезано; подписи усекаются внутри своих сегментов.

## 7. Events
- `change` — выбран другой сегмент; результат применяется сразу, без подтверждения.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Смена выбранного и хаптик — по контракту Segment.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`. Слои — у Segment.

## 9. Accessibility
- `role=radiogroup`, сегмент — `role=radio` + `aria-checked`.
- ← / → — переход и выбор, Tab — выход из группы.
- Сегменты только с иконками — `aria-label` у каждого.

## 10. Tokens
- `корень`: заливка / цвет `control/segment-track`; интервал `space/2`; отступы `space/4`; радиус `radius/control`, `radius/control-sm`.
- `segment 1`: заливка / цвет `control/segment`; интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `segment 2`: интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `segment 3`: интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `segment 4`: интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- Значений без переменной: 12 (напр. `(root):w=240`, `(root):w=280`, `(root):w=320`, `(root):w=360`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Segmented`, вариантов 12 из 12; оси: Size, Items.
- Борда: «Segmented — борда · шаблон v3», разделов 12.
- Описание: 1222 знаков, разделы: Status: Level: Segmented: Когда использовать: Правила: Длинный текст: Уровни: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSegmented>`; Flutter: `DsSegmented`.
- Props: `size`: s | m | l | xl; `items`: 2 | 3 | 4.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (вложенный Segment, label).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; код — HTML/CSS.

## 15. Migration
- DS Web `base segmented picker group / text` | `/ icon only` → Segmented (Size, Items 2 | 3 | 4); icon only → Show label = off у вложенных Segment.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 240 / 280 / 320 / 360 — числом.
