# Textarea — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Textarea`. Status: beta. Level: unknown.
- Figma: Components, страница «Textarea» (`353:1003`), набор `168:1324`. Платформы: Web, Mobile web, iOS, Android.
- Level в описании набора: molecule. Набор `Textarea` заменён на месте 2026-11-13: каждый вариант — раскрытый экземпляр `_Field base` с Lines=Multi (слой `Field`). `Textarea · пилот` (draft) остаётся образцом сборки.
- Всё, что не названо здесь (рамка, токены, зоны), — в `docs/components/field-base.md`.

## 2. Intent
- Многострочное поле: комментарий, описание, обращение в поддержку. Надстройка над `_Field base` (Lines=Multi).
- Когда использовать: текст длиннее одной строки (комментарий, обращение).
- Когда нет: одна строка — Input; выбор — Select.
- Правило выбора варианта:
  - Size: M | L = размер соседних полей формы; меняет шрифт и отступы, высота M и L одинакова (решение 2026-11-05); XL снят 2026-11-17.
  - Label position: только Above — подпись в разрыве рамки у многострочного поля не используется.
  - State: Default — пусто, плейсхолдер; Hover — указатель над полем; Focus — идёт ввод; Filled — текст введён; Error — ошибка поля; Disabled — ввод недоступен; Read-only — текст можно скопировать, не изменить; Loading — текст проверяется или грузится; Skeleton — форма грузится.
  - Высота задаётся числом строк (rows, минимум 3), не размером: от 96 (3 строки), растёт до 8 строк, дальше прокрутка внутри.
  - Counter — лимит символов; счётчик живёт в строке подсказки: виден при Show helper; без подсказки — Show helper + пустой Helper.
- Не делаем: подпись в разрыве рамки (On border); ручное изменение размера; плейсхолдер вместо подписи; ошибка только цветом.

## 3. Anatomy
- Корень — раскрытый экземпляр `_Field base` с Lines=Multi (слой `Field`, вертикально `space/6`); min-width `size/field/min` (160).
- `label` — подпись над полем, переносится.
- `field` — рамка (`control/surface/*`, `control/border/*`, радиус `radius/control-sm` M / `radius/control` L), min-высота `size/field/multi-min` (96); `text` (`caret` + `value`), первая строка — там же, где у Input; `state layer`, `focus ring`, зоны.
- `helper row` — `helper` + `counter` под полем; видна только при Show helper.
- Своих слоёв, токенов и служебных слоёв у надстройки нет — всё у базы (`field-base.md`, раздел 3). Зона нажатия — вся область поля (больше 44), отдельный hit area не нужен.
- Вложено: `_Field base` ×18.
- Служебные слои (вариантов из 18): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле: Hover — обводка `control/border/hover` + слой `state/layer` × `state/hover`; Pressed нет; Focus — обводка `control/border/focus` + кольцо; Disabled — токены `*/disabled`; Skeleton — загрузка (всё из `_Field base`).
- Default — плейсхолдер `text/tertiary`, рамка `control/border/default`.
- Hover — обводка `control/border/hover` и слой `state/layer` × `state/hover`.
- Focus — рамка `control/border/focus` и каретка; с клавиатуры — кольцо фокуса 2 px + зазор 2 px.
- Filled — текст `text/primary`.
- Error — рамка `control/border/error`, подсказка `text/danger`; ошибка переносится.
- Disabled — фон `control/surface/disabled`, все тексты `text/disabled`.
- Read-only — фон как у Disabled, рамка `border/subtle`, текст `text/primary`; копируется.
- Loading — спиннер в конце поля.
- Skeleton — фон `skeleton/base`; подсказка и счётчик скрыты.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | M |
| Label position | Above | Above |
| State | Default · Hover · Focus · Filled · Error · Disabled · Read-only · Loading · Skeleton | Default |

Матрица полная: 18 вариантов.

