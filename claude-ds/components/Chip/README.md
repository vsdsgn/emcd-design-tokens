# Chip

Фильтр или выбор варианта из набора, который видно целиком: сроки «90 / 180 / 360 дней», монеты, статусы.

**Оси (как в Figma «🟡 Chip»):** Size — S 32 · M 40; Selected — Off · On; State — Default · Hover · Pressed · Disabled. Свойства: Label, Meta, Icon, Remove, Trailing icon.

**Когда какой:** S — фильтры над таблицами и списками; M — выбор варианта в форме или виджете. Selected · On — инверсия (`action-inverse-default`). Meta — вторичное значение («8 %», количество). Remove — только у выбранных фильтров в строке активных фильтров. Иконка или монета — слева, одна.

**Когда нет:** режим или период из 2–4 — Segmented; разделы — Tabs; неинтерактивная метка — Badge.

**Правила:** одна строка, ширина ≤ 240 px, дальше многоточие и `title`. Ряд чипов переносится; на узком экране допускается горизонтальная прокрутка. Вертикальной раскладки нет. Радиус — `radius-control-sm` (S) и `radius-control` (M), не «пилюля».

**Состояния:** Hover и Pressed — слой 6 % / 10 % (`state-layer`, на выбранном — `state-layer-inverse`), Pressed — масштаб 0.96 за 120 мс. Disabled — `action-disabled`, `text-disabled`.

**Доступность:** `<button aria-pressed>`; Remove — отдельная кнопка с `aria-label` «Убрать фильтр …»; фокус — кольцо 2 px с зазором 2 px; зона нажатия ≥ `touch-min`.

Классы: `emcd-chip [emcd-chip--m]` + `aria-pressed`; внутри — `svg`, `emcd-chip__label`, `emcd-chip__meta`. С Remove: `<span class="emcd-chip emcd-chip--selected">` с `emcd-chip__action` (кнопка выбора) и `emcd-chip__remove`.
