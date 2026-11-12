# Как устроена система (коротко)

## Одна мысль

Компонент один на всех. Как он выглядит, решает набор независимых **осей** — коллекций переменных в Foundations. Продукт = выбор по одному режиму на каждой оси.

## Слои

```
Primitives            сырые значения: цвета (рампы 50–950, альфы), шкала размеров
   ↓ ссылаются
Brand                 чей продукт      EMCD · Geometria · WL Default
Theme                 светлая/тёмная   Light · Dark
Platform              где работает     Web · Mobile web · iOS · Android  (плотность + поведение)
Viewport              ширина           Compact · …
Style                 сколько декора   Base (по умолчанию) · Expressive
   ↓ используют
Components            кнопки, инпуты, карточки… — только семантические токены, никаких hex и чисел
   ↓
(всё уникальное продуктов — тоже в Components; отдельные продуктовые либы не заводим)
```

Оси не зависят друг от друга: меняешь одну — остальные не трогаются.

## Что за что отвечает

| Ось | Меняет | Не меняет |
|---|---|---|
| Brand | акцентный цвет, шрифт, радиусы, фокус | поведение, декор |
| Theme | светлое/тёмное | бренд, декор |
| Platform | размеры контролов, отступы, сила блюров, motion, поведение: отклик, «назад», оверскролл, хаптики, можно ли блюр | цвета |
| Viewport | раскладку и кегли по ширине | всё остальное |
| **Style** | декор: стекло, пятна света, тинты, кромки, прогрессивный блюр | структуру и поведение компонента |

## Base и Expressive

- **Base** — система по умолчанию. Чистая, без декора. Это то, что видят все продукты, и это же **откат** для любого случая, когда декор нельзя: слабое устройство, снижение прозрачности, нет `backdrop-filter`, Android (блюр).
- **Expressive** — тот же язык плюс декор. Включается явно и только когда: продукт — pool или Monitoring **и** устройство тянет рендер **и** браузер современный (Chromium 76+, Firefox 103+, Safari / iOS 18+), а снижение прозрачности не включено там, где браузер его сообщает.
- Декор живёт **внутри** тех же компонентов отдельными слоями; в Base они выключены токенами `decor/*` и нулевыми значениями. Поэтому Base не тяжелеет визуально и ничего не ломается при переключении.
- Что разрешено в Expressive и где — роли и бюджет экрана: `visual-language.md`, страница Foundations «🌗 Visual language».

## Примеры продуктов

| Продукт | Brand | Style | Platform |
|---|---|---|---|
| Pool, веб, мощный ноутбук | EMCD | Expressive | Web |
| Pool, App на iPhone | EMCD | Expressive | iOS |
| Pool, App на слабом Android | EMCD | Base (откат) | Android |
| Monitoring | EMCD | Expressive | Web |
| Firmware, WL B2B | EMCD | Base | Web / Mobile web / iOS / Android |
| Geometria | Geometria | Base (может стать Expressive) | Web / Mobile web / iOS / Android |
| WL-клиент | WL Default (= EMCD Base на фоллбеках); свой бренд → отдельный режим Brand, как Geometria | Base | Web / Mobile web / iOS / Android |

## В Figma

Режим оси выбирается на фрейме или странице (панель Variables → режимы коллекций). По умолчанию: EMCD · Dark · Web · Base. Viewport — только ширина (узкое окно десктопа не становится мобильным вебом).

## В коде

Веб: атрибуты на `<html>` — `data-brand`, `data-theme`, `data-platform` (web · mobile-web), `data-style`, `data-perf`; CSS в проде — `build/css/ds.min.css` (один файл, ~8 КБ gzip), для разработки — `build/css/index.css`; в `<head>` до CSS — перф-гард `build/js/perf.js` (docs/performance.md). `perf-low.css` сам откатывает Expressive в Base при слабом рендере.
Flutter: `build/json/<brand>.<theme>.<ios|android>.json` (Base) и `….expressive.json`.

## Поток изменений

Figma Foundations → публикация (вручную) → экспорт переменных в `figma/export-*.json` → `npm run all` → `tokens/**` (DTCG) → `build/**` → git push → «обнови Claude DS» (артефакт для Claude Design, docs/claude-ds.md). Компоненты получают изменения после публикации Foundations и принятия обновлений в Components.

## Где что лежит

| Тема | Файл |
|---|---|
| Эта схема | `docs/HOW-IT-WORKS.md` |
| Декор, Base/Expressive, перепись | `docs/style.md`, `docs/visual-language.md` |
| Платформы и OS | `docs/platforms.md` |
| Эффекты, лёгкий режим | `docs/effects.md` |
| Motion | `docs/motion.md` |
| Claude DS (Claude Design) | `docs/claude-ds.md` |
| Состояние работ | `docs/HANDOFF.md` |
| Вопросы и отложенное | `docs/OPEN-QUESTIONS.md` |
| Миграция legacy → DS 2.0, аудит | `docs/migration/` |

