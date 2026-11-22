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

## Решения Стефана (22.11)
- Размеры: **шкала DS остаётся** (32 / 40 / 48 / 56), production переходит на неё; расхождения по высоте — осознанные (в таблице выше — «решить» → «шкала DS»).
- Select: пересобран без вложенного Input (шеврон, подпись на рамке, свойства).

## Следующие
- Мониторинг, WL B2B, WL B2C — те же пары (App — выше).
- Конструкции: сводка, графики, таблицы, списки — форма и вёрстка.
