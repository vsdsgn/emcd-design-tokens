# Input — контракт (2026-11-13)

Схема — `docs/component-contract.md`. Всё, что не названо здесь, — в `field-base.md`.

## 1. Identity
- Имя: Input. Level: molecule. Status: beta. Набор `Input` заменён на месте 2026-11-13: каждый вариант — раскрытый экземпляр `_Field base` (слой `Field`). `Input · пилот` (draft, страница `_Field base`) остаётся образцом сборки, в макетах не используется.

## 2. Intent
- Когда использовать: одна строка текста или числа.
- Когда нет: несколько строк — Textarea; выбор из списка — Select; сумма с валютой — Input amount; пароль — Password field.

## 3–6. Anatomy, States, Properties, Content
- Надстройка над `_Field base` с Lines=Single. Оси: Size (M, L, XL) × Label position (On border, Above) × State (9) = 54, матрица полная.
- Свойства (Label, Value, Helper, Counter, слоты, Focus ring, Show hit area, Safe margin) — у вложенного слоя `Field`.
- Оси Size, Label position, State менять на корне Input, не на слое `Field` (аудит: BASE).
- Значение — одна строка, обрезка «…».

## 7. Events
`update:modelValue`, `focus`, `blur`, `change`; controlled (v-model). Уточняется при сверке с Vue.

## 8. Behavior
Клавиатура — нативный `input`. Остальное — база.

## 9. Accessibility
Нативный `input` с `label`; `aria-invalid` при Error; `aria-describedby` — helper и ошибка; `readonly` / `disabled` — нативные атрибуты.

## 10–12. Tokens, Platforms, Figma
Как у базы; своих токенов нет.

## 13. Code projection
Vue `Input` (DSP) — сверка не сделана, код недоступен.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0; `variables-check.plugin.js` — 0 у набора (у `Input addon / Clear` — толщина глифа 1.5 числом); `audit-parity.plugin.js` — 0.
- Экземпляров в файле: 272, у всех первый слой — `Field`; «Show counter без Show helper» — 0.
- Стенд: Light / Dark × L0–L3 — на борде v3, действующий набор. Бренды × платформы, длинный текст, 6 языков, 200 % — сняты у пилота и базы (та же конструкция), у действующего набора отдельно не снимались.
- Не проверено: паритет с кодом (кода нет); вставка содержимого в слот руками в Figma (проверяет Стефан); борда v3 после замены просмотрена выборочно.

## 15. Migration
- Legacy: DS Web input.
- 2026-11-13, MAJOR для макетов: свойства Label, Value, Helper, Counter, Show …, слоты — теперь на слое `Field`, у корня остались только оси Size, Label position, State. Значения свойств в экземплярах внутри Components перенесены скриптом; в продуктовых файлах при обновлении библиотеки оверрайды свойств сбросятся — выставить заново на слое `Field`.
- Высота с подсказкой: +4 px (зазор подсказки базы `space/6` вместо 2): M 88 → 92.
- Skeleton скрывает слоты, подсказку и счётчик.
- Потребители в библиотеке: Password field (4), Select (24), Dropdown panel (2), Menu (2) — пересобраны на новом наборе.
- Потери при замене: содержимое слота Trailing у трёх архивных экземпляров (32:1250, 32:1496, 170:1691) не восстановлено; на бордах сброшены единичные оверрайды текста. Откат — точка в Version history от 13.11.
