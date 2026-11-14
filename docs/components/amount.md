# Amount — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Amount`. Status: beta. Level: unknown.
- Figma: Components, страница «Amount» (`364:4398`), набор `167:78`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Денежная сумма: число, тикер и необязательный фиатный эквивалент. Единый способ показать сумму в продукте.
- Когда использовать: баланс, сумма операции, доход, цена — в карточках, строках списков и таблиц, шапках экранов.
- Когда нет: поле ввода суммы — Input amount; изменение в процентах — Badge или Chart metric; число без валюты — обычный текст.
- Правило выбора варианта:
  - Size: S — строки таблиц и списков; M — карточки; L — заголовок блока; XL — главный баланс экрана (один на экран).
  - Sign: None — остаток и цена; Positive — поступление (`text/success`, знак «+»); Negative — списание (`text/primary`, знак «−» U+2212).
  - Show fiat — эквивалент второй строкой; выключается в плотных таблицах, где фиат — отдельная колонка.
- Не делаем: красный цвет для списаний; усечение или перенос суммы; дефис вместо минуса; тикер без неразрывного пробела.

## 3. Anatomy
- Корень — вертикальный стек: строка `value` + `ticker`, под ней `fiat` (`text/secondary`).
- S / M — `font/family/mono` (цифры одной ширины, колонки выравниваются); L / XL — `font/family/display`.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Загрузка — Skeleton на месте суммы у родителя; скрытый баланс — маска «•••» у родителя.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L · XL | S |
| Sign | None · Positive · Negative | None |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «0,12345678» | 12 из 12 |
| Ticker | текст | «BTC» | 12 из 12 |
| Fiat | текст | «≈ 2 731,40 $» | 12 из 12 |
| Show fiat | булево | вкл | 12 из 12 |

## 6. Content / slots
- Value — число в формате локали (разделители разрядов и дробной части), точность — по монете; Ticker — код монеты или валюты; Fiat — «≈ сумма валюта».
- Длинный текст: сумма не усекается и не переносится; не помещается — родитель уменьшает Size на шаг или убирает Fiat.
- RTL: число и тикер не зеркалятся (изолируются `bdi`), блок выравнивается по началу строки. Проверено на стенде: de, ar, hi, th, ja, kk.
- Текст 200 %: блок растёт вместе с кеглем, обрезки нет.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. Обновление значения — без анимации счётчика; подсветку изменения делает родитель.

## 9. Accessibility
- Читается одной фразой: знак словом («плюс», «минус»), число, полное имя валюты.
- Знак дублирует цвет: Positive отличается от None не только цветом.

## 10. Tokens
- `корень`: интервал `space/2`.
- `row`: интервал `space/4`, `space/6`, `space/8`.
- `value`: заливка / цвет `text/primary`, `text/success`; типографика `font-weight/bold`, `font-weight/regular`, `font/family/display`, `font/family/mono`, `type/body/md`, `type/body/sm`, `type/display/lg`, `type/heading/xl`.
- `ticker`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/lg`, `type/body/md`, `type/body/sm`.
- `fiat`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `sign`: заливка / цвет `text/primary`, `text/success`; типографика `font-weight/bold`, `font-weight/regular`, `font/family/display`, `font/family/mono`, `type/body/md`, `type/body/sm`, `type/display/lg`, `type/heading/xl`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Amount`, вариантов 12 из 12; оси: Size, Sign.
- Борда: «Amount — борда · шаблон v3», разделов 12.
- Описание: 1548 знаков, разделы: Status: Level: Форматирование — Точность: Знак: Цифры табличные: Fiat — A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAmount>`; Flutter: `DsAmount`.
- Props: `size`: s | m | l | xl; `sign`: none | positive | negative; `value`: string или слот; `ticker`: string или слот; `fiat`: string или слот; `showFiat`: boolean = true.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячейки — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, Show fiat = Off; кода нет — parity props пропущена.

## 15. Migration
- DS Web / App: суммы набирались текстом в каждом экране → Amount (Size, Sign, Show fiat).
