# Coin — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Coin`. Status: beta. Level: unknown.
- Figma: Components, страница «Coin» (`1590:21`), набор `1590:103`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Монета из библиотеки Symbols (`symbol/coin/*`) нужного размера, при необходимости с маленькой монетой сети в правом нижнем углу (USDT TRC-20, USDT ERC-20).
- Когда использовать: список монет, выбор монеты, суммы, история операций.
- Когда нет: иконка действия — Icon (`icon/*`); фиатный знак — монетой не показываем; пользователь или контрагент — Avatar.
- Правило выбора варианта:
  - Size: XS 16, S 20, M 24, L 32, XL 40 — по высоте строки или контрола, в который встаёт монета.
  - Network: Off — монета без сети; On — у монеты несколько сетей и сеть нужно различать (USDT TRC-20 / ERC-20). У XS сети нет: значок ≈ 7 px неразличим (варианты XS · Network=On удалены 2026-11-16, матрица 18 из 20).
  - Coin — монета из `symbol/coin/*`; Network coin — монета сети из `symbol/coin/*` (видна при Network=On).
  - Бейдж сети (`network`) с кольцом выступает за корень вниз и вправо — так задумано (как в продуктах): родитель монеты без обрезки (clip), отступ справа и снизу ≥ 2 (решение 2026-11-16).
- Не делаем: фиат монетой.

## 3. Anatomy
- Корень — квадрат `size/media/2xs` | `xs` | `sm` | `md` | `lg` (XS–XL), в нём экземпляр `symbol/coin/*` (свойство Coin).
- `network` — монета сети в правом нижнем углу, 45 % от размера, с кольцом `surface/current` (`border/width/strong`): на любой поверхности L0–L3 кольцо совпадает с фоном (проверено на стенде).
- Вложено: `symbol/coin/bitcoin-btc` ×18, `symbol/coin/tether-usdt` ×18.
- Служебные слои (вариантов из 18): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default; Skeleton — круг `skeleton/base` того же размера: данные грузятся.
- Нажимаемая монета — внутри строки списка, Chip или Button: состояния, фокус и зона нажатия — у обёртки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | XS · S · M · L · XL | XS |
| Network | Off · On | Off |
| State | Default · Skeleton | Default |

Матрица: 18 из 20.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Coin | замена экземпляра | `symbol/coin/bitcoin-btc` | 18 из 18 |
| Network coin | замена экземпляра | `symbol/coin/tether-usdt` | 18 из 18 |

## 6. Content / slots
- Текста нет: длинный текст и языки не влияют; название и тикер монеты — всегда текстом рядом.
- Размер фиксирован осью Size: при тексте 200 % не растёт (проверено на стенде). Цвета монет от темы и бренда не зависят.
- RTL: рисунок монеты не зеркалится.

## 7. Events
- Нет.

## 8. Behavior
- Статична. Skeleton — блик `Skeleton` (1.2 с; «Уменьшить движение» — пульсация прозрачности).

## 9. Accessibility
- Декоративна (`aria-hidden`), название монеты всегда в тексте рядом.

## 10. Tokens
- `корень`: заливка / цвет `skeleton/base`; высота `size/media/2xs`, `size/media/lg`, `size/media/md`, `size/media/sm`, `size/media/xs`; радиус `radius/full`; ширина `size/media/2xs`, `size/media/lg`, `size/media/md`, `size/media/sm`, `size/media/xs`.
- `network`: радиус `radius/full`; обводка `surface/current`; толщина обводки `border/width/strong`.
- Значений без переменной: 4 (напр. `network:o=0`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Coin`, вариантов 18 из 20; оси: Size, Network, State.
- Борда: «Coin — борда · шаблон v3», разделов 12.
- Описание: 634 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCoin>`; Flutter: `DsCoin`.
- Props: `size`: xs | s | m | l | xl; `network`: boolean.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: радиусы бейджа сети 3.5–9 числом (круг, радиус = размер / 2).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текстовых и булевых свойств у набора нет — текстовые ячейки совпадают с умолчанием; кода нет — parity props пропущена.

## 15. Migration
- DS Web CoinStack (coin, base coinstack / single) → Coin: single → Network=Off, coinstack → Network=On; монета → Coin, монета сети → Network coin.
