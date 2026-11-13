# Step symbol — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Step symbol`. Status: draft. Level: molecule.
- Figma: Components, страница «Step symbol» (`1012:11`), набор `108:1416`.

## 2. Intent
- Символ шага: Numbered / Icon / Checked / Bullet × Default / Active / Success.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `number`, `bullet`.
- Вложено: иконки ×6.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Current · Success. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Numbered · Icon · Checked · Bullet | — |
| State | Default · Current · Success | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Number | текст | «1» | 3 из 12 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`, `control/checked`, `status/success/solid`; высота `size/media/sm`; радиус `radius/chip`; обводка `border/default`; толщина обводки `border/width/default`; ширина `size/media/sm`.
- `number`: заливка / цвет `text/on-accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `bullet`: заливка / цвет `border/default`, `control/checked`, `status/success/solid`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Step symbol`, вариантов 12 из 12; оси: Type, State.
- Борда: «Step symbol — борда · шаблон v3», разделов 9.
- Описание: 644 знаков, разделы: Status: Level: Символ шага: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepSymbol>`; Flutter: `DsStepSymbol`.
- Props: `type`: numbered | icon | checked | bullet; `number`: string или слот.
- Состояния (Default, Current, Success) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: Step Symbol (Type, State) (DS Web Stepper).
