# Amount — контракт (2026-11-23)

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
  - Tone (19.11): Default | Success | Danger — цвет суммы без знака (только Sign=None): итог дохода в Калькуляторе — Success. Знак и цвет вместе — Sign=Positive / Negative
  - State (19.11): Default | Skeleton — плашка вместо суммы той же высоты (строка значения + фиат, если включён); в загрузке Sign=None
  - Size: S — строки списков и таблиц на Compact (12); M — карточки и таблицы Web (14, как значения соседних ячеек — 19.11); L — заголовок блока; XL — главный баланс экрана (один на экран).
  - Sign: None — остаток и цена; Positive — поступление (`text/success`, знак «+»); Negative — списание (`text/primary`, знак «−» U+2212).
  - Show fiat — эквивалент второй строкой; выключается в плотных таблицах, где фиат — отдельная колонка.
  - Align (17.11): Start — по умолчанию; End — сумма у конца строки (List item, Key-value row, ячейка таблицы Align=End).
- Не делаем: красный цвет для списаний; усечение или перенос суммы; дефис вместо минуса; тикер без неразрывного пробела.

## 3. Anatomy
- Корень — вертикальный стек: строка `value` + `ticker`, под ней `fiat` (`text/secondary`).
- S / M — `font/family/text` `font-weight/medium` у значения и тикера, фиат — regular (22.11, по production: суммы Medium во всех экранах Web и App), с табличными цифрами (17.11: моно — только в осях графиков; было `font/family/mono`); L — `type/heading/lg` (Web 24, Compact 20; 19.11: было `type/heading/xl` — на Web давал 32, в продукте сводка 24), Bold, `font/family/text`, тикер того же кегля Medium (18.11: итоги «Всего начислено», «Сумма всех выплат», сводка дашборда; 17.11 было 20 Medium); XL — `font/family/display`, Bold.
- Вложено: `Skeleton` ×16.
- Служебные слои (вариантов из 48): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Загрузка — Skeleton на месте суммы у родителя; скрытый баланс — маска «•••» у родителя.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L · XL | S |
| Sign | None · Positive · Negative | None |
| Align | Start · End | — |
| State | Default · Skeleton | — |
| Tone | Default · Success · Danger | — |

Матрица: 48 из 144.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «0,12345678» | 48 из 48 |
| Ticker | текст | «BTC» | 48 из 48 |
| Fiat | текст | «≈ 2 731,40 $» | 48 из 48 |
| Show fiat | булево | вкл | 48 из 48 |

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
- `value`: заливка / цвет `text/danger`, `text/primary`, `text/success`; типографика `font-weight/bold`, `font-weight/regular`, `font/family/display`, `font/family/text`, `type/body/md`, `type/body/sm`, `type/display/lg`, `type/heading/lg`.
- `ticker`: заливка / цвет `text/danger`, `text/secondary`, `text/success`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/lg`, `type/body/md`, `type/body/sm`, `type/heading/lg`.
- `fiat`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `sign`: заливка / цвет `text/primary`, `text/success`; типографика `font-weight/bold`, `font-weight/regular`, `font/family/display`, `font/family/text`, `type/body/md`, `type/body/sm`, `type/display/lg`, `type/heading/lg`.
- `skeleton · value`: заливка / цвет `skeleton/base`; радиус `radius/container`, `radius/inner`.
- `skeleton · fiat`: заливка / цвет `skeleton/base`; радиус `radius/container`, `radius/inner`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Amount`, вариантов 48 из 144; оси: Size, Sign, Align, State, Tone.
- Борда: «Amount — борда · шаблон v3», разделов 12.
- Описание: 1982 знаков, разделы: Status: Level: Форматирование — Точность: Знак: Цифры табличные: Fiat — A11y: Когда использовать: Правила: Align (17. Tone (19.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Amount`), Vue `packages/vue/src/DsAmount.vue`, CSS `claude-ds/components/Amount/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsAmount>`; Flutter: `DsAmount`.
- Props: `size`: s | m | l | xl; `sign`: none | positive | negative; `align`: start | end; `tone`: default | success | danger; `value`: string или слот; `ticker`: string или слот; `fiat`: string или слот; `showFiat`: boolean = true.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячейки — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, Show fiat = Off; кода нет — parity props пропущена.

## 15. Migration
- DS Web / App: суммы набирались текстом в каждом экране → Amount (Size, Sign, Show fiat).
