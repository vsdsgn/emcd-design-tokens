# Page header

🟡 Beta (19.11). Шапка страницы: заголовок раздела / объекта, подзаголовок-сводка, действия страницы, табы разделов. Контракт — `docs/components/page-header.md`.

**Оси (как в Figma «Page header»):** Size Large · Compact; свойства Title, Subtitle, Show subtitle, Breadcrumbs, Show actions, Show tabs, слоты Actions, Tabs.

**Когда какой:** Large — Web (Large+): Heading/XL, действия справа от текста (до двух: Secondary M + Primary M). Compact — под Top bar на корневых экранах App / мобильного веба: Heading/LG, действия — в Top bar; если действие нужно на экране — ряд под заголовком (кнопки переносятся).

**Когда нет:** вложенный экран на Compact — Top bar; описание раздела — текст в контенте, не подзаголовок; заголовок секции в карточке — Section header; фильтры и сортировка (Select, Segmented) — меню экрана, не Actions.

**Правила:** Breadcrumbs — только на вложенных страницах Web (2+ уровня); Subtitle — сводка одной строкой; не больше двух действий; Tabs — того же размера, что шапка (Large — L, Compact — M), всегда последним, контент сразу под ними. Отступы: Large — сверху `space-8`, зазоры `space-16`, до табов `space-24`; Compact — поля `space-4` / `control-padding-x-lg` / `space-8`, зазоры `space-12`, до табов `space-16`. Текст не уже `size-page-header-text-min` (200): уже — действия Large переносятся под текст.

**Доступность:** Title — `h1` (`level`, по умолчанию 1); Breadcrumbs — `nav` с `aria-label` «Хлебные крошки», текущая страница — `aria-current="page"` (у крошек). Фокус, Hover / Pressed — у вложенных Button, Tabs, ссылок.

**Код:** React `PageHeader` — `size`, `level`, `title`, `subtitle` + `showSubtitle`, `breadcrumbs` (слот; нет слота — Breadcrumbs = Off), `actions` + `showActions`, `tabs` + `showTabs` (show* по умолчанию — есть ли содержимое). Vue `DsPageHeader` — те же props, слоты `title`, `subtitle`, `breadcrumbs`, `actions`, `tabs`.

Классы: `emcd-page-header [emcd-page-header--compact]` → `emcd-page-header__breadcrumbs`, `emcd-page-header__row` (`emcd-page-header__text` → `emcd-page-header__title`, `emcd-page-header__subtitle`; `emcd-page-header__actions`), `emcd-page-header__tabs`.
