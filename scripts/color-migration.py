#!/usr/bin/env python3
"""Таблица миграции цветов legacy → DS 2.0 (этап 1).
Вход:  docs/migration/color-map.csv   — соответствия и решения (правится руками)
       docs/migration/legacy-usage.csv — потребители legacy-переменных (скан Figma)
       build/json/emcd.{light,dark}.ios.json, figma/export-2.json — живые значения и цепочки алиасов
Выход: docs/migration/foundations-color.csv (+ JSON для рамки в Figma: build/migration-color.json)
Запуск: python3 scripts/color-migration.py"""
import csv, json, math, re
from pathlib import Path
R = Path(__file__).resolve().parent.parent
L = json.load(open(R/'build/json/emcd.light.ios.json')); D = json.load(open(R/'build/json/emcd.dark.ios.json'))
camel = lambda t: re.sub(r'[/-](\w)', lambda m: m.group(1).upper(), t)
DEC = {'D-levels': 'Уровни L0–L3 (05–06.10)', 'D-state': 'Слой состояний 6/10 % (06.10)', 'D-disabled': 'Disabled 8 / 40 % (06.10)',
       'D-alpha-text': 'Текст альфой 72/56/40 (05.10)', 'D-alpha': 'Обводки и плашки альфой (05.10)', 'D-contrast': 'Цветной текст ≥ 4.5 (06.10)',
       'D-status-subtle': 'status/*/subtle альфой (05.10)'}
# chains from Figma export (Theme Light/Dark, Brand = EMCD)
ex = {c['c']: c for f in sorted((R/'figma').glob('export-*.json')) for c in json.load(open(f))}
idx = {k: {r[0]: r[2] for r in c['v']} for k, c in ex.items()}
def chain(name, mode):
    out, coll, n = [], 'T', name
    for _ in range(8):
        v = idx[coll].get(n)
        if v is None: return ''
        if isinstance(v, list): v = v[{'T': mode, 'B': 0}.get(coll, 0)]
        if isinstance(v, str) and v.startswith('@'):
            coll, n = v[1:].split(':', 1); out.append(n.removeprefix('color/')); continue
        break
    return ' → '.join(out)
def rgba(h):
    h = h.lstrip('#'); a = int(h[6:8], 16)/255 if len(h) == 8 else 1
    return [int(h[i:i+2], 16) for i in (0, 2, 4)], a
def over(fg, bg):
    (c, a), (b, _) = rgba(fg), rgba(bg)
    return '#' + ''.join('%02x' % round(c[i]*a + b[i]*(1-a)) for i in range(3))
def lin(c): c /= 255; return c/12.92 if c <= 0.04045 else ((c+0.055)/1.055)**2.4
def lab(h):
    r, g, b = [lin(x) for x in rgba(h)[0]]
    X = (0.4124*r+0.3576*g+0.1805*b)/0.95047; Y = 0.2126*r+0.7152*g+0.0722*b; Z = (0.0193*r+0.1192*g+0.9505*b)/1.08883
    f = lambda t: t**(1/3) if t > 0.008856 else 7.787*t+16/116
    return (116*f(Y)-16, 500*(f(X)-f(Y)), 200*(f(Y)-f(Z)))
def dE(a, b): return round(math.dist(lab(a), lab(b)), 1)
def lum(h): r, g, b = [lin(x) for x in rgba(h)[0]]; return .2126*r+.7152*g+.0722*b
def cr(fg, bg): f = over(fg, bg); a, b = sorted((lum(f), lum(bg)), reverse=True); return (a+.05)/(b+.05)
LV = lambda T: [T[f'surfaceLevel{i}'] for i in range(4)]
def val(T, target):
    if '+layer@' in target:  # слой состояния поверх заливки
        base, a = target.split('+layer@'); return over(T['stateLayer'][:7] + '%02x' % round(int(a)*2.55), T[camel(base)])
    m = re.match(r'(.+)@(\d+)$', target)
    if m: return T[camel(m.group(1))][:7] + '%02x' % round(int(m.group(2))*2.55)
    return T.get(camel(target))
