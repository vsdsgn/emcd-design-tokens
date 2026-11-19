# Select compact

Компактный селектор без лейбла «на месте»: монета, сеть, валюта рядом с суммой или в шапке виджета («KAS ▾»). По нажатию — Menu, на Compact — Sheet.

**Ось (как в Figma «🟡 Select compact»):** State Default · Hover · Open · Disabled · Pressed; Text, Show leading, Leading (Coin / Coin stack). Высота 36, ширина по содержимому до 200 (`size/select-compact/max`), подложка `action/secondary/default`, поле 8, значение (монета 24 + label-md Medium, до 122) → зазор 16 → шеврон 16.

**Правила:** один в строке; лейбла и ошибки нет — в форме Select. `options` — список Menu (listbox); без `options` — только кнопка, свой список через `onOpenChange`.

**Доступность:** `button` с `aria-haspopup="listbox"` и `aria-expanded`; имя — «Монета: KAS» (`label` + значение). Enter / Space / ↓ — открыть, ↑ / ↓ — выбор, Enter — подтвердить, Esc — закрыть.

Классы: `emcd-select-compact [emcd-select-compact--open]`, `emcd-select-compact__trigger`, `__value`, `__leading`, `__text`, `__chevron`, `__menu`.
