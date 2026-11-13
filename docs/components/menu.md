# Menu — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Menu`. Status: draft. Level: unknown.
- Figma: Components, страница «Menu» (`364:6`), набор `51:195`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `overlay surface`, `search`, `group label`, `Воркеры`, `line`.
- Вложено: `_Overlay surface` ×2, `Input` ×2, `Menu item` ×8.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Items | SLOT | `undefined` | 2 из 2 |
| Search | булево | выкл | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/4`; maxw `size/menu/max`; мин. ширина `size/menu/min`; отступы `space/8`; радиус `radius/control`.
- `overlay surface`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `search`: мин. ширина `size/field/min`.
- `group label`: отступы `space/10`, `space/12`.
- `Воркеры`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `line`: заливка / цвет `border/subtle`.
- Min / max корня: minWidth 160 size/menu/min, maxWidth 320 size/menu/max.
- Значений без переменной: 2 (напр. `(root):w=300`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Menu`, вариантов 2 из 2; оси: Size.
- Борда: «Menu — борда · шаблон v3», разделов 10.
- Описание: 1228 знаков, разделы: Status: Level: Меню (Dropdown): Когда использовать: Правила: Цвета: A11y: Поиск: Legacy: Motion: Expressive (привязано): Тень:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMenu>`; Flutter: `DsMenu`.
- Props: `size`: m | l; `items`: string или слот; `search`: boolean = false.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
