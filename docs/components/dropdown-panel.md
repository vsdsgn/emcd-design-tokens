# Dropdown panel — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Dropdown panel`. Status: draft. Level: unknown.
- Figma: Components, страница «Dropdown panel» (`1661:2`), набор `1661:300`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `overlay surface`, `header`, `tabs`, `reset`, `search`, `list`, `empty`, `empty title`, `empty hint`.
- Вложено: `_Overlay surface` ×2, `Tabs` ×2, `Button` ×2, `Input` ×2, `Multiselect option` ×5.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Content | List · Empty | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show tabs | булево | вкл | 2 из 2 |
| Show reset | булево | вкл | 2 из 2 |
| Show search | булево | вкл | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/12`; отступы `space/12`; радиус `radius/control`.
- `overlay surface`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/8`.
- `tabs`: интервал `space/20`; обводка `border/subtle`.
- `reset`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `search`: мин. ширина `size/field/min`.
- `list`: maxh `size/dropdown-panel/max-height`.
- `empty`: интервал `space/4`; отступы `space/24`.
- `empty title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `empty hint`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Значений без переменной: 2 (напр. `(root):w=460`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Dropdown panel`, вариантов 2 из 2; оси: Content.
- Борда: «Dropdown panel — борда · шаблон v3», разделов 9.
- Описание: 1029 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены: Поверхность —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDropdownPanel>`; Flutter: `DsDropdownPanel`.
- Props: `content`: list | empty; `showTabs`: boolean = true; `showReset`: boolean = true; `showSearch`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
