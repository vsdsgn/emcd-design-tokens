# Toggle group — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Toggle group`. Status: beta. Level: unknown.
- Figma: Components, страница «Toggle group» (`1012:4`), набор `631:3104`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Toggle group», уровень — молекула. Собран из вложенных Toggle (по 3 в каждом варианте); подписи вариантов, Status и служебные слои — свойства вложенных Toggle.

## 2. Intent
- Группа переключателей: подпись группы, варианты, под ними подсказка.
- Когда использовать: набор настроек, которые применяются сразу (уведомления, безопасность).
- Когда нет: форма с кнопкой «Сохранить» — Checkbox group; один вариант из нескольких — Radio group.
- Правило выбора варианта:
  - Direction: Vertical — единственное значение (у Toggle — только Vertical).
  - Size: M | S — как у Toggle; в группе один размер и одно положение контрола.
  - State: Default; Disabled — вся группа неактивна, причина — в подсказке. Ошибки нет: неудача применения — откат положения + Toast (как у Toggle).
  - Show label — включено: подпись группы обязательна и формулирует вопрос или тему.
  - Show helper — подсказка под группой; в Disabled — причина.
- Не делаем: Toggle group в форме с «Сохранить»; группа без подписи; разные размеры или положение контрола в одной группе; Disabled без причины в подсказке.

## 3. Anatomy
- Корень: колонка `label` → `items` → `helper`; max-width `size/field/max` (480).
- `label` — подпись группы (`type/label/md`); `items` — вложенные Toggle в колонку (max-width `size/field/max`); `helper` — подсказка (`type/label/sm`).
- Зазоры — токены `space/*`: корень `space/12` / `space/8`, `items` — `space/16`. Значения описания (M 8 / 12, S 6 / 8) с набором не совпадают — см. todo.
- Служебных слоёв у набора нет: кольцо фокуса, зоны нажатия и безопасное поле — у вложенных Toggle.
- Вложено: `Toggle` ×12.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет своей: состояния наведения и нажатия — у вложенных Toggle (Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`; Pressed — масштаб 0.96).
- Default — подпись `text/primary`, подсказка `text/secondary`.
- Disabled — подпись, варианты и подсказка `text/disabled`, вложенные Toggle в Disabled (положение ручки сохраняется).
- Hover / Pressed / фокус — у отдельного варианта, не у группы. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Direction | Vertical | Vertical |
| Size | M · S | M |
| State | Default · Disabled | Default |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show label | булево | вкл | 4 из 4 |
| Show helper | булево | вкл | 4 из 4 |
| Label | текст | «Настройки» | 4 из 4 |
| Helper | текст | «Применяются сразу» | 4 из 4 |

- Свойства набора: Show label, Show helper, Label, Helper. Подписи вариантов и Status — у вложенных Toggle.

## 6. Content / slots
- Label — тема группы («Настройки», «Безопасность»); Helper — подсказка, в Disabled — причина.
- Длинный текст: подпись группы и подсказка — по ширине содержимого до 436, дальше переносятся; подписи вариантов в коде переносятся (flex-wrap), по правилу Toggle.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Языки (стенд): de, ar, hi, th, ja, kk в подписи и подсказке — без обрезки по высоте.
- Текст 200 %: в коде подписи вариантов переносятся. В Figma в узкой группе переключатель выходит за край — макет делать на ширине `size/field/max` (480).

## 7. Events
- `change` у каждого варианта (Toggle), применяется сразу; при неудаче — откат значения и Toast. У Disabled событий нет.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0. Отклик и переключение — у вложенных Toggle.
- Варианты независимы, переключение одного не меняет другие.

## 9. Accessibility
- `fieldset` с `legend` (или `role="group"` с `aria-labelledby`); подсказка — `aria-describedby`.
- Disabled — `aria-disabled` у каждого варианта.
- Клавиатура: Tab — по вариантам, Пробел и Enter переключают (`role="switch"`, как Toggle).
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`. Слои — во вложенных Toggle.

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`; maxw `size/field/max`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `items`: интервал `space/16`.
- `Toggle`: maxw `size/field/max`.
- `helper`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Min / max корня: maxWidth 480 size/field/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Toggle group`, вариантов 4 из 4; оси: Direction, Size, State.
- Борда: «Toggle group — борда · шаблон v3», разделов 11.
- Описание: 1388 знаков, разделы: Status: Level: Toggle group: • Direction: • Disabled — • M: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsToggleGroup>`; Flutter: `DsToggleGroup`.
- Props: `direction`: vertical; `size`: m | s; `showLabel`: boolean = true; `showHelper`: boolean = true; `label`: string или слот; `helper`: string или слот.
- Состояния (Default, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 436, helper 436).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; длинный текст и языки — только в подписи группы и подсказке, подписи вариантов не проверялись; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- Legacy-группы нет (DS Web / App); варианты — Toggle (DS Web `baseToggle with text`); подпись группы — по образцу DS App `Radiogroup`.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ограничение Figma: при 200 % в узкой группе переключатель выходит за край (в коде подпись переносится) — макеты на ширине `size/field/max`.
- Зазоры в описании (M 8 / 12, S 6 / 8, `space/6`) не совпадают с набором (корень `space/12` / `space/8`, `items` `space/16`) — свести.
- На решение: Show label = Off против правила «подпись обязательна» — описать случай внешнего заголовка (`aria-labelledby`) или убрать свойство.
- Описание: Direction Horizontal («2–3 коротких варианта») при единственном значении Vertical — убрать.
