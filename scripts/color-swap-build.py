#!/usr/bin/env python3
"""Собирает Figma-скрипт миграции цветов из docs/migration/color-map.csv.
python3 scripts/color-swap-build.py --src=123:456 [--dry] → build/figma/color-swap.js"""
import csv, json, re, sys
from pathlib import Path
R = Path(__file__).resolve().parent.parent
args = dict(a.lstrip('-').split('=', 1) if '=' in a else (a.lstrip('-'), True) for a in sys.argv[1:])
m = {}
for x in csv.DictReader(open(R/'docs/migration/color-map.csv')):
    if x['source'] not in ('Web·App', 'Core', 'App'): continue
    t = x['target'].strip()
    if not t or t.startswith('по роли') or '|' in t: continue
    t = re.sub(r'\+layer@\d+', '', t).replace('state/layer@6', 'surface/level-3').replace('state/layer@10', 'control/track')
    name = x['legacy_token'].replace('Alias · ', '').replace('theme · ', '')
    names = [n.strip() for n in name.split(' / ')] if ' / ' in name and ('[' in name or name.startswith(('Error', 'Success', 'Attention'))) else [name]
    for n in names:
        if [x['role'], t] not in m.setdefault(n, []): m[n].append([x['role'], t])
tpl = (R/'scripts/figma/color-swap.plugin.js').read_text()
out = tpl.replace('/*MAP*/{}', json.dumps(m, ensure_ascii=False)).replace('/*ARGS*/{}', json.dumps({'src': args.get('src', ''), 'dry': bool(args.get('dry'))}))
(R/'build/figma').mkdir(parents=True, exist_ok=True); (R/'build/figma/color-swap.js').write_text(out)
print('build/figma/color-swap.js', len(m), 'legacy names')
