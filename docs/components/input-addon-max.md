# Input addon / Max — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Max`. Status: beta. Level: molecule.
- Figma: Components, страница «Input» (`349:2`), компонент `23:30`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Кнопка «Max» в suffix поля суммы: подставляет весь доступный остаток.
- Когда использовать: поле суммы с известным максимумом (вывод, обмен, депозит).
- Когда нет: любое другое действие в поле — Icon button в trailing-слоте.

## 3. Anatomy
- `text` («Max», `text/accent`) + `focus ring` + зоны `hit area · fine` / `hit area · coarse`.
- Служебные слои (вариантов из 1): кольцо фокуса 1 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Текстовый: Hover / Pressed меняют цвет текста, подложки нет.
- В наборе — одно состояние; Hover / Pressed — в коде по модели «Текстовый». Disabled — вместе с полем.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «Max» | 1 из 1 |
| Focus ring | булево | выкл | 1 из 1 · служебное |

## 6. Content / slots
- «Max» не переводится (решение по локалям — в парковке); текст не усекается.
- RTL: остаётся в конце поля.

## 7. Events
- `click` → поле получает максимальное значение.

## 8. Behavior
- Зона: `touch/is-fine` — 27×24, `touch/is-coarse` — 44 по высоте поля.
- После нажатия фокус остаётся в поле.

## 9. Accessibility
- `<button>`, `aria-label` «Ввести максимум»; Tab — после поля.

## 10. Tokens
- `text`: заливка / цвет `text/accent`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · fine`: видимость `touch/is-fine` · `hit area · coarse`: видимость `touch/is-coarse`.
- Значений без переменной: 2 (напр. `hit area · fine:w=27`, `hit area · fine:h=24`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Компонент `Input addon / Max`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 131 знаков, разделы: Status: Level:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonMax>`; Flutter: `DsInputAddonMax`.
- Props: `text`: string или слот.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — не обходит отдельные компоненты; упрощённая проверка DESC: нет «Когда использовать», нет «A11y:».
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web: кнопка Max в input суммы → Input addon / Max; зоны fine / coarse — новые.

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- Описание по шаблону.
- Имена зон `hit area · fine / coarse` отличаются от системных `hit area · web / app` — свести.
- Состояния Hover / Pressed / Disabled в Figma отсутствуют: добавить или записать «только в коде».
