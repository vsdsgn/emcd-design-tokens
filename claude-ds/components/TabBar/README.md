# Tab bar

Нижняя навигация Compact: 3–5 основных разделов, порядок как в Sidebar. App (iOS / Android) и мобильный веб — одна схема.

**Свойства (как в Figma «🟡 Tab bar»):** Items — Tab bar item (3–5, ровно один Selected; Action — одна, по центру), Safe area (по умолчанию On). Ширина экрана, линия сверху `edge-hairline`, поверхность `material-thin` (Expressive — стекло, Base — непрозрачная), поля пунктов 8.

**Когда какой:** Safe area On — нижнее поле `os-safe-area-bottom` (iPhone с жестами 34; в вебе — `env(safe-area-inset-bottom)`); Off — только если safe area отдал родитель. Action — центральная мультикнопка App («E»): `{ type: 'action', label, icon }` в середине `items`, не выбирается (`onAction`).

**Когда нет:** Web Expanded+ — Sidebar; подразделы экрана — Tabs; больше 5 разделов — часть в «Профиль» / «Ещё».

**Правила:** закреплён у низа, контент скроллится под ним; Toast — над таббаром; Action bar на экранах с Tab bar не ставим. Смена раздела — без анимации таббара.

**Доступность:** `nav` с `aria-label` «Основная навигация»; текущий пункт — `aria-current="page"`. Reduced transparency — сплошная подложка `surface-raised`.

Классы: `emcd-tab-bar [emcd-tab-bar--no-safe-area]`, `emcd-tab-bar__items`; пункты — Tab bar item.
