# Сверка компонентов DS 2.0 с production (22.11, после «расхождений с продом тьма»)

Метод: production-экземпляры берутся из копий production-экранов (Web Migration test, «… · оригинал (копия)»), рядом — ближайший вариант DS 2.0; замеры скриптом (размер, радиус, отступы, зазор, шрифт) + глазами. Страница Figma: Web Migration test → «🧪 Сверка компонентов с продом».

## Web App (майнинг), 82 legacy-набора на 6 экранах; частые

| Компонент (production) | Production | DS 2.0 | Расхождение | Предложение |
|---|---|---|---|---|
| Sidebar item | 218×36 r12, 16 Medium | Nav item 218×36 r12, 16 Medium | — | — |
| tab item (вкладки списка Web) | h60, 16 Medium, Counter | Tab L h56, 16 | высота 60 / 56 | решить: L → 60 или оставить |
| #Submenu tab (моб. веб) | h48, 14 Medium | Tab M h48, 14 | — | — |
| baseButton Small | 24, r6, 12 Medium | Button XS 24, r10 | радиус 6 / 10 | XS → `radius/control-sm` |
| badge neutral / brand | 20, 12 Medium | Badge S 20, r8, 12 Medium | brand с эмодзи 🔥 | эмодзи → Icon у Badge |
| segmented picker lg | группа 56 r16 p4, сегмент 48 r10, 16 SemiBold | Segmented M 40 r12, сегмент 32 r8, 14 Medium | высота, шрифт, радиус | добавить Size L (56 / 48, 16) или оставить M |
| baseChip md | 44, 16 Medium (вес Regular на глаз) | Chip M 40, 14 Medium | высота 44 / 40, кегль 16 / 14 | решить |
| input large (select) | 64: подпись на рамке, монета слева, поле 56 | Select L: подпись сверху, поле 48, справа «USDT» | подпись, высота, **дефект: «USDT» вместо шеврона по умолчанию** | шеврон — руками в Figma (API ломает слот); подпись на рамке по умолчанию? |
| Selector + Input (фильтр) | 56, r12, 16 Medium | Select M на рамке: 40 | высота 56 / 40 | решить |
| Search | 36, r10, 14 Medium | Search M 40 r12 / S 32 | высота 36 | решить |
| DateRange.Field | 56, r12, 16 | Date range field 68 (с подписью) | высота | как поля |
| Sidebar banner | 216×120 r12 | Promo card S 222×120 r16 | радиус | — |
| .coin | 28 | Coin 16 / 20 / 24 / 32 | размера 28 нет | решить: 28 или 32 |

## App (майнинг), 3 production-экрана (Воркеры, Дашборд · вывод, История · начисления)

Доска Figma: App Migration test → страница майнинга App → «🧪 Сверка · App · production ↔ DS 2.0» (production на тёмной подложке — копии в тёмной теме).

| Компонент (production) | Production | DS 2.0 | Расхождение | Решение / действие |
|---|---|---|---|---|
| tabs/x (разделы) | h48, 14 Medium | Tab M 48, 14 Medium | — | — |
| сounter во вкладке | 20, r6 | Counter S 18, r8 | высота, радиус | шкала DS |
| tabbar | 375×90, 5 пунктов майнинга (Дашборд · Воркеры · E · История · Профиль) | Tab bar 375×91, пункты суперприложения (Главная · Майнинг · E · Доход · P2P) | состав пунктов; плашка E | пункты — как в 2 из 3 production-экранов (суперприложение, DS уже так); E — Expressive-стиль как в production (22.11) |
| Button Secondary Small «Выгрузить» в шапке | 36 r10 | Floating button M 40 внизу | место и вид | DS: выгрузка — Floating button (как Watcher-link) |
| baseButton «Фильтры» | 36 r10 | ряд Chip S 32 | вид | DS: фильтры по статусу — Chip (patterns 0, п. 5) |
| dropdown монеты (шапка) | 96×32 r8 | Select compact 36 r10 | высота, радиус | шкала DS |
| Selector small (монета отображения) | 110×36 r10 | Select compact 36 r10 | — | — |
| Period selector item (период графика) | 34 r10, 12 Medium, 3 равные доли под графиком | Chip M 40 r12, 14 Medium, равные доли | высота, кегль | шкала DS; период — Chip (правило 19.11) |
| segmented picker (Начисления / Выплаты) | группа 44 r12 p4, сегмент 36 r8, 14 SemiBold | Segmented L 48 | высота, вес SemiBold / Medium | шкала DS |
| строка списка «Будет выплачено» | ~63, сумма 14 SemiBold, «Будет выплачено» зелёным | List item M 66, Amount M 14 Regular, цвет основной | вес суммы, цвет | Amount S / M — Medium (22.11, по частоте: Medium ×56, Regular 0); зелёный «Будет выплачено» — нет (Tone только у итога дохода) |
| label (действие в шапке) | 32 r8 | Icon button Tertiary M 40 r12 | размер | шкала DS |
| avatar group line (монеты воркера) | 24 | Coin stack M 40×24 | — | — |

