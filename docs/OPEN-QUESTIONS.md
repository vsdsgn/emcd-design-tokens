# Открытые вопросы и отложенное

## Текущий этап (с 2026-10-09): Этап 1 — Token Migration & Mapping

Бриф Стефана 2026-10-09. Foundations и компоненты не меняем до ок. Таблица — одна: Foundations «🔁 Migration · legacy → DS 2.0» (28:3) ← `docs/migration/foundations-color.csv`.

Чеклист:
1. [ ] Ок Стефана: (а) точка восстановления Components (≈ 2026-10-06/07) окончательная, решение 2026-10-08 «только атомы и молекулы» снято; (б) что значит «без визуальных изменений» при уже принятых Δ DS 2.0 (см. К1).
2. [ ] Экспорт Foundations → `npm run all` (сборка от 2026-10-06, без `surface/level-*`, `state/layer`, `size/*`).
3. [ ] Ок на 10 образцовых строк (ниже) → новые колонки во всей таблице.
4. [ ] Скан потребителей legacy-переменных (DS Web, DS App, Web App, App, Monitoring, Firmware, WL B2B, Geo) → колонка Impact, решения Split / Merge.
5. [ ] Перегенерировать csv + рамку 28:3; проверка: 0 устаревших целей, у каждой Δ — ссылка на решение, Before/After на L0–L3.
6. [ ] Claude DS: status.json Modal / StatusScreen / Table / Transaction → draft (как в Figma) + «обнови Claude DS» — после п. 1(а).

