# Sheet

🟡 Beta. Шторка Compact (App и мобильный веб): грабер, шапка, тело, футер с кнопками L на всю ширину. Для деталей объекта, фильтров, коротких форм и потоков вроде «Выгрузить историю» — вместо Modal.

**Свойства (как в Figma «Sheet»):** `title`, `showGrabber` (по умолчанию да), `showClose`, `headerActions` (слот, до двух Icon button), тело — `children` (слот Body), `footer` (слот Footer), `fullHeight` — во всю высоту (поток формы), `scrim`, `onClose`.

**Правила:** высота по контенту до 90 % экрана, дальше прокрутка; `fullHeight` — когда в шторке форма с кнопкой внизу. Снизу — safe area. Закрытие: крестик, тап по фону, Esc / «Назад», свайп вниз (продукт).

**Доступность:** `role="dialog"`, `aria-modal`, заголовок — `h2`, на него ссылается `aria-labelledby`; фокус заперт внутри (продукт).

Классы: `emcd-sheet-scrim` → `emcd-sheet [emcd-sheet--full]` → `emcd-sheet__grabber`, `emcd-sheet__header` (`__title`, `__actions`, `__close`), `emcd-sheet__body`, `emcd-sheet__footer`.
