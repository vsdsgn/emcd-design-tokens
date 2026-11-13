# Pagination item — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Pagination item`. Status: draft. Level: atom.
- Figma: Components, страница «Pagination item» (`1012:13`), набор `148:1633`.

## 2. Intent
- Номер страницы в Pagination. Selected — accent/subtle + text/accent; цифры табличные. Не использовать отдельно.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `page`.
- Служебные слои (вариантов из 10): кольцо фокуса 10 · зона Web 10 · зона касания 10 · безопасное поле 10.

## 4. States
- Ось State: Default · Hover · Pressed · Selected · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| State | Default · Hover · Pressed · Selected · Disabled | — |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 10 из 10 · служебное |
| Page | текст | «1» | 10 из 10 |
| Show hit area | булево | выкл | 10 из 10 · служебное |
| Safe margin | булево | выкл | 10 из 10 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- кнопка, имя «Страница N», у выбранной aria-current="page". |

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; отступы `control/padding-x/sm`, `space/8`; радиус `radius/control`, `radius/control-sm`.
- `page`: заливка / цвет `text/accent`, `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`, `radius/control-sm`.
- Min / max корня: minWidth 32 числом, minWidth 40 числом.
- Значений без переменной: 40 (напр. `(root):w=32`, `(root):h=32`, `hit area · web:w=32`, `hit area · web:h=32`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Pagination item`, вариантов 10 из 10; оси: Size, State.
- Борда: «Pagination item — борда · шаблон v3», разделов 10.
- Описание: 399 знаков, разделы: Status: Level: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPaginationItem>`; Flutter: `DsPaginationItem`.
- Props: `size`: s | m; `page`: string или слот.
- Состояния (Default, Hover, Pressed, Selected, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - MINMAX: minw=32, minw=40
  - RAW: 40 (напр. `(root):w=32`, `(root):h=32`)
  - BOARD: нет разделов 07, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