- Своих свойств у набора нет: Label, Show label, Value, Helper, Show helper, Counter, Show counter, Focus ring — у вложенного слоя `Field` (таблица — `field-base.md`, раздел 5).
- Матрица: только Label position=Above.

## 6. Content / slots
- Высота от 96 (3 строки), растёт до 8 строк, дальше прокрутка (в макете — обрезка «…»).
- Подпись и ошибка переносятся; Counter не переносится, прижат к концу строки.
- Языки (de, ar, hi, th, ja, kk) — строки не режутся по вертикали.
- Текст 200 %: в коде высота — `min-height` из токена, поле растёт по строкам.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Выравнивание текста — по направлению языка.

## 7. Events
- `update:modelValue`, `focus`, `blur`, `change`. Уточняется при сверке с Vue.

## 8. Behavior
- Авторост по содержимому до 8 строк, дальше прокрутка внутри; ручного изменения размера нет.
- Смена рамки и слоя состояния — по `docs/motion.md`; своих значений нет.

## 9. Accessibility
- `textarea` с `label`.
- Лимит — `aria-describedby` на счётчик; Error — `aria-invalid`.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — у слоя `Field`.

## 10. Tokens
- `корень`: мин. ширина `size/field/min`.
- `Field`: интервал `space/6`; мин. ширина `size/field/min`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 18 (напр. `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Токены и режимы Platform — как у базы; своих токенов нет.

## 12. Figma projection
- Набор `Textarea`, вариантов 18 из 18; оси: Size, Label position, State.
- Борда: «Textarea — борда · шаблон v3», разделов 12.
- Описание: 1114 знаков, разделы: Status: Level: Многострочное поле: Когда использовать: Skeleton: Состояния: A11y: Зона нажатия — Матрица: Legacy:
- Оси менять на корне; свойства — у слоя `Field` (раскрытый экземпляр `_Field base`).
- Экземпляров в файле (13.11): 152; значения свойств перенесены у 72; обрезаний родительскими рамками — 0; «Show counter без Show helper» — 0.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTextarea>`; Flutter: `DsTextarea`.
- Props: `size`: m | l; `labelPosition`: above.
- Состояния (Default, Hover, Focus, Filled, Error, Disabled, Read-only, Loading, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading`, `skeleton` — props.
- Vue `Textarea` (DSP) — сверка не сделана, код недоступен; HTML/CSS — есть (описание набора).
- Свойства базы (слой `Field`) — props: `label`, `showLabel`, `value` (v-model), `helper`, `showHelper`, `counter`, `showCounter`, `rows` (минимум 3); `readonly`, `disabled`, `loading`, `skeleton`.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 (2026-11-13).
- `variables-check.plugin.js` — 0 у набора (2026-11-13; у базы `minHeight 96 @field` привязан к `size/field/multi-min` 13.11).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: паритет с кодом (кода нет); вставка содержимого в слот руками в Figma. Стенд: набор 9 состояний × 3 размера; Light / Dark, L0–L3, оверрайды текста — на борде v3, действующий набор; бренды × платформы, длинный текст, 6 языков, 200 % — сняты у пилота и базы, у действующего набора отдельно не снимались.

## 15. Migration
- Legacy: DS Web textarea.
- 2026-11-13, MAJOR для макетов: 14 свойств набора удалены, свойства — на слое `Field`; в продуктовых файлах оверрайды свойств сбросятся при обновлении библиотеки.
- Высота с подсказкой: 144 → 148 (зазор подсказки базы). Skeleton скрывает подсказку и счётчик: 144 → 122.
- Счётчик живёт в строке подсказки: показать счётчик без подсказки — Show helper + пустой Helper.

Осталось доделать (после пакета правок beta 2026-11-13):
- Описание набора в Figma: «Матрица: 3 × 1 × 9 = 27» устарела (XL снят 17.11, сейчас 18); «растёт до 240 px» — сверить с «до 8 строк».
