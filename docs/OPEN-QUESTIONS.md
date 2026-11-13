# Открытые вопросы и отложенное

## Этап 1 — Token Migration & Mapping (с 2026-10-09; закрыт, работа идёт над компонентами — см. HANDOFF)

Бриф Стефана 2026-10-09. Таблица одна: Foundations «🔁 Migration · legacy → DS 2.0» (28:3) ← `docs/migration/color-map.csv` → `scripts/color-migration.py`. Foundations-переменные без ок Стефана не меняем.

Чеклист:
1. [x] Точка восстановления Components окончательная; изменения Foundations (уровни и др.) остаются — Стефан 2026-10-09.
2. [x] Экспорт Foundations → `npm run all` — 2026-10-09.
3. [x] Таблица с новыми колонками (Примитив, Action, Статус, Решение, Потребители, Контраст) — 96 строк, ок Стефана «хоть на 30 строк», «по таблице сам разберись».
4. [x] Скан потребителей: DS Web, DS App, DS Site, Web App, App, Firmware, WL B2B, Geometria Web, сайт (Website EMCD + USA) ✓ (2026-10-09); Monitoring — все 27 страниц (досканировано 2026-10-09: Color 6 / 7 [Back] и Error disabled там используются → Merge, не Deprecate; найден сторонний UI-кит `Variables › Theme/*` ~530 привязок → этап 2). Geometria App (`FIGMA_FILE_KEY_REDACTED`) — досканирован: своя локальная `Pallete` (копия legacy Color в светлой Geo-версии) + библиотека Geo Web. ⚠ одно имя — разные роли: у Geo Color 3 [Text] светлее Color 4 (обратно EMCD), Color 5 [Text] — почти чёрный (у EMCD — disabled); «accent» у Geo = бренд, у EMCD = лайм → мапим по значению, не по имени. MiningBox — макетов нет. **Скан закрыт.** Landings — переменных нет, всё сырыми цветами. WL B2B — своя локальная палитра `pallete` (~70 тыс. привязок), Geometria Web — своя локальная коллекция `Collection 1` (116 токенов, ~50 тыс.); сайт — в основном сырые `Neutral/*` (~40 тыс.). Таблица — 146 строк. В App нашлись ещё 3 Core-алиаса (Text primary / primary invert, Shade hover) — добавлены.
5. [x] **П1 — контраст цветного текста** — сделано 2026-10-09 (ок Стефана «ок, только системность»): правило «ближайшая к 500 ступень с ≥ 4.5 на L0–L2, на L3 цветной текст не ставим» для всех цветов, contrast-more — +1 ступень от темы. Стефан опубликовал и обновил Components; «некоторые места не нравятся» — ждём, какие. Было предложение: (на решение, Foundations): `text/danger` тёмн. red/500 → 400 (L0–L3 6.2 → 4.7); `text/warning` свет. amber/700 → 800 (7.3 → 5.6); `text/info` свет. blue/600 → 700 (6.8 → 5.1); `text/accent` на L3 4.3 — правило «цветной текст на L3 не ставим» (или accent 700 / 300). То же для `icon/*`.
6. [x] Conflict-строки — 2026-10-14, по экранам: Core `Color focus` (#1a1a1a) → карточка `surface/level-1` (тёмная 1:1) / кнопка `action/secondary/default` / тултип `surface/raised`; `Color accent` (#111111) → фон экрана `surface/level-0` / шторка `surface/raised` / трек Toggle `control/track`; `Color › border` = значение `theme · surface/base` → `border/subtle` / `border/strong` (источник — неопубликованная библиотека; Monitoring 255 — сверить на тест-стенде этапа 2); `Back [Primary] 2` = #380d66 (Badge primary DS App) → `accent/subtle`; Geo App Color 4 / 35 [Back] — по роли текст и иконки → `text/tertiary` / `icon/tertiary`, счётчик табов → `border/default`, accent base → `text/accent` / `icon/accent`, Inactive → `icon/primary`. Conflict в таблице — 0, рамка 28:3 обновлена (181 строка). Стефан 2026-10-16: Δ `Back [Primary] 2` (#380d66 → альфа-тинт, как строка сайта) — «наверно ок», проверить на примерах (бейджи на тест-стенде этапа 2); Geo Inactive (только (old)-страницы) — проверить, живы ли эти страницы, тогда решить. **2026-10-16:** Geo Inactive → Deprecate (в актуальных страницах не используется); Monitoring `Color › border` — 187/255 проверено, все обводки карточек → `border/subtle`; `Back [Primary] 2` — это **Pressed** tinted-бейджа (18 из 18, DS App), Default того же бейджа — `Brand disable` (сейчас ошибочно → `action/disabled`). Предложение: `Brand disable` в бейджах → `accent/subtle`, `Back [Primary] 2` → `accent/subtle` + `state/layer` 10 % (Deprecate, D-state) — ждёт ок.
7. [x] Deprecate без потребителей (accent soft / bold / background) — подтверждено 2026-10-14: 0 во всех продуктах, скан закрыт.
8. [x] Claude DS — синхронизирован 2026-10-09 (7acf9d0); последняя синхронизация — 2026-11-12 (4566f20).

Решено по конфликтам (2026-10-09): К1 принятые Δ остаются («Δ принято» со ссылкой на решение); К2 Vault — история; К3 текущие решения важнее блюпринта; К4 → `components.md` «Модель обводок»; К5 → `docs/component-contract.md`.

## Следующий этап — Этап 2: Component Token Migration (готовим)

Перепривязка без визуальных изменений, кроме принятых Δ. Из аудита обводок (2026-10-09):
- = (значения совпадают): Button Tertiary outline, Icon button outline, Chip — `border/default` → `control/border/default`; Chip Disabled `border/subtle` → `control/border/disabled`; File upload Default `border/default` → `control/border/default`.
- **Доска v2 (2026-10-16): «_На решение · обводки v2 (этап 2)»** на 🧪 Playground — 7 таблиц, все состояния, Light / Dark, сейчас / стало; Δ только File upload Hover и Banner. **Banner — на решение, 3 варианта:** legacy Web (цветная рамка + цветная иконка), legacy App (тонированная заливка, текст цветом статуса), «как Toast» (surface/raised + border/subtle, статус иконкой — тогда иконку красить цветом тона; сейчас icon/primary у Banner и Toast). Старая доска «_На решение · обводки (этап 2)» — история: Решено 09.10: № 2 Code cell Success — оставить сплошной (полупрозрачный слишком светлый); № 13 Button outline Disabled — не менять. На решении: № 1 File upload Hover → нейтральный; № 3–6 Banner → `status/*/border`. № 7–12 — без визуальных изменений.
- Сырые примитивы на экранах продуктов (Web App ~4,5 тыс. `Neutral/*`) — по роли слоя, на тестовых копиях экранов.
- Тест-стенд: копии насыщенных экранов Mining Web / App → до / после.

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
9. [x] ~~**Интерфейсный шрифт — заменить Roobert PRO на бесплатный** (Inter или другой из Google Fonts; решение Стефана 2026-10-05, решаем в основном чате DS): выбор шрифта, кегли/межстрочные под него, Figma Foundations + `font-family/*`, лицензия и подключение в вебе/Flutter. Сейчас за брендовым шрифтом в CSS стоит системный стек ОС (Apple — SF, Windows — Segoe UI, Android — Roboto) — это только запасной вариант, не выбор.~~ **Снято 2026-11-06:** Roobert не заменяем; база — Inter + Noto, продукт выбирает шрифт через Brand.
11. [~] **Производительность и загрузка** — 2026-10-05: `ds.min.css` одним файлом (на 3G CSS готов за 1.0 с вместо 2.6), перф-гард `build/js/perf.js` (деград по сети / памяти / реальным кадрам, во всех браузерах), `npm run test:perf`, CI на GitHub. Симуляторы iOS 17.5–26.3 и эмулятор Android 16 — ✓ (`test:ios`, `test:android`). Осталось: реальные устройства для скорости (бюджетный Android, старый ноутбук), передать разработке подключение (docs/performance.md), события `data-perf-reason` в Amplitude.


## Следующий этап — система целиком (решение Стефана 2026-10-05: «делай» по всем пунктам)

Порядок работы:
1. **Компоненты в коде + Design System для Claude Design** — артефакт «EMCD DS 2.0» ((ссылка в `docs/private/LINKS.md`, не в git)): токены EMCD Dark/Light, брендбук, Button, Input, Badge, Amount (HTML/CSS на токенах, `emcd-*`), обложка. + Checkbox, Radio, Toggle, Select, Tabs, Segmented, Chip (2026-10-05). Стефан не уверен, что артефакт отрабатывает — проверить отображение. + Tooltip, Toast, Alert, Card, List item, Table, Pagination, Modal (19 компонентов в коде). Структура компонентов из Figma переносится вручную — пока так (Стефан: «плохо, но пока так»). Код компонентов не генерируется из Figma: токены синхронизируются пайплайном, а структуру компонента правим в коде вслед за Figma (вручную или с Claude).
2. **Недостающие компоненты** (Figma): ✓ Textarea, ✓ Breadcrumbs, ✓ Datepicker (Date cell + Calendar Single/Range), ✓ Multiselect (option, menu с поиском, поле), ✓ Address (Short/Full, копирование) + Address QR, ✓ Transaction (вывод/пополнение/начисление/обмен × выполнено/в обработке/отклонено), ✓ Status screen (Success/Error/Pending) — 2026-10-05; дальше: пароль с требованиями, Notification, шторка фильтров, плавающая кнопка, Textarea, загрузка файлов, хлебные крошки, шапка и футер сайта.
3. **Expressive в компонентах:** карточка, навигация, шапка, таббар, меню.
4. **Иконки:** брендовые наборы EMCD и Geo, залитые версии, библиотека символов (монеты, флаги), иллюстрации.
5. **Раскладки и шаблоны экранов:** сетки, типовые экраны, адаптив.
6. **Документация** (playbook уже есть — Стефан скажет, как связать).
7. **Упаковка для Claude Design / Figma Make.** 2026-10-07: синхронизация Claude DS из репо (docs/claude-ds.md); компоненты переносим в `claude-ds/components` по мере 🟡 beta (Icon button — следующий).

Шрифт: одного бесплатного шрифта на все письменности, похожего на Roobert / PP Neue Montreal, нет. Решение — Inter (латиница, кириллица) + Noto по письменностям; Noto — единственная суперсемья на все письменности, но гуманистичнее и шире. Сравнение: Foundations → «🔤 Шрифт · кандидаты».

## Парковка (после этапа)

**Источник правды и паритет Figma ↔ код (2026-10-30)**, вернуться после Base:
- **Источник правды — Figma (сейчас) или код / контракт?** Повод: статья Christine Vallaure «Building an AI-ready design system» (christinevallaure.substack.com/p/building-an-ai-ready-design-system), тезис «код главнее, Figma — зеркало». Сейчас правда — Figma (`dsp.md`, HOW-IT-WORKS).
- **`GAPS.md` в миграции компонента:** что не выражается в Figma, что решили, что проверить руками. Рядом с `component-contract.md` / `migration/`.
- **Parity-проверка:** манифест из Figma против манифеста из кода / playground DSP (имена, свойства, значения, дефолты), сравнение скриптом, без ИИ. Встроить в рутину синка и смены статусов.
- **Code syntax на Figma-переменных и описание, написанное один раз и перенесённое в Figma** — проверить, что это есть. Аудит DSP 2026-10-05: code syntax WEB у всех 720 переменных (`dsp.md`). Описания компонентов пишутся в Figma; выгрузка в доку — пункт «Описания компонентов из Figma → `components-reference.md`» ниже. Проверить новые переменные после 10-05 (`status/neutral/solid`, fallback-шрифты) и обратное направление «описание → Figma».
- **Nathan Curtis, компонент как данные** (spectacular.systems) — возможный способ закрепить правила применения вариантов (вместе с моделью выбора в `component-contract.md`).

- **Формат токенов → DTCG 2025.10 (2026-10-14, после этапа 2):** сейчас `tokens/**` — черновик DTCG: цвет `"#hex"`, dimension `"320px"`, duration `"0ms"`, cubicBezier строкой CSS; типов `boolean` / `string` (74 токена) в спеке нет. В 2025.10: цвет `{colorSpace, components, hex}` (рампы можно хранить в OKLCH как есть), `{value, unit}`, cubicBezier `[x1, y1, x2, y2]`, тип transition. Менять: `scripts/figma-to-dtcg.mjs` + трансформы `build.mjs` (SD 4.3 → проверить 2025.10 в SD 5); `build/**` для разработки не меняется — проверить диффом. `boolean` / `string` → `$extensions` или оставить вне спеки. Плюс: внешние валидаторы и инструменты читают без адаптеров.
- **Линт токенов в CI** (после перехода на 2025.10): схема, битые ссылки, дубли значений — Terrazzo `tz lint` или Design Token Kit → `.github/workflows/ci.yml`.
- **Signal (Archetype AI, 2026-11-04) → после Base**, детали и таблица — `docs/references.md`: (а) `ds-manifest.json` рядом с `design.md` / `llms.txt` — один манифест и для агента, и для parity-проверки; (б) пара «кегль + line-height + letter-spacing» у каждого шага, запрет раздельной настройки; (в) пол 10 px для плотных метаданных; (г) метрически подогнанные fallback-шрифты + preload при замене Roobert; (д) отдельные `surface/table*`; (е) толщина иконок по роли; (ж) базовый слой: структурные теги наследуют размер. (з) **Скроллбар на `*` — проверено 2026-11-04, откат:** правило `* { scrollbar-color: var(--scrollbar-thumb) transparent; scrollbar-width: thin; }` отдельным слоем в `build.mjs` — `test:browsers` и `test:perf` зелёные, `build/**` менялся только добавлением, но `test:compat` (doiuse, floor из `browserslist`) падает: `scrollbar-color` / `scrollbar-width` не поддержаны в Safari iOS 15.4–26.1 и частично в Chrome / Edge 109–120, Safari desktop, Samsung 21–24. Токены `scrollbar-track` и `scrollbar-width` в теме отсутствуют (есть только `scrollbar/thumb`, `thumb-hover`). Решить: добавить `css-scrollbar` в `ignore` у doiuse (свойства — прогрессивное улучшение, неподдерживающие браузеры его игнорируют) или поднять floor; тогда вернуть слой (после `scope`, в `order`). Track / width — новые токены в Foundations, только по слову Стефана.
- **Agent-ready слой DS (отчёт Design Compass, 2026-10-14) → этап 3, вместе с Claude DS (г):** короткий `design.md` (принципы, роли цвета по смыслу, правила выбора паттерна, без исключений) + `docs/components/<name>.md` + `llms.txt` из описаний Figma; токены и компоненты не заменяет. Модель выбора → `component-contract.md` (эвристики автора — сверить с продуктами): Toggle — бинарное, применяется сразу; Segmented — одно из 2–5, сразу; Radio — одно из N в форме, по Submit; Checkbox / Chip — несколько; Select — длинный список; выбранный фильтр не похож на CTA.
- **Иконки — каноническая карта «действие → иконка»** (search, settings, delete, copy…) + сборка падает на несуществующем имени → вместе с «Иконки по брендам».
- **Аудит паттернов на экранах Mining (этап 2–3, из отчёта):** поле адреса кошелька и настройки выплат (лейбл всегда виден, ошибка не раньше конца ввода, вставка, сеть); CTA вывода (глагол вместо «ОК», async-состояния, причина Disabled, подтверждение необратимого); табы и фильтры Pool / Monitoring (URL-state, скролл на мобиле, длинные переводы).
- Не берём (2026-10-14): Tokens Studio — источник правды Figma Variables + наш экспорт через use_figma; Penpot — работаем в Figma; Terrazzo вместо SD — нет Flutter-выхода; TokensBrücke вместо нашего экспорта — наш идёт из чата без ручных шагов (сверить с ним motion при переходе на 2025.10); shadcn / HeroUI / 21st.dev, Tabler / Phosphor из отчёта — у нас свои компоненты и каркас Lucide. Карусель 2: Animos (анимированные презентации), Tegaki (анимация шрифта по штрихам), Meshfont (редактор шрифтов) — не про DS.

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

## Правки 2026-10-30 (отчёт разработчика, подробности — HANDOFF «Состояние на 2026-10-30»)

- [x] Button на переменных (отступы, gap, min-width; Text → `space/4`); Input paddingTop / notch на `space/8` / `space/2`; Badge → `icon/*`, счётчик вынесен в Counter; Brand `radius/focus-ring-lg` code syntax; web code syntax у `surface/current` и у 5 прежних переменных.
- [x] Publish Foundations + Components — Стефан (2026-10-30).
- [ ] Повторный DSP Export (VPN) — делает разработчик; после «Отправлено» записать дату в HANDOFF.
- [x] Хвост: у Brand `radius/focus-ring-lg` (EMCD, WL) значение 18 — в примитивах нет `dimension/18`; у индикатора Tab 24 варианта с радиусом 1 px без привязки. **Решено 2026-11-06:** `dimension/18` — исключение (см. решения 06.11; индикатор Tab 1 px — в реестре исключений).
- [ ] Символы: переименовать 9 монет `ic_*` → `smbl-*` в legacy-библиотеке (нет только Bitcoin Cash); проход Стефана по доскам выбора v2 («Символы» 296, «Иконки» 131).
- [ ] Привязать к переменным: gap у Chart и Floating button; углы у Date cell.
- [x] Список исключений — `docs/exceptions.md` (2026-11-06): кольцо фокуса (18, отступ 2), Card content, столбики Chart, радиус 1 px индикатора Tab, бейдж сети Coin, Sheet 34 px (временно, до `os/safe-area/*`). Открыто: исправить найденные без токена (`itemSpacing`, обводка 1 / 1.5 / 2, радиус 12 у Tab bar item) — правит основной чат в Figma.
- [x] Идея: токен `os/safe-area/bottom` — решить, нужен ли (Sheet, Floating button, Tab bar). **Решено 2026-11-06:** заводим `os/safe-area/top|bottom|left|right` (см. решения 06.11).
- [x] **Откат 2026-10-30 (решение Стефана):** APCA-правки токенов (`df4aecb`) откачены — цветной текст в тёмной стал пастельным; Figma Foundations возвращена к состоянию `9c32fec`, экспорт и сборка совпадают с ним. Уровни Lc остаются целевыми, для цветных ролей (text/accent, link, danger, success, warning, info) не обязательны, пока дизайнер не выберет промежуточные шаги; 135 пар требовали сдвига ΔL > 0.12. В CI APCA — отчёт без `--strict`. Что делать с цветными ролями — решает Стефан, ничего не применять без его слов.
- [x] **Контраст APCA: решение «полшага» (Стефан, 2026-10-30).** Тёмная тема: цветной текст и иконки `danger`, `success`, `warning`, `info` и accent (`text/accent`, `link`, `icon/accent`) — на полшага по шкале, а не пастель и не откат. Новые примитивы `color/violet|electric-blue|red|blue/350`, `green|amber/450`; Brand `accent/350`, `accent/fg-on-dark` → `accent/350`. Цвет выбран по виду. Lc цветных ролей в тёмной (44–51, warning 62) **ниже цели 75 осознанно**; цель, не обязательный уровень. Нейтральные и границы как до APCA (secondary 65, tertiary 44, `border/strong` 25–29). Light — 10 пар на 1–10 пунктов ниже. `docs/apca-token-proposal.md` остаётся «НЕ применено». В CI APCA — только отчёт, `--strict` выключен.
- [x] Структура библиотек Icons / Symbols / Illustrations (+ логотипы брендов) — **решено 2026-11-09:** Symbols и Media остаются в файле Icons на время Base, разнос после.
- [x] Beta в Figma (`Status: beta` в описании, 2026-11-04): Chip, Tab, Status, Tab bar item, Breadcrumb item, Checkbox, Radio, Toggle, Input, Textarea, Badge, Counter, Segment (+ Button, Icon button). Осталось: сверить с `component-contract.md` п. 1–6, 9, 10, 12, 15 и чеклистом 14; статусы README / Claude DS не менялись.
- [x] **Решения Стефана 2026-11-06:**
  - **Tooltip tour** — вне базы: расширение Tooltip вместе с тултипами графиков; компонент уже собран, не развивать.
  - **Roobert не заменяем** (пункт 9 этапа 1 снят): база на шрифтах с покрытием языков (Inter + Noto), продукт выбирает шрифт через Brand.
  - **Охват:** организмы, виджеты, лейауты и Expressive обязательны; этап 2 параллельно, начало с пула, потом Monitoring.
  - **Tab bar:** 57 = 56 + 1 px линия, safe area 34 отдельным слоем — принято.
  - **Safe area:** токены `os/safe-area/top|bottom|left|right` в Platform и слой Safe area; у контролов свойство «Show safe area» переименовать в «Safe margin» (`control/safe-margin`). Правит основной чат; экспорт в репо — после Publish. (Токен `os/safe-area/bottom` из «Идеи» — решено: заводим.)
  - **`dimension/18`** для `radius/focus-ring-lg` — документированное исключение (реестр `docs/exceptions.md`).
  - **Toast:** Success и Info 5 с, Warning 8 с, Danger не закрывается сам; стек до 3, зазор 8; пауза при hover и фокусе; Web справа сверху, App сверху.
  - **Suggest:** иконка в цвет текста. Минус в истории и WL яркие акценты — приняты.
  - **Библиотеки:** Symbols и Media пока остаются в файле Icons (понято так, подтвердить).
- [x] **Решения Стефана 2026-11-09 (ответы на доски «⚑ Решения · от тебя»):**
  - **Foundations:** 1 A — правила WL с яркими акцентами приняты (текст на заливке чёрный или белый по контрасту; цветной текст по П1; нейтральное кольцо фокуса, когда контраст бренда ниже 1.5). 2 A — `dimension/18` документированное исключение (как 06.11). 3 A — токен `os/safe-area/bottom` в Platform, значения по платформам (как 06.11, вместе с top / left / right). 4 A — токены `action/tertiary/hover|pressed`, `surface/hover|active`, `control/segment-hover`, `action/secondary/hover` → Deprecated сейчас, удаление в следующем major; перед этим проверить использование в репо и playground. 5 B — `docs/typography-l10n.md` главнее Редполитики; Редполитику правим по таблице «Расхождения» (Confluence MRKTNG 2388656283).
  - **Components:** 1 A — beta у 13 остаётся как есть (вариант D с прогоном ядра и пометкой не берём). 2 C — Sidebar и Select compact: слот руками (по замыслу); Table header cell и Table cell / Buttons: булевы свойства Show filter, Show info, Show more. 3 A — сводный промпт для Code собираем после обработки ответов и Publish.
  - **Icons:** 1 A — все пять иконок остаются (`arrow-down`, `arrow-up`, `refresh`, `sort-up`, `user`). 2 A — Symbols и Media остаются в файле Icons на время Base, разнос после. 3 A — логотипы систем (`media/os/*`) приняты как есть.
  - **Toast (решение Стефана 2026-11-09):** Toast = `Layout` Card | Informer (Informer он же Header, мобильный, цветная шапка); **Snack — отдельный компонент**, выносится из набора Toast. **Сделано в Figma 09.11 (опубликовано Стефаном):** набор Snack на странице «🟠 Snack» (5 вариантов `Tone` = Neutral | Info | Success | Warning | Danger; свойства Title, Icon, Action; 343×48), в Toast остались Card | Informer (10 вариантов), свойство «Snack action» удалено, описания обоих обновлены; 14 экземпляров Snack на борде Toast целы. Не сделано: борда Snack по шаблону v3, тексты про Snack на борде Toast. Для разработки: Toast без Snack (MAJOR: значение `Layout=Snack` уходит), Snack — новый компонент (MINOR).
  - **Components 2 C (2026-11-09):** Table header cell — булевы переименованы «Filter icon» → «Show filter», «Info icon» → «Show info» (46 экземпляров без изменений переопределений). Sidebar и Select compact — слоты, менять не нужно. Не сделано: «Show more» у Table cell / Buttons (в ячейке три кнопки «Button 1–3», булевы «Button 2» и «Button 3»; неясно, какая из них «…» — спросить Стефана); слой Safe area и «Show safe area» → «Safe margin».
  - **Safe margin и OS Safe area (2026-11-09, в Figma, Publish сделан Стефаном):** «Show safe area» → «Safe margin» в 21 наборе; имена слоёв `safe area · outer|content` не менялись. Слой «safe area» у Tab bar → `os/safe-area/bottom`; нижний отступ Sheet Type=Menu → `os/safe-area/bottom` (исключение Sheet 34 px снято); слой «safe area» у Toast Informer → `os/safe-area/top` (iOS 59 вместо 47).
  - **Решения Стефана 2026-11-09 (после замечаний разработки):** Left / Right → Start / End (Tooltip не меняем); единое кольцо фокуса (OUTSIDE, 2 px, токены радиуса); завести токены размеров и привязать; Input, Textarea, Select и подобные поля — одна база (один компонент с вариантами); для цвета иконки нужно правило (`docs/preflight.md`). Подробности — `docs/component-audit-2026-11-09.md`.
  - **Следующие шаги:** Deprecated-метки в Foundations + экспорт; токены `os/safe-area/*` и слой Safe area (решено 06.11); Components 2 C; Редполитика — список правок; синк статусов в репо и Claude DS; затем Publish Foundations → Components → Icons (за Стефаном) и сводный промпт для Code.
- [x] **Закрыто 2026-11-04:** Multiselect (молекула: Display Count | Chips × Default | Open | Error | Disabled, борда v3); Table cell / Transaction Direction Debit → Unexpected; Alert / Toast / Banner — глифы по тону, Alert с иконкой по умолчанию, Banner `border/subtle`; Skeleton — shimmer скрыт в мастерах; Icons — решения по рекомендациям.
- [ ] **Открыто (Components, этап 2):** Hover/Pressed по одному правилу (см. аудит 2026-10-06); тест-стенд этапа 2 — план в HANDOFF (Duplicate Web App / App → Foundations в копиях → страница «🧪 DS 2.0 тест», экраны «Выгрузка», «Воркеры», «Дашборд»; ждёт копий от Стефана).
- [x] **Icons (2026-11-05):** логотипы систем (`media/os/*`) — **приняты как есть 2026-11-09** (HiveOS с растра, Linux не добавляем). Фиат (64) в архиве «🗄 Symbols · фиат».
- [x] **Сообщения — решение Стефана 2026-11-05:** **Решение Стефана 2026-11-05 (по примерам продукта): Alert и Banner — один компонент Banner (suggest).** `Layout=Card|Strip` × `Tone=Neutral|Accent|Info|Success|Warning|Danger`; слот слева (`media/status/*`, логотип или монета); 0–2 кнопки (Primary action, Secondary action); крестик absolute top-right. Alert deprecated, страница в архиве. **Toast — отдельный:** `Layout=Card` (Web) | `Header` (мобильный, цветная шапка) × Tone; иконки `media/status/*`. Роли различаются слоем и постоянством: Toast — поверх, исчезает; Banner — в контексте страницы, остаётся. Название «Banner» (альтернативы Alert, Suggest) — на подтверждении. Примеры продукта (Web App, «Выгрузка»): Toast справа сверху + полоса suggest (акцентная подложка, одна кнопка) + Sidebar banner (промо) на одном экране; inline Alert 480×66 с кнопкой; мобильный Banner 343×152 (промо с кнопкой). Промо-карточки — не системные сообщения, это Card.
- [x] **Имя Suggest (Стефан, 2026-11-05):** объединённый компонент сообщений (бывшие Alert и Banner) — Suggest; страница «🟠 Suggest», набор Suggest, Layout=Card|Strip × Tone, слот слева, 0–2 кнопки. Toast отдельный.
- [x] **Открыто (Сообщения):** таймер и стек Toast (≤ 3); позиции (Web справа сверху, App сверху); иконки в Suggest Accent / Neutral. **Решено 2026-11-06:** Toast — Success и Info 5 с, Warning 8 с, Danger не закрывается сам; стек ≤ 3, зазор 8; пауза при hover и фокусе; Web справа сверху, App сверху. Остаётся: иконки в Suggest Accent / Neutral — иконка в цвет текста (решено).
- [x] **Новые компоненты (2026-11-05, закрывают пробелы тест-стенда «Выгрузка» и сверки с legacy DS Web):** **Coin** (атом, XS–XL, монета сети), **Coin stack** (2–4), **Radio card** (карточка-выбор с деталями), **Date range field** (диапазон дат); борды v3. **Input** — `Show inline` по умолчанию выкл. Закрыты пункты (2) монета / группа аватаров (компоненты Coin, Coin stack), (3) DateRange, (4) Radio card, (5) Input inline из списка ниже.
- [x] **Пробелы по legacy DS Web закрыты ночным проходом 05–06.11:** слот слева у Select (свойство Show leading + Coin / Coin stack), панель периода (Date range panel), Dropdown panel, Tooltip tour, Promo card, Circle timer, Overlay. Остаются: fill, min / max ширина у Select, Input, Button; платёжные системы и логотипы EMCD в Media.
- [x] **Ждал ответа Стефана (доски «⚑ Решения · от тебя», 2026-11-06) — отвечено 2026-11-09, см. «Решения Стефана 2026-11-09». Открытыми остались только Visual language (Expressive, можно позже) и вопрос разработке про Flutter: иконочный шрифт или SVG (за Стефаном). Исходный список:** Components — (1) Beta у 13 (A оставить / B откатить часть / C прогнать контракт по всем / D оставить и прогнать ядро за неделю; рекомендация D; статусы в репо и Claude DS не менять до ответа), (2) слоты вложенных экземпляров (A руками / B свойствами / C смесь; рекомендация C: Show filter, Show info, Show more булевыми), (3) сводный промпт для Code (рекомендация B). Foundations — WL яркие акценты (правила П1, нейтральное кольцо фокуса при контрасте бренда < 1.5), Deprecated-токены (`action/tertiary/hover|pressed`, `surface/hover|active`, `control/segment-hover`, `action/secondary/hover`; рекомендация: Deprecated сейчас, удалить в следующем major), typography-l10n vs Редполитика (рекомендация: Редполитика главнее), Visual language (статусные пятна в тёмной, сила свечения иконки навигации, нижний край пятна). Icons — пять иконок на удаление (`arrow-down`, `arrow-up`, `refresh`, `sort-up`, `user`; рекомендация: проверить по копиям Web App / App), логотипы систем (HiveOS с растра; Linux не добавлен), вопрос разработке: иконки во Flutter шрифтом или SVG.
- [ ] **Замечания ночного прохода без правок:** Address — длинный адрес переносится с «хвостом» из 3 символов (перенос по символам или усечение в середине); Amount не усекаем (на подтверждение); неполные комбинации вариантов у Segment, Button, Icon button, Badge, Step progress, Page indicator, Chart plot; Textarea M, L, XL — одна высота 144; не осмотрено глазами: Table cell / Star, Icon, More, раздел 06 борды Circle timer, раздел 04 борды Date range panel.
- [x] ~~**Открытые пробелы по сверке с legacy DS Web (по порядку, 2026-11-05):** (1) слот слева у Select; (2) панель выбора периода (календарь-панель, пресеты, время); (3) выпадающий список с вкладками, поиском, «Сбросить всё», «Ничего не нашли»; (4) Tooltip tour (✓ собран 05–06.11, вне базы: развивается вместе с тултипами графиков); (5) промо-карточка; (6) Circle timer; (7) Overlay; (8) fill, min / max ширина у Select, Input, Button; (9) платёжные системы и логотипы EMCD в Media. Знание: слой Hover = заливка `state/layer` + opacity из переменной `state/hover`; слоты вложенных экземпляров из кода недоступны.~~ (разобрано строкой выше)
- [x] ~~**Пробелы по тест-стенду (Web App «Выгрузка», модалка из DS 2.0, страница «🧪 Тест-стенд · Выгрузка», 2026-11-05):** (1) ширина fill / min / max у Select, Input, Button; (2) слот слева у Select (монета, группа аватаров); (3) поле диапазона дат — DateRange; (4) Radio card (радио + раскрывающиеся детали в карточке); (5) Input с inline-текстом по умолчанию. Ограничение: из кода нельзя заполнять слоты вложенных экземпляров (слоты правятся руками в Figma).~~ (разобраны строкой выше)
- [x] ~~**Сообщения — модель ролей (исследование Web App, 2026-11-05, на решение):** роли различаются слоем и постоянством, а не тоном. **Toast** — overlay, исчезает, отклик на действие. **Alert** — inline, остаётся, может быть с кнопкой. **Banner** — предложение или объявление уровня страницы; подложка акцента по умолчанию, статусные тоны для системных объявлений, 1–2 кнопки, полоса или карточка. **Промо-карточки** (Sidebar banner 222×120, мобильный Banner 343×152) — контент, не системное сообщение. Пример: экран «Выгрузка» (Web App) — Toast + полоса suggest + Sidebar banner на одном экране. Legacy DS Web: «Toast» (base notification) — постоянная карточка со статус-иконкой и кнопкой; Banner (base Banner --2.0) — цветная рамка и две кнопки. Мобильный App: отдельных Toast и Snackbar нет, только banner 343×168 и строки notifications. Открыто: таймер Toast; стек (≤ 3); позиции — Web сверху справа, App сверху; Banner Tone=Accent как основной.~~ (исследование 2026-11-05, снято решением выше)
- [ ] ~~Решения Стефана по Components (2026-11-04):~~ (частично закрыто строкой выше) страница «🧪 Решения · на проверку» — Tab bar (высота 91 → 57, safe area), Debit, Alert, Textarea, Skeleton, Multiselect, Beta; пометка «⚑ Нужно решение» на 10 бордах. Плюс: усечение и перенос длинного текста у Input amount, List item, Status screen; Notification Unread.
- [x] **Решения по Icons (2026-11-04, приняты по рекомендациям):** страница «📝 Решения · иконки и логотипы»; Symbols (107) и «🔶 Logos и media» (без «пилот») — структура библиотек см. выше; `icon/social/*`, `icon/store/*` Deprecated.
- [ ] **beta-contrast-readiness:** отчёта в репо нет; прогнать контраст Badge, Counter, Segment (ожидаем WCAG ok после solid-статусов 2026-11-04) перед beta.

## Вопросы к Стефану

### 2026-11-13 · после замены Input и Textarea (посмотреть, не блокирует)
1. Проверить руками в Figma: в экземпляре Input / Textarea в слот (Leading, Inline, Trailing на слое `Field`) кладётся своё содержимое. Скриптом работает только `swapComponent`.
2. Высота поля с подсказкой выросла на 4 px (M 88 → 92, Textarea 144 → 148): зазор подсказки базы `space/6`. Рекомендация — оставить; иначе отдельный токен зазора.
3. Skeleton скрывает подсказку и счётчик (Textarea со Skeleton 144 → 122). Рекомендация — оставить.
4. Потери: содержимое Trailing у трёх архивных экземпляров Input (32:1250, 32:1496, 170:1691); единичные оверрайды текста на бордах. Архив затронут побочно (экземпляры Input пересобрались). Откат — точка 13.11.
5. Парковка: `scripts/parity.mjs` при появлении манифеста кода должен брать props надстроек из базы (как `BASE_PROPS` в `agent-docs.mjs`); сейчас сверка props пропускается.
6. ~~Парковка: базы в манифест~~ — сделано 13.11: раздел `bases` (токены и оси; свойства и борды баз — по-прежнему в рукописных контрактах).

### 2026-11-13 · после замены Checkbox, Radio, Toggle (посмотреть, не блокирует)
1. Ось `Control` → `Control position`, значения Left / Right → Start / End (решение 5). В продуктовых макетах оверрайд оси сбросится при Publish.
2. Label, Description, Show label, Show description, зоны — на вложенном слое `_Selection control`; Focus ring — на глифе. Если экземпляр растянут по ширине — слою базы ставится Fill (в описании наборов есть).
3. Пилоты `Checkbox · пилот`, `Radio · пилот`, `Toggle · пилот` на странице `_Selection control` больше не нужны. Удалить? Рекомендация — да, после просмотра результата.
4. Не снято: стенд бренды × платформы и текст 200 % у действующих наборов.

### 2026-11-13 · после замены Menu item, Multiselect option, List item (посмотреть, не блокирует)
1. Имена свойств (MAJOR): List item `Title` → `Label`; Menu item `Checkbox` → `Show selection`; Multiselect option `Leading` / `Leading · swap` → `Show leading` + слот Leading; `State = Selected` → булево `Selected`. Оверрайды в продуктовых макетах сбросятся при Publish.
2. Свойства — на вложенном слое `_List row`. Растянутому экземпляру слой базы ставится Fill.
3. Пилоты `Menu item · пилот`, `Multiselect option · пилот`, `List item · пилот` больше не нужны. Удалить? Рекомендация — да, после просмотра.
4. Борда Multiselect option, анатомия: строка «checkbox · 20×20» оставлена (размер глифа); проверить глазами разделы 02 трёх борд.
5. Не снято: стенд бренды × платформы и текст 200 % у действующих наборов; снимки хостов Multiselect, Sheet, Date range panel.
6. Ждут токенов (решение 5 пилота): `size/row/min` = 40, `size/row/content-min` = 120 — завести и привязать, публикует Стефан.

### 2026-11-12 · пилот базы полей (доска «⚑ Пилот базы полей», Components, страница `_Field base`)
Решено 12.11: Стефан поручил решать агенту («везде A выглядит логичным, потом посмотрю»). Действует A, если ниже не сказано иное; Стефан может пересмотреть.
- [x] **1. Замена на месте:** A — заменить Input и Textarea пилотными наборами и перевести потребителей (рекомендация); B — держать пилот рядом до конца фазы C; C — не менять. До ответа действует B. → **A.**
- [x] **2. Длинная подпись On border:** A — правило «только короткая, длинная → Above» (рекомендация, уже в описании и контракте); B — обрезка «…» по ширине поля. → **A.**
- [x] **3. `minHeight 96` многострочного поля:** A — токен `size/field/multi-min` = 96 в Foundations (рекомендация; Publish за Стефаном); B — запись в `docs/exceptions.md` (противоречит правилу «в двух местах — токен»). → **A.**
- [x] **4. Текст 200 % в однострочном поле:** A — правило для кода: `min-height` вместо `height`, On border → Above (рекомендация); B — фиксированная высота. → **A.**
- Парковка: RTL (зеркалирование слотов) в Figma не рисуется — проверять в коде; максимальная ширина поля (`size/field/max`) к корню базы не привязана — решить при сборке Select.

### 2026-11-12 · пилот _Selection control (доска «⚑ Пилот _Selection control», Components, страница `_Selection control`)
Решено 12.11: Стефан поручил решать агенту («везде A выглядит логичным, потом посмотрю»). Действует A, если ниже не сказано иное; Стефан может пересмотреть.
- [x] **1. Замена на месте:** A — заменить Checkbox, Radio, Toggle пилотными наборами и перевести потребителей (рекомендация); B — держать пилот рядом до конца фазы C; C — не менять. До ответа действует B. → **A.**
- [x] **2. Имя оси положения:** A — `Control position = Start | End` (рекомендация: правило AXES, RTL); B — оставить `Control = Left | Right` исключением. → **A.**
- [x] **3. Предел ширины подписи `maxWidth 436` числом:** A — убрать, оставить предел корня `size/field/max` (рекомендация); B — токен `size/selection/label-max` (Publish за Стефаном); C — запись в `docs/exceptions.md`. → **A.**
- [x] **4. `Status = Off | On` у Radio и Toggle:** A — оставить осью и добавить в разрешённые в `audit-parity` (рекомендация); B — булево свойство. → **A.**
- Парковка: текст 200 % стендом не снят; Menu item, Multiselect option и таблицы рисуют выбор сами — пересадка на глифы на шаге `_List row`; в описании Checkbox «кольцо 4 px, зазор 2» — сверить с правилом кольца (+2 px) при замене.

### 2026-11-12 · пилот _List row (доска «⚑ Пилот _List row», Components, страница `_List row`)
Решено 12.11: Стефан поручил решать агенту («везде A выглядит логичным, потом посмотрю»). Действует A, если ниже не сказано иное; Стефан может пересмотреть.
- [x] **1. Замена на месте:** A — заменить Menu item, Multiselect option, List item пилотными наборами и перевести потребителей (Dropdown panel, Menu, Select, Multiselect, списки) (рекомендация); B — держать пилоты рядом до конца фазы C; C — не менять. До ответа действует B. → **A.**
- [x] **2. Выбор у Multiselect option:** A — булево Selected (рекомендация: сочетается с Hover / Pressed / Disabled и фокусом); B — оставить `State = Selected`. → **A.**
- [x] **3. Multiselect option и Menu item:** A — слить: строка множественного выбора = Menu item с Show selection, отдельный набор убрать в фазе C (рекомендация: одна задача — один способ); B — оставить два набора. → **Решено B** (доска E, предложение 1: Multiselect option остаётся отдельным набором на базе `_List row`).
- [x] **4. Имена свойств:** A — как в базе: Label, Show leading + слот Leading, Show selection (рекомендация); B — оставить Title, Leading · swap, Checkbox. → **A.**
- [x] **5. Числа без переменной:** `minHeight 40` у Option, `minWidth 120` текста у List; интервал подпись–описание у Option 2 px, у Menu и List 0. A — токены `size/row/min` = 40, `size/row/content-min` = 120 и интервал `space/2` везде (рекомендация; Publish за Стефаном); B — запись в `docs/exceptions.md`. → **A.**
- [x] **6. Цвет галочки выбора:** A — `icon/accent` везде (рекомендация, в пилоте уже так); B — `icon/primary` везде (как у действующего Multiselect option). → **A.**
- [x] **7. Описание у List:** ось Content у List и Show description у Menu / Option — два способа. A — оставить до фазы C (рекомендация); B — свести к одному свойству в фазе C. → **A.**
- Парковка: у Content = Big value длинное значение обрезается без многоточия; Style = Card в Dark на L3 темнее поверхности (`surface/raised` не относительный — нужен вариант от `surface/current`); `Show leading` по умолчанию true (у действующего Menu item слот слева выключен — сверить при замене); Selected и Show selection независимы — правило «вместе не включать» только в описании, скриптом не ловится; текст 200 % стендом не снят.

### 2026-11-12 · пилот _Overlay surface (доска «⚑ Пилот _Overlay surface», Components, страница `_Overlay surface`)
Решено 12.11: Стефан поручил решать агенту («везде A выглядит логичным, потом посмотрю»). Действует A, если ниже не сказано иное; Стефан может пересмотреть.
- [x] **1. Замена на месте:** A — заменить Tooltip, Menu, Dropdown panel, Toast, Modal, Sheet пилотными наборами и перевести потребителей после точки отката (рекомендация); B — держать пилоты рядом до конца фазы C; C — не менять. До ответа действует B. → **A.**
- [x] **2. Тени Menu / Dropdown panel / Sheet:** сейчас свои числа (r8 y4 s-2; Sheet r3 y1 + r32 y16 s-8). A — `Elevation/2` у Menu и Dropdown panel, `Elevation/4` у Sheet (рекомендация, в пилоте так; тень заметнее); B — оставить числа и внести в `docs/exceptions.md`; C — отдельные стили. → **A.**
- [x] **3. Отступ панели:** Dropdown panel 12, Menu 8. A — оставить разные (рекомендация: плотный список против панели с поиском и вкладками); B — оба 8; C — оба 12. → **A.**
- [x] **4. Toast Informer:** полоса во всю ширину без тени и радиуса — не плавающая поверхность. A — оставить как Layout у Toast, поверхность с переопределениями (рекомендация до фазы C); B — вынести в отдельный компонент в фазе C. → **Решено по доске E:** у Toast ось `Kind`, Informer — её значение.
- [x] **5. Материал + тень:** стиль эффектов нельзя совместить с блюром; у Popover и Sheet эффекты без стиля, равенство Elevation ловит скрипт. A — оставить (рекомендация); B — стили «Elevation/2 · material», «Elevation/4 · material» в Foundations (Publish за Стефаном). → **Решено по доске E:** блюр — отдельным слоем, тень — стилем Elevation.
- [x] **6. Числа без переменной:** Tooltip min 58 / max 320, Menu 160–320, Toast min 280, Sheet max 640, список Dropdown panel max-высота 320. A — токены `size/overlay/*` (рекомендация; Publish за Стефаном); B — запись в `docs/exceptions.md`. → **A.**
- [x] **7. Tooltip, Placement:** A — Left / Right → Start / End (рекомендация: правило RTL); B — оставить. → **A.**
- Парковка: у Modal Header = Coin длинный заголовок обрезается без многоточия; в Dark тень не видна — границу Sheet и Informer (без обводки) держит только заливка, проверить на продуктовых экранах; `itemSpacing 8 @header` у Dropdown panel числом при SPACE_BETWEEN (интервал не действует — убрать при замене); остальные оверлеи (Date range panel, Calendar, Tooltip tour, Snack, Side panel, Select-список) пересадить на базу в фазе C; текст 200 % стендом не снят.

### 2026-11-12 · служебные слои (парковка, не блокирует)
- Прозрачность числом: 20 % у `_Hit area` и `_Safe margin`, 56 % у цвета `_Focus ring`. Теперь по одному месту на значение. Кандидат на доску фазы E: завести токены или записать в `docs/exceptions.md`.
- `audit-parity` обходит только наборы; одиночные компоненты проверяют `audit` и `variables-check`. Расширить, если появятся одиночные не служебные компоненты.

### 2026-11-12 · находки по 18 beta-наборам (правки — с пакетом замены после точки отката; списки — раздел 15 контрактов)
- Экранированные сущности (`&amp;…quot;`) в описаниях: Breadcrumb item, Button, Checkbox, Radio, Segment, Toggle, Tab bar item. Ловит `audit-parity` (DESC).
- Мусор в строке «Поиск» (слово в другой раскладке): Badge, Counter, Chip, Status, Tab, Tab bar item. Решить одно правило: раскладка-синоним нужна или нет. Скрипт пока не ловит — добавить проверку после решения.
- Вариант по умолчанию не по правилу: Badge — Skeleton; Button — S (правило: M в Web); Icon button — Primary S (самый частый — Ghost).
- Матрица меньше произведения без строки «Матрица:»: Badge 39 / 72, Button 176 / 192, Icon button 240 / 280, Segment 36 / 128, Tab 36 / 40.
- Loading: свойство у Button, значение State у Icon button (кандидат 3 доски решений).
- Breadcrumb item: `label` без текстового стиля; max-width 200 в наборе против «до 160» в описании.
- Tab bar item: радиус `state layer` 12 числом. Tab: `indicator.width` без переменной.
- Dot (вложен в Status): описание не по шаблону, статуса нет — служебный `_Dot` или draft.
- Input addon: у Max зоны названы `fine / coarse` (в системе `web / app`), состояний Hover / Pressed / Disabled нет; Stepper собран слоями, а не экземплярами Icon button; Counter дублирует смысл Counter Neutral — нужен ли отдельный компонент.
- Интерактивный Badge (Close, Chevron, Focus ring) без зон нажатия: это Badge или Chip.
- Min / max числом (Badge 160, Chip 240, контролы 480, Counter 16 / 20 / 40, Button 64 у части вариантов): значения приняты 30.10, осталось — токены или строка в `docs/exceptions.md`.
- Соответствие legacy-типов Button новым (Secondary base → Tertiary и т. д.) в `components.csv` выведено из описаний — сверить с разработчиком.

### 2026-11-12 · фаза A брифа агента (не блокирует, работа идёт)
- **Version history:** поставить точку отката в Components перед пилотом базы полей (API плагина этого не умеет).
- **Publish Foundations:** 21 токен от 09.11 (в отчёте было «20» — ошибка счёта, список тот же) не в репо (список — `docs/audit-2026-11-12.md`, раздел 3). После Publish экспорт и сборку делает агент.
- **Перенесено на доску 12.11 (см. раздел ниже).** Было — кандидаты: (1) одна ось выбранности — `Selected=Off|On` везде или `Status` у контролов; (2) ошибка контрола — `Tone=Danger` или `State=Error`; (3) Loading — ось State или булево; (4) «Show X» для всех булевых видимости; (5) порядок значений Size (S → XL) и State (Default, Hover, Pressed, Focus, …, Disabled, Loading, Skeleton); (6) монеты: `smbl-*` или `symbol/coin/*`. Рекомендации будут с превью; до ответа действует вариант, который меньше ломает (не переименовывать у beta).


- [x] **Решено 2026-10-30 (чат 3):** Tab Hover / Pressed — серая полоска снизу (`border/subtle` / `border/default`), текст не акцентный (решение 19.10); обводка Off у Chip и контролов (`control/border/default`, ~1.3:1, тот же уровень, что `border/default`) — оставить, отклонение от WCAG 1.4.11 (≥ 3:1 для границы контрола) принято осознанно; Spinner и Progress circle — разные компоненты; глифы Badge → привязать к `icon/*`, не к `text/*` (масштабирование: один слой цвета для всех иконок); Chip / Badge — см. ниже.
- [x] **Banner — решено 2026-10-30:** «как Toast» — нейтральная обводка `border/subtle` на `surface/raised`, статус иконкой цвета тона (как кнопки, сепараторы, чипы, карточки). Применить на этапе 2.
- [ ] **Выбор символов и иконок пересобран (2026-10-30)** в файле Icons: страницы «📝 Выбор v2 · Символы» (296 карточек) и «📝 Выбор v2 · Иконки» (131). У каждой карточки свойство «Решение» (Оставить / Архив / CHW / Нарисовать / Не символ; у иконок Оставить / Убрать / В набор brand), превью на светлом и тёмном. Дефолты — рекомендации Claude; по решению 04.10 платёжки → Архив, акции xStock, монеты Coinhold/WL и сервисы Cards → CHW. Ждёт прохода Стефана; после — Avatar «монета / символ» и библиотека символов. Старые страницы Selection 2 и Symbols · selection остаются до конца прохода, затем в 🗄.
- [ ] **Структура библиотек (рекомендация Claude 2026-10-30, ждёт ок):** три отдельные — Icons (UI-глифы, цвет токенами; набор на бренд с одинаковыми именами, Swap library), Symbols (монеты, фиат, флаги; цветные light/dark + mono, не зависят от токенов, обновляются при листинге монет), Illustrations (графика Expressive, логотипы брендов EMCD / Geo / WL — отдельной страницей). Причины: разная частота правок, размер, поведение цвета, независимые релизы.

- [x] **Решено 27.10:** long — без обрезки у кнопок и подобных (max-width + подгонка текста), обрезка только в инпутах / селектах / списках; Tab bar — без длинных и обрезанных подписей; максимальная ширина Button — 280 px; Badge — иконка справа любая, отдельное свойство не нужно; бирманский — не режим в Figma; language stress и long text совместить с бордами после молекул и организмов.
- [x] **Баланс отступов у Chip и Badge — решено 2026-10-30:** оси Icons нет; со стороны иконки отступ меньше намеренно (в иконке много воздуха — оптическая компенсация), 4 px у края с иконкой.
- [x] **Максимальные ширины — принято 2026-10-30** (Chip 240, Badge 160 при label 112; Tab, Segment, Status — как в мастерах). Проверить тестами по экранам, платформам, кейсам («🧪 Тест · длинный текст»).
- [x] **Button + Badge / Counter (внутри и снаружи) — молекула** (решено 2026-10-30).
- [ ] **Двустрочные кнопки (заголовок / подзаголовок)** — открыто, не срочно.
- [ ] **Армянский, сингальский, амхарский** в Figma не рисуются — проверять в коде.
- [ ] **Выноски на превью:** проверить расстановку на Icon button, Radio, Chip, Badge, Counter, Status, Tab, Segment, Progress; у Button 5 (слой состояния) и 6 (кольцо) слева и справа от кнопки.

- [x] **Решено 26.10:** кольцо фокуса (нейтральное) — оставить; токен нейтральной точки Status — заведён и опубликован (`status/neutral/solid`); эталон таблицы — «Размеры» у Button; Badge — отдельная иконка справа не нужна; motion Progress — 200 мс enter + standard; Code cell и Scrollbar — движение как есть; Avatar, Divider, Card, Legend swatch — без «Движения»; Skeleton — `skeleton/base` 8 % alpha, виден на L0–L3.
- [ ] **(2026-10-30) Code syntax WEB у `surface/current`** (коллекция Surface context) пуст — нужен `var(--surface-current)` до DSP Export (правило 3 `dsp.md`); затем Publish Foundations.
- [ ] **DSP (решение 2026-10-30):** DSP Export делает разработчик, Стефан его не контролирует; наша часть — Publish Foundations / Components в Figma и список изменений для разработки. Список: токены `status/neutral/solid`, `skeleton/base`, нейтральный `border/focus`, fallback-шрифты Brand, `surface/current` (Web code syntax `var(--surface-current)` проставлен 2026-10-30); мастера: скругления L/XL, Dot, Divider Style, Card Level 0, Chip Trailing icon, Avatar, Tab bar item, Step symbol; реакции прототипов.
- [ ] **Прототипы «Движение»:** посмотреть в Present на странице «🧪 Прототипы · Движение» (Button, Icon button, Checkbox, Radio, Toggle, Chip, Tab, Segment); API воспроизведение не проверяет.
- [x] **Правила Divider · Dotted, Card · Level 0, Chip · Trailing icon — решено 2026-10-30:** у Стефана нет ресурса подтверждать, формулировки пишет и ведёт Claude (пометка «предложение»), правки — по ходу ревью.

- [x] Status: один компонент или Dot + Text — решено 19.10: Status использует отдельный атом Dot (пробуем).
- [x] Badge / Counter — разные компоненты, развести (не сделано).
- [x] Progress bar / Progress circle — разные компоненты.
- [x] Скругления L / XL — пропорционально (сделано для Button и Icon button).
- [ ] **Ревью Стефана 19.10 (список правок, ещё не сделан):**
  - Все компоненты: полная борда как у Button — «Движение» (+ превью, не только таблица), «Правила» (Делай / Не делай), «Доступность», «Код и токены», «Локали и RTL».
  - Единая вёрстка таблиц на всех бордах: отступы, высота строки, ширины колонок — одно правило.
  - Раздел 02: цифры пунктов 1–6 отметить на превью (выноски); у Button пункты 5–6 не показаны; у Icon button нет текста в анатомии и не показаны размеры; Default-состояние показывать во всех превью.
  - Правила длинного текста: сокращение, перенос, максимум строк (кнопки, инпуты, чипы); «Локали и RTL»: long-версия — задумана или сломана (описать).
  - Badge: перепроверить превью; Counter: правила (где и как, какой цвет); Status: правила; Progress: те же доработки; Spinner: не трогали.
  - Avatar и все стеки / точки статуса: обводка всегда цвета фона, на котором лежат (а не жёсткий токен) — не сделано.
  - Button, Checkbox, Radio, Toggle: после добавления блоков и унификации таблиц отметить «собран».
- [ ] Остаются: подложка превью Skeleton на борде; 300 мс у Progress. (Кольцо фокуса — решено нейтральное; `status/neutral/solid` — заведён; правила Dotted / Level 0 / Trailing icon — см. выше.)

- [x] **(2026-10-19) Кольцо фокуса — цвет: решено 26.10** — оставить нейтральное; HANDOFF и `components.md` обновлены 2026-10-30.
- [x] **(2026-10-19) Skeleton — блик: решено 19.10** (Стефан: «блик заметнее») → белый градиент со смешиванием Difference, виден на светлой и тёмной (CHANGELOG). Остаётся только вопрос подложки превью на борде: серое на сером.
- [x] **(2026-10-19) Avatar group — прозрачность: решено 19.10** (Стефан: «аватары не прозрачные») → непрозрачная подложка `surface/default` под каждым кругом и «+N» (CHANGELOG).
- [x] **(2026-10-19) Нейтральная точка Status:** токен `status/neutral/solid` заведён и опубликован 26.10, в репо с экспортом 2026-10-30.

- [ ] **(2026-10-16) Минус в истории** — логика по кейсам в `components.md` → «Цвет суммы в истории» (на ревью).
- [ ] **(2026-10-16) WL с яркими акцентами** — доска «_WL · яркие акценты» (Playground): текст на заливке чёрный/белый по контрасту, цветной текст по П1, кольцо нейтральное при контрасте бренда < 1.5. Ок?
- [ ] **(2026-10-16) Visual language** (Foundations «🌗 Visual language»): статусные пятна в тёмной почти не видны — оставить только Ошибка / Внимание?; сила свечения иконки навигации; темнеет ли нижний край пятна фона.
- [ ] **(2026-10-16) Geo → Onest** сделан в Foundations (`font-family/onest`, Geometria text / display) — опубликовать Foundations → Components Update all.
- [ ] **(2026-10-16) Мощное устройство** — границы в `config/perf-tiers.json` (docs/performance.md); передать разработке Flutter, уточнить на реальных устройствах.
- [ ] **(2026-10-16) Android** — разбор сборки 862 в `platforms.md`; передать разработке.
- Иконки в App: пока SVG; свой шрифт иконок — позже (в App уже есть маленький `EMCDIcons.ttf` — свести к одному способу).

- [ ] Кандидаты в deprecated (после перевода компонентов на слой больше не используются): `action/tertiary/hover|pressed`, `surface/hover|active`, `control/segment-hover`, `action/secondary/hover` — проверить в коде (DSP) перед удалением.

- [x] ~~**Неопубликованные изменения Foundations — проверка влияния (2026-10-06).** Отличий от того, что видит Components, пять: `control/surface/disabled`, `control/track-disabled` 4 → 8%, `control/knob-disabled` #fafafa → 40% (Checkbox, Radio, Toggle, Input, Select, Textarea, Input amount, Code input — ожидаемо), и `accent/fg-on-light` 600 → 500 → **меняет text/accent, text/link, icon/accent в светлой теме** (~25 компонентов). Контраст 500: violet L0 4.78 / L1 4.39 / L2 4.05 / L3 3.62; electric-blue (Geo) L0 4.38 — AA не проходит уже на карточке L1, у Geo — даже на L0. У 600: violet 6.15 / 5.64 / 5.20 / 4.66, Geo 5.70 / 5.23 / 4.83. **Предложение: вернуть 600** (hover 700, pressed 800). До решения Foundations не публиковать. Остальное (переименованные dimension/x0-*) — только алиасы, ломаться нечему. Легаси-переменные (Color 4 [Text], Basic color/*) остались в Nav icon — перепривязать.~~ — 2026-10-06: Стефан «делай»: возвращено 600 (hover 700, pressed 800), Nav icon перепривязан.
- [x] ~~**Правила цвета по состояниям не единые (аудит 2026-10-06).** Hover/Pressed пятью способами: слой `state/layer` 6/10% (Button, Icon button, Checkbox, Radio, Toggle, Menu item); `action/tertiary/hover|pressed` 8/12% (Chip, Date cell, Multiselect option, File upload, Pagination item, Scrollbar); `surface/hover|active` 8/12% (List item, Accordion, Nav item, Table header cell, Table row); `control/segment-hover` 4% в светлой (Segment); `action/secondary/hover` (Select compact); только цвет текста (Tab, Breadcrumb, Legend, ось графика). Нет Pressed: Date cell, Multiselect option, Nav item, Accordion, Table row, Select compact, File upload, Scrollbar. Нет Hover: Input amount, Code input. Баги: Floating button Hover/Pressed не меняется; File upload Disabled не меняется; Table cell / Toggle, Star, Icon, Buttons, More — Disabled не переключает вложенные инстансы. Selected тремя способами: accent/subtle 16% (Nav item, Pagination, Table row), сплошной primary (Date cell), `border/focus` обводкой (Chip cell — токен фокуса не по назначению). Input: полоска под подписью в разрыве рамки залита полупрозрачным `control/surface/disabled` — не перекрывает обводку. **Предложение — единая модель:** плашки → слой state/layer 6/10% (один `::before`); поля → `control/border/hover`, Focus — обводка + кольцо, без Pressed; текстовые → text/accent-hover|pressed или к text/primary; Disabled → плашка 8%, контент 40%, вложенные контролы в Disabled; Selected → accent/subtle + text/accent, сплошной — только выбранная дата и отмеченные контролы.~~ — сделано 2026-10-06, docs/components.md «Модель состояний».


- [ ] **Иконки по брендам (следующий этап после Button / Icon button)** — решение 2026-10-06: EMCD (pool, Monitoring) — наши legacy; Base и WL — Lucide; Geometria — пока Lucide, потом свои под бренд. План: отдельная библиотека на набор с одинаковыми именами `icon/<имя>`, компоненты DS ссылаются на имена, продуктовый файл переключает набор (Swap library); в коде одно API, набор SVG — по бренду.

- [x] ~~Лигатуры в текстовых стилях Foundations~~ — выключил Стефан 2026-10-05.

- [x] ~~**Схлопнуть цветные типы кнопок осью Tone?**~~ — да (Стефан 2026-10-05), сделано. Type: Primary · Secondary (тинт) · Tertiary · Tertiary outline · Text · Inverted × Tone: Accent · Danger (у Primary, Secondary, Text). Error → Primary+Danger, Secondary error → Secondary+Danger, Text error → Text+Danger. Тинт-подложка у Secondary остаётся.

- [ ] Курсоры в документации компонентов (pointer / not-allowed / progress) — по желанию Стефана, позже.
- [x] ~~**Пилот переноса Button**~~ (1:1) — Стефан 2026-10-05: Small = 32, ориентир — значения 2.0; брать legacy как основу и дорабатывать до 2.0. Было: (DS Web baseButton → «Button · legacy», Playground)** — 44 варианта 1:1, свойства как в legacy, legacy-переменных 0. Значения вне шкалы / на решение:
  - Small высота 36 (10 + 16 + 10) — 36 нет в шкале;
  - Small текст 14/16 — в DS 2.0 Label/MD 14/20 (сейчас межстрочный привязан к `type/label/sm/line-height`, временно);
  - App: отступы Large 24 / Small 20 (Web 16 / 10) → нужны Platform-токены кнопки; у App ещё ось Invert и кнопки small 28 / xsmall 24;
  - legacy без Hover / Pressed / Focus / Loading — добавить из 2.0 (кольцо фокуса, a11y, motion);
  - замена Button 2.0 переносом меняет API (типы, размеры, Active) — major для DSP, предупредить разработку.

- [x] ~~**Токены под непривязанные размеры**~~ — решено 2026-10-05: шкала 2 4 6 8 10 12 16 20 24 28 32…, 14 → 12, кольцо 4, числовые `space/N` (docs/dsp.md). Было:: gap 6 (иконка↔подпись, ~557), padding 6/10/14/20/28/40, radius 2/3/6/9/13/18/20/28, обводка 2 вне фокуса и 3. Предложение: добавить шаги в шкалу (`space/*` 6·10·20·40 и `radius/2xs` 2) + компонентные токены там, где значение — внутренняя геометрия контрола; часть значений (3, 9, 13, 18) — подогнать к шкале ±1–2 px с записью в migration. Новые токены — minor, не ломают код.

- [x] ~~Золотые иллюстрации в Base~~ — снято 2026-10-04: это иконка монеты Luckycoin `ic_lucky_lky` (контент), одинакова в Base и Expressive.
- [x] ~~WL fallback~~ — решено: WL = EMCD Base на фоллбеках; бренд клиента → режим Brand как Geometria. Открыто: тема WL B2B (админка), иллюстрации Iconly.
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

### 2026-11-12 · доска решений (фаза E) — «⚑ Решения · от тебя (12.11.2026)», Components, фрейм `1895:435`

**Решено 12.11: везде A.** Стефан поручил решать агенту («везде A выглядит логичным, но я потом посмотрю»); предложения — «делай, потом посмотрю». Стефан может пересмотреть любой пункт — тогда правка и запись здесь.

1. Замена пилотов на месте: A — меняю содержимое внутри действующих наборов, экземпляры не отвязываются.
2. Выбранность: A — `Selected` у строк и чипов, `Status` у контролов выбора, без переименований. При A — исключение в правиле AXES `audit-parity` для контролов выбора.
3. Ошибка: A — у полей `State=Error`, у выбора и действий `Tone=Danger`.
4. Loading: A — булево у Button и Icon button (−48 вариантов у Icon button), у полей — `State`.
5. `Left / Right` → `Start / End` (в пилоте Checkbox уже так).
6. Числа min / max → токены `size/*` (Tooltip 320, Menu 160 / 320, Dropdown panel 460, поля 96 и др.).
7. Тип `state/hover`, `state/pressed` → number.
8. Вариант по умолчанию: Button M, Icon button Ghost M, Badge `State=Default`.
9. Интерактивный Badge: A — Close и Chevron в Deprecated, интерактив = Chip.
10. Тени Menu, Dropdown panel, Sheet → Elevation/2 и /4.

Предложения (делаются все): Multiselect option отдельным набором; «Show X» для булевых видимости; порядок значений Size и State; имена зон `hit area · web / app`; кольцо фокуса 2 px в описаниях; отступ панели 12 / 8; Toast Informer — ось Kind; блюр отдельным слоем; усечение подписи On border; монеты `symbol/coin/*`; Alert и Table остаются draft; контракты draft без изменения наборов.

Действия за Стефаном (ответ 12.11): **точка отката** — поручена агенту, но Plugin API её не ставит (`saveVersionHistoryAsync` не поддерживается, проверено 12.11) → нужна одна ручная версия от Стефана (Cmd + Option + S) до замены наборов; Publish Foundations и Components — после доработок агента; окно DSP Export и манифест кода — когда доделаем; Ready for dev — «ок» после замены. Jira — обновлять существующие задачи, новые не заводить.

Сделано в репо по решениям 12.11: (7) `state/hover`, `state/pressed` — `$type: number` в `tokens/platform/*.json` (конвертер `figma-to-dtcg.mjs`), сборка — трансформ `emcd/state/opacity`, выход сборки не изменился; (2) `audit-parity` — ось `Status` не считается булевой. Остальное (1, 3–6, 8–10 и предложения) — правки в Figma, после точки отката.

## 2026-11-12 · находки при сборке агентного слоя (фаза D)

- [x] **`state/hover`, `state/pressed` в CSS выходили размером** (`--state-hover: 0.375rem`): в Figma это FLOAT в процентах, экспорт пишет `dimension`. Исправлено в сборке (`scripts/build.mjs`): CSS — `0.06` / `0.1`, Flutter-JSON — как было (6 / 10). Токены не менялись.
- [ ] Тип этих двух токенов в `tokens/platform/*.json` остаётся `dimension` (`6px`, `10px`). Правильно — `number`; правка в `figma-to-dtcg.mjs` меняет исходники токенов → после «ок» Стефана.
- [x] HANDOFF «Движение кнопки» называл 8 % / 12 % — исправлено на 6 % / 10 % (токены и финальное решение 2026-10-06).
- [ ] Вариант по умолчанию оси в Figma ≠ правило (Button `Size = S`): в `docs/api.md` значение по умолчанию оси отдаётся «по правилу контракта», пока наборы не заменены.
- [x] Claude DS — 9 beta-компонентов пересобраны и опубликованы 2026-11-12 (`4566f20`).
- [ ] Claude DS: draft Select в превью — значение прижато к верху (`all: unset` + `height: 100%` у `select`); было до синхронизации, править при переводе Select в beta.
- [ ] Claude DS: Alert и Table есть в `status.json` и артефакте, наборов с такими именами в манифесте Figma нет — оставить draft или убрать (удаление — только с «ок»).
- [ ] Контракты Input / Textarea пишут «draft до замены на месте», `claude-ds/status.json` — beta: свести после замены наборов (фаза C).
- [ ] Манифест кода для `npm run parity` (Vue / Flutter) — просить у разработчика; без него сверка props пропускается.

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
