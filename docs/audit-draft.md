# Аудит draft-наборов (2026-11-13)

Собрано `scripts/draft-audit.mjs` из `docs/ds-manifest.json` — править там, не здесь. Наборы в Figma не менялись.
Это проверка по манифесту, а не «Готово»: плагины `audit` и `variables-check`, стенд и контракт по каждому набору — при переводе в beta.

## Сводка

- Наборов не в beta: 94 (draft 94, без статуса 0: —).
- Без замечаний по манифесту: 94 (Card, Circle timer, Date cell, Divider, Multiselect option, Overlay, Page dot, Pagination item, Skeleton, _Tooltip arrow, Tooltip, Accordion, Address, Avatar group, Breadcrumbs, Chart axis label, Chart crosshair, Chart metric, Chart tooltip, Checkbox group, Code cell, Code input, Coin, Coin stack, Date range field, Floating button, Input addon / Clear, Input addon / Icon, Input amount, Legend item, Legend swatch, List item, Menu item, Multiselect, Nav item, Notification, Page indicator, Pagination, Password field, Key-value row, Progress, Progress circle, Spinner, Promo card, Radio card, Radio group, Scrollbar, Segmented, Select, Select compact, Snack, Stat card, Step progress, Step segment, Step symbol, Step trail, Step, Suggest, Table header cell, Table cell / Text, Table cell / Date time, Table cell / Coin, Table cell / Transaction, Table cell / Image, Table cell / Progress, Table cell / Avatar, Table cell / Badge, Table cell / Toggle, Table cell / Star, Table cell / Icon, Table cell / Buttons, Table cell / More, Table row, Table cell / Status, Tabs, Toast, Toggle group, Tooltip tour, Transaction, Calendar, Chart card, Chart plot, Date range panel, Dropdown panel, Empty state, Status screen, File upload, Page header, Menu, Modal, Sidebar, Sheet, Side panel, Tab bar).
- Наборов с замечанием: .

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось (кроме осей выбора Status / Selected и списка BOOL_OK) или Left / Right; PROPS — свойство не привязано ни в одном варианте; MINMAX — min / max числом; RAW — значения без переменной (без размеров образца на корне и зоны нажатия; строки реестра docs/exceptions.md — в списке RAW_OK); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (разделы, которых у набора нет по смыслу, перечисляет блок «Не собрано в этой версии» на самой борде).

## Атомы (11)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| _Tooltip arrow | Tooltip | 2 | — |
| Card | Card | 72 | — |
| Circle timer | Circle timer | 8 | — |
| Date cell | Date cell | 10 | — |
| Divider | Divider | 6 | — |
| Multiselect option | Multiselect | 4 | — |
| Overlay | Overlay | 2 | — |
| Page dot | Page dot | 2 | — |
| Pagination item | Pagination item | 10 | — |
| Skeleton | Skeleton | 7 | — |
| Tooltip | Tooltip | 24 | — |

## Молекулы (68)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| Accordion | Accordion | 20 | — |
| Address | Address | 4 | — |
| Avatar group | Avatar group | 6 | — |
| Breadcrumbs | Breadcrumbs | 3 | — |
| Chart axis label | Chart axis label | 8 | — |
| Chart crosshair | Chart crosshair | 2 | — |
| Chart metric | Chart metric | 4 | — |
| Chart tooltip | Chart tooltip | 4 | — |
| Checkbox group | Checkbox group | 12 | — |
| Code cell | Code cell | 12 | — |
| Code input | Code input | 8 | — |
| Coin | Coin | 10 | — |
| Coin stack | Coin stack | 9 | — |
| Date range field | Date range field | 5 | — |
| Floating button | Floating button | 8 | — |
| Input addon / Clear | Input | 1 | — |
| Input addon / Icon | Input | 1 | — |
| Input amount | Input amount | 10 | — |
| Key-value row | Payout summary | 3 | — |
| Legend item | Legend item | 4 | — |
| Legend swatch | Legend swatch | 16 | — |
| List item | List item | 64 | — |
| Menu item | Menu item | 16 | — |
| Multiselect | Multiselect (контейнер) | 8 | — |
| Nav item | Nav item | 8 | — |
| Notification | Notification | 2 | — |
| Page indicator | Page indicator | 14 | — |
| Pagination | Pagination | 4 | — |
| Password field | Password field | 4 | — |
| Progress | Progress | 8 | — |
| Progress circle | Progress | 3 | — |
| Promo card | Promo card | 4 | — |
| Radio card | Radio card | 8 | — |
| Radio group | Radio group | 12 | — |
| Scrollbar | Scrollbar | 6 | — |
| Segmented | Segmented | 12 | — |
| Select | Select | 24 | — |
| Select compact | Select | 5 | — |
| Snack | Snack | 5 | — |
| Spinner | Progress | 3 | — |
| Stat card | Stat card | 2 | — |
| Step | Stepper | 3 | — |
| Step progress | Step progress | 25 | — |
| Step segment | Step segment | 3 | — |
| Step symbol | Step symbol | 12 | — |
| Step trail | Step trail | 6 | — |
| Suggest | Suggest | 12 | — |
| Table cell / Avatar | Table | 3 | — |
| Table cell / Badge | Table | 3 | — |
| Table cell / Buttons | Table | 3 | — |
| Table cell / Coin | Table | 6 | — |
| Table cell / Date time | Table | 6 | — |
| Table cell / Icon | Table | 6 | — |
| Table cell / Image | Table | 3 | — |
| Table cell / More | Table | 3 | — |
| Table cell / Progress | Table | 3 | — |
| Table cell / Star | Table | 6 | — |
| Table cell / Status | Table | 3 | — |
| Table cell / Text | Table | 6 | — |
| Table cell / Toggle | Table | 3 | — |
| Table cell / Transaction | Table | 12 | — |
| Table header cell | Table | 20 | — |
| Table row | Table | 8 | — |
| Tabs | Tabs | 4 | — |
| Toast | Toast | 10 | — |
| Toggle group | Toggle group | 4 | — |
| Tooltip tour | Tooltip tour | 4 | — |
| Transaction | Transaction | 12 | — |

## Организмы (15)

| Набор | Страница | Вариантов | Замечания |
|---|---|---|---|
| Calendar | Calendar | 2 | — |
| Chart card | Chart | 4 | — |
| Chart plot | Chart | 23 | — |
| Date range panel | Date range panel | 2 | — |
| Dropdown panel | Dropdown panel | 2 | — |
| Empty state | Empty state | 5 | — |
| File upload | File upload | 5 | — |
| Menu | Menu | 2 | — |
| Modal | Modal | 12 | — |
| Page header | Header | 2 | — |
| Sheet | Sheet | 2 | — |
| Side panel | Side panel | 2 | — |
| Sidebar | Navigation | 2 | — |
| Status screen | Empty state | 3 | — |
| Tab bar | Tab bar | 1 | — |
