# Toggle — контракт (2026-11-12)

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
  - Control: Right (по умолчанию) | Left; в одной группе — одинаково.
  - Ошибки (Tone=Danger) нет: неудача → откат положения + Toast.
- Не делаем: Toggle в форме с «Сохранить»; Toggle для выбора одного из вариантов; Disabled без объяснения причины; дублировать состояние текстом «Вкл / Выкл».

## 3. Anatomy
- Строка: `label` + `description` + `track` (дорожка с ползунком).
- Служебные: `state layer` и `focus ring` на дорожке, зоны — на всю строку, `safe area · outer`.
- Служебные слои (вариантов из 32): кольцо фокуса 32 · зона Web 32 · зона касания 32 · безопасное поле 32.

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
| State | Default · Hover · Pressed · Disabled | Default |
| Control | Left · Right | Right |

Матрица полная: 32 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Автовывод» | 32 из 32 |
| Show label | булево | вкл | 32 из 32 |
| Description | текст | «Выплата при достижении минимальной суммы» | 32 из 32 |
| Show description | булево | выкл | 32 из 32 |
| Focus ring | булево | выкл | 32 из 32 · служебное |
| Show hit area | булево | выкл | 32 из 32 · служебное |
| Safe margin | булево | выкл | 32 из 32 · служебное |

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
- `корень`: интервал `space/12`, `space/8`.
- `text`: интервал `space/2`; отступы `space/12`, `space/2`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `description`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `control`: высота `size/toggle-height/md`, `size/toggle-height/sm`; ширина `size/toggle-width/md`, `size/toggle-width/sm`.
- `track`: заливка / цвет `control/checked`, `control/track`, `control/track-disabled`; высота `size/toggle-height/md`, `size/toggle-height/sm`; радиус `radius/chip`; ширина `size/toggle-width/md`, `size/toggle-width/sm`.
- `knob`: заливка / цвет `control/knob`, `control/knob-disabled`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed` · `focus ring`: радиус `radius/chip`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse`.
- Min / max корня: maxWidth 480 числом.
- Значений без переменной: 64 (напр. `hit area · web:w=144`, `hit area · web:h=28`, `hit area · web:w=126`, `hit area · web:h=24`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Toggle`, вариантов 32 из 32; оси: Status, Size, State, Control.
- Борда: «Toggle — борда · шаблон v3», разделов 12.
- Описание: 1731 знаков, разделы: Status: Level: Переключатель: • M — • Hover / Pressed — • Переключение — • Кликается вся строка. • В прототипе Figma: • Label — Правила: A11y:
- Пилот на базе `_Selection control` — «Toggle · пилот» (`selection-control.md`); действующий набор — старой сборки.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsToggle>`; Flutter: `DsToggle`.
- Props: `status`: boolean; `size`: m | s; `control`: left | right; `label`: string или слот; `showLabel`: boolean = true; `description`: string или слот; `showDescription`: boolean = false.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — `maxWidth 480`, `maxWidth 436 @label` числом.
- `audit-parity.plugin.js` — DESC: нет «Когда использовать», сущности; AXES: Status булева, Control Left / Right, State не последняя; MINMAX: 480; STATE: радиус слоя ≠ «track»; BASE: 0 из 32.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseToggle with text`: active → Status Off | On; disable → State=Disabled; size md | sm → Size M | S; danger не переносим (ошибка → откат + Toast).

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- Заменить набор на пилот с базой `_Selection control`.
- Control → Start / End; State — последней осью; ось Status — решение по булевым осям.
- Описание: «Когда использовать:»; Убрать экранированные сущности (`&amp;…quot;`) из описания.
