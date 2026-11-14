# Radio group — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Radio group`. Status: beta. Level: unknown.
- Figma: Components, страница «Radio group» (`1012:3`), набор `631:2295`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Radio group», уровень — молекула. Собран из вложенных Radio (по 3 в каждом варианте); подписи вариантов, Status, Tone и служебные слои — свойства вложенных Radio.

## 2. Intent
- Группа радио: подпись группы, варианты, под ними подсказка или ошибка.
- Когда использовать: один вариант из 2–5 видимых (способ вывода, тариф, период).
- Когда нет: больше 5 вариантов — Select; переключение вида — Segmented; несколько вариантов — Checkbox group.
- Правило выбора варианта:
  - Direction: Vertical — по умолчанию; Horizontal — только 2–3 коротких варианта.
  - Size: M | S — как у Radio; в группе один размер и одно положение контрола.
  - State: Default; Error — обязательный вариант не выбран; Disabled — вся группа неактивна, причина — в подсказке.
  - Show label — включено: подпись группы обязательна и формулирует вопрос или тему.
  - Show helper — подсказка или ошибка под группой; в Error — текст ошибки, в Disabled — причина.
- Не делаем: группа без подписи; разные размеры или положение контрола в одной группе; Horizontal для длинных подписей или больше 3 вариантов; больше 5 вариантов.

## 3. Anatomy
- Корень: колонка `label` → `items` → `helper`; max-width `size/field/max` (480).
- `label` — подпись группы (`type/label/md`); `items` — вложенные Radio в колонку или в строку с переносом (max-width `size/field/max`); `helper` — подсказка или ошибка (`type/label/sm`).
- Зазоры — токены `space/*`: корень `space/8` / `space/12`, `items` — `space/8`…`space/24`. Значения описания (M 8 / 12 / 24, S 6 / 8 / 16) с набором не совпадают — см. todo.
- Служебных слоёв у набора нет: кольцо фокуса, зоны нажатия и безопасное поле — у вложенных Radio.
- Вложено: `Radio` ×36.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет своей: состояния наведения и нажатия — у вложенных Radio (Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`).
- Default — подпись `text/primary`, подсказка `text/secondary`.
- Error — подсказка `text/danger`, у вариантов Tone = Danger (красная обводка кругов).
- Disabled — подпись, варианты и подсказка `text/disabled`, вложенные Radio в Disabled.
- Hover / Pressed / фокус — у отдельного варианта, не у группы. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Direction | Vertical · Horizontal | Vertical |
| Size | M · S | M |
| State | Default · Error · Disabled | Default |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show label | булево | вкл | 12 из 12 |
| Show helper | булево | вкл | 12 из 12 |
| Label | текст | «Частота вывода» | 12 из 12 |
| Helper | текст | «Выберите один вариант» | 12 из 12 |

- Свойства набора: Show label, Show helper, Label, Helper. Подписи вариантов, Status и Tone — у вложенных Radio.

## 6. Content / slots
- Label — тема или вопрос группы; Helper — подсказка, в Error — текст ошибки, в Disabled — причина.
- Длинный текст: подпись и подсказка переносятся по ширине группы (max 480), не усекаются; варианты в Horizontal переносятся на следующую строку. Длинные подписи вариантов — по правилу Radio.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Языки (стенд): de, ar, hi, th, ja, kk в подписи и подсказке — без обрезки по высоте.
- Текст 200 %: Vertical растёт по высоте; Horizontal — ряд вариантов переносится в пределах 480.

## 7. Events
- `change` (значение группы) — выбор варианта снимает прежний. У Disabled событий нет.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0. Отклик — у вложенных Radio.
- Ошибка показывается под группой вместо подсказки; выбран не больше чем один вариант.

## 9. Accessibility
- `fieldset` с `legend` (или `role="group"` / `radiogroup` с `aria-labelledby`); подсказка и ошибка — `aria-describedby`, ошибка — `aria-invalid` на группе.
- Disabled — `aria-disabled` у каждого варианта.
- Клавиатура — как у Radio: Стрелки меняют выбор, Tab входит в группу и выходит из неё.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`. Слои — во вложенных Radio.

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`; maxw `size/field/max`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `items`: gap2 `space/16`, `space/24`; интервал `space/12`, `space/16`, `space/24`, `space/8`; maxw `size/field/max`.
- `Radio`: maxw `size/field/max`.
- `helper`: заливка / цвет `text/danger`, `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Min / max корня: maxWidth 480 size/field/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Radio group`, вариантов 12 из 12; оси: Direction, Size, State.
- Борда: «Radio group — борда · шаблон v3», разделов 10.
- Описание: 1125 знаков, разделы: Status: Level: Radio group: • Direction: • Error — • M: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsRadioGroup>`; Flutter: `DsRadioGroup`.
- Props: `direction`: vertical | horizontal; `size`: m | s; `showLabel`: boolean = true; `showHelper`: boolean = true; `label`: string или слот; `helper`: string или слот.
- Состояния (Default, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 436, helper 436).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; длинный текст и языки — только в подписи группы и подсказке, подписи вариантов не проверялись; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS App `Radiogroup` → Radio group (подпись группы, ошибка, направление); DS Web группы нет. Варианты — Radio (DS Web `baseRadio with text`).

Осталось доделать (после пакета правок beta 2026-11-13):
- Правило длинной подписи и подсказки: описание говорит «одной строкой под группой», набор переносит — записать правило.
- Зазоры в описании (8 / 12 / 24 и 6 / 8 / 16, `space/6`) не совпадают с набором (`space/6` нет) — свести.
- На решение: Show label = Off против правила «подпись обязательна» — описать случай внешнего заголовка (`aria-labelledby`) или убрать свойство.
