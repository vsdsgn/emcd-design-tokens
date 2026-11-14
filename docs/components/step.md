# Step — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Step`. Status: beta. Level: unknown.
- Figma: Components, страница «Stepper» (`367:349`), набор `108:1450`. Платформы: Web, Mobile web, iOS, Android.
- Лежит на странице Stepper. Отдельно от Stepper не используется.

## 2. Intent
- Один шаг в Stepper: символ (Step symbol) + подпись и необязательное описание.
- Когда использовать: один шаг внутри Stepper: символ + подпись (+ описание).
- Когда нет: прогресс без названий — Step progress; отдельно от Stepper.
- Правило выбора варианта:
  - State: Default — шаг впереди; Current — текущий, ровно один в Stepper; Success — пройден.
  - Вложенный Step symbol: тип символа — один на весь Stepper.
  - Show description — пояснение под подписью; по умолчанию выключено.
  - Подпись — 1–3 слова; ширина шага — не больше `size/step/max`.
- Не делаем: два Current в одном Stepper; разные типы символа в одном ряду; длинная подпись; шаг вне Stepper.

## 3. Anatomy
- Корень — горизонтальный ряд, зазор `space/8`, max-width `size/step/max` (160): `symbol` (Step symbol, вложен) → стек `label` + `description`.
- `symbol` — круг `size/media/sm`, `radius/chip`: Default — `action/secondary/default` + обводка `border/default` (`border/width/default`); Current — `control/checked`; Success — `status/success/solid`.
- `label` — Label/MD Medium: `text/secondary` в Default, `text/primary` в Current и Success.
- `description` — Body/SM Regular, `text/tertiary`.
- Вложено: `Step symbol` ×3.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Default — серый круг с обводкой, подпись `text/secondary`: шаг впереди.
- Current — круг `control/checked`, подпись `text/primary`: текущий шаг.
- Success — круг `status/success/solid` с галочкой, подпись `text/primary`: шаг пройден.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Current · Success | Default |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Адрес» | 3 из 3 |
| Description | текст | «Куда вывести» | 3 из 3 |
| Show description | булево | выкл | 3 из 3 |

## 6. Content / slots
- Label — 1–3 слова; Description — короткое пояснение.
- Длинный текст: подпись и описание — до двух строк, max-width 120, дальше многоточие.
- Языки (de, ar, hi, th, ja, kk): подпись в 1–2 строки, обрезки по высоте нет.
- RTL: символ — со стороны начала строки, порядок шагов зеркалит Stepper; цифры — нет.
- Текст 200 %: подпись растёт, обрезки нет; круг символа не растёт.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. State задаёт Stepper.

## 9. Accessibility
- Элемент списка шагов (`ol` / `li`); текущий — `aria-current=step`.
- Пройденный и будущий озвучиваются словом («пройден», «впереди»), не только цветом.

## 10. Tokens
- `корень`: интервал `space/8`; maxw `size/step/max`.
- `symbol`: заливка / цвет `action/secondary/default`, `control/checked`, `status/success/solid`; высота `size/media/sm`; радиус `radius/chip`; обводка `border/default`; толщина обводки `border/width/default`; ширина `size/media/sm`.
- `label`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `description`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- Min / max корня: maxWidth 160 size/step/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Step`, вариантов 3 из 3; оси: State.
- Борда: «Step — борда · шаблон v3», разделов 10.
- Описание: 727 знаков, разделы: Status: Level: Шаг: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStep>`; Flutter: `DsStep`.
- Props: `label`: string или слот; `description`: string или слот; `showDescription`: boolean = false.
- Состояния (Default, Current, Success) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 120).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; Show description = On — только Light; правка длинного текста 13.11 стендом не перепроверена; кода нет — parity props пропущена.

## 15. Migration
- DS Web `Step Text - Horizontal` (Leading Text, Type, State) → Step: State Default | Current | Success, Label, Description + Show description; Type — у вложенного Step symbol.
- DS Web `Stepper H / V` (Step Symbol + Step Trail + Step Text) → набора Stepper в 2.0 нет, Step trail в Step не вложен; DS App — нет.

Осталось доделать (после пакета правок beta 2026-11-13):
- max-width подписи и описания 120 — числом (текстовые слои).
