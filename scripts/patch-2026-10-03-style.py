"""One-off: mirror Foundations edits of 2026-10-03 night — Style collection (Base / Expressive),
brand-hue alpha primitives, Brand accent/tint|glow, Theme border/glass — into figma/export-*.json."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'figma'
def load(n): return json.loads((root / f'export-{n}.json').read_text())
def save(n, d): (root / f'export-{n}.json').write_text(json.dumps(d, ensure_ascii=False))
def upsert(coll, name, t, val):
    for row in coll['v']:
        if row[0] == name: row[1], row[2] = t, val; return
    coll['v'].append([name, t, val])

e1 = load(1); pc = next(c for c in e1 if c['c'] == 'PC')
for hue, hx in {'violet': '8f42ff', 'electric-blue': '1470ff', 'yellow': 'f2dd0f'}.items():
    for a in (8, 16, 24, 40):
        upsert(pc, f'color/alpha/{hue}/{a}', 'C', f'#{hx}{round(a / 100 * 255):02x}')
save(1, e1)

e2 = load(2); b = next(c for c in e2 if c['c'] == 'B'); t = next(c for c in e2 if c['c'] == 'T')
hues = ['violet', 'electric-blue', 'violet', 'yellow']  # EMCD, Geometria, WL Default, Performa
upsert(b, 'accent/tint', 'C', [f'@PC:alpha/{h}/16' for h in hues])
upsert(b, 'accent/glow', 'C', [f'@PC:alpha/{h}/24' for h in hues])
upsert(t, 'border/glass', 'C', ['@PC:alpha/black/8', '@PC:alpha/white/8'])
save(2, e2)

# modes: Base (default), Expressive
st = {'c': 'ST', 'm': ['Base', 'Expressive'], 'v': [
    ['style/decor/glow', 'B', [False, True]],
    ['style/decor/card-tint', 'B', [False, True]],
    ['style/decor/glass', 'B', [False, True]],
    ['style/glow/color', 'C', ['@PC:alpha/black/0', '@B:accent/glow']],
    ['style/glow/blur', 'F', [0, 160]],
    ['style/card/tint', 'C', ['@PC:alpha/black/0', '@B:accent/tint']],
    ['style/card/border', 'C', ['@T:border/subtle', '@T:border/glass']],
    ['style/edge/accent', 'C', ['@T:border/subtle', '@B:accent/500']],
    ['style/edge/highlight', 'C', ['@PC:alpha/black/0', '@PC:alpha/white/32']],
    ['style/glass/blur', 'F', [0, '@PL:effect/blur/glass-lg']],
]}
(root / 'export-4.json').write_text(json.dumps([st], ensure_ascii=False))
print('patched')
