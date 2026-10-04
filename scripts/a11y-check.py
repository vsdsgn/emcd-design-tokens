"""A11y check over built tokens: WCAG contrast (text 4.5, large/UI 3) and colour-vision-deficiency
distinguishability (Machado 2009, severity 1.0) for status and chart colours. Writes docs/a11y-report.md."""
import json, glob, math, os, itertools
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def rgb(h):
    h = h.lstrip('#'); a = int(h[6:8], 16) / 255 if len(h) == 8 else 1
    return [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)], a
def over(fg, bg):
    (c, a), (b, _) = rgb(fg), rgb(bg)
    return [c[i] * a + b[i] * (1 - a) for i in range(3)]
def lin(x): return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4
def lum(c): r, g, b = map(lin, c); return 0.2126 * r + 0.7152 * g + 0.0722 * b
def cr(fg, bg):
    b = rgb(bg)[0]; f = over(fg, bg)
    L1, L2 = sorted([lum(f), lum(b)], reverse=True); return (L1 + 0.05) / (L2 + 0.05)
M = {  # Machado et al. 2009, severity 1.0, linear RGB
 'протанопия': [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
 'дейтеранопия': [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
 'тританопия': [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]]}
def sim(c, m):
    l = [lin(x) for x in c]; o = [max(0, min(1, sum(m[i][j] * l[j] for j in range(3)))) for i in range(3)]
    return [12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055 for x in o]
def oklab(c):
    r, g, b = map(lin, c)
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3); m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3); s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s)
def de(a, b): return 100 * math.dist(oklab(a), oklab(b))

TEXT = ['textPrimary', 'textSecondary', 'textTertiary', 'textAccent', 'textLink', 'textDanger', 'textSuccess', 'textWarning', 'textInfo']
ICON = ['iconPrimary', 'iconSecondary', 'iconTertiary', 'iconAccent', 'iconDanger', 'iconSuccess', 'iconWarning', 'iconInfo', 'borderStrong', 'borderFocus']
BGS = ['bgBase', 'surfaceDefault', 'surfaceRaised']
out = ['# A11y-отчёт по токенам', '', 'Сгенерировано `scripts/a11y-check.py` из `build/json` (Base). WCAG 2.2: текст ≥ 4.5:1, крупный текст и графика/UI ≥ 3:1. Дальтонизм — симуляция Machado 2009 (полная форма), различимость пары — ΔE OKLab×100; < 8 — путаются, 8–15 — на грани.', '']
fails = []
for f in sorted(glob.glob(f'{ROOT}/build/json/*.json')):
    name = os.path.basename(f)[:-5]
    if name.startswith('os.') or name.endswith('.expressive'): continue
    d = json.load(open(f)); rows = []
    for bg in BGS:
        for t in TEXT:
            if t in d and bg in d:
                v = cr(d[t], d[bg])
                if v < 4.5: rows.append(f'| {t} | {bg} | {v:.2f} | {"≥3 крупный" if v >= 3 else "провал"} |')
        for t in ICON:
            if t in d and bg in d:
                v = cr(d[t], d[bg])
                if v < 3: rows.append(f'| {t} | {bg} | {v:.2f} | провал (UI 3:1) |')
    for s in ('Danger', 'Success', 'Warning', 'Info'):
        a, b = f'status{s}OnSubtle', f'status{s}Subtle'
        if a in d and b in d:
            v = cr(d[a], over(d[b], d['surfaceDefault']) and '#%02x%02x%02x' % tuple(round(x * 255) for x in over(d[b], d['surfaceDefault'])))
            if v < 4.5: rows.append(f'| {a} | {b} (на surfaceDefault) | {v:.2f} | провал |')
    out += [f'## {name}', '']
    out += ['| Токен | Фон | Контраст | Итог |', '|---|---|---|---|'] + rows if rows else ['Контраст: всё проходит.']
    fails += [(name, r) for r in rows]
    # CVD
    bg = d['surfaceDefault']
    groups = {'статусы': [k for k in ('statusDangerSolid', 'statusSuccessSolid', 'statusWarningSolid', 'statusInfoSolid') if k in d],
              'графики': [k for k in d if k.startswith('data') and k[4:].isdigit()]}
    out += ['']
    for g, keys in groups.items():
        cols = {k: over(d[k], bg) for k in keys}
        bad = []
        for mname, m in M.items():
            for a, b in itertools.combinations(keys, 2):
                x = de(sim(cols[a], m), sim(cols[b], m))
                if x < 15: bad.append(f'{mname}: {a} ↔ {b} — {x:.1f}' + (' **путаются**' if x < 8 else ''))
        out += [f'**Дальтонизм, {g}:** ' + ('различимы во всех трёх формах.' if not bad else ''), ''] + [f'- {b}' for b in bad] + ['']
open(f'{ROOT}/docs/a11y-report.md', 'w').write('\n'.join(out) + '\n')
print('contrast fails:', len(fails))
