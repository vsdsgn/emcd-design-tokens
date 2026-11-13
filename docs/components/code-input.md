# Code input — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Code input`. Status: beta. Level: unknown.
- Figma: Components, страница «Code input» (`353:2852`), набор `111:1379`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Ввод одноразового кода: ряд из 4 или 6 ячеек Code cell и строка сообщения под ним. Подтверждение — автоматически, когда введена последняя цифра.
- Когда использовать: одноразовый код: 2FA при выводе и входе, код из пуш-уведомления, SMS, почты.
- Когда нет: пароль — Password field; произвольное число — Input.
- Правило выбора варианта:
  - Length: 4 или 6 — по источнику кода (сколько цифр присылает сервис).
  - State: Default — ввод; Error — код неверный; Success — код принят; Disabled — ввод заблокирован (лимит попыток).
  - Ячейки одного размера: Web 4 цифры — Code cell L, остальное — M.
  - Message — одно сообщение за раз: таймер повторной отправки, ошибка или блокировка. Show message = Off — когда сообщение показывает родитель.
  - Ширина не больше `size/code-input/max`. Отправка — автоматически после последней цифры; кнопка «Подтвердить» остаётся для доступности и вставки.
- Не делаем: другая длина кода; разные размеры ячеек в ряду; два сообщения одновременно.

## 3. Anatomy
- Корень — вертикальный стек (`space/12`), max-width `size/code-input/max`: `cells` + `message`.
- `cells` — ряд Code cell (4 или 6), зазор `space/16` / `space/8`; ячейки `size/code-cell/lg` / `size/code-cell/md`.
- `message` — строка под рядом, по центру (`type/label/sm`, `font-weight/medium`); свойства Message и Show message.
- Служебных слоёв у набора нет: кольцо фокуса, зона нажатия и безопасное поле — у Code cell.
- Вложено: `Code cell` ×40.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле ввода: состояние — цветом рамки ячеек (`control/border/*`) и сообщения; Hover и Pressed нет; Disabled — токены `*/disabled`.
- Default — введённые ячейки Filled, текущая Focus (рамка `control/border/focus`, `border/width/focus`, каретка), остальные Empty; сообщение `text/secondary`.
- Error — все ячейки с рамкой `control/border/error`, сообщение `text/danger`.
- Success — все ячейки с рамкой `status/success/solid`, сообщение `text/success`.
- Disabled — ячейки `control/surface/disabled` / `control/border/disabled`, сообщение `text/disabled`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Length | 4 · 6 | 4 |
| State | Default · Error · Success · Disabled | Default |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Message | текст | «Отправить код повторно через 0:45» | 8 из 8 |
| Show message | булево | вкл | 8 из 8 |

- Message (текст, по умолчанию «Отправить код повторно через 0:45») — одно на все состояния: в Error и Success текст заменяет продукт. Show message — по умолчанию On.

## 6. Content / slots
- Message — короткая строка: таймер, ошибка или блокировка. Ширина ≤ 356, текст по центру; длинный переносится на следующую строку, не усекается; ряд ячеек не меняется.
- Цифры не переводятся и не зеркалятся: в RTL порядок ячеек остаётся слева направо. Языки (de, ar, hi, th, ja, kk): сообщение в одну строку по центру, по высоте не обрезано.
- Текст 200 %: ячейки не растут (размер фиксирован), цифры помещаются; сообщение переносится, высота растёт, наложений нет.

## 7. Events
- Ввод цифры — фокус к следующей ячейке; последняя цифра — код отправляется (`complete`).
- Вставка (Cmd / Ctrl + V, SMS-подсказка) — заполняет все ячейки.
- Ошибка — очистка и фокус на первую ячейку.

## 8. Behavior
- Цифра появляется с подъёмом 4 px и проявлением (`motion/duration/feedback`); одна рамка фокуса перетекает между ячейками (spring morph).
- Ошибка — однократная встряска ряда ±6 px за 300 мс + текст ошибки. «Уменьшить движение»: без встряски и перетекания.
- Хаптик: `haptic/error` / `haptic/success`.

## 9. Accessibility
- `role="group"` с подписью («Код из уведомления»); ячейки — «цифра N из M».
- `inputmode="numeric"`, `autocomplete="one-time-code"` на первой ячейке.
- Сообщение — `aria-describedby`; ошибка — `role="alert"`.
- Клавиатура: цифры; Backspace на пустой ячейке — назад и очистка; ← / → — между ячейками; вставка. Кольцо фокуса и зона нажатия — у Code cell.

## 10. Tokens
- `корень`: интервал `space/12`; maxw `size/code-input/max`.
- `cells`: интервал `space/16`, `space/8`.
- `Code cell`: заливка / цвет `control/surface/default`, `control/surface/disabled`; высота `size/code-cell/lg`, `size/code-cell/md`; радиус `radius/control`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`, `status/success/solid`; толщина обводки `border/width/default`, `border/width/focus`.
- `message`: заливка / цвет `text/danger`, `text/disabled`, `text/secondary`, `text/success`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Min / max корня: maxWidth 400 size/code-input/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Code input`, вариантов 8 из 8; оси: Length, State.
- Борда: «Code input — борда · шаблон v3», разделов 11.
- Описание: 1853 знаков, разделы: Status: Level: Ввод одноразового кода: Основа — Поведение (для кода): Движение: A11y: Motion: Поиск: Legacy: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCodeInput>`; Flutter: `DsCodeInput`.
- Props: `length`: 4 | 6; `message`: string или слот; `showMessage`: boolean = true.
- Состояния (Default, Error, Success, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (message 356).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web: «Введи код из пуш уведомления» (Web App → Безопасность → Подтверждение операции; 4 ячейки 69 × 70, цифра 28) → Code input Length=4; новое — Length=6, State Error | Success | Disabled, Message / Show message.

Осталось доделать (после пакета правок beta 2026-11-13):
- Правило «Web 4 цифры — L, остальное — M» набором не обеспечено: на iOS / Android Length=4 из ячеек L — привязать размер ячейки к Platform или уточнить правило.
- В описании строки «Движение» и «Motion» дублируют встряску — свести в одну.
