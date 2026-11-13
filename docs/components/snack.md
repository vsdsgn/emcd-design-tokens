# Snack — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Snack`. Status: draft. Level: molecule.
- Figma: Components, страница «Snack» (`1783:1378`), набор `1783:1379`.

## 2. Intent
- Краткая плашка мобильного приложения (App): подтверждение или результат действия. Тёмная плашка у нижнего края (343), линейная иконка, одна строка и необязательное действие («Отменить»)…
- Когда использовать: отменяемые и короткие подтверждения.
- Когда нет: сообщение, которое должно остаться на экране (Suggest), блокирующий вопрос (Modal).
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon`, `title`, `action`.
- Вложено: иконки ×5, `Button` ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Tone | Neutral · Info · Success · Warning · Danger | — |

Матрица полная: 5 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Icon | булево | вкл | 5 из 5 |
| Action | булево | вкл | 5 из 5 |
| Title | текст | «Вывод создан» | 5 из 5 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- как у Toast — role="status" (polite), фокус не забирает. |

## 10. Tokens
- `корень`: заливка / цвет `action/inverse/default`; отступы `space/12`, `space/16`; радиус `radius/control`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `title`: заливка / цвет `text/inverse`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `action`: интервал `space/2`; отступы `space/4`; радиус `radius/xs`.
- Min / max корня: minWidth 280 числом.
- Значений без переменной: 10 (напр. `(root):gap=12`, `(root):w=343`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Snack`, вариантов 5 из 5; оси: Tone.
- Борда: шаблона v3 нет.
- Описание: 731 знаков, разделы: Status: Level: Когда использовать: Правила: Свойства: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSnack>`; Flutter: `DsSnack`.
- Props: `tone`: neutral | info | success | warning | danger; `icon`: boolean = true; `action`: boolean = true; `title`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - MINMAX: minw=280
  - RAW: 10 (напр. `(root):gap=12`, `(root):w=343`)
  - BOARD: нет борды v3

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
