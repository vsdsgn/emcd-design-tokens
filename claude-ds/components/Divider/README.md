# Divider

Разделитель: линия между группами содержимого, с необязательной подписью «или».

**Оси (как в Figma «🟡 Divider»):** Orientation Horizontal · Vertical × Label Off · On × Style Solid · Dotted (6 вариантов: у Vertical подписи нет); свойство Label text.

**Когда какой:** Horizontal — между блоками, на всю ширину контейнера; Vertical — между элементами в строке, по высоте строки. Label On — только «или» между равноправными способами (вход, оплата). Style Solid — по умолчанию; правило для Dotted не задано — не использовать без решения.

**Когда нет:** между каждой строкой списка — хватает отступов (у List item свой Divider); рядом с границей карточки.

**Правила:** толщина `border-width-default`, цвет `border-subtle` — у обоих стилей; другие не используем. Не первой и не последней строкой блока.

**Состояния:** нет, неинтерактивен.

**Доступность:** `<hr>` или `role="separator"` (Vertical — `aria-orientation="vertical"`).

**Код:** React — `style` (solid | dotted), Vue — `variant`: в Vue `style` занят атрибутом.

Классы: `emcd-divider [emcd-divider--vertical] [emcd-divider--label] [emcd-divider--dotted]`.
