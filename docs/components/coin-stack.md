# Coin stack — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Coin stack`. Status: beta. Level: unknown.
- Figma: Components, страница «Coin stack» (`1590:22`), набор `1590:212`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Несколько монет внахлёст (стопка): пул из нескольких монет, пара для обмена, «Kaspa+1».
- Когда использовать: несколько монет в одной строке (мультивыбор, майнинг нескольких монет).
- Когда нет: одна монета — Coin.
- Правило выбора варианта:
  - Size: S / M / L — по высоте строки или контрола, в который встаёт стопка.
  - Count: 2 / 3 / 4 — по числу монет; монет больше — Show more + More («+N»): кружок с числом скрытых монет в конце стопки (опора — WL admin user list, Web App «Litecoin + 6»).
  - Порядок монет — по значимости, первая — главная.
- Не делаем: больше четырёх монет в стопке без «+N».

## 3. Anatomy
- Корень — горизонтальный ряд с отрицательным зазором: нахлёст 30 % размера (−6 / −7 / −10 для S / M / L).
- `coin 1`…`coin 4` — экземпляры `symbol/coin/*` с кольцом `surface/current`: на любой поверхности L0–L3 кольцо совпадает с фоном (проверено на стенде).
- `more` — кружок «+N» (Show more): заливка `action/secondary/default`, `radius/full`, кольцо `surface/current`, как у монет; `value` — текст More (`text/secondary`, `type/label/sm`, `font-weight/medium`).
- Вложено: `symbol/coin/bitcoin-btc` ×9, `symbol/coin/ethereum-eth` ×9, `symbol/coin/litecoin-ltc` ×6, `symbol/coin/tether-usdt` ×3.
- Служебные слои (вариантов из 9): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Нажимаемая стопка — внутри строки списка, Chip или Button: состояния, фокус и зона нажатия — у обёртки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | S |
| Count | 2 · 3 · 4 | 2 |

Матрица полная: 9 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show more | булево | выкл | 9 из 9 |
| More | текст | «+2» | 9 из 9 |

## 6. Content / slots
- Текст — только More: «+N», число скрытых монет (цифры не переводятся); названия монет — текстом рядом.
- Размер фиксирован осью Size: при тексте 200 % не растёт (проверено на стенде). Цвета монет от темы и бренда не зависят.
- RTL: рисунки монет не зеркалятся.

## 7. Events
- Нет.

## 8. Behavior
- Статична.

## 9. Accessibility
- Декоративна (`aria-hidden`); список монет дублируется текстом.

## 10. Tokens
- `coin 1`: обводка `surface/current`.
- `coin 2`: обводка `surface/current`.
- `more`: заливка / цвет `action/secondary/default`; радиус `radius/full`; обводка `surface/current`.
- `value`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `coin 3`: обводка `surface/current`.
- `coin 4`: обводка `surface/current`.
- Значений без переменной: 9 (напр. `(root):gap=-6`, `(root):gap=-7`, `(root):gap=-10`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Coin stack`, вариантов 9 из 9; оси: Size, Count.
- Борда: «Coin stack — борда · шаблон v3», разделов 11.
- Описание: 496 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCoinStack>`; Flutter: `DsCoinStack`.
- Props: `size`: s | m | l; `count`: 2 | 3 | 4; `showMore`: boolean = false; `more`: string или слот.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: отрицательный зазор −6 / −7 / −10 (нахлёст монет).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текстовых и булевых свойств у набора нет — текстовые ячейки совпадают с умолчанием; кода нет — parity props пропущена.

## 15. Migration
- DS Web CoinStack (base coinstack / group line, pair vertical) → Coin stack: число монет → Count 2 | 3 | 4; размер → Size S | M | L; «+N» → Show more + More.

Осталось доделать (после пакета правок beta 2026-11-13):
- Нахлёст −6 / −7 / −10 — числом (в реестре).
