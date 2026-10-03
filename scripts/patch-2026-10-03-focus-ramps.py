"""One-off: mirror Foundations edits of 2026-10-03 (focus ring, 13-step ramps) into figma/export-*.json.
Source of truth stays Figma; this replays the same changes so the repo matches the published library."""
import json, pathlib
root = pathlib.Path(__file__).resolve().parent.parent / 'figma'
P = {"cyan": {"50": "#eff8fb", "100": "#d6eff5", "150": "#bfe6f0", "200": "#aadeec", "300": "#80d0e3", "400": "#54c2db", "600": "#0299b3", "700": "#007a8f", "800": "#005c6c", "850": "#004b59", "900": "#003b46", "950": "#00232b"}, "teal": {"50": "#eff8f6", "100": "#d6efea", "150": "#bfe6df", "200": "#abdfd6", "300": "#81d1c4", "400": "#57c4b4", "600": "#0e9b8c", "700": "#087c6f", "800": "#055e54", "850": "#034c44", "900": "#023c35", "950": "#012520"}, "emerald": {"50": "#f0f9f5", "100": "#d9f2e6", "150": "#c4ebd9", "200": "#b1e6ce", "300": "#8adab9", "400": "#64d0a6", "600": "#29a67d", "700": "#1e8463", "800": "#13644a", "850": "#0d513b", "900": "#073f2d", "950": "#02261a"}, "indigo": {"50": "#eef2ff", "100": "#cddaff", "150": "#b0c3ff", "200": "#98afff", "300": "#6a87fd", "400": "#495ff7", "600": "#2b2bcf", "700": "#2326aa", "800": "#1b2087", "850": "#171d73", "900": "#121960", "950": "#0d1344"}, "fuchsia": {"50": "#fdf1fe", "100": "#f9dafd", "150": "#f5c6fc", "200": "#f2b4fb", "300": "#ea90f7", "400": "#e16df3", "600": "#b83acb", "700": "#942da3", "800": "#71217d", "850": "#5e1b68", "900": "#4b1453", "950": "#300a35"}, "pink": {"50": "#fff1f6", "100": "#ffdae7", "150": "#ffc5db", "200": "#ffb2d0", "300": "#fa8ebb", "400": "#f36ca9", "600": "#c83c81", "700": "#a22f67", "800": "#7c234f", "850": "#671c41", "900": "#531533", "950": "#350b20"}, "rose": {"50": "#fff1f2", "100": "#ffdbdc", "150": "#ffc6c8", "200": "#ffb4b7", "300": "#ff8c94", "400": "#fb6777", "600": "#cf344f", "700": "#a7293f", "800": "#811f2f", "850": "#6b1926", "900": "#56131d", "950": "#380a11"}, "orange": {"50": "#fff3ef", "100": "#ffe0d6", "150": "#ffcebf", "200": "#ffbeab", "300": "#ff9e82", "400": "#ff7e58", "600": "#d84c1d", "700": "#ae3b15", "800": "#852c0e", "850": "#6e230a", "900": "#581a06", "950": "#380e03"}, "electric-blue": {"150": "#b6d2ff", "850": "#093274", "950": "#051a3f"}, "electric-green": {"150": "#c8ffd1", "850": "#006328", "950": "#002a0d"}}

def load(n): return json.loads((root / f'export-{n}.json').read_text())
def save(n, d): (root / f'export-{n}.json').write_text(json.dumps(d, ensure_ascii=False))
def upsert(coll, name, t, val):
    for row in coll['v']:
        if row[0] == name: row[1], row[2] = t, val; return
    coll['v'].append([name, t, val])

e1 = load(1); pc = next(c for c in e1 if c['c'] == 'PC')
for hue, steps in P.items():
    for s, h in steps.items(): upsert(pc, f'color/{hue}/{s}', 'C', h)
save(1, e1)

e2 = load(2); b = next(c for c in e2 if c['c'] == 'B'); t = next(c for c in e2 if c['c'] == 'T')
# modes: EMCD, Geometria, WL Default, Performa
upsert(b, 'accent/focus-on-light', 'C', ['@PC:violet/500', '@PC:electric-blue/500', '@PC:violet/500', '@PC:violet/500'])
upsert(b, 'accent/focus-on-dark', 'C', ['@PC:violet/400', '@PC:electric-blue/400', '@PC:violet/400', '@PC:yellow/400'])
upsert(b, 'accent/focus-ring-on-light', 'C', ['@PC:violet/200', '@PC:electric-blue/200', '@PC:violet/200', '@PC:violet/200'])
upsert(b, 'accent/focus-ring-on-dark', 'C', ['@PC:violet/800', '@PC:electric-blue/800', '@PC:violet/800', '@PC:yellow/800'])
for row in b['v']:
    for s in ('150', '850', '950'):
        if row[0] == f'accent/{s}': row[2][1] = f'@PC:electric-blue/{s}'
upsert(t, 'border/focus-ring', 'C', ['@B:accent/focus-ring-on-light', '@B:accent/focus-ring-on-dark'])
save(2, e2)

e3 = load(3); pl = next(c for c in e3 if c['c'] == 'PL')
upsert(pl, 'border/width/focus-ring', 'F', ['@PS:dimension/x0-25'] * 3)
upsert(pl, 'focus/offset', 'F', ['@PS:dimension/x0'] * 3)
save(3, e3)
print('patched')
