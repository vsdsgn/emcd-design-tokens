# List item — контракт · draft (2026-11-14)

Заготовка: собрана автоматически. Набор заменён на месте надстройкой над базой `_List row` (2026-11-13); свойства, слоты, токены и приёмка базы — `docs/components/list-row.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `List item`. Status: draft. Level: unknown.
- Figma: Components, страница «List item» (`367:6`), набор `82:891`.

## 2. Intent
- Строка списка: монета, кошелёк, воркер, транзакция, настройка.
- Когда использовать: строки списков на Compact, перечни монет, воркеров, операций.
- Когда нет: сравнение по многим колонкам на Web — Table.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `_List row`.
- Вложено: `_List row` ×64.
- Служебные слои (вариантов из 64): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Pressed · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | — |
| Style | Plain · Card | — |
| Content | Text first · Description first · Big value · Description only | — |
| State | Default · Hover · Pressed · Disabled | — |

Матрица полная: 64 вариантов.

Свойства — на раскрытом экземпляре базы `_List row` (слой `_List row`): Label, Description, Show description, Subvalue, Show leading, Show trailing, слоты Leading и Trailing, Selected, Show selection, Selection control, Divider, Focus ring, Show hit area, Safe margin. Таблица — `docs/components/list-row.md`, раздел 5.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- интерактивная строка — одна цель нажатия с полным именем; вложенные контролы — отдельные цели.

## 10. Tokens
- `_List row`: заливка / цвет `surface/raised`; интервал `space/12`; отступы `control/padding-x/lg`, `space/12`, `space/16`; радиус `radius/control`.
- Значений без переменной: 64 (напр. `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `List item`, вариантов 64 из 64; оси: Size, Style, Content, State.
- Борда: «List item — борда · шаблон v3», разделов 11.
- Описание: 1831 знаков, разделы: Status: Level: Code: Строка списка: Size: Суммы — A11y: Когда использовать: Поиск: Legacy: Кольцо фокуса: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsListItem>`; Flutter: `DsListItem`.
- Props: `size`: l | m; `style`: plain | card; `content`: text-first | description-first | big-value | description-only.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): по набору 0; замечания базы — `docs/components/list-row.md`, раздел 14. Стенд — на пилоте базы.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: List (Card, Desktop), Left, Content, Right (DS Web ?List)
