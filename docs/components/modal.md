# Modal — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Modal`. Status: draft. Level: unknown.
- Figma: Components, страница «Modal» (`364:3195`), набор `81:829`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `overlay surface`, `header`, `title`, `close`, `divider`, `Body`, `Контент модалки — в слот Body: текст, поля, список.`, `Footer slot`, `Button`, `title group`, `header description`.
- Вложено: `_Overlay surface` ×12, иконки ×12, `Button` ×15, `smbl-bitcoin-btc` ×4.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Header | Title · Coin · Empty | — |
| Footer | Single · Stacked · Horizontal · None | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Уменьшить риск» | 8 из 12 |
| Divider | булево | выкл | 12 из 12 |
| Show close | булево | вкл | 12 из 12 |
| Header description | булево | вкл | 4 из 12 |
| Body | SLOT | `undefined` | 12 из 12 |
| Footer slot | SLOT | `undefined` | 9 из 12 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: радиус `radius/surface`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/level-1`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/8`; отступы `space/16`, `space/24`, `space/32`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`, `type/heading/lg`.
- `close`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `divider`: заливка / цвет `border/subtle`.
- `Body`: интервал `space/12`; отступы `space/32`, `space/8`.
- `Контент модалки — в слот Body: текст, поля, список.`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/lg`.
- `Footer slot`: интервал `space/16`, `space/8`; отступы `space/24`, `space/32`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/xl`; мин. ширина `size/button/min`; отступы `space/16`; радиус `radius/container`.
- `title group`: интервал `space/12`.
- `header description`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- Значений без переменной: 12 (напр. `(root):w=560`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Modal`, вариантов 12 из 12; оси: Header, Footer.
- Борда: «Modal — борда · шаблон v3», разделов 10.
- Описание: 1886 знаков, разделы: Status: Level: Когда использовать: Header: Footer: Body и Footer — Когда нет: A11y: Поиск: Legacy: Motion: Тень:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsModal>`; Flutter: `DsModal`.
- Props: `header`: title | coin | empty; `footer`: single | stacked | horizontal | none; `title`: string или слот; `divider`: boolean = false; `showClose`: boolean = true; `headerDescription`: boolean = true; `body`: string или слот; `footerSlot`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
