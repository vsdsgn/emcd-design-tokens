# Transaction — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Transaction`. Status: beta. Level: unknown.
- Figma: Components, страница «Transaction» (`364:4553`), набор `172:832`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Transaction», уровень — молекула. С 2026-11-15 — надстройка над `_List row` (Type=List, Size=M), как Menu item: в каждом варианте раскрытый экземпляр базы (слой `_List row`), свойства набора удалены. В слотах — иконка типа, Amount и Status.

## 2. Intent
- Строка операции в истории: вывод, пополнение, начисление, обмен. Нажимается целиком — открывает детали.
- Когда использовать: история операций в списке (кошелёк, главная, App).
- Когда нет: таблица операций на Web — Table row (Amount в слоте Table cell); детали операции — Side panel или Sheet по нажатию на строку.
- Правило выбора варианта:
  - Сумма (19.11): Amount M по концу строки (Align=End) — значение и фиат 14; в коде `showLeading={false}` — без плашки типа (история начислений App).
  - Status (19.11): у Completed статус не показываем — справа сумма и фиат «≈ $…» (как в App «История»); Status — только у незавершённых (Pending, Failed и т. п.)
  - Type: Withdrawal — вывод (стрелка вверх); Deposit — пополнение (стрелка вниз); Reward — начисление за майнинг (молния); Exchange — обмен (две стрелки); сумма Exchange — без знака: баланс не растёт и не убывает, меняется монета (правило 2026-11-16).
  - Status: Completed — «Выполнено» (точка success); Pending — «В обработке» (точка warning); Failed — «Отклонено» (точка danger). Статус — Status: точка и слово, не только цвет.
  - State: Default · Hover · Pressed — отклик нажатия; вся строка — одна цель.
  - Сумма — Amount в конце строки, со знаком: «−» у вывода, «+» у пополнения и начислений; у Failed — без знака. Exchange — без знака (правило Type).
  - Заголовок — действие и монета («Вывод BTC», «Обмен BTC → USDT»), одна строка.
  - Вложенный `_List row` открыт (17.11): Show leading = Off — история начислений App без плашки типа.
- Не делаем: статус только цветом; сумма без знака у выполненной или ожидающей операции (кроме обмена); отдельная кнопка «Подробнее» в строке — нажимается вся строка.

## 3. Anatomy
- Корень: раскрытый экземпляр `_List row` (Type=List, Size=M), высота 64.
- Слоты базы: Leading — плашка `status/neutral/subtle` (`size/media/lg`, `radius/chip`) с иконкой типа `icon/size/md` (`arrow-up` / `arrow-down` / `lightning` / `exchange`); Label — действие + монета; Description — дата; Trailing — вложенный Amount со знаком по Type и Status + вложенный Status.
- Служебные слои и свойства Focus ring, Show hit area, Safe margin — на базе `_List row` (`list-row.md`).
- Вложено: `_List row` ×36.
- Служебные слои (вариантов из 36): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` / `state/pressed`; Disabled нет.
- State: Default; Hover — слой × `state/hover`; Pressed — слой × `state/pressed`. Status — данные операции, не состояние строки (36 вариантов: Type × Status × State).
- Focus ring — свойство базы `_List row`: кольцо 2 px снаружи корня, радиус `radius/focus-ring`. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Withdrawal · Deposit · Reward · Exchange | Withdrawal |
| Status | Completed · Pending · Failed | Completed |
| State | Default · Hover · Pressed | Default |

Матрица полная: 36 вариантов.

- Свойства — на раскрытом экземпляре базы `_List row` (слой `_List row`): Label, Description, слоты Leading и Trailing, Focus ring, Show hit area, Safe margin. Таблица — `list-row.md`, раздел 5.

## 6. Content / slots
- Заголовок — действие + монета; дата — по локали («5 окт, 09:25»); сумма — по правилу Amount (не усекается).
- Длинный текст: Label и Description — одна строка, многоточие (правила `_List row`); Trailing (Amount + Status) не сжимается и виден всегда.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде зеркалирование не проверено.
- Языки: de, ar, hi, th, ja, kk — без обрезки по высоте.
- Текст 200 % (стенд 16.11): заголовок переносится, сумма не усекается; в строке 400 сумма шире места — в коде при нехватке ширины сумма и статус переходят под заголовок (Trailing слота `_List row` — до 240).

## 7. Events
- `click` по строке — открыть детали операции (Side panel / Sheet).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: слой → `state/pressed`.
- Смена Status — без анимации.
- Зоны нажатия web / app (проверка — Show hit area) и безопасное поле (Safe margin) — служебные слои базы `_List row`.

## 9. Accessibility
- Строка — одна цель (кнопка или ссылка); доступное имя одной фразой: «Вывод BTC, 5 октября 09:25, выполнено, минус 0,005 BTC».
- Статус и знак — словами, не только цветом. Иконка типа — `aria-hidden`.
- Клавиатура: Tab — фокус, Enter (+ Пробел у кнопки) — открыть детали.

## 10. Tokens
- `корень`: радиус `radius/control`.
- `_List row`: интервал `space/12`; отступы `control/padding-x/lg`, `space/12`.
- Значений без переменной: 36 (напр. `(root):w=400`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Transaction`, вариантов 36 из 36; оси: Type, Status, State.
- Борда: «Transaction — борда · шаблон v3», разделов 12.
- Описание: 1244 знаков, разделы: Status: Level: Когда нет: State: A11y: Когда использовать: Правила:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Transaction`), Vue `packages/vue/src/DsTransaction.vue`, CSS `claude-ds/components/Transaction/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsTransaction>`; Flutter: `DsTransaction`.
- Props: `type`: withdrawal | deposit | reward | exchange; `status`: completed | pending | failed.
- Состояния (Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.
- `fiat` — фиат «≈ $…» под суммой, только у `status="completed"` (Status не рендерится, 19.11); у pending / failed — Amount без фиата + Status (`statusLabel` — своё слово).

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; ось State (Hover / Pressed), свойства Focus ring / Show hit area / Safe margin, пересадка на `_List row` 2026-11-15 — плагинами и стендом не перепроверена; код — HTML/CSS.

## 15. Migration
- DS App `txn-card-history` → Transaction (List item + Amount + Status); DS Web — нет; табличный вариант — DS Web `table / transaction` → Table cell с Amount в слоте.
- Ось State (Default | Hover | Pressed) — новая; экземпляры получают State=Default.
- MAJOR 2026-11-15: надстройка над `_List row`; свойства набора (Focus ring, Show hit area, Safe margin) удалены → свойства базы; Status перенесён из строки даты в Trailing рядом с Amount.
