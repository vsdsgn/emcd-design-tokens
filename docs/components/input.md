# Input — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input`. Status: beta. Level: unknown.
- Figma: Components, страница «Input» (`349:2`), набор `393:14122`. Платформы: Web, Mobile web, iOS, Android.
- Level в описании набора: molecule. Набор `Input` заменён на месте 2026-11-13: каждый вариант — раскрытый экземпляр `_Field base` (слой `Field`). `Input · пилот` (draft, страница `_Field base`) остаётся образцом сборки, в макетах не используется.
- Всё, что не названо здесь (рамка, слоты, токены, зоны), — в `docs/components/field-base.md`.

## 2. Intent
- Текстовое поле в одну строку: подпись, рамка со слотами Leading / Inline / Trailing, подсказка и счётчик под полем. Надстройка над `_Field base` (Lines=Single).
- Когда использовать: одна строка текста или числа.
- Когда нет: несколько строк — Textarea; выбор из списка — Select; сумма с валютой — Input amount; пароль — Password field.
- Правило выбора варианта:
  - Size: M 40 | L 48 (`control/height/*`) = размер соседних полей формы; XL снят 2026-11-17.
  - Label position: On border — по умолчанию (как в legacy): формы вывода, суммы; подпись короткая (1–3 слова, одна строка не шире 240, дальше многоточие). Above — длинные формы, KYC, настройки, длинная подпись (переносится). В одной форме — одинаково.
  - State: Default — пусто, плейсхолдер; Hover — указатель над полем; Focus — идёт ввод; Filled — значение введено; Error — ошибка, текст под полем; Disabled — ввод недоступен, причина рядом; Read-only — значение можно скопировать, не изменить; Loading — значение проверяется или грузится (спиннер справа); Skeleton — форма грузится.
  - Слоты вместо вариантов: Leading — иконка (поиск, сеть), Coin, Avatar; Inline — сразу после значения: единица, Counter; Trailing — единица, «Макс» (Button Text S), шеврон, степпер и очистка (Icon button Ghost S), Counter. Новый тип содержимого — не новый вариант.
  - Очистка — Icon button Ghost S в Trailing, когда есть значение и поле в фокусе / заполнено: на касании — по умолчанию (зона 44); на Web — только поиск и длинные значения (адрес, хэш).
  - Оси Size, Label position, State менять на корне Input, не на слое `Field` (аудит: BASE).
- Не делаем: плейсхолдер вместо подписи; ошибка в тултипе или только цветом; свои варианты под разное содержимое — для этого слоты; ось на слое `Field` вместо корня.

## 3. Anatomy
- Корень — раскрытый экземпляр `_Field base` с Lines=Single (слой `Field`, вертикально `space/6`); min-width `size/field/min` (160), по умолчанию поле тянется по контейнеру.
- `label` — подпись над полем (Label position=Above) или `notch label` в разрыве рамки (On border).
- `field` — рамка (`control/surface/*`, `control/border/*`, радиус `radius/control-sm` M / `radius/control` L): слоты `Leading` · `Inline` · `Trailing` (зазоры `space/6`, `space/6`, `space/8`), `text` (`caret` + `value`), `state layer`, `focus ring`, зоны.
- `helper row` — `helper` + `counter` одной строкой под полем; видна только при Show helper. Счётчик без подсказки — Show helper + пустой Helper.
- Своих слоёв, токенов и служебных слоёв у надстройки нет — всё у базы (`field-base.md`, раздел 3).
- Вложено: `_Field base` ×36.
- Служебные слои (вариантов из 36): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле: Hover — обводка `control/border/hover` + слой `state/layer` × `state/hover`; Pressed нет; Focus — обводка `control/border/focus` + кольцо; Disabled — токены `*/disabled`; Skeleton — загрузка (всё из `_Field base`).
- Default — плейсхолдер `text/tertiary`, рамка `control/border/default`.
- Hover — обводка `control/border/hover` (нейтральная, плотнее) и слой `state/layer` × `state/hover`.
- Focus — рамка `control/border/focus` и каретка; с клавиатуры — ещё кольцо фокуса.
- Filled — значение `text/primary`.
- Error — рамка `control/border/error`, подсказка `text/danger`: текст ошибки — что сделать.
- Disabled — фон `control/surface/disabled`, все тексты `text/disabled`; причина — рядом.
- Read-only — фон как у Disabled, рамка `border/subtle`, значение `text/primary`, без рамки фокуса; значение копируется.
- Loading — спиннер в конце поля.
- Skeleton — фон `skeleton/base`; слоты, подсказка и счётчик скрыты (свойства Show … не действуют).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | M |
| Label position | On border · Above | On border |
| State | Default · Hover · Focus · Filled · Error · Disabled · Read-only · Loading · Skeleton | Default |

Матрица полная: 36 вариантов.

- Своих свойств у набора нет: Label, Show label, Value, Helper, Show helper, Counter, Show counter, Show leading / inline / trailing, слоты Leading / Inline / Trailing, Focus ring, Show hit area, Safe margin — у вложенного слоя `Field` (таблица — `field-base.md`, раздел 5).
- Оси Size, Label position, State менять на корне Input, не на слое `Field` (аудит: BASE).

