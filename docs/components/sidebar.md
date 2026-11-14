# Sidebar — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Sidebar`. Status: draft. Level: unknown.
- Figma: Components, страница «Navigation» (`366:3392`), набор `66:370`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Header`, `logo (placeholder)`, `balance`, `Nav`, `Nav item`, `divider`, `Rectangle`, `Footer`.
- Вложено: `Balance widget · вынесено из DS` ×1, `Nav item` ×16.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Collapsed | Off · On | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Header | SLOT | `undefined` | 2 из 2 |
| Nav | SLOT | `undefined` | 2 из 2 |
| Footer | SLOT | `undefined` | 2 из 2 |
| Balance | булево | вкл | 1 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: эффект `material/regular/blur`; заливка / цвет `material/regular/fill`; интервал `space/8`; отступы `space/12`; радиус `radius/container`; обводка `edge/hairline`.
- `Header`: отступы `space/12`.
- `logo (placeholder)`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`.
- `balance`: интервал `space/2xs`; отступы `space/20`, `space/md`, `space/sm`.
- `Nav`: интервал `space/4`.
- `Nav item`: заливка / цвет `accent/subtle`; интервал `space/8`; высота `size/row/compact`; отступы `space/6`; радиус `radius/control`; ширина `size/row/compact`.
- `divider`: отступы `space/6`, `space/8`.
- `Rectangle`: заливка / цвет `border/subtle`.
- `Footer`: интервал `space/4`.
- Значений без переменной: 4 (напр. `(root):w=240`, `(root):h=800`, `(root):w=72`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Sidebar`, вариантов 2 из 2; оси: Collapsed.
- Борда: «Sidebar — борда · шаблон v3», разделов 10.
- Описание: 1092 знаков, разделы: Status: Level: Сайдбар: Слоты: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSidebar>`; Flutter: `DsSidebar`.
- Props: `collapsed`: boolean; `header`: string или слот; `nav`: string или слот; `footer`: string или слот; `balance`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web `sidebar / default` (widget Sidebar): Header frame / Navbar / Footer frame → слоты Header / Nav / Footer; ru → локализация текстом; `Sidebar item` → Nav item. `Balance widget` + Hotkeys — вынесен из DS, не переносим. DS App — нет.
