# Sidebar

Основная навигация Web на Large+: плавающая панель L1 на `bg/base` — Header → Nav → Promo → Footer.

**Ось (как в Figma «🟡 Sidebar»):** Collapsed Off (240) · On (72); слоты Header, Nav, Footer; Promo. Header — логотип + язык (Button Tertiary XS) + CTA (Button Primary S); Nav — Nav item, зазор 2; Promo — Promo card S; Footer — аккаунт (Avatar M, имя, «Профиль», шеврон).

**Правила:** все пункты — в одном значении Collapsed с корнем; Selected — ровно один; Collapsed — подписи в Tooltip, промо скрыто. Nav прокручивается внутри, Header и Footer на месте. Баланс и кнопки CHW — не наши.

**Доступность:** `nav` с `aria-label` «Основная навигация»; текущий пункт — `aria-current="page"`; кнопка «свернуть» — `aria-expanded`.

Классы: `emcd-sidebar [emcd-sidebar--collapsed]`, `__header`, `__brand`, `__toggle`, `__logo`, `__language`, `__cta`, `__nav`, `__divider`, `__promo`, `__footer`, `__account`, `__account-text`, `__account-name`, `__account-link`, `__account-chevron`.
