# Side panel — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Side panel`. Status: draft. Level: unknown.
- Figma: Components, страница «Side panel» (`364:3871`), набор `58:457`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `header`, `title`, `Header actions`, `close`, `Body`, `Хешрейт, история, настройки воркера. Контент — в слот Body.`, `Footer`, `Button`.
- Вложено: иконки ×2, `Button` ×4.
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
| Title | текст | «Воркер rig-01» | 2 из 2 |
| Show close | булево | вкл | 2 из 2 |
| Show footer | булево | вкл | 2 из 2 |
| Header actions | SLOT | `undefined` | 2 из 2 |
| Body | SLOT | `undefined` | 2 из 2 |
| Footer | SLOT | `undefined` | 2 из 2 |
| Show header actions | булево | выкл | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; интервал `space/16`; отступы `modal/padding`; обводка `border/subtle`.
- `header`: интервал `space/12`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/md`.
- `Header actions`: интервал `space/4`.
- `close`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `Body`: интервал `space/12`.
- `Хешрейт, история, настройки воркера. Контент — в слот Body.`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Footer`: интервал `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/8`; радиус `radius/control`.
- Значений без переменной: 4 (напр. `(root):w=400`, `(root):h=720`, `(root):w=480`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Side panel`, вариантов 2 из 2; оси: Size.
- Борда: «Side panel — борда · шаблон v3», разделов 10.
- Описание: 1142 знаков, разделы: Status: Level: Side panel: Когда использовать: Правила: A11y: Поиск: Legacy: Motion: Expressive (привязано): Тень:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSidePanel>`; Flutter: `DsSidePanel`.
- Props: `size`: m | l; `title`: string или слот; `showClose`: boolean = true; `showFooter`: boolean = true; `headerActions`: string или слот; `body`: string или слот; `footer`: string или слот; `showHeaderActions`: boolean = false.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
