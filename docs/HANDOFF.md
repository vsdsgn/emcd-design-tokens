# DS 2.0 — передача контекста (handoff)

Документ для нового чата / нового исполнителя. Обновлено: 2026-10-30.

## Где работать (решение Стефана 2026-10-17)

- **Основное место — VPS** `user@<VPS>` (адрес в `docs/private/LINKS.md`), репо **`/srv/emcd-design-tokens`** (владелец — отдельный пользователь (не root), не root; node 22, сборка воспроизводится 1:1). Claude Code + Remote Control «emcd-ds-vps» → приложение Claude (вкладка Code) и claude.ai/code с любого устройства.
  - Сервис пользователя systemd `~/.config/systemd/user/emcd-ds-vps.service`: linger включён — стартует при загрузке VPS, перезапускается при падении, перед стартом делает `git pull --ff-only`.
  - Управление (без root и sudo): `ds-claude` — запустить и показать статус · `ds-claude restart` · `ds-claude stop` · `ds-claude logs`.
  - Правила агента — `CLAUDE.md`. Push — deploy key VPS (запись). Figma MCP в сессии подключает Стефан через `/mcp`.
- **Мак** (`~/Projects/emcd-design-tokens`) — только `git pull`, не второй пишущий клон. claude.ai + Desktop Commander на Маке — запасной путь.
- Удалены 2026-10-17: клоны `~/Projects/emcd-design-tokens` и `/root/emcd-design-tokens` на VPS; root-сессия Remote Control «EMCD DS» не перезапускается.
- Репо `vsdsgn/emcd-design-tokens` пока остаётся публичным (решение Стефана 2026-10-17).

## Файлы

| Что | Ссылка |
|---|---|
| Foundations | (ссылка в `docs/private/LINKS.md`, не в git) |
| Icons (+ доски символов) | (ссылка в `docs/private/LINKS.md`, не в git) |
| Illustrations (Expressive) | (ссылка в `docs/private/LINKS.md`, не в git) |
| Components | (ссылка в `docs/private/LINKS.md`, не в git) |
| Проект библиотек (Figma) | (ссылка в `docs/private/LINKS.md`, не в git) |
| Репо | https://github.com/vsdsgn/emcd-design-tokens (локально ~/Projects/emcd-design-tokens) |
| План, решения, задачи (Claude Doc) | (ссылка в `docs/private/LINKS.md`, не в git) |
| DSP / playbook (код из Figma, VPN) | DSP (адрес в `docs/private/LINKS.md`) — смотрит Стефан на сайте; репо ORG_REDACTED/ds-playground и прод (ui-emcd-web) ведёт разработчик, мы не клонируем. Правила: `docs/dsp.md` |
| Демо Button (живой код на токенах) | (ссылка в `docs/private/LINKS.md`, не в git) — тема / бренд / платформа / уровень, все типы × тоны × размеры × состояния; токены сняты из Foundations 2026-10-06 |
| Claude DS (Design System для Claude Design) | (ссылка в `docs/private/LINKS.md`, не в git) — синхронизируется из репо по «обнови Claude DS» (`scripts/claude-ds.mjs`). `docs/claude-ds.md` |
| Как вносить изменения | `docs/how-to-change.md` (+ Figma: Components «📖 Как устроено», Foundations «📖 Как вносить изменения») |
| Анализ продуктов (Claude Doc) | (ссылка в `docs/private/LINKS.md`, не в git) |

Legacy: DS Web FIGMA_FILE_KEY_REDACTED · DS App FIGMA_FILE_KEY_REDACTED · DS Site FIGMA_FILE_KEY_REDACTED · Icons FIGMA_FILE_KEY_REDACTED · Performa FIGMA_FILE_KEY_REDACTED · Web App FIGMA_FILE_KEY_REDACTED · App FIGMA_FILE_KEY_REDACTED · Monitoring FIGMA_FILE_KEY_REDACTED · Firmware FIGMA_FILE_KEY_REDACTED · WL B2B FIGMA_FILE_KEY_REDACTED · Geometria Web FIGMA_FILE_KEY_REDACTED · Geometria App FIGMA_FILE_KEY_REDACTED

## Где что лежит в Figma (уборка 2026-10-16)

Метки страниц и досок во всех файлах: без метки — рабочее; 🟠 / 🟡 / 🟢 / 🔴 — статус компонента; 📝 — ждёт решения Стефана; ⏸ — отложено; 🧪 — тесты; 🗄 — архив (внизу, после `---`, не трогаем).

- **Foundations:** 📖 Как вносить изменения · 🔁 Migration (таблица этапа 1) · 🌗 Visual language · 🎨 Ramps · — архив: Effects demo, Шрифт · кандидаты.
- **Icons:** Icons (библиотека) · 📝 Selection 2 · 📝 Symbols · selection · ⏸ Brand character ×2 · — архив: аудиты, Selection 1, Mass, Remix, Symbols audit, Glyphs before Lucide.
- **Illustrations:** Status (один лист).
- **Components:** 📖 Как устроено · страницы компонентов со статусом · 🧪 Playground · на решение (только живые доски 📝) · 🧪 Тест · локали · 🧪 Тест · длинный текст · — 🗄 Archive (deprecated-компоненты) · 🗄 Старые доски (старый Playground, Actions / Inputs, Ревью v0.1, Migration table, Шаблоны экранов, Expressive preview).
- Удалены только пустые страницы (категории Shell & Layout … Media & Promo, Page 1). Новая доска «на решение» → в 🧪 Playground с 📝; после решения → 🗄 Старые доски.

## Начало нового чата — прочитать по порядку

