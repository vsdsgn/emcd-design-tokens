# Date range field

Поле периода: подпись на рамке, «ДД.ММ.ГГ → ДД.ММ.ГГ», справа иконка календаря. Выгрузки, фильтры по периоду, отчёты.

**Ось (как в Figma «🟡 Date range field»):** State Default · Focus · Filled · Error · Disabled · Hover · Skeleton — всё из Input M (Label position On border, min-width 160).

**Правила:** ограничение периода — в `hint` до выбора, ошибка — в `error` после; стрелка между датами направленная. Панель (Calendar Mode=Range + пресеты) — у продукта: `onOpen` по нажатию, Enter, Space, ↓ (Calendar в код ещё не перенесён).

**Доступность:** `role=group` с подписью; поле только для чтения с `aria-haspopup="dialog"`; подсказка и ошибка — `aria-describedby`.

Классы: `emcd-date-range` + база поля `emcd-field` / `emcd-input`.
