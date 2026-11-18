# Notification — контракт (2026-11-18)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Notification`. Status: beta. Level: unknown.
- Figma: Components, страница «Notification» (`366:2939`), набор `179:620`. Платформы: Web, Mobile web, iOS, Android.
- С 2026-11-15 — надстройка над `_List row` (Type=List, Size=M), как Menu item: в каждом варианте раскрытый экземпляр базы (слой `_List row`); свойства набора удалены.

## 2. Intent
- Запись в центре уведомлений (колокольчик в шапке): иконка, заголовок, текст и время.
- Когда использовать: событие произошло без участия пользователя — выплата, вход, новость.
- Когда нет: реакция на действие пользователя сейчас — Toast; сообщение в контексте страницы — Alert.
- Правило выбора варианта:
  - Status: Unread — не прочитано (фон + точка, не только цвет); Read — прочитано (без фона и точки). Нажатие помечает прочитанным.
  - State: Default · Hover · Pressed — отклик нажатия на всю запись.
  - Label (заголовок) — одна строка; Description (текст) — до 2 строк; время — по локали, в слоте Trailing.
  - Одно действие — вся запись одна цель: нажатие открывает связанный экран.
  - Ширина — `size/toast/min` … `size/toast/max`.
  - Иконка в Leading — по типу события: деньги (выплата, вывод, пополнение) — монета операции (Coin); безопасность (вход, смена пароля, 2FA) — иконка замка; системное (новость, обновление) — иконка колокольчика. Один тип — одна иконка во всей ленте (правило 2026-11-16).
- Не делаем: кнопки и ссылки внутри записи; непрочитанное только цветом, без точки; заголовок длиннее 2 строк.

## 3. Anatomy
- Корень: раскрытый экземпляр `_List row` (Type=List, Size=M), высота 76; max-width `size/toast/max`; у Unread — фон `accent/subtle`.
- Слоты базы: Leading — плашка `surface/next` (15.11) с иконкой `icon/size/md`; Label — заголовок; Description — текст (≤ 2 строк); Trailing — время (`type/body/sm`, `text/secondary`) + точка непрочитанного `surface/accent`.
- Служебные слои (`state layer`, кольцо фокуса, зоны, безопасное поле) и свойства Focus ring, Show hit area, Safe margin — на базе `_List row` (`list-row.md`).
- Вложено: `_List row` ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` / `state/pressed` поверх фона записи; Disabled нет.
- Status: Unread — фон `accent/subtle` + точка справа сверху; Read — без фона и точки. Высота одинаковая.
- State: Default; Hover — слой × `state/hover`; Pressed — слой × `state/pressed`. Status и State независимы (6 вариантов).
- Focus ring — свойство базы `_List row`: кольцо 2 px снаружи корня, радиус `radius/focus-ring`. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Unread · Read | Unread |
| State | Default · Hover · Pressed | Default |

Матрица полная: 6 вариантов.

- Свойства — на раскрытом экземпляре базы `_List row` (слой `_List row`): Label, Description, слоты Leading и Trailing, Focus ring, Show hit area, Safe margin. Таблица — `list-row.md`, раздел 5.

## 6. Content / slots
- Длинный текст: заголовок — одна строка, текст — 2 строки, дальше многоточие (правила `_List row`). Время — одна строка, короткое значение по локали.
- Языки: de — длинные слова переносятся по словам, за запись не выходят; ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (иконка ↔ точка), текст — по правому краю; суммы и адреса не зеркалятся.
- Текст 200 %: запись растёт по высоте, обрезки нет; иконка и точка размер не меняют.

## 7. Events
- `click` по записи — открывает связанный экран и помечает запись прочитанной (Unread → Read).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: слой → `state/pressed`.
- Unread → Read — по нажатию или по «Отметить все прочитанными» в шапке центра.
- Зоны нажатия web / app (проверка — Show hit area) и безопасное поле (Safe margin) — служебные слои базы `_List row`.

## 9. Accessibility
- Список — `role="feed"` или `list`; непрочитанное озвучивается словом («непрочитано»), точка и фон его дублируют.
- Запись — одна цель (кнопка или ссылка); Tab — фокус, Enter (+ Пробел у кнопки) — открыть.
- «Отметить все прочитанными» — кнопка в шапке центра уведомлений.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; maxw `size/toast/max`; мин. ширина `size/toast/min`; радиус `radius/control`.
- `_List row`: интервал `space/12`; отступы `control/padding-x/lg`, `space/12`.
- Min / max корня: minWidth 280 size/toast/min, maxWidth 400 size/toast/max.
- Значений без переменной: 6 (напр. `(root):w=400`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Notification`, вариантов 6 из 6; оси: Status, State.
- Борда: «Notification — борда · шаблон v3», разделов 11.
- Описание: 1139 знаков, разделы: Status: Level: Status: State: A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsNotification>`; Flutter: `DsNotification`.
- Props: `status`: unread | read.
- Состояния (Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-18)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; пересадка на `_List row` 2026-11-15 — плагинами и стендом не перепроверена; код — HTML/CSS.

## 15. Migration
- DS App `Card / Notification` → Notification (лента центра уведомлений); DS Web — нет. Иконку, время и точку непрочитанного сверить с DS App; в инвентаризации — кандидат в List item (решение 16.10).
- MAJOR: ось State (Unread | Read) → Status (Unread | Read) — в макетах переназначить экземпляры; State теперь — Default | Hover | Pressed.
- MAJOR 2026-11-15: надстройка над `_List row`; свойства набора Title, Text, Time, Focus ring, Show hit area, Safe margin удалены → Label, Description, слот Trailing и служебные свойства базы (оверрайды в макетах сбросятся).
