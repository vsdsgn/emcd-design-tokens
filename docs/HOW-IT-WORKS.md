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

Figma Foundations → публикация (вручную) → экспорт переменных в `figma/export-*.json` → `npm run all` → `tokens/**` (DTCG) → `build/**` → git push. Компоненты получают изменения после публикации Foundations и принятия обновлений в Components.

## Где что лежит

| Тема | Файл |
|---|---|
| Эта схема | `docs/HOW-IT-WORKS.md` |
| Декор, Base/Expressive, перепись | `docs/style.md`, `docs/visual-language.md` |
| Платформы и OS | `docs/platforms.md` |
| Эффекты, лёгкий режим | `docs/effects.md` |
| Motion | `docs/motion.md` |
| Состояние работ | `docs/HANDOFF.md` |
| Вопросы и отложенное | `docs/OPEN-QUESTIONS.md` |
| Миграция legacy → DS 2.0, аудит | `docs/migration/` |

## Сайт и лендинги

Сайт — это Web. Берёт базу (Foundations + Components) и поверх верстает как нужно, особенно лендинги. Отдельной платформы Site нет.
