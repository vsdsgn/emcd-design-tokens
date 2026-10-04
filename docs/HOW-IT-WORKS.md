# Как устроена система (коротко)

## Одна мысль

Компонент один на всех. Как он выглядит, решает набор независимых **осей** — коллекций переменных в Foundations. Продукт = выбор по одному режиму на каждой оси.

## Слои

```
Primitives            сырые значения: цвета (рампы 50–950, альфы), шкала размеров
   ↓ ссылаются
Brand                 чей продукт      EMCD · Geometria · WL Default · (Performa — эксперимент)
Theme                 светлая/тёмная   Light · Dark
Platform              плотность        Web · App · Site
Viewport              ширина           Compact · …
Style                 сколько декора   Base (по умолчанию) · Expressive
OS                    поведение        Desktop web · Mobile web · iOS · Android
   ↓ используют
Components            кнопки, инпуты, карточки… — только семантические токены, никаких hex и чисел
   ↓
Продуктовые библиотеки (позже)   уникальное pool, Monitoring
```

Оси не зависят друг от друга: меняешь одну — остальные не трогаются.

## Что за что отвечает

| Ось | Меняет | Не меняет |
|---|---|---|
| Brand | акцентный цвет, шрифт, радиусы, фокус | поведение, декор |
| Theme | светлое/тёмное | бренд, декор |
| Platform | размеры контролов, отступы, сила блюров, motion | цвета |
| Viewport | раскладку и кегли по ширине | всё остальное |
| **Style** | декор: стекло, пятна света, тинты, кромки, прогрессивный блюр | структуру и поведение компонента |
| OS | отклик на нажатие, «назад», оверскролл, хаптики, можно ли блюр | внешний вид |

## Base и Expressive

- **Base** — система по умолчанию. Чистая, без декора. Это то, что видят все продукты, и это же **откат** для любого случая, когда декор нельзя: слабое устройство, снижение прозрачности, нет `backdrop-filter`, Android (блюр).
- **Expressive** — тот же язык плюс декор. Включается явно и только когда: продукт — pool или Monitoring **и** устройство тянет рендер **и** у пользователя не включено снижение прозрачности.
- Декор живёт **внутри** тех же компонентов отдельными слоями; в Base они выключены токенами `decor/*` и нулевыми значениями. Поэтому Base не тяжелеет визуально и ничего не ломается при переключении.
- Что разрешено в Expressive и где — роли и бюджет экрана: `visual-language.md`, страница Foundations «🌗 Visual language».

## Примеры продуктов

| Продукт | Brand | Style | OS |
|---|---|---|---|
| Pool, веб, мощный ноутбук | EMCD | Expressive | Desktop web |
| Pool, App на iPhone | EMCD | Expressive | iOS |
| Pool, App на слабом Android | EMCD | Base (откат) | Android |
| Monitoring | EMCD | Expressive | Desktop web |
| Firmware, сайт, WL B2B | EMCD | Base | по устройству |
| Geometria | Geometria | Base (может стать Expressive) | по устройству |
| WL-клиент | WL Default + свой акцент | Base | по устройству |

## В Figma

Режим оси выбирается на фрейме или странице (панель Variables → режимы коллекций). По умолчанию: EMCD · Dark · Web · Base · Desktop web.

## В коде

Веб: атрибуты на `<html>` — `data-brand`, `data-theme`, `data-platform`, `data-style`, `data-os`, `data-perf`; CSS из `build/css/index.css`. `perf-low.css` сам откатывает Expressive в Base при слабом рендере.
Flutter: `build/json/<brand>.<theme>.json` (Base), `<brand>.<theme>.expressive.json`, `os.<платформа>.json`.

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
