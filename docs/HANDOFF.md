# DS 2.0 — передача контекста (handoff)

Документ для нового чата / нового исполнителя. Обновлено: 2026-10-05.

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
| DSP / playbook (код из Figma, VPN) | https://ds-playground.pv2.org — смотрит Стефан на сайте; репо multigeo/ds-playground и прод (ui-emcd-web) ведёт разработчик, мы не клонируем. Правила: `docs/dsp.md` |
| Демо Button (живой код на токенах) | https://claude.ai/artifact/QemNjVgKuDXHC4K9hgaYg5 — тема / бренд / платформа / уровень, все типы × тоны × размеры × состояния; токены сняты из Foundations 2026-10-06 |
| Как вносить изменения | `docs/how-to-change.md` (+ Figma: Components «📖 Как устроено», Foundations «📖 Как вносить изменения») |
| Анализ продуктов (Claude Doc) | https://claude.ai/code/artifact/18d13abb-e234-467c-beba-4e3550066c04 |

Legacy: DS Web JNNaqYwsSSVYUZSwZHKc6q · DS App BPkXyq9M44BXOiUDCrmlJs · DS Site J6PbCXVOYcc65AalmMwABr · Icons vfeP94JBhNpcHWzgY4XPhV · Performa XfgcRWqVIFMfiBbESe76wN · Web App az9dcH60FMprvAVxpKdJ9k · App YhZrWgdAIbCB94eev15OFl · Monitoring kY3VUdBinylsci3KoLWwLC · Firmware oo1OKEZcesVVcADpWDH9VC · WL B2B oN07CJPpmwLyNxKifnOZLE · Geometria Web 1pkAsixhTAWk9ZL2uNjcmm · Geometria App UthnopDYfoHTWu3dgF7u2i

## Начало нового чата — прочитать по порядку

1. Этот файл (файлы, правила, приёмы).
2. `docs/OPEN-QUESTIONS.md` — **текущий этап** (чеклист), парковка, вопросы к Стефану.
3. `docs/HOW-IT-WORKS.md` — как устроена система (оси Brand · Theme · Platform · Viewport · Style).
4. По теме задачи: `style.md` + `visual-language.md` (Base/Expressive, декор), `platforms.md` (Web / Mobile web / iOS / Android, хаптики), `components.md` (правила, a11y, фокус), `effects.md`, `motion.md`, `a11y-report.md`, `browser-support.md` (браузеры, тест `npm run test:browsers`), `performance.md` (загрузка, кадры, перф-гард, `npm run test:perf`), `migration/`.

Репо — источник правды по состоянию; чат может обрываться. После каждого заметного шага: обновить этот файл / OPEN-QUESTIONS, `npm run all`, commit, push.

## Где мы (2026-10-06)

