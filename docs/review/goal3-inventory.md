# Цель 3 · H1 — инвентарь экранов: Мониторинг, WL B2B admin, WL B2C (21.11)

Read-only разбор production-макетов (Figma, ничего не менялось). Названия конструкций — как в `docs/patterns.md` §0.2 / §3; новые — по аналогии, помечены **новое**. Числа — замер use_figma (padding / itemSpacing / координаты), px при 1440 или 375.

Сокращения: **Мон** — Мониторинг; **B2B** — WL B2B admin; **B2C** — WL B2C клиент (375); **Майн** — майнинг Web / App (из `patterns.md`); **FW** — веб-интерфейс прошивки (справочник состояний).

---

## §1 Экраны

### Мониторинг (Web 1440, тёмная тема; мобильный веб 375)

| Экран | Платф. | Node | Конструкции сверху вниз |
|---|---|---|---|
| Главная | Web | 18311:254861 | Sidebar (плавающий) · Page header «Данные организации» + период Chip ×3 справа · ряд 2: **Fleet summary** (3 числа + сегментная полоса статусов + легенда-факты) · **Capacity bar** (3 числа + полоса Progress + легенда) · ряд 2: Chart card «Средний хешрейт» (Select единицы) · Chart card «Температура» · Section header «Площадки» + Link · Card: Select «Площадка» (On border) + Chip-период → Table (7 кол., ⋯ в строке) · Section header «Устройства» + Link · Card: Tabs со Counter (Активные / Ожидание) → Table (статус-полоска, sort-иконки) · **Table summary bar** (итог + факты по статусам) |
| Главная | Compact | 21911:100436 | Top bar Mobile web (лого · аккаунт · бургер) · Tabs разделов (прокрутка) · заголовок + Select периода · Fleet summary · Capacity bar · Chart card ×2 · Section header + Link · Select площадки + Select периода · **Accordion card** ×N (строка таблицы → карточка с раскрытием: Key-value 2 колонки) · Section header · Tabs Counter · ряд Chip-фильтров (Статус ▾ / Хешрейт ▾ / Мощность ▾, прокрутка) · Accordion card ×N · Table summary bar |
| Площадки | Web | 21005:35130 | Page header + Button Primary «Добавить площадку» · ряд 3: **Gauge card** (полукруг статусов + легенда 2×2) · Capacity bar · **Stat tile grid** 2×2 (L2 плитки в L1) · Card: Select + Chip-период → Table |
| Площадка — редактирование | Web | 20791:94389 | Modal 500: заголовок + ✕ · Input ×2 · Select · Multiselect (Badge-счётчик) · Input · Button «Сохранить» (disabled до изменений) · Button Danger-ghost «Удалить» |
| Тепловая карта | Web | 30913:335363 | Page header · Tabs площадок со Counter · Stat strip (5 чисел в одной Card) · Card: Segmented «Контейнеры / Без места» + Select ×2 + Button Primary → **Container map card** ×N (сетка мест цветом статуса + факты) · Table summary bar (легенда-счётчики) · Toast «Контейнеры сохранены» (справа сверху) |
| Настройки контейнера | Web | 30998:53394 | Modal 1230 двухпанельный: слева Accordion ×3 (Основное / Расположение / IP) + Danger + «Сохранить»; справа схема мест + Suggest-строка «Проверка адресов» + Button + Key-value «Выбранное место» + легенда |
| Сканер (пусто) | Web | 30041:184690 | Page header · Card «Как начать сканирование?» + Button Secondary «Как это работает?» → **Steps «Как начать»** ×3 (активный шаг L2, остальные disabled) |
| Отчёты | Web | 31494:98071 | Page header + Button Secondary «Налоговые реквизиты» · Tabs Counter (Налоговая / Энергопотребление) · Card: Segmented «Устройства / Площадки / Владельцы» + Select + Date range field + Icon button Primary (экспорт) → Table с **итоговой строкой первой** (крупные числа) |
| Отчёт майнера | Web | 31600:104643 | Modal 1128: заголовок + мета-строка (Статус, Период, ИНН…) · Tabs (Оборудование / Добыча) · Table (⋯ в строке, Address с копированием) · подвал: Suggest-текст (Warning) + 2 кнопки · поверх — Modal 2-го уровня «Изменить запись» (Input ×5 + подсказка под полем) |
| Сотрудники | Web | 20407:156946 | Page header + Button Primary · Tabs Counter (роли) · Card: Search на всю ширину → Table (действия строки — Icon button «изменить» / «удалить» Danger) |
| Удаление сотрудника | Web | 20415:164626 | Modal 500 confirmation: заголовок · текст с именем · одна Button Danger-ghost (нет «Отмена») |
| Сотрудники | Compact | 22435:64455 | Top bar · Tabs разделов · Page header Compact + Button Primary M · Tabs Counter · Search · Accordion card ×N (имя + роль · ⋯ · ⌄) |
| Уведомления | Web | 19937:73802 | Page header + Button Primary «Настройки» · Card: Select ×3 + Date range field → Table с Checkbox-колонкой, sort, «N ч назад», ⋯ + ⌄ раскрытие строки |
| Настройка уведомлений | Web | 19984:169168 | Modal 802: матрица «тип × канал» — строка: название + Select порога + Checkbox Email + Checkbox Telegram (+ «Подключить» Link) · подвал Sticky: Reset + Save (disabled) |
| Детали устройства | Web | 27626:380093 / 27580:276844 | Modal 1156: заголовок + Status Badge + ⋯ + ✕ · мета-строка (Площадка · Серийный · Владелец ▾) · Tabs (Метрики / Пулы / События) · Segmented вида метрик · Card «Ключевые метрики» + Chip-период → 2 Card L2 Key-value (dotted leader) / Table пулов (Skeleton-строки) + Button Ghost «+ Добавить резервный пул» · Toast |
| Настройка пула | Web | 27580:280779 | Modal 620 мастер (← назад, шаги 1–3 с номерами, Select / Input, подвал: пояснение + Button «Продолжить») · поверх Confirmation «Выйти без сохранения?» (Primary «Остаться» + Danger-ghost «Выйти») |
| Детали устройства | Compact | 22529:156394 | Sheet на всю высоту: мета (Status · площадка · воркер · серийный) · Владелец ▾ · Tabs · Chip-ряд вида метрик (прокрутка) · Chart card (Select периода, 3 Chart metric, легенда с Checkbox — выбор серий) |
| Устройства (Активные) | Web | 26284:207711 | Page header + Button Secondary «Владельцы» + Primary «Добавить» · Tabs Counter + Button Secondary «Выгрузить энергоотчёт» · Card: Checkbox-Chip «Без владельца» + Select ×2 + Chip-период + Icon button «Фильтр» → Table (Checkbox, sort-иконки, Status-полоска, Select владельца в ячейке, ⋯) · Table summary bar · **Bulk action panel** (плавающая справа снизу: «Выбрано 3 из 12» + 4–6 Button столбиком + «Закрыть») |
| Устройства (Ожидание) | Web | 30048:152496 / 30047:150407 | то же; фильтры Select ×2 + Date range + «Сбросить фильтры»; действия строки — Icon button Primary «активировать» / Danger «удалить»; Bulk action panel (Активировать / Удалить / Закрыть) |
| Фильтр устройств | Web | 18244:127000 | Modal 420: Segmented (Работает / Не в сети) · Select ×5 · Apply (disabled) · Reset |
| Устройства | Compact | 22418:143175 | Top bar · Tabs · Page header + действие · Tabs Counter · Chip-фильтры · Accordion card ×N · Sheet фильтров / действий |

