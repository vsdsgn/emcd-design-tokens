# Divider — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Divider`. Status: draft. Level: atom.
- Figma: Components, страница «Divider» (`367:164`), набор `107:1275`.

## 2. Intent
- Разделитель: border/subtle, 1 px. Horizontal — между блоками, Vertical — между элементами в строке, Label — «или» между способами (вход, оплата).
- Когда использовать: разделить группы без карточек.
- Когда нет: между каждой строкой списка — хватает отступов.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Rectangle`, `label`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Orientation | Horizontal · Vertical | — |
| Label | Off · On | — |
| Style | Solid · Dotted | — |

Матрица: 6 из 8.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label text | текст | «или» | 2 из 6 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/12`.
- `Rectangle`: заливка / цвет `border/subtle`; обводка `border/default`; толщина обводки `border/width/default`.
- `label`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Значений без переменной: 8 (напр. `(root):w=320`, `(root):w=1`, `(root):h=40`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Divider`, вариантов 6 из 8; оси: Orientation, Label, Style.
- Борда: «Divider — борда · шаблон v3», разделов 8.
- Описание: 940 знаков, разделы: Status: Level: Разделитель: Когда использовать: Правила: A11y: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDivider>`; Flutter: `DsDivider`.
- Props: `orientation`: horizontal | vertical; `label`: boolean; `style`: solid | dotted; `labelText`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: divider text --1.0 (DS App), разделители внутри компонентов DS Web.
