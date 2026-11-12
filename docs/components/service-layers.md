# Служебные слои: `_Focus ring`, `_State layer`, `_Hit area`, `_Safe margin`

Status: beta · Level: base (служебные, не публикуются — имя с «_»). Figma: Components, страница `_Service layers`. С 2026-11-12.

Одна задача — один способ: кольцо фокуса, слой Hover / Pressed, подсветка зоны нажатия и безопасного поля существуют в одном экземпляре на систему. Компонент не рисует их сам, а ставит экземпляр. Правка вида (толщина, цвет, прозрачность) делается в одном месте.

## Состав

| Компонент | Что это | Токены | Имя слоя в компоненте | Видимость |
|---|---|---|---|---|
| `_Focus ring` | кольцо фокуса с клавиатуры | обводка OUTSIDE `border/focus-ring`, толщина `border/width/focus-ring`, радиус `radius/focus-ring*` | `focus ring` | свойство `Focus ring` |
| `_State layer` (State=Hover / Pressed) | слой состояния | заливка `state/layer`, прозрачность `state/hover` / `state/pressed` | `state layer` | только в вариантах State=Hover и State=Pressed |
| `_Hit area` | подсветка зоны нажатия | заливка `status/danger/solid`, 20 % | `hit area · overlay` | свойство `Show hit area` |
| `_Safe margin` | подсветка безопасного поля | обводка OUTSIDE `status/success/solid`, толщина `control/safe-margin`, 20 % | `safe area · outer` | свойство `Safe margin` |

## Как ставить

- `focus ring`: внутри интерактивного слоя, абсолютно, x = −2, y = −2, размер цели + 4 (`focus/offset`), constraints Stretch. Радиус экземпляра — `radius/focus-ring*` под радиус цели (таблица в `docs/preflight.md`, правило 10). Исключения — `docs/exceptions.md` (строка таблицы, Checkbox).
- `state layer`: абсолютно, во весь интерактивный слой, Stretch. Радиус экземпляра = радиус-токен этого слоя (проверка STATE). Своего цвета Hover / Pressed у компонента нет.
- `hit area · overlay`: внутри слоя зоны `hit area · web` (видимость ← `touch/is-fine`) или `hit area · app` (← `touch/is-coarse`), Stretch. Размер зоны задаёт слой зоны, не этот компонент.
- `safe area · outer`: на корне варианта, абсолютно, Stretch.
- Имена слоёв не менять: по ним работают аудиты и манифест.

## Что переопределяется на экземпляре

Только размер, положение, радиус (кольцо, слой состояния) и видимость. Цвет, толщину, прозрачность не переопределять.

## Код

В коде отдельных компонентов нет: кольцо — `outline` (`--border-width-focus-ring`, `--border-focus-ring`, `outline-offset: var(--focus-offset)`), слой состояния — псевдоэлемент с `--state-layer` и `--state-hover` / `--state-pressed`. Подсветки зон и поля — только инструмент Figma.

## Проверки

- `audit-parity.plugin.js`: SERVICE (в наборах из `SERVICE_DONE` служебный слой обязан быть экземпляром своего компонента), RING, STATE — экземпляры служебных слоёв проверяются, внутрь не заходим.
- `audit.plugin.js`: привязки кольца и прозрачность слоя состояния — тоже по экземплярам.
- 2026-11-12, страницы `_Service layers` и `_Field base`: `audit` 0, `audit-parity` 0, `variables-check` — только `minHeight 96` (вопрос 3 доски пилота).

## Где применено

- `_Field base` (108 вариантов): 108 колец, 12 слоёв Hover, 216 подсветок зоны, 108 полей. `Input · пилот` и `Textarea · пилот` получают их через вложенную базу.
- Остальные компоненты — при миграции в фазе C; после пересадки имя набора добавить в `SERVICE_DONE`.

## Открыто

- Прозрачность 20 % у подсветок и 56 % у цвета кольца — числом. Теперь в одном месте каждая; токен — если Стефан решит (парковка `OPEN-QUESTIONS`).
- Отдельные компоненты (не наборы) `audit-parity` не обходит: `_Focus ring`, `_Hit area`, `_Safe margin` проверяются `audit` и `variables-check`.