### WL B2B admin (Web 1440×840, светлая тема)

| Экран | Node | Конструкции сверху вниз |
|---|---|---|
| Users (поиск открыт) | 7479:47040 | **Admin top bar** 76 (WL Name · Search 290 · язык · Avatar · выход) · **Admin shell** (серый контейнер r24: колонка Nav item 217 + белая панель контента r16) · тулбар панели: заголовок + Button Secondary «Export to CSV» + Icon button ×2 + Select «All coins» (Coin stack) · Table (Checkbox, Avatar + ID + copy, имя + почта, Coin stack «+N», TH/s, Badge статуса + Badge «VIP») · Button Secondary «Load more» по центру · **Search results dropdown** (Menu 350: строки ID + имя + почта, совпадение жирным) |
| Analytics | 7479:120586 | тулбар страницы: Select монеты + Segmented 1/7/30 days + Export · Section header «Revenue» · 2 Chart card (большое число + Tabs S серии FEE/SOURCE + bar chart + легенда + «30 days sum» справа; Link «Details») · Section header «Mining» · Stat row (3 числа) + Progress-сегменты «Workers» + легенда · Chart card «Coins» (Coin stack в заголовке) |
| Coins + Filters | 7479:124212 | Page header «Coins» + Export + Icon button «Фильтр» + Select · Table (Amount + фиат, sparkline в строке) · Load more · Modal «Filters» (Date range + Clear · Input amount с Select монеты · 2 Input % + Range slider · Save / Reset) |
| User profile · Mining | 8616:28076 | Segmented L разделов (General / Mining / Actions / Sessions / Fee) + Address (UUID, copy) + Export · Chart card (Select монеты, Chip-период, двухосевой график + tooltip) · ряд Stat card (счётчики воркеров по статусам, Avg reject, Avg hashrate) · Card Table «Hashrate» (по монетам + sparkline) · Card «Forecast» (Amount + дельта %, мини-график) · Card: Segmented (Income / Payouts / Workers) + Select монеты → Table → Load more · «← back to Users» внизу навигации |
| Profile · Sessions + confirm | 8242:16327 | Table «Last sessions» (Link «Terminate» в строке) · Confirmation Modal 480 с 3D-иллюстрацией, заголовок-вопрос, Yes (Primary) / No (Secondary) |
| Settings | 7479:28145 | Page header «Settings» · 2 колонки: Card «2FA» (Settings row + Toggle) · Card «Fee» (Address + Export + фильтр → Table, Link «Edit» в строке) |
| 2FA ввод кода | 7479:28681 | Modal 480: ← · ✕ · заголовок по центру · Code input ×6 · Link «Вставить код» · Button «Далее» (disabled) |
| Fee — редактирование | 8232:22698 | Modal 400: ← · ✕ · заголовок + подзаголовок по центру · Segmented (Пул / Реферальная) · Select монеты (On border, Coin) · Input % + hint с Warning-частью · Checkbox с описанием · **Selection summary** (Avatar group + «32 823 пользователей выбрано») · Button Primary |
| Watcher-link | 7685:8464 | Page header + Counter + Icon button «Фильтр» + Button Primary с иконкой · Table (имя, дата, админ, пользователь, **TTL: дата + Progress**, ID + copy, Danger-иконка) · Toast «Watcher link copied» |
| Watcher-link создан | 7690:10863 | Status-модалка: 3D-иконка успеха, заголовок, текст, Button Primary «Copy watcher link» |
| Auth | 7479:25774 | Admin top bar без поиска · серый контейнер → заголовок по центру · Card 250: Input ×2 · Button (disabled) · текст + Link «contact support» |

