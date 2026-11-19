# Segmented

Выбор одного значения из 2–4 взаимоисключающих; результат применяется сразу (период графика, Купить / Продать, вид список / сетка). Сегменты — Segment.

**Оси (как в Figma «🟡 Segmented» и «🟡 Segment»):** Segmented — Size S 32 · M 40 · L 48 (XL снят 17.11) × Items 2 · 3 · 4. Segment — Size × Selected × Tone Neutral · Accent × State Default · Hover · Pressed · Disabled; свойства Label, Show label, Icon.

**Когда какой:** Size = размер соседнего поля или кнопки. Items — по числу значений; при 4 — короткие подписи («24 ч», «7 д», «30 д», «Год»). Tone Neutral — по умолчанию; Accent (выбранный тинтом `accent-subtle`) — редко, режим с промо или главным действием. Только иконки — Show label = off и обязательная подпись в `aria-label`. Период графика — Segmented S в шапке Chart card.

**Когда нет:** разделы экрана — Tabs; больше 4 вариантов или длинные подписи — Select; множественный выбор — Chip. Направление сделки — подписью, не цветом (тонов Success / Danger нет).

**Правила:** выбран всегда ровно один сегмент; сегменты равной ширины (по самому длинному); ставится на L1 и L2 — дорожка полупрозрачная. `block` — на всю ширину контейнера. Не делаем: больше 4 сегментов, разную ширину, навигацию между разделами.

**Состояния:** дорожка `control-segment-track`; выбранный — плашка `control-segment`, подпись `text-primary`; невыбранный — `text-secondary`, Hover / Pressed — слой `state-layer` 6 % / 10 %; Disabled — `text-disabled`, у выбранного подложка `action-disabled`.

**Доступность:** `role="radiogroup"` с `aria-label`, сегменты `role="radio"` + `aria-checked`; фокус на выбранном, стрелки переводят фокус и выбор (в RTL ← → зеркально). Кольцо фокуса — только с клавиатуры.

**Код:** React `<Segmented items=[…] />` или `<Segmented><Segment value … /></Segmented>`; без `value` — неуправляемый. Vue — `<DsSegmented v-model … />`, `<DsSegment>`. Ось Items в коде — длина `items`.

Классы: `emcd-segmented [emcd-segmented--{m|l}] [emcd-segmented--block]`; сегмент `emcd-segment [emcd-segment--accent] [emcd-segment--icon-only]` (`aria-checked`, `disabled`), подпись `emcd-segment__label`.
