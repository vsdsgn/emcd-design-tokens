# Компоненты DS 2.0 — правила устройства

## Свойства или слоты

Компонент не должен становиться «монстром» с десятками свойств и скрытых слоёв. Правило:

- **Свойства (variant, boolean, text, instance swap)** — для того, что у компонента **всегда одинаково по смыслу**: размер, иерархия (primary / secondary / tertiary), состояние, тон (danger), наличие иконки.
- **Слоты** — для областей, где **содержимое меняется от места к месту**: туда кладут что угодно из системы, а компонент отвечает только за раскладку и отступы.

| Компонент | Слоты | Остаётся свойствами |
|---|---|---|
| Input / Select / Search | prefix (иконка, монета, валюта), suffix (единицы, «Max», кнопка), hint/helper | size, state, label, error |
| List item | leading (иконка, аватар, монета), content (одна-две строки), trailing (значение, статус, шеврон, переключатель) | size, interactive, divider |
| Card / Section | header actions, body, footer | padding, elevation |
| Side panel / Sheet / Modal | header actions, body, footer (кнопки) | presentation, size |
| Page header | actions (кнопки, период, фильтры) | title, counter, back |
| Shell | nav, promo, balance, profile | platform, collapsed |
| Empty state | illustration, actions | title, text |
| Table cell | custom content | align, numeric |

**Не слоты:** Button, Checkbox, Radio, Toggle, Chip, Badge — у них анатомия фиксированная, иконка меняется через instance swap.

### Правила слота

- У слота есть **содержимое по умолчанию** — чтобы компонент выглядел готовым без настройки.
- Отступы и выравнивание внутри слота задаёт **компонент токенами**, а не то, что в него положили.
- В слот кладут только компоненты системы (или текст) — не отвязанные куски.
- В коде слот = slot во Vue, параметр-виджет во Flutter, children/props в React. Имена слотов совпадают с Figma.

## Описание компонента (description)

```
<что это, 1 строка по-русски>
Когда использовать: … / Когда нет: …
Поиск: ru-синонимы, en-синонимы, то же в неправильной раскладке
Legacy: старые имена компонента
```