### WL B2C (375, светлая тема, бренд WL Default / Geometria)

| Экран | Node | Конструкции сверху вниз |
|---|---|---|
| Statistics | 1545:10171 | Suggest Strip (Info, заголовок + описание) · **Payout summary** (вложенная L2-плашка «Сумма к выплате» + Key-value «Уже добыто» / «Время начислений») · Chart card (крупное число по центру, 2 ячейки через Divider, график 2 оси, период — 3 кнопки равной ширины снизу) · Сводка воркеров (List item ×3 + Counter по тону + Button Secondary «Все воркеры ›») · Tab bar 5 |
| Workers | 1871:58053 | Button Secondary «Подключить воркер» + Icon button «+» · Tabs Counter + Status dot (Все / Активные / Нестабильные…) · Search · Table 4 кол. (итоговая строка первой, воркер + группа) · Floating button «Сортировка» + Segmented-иконки (Список / Группы) · Tab bar |
| Worker details | 1871:59087 | Top bar Inner (← + заголовок) · Status-строка (Status + «Группа 1 ›») · Chart card (как на Statistics) |
| Новая группа | 1871:70801 | Sheet: заголовок + описание + ✕ · Input с иконкой · Button XL (disabled) над клавиатурой |
| Payouts | 2201:55345 | Tabs (Выплаты / Начисления) на всю ширину · Card: Suggest Strip Warning «Выплаты ежедневно…» + Amount L + строка монеты · **Transaction row** ×N (хеш + copy, дата, сумма + PH/s, ⌄ раскрытие) · Floating button «Фильтры» · Tab bar |
| Фильтры | 2201:58385 | Sheet: заголовок + ✕ · Date range field · Button XL «Применить» внизу |
| Watcher link | 2203:11543 | Card: заголовок + описание · Address (copy) · Button XL Danger «Удалить» |
| Profile | 2203:36716 | **Profile summary** (Avatar + логин · Status «Не верифицирован» · «Безопасность ›» Badge · «Последний вход ›» · Address) · Section header «Настройки» · Card List item ×5 с иконкой и › · версия · Button Secondary «Выйти» |
| Выплаты (настройки) | 1605:16563 | Top bar Inner · Suggest Strip Info · Input адреса (On border) · Input amount с единицей + Button «Min» · пояснение + Warning-часть · Button XL «Сохранить» (disabled) |
| Добавить оборудование | 2203:35745 | Sheet: заголовок + ✕ · Input ×2 · Select ×2 · Input с очисткой · Button XL |
| Регистрация (ошибки) | 1566:6510 | лого · заголовок + Link «Войти» · Input ×3 (ошибка: рамка + текст под полем) · **Password rules** (чек-лист ✓ / ✕) · Button XL · «Или» · Button Secondary «Госуслуги» · текст + Link |
| Аккаунт создан | 1566:6583 | Status screen: 3D-иллюстрация · заголовок · текст (автопереход) |

### Справочник состояний — прошивка (Web 1440, тёмная)

