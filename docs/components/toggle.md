# Toggle — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Toggle`. Status: beta. Level: atom.
- Figma: Components, страница «Toggle» (`323:2`), набор `323:227`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Переключатель: мгновенно включает настройку, без «Сохранить». Основа — legacy `baseToggle` (дорожка 48×28 / 40×24, ползунок 20 / 16).
- Когда использовать: настройка применяется сразу (уведомления, автовывод, 2FA-подтверждения).
- Когда нет: нужна кнопка «Сохранить» или отложенное применение — Checkbox; выбор одного из вариантов — Radio / Segmented.
- Правило выбора варианта:
  - Status: Off | On.
  - Size: M — дорожка 48×28, подпись 16/24 (настройки, формы); S — 40×24, подпись 14/20 (плотные списки, таблицы).
  - Control position: End (по умолчанию) | Start; в одной группе — одинаково.
  - Ошибки (Tone=Danger) нет: неудача → откат положения + Toast.
- Не делаем: Toggle в форме с «Сохранить»; Toggle для выбора одного из вариантов; Disabled без объяснения причины; дублировать состояние текстом «Вкл / Выкл».

## 3. Anatomy
- Строка: `label` + `description` + `track` (дорожка с ползунком). Всё — внутри экземпляра базы `_Selection control`; контрол — экземпляр глифа.
- Служебные: `state layer` и `focus ring` на дорожке, зоны — на всю строку, `safe area · outer`.
- Вложено: `_Selection control` ×32.
- Служебные слои (вариантов из 32): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`; Pressed — масштаб 0.96.
- Default, Hover, Pressed, Disabled × Status Off | On.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо вокруг дорожки, зазор 2.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On | Off |
| Size | M · S | M |
| Control position | End · Start | End |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 32 вариантов.

## 6. Content / slots
- Label — что включается («Автовывод»), а не действие («Включить автовывод»).
- Длинный текст переносится (max-width строки 480, подписи 436).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Ползунок в On — у конца строки.

## 7. Events
- `change` (boolean); при неудаче сервер-действия — откат значения.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Переключение: ползунок едет 200 мс (`motion/duration/enter`, `motion/easing/standard`), цвет дорожки — так же; «Уменьшить движение» — мгновенно.
- Хаптик: `haptic/selection` на касании.
- Кликается вся строка. Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `role="switch"`, `aria-checked`; Пробел и Enter переключают.
- Состояние не только цветом: положение ручки.

## 10. Tokens
- `корень`: maxw `size/field/max`.
- `_Selection control`: интервал `space/12`, `space/8`; maxw `size/field/max`.
- Min / max корня: maxWidth 480 size/field/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Toggle`, вариантов 32 из 32; оси: Status, Size, Control position, State.
- Борда: «Toggle — борда · шаблон v3», разделов 12.
- Описание: 2042 знаков, разделы: Status: Level: Переключатель: Когда использовать: • M — • Hover / Pressed — • Переключение — • Кликается вся строка. • В прототипе Figma: • Label — Правила: Сборка:
- Заменён на месте 2026-11-13: набор собран от базы `_Selection control` (`selection-control.md`), ид. набора и экземпляры в продуктах сохранены.
- Свойства Label, Description, Show label, Show description, Show hit area, Safe margin — на вложенном слое `_Selection control`; Focus ring — на глифе контрола. Растянул контрол по ширине — слою `_Selection control` поставить Fill.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsToggle>`; Flutter: `DsToggle`.
- Props: `status`: boolean; `size`: m | s; `controlPosition`: end | start.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 436 @label` числом в базе — ждёт токена `size/*`.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseToggle with text`: active → Status Off | On; disable → State=Disabled; size md | sm → Size M | S; danger не переносим (ошибка → откат + Toast).

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- max-width подписи 436 в базе — токен `size/*` (публикует Стефан).
- Стенд бренды × платформы и текст 200 % по всем вариантам — не снят.
