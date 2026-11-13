# Tooltip tour — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Tooltip tour`. Status: draft. Level: molecule.
- Figma: Components, страница «Tooltip tour» (`1662:1177`), набор `1662:1318`.

## 2. Intent
- Подсказка онбординга с шагами: номер шага, заголовок, пояснение и кнопки «Пропустить» и «Далее» со стрелкой на элемент. Для обучающих туров по экрану.
- Когда использовать: первый вход, новая функция, тур по нескольким элементам.
- Когда нет: короткая подсказка на hover или фокус — Tooltip; постоянное объяснение — Suggest.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `step`, `title`, `description`, `footer`, `skip`, `next`.
- Вложено: `Button` ×8, `_Tooltip arrow` ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Placement | Top · Bottom | — |
| Tone | Neutral · Accent | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Step | текст | «Шаг 1 из 4» | 4 из 4 |
| Title | текст | «Подключи Watcher link» | 4 из 4 |
| Description | текст | «Дай доступ на просмотр статистики без права управления. Ссылку можно отозвать в любой момент.» | 4 из 4 |
| Show step | булево | вкл | 4 из 4 |
| Show skip | булево | вкл | 4 из 4 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="dialog" с aria-label, фокус на заголовке шага и заперт внутри; Esc пропускает тур; шаг озвучивается («Шаг 1 из 4»).

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/primary/default`, `surface/raised`; интервал `space/8`; maxw `size/tooltip/max`; мин. ширина `size/tooltip/min`; отступы `space/16`; радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `step`: заливка / цвет `text/on-accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `title`: заливка / цвет `text/on-accent`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/on-accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `footer`: интервал `space/8`.
- `skip`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `next`: заливка / цвет `action/inverse/default`, `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`.
- Min / max корня: minWidth 58 size/tooltip/min, maxWidth 320 size/tooltip/max.
- Значений без переменной: 8 (напр. `(root):w=320`, `step:o=0.72`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Tooltip tour`, вариантов 4 из 4; оси: Placement, Tone.
- Борда: «Tooltip tour — борда · шаблон v3», разделов 10.
- Описание: 892 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltipTour>`; Flutter: `DsTooltipTour`.
- Props: `placement`: top | bottom; `tone`: neutral | accent; `step`: string или слот; `title`: string или слот; `description`: string или слот; `showStep`: boolean = true; `showSkip`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web Tooltip tour (color, neutral).
