# Progress — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Progress`. Status: draft. Level: molecule.
- Figma: Components, страница «Progress» (`366:3115`), набор `56:376`.

## 2. Intent
- Progress: доля выполненного, когда длительность или объём известны — лимит вывода, заполненность, шаг загрузки файла, срок до выплаты.
- Когда использовать: известно «сколько из скольких».
- Когда нет: неизвестная длительность — Spinner; загрузка контента — Skeleton; шаги мастера — Stepper.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label row`, `label`, `value`, `track`, `fill`.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| Tone | Accent · Success · Warning · Danger | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Лимит вывода» | 8 из 8 |
| Value | текст | «6 000 / 10 000 USDT» | 8 из 8 |
| Show label | булево | вкл | 8 из 8 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=progressbar, aria-valuenow / min / max, aria-label = Label. |

## 10. Tokens
- `корень`: интервал `space/8`.
- `label row`: интервал `space/8`.
- `label`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `value`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/md`.
- `track`: заливка / цвет `control/track`; высота `size/track/md`, `size/track/sm`; радиус `radius/chip`.
- `fill`: заливка / цвет `control/checked`, `status/danger/solid`, `status/success/solid`, `status/warning/solid`; высота `size/track/md`, `size/track/sm`; радиус `radius/chip`.
- Значений без переменной: 8 (напр. `(root):w=320`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Progress`, вариантов 8 из 8; оси: Size, Tone.
- Борда: «Progress — борда · шаблон v3», разделов 9.
- Описание: 923 знаков, разделы: Status: Level: Progress: Когда использовать: Правила: A11y: Поиск: Legacy: Motion:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsProgress>`; Flutter: `DsProgress`.
- Props: `size`: s | m; `tone`: accent | success | warning | danger; `label`: string или слот; `value`: string или слот; `showLabel`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
