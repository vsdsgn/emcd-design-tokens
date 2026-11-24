# Следующий Publish — что нажать (готовит агент, публикует Стефан)

Обновлять после каждой правки библиотек. Строка — в диалог Publish Figma как есть; детали — CHANGELOG «Unreleased».

## ~~Components — опубликовано 24.11~~ `v0.3.x — Avatar 2XS/S, Amount XL Display/SM, Tooltip 16, Modal / Chart card / Code cell Heading/XL`
- Avatar — Type=Text: Size 2XS 16 и S 24 (Default, Skeleton); инициалы `text/tertiary` (как legacy).
- Amount — XL: стиль Display/SM (32 на всех ширинах).
- Tooltip — текст Label/LG 16, `text/secondary` (как production).
- Modal — заголовок Size=MD: Heading/XL (было Display/MD, 48 на 1440).
- Chart card — значение Heading/XL. Code cell — L: Heading/XL.

После Publish: в Web Migration test принять обновление библиотеки; агент повторит замену аватаров на «🧪 Миграция компонентов · Web App».

## Foundations — `v0.3.x — статусы как production: success #43a047, danger #e53935`
- `status/success/solid` → green/500, `status/danger/solid` → red/500, `action/success/default` → green/650.

## Components (после Foundations) — `v0.3.x — Badge Solid и Toast Informer: фон action/success|danger`
- Badge Solid Success / Danger, Toast Informer Success / Danger → `action/success|danger/default`.
