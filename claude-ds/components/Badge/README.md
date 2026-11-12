# Badge

Неинтерактивная метка статуса или свойства: «Активен», «Новое», «−5 %», монета. Нажать нельзя.

**Оси (как в Figma «🟡 Badge»):** Size — S 20 · M 24 · L 32; Tone — Neutral · Accent · Success · Warning · Danger · Info; Style — Subtle (по умолчанию) · Solid. Свойства: Label, Icon, Close, Chevron, Skeleton.

**Когда какой:** Success — работает, выплачено; Warning — требует внимания; Danger — ошибка, неактивен; Info — нейтральное сообщение; Accent — промо, новое; Neutral — свойство без оценки. Subtle — таблицы и списки; Solid — одна главная метка на карточке или экране.

**Размер:** S — таблицы и плотные списки; M — карточки и шапки; L — крупные заголовки, промо (рядом с Button S — Badge L).

**Когда нет:** действие — Button или Chip; количество — Counter; длинный текст — Alert; состояние, которое обновляется само, — Status.

**Правила:** не больше двух бейджей подряд; иконка — только смысловая (галочка, часы, монета), слева; цвет — не единственный носитель смысла. Одна строка, ширина ≤ 160 px, дальше многоточие, полный текст — в `title`. Радиус — `radius-sm` (S, M) и `radius-control-sm` (L), не «пилюля».

**Доступность:** текст читается как обычный; Close — отдельная кнопка с `aria-label` («Убрать …»), зона нажатия ≥ 24. Skeleton — `aria-hidden`.

Классы: `emcd-badge [emcd-badge--{s|l}] [emcd-badge--{accent|success|warning|danger|info}] [emcd-badge--solid] [emcd-badge--skeleton]`; внутри — `svg` (иконка), `emcd-badge__label`, `emcd-badge__close`.