### Экраны App (глазами)
- **Дашборд · вывод:** в шапке справа в production — настройки (`ic-settings`), в DS стоял «+» → **исправлено** (`icon/settings`).
- **Дашборд · вывод (DS):** добавлен низ экрана, как в production: Chart card хешрейта (метрики, период Chip M равными долями, легенда, Line + Bars), Status summary, Promo card; экран во всю высоту (1609), код демо — так же. Полоса тикеров (BTC $74 282 +7.10 %) — компонента в DS нет, в парковку.
- **patterns.md:** п. 0-4 и сценарий «Дашборд → Compact» говорили «Segmented» для периода — приведено к правилу 19.11 (Chip). На Web-экранах цели 3 период уже Chip.

## Мониторинг, WL B2B, WL B2C (production-файлы продуктов, 6–7 экранов каждого)

Мониторинг почти не использует библиотеку: таблицы, карточки, сегменты — свои фреймы. Поэтому кроме экземпляров сняты метрики конструкций (кегли, высоты строк, радиусы карточек).

| Компонент (production) | Продукт | Production | DS 2.0 | Расхождение | Решение |
|---|---|---|---|---|---|
| Sidebar item | Мон | 232×36 r10, 14 Medium | Nav item 218×36 r12 | ширина, радиус | шкала DS, один каркас Web (patterns 1.6) |
| baseButton Small (язык) | Мон | 24 r6, 12 Medium | Button XS 24 r10 | радиус | шкала DS |
| baseChip md (период 1 час) | Мон | 37 r10, 14 Medium | Chip S 32 r10 | высота | шкала DS; период — Chip |
| input single select large (подпись на рамке) | Мон | 53 | Select M On border 40 | высота | шкала DS |
| DateRange.Field | Мон, B2B | 45–56 r12 | Date range field | высота | шкала DS |
| Search | Мон, B2B | 36 r10 | Search M 40 / S 32 | высота | шкала DS |
| Button Secondary Small | B2B | 40 r10 | Button Secondary M 40 r12 | радиус | шкала DS |
| segmented picker item | B2B, App | 36 r8, **14 SemiBold** | Segment 32 / 40, 14 Medium | вес | один вес у контролов — Medium (Button, Chip, Tab, Segment); SemiBold в production только у сегментов и периода — не переносим |
| Period selector item (Desktop) | B2B | 40 r10, 14 SemiBold | Chip M 40 r12, 14 Medium | вес, радиус | как выше |
| Selector small | B2B | 120×40 r10 | Select compact 36 r10 | высота 40 / 36 | Web-тулбар — Select M 40 (patterns 1.6); Select compact — шапки App / Compact |
| Notification (Success) | B2B | 288×72 | Toast | — | Toast |
| Button S | B2C | 36 r6 | Button S 32, `radius/control` бренда | радиус 6 | Geometria: `radius/md` = 6 — даёт бренд, не компонент |
| Row (таблица воркеров) | B2C, App | 48, 12 Medium | Table row Compact 48, содержимое — атомы S (12) | — | — |
| таблицы Мониторинга | Мон | строки 51–56, **12 Medium** ×359 | Table row Compact 48, 14 Medium | кегль | Web — 14 (как Web App); 12 — только Compact (атомы S) |

### Найдено внутри DS (22.11)
- **Table cell / Table row:** в Figma текст ячеек был `Label/LG` (16), хотя по контракту 19.11 и в коде — `type/label/md` (14). Исправлено: 12 текстов Table cell и 96 — Table row → `Label/MD` (ждёт Publish).
- **Мониторинг · Главная:** текст в ячейках таблиц — 14 Regular без стиля (46 шт.) → `Label/MD` (14 Medium), как в остальных таблицах.

