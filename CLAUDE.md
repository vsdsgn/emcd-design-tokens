# EMCD DS 2.0 — правила для агента (Claude Code)

1. В начале сессии читай `docs/HANDOFF.md` → `docs/OPEN-QUESTIONS.md` → `docs/HOW-IT-WORKS.md`. Обновляй их по ходу и пушь.
2. Фокус на текущем этапе (см. HANDOFF). Новая идея: быстрая и не ломает — делай, иначе в парковку OPEN-QUESTIONS.
3. Работай автономно до результата, минимум вопросов. Рутину (экспорт Foundations, `npm run all`, таблица миграции, push) делай сам.
4. Миграция компонента: legacy DS Web / App → новые токены → апгрейд 2.0. Перед новым дизайном ищи в legacy и продуктах.
5. Система, а не UI kit: одна задача — один способ, у каждого варианта жёсткое правило применения, одинаковая логика состояний.
6. «Готово» — только после проверки всех вариантов, осей и свойств.
7. Ответы Стефану — короткие, по пунктам, по-русски.

Сборка: `npm ci && npm run all`. Таблица миграции: правь `docs/migration/color-map.csv` → `python3 scripts/color-migration.py`.
Figma — через Figma MCP (на VPS подключить: `claude mcp add --transport http figma https://mcp.figma.com/mcp`, вход через /mcp).
