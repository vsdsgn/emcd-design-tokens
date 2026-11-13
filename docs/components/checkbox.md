# Checkbox — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Checkbox`. Status: beta. Level: unknown.
- Figma: Components, страница «Checkbox» (`320:11`), набор `320:700`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Множественный выбор, согласие с условиями, выбор строк таблицы. Основа — legacy `baseCheckbox` (коробочка 20, r 6, подпись через 12).
- Когда использовать: несколько независимых вариантов, согласие, «выбрать все».
- Когда нет: мгновенное включение настройки — Toggle; один из нескольких — Radio.
- Правило выбора варианта:
  - Status: Off | On; Indeterminate — только у «выбрать все» и родителя группы.
  - Tone=Danger — ошибка проверки (обязательное согласие не отмечено); рядом текст ошибки.
  - Size: M — подпись 16/24 (формы, настройки); S — 14/20 (таблицы, плотные списки); коробочка 20 в обоих.
  - Control position: Start — списки и формы (по умолчанию); End — строки настроек с подписью на всю ширину. В одной группе — одинаково.
- Не делаем: чекбокс для действия «сразу»; отрицательные формулировки («Не присылать»); подпись, не связанная с коробочкой.

## 3. Anatomy
- Строка: `box` (коробочка с галочкой или чертой) + `label` + `description`. Всё — внутри экземпляра базы `_Selection control`; контрол — экземпляр глифа.
- Служебные: `state layer` и `focus ring` на коробочке, зоны — на всю строку, `safe area · outer`.
- Вложено: `_Selection control` ×96.
- Служебные слои (вариантов из 96): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`; Pressed — масштаб коробочки 0.96.
- Default, Hover, Pressed, Disabled × Status Off | On | Indeterminate.
- Обводка в Off — `border/strong` (≥ 3:1 на L0–L3): граница — единственный признак контрола.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо 2 px с зазором 2 вокруг коробочки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On · Indeterminate | Off |
| Tone | Default · Danger | Default |
| Size | M · S | M |
| Control position | Start · End | Start |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 96 вариантов.

## 6. Content / slots
- Label — что выбирают, коротко; Description — уточнение второй строкой.
- Длинный текст переносится (max-width строки 480, подписи 436); коробочка остаётся у первой строки.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Control position = Start в RTL — справа.

## 7. Events
- `change` (значение: boolean; из Indeterminate — в On).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: масштаб коробочки 0.96, 120 мс.
- Кликается вся строка. Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="checkbox"`, `aria-checked` true | false | mixed; Пробел переключает.
- Подпись связана через `label`; ошибка — `aria-invalid` + `aria-describedby`.

## 10. Tokens
- `корень`: maxw `size/field/max`.
- `_Selection control`: интервал `space/12`, `space/8`; maxw `size/field/max`.
- Min / max корня: maxWidth 480 size/field/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Checkbox`, вариантов 96 из 96; оси: Status, Tone, Size, Control position, State.
- Борда: «Checkbox — борда · шаблон v3», разделов 12.
- Описание: 2205 знаков, разделы: Status: Level: Чекбокс: Когда использовать: • Tone = Danger — • M — • Hover / Pressed — • Кольцо фокуса — • Label — Правила: Сборка: A11y:
- Заменён на месте 2026-11-13: набор собран от базы `_Selection control` (`selection-control.md`), ид. набора и экземпляры в продуктах сохранены.
- Свойства Label, Description, Show label, Show description, Show hit area, Safe margin — на вложенном слое `_Selection control`; Focus ring — на глифе контрола. Растянул контрол по ширине — слою `_Selection control` поставить Fill.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCheckbox>`; Flutter: `DsCheckbox`.
- Props: `status`: off | on | indeterminate; `tone`: default | danger; `size`: m | s; `controlPosition`: start | end.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 436 @label` числом в базе — ждёт токена `size/*`.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseCheckbox with text`: status default | active | intermediate → Status Off | On | Indeterminate.
- disable → State=Disabled; danger → Tone=Danger; size md | sm → Size M | S; secondary не переносим; цвета → `control/*`.

Осталось доделать (после пакета правок beta 2026-11-13):
- max-width подписи 436 в базе — токен `size/*` (публикует Стефан).
- Стенд бренды × платформы и текст 200 % по всем вариантам — не снят.
