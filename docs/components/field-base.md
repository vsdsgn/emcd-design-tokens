# _Field base — контракт (2026-11-12)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, размеры) — ссылками, не повтором.

## 1. Identity
- Имя: `_Field base`. Status: beta. Level: base (служебный, имя с «_», не публикуется).
- Figma: Components, страница `_Field base`. Платформы: Web, Mobile web, iOS, Android.
- Решение: Стефан 2026-11-12, «вариант 2» — общая база + надстройки с вложенным раскрытым экземпляром.

## 2. Intent
- Одна конструкция поля ввода для всей семьи: Input, Textarea, Select, Multiselect, Password field, Date range field, Input amount, Code input.
- В макетах напрямую не используется: брать надстройку.
- Надстройка = вложенный раскрытый экземпляр базы (`isExposedInstance`); своих слоёв рамки, кольца, зон у неё нет; оси надстройки повторяют оси базы.

## 3. Anatomy
Корень (вертикально, `space/6`) →
- `label` — подпись над полем (Label position=Above);
- `field` — рамка: слоты `Leading`, `Inline`, `Trailing`; `text` (`caret` + `value`); `notch label` (`border gap` + `notch text`, Label position=On border); `state layer` (Hover); `focus ring`; `hit area · web`, `hit area · app`;
- `helper row` — `helper` + `counter`; видна только при Show helper (пустая строка место не занимает). Счётчик без подсказки — Show helper + пустой Helper;
- `safe area · outer` — safe margin.
- Служебные слои `focus ring`, `state layer`, `hit area · overlay`, `safe area · outer` — экземпляры `_Focus ring`, `_State layer`, `_Hit area`, `_Safe margin` (см. `service-layers.md`).

## 4. States
Модель состояний — `docs/components.md`. Ось State: Default (плейсхолдер), Hover, Focus, Filled, Error, Disabled, Read-only, Loading, Skeleton.
- Hover — слой `state/layer`, opacity `state/hover`, радиус = радиус `field`.
- Focus — рамка `control/border/focus`; с клавиатуры — кольцо (свойство Focus ring).
- Error — рамка `control/border/error`, helper `text/danger`.
- Disabled — фон `control/surface/disabled`, все тексты `text/disabled`. Read-only — тот же фон, рамка `border/subtle`, значение `text/primary`.
- Loading — `spinner` в конце поля. Skeleton — фон `skeleton/base`; слоты, подсказка и счётчик скрыты жёстко (свойства Show … не действуют).

## 5. Properties
| Свойство | Тип | Значения / по умолчанию |
|---|---|---|
| Size | variant | M · L · XL (40 / 48 / 56, `control/height/*`) |
| Label position | variant | On border · Above |
| Lines | variant | Single · Multi |
| State | variant | 9 состояний, см. раздел 4 |
| Label / Show label | text / boolean | «Сумма» / true |
| Value | text | «0.00» |
| Helper / Show helper | text / boolean | false |
| Counter / Show counter | text / boolean | false |
| Show leading / inline / trailing | boolean | false |
| Leading / Inline / Trailing | slot | — |
| Focus ring | boolean | false |
| Show hit area | boolean | false |
| Safe margin | boolean | false |

Матрица: 3 × 2 × 2 × 9 = 108, полная.

## 6. Content / slots
- Lines=Single: значение в одну строку, не помещается — обрезка «…».
- Lines=Multi: min-высота 96 (3 строки), растёт до 8 строк, дальше прокрутка (в макете обрезка «…»); первая строка стоит там же, где в Single.
- Подпись On border — короткая (1–3 слова, не шире поля). Длинная подпись — только Above, переносится.
- Helper переносится. Counter не переносится, прижат к концу строки.
- Ширина: min `size/field/min` (160); по умолчанию поле тянется по контейнеру.
- Слоты: `Leading` (иконка), `Inline` (суффикс, единица), `Trailing` (кнопки-иконки, спиннер). Зазоры `space/6`, `space/6`, `space/8`.
- Языки (de, ar, hi, th, ja, kk) проверены: высота поля не меняется, строки не режутся по вертикали.

## 7. Events
У базы событий нет; события — у надстроек.

## 8. Behavior
- Движение — по `docs/motion.md` (смена рамки и слоя состояния); своих значений у базы нет.
- Текст 200 %: в коде высота поля — `min-height` из токена, не `height`; подпись On border при увеличенном шрифте переходит в Above (вопрос 4 на доске пилота, до ответа — рекомендация).
- RTL: слоты и выравнивание зеркалятся в коде (logical properties); в Figma не рисуется.

## 9. Accessibility
- Кольцо фокуса: рамка +2 px, OUTSIDE, `border/width/focus-ring`, `radius/focus-ring-sm` (M) / `radius/focus-ring` (L, XL), цвет `border/focus-ring`.
- Hit area: `hit area · web` (`touch/is-fine`), `hit area · app` (`touch/is-coarse`). Safe margin — `control/safe-margin`.
- Контраст — `docs/a11y-contrast-standard.md`; плейсхолдер и Disabled — уровень Lc 30.

## 10. Tokens
- Рамка: фон `control/surface/default | disabled`, `skeleton/base`; обводка `control/border/default | focus | error | disabled`, `border/subtle`; толщина `border/width/default`; радиус `radius/control-sm` (M), `radius/control` (L, XL).
- Высота `control/height/md | lg | xl`; отступы `control/padding-x/md | lg`, `space/10 | 12 | 16`; зазор `space/12`.
- Текст: значение `text/tertiary` (плейсхолдер) → `text/primary`; подпись `text/secondary`; helper и counter `text/tertiary`; ошибка `text/danger`; Disabled `text/disabled`. Стили Label/MD, Label/LG, Label/SM.
- Каретка `border/focus`. Иконки `icon/size/md`, спиннер `icon/size/sm`.
- Без переменной: `minHeight 96` у `field` при Lines=Multi (вопрос 3 на доске пилота: токен `size/field/multi-min`).

## 11. Platforms
Режимы Platform меняют высоты, отступы и видимость зон; отличий в структуре нет.

## 12. Figma projection
Набор `_Field base`, порядок осей: Size, Label position, Lines, State. Экземпляр в надстройке называется `Field` и раскрыт. Надстройки: `Input` и `Textarea` (действующие, заменены 2026-11-13), `Input · пилот`, `Textarea · пилот` (образцы).
- Содержимое слотов по умолчанию: Leading — `icon/search`, Inline и Trailing — `Input addon / Unit`. Скриптом содержимое слота вложенного экземпляра меняется через `slot.children[0].swapComponent(…)`.

## 13. Code projection
Нет (DSP, Vue, Flutter недоступны — `docs/dsp-check-2026-11-12.md`). Ожидается внутренний компонент `FieldBase`, не экспортируется.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0; `audit-parity.plugin.js` — 0; `variables-check.plugin.js` — 1 (`minHeight 96 @field`, вопрос 3).
- Стенд: Light / Dark × EMCD / Geometria / WL × Web / iOS / Android × L0–L3 — пройден; все свойства переключены; длинный текст, 6 языков, 200 % — пройдены с замечаниями (разделы 6, 8).
- 13.11 после правок (видимость `helper row`, Skeleton) — три аудита повторены: `audit` 0, `audit-parity` 0, `variables-check` 1 (тот же `minHeight 96`).
- Не проверено: паритет с кодом (кода нет).

## 15. Migration
Legacy: DS Web input / textarea. Источник конструкции — Input 2.0 (до пилота). Найдено и исправлено при пересадке: перенос значения в Single, выход Textarea за рамку, зазоры слотов числом, радиус слоя Hover.
