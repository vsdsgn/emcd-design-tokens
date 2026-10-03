# DS 2.0 — передача контекста (handoff)

Документ для нового чата / нового исполнителя. Обновлено: 2026-10-02 (вечер).

## Файлы

| Что | Ссылка |
|---|---|
| Foundations | https://www.figma.com/design/5rTB91UqoGpBncDTUqPP7A |
| Icons (+ доски символов) | https://www.figma.com/design/HLeaDeTWLJyypv79XpMrs2 |
| Illustrations (Expressive) | https://www.figma.com/design/nNKfDtp7zyW49fJS2S0sse |
| Components | https://www.figma.com/design/UDjWvuTrGircdBfkWG5Apq |
| Проект библиотек (Figma) | team 893076494660910422, folder 663842200 |
| Репо | https://github.com/vsdsgn/emcd-design-tokens (локально ~/Projects/emcd-design-tokens) |
| План, решения, задачи (Claude Doc) | https://claude.ai/code/artifact/67766546-a8b7-4ac9-9a64-b5e521f0ef45 |
| Анализ продуктов (Claude Doc) | https://claude.ai/code/artifact/18d13abb-e234-467c-beba-4e3550066c04 |

Legacy: DS Web JNNaqYwsSSVYUZSwZHKc6q · DS App BPkXyq9M44BXOiUDCrmlJs · DS Site J6PbCXVOYcc65AalmMwABr · Icons vfeP94JBhNpcHWzgY4XPhV · Performa XfgcRWqVIFMfiBbESe76wN · Web App az9dcH60FMprvAVxpKdJ9k · App YhZrWgdAIbCB94eev15OFl · Monitoring kY3VUdBinylsci3KoLWwLC · Firmware oo1OKEZcesVVcADpWDH9VC · WL B2B oN07CJPpmwLyNxKifnOZLE · Geometria Web 1pkAsixhTAWk9ZL2uNjcmm · Geometria App UthnopDYfoHTWu3dgF7u2i

## Где мы

Этап 1 (Foundations, иконки, git) — готов. Этап 2 (компоненты) — в работе.

Готово в Components: Button (12→9 типов: Primary, Secondary, Secondary accent, Outline, Tertiary accent, Tertiary error, Link, Inverted, Error; S32/M40/L48/XL56; Default/Hover/Pressed/Disabled + Focus ring, Loading), Icon button (Primary, Secondary, Outline, Ghost, Ghost accent, Inverted), Input (слоты Leading/Inline/Trailing — настоящие Figma slots; Label position Above / On border; 9 состояний; аддоны Unit, Max, Chevron, Stepper, Counter), Checkbox, Radio, Toggle (пересобраны на `control/*`, текст по центру, у Toggle без Danger), Spinner, Skeleton (кирпичи + shimmer), Tab + Tabs, Segment + Segmented, Chip (страница Tabs & Selection), Badge, Counter, Status (Feedback), Tooltip, Menu item, Menu, Toast, Modal, Sheet, Side panel (Overlays), Select (Inputs), Alert, Banner, Empty state, Progress, Progress circle (Feedback), Legend item, List item, Stat card, Table header cell, Table cell, Table row, Table (Data), Nav item, Tab bar item, Tab bar, Sidebar, Top bar, Page header, Shell (Shell & Layout). Эталонный экран «Дашборд Mining» — 🧪 Playground.

## Ближайшие задачи (по порядку)

