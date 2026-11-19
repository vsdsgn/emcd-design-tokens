# Table cell

Ячейка таблицы: выравнивание, отступы, состояние и содержимое — две строки текста или атом DS.

**Оси (как в Figma «🟡 Table cell»):** Align Start · End × State Default · Skeleton · Disabled; слот Content. Поля 12, min-width 80; по умолчанию `primary` (label-md 14 Medium `text-primary`, 19.11 — как Amount M) + `secondary` (`text-secondary`), одна строка с многоточием.

**Правила:** одна колонка — одно выравнивание и один тип содержимого; End — числа и суммы (Amount не усекается); действия строки — последней колонкой. Своих вёрсток в слоте нет — только атомы DS.

**Доступность:** `td`; обрезанный текст — в `title`.

Классы: `emcd-td [emcd-td--end] [emcd-td--skeleton] [emcd-td--disabled]`, `emcd-td__content`, `__primary`, `__secondary`, `__bone`.
