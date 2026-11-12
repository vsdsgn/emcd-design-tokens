# _Selection control — контракт (2026-11-12)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, размеры) — ссылками, не повтором.
Покрывает базу `_Selection control`, глифы `_Checkbox control`, `_Radio control`, `_Toggle control` и надстройки `Checkbox · пилот`, `Radio · пилот`, `Toggle · пилот`.

## 1. Identity
- База: `_Selection control`. Status: beta. Level: base (служебный, имя с «_», не публикуется).
- Глифы: `_Checkbox control`, `_Radio control`, `_Toggle control`. Status: beta. Level: base.
- Надстройки: `Checkbox · пилот`, `Radio · пилот`, `Toggle · пилот`. Status: draft · пилот. Level: atom. Действующие Checkbox, Radio, Toggle (beta) не тронуты до ответа на вопрос 1 доски.
- Figma: Components, страница `_Selection control`, доска «⚑ Пилот _Selection control». Платформы: Web, Mobile web, iOS, Android.
- Решение: Стефан 2026-11-12, «вариант 2» — общая база + надстройки с вложенным раскрытым экземпляром.

## 2. Intent
- Одна строка выбора для Checkbox, Radio, Toggle: контрол + подпись + описание + зона нажатия + защитное поле.
- Глиф — фигура контрола без подписи. Его же ставят строки списков (Menu item, Multiselect option, таблицы) — шаг `_List row`.
- База и глифы в макеты напрямую не ставятся: брать Checkbox, Radio, Toggle.
- Когда какой контрол — в описаниях надстроек (Checkbox — несколько независимых; Radio — один из 2–5; Toggle — применяется сразу).

## 3. Anatomy
Надстройка (корень, HUG, max `size/field/max`) → экземпляр `_Selection control` (раскрыт) →
- `control` — рамка со слотом `Control` (instance swap, раскрыт): глиф;
- `label` — подпись; `description` — вторая строка;
- `hit area · overlay` — экземпляр `_Hit area`; `safe area · outer` — экземпляр `_Safe margin`.

Глиф → фигура (`box` / `circle` / `track` + `thumb`), `state layer` — экземпляр `_State layer`, `focus ring` — экземпляр `_Focus ring` (см. `service-layers.md`).

## 4. States
Модель состояний — `docs/components.md`.
- База: State = Default · Disabled (подпись и описание `text/disabled`).
- Глиф: State = Default · Hover · Pressed · Disabled. Hover / Pressed — слой `state/layer`, opacity `state/hover` / `state/pressed`, на фигуре контрола.
- Фокус с клавиатуры — свойство Focus ring глифа (кольцо вокруг фигуры, не вокруг строки).
- Ошибка — Tone = Danger у Checkbox и Radio; текст ошибки — под группой, не в компоненте.
- Loading и Skeleton у контролов выбора нет.

## 5. Properties
База `_Selection control`:

| Свойство | Тип | Значения / по умолчанию |
|---|---|---|
| Type | variant | Box (Checkbox, Radio) · Toggle |
| Size | variant | M · S (подпись 16/24 · 14/20) |
| Control position | variant | Start · End |
| State | variant | Default · Disabled |
| Label / Show label | text / boolean | true |
| Description / Show description | text / boolean | false |
| Control | instance swap | глиф |
| Show hit area | boolean | false |
| Safe margin | boolean | false |

Матрица: 2 × 2 × 2 × 2 = 16, полная.

Глифы:

| Набор | Оси | Вариантов |
|---|---|---|
| `_Checkbox control` | Status (Off, On, Indeterminate) × Tone (Default, Danger) × State (4) | 24 |
| `_Radio control` | Status (Off, On) × Tone (Default, Danger) × State (4) | 16 |
| `_Toggle control` | Status (Off, On) × Size (M, S) × State (4) | 16 |

У каждого глифа булево свойство Focus ring (false).

Надстройки (оси как у действующих наборов; State — последняя):

| Набор | Оси | Вариантов |
|---|---|---|
| `Checkbox · пилот` | Status × Tone × Size × Control position × State (4) | 96 |
| `Radio · пилот` | Status × Tone × Size × Control position × State (4) | 64 |
| `Toggle · пилот` | Status × Size × Control position × State (4) | 32 |