usage = {r['key']: r for r in csv.DictReader(open(R/'docs/migration/legacy-usage.csv'))}
def impact(src, tok):
    if src == 'Site': return 'не сканировали'
    keys = {'Disabled / Inactive [Back]': ['Disabled [Back]', 'Inactive [Back]']}.get(tok) or ([tok] if tok in usage else [k.strip() for k in tok.replace('theme · ', '').split(' / ')])
    s = {c: sum(int(usage[k][c]) for k in keys if k in usage) for c in ('ds_web', 'ds_app', 'web_app', 'app', 'monitoring')}
    if not any(k in usage for k in keys): return '0' if src in ('Web·App', 'App') else 'нет данных'
    if not any(s.values()): return '0'
    lab_ = {'ds_web': 'DS Web', 'ds_app': 'DS App', 'web_app': 'Web App', 'app': 'App', 'monitoring': 'Monitoring*'}
    return ' · '.join(f"{lab_[c]} {s[c]:,}".replace(',', ' ') for c in s if s[c])
rows, js = [], []
for r in csv.DictReader(open(R/'docs/migration/color-map.csv')):
    t = r['target']; real = t and not t.startswith('по роли') and '|' not in t and val(L, t) is not None
    al = val(L, t) if real else ''; ad = val(D, t) if real else ''
    l0l, l0d = L['surfaceLevel0'], D['surfaceLevel0']
    bl, bd = r['legacy_light'], r['legacy_dark']
    onl = over(al, l0l) if al else ''; ond = over(ad, l0d) if ad else ''
    del_ = dE(over(bl, l0l), onl) if bl and onl else ''
    ded = dE(over(bd, l0d), ond) if bd and ond else ''
    worst = max([x for x in (del_, ded) if x != ''], default=None)
    act, dec = r['action'], r['decision']
    if act == 'Conflict': st = 'Conflict'
    elif act == 'Rebind': st = 'этап 2'
    elif worst is None: st = '—'
    elif worst <= 2.3: st = '='
    elif worst <= 8: st = '≈'
    else: st = 'Δ принято' if dec.startswith('D-') or dec.startswith('WCAG') or dec.startswith('Этап') else 'Δ открыто'
    con = ''
    base = re.sub(r'@\d+$', '', t.split('+layer@')[0])
    if real and base.split('/')[0] in ('text', 'icon') and 'inverse' not in base and 'on-' not in base:
        lim = 3 if base.startswith('icon') or 'disabled' in base else 4.5
        mins = [min(cr(T[camel(base)], bg) for bg in LV(T)) for T in (L, D)]
        con = f"{mins[0]:.1f} / {mins[1]:.1f}" + (' ⚠' if min(mins) < lim and 'disabled' not in base else '')
    row = dict(source=r['source'], legacy=r['legacy_token'], role=r['role'], before_light=bl, before_dark=bd, target=t or '—',
               chain_light=chain(base, 0) if real else '', chain_dark=chain(base, 1) if real else '',
               after_light=al or '', after_dark=ad or '', on_l0_light=onl, on_l0_dark=ond, dE_light=del_, dE_dark=ded,
               action=act, status=st, decision=DEC.get(dec, dec), impact=impact(r['source'], r['legacy_token']),
               min_contrast_L0_L3_light_dark=con, note=r['note'])
    rows.append(row); js.append(row)
with open(R/'docs/migration/foundations-color.csv', 'w', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
json.dump(js, open(R/'build/migration-color.json', 'w'), ensure_ascii=False)
from collections import Counter
print(len(rows), 'rows;', dict(Counter(x['status'] for x in rows)), dict(Counter(x['action'] for x in rows)))
print('contrast ⚠:', [x['target'] for x in rows if '⚠' in x['min_contrast_L0_L3_light_dark']])
