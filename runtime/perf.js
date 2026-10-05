/*! EMCD DS 2.0 — perf guard. Put inline (or as a blocking <script>) in <head>, before the token CSS.
 * Sets <html data-perf="low"> → tokens drop to Base (no glass, blur, light) — docs/performance.md.
 * 1. Before first paint, from what the browser reports (Chromium mostly): Save-Data, slow connection (2G/3G),
 *    little memory, prefers-reduced-data.
 * 2. While the user scrolls, from real frame times (all browsers, incl. Safari/Firefox): if too many frames
 *    are slow with Expressive on, switch to low and remember it on this device for 7 days.
 * Never overrides a choice made by the product: data-perf already on <html>, or a user setting saved via
 * emcdPerf.set('low' | 'high' | 'auto'). */
(function () {
  var KEY = 'emcd-ds-perf', DAY = 864e5, root = document.documentElement;
  var T = { slowFrameMs: 25, slowShare: 0.3, sampleFrames: 90, sampleMs: 1500, minFrames: 5, memLow: 2, memMid: 4, coresMid: 4 };
  function read() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function apply(level, reason) {
    if (level === 'low') root.setAttribute('data-perf', 'low'); else root.removeAttribute('data-perf');
    root.setAttribute('data-perf-reason', reason);
  }
  var api = window.emcdPerf = {
    thresholds: T,
    // User setting («Упрощённое оформление»): 'low' | 'high' | 'auto'.
    set: function (level) { if (level === 'auto') { save(null); detect(); } else { save({ level: level, by: 'user' }); apply(level, 'user'); } },
    reason: function () { return root.getAttribute('data-perf-reason'); }
  };
  if (root.hasAttribute('data-perf') && !root.hasAttribute('data-perf-reason')) return; // product decided

  function staticSignals() {
    var c = navigator.connection || {}, mem = navigator.deviceMemory, cores = navigator.hardwareConcurrency;
    if (c.saveData) return 'save-data';
    if (/^(slow-2g|2g|3g)$/.test(c.effectiveType || '')) return 'network-' + c.effectiveType;
    if (window.matchMedia && matchMedia('(prefers-reduced-data: reduce)').matches) return 'reduced-data';
    if (mem && mem <= T.memLow) return 'memory-' + mem;
    if (mem && cores && mem <= T.memMid && cores <= T.coresMid) return 'device-' + mem + 'gb-' + cores + 'cores';
    return null;
  }
  function detect() {
    var s = read();
    if (s && s.by === 'user') return apply(s.level, 'user');
    if (s && s.by === 'frames' && Date.now() - s.at < 7 * DAY) return apply('low', 'frames-saved');
    var r = staticSignals();
    if (r) return apply('low', r);
    apply('high', 'auto');
    watchFrames();
  }
  // Frame probe: only meaningful when decor is on (Expressive) — measures during the first real scroll.
  var watching = false;
  function watchFrames() {
    if (watching || !window.requestAnimationFrame) return; watching = true;
    var frames = [], last = 0, active = false, idle, total = 0;
    function tick(t) {
      if (last) { frames.push(t - last); total += t - last; } last = t;
      if (frames.length >= T.sampleFrames || (total >= T.sampleMs && frames.length >= T.minFrames)) return finish();
      if (active) requestAnimationFrame(tick); else last = 0;
    }
    function onScroll() {
      if (!/expressive/.test(root.getAttribute('data-style') || '')) return;
      clearTimeout(idle); idle = setTimeout(function () { active = false; }, 150);
      if (!active) { active = true; requestAnimationFrame(tick); }
    }
    function finish() {
      removeEventListener('scroll', onScroll, true);
      var slow = frames.filter(function (d) { return d > T.slowFrameMs; }).length / frames.length;
      if (slow >= T.slowShare) { save({ level: 'low', by: 'frames', at: Date.now(), slow: Math.round(slow * 100) }); apply('low', 'frames-' + Math.round(slow * 100) + '%'); }
    }
    // Start 1 s after load so page start-up work (hydration, images) isn't blamed on the decor.
    function arm() { setTimeout(function () { addEventListener('scroll', onScroll, { passive: true, capture: true }); }, 1000); }
    if (document.readyState === 'complete') arm(); else addEventListener('load', arm);
  }
  detect();
  var c = navigator.connection;
  if (c && c.addEventListener) c.addEventListener('change', function () { var s = read(); if (!(s && (s.by === 'user' || s.by === 'frames'))) { var r = staticSignals(); r ? apply('low', r) : root.getAttribute('data-perf-reason') && /^network|save-data/.test(api.reason()) && apply('high', 'auto'); } });
})();
