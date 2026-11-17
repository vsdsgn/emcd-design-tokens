# List item — контракт (2026-11-17)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `List item`. Status: beta. Level: unknown.
- Figma: Components, страница «List item» (`367:6`), набор `82:891`. Платформы: Web, Mobile web, iOS, Android.
- Надстройка над `_List row` (замена на месте 13.11): в каждом варианте раскрытый экземпляр базы (слой `_List row`, Type=List); оси Size, Content, State — на корне, свойства — на базе. Оси Style нет с 2026-11-15: карточный список — List item внутри Card.

## 2. Intent
- Строка списка данных: монета, кошелёк, воркер, транзакция, настройка. Слот Leading слева, тексты по Content, слот Trailing справа.
- Когда использовать: строки списков на Compact, перечни монет, воркеров, операций.
- Когда нет: сравнение по многим колонкам на Web — Table; пункт меню — Menu item; множественный выбор — Multiselect option; операция в истории — Transaction; уведомление — Notification.
- Правило выбора варианта:
  - Size: L — Web (текст 16 / 14); M — Compact (14 / 12). В одном списке — один Size.
  - Content: Text first — название, под ним описание; Description first — описание над названием; Big value — описание над крупным значением с единицей (Subvalue); Description only — одна строка.
  - State: Hover / Pressed — только если строка открывает детали; Disabled — строка недоступна.
  - Сумма — в Trailing справа (Numeric в коде); длинный адрес — сокращение в середине.
  - Карточный список — List item внутри Card (Style=Card удалён 2026-11-15).
- Не делаем: сумма слева; Hover / Pressed у строки, которая ничего не открывает.

## 3. Anatomy
- Корень (ширина 375 числом) — раскрытый `_List row` (Type=List): отступы L 16 / 16, M 12 / 16 (`space/16`, `space/12`, `control/padding-x/lg`), зазор `space/12`. Высота: L 76 (Big value 84), M 60 (Big value 68) — `list-row.md`.
- Внутри `_List row`: слот Leading → Label + Description (у Big value — значение + Subvalue) → слот Trailing; Divider; служебные слои (`state layer`, кольцо фокуса, зоны, безопасное поле).
- Тексты по умолчанию: BTC / Bitcoin.
- Вложено: `_List row` ×32.
- Служебные слои (вариантов из 32): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — без подложки; Hover / Pressed — слой `state/layer` во всю ширину строки, разделитель остаётся; Pressed плотнее Hover.
- Disabled — тексты `text/disabled`, иконка Leading `icon/disabled` (база `_List row`).
- Focus ring — свойство базы `_List row`. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | L |
| Content | Text first · Description first · Big value · Description only | Text first |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 32 вариантов.

- Своих свойств у набора нет: Label, Description, Subvalue, слоты Leading и Trailing, Divider, Focus ring, Show hit area, Safe margin — на раскрытом экземпляре базы `_List row` (слой `_List row`). Таблица — `list-row.md`, раздел 5.

## 6. Content / slots
- Label и Description — до 2 строк, дальше многоточие (правка `_List row` 13.11).
- Trailing — до 240 по ширине, текст — одна строка с многоточием (слот `_List row`, 2026-11-16).
- Big value при 200 % — многоточие в пределах 240 (тот же предел Trailing, 2026-11-16).
- Языки (de, ar, hi, th, ja, kk): по высоте не обрезано; de и th переносятся внутри слова.
- Текст 200 %: строки растут по высоте; монета 36 не растёт.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Стенд RTL не проверяет.

## 7. Events
- `click` по строке, если она открывает детали; у Disabled событий нет. Контролы в Trailing (кнопка, Toggle) — свои события.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: слой → `state/pressed`.
- Зоны нажатия web / app (проверка — Show hit area) и безопасное поле (Safe margin) — служебные слои базы `_List row`.

## 9. Accessibility
- Интерактивная строка — одна цель нажатия с полным именем; вложенные контролы — отдельные цели. Disabled — `aria-disabled`.
- Суммы — Numeric; длинный адрес сокращается в середине, полный — в доступном имени.

## 10. Tokens
- `_List row`: интервал `space/12`; отступы `control/padding-x/lg`, `space/12`, `space/16`.
- Значений без переменной: 32 (напр. `(root):w=375`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Size: L — Web, M — Compact (App, Mobile web).

## 12. Figma projection
- Набор `List item`, вариантов 32 из 32; оси: Size, Content, State.
- Борда: «List item — борда · шаблон v3», разделов 11.
- Описание: 1567 знаков, разделы: Status: Level: Code: Строка списка: Size: Суммы — A11y: Когда использовать: Поиск: Legacy: Кольцо фокуса: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsListItem>`; Flutter: `DsListItem`.
- Props: `size`: l | m; `content`: text-first | description-first | big-value | description-only.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-17)
- `audit.plugin.js` — 0 по набору после замены на месте 13.11; после снятия Style=Card (15.11) не перезапускался.
- `variables-check.plugin.js` — ширина корня 375 числом.
- `audit-parity.plugin.js` — 0 по набору после замены 13.11; после 15.11 не перезапускался.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 % (на 64 вариантах, до снятия Style=Card); перепроверка Dark 15.11 пройдена (после принятия в Components `surface/raised` Dark → `neutral/700`): различим на L0–L2; на L3 приподнятая поверхность равна L3 и держится обводкой / тенью — правило, не дефект; Dark-дефект стенда касался плашки Card (`surface/raised`) — снят вместе со Style=Card; свойства базы (Divider, Focus ring, зоны) на стенде не переключались; RTL стенд не проверяет; код — HTML/CSS.

## 15. Migration
- DS Web List (Desktop), Left, Content, Right → List item: Desktop → Size L / M; Left (Coin, Icon) → слот Leading; Content Type → Content; Right (Badge, Next, Button, Value, Toggle, Icon) → слот Trailing; Card=True → List item внутри Card.
- MAJOR 13.11: замена на месте, `Title` → `Label`, свойства перенесены на вложенный `_List row`.
- MAJOR 2026-11-15: ось Style удалена (64 → 32 варианта); экземпляры Style=Card → Card + List item.

Осталось доделать (после пакета правок beta 2026-11-13):
- Сверить: Description only — цвет `text/secondary` или `text/primary`; высота Description only L (стенд 76, `list-row.md` 68).
