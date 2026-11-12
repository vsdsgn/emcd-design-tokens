# _Overlay surface — контракт (2026-11-12)

Схема разделов — `docs/component-contract.md`. Системные правила (уровни, тени, материал, фокус) — ссылками, не повтором.
Покрывает базу `_Overlay surface` и надстройки `Tooltip · пилот`, `Menu · пилот`, `Dropdown panel · пилот`, `Toast · пилот`, `Modal · пилот`, `Sheet · пилот`.

## 1. Identity
- База: `_Overlay surface`. Status: beta. Level: base (служебный, имя с «_», не публикуется).
- Надстройки: `Tooltip · пилот` (atom), `Menu · пилот`, `Dropdown panel · пилот`, `Toast · пилот`, `Modal · пилот`, `Sheet · пилот`. Status: draft · пилот. Действующие Tooltip, Menu, Dropdown panel, Toast, Modal, Sheet не тронуты до ответа на вопрос 1 доски.
- Figma: Components, страница `_Overlay surface`, доска «⚑ Пилот _Overlay surface». Платформы: Web, Mobile web, iOS, Android.
- Решение: Стефан 2026-11-12, «вариант 2» — общая база + надстройки с вложенным экземпляром.

## 2. Intent
- Одна плавающая поверхность для всего, что лежит поверх интерфейса: фон, радиус, тень, материал.
- База в макеты напрямую не ставится: брать Tooltip, Menu, Dropdown panel, Toast, Modal, Sheet.
- Что база не решает: обводку, отступы, ширину, содержимое, позиционирование и подложку (`surface/overlay`) — это надстройка и код.

## 3. Anatomy
Надстройка (корень: обводка, радиус, отступы, ширина; без заливки и тени, clip выключен) →
- `overlay surface` — первый слой, экземпляр `_Overlay surface`, absolute, во весь корень (constraints STRETCH), позади содержимого. Не раскрыт;
- содержимое надстройки (текст, слоты, секции).

Обводка остаётся на корне: INSIDE, входит в размер варианта.

## 4. States
У поверхности состояний нет. Состояния — у вложенных контролов (Menu item, Button, Tab и т. д.). Появление и скрытие — движение, раздел 8.

## 5. Properties
База `_Overlay surface` — одна ось Kind (образец 240 × 120, слой тянется):

| Kind | Заливка | Радиус | Тень | Кто берёт |
|---|---|---|---|---|
| Tooltip | `surface/raised` | `radius/container` | стиль `Elevation/2 · S` | Tooltip |
| Popover | `material/thick/fill` + блюр `material/thick/blur` | `radius/control` | значения `Elevation/2` | Menu, Dropdown panel |
| Toast | `surface/raised` | `radius/control` | стиль `Elevation/3` | Toast |
| Modal | `surface/level-1` | `radius/surface` | стиль `Elevation/4` | Modal |
| Sheet | `material/thick/fill` + блюр | `radius/surface` сверху, 0 снизу | значения `Elevation/4` | Sheet |

Корень надстройки:

| Набор | Вариантов | Обводка | Радиус | Отступы (верх / право / низ / лево · интервал) |
|---|---|---|---|---|
| `Tooltip · пилот` | 24 | `border/default` | `radius/container` | `space/10` / `space/16` / `space/10` / `space/16` |
| `Menu · пилот` | 2 | `border/subtle` | `radius/control` | `space/8` ×4 · `space/4` |
| `Dropdown panel · пилот` | 2 | `border/subtle` | `radius/control` | `space/12` ×4 · `space/12` |
| `Toast · пилот`, Layout = Card | 5 | `border/subtle` | `radius/control` | `space/12` / `space/48` / `space/16` / `space/20` · `space/12` |
| `Toast · пилот`, Layout = Informer | 5 | нет | 0 | 0 |
| `Modal · пилот` | 12 | `border/subtle` | `radius/surface` | 0 (отступы во вложенных секциях) |
| `Sheet · пилот`, Type = Default | 1 | нет | `radius/surface` сверху | `space/8` / `modal/padding` ×3 · `space/16` |
| `Sheet · пилот`, Type = Menu | 1 | нет | 0 | 0 / `space/16` / `os/safe-area/bottom` / `space/16` |

Толщина обводки — `border/width/default`.

Переопределения в экземпляре поверхности (других нет):
- Tooltip, Tone = Accent — заливка `action/primary/default`;
- Toast, Layout = Informer — заливка `status/<tone>/solid` (Neutral — `action/inverse/default`), радиус 0, без тени;
- Sheet, Type = Menu — радиус 0.

Свойства надстроек — как у действующих наборов, без переименований:
- Tooltip: Text; Placement (Top, Bottom, Left, Right); Tone (Neutral, Accent); Arrow (Center, Start, End).
- Menu: слот Items; Search; Size (M, L).
- Dropdown panel: Show tabs, Show reset, Show search; Content (List, Empty).
- Toast: Title, Show title, Description, Show description, Actions, Close, Icon, Timer, Safe area; Layout (Card, Informer); Tone (Info, Success, Warning, Danger, Neutral).
- Modal: Title, Divider, Show close, Header description; слоты Body, Footer slot; Header (Title, Coin, Empty); Footer (Single, Stacked, Horizontal, None).
- Sheet: Title, Show grabber, Show close, Show footer, Show header actions; слоты Header actions, Body, Footer, Items; Type (Default, Menu).