Конфликты (на решение):
- **К1.** «Интерфейсы не меняются» ↔ уже принятые значения DS 2.0: на 2026-10-04 Δ в 25 из 66 строк, после — уровни L0–L3, текст альфой 72/56/40, обводки альфой, слой состояний 6/10, Disabled 8/40, accent 600. Предложение: принятые Δ оставить, в таблице помечать «Δ принято (дата)»; parity-палитру DS Future не возвращать. Новые Δ — только отдельным предложением.
- **К2.** Бриф ссылается на DS Future + Vault как на текущее; рабочая система с 2026-10-03 — Foundations / Icons / Components + репо. Vault — история.
- **К3.** Blueprint v1.0 ↔ текущие решения: Button «REBUILD API» → сделано иначе (Type × Tone, сохраняем); Badge / Input / Tabs «rebuild» → сейчас сохраняем и докручиваем; Tooltip / Coachmark split → не делали (Tooltip только Web, App — Sheet); Switch → Toggle; Semantic.Metric Web/App → Platform ×4; Header / Shell / Product nav в базовой библиотеке ↔ «Patterns» блюпринта.
- **К4.** Обводки контролов без общего правила: Button Tertiary outline — `border/default` (~1.3:1, одинаково во всех состояниях, вкл. Disabled), Checkbox / Radio Off — `border/strong` (≥ 3:1), поля — `control/border/default`. Предложение (этап 3, не сейчас): «обводка — единственный признак контрола → border/strong; иначе control/border/*; border/* — только контейнеры и разделители».
- **К5.** Схема контрактов (15 разделов) ↔ текущие описания (Когда / Когда нет / Правила / Не делаем, A11y, Движение) и борды: нет Events, Code projection, Testing, Migration; статус «experimental» ↔ draft.

Образцовые строки (Dark; legacy только тёмный; «≈» — альфа на L0 #0a0a0a):

| Legacy | Сейчас в таблице | Target | Before → After | Action | Статус |
|---|---|---|---|---|---|
| Color 1/7 [Back] #0a0a0a | bg/base | surface/level-0 | = | Keep (цель переименовать) | = |
| Color 2/6 [Back] #111 | surface/default «=» | surface/level-1 | #111 → #1a1a1a | Keep | Δ принято 10-06, в таблице ошибочно «=» |
| Color 3 [Back] #1a1a1a | surface/raised | вложенная → level-2 #202020; поповер → surface/raised #1a1a1a | Δ / = | Split | нужен скан |
| Color 35 [Back] #232323 | surface/hover (сплошной) | hover → state/layer 6% (≈#191919); плашка → level-3 #262626 | Δ | Split + Deprecate surface/hover | нужен скан |
| Color 2 [Text] #d0d0d0 | text/secondary #a3a3a3 | text/secondary white 72% | → ≈#bababa | Keep | Δ принято 10-05, «Стало» устарело |
| Color 3 #a3a3a3 + Color 4 #7a7a7a [Text] | оба text/tertiary | text/tertiary white 56% | → ≈#939393 | Merge 2 → 1 | решение: нужен ли muted |
| Brand fill hover #6724b1 | action/primary/hover #642db4 | state/layer 6% поверх action/primary/default | Δ | Deprecate action/primary/hover (сейчас 600) | проверить DSP |
| Brand disable #2c0754 | action/disabled #1a1a1a | action/disabled white 8% | → ≈#1e1e1e | Keep | Δ принято, значение устарело |
| Error back #350a09 + back 2 #480f0e | status/danger/subtle #3c0807 | status/danger/subtle red 24% | → ≈#3e1514 | Merge 2 → 1 | нужен скан back 2 |
| accent soft #f6fe9e / accent bold #9d8701 | highlight/solid #ebff00 (ΔE 50–57) | не сливать | — | Conflict | скан, затем Split или Deprecate |

Новые колонки: Primitive (цепочка алиасов) · Theme L/D · Action · Impact (потребители) · Решение (дата / правило) · Статус (= / ≈ / Δ принято / Δ открыто / Conflict).

## Решения Стефана 2026-10-04

- Пагинация: не нашлась — нарисована в нашем стиле 2026-10-04: `Pagination` (Pages / Compact × S / M) + `Pagination item` (Default/Hover/Pressed/Selected/Disabled), страница Data в Components. На ревью.
- Графики: только небрендовые цвета (без violet и lime) — применено: blue · yellow · rose · amber · emerald · fuchsia · orange · teal (свет 500–700 под 3:1, тёмная 300). Первые 3 различимы при дальтонизме; с 4-й серии — подписи и штрихи.
- Уникальное Monitoring (и других продуктов) — в общей Components; отдельные продуктовые библиотеки не заводим.
- Performa — убрана из DS (бренд, токены, сборка). Была только донором решений.
- WL = EMCD Base на фоллбеках; свой бренд клиента → темизация как Geometria (режим Brand).
- Яркие WL-акценты и фокус — подумать, показать разные примеры (парковка).
- Кнопки — переделка (сделано 2026-10-04, на ревью): Secondary accent → Secondary (+ Secondary error); старые Secondary и Outline → третьего порядка (Tertiary, Tertiary outline); Tertiary + Link → один текстовый стиль Text (фиолетовый и красный); убрать лишние состояния и те, что сливаются с фоном; Icon button — те же стили, что у Button.
- Проверить все компоненты на соответствие формам Legacy.

## Прошлый этап (до 2026-10-09): Base DS 2.0 готова к ревью — открытые пункты переносятся в этапы 1–3

Новая идея по ходу: если быстро и ничего не ломает — делаем сразу; иначе — в «Парковку».

1. [ ] Foundations: опубликовать (последние изменения: Style-роли, Platform без Site, хаптики). Таблица миграции перегенерирована 2026-10-04: цвета без изменений (66 строк, 25 отличий от legacy), рампы — 290 примитивов, 34 изменённых.
2. [x] Platform: слить OS в Platform — 2026-10-04 (Desktop web · Mobile web · iOS · Android · Site), чтобы не было двух осей про одно.
3. [x] Компоненты по аудиту — 2026-10-04: фокус у всех, зоны нажатия, состояния, motion (Smart Animate), «не только цветом», описания «Когда / Когда нет» + хаптики/Expressive в Figma, строки миграции для 24 компонентов. Без визуальной переделки (описания — и в Figma, и в доке: использование, цвета, A11y; дока потом → основа playbook): фокус у оставшихся 6, зоны нажатия, недостающие состояния, motion, «статус не только цветом», строка A11y и блок правил в описании, строки миграции для 24 компонентов.
4. [x] Хаптики: `haptic/*` в Platform + правило — 2026-10-04
5. [x] A11y-минимум: `contrast-more.css`, фокус и голосовое управление в components.md — 2026-10-04
6. [~] Проверка в старых и специфичных браузерах (просьба разработки): старый Safari iOS 15–16, Android WebView / старый Chromium, Samsung Internet, Firefox ESR, Яндекс Браузер. Проверяем: fallback без `backdrop-filter`, `perf-low`, `contrast-more`, `:focus-visible`, `dvh`/safe-area, кольцо фокуса, web-haptics. Можно отдельным чатом. — 2026-10-05: прогон сделан (Chromium 131, WebKit 2.52, caniuse/Baseline для старых), отчёт docs/browser-support.md, тесты `npm run test:browsers` / `test:compat`. Mac 2026-10-05: Chromium 153, Firefox 155, WebKit 26.6 — все проверки ✓. Осталось: web-haptics и safe-area/`dvh` — на устройствах.
12. [~] **DSP-готовность базы** (docs/dsp.md) — 2026-10-05: Foundations (code syntax, единицы) ✓, Icons ✓, статусы ✓, ~3 000 размеров привязано. Осталось: новые токены под ~1 700 значений (вопрос ниже), дробные значения Floating button, сверка описаний/доков с вариантами, публикация + DSP Export.
7. [ ] Ревью Стефана → правки.
8. [x] **Починить по итогам браузерного прогона (2026-10-05: (а)(б) — `scoped()` + `scope.css` в сборке; (в) — правило в visual-language.md) (решаем в основном чате DS):** (а) вложенный `data-brand` без `data-theme` не пересчитывает семантику — Geometria-карточка с фиолетовой Primary (важно для превью WL в админке, Storybook); (б) вложенная тема не задаёт `color`/фон — белый текст на белой карточке; (в) `light/ambient` через `filter: blur(160px)` → `radial-gradient` (дешевле, без полос в WebKit). Детали — docs/browser-support.md.
10. [ ] **Типографика и локализация** — правила по 19 языкам, проценты/числа/валюты через CLDR (Intl), Типограф в Figma (плагин + ux-copy), сборке переводов и Crowdin; компонент Amount; RTL (арабский), шрифты для неланинских письменностей. Черновик: docs/typography-l10n.md; противоречия с Редполитикой — на решение.
9. [ ] **Интерфейсный шрифт — заменить Roobert PRO на бесплатный** (Inter или другой из Google Fonts; решение Стефана 2026-10-05, решаем в основном чате DS): выбор шрифта, кегли/межстрочные под него, Figma Foundations + `font-family/*`, лицензия и подключение в вебе/Flutter. Сейчас за брендовым шрифтом в CSS стоит системный стек ОС (Apple — SF, Windows — Segoe UI, Android — Roboto) — это только запасной вариант, не выбор.
11. [~] **Производительность и загрузка** — 2026-10-05: `ds.min.css` одним файлом (на 3G CSS готов за 1.0 с вместо 2.6), перф-гард `build/js/perf.js` (деград по сети / памяти / реальным кадрам, во всех браузерах), `npm run test:perf`, CI на GitHub. Симуляторы iOS 17.5–26.3 и эмулятор Android 16 — ✓ (`test:ios`, `test:android`). Осталось: реальные устройства для скорости (бюджетный Android, старый ноутбук), передать разработке подключение (docs/performance.md), события `data-perf-reason` в Amplitude.


- [ ] На ревью: вывод в истории операций — минус красным (text/danger) или нейтральным? Красный читается как ошибка.

## Следующий этап — система целиком (решение Стефана 2026-10-05: «делай» по всем пунктам)

Порядок работы:
1. **Компоненты в коде + Design System для Claude Design** — артефакт «EMCD DS 2.0» (https://claude.ai/artifact/W2TgpSUQWd4Vb6FPLA75JJ): токены EMCD Dark/Light, брендбук, Button, Input, Badge, Amount (HTML/CSS на токенах, `emcd-*`), обложка. + Checkbox, Radio, Toggle, Select, Tabs, Segmented, Chip (2026-10-05). Стефан не уверен, что артефакт отрабатывает — проверить отображение. + Tooltip, Toast, Alert, Card, List item, Table, Pagination, Modal (19 компонентов в коде). Структура компонентов из Figma переносится вручную — пока так (Стефан: «плохо, но пока так»). Код компонентов не генерируется из Figma: токены синхронизируются пайплайном, а структуру компонента правим в коде вслед за Figma (вручную или с Claude).
2. **Недостающие компоненты** (Figma): ✓ Textarea, ✓ Breadcrumbs, ✓ Datepicker (Date cell + Calendar Single/Range), ✓ Multiselect (option, menu с поиском, поле), ✓ Address (Short/Full, копирование) + Address QR, ✓ Transaction (вывод/пополнение/начисление/обмен × выполнено/в обработке/отклонено), ✓ Status screen (Success/Error/Pending) — 2026-10-05; дальше: пароль с требованиями, Notification, шторка фильтров, плавающая кнопка, Textarea, загрузка файлов, хлебные крошки, шапка и футер сайта.
3. **Expressive в компонентах:** карточка, навигация, шапка, таббар, меню.
4. **Иконки:** брендовые наборы EMCD и Geo, залитые версии, библиотека символов (монеты, флаги), иллюстрации.
5. **Раскладки и шаблоны экранов:** сетки, типовые экраны, адаптив.
6. **Документация** (playbook уже есть — Стефан скажет, как связать).
7. **Упаковка для Claude Design / Figma Make.** 2026-10-07: синхронизация Claude DS из репо (docs/claude-ds.md); компоненты переносим в `claude-ds/components` по мере 🟡 beta (Icon button — следующий).

Шрифт: одного бесплатного шрифта на все письменности, похожего на Roobert / PP Neue Montreal, нет. Решение — Inter (латиница, кириллица) + Noto по письменностям; Noto — единственная суперсемья на все письменности, но гуманистичнее и шире. Сравнение: Foundations → «🔤 Шрифт · кандидаты».

## Парковка (после этапа)

- **Claude DS** (2026-10-07): (а) Icon button и остальные 🟡 beta — в `claude-ds/components`; (б) Geometria / WL в артефакте (сейчас только EMCD); (в) 26 draft-компонентов в артефакте по старому API (Error-типы, нажатие 0.98) — пересобирать по мере перехода в beta; (г) guidelines-markdown для библиотек Figma (агент Figma читает их при каждом промпте, GA 2026-10-06) — собирать из тех же источников?

- **Брендовый характер иконок** (вернуться после базы): Base/WL — чистый Lucide; EMCD и Geo — характер из брендбуков (EMCD: срез 18° как у символа E, «курсив» для навигации; Geo: «чертёж» — плоские концы, радиус 0, «построение»). Pool в Expressive — фирменные иконки разделов (Nav icon). Icons → «✦ Brand character · EMCD и Geo». Вопрос: шрифт Geometria — Onest (брендбук BB+) или PP Neue Montreal (продукты)?

- Expressive в компонентах: карточка, навигация, шапка/таббар, меню (роли уже в токенах).
- Палитра графиков, безопасная для дальтоников.
- **Найдено по похожести (2026-10-04)** → источники для компонентов DS 2.0:
  - Scrollbar: legacy DS Web «🔸 Scrollbar» — `base scrollbar` (puller, draggable state) и `scroll controller` (lg/md/sm); `🔸 Table / scroll` (default/hover/active). В продуктах (Web App, Monitoring) — сырой прямоугольник 4 px `#fafafa` «Scroll» в выпадающих списках, без компонента.
  - Индикатор страниц карусели: legacy DS Web `base carousel indicator` (selected 1–5, amount 5).
  - Степпер-счётчик шагов: `.🔸 slider counter` в Tooltip tour (DS Web и DS App; amount 3–7, step 1–7).
  - Datepicker: Monitoring — `PeriodGrid.Mobile` / `PeriodGridItem.Mobile` (сетка календаря).
  - Пагинация: не найдена ни по имени, ни по структуре в DS Web, DS App, Web App и Monitoring — спросить Стефана.
  - Затем: компоненты Scrollbar, Pagination, Page indicator, Skip link + список «недостающих» ниже.
- WL fallback, Monitoring-библиотека, Geometria Expressive.
- Пульт LG TV и других устройств, клавиатура, геймпады — пространственная навигация (стрелки/D-pad), крупный фокус на ТВ.
- Проверка компонентов на 200% текста.
- Демо.
- **Кнопки — пересмотр (визуально, на ревью):** Link и Tertiary дублируют друг друга; идея — Primary / Secondary / Tertiary все с подложкой, цвет от фиолетового к нейтральному, текст/ссылка — один отдельный стиль. Disabled местами сливается с фоном — проверить контраст на L0/L1/L2 в обеих темах.
- Vault на Яндекс Диске — решить, что туда складываем и подключаем ли к чатам.
- Описания компонентов из Figma → `docs/components-reference.md` (основа playbook) — выгрузить скриптом.
- На ревью: Selected у List item; Hover/Pressed ползунка Slider.
- Playbook: дока DS → основа существующего playbook.

Живой список. Закрытое — вычёркивать датой, не удалять.

## Вопросы к Стефану

- [ ] **Atomic design (2026-10-08):** пограничные — Toast, Alert, Banner, Notification, Card оставлены как молекулы; Amount, Floating button — атомы. Убрать что-то из них? Удалять ли инстансы удалённых организмов на служебных страницах (Шаблоны экранов, stress test, Expressive preview, Ревью, Playground)? Что дальше по базе — какой следующий шаг вместо отклонённых копий legacy?

- [ ] **Публикация Foundations (2026-10-07):** начертание во всех стилях привязано к `font-weight/*` (ревью Button), новый `radius/focus-ring-lg` (= radius/lg + 2, для кольца Card). После публикации: Components → Update all, привязать кольцо Card к `radius/focus-ring-lg`. Радиусы колец в Geometria: подобраны по значениям EMCD — проверить, что у Geo кольцо = радиус + 2 (иначе нужны токены «кольцо для каждого радиуса»).

- [ ] **Публикация (утро 2026-10-07):** Foundations (accent 600, Disabled 8/40, 19 токенов size/*) → Components: Update all → `scripts/figma/bind-sizes.plugin.js` → публикация Components. DSP: новые `--size-*`, `--layout-min-viewport` — minor; цвет `--text-accent` в светлой 500 → 600 — визуальное изменение, предупредить.
- [ ] **Дальше по карте legacy → 2.0 (следующий чат):** Select compact — legacy «Selector small» уже 1:1 (36, r10, pad 8, gap 16 / 6, иконка 24, шеврон 16); докрутка: зоны старого образца (`hit area · fine/coarse`) → web/app + Show hit area / safe area, ось Size. Menu / Menu item — legacy «Dropdown / Dropdown item» совпадает по сетке (обёртка pad 8 r12 + обводка, пункт 44 pad 10/12, r8); перенести из legacy: чекбокс мультивыбора **справа** (в 2.0 слева), левый слот 32 под монету/символ, подпись группы 12/18 Medium, скроллбар 4 px. Затем Multiselect (legacy multiselect_input, Dropdown wrapper: Default / Scroll / With divider / Not found), Chip, Tabs, Segmented, Badge… Code cell: добавить Hover (нет State=Default — другая схема вариантов).
- [ ] Кандидаты в deprecated (после перевода компонентов на слой больше не используются): `action/tertiary/hover|pressed`, `surface/hover|active`, `control/segment-hover`, `action/secondary/hover` — проверить в коде (DSP) перед удалением.

- [x] ~~**Неопубликованные изменения Foundations — проверка влияния (2026-10-06).** Отличий от того, что видит Components, пять: `control/surface/disabled`, `control/track-disabled` 4 → 8%, `control/knob-disabled` #fafafa → 40% (Checkbox, Radio, Toggle, Input, Select, Textarea, Input amount, Code input — ожидаемо), и `accent/fg-on-light` 600 → 500 → **меняет text/accent, text/link, icon/accent в светлой теме** (~25 компонентов). Контраст 500: violet L0 4.78 / L1 4.39 / L2 4.05 / L3 3.62; electric-blue (Geo) L0 4.38 — AA не проходит уже на карточке L1, у Geo — даже на L0. У 600: violet 6.15 / 5.64 / 5.20 / 4.66, Geo 5.70 / 5.23 / 4.83. **Предложение: вернуть 600** (hover 700, pressed 800). До решения Foundations не публиковать. Остальное (переименованные dimension/x0-*) — только алиасы, ломаться нечему. Легаси-переменные (Color 4 [Text], Basic color/*) остались в Nav icon — перепривязать.~~ — 2026-10-06: Стефан «делай»: возвращено 600 (hover 700, pressed 800), Nav icon перепривязан.
- [x] ~~**Правила цвета по состояниям не единые (аудит 2026-10-06).** Hover/Pressed пятью способами: слой `state/layer` 6/10% (Button, Icon button, Checkbox, Radio, Toggle, Menu item); `action/tertiary/hover|pressed` 8/12% (Chip, Date cell, Multiselect option, File upload, Pagination item, Scrollbar); `surface/hover|active` 8/12% (List item, Accordion, Nav item, Table header cell, Table row); `control/segment-hover` 4% в светлой (Segment); `action/secondary/hover` (Select compact); только цвет текста (Tab, Breadcrumb, Legend, ось графика). Нет Pressed: Date cell, Multiselect option, Nav item, Accordion, Table row, Select compact, File upload, Scrollbar. Нет Hover: Input amount, Code input. Баги: Floating button Hover/Pressed не меняется; File upload Disabled не меняется; Table cell / Toggle, Star, Icon, Buttons, More — Disabled не переключает вложенные инстансы. Selected тремя способами: accent/subtle 16% (Nav item, Pagination, Table row), сплошной primary (Date cell), `border/focus` обводкой (Chip cell — токен фокуса не по назначению). Input: полоска под подписью в разрыве рамки залита полупрозрачным `control/surface/disabled` — не перекрывает обводку. **Предложение — единая модель:** плашки → слой state/layer 6/10% (один `::before`); поля → `control/border/hover`, Focus — обводка + кольцо, без Pressed; текстовые → text/accent-hover|pressed или к text/primary; Disabled → плашка 8%, контент 40%, вложенные контролы в Disabled; Selected → accent/subtle + text/accent, сплошной — только выбранная дата и отмеченные контролы.~~ — сделано 2026-10-06, docs/components.md «Модель состояний».


- [ ] **Иконки по брендам (следующий этап после Button / Icon button)** — решение 2026-10-06: EMCD (pool, Monitoring) — наши legacy; Base и WL — Lucide; Geometria — пока Lucide, потом свои под бренд. План: отдельная библиотека на набор с одинаковыми именами `icon/<имя>`, компоненты DS ссылаются на имена, продуктовый файл переключает набор (Swap library); в коде одно API, набор SVG — по бренду.

- [x] ~~Лигатуры в текстовых стилях Foundations~~ — выключил Стефан 2026-10-05.

- [ ] **Button — 🟡 beta** (страница «🟡 Button»). Внешняя safe area привязана к `control/safe-margin`. Secondary · Danger → `action/danger-subtle/on` — привязано 2026-10-06. Следующий шаг после ок: заменить Button 2.0 (имя «Button», перевести инстансы в файле, опубликовать; API для DSP: Type × Tone — major, предупредить), затем Icon button по тому же шаблону.

- [x] ~~**Схлопнуть цветные типы кнопок осью Tone?**~~ — да (Стефан 2026-10-05), сделано. Type: Primary · Secondary (тинт) · Tertiary · Tertiary outline · Text · Inverted × Tone: Accent · Danger (у Primary, Secondary, Text). Error → Primary+Danger, Secondary error → Secondary+Danger, Text error → Text+Danger. Тинт-подложка у Secondary остаётся.

- [ ] **После публикации Foundations + Icons**: в Button привязать `action/accent/*`, `action/danger-subtle/*`, `action/danger/pressed`, `action/inverse/pressed`, тексты `accent/on-subtle` / `status/danger/on-subtle`; перекрасить `glyph` иконок по типу/состоянию; поверхности в доке → L0–L4; проверить фокус в тёмной.
- [ ] Курсоры в документации компонентов (pointer / not-allowed / progress) — по желанию Стефана, позже.
- [ ] **Button — документация** (Playground, фрейм «Button — варианты»): матрица Type × Size × State, блок свойств (Focus ring, Loading, иконки), поверхности L0/L1/L2 × Light/Dark. Кольцо фокуса и зоны нажатия растягиваются по кнопке. Ждёт публикации Foundations → привязать `action/accent/*`, `action/danger-subtle/*`, `action/danger/pressed`, `action/inverse/pressed` и тексты `accent/on-subtle`, `status/danger/on-subtle`. Вопрос: нужны ли все три danger-типа (Error, Secondary error, Text error) и Inverted? В тёмной теме Tertiary на L2 слабый (правило «контрол на уровень выше подложки» — L3).
- [ ] **Button · from legacy** (Playground, 144 варианта, API как у Button 2.0) — на ревью. Отличия от Button 2.0 намеренные: M уже 12 (14 → 12; Button 2.0 подтянет после обновления библиотеки), Tertiary outline на 2 px уже — обводка не раздвигает кнопку, как в legacy. После ок: заменить Button 2.0 (имя «Button», перевести инстансы), удалить «Button · legacy». Затем так же остальные компоненты.
- [x] ~~**Пилот переноса Button**~~ (1:1) — Стефан 2026-10-05: Small = 32, ориентир — значения 2.0; брать legacy как основу и дорабатывать до 2.0. Было: (DS Web baseButton → «Button · legacy», Playground)** — 44 варианта 1:1, свойства как в legacy, legacy-переменных 0. Значения вне шкалы / на решение:
  - Small высота 36 (10 + 16 + 10) — 36 нет в шкале;
  - Small текст 14/16 — в DS 2.0 Label/MD 14/20 (сейчас межстрочный привязан к `type/label/sm/line-height`, временно);
  - App: отступы Large 24 / Small 20 (Web 16 / 10) → нужны Platform-токены кнопки; у App ещё ось Invert и кнопки small 28 / xsmall 24;
  - legacy без Hover / Pressed / Focus / Loading — добавить из 2.0 (кольцо фокуса, a11y, motion);
  - замена Button 2.0 переносом меняет API (типы, размеры, Active) — major для DSP, предупредить разработку.

- [x] ~~**Токены под непривязанные размеры**~~ — решено 2026-10-05: шкала 2 4 6 8 10 12 16 20 24 28 32…, 14 → 12, кольцо 4, числовые `space/N` (docs/dsp.md). Было:: gap 6 (иконка↔подпись, ~557), padding 6/10/14/20/28/40, radius 2/3/6/9/13/18/20/28, обводка 2 вне фокуса и 3. Предложение: добавить шаги в шкалу (`space/*` 6·10·20·40 и `radius/2xs` 2) + компонентные токены там, где значение — внутренняя геометрия контрола; часть значений (3, 9, 13, 18) — подогнать к шкале ±1–2 px с записью в migration. Новые токены — minor, не ломают код.

- [ ] **Разработка Flutter: как определяем «мощное устройство»** для Expressive в App — список моделей, порог памяти/GPU, бенчмарк при старте? (style.md → «Когда включается Expressive»)
- [ ] **Разработка Flutter: что сейчас костылится на Android** — список мест (блюр, тени, шрифты/межстрочный, оверскролл, жесты назад, клавиатура, хаптики). Нужен для `os/*` в Platform (platforms.md).
- [x] ~~Золотые иллюстрации в Base~~ — снято 2026-10-04: это иконка монеты Luckycoin `ic_lucky_lky` (контент), одинакова в Base и Expressive.
- [x] ~~WL fallback~~ — решено: WL = EMCD Base на фоллбеках; бренд клиента → режим Brand как Geometria. Открыто: тема WL B2B (админка), иллюстрации Iconly.
- [ ] Яркие WL-акценты (лайм, жёлтый): исключение для фокуса — линия `neutral/800` в светлой теме.
- [ ] Visual language: нужны ли статусные пятна в тёмной теме; сила свечения иконки навигации; нижний край пятна фона темнеет.
- [ ] Внутреннее кольцо фокуса у Table header cell / Table row — сделано, посмотреть на ревью.
- [ ] Craftwork MCP/skills: в этом чате не подключены (в каталоге коннекторов claude.ai их нет). Подключить как custom connector или смотреть рефы из Claude Code.

- [x] ~~**Палитра графиков для дальтоников**~~ — решено 2026-10-04 (без бренда, см. выше): сейчас первые 4 цвета путаются (ΔE 2.5). Безопасный порядок: violet · lime · teal · amber (ΔE ≥ 10), дальше путаются при любом наборе → для 5+ серий подписи и штрихи. Ок использовать лайм в графиках (он «редкий супер-акцент»)? Без лайма: violet · yellow · teal · orange (ΔE 9). `scripts/chart-palette-cvd.py`.
- [ ] На ревью: Selected у List item; Hover/Pressed ползунка Slider; новые кнопки (Button и Icon button); отличия от legacy-форм — кегль контролов 16→14, радиус Modal 16→24 и Sheet 12→24, Avatar 44→56, Counter 10→12 (`migration/legacy-forms-check.md`).

- [ ] **Иконки** — решения Стефана 2026-10-04: перерисовываем **все**, включая наши оригинальные (есть адекватная замена в Lucide — меняем); иконки — часть бренда, развиваем характер; залитые версии — для части (активная навигация, избранное и т. п.), список собрать; составные/многоцветные — в Media внутри компонентов; Flutter пока SVG. Стефан проходит доску «Selection 2».
  - Вопрос к разработке: иконочный шрифт вместо SVG для Flutter?
  - Iconly Pro — отказались (2026-10-04).
- [ ] **Символы** — решения 2026-10-04: монеты цветные, светлая и тёмная версия + монохром третьим вариантом; фиат — только используемые валюты; флаги круглые + тонкая обводка (чтобы белое не сливалось с фоном в обеих темах); платёжные системы — пока не нужны; акции xStock и Coinhold-монеты — живут в CHW; статусы — в Media, иконки статусов не нужны. Стефан проходит доску «Symbols · selection».
  - Найдено: «отсутствующие» 10 монет майнинга есть в legacy Icons старым поколением `ic_*` (FB, CAU, DINGO, JKC, PEP, BEL, LKY, BONK, ALPH); BCH — `ic_bitcoin_cash_bch` в другой библиотеке. Ошибка legacy: в Icons под именем `ic_bitcoin_btc` лежит зелёный BCH — в Components заменён на `smbl-bitcoin-btc` (68 инстансов).
  - Официальные логотипы монет — поискать и принести.
- [x] ~~Минимальные версии браузеров~~ — 2026-10-05: два уровня по Baseline + statcounter, см. docs/browser-support.md.
- [x] ~~Expressive в Safari/Firefox~~ — 2026-10-05 (пересмотрено): Expressive во всех современных движках (Chromium 76+, Firefox 103+, Safari / iOS 18+), старые → Base. Нужен переключатель «Упрощённое оформление» в продукте — Safari/Firefox не сообщают «Понижение прозрачности».

## Отложено (сделаем позже)

- Демо: доработки (Стефан: «разъеб, но есть места»).
- Ревью этапа: Стефан соберёт ревью (вместо Loom) после текущего этапа.
- Привязать компоненты к ролям Style: карточка-аналог legacy `surface`, Nav item / Sidebar (свечение иконки + кромка), шапка/таббар (материалы, прогрессивный блюр), меню/поповеры (thick).
- Фокус: Slider (на ползунке), Badge, аддоны инпута (Max, Stepper), брендовая обводка в фокусе у Checkbox.
- Аудит компонентов: зоны нажатия, недостающие состояния, motion, хаптики (`platform/haptic/*`), блок правил, строки миграции для 24 компонентов.
- Таблица миграции Foundations — перегенерировать от опубликованных Foundations (`foundations-color.csv`).
- Страница «🎨 Ramps · OKLCH» — обновить под 13-шаговые рампы.
- Порядок переменных в Primitives (новые встали в конец).
- Недостающие компоненты: Datepicker/период, Multiselect + Search, адрес + копирование + QR, CoinStack, карточка транзакции (DS App «Txn»), экран статуса (DS App), пароль с требованиями, Payment Card (DS App), Notification (DS App), Filter bottom sheet, Button float, шапка и футер сайта, пагинация; не искали — загрузка файлов, хлебные крошки, textarea.
- DS Site — не сканировали на декор.
- Временный фрейм «_focus check (temp)» на 🧪 Playground в Components — удалить после просмотра.
