// Сайдбар майнинга Web (26.11): legacy «sidebar / default» → DS Sidebar по шаблону «⚑ шаблон · Sidebar майнинга» (страница «⚑ Скрипты миграции» общего файла).
// Шаблон: Header — Brand logo · Wordmark + язык (CTA скрыт); Nav — Активы (wallet), Криптокарта (card), Майнинг (mining-coin), Торговля (trend-up), P2P (exchange, бейдж «0% Комиссия»),
//   Coinhold (coinhold-coins, «14% APY»), Стейкинг (percentage, «🔥 Новое», Accent), Indesk (chart-bar), OnLock (lock), Скоро (rocket, Counter 2) | разделитель | За реферала (users), FAQ (question);
//   Promo — «14% годовых / Ты получил бы, если бы открыл Coinhold год назад / Подробнее»; Footer — аккаунт. Баланс и быстрые действия CHW не переносим (правило: в DS их нет).
// Замена: клон шаблона на место legacy (x, y, ширина и высота legacy), Selected — раздел, выбранный в legacy (Navbar item selected=true), язык — вариант ru.
// Mining US: «Криптокарта» → «Платежная карта». Иконки разделов подобраны по смыслу — проверить с продуктом (таблица компонентов, «Как сделать»).
// Скрипт — тела вызовов use_figma 26.11 (см. журнал сессии); повторный запуск — по этому описанию.
