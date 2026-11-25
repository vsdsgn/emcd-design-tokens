// Шаг 1б в общем файле: замена legacy-компонентов (DS Web / DS App) и иконок на DS 2.0. ARGS: {page, from, to, dry, only:'comp'|'icon'}.
const svc = figma.root.children.find((p) => p.name === '⚑ Скрипты миграции'); await svc.loadAsync();
const AF = Object.getPrototypeOf(async function () {}).constructor; const T = (n) => svc.children.find((x) => x.name === n).characters;
const CW = new AF('ARGS', T('⚑ builder · component-swap')), IW = new AF('ARGS', T('⚑ builder · icon-swap')); const data = JSON.parse(T('⚑ data · icon-map'));
const page = await figma.getNodeByIdAsync(ARGS.page); await page.loadAsync();
const rows = page.children.filter((n) => n.type === 'FRAME' && n.name.startsWith('⟶')).sort((a, b) => a.y - b.y).slice(ARGS.from || 0, (ARGS.to ?? 99) + 1);
const out = { comp: {}, icons: 0, miss: {}, skipped: {}, err: [], screens: 0 };
for (const row of rows) for (const s of row.children.filter((c) => c.type === 'FRAME')) {
  if (ARGS.only !== 'icon') { try { const r = await CW({ src: s.id, dry: !!ARGS.dry }); for (const [k, v] of Object.entries(r.swapped || {})) out.comp[k] = (out.comp[k] || 0) + v; for (const [k, v] of Object.entries(r.skipped || {})) out.skipped[k] = (out.skipped[k] || 0) + v; } catch (e) { out.err.push(s.name + ': ' + String(e).slice(0, 80)); } }
  if (ARGS.only !== 'comp') { try { const r = await IW({ src: s.id, data, dry: !!ARGS.dry }); out.icons += r.swapped || 0; for (const [k, v] of (Array.isArray(r.miss) ? r.miss : Object.entries(r.miss || {}))) out.miss[k] = (out.miss[k] || 0) + v; } catch (e) { out.err.push(s.name + ' (icons): ' + String(e).slice(0, 80)); } }
  out.screens++; }
const top = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 15); out.miss = top(out.miss); out.skipped = top(out.skipped); out.rows = rows.map((r) => r.name); out.err = out.err.slice(0, 5); return out;
