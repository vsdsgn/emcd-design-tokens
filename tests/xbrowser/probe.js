// Runs inside the page. Returns JSON with token resolution across modes.
window.__probe = function () {
  const sheetsText = [];
  const names = new Set();
  const walk = (sheet) => { let rules; try { rules = sheet.cssRules; } catch (e) { return; }
    for (const r of rules) { if (r.styleSheet) walk(r.styleSheet); if (r.cssRules) walk({cssRules: r.cssRules});
      if (r.style) for (const p of r.style) if (p.startsWith('--')) names.add(p); } };
  for (const s of document.styleSheets) walk(s);
  const all = [...names].sort();
  const root = document.documentElement;
  const sels = []; const walkSel = (rules) => { for (const r of rules) { if (r.styleSheet) { try { walkSel(r.styleSheet.cssRules); } catch (e) {} } if (r.cssRules) walkSel(r.cssRules); if (r.selectorText) sels.push(r.selectorText); } };
  for (const sh of document.styleSheets) { try { walkSel(sh.cssRules); } catch (e) {} }
  const found = (a) => [...new Set(sels.flatMap((t) => [...t.matchAll(new RegExp(`\\[data-${a}="([a-z-]+)"\\]`, 'g'))].map((m) => m[1])))];
  const axes = { brand:found('brand'), theme:['dark','light'], platform:['web','mobile-web','ios','android'], style:['base','expressive'] };
  const empty = {}; const snapshot = {};
  for (const b of axes.brand) for (const t of axes.theme) for (const p of axes.platform) for (const s of axes.style) {
    root.dataset.brand=b; root.dataset.theme=t; root.dataset.platform=p; root.dataset.style=s;
    const cs = getComputedStyle(root); const key=[b,t,p,s].join('/');
    const vals = {}; for (const n of all) { const v = cs.getPropertyValue(n).trim(); vals[n]=v; if (v==='') (empty[n] ||= []).push(key); }
    snapshot[key] = vals;
  }
  root.dataset.brand='emcd'; root.dataset.theme='dark'; root.dataset.platform='web'; root.dataset.style='base';
  const v = (el, n) => getComputedStyle(el).getPropertyValue(n).trim();
  const geo = document.getElementById('nested-geo'), light = document.getElementById('nested-light');
  const nested = {
    geoAccent500: v(geo,'--brand-accent-500'), geoPrimaryAction: v(geo,'--action-primary-default'), htmlPrimaryAction: v(root,'--action-primary-default'),
    geoFontText: v(geo,'--brand-font-family-text'), geoRadiusControl: v(geo,'--radius-control'), htmlRadiusControl: v(root,'--radius-control'),
    lightSurface: v(light,'--surface-default'), htmlSurface: v(root,'--surface-default'),
    lightBtnBg: getComputedStyle(light.querySelector('.btn')).backgroundColor,
    geoBtnBg: getComputedStyle(geo.querySelector('.btn')).backgroundColor,
    htmlBtnBg: getComputedStyle(document.querySelector('.card .btn')).backgroundColor,
  };
  const body = getComputedStyle(document.body);
  const misc = { bodyFont: body.fontFamily, bodyFontSize: body.fontSize, htmlFontSize: getComputedStyle(root).fontSize,
    h1Size: getComputedStyle(document.querySelector('h1')).fontSize, layoutColumns: v(root,'--layout-columns'), layoutMargin: v(root,'--layout-margin'),
    supportsBackdrop: CSS.supports('backdrop-filter','blur(1px)'), supportsWebkitBackdrop: CSS.supports('-webkit-backdrop-filter','blur(1px)'),
    supportsDvh: CSS.supports('height','100dvh'), supportsClamp: CSS.supports('width','clamp(1px,2px,3px)'),
    mm: Object.fromEntries(['(prefers-contrast: more)','(prefers-reduced-transparency: reduce)','(prefers-reduced-motion: reduce)','(forced-colors: active)','(prefers-color-scheme: dark)'].map(q=>[q, matchMedia(q).matches])),
    contrast: { subtle: v(root,'--border-subtle'), def: v(root,'--border-default'), strong: v(root,'--border-strong'), ring: v(root,'--border-focus-ring'), focus: v(root,'--border-focus'), tert: v(root,'--text-tertiary'), sec: v(root,'--text-secondary') },
    motion: { feedback: v(root,'--motion-duration-feedback'), press: v(root,'--motion-scale-press') },
    glass: (()=>{ root.dataset.style='expressive'; const g=getComputedStyle(document.querySelector('.glass')); const r={bg:g.backgroundColor, bf:g.backdropFilter||g.webkitBackdropFilter, fill:v(root,'--material-regular-fill'), blur:v(root,'--material-regular-blur')}; root.dataset.style='base'; return r; })(),
    rtSupported: matchMedia('(prefers-reduced-transparency: no-preference)').matches || matchMedia('(prefers-reduced-transparency: reduce)').matches,
    fontsLoaded: [...document.fonts].map(f=>f.family+':'+f.status),
    fontCheck: ['Roobert PRO','PP Neue Montreal','IBM Plex Sans'].map(f=>f+':'+document.fonts.check(`16px "${f}"`)),
  };
  return { ua: navigator.userAgent, count: all.length, empty, nested, misc, snapshot };
};
