"""Mirror Foundations 2026-10-04 cleanup: denser glass, theme-aware quieter glows, same-hue tint end, lighter light-theme shadows."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'figma'
def load(n): return json.loads((root / f'export-{n}.json').read_text())
def save(n, d): (root / f'export-{n}.json').write_text(json.dumps(d, ensure_ascii=False))
def upsert(coll, name, t, val):
    for row in coll['v']:
        if row[0] == name: row[1], row[2] = t, val; return
    coll['v'].append([name, t, val])
e1 = load(1); pc = next(c for c in e1 if c['c'] == 'PC')
for h, hx in {'violet': '8f42ff', 'electric-blue': '1470ff', 'yellow': 'f2dd0f'}.items(): upsert(pc, f'color/alpha/{h}/0', 'C', f'#{hx}00')
for a in (80, 92): upsert(pc, f'color/alpha/neutral-900/{a}', 'C', f'#111111{round(a/100*255):02x}')
save(1, e1)
e2 = load(2); b = next(c for c in e2 if c['c'] == 'B'); t = next(c for c in e2 if c['c'] == 'T')
upsert(b, 'accent/tint-end', 'C', [f'@PC:alpha/{h}/0' for h in ['violet', 'electric-blue', 'violet', 'yellow']])
upsert(t, 'surface/glass-thin', 'C', ['@PC:alpha/white/80', '@PC:alpha/neutral-900/80'])
upsert(t, 'surface/glass-regular', 'C', ['@PC:alpha/white/88', '@PC:alpha/neutral-900/88'])
upsert(t, 'surface/glass-thick', 'C', ['@PC:alpha/white/92', '@PC:alpha/neutral-900/92'])
upsert(t, 'glow/brand', 'C', ['@B:accent/tint', '@B:accent/glow-strong'])
for k in ('attention', 'error', 'success'):
    h = {'attention': 'amber', 'error': 'red', 'success': 'green'}[k]
    upsert(t, f'glow/{k}', 'C', [f'@PC:alpha/{h}/16', f'@PC:alpha/{h}/24'])
for row in t['v']:
    if row[0] == 'glow/neutral': row[2][0] = '@PC:alpha/black/4'
    if row[0] == 'shadow/key': row[2][0] = '@PC:alpha/black/8'
    if row[0] == 'shadow/ambient': row[2][0] = '@PC:alpha/black/4'
save(2, e2)
e4 = load(4); st = e4[0]
upd = {'material/thin/blur': '@PL:effect/blur/glass-md', 'material/regular/blur': '@PL:effect/blur/glass-lg',
       'light/ambient/color': '@T:glow/brand', 'light/status/attention': '@T:glow/attention', 'light/status/error': '@T:glow/error',
       'light/status/success': '@T:glow/success', 'light/status/brand': '@T:glow/brand'}
for row in st['v']:
    if row[0] in upd: row[2][1] = upd[row[0]]
upsert(st, 'light/tint-end', 'C', ['@PC:alpha/black/0', '@B:accent/tint-end'])
save(4, e4)
print('patched')
