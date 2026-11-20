# Search

🟡 Beta (20.11) — можно брать в макеты и код. Поле поиска: лупа, текст, крестик «Очистить» (когда введено). Поиск воркеров, монет, операций. Контракт — `docs/components/search.md`.

**Оси (как в Figma «Search»):** Size S 32 · M 40 × State Default · Hover · Focus · Filled · Disabled. Подложка `surface/level-2`, обводка `border-subtle` (Focus — `border-focus`), радиус `radius/control`, лупа 20 `icon-tertiary`, текст body-md (S — body-sm), подсказка `text-tertiary`.

**Правила:** поле — по модели Input (Hover — слой, Focus — обводка `border-focus`). Esc очищает поле; крестик — Icon button Ghost S. Без `value` — неуправляемое; `onChange(value, event)` (Vue — v-model).

**Доступность:** `role=search`, поле `type=search` с `aria-label` (по умолчанию — подсказка); кольцо фокуса — с клавиатуры.

Классы: `emcd-search [emcd-search--s] [emcd-search--disabled]`, `emcd-search__icon`, `emcd-search__input`, `emcd-search__clear`.
