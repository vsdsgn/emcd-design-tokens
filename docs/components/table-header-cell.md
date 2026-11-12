# Table header cell — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Table header cell`. Status: draft. Level: molecule.
- Figma: Components, страница «Table» (`367:42849`), набор `62:67`.

## 2. Intent
- Заголовок колонки таблицы. Сортируемая колонка: клик меняет None → Descending → Ascending; активная — text/primary + стрелка.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `skeleton`.
- Вложено: иконки ×48.
- Служебные слои (вариантов из 20): кольцо фокуса 20 · зона Web 20 · зона касания 20 · безопасное поле 20.

## 4. States
- Ось State: Skeleton · Default · Hover · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Align | Left · Right | — |
| Sort | None · Ascending · Descending | — |
| State | Skeleton · Default · Hover · Pressed | — |

Матрица: 20 из 24.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Сумма» | 20 из 20 |
| Focus ring | булево | выкл | 20 из 20 · служебное |
| Show hit area | булево | выкл | 20 из 20 · служебное |
| Safe margin | булево | выкл | 20 из 20 · служебное |
| Show filter | булево | выкл | 18 из 20 |
| Show info | булево | выкл | 18 из 20 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- th scope=col, aria-sort; сортировка — кнопка внутри th.

## 10. Tokens
- `корень`: интервал `space/4`; отступы `space/12`.
- `label`: заливка / цвет `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`.
- Min / max корня: minWidth 80 числом.
- Значений без переменной: 80 (напр. `(root):w=160`, `(root):h=44`, `hit area · web:w=160`, `hit area · web:h=44`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Table header cell`, вариантов 20 из 24; оси: Align, Sort, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 689 знаков, разделы: Status: Level: Правила: A11y: Часть Table. Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableHeaderCell>`; Flutter: `DsTableHeaderCell`.
- Props: `align`: left | right; `sort`: none | ascending | descending; `label`: string или слот; `showFilter`: boolean = false; `showInfo`: boolean = false.
- Состояния (Skeleton, Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:
  - MATRIX: 20 из 24
  - AXES: `Align` — Left / Right вместо Start / End
  - PROPS: Show filter 18 из 20; Show info 18 из 20
  - MINMAX: minw=80
  - RAW: 80 (напр. `(root):w=160`, `(root):h=44`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: .table / column title (DS Web)
