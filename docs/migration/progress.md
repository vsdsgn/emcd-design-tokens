# Перенос draft-компонентов: legacy 1:1 → Foundations DS 2.0

Цель (Стефан, 2026-10-07): все 🟠 draft — до 1:1 с legacy, затем на токены DS 2.0; у каждого борда (состояния, правила, темы, зоны).

## Метод (на каждый компонент)
1. `_compare · <Компонент>` на его странице (слева от борды): legacy-вариант и DS 2.0-вариант рядом в тёмной теме (legacy — тёмный-only) + сигнатура: размеры, отступы, gap, радиусы, кегль/интерлиньяж, цвета, позиции текста и иконок.
2. Правим DS 2.0-компонент **на месте**, пока сигнатура не совпадёт с legacy (инстансы и API для DSP сохраняются). Намеренные отличия — только системные решения DS 2.0: шкала без нечётных (lh 21 → 20, 150 % → 20/24), единый слой состояний 6/10 %, Disabled 8/40 %, Lucide-иконки в Base.
3. Токены по роли слоя (docs/color-migration.csv), размеры — `space/*`, `radius/*`, `size/*`.
4. Докрутка 2.0: состояния по модели, кольцо фокуса, зоны (hit web/app + safe, Show-свойства), min/max.
5. Борда: Варианты, Свойства и зоны, Поверхности L0–L3 (светлая + тёмная), В контексте, Правила.
6. Проверка: рендер сравнения + все варианты на борде.

## Статус

| Компонент | Legacy | 1:1 | Токены | 2.0 / зоны | Борда | Заметки |
|---|---|---|---|---|---|---|
| Checkbox / Radio / Toggle | baseCheckbox / baseRadio / baseToggle | ✓ | ✓ | ✓ | ✓ | Control Left/Right починен 2026-10-06 |
| Input | input | ✓ (пилот) | ✓ | ✓ | ✓ | |
| Select compact | Selector small | ✓ 2026-10-07 | ✓ | ✓ зоны заменены на стандартные | ✓ | value inset 2 (как legacy), шеврон Disabled → icon/disabled; 36 — вне шкалы контролов, как legacy |
| Menu / Menu item | Dropdown / Dropdown item | ✓ 2026-10-07 | ✓ | ✓ | ✓ | строка 44 + плашка ховера с отступом 4 (r8), обёртка pad 8, иконка 24, разделитель с отступом 16, **чекбокс справа** (как legacy); иконки в legacy — акцентные (вопрос) |
| Multiselect option | Dropdown item | — | — | — | — | ⛔ deprecated → Menu item (Checkbox = true); 5 инстансов заменены, мастер в Archive |
| Select, Multiselect | input + Dropdown | | | | | далее |
| Chip | baseChip / base, vertical | | | | | далее |
| Tabs | base tabbar, tab item | | | | | |
| Segmented | base segmented picker | | | | | |
| Badge (+Counter, Status) | base badge * | | | | | |
| Toast | base notification | | | | | |
| Alert / Banner | baseCard / banner, base Banner --2.0 | | | | | |
| Modal | base modal header / footer | | | | | |
| Empty state | empty state | | | | | |
| List item | List | | | | | |
| Accordion | baseAccordion | | | | | |
| Slider | base slider | | | | | |
| Avatar | base avatar | | | | | |
| Stepper | Step Symbol / Trail / Text | | | | | |
| Progress circle | baseCircleLoader | | | | | |
| Table | .table | | | | | |
| Legend item | .legends | | | | | |
| Sidebar / Nav item | sidebar, Sidebar item | | | | | |
| Sheet, Divider, Tab bar, Top bar | DS App | | | | | |
