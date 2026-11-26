#!/usr/bin/env python3
"""Таблицы миграции → Figma: чанки use_figma-кода (данные + scripts/figma/migration-tables.plugin.js).
Чтение ответов обратно: см. scripts/figma/migration-tables-read.plugin.js → docs/migration/how-figma.json."""
import csv, json, sys, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
B = (R / 'scripts/figma/migration-tables.plugin.js').read_text()
if len(sys.argv) > 2 and sys.argv[1] == '--merge':  # ответы из Figma → колонка «Как сделать» в CSV
    J = json.load(open(sys.argv[2]))
    for key, csvp in (('colors', 'docs/migration/table-colors.csv'), ('components', 'docs/migration/table-components.csv')):
        rows = list(csv.DictReader(open(R / csvp))); f = list(rows[0].keys())
        for n, t in J.get(key, {}).items(): rows[int(n) - 1]['Как сделать'] = t
        w = csv.DictWriter(open(R / csvp, 'w', newline=''), fieldnames=f); w.writeheader(); w.writerows(rows); print(csvp, len(J.get(key, {})))
    sys.exit()
out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/mt'); out.mkdir(parents=True, exist_ok=True)
TC = [('Legacy', 200, 't', 'Legacy'), ('Роль', 140, 't', 'Роль'), ('Light до', 120, 's', 'Light до'), ('Light после', 120, 's', 'Light после'),
      ('Dark до', 120, 's', 'Dark до'), ('Dark после', 120, 's', 'Dark после'), ('Токен DS 2.0', 200, 't', 'Токен DS 2.0'), ('Действие', 90, 't', 'Действие'),
      ('Как сделать', 300, 'h', 'Как сделать'), ('ΔE L / D', 70, 't', 'ΔE (L / D)'), ('Статус', 56, 't', 'Статус'), ('Решение', 180, 't', 'Решение'),
      ('Примечание', 260, 't', 'Примечание'), ('Где используется', 280, 't', 'Где используется'), ('Источник', 80, 't', 'Источник')]
P = ['Mining Web', 'Mining App', 'Monitoring', 'WL B2B', 'WL B2C', 'Geometria Web', 'Geometria App', 'Mining US', 'Firmware']
CC = [('Уровень', 90, 't', 'Уровень'), ('Production (legacy)', 260, 't', 'Production (legacy)'), ('DS 2.0', 220, 't', 'DS 2.0'), ('Статус', 110, 't', 'Статус'),
      ('Как сделать', 320, 'h', 'Как сделать'), ('Всего', 64, 't', 'Всего'), ('Правило / отличие от production', 380, 't', 'Правило / отличие от production')] + [(p, 76, 't', p) for p in P]
NOTE = 'Жёлтая колонка «Как сделать» — твой вариант. Пусто («…») — оставляем как есть. Пиши прямо в ячейку, я считаю текст обратно в CSV.'
def chunks(name, cols, csvp, idf, x, n):
    rows = list(csv.DictReader(open(R / csvp)))
    rs = [{'id': idf(i, r), 'c': [r[k] for _, _, _, k in cols]} for i, r in enumerate(rows)]
    for j in range(0, len(rs), n):
        D = {'t': name, 'x': x, 'note': NOTE, 'cols': [[l, w, k] for l, w, k, _ in cols], 'rows': rs[j:j + n]}
        p = out / f'{name[:6]}-{j // n:02d}.js'; p.write_text('const D = ' + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + ';\n' + B)
        print(p, len(p.read_text()))
chunks('Цвета → токены', TC, 'docs/migration/table-colors.csv', lambda i, r: f"{i + 1:03d} {r['Legacy']}", 0, 50)
chunks('Компоненты prod → DS 2.0', CC, 'docs/migration/table-components.csv', lambda i, r: f"{i + 1:02d} {r['Production (legacy)'][:40]}", 3300, 50)
