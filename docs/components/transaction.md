# Transaction — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Transaction`. Status: draft. Level: molecule.
- Figma: Components, страница «Transaction» (`364:4553`), набор `172:832`.

## 2. Intent
- Строка операции в истории: вывод, пополнение, начисление, обмен.
- Когда использовать: не описано
- Когда нет: детали операции — Side panel / Sheet по нажатию на строку.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon`, `icon/arrow-up`, `content`, `title`, `meta`, `date`, `Status`, `Amount`, `icon/arrow-down`, `icon/lightning`, `icon/exchange`.
- Вложено: иконки ×12, `Status` ×12, `Amount` ×12.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Withdrawal · Deposit · Reward · Exchange | — |
| Status | Completed · Pending · Failed | — |

Матрица полная: 12 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- строка — кнопка, озвучивается «Вывод BTC, 5 октября 09:25, выполнено, минус 0,005 BTC». |

## 10. Tokens
- `корень`: интервал `space/12`; отступы `space/12`, `space/16`.
- `icon`: заливка / цвет `surface/raised`; радиус `radius/chip`.
- `icon/arrow-up`: высота `icon/size/md`; ширина `icon/size/md`.
- `content`: интервал `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `meta`: интервал `space/8`.
- `date`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Status`: интервал `space/6`.
- `Amount`: интервал `space/2`.
- `icon/arrow-down`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/lightning`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/exchange`: высота `icon/size/md`; ширина `icon/size/md`.
- Значений без переменной: 24 (напр. `(root):w=400`, `(root):h=64`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Transaction`, вариантов 12 из 12; оси: Type, Status.
- Борда: «Transaction — борда · шаблон v3», разделов 11.
- Описание: 505 знаков, разделы: Status: Level: Анатомия: Когда нет: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTransaction>`; Flutter: `DsTransaction`.
- Props: `type`: withdrawal | deposit | reward | exchange; `status`: completed | pending | failed.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - RAW: 24 (напр. `(root):w=400`, `(root):h=64`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
