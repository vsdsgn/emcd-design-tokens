# Движение в DS 2.0

Источник значений — Foundations: `Primitives · Scale` (длительности, кривые, масштаб нажатия) и `Platform` (смысловые motion-токены). Правила — из скилла design-studio (`rules/ui/animations.md`, `enter-exit.md`); дополнения — docs/references.md.

## Токены

| Токен | Web / Site | App | Где |
|---|---|---|---|
| `motion/duration/feedback` → `duration/fast` | 120ms | 120ms | hover, press, фокус, смена цвета |
| `motion/duration/enter` → `duration/base` | 200ms | 200ms | меню, тултип, тост, аккордеон, табы, сегменты, переключатели |
| `motion/duration/exit` → `duration/fast` | 120ms | 120ms | уход того же — короче и мягче появления |
| `motion/duration/overlay` | 200ms | 320ms (`duration/slow`) | модалка, шторка, боковая панель |
| `motion/easing/standard` → `easing/standard` | `cubic-bezier(0.2, 0, 0, 1)` | | смена состояний, перемещения |
| `motion/easing/enter` → `easing/out` | `cubic-bezier(0, 0, 0.58, 1)` | | появление и уход |
| `motion/scale/press` → `scale/press` | 0.96 | | нажатие кнопок, чипов, плиток |

CSS: `--motion-duration-*`, `--motion-easing-*`, `--motion-scale-press` (build/css/platform-*.css).

## Правила

1. **Частое — мгновенно.** Hover строк, клавиши, частые переключения — только цвет и прозрачность за `feedback`.
2. **Нажатие** — `transform: scale(var(--motion-scale-press))`. Кнопка, открывающая меню или поповер, не сжимается — только цвет.
3. **Появление** — прозрачность + сдвиг 4–12 px (меню 4, тост/контент 12) за `enter` на `easing/enter`. **Уход** — за `exit`, без отскока.
4. **Оверлеи** — затемнение и панель за `overlay`; модалка — из `translateY(12px) scale(0.98)`, шторка — снизу из-за края экрана.
5. **Индикаторы** (табы, сегменты, ползунок переключателя) — `transform`/`width` за `enter` на `easing/standard`; в коде — пружина без отскока для всего, что показывает состояние.
6. **Раскрытие** (аккордеон) — высота (`grid-template-rows 0fr → 1fr`) + прозрачность контента за `enter`; шеврон поворачивается за то же время.
7. **Задержки**: тултип — через 300 мс, скрывается сразу. Тост — 4 с (с действием — 8 с), пауза при наведении; Danger не скрывается сам. Подтверждение действия на переднем плане — на месте, без тоста.
8. **Числа** докручиваются до нового значения, `tabular-nums`, фиксированная ширина.
9. **Стаггер** (~100 мс между группами) — только для редких входов.
10. **Reduced motion**: при `prefers-reduced-motion: reduce` (или `[data-motion="reduced"]`) все `motion/duration/*` ≈ 0 (в CSS 0.01 мс, чтобы `transitionend` срабатывал; слой `motion-reduced.css`), `scale/press` = 1, shimmer скелетона → мягкая пульсация.
11. **Графики**: смена периода — линии и столбцы перетекают за `overlay`; перекрестие и тултип — за `feedback`.

## Figma

- Интерактивные компоненты: Smart Animate между вариантами (hover 120 мс, press 120 мс, переключение 200 мс) на `cubic-bezier(0.2, 0, 0, 1)`.
- Прототип на 🧪 Playground: потоки «Дашборд · Large · Light / Dark / Compact» — модалка → тост (автоскрытие 4 с), шторка (320 мс на App).

## Демо

Живая страница со всеми компонентами, анимациями и переключателями темы / бренда / платформы / reduced motion: https://claude.ai/artifact/K13KwN1M1wm9QSt9NEZtJj
