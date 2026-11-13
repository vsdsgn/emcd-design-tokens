# Input addon / Stepper — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Stepper`. Status: beta. Level: unknown.
- Figma: Components, страница «Input» (`349:2`), компонент `31:674`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Степпер − / + для числового поля.
- Когда использовать: небольшое целое число с шагом (количество, проценты).
- Когда нет: сумма с произвольным вводом — поле без степпера; диапазон — Slider.

## 3. Anatomy
- Две кнопки Icon button Ghost S (− и +) с интервалом `space/4`; `focus ring`.
- Вложено: иконки ×2.
- Служебные слои (вариантов из 1): кольцо фокуса 1 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует Icon button (Плашка).
- Состояния — у вложенных кнопок: на границе диапазона кнопка Disabled.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 1 из 1 · служебное |

## 6. Content / slots
- Текста нет. RTL: порядок − / + зеркалится вместе со строкой.

## 7. Events
- `decrement` / `increment` → поле меняет значение на шаг.

## 8. Behavior
- Удержание — автоповтор (в коде, с задержкой). Хаптик `haptic/selection` на шаг.
- Зона кнопок S 32 на касании расширяется до 44.

## 9. Accessibility
- Поле — `role="spinbutton"`, ↑ / ↓ меняют значение; кнопки — `aria-label` «Уменьшить» / «Увеличить».

## 10. Tokens
- `корень`: интервал `space/4`.
- `Icon button`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Компонент `Input addon / Stepper`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 361 знаков, разделы: Status: Level: Когда использовать:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonStepper>`; Flutter: `DsInputAddonStepper`.
- Props: нет.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13; отдельные компоненты обходятся).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `input type=number` (− / +) → Input + Input addon / Stepper; кнопки — Icon button Ghost S ×2.

Осталось доделать (после пакета правок beta 2026-11-13):
- Кнопки собраны слоями, а не экземплярами Icon button (в манифесте вложены только иконки) — пересадить на экземпляры.
