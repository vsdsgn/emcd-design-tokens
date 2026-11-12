# _List row — контракт (2026-11-12)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, размеры) — ссылками, не повтором.
Покрывает базу `_List row` и надстройки `Menu item · пилот`, `Multiselect option · пилот`, `List item · пилот`.

## 1. Identity
- База: `_List row`. Status: beta. Level: base (служебный, имя с «_», не публикуется).
- Надстройки: `Menu item · пилот` (molecule), `Multiselect option · пилот` (atom), `List item · пилот` (molecule). Status: draft · пилот. Действующие Menu item, Multiselect option, List item не тронуты до ответа на вопрос 1 доски.
- Figma: Components, страница `_List row`, доска «⚑ Пилот _List row». Платформы: Web, Mobile web, iOS, Android.
- Решение: Стефан 2026-11-12, «вариант 2» — общая база + надстройки с вложенным раскрытым экземпляром.

## 2. Intent
- Одна строка для меню, списков выбора и списков данных: глиф выбора → слот слева → тексты → слот справа → галочка.
- База в макеты напрямую не ставится: брать Menu item, Multiselect option, List item. Строки Dropdown panel — те же надстройки.
- Когда какая надстройка — в их описаниях (Menu item — действие или выбор в меню; Multiselect option — строка множественного выбора; List item — строка данных).

## 3. Anatomy
Надстройка (корень) → экземпляр `_List row` (FILL, раскрыт) →
- `selection` — глиф выбора, экземпляр `_Checkbox control` (свойство замены `Selection control`);
- `Leading` — слот: иконка, монета, аватар;
- `content` — `label`, `description`; у Content = Big value — строка значения с единицей (`Subvalue`);
- `Trailing` — слот: Badge, значение, шеврон, кнопка, Toggle;
- `selected` — галочка выбранного;
- `state layer`, `focus ring`, `hit area · overlay` (web и app), `safe area · outer` — экземпляры служебных компонентов (`service-layers.md`).

## 4. States
Модель состояний — `docs/components.md`.
- State = Default · Hover · Pressed · Disabled. Hover / Pressed — слой `state/layer`, opacity `state/hover` / `state/pressed`, во всю строку.
- Disabled: тексты `text/disabled`, иконка Leading и галочка `icon/disabled`; глиф выбора — State = Disabled (ставит надстройка, см. раздел 12).
- Фокус с клавиатуры — свойство Focus ring (кольцо вокруг строки).
- Выбор не состояние: Selected (галочка) и Show selection (глиф) — булевы свойства, сочетаются с любым State.
- Loading и Skeleton у базы нет; скелет списка — на уровне списка (фаза C).

## 5. Properties
База `_List row`:

| Свойство | Тип | Значения / по умолчанию |
|---|---|---|
| Type | variant | Menu · Option · List |
| Size | variant | M · L |
| Content | variant | Text first · Description first · Big value · Description only |
| State | variant | Default · Hover · Pressed · Disabled |
| Leading / Show leading | slot / boolean | true |
| Trailing / Show trailing | slot / boolean | false |
| Label | text | — |
| Description / Show description | text / boolean | false (только Menu и Option) |
| Subvalue | text | единица у Big value |
| Selected | boolean | false |
| Show selection | boolean | false |
| Selection control | instance swap | `_Checkbox control` |
| Divider | boolean | только Type = List |
| Focus ring | boolean | false |
| Show hit area | boolean | false |
| Safe margin | boolean | false |

Матрица: 44 из 96. Menu — Size M, L × Text first; Option — M × Text first; List — M, L × все Content. Остальных сочетаний нет (правило — в описании набора, строка «Матрица:»).

Размеры (Default):

| Type · Size | Высота | Отступы (верт. / гор.) |
|---|---|---|
| Menu M · L | 44 · 56 | 10 / 12 · 16 / 12 |
| Option M | 40 (min-height 40) | 8 / 12 |
| List M | 60 (Big value 68) | 12 / 16 |
| List L | 76 (Big value 84, Description only 68) | 16 / 16 |

Надстройки:

| Набор | Оси | Вариантов |
|---|---|---|
| `Menu item · пилот` | Size (M, L) × Tone (Default, Danger) × State (4) | 16 |
| `Multiselect option · пилот` | State (4) | 4 |
| `List item · пилот` | Size (M, L) × Style (Plain, Card) × Content (4) × State (4) | 64 |

- Оси надстройки менять на корне. Свойства базы (Label, Description, слоты, Selected, Show selection, Divider, Focus ring, зоны) — через раскрытый экземпляр базы.
- Tone = Danger (Menu item): подпись `text/danger`, иконка Leading `icon/danger` — переопределения в надстройке.
- Style = Card (List item): фон `surface/raised`, радиус `radius/control`, Divider выключен — переопределения в надстройке.
- Изменения против действующих: `Title` → `Label`; `Leading · swap` → Show leading + слот Leading; `Checkbox` → Show selection; у Multiselect option `State = Selected` → булево Selected (вопросы 2 и 4 доски).

