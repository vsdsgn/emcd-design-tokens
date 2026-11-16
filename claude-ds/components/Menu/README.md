# Menu

Меню (Dropdown): всплывающий список действий или вариантов. В слоте Items — Menu item, подписи групп и разделители; сверху — необязательный поиск.

**Оси (как в Figma «🟡 Menu» и «🟡 Menu item»):** Menu — Size M · L; свойства Items (слот), Search. Menu item — Size M 44 · L 56 × Tone Default · Danger × State Default · Hover · Pressed · Disabled; свойства базы `_List row`: Label, Description, Leading, Trailing, Selected, Show selection.

**Когда какой:** M — меню действий и выпадающие списки; L — выбор монеты, кошелька, сети и меню в Sheet на Compact (с описанием и крупной иконкой). Search — от 10 пунктов. Menu item Danger — разрушающее действие, последним после разделителя. Selected — галочка у выбранного (одиночный выбор, один пункт); Show selection — глиф Checkbox слева (множественный).

**Когда нет:** 2–4 варианта на виду — Segmented / Chip; навигация — Tabs / навигация; длинный список с категориями и поиском — Dropdown panel; строка списка на странице — List item.

**Правила:** ширина ≥ триггера, 160–320 (`size-menu-min` … `size-menu-max`); высота до `size-menu-max-height` (≈ 8 пунктов), дальше скролл. В одном меню один размер пунктов; одно действие на пункт. Leading — иконка 20 / 24, монета 32 (только L), аватар; Trailing — Badge, Counter, значение, шеврон подменю.

**Состояния:** поверхность — overlay surface Popover (`material-thick-fill`, в Base `surface-raised`; обводка `border-subtle`; тень Elevation/2). Пункт: Hover / Pressed — слой `state-layer` 6 % / 10 %; Disabled — погашенные иконка и подпись; Danger — `text-danger` / `icon-danger` везде, кроме Disabled.

**Доступность:** `role="menu"` + `menuitem` / `menuitemcheckbox` (`aria-checked`); у Select — `listbox` + `option` (`aria-selected`). ↓ / ↑ — фокус по пунктам; Escape закрывает у родителя-триггера.

Классы: `emcd-menu` → `emcd-menu__items` (`emcd-menu__group`, `emcd-menu__line`, `emcd-menu__empty`); пункт `emcd-menu-item [emcd-menu-item--l] [emcd-menu-item--danger]` → `emcd-menu-item__box`, `__leading`, `__content` (`__label`, `__desc`), `__trailing`, `__check`.
