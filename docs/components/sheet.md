# Sheet — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Sheet`. Status: draft. Level: unknown.
- Figma: Components, страница «Sheet» (`364:3332`), набор `85:544`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `overlay surface`, `grabber`, `header`, `title`, `Header actions`, `close`, `Body`, `Сумма, сеть, адрес и статус транзакции. Контент — в слот Body.`, `Footer`, `Button`, `card`, `group title`, `Отправить`, `divider`, `Rectangle`.
- Вложено: `_Overlay surface` ×2, иконки ×1, `Button` ×2, `Menu item` ×2.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Default · Menu | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Детали выплаты» | 1 из 2 |
| Show grabber | булево | вкл | 1 из 2 |
| Show close | булево | вкл | 1 из 2 |
| Show footer | булево | вкл | 1 из 2 |
| Header actions | SLOT | `undefined` | 1 из 2 |
| Body | SLOT | `undefined` | 1 из 2 |
| Footer | SLOT | `undefined` | 1 из 2 |
| Show header actions | булево | выкл | 1 из 2 |
| Items | SLOT | `undefined` | 1 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/16`; maxw `size/sheet/max`; отступы `modal/padding`, `os/safe-area/bottom`, `space/16`, `space/8`; радиус `radius/surface`.
- `overlay surface`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; радиус `radius/surface`.
- `grabber`: заливка / цвет `border/default`; радиус `radius/chip`.
- `header`: интервал `space/12`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/md`.
- `Header actions`: интервал `space/4`.
- `close`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `Body`: интервал `space/12`.
- `Сумма, сеть, адрес и статус транзакции. Контент — в слот Body.`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Footer`: интервал `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/lg`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/container`.
- `card`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/level-1`; отступы `space/8`; радиус `radius/control`.
- `group title`: отступы `space/20`, `space/4`, `space/8`.
- `Отправить`: заливка / цвет `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `divider`: отступы `space/20`.
- `Rectangle`: заливка / цвет `border/subtle`.
- Min / max корня: maxWidth 640 size/sheet/max.
- Значений без переменной: 2 (напр. `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Sheet`, вариантов 2 из 2; оси: Type.
- Борда: «Sheet — борда · шаблон v3», разделов 10.
- Описание: 1374 знаков, разделы: Status: Level: Type=Default — Type=Menu — Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Motion: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSheet>`; Flutter: `DsSheet`.
- Props: `type`: default | menu; `title`: string или слот; `showGrabber`: boolean = true; `showClose`: boolean = true; `showFooter`: boolean = true; `headerActions`: string или слот; `body`: string или слот; `footer`: string или слот; `showHeaderActions`: boolean = false; `items`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах
