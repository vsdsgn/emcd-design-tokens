# Section header

🟠 Draft (19.11) — в макеты не брать до перевода в beta. Заголовок секции внутри карточки или формы: Title, необязательная Caption, слот Trailing.

**Оси (как в Figma «Section header»):** Size M · S; свойства Title, Caption, Show caption, Trailing, Show trailing.

**Когда какой:** M — label/lg 16 Medium: секция карточки («Переводить на Coinhold», «Типы уведомлений»); S — label/md 14 Medium: подсекция («Сколько переводить?», «Прогноз доходности»). Caption — одна строка body/sm `text-secondary`. Trailing — один контрол секции: Toggle, Button Text, Badge, Select compact.

**Когда нет:** заголовок страницы — Page header; шапка виджета — Card / Chart card; подпись поля — Label поля.

**Правила:** между текстом и Trailing — `space-16`, Trailing по центру по высоте; внутри Trailing — `space-12`. Своих отступов сверху / снизу нет — ставит родитель (зазор карточки).

**Доступность:** Title — настоящий заголовок `h2`–`h4` (`level`, по умолчанию `h3`) — секции видны в навигации читалки по заголовкам; Toggle в Trailing подписан своим текстом.

Классы: `emcd-section-header [emcd-section-header--s]` → `emcd-section-header__text` (`emcd-section-header__title`, `emcd-section-header__caption`), `emcd-section-header__trailing`.
