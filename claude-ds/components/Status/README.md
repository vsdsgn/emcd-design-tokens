# Status

Точка + подпись: состояние объекта (воркер, устройство, сервис, выплата) в строке таблицы, списке, шапке.

**Оси (как в Figma «🟡 Status»):** Size S · M × Tone Success · Warning · Danger · Info · Neutral; свойства Label, Show label.

**Когда какой:** Success — работает; Warning — нестабилен, требует внимания; Danger — не работает; Info — в процессе; Neutral — выключен, нет данных. S — таблицы; M — карточки и шапки. Show label = off — только в ячейках под заголовком «Статус» и в легенде графика.

**Когда нет:** метка-свойство или промо — Badge; сообщение — Suggest / Toast.

**Правила:** состояние, которое обновляется само (online / offline); смена тона — смена данных.

**Состояния:** нет, неинтерактивен.

**Доступность:** статус — словом, не только цветом; без подписи — `role="img"` и `aria-label`.

Классы: `emcd-status [emcd-status--m] [emcd-status--{warning|danger|info|neutral}]`; внутри `emcd-status__dot`, `emcd-status__label`.
