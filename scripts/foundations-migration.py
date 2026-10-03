#!/usr/bin/env python3
"""Пересобирает таблицы миграции Foundations из текущего build.
docs/migration/foundations-color.csv  — legacy-токен → DS 2.0 (значения сейчас, ΔE, контраст)
docs/migration/foundations-ramps.csv  — примитивы: было (до OKLCH) → стало
Запуск: python3 scripts/foundations-migration.py"""
import csv, json, math, re, subprocess, io
R = __import__('pathlib').Path(__file__).resolve().parent.parent
D = json.load(open(R/'build/json/emcd.dark.json')); L = json.load(open(R/'build/json/emcd.light.json'))
camel = lambda t: re.sub(r'[/-](\w)', lambda m: m.group(1).upper(), t.strip())
def lin(c): c/=255; return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def parse(h):
    h=h.strip()
    m=re.match(r'#([0-9a-fA-F]{3,8})(?:\s*(\d+)%)?',h)
    if not m: return None
    x=m.group(1)
    if len(x)==3: x=''.join(c*2 for c in x)
    return '#'+x[:6].lower()
def oklab(h):
    r,g,b=[lin(int(h[i:i+2],16)) for i in (1,3,5)]
    l=(0.4122214708*r+0.5363325363*g+0.0514459929*b)**(1/3); m=(0.2119034982*r+0.6806995451*g+0.1073969566*b)**(1/3); s=(0.0883024619*r+0.2817188376*g+0.6299787005*b)**(1/3)
    return (0.2104542553*l+0.7936177850*m-0.0040720468*s, 1.9779984951*l-2.4285922050*m+0.4505937099*s, 0.0259040371*l+0.7827717662*m-0.8086757660*s)
def lab(h):
    r,g,b=[lin(int(h[i:i+2],16)) for i in (1,3,5)]
    X=(0.4124*r+0.3576*g+0.1805*b)/0.95047; Yv=0.2126*r+0.7152*g+0.0722*b; Z=(0.0193*r+0.1192*g+0.9505*b)/1.08883
    f=lambda t: t**(1/3) if t>0.008856 else 7.787*t+16/116
    return (116*f(Yv)-16, 500*(f(X)-f(Yv)), 200*(f(Yv)-f(Z)))
def dE(a,b):  # CIELAB ΔE76: ≤2.3 незаметно, ≤8 близко, >8 другой цвет
    if not a or not b: return None
    return round(math.dist(lab(a),lab(b)),1)
def Y(h): r,g,b=[lin(int(h[i:i+2],16)) for i in (1,3,5)]; return .2126*r+.7152*g+.0722*b
def cr(a,b): a,b=sorted((Y(a),Y(b)),reverse=True); return round((a+.05)/(b+.05),1)
def status(d): return '' if d is None else ('=' if d<=2.3 else '≈' if d<=8 else 'Δ')
rows=list(csv.DictReader(open(R/'docs/color-migration.csv')))
out=[]
for r in rows:
    toks=[t.strip() for t in r['ds2_token'].split('·')]
    tok=toks[0]
    k=camel(tok); dv=D.get(camel(toks[-1])); lv=L.get(k)
    alpha=('%' in r['legacy_value']) or (dv and len(dv)>7)
    parts=[p for p in re.split(r'\s*/\s*(?=#)|\s*·\s*(?=#)', r['legacy_value'])]
    if r['source']=='Site' and len(parts)==2 and len(toks)==1: leg_l,leg_d=parse(parts[0]),parse(parts[1])
    elif len(toks)==2 and len(parts)==2: leg_l,leg_d=parse(parts[0]),parse(parts[1]); lv=D.get(k)
    else: leg_l,leg_d=None,parse(parts[0])
    dd=dE(leg_d,parse(dv) if dv else None); dl=dE(leg_l,parse(lv) if lv else None)
    worst=max([x for x in (dd,dl) if x is not None], default=None)
    con=''; why=''
    if tok.startswith(('text/','icon/')) and dv and lv and '@' not in dv:
        con=f"{cr(parse(lv),L['bgBase'])} / {cr(parse(dv),D['bgBase'])}"
        lim=3 if tok.startswith('icon/') else 4.5
        for leg,new,bg in ((leg_l,lv,L['bgBase']),(leg_d,dv,D['bgBase'])):
            if leg and cr(leg,bg)<lim<=cr(parse(new),bg) and 'disabled' not in tok: why=f"контраст до AA (было {cr(leg,bg)}:1)"
    note=r['note'] if '#' not in r['note'] else ''
    if not note and why: note=why
    out.append(dict(source=r['source'],legacy_token=r['legacy_token'],legacy_light=leg_l or '',legacy_dark=leg_d or '',
        ds2_token=r['ds2_token'],ds2_light=lv or ('—' if not dv else ''),ds2_dark=dv or 'НЕТ ТОКЕНА',
        dE_light='' if dl is None else dl,dE_dark='' if dd is None else dd,status=('≈α' if alpha else status(worst)),
        contrast_on_bg_light_dark=con,note=note))
with open(R/'docs/migration/foundations-color.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(out[0])); w.writeheader(); w.writerows(out)
# primitives before/after OKLCH
old=json.loads(subprocess.check_output(['git','show','a1ce688:tokens/primitives/color.json'],cwd=R))
new=json.load(open(R/'tokens/primitives/color.json'))
def flat(d,p=''):
    for k,v in d.items():
        if isinstance(v,dict) and '$value' in v: yield p+k, v['$value']
        elif isinstance(v,dict): yield from flat(v,p+k+'/')
o=dict(flat(old)); n=dict(flat(new)); rr=[]
for k in n:
    if not isinstance(n[k],str) or not n[k].startswith('#'): continue
    a=o.get(k); d=dE(parse(a),parse(n[k])) if a and a.startswith('#') else None
    rr.append(dict(token=k,before=a or 'новый',after=n[k],dE=d if d is not None else '',status='новый' if not a else status(d),
        L_oklch=round(oklab(parse(n[k]))[0]*100)))
with open(R/'docs/migration/foundations-ramps.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rr[0])); w.writeheader(); w.writerows(rr)
print(len(out),'color rows;',sum(1 for x in out if x['status']=='Δ'),'Δ;',sum(1 for x in out if x['ds2_dark']=='НЕТ ТОКЕНА'),'missing;',len(rr),'primitive rows;',sum(1 for x in rr if x['status']=='Δ'),'changed')
