# Платформы: десктоп-веб, мобильный веб, iOS, Android

App на Flutter, UI почти одинаковый, но у трёх мобильных паттернов разные конвенции и ограничения. Чтобы не костылить Android, все расхождения — явные, в коллекции **Platform** (Foundations, группа `os/*`), а не решения «по месту».

Platform: **Web** (десктоп) · **Mobile web** · **iOS** · **Android** · **Site**. Плотность и поведение в одной оси. Mobile web = значения Web + сенсорные (`touch/*` как в App). Viewport — только ширина.

## Поведение: `os/*` в Platform (черновик, Site = как Web)

| Токен | Desktop web | Mobile web | iOS | Android | Правило |
|---|---|---|---|---|---|
| `os/press/feedback` | highlight | highlight | highlight | highlight | один отклик для всех: подсветка + `motion/scale/press`; ripple не используем |
| `os/scroll/overscroll` | none | none | bounce | stretch | системный по умолчанию, не переопределяем; в вебе — браузер |
| `os/nav/back` | button | button | button + edge-swipe | button + system-back | кнопка «назад» в шапке всегда; жесты — дополнительно (Android predictive back) |
| `os/haptic/level` | none | none | full | basic | Android: только selection / light / medium, уведомления маппятся на них, без своих паттернов вибрации |
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

Открыто: список того, что сейчас костылится на Android (вопрос к разработке, OPEN-QUESTIONS).
