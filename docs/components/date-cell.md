# Date cell — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Date cell`. Status: beta. Level: unknown.
- Figma: Components, страница «Date cell» (`1012:7`), набор `169:1370`. Платформы: Web, Mobile web, iOS, Android.
- Атом сетки Calendar; вне Calendar не используется.

## 2. Intent
- Ячейка одного дня в сетке Calendar: число и одно смысловое состояние (сегодня, выбран, край или середина диапазона, соседний месяц, недоступен).
- Когда использовать: только внутри Calendar — один день сетки.
- Когда нет: отдельно в макете; дата в тексте или таблице — обычный текст.
- Правило выбора варианта:
  - State — одно значение на день, смыслы не смешиваются: Today — сегодня; Selected — выбранный день; Range start / Range end — края диапазона; Range middle — дни внутри диапазона; Outside — день соседнего месяца; Disabled — день недоступен для выбора.
  - Default, Hover, Pressed — обычный день и его отклик на указатель и нажатие.
  - Ячейка квадратная (`control/height/md`); Day — только число дня, по центру, табличные цифры.
- Не делаем: два смысла в одной ячейке.

## 3. Anatomy
- Корень — квадрат `control/height/md` × `control/height/md`, `radius/control-sm`; заливка `action/primary/default` (Selected, Range start / end) или `accent/subtle` (Range middle); обводка `border/accent`, `border/width/default` (Today).
- `day` — число (`font/family/text`, `type/body/md` / `type/label/md`): `text/primary`, `text/accent`, `text/on-accent`, `text/disabled`.
- Служебные: `state layer`, `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer` (свойства Focus ring, Show hit area, Safe margin).
- Служебные слои (вариантов из 10): кольцо фокуса 10 · зона Web 10 · зона касания 10 · безопасное поле 10.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — число `text/primary` без подложки; Hover / Pressed — слой `state/layer` × `state/hover` / `state/pressed`.
- Today — обводка `border/accent`, число `text/accent`; Selected — заливка `action/primary/default`, число `text/on-accent`.
- Range start / Range end — как Selected, углы со стороны диапазона прямые (Range start — справа, Range end — слева); Range middle — заливка `accent/subtle`.
- Outside — погашенное число, без подложки; Disabled — погашенное и зачёркнутое число, не нажимается, без Hover.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Today · Selected · Range start · Range middle · Range end · Outside · Disabled · Pressed | Default |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Day | текст | «14» | 10 из 10 |
| Focus ring | булево | выкл | 10 из 10 · служебное |
| Show hit area | булево | выкл | 10 из 10 · служебное |
| Safe margin | булево | выкл | 10 из 10 · служебное |

## 6. Content / slots
- Day — число 1–31; не переводится и не зеркалится. Длинная строка не усекается и выходит за ячейку (стенд: long, de, ar, hi, th, ja, kk) — в Day передаётся только число.
- RTL: порядок дней в сетке и стороны Range start / Range end зеркалит Calendar.
- Текст 200 %: ячейка не растёт, число удвоенного кегля помещается без обрезки (проверено на стенде).

## 7. Events
- `click` → выбор дня (обрабатывает Calendar); у Disabled событий нет.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="gridcell"` с кнопкой внутри; выбранный день — `aria-selected`, сегодня — `aria-current="date"`, недоступный — `aria-disabled`.
- Доступное имя — полная дата («14 октября 2026»).
- Кнопка: Tab — фокус, Enter / Пробел — выбрать.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `action/primary/default`; высота `control/height/md`; радиус `radius/control-sm`; обводка `border/accent`; толщина обводки `border/width/default`; ширина `control/height/md`.
- `day`: заливка / цвет `text/accent`, `text/disabled`, `text/on-accent`, `text/primary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/md`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control-sm`.
- Значений без переменной: 20 (напр. `hit area · web:w=40`, `hit area · web:h=40`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Date cell`, вариантов 10 из 10; оси: State.
- Борда: «Date cell — борда · шаблон v3», разделов 11.
- Описание: 859 знаков, разделы: Status: Level: Ячейка дня в Calendar. Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDateCell>`; Flutter: `DsDateCell`.
- Props: `day`: string или слот.
- Состояния (Default, Hover, Today, Selected, Range start, Range middle, Range end, Outside, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кольцо фокуса и Safe margin видны частично (ряд стенда обрезает выступ); кода нет — parity props пропущена.

## 15. Migration
- DS Web `PeriodGridItem` (DataPicker / PeriodGrid) → Date cell; DS App — нет. Ось State (10 значений) и свойство Day — по набору 2.0; размер ячейки сверить с `PeriodGrid`.

Осталось доделать (после пакета правок beta 2026-11-13):
- `hit area · web` 40 × 40 — числом.