## 6. Content / slots
У базы содержимого нет. Содержимое и слоты — в надстройках; правила текста — в их описаниях.
- Длинный текст: Tooltip переносится до max-ширины 320; Toast и Modal растут по высоте.
- Modal, Header = Coin: длинный заголовок обрезается без многоточия (парковка `OPEN-QUESTIONS`).
- Языки (de, ar, hi, th, ja, kk) проверены: поверхность тянется за содержимым, тень и радиус не ломаются.

## 7. Events
У базы событий нет. Надстройки: `open` / `close` (Menu, Dropdown panel, Modal, Sheet), `dismiss` и действие (Toast).

## 8. Behavior
- Поверхность всегда равна корню надстройки: растёт вместе с содержимым.
- Тень рисуется за пределами корня, поэтому clip у корня выключен; содержимое с прокруткой обрезает свой внутренний контейнер (список Dropdown panel).
- Уровень поверхности не зависит от Surface context (L0–L3): оверлей лежит поверх всего.
- Dark: тень почти не видна, границу держат обводка и заливка.
- Позиционирование, порталы, запирание фокуса, движение — в описаниях надстроек и `docs/motion.md`.
- Текст 200 %: стендом не снималось.

## 9. Accessibility
- Роли и поведение — у надстроек: `tooltip`, `menu`, `listbox`, `status` / `alert`, `dialog` + `aria-modal`.
- Modal и Sheet запирают фокус и возвращают его на триггер; Esc закрывает.
- Контраст текста на `material/thick/fill` и `surface/raised` — `docs/a11y-contrast-standard.md`.

## 10. Tokens
- Заливка: `surface/raised`, `surface/level-1`, `material/thick/fill`; переопределения `action/primary/default`, `status/*/solid`, `action/inverse/default`.
- Радиус: `radius/container`, `radius/control`, `radius/surface`.
- Тень: стили `Elevation/2 · S`, `Elevation/3`, `Elevation/4`; у материала — эффекты без стиля (стиль эффектов нельзя совместить с блюром): Popover r2 y1 + r24 y8 s-4 (= `Elevation/2`), Sheet r6 y2 + r56 y24 s-8 (= `Elevation/4`), цвета `shadow/key`, `shadow/ambient`, блюр `material/thick/blur`. Равенство чисел стилю ловит `audit-parity` (OVERLAY, таблица `OVERLAY_FX`).
- Обводка корня: `border/default`, `border/subtle`, `border/width/default`.
- Отступы: `space/4`, `space/8`, `space/10`, `space/12`, `space/16`, `space/20`, `space/48`, `modal/padding`, `os/safe-area/bottom`.
- Без переменной (вопрос 6 доски): Tooltip `minWidth 58` / `minHeight 58` / `maxWidth 320`; Menu `minWidth 160`, `maxWidth 320`; Toast `minWidth 280`; Sheet `maxWidth 640`; список Dropdown panel `maxHeight 320`.

## 11. Platforms
Режимы Platform меняют шрифт и safe area (Informer на Android и iOS выше на высоту статус-бара; у Sheet Menu нижний отступ `os/safe-area/bottom`). Отличий в структуре поверхности нет.

## 12. Figma projection
- Страница `_Overlay surface`: база, шесть пилотных надстроек, доска.
- Таблица «набор → Kind» — `OVERLAY` в `audit-parity.plugin.js`; пилоты добавлены в `SERVICE_DONE`. При замене действующих наборов добавить их имена без «· пилот».
- Экземпляр поверхности не раскрыт: менять Kind в макете нельзя, его задаёт компонент.

## 13. Code projection
Нет (DSP, Vue, Flutter недоступны — `docs/dsp-check-2026-11-12.md`). Ожидается: общий набор стилей поверхности (фон, радиус, тень, блюр) по Kind + публичные Tooltip, Menu, Dropdown panel, Toast, Modal, Sheet.

## 14. Acceptance (2026-11-12)
- `audit.plugin.js` — 0.
- `variables-check.plugin.js` — числа min / max из раздела 10 (вопрос 6) и `itemSpacing 8 @header` у Dropdown panel (ряд SPACE_BETWEEN, интервал не действует).
- `audit-parity.plugin.js` — 8 совещательных: MINMAX ×7 (вопрос 6), AXES «Placement: Left / Right» (вопрос 7). OVERLAY, SERVICE, SIZE, PROPS, DESC, NESTED, MATRIX — 0.
- Размеры всех 52 вариантов надстроек совпали с действующими наборами (разница 0).
- Стенд: Light / Dark × EMCD / Geometria / WL Default × Web / iOS / Android / Mobile web × L0–L3; все булевы свойства и варианты, длинный текст, 6 языков — пройден и удалён.
- Не проверено: текст 200 %; паритет с кодом (кода нет).

## 15. Migration
Legacy: base tooltip, Dropdown, base modal (header / footer), шторки App. Источник формы — действующие наборы 2.0: размеры, отступы, свойства перенесены без изменений. Что изменено против действующих:
- фон, радиус и тень вынесены в слой `overlay surface`;
- тени Menu, Dropdown panel (были r8 y4 s-2) и Sheet (были r3 y1 + r32 y16 s-8) приведены к `Elevation/2` и `Elevation/4` (вопрос 2);
- толщина обводки и интервалы привязаны к переменным (были числами);
- Tooltip: свойство Text привязано во всех 24 вариантах (было в 8);
- Modal: clip у корня выключен;
- описания Tooltip и Modal дополнены строками «Когда использовать» и A11y.
