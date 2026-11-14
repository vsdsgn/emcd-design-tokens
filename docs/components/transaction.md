# Transaction — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Transaction`. Status: beta. Level: unknown.
- Figma: Components, страница «Transaction» (`364:4553`), набор `172:832`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Transaction», уровень — молекула. Собран из иконки типа, вложенных Status и Amount.

## 2. Intent
- Строка операции в истории: вывод, пополнение, начисление, обмен. Нажимается целиком — открывает детали.
- Когда использовать: история операций в списке (кошелёк, главная, App).
- Когда нет: таблица операций на Web — Table row с Table cell / Transaction; детали операции — Side panel или Sheet по нажатию на строку.
- Правило выбора варианта:
  - Type: Withdrawal — вывод (стрелка вверх); Deposit — пополнение (стрелка вниз); Reward — начисление за майнинг (молния); Exchange — обмен (две стрелки).
  - Status: Completed — «Выполнено» (точка success); Pending — «В обработке» (точка warning); Failed — «Отклонено» (точка danger). Статус — Status: точка и слово, не только цвет.
  - State: Default · Hover · Pressed — отклик нажатия; вся строка — одна цель.
  - Сумма — Amount в конце строки, со знаком: «−» у вывода, «+» у пополнения и начислений; у Failed — без знака. Exchange в макете — без знака (правило не названо, см. todo).
  - Заголовок — действие и монета («Вывод BTC», «Обмен BTC → USDT»), одна строка.
- Не делаем: статус только цветом; сумма без знака у выполненной или ожидающей операции (кроме обмена); отдельная кнопка «Подробнее» в строке — нажимается вся строка.

## 3. Anatomy
- Корень: строка `icon` · `content` · `Amount`; высота `size/row/lg` (64), ширина 400 числом; радиус `radius/control`, отступы `space/12` / `space/16`, зазор `space/12`.
- `icon` — плашка `action/secondary/default` (`size/media/lg`, `radius/chip`) с иконкой типа `icon/size/md` (`arrow-up` / `arrow-down` / `lightning` / `exchange`).
- `content` (min-width `size/row/content-min`, зазор `space/4`) — `title` (`type/label/md`, `font-weight/medium`, `text/primary`) и `meta` (Fill, зазор `space/8`): `date` (`type/body/sm`, `text/secondary`) + вложенный Status.
- `Amount` — вложенный Amount со знаком по Type и Status.
- Служебные: слой `state/layer`, кольцо фокуса, зоны нажатия web / app, безопасное поле — свойства Focus ring, Show hit area, Safe margin.
- Вложено: иконки ×36, `Status` ×36, `Amount` ×36, `_Hit area` ×72, `_Safe margin` ×36.
- Служебные слои (вариантов из 36): кольцо фокуса 36 · зона Web 36 · зона касания 36 · безопасное поле 36.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` / `state/pressed`; Disabled нет.
- State: Default; Hover — слой × `state/hover`; Pressed — слой × `state/pressed`. Status — данные операции, не состояние строки (36 вариантов: Type × Status × State).
- Focus ring — кольцо 2 px снаружи корня, радиус `radius/focus-ring`. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Withdrawal · Deposit · Reward · Exchange | Withdrawal |
| Status | Completed · Pending · Failed | Completed |
| State | Default · Hover · Pressed | Default |

Матрица полная: 36 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 36 из 36 · служебное |
| Show hit area | булево | выкл | 36 из 36 · служебное |
| Safe margin | булево | выкл | 36 из 36 · служебное |

## 6. Content / slots
- Заголовок — действие + монета; дата — по локали («5 окт, 09:25»); сумма — по правилу Amount (не усекается).
- Длинный текст: заголовок — одна строка, многоточие; `meta` по ширине `content`: дата усекается многоточием, Status не вытесняется и виден всегда.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде зеркалирование не проверено.
- Языки: de, ar, hi, th, ja, kk — без обрезки по высоте.
- Текст 200 %: при ширине корня 400 числом сумма упирается в правый край, тикер обрезается (см. todo).

## 7. Events
- `click` по строке — открыть детали операции (Side panel / Sheet).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: слой → `state/pressed`.
- Смена Status — без анимации.
- Зоны нажатия web / app (проверка — Show hit area) и безопасное поле (Safe margin) — служебные слои.

## 9. Accessibility
- Строка — одна цель (кнопка или ссылка); доступное имя одной фразой: «Вывод BTC, 5 октября 09:25, выполнено, минус 0,005 BTC».
- Статус и знак — словами, не только цветом. Иконка типа — `aria-hidden`.
- Клавиатура: Tab — фокус, Enter (+ Пробел у кнопки) — открыть детали.

## 10. Tokens
- `корень`: интервал `space/12`; высота `size/row/lg`; отступы `space/12`, `space/16`; радиус `radius/control`.
- `icon`: заливка / цвет `action/secondary/default`; высота `size/media/lg`; радиус `radius/chip`; ширина `size/media/lg`.
- `icon/arrow-up`: высота `icon/size/md`; ширина `icon/size/md`.
- `content`: интервал `space/4`; мин. ширина `size/row/content-min`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `meta`: интервал `space/8`.
- `date`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Status`: интервал `space/6`.
- `Amount`: интервал `space/2`.
- `icon/arrow-down`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/lightning`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/exchange`: высота `icon/size/md`; ширина `icon/size/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`.
- Значений без переменной: 108 (напр. `(root):w=400`, `hit area · web:w=400`, `hit area · web:h=64`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Transaction`, вариантов 36 из 36; оси: Type, Status, State.
- Борда: «Transaction — борда · шаблон v3», разделов 11.
- Описание: 1167 знаков, разделы: Status: Level: Анатомия: Когда нет: State: A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTransaction>`; Flutter: `DsTransaction`.
- Props: `type`: withdrawal | deposit | reward | exchange; `status`: completed | pending | failed.
- Состояния (Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; ось State (Hover / Pressed), свойства Focus ring / Show hit area / Safe margin, плашка иконки и усечение даты — после стенда, им не проверены; код — HTML/CSS.

## 15. Migration
- DS App `txn-card-history` → Transaction (List item + Amount + Status); DS Web — нет; табличный вариант — DS Web `table / transaction` → Table cell / Transaction.
- Ось State (Default | Hover | Pressed) и свойства Focus ring, Show hit area, Safe margin — новые; экземпляры получают State=Default.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 400 числом — Fill по родителю (при 200 % сумма упирается в край, тикер обрезан).
- Правило знака для Exchange в описании не названо (в макете — без знака) — дописать.