| Экран | Node | Что берём |
|---|---|---|
| Dashboard | 37:36848 | Page header «Antminer S19» + «Updated» справа · Stat strip (3 ячейки через Divider) · Chart card (4 Chart metric + легенда) + колонка Fan tiles ×4 · Section header + Table ×2 |
| Loading | 37:46675 | Каркас живой; числа «—», таблицы — плашка «Loading»; Sidebar-статус «Offline» |
| Offline | 37:47933 | Suggest Danger сверху: заголовок + текст + Button «Retry»; данные «—» |
| Low hashrate | 37:48233 | Suggest Warning (рамка) над сводкой |
| Unsaved changes | 42:56298 | «Unsaved changes» текстом + Button Primary «Save changes» в шапке секции |
| Invalid | 42:56955 | Input ошибка (рамка Danger + текст под полем), «Save changes» disabled |
| Drawer | 55:68241 | Side panel ≈540 справа: заголовок + ✕ · Select / Input с copy · пояснение · подвал Cancel + «Save & Apply» |
| Confirmation | 57:70196 | Modal 400: заголовок + текст по центру · Primary + Secondary «Cancel» столбиком |
| Chart tooltip | 37:37245 | Tooltip: серии (swatch + имя + значение) + время, вертикальная линия-курсор |
| Empty log | 58:74661 | Tabs раздела · Card с одной строкой «The log is empty» (Empty state S без кнопки) |

---

## §2 Матрица «конструкция × продукт»

Колонки: Майн (из patterns) · Мон · B2B · B2C. «DS» — набор в `ds-manifest.json`.

