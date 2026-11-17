# Search — контракт · draft (2026-11-17)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Search`. Status: draft. Level: unknown.
- Figma: Components, страница «Search» (`2233:839`), набор `2233:913`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon`, `text`, `clear`.
- Вложено: иконки ×10, `Icon button` ×2.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Focus · Filled · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| State | Default · Hover · Focus · Filled · Disabled | — |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «Поиск» | 10 из 10 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-2`; интервал `space/8`; высота `control/height/md`, `control/height/sm`; отступы `space/12`, `space/4`; радиус `radius/control`; обводка `border/focus`, `border/subtle`; толщина обводки `border/width/default`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `text`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `clear`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- Значений без переменной: 10 (напр. `(root):w=320`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Search`, вариантов 10 из 10; оси: Size, State.
- Борда: шаблона v3 нет.
- Описание: 1026 знаков, разделы: Status: Level: Search — Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSearch>`; Flutter: `DsSearch`.
- Props: `size`: s | m; `text`: string или слот.
- Состояния (Default, Hover, Focus, Filled, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-17)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - SERVICE: нет кольца фокуса, зоны нажатия, безопасного поля
  - BOARD: нет борды v3

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
