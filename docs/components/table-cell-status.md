# Table cell / Status — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Table cell / Status`. Status: draft. Level: molecule.
- Figma: Components, страница «Table» (`367:42849`), набор `1719:21483`.

## 2. Intent
- Ячейка таблицы со статусом (точка и подпись), например «имя воркера · активен». Подпись и тон меняются свойствами открытого вложенного Status.
- Когда использовать: колонка «Имя и статус», «Статус» в таблицах.
- Когда нет: значение-бейдж с фоном — Table cell / Badge.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `status`, `skeleton`.
- Вложено: `Status` ×2, `Badge` ×1.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Skeleton · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | — |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- ячейка role="cell", статус читается текстом подписи; цвет точки дублируется текстом.

## 10. Tokens
- `корень`: интервал `space/8`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `status`: заливка / цвет `status/success/subtle`; интервал `space/6`, `space/8`; высота `size/badge-height/md`; отступы `control/padding-x/sm`; радиус `radius/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=160`, `(root):h=80`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Table cell / Status`, вариантов 3 из 3; оси: State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 562 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellStatus>`; Flutter: `DsTableCellStatus`.
- Props: нет.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - RAW: 6 (напр. `(root):w=160`, `(root):h=80`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: DS Web table cell / status.
