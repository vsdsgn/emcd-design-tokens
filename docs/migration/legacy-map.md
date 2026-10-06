# Карта переноса компонентов: legacy → DS 2.0

**Правило (Стефан, повторено 2026-10-06):** базой всегда берём legacy-компонент → переводим на токены DS 2.0 → докручиваем (оси, состояния, кольцо, зоны, правила, борда). Только если компонента нет / не хватает в legacy — берём из 2.0. «2.0 уже похож на legacy» — не причина пропускать шаг.

## Сделано из legacy
| DS 2.0 | Legacy (DS Web) |
|---|---|
| Button | baseButton |
| Icon button | из новой Button (в legacy нет) |
| Checkbox | baseCheckbox with text |
| Radio | baseRadio with text |
| Toggle | baseToggle with text |
| Tooltip | base tooltip / neutral, / color --1.5 |

## К пересборке из legacy (DS Web, есть в библиотеке)
| DS 2.0 | Legacy | key |
|---|---|---|
| Input | input (поле + с подписью), 64 + 64 | 9460ea2e…, d7881e07… |
| Select compact | Selector small | fa064767… |
| Select / Menu / Multiselect | Dropdown, Dropdown item | c3a30379…, 76152618… |
| Chip | baseChip / base --1.5, / vertical --1.5 | 227fea9f…, 7705e7c5… |
| Tabs / Tab | base tabbar --1.5, base tab item, tab item | 13191cc0…, 25ced4da…, 89a831cf… |
| Segmented / Segment | base segmented picker group / item (text, icon only) | 39328db8…, 3a60eed2…, 6222bc97… |
| Badge | base badge / neutral · brand · danger · success · warning --1.5 | 77aa3a02… … |
| Toast | base notification | 861e53dd… |
| Alert | baseCard / banner | 84f1002e… |
| Banner | base Banner --2.0 | 9a98adff… |
| Modal | base modal header / title · coin · empty, footer / single · two buttons · empty | c2471865… … |
| Empty state | empty state | 2b66d9d9… |
| List item | List | 13890e79… |
| Accordion | baseAccordion --1.5 | 3011d9c2… |
| Slider | base slider | ed48d555… |
| Avatar / group | base avatar / single, / group line | 1df3a0b8…, bfff1989… |
| Stepper | Step Symbol, Step Trail, Step Text - Horizontal | 5a2d395e…, 774203b4…, 3ac92896… |
| Progress circle | baseCircleLoader | 353cbe78… |
| Table | .table / layout, / raw, / column title | ae1e2e05…, aff53d1f…, 5ee28626… |
| Legend item | .legends | 2d72e69e… |
| Chart card | bar widget | 773c278b… |
| Sidebar / Nav item | sidebar / default, Sidebar item | 640e93c4…, d8ad8748… |
| Sheet, Divider, Tab bar, Top bar | DS App (bottom sheet menu, divider text, нижняя навигация, шапка) | — |

## Нет в legacy → берём из 2.0 (докручиваем по правилам)
Textarea, Password field, File upload, Calendar / Date cell, Code input (есть только на экранах Web App), Input amount (widget на экране), Stat card, Progress (линейный), Pagination, Page indicator, Step progress, Scrollbar, Breadcrumbs, Skip link, Site header / footer, Floating button, Notification, Status screen, Status, Skeleton, Spinner, Counter, Amount, Address, Transaction, Payout summary, Chip map, Chart plot (песочница / Firmware).

## Порядок
По числу использований и связям: Input → Select / Menu / Multiselect → Chip → Tabs → Segmented → Badge → List item → Modal → Toast / Alert / Banner → остальные.
