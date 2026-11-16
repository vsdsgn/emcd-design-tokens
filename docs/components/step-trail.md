# Step trail — контракт (2026-11-16)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Step trail`. Status: beta. Level: unknown.
- Figma: Components, страница «Step trail» (`1012:12`), набор `108:1429`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Линия между двумя шагами в Stepper: сплошная или пунктирная, в цвете состояния шага.
- Когда использовать: только внутри Stepper — линия между двумя Step.
- Когда нет: разделить блоки — Divider; отдельно в макете не ставится.
- Правило выбора варианта:
  - State повторяет состояние шага, из которого линия выходит: Default — впереди, пунктир `border/strong`; Current — текущий и Success — пройден, сплошная линия (ось Border снята 2026-11-16: вид линии задаёт State).
  - Ширина — всё свободное место между символами шагов.
- Не делаем: линия вне Stepper; State, не совпадающий с шагом-источником.

## 3. Anatomy
- Корень высотой `size/media/sm` (24 — высота Step symbol); `line` по центру высоты — обводка `border/width/default`: Default — `border/strong` пунктиром, Current — `control/checked`, Success — `status/success/solid` (сплошные).
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Default — пунктир `border/strong`.
- Current — линия `control/checked`.
- Success — линия `status/success/solid`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Current · Success | Default |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % на линию не влияют.
- RTL: линия симметрична; направление шагов зеркалит Stepper.

## 7. Events
- Нет.

## 8. Behavior
- Статична. Смену State задаёт Stepper.

## 9. Accessibility
- Декоративная, скрыта от читалки (`aria-hidden`).

## 10. Tokens
- `корень`: высота `size/media/sm`.
- `line`: обводка `border/strong`, `control/checked`, `status/success/solid`; толщина обводки `border/width/default`.
- Значений без переменной: 3 (напр. `(root):w=80`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Step trail`, вариантов 3 из 3; оси: State.
- Борда: «Step trail — борда · шаблон v3», разделов 11.
- Описание: 496 знаков, разделы: Status: Level: Линия между шагами: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepTrail>`; Flutter: `DsStepTrail`.
- Props: нет.
- Состояния (Default, Current, Success) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-16)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текста и булевых свойств нет; кода нет — parity props пропущена.

## 15. Migration
- DS Web: Step Trail (Border type, State) → Step trail (State Default | Current | Success).
- MAJOR 2026-11-16: ось Border удалена — Default всегда пунктир, Current и Success всегда сплошные; экземпляры Solid · Default и Dotted · Current / Success в макетах переключить.
