# Icon

Иконка DS по имени: `name` → inline SVG из `icons/svg/<name>.svg`. Реестр иконок для кода генерирует `node scripts/icons-code.mjs` (набор экранов майнинга: сортировка, шевроны, меню, выгрузка, пункты сайдбара и т. д.; добавить — в `LIST` скрипта).

**Размер:** `size` sm 16 · md 20 (по умолчанию) · lg 24 · xl 32 — токены `icon/size/*`. **Цвет:** currentColor — от текста родителя (`icon-*` задаёт обёртка).

**Когда какой:** действие и навигация — Icon внутри Button / Icon button / Nav item; монета — Coin, не иконка. Строка в слоте иконки компонентов (Nav item `icon`, Chart metric `icon`, Action bar `iconLeft`) — имя иконки DS.

**Доступность:** без `label` — декоративная (`aria-hidden`), смысл — в тексте рядом; с `label` — `role=img` + `aria-label` (иконка без подписи).

Классы: `emcd-icon [emcd-icon--{sm|lg|xl}]`. Набора в Figma нет (иконки — библиотека Icons), статус в Claude DS — draft.