1. Перепривязка после публикации — сделана. После каждой публикации библиотек: в Components принять обновления (Assets → Updates), затем обновить fallback-цвета пейнтов (скрипт: resolveForConsumer → цвет пейнта).
1a. **Опубликовать Foundations** (полупрозрачные `control/*`, `text/on-warning`) → в Components принять обновление библиотеки, проверить контролы на L0/L1/L2/raised в обеих темах.
2. Решено: warning-заливка = amber/500 в обеих темах, текст на ней — `text/on-warning` (neutral/950). amber/600 не используем (белый на нём 3.2:1).
3. Символы: пользователь разбирает доску Icons → «Symbols · selection» (Оставить / Архив / Не символ). Затем: новая библиотека «◆ EMCD DS 2.0 — Symbols» (медиа, не иконки), имена `coin/btc`, `fiat/usd`, `flag/ru`, `payment/visa`, `service/*`, `stock/*`, `os/*`; майнинговые монеты (BEL, PEP, DINGO, JKC, FB, BCH и др.) не рисовать — они уже есть в legacy-библиотеке «🎛️ Icons, symbols EMCD» как `ic_<coin>_<ticker>` (аудит шёл только по `smbl-*`), перенести оттуда; `status/verified` (залитая розетка с галочкой, legacy `ic-profile-status-star`) — в Symbols, в Icons остаётся контурный вариант для меню; медиа-компоненты Coin (+ стек «+N»), Avatar, Logo; экспорт в `symbols/`.
4. Наглядная таблица миграции — страница «🔁 Migration» в Components (legacy-инстанс | DS 2.0 | соответствие), полная — docs/migration/components.csv. Не перенесены: widget Input amount, multiselect_input, avatar (DS App), card.
5. Графики: источники — Firmware (oo1OKEZcesVVcADpWDH9VC «🟣 Firmware», страница ✅ dashboard; PkLOuTT7t0dSw7jS9BleMv «Firmware Archive»: Dashboard, Server, .lab) и DS Web → 🔸 widget Graph → «Песочница графиков» (примеры Mining / WL / Geometria / Monitoring / сайт), страница «песочника» (.layout / graphic). Собраны: Chart card, Chart plot (7 видов), Chart axis label, Chart tooltip, Chart crosshair, Chart metric. Векторы линий: после vectorPaths ставить y = min(y точек), иначе линия прижимается к верху.
6. Компоненты дальше (тоже от legacy): Chart = legacy bar widget (horizont / vertical / circle) + widget Graph, Chart (линия/области/столбцы на токенах), виджеты дашборда, Multiselect, Datepicker. Нарисовать `empty/*` в Expressive.
   (было: Select → Legend → Toast, Alert, Banner, Empty state, Progress → Modal, Sheet, Side panel, Dropdown → List item, Stat card, Table → Shell, Page header. После первой пачки — эталонный экран (История / Дашборд Mining).
5. Обновить скилл design-studio знаниями проекта; документация для разработки.

## Обновление 2026-10-03 (вечер)

- Принцип: преемственность с legacy (назначение, состав, свойства), но не буквальное копирование — доработки приветствуются, плохое и недоделанное переделываем. Почти всё «недостающее» уже есть в legacy DS или продуктах — сначала найти.
- Основа — design-studio + его референсы; Arc UI / Componentry / Space UI / Skecher / Planes — только дополнение (docs/references.md).
- Движение — docs/motion.md; демо — https://claude.ai/artifact/K13KwN1M1wm9QSt9NEZtJj
- Ключи файлов: Legacy DS Web JNNaqYwsSSVYUZSwZHKc6q, DS App BPkXyq9M44BXOiUDCrmlJs, DS Site J6PbCXVOYcc65AalmMwABr; Web App az9dcH60FMprvAVxpKdJ9k, App YhZrWgdAIbCB94eev15OFl, Monitoring kY3VUdBinylsci3KoLWwLC, WL B2B oN07CJPpmwLyNxKifnOZLE, Firmware oo1OKEZcesVVcADpWDH9VC, Firmware Archive PkLOuTT7t0dSw7jS9BleMv.
- Очередь: (1) исправления — Alert иконка по умолчанию у Danger/Warning; Badge зона нажатия Close/Chevron; Toast компактное действие; Modal размер заголовка по типу; Chip map Normal спокойный; Table единые стили + tabular-nums. (2) Перенос с доработкой: Datepicker (DS Web «?Datepicker, timepicker»), Multiselect + Search (DS Web Multiselect, DS App input-search), адрес с копированием + QR (Web App Безопасность / Адресная книга / Reg + Auth), CoinStack (DS Web), карточка транзакции (DS App txn-card-history), экран статуса (DS App status screen), пароль с требованиями (Web App Reg), Payment Card, Notification, шапка/футер сайта (DS Site), пагинация (проверить Monitoring и WL B2B). (3) Выгрузка описаний компонентов в docs/components/*.md + llms.txt для Claude Design.
- Приёмы Plugin API: скрытые инстансы не материализуют слои (visible=true → перекрасить → вернуть); текст в слоте нельзя привязать к свойству; vectorPaths — после пути y = min(y точек); позицию слоя внутри инстанса не переопределить; overlayPositionType/overlayBackground — только чтение (оверлей = полноэкранный фрейм со своим затемнением); точку градиента можно привязать к переменной; layoutGrow только 0/1; search_design_system — один запрос за вызов.

## Принятые правила (не нарушать)

- **Миграция, а не перерисовка.** Новый компонент повторяет форму (±4 px) и логику (оси, состояния, опции) legacy-компонента из DS Web / App / Site. Отклонения — только под шкалу токенов или решения DS 2.0, и каждое — в `docs/migration/components.csv`. Перед сборкой — замер legacy (Plugin API в файле DS Web), после — сравнение до/после.
- Иконки внутри скрытых инстансов не материализуются: чтобы перекрасить, временно показать (`visible = true`), перекрасить, вернуть.
- Текст внутри слота нельзя привязать к свойству — текстовые свойства держать вне слотов.

- **Рампы — в OKLCH**: 500 = якорь (hex не меняем), светлота равномерно к 50/950, hue тёмной половины = hue 500, общая кривая хромы, клип в sRGB. В коде — hex. Генератор и было/стало — страница «🎨 Ramps · OKLCH» в Foundations.

- **Одна задача — один способ.** У каждого варианта — жёсткое правило применения; блок «Когда использовать / Когда нет / Правила / Не делаем» в описании каждого компонента.
- **Отталкиваться от текущих продуктов** (цвета, состояния, типы) — сначала замер legacy, потом решение.
- **Уровни поверхностей**: L0 `bg/base` #0a0a0a · L1 `surface/default` #111 (карточка) · L2 `surface/nested` #1a1a1a · L3 hover #232323. Контрол на уровень выше подложки; Secondary — только на L1. `surface/raised` — поповеры.
- **Фокус**: кольцо снаружи, 2px прозрачного зазора + 2px `border/focus`; EMCD — лайм (обсуждается в светлой теме: чёрный?). Скругление `radius/focus-ring(-sm)`.
- **Hit area** ≥ `touch/min` (Web 24, App 44); в коде max(размер, touch/min).
- **Input**: лейбл виден всегда; внутри только плейсхолдер-подсказка; Above по умолчанию, On border — только суммы/калькулятор в виджетах.
- **Skeleton** всегда с бегущим бликом (pulse — только при reduced motion). Loading у действий, Skeleton у данных.
- **Иконки**: обводки, толщина `icon/stroke/regular` (Web 1.5 / App 1.7), масса по keylines, простые глифы — своя шкала (plus 14, close 12, chevron 12, arrows 14). Remix не используем; новые — по каркасу Lucide; Iconly — добавка вручную.
- **Права**: библиотеки редактирует только Stephane; разработка — viewer + свой PAT.
- **Changelog**: CHANGELOG.md (SemVer), в Figma Publish — одна строка с версией.

## Открытые вопросы


## Технические приёмы (Figma Plugin API)

- Слоты: `component.createSlot()` создаёт SLOT-узел + свойство; слот можно вложить в frame; пустой слот не схлопывается → нужен BOOLEAN «Show …» на visible.
- Spread-тени на фреймах рисуются только при `clipsContent=true`.
- Переменные из библиотеки — `figma.teamLibrary.getVariablesInLibraryCollectionAsync` → `importVariableByKeyAsync`; новые переменные доступны в других файлах только после публикации Foundations.
- Мастер-иконки живут в режиме Web (20px): глифы масштабировать относительно `comp.width/24`.
- Клоны вариантов теряют `componentPropertyReferences` — перепривязывать после клонирования.
- Экспорт токенов из Figma: скрипт в use_figma собирает коллекции в формат `figma/export-*.json` (`{c, m, v:[[name, type, values]]}`); ответ use_figma ≤ 20 KB, поэтому сначала сверять хеши коллекций и переносить только разошедшиеся. Пушим с Mac пользователя через Desktop Commander (его git-креды).
- Привязанным пейнтам ставить fallback-цвет = резолвнутое значение (иначе рендер/скриншот показывает чёрный).
- Экспорт иконок: `npm run icons` (нужен FIGMA_TOKEN в .env); токены: правка в Figma → экспорт коллекций в `figma/export-*.json` → `npm run all`.