| Конструкция | Майн | Мон | B2B | B2C | DS | Отличия → «один способ» |
|---|---|---|---|---|---|---|
| **Навигация Web** | Sidebar плавающий 240+12 | Sidebar плавающий 252+12 (+«Расширить подписку», профиль внизу) | Admin top bar 76 + меню внутри серого контейнера (217) | — | Sidebar | B2B — единственный с глобальным Top bar на Web. Один способ: Sidebar; поиск B2B — в Page header / тулбар; язык и профиль — в подвал Sidebar |
| **Навигация Compact** | Tab bar 5 (App) / бургер (моб. веб) | Top bar Mobile web + Tabs разделов (8 пунктов, прокрутка) | — | Tab bar 5 | Top bar, Tab bar, Tabs | Мон = мобильный веб pool (бургер + Tabs) — совпадает с правилом §1.2 |
| **Page header** | Tabs раздела, 80 | Заголовок H 32 + 1–2 Button справа (Primary + Secondary); Tabs Counter — отдельной строкой ниже | Заголовок в карточке-панели (или нет, если тулбар) | нет на корневых; Top bar Inner на вложенных | Page header | Мон и B2B — заголовок + действия; Майн — Tabs вместо заголовка. Один способ: Page header (Title + Actions + Tabs-слот) — уже так |
| **Тулбар страницы** (глобальный контекст) | Select монеты | Chip-период в шапке «Данные организации» | Select монеты + Segmented период + Export | — | — | Период: Chip (Мон, Майн) vs Segmented (B2B). Правило §0: период — Chip |
| **Stat strip** (числа в одной карточке через Divider) | сводка дохода | Тепловая карта, Fleet summary (3 числа) | Analytics «Hashrates» | Statistics (2 ячейки) | Stat card (частично) | Мон без Divider, B2C с Divider. Один способ: Card + Stat card Variant=Inline ×N + Divider (новый вариант Stat card или конструкция) |
| **Stat card ряд** (отдельные плитки) | Status summary | Площадки 2×2 (L2 в L1) | Profile (Workers / Reject / Hashrate) | — | Stat card, Status summary | Плитки L2 внутри L1 (Мон) vs L1 на L0 (B2B). Один способ: L1-карточки на фоне; L2-плитки только внутри составной карточки |
| **Fleet summary** (числа + сегментная полоса статусов + легенда-счётчики) — **новое** | — | Главная, Площадки (Gauge вариант) | Analytics «Workers» (полоса + легенда) | — (List item + Counter) | Progress (сегменты), Legend item | 3 вида: полоса (Мон, B2B), полукруг Gauge (Мон Площадки), List + Counter (B2C, Майн App). Один способ: Status summary (Web, плитки) / Progress-сегменты + Legend item со счётчиком (плотные дашборды); Gauge — не вводить |
| **Capacity bar** (использовано / всего) — **новое** | — | Мощность: 3 числа + Progress + легенда | — | — | Progress | Только Мон; собрать как вариант Fleet summary (1 сегмент) |
| **Chart card** | Chip-период справа | Select единицы в шапке; период — глобальный Chip; Compact — легенда с Checkbox | Tabs S серии + bar chart + «30 days sum»; период — Chip-кнопки (профиль) / Segmented (analytics) | крупное число по центру + 2 ячейки + период 3 кнопки снизу | Chart card | Период: в карточке (Майн, B2B-профиль, B2C) vs глобальный (Мон, B2B analytics). Один способ: период в Chart card; глобальный — только если период один для всей страницы (тогда в тулбаре, Chip) |
| **Section header** | `Section header` M | H 32 + Link «К площадкам», отступ 24 | H 24 «Revenue» (68 с паддингом) | «Настройки» H 20 | Section header | Отступ заголовок → контент 24 (Мон) / 16–20 (B2B) / 16 (B2C Compact). Один способ: Section header + `space/section-gap` (см. §4) |
| **Фильтры + таблица** | Card: Tabs/фильтры → Table | Card r12–16: (Segmented / Select On border ×1–3 / Date range / Chip-период / Checkbox-Chip / Icon button «Фильтр») → Table | Тулбар над Table: Export + Icon button «фильтр» + Select | Search + Table 4 кол. | Table row, Select, Date range field, Search | Мон — фильтры In-card; B2B — тулбар без Select-фильтров (всё в Modal «Filters»). Один способ: ≤4 фильтра в строке; остальное — Side panel «Фильтры» (не Modal) |
| **Table summary bar** (итог + счётчики по статусам) — **новое** | итоговая строка первой (WL) | отдельная Card под таблицей (53, зазор 12): «Всего устройств 120 · Сбой 2 · Риск 3…» | — | итоговая строка первой | — | Внизу отдельной карточкой (Мон) vs первой строкой таблицы (Мон Отчёты, B2C). Один способ: итоговая строка первой в Table (Table row Variant=Total); счётчики статусов — Legend item в шапке карточки |
| **Accordion card** (строка таблицы на Compact) — **новое** | Transaction / List item | карточка 65 с ⌄, раскрытие: Key-value 2 колонки | — | Transaction row с ⌄ (Payouts) | Accordion, Transaction | patterns §3.6: детали — в Sheet, не раскрытием. Мон и B2C оба раскрывают. Решить: разрешить Accordion для объектов без отдельной страницы (Мон) или Sheet. Предложение: Compact-строка = List item / Transaction → Sheet деталей |
| **Строка-действия таблицы** | ⋯ Menu | ⋯ (Площадки), Icon button «изменить» + «удалить» (Сотрудники), Icon button Primary/Danger (Ожидание), Select владельца в ячейке | Link «Edit» / «Terminate», Danger-иконка, copy | ⌄ | Icon button, Menu | 4 способа. Один способ: 1 действие — Icon button Ghost; 2+ — ⋯ Menu; деструктивное — в Menu, не иконкой |
| **Массовый выбор + Bulk action panel** — **новое** | — | Checkbox-колонка + плавающая панель справа снизу 306 («Выбрано N из M» + Button ×2–6 столбиком + «Закрыть») | Checkbox-колонка (действия не показаны) | — | Checkbox, Action bar | Один способ: Bulk action bar (горизонтальная полоса над таблицей или снизу по центру, до 3 действий + ⋯), не колонка кнопок |
| **Search** | Input Search | Search в карточке на всю ширину | **Search results dropdown** в Top bar (строки ID + имя + почта, подсветка совпадения) | Search | Search, Dropdown panel, Menu item | Новый вариант: Search с результатами (Dropdown panel + Menu item 2 строки) |
| **Детали объекта** | страница | Modal 1156 (Tabs + Card метрик) / Sheet во всю высоту (Compact) | страница профиля (Segmented L разделов) | экран Inner | Modal, Sheet, Side panel | patterns говорит «Мон — Side panel» — **не так**: в макетах широкий Modal. Один способ (предложение §5 patterns): Web — страница при Tabs, Side panel для быстрого просмотра; Modal не использовать |
| **Мета-строка объекта** (пары «подпись: значение» в ряд) | Сводка объекта 3.14 | Площадка · Серийный · Владелец ▾ | UUID + copy в тулбаре | Status-строка «Активный · Группа ›» | Key-value row | Web — в ряд, Compact — столбиком (как 3.14) |
| **Key-value карточка** | Key-value row | 2 Card L2 с dotted leader | — | Key-value «Уже добыто» | Key-value row | Dotted leader — только Мон; убрать (Key-value row без лидера) |
| **Форма в модалке** | Modal md / Side panel | Modal 420–620, кнопки столбиком на всю ширину (Primary + Danger-ghost/Secondary) | Modal 400–480, заголовок по центру, ← назад, кнопки столбиком | Sheet во всю высоту, Button XL внизу | Modal, Sheet, Side panel | Ширины 400/420/480/500/540/600/620 — 7 значений. Один способ: Modal sm 400 (подтверждение) / md 560 (форма); длинная форма — Side panel |
| **Мастер шагов в модалке** | 3.13 Side panel | Modal 620: ← · номера шагов слева · подвал «пояснение + Продолжить» | Modal с ← (2FA, Fee) | — | Step, Step trail | Мон нумерует шаги без Step-компонента → Step trail |
| **Confirmation** | — | Modal 500: текст + одна Danger-кнопка (без Cancel) / «Остаться» + «Выйти» | Modal 480 с 3D-иллюстрацией, Yes / No | — | Modal | Один способ: Modal sm: заголовок-вопрос · текст с объектом · [Cancel Secondary] [Действие Primary/Danger]; без иллюстраций |
| **Status (результат операции)** | Status screen | Toast | Status-модалка с 3D-иконкой (Watcher link created) | Status screen (Аккаунт создан) | Status screen, Toast | Web: Toast для обратимых, Status-модалка — если нужно следующее действие (Copy link) |
| **Toast** | — | справа сверху, иконка ✓ + текст + ✕ | справа сверху (Watcher link copied) | — | Toast, Snack | Совпадают ✓ |
| **Suggest / сообщение страницы** | Suggest Strip | — (в FW — Danger/Warning полосой) | — | Suggest Strip Info / Warning (внутри карточки и над) | Suggest | Совпадает с правилом §2.1 |
| **Payout summary** (сумма к выплате + факты) | Виджет баланса / сводка дохода | — | Forecast card | Statistics, Payouts | Amount, Key-value row | Кандидат «сводка с полосой фактов» (patterns §0.2) — подтверждён вторым продуктом |
| **Сводка воркеров по статусам** | Status summary | Fleet summary | Workers-полоса | List item + Counter | Status summary | см. Fleet summary |
| **Steps «Как начать»** | 3.11 | Сканер: 3 карточки, активная L2, остальные disabled | — | — | Step symbol | Совпадает; добавить состояние «шаг недоступен» |
| **Container map** (сетка мест) — **новое**, доменное | — | Тепловая карта, схема контейнера | — | — | — | Только Мон; не в DS как набор (доменный виджет), но на токенах Status-цветов |
| **Settings row** | 3.9 | матрица «тип × канал» (Checkbox ×2 + Select порога) | 2FA: заголовок + описание + Toggle | List item + › | List item, Toggle | Матрица уведомлений — новый вариант группы (Settings matrix) |
| **Profile summary** | 3.14 | — | — | Avatar + логин + Status-факты + Address | Avatar, Status, Address | Совпадает с 3.14 |
| **Auth** | Card 585 | — | Card 250 в сером контейнере, заголовок вне карточки | на весь экран, Button XL | — | Совпадает с 4.6 по сути; B2B — заголовок над карточкой |
| **Load more** | «Показать ещё» | — (бесконечная таблица) | Button Secondary по центру под таблицей | — | Button, Pagination | Один способ: Button Secondary M по центру; Pagination — только для отчётов |

