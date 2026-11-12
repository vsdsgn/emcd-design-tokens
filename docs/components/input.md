# Input — контракт (2026-11-12, пилот)

Схема — `docs/component-contract.md`. Всё, что не названо здесь, — в `field-base.md`.

## 1. Identity
- Имя: Input. Level: molecule. Сейчас в Figma два набора: `Input` (beta, действует) и `Input · пилот` (draft, страница `_Field base`). После «ок» Стефана пилот заменит действующий набор.

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

## 14. Acceptance (2026-11-12)
Три аудита — 0 замечаний у набора `Input · пилот`. Стенд пройден вместе с базой. Статус draft до замены на месте и борды v3.

## 15. Migration
Legacy: DS Web input. Замена на месте: оверрайды свойств в макетах сбросятся (свойства переезжают на слой `Field`); потребители в библиотеке — Password field (4), Select (24), Dropdown panel (2), Menu (2).
