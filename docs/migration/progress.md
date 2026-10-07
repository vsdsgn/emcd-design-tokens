# Перенос draft-компонентов: legacy 1:1 → Foundations DS 2.0

Цель (Стефан, 2026-10-07): все 🟠 draft — до 1:1 с legacy, затем на токены DS 2.0; у каждого борда (состояния, правила, темы, зоны).

## Метод (на каждый компонент)
1. `_compare · <Компонент>` на его странице (слева от борды): legacy-вариант и DS 2.0-вариант рядом в тёмной теме (legacy — тёмный-only) + сигнатура: размеры, отступы, gap, радиусы, кегль/интерлиньяж, цвета, позиции текста и иконок.
2. Правим DS 2.0-компонент **на месте**, пока сигнатура не совпадёт с legacy (инстансы и API для DSP сохраняются). Намеренные отличия — только системные решения DS 2.0: шкала без нечётных (lh 21 → 20, 150 % → 20/24), единый слой состояний 6/10 %, Disabled 8/40 %, Lucide-иконки в Base.
3. Токены по роли слоя (docs/color-migration.csv), размеры — `space/*`, `radius/*`, `size/*`.
4. Докрутка 2.0: состояния по модели, кольцо фокуса, зоны (hit web/app + safe, Show-свойства), min/max.
5. Борда: Варианты, Свойства и зоны, Поверхности L0–L3 (светлая + тёмная), В контексте, Правила.
6. Проверка: рендер сравнения + все варианты на борде.

## Статус