- Оси надстройки менять на корне, не во вложенных слоях. Hover и Pressed надстройки — база в Default, глиф в Hover / Pressed.
- Свойства базы (Label, Description, зоны) доступны через раскрытый экземпляр базы, Focus ring — через раскрытый слот Control.
- Изменение против действующих: ось `Control = Left | Right` → `Control position = Start | End` (вопрос 2 доски).

## 6. Content / slots
- Подпись обязательна, переносится; контрол остаётся у первой строки. Описание — вторая строка, переносится.
- Ширина: по содержимому, max `size/field/max` (480). У подписи остался свой предел 436 числом (вопрос 3 доски).
- По умолчанию: Checkbox и Radio — Control position = Start, Toggle — End. В одной группе — одинаково.
- Языки (de, ar, hi, th, ja, kk) проверены: строки не режутся, контрол не смещается.

## 7. Events
У базы и глифов событий нет. Надстройки: `change` (Checkbox: checked / indeterminate; Radio: value в группе; Toggle: checked).

## 8. Behavior
- Кликается вся строка. Pressed — масштаб фигуры 0.96, 120 мс; Toggle — ползунок едет 200 мс (`docs/motion.md`).
- RTL: Start / End зеркалятся в коде (logical properties); в Figma не рисуется (`docs/rtl.md`).
- Текст 200 %: строка растёт по тексту; стендом не снималось.

## 9. Accessibility
- Кольцо фокуса: рамка +2 px вокруг фигуры, OUTSIDE, `border/width/focus-ring`, `radius/focus-ring*`, `border/focus-ring`.
- Зона нажатия — вся строка, по высоте ≥ `touch/min`. Защитное поле — `control/safe-margin`.
- Роли: `checkbox` (`aria-checked` true / false / mixed), `radio` внутри `radiogroup`, `switch`. Подробно — в описаниях надстроек.
- Контраст — `docs/a11y-contrast-standard.md`.

## 10. Tokens
- Размер фигуры: `size/box` (Checkbox, Radio), `size/toggle-*` (дорожка и ползунок Toggle).
- Слой состояния: `state/layer`, `state/hover`, `state/pressed`. Кольцо: `border/width/focus-ring`, `radius/focus-ring*`, `border/focus-ring`.
- Текст: подпись `text/primary`, описание `text/secondary`, Disabled `text/disabled`.
- Предел ширины: `size/field/max`.
- Без переменной: `maxWidth 436` у `label` в базе (вопрос 3 доски).

## 11. Platforms
Режимы Platform меняют шрифт и высоту зоны нажатия; отличий в структуре нет.

## 12. Figma projection
- Страница `_Selection control`: три глифа, база, три пилотные надстройки, доска.
- Экземпляр базы в надстройке раскрыт (`isExposedInstance`), слот `Control` в базе раскрыт.
- Порядок осей: Status, Tone, Size, Control position, State.

## 13. Code projection
Нет (DSP, Vue, Flutter недоступны — `docs/dsp-check-2026-11-12.md`). Ожидается: общий внутренний компонент строки выбора + три публичных компонента.

## 14. Acceptance (2026-11-12)
- `audit.plugin.js` — 0.
- `variables-check.plugin.js` — 1: `maxWidth 436 @label` (вопрос 3).
- `audit-parity.plugin.js` — 4 совещательных: AXES «Status булева (Off / On)» у Radio и Toggle и их глифов (вопрос 4). BASE, SERVICE, MINMAX, DESC, RING — 0.
- Размеры всех 192 вариантов надстроек совпали с действующими наборами (разница 0).
- Стенд: Light / Dark × EMCD / Geometria / WL Default × Web / iOS / Android / Mobile web × L0–L3; Focus ring, Show hit area, Safe margin, описание, Control position End, Disabled, длинный текст, 6 языков — пройден и удалён.
- Не проверено: текст 200 %; паритет с кодом (кода нет).

## 15. Migration
Legacy: baseCheckbox, baseRadio, baseToggle (DS Web). Источник фигур — действующие Checkbox, Radio, Toggle 2.0: фигура перенесена в глиф без изменений, служебные слои заменены экземплярами, предел ширины корня привязан к токену, ось положения переименована.