1. Этот файл (файлы, правила, приёмы).
2. `docs/OPEN-QUESTIONS.md` — **текущий этап** (чеклист), парковка, вопросы к Стефану.
3. `docs/HOW-IT-WORKS.md` — как устроена система (оси Brand · Theme · Platform · Viewport · Style).
4. По теме задачи: `style.md` + `visual-language.md` (Base/Expressive, декор), `platforms.md` (Web / Mobile web / iOS / Android, хаптики), `components.md` (правила, a11y, фокус), `effects.md`, `motion.md`, `a11y-report.md`, `browser-support.md` (браузеры, тест `npm run test:browsers`), `performance.md` (загрузка, кадры, перф-гард, `npm run test:perf`), `migration/`.

Репо — источник правды по состоянию; чат может обрываться. После каждого заметного шага: обновить этот файл / OPEN-QUESTIONS, `npm run all`, commit, push.

## Состояние на 2026-10-30

- **Токены:** экспорт Foundations в репо актуален (30.10, `3051524`): `status/neutral/solid`, `skeleton/base` 8 %, нейтральный фокус, fallback-шрифты. Foundations опубликованы 26.10, **Components опубликованы Стефаном 30.10**. Claude DS синхронизирован 2026-10-30 (токены, нейтральный фокус; статусы без изменений — Button и Icon button 🟡, остальные 🟠). Не сделано: **DSP Export** (плагин, VPN).
- **Этап 1** закрыт (таблица миграции, 181 строка, Conflict 0). Идёт этап 3 по карте компонентов: борды v3 (атомы готовы к ревью, молекулы — Input v3 в работе), подробности — `docs/CHANGELOG-components.md`.
- **Версия:** тег только `v0.2.0` (01.10); с тех пор major-изменения имён — перед тегом предупредить разработку.
- **Что ждёт Стефана:** вопросы в `docs/OPEN-QUESTIONS.md` («Вопросы к Стефану»), ревью бордов v3, DSP Export.
- **Правки 2026-10-30 (по отчёту разработчика после DSP Export; в Figma, ждут Publish Foundations/Components и повторного DSP Export):**
  - Button: отступы корня → `space/6, 8, 12, 16` (S, M, L, XL); gap и ширина распорок pad L / pad R → `space/2`; min-width → `size/button/min`. 144 варианта, значения прежние. У `Type=Text` отступ → `space/4`.
  - Input: 27 paddingTop («Label position = On border») → `space/8`; 48 отступов notch label → `space/2`.
  - Badge: глифы перепривязаны `text/*` → `icon/*` (117 слоёв: `icon/primary`, `inverse`, `on-accent`, `on-warning`, `on-subtle/*`). Встроенный счётчик убран (слой counter, свойства Counter / Counter value): число в плашке = Label, счётчик = отдельный компонент Counter. Борда Badge перенумерована (выноски 1–5), строка «Counter · Label» убрана. Badge — draft, в продуктах счётчик не использовался.
  - Foundations: у Brand `radius/focus-ring-lg` code syntax → `var(--brand-radius-focus-ring-lg)` (был дубль с Platform, в CSS получалась самоссылка). Пара Brand/Platform на каждый размер кольца — так задумано, из Platform ничего не удаляем. У Brand `radius/focus-ring-lg` значения EMCD и WL — число 18 (в примитивах нет `dimension/18`) → в хвост. Web code syntax у `surface/current` проставлен (`var(--surface-current)`).
  - Символы: в legacy-библиотеке иконок 9 из 10 «отсутствующих» монет уже есть под префиксом `ic_*` (Alephium, Pepecoin, Junkcoin, Lucky, Canxium, Dingocoin, Bonk, Fractal Bitcoin, Bellscoin) → переименовать в `smbl-*`; нет только Bitcoin Cash. Доски выбора v2 в файле Icons («📝 Выбор v2 · Символы» — 296 карточек, «· Иконки» — 131), свойство «Решение» на карточке; ждут прохода Стефана (в иконках есть косячные, устаревшие, цвета — список будет). Старые Selection 2 и Symbols · selection остаются до конца прохода.
  - Структура библиотек (рекомендация, ждёт ок): Icons / Symbols / Illustrations (+ логотипы брендов).
  - Кандидаты в 🟡 beta (ждут решения Стефана, статусы не менять): Chip, Badge, Counter, Tab, Segment, Input, Textarea, Checkbox, Radio, Toggle, Status, Tab bar item, Breadcrumb item. Не проверено: контраст, Light/Dark × L0–L3, Disabled вложенных, длинный текст. Хвост: у индикатора Tab 24 варианта с непривязанным радиусом 1 px.
  - Порядок дальше: молекулы Select → Input amount → Password field → File upload → Multiselect → Menu → List item.

## Где мы сейчас — Этап 1 · Token Migration & Mapping (с 2026-10-09; закрыт, оставлено как история)

Хронология: … 2026-10-06 (точка восстановления Components) → 2026-10-07 / 08 (отменено восстановлением, в истории) → **2026-10-09 этап 1** → этап 2 → этап 3. Решения Стефана 2026-10-09: точка восстановления окончательная (решение 10-08 «только атомы и молекулы» снято); все изменения Foundations остаются, особенно уровни L0–L3.

**Три этапа (бриф 2026-10-09):**
1. **Token Migration & Mapping** — таблица legacy → DS 2.0, без визуальных изменений интерфейсов. ← сейчас
2. **Component Token Migration** — перепривязка компонентов к токенам без улучшений, проверка на экранах Mining.
3. **Component System Evolution** — контракты (`docs/component-contract.md`), usage, motion, a11y. Card / Widgets / Layout — только в плане.

