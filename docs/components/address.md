# Address — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Address`. Status: draft. Level: molecule.
- Figma: Components, страница «Address» (`364:4435`), набор `171:126`.

## 2. Intent
- Адрес кошелька с копированием и QR.
- Когда использовать: не описано
- Когда нет: ввод адреса — Input с проверкой сети.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `row`, `address`, `copy`, `show QR`, `copied`, `status`.
- Вложено: иконки ×8.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Copied. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Format | Short · Full | — |
| State | Default · Copied | — |

Матрица полная: 4 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- кнопки «Копировать адрес» и «Показать QR-код»; статус копирования — role="status"; полный адрес доступен читалке даже в Short (aria-label). В RTL — изоляция направления. |

## 10. Tokens
- `корень`: интервал `space/6`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `row`: заливка / цвет `surface/raised`; интервал `space/4`; отступы `space/12`, `space/4`, `space/6`; радиус `radius/control`.
- `address`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/md`.
- `copy`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `show QR`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `copied`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `status`: заливка / цвет `text/success`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Значений без переменной: 4 (напр. `(root):w=360`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Address`, вариантов 4 из 4; оси: Format, State.
- Борда: «Address — борда · шаблон v3», разделов 10.
- Описание: 840 знаков, разделы: Status: Level: Short — Копировать — Когда нет: A11y: Формат адреса:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAddress>`; Flutter: `DsAddress`.
- Props: `format`: short | full.
- Состояния (Default, Copied) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - RAW: 4 (напр. `(root):w=360`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
