# Input addon / Chevron — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Chevron`. Status: beta. Level: unknown.
- Figma: Components, страница «Input» (`349:2`), компонент `31:670`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Шеврон для Select / Dropdown в trailing-слоте поля.
- Когда использовать: поле, которое открывает список (Select).
- Когда нет: раскрытие аккордеона или строки — своя иконка этих компонентов.

## 3. Anatomy
- Иконка `icon/chevron-down`, размер `icon/size/md`.
- Вложено: иконки ×1.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует состояние поля: Disabled / Read-only поля гасит аддон.
- Своих состояний нет; поворот при открытии — в коде.

## 5. Properties
Осей нет: один компонент.

## 6. Content / slots
- Текста нет. RTL: не зеркалится (направление вниз / вверх).

## 7. Events
- Нет: нажатие обрабатывает поле.

## 8. Behavior
- Open: поворот на 180°, `motion/duration/feedback`, `motion/easing/standard`; «Уменьшить движение» — мгновенно.

## 9. Accessibility
- Декоративен: `aria-hidden`; состояние — `aria-expanded` у поля.

## 10. Tokens
- `icon/chevron-down`: высота `icon/size/md`; ширина `icon/size/md`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Компонент `Input addon / Chevron`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 332 знаков, разделы: Status: Level: Когда использовать: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonChevron>`; Flutter: `DsInputAddonChevron`.
- Props: нет.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13; отдельные компоненты обходятся).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web: arrow в `Selector small` / `input` single select → Input addon / Chevron.