---

## §3 Лейауты (каркасы)

| | Мон Web 1440 | Мон Compact 375 | B2B Web 1440 | B2C 375 | FW Web 1440 |
|---|---|---|---|---|---|
| Навигация | Sidebar плавающий 252, отступ 12 (264 всего), r16; разделы + «Нужна помощь / Спец. условия» + «Расширить подписку» + профиль | Top bar 52 (лого · аккаунт · бургер) + Tabs разделов 45 (8 пунктов, прокрутка) | Admin top bar 76 (лого · Search 290 · язык · Avatar · выход); меню — колонка 217 внутри серого контейнера (Nav item 44, r12, p12) | Tab bar 56 (5 пунктов) | Sidebar 252 как Мон (+ статус Online, IP/MAC внизу) |
| Контент | x 304 → ширина 1096, справа 40 | поле 16, ширина 343 | серый контейнер 1400 (поля 20/20/20, r24) → белая панель 1159 (вставка 12, r16, паддинг 20) | поле 16 (исключение — Payouts summary 10) | как Мон |
| Шапка страницы | заголовок 36 на y 40; Tabs Counter 72 через 16; до карточек 20–24 | заголовок + действие под Tabs разделов | тулбар внутри панели 80 (p20) | нет (Tab bar внизу); вложенные — Top bar Inner «←» | заголовок + «Updated» справа + линия |
| Макс. ширина | не задана (1440 = единственный макет) | — | контейнер во всю ширину минус 20 | — | — |
| 1920 | **не нарисован** на рабочих страницах (главная, площадка, устройства, design review) — в patterns §1.1 упомянут, в файле не найден | — | — | — | — |
| Объект | Modal 1128–1230 | Sheet во всю высоту | отдельная страница + «← back to Users» в меню | экран Inner | Side panel ≈540 (drawer) |
| Поверхности | L0 чёрный, L1 карточки, L2 плитки | то же | L0 светлый, L1 серый контейнер, «L2» белая панель — инверсия (§2.3 patterns) | L0 светло-серый, L1 белые карточки | как Мон |

Выводы:
- Мон и FW — один каркас = Web App pool (Sidebar плавающий, поле 40). Укладывается в §1.3 без изменений.
- B2B — третий тип каркаса (Top bar + вложенный контейнер). Миграция на Sidebar убирает: Top bar 76, серый контейнер, вставку 12 — контент получает те же 40.
- Мон Compact = мобильный веб pool. Нужен Top bar Mobile web (есть) + Tabs M с прокруткой.
- B2C = App-каркас §1.5, но без листа на всю ширину: отдельные карточки с полем 16.

