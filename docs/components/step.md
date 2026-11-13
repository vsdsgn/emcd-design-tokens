# Step — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Step`. Status: draft. Level: molecule.
- Figma: Components, страница «Stepper» (`367:349`), набор `108:1450`.

## 2. Intent
- Шаг: символ + подпись (+ описание).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `symbol`, `label`, `description`.
- Вложено: `Step symbol` ×3.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Current · Success. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Current · Success | — |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Адрес» | 3 из 3 |
| Description | текст | «Куда вывести» | 3 из 3 |
| Show description | булево | выкл | 3 из 3 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/8`.
- `symbol`: заливка / цвет `action/secondary/default`, `control/checked`, `status/success/solid`; радиус `radius/chip`; обводка `border/default`; толщина обводки `border/width/default`.
- `label`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `description`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Min / max корня: maxWidth 160 числом.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Step`, вариантов 3 из 3; оси: State.
- Борда: «Step — борда · шаблон v3», разделов 10.
- Описание: 635 знаков, разделы: Status: Level: Шаг: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStep>`; Flutter: `DsStep`.
- Props: `label`: string или слот; `description`: string или слот; `showDescription`: boolean = false.
- Состояния (Default, Current, Success) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: Step Text - Horizontal (Leading Text, Type, State).
