# Amount — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Amount`. Status: draft. Level: atom.
- Figma: Components, страница «Amount» (`364:4398`), набор `167:78`.

## 2. Intent
- Сумма в криптовалюте или фиате. Единственный способ показать деньги в интерфейсе.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `row`, `value`, `ticker`, `fiat`, `sign`.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L · XL | — |
| Sign | None · Positive · Negative | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «0,12345678» | 12 из 12 |
| Ticker | текст | «BTC» | 12 из 12 |
| Fiat | текст | «≈ 2 731,40 $» | 12 из 12 |
| Show fiat | булево | вкл | 12 из 12 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- читалка озвучивает сумму целиком с тикером («ноль целых двенадцать... биткоина»), в коде — aria-label с полной суммой; в RTL сумма и тикер изолированы (bdi). |

## 10. Tokens
- `корень`: интервал `space/2`.
- `row`: интервал `space/4`, `space/6`, `space/8`.
- `value`: заливка / цвет `text/primary`, `text/success`; типографика `font-weight/bold`, `font-weight/regular`, `font/family/display`, `font/family/mono`, `type/body/md`, `type/body/sm`, `type/display/lg`, `type/heading/xl`.
- `ticker`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/lg`, `type/body/md`, `type/body/sm`.
- `fiat`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `sign`: заливка / цвет `text/primary`, `text/success`; типографика `font-weight/bold`, `font-weight/regular`, `font/family/display`, `font/family/mono`, `type/body/md`, `type/body/sm`, `type/display/lg`, `type/heading/xl`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Amount`, вариантов 12 из 12; оси: Size, Sign.
- Борда: «Amount — борда · шаблон v3», разделов 11.
- Описание: 1135 знаков, разделы: Status: Level: Форматирование — Точность: Знак: Цифры табличные: Fiat — A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAmount>`; Flutter: `DsAmount`.
- Props: `size`: s | m | l | xl; `sign`: none | positive | negative; `value`: string или слот; `ticker`: string или слот; `fiat`: string или слот; `showFiat`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