---

## §4 Отступы фактические

| Уровень | Майн (patterns) | Мон Web | Мон Compact | B2B | B2C | FW |
|---|---|---|---|---|---|---|
| Поля страницы | 40 / 16 | 40 (от Sidebar), справа 40 | 16 | 20 (контейнер) + 12 (вставка) + 20 (панель) = 52 до контента | 16 (**10** на Payouts) | 40 |
| Шапка → первый блок | 40 | 24 (Главная), 16 + 20 (через Tabs) | 16 | 0 (тулбар 80 внутри панели) | 10 | ≈40 |
| Между разделами | 48 (Web) | **48** | **32** | ≈36–40 (карточки → Section header 68 с p16) | 10 (как между карточками) | ≈40 |
| Заголовок раздела → контент | 20 | 24 | 16 | 16–20 | 16 | ≈16 |
| Между карточками | 8–32 (5 значений) | **16** (ряды и колонки) | **16** | **12** | **10** | 16 |
| Паддинг карточки | 20–36 | **20** (числа), таблица 20 по бокам / 24 сверху | 16 | **20** | 16–20 | ≈16–20 |
| Внутри карточки между строками / группами | 20–40 | 8 (подпись → число), 24 (между фактами), 36 (числа → полоса) | 10–16 | 4 (подпись → число), 12 (ячейки) | 12–20 | — |
| Строка таблицы (высота) | — | **56** (Площадки), **52** (Устройства), **51–53** (Отчёты), шапка 37 | карточка-строка 65 (+16 зазор) | **52** (+1 зазор, строка r8 внутри) | Table 48 (Workers), Transaction **74** | ≈35 (плотная) |
| Радиус карточки | 16 | **12** (числа, Устройства) / **16** (Площадки-таблица, bulk-панель) | 12 | 16 (панель), 12 (карточки), 24 (контейнер) | 12–16 (**6** на Payouts summary) | 12 |
| Модалка: паддинг / радиус | — | 30 / 12 | Sheet 20 | ≈20 / 16 | Sheet 20 | ≈24 / 16 |

Разброс (что привести к одному):
- **Между карточками**: 16 (Мон) / 12 (B2B) / 10 (B2C) → `layout/gutter` (Large 24 по токену — в макетах меньше; решать в H2: 16 для дашбордов-плотных Web или токен 24).
- **Между разделами**: 48 (Мон Web) = Майн Web 48; 32 (Мон Compact) = `space/section` Compact ✓; токен Large 64 больше всех замеров.
- **Строки таблиц**: 51/52/53/56 в одном продукте → две плотности: 52 (обычная) и 40 (плотная, FW / Мон Устройства).
- **Радиус карточки**: 12 vs 16 в одном экране Мон Главная → один `radius/container`.
- **Модалки**: 7 ширин (400–620) + 4 «широкие» (802, 922, 1128–1230).
- **B2C Payouts summary**: поле 10, радиус 6 — единичная ошибка макета.

---

## §5 Паттерны взаимодействия

