# Floating button

Плавающая кнопка главного действия экрана на Compact (App, мобильный веб): «Добавить воркер», «Пополнить»; вспомогательная поверх списка или дашборда — «Выгрузить», «Калькулятор».

**Оси (как в Figma «🟡 Floating button»):** Layout Icon · Extended × Size L · M × Type Primary · Secondary × Loading × State. Size и Type (19.11) — только у Extended: Icon всегда круг 56 Primary. Extended L — 56, поля 20, зазор 8, подпись `label-md`; M — 40, поля 16, зазор 6. Капсула `radius-chip`, тень Elevation/3; иконка 20.

**Когда какой:** L Primary — главное действие экрана-списка; M — вспомогательное поверх списка или дашборда (как в App). Secondary (`action-secondary-default`, подпись `text-primary`, иконка `icon-primary`) — нейтральное («Выгрузить»). Icon — только с однозначной иконкой.

**Когда нет:** Web — Button в шапке страницы; больше одного действия; форма — кнопка внизу формы.

**Правила:** одна на экран; справа снизу (в RTL — слева) над Tab bar и safe area, отступ `space-md` — позиционирует продукт; у контента отступ снизу, чтобы кнопка не перекрывала последний элемент. Подпись — глагол до 20 знаков, одна строка (многоточие по 200). При прокрутке вниз Extended сворачивается в Icon (продукт меняет `layout`).

**Состояния:** Hover / Pressed — слой `state-layer-inverse` (Secondary — `state-layer`) 6 % / 10 %; Disabled — `action-disabled`, `text-disabled`, без тени; Loading — Spinner L вместо иконки, нажатие блокируется.

**Доступность:** `<button>`; у Icon `label` → `aria-label`; Loading — `aria-busy`. Зона касания ≥ 44.

Классы: `emcd-fab [emcd-fab--extended] [emcd-fab--m] [emcd-fab--secondary] [emcd-fab--loading]`; внутри `emcd-fab__icon`, `emcd-fab__label`.