## Сайт и лендинги

Сайт — это Web. Берёт базу (Foundations + Components) и поверх верстает как нужно, особенно лендинги. Отдельной платформы Site нет.

## Манифест компонентов (с 2026-11-12)

- `docs/ds-manifest.json` — машинное описание Figma Components: страница → наборы → статус, оси, варианты против полного произведения, свойства (тип, значение по умолчанию, в скольких вариантах привязано), вложенные компоненты, токены по слоям, значения без переменной, min / max, служебные слои, борда и её разделы.
- Снять: `scripts/figma/manifest.plugin.js` через `use_figma` (только чтение; `PAGES` — id страниц, ответ режется на куски по 18,5 KB, `CHUNK` — номер куска). Каждый ответ сохранить как `<батч>.<кусок>.txt` (батч `A*` атомы, `M*` молекулы, `O*` организмы).
- Собрать: `node scripts/manifest-build.mjs <папка> --date=ГГГГ-ММ-ДД` → `docs/ds-manifest.json` со сводкой.
- Манифест — вход для отчётов расхождений (`docs/audit-*.md`) и для паритета с кодом: `npm run parity` (`scripts/parity.mjs`, в CI). Проверяет: токены компонентов есть в `tokens/**`; статусы `claude-ds/status.json` = Figma; манифест кода (`docs/code-manifest.json` или `--code=`, формат — в шапке скрипта) = оси, свойства, значения по умолчанию, токены. Известные расхождения со сроком — `docs/parity-baseline.json`. Контракт компонента `docs/components/<name>.md` должен совпадать с манифестом.

## Базовые служебные компоненты и контракты (с 2026-11-12)

- Служебная база — набор с именем на «_» на своей странице (первая: `_Field base`). Компонент семьи = надстройка с вложенным раскрытым экземпляром базы; оси надстройки повторяют оси базы; своих слоёв рамки, кольца фокуса и зон у надстройки нет. Семьи перечислены в `FAMILIES` скрипта `audit-parity.plugin.js` (проверка BASE). Вторая база — `_Selection control`: строка выбора со слотом `Control`, в слот ставится глиф (`_Checkbox control`, `_Radio control`, `_Toggle control`); Hover, Pressed, Status, Tone и кольцо живут в глифе, поэтому у базы только Default и Disabled. BASE: если у базы нет значения оси надстройки, база обязана быть Default; оси глифа в слоте обязаны совпадать с надстройкой («BASE глиф»).
- Третья база — `_List row`: строка списка (Type Menu | Option | List) со слотами Leading / Trailing, глифом выбора и галочкой; надстройки — Menu item, Multiselect option, List item. Ловушка Figma: у свойства замены экземпляра (instance swap) одно значение по умолчанию на весь набор — `swapComponent` в одном варианте меняет глиф во всех. Разное состояние вложенного глифа по вариантам задаёт надстройка вариантным свойством глифа, не база.
- Четвёртая база — `_Overlay surface`: плавающая поверхность (Kind Tooltip | Popover | Toast | Modal | Sheet — фон, радиус, тень, блюр материала). В надстройке это первый слой `overlay surface` — экземпляр во весь корень (absolute, растянут); у корня надстройки нет своей заливки и тени, clip выключен, остаются обводка, радиус (та же переменная), отступы и ширина. Обводка не в базе: INSIDE на вложенном слое уменьшала бы вариант. Стиль эффектов нельзя совместить с блюром, поэтому у Popover и Sheet эффекты без стиля, числа равны Elevation (`OVERLAY_FX`). Проверка OVERLAY в `audit-parity.plugin.js`, таблица «набор → Kind» — `OVERLAY`. Контракт: `docs/components/overlay-surface.md`.
- Служебные слои (страница `_Service layers`): `_Focus ring`, `_State layer`, `_Hit area`, `_Safe margin`. Компонент ставит экземпляр с прежним именем слоя (`focus ring`, `state layer`, `hit area · overlay`, `safe area · outer`) и меняет только размер, радиус и видимость. Аудиты проверяют сам экземпляр, внутрь не заходят. Подробно: `docs/components/service-layers.md`.
- Контракт компонента: `docs/components/<name>.md` по схеме `docs/component-contract.md`. Контракт = описание в Figma = борда v3 = манифест.
- Аудиты по одной странице (в том числе служебной): `PAGES` в `audit.plugin.js`, `variables-check.plugin.js` (id страниц) и `audit-parity.plugin.js` (имя или id).
