# Table row

Строка таблицы Web из Table cell, разделитель снизу `border-subtle`.

**Оси (как в Figma «🟡 Table row»):** Density Compact 48 · Regular 64 × Selected × State Default · Hover · Pressed. Selected — `accent/subtle`; без своих боковых полей.

**Правила:** в таблице одна плотность; Hover — только если строка открывает детали (`onClick`). На Compact — List item / Transaction.

**Доступность:** `tr`; кликабельная — `tabIndex=0`, Enter открывает детали; фокус — внутреннее кольцо.

Классы: `emcd-tr [emcd-tr--regular] [emcd-tr--selected] [emcd-tr--interactive]`.