| Паттерн | Где | Как устроено | Замечание |
|---|---|---|---|
| Поиск с выпадающими результатами | B2B Top bar (7479:47040) | Search 290 активен → Dropdown 350 (r12, p4/8): строки 54 — Avatar + ID (совпадение жирным) + имя + почта; hover — фон L2 | Новый вариант Search; Мон / B2C — только фильтрация таблицы |
| Массовый выбор | Мон Устройства (26284:207711), Уведомления; B2B Users | Checkbox-колонка, шапка — indeterminate; панель справа снизу «Выбрано N из M» + действия столбиком + «Закрыть» | Подтверждение массового действия — Modal с числом («Удалить 4 устройства?», «Перевести 6 устройств…») |
| Load more | B2B Users, Coins, Profile | Button Secondary по центру под таблицей, панель 76 | Мон — без пагинации |
| Drawers / Side panel | FW (55:68241, 57:69621) | справа ≈540, заголовок + ✕, форма, подвал Cancel + Primary | Мон и B2B вместо этого — Modal |
| Sheet | Мон Compact, B2C | во всю высоту под статус-баром, ✕ справа, Button XL внизу | — |
| Подтверждения | Мон (Удаление сотрудника, Удалить устройство, Перевести в «Ожидание»), B2B (Terminate session), FW (Restart) | Modal sm; кнопки столбиком на всю ширину; Мон — иногда без Cancel; B2B — с иллюстрацией | Один способ: Cancel + действие; заголовок-вопрос; объект в тексте |
| Unsaved changes | FW (42:56298), Мон «Настройка пула» (27580:280779) | FW — текст «Unsaved changes» + активная Save в шапке; Мон — при закрытии Modal: «Выйти без сохранения?» (Остаться Primary / Выйти Danger-ghost) | Оба нужны: индикатор + перехват закрытия |
| Skeleton / Loading | FW (37:46675), Мон Пулы (27580:276844) | FW — «—» в числах, плашка «Loading» на таблицу; Мон — Skeleton-плашки в ячейках таблицы | Правило patterns §3.11a подходит |
| Offline / ошибка загрузки | FW (37:47933) | Suggest Danger над контентом + «Retry»; данные «—» | Нет в Мон / B2B — взять FW |
| Предупреждение состояния | FW Low hashrate (37:48233), Мон Отчёт (подвал Warning-текст) | Suggest Warning с рамкой | — |
| Toast | Мон (сохранено, пул добавляется), B2B (copied) | справа сверху, ✓ + текст + ✕ | Совпадает |
| Ошибки полей | FW (42:56955), B2C регистрация (1566:6510), B2B Fee (hint Warning) | рамка Danger + текст под полем; Save disabled; B2C — чек-лист правил пароля | — |
| Disabled до изменений | Мон (Сохранить изменения), B2B (Далее, Sign in), B2C (Сохранить) | Primary в disabled до валидности/изменений | Единообразно ✓ |
| Tooltip графика | FW (37:37245), B2B Profile | серии (swatch + имя + значение) + время, курсор-линия; B2B — дата + время снизу | Chart tooltip есть в DS |
| Фильтры | Мон: in-card Select / Chip / Date range + «Сбросить фильтры», Modal «Фильтр устройств» (Segmented + Select ×5); B2B: Modal «Filters» (Date range + Clear, сумма, Range slider); B2C: Sheet «Фильтры» + Floating button | Три контейнера фильтров: строка / Modal / Sheet. Один способ: строка (≤4) → Side panel (Web) / Sheet (Compact) |
| Сортировка | Мон (sort-иконки в шапке), B2B (▾ у колонки), B2C (Floating button «Сортировка») | — | Table header cell с sort — есть |
| Раскрытие строки | Мон Уведомления (⌄), Мон Compact (accordion), B2C Payouts | ⌄ справа, раскрытие на месте | Против контракта Transaction (детали в Sheet) — решить |
| Копирование | B2B (ID, watcher link), B2C (адрес, хеш), FW (IP/MAC) | иконка copy рядом с текстом → Toast | Address есть в DS |
| Пустые состояния | Мон Сканер (шаги), Сотрудники «Ни один сотрудник…», Устройства «не найдены», Отчёты «За 2025 год отчётов нет»; B2C «Нет воркеров», «Payouts – Empty»; FW «The log is empty» | — | Укладываются в 3.12 |

---

## §6 Новые кандидаты в наборы DS (нет в ds-manifest)

| Кандидат | Продукты | Состав | Приоритет |
|---|---|---|---|
| **Bulk action bar** | Мон, B2B | Counter «Выбрано N из M» + 1–3 Button + ⋯ + закрыть; Web — плавающая снизу, Compact — Action bar | высокий |
| **Fleet summary / Status bar** | Мон, B2B, Майн | числа (Stat card Inline) + Progress сегменты по статусам + Legend item со счётчиком | высокий |
| **Table summary row** (Table row Variant=Total) | Мон, B2C, Майн WL | первая строка таблицы с итогами, крупный шрифт | высокий |
| **Search · With results** (вариант Search + Dropdown panel + Menu item Two-line с подсветкой) | B2B | — | средний |
| **Stat strip** (Card + Stat card Inline ×N + Divider) | Мон, FW, B2C, Майн | вариант Status summary / Stat card Layout=Strip | средний |
| **Accordion card / Expandable row** | Мон Compact, B2C, Мон Уведомления | строка-карточка + Key-value 2 колонки при раскрытии | решить (vs Sheet) |
| **Settings matrix** (тип × канал) | Мон Уведомления | строка: название + Select порога + Checkbox ×N | средний |
| **Capacity bar** (вариант Progress с подписью «использовано / всего» + легенда) | Мон | — | низкий (вариант Fleet summary) |
| **Password rules** (чек-лист требований) | B2C | List: иконка ✓/✕ + текст | низкий |
| **Selection summary** (Avatar group + «N выбрано») | B2B Fee | — | низкий (Avatar group есть) |
| **Range slider** | B2B Filters | — | низкий |
| **Container map** | Мон | доменный виджет, не в DS — только токены | — |

Расхождения с `patterns.md`, найденные инвентарём:
- §1.1 / §1.3: «Monitoring 1920» — в рабочих страницах файла нет 1920-кадров.
- §2.3: «Мониторинг: строки таблицы — отдельные карточки L1» — верно только для Compact; на Web строки внутри одной карточки.
- §3.14 / §5: «Мониторинг — Side panel (drawer)» — в макетах детали устройства — Modal 1156 (Web) и Sheet (Compact); Side panel — в прошивке.
