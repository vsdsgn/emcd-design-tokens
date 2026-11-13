# Radio — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Radio`. Status: beta. Level: atom.
- Figma: Components, страница «Radio» (`322:2`), набор `322:435`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Один вариант из нескольких (2–5). Основа — legacy `baseRadio` (круг 20, точка 8, подпись через 12).
- Когда использовать: один выбор из 2–5 видимых вариантов; всегда группой, один выбран по умолчанию, если это безопасно.
- Когда нет: больше вариантов — Select; переключение вида — Segmented; одиночное «да / нет» — Checkbox или Toggle.
- Правило выбора варианта:
  - Status: Off | On.
  - Tone=Danger — ошибка проверки (не выбран обязательный вариант).
  - Size: M — 16/24, S — 14/20; круг 20 в обоих.
  - Control: Left (по умолчанию) | Right; в одной группе — одинаково.
- Не делаем: одиночное радио; радио для мгновенного действия; группу без подписи-вопроса.

## 3. Anatomy
- Строка: `circle` (круг с точкой) + `label` + `description`.
- Служебные: `state layer` и `focus ring` на круге, зоны — на всю строку, `safe area · outer`.
- Служебные слои (вариантов из 64): кольцо фокуса 64 · зона Web 64 · зона касания 64 · безопасное поле 64.

## 4. States
- Группа модели состояний (`docs/components.md`): Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`; Pressed — масштаб 0.96.
- Default, Hover, Pressed, Disabled × Status Off | On.
- Обводка круга в Off — `border/strong` (≥ 3:1).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On | Off |
| Tone | Default · Danger | Default |
| Size | M · S | M |
| State | Default · Hover · Pressed · Disabled | Default |
| Control | Right · Left | Left |

Матрица полная: 64 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Вывод раз в сутки» | 64 из 64 |
| Show label | булево | вкл | 64 из 64 |
| Description | текст | «Комиссия ниже, деньги приходят утром» | 64 из 64 |
| Show description | булево | выкл | 64 из 64 |
| Focus ring | булево | выкл | 64 из 64 · служебное |
| Show hit area | булево | выкл | 64 из 64 · служебное |
| Safe margin | булево | выкл | 64 из 64 · служебное |

## 6. Content / slots
- Длинный текст переносится (max-width строки 480, подписи 436); круг — у первой строки.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- `change` (значение группы).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Кликается вся строка. Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="radio"` внутри `role="radiogroup"`; Стрелки меняют выбор, Tab входит в группу один раз.
- Подпись и описание — `aria-labelledby` / `aria-describedby`.

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`.
- `control`: высота `size/box`, `size/box-row`; ширина `size/box`.
- `circle`: заливка / цвет `action/danger/default`, `control/box`, `control/checked`, `control/surface/disabled`; радиус `radius/chip`; обводка `border/strong`, `control/border/disabled`, `control/border/error`; толщина обводки `border/width/default`.
- `text`: интервал `space/2`; отступы `space/12`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `description`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `dot`: заливка / цвет `icon/disabled`, `icon/on-accent`; высота `size/dot/md`; ширина `size/dot/md`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed` · `focus ring`: радиус `radius/chip`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse`.
- Min / max корня: maxWidth 480 числом.
- Значений без переменной: 128 (напр. `hit area · web:w=171`, `hit area · web:h=24`, `hit area · web:w=149`, `hit area · web:w=153`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Radio`, вариантов 64 из 64; оси: Status, Tone, Size, State, Control.
- Борда: «Radio — борда · шаблон v3», разделов 12.
- Описание: 1390 знаков, разделы: Status: Level: Радио: • Tone = Danger — • Обводка круга в Off — • Hover / Pressed — A11y:
- Пилот на базе `_Selection control` — «Radio · пилот» (`selection-control.md`); действующий набор — старой сборки.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsRadio>`; Flutter: `DsRadio`.
- Props: `status`: boolean; `tone`: default | danger; `size`: m | s; `control`: right | left; `label`: string или слот; `showLabel`: boolean = true; `description`: string или слот; `showDescription`: boolean = false.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 480`, `maxWidth 436 @label` числом.
- `audit-parity.plugin.js` — DESC: нет «Когда использовать», сущности; AXES: Status булева, Control Left / Right, State не последняя; MINMAX: 480; STATE: радиус слоя ≠ «circle»; BASE: 0 из 64.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseRadio with text`: active → Status Off | On; disable → State=Disabled; danger → Tone=Danger; secondary не переносим.

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- Заменить набор на пилот с базой `_Selection control`.
- Control → Start / End; State — последней осью; ось Status Off | On — решение по булевым осям.
- Описание: «Когда использовать:»; Убрать экранированные сущности (`&amp;…quot;`) из описания.
