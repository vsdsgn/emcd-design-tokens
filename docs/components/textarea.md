# Textarea — контракт (2026-11-12, пилот)

Схема — `docs/component-contract.md`. Всё, что не названо здесь, — в `field-base.md`.

## 1. Identity
- Имя: Textarea. Level: molecule. В Figma два набора: `Textarea` (beta, действует) и `Textarea · пилот` (draft, страница `_Field base`). После «ок» Стефана пилот заменит действующий набор.

## 2. Intent
- Когда использовать: текст длиннее одной строки (комментарий, обращение).
- Когда нет: одна строка — Input.

## 3–6. Anatomy, States, Properties, Content
- Надстройка над `_Field base` с Lines=Multi. Оси: Size (M, L, XL) × State (9) = 27.
- Матрица: только Label position=Above — подпись в разрыве рамки у многострочного поля не используется.
- Свойства — у вложенного слоя `Field`.
- Высота от 96 (3 строки), растёт до 8 строк, дальше прокрутка. Counter — лимит символов.

## 7. Events
`update:modelValue`, `focus`, `blur`, `change`. Уточняется при сверке с Vue.

## 8. Behavior
Авторост по содержимому до 8 строк; ручного изменения размера нет.

## 9. Accessibility
`textarea` с `label`; лимит — `aria-describedby` на счётчик; Error — `aria-invalid`.

## 10–12. Tokens, Platforms, Figma
Как у базы.

## 13. Code projection
Vue `Textarea` (DSP) — сверка не сделана, код недоступен.

## 14. Acceptance (2026-11-12)
Три аудита — 0 замечаний у набора `Textarea · пилот`. Стенд пройден вместе с базой. Статус draft до замены на месте и борды v3.

## 15. Migration
Legacy: DS Web textarea.
