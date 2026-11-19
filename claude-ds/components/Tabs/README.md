# Tabs

Бар вкладок: переключение разделов одного экрана (История: Начисления / Выплаты / Воркеры). Внутри — Tab; выбранный подчёркнут.

**Оси (как в Figma «🟡 Tabs» и «🟡 Tab»):** Tabs — Size S · M · L · Page (было XL), Tab 3 – Tab 6 (2–6 вкладок). Tab — Size × Selected Off · On × State Default · Hover · Pressed · Disabled · Skeleton; свойства Label, Counter, Icon, Status dot (точка статуса перед подписью, `.emcd-dot`).

**Когда какой:** S 32 — мини-табы в виджете или карточке; M 48 (зазор 20) — App и мобильный веб; L 56 (зазор 24) — Web, разделы внутри страницы; Page 64 (display, heading-md, Medium) — табы-заголовок страницы. В одном баре один размер. Counter — Neutral; Accent / Danger — только если раздел требует действия. Icon — редко и только у всех вкладок сразу.

**Когда нет:** выбор значения или режима в форме — Segmented; фильтр списка — Chip; основная навигация и переход на другой экран — Nav item / Tab bar.

**Правила:** 2–6 вкладок, выбрана ровно одна (в макете — первая). Бар на ширину секции, снизу разделитель `border-subtle`; не помещается — горизонтальный скролл, вкладки не переносятся. Подпись — одна строка, многоточие после 240 px. Не делаем: перенос на вторую строку, табы как фильтр.

**Состояния:** выбранный — подпись `text-primary` и индикатор `border-accent` (2 px у S / M, 3 px у L / Page); Hover — слой `state-layer` 6 % и подпись `text-primary`; Pressed — слой 10 %, индикатор `border-strong`; Disabled — `text-disabled`, у выбранного индикатор `control-border-disabled`; Skeleton — плашка `skeleton-base` на месте подписи.

**Доступность:** `role="tablist"` с `aria-label`, вкладки `role="tab"` + `aria-selected`, панель — `role="tabpanel"` (класс `emcd-tabpanel`). ← / → переводят фокус и выбор (в RTL — зеркально), Home / End — к краям; Tab уходит в панель. Выбранная вкладка при открытии прокручивается в зону видимости. Кольцо фокуса — только с клавиатуры.

**Код:** React `<Tabs items=[…] />` или `<Tabs><Tab value … /></Tabs>`; без `value` — неуправляемый (первая выбрана), `onChange(value)`. Vue — `<DsTabs v-model … />`, `<DsTab>`. Вместо булевых Tab 3 – Tab 6 из Figma — массив `items`.

Классы: `emcd-tabs [emcd-tabs--{s|l|page}]`; вкладка `emcd-tab [emcd-tab--{s|l|page}] [emcd-tab--skeleton]` (`aria-selected`, `disabled`), внутри `emcd-tab__label`, Counter, `emcd-tab__ring`; панель `emcd-tabpanel`.
