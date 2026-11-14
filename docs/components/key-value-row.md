# Key-value row — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Key-value row`. Status: beta. Level: unknown.
- Figma: Components, страница «Key-value row» (`364:4625`), набор `199:227`. Платформы: Web, Mobile web, iOS, Android.
- Лежит на странице Payout summary.

## 2. Intent
- Строка «название — значение» в сводке: название в начале строки, значение в конце.
- Когда использовать: пара «название — значение» в сводке: подтверждение вывода, детали операции, параметры тарифа.
- Когда нет: нажимаемая строка — List item; сравнение по колонкам — Table.
- Правило выбора варианта:
  - Emphasis: Default — обычная строка; Total — итог: одна на сводку, последней, с линией сверху; Muted — второстепенные строки.
  - Название — в начале строки, значение — в конце; числа — моноширинные.
  - Название — до двух строк; значение — одна строка, не переносится.
  - Leader: Off — по умолчанию; On — точечная линия между ключом и значением, когда строка широкая и взгляду нужно вести от названия к значению (детали устройства; опора — Firmware «детали устройства»).
  - Между строками — `space/12`.
- Не делаем: две строки Total в одной сводке; Total не последней; перенос значения; нажатие по строке.

## 3. Anatomy
- Корень — горизонтальный ряд, зазор `space/16`, вертикальные отступы `space/8` / `space/12`; у Total — линия сверху `border/subtle` (`border/width/default`).
- `key` — `text/secondary`, Body/MD Regular; у Total — Label/MD Medium.
- `value` — Default: `text/primary`, `font/family/mono`; Muted: `text/secondary`; Total: Label/MD Medium, `font/family/text`; max-width 200.
- `leader` (Leader=On) — точечная линия между `key` и `value`: обводка `border/strong`, пунктир; заполняет промежуток.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет. Загрузка — Skeleton на месте значения у родителя.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Emphasis | Default · Total · Muted | Default |
| Leader | Off · On | Off |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Key | текст | «Комиссия сети» | 6 из 6 |
| Value | текст | «0,00050000 BTC» | 6 из 6 |

## 6. Content / slots
- Key — название параметра; Value — значение в формате локали с единицей («0,00050000 BTC»).
- Длинный текст: название — до двух строк, дальше многоточие; значение — одна строка до 200, дальше многоточие. Название не сжимается в столбец: значение уступает ширину.
- Языки (de, ar, hi, th, ja, kk): название в 1–2 строки, обрезки по высоте нет.
- RTL: название и значение меняются местами (порядок зеркалит контейнер); числа и тикеры не зеркалятся.
- Текст 200 %: строка растёт по высоте, пределы строк те же.

## 7. Events
- Нет.

## 8. Behavior
- Статична.

## 9. Accessibility
- В коде — `dl` / `dt` / `dd`: название — `dt`, значение — `dd`.
- Итог отличается не только цветом: линия сверху и Medium.

## 10. Tokens
- `корень`: интервал `space/16`; отступы `space/12`, `space/8`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `key`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/md`, `type/label/md`.
- `value`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/mono`, `font/family/text`, `type/body/md`, `type/label/md`.
- `leader`: обводка `border/strong`.
- Значений без переменной: 6 (напр. `(root):w=360`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Key-value row`, вариантов 6 из 6; оси: Emphasis, Leader.
- Борда: «Key-value row — борда · шаблон v3», разделов 11.
- Описание: 920 знаков, разделы: Status: Level: Строка «название — Default — A11y: Когда использовать: Правила: Длинный текст:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsKeyValueRow>`; Flutter: `DsKeyValueRow`.
- Props: `emphasis`: default | total | muted; `leader`: boolean; `key`: string или слот; `value`: string или слот.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (value 200).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; правка длинного текста 13.11 стендом не перепроверена; кода нет — parity props пропущена.

## 15. Migration
- Web App `.sum list group` (88 вхождений) → Key-value row: Emphasis Default | Total | Muted, Key, Value.
- Firmware «детали устройства» (ключ — точечная линия — значение) → Leader=On.

Осталось доделать (после пакета правок beta 2026-11-13):
- Total: значение набрано `font/family/text`, по описанию числа моноширинные — выровнять набор или описание.
- Ширина корня 360 и max-width значения 200 — числом; в экземпляре строка — по ширине родителя.
- В описании нет строки Legacy (источник — `.sum list group`).