**Сделано 2026-10-18 (компоненты — контролы, Chip):**
- Шаблон доски компонента v3 — Components → 📖 → «📐 Шаблон доски компонента · v3» (разделы 00–11, «всегда» / «по типу», доп. блоки, правила подачи, порядок подготовки). Эталоны: «Button — борда · шаблон v3», «Tooltip — борда · шаблон v3».
- Контролы (Checkbox, Radio, Toggle): обводка Off → `control/border/default` (disabled / error — свои), фокус «зазор 2 + кольцо 2», радиус +4; S: подпись 14/20, отступ 8 (коробка 20 — решено оставить); тень ползунка Toggle убрана (Base плоский, Expressive — позже).
- Новые: Checkbox group, Radio group, Toggle group (Direction · Size · State Default/Error/Disabled · Show label/helper · Label/Helper). Отступы группы 12 (M) / 8 (S).
- Chip: обводка Off и Disabled — `control/border/default` (не пропадает), брендовая «focus border» удалена, кольцо фокуса 2+2 с радиусом +4, On Hover/Pressed — `action/inverse/default` + `state/layer-inverse`.
- Борда «Контролы выбора — борда · шаблон v3» (страница Checkbox) — временно общая.

**Решения Стефана 2026-10-18:** коробка Checkbox / Radio 20 в обоих размерах — ок · борды отдельные на каждый компонент (разнести общую на Checkbox / Radio / Toggle) · Control Left/Right: пока Checkbox и Radio слева, Toggle справа, свойство оставляем · дальше по карте компонентов: атомы → молекулы → организмы → виджеты → лейауты (карту при необходимости обновить).

## Компоненты · состояние на 2026-10-19 (сборка бордов v3)

Правило Стефана: **одна борда на компонент по шаблону v3; на страницах компонентов только новые борды**, старые v2 — в 🗄 Старые доски (мастера компонентов лежат на корне страницы).

**Борды v3 (все ждут ревью Стефана; смотреть первыми — Checkbox / Radio / Toggle и Chip: они задают шаблон):**

| Группа | Борды (id) |
|---|---|
| Эталоны | Button 619:6305 · Tooltip 622:894 |
| Контролы | Checkbox 637:3477 · Radio 637:5458 · Toggle 637:7393 |
| Chip, Icon button | Chip 641:2170 · Icon button 644:63703 |
| Метки | Badge 648:932 · Counter 648:69632 · Status 648:70847 · Divider 648:71630 · Avatar 648:72444 |
| Навигация | Tab 649:2507 · Segment 651:1084 |
| Загрузка | Progress 653:108 · Skeleton 654:108 · Spinner 655:73980 · Progress circle 655:74790 |
| Части | Scrollbar 655:108 · Page dot 655:69270 · Legend swatch 655:69958 · Step symbol 655:70881 · Chart crosshair 655:71709 · Avatar group 655:72464 · Code cell 656:108 |
| Атомы-части интерактивные | Pagination item 657:903 · Date cell 658:903 · Breadcrumb item 658:72470 · Tab bar item 658:74273 |
| Card | мастер `Card` 664:73999 + борда 664:74000 (страница 🟠 Card) |
| Молекулы | Tabs 658:76360 · Segmented 658:78623 |

**Решения Стефана (2026-10-18 / 19):**
- Коробка Checkbox / Radio 20 в обоих размерах — ок; Control Left/Right: Checkbox и Radio слева, Toggle справа, свойство оставляем.
- **Chip Vertical убран** (из набора «Chip» 47:364 удалены 8 вариантов и ось Layout, осталось Size × Selected × State = 16).
- **Card — атом-шаблон**, гибкий: слои-основы, градации радиусов и отступов. Свойства: Level 1–3 (`surface/level-*`) × Radius Surface 24 · Container 16 · Inner 8 × Padding S12 · M16 · L24 × Border On/Off, один слот `content`. Заголовки, слоты header/footer, жёсткие отступы задают виджеты и организмы поверх Card.
- **Nav icon — не компонент** (иконки в Icons). По умолчанию выделение активного как в iOS (в базу). Expressive: иконки как в сайдбаре Web, на мобилке мульти-кнопка с буквой E (смотреть в мобильных макетах); Android-стиль не берём.
- **Badge L = 32** (S 20 · M 24 · L 32) — сделано в мастере.
- Tab: Hover и Pressed нужны; меняется цвет текста, возможно полоска под текстом. Сейчас Off Hover = `text/primary` (было `text/secondary`), Pressed = Hover, у On без изменений. Решение по полоске и Pressed — на ревью.

**Решено 2026-10-30:** Tab Hover / Pressed — серая полоска (`border/subtle` / `border/default`), текст не акцентный · обводка Off у Chip и контролов (~1.3:1) остаётся, отклонение от WCAG 1.4.11 осознанное · Spinner и Progress circle — разные компоненты · глифы Badge → `icon/*` · Button + Badge — молекула · правила Dotted / Level 0 / Trailing icon ведёт Claude · DSP Export делает разработчик.

**Открыто:**
1. Banner — решено: «как Toast», нейтральная обводка (этап 2).
2. Выбор символов и иконок пересобран: Icons → «📝 Выбор v2 · Символы» / «· Иконки» (свойство «Решение» на карточках) — проходит Стефан. После — Avatar «монета / символ» и структура библиотек (рекомендация в OPEN-QUESTIONS).
3. Глифы Badge → `icon/*`: токены `icon/on-subtle/*` и `icon/on-warning` заведены в Foundations 2026-10-30 (экспорт в репо сделан). Ждёт Publish Foundations (Стефан) → Update all в Components → перепривязка 63 глифов и разведение Badge / Counter.
4. Counter M — кегль не сверялся; правка Badge L делалась в мастере.

