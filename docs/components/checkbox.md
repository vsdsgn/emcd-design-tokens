# Checkbox — контракт (2026-11-12)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Checkbox`. Status: beta. Level: atom.
- Figma: Components, страница «Checkbox» (`320:11`), набор `320:700`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Множественный выбор, согласие с условиями, выбор строк таблицы. Основа — legacy `baseCheckbox` (коробочка 20, r 6, подпись через 12).
- Когда использовать: несколько независимых вариантов, согласие, «выбрать все».
- Когда нет: мгновенное включение настройки — Toggle; один из нескольких — Radio.
- Правило выбора варианта:
  - Status: Off | On; Indeterminate — только у «выбрать все» и родителя группы.
  - Tone=Danger — ошибка проверки (обязательное согласие не отмечено); рядом текст ошибки.
  - Size: M — подпись 16/24 (формы, настройки); S — 14/20 (таблицы, плотные списки); коробочка 20 в обоих.
  - Control: Left — списки и формы (по умолчанию); Right — строки настроек с подписью на всю ширину. В одной группе — одинаково.
- Не делаем: чекбокс для действия «сразу»; отрицательные формулировки («Не присылать»); подпись, не связанная с коробочкой.

## 3. Anatomy
- Строка: `box` (коробочка с галочкой или чертой) + `label` + `description`.
- Служебные: `state layer` и `focus ring` на коробочке, зоны — на всю строку, `safe area · outer`.
- Вложено: иконки ×64.
- Служебные слои (вариантов из 96): кольцо фокуса 96 · зона Web 96 · зона касания 96 · безопасное поле 96.

## 4. States
- Группа модели состояний (`docs/components.md`): Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`; Pressed — масштаб коробочки 0.96.
- Default, Hover, Pressed, Disabled × Status Off | On | Indeterminate.
- Обводка в Off — `border/strong` (≥ 3:1 на L0–L3): граница — единственный признак контрола.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо 4 px с зазором 2 вокруг коробочки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On · Indeterminate | Off |
| Tone | Default · Danger | Default |
| Size | M · S | M |
| State | Default · Hover · Pressed · Disabled | Default |
| Control | Right · Left | Left |

Матрица полная: 96 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Получать уведомления о выплатах» | 96 из 96 |
| Show label | булево | вкл | 96 из 96 |
| Description | текст | «Письмо после каждого начисления» | 96 из 96 |
| Show description | булево | выкл | 96 из 96 |
| Focus ring | булево | выкл | 96 из 96 · служебное |
| Show hit area | булево | выкл | 96 из 96 · служебное |
| Safe margin | булево | выкл | 96 из 96 · служебное |

## 6. Content / slots
- Label — что выбирают, коротко; Description — уточнение второй строкой.
- Длинный текст переносится (max-width строки 480, подписи 436); коробочка остаётся у первой строки.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Control=Left в RTL оказывается справа — поэтому значения должны быть Start / End.

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
- `корень`: интервал `space/12`, `space/8`.
- `control`: высота `size/box`, `size/box-row`; ширина `size/box`.
- `box`: заливка / цвет `action/danger/default`, `control/box`, `control/checked`, `control/surface/disabled`; высота `size/box`; радиус `radius/control-xs`; обводка `border/strong`, `control/border/disabled`, `control/border/error`; толщина обводки `border/width/default`; ширина `size/box`.
- `text`: интервал `space/2`; отступы `space/12`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `description`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed` · `focus ring`: радиус `radius/sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse`.
- Min / max корня: maxWidth 480 числом.
- Значений без переменной: 192 (напр. `hit area · web:w=295`, `hit area · web:h=24`, `hit area · web:w=258`, `hit area · web:w=262`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Checkbox`, вариантов 96 из 96; оси: Status, Tone, Size, State, Control.
- Борда: «Checkbox — борда · шаблон v3», разделов 12.
- Описание: 1914 знаков, разделы: Status: Level: Чекбокс: • Tone = Danger — • M — • Hover / Pressed — • Кольцо фокуса — • Label — Правила: A11y:
- Пилот на базе `_Selection control` собран отдельно («Checkbox · пилот», `selection-control.md`); действующий набор — старой сборки.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCheckbox>`; Flutter: `DsCheckbox`.
- Props: `status`: off | on | indeterminate; `tone`: default | danger; `size`: m | s; `control`: right | left; `label`: string или слот; `showLabel`: boolean = true; `description`: string или слот; `showDescription`: boolean = false.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 480` (корень), `maxWidth 436 @label` числом.
- `audit-parity.plugin.js` — DESC: нет «Когда использовать», сущности; AXES: Control Left / Right → Start / End, State не последняя; MINMAX: 480; STATE: радиус слоя ≠ «box»; BASE: 0 из 96 на `_Selection control`.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseCheckbox with text`: status default | active | intermediate → Status Off | On | Indeterminate.
- disable → State=Disabled; danger → Tone=Danger; size md | sm → Size M | S; secondary не переносим; цвета → `control/*`.

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- Заменить набор на пилот с базой `_Selection control` (BASE, STATE).
- Control Left / Right → Start / End; State — последней осью.
- Описание: «Когда использовать:»; Убрать экранированные сущности (`&amp;…quot;`) из описания.
- max-width 480 / 436 — переменная или исключение.