| Компонент | Legacy | 1:1 | Токены | 2.0 / зоны | Борда | Заметки |
|---|---|---|---|---|---|---|
| Checkbox / Radio / Toggle | baseCheckbox / baseRadio / baseToggle | ✓ | ✓ | ✓ | ✓ | Control Left/Right починен 2026-10-06 |
| Input | input | ✓ (пилот) | ✓ | ✓ | ✓ | |
| Select compact | Selector small | ✓ 2026-10-07 | ✓ | ✓ зоны заменены на стандартные | ✓ | value inset 2 (как legacy), шеврон Disabled → icon/disabled; 36 — вне шкалы контролов, как legacy |
| Menu / Menu item | Dropdown / Dropdown item | ✓ 2026-10-07 | ✓ | ✓ | ✓ | строка 44 + плашка ховера с отступом 4 (r8), обёртка pad 8, иконка 24, разделитель с отступом 16, **чекбокс справа** (как legacy); иконки в legacy — акцентные (вопрос) |
| Multiselect option | Dropdown item | — | — | — | — | ⛔ deprecated → Menu item (Checkbox = true); 5 инстансов заменены, мастер в Archive |
| Select, Multiselect | input + Dropdown | | | | | далее |
| Chip | baseChip / base, vertical | ✓ 2026-10-07 | ✓ | ✓ | ✓ | M: 16/24, отступ 16; S: 12; мета `text/tertiary`, на выбранном — `text/inverse-secondary` (новый токен); вертикальный: иконка по свойству. Высоты 40/32 вместо 44/36 — шкала DS 2.0 |
| Tabs | base tabbar, tab item | ✓ 2026-10-07 | ✓ | ✓ | ✓ | legacy 60 → L 56 (16/24, индикатор 3); невыбранная `text/tertiary`; gap L/XL 24 |
| Segmented | base segmented picker | ✓ 2026-10-07 | ✓ | ✓ | ✓ | legacy lg = XL (56, r16/12, отступ 24), sm ≈ L; радиус дорожки = сегмент + 4; невыбранный `text/tertiary`; вес Medium вместо SemiBold — стиль Label |
| Badge (+Counter, Status) | base badge * | ✓ 2026-10-07 | ✓ | ✓ | ✓ | нейтральный Subtle — `text/tertiary`; отступ L 12 (legacy 14 — правило «14 → 12»), S lh 16 (18); Subtle-тона на `status/*/on-subtle` 200 (legacy: бренд 300, ошибка — сплошной красный, контраст ниже) |
| Toast | base notification | ✓ 2026-10-07 | ✓ | ✓ | ✓ | отступы 20 / снизу 24, gap 20, описание `text/tertiary`, иконка статуса в цвете тона (`icon/success|warning|danger|info`) |
| Alert / Banner | baseCard / banner, base Banner --2.0 | ✓ 2026-10-07 | ✓ | ✓ | ✓ | Banner: рамка 1 px цвета тона, описание `text/primary`; Alert Neutral (= legacy Info): описание `text/tertiary`. Цвета текста на тинте — `on-subtle` 200 (legacy: сплошной цвет, контраст ниже); Info (синий) — сверх legacy |
| Modal | base modal header / footer | ✓ 2026-10-07 | ✓ | ✓ (крестик — Icon button) | ✓ | шапка: отступ 32, до тела 32, крестик в углу (8 от края, иконка на 16 — как legacy); тело `text/tertiary`; футер 40 сверху / снизу; две кнопки в ряд — Secondary по содержимому + Primary на остаток. Подложка `surface/raised` (legacy #111 = surface/default, но в светлой он серый). Шапка Coin — по 2.0 (в legacy монета 16 по центру) |
| Empty state | empty state | ✓ 2026-10-07 | ✓ | ✓ | ✓ | карточка с рамкой `border/default` r16, описание `text/tertiary`; заголовок Bold (legacy SemiBold) — стиль Heading |
| List item | List | ✓ 2026-10-07 | ✓ | ✓ | ✓ | вторичный текст `text/tertiary`, отступ иконка → текст 16 |
| Accordion | baseAccordion | ✓ 2026-10-07 | ✓ | ✓ | ✓ | шеврон 20 без подложки, раскрытый: 12 до текста / 32 снизу (L), тело Body/LG `text/tertiary`; зоны пересобраны; Disabled-шеврон `icon/disabled`; борда: Свойства и зоны, Поверхности L0–L3, ряд Pressed в матрице. ⚠️ мастер пересоздан из копии — **ключ библиотеки сменился** |
| Slider | base slider | ✓ 2026-10-07 | ✓ | ✓ | ✓ | дорожка 18 r12 `action/secondary/default`, точки шагов 6 (на заливке — `text/on-accent`, вне — `icon/tertiary`), ползунок с кольцом бренда 2, подпись / шаги / описание 14/20 `text/tertiary`; зоны стандартные (по дорожке); борда: Свойства и зоны, Поверхности. Описание и шаги legacy #4d4d4d — у нас tertiary (контраст) |
| Avatar | base avatar | ✓ 2026-10-07 | ✓ | — (не интерактивный) | ✓ | размеры 1:1 legacy: XS 20 · S 28 · M 36 · L 44 (было 32/40/56), инициалы S 14/20, M/L 16/24 `text/tertiary`, фон `surface/active` (#232323), иконки 16/20/20; Avatar group: нахлёст −4/−6/−8 |
| Stepper | Step Symbol / Trail / Text | ✓ 2026-10-07 | ✓ | — | ✓ | Step trail: линия Default `border/strong` (legacy #7a7a7a), Current `border/accent`, Success `status/success/solid`; в Stepper первая линия — Success; борда проверена, мусор `&amp;` в правилах убран. Step symbol: Default — нейтральный круг + рамка, номер 14/20 `text/tertiary`; Current — кольцо `border/accent` без заливки, номер `text/primary`; Success — `surface/active` + галочка `icon/tertiary` (legacy Checked; было зелёным). Step: подпись Default `text/tertiary` |
| Progress circle | baseCircleLoader | ✓ 2026-10-07 | ✓ | — | ✓ (Поверхности L0–L3) | дорожка `action/secondary/default` (legacy #1a1a1a); legacy — только 24, у нас S/M/L 24/48/72 с подписью % |
| Table | .table / raw, column title, cell base | ✓ 2026-10-07 | ✓ | ✓ | ✓ (раздел Table проверен) | текст ячеек и заголовков 14/20 (legacy 14/21; было 16/24), описания `text/tertiary`, заголовок 40, gap 6; колонки строки = колонкам шапки (Адрес Fill, Статус 140, ⋯ 48), текст ячеек — одна строка с «…». Отступы оставлены 2.0 (строка 8 + ячейка 12): legacy 32 + 0/12 не помещается в таблицу 800. Неактивный заголовок — `text/tertiary` (legacy #4d4d4d не проходит контраст). Иконочные ячейки (⋯, Icon, Star, Toggle, Buttons) — без min 80 |
| Legend item | .legends | ✓ 2026-10-07 | ✓ | ✓ | ✓ | маркер — вертикальная полоска 2 × 16 (новый вариант Legend swatch Marker = Bar), подпись 14/20 Medium: Default `text/tertiary`, Hover `text/secondary`, Selected `text/primary` |
| Sidebar / Nav item | sidebar, Sidebar item | ✓ 2026-10-07 | ✓ | ✓ | ✓ | Nav item: высота 40, подпись и иконка `*/primary`, выбранный — нейтральная плашка + индикатор 2 × 20 `accent/solid` слева. Sidebar: фон `surface/default` (legacy #111), ширина 240 (legacy 238 + поля 12) |
| Tab bar / Tab bar item | DS App --2.0-- tabbar | ✓ 2026-10-07 | ✓ | ✓ | ◐ | фон `bg/base` (legacy #0a0a0a), невыбранные подпись / иконка `*/tertiary`, иконка выбранного 24 (была 20 в экземпляре). Подпись 12/16 — legacy 10 px ниже минимума шкалы |
| Top bar | DS App navigation bar | ◐ 2026-10-07 | ✓ | ✓ | — | фон `bg/base`; остальное не сверялось |
| Divider | DS App divider text / layout | ✓ | ✓ | — | — | совпадает (#d0d0d0 7 % ≈ `border/subtle` 8 %) |
| Sheet | DS App bottom sheet menu | ✓ 2026-10-07 (Type = Menu) | ✓ | ✓ | ◐ | Type = Menu = legacy bottom sheet menu: плавающая карточка (поля 16, r12, рамка `border/subtle`), корень прозрачный, заголовок группы капсом `text/tertiary`, пункты Menu item M: поля 20, иконка 32, gap 16. Подложка `surface/raised` (legacy #111). Подписи пунктов 16/24 как в Menu (legacy-шторка 14/21) |

**Иконки меню:** в legacy пункты меню с фиолетовыми иконками; оставляем нейтральные (Стефан 2026-10-07: «пока так же»).

**Матрицы:** ряды Pressed (Select compact, Date cell, Nav item, Table header cell, Table row, Floating button) поставлены под колонки Hover с подписью «State = Pressed» (2026-10-07).
