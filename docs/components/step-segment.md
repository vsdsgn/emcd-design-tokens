# Step segment — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Step segment`. Status: beta. Level: unknown.
- Figma: Components, страница «Step segment» (`1012:22`), набор `149:1778`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Один сегмент полоски Step progress: шаг пройден, текущий или впереди.
- Когда использовать: только внутри Step progress — один сегмент на шаг.
- Когда нет: доля выполнения — Progress; шаги с названиями — Stepper.
- Правило выбора варианта:
  - State: Done — шаг пройден; Current — текущий шаг; Upcoming — шаг впереди.
  - Ширина — поровну на все сегменты ряда; высота — `size/track/sm`.
- Не делаем: сегменты разной ширины в одном ряду; сегмент вне Step progress.

## 3. Anatomy
- Корень — полоска высотой `size/track/sm`: заливка `control/checked` (Done, Current) или `control/track` (Upcoming), радиус `radius/chip`. Вложенных слоёв и текста нет.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Done и Current — акцент, выглядят одинаково: текущий шаг определяется позицией и озвучкой Step progress.
- Upcoming — `control/track`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Done · Current · Upcoming | Done |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % на сегмент не влияют.
- RTL: сам сегмент симметричен; порядок сегментов в ряду зеркалит Step progress.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. Смену State задаёт Step progress.

## 9. Accessibility
- Декоративный; позицию озвучивает Step progress («Шаг 2 из 5»).

## 10. Tokens
- `корень`: заливка / цвет `control/checked`, `control/track`; высота `size/track/sm`; радиус `radius/chip`.
- Значений без переменной: 3 (напр. `(root):w=40`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Step segment`, вариантов 3 из 3; оси: State.
- Борда: «Step segment — борда · шаблон v3», разделов 12.
- Описание: 457 знаков, разделы: Status: Level: Сегмент Step progress. Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepSegment>`; Flutter: `DsStepSegment`.
- Props: нет.
- Состояния (Done, Current, Upcoming) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текста и булевых свойств нет; кода нет — parity props пропущена.

## 15. Migration
- Legacy в описании не указан: новый атом для Step progress (State Done | Current | Upcoming).

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 40 — числом (образец; в продукте — поровну на ряд).
- Upcoming (`control/track`) в Dark на L0 и Light на L3 — перепроверить видимость стендом.
- В описании нет строки Legacy.
