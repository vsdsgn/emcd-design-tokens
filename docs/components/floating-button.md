# Floating button — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Floating button`. Status: draft. Level: molecule.
- Figma: Components, страница «Floating button» (`366:6658`), набор `179:1295`.

## 2. Intent
- Плавающая кнопка главного действия экрана на Compact (App, мобильный веб): «Добавить воркер», «Пополнить».
- Когда использовать: одно частое действие на экране-списке.
- Когда нет: на Web — Button в шапке страницы; больше одного действия; форма — кнопка внизу формы.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon/plus`, `label`.
- Вложено: иконки ×8.
- Служебные слои (вариантов из 8): кольцо фокуса 8 · зона Web 8 · зона касания 8 · безопасное поле 8.

## 4. States
- Ось State: Default · Hover · Pressed · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Icon · Extended | — |
| State | Default · Hover · Pressed · Disabled | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show hit area | булево | выкл | 8 из 8 · служебное |
| Safe margin | булево | выкл | 8 из 8 · служебное |
| Focus ring | булево | выкл | 8 из 8 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- <button aria-label>; не перекрывает последний элемент списка (отступ снизу у контента). |

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/disabled`, `action/primary/default`; интервал `space/8`; высота `control/height/xl`; отступы `space/20`; радиус `radius/chip`; ширина `control/height/xl`.
- `icon/plus`: высота `icon/size/md`; ширина `icon/size/md`.
- `label`: заливка / цвет `text/disabled`, `text/on-accent`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `focus ring`: радиус `radius/chip`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `state layer`: заливка / цвет `state/layer-inverse`; прозрачность `state/hover`, `state/pressed`; радиус `radius/chip`.
- Значений без переменной: 16 (напр. `hit area · web:w=56`, `hit area · web:h=56`, `hit area · web:w=183`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Floating button`, вариантов 8 из 8; оси: Layout, State.
- Борда: «Floating button — борда · шаблон v3», разделов 10.
- Описание: 1056 знаков, разделы: Status: Level: Когда использовать: Icon — Позиция: A11y: Тень: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsFloatingButton>`; Flutter: `DsFloatingButton`.
- Props: `layout`: icon | extended.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
