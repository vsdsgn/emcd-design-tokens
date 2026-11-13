# Date cell — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Date cell`. Status: draft. Level: atom.
- Figma: Components, страница «Date cell» (`1012:7`), набор `169:1370`.

## 2. Intent
- Ячейка дня в Calendar. Today — обводка border-accent; Selected/Range — action-primary; середина диапазона — accent-subtle; Disabled — зачёркнут и недоступен; Outside — дни соседних месяцев.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `day`.
- Служебные слои (вариантов из 10): кольцо фокуса 10 · зона Web 10 · зона касания 10 · безопасное поле 10.

## 4. States
- Ось State: Default · Hover · Today · Selected · Range start · Range middle · Range end · Outside · Disabled · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Today · Selected · Range start · Range middle · Range end · Outside · Disabled · Pressed | — |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Day | текст | «14» | 10 из 10 |
| Focus ring | булево | выкл | 10 из 10 · служебное |
| Show hit area | булево | выкл | 10 из 10 · служебное |
| Safe margin | булево | выкл | 10 из 10 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `action/primary/default`; радиус `radius/control-sm`; обводка `border/accent`; толщина обводки `border/width/default`.
- `day`: заливка / цвет `text/accent`, `text/disabled`, `text/on-accent`, `text/primary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/md`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control-sm`.
- Значений без переменной: 40 (напр. `(root):w=40`, `(root):h=40`, `hit area · web:w=40`, `hit area · web:h=40`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Date cell`, вариантов 10 из 10; оси: State.
- Борда: «Date cell — борда · шаблон v3», разделов 10.
- Описание: 362 знаков, разделы: Status: Level: Ячейка дня в Calendar.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDateCell>`; Flutter: `DsDateCell`.
- Props: `day`: string или слот.
- Состояния (Default, Hover, Today, Selected, Range start, Range middle, Range end, Outside, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - RAW: 40 (напр. `(root):w=40`, `(root):h=40`)
  - BOARD: нет разделов 07, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
