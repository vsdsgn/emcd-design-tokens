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
  - Control position: Start (по умолчанию) | End; в одной группе — одинаково.
- Не делаем: одиночное радио; радио для мгновенного действия; группу без подписи-вопроса.

## 3. Anatomy
- Строка: `circle` (круг с точкой) + `label` + `description`. Всё — внутри экземпляра базы `_Selection control`; контрол — экземпляр глифа.
- Служебные: `state layer` и `focus ring` на круге, зоны — на всю строку, `safe area · outer`.
- Вложено: `_Selection control` ×64.
- Служебные слои (вариантов из 64): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

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
| Control position | Start · End | Start |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 64 вариантов.

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
- `корень`: maxw `size/field/max`.
- `_Selection control`: интервал `space/12`, `space/8`; maxw `size/field/max`.
- Min / max корня: maxWidth 480 size/field/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Radio`, вариантов 64 из 64; оси: Status, Tone, Size, Control position, State.
- Борда: «Radio — борда · шаблон v3», разделов 12.
- Описание: 1693 знаков, разделы: Status: Level: Радио: Когда использовать: • Tone = Danger — • Обводка круга в Off — • Hover / Pressed — Сборка: A11y:
- Заменён на месте 2026-11-13: набор собран от базы `_Selection control` (`selection-control.md`), ид. набора и экземпляры в продуктах сохранены.
- Свойства Label, Description, Show label, Show description, Show hit area, Safe margin — на вложенном слое `_Selection control`; Focus ring — на глифе контрола. Растянул контрол по ширине — слою `_Selection control` поставить Fill.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsRadio>`; Flutter: `DsRadio`.
- Props: `status`: boolean; `tone`: default | danger; `size`: m | s; `controlPosition`: start | end.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 436 @label` числом в базе — ждёт токена `size/*`.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseRadio with text`: active → Status Off | On; disable → State=Disabled; danger → Tone=Danger; secondary не переносим.

Осталось доделать (после пакета правок beta 2026-11-13):
- max-width подписи 436 в базе — токен `size/*` (публикует Стефан).
- Стенд бренды × платформы и текст 200 % по всем вариантам — не снят.
