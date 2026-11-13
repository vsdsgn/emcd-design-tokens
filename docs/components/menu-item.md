# Menu item — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте надстройкой над базой `_List row` (2026-11-13); свойства, слоты, токены и приёмка базы — `docs/components/list-row.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Menu item`. Status: draft. Level: molecule.
- Figma: Components, страница «Menu item» (`1012:21`), набор `407:1987`.

## 2. Intent
- Пункт меню. Основа — legacy Dropdown item (44, отступы 10 / 12, слот слева, подпись 16 + описание 12, слот справа).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `_List row`.
- Вложено: `_List row` ×16.
- Служебные слои (вариантов из 16): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Pressed · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | — |
| Tone | Default · Danger | — |
| State | Default · Hover · Pressed · Disabled | — |

Матрица полная: 16 вариантов.

Свойства — на раскрытом экземпляре базы `_List row` (слой `_List row`): Label, Description, Show description, Subvalue, Show leading, Show trailing, слоты Leading и Trailing, Selected, Show selection, Selection control, Divider, Focus ring, Show hit area, Safe margin. Таблица — `docs/components/list-row.md`, раздел 5.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `_List row`: интервал `space/12`; отступы `space/10`, `space/12`, `space/16`; радиус `radius/sm`.
- Значений без переменной: 16 (напр. `(root):w=290`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Menu item`, вариантов 16 из 16; оси: Size, Tone, State.
- Борда: «Menu item — борда · шаблон v3», разделов 10.
- Описание: 1233 знаков, разделы: Status: Level: Пункт меню. • Leading — • Trailing — • M — • Show selection — • Tone = Danger — A11y: Кольцо фокуса:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMenuItem>`; Flutter: `DsMenuItem`.
- Props: `size`: m | l; `tone`: default | danger.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): по набору 0; замечания базы — `docs/components/list-row.md`, раздел 14. Стенд — на пилоте базы.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - RAW: 16 (напр. `(root):w=290`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
