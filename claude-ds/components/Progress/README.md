# Progress

Линейный прогресс: доля выполненного, когда длительность или объём известны (лимит вывода, заполненность, шаг загрузки файла, срок до выплаты).

**Оси (как в Figma «🟡 Progress»):** Size S · M × Tone Accent · Success · Warning · Danger × Mode Determinate · Indeterminate (10 вариантов: Indeterminate — только Accent); свойства Label, Value, Show label.

**Когда какой:** S (дорожка 4) — внутри строк и карточек; M (дорожка 8) — отдельный блок. Accent — нейтральный прогресс; Success — цель достигнута; Warning — близко к лимиту (≥ 80 %); Danger — лимит превышен. Show label — подпись слева и значение справа над дорожкой; Off — когда они уже есть у родителя. Indeterminate — доля неизвестна: отрезок 40 % бежит по дорожке, значения нет.

**Когда нет:** неизвестная длительность в кнопке или небольшом блоке — Spinner; загрузка контента — Skeleton; шаги мастера — Stepper; мало места или прогресс — главное на карточке — Progress circle.

**Правила:** ширина заполнения = доля (`percent` 0–100); значение — моно (`6 000 / 10 000 USDT`).

**Состояния:** нет; смысл несёт Tone, доля — ширина.

**Доступность:** `role="progressbar"` с `aria-valuenow` / `aria-valuetext`; Indeterminate — без значения. Тон дублируется значением.

Классы: `emcd-progress [emcd-progress--m] [emcd-progress--{success|warning|danger}] [emcd-progress--indeterminate]`; внутри `emcd-progress__row` (`emcd-progress__label`, `emcd-progress__value`), `emcd-progress__track` → `emcd-progress__fill`.