## 6. Content / slots
- Label обязателен. Описание — одна строка. Суммы — в Trailing, Numeric в коде; длинный адрес — сокращение в середине.
- Leading: иконка 20 / 24, монета 32–36, аватар, эмодзи. Trailing: Badge, Counter, значение, шеврон, кнопка, Toggle; текст в слот добавляется.
- Длинная подпись обрезается многоточием; у Big value значение обрезается без многоточия (парковка `OPEN-QUESTIONS`).
- Языки (de, ar, hi, th, ja, kk) проверены: строки не режутся по высоте, слоты не смещаются.

## 7. Events
У базы событий нет. Надстройки: `click` / `select` (Menu item), `change` выбранного (Multiselect option), `click` (List item, если строка открывает детали).

## 8. Behavior
- Нажимается вся строка; вложенные контролы в Trailing — отдельные цели.
- Show selection — множественный выбор (глиф слева), Selected — одиночный (галочка справа). Вместе не включать.
- RTL: порядок selection → Leading → content → Trailing → selected зеркалится в коде (`docs/rtl.md`).
- Текст 200 %: строка растёт по тексту; стендом не снималось.

## 9. Accessibility
- Кольцо фокуса: рамка +2 px вокруг строки, OUTSIDE, `border/width/focus-ring`, `radius/focus-ring*`, `border/focus-ring`.
- Зона нажатия ≥ `touch/min` (Web 24, касание 44). Защитное поле — `control/safe-margin`.
- Роли: `menuitem` в меню, `option` + `aria-selected` в списке выбора, у List item — одна цель с полным именем. Disabled — `aria-disabled`.
- Контраст — `docs/a11y-contrast-standard.md`.

## 10. Tokens
- Отступы: `space/8`, `space/10`, `space/12`, `space/16`, `control/padding-x/lg`; интервалы `space/2`, `space/4`, `space/12`.
- Текст: `text/primary`, `text/secondary`, `text/tertiary`, `text/disabled`, `text/danger` (Danger); типографика `type/label/*`, `type/body/md`, `type/heading/lg|xl` (Big value).
- Иконки: `icon/primary`, `icon/accent` (галочка), `icon/danger`, `icon/disabled`.
- Разделитель `border/subtle`; радиусы `radius/sm`, `radius/inner`; Card — `surface/raised`, `radius/control`.
- Слой состояния, кольцо, зоны — в служебных компонентах.
- Без переменной: `minHeight 40` (Option), `minWidth 120` у `content` (List); интервал подпись–описание у Option 2 px, у Menu и List 0 (вопрос 5 доски).

## 11. Platforms
Режимы Platform меняют шрифт и зону нажатия (`touch/is-fine` / `touch/is-coarse`); отличий в структуре нет.

## 12. Figma projection
- Страница `_List row`: база, три пилотные надстройки, доска.
- Экземпляр базы в надстройке раскрыт (`isExposedInstance`). Порядок осей базы: Type, Size, Content, State.
- У свойства замены `Selection control` одно значение по умолчанию на весь набор: менять главный компонент глифа в отдельном варианте базы нельзя — сменится во всех. Disabled-глиф задаёт надстройка вариантным свойством вложенного глифа (21 Disabled-вариант трёх пилотов).

## 13. Code projection
Нет (DSP, Vue, Flutter недоступны — `docs/dsp-check-2026-11-12.md`). Ожидается: общий внутренний компонент строки + публичные Menu item, List item.

## 14. Acceptance (2026-11-12)
- `audit.plugin.js` — 0.
- `variables-check.plugin.js` — 2: `minHeight 40` (Option ×4), `minWidth 120 @content` (вопрос 5).
- `audit-parity.plugin.js` — 2 совещательных: MINMAX `minHeight=40`; PROPS «Show description не привязано у 32 вариантов» (у List описанием управляет ось Content, вопрос 7). BASE, SERVICE, ICON, DESC, MATRIX, RING — 0. Пилот Menu item добавлен в проверку ICON (Danger).
- Размеры всех 84 вариантов надстроек совпали с действующими наборами (разница 0).
- Стенд: Light / Dark × EMCD / Geometria / WL Default × Web / iOS / Android / Mobile web × L0–L3; все булевы свойства, слот Trailing, Disabled с глифом, длинный текст, 6 языков — пройден и удалён.
- Не проверено: текст 200 %; паритет с кодом (кода нет).

## 15. Migration
Legacy: Dropdown item (DS Web), List с Left / Content / Right (DS Web), строки выбора App. Источник формы — действующие Menu item, Multiselect option, List item 2.0: размеры и отступы перенесены без изменений; служебные слои заменены экземплярами; выбор — глиф `_Checkbox control`; цвета иконок приведены к правилу (Danger, Disabled); галочка — `icon/accent`.
