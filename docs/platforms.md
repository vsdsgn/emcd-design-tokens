# Платформы: десктоп-веб, мобильный веб, iOS, Android

App на Flutter, UI почти одинаковый, но у трёх мобильных паттернов разные конвенции и ограничения. Чтобы не костылить Android, все расхождения — явные, в коллекции **Platform** (Foundations, группа `os/*`), а не решения «по месту».

Platform: **Web** (десктоп) · **Mobile web** · **iOS** · **Android**. Сайт = Web. Плотность и поведение в одной оси. Mobile web = значения Web + сенсорные (`touch/*` как в App). Viewport — только ширина.

## Поведение: `os/*` в Platform (черновик)

| Токен | Desktop web | Mobile web | iOS | Android | Правило |
|---|---|---|---|---|---|
| `os/press/feedback` | highlight | highlight | highlight | highlight | один отклик для всех: подсветка + `motion/scale/press`; ripple не используем |
| `os/scroll/overscroll` | none | none | bounce | stretch | системный по умолчанию, не переопределяем; в вебе — браузер |
| `os/nav/back` | button | button | button + edge-swipe | button + system-back | кнопка «назад» в шапке всегда; жесты — дополнительно (Android predictive back) |
| `os/haptic/level` | none | basic (web-haptics) | full | basic | Android: только selection / light / medium, уведомления маппятся на них, без своих паттернов вибрации |
| `os/material/blur` | да | да | да | **нет** | на Android стекло Expressive → сплошная заливка, остальной декор остаётся (уточнить у разработки) |
| `os/picker/native` | нет | нет | нет | нет | пикеры из DS везде |
| `os/dialog/native` | нет | нет | нет | нет | алерты — Modal из DS (кроме системных разрешений) |

## Правила, чтобы не костылить Android

1. Компоненты DS — свои виджеты, не Material/Cupertino с переопределениями.
2. Расходимся только там, где пользователь ждёт системного поведения: «назад», оверскролл, хаптики, системные бары. Всё остальное одинаково.
3. Каждый Android-квирк — либо токен OS, либо правило здесь; решения «по месту» в коде не принимаем.
4. Типографика: одинаковое распределение межстрочного (`leadingDistribution: even`) на обеих ОС, проверять высоты на Android.
5. Edge-to-edge: системные отступы через safe area / insets, не магические числа.
6. Мобильный веб: `100dvh`, `env(safe-area-inset-*)`, без хаптиков (iOS Safari не поддерживает), свой оверскролл не делаем — конфликт с pull-to-refresh браузера.

## Что костылится в App на Android — разбор сборки 2.43.0 (862), 2026-10-16

Разбор APK (манифест, нативный код MainActivity, ресурсы, строки Dart). Flutter, Impeller не отключён (Vulkan по умолчанию), minSdk 28, target 36.

| # | Что | Как сделано сейчас | Что значит для DS |
|---|---|---|---|
| 1 | **Хаптики** | свой канал `emcd.flutter/haptic`: ручные вибрации `VibrationEffect.createOneShot` 10–28 мс, амплитуда 110–255 (light / medium / heavy / selection); параллельно в Dart — стандартный `HapticFeedback.*` | `haptic/*` маппить на системные эффекты Android (`performHapticFeedback` / `VibrationEffect.EFFECT_TICK / CLICK / HEAVY_CLICK`), а не на свои длительности — они ощущаются по-разному на разных моторах. Один путь вместо двух. |
| 2 | **Шрифт: Regular подменён Medium** | в FontManifest вес 400 у Roobert PRO указывает на файл Medium; Regular-файла в сборке нет | весь «обычный» текст в App на 1 ступень жирнее макетов. Добавить Regular (или перейти на Inter / Onest по решению). |
| 3 | **Inter — три оптических кегля в одном семействе** | Inter_18pt / 24pt / 28pt с одинаковыми весами (700 трижды), нет 400 | Flutter берёт файл произвольно; один файл на вес (или variable Inter с `opsz`). |
| 4 | **Системные панели** | устаревший `setSystemUiVisibility(LAYOUT_STABLE · LAYOUT_FULLSCREEN)` в onResume + `navigationBarColor` | target 36 → edge-to-edge на Android 15+ принудительно; отступы — только через safe area (`os/*`, `control/safe-margin`), без ручной перекраски панелей. |
| 5 | **Блюр** | пакет `progressive_blur` (свой шейдер) + `BackdropFilter`; ограничений по устройству нет | Expressive-блюр уже в проде без деграда → подключить границы `config/perf-tiers.json`. |
| 6 | **Скелетоны** | свой shimmer-шейдер («Failed to load shimmer shader» — есть путь без него) | правило DS: блик + pulse при reduced motion; проверить фолбэк, когда шейдер не загрузился. |
| 7 | **Скругления** | `cornerSmoothing` (figma_squircle) | совпадает с правилом DS (сглаживание 60 %). ✓ |
| 8 | **Иконки** | 433 SVG + свой шрифт `EMCDIcons.ttf` (1,8 КБ, несколько глифов) | иконочный шрифт уже есть — решение «пока SVG» = свести к одному способу. |
| 9 | **Клавиатура** | `adjustResize` | ок; поля у нижнего края — проверить с edge-to-edge. |
| 10 | Прочее | FLAG_SECURE на паузе (скрывает экран в «недавних»); `largeHeap`; тестовый `golden_toolkit` с Roboto в релизе; GIF из `time_picker_spinner_pop_up` 3,2 МБ | не DS — передать разработке как гигиену. |

Не видно из сборки (нужна разработка): межстрочный / `leadingDistribution`, жест «назад» (predictive back), оверскролл — по коду стандартный stretch Android.


## Хаптики: `haptic/*`

| Токен | iOS | Android | Где |
|---|---|---|---|
| `haptic/selection` | selection | selection | табы, сегменты, тумблер, чекбокс, пикеры, шаг слайдера |
| `haptic/press` | light | light | главное действие, подтверждение |
| `haptic/drag` | medium | medium | долгое нажатие, начало перетаскивания, порог pull-to-refresh |
| `haptic/success` | success | light | успешный результат |
| `haptic/warning` | warning | medium | предупреждение, опасное действие |
| `haptic/error` | error | medium | ошибка |

Mobile web — базовый набор как прогрессивное улучшение через библиотеку web-haptics (haptics.lochie.me): Android Chrome — `navigator.vibrate`, iOS Safari — приём библиотеки; проверять её актуальную матрицу поддержки. Web (десктоп) — `none`.
