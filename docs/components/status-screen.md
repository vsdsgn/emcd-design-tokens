# Status screen — контракт · draft (2026-11-14)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Status screen`. Status: draft. Level: unknown.
- Figma: Components, страница «Empty state» (`366:3230`), набор `173:648`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon`, `icon/check`, `title`, `description`, `Amount`, `actions`, `Button`, `icon/alert-circle`, `icon/history`.
- Вложено: иконки ×3, `Amount` ×2, `Button` ×6.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Result | Success · Error · Pending | — |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-1`; интервал `space/16`; отступы `space/24`, `space/40`; радиус `radius/surface`.
- `icon`: заливка / цвет `status/danger/solid`, `status/success/solid`, `status/warning/solid`; радиус `radius/2xl`.
- `icon/check`: высота `icon/size/md`; ширина `icon/size/md`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/xl`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Amount`: интервал `space/2`.
- `actions`: интервал `space/8`; отступы `space/16`.
- `Button`: заливка / цвет `action/primary/default`; интервал `space/2`; высота `control/height/lg`; мин. ширина `size/button/min`; отступы `space/12`, `space/4`; радиус `radius/container`.
- `icon/alert-circle`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/history`: высота `icon/size/md`; ширина `icon/size/md`.
- Значений без переменной: 3 (напр. `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Status screen`, вариантов 3 из 3; оси: Result.
- Борда: «Empty state — борда · шаблон v3», разделов 10.
- Описание: 938 знаков, разделы: Status: Level: Success, Error, Pending — Когда нет: A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStatusScreen>`; Flutter: `DsStatusScreen`.
- Props: `result`: success | error | pending.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS App `Status screen`, `Success screen` → Status screen (в инвентаризации — шаблон экрана: Empty state + Key-value); DS Web — нет.
