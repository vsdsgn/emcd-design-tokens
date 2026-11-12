# Checkbox

Множественный выбор, согласие с условиями, выбор строк таблицы.

**Оси (как в Figma «🟡 Checkbox»):** Status — Off · On · Indeterminate; Tone — Default · Danger; Size — M · S; Control — Left (по умолчанию) · Right; State — Default · Hover · Pressed · Disabled. Свойства: Label, Description.

**Когда какой:** Indeterminate — только у «выбрать все» и родителя группы. Tone · Danger — ошибка проверки (обязательное согласие не отмечено), рядом текст ошибки. Size M — подпись 16/24 (формы, настройки); S — 14/20 (таблицы, плотные списки); коробочка 20 в обоих. Control · Left — списки и формы; Right — строки настроек с подписью на всю ширину; в одной группе — одинаково.

**Когда нет:** мгновенное включение настройки — Toggle; один из нескольких — Radio.

**Правила:** без отрицательных формулировок («Не присылать»); чекбокс не запускает действие сразу. Подпись переносится, коробочка остаётся у первой строки; ширина строки ≤ 480 px.

**Состояния:** Hover и Pressed — слой `state-layer` 6 % / 10 % на коробочке, Pressed — масштаб 0.96 за 120 мс. Disabled — `control-surface-disabled`, тексты `text-disabled`.

**Доступность:** нативный `<input type="checkbox">` внутри `<label>` — зона нажатия вся строка; фокус — кольцо 2 px `border-focus-ring` с зазором 2 px на коробочке; ошибка — `aria-invalid` и `aria-describedby` на текст ошибки. Хаптик `selection` (App).

Классы: `emcd-check [emcd-check--s] [emcd-check--right] [emcd-check--danger]`; внутри — `input`, `emcd-check__text` (подпись и `emcd-check__desc`). Indeterminate — свойство `indeterminate` у `input`.
