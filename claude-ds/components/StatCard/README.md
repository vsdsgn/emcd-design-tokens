# Stat card

Один показатель с подписью: хешрейт, баланс, начислено за 24 ч, активные воркеры. Основа дашборда.

**Оси (как в Figma «🟡 Stat card»):** State Default · Skeleton × Tone Neutral · Danger · Warning · Success × Align Start · Center; свойства Label, Value, Unit, Info, Delta, Delta caption, Show footer, Footer, Ambient light, Link (Icon button XS с шевроном `chevron-right` в правом нижнем углу: Danger — Secondary Danger, иначе Tertiary). Tone ≠ Neutral — плитки статусной сводки (`status-*-subtle`, значение `text-*`); Center — плитки статусов (поля 4 по бокам, 32 снизу). min-width нет.

**Когда какой:** Default — данные есть; Skeleton — грузятся дольше 1 с. Label — что и за какой период («Хешрейт · 24 ч»); Value — крупное число; Unit — отдельно, сразу за числом. Delta — есть сравнение с прошлым периодом: Badge S (Success — рост, Danger — падение, Neutral — без изменений) + подпись («к вчера»). Info — у метрики есть определение (тултип у «i»). Show footer — спарклайн, мини-график или ссылка. Ambient light — только у одной герой-карточки на экран (Expressive; в Base пятно прозрачное).

**Когда нет:** несколько чисел для сравнения — Table / List.

**Правила:** одно число на карточку; в ряду карточки одной высоты; min-width `size-card-min`. Подложка — на уровень выше текущей (`surface-next`), обводка `border-subtle`. Не делаем: несколько чисел, анимацию счётчика, больше одной карточки с Ambient light.

**Состояния:** неинтерактивна. Skeleton — три полосы на месте подписи, числа и дельты; высота как у Default — без прыжка при загрузке.

**Доступность:** дельта — словом и знаком в Badge, не только цветом; «i» — кнопка с `aria-label`, определение в Tooltip (Web) / Sheet (App).

Классы: `emcd-stat [emcd-stat--{danger|warning|success}] [emcd-stat--center] [emcd-stat--ambient] [emcd-stat--skeleton]`, ссылка `emcd-stat__link`; строки `emcd-stat__label-row` (`emcd-stat__label`, `emcd-stat__info`), `emcd-stat__value-row` (`emcd-stat__value`, `emcd-stat__unit`), `emcd-stat__delta-row` (Badge S, `emcd-stat__caption`), `emcd-stat__footer`; скелетон — `emcd-stat__bone`.
