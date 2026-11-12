# Аудит компонентов и очередь правок (2026-11-09)

Источник: read-only прогоны в Figma Components (`scripts/figma/audit.plugin.js`, `variables-check.plugin.js`, `audit-parity.plugin.js`, статический l10n-прогон), 86 страниц. Статусы: stable 0; beta 13 (11 атомов, Input, Textarea); атомов 33, молекул 40, организмов 13.

## Сделано 2026-11-09 (в Figma, ждёт Publish)
- Свойства компонента привязаны ко всем вариантам (замечание разработки): Button (Tertiary и Tertiary outline Danger, 32), Icon button (40 целиком и 160 частично), Tab bar item (Pressed), Segment (Pressed), Breadcrumb item, Radio card, Floating button, Accordion (Disabled), List item (Pressed), Table header cell (Hover), Code cell, Input amount, Checkbox и Radio group (Error), Code input. Видимость слоёв не менялась.
- Deprecated-токены больше не используются в компонентах: Scrollbar, Chart crosshair, Input addon / Counter, Avatar group → `action/secondary/default`; Segment (Selected, Disabled) → `surface/disabled`.
- Высота вариантов на `control/height/*`: Chip (16), Tab (27), Segment (27).
- Input на рамке: подложка под подписью в Disabled и Read-only непрозрачная (`control/surface/default` под полупрозрачной заливкой), рамка не просвечивает.
- Textarea по образцу Input: рамка Read-only, без рамки у Skeleton, цвет значения в Focus и Loading; у Input отступы поля сверху и снизу на переменной.
- Иконка парная подписи: Segment (Tone), Disabled → `icon/disabled`, Danger → `icon/danger` (Button, Menu item), secondary → `icon/secondary` (Tab, Tab bar item, Nav item).
- Foundations (ждёт Publish): токены радиуса кольца `radius/focus-ring-xs|inner|surface`; размеры `size/box`, `size/box-row`, `size/dot/sm|md`, `size/toggle-width|height/sm|md`, `size/badge-height/sm|md|lg`, `size/counter-height/sm|md`, `control/height/xs|2xl`, `size/tab-bar-item/width`, `size/tab-indicator/sm|lg`; примитивы `dimension/26`, `dimension/3`.

## Очередь
- Единое кольцо фокуса (решение Стефана 2026-11-09): рамка на 2 px больше родителя, обводка OUTSIDE, `border/width/focus-ring`, радиус `radius/focus-ring*` по родителю. Сейчас 22 набора «внутри на 4 px», 9 «снаружи на 2 px».
- Привязка размеров к новым токенам (Checkbox, Radio, Toggle, Tab indicator, Badge, Counter, Status Dot, Tab bar item, Segment S, Tab XL) после Publish Foundations.
- **Общая база полей (решение Стефана 2026-11-09):** Input, Textarea, Select, Multiselect, Password field, Date range field и подобные должны иметь одну базу (один компонент с вариантами или общий базовый). Сейчас расходятся: кольцо, радиус кольца, отступы поля, hit area, структура helper, notch.
- Правило цвета иконки (вынесено в `docs/preflight.md`).
- Left / Right → Start / End (Button, Checkbox, Radio, Toggle, Table header cell, Table cell / Text); Tooltip не меняем.
- Локализация (`l10n-static-report-2026-11-09.md`): текст без переноса и обрезки у ~25 компонентов; стресс-тест после ручного прохода.
- Кандидаты в разделение: Chart plot, Sheet (Default и Menu), Chart crosshair; Step symbol, скорее оставить.
- Открыто: «Show more» у Table cell / Buttons; Sheet Default без слоя safe area; борда Snack (v3).

## Сделано 2026-11-12 (в Figma Components, ждёт Publish; точку отката поставить вручную: Version history)
- **Единое кольцо фокуса** во всех компонентах: рамка на 2 px больше родителя, обводка OUTSIDE, толщина `border/width/focus-ring`, радиус токеном `radius/focus-ring*` по радиусу родителя (`control` → `radius/focus-ring`, `control-sm` → `-sm`, `lg` / `container` → `-lg`, `xs` → `-xs`, `sm` / `inner` → `-inner`, `surface` → `-surface`, `chip` → `radius/chip`, родитель без радиуса → `radius/2xs`). Внешний контур кольца у преобразованных не сдвинулся (проверено расчётом по всем кольцам, скриншот на Checkbox, Radio, Toggle, Chip, Segment, Textarea, Input). Input, Textarea, Select и др. теперь с радиусом на 2 больше, чем было у части (концентричность).
- **Исключения колец:** Table header cell и Table row (кольцо внутри строки без смещения, 28 колец); Checkbox: радиус кольца `radius/sm` (8/4/8 по значению, отдельного токена нет).
- **Размеры на токенах:** Checkbox / Radio (`size/box`, `size/box-row`, `size/dot/md`), Toggle (`size/toggle-*`), Badge (`size/badge-height/*`), Counter (`size/counter-height/*`), Status Dot (`size/dot/*`), Segment S (`control/height/xs`), Tab (XL `control/height/2xl`, индикатор `size/tab-indicator/*`), Tab bar item (`size/tab-bar-item/width`, `control/height/xl`). Ни один размер не изменился. Ширина индикатора Tab осталась числом (должна растягиваться по подписи).
- **Правило цвета иконки** применено к 28 наборам: `icon/<роль>` по подписи (label, title). Пропущены Suggest, Toast, Snack, Empty state, Notification. Применено шире, чем безопасно: затронуты и составные (Modal, Sheet, Side panel, Page header, Date range panel, Dropdown panel, Tooltip tour, Promo card), где иконка может быть не парной заголовку (крестик закрытия у Modal стал основным цветом). Проверить глазами; если иконка должна быть иной, записать в `docs/exceptions.md`.
- **Поля (решение Стефана 2026-11-12):** общая база полей, вариант 2 (базовый `Field` / `_Field base` плюс надстройки Input, Textarea, Select, Multiselect, Password field, Date range field). Совпадает с фазой B `docs/agent-brief-ds2.md`; пилот на Input + Textarea ещё не сделан. Конструкция надстроек: вложенный экземпляр базы с `isExposedInstance` и вариантами осей, как у Select (поле отдаёт свойства наружу). Оси надстройки дублируют оси базы.
