# Icon button

Квадратная кнопка с одной иконкой — для частых и понятных без подписи действий.

**Статус: 🟡 beta** — дизайн готов — в макеты и разработку; правки ещё возможны.

**Оси (как в Figma «🟡 Icon button»):** Type — Primary · Secondary · Tertiary · Tertiary outline · Ghost · Text · Inverted; Tone — Default · Danger (у Primary, Secondary, Text); Size — S 32 · M 40 · L 48 · XL 56 (квадрат); State — Default · Hover · Pressed · Loading · Disabled.

**Когда:** действие узнаётся по иконке (закрыть, копировать, ещё, фильтры, обновить) и места мало — тулбары, строки таблиц, шапки, поля. Ghost — самый частый тип: нейтральная кнопка без подложки (подложка появляется на Hover / Pressed), для плотных панелей и строк.

**Когда нет:** действие не очевидно по иконке или оно главное на экране — Button с подписью; переключение режима — Segmented или Toggle.

**Label обязателен:** это `aria-label` и подпись в тултипе на Web (тултип показывается по наведению и фокусу; в приложении тултипа нет). Подпись — глагол: «Скопировать адрес», не «Копия».

**Правила:** одна иконка, без текста; иконка 16 (S) / 20 (M) / 24 (L, XL); Loading — значение оси State (у Button это свойство; сведём к одному способу при замене набора), спиннер вместо иконки, `aria-busy`. Disabled — только если ясно, почему недоступно.

**Состояния, фокус, движение:** как у Button — слой `state-layer` 6 % / 10 %, нейтральное кольцо 2 px с зазором 2 px, нажатие 0.96 за 120 мс, зона нажатия ≥ `touch-min` (Web 24, касание 44), `haptic/press` на касании.

Классы: `emcd-btn emcd-icon-btn emcd-btn--{primary|secondary|tertiary|outline|ghost|text|inverted} [emcd-btn--danger] [emcd-btn--{s|l|xl}]` + `aria-label` (+ `data-tooltip` на Web).
