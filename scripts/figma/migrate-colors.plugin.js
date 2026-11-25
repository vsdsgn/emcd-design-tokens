// Шаг 1 на странице продукта в общем файле «🟣 Migration — все продукты» (25.11): режимы DS 2.0 + перекраска + сырые hex.
// ARGS: {page:<id страницы>, from:0, to:99 (индексы рядов «⟶ …»), dry:false}. Скрипты — текстом на странице «⚑ Скрипты миграции»:
figma.skipInvisibleInstanceChildren = false; // иначе пропускаются слои внутри экземпляров
// «⚑ builder · color-swap» (build/figma/color-swap.js без строки ARGS), «⚑ builder · raw-hex».
// Режимы по продукту (имя страницы): Theme, Brand, платформа мобильных экранов (App-продукты — iOS, веб — Mobile web); Viewport по ширине.
const P = { 'WL B2B': ['Light', 'WL Default', 'Mobile web'], 'WL B2C': ['Dark', 'WL Default', 'Mobile web'], 'Geometria App': ['Light', 'Geometria', 'iOS'], 'Geometria Web': ['Light', 'Geometria', 'Mobile web'],
  'Mining US': ['Dark', 'EMCD', 'Mobile web'], 'Firmware': ['Dark', 'EMCD', 'Mobile web'], 'Monitoring': ['Dark', 'EMCD', 'Mobile web'], 'Mining Web': ['Dark', 'EMCD', 'Mobile web'], 'Mining App': ['Dark', 'EMCD', 'iOS'] };
const K = { Theme: 'cd4fee58fdf4723373f97604b533f8999d92859e', Brand: 'b85deb13e64f21375abf15c2fcbe71ce5aa0b6ee', Platform: '1fb5ec61ff4af747948e5b6387abd05a6867231f', Viewport: 'ef9ba305f27a7888be555ebfbad5c7a913a42476', Style: '82f65c9085eeb479c014f6c10b9f0a23dd235a37' };
const C = {}; for (const [n, k] of Object.entries(K)) { let v = null; for (let i = 0; i < 4 && !v; i++) { try { v = await figma.variables.importVariableByKeyAsync(k); } catch (e) {} } C[n] = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); }
const md = (n, name) => C[n].modes.find((m) => m.name === name).modeId;
const page = await figma.getNodeByIdAsync(ARGS.page); await page.loadAsync(); const cfg = P[page.name]; if (!cfg) return { error: 'нет настроек для страницы ' + page.name };
const svc = figma.root.children.find((p) => p.name === '⚑ Скрипты миграции'); await svc.loadAsync();
const AF = Object.getPrototypeOf(async function () {}).constructor;
const CS = new AF('ARGS', svc.children.find((n) => n.name === '⚑ builder · color-swap').characters), RH = new AF('ARGS', svc.children.find((n) => n.name === '⚑ builder · raw-hex').characters);
const rows = page.children.filter((n) => n.type === 'FRAME' && n.name.startsWith('⟶')).sort((a, b) => a.y - b.y).slice(ARGS.from || 0, (ARGS.to ?? 99) + 1);
const out = { swapped: 0, raw: 0, kept: 0, screens: 0, unmapped: {} };
for (const row of rows) for (const s of row.children.filter((c) => c.type === 'FRAME')) {
  const w = s.width, mob = w <= 460, app = mob && (cfg[2] === 'iOS' || /App/.test(row.name));
  if (!ARGS.dry) { s.setExplicitVariableModeForCollection(C.Theme, md('Theme', cfg[0])); s.setExplicitVariableModeForCollection(C.Brand, md('Brand', cfg[1])); s.setExplicitVariableModeForCollection(C.Style, md('Style', 'Base'));
    s.setExplicitVariableModeForCollection(C.Platform, md('Platform', mob ? (app ? 'iOS' : 'Mobile web') : 'Web')); s.setExplicitVariableModeForCollection(C.Viewport, md('Viewport', mob ? 'Compact' : w >= 1800 ? 'XLarge' : w >= 1200 ? 'Large' : 'Expanded')); }
  const r = await CS({ src: s.id, dry: !!ARGS.dry, theme: cfg[0] }); out.swapped += r.swapped; out.kept += r.keptSaturated || 0; for (const [k, v] of Object.entries(r.unmapped || {})) out.unmapped[k] = (out.unmapped[k] || 0) + v;
  if (cfg[0] === 'Dark' && !ARGS.dry) { const h = await RH({ src: s.id }); out.raw += h.bound; }
  out.screens++; }
out.unmapped = Object.entries(out.unmapped).sort((a, b) => b[1] - a[1]).slice(0, 12); out.rows = rows.map((r) => r.name); return out;