**Статус порядка работ (конец чата 2, 2026-10-19):** п. 1 — вёрстка бордов сделана, добор по разделам 03–12 глазами; п. 2 — Tabs, Segmented, Avatar group слиты в атомные борды (раздел «13 · Группа» на Tab и Segment, «07» на Avatar), старые борды в 🗄 Archive; Badge / Counter развести — решение «да», не сделано; п. 3 — сделано: Step symbol, Avatar Image, Tab bar item, Status Neutral, Divider Dotted, Card Level 0, Chip Trailing icon и превью, Skeleton блик (диагональ, 3 %), Avatar group непрозрачный, раздел «08 · Движение» на 18 бордах, скругления L/XL у Button и Icon button, атом Dot; не сделано: полный набор блоков по образцу Button на всех бордах (Правила, Доступность, Код, Локали), единые таблицы, выноски на превью, Floating/sticky, safe/hit, обводка стеков по фону; п. 4 — страницы Figma сгруппированы; п. 5 (Plex) и п. 6 — не начаты. Правки мастеров (Avatar, Tab bar item, Step symbol, Button, Icon button, Divider, Card, Chip, Skeleton, Status / Dot) попадут в продукты после Publish Components.


**Tooltip перенесён из legacy (🟠 draft, страница «🟠 Tooltip»)** — legacy «base tooltip»: Placement Top / Bottom / Left / Right (сторона от элемента; уголок смотрит на элемент) × Tone Neutral (surface/raised + border/default, text/primary) / Accent (бренд, белый текст); пузырь r16 + сглаживание 60%, отступы 10/16, Label/MD, max-width 320 (текст переносится), тень Elevation/2 · S. Уголок — служебный набор `_Tooltip arrow` (Neutral / Accent): вектор из legacy + маска 1 px на стыке (контур одной линией); одна булева форма невозможна — пузырь тянется по тексту, уголок растянулся бы. Ориентация уголка — трансформацией инстанса. **Грань с уголком ≥ 58 px** (2 × r16 + основание 26): Left / Right — minHeight 58 (текст по центру), Top / Bottom и тултип Icon button — minWidth 58; иначе уголок заезжает на скругление и маска режет контур (ломались однострочные боковые). Маска — во всю ширину уголка (26×1), как в legacy. Тот же уголок — в тултипе Icon button. **Позиционирование:** по умолчанию Top; не помещается → Bottom; у бокового края / в rail → Right/Left; сдвиг ≥ control/safe-margin от края экрана, уголок над центром элемента, ≥ 16 от угла пузыря; отступ острия **8 px**; код — Floating UI (offset 17, flip, shift, arrow). **Только Web** — в приложении тултипа нет, пояснение — Sheet по тапу на «i». Комбинированная булева форма «пузырь + уголок» в Figma невозможна (при растяжении масштабирует уголок: проверено, 26×9 → 42×12) — уголок отдельным компонентом, в коде одна SVG-форма. **Время:** появление через 500 мс, между соседними элементами за 300 мс — сразу; по фокусу — сразу; Esc закрывает; enter 200 мс / exit 120 мс. App — по тапу на «i». Старый Tooltip 2.0 → deprecated в 🗄 Archive (2 инстанса переведены). Борда: варианты, 4 сценария позиционирования, правила.


**Icon button собран (🟠 draft, страница «🟠 Icon button»)** — из новой Button: квадрат S 32 · M 40 · L 48 · XL 56, одна иконка; Type: Primary · Secondary · Tertiary · Tertiary outline · **Ghost** (нейтральная, без подложки; подложка — слоем состояния на Hover/Pressed) · Text · Inverted; Tone: Default · Danger (Primary, Secondary, Text); State: Default · Hover · Pressed · **Loading** (отдельным состоянием) · Disabled — 200 вариантов. Свойства: Icon, **Label** (обязателен: aria-label + тултип), Focus ring, Show hit area, Show safe area. **Тултип** в Hover — форма точно legacy «base tooltip / neutral»: пузырь r16 + сглаживание 60%, обводка 1 внутрь, мягкий уголок 26×9 с обводкой + маска 1 px на стыке (контур одной линией); токены `surface/raised`, `border/default`, `text/primary`, Label/MD; тень — наша `Elevation/2 · S` (не legacy); видимость ← touch/is-fine (только Web). Старый Icon button → deprecated в 🗄 Archive; 209 инстансов переведены, Label по имени иконки, у 29 — «Подпись действия» (вписать). Компонент Tooltip 2.0 тоже перенести из legacy (сейчас он «облачко без уголка»).


Button заменён: новый компонент «Button» (страница «🟡 Button», 🟡 beta, Type × Tone × Size × State) — все инстансы в Components переведены (Error → Primary · Danger, Text error → Text · Danger); старый — «Button · deprecated» в 🗄 Archive, удалить в следующей версии. Ждёт: публикации Components, предупреждения разработки (major: ось Tone), отметки борды Ready for dev. Дальше — Icon button по тому же шаблону, затем иконки по брендам.

### 2026-10-05

Почему DS 2.0 не 1:1 с legacy: компоненты рисовались заново по замерам (±4 px), другое внутреннее устройство (gap вместо padding рамки Label), накопились «решения DS 2.0» (размеры S–XL, переименования типов, кегли). Переходим на перенос legacy-компонентов с пересадкой на токены. Пилот Button — на ревью.

