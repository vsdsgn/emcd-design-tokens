# Coin — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Coin`. Status: draft. Level: atom.
- Figma: Components, страница «Coin» (`1590:21`), набор `1590:103`.

## 2. Intent
- Монета из библиотеки Symbols (symbol/coin/*) нужного размера, при необходимости с маленькой монетой сети в правом нижнем углу (USDT TRC-20, USDT ERC-20).
- Когда использовать: список монет, выбор монеты, суммы, история операций.
- Когда нет: иконка действия (icon/*) или фиатный знак.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `network`.
- Вложено: `symbol/coin/bitcoin-btc` ×10, `symbol/coin/tether-usdt` ×10.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | XS · S · M · L · XL | — |
| Network | Off · On | — |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Coin | замена экземпляра | `symbol/coin/bitcoin-btc` | 10 из 10 |
| Network coin | замена экземпляра | `symbol/coin/tether-usdt` | 10 из 10 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- декоративна (aria-hidden), название монеты всегда в тексте рядом.

## 10. Tokens
- `network`: обводка `surface/current`.
- Значений без переменной: 30 (напр. `(root):w=16`, `(root):h=16`, `network:r=3.5`, `network:sw=2`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Coin`, вариантов 10 из 10; оси: Size, Network.
- Борда: «Coin — борда · шаблон v3», разделов 9.
- Описание: 635 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCoin>`; Flutter: `DsCoin`.
- Props: `size`: xs | s | m | l | xl; `network`: boolean.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - AXES: `Network` — булева ось (Off | On)
  - RAW: 30 (напр. `(root):w=16`, `(root):h=16`)
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: DS Web CoinStack (coin, base coinstack / single).