## 6. Content / slots
- Значение — одна строка, обрезка «…».
- Подпись On border — одна строка не шире 240, дальше многоточие; длинная подпись — Label position=Above, переносится.
- Helper переносится; Counter не переносится, прижат к концу строки.
- Содержимое слотов (2026-11-15, вместо удалённых `Input addon / *`): единица — текстовый слой; шеврон и иконка — иконка напрямую; очистка и степпер — Icon button Ghost S; «Макс» — Button Type=Text Size=S; «+N» — Counter.
- Языки (de, ar, hi, th, ja, kk) — высота поля не меняется, строки не режутся по вертикали.
- Текст 200 %: в коде высота поля — `min-height` из токена; подпись On border при увеличенном шрифте переходит в Above.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Слоты и выравнивание зеркалятся в коде (logical properties).

## 7. Events
- `update:modelValue`, `focus`, `blur`, `change`; controlled (v-model). Уточняется при сверке с Vue.
- Очистка — `update:modelValue` с пустым значением; Esc очищает при показанной очистке.

## 8. Behavior
- Клавиатура — нативный `input`.
- Смена рамки и слоя состояния — по `docs/motion.md`; своих значений нет. Остальное — база.

## 9. Accessibility
- Нативный `input` с `label` (при On border — `aria-label` или связанный `label`).
- `aria-invalid` при Error; `aria-describedby` — helper и ошибка.
- `readonly` / `disabled` — нативные атрибуты; Read-only копируется.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — у слоя `Field` (рамка +2 px, `border/focus-ring`).

## 10. Tokens
- `корень`: мин. ширина `size/field/min`.
- `Field`: интервал `space/6`; мин. ширина `size/field/min`; отступы `space/8`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 36 (напр. `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Токены и режимы Platform — как у базы; своих токенов нет.

## 12. Figma projection
- Набор `Input`, вариантов 36 из 36; оси: Size, Label position, State.
- Борда: «Input — борда · шаблон v3», разделов 12.
- Описание: 2377 знаков, разделы: Status: Level: Когда использовать: Длинный текст: Helper и Counter — Матрица: Legacy: Текстовое поле. • Leading — • Inline — • Trailing — • Input addon / Clear —
- Оси менять на корне; свойства — у слоя `Field` (раскрытый экземпляр `_Field base`).
- Экземпляров в файле (13.11): 272, у всех первый слой — `Field`; «Show counter без Show helper» — 0.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInput>`; Flutter: `DsInput`.
- Props: `size`: m | l; `labelPosition`: on-border | above.
- Состояния (Default, Hover, Focus, Filled, Error, Disabled, Read-only, Loading, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading`, `skeleton` — props.
- Vue `Input` (DSP) — сверка не сделана, код недоступен.
- Свойства базы (слой `Field`) — props: `label`, `showLabel`, `value` (v-model), `helper`, `showHelper`, `counter`, `showCounter`, слоты `leading` / `inline` / `trailing`; `readonly`, `disabled`, `loading`, `skeleton`.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 (2026-11-13).
- `variables-check.plugin.js` — 0 у набора (2026-11-13; у `Input addon / Clear` — толщина глифа 1.5 числом; набор удалён 2026-11-15, очистка — Icon button Ghost S).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: паритет с кодом (кода нет); вставка содержимого в слот руками в Figma (проверяет Стефан); борда v3 после замены просмотрена выборочно. Стенд: Light / Dark × L0–L3 — на борде v3, действующий набор; бренды × платформы, длинный текст, 6 языков, 200 % — сняты у пилота и базы (та же конструкция), у действующего набора отдельно не снимались.

## 15. Migration
- Legacy: DS Web input (подпись в разрыве рамки, XL 56 · r 12 · отступы 16, курсор перед значением, подсказка под полем). Докрутка 2.0: M 40 / L 48, Read-only, подпись над полем, кольцо фокуса, зоны, слоты.
- 2026-11-13, MAJOR для макетов: свойства Label, Value, Helper, Counter, Show …, слоты — теперь на слое `Field`, у корня остались только оси Size, Label position, State. Значения свойств в экземплярах внутри Components перенесены скриптом; в продуктовых файлах при обновлении библиотеки оверрайды свойств сбросятся — выставить заново на слое `Field`.
- Высота с подсказкой: +4 px (зазор подсказки базы `space/6` вместо 2): M 88 → 92.
- Skeleton скрывает слоты, подсказку и счётчик.
- Потребители в библиотеке: Password field (4), Select (24), Dropdown panel (2), Menu (2) — пересобраны на новом наборе.
- Потери при замене: содержимое слота Trailing у трёх архивных экземпляров (32:1250, 32:1496, 170:1691) не восстановлено; на бордах сброшены единичные оверрайды текста. Откат — точка в Version history от 13.11.

Осталось доделать (после пакета правок beta 2026-11-13):
- Описание набора в Figma: «Матрица: 3 × 2 × 9 = 54» устарела (XL снят 17.11, сейчас 36); блок «Input addon / Clear» — набор удалён 15.11, очистка — Icon button Ghost S.
