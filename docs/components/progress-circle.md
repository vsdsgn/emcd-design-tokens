# Progress circle — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Progress circle`. Status: draft. Level: atom.
- Figma: Components, страница «Progress» (`366:3115`), набор `56:388`.

## 2. Intent
- Круговой прогресс: та же доля, когда места мало или прогресс — главное на карточке (заполнение пула, выполнение задания). Дуга — fill, угол меняется в Arc (Ellipse → Arc, End).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `track`, `fill`, `value`.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | — |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «60%» | 2 из 3 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=progressbar, aria-valuenow.

## 10. Tokens
- `track`: заливка / цвет `control/track`.
- `fill`: заливка / цвет `control/checked`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/md`, `type/body/sm`.
- Значений без переменной: 12 (напр. `(root):w=24`, `(root):h=24`, `track:w=24`, `track:h=24`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Progress circle`, вариантов 3 из 3; оси: Size.
- Борда: «Progress — борда · шаблон v3», разделов 8.
- Описание: 555 знаков, разделы: Status: Level: Круговой прогресс: S 24 — A11y: Поиск: Legacy: Motion:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsProgressCircle>`; Flutter: `DsProgressCircle`.
- Props: `size`: s | m | l; `value`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - PROPS: Value 2 из 3
  - RAW: 12 (напр. `(root):w=24`, `(root):h=24`)
  - BOARD: нет разделов 04, 05, 07, 12

## 15. Migration
- Legacy: CIrcle loader (DS Web) — для неизвестной длительности используйте Spinner
