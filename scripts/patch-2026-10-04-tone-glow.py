"""Mirror Foundations edits 2026-10-04: tone glows for decorated cards (Style), alpha amber/red/green, Brand accent/glow-strong, Theme glow/neutral."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'figma'
def load(n): return json.loads((root / f'export-{n}.json').read_text())
def save(n, d): (root / f'export-{n}.json').write_text(json.dumps(d, ensure_ascii=False))
def upsert(coll, name, t, val):
    for row in coll['v']:
        if row[0] == name: row[1], row[2] = t, val; return
    coll['v'].append([name, t, val])
e1 = load(1); pc = next(c for c in e1 if c['c'] == 'PC')
for h, hx in {'amber': 'f59e0b', 'red': 'e53935', 'green': '43a047'}.items():
    for a in (16, 24, 40): upsert(pc, f'color/alpha/{h}/{a}', 'C', f'#{hx}{round(a/100*255):02x}')
save(1, e1)
e2 = load(2); b = next(c for c in e2 if c['c'] == 'B'); t = next(c for c in e2 if c['c'] == 'T')
upsert(b, 'accent/glow-strong', 'C', [f'@PC:alpha/{h}/40' for h in ['violet', 'electric-blue', 'violet', 'yellow']])
upsert(t, 'glow/neutral', 'C', ['@PC:alpha/black/8', '@PC:alpha/white/16'])
save(2, e2)
e4 = load(4); st = e4[0]
for tone, src in {'neutral': '@T:glow/neutral', 'attention': '@PC:alpha/amber/40', 'error': '@PC:alpha/red/40', 'success': '@PC:alpha/green/40', 'brand': '@B:accent/glow-strong'}.items():
    upsert(st, f'style/glow/{tone}', 'C', ['@PC:alpha/black/0', src])
save(4, e4)
print('patched')
