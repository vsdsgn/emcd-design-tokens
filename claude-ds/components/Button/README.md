# Button

Кнопка запускает действие: отправить, сохранить, перейти к шагу.

**Оси (как в Figma «🟡 Button»):** Type — Primary · Secondary · Tertiary · Tertiary outline · Text · Inverted; Tone — Default · Danger (у Primary, Secondary, Text); Size — S 32 · M 40 · L 48 · XL 56; State — Default · Hover · Pressed · Loading · Disabled.

**Когда какой:** Primary — одно главное действие на экране. Secondary (тонированная подложка бренда) — важное, но не главное. Tertiary (нейтральная подложка) и Tertiary outline — второстепенные: отмена, фильтры, экспорт. Text — действие в строке или внутри текста. Inverted — на тёмных и цветных подложках. Tone · Danger — опасное подтверждённое действие (удалить, отключить), а не любая ошибка.

**Размер:** S — таблицы и плотные панели; M — Web по умолчанию; L — App по умолчанию; XL — главное действие экрана, онбординг.

**Поверхности:** Primary — на L0–L2; Secondary — только на L0–L1.

**Когда нет:** ссылка внутри абзаца — текстовая ссылка; переключение режима — Segmented или Toggle; только иконка — Icon button (обязателен Label).

**Правила:** подпись — глагол, 1–3 слова; ширина ≤ 280 px, дальше многоточие. Disabled — только если ясно, почему недоступно; иначе кнопка активна и объясняет ошибку после нажатия. Загрузка — отдельное состояние Loading (`aria-busy`), подпись сохраняется.

**Состояния:** Hover и Pressed — слой краски темы поверх заливки (`state-layer`, 6 % / 10 %): в светлой теме кнопка темнее, в тёмной светлее. Text — меняет цвет (`text-accent-hover` / `-pressed`) и подчёркивается.

**Доступность:** `<button>`; фокус — кольцо 4 px `border-focus-ring` с зазором 2 px; зона нажатия ≥ `touch-min` (Web 24, касание 44). Статус не только цветом.

**Движение и хаптики:** Hover и Pressed — 120 мс `motion-easing-standard`; нажатие — масштаб 0.96; касание — `haptic/press`; reduced motion — без анимаций и масштаба.

Классы: `emcd-btn emcd-btn--{primary|secondary|tertiary|outline|text|inverted} [emcd-btn--danger] [emcd-btn--{s|l|xl}]`. Старые `--error`, `--secondary-error`, `--text-error` оставлены как алиасы Tone · Danger.
