# Empty state — контракт · draft (2026-11-14)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Empty state`. Status: draft. Level: unknown.
- Figma: Components, страница «Empty state» (`366:3230`), набор `55:426`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `dashed background`, `text`, `title`, `Actions`, `Button`, `link`, `column`.
- Вложено: `status/pending` ×4, `Button` ×7.
- Служебные слои (вариантов из 5): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M · S | — |
| Layout | Horizontal · Vertical | — |

Матрица: 5 из 6.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Воркеров пока нет» | 5 из 5 |
| Text | текст | «Подключите первое устройство — статистика появится здесь через 10 минут.» | 5 из 5 |
| Show text | булево | вкл | 5 из 5 |
| Show illustration | булево | вкл | 4 из 5 |
| Show actions | булево | вкл | 5 из 5 |
| Illustration | SLOT | `undefined` | 4 из 5 |
| Actions | SLOT | `undefined` | 5 из 5 |
| Dashed background | булево | выкл | 5 из 5 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/16`, `space/32`, `space/8`; отступы `control/padding-x/lg`, `space/16`, `space/32`.
- `dashed background`: радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `text`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/lg`, `type/body/md`, `type/body/sm`; интервал `space/4`, `space/8`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/lg`, `type/heading/sm`, `type/label/md`.
- `Actions`: интервал `space/12`, `space/16`, `space/8`; отступы `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/md`, `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`, `space/8`; радиус `radius/control`, `radius/control-sm`.
- `link`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `column`: интервал `space/12`, `space/16`.
- Значений без переменной: 5 (напр. `(root):w=560`, `(root):w=320`, `(root):w=280`, `(root):w=720`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Empty state`, вариантов 5 из 6; оси: Size, Layout.
- Борда: «Empty state — борда · шаблон v3», разделов 10.
- Описание: 1287 знаков, разделы: Status: Level: Empty state: Когда использовать: Правила: A11y: Поиск: Legacy: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsEmptyState>`; Flutter: `DsEmptyState`.
- Props: `size`: l | m | s; `layout`: horizontal | vertical; `title`: string или слот; `text`: string или слот; `showText`: boolean = true; `showIllustration`: boolean = true; `showActions`: boolean = true; `illustration`: string или слот; `actions`: string или слот; `dashedBackground`: boolean = false.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web / DS App `empty state`: position vertical / horizontal → Layout; illustration / title / text frame / action 1 / action 2 → Show illustration / Title / Show text / Show actions; dashed background → Dashed background; `actions` (buttons / input / badge / link) → слот Actions. Вложенный legacy Button/Link/S → Button Type=Text.
