# Эффекты: блюр, стекло, края скролла

## Токены

| Токен (Platform) | Web | App | Site | Где |
|---|---|---|---|---|
| `effect/blur/glass-sm` | 8 | 8 | 8 | чипы, маленькие плавающие плашки |
| `effect/blur/glass-md` | 16 | 12 | 16 | таббар, тулбары, шапка шторки |
| `effect/blur/glass-lg` | 32 | 24 | 32 | оверлеи, фон модалки |
| `effect/blur/edge` | 24 | 16 | 24 | прогрессивный блюр на краях скролла (макс. радиус) |
| `effect/blur/backdrop` | 8 | 4 | 8 | размытие за скримом модалки |
| `layout/edge-fade` | 24 | 32 | 48 | высота зоны фейда/блюра у края |

На App значения ниже — производительность на старых телефонах.

## Figma

- `Glass/SM`, `Glass/MD`, `Glass/LG` — background blur, радиус привязан к токенам. Заливка — `surface/glass`.
- `Edge/Top`, `Edge/Bottom` — **прогрессивный** background blur: от 0 у контента до `effect/blur/edge` у края. Всегда в паре с фейдом высотой `layout/edge-fade` (цвет `fade/edge` → прозрачный).
- Где: под липкой шапкой, над таббаром, у краёв горизонтальных скроллов (табы, чипы, карусели).

## Код

**Web.** Прогрессивный блюр = несколько слоёв `backdrop-filter` с нарастающим радиусом, каждый ограничен своей полосой через `mask-image`:

```css
.edge-top { position: sticky; top: 0; height: var(--layout-edge-fade); pointer-events: none; }
.edge-top > i { position: absolute; inset: 0; }
.edge-top > i:nth-child(1) { backdrop-filter: blur(calc(var(--effect-blur-edge) * .25)); mask-image: linear-gradient(to top, transparent 0%, #000 25%, #000 100%); }
.edge-top > i:nth-child(2) { backdrop-filter: blur(calc(var(--effect-blur-edge) * .5));  mask-image: linear-gradient(to top, transparent 25%, #000 50%); }
.edge-top > i:nth-child(3) { backdrop-filter: blur(var(--effect-blur-edge));            mask-image: linear-gradient(to top, transparent 50%, #000 100%); }
.edge-top::after { content: ""; position: absolute; inset: 0; background: linear-gradient(var(--fade-edge), transparent); }
@media (prefers-reduced-transparency: reduce) { .edge-top > i { backdrop-filter: none; } }
```

**Flutter.** `BackdropFilter(ImageFilter.blur(...))` внутри `ShaderMask` с линейным градиентом; 2–3 слоя для плавности. Фейд — `Container` с `LinearGradient` от `fadeEdge` к прозрачному.

## Правила

- Блюр — только поверх скроллящегося контента или как стекло плавающих элементов. Не на статичных карточках.
- Не больше двух слоёв стекла друг над другом.
- При `prefers-reduced-transparency` / «Уменьшить прозрачность» в iOS — блюр выключается, остаётся непрозрачная заливка `surface/raised`.
