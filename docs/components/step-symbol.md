# Step symbol — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Step symbol`. Status: beta. Level: unknown.
- Figma: Components, страница «Step symbol» (`1012:11`), набор `108:1416`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Кружок шага в Step: номер, иконка, галочка или точка в одном из трёх состояний.
- Когда использовать: только внутри Step — символ шага.
- Когда нет: отдельно в макете; счётчик — Counter; статус — Status.
- Правило выбора варианта:
  - Type: Numbered — шаги по порядку; Icon — шаг со смысловой иконкой; Checked — шаг пройден; Bullet — шаги без номера. В одном ряду — один тип.
  - State: Default — шаг впереди; Current — текущий (ровно один); Success — пройден.
  - Number — номер шага, 1–2 цифры; есть только у Type=Numbered.
- Не делаем: разные типы в одном ряду; два Current в ряду; символ вне Step; Number длиннее двух цифр.

## 3. Anatomy
- Корень — круг `size/media/sm` (24), `radius/chip`: Default — `action/secondary/default` + обводка `border/default` (`border/width/default`); Current — `control/checked`; Success — `status/success/solid`.
- `number` — цифра (`type/label/sm`, `font-weight/medium`): `text/secondary` в Default, `text/on-accent` в Current и Success.
- Иконка (Icon, Checked) — по центру круга; `bullet` — точка без круга: `border/default` / `control/checked` / `status/success/solid`.
- Вложено: иконки ×6.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Default — серый круг с обводкой (у Bullet — серая точка): шаг впереди.
- Current — заливка `control/checked`, содержимое `text/on-accent`: текущий шаг.
- Success — заливка `status/success/solid`: шаг пройден.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Numbered · Icon · Checked · Bullet | Numbered |
| State | Default · Current · Success | Default |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Number | текст | «1» | 3 из 12 |

## 6. Content / slots
- Number — 1–2 цифры. Длиннее не передавать: значение не усекается и не обрезается кругом, а выходит за него.
- Цифры не переводятся: языки на символ не влияют.
- Текст 200 %: круг не растёт (размер фиксирован), цифра удвоенного кегля помещается по высоте без обрезки.
- RTL: содержимое круга не зеркалится; порядок шагов зеркалит Stepper.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. Смену State задаёт Step.

## 9. Accessibility
- Декоративный: номер и состояние озвучивает Step («Шаг 2 из 4, текущий»).
- Иконка скрыта от читалки.

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`, `control/checked`, `status/success/solid`; высота `size/media/sm`; радиус `radius/chip`; обводка `border/default`; толщина обводки `border/width/default`; ширина `size/media/sm`.
- `number`: заливка / цвет `text/on-accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `bullet`: заливка / цвет `border/default`, `control/checked`, `status/success/solid`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Step symbol`, вариантов 12 из 12; оси: Type, State.
- Борда: «Step symbol — борда · шаблон v3», разделов 12.
- Описание: 702 знаков, разделы: Status: Level: Символ шага: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepSymbol>`; Flutter: `DsStepSymbol`.
- Props: `type`: numbered | icon | checked | bullet; `number`: string или слот.
- Состояния (Default, Current, Success) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; булевых свойств нет; кода нет — parity props пропущена.

## 15. Migration
- DS Web Stepper: Step Symbol (Type, State) → Step symbol (Type Numbered | Icon | Checked | Bullet, State Default | Current | Success).

Осталось доделать (после пакета правок beta 2026-11-13):
- Bullet · Default в Dark на L0 почти не виден (`border/default`) — на решение (токен).
- Checked · Default есть в матрице, а по правилу Checked — только пройденный шаг: оставить или сузить — на решение.