2026-10-05: аудит по правилам DSP (docs/dsp.md). Foundations и Icons чистые; Components — статусы и цвета у всех, ~3 000 размеров привязано к семантике, ~1 700 ждут новых токенов (решение Стефана). Стефан: «сначала докрутить всю базу», дальше по шагам.

### 2026-10-04

Этап: **Base DS 2.0 готова к ревью** — чеклист в OPEN-QUESTIONS. Сделано: фокус (новое кольцо у всех интерактивных компонентов), 13-шаговые рампы, Style (Base/Expressive, роли декора) и страница «🌗 Visual language», Platform = Web · iOS · Mobile web · Android (поведение `os/*`, хаптики `haptic/*`), `perf-low.css` и `contrast-more.css`, a11y-проверка токенов. В работе: компоненты по аудиту (зоны нажатия, состояния, motion, «не только цветом», описания, строки миграции). Foundations — ждут публикации. 2026-10-05: кросс-браузерный прогон (Chromium + WebKit, статический анализ старых) — 6 исправлений в сборке, отчёт `docs/browser-support.md`.

## Принятые правила (не нарушать)

- **Имена размеров (2026-10-05)**: значение одинаково везде → цифра в px (`dimension/N`, `space/N`, `stroke/N`, `font-size/N`, `line-height/N`, `blur/N`); зависит от бренда/платформы → sm/md/lg/xl (= варианты S/M/L/XL) или роль (`radius/control`, `border/width/focus`); rem в именах нет (`dimension/x0-375` → `dimension/6`, code syntax `--dimension-6` — major, предупредить разработку).
- **Подложки контролов видны на L0–L2 в обеих темах** (≥ 1.2:1 к фону). Тонированные кнопки — альфа бренда/красного 16 / 24 / 32% (`action/accent/*`, `action/danger-subtle/*`), текст на них — `accent/on-subtle`, `status/danger/on-subtle` (AA на 32%). У каждого типа свой Pressed.
- **Шкала размеров** (2026-10-05): 2 4 6 8 10 12 16 20 24 28 32 40 48 56 64 — без нечётных и дробных; отступы `space/N` (числовые), радиусы по ролям; обводки 0.5 / 1, фокус 2, кольцо 4. Исключение — радиус кольца фокуса (радиус + 4).
- **Claude DS** (docs/claude-ds.md): токены, статусы и перенесённые компоненты — только из репо; синхронизация после публикации Foundations и после смены статуса компонента («обнови Claude DS»). Статус в `claude-ds/status.json` меняем вместе с эмодзи страницы в Figma; компонент в 🟡 beta → переносим в `claude-ds/components/`.
- **DSP** (docs/dsp.md): `Status:` первой строкой описания; всё на переменных (семантика — примитивы размеров не публикуются); code syntax WEB у каждой переменной; переименование/удаление = major, только через `deprecated`; после публикации Foundations — VPN + плагин DSP Export.

- **Base — по умолчанию и откат для всего.** Expressive — только pool и Monitoring и только на мощных устройствах без снижения прозрачности; в вебе — в современных движках (Chromium 76+, Firefox 103+, Safari / iOS 18+), старые → Base; в продукте нужен переключатель «Упрощённое оформление». Декор — слоями внутри тех же компонентов, через роли Style (`decor/*`, `material/*`, `light/*`, `edge/*`), не руками. Бюджет экрана — visual-language.md.
- **Новая идея по ходу этапа**: быстро и ничего не ломает → делаем сразу; иначе → парковка в OPEN-QUESTIONS.
- **Сайт = Web**: берёт базу, лендинги верстают поверх как хотят. Платформы Site нет.
- **Иконки**: один набор DS (каркас Lucide); Expressive добавляет обработку слоями (свечение активного), не отдельный набор. Логотипы монет — контент, одинаковы в обоих режимах.
- **Скоуп темы/бренда = все четыре `data-*` на одном элементе** + свои `color`/фон (вложенный `data-brand` без `data-theme` не пересчитывает семантику).
- **Веб в проде**: `ds.min.css` одним файлом + перф-гард `build/js/perf.js` в `<head>` до CSS; гард ставит `data-perf="low"` по сети / памяти / медленным кадрам (все браузеры). CI: `.github/workflows/ci.yml`.
- **Браузеры**: минимум Chrome/Edge 109, Firefox 115, Safari/iOS 15.4, Samsung 21 (`browserslist` в package.json, `npm run test:compat`); полная поддержка — Baseline Widely available. docs/browser-support.md.
- **Статус никогда не только цветом** (danger ↔ success путаются при дейтеранопии) — иконка или подпись рядом.


- **Порядок для каждого компонента (решение 2026-10-05, уточнено):** 1) берём legacy-компонент (импорт → detach) как основу — слои, устройство, свойства; 2) дорабатываем до 2.0: убираем лишнее (обёртки, сырые значения), токены по роли слоя, оси / размеры / состояния / имена свойств — как в 2.0 (API для DSP не меняется), добавляем кольцо фокуса, зоны нажатия, загрузку; значения — как получилось в 2.0 (Small = 32 и т. д.); 3) сверка с компонентом 2.0 по размерам, отличия — только намеренные; 4) заменить компонент 2.0 (то же имя, перевести инстансы). Образец — «Button · from legacy» на 🧪 Playground.
- **Перенос, а не перерисовка (решение 2026-10-05).** Компонент берём из legacy 1:1 (импорт → detach → тот же набор вариантов, слоёв и свойств) и пересаживаем legacy-переменные на токены DS 2.0 **по роли слоя** (legacy тёмный-only: `Color 1 [Text]` на Primary → `text/on-accent`, а не `text/primary`). Чего нет в legacy — берём из 2.0. Web + App сводим в один адаптивный (разница — через Platform). Значения вне шкалы не подгоняем молча — список на решение Стефану. Пилот: «Button · legacy» на 🧪 Playground. Старое правило ниже — история.
- **Миграция, а не перерисовка (до 2026-10-05).** Новый компонент повторяет форму (±4 px) и логику (оси, состояния, опции) legacy-компонента из DS Web / App / Site. Отклонения — только под шкалу токенов или решения DS 2.0, и каждое — в `docs/migration/components.csv`. Перед сборкой — замер legacy (Plugin API в файле DS Web), после — сравнение до/после.
- Иконки внутри скрытых инстансов не материализуются: чтобы перекрасить, временно показать (`visible = true`), перекрасить, вернуть.
- Текст внутри слота нельзя привязать к свойству — текстовые свойства держать вне слотов.

