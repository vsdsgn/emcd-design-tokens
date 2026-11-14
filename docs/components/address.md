# Address — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Address`. Status: beta. Level: unknown.
- Figma: Components, страница «Address» (`364:4435`), набор `171:126`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Адрес кошелька или хэш с копированием и QR: подпись, строка с адресом и двумя кнопками, статус «Адрес скопирован».
- Когда использовать: реквизиты пополнения, детали операции, строка кошелька — везде, где адрес показывают и дают скопировать.
- Когда нет: ввод адреса — Input с проверкой сети.
- Правило выбора варианта:
  - Format: Short — в строках и таблицах (первые 6 и последние 6 символов, между ними «•••» с тонкими шпациями: «bc1q8c ••• x7k2pa»); Full — адрес TRC20 и везде, где адрес сверяют или вводят вручную: целиком, моноширинным, с переносом.
  - State: Default — обычный вид; Copied — 2 с после нажатия «Копировать».
  - Копирование — всегда; QR — только для адресов пополнения (открывает Address QR).
- Не делаем: перевод адреса или смена регистра; Short там, где адрес сверяют или вводят вручную; адрес без копирования.

## 3. Anatomy
- Корень — вертикальный стек (`space/6`), ширина 360 числом: `label` (`text/secondary`, `type/body/sm`) → `row` → `status`.
- `row` — плашка `surface/raised`, `radius/control`, отступы `space/12` / `space/6` / `space/4`, зазор `space/4`: `address` (`text/primary`, `font/family/mono`, `type/body/md`) и кнопки `copy` и `show QR` (`control/height/sm`, `radius/control-sm`).
- Copied: вместо `copy` — `copied` (галочка), под строкой `status` «Адрес скопирован» (`text/success`, `type/body/sm`).
- Вложено: `Icon button` ×8.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): состояния нажатия — у кнопок внутри (по модели Icon button); у набора — только Default / Copied.
- Default — иконка копирования и QR.
- Copied — галочка на месте копирования и статус «Адрес скопирован» под строкой на 2 с, затем возврат в Default. Высота больше на строку статуса.
- Hover / Pressed / Focus / Disabled кнопок в наборе не нарисованы.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Format | Short · Full | Short |
| State | Default · Copied | Default |

Матрица полная: 4 вариантов.

## 6. Content / slots
- Адрес не переводится и не меняет регистр. Short — всегда 6 + «•••» + 6; полный адрес — по копированию и в тултипе. Full — адрес целиком, перенос по символам.
- Подпись — монета и сеть («Адрес BTC», «Адрес USDT · TRC20»). Длинный текст: `label` — одна строка, многоточие.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано. RTL: адрес изолируется по направлению (остаётся слева направо), подпись и статус — по направлению письма.
- Текст 200 %: подпись, адрес и статус растут, обрезки нет; кнопки не растут (`control/height/sm`).

## 7. Events
- `click` «Копировать» — адрес целиком в буфер, State → Copied на 2 с.
- `click` QR — открывает Address QR.

## 8. Behavior
- Copied держится 2 с и возвращается в Default; в App — хаптик success.

## 9. Accessibility
- Кнопки с именами «Копировать адрес» и «Показать QR-код»; статус копирования — `role=status`.
- Полный адрес доступен читалке и в Short (`aria-label`).
- Клавиатура: Tab — по кнопкам, Enter / Пробел — действие.

## 10. Tokens
- `корень`: интервал `space/6`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `row`: заливка / цвет `surface/raised`; интервал `space/4`; отступы `space/12`, `space/4`, `space/6`; радиус `radius/control`.
- `address`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/md`.
- `copy`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `show QR`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `copied`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `status`: заливка / цвет `text/success`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Значений без переменной: 4 (напр. `(root):w=360`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Хаптик success при копировании — только App.

## 12. Figma projection
- Набор `Address`, вариантов 4 из 4; оси: Format, State.
- Борда: «Address — борда · шаблон v3», разделов 11.
- Описание: 1184 знаков, разделы: Status: Level: Short — Копировать — Когда нет: A11y: Формат адреса: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAddress>`; Flutter: `DsAddress`.
- Props: `format`: short | full.
- Состояния (Default, Copied) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- Legacy нет (DS Web / App — «—»): адрес набирался текстом с отдельной кнопкой копирования → Address (Format, State). Продуктовый экран в таблицах не назван, нужен скрин прода.

Осталось доделать (после пакета правок beta 2026-11-13):
- `copy` / `show QR` / `copied` — фреймы с иконками: заменить на экземпляры Icon button (состояния, Focus ring, зоны нажатия).
- QR виден во всех вариантах — нужен переключатель под правило «QR — только для адресов пополнения».
- `row` (`surface/raised`) сливается с подложкой на Light L0 и Dark L1, в Dark L2 / L3 темнее подложки — на решение: заливка или обводка плашки.
- Copied выше Default на строку статуса — раскладка под компонентом сдвигается; на решение: резервировать место или статус поверх.
- Ширина корня 360 — числом.
