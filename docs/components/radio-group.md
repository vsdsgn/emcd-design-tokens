# Radio group — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Radio group`. Status: draft. Level: molecule.
- Figma: Components, страница «Radio group» (`1012:3`), набор `631:2295`.

## 2. Intent
- Radio group: подпись группы + варианты + подсказка или ошибка.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `items`, `Radio`, `helper`.
- Вложено: `Radio` ×36.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Error · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Direction | Vertical · Horizontal | — |
| Size | M · S | — |
| State | Default · Error · Disabled | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show label | булево | вкл | 12 из 12 |
| Show helper | булево | вкл | 12 из 12 |
| Label | текст | «Частота вывода» | 12 из 12 |
| Helper | текст | «Выберите один вариант» | 12 из 12 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`; maxw `size/field/max`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `items`: интервал `space/12`, `space/16`, `space/24`, `space/8`.
- `Radio`: maxw `size/field/max`.
- `helper`: заливка / цвет `text/danger`, `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Min / max корня: maxWidth 480 size/field/max.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Radio group`, вариантов 12 из 12; оси: Direction, Size, State.
- Борда: «Radio group — борда · шаблон v3», разделов 10.
- Описание: 516 знаков, разделы: Status: Level: Radio group: • Direction: • Error — • M:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsRadioGroup>`; Flutter: `DsRadioGroup`.
- Props: `direction`: vertical | horizontal; `size`: m | s; `showLabel`: boolean = true; `showHelper`: boolean = true; `label`: string или слот; `helper`: string или слот.
- Состояния (Default, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
