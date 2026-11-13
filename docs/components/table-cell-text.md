# Table cell / Text — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Table cell / Text`. Status: draft. Level: molecule.
- Figma: Components, страница «Table» (`367:42849`), набор `92:592`.

## 2. Intent
- Ячейка: текст (+ вторая строка).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `primary`, `secondary`, `skeleton`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Skeleton · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Align | Start · End | — |
| State | Default · Skeleton · Disabled | — |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Primary | текст | «userTableGuide» | 6 из 6 |
| Secondary | текст | «0 сделок» | 6 из 6 |
| Show secondary | булево | вкл | 6 из 6 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/8`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `primary`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `secondary`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 12 (напр. `(root):w=184`, `(root):h=80`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Table cell / Text`, вариантов 6 из 6; оси: Align, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 699 знаков, разделы: Status: Level: Ячейка: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellText>`; Flutter: `DsTableCellText`.
- Props: `align`: start | end; `primary`: string или слот; `secondary`: string или слот; `showSecondary`: boolean = true.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: table / label text (text = Show secondary, hover — строка).