- **Рампы — в OKLCH**: 500 = якорь (hex не меняем), светлота равномерно к 50/950, hue тёмной половины = hue 500, общая кривая хромы, клип в sRGB. В коде — hex. Генератор и было/стало — страница «🎨 Ramps · OKLCH» в Foundations.

- **Одна задача — один способ.** У каждого варианта — жёсткое правило применения; блок «Когда использовать / Когда нет / Правила / Не делаем» в описании каждого компонента.
- **Отталкиваться от текущих продуктов** (цвета, состояния, типы) — сначала замер legacy, потом решение.
- **Уровни поверхностей (2026-10-05, новое)**: `surface/level-0…3` — последний L3, только системные примитивы: светлая neutral/0 · 100 · 150 · 200 (#fff · #f5f5f5 · #ececec · #e0e0e0; 150 подтянут с #eee 2026-10-06 — шаги 1.09 / 1.07 / 1.12), тёмная neutral/950 · 850 · 800 · 700 (#0a0a0a · #1a1a1a · #202020 · #262626; 800/700 подтянуты 2026-10-06 — L2/L3 были слишком светлые, шаги 1.14 / 1.07 / 1.08). Своих промежуточных шагов в рампе не заводим. Уровни отделяются подложкой, не обводкой (обводка — свойство карточки, не уровня). `bg/base`, `surface/default`, `surface/nested` — Deprecated-алиасы на level-0/1/2. Контрол — на уровень выше подложки.
- **Примитивы цвета — одна структура (2026-10-05)**: все 18 сплошных рамп (включая neutral) — 13 шагов 50 100 150 200 300 400 500 600 700 800 850 900 950 (150/850 — мелкая ступень у краёв для уровней); `color/white`, `color/black` отдельно (было neutral/0, /1000); все alpha-семейства — 13 шагов 4 8 12 16 24 32 40 48 56 64 72 80 88; `/0` (полностью прозрачный того же оттенка) — только где есть градиент: black, violet, electric-blue. Полушагов (450, 550, 10, 20, 76, 92) нет. Переименования примитивов — major для кода (`--color-neutral-0` → `--color-white`).
- **Текст по иерархии — альфа**: primary — сплошной (950 / 50); secondary 72%, tertiary 56% (AA на L0–L3), disabled 40% (black в светлой, white в тёмной). Так же icon/*.
- **Button: Type × Tone** — Type: Primary · Secondary · Tertiary · Tertiary outline · Text · Inverted; Tone: Default · Danger (у Primary, Secondary, Text). Было: Error, Secondary error, Text error.
- **Шрифты без лигатур** (2026-10-05): liga / clig / calt / dlig выключены — Web слой `type-features.css`, Flutter fontFeatures, Figma — в текстовых стилях (сделано). Ровные цифры в таблицах — `Numeric/*` (IBM Plex Mono); стили Tabular и font/family/numeric заводили и откатили.
- **Обводки и плашки — полупрозрачные** (2026-10-05): контраст к своему уровню одинаков на L0–L4 в обеих темах. Ступени: плашка ~1.2 / hover ~1.33 / pressed ~1.5; `border/subtle` ~1.2 (black 8 / white 8), `border/default` и `control/border/default` ~1.3 (12 / 10), `border/strong` ≥ 3:1 (48 / 40). Цветные тинты в тёмной теме плотнее (бренд и красный 24/32/40 против 16/24/32). `status/*/subtle` ~1.2, `status/*/border` ~1.6 (warning в светлой — сплошной amber 500). Текст на плашках `*/on-subtle` — свет 800, тёмн. 200 (AA ≥ 4.5 на всех уровнях). `surface/hover/active` — альфа 8 / 12. Сплошные нейтральные обводки и плашки не используем: на L3–L4 они сливаются.
- **Цвет по темам — одно правило для всех кнопок (2026-10-06), от шага 500:**
  - заливка Default — ближайшая к 500 ступень, где белый текст ≥ 4.5 (бренд 500, красный 600), одинаково в обеих темах;
  - **Hover / Pressed — кнопка становится контрастнее к фону (2026-10-06, финал):** в светлой теме темнее, в тёмной светлее — одинаково для всех кнопок внутри темы. Слой «краски» темы `state/layer` (свет — чёрный, тёмн. — белый; Inverted — `state/layer-inverse`, наоборот), Hover `state/hover` 6%, Pressed `state/pressed` 10% + масштаб 0.96. Почему не «всегда темнее»: в тёмной теме нейтральные подложки почти чёрные — затемнение даёт разницу 1.00–1.07 (не видно). При 6% / 10% разница с Default ≈ 1.1 / 1.2 у всех типов в обеих темах. Строчная Text: `text/accent-hover|pressed` — свет 600/700, тёмн. 300/200; `text/danger-hover|pressed` — свет 700/800, тёмн. 400/300. Слой, а не замена цвета: одно правило на все типы × тоны × бренды, в коде один `::before`.
  - **цветной текст и иконки (2026-10-09, П1 — одно правило для всех цветов):** ближайшая к 500 ступень с контрастом ≥ 4.5 на L0–L2 в своей теме; на L3 цветной текст не ставим. Итог: accent свет. 600 / тёмн. 400; danger 600 / 400; success 700 / 500; warning 800 / 500; info 700 / 400 (Geo accent 600 / 400). Hover / pressed — +1 / +2 ступени от фона (danger тёмн. 300 / 200). Проверка — `scripts/a11y-check.py`;
  - `prefers-contrast: more` — все цветные тексты и иконки на ступень дальше от фона (`contrast-more.css` считает от темы, без ручных значений);
  - кольцо фокуса — **нейтральное, решение 2026-10-26** (было полупрозрачный бренд 500): `border/focus` = чёрный 56 % (светлая) / белый 56 % (тёмная), `border/focus-ring` и `control/border/focus` ссылаются на него; контраст к L0–L3 ≥ 4.5 светлая / ≥ 5.7 тёмная; сплошное кольцо 2 px (`border/width/focus-ring` = `stroke/2`) через зазор 2 px (`focus/offset`); в Figma рамка кольца = компонент + 2 с каждой стороны, радиус = радиус контрола + 4 (`radius/focus-ring` EMCD 14 / Geo 8, `-sm` 12 / 6, `-lg` 18 / 10);
  - Secondary — только на L0–L1; Primary — на L0–L2 (тёмная L3: заливка < 3:1); текст Secondary = `text/accent` / `text/danger` (не on-subtle).
  - **Движение кнопки (2026-10-06):** Hover 0 → 8% — `motion/duration/feedback` 120 мс, `motion/easing/standard`; Pressed → 12% + `motion/scale/press` 0.96, те же 120 мс; касание — `haptic/press` (light), Web без хаптика; кольцо фокуса — сразу; Disabled — без анимаций; reduced motion — длительности ≈ 0, без масштаба (motion-reduced.css). В Figma — интерактивный компонент: Default → Hover (While hovering), Hover → Pressed (While pressing), Smart animate 120 мс cubic-bezier(0.2, 0, 0, 1). Блок «Движение» — в описании и на борде; шаблон для всех компонентов.
  - Брендовые роли: `accent/solid` 500, `solid-hover` 600, `solid-pressed` 700, `fg-on-light` 500, `fg-on-dark` 400, `fg-strong-on-light` 600, `fg-strong-on-dark` 300, `focus-ring-on-light` alpha 48, `focus-ring-on-dark` alpha 56.
- **Иконки — один слой `glyph`** (все 121; у file-csv/pdf/xls ещё `glyph · fill`). Иначе при замене иконки в инстансе цвет переносится не на все векторы.
- **Статус компонента — эмодзи в названии страницы** (2026-10-05): 🟠 draft · 🟡 beta · 🟢 stable · 🔴 deprecated; совпадает со строкой `Status:` в описании (DSP) и бейджем на борде. Легенда — на странице «📖 Как устроено». Button — 🟡 beta.
  - draft — дизайн в работе, никуда не брать; beta — дизайн готов, **в разработку и макеты**, правки ещё возможны (предупреждаем разработку); stable — сделан в коде (Vue, при необходимости Flutter), сверен с макетом (варианты, темы, платформы, фокус, зоны, контраст), есть на реальном экране, борда без открытых вопросов, ок Стефана; после stable API меняется только через deprecated + major; deprecated — не брать.
  - **Dev Mode:** beta ↔ борда «Ready for dev», stable ↔ «Completed». Ставится руками (выделить фрейм борды → Mark as ready for dev): Plugin API здесь devStatus не поддерживает.
- **Шаблон документации компонента** (образец — страница «🟡 Button» в Components, фрейм «Button — борда» 259:3: шапка со статусом → варианты → свойства Light/Dark → Text в строке → зоны → поверхности L0–L3 → правила колонками из описания): матрица вариантов с подписями (строки — Type, колонки — Size × State); свойства в Light и Dark; зоны нажатия Web vs касание (свойство Show hit area); поверхности L0–L4 в обеих темах; правила (Когда какой / Размер / Правила / Не делаем) — тот же текст в описании компонента (DSP). Курсоры — позже.
- **Уровни поверхностей (до 2026-10-05)**: L0 `bg/base` #0a0a0a · L1 `surface/default` #111 (карточка) · L2 `surface/nested` #1a1a1a · L3 hover #232323. Контрол на уровень выше подложки; Secondary — только на L1. `surface/raised` — поповеры.
- **Фокус** (решение 2026-10-03 — история; действует нейтральное кольцо 2026-10-26, см. выше и `components.md`): бледное кольцо 4 px вплотную к краю объекта, цвет бренд 200 / 800.
- **Рампы**: все хроматические цвета — 13 шагов (50–950). 8 цветов графиков сгенерированы OKLCH-генератором (500 — якорь); у electric-blue/green добавлены только 150/850/950.
- **Hit area** ≥ `touch/min` (Web 24, App 44); в коде max(размер, touch/min).
- **Input**: лейбл виден всегда; внутри только плейсхолдер-подсказка; Above по умолчанию, On border — только суммы/калькулятор в виджетах.
- **Skeleton** всегда с бегущим бликом (pulse — только при reduced motion). Loading у действий, Skeleton у данных.
- **Иконки**: обводки, толщина `icon/stroke/regular` (Web 1.5 / App 1.7), масса по keylines, простые глифы — своя шкала (plus 14, close 12, chevron 12, arrows 14). Remix и Iconly не используем; все иконки (и наши оригинальные) — на каркасе Lucide в нашем характере.
- **Права**: библиотеки редактирует только Stephane; разработка — viewer + свой PAT.
- **Changelog**: CHANGELOG.md (SemVer), в Figma Publish — одна строка с версией.

## Открытые вопросы


## Технические приёмы (Figma Plugin API)

- **Сетку вариантов на борде «🔘 Button» выравнивал Стефан** — скрипты не переставляют варианты (менять размеры — с сохранением x/y).

- **Черновики — с префиксом `_`** (не публикуются): `_Button · from legacy` (живёт на странице «🟡 Button»; `_Button · legacy` и старая дока Playground удалены). 2026-10-05 Components случайно опубликован с ними (draft) — в DSP MR их игнорировать; при следующей публикации исчезнут из библиотеки.

- **После каждой публикации Foundations / Icons — принять обновление в Components** (Assets → библиотеки → Updates → Update all). Иначе ранее импортированные переменные и компоненты остаются на старых значениях (белый L1, сплошной Disabled, иконки-группы). Плагином это не делается: `importVariableByKeyAsync` для уже импортированной переменной отдаёт ту же старую копию.

- **Старые подписки на переменные** (найдено 2026-10-05): в Components узлы были привязаны к старым копиям тех же переменных (тот же key, другой id, например `…/34:3` вместо `…/122:104`) — они отдавали старые значения (Disabled в тёмной = сплошной #1a1a1a). Проверка: `importVariableByKeyAsync(key).id !== boundId` → перепривязать. Прогнано по всем мастерам Components (~19 000 привязок). Перед сверкой цветов — всегда этот прогон; `variable.resolveForConsumer(node)` показывает реальное значение в контексте.
- **Disabled текст и иконки** — альфа black 40 / white 40 (~2.7 и 3.0–3.6:1 на любом уровне); подложка Disabled = 8%, как Default (не заметнее активной).
- **Сглаживание углов 60% (iOS squircle)** — из legacy; в Figma у всех скруглённых слоёв компонента одинаково, включая кольцо фокуса. Код: Flutter (iOS и Android) — `SmoothRectangleBorder` (пакет figma_squircle, smoothing 0.6); Web — обычный `border-radius` (на радиусах 10–12 разница ≈ 1 px), позже прогрессивно `corner-shape: squircle` (Chromium 139+). Принято Стефаном 2026-10-05.
- **Hit area / Safe area** — цвет токеном (`status/danger/solid` / `status/success/solid`), прозрачность — слоем 20% (прозрачность заливки сбрасывается при перепривязке).
- **Text / Text · Danger** — inline (по бокам 4 px — `space/4`): без подложки, без отступов и фиксированной высоты (высота = строка), Hover/Pressed — подчёркивание, иконки `icon/size/inline`, зона нажатия выходит за текст.
- **Safe area** (свойство Show safe area, зелёный `status/success/solid` 12%): `safe area · outer` — внешняя обводка толщиной `control/safe-margin` (Web 8, касание 12) = минимальное расстояние до соседей на канвасе; `safe area · content` — область содержимого внутри отступов (зависит от контента).
- **Скрытые дети инстансов**: в use_figma ставить `figma.skipInvisibleInstanceChildren = false`, иначе findAll не видит скрытые иконки/спиннеры.
- **Старые подписки и у компонентов** (иконки): `importComponentByKeyAsync(main.key).id !== main.id` → swapComponent.
- **Зона нажатия — два слоя** `hit area · web` (видимость ← touch/is-fine, минимум 24) и `hit area · app` (← touch/is-coarse, минимум 44): зона = max(размер компонента, `touch/min`). Figma не считает max() — поэтому два слоя; в коде один псевдоэлемент с `min-width/min-height: var(--touch-min)`. Токены control/hit-height/* заводили и удалили.
- **Кольца фокуса и обрезка**: рамки борды, набор и варианты — clipsContent = false (кольцо выходит на 6 px).
- **Зоны нажатия (было)**: рамки `hit area · fine/coarse` (видимость ← `touch/is-*`), внутри `hit area · overlay` — заливка 12%, видимость ← свойство Show hit area; зона может выходить за компонент (`clipsContent=false`).

- Слоты: `component.createSlot()` создаёт SLOT-узел + свойство; слот можно вложить в frame; пустой слот не схлопывается → нужен BOOLEAN «Show …» на visible.
- Spread-тени на фреймах рисуются только при `clipsContent=true`.
- Переменные из библиотеки — `figma.teamLibrary.getVariablesInLibraryCollectionAsync` → `importVariableByKeyAsync`; новые переменные доступны в других файлах только после публикации Foundations.
- Мастер-иконки живут в режиме Web (20px): глифы масштабировать относительно `comp.width/24`.
- Клоны вариантов теряют `componentPropertyReferences` — перепривязывать после клонирования.
- Экспорт токенов из Figma: скрипт в use_figma собирает коллекции в формат `figma/export-*.json` (`{c, m, v:[[name, type, values]]}`); ответ use_figma ≤ 20 KB, поэтому сначала сверять хеши коллекций и переносить только разошедшиеся. Пушим с Mac пользователя через Desktop Commander (его git-креды).
- Привязанным пейнтам ставить fallback-цвет = резолвнутое значение (иначе рендер/скриншот показывает чёрный).
- Экспорт иконок: `npm run icons` (нужен FIGMA_TOKEN в .env); токены: правка в Figma → экспорт коллекций в `figma/export-*.json` → `npm run all`.
