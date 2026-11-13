# Scrollbar — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Scrollbar`. Status: draft. Level: atom.
- Figma: Components, страница «Scrollbar» (`367:1043`), набор `149:1690`.

## 2. Intent
- Полоса прокрутки для своих скролл-контейнеров (выпадающие списки, панели, таблицы). Источник: legacy DS Web «Scrollbar» (base scrollbar, scroll controller) и сырой «Scroll» 4 px в продуктах.
- Когда использовать: Web, где системный скроллбар ломает вид (тёмные панели, списки в оверлеях).
- Когда нет: App и мобильный веб — системный оверлей-скроллбар; основная страница — системный.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `thumb`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Dragging. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Orientation | Vertical · Horizontal | — |
| State | Default · Hover · Dragging | — |

Матрица полная: 6 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- прокрутка доступна колёсиком, клавишами и тачем — скроллбар не единственный способ. В коде: scrollbar-width: thin; |

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`; радиус `radius/chip`.
- `thumb`: заливка / цвет `icon/secondary`, `icon/tertiary`; радиус `radius/chip`, `radius/xs`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`; радиус `radius/chip`.
- Значений без переменной: 24 (напр. `(root):w=12`, `(root):h=120`, `thumb:w=4`, `thumb:h=48`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Scrollbar`, вариантов 6 из 6; оси: Orientation, State.
- Борда: «Scrollbar — борда · шаблон v3», разделов 8.
- Описание: 734 знаков, разделы: Status: Level: Когда использовать: Default — A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsScrollbar>`; Flutter: `DsScrollbar`.
- Props: `orientation`: vertical | horizontal.
- Состояния (Default, Hover, Dragging) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - RAW: 24 (напр. `(root):w=12`, `(root):h=120`)
  - SERVICE: нет кольца фокуса, зоны нажатия, безопасного поля
  - BOARD: нет разделов 04, 05, 07, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
