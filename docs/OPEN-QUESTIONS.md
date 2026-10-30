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
8. [x] Claude DS — синхронизирован 2026-10-09 (7acf9d0).

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
9. [ ] **Интерфейсный шрифт — заменить Roobert PRO на бесплатный** (Inter или другой из Google Fonts; решение Стефана 2026-10-05, решаем в основном чате DS): выбор шрифта, кегли/межстрочные под него, Figma Foundations + `font-family/*`, лицензия и подключение в вебе/Flutter. Сейчас за брендовым шрифтом в CSS стоит системный стек ОС (Apple — SF, Windows — Segoe UI, Android — Roboto) — это только запасной вариант, не выбор.
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

## Вопросы к Стефану

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
