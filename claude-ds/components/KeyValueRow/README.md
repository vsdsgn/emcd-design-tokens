# Key-value row

Строка «название — значение» в сводке: подтверждение вывода, детали операции, сводка воркеров на Compact.

**Оси (как в Figma «🟡 Key-value row»):** Emphasis Default · Total · Muted × Leader Off · On. Название `text-secondary` body-md (до 2 строк), значение `text-primary` (одна строка до 200), зазор 16, поля 8; Total — линия сверху `border-subtle`, оба Label/MD Medium; Leader — точечная линия `border-strong`.

**Правила:** Total — одна на сводку, последней; числа — шрифт текста с табличными цифрами. Нажатие по строке не делаем — для этого List item. В коде название — `label` (`key` занят в React и Vue).

**Доступность:** `dt` + `dd`; ряд строк — в `<dl class="emcd-kv-list">`. Итог отличается линией и Medium, не только цветом.

Классы: `emcd-kv-list`, `emcd-kv [emcd-kv--{total|muted}] [emcd-kv--leader]`, `emcd-kv__key`, `emcd-kv__key-text`, `emcd-kv__value`.