## Решения Стефана (22.11)
- Размеры: **шкала DS остаётся** (32 / 40 / 48 / 56), production переходит на неё; расхождения по высоте — осознанные (в таблице выше — «решить» → «шкала DS»).
- Select: пересобран без вложенного Input (шеврон, подпись на рамке, свойства).

## Следующие
- Конструкции: сводка, графики, таблицы, списки — форма и вёрстка (экраны цели 3 уже сверены глазами, docs/review/README.md).
- Конструкции: сводка, графики, таблицы, списки — форма и вёрстка.

## Общая сверка 23.11 (по просьбе Стефана: «все компоненты прода vs DS 2.0 по номерам»)

Доска Figma: Web Migration test → страница «🧪 Сверка компонентов · прод ↔ DS 2.0» → «Сверка · все компоненты». 42 строки: номер · компонент · какой production-компонент взят · экземпляр из production Web App (копия файла) · тот же компонент DS 2.0 (Dark · Expressive). Комментарии — по номеру строки.

| № | Компонент DS 2.0 | Production |
|---|---|---|
| 01 | Button | baseButton |
| 02 | Icon button | baseButton без текста |
| 03 | Badge | base badge / neutral --1.5 |
| 04 | Badge · Number | Counter badge |
| 05 | Status | base badge status |
| 06 | Chip | baseChip / base --1.5 |
| 07 | Chip · период | Period selector item |
| 08 | Tabs (Web) | base tab item |
| 09 | Tabs (моб. веб) | #Submenu tab |
| 10 | Segmented | base segmented picker group / text |
| 11 | Checkbox | baseCheckbox |
| 12 | Radio | baseRadio |
| 13 | Toggle | baseToggle |
| 14 | Input | baseInput |
| 15 | Select | Selector + Input |
| 16 | Select compact | Selector small |
| 17 | Search | Search |
| 18 | Date range field | DateRange.Field |
| 19 | Menu item | Dropdown item |
| 20 | Menu | Dropdown |
| 21 | Tooltip | base tooltip / neutral --1.5 |
| 22 | Toast | base notification |
| 23 | Modal (шапка) | base modal header / title |
| 24 | Avatar | base avatar / single |
| 25 | Avatar group · монеты | avatar group line |
| 26 | Accordion | Accordion |
| 27 | Nav item | Sidebar item |
| 28 | Sidebar | sidebar / default |
| 29 | Empty state | empty state |
| 30 | Progress circle | baseCircleLoader (видимого экземпляра нет) |
| 31 | Suggest | baseCard / banner |
| 32 | Divider | base divider layout (видимого экземпляра нет) |
| 33 | Tab bar (App) | tabbar |
| 34 | Top bar (моб. веб) | Navbar mobile |
| 35 | List item | List / Coinhold list item |
| 36 | Floating button | button float / inside |
| 37 | Status screen | status-screen |
| 38–42 | Table header cell, Stat card, Amount, Progress, Breadcrumbs | компонента в production нет (в макетах — текстом / вёрсткой) |

## Сверка 24.11 — «как оригинал + системные улучшения» (принцип шага 1)
Доска «Сверка · все компоненты» (Web Migration): правая колонка переведена в Style=Base и на ближайшие к production варианты — 01 Button и 02 Icon button → Tertiary L (legacy Secondary base = Tertiary по таблице переноса), 04 Badge Number → Danger Solid, 08 Tabs → M, 10 Segmented / 14 Input / 15 Select → L, 26 Accordion → M, 29 Empty state → Vertical, 31 Suggest → Neutral; 37 — число с точкой.

Отличия от production, которые **не** объясняются системой (исправлено):
- **Modal MD, заголовок:** `type/display/md` растёт по Viewport — на 1440 было 48 при 28 в production и в коде → Heading/XL (24 Compact · 32 Large). Figma, код (`--type-heading-xl-*`), контракт.
- **Chart card, значение:** то же, 48 при 24–30 в production → Heading/XL.
- **Превью кода:** суммы с запятой в 6 превью (Amount, Transaction, Input, Progress, Toggle, Modal) → точка (решение 17.11).

Системные отличия (оставлены): высоты по шкале (поля 56 → L 48, XL снят 17.11), скругление по высоте (22.11), уровни L0–L3 и альфа-текст, Avatar 28 → шкала 24 / 32 (слияние с Coin 22.11), Accordion — круглый шеврон 24 (как legacy baseAccordion).

На решение Стефану — см. OPEN-QUESTIONS «Сверка 24.11».
