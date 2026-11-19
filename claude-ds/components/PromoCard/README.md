# Promo card

Промо-карточка: заголовок, необязательные описание, бейдж, действие и картинка справа. Сайдбар, экран, дашборд.

**Оси (как в Figma «🟡 Promo card»):** Size S (сайдбар) · M (мобильный, App) · L (дашборд Web) × Tone Neutral · Accent × Align Start · Center; Title, Description, Show description / action / media / close / badge.

**Когда какой:** Accent — главная акция экрана (градиентная обводка, действие Primary); Center — анонс без картинки и закрытия (бейдж над заголовком). Действие — Button S: в S — Text, в M / L — Primary / Secondary. Закрытая карточка в сессии не возвращается.

**Не делаем:** больше одной промо на экран, два действия, картинку со смыслом без текста. Системное сообщение — Suggest.

**Доступность:** `section` с `aria-label` (заголовок); картинка — пустой `alt`. Классы: `emcd-promo [emcd-promo--{m|l}] [emcd-promo--accent] [emcd-promo--center] [emcd-promo--media]`, `__media`, `__glow`, `__image`, `__column`, `__text`, `__title-row`, `__title`, `__badge`, `__desc`, `__action`, `__close`.
