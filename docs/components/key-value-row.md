# Key-value row — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Key-value row`. Status: draft. Level: molecule.
- Figma: Components, страница «Payout summary» (`364:4625`), набор `199:227`.

## 2. Intent
- Строка «название — значение» в сводках: подтверждение вывода, детали операции, параметры тарифа. Источник: «.sum list group» в Web App (88 вхождений).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `key`, `value`.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Emphasis | Default · Total · Muted | — |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Key | текст | «Комиссия сети» | 3 из 3 |
| Value | текст | «0,00050000 BTC» | 3 из 3 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- в коде <dl> / <dt> / <dd>. |

## 10. Tokens
- `корень`: интервал `space/16`; отступы `space/12`, `space/8`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `key`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/md`, `type/label/md`.
- `value`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/mono`, `font/family/text`, `type/body/md`, `type/label/md`.
- Значений без переменной: 3 (напр. `(root):w=360`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Key-value row`, вариантов 3 из 3; оси: Emphasis.
- Борда: «Key-value row — борда · шаблон v3», разделов 10.
- Описание: 772 знаков, разделы: Status: Level: Строка «название — Default — A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsKeyValueRow>`; Flutter: `DsKeyValueRow`.
- Props: `emphasis`: default | total | muted; `key`: string или слот; `value`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