**ПРАВИЛО (повтор Стефана):** каждый компонент — из legacy-основы → токены DS 2.0 → докрутка; из 2.0 — только то, чего нет в legacy. Карта — `docs/migration/legacy-map.md`. Предыдущая пачка «досок без пересборки» — **не принята**: компоненты из списка «К пересборке» пересобираем.
**Input из legacy — пилот `_Input · from legacy`** (страница «🟠 Input», слева от борды; рядом рамка `_compare`: legacy / новый / 2.0): структура legacy input 1:1 (field r12 · отступы 16 · gap 12, text = caret + value, notch label с border gap 1 px, helper row 4 + counter), токены по ролям (control/surface/*, control/border/default|hover|focus|error|disabled, text/primary|tertiary|secondary|danger), докрутка 2.0: Size M 40 / L 48 / XL 56, Read-only, Label position Above, кольцо фокуса, зоны. API = Input 2.0 (Label, Value, Helper, Counter, Show-свойства, Focus ring) + **настоящие слоты Leading / Inline / Trailing** — Plugin API их умеет: `addComponentProperty(name,'SLOT')` + узел SLOT с `componentPropertyReferences = {slotContentId, visible}` (узлы скопированы из 2.0 вместе с содержимым по умолчанию). Не перенесено из legacy: кнопка очистки «×» в Hover / Focus / Error — решить: аддон в Trailing или свойство.
Дальше: ок Стефана → замена Input 2.0 (86 инстансов; проверить перенос содержимого слотов) → по карте: Select / Menu → Chip → Tabs → Segmented → Badge → …


**Вся библиотека разложена по страницам со статусом и бордами.** 🟡 beta: Button, Icon button. 🟠 draft (ждут ревью): Tooltip, Checkbox, Radio, Toggle, Input, Select, Textarea, Input amount, Code input, Password field, File upload, Calendar, Multiselect, Tabs, Segmented, Chip, Menu, Toast, Modal, Sheet, Side panel, Amount, Address, Transaction, Payout summary, Badge (+Counter), Status, Alert, Banner, Notification, Progress (+circle, Spinner), Skeleton, Empty state (+Status screen), Navigation (Sidebar, Nav item, Nav icon, Skip link), Tab bar, Header (Top bar, Page header, Site header, Balance widget), Breadcrumbs, Shell (+Site footer), Floating button, List item, Accordion, Divider, Slider, Avatar, Stepper, Pagination, Page indicator, Step progress, Scrollbar, Stat card, Table (+header cell, row, 13 типов ячеек), Chart (+plot, axis, tooltip, crosshair, metric, legend), Chip map. Старые категорийные страницы (Inputs, Data, Overlays…) пустые — можно удалить или сделать разделителями.
**Зоны у всех интерактивных:** Menu item, Nav item, Nav icon, List item, Pagination item, Accordion, Breadcrumb item, Tab bar item, Floating button, Table header cell, Chip cell, Date cell, Multiselect option, Legend item — hit area web / app, safe area, Show-свойства.
Порядок ревью: Стефан смотрит борду → «📝» заметки на борде или в чат → правка → 🟡 beta. Компоненты, сильно разошедшиеся с legacy, пересобираются по методу Button.


**Icon button → 🟡 beta** (ок Стефана).
**Tooltip доработан:** ось **Arrow = Start / Center / End** (уголок в 16 от угла пузыря; Start / End — когда элемент у края или широкий) → 24 варианта (Placement 4 × Arrow 3 × Tone 2). Правила переписаны полностью: когда применять (подпись к иконке, термин «i», обрезанное значение, причина Disabled, «Скопировано» 1,5 с) и когда нет (касание → Sheet, действия → Popover, ошибки → helper, график → Chart tooltip); анатомия и отступы (10/16, r16, ≤320, ≤3 строк, уголок 26×9 выступ 6, остриё 8 → пузырь 14, ≥16 от угла, грань ≥58, ≥8 от края экрана); алгоритм позиционирования (Top·Center → Bottom → сдвиг до 8 = Start/End → Right/Left → сужение; Floating UI offset 14, flip, shift 8, arrow 16); наложения (поверх Modal/Sheet, portal, один за раз, скрывается при прокрутке, pointer-events none); время и движение. Борда пересобрана: кейсы применения на живых компонентах, анатомия с замерами, матрица Placement × Arrow × Tone, 6 сценариев позиционирования, наложения, темы и уровни, правила.


**Поля и выбор — страницы и борды (🟠 draft):** Select (+ Select compact), Textarea, Input amount, Code input (+ Code cell), Password field, File upload (+ file), Calendar (+ Date cell), Multiselect (+ menu, option), Tabs (+ Tab), Segmented (+ Segment), Chip — у каждого своя страница «🟠 …» и борда общим сборщиком: шапка со статусом, матрица (строки — State / Selected; колонки — остальные оси, переносятся блоками; подписи осей в столбик), поверхности L0–L3 Light / Dark, правила из описаний. Эти компоненты уже на legacy-основе в 2.0 и прошли аудит токенов — пересборка не нужна; правки по ревью Стефана.
**Tab, Segment, Chip** — добавлены стандартные зоны: hit area · web (24) / · app (44), safe area, свойства Show hit area / Show safe area (у Segment заменены старые fine / coarse). Tab реагирует цветом текста (правило Text: в светлой темнее, в тёмной светлее), Segment — подложкой (surface/active, control/segment-hover).
**Осталось перевести в такой формат:** Data (таблицы, списки, графики, Accordion, Slider, Avatar, Stepper, Pagination…), Crypto (Amount, Address, Transaction…), Overlays (Menu, Toast, Modal, Sheet, Side panel), Feedback (Spinner, Skeleton, Badge, Status, Alert, Banner, Progress, Empty state…), Shell & Layout (Nav, Sidebar, Tab bar, Header, Breadcrumbs…), Floating button.


**Зоны в контролах выбора исправлены:** hit area у Checkbox / Radio / Toggle — вся строка (контрол + подпись), по высоте ≥ 24 Web / 44 касание; safe area outer подогнана к компоненту (после Control Left/Right съезжала). Проверено рендером на 5 компонентах, Web и iOS.
**Tooltip:** на борде — раздел «Темы и уровни» (все 8 вариантов на L0–L3, Light / Dark); варианты упорядочены Placement × Tone.
**Input → страница «🟠 Input»** (draft) с бордой: матрица State (9) × Label position × Size, поверхности L0–L3, правила. `control/border/hover` — нейтральный 24% (был бренд — Hover выглядел как Focus).
Дальше: Select, Select compact, Textarea — тем же порядком; затем Chip, Tabs, Segmented.


**Аудит токенов во всех компонентах (2026-10-06):** сырых цветов, отступов, gap, скруглений и толщин обводок в мастерах библиотеки — 0. Сделано: текстовые токены на фигурах → иконочные пары (85: индикаторы, шаги слайдера, точка статуса, спиннер, home indicator); text/danger в обводке → control/border/error; 283 отступа + 270 gap + 35 толщин привязаны к шкале; 88 отступов 14 → space/12 (решение «14 → 12»); бары графика r2 → radius/2xs, скелетоны r6 → radius/control-xs; модули QR-заглушки → fixed/dark / fixed/light. **Scopes расширены** там, где перекрёстное использование легитимно: status/*/solid → +STROKE_COLOR, border/* → +SHAPE_FILL/FRAME_FILL (разделители, индикаторы), data/*, control/checked|track|knob, skeleton/*, surface/level-*, action/disabled → +STROKE_COLOR, icon/* → +TEXT_FILL. Рамки наборов вариантов (служебные) в проверку не входят.
**Checkbox / Radio / Toggle:** ось **Control = Left / Right** (контрол слева или справа от текста по вёрстке; по умолчанию Checkbox и Radio — Left, Toggle — Right). **Disabled у контролов** — как у кнопок: `control/track-disabled` и `control/surface/disabled` 8%, `control/knob-disabled` 40% (было 4% и #fafafa — в светлой сливалось). Ползунку Toggle — тень Elevation/1 (белый ползунок на светлой дорожке).


**Input** — не пересобираем: 2.0 уже на legacy-основе (подпись в разрыве рамки, XL 56 / r 12 / отступы 16, helper 12) и со слотами Leading / Inline / Trailing (Plugin API не создаёт SLOT-свойства — пересборка их потеряет). Дорабатываем на месте по правилам 2.0. **Глобально перепривязаны устаревшие токены** в мастерах Components (~1900): space/3xs…3xl → space/2…64, bg/base → surface/level-0, surface/default → surface/level-1, surface/nested → surface/level-2 (значения те же).
**Где Стефан оставляет задачи на ревью:** в Figma — текстовый слой / стикер с префиксом «📝» прямо на борде компонента (я нахожу их скриптом, делаю, меняю префикс на «✅»); Figma-комментарии мне недоступны.


**Контролы выбора из legacy (🟠 draft, страницы «🟠 Checkbox», «🟠 Radio», «🟠 Toggle»)** — по методу «legacy-основа → 2.0»:
- **Checkbox** (legacy baseCheckbox: коробочка 20, r 6 = `radius/control-xs`, подпись через 12): Status Off · On · Indeterminate × Tone Default · Danger × Size M (16/24) · S (14/20) × State — 48. Off-обводка — `border/strong` (≥ 3:1, WCAG 1.4.11), On — `control/checked` + `icon/check` / `icon/minus` (`icon/on-accent`), Danger — `control/border/error` / `action/danger/default`.
- **Radio** (legacy baseRadio: круг 20, точка 8): Status Off · On × Tone × Size × State — 32; Off-обводка `border/strong`.
- **Toggle** (legacy baseToggle: дорожка 48×28 / 40×24, ползунок 20 / 16, отступ 4; подпись слева): Status × Size × State — 16; `control/track` / `control/checked` / `control/knob`; переключение — ползунок 200 мс, haptic/selection; в прототипе клик переключает.
- Общее: слой state/layer 6/10% на коробочке / круге / дорожке, Pressed 0.96; кольцо фокуса вокруг контрола (зазор 2); зоны нажатия web 24 / app 44 вокруг контрола (кликается вся строка); safe area; Label / Description / Focus ring / Show hit area / Show safe area; Danger 2.0 → ось Tone. Старые 2.0 → deprecated в 🗄 Archive; инстансы переведены (Checkbox 52, Radio 2, Toggle 5; старые Checkbox/Radio → Size S).


**Tooltip перенесён из legacy (🟠 draft, страница «🟠 Tooltip»)** — legacy «base tooltip»: Placement Top / Bottom / Left / Right (сторона от элемента; уголок смотрит на элемент) × Tone Neutral (surface/raised + border/default, text/primary) / Accent (бренд, белый текст); пузырь r16 + сглаживание 60%, отступы 10/16, Label/MD, max-width 320 (текст переносится), тень Elevation/2 · S. Уголок — служебный набор `_Tooltip arrow` (Neutral / Accent): вектор из legacy + маска 1 px на стыке (контур одной линией); одна булева форма невозможна — пузырь тянется по тексту, уголок растянулся бы. Ориентация уголка — трансформацией инстанса. **Грань с уголком ≥ 58 px** (2 × r16 + основание 26): Left / Right — minHeight 58 (текст по центру), Top / Bottom и тултип Icon button — minWidth 58; иначе уголок заезжает на скругление и маска режет контур (ломались однострочные боковые). Маска — во всю ширину уголка (26×1), как в legacy. Тот же уголок — в тултипе Icon button. **Позиционирование:** по умолчанию Top; не помещается → Bottom; у бокового края / в rail → Right/Left; сдвиг ≥ control/safe-margin от края экрана, уголок над центром элемента, ≥ 16 от угла пузыря; отступ острия **8 px**; код — Floating UI (offset 17, flip, shift, arrow). **Только Web** — в приложении тултипа нет, пояснение — Sheet по тапу на «i». Комбинированная булева форма «пузырь + уголок» в Figma невозможна (при растяжении масштабирует уголок: проверено, 26×9 → 42×12) — уголок отдельным компонентом, в коде одна SVG-форма. **Время:** появление через 500 мс, между соседними элементами за 300 мс — сразу; по фокусу — сразу; Esc закрывает; enter 200 мс / exit 120 мс. App — по тапу на «i». Старый Tooltip 2.0 → deprecated в 🗄 Archive (2 инстанса переведены). Борда: варианты, 4 сценария позиционирования, правила.


**Icon button собран (🟠 draft, страница «🟠 Icon button»)** — из новой Button: квадрат S 32 · M 40 · L 48 · XL 56, одна иконка; Type: Primary · Secondary · Tertiary · Tertiary outline · **Ghost** (нейтральная, без подложки; подложка — слоем состояния на Hover/Pressed) · Text · Inverted; Tone: Default · Danger (Primary, Secondary, Text); State: Default · Hover · Pressed · **Loading** (отдельным состоянием) · Disabled — 200 вариантов. Свойства: Icon, **Label** (обязателен: aria-label + тултип), Focus ring, Show hit area, Show safe area. **Тултип** в Hover — форма точно legacy «base tooltip / neutral»: пузырь r16 + сглаживание 60%, обводка 1 внутрь, мягкий уголок 26×9 с обводкой + маска 1 px на стыке (контур одной линией); токены `surface/raised`, `border/default`, `text/primary`, Label/MD; тень — наша `Elevation/2 · S` (не legacy); видимость ← touch/is-fine (только Web). Старый Icon button → deprecated в 🗄 Archive; 209 инстансов переведены, Label по имени иконки, у 29 — «Подпись действия» (вписать). Компонент Tooltip 2.0 тоже перенести из legacy (сейчас он «облачко без уголка»).


Button заменён: новый компонент «Button» (страница «🟡 Button», 🟡 beta, Type × Tone × Size × State) — все инстансы в Components переведены (Error → Primary · Danger, Text error → Text · Danger); старый — «Button · deprecated» в 🗄 Archive, удалить в следующей версии. Ждёт: публикации Components, предупреждения разработки (major: ось Tone), отметки борды Ready for dev. Дальше — Icon button по тому же шаблону, затем иконки по брендам.

## Где мы (2026-10-05)

Почему DS 2.0 не 1:1 с legacy: компоненты рисовались заново по замерам (±4 px), другое внутреннее устройство (gap вместо padding рамки Label), накопились «решения DS 2.0» (размеры S–XL, переименования типов, кегли). Переходим на перенос legacy-компонентов с пересадкой на токены. Пилот Button — на ревью.

2026-10-05: аудит по правилам DSP (docs/dsp.md). Foundations и Icons чистые; Components — статусы и цвета у всех, ~3 000 размеров привязано к семантике, ~1 700 ждут новых токенов (решение Стефана). Стефан: «сначала докрутить всю базу», дальше по шагам.

## Раньше (2026-10-04)

Этап: **Base DS 2.0 готова к ревью** — чеклист в OPEN-QUESTIONS. Сделано: фокус (новое кольцо у всех интерактивных компонентов), 13-шаговые рампы, Style (Base/Expressive, роли декора) и страница «🌗 Visual language», Platform = Web · iOS · Mobile web · Android (поведение `os/*`, хаптики `haptic/*`), `perf-low.css` и `contrast-more.css`, a11y-проверка токенов. В работе: компоненты по аудиту (зоны нажатия, состояния, motion, «не только цветом», описания, строки миграции). Foundations — ждут публикации. 2026-10-05: кросс-браузерный прогон (Chromium + WebKit, статический анализ старых) — 6 исправлений в сборке, отчёт `docs/browser-support.md`.

## Принятые правила (не нарушать)

- **Имена размеров (2026-10-05)**: значение одинаково везде → цифра в px (`dimension/N`, `space/N`, `stroke/N`, `font-size/N`, `line-height/N`, `blur/N`); зависит от бренда/платформы → sm/md/lg/xl (= варианты S/M/L/XL) или роль (`radius/control`, `border/width/focus`); rem в именах нет (`dimension/x0-375` → `dimension/6`, code syntax `--dimension-6` — major, предупредить разработку).
- **Подложки контролов видны на L0–L2 в обеих темах** (≥ 1.2:1 к фону). Тонированные кнопки — альфа бренда/красного 16 / 24 / 32% (`action/accent/*`, `action/danger-subtle/*`), текст на них — `accent/on-subtle`, `status/danger/on-subtle` (AA на 32%). У каждого типа свой Pressed.
- **Шкала размеров** (2026-10-05): 2 4 6 8 10 12 16 20 24 28 32 40 48 56 64 — без нечётных и дробных; отступы `space/N` (числовые), радиусы по ролям; обводки 0.5 / 1, фокус 2, кольцо 4. Исключение — радиус кольца фокуса (радиус + 4).
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
  - цветной текст и иконки (Text, Secondary, ссылки) — ближайшая к 500 ступень с контрастом ≥ 4.5 на L0: светлая — бренд 500, красный 600; тёмная — бренд 400, красный 500; текст · hover — +1 ступень (600 / 300);
  - `prefers-contrast: more` — цветной текст ещё на ступень дальше (бренд 600 / 300, красный 700 / 400) — `contrast-more.css`;
  - кольцо фокуса — **полупрозрачный бренд 500**: свет 48%, тёмн. 56% (контраст ~2:1 на L0–L3 в обеих темах; было сплошное 150 / 300 — в светлой терялось, в тёмной резало); **зазор 2 px** до компонента (`focus/offset` = 2, CSS `outline-offset`), обводка 4 наружу; в Figma рамка кольца = компонент + 2 с каждой стороны, радиус = радиус контрола + 2 (`radius/focus-ring` EMCD 14 / Geo 8, `-sm` 12 / 6);
  - Secondary — только на L0–L1; Primary — на L0–L2 (тёмная L3: заливка < 3:1); текст Secondary = `text/accent` / `text/danger` (не on-subtle).
  - **Движение кнопки (2026-10-06):** Hover 0 → 8% — `motion/duration/feedback` 120 мс, `motion/easing/standard`; Pressed → 12% + `motion/scale/press` 0.96, те же 120 мс; касание — `haptic/press` (light), Web без хаптика; кольцо фокуса — сразу; Disabled — без анимаций; reduced motion — длительности ≈ 0, без масштаба (motion-reduced.css). В Figma — интерактивный компонент: Default → Hover (While hovering), Hover → Pressed (While pressing), Smart animate 120 мс cubic-bezier(0.2, 0, 0, 1). Блок «Движение» — в описании и на борде; шаблон для всех компонентов.
  - Брендовые роли: `accent/solid` 500, `solid-hover` 600, `solid-pressed` 700, `fg-on-light` 500, `fg-on-dark` 400, `fg-strong-on-light` 600, `fg-strong-on-dark` 300, `focus-ring-on-light` alpha 48, `focus-ring-on-dark` alpha 56.
- **Иконки — один слой `glyph`** (все 121; у file-csv/pdf/xls ещё `glyph · fill`). Иначе при замене иконки в инстансе цвет переносится не на все векторы.
- **Статус компонента — эмодзи в названии страницы** (2026-10-05): 🟠 draft · 🟡 beta · 🟢 stable · 🔴 deprecated; совпадает со строкой `Status:` в описании (DSP) и бейджем на борде. Легенда — на странице «📖 Как устроено». Button — 🟡 beta.
  - draft — дизайн в работе, никуда не брать; beta — дизайн готов, **в разработку и макеты**, правки ещё возможны (предупреждаем разработку); stable — сделан в коде (Vue, при необходимости Flutter), сверен с макетом (варианты, темы, платформы, фокус, зоны, контраст), есть на реальном экране, борда без открытых вопросов, ок Стефана; после stable API меняется только через deprecated + major; deprecated — не брать.
  - **Dev Mode:** beta ↔ борда «Ready for dev», stable ↔ «Completed». Ставится руками (выделить фрейм борды → Mark as ready for dev): Plugin API здесь devStatus не поддерживает.
- **Шаблон документации компонента** (образец — страница «🟡 Button» в Components, фрейм «Button — борда» 259:3: шапка со статусом → варианты → свойства Light/Dark → Text в строке → зоны → поверхности L0–L3 → правила колонками из описания): матрица вариантов с подписями (строки — Type, колонки — Size × State); свойства в Light и Dark; зоны нажатия Web vs касание (свойство Show hit area); поверхности L0–L4 в обеих темах; правила (Когда какой / Размер / Правила / Не делаем) — тот же текст в описании компонента (DSP). Курсоры — позже.
- **Уровни поверхностей (до 2026-10-05)**: L0 `bg/base` #0a0a0a · L1 `surface/default` #111 (карточка) · L2 `surface/nested` #1a1a1a · L3 hover #232323. Контрол на уровень выше подложки; Secondary — только на L1. `surface/raised` — поповеры.
- **Фокус** (решение 2026-10-03): бледное кольцо 4 px (`border/width/focus-ring`) вплотную к краю объекта, без зазора (`focus/offset` = 0), повторяет скругление объекта. Цвет `border/focus-ring` = бренд 200 (светлая) / 800 (тёмная). Залитые объекты (кнопки, выбранный сегмент, тумблер) — только кольцо. Объекты без обводки или со светлой обводкой (инпут, селект, чип, карточка) — обводка становится `border/focus` (бренд 500 / 400) + кольцо. Осознанное исключение по контрасту: кольцо 200 на белом 1.8:1 → при `prefers-contrast: more` и forced-colors кольцо = бренд 400 / системный цвет. `radius/focus-ring(-sm)` остаются: в Figma кольцо — отдельная рамка, её внешний радиус = радиус объекта + 4. В CSS не нужны (box-shadow spread). Лайм — только highlight, не фокус.
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
