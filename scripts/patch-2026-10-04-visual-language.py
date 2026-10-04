"""Mirror Foundations 2026-10-04: Style restructured into decor / material / light / edge roles; glass fills per level."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'figma'
def load(n): return json.loads((root / f'export-{n}.json').read_text())
def save(n, d): (root / f'export-{n}.json').write_text(json.dumps(d, ensure_ascii=False))
def upsert(coll, name, t, val):
    for row in coll['v']:
        if row[0] == name: row[1], row[2] = t, val; return
    coll['v'].append([name, t, val])
e1 = load(1); pc = next(c for c in e1 if c['c'] == 'PC')
for h, hx in (('white', 'ffffff'), ('black', '000000')):
    for a in (88, 92): upsert(pc, f'color/alpha/{h}/{a}', 'C', f'#{hx}{round(a/100*255):02x}')
for a in (64, 76, 88): upsert(pc, f'color/alpha/neutral-900/{a}', 'C', f'#111111{round(a/100*255):02x}')
save(1, e1)
e2 = load(2); t = next(c for c in e2 if c['c'] == 'T')
upsert(t, 'surface/glass-thin', 'C', ['@PC:alpha/white/64', '@PC:alpha/neutral-900/64'])
upsert(t, 'surface/glass-regular', 'C', ['@PC:alpha/white/80', '@PC:alpha/neutral-900/76'])
upsert(t, 'surface/glass-thick', 'C', ['@PC:alpha/white/92', '@PC:alpha/neutral-900/88'])
save(2, e2)
Z = '@PC:alpha/black/0'
st = {'c': 'ST', 'm': ['Base', 'Expressive'], 'v': [
    ['decor/light', 'B', [False, True]], ['decor/tint', 'B', [False, True]], ['decor/material', 'B', [False, True]],
    ['material/thin/fill', 'C', ['@T:surface/default', '@T:surface/glass-thin']],
    ['material/thin/blur', 'F', [0, '@PL:effect/blur/glass-sm']],
    ['material/regular/fill', 'C', ['@T:surface/default', '@T:surface/glass-regular']],
    ['material/regular/blur', 'F', [0, '@PL:effect/blur/glass-md']],
    ['material/thick/fill', 'C', ['@T:surface/raised', '@T:surface/glass-thick']],
    ['material/thick/blur', 'F', [0, '@PL:effect/blur/glass-lg']],
    ['material/scrim', 'C', ['@T:surface/overlay', '@T:surface/overlay']],
    ['light/ambient/color', 'C', [Z, '@B:accent/glow-strong']], ['light/ambient/blur', 'F', [0, 160]],
    ['light/accent/color', 'C', [Z, '@B:accent/glow-strong']], ['light/accent/blur', 'F', [0, 16]],
    ['light/tint', 'C', [Z, '@B:accent/tint']],
    ['light/status/neutral', 'C', [Z, '@T:glow/neutral']], ['light/status/attention', 'C', [Z, '@PC:alpha/amber/40']],
    ['light/status/error', 'C', [Z, '@PC:alpha/red/40']], ['light/status/success', 'C', [Z, '@PC:alpha/green/40']],
    ['light/status/brand', 'C', [Z, '@B:accent/glow-strong']],
    ['edge/hairline', 'C', ['@T:border/subtle', '@T:border/glass']], ['edge/accent', 'C', ['@T:border/subtle', '@B:accent/500']],
    ['edge/highlight', 'C', [Z, '@PC:alpha/white/32']],
]}
(root / 'export-4.json').write_text(json.dumps([st], ensure_ascii=False))
print('patched')
