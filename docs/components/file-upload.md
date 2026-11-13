# File upload — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `File upload`. Status: draft. Level: unknown.
- Figma: Components, страница «File upload» (`355:1829`), набор `179:3057`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon/download`, `title`, `hint`.
- Вложено: иконки ×5, `_Hit area` ×10, `_Safe margin` ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 5 · зона Web 5 · зона касания 5 · безопасное поле 5.

## 4. States
- Ось State: Default · Hover · Dragging · Error · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Dragging · Error · Disabled | — |

Матрица полная: 5 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 5 из 5 · служебное |
| Show hit area | булево | выкл | 5 из 5 · служебное |
| Safe margin | булево | выкл | 5 из 5 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; интервал `space/8`; отступы `space/16`, `space/24`; радиус `radius/container`; обводка `border/accent`, `control/border/default`, `control/border/disabled`, `control/border/error`; толщина обводки `border/width/default`.
- `icon/download`: высота `icon/size/md`; ширина `icon/size/md`.
- `title`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `hint`: заливка / цвет `text/danger`, `text/disabled`, `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-lg`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`; радиус `radius/container`.
- Значений без переменной: 15 (напр. `(root):w=360`, `hit area · web:w=360`, `hit area · web:h=122`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `File upload`, вариантов 5 из 5; оси: State.
- Борда: «File upload — борда · шаблон v3», разделов 10.
- Описание: 770 знаков, разделы: Status: Level: Зона загрузки файла: На Compact — A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsFileUpload>`; Flutter: `DsFileUpload`.
- Props: нет.
- Состояния (Default, Hover, Dragging, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
