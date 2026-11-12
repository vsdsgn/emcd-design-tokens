# Textarea

Поле для текста длиннее одной строки: комментарий, обращение в поддержку.

**Оси (как в Figma «🟡 Textarea»):** Size — M · L · XL; State — Default · Hover · Focus · Error · Disabled · Read-only · Loading · Skeleton. Подпись — только Above. Свойства: Label, Value, Helper, Counter.

**Когда нет:** одна строка — Input.

**Правила:** высота от 96 px (3 строки), растёт по содержимому до 8 строк, дальше прокрутка; ручного изменения размера нет. Counter — лимит символов, прижат к концу; Helper переносится. Ширина 160–480 px.

**Состояния:** как у Input — слой `state-layer` 6 % на Hover, рамка `control-border-focus` и кольцо 2 px с клавиатуры, Error, Disabled, Read-only.

**Доступность:** `<textarea>` с `<label>`; лимит — `aria-describedby` на счётчик; Error — `aria-invalid`.

Классы: `emcd-field [emcd-field--{l|xl}] [emcd-field--{error|disabled|readonly|skeleton}]`; внутри — `emcd-field__label`, `textarea.emcd-textarea`, `emcd-field__row` с `emcd-field__hint` и `emcd-field__counter`.
