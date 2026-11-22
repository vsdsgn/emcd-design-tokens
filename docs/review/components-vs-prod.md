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

## Следующие
- App (майнинг), Мониторинг, WL B2B, WL B2C — те же пары.
- Конструкции: сводка, графики, таблицы, списки — форма и вёрстка.
