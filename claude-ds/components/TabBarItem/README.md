# Tab bar item

Пункт нижней навигации Compact: иконка 24 + подпись. App и мобильный веб — одна схема. Живёт в Tab bar.

**Оси (как в Figma «🟡 Tab bar item»):** Type Item · Action × Selected Off · On × State Default · Pressed. Свойства: Label, Icon, Badge dot. Пункт 72 × 56, зазор иконки и подписи 2; подпись `type-overline` (10) Medium.

**Когда какой:** Item — раздел. Selected — текущий раздел: `icon-accent` + `text-accent`; остальные — `text-secondary`. Badge dot — в разделе есть то, что требует действия (точка `status-danger-solid`, без числа). Action (19.11) — центральная мультикнопка App («E» → шит быстрых действий): плашка 56 × 40 `action-secondary-default`, обводка 1 `border-accent`, `radius-control`, иконка или логотип без подписи; одна на Tab bar, по центру, никогда не Selected. В стиле Expressive (22.11, как в production App) — плашка `surface-level-2`, обводка — градиент `border-accent` из углов (снизу слева, сверху справа).

**Когда нет:** подразделы экрана — Tabs; Web Expanded+ — Sidebar.

**Правила:** подпись — одно слово, одна строка, многоточие по ширине 72. Не делаем: Disabled (недоступный раздел скрывается), подпись в два слова, число в бейдже.

**Состояния:** Pressed — слой `state-layer` 10 %; Hover нет (касание).

**Доступность:** ссылка или кнопка с `aria-current="page"` у текущего; Badge dot — в доступном имени («Кошелёк, есть уведомления» — `badgeLabel`); у Action `label` обязателен — уходит в `aria-label`.

Классы: `emcd-tab-bar-item [emcd-tab-bar-item--selected] [emcd-tab-bar-item--action]`; внутри `emcd-tab-bar-item__icon` (+ `__dot`), `__label`, у Action — `__plate`.
