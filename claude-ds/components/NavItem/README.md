# Nav item

Пункт основной навигации в сайдбаре Web: иконка 20 + подпись 16 (label-lg Medium); в свёрнутом сайдбаре — только иконка.

**Оси (как в Figma «🟡 Nav item»):** Collapsed × Selected × State (Default · Hover · Pressed); Counter, Badge. Высота 36 (`size/row/compact`), поля 6, зазор иконка → подпись 12; Default — иконка `icon-tertiary`, подпись `text-primary`; Selected — плашка `action/secondary/default` + полоса `border/accent` 2 × 20 слева.

**Правила:** Selected — ровно один на сайдбар; Counter (Danger) — только то, что требует действия; Badge S — акция или условие («0% Комиссия», «14% APY», «Новое»), не вместе с Counter. Collapsed — подпись в Tooltip справа. 5–8 пунктов верхнего уровня.

**Доступность:** `a` / `button` внутри `nav`; текущий — `aria-current="page"`; Collapsed — `aria-label` = подпись. Tab — фокус, Enter — переход.

Классы: `emcd-nav-item [emcd-nav-item--collapsed]`, `emcd-nav-item__icon`, `emcd-nav-item__label`, `emcd-nav-item__badge`, `emcd-nav-item__counter`; выбранный — `[aria-current="page"]`.
