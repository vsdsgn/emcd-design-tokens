/* Демо K4: 15 экранов майнинга из компонентов репо (window.EMCD — claude-ds/bundle/bundle.js, React 18 UMD из vendor/).
   Каркас — flex / grid и токены отступов (patterns.md 0.0: Web 40 / 32 / 24 / 16; мобильный веб 16 / 12 / 24). Каждый видимый элемент UI — компонент DS;
   свои узлы — только раскладка (demo.css) и подписи-тексты на токенах типографики. Тексты и числа — как на макетах Figma (reference/*.png). */
(function () {
  'use strict';
  var h = React.createElement;
  var E = window.EMCD;
  var screen = document.body.getAttribute('data-screen');
  var F = React.Fragment;
  var div = function (cls) { var kids = [].slice.call(arguments, 1); return h.apply(null, ['div', { className: cls }].concat(kids)); };
  var text = function (cls, t) { return h('span', { className: cls }, t); };
  // Загрузка (patterns 3.11a): ?state=loading — каркас (Sidebar / Top bar, табы, меню экрана, Action bar) живой, данные — State=Skeleton компонентов той же высоты;
  // текст без своего Skeleton — кирпич Skeleton по ширине ожидаемого текста; Stat card — Tone=Neutral, Amount — Sign=None
  var LOADING = new URLSearchParams(location.search).get('state') === 'loading';
  var sk = function (w, shape) { return h(E.Skeleton, { shape: shape, width: w }); };
  // значение факта: в загрузке — кирпич в той же строке текста (высота строки сохраняется)
  var val = function (cls, t, w) { return text(cls, LOADING ? sk(w) : t); };

  // ───────── данные с макетов ─────────
  var HASH = [14.6, 16.1, 15.2, 18.9, 17.6, 13.1, 18.3, 16.9, 17.2, 14.8, 16.2, 15.1, 11.0, 11.3, 10.1, 10.5, 7.9, 7.6, 9.4, 12.1, 7.8, 10.6, 9.3, 7.0, 10.8, 10.6, 9.1, 11.6, 8.8, 11.7, 11.3, 9.6, 12.4, 10.6, 11.1, 14.4, 13.1, 16.6, 15.7, 14.6, 13.5, 12.0, 17.6, 17.3, 17.1, 14.3, 16.8, 12.5, 12.9, 15.6, 13.7, 15.4, 15.0, 12.4, 13.9, 11.9, 11.4, 12.2, 11.9, 12.8, 13.4, 13.0, 11.6, 12.4, 11.5, 10.5, 11.2, 10.0, 10.9];
  // Реджекты — столбец примерно на каждую вторую точку: высокие ~0.45, средние ~0.25, низкие ~0.1 (как на макете, ось 0–2.0)
  var REJ = HASH.map(function (_, i) { if (i % 2) return 0; var k = (i / 2) % 3; return k === 0 ? 0.22 + ((i * 7) % 4) / 40 : k === 1 ? 0.45 + ((i * 3) % 3) / 40 : 0.08 + ((i * 5) % 3) / 40; });
  var HOURS = HASH.map(function (_, i) { var m = Math.round(i * 24 * 60 / HASH.length); var hh = Math.floor(m / 60); return (hh < 10 ? '0' : '') + hh + ':00'; });
  // Hover графика: шапка тултипа — дата и время точки
  var TIMES = HASH.map(function (_, i) { var m = Math.round(i * 24 * 60 / HASH.length); var hh = Math.floor(m / 60); var mm = m % 60; return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm; });
  var DATES = HASH.map(function () { return '20.09.2025'; });
  var PERIODS = [{ value: '1d', label: '1 день' }, { value: '7d', label: '7 дней' }, { value: '30d', label: '30 дней' }];
  var METRICS = [
    { label: 'Текущий хешрейт', value: '30.15', unit: 'TH/s', icon: true },
    { label: 'Хешрейт за 1 день', value: '24.47', unit: 'TH/s', icon: true },
    { label: 'Реджекты за 1 день', value: '5.05', unit: '%' }];
  var LEGEND = [{ label: 'Хешрейт, TH/s', series: 1 }, { label: 'Реджекты, %', series: 4 }];
  var fmt = function (v, axis) { return axis === 'right' ? (v === 0 ? '0' : v.toFixed(1)) : String(v); };
  var WORKERS = [
    { id: 1, name: 'worker-1', tone: 'success', cur: '10.45', h1: '10.24', h24: '9.68', rej: '1.25' },
    { id: 2, name: 'worker-2', tone: 'success', cur: '8.00', h1: '8.60', h24: '8.75', rej: '1.20' },
    { id: 3, name: 'worker-3', tone: 'warning', cur: '10.11', h1: '9.88', h24: '10.60', rej: '1.20' },
    { id: 4, name: 'worker-4', tone: 'danger', cur: '0', h1: '0', h24: '0', rej: '2' }];
  var SUMMARY = [
    { label: 'Добыто за 20.09', value: '0.0029123', fiat: '≈ $0.00013' },
    { label: 'Прогноз на сегодня', value: '0.0029124', fiat: '≈ $0.00014' },
    { label: 'Сумма к выплате', value: '0.0039123', fiat: '≈ $0.00018' }];
  var KAS_OPTIONS = [{ value: 'kas', label: 'KAS', coin: 'kas' }, { value: 'btc', label: 'BTC', coin: 'btc' }];

  // ───────── общие блоки ─────────
  // Две строки ячейки — разметка Table cell (primary + secondary), когда ячейку собирает Table по columns.render
  var twoLines = function (p, s) { return h(F, null, h('span', { className: 'emcd-td__primary' }, p), h('span', { className: 'emcd-td__secondary' }, s)); };
  var amt = function (v, unit) { return h(E.Amount, { size: 'm', value: v, ticker: unit }); };

  function WebShell(props) {
    var tab = props.tab;
    return div('demo-web',
      h(E.Sidebar, {
        className: 'demo-web__sidebar', logo: text('demo-logo', 'EMCD'), language: 'RU', onCollapsedChange: function () {},
        items: [
          { label: 'Активы', icon: 'wallet', href: '#' }, { label: 'Криптокарта', icon: 'card', href: '#' },
          { label: 'Майнинг', icon: 'mining-coin', href: '#', selected: true }, { label: 'Торговля', icon: 'trend-up', href: '#' },
          { label: 'P2P', icon: 'exchange', href: '#', badge: true, badgeLabel: '0% Комиссия' },
          { label: 'Coinhold', icon: 'coinhold-coins', href: '#', badge: true, badgeLabel: '14% APY' },
          { label: 'Стейкинг', icon: 'percentage', href: '#', badge: true, badgeLabel: 'Новое', badgeTone: 'accent' },
          { label: 'Indesk', icon: 'suitcase', href: '#' }, { label: 'OnLock', icon: 'lock', href: '#' }],
        promo: h(E.PromoCard, { size: 's', title: '14% ты получил бы, если бы открыл Coinhold год назад', showMedia: true, showClose: false }),
        account: { name: 'Alexandrewang', link: 'Профиль' } }),
      h('main', { className: 'demo-web__main' },
        div('demo-web__header',
          h(E.Tabs, { size: 'page', label: 'Разделы майнинга', defaultValue: tab, className: 'demo-web__tabs',
            items: ['Дашборд', 'Воркеры', 'История', 'Настройки', 'Калькулятор', 'Watcher-link'].map(function (l) { return { value: l, label: l }; }) }),
          h(E.Button, { type: 'text', size: 'l', label: 'Подключить', iconLeft: h(E.Icon, { name: 'plus' }), className: 'demo-web__action' })),
        h('div', { className: 'demo-web__content', 'aria-busy': LOADING || undefined }, props.children)));
  }

  function MwShell(props) {
    return div('demo-mw',
      h(E.TopBar, { account: 'Alexandrewang', balance: '$123 456', cents: '.78' }),
      h(E.Tabs, { size: 'm', label: 'Разделы майнинга', defaultValue: props.tab, className: 'demo-mw__tabs',
        items: ['Дашборд', 'Воркеры', 'История', 'Настройки', 'Калькулятор', 'Watcher-link'].map(function (l) { return { value: l, label: l }; }) }),
      h('div', { className: 'demo-mw__content', 'aria-busy': LOADING || undefined }, props.children),
      props.bar);
  }

  function coinSelect(coins, label, more, size, stack) {
    return h(E.Select, { size: size || 'm', className: 'demo-coin-select', 'aria-label': 'Монета', defaultValue: 'all',
      leading: h(E.CoinStack, { coins: coins, size: stack || 's', count: more ? coins.length - 1 : coins.length, more: more }),
      options: [{ value: 'all', label: label }, { value: 'one', label: coins[0].toUpperCase() }] });
  }

  function chartCard(compact) {
    return h(E.ChartCard, {
      label: 'Хешрейт', className: compact ? 'demo-chart demo-chart--mw' : 'demo-chart',
      // периоды — меню (живые); показатели и легенда — Skeleton; график — Chart plot State=Skeleton (Line + Bars как Line)
      metrics: LOADING ? METRICS.map(function (m) { return { label: m.label, skeleton: true }; }) : METRICS,
      periods: PERIODS, periodSize: 'm', legend: LEGEND.map(function (l) { return LOADING ? { label: l.label, series: l.series, skeleton: true } : l; }), showBottom: false },
    h(E.ChartPlot, { type: 'line-bars', state: LOADING ? 'skeleton' : 'default', labels: HOURS, dates: DATES, times: TIMES, xTicks: compact ? 3 : 6,
      series: [{ name: 'Хешрейт', data: HASH, unit: 'TH/s', format: function (v) { return v.toFixed(2) + ' TH/s'; } }, { name: 'Реджекты', data: REJ, format: function (v) { return v.toFixed(2) + ' %'; } }],
      yLeft: { ticks: [0, 5, 10, 15, 20] }, yRight: { ticks: [0, 0.5, 1, 1.5, 2] }, format: fmt, height: compact ? 160 : 200, label: 'Хешрейт и реджекты за 1 день' }));
  }

  // ───────── Web ─────────
  function WebDashboard() {
    return h(WebShell, { tab: 'Дашборд' },
      div('demo-menu', coinSelect(['kas', 'eth'], 'KAS + 1')),
      div('demo-blocks',
        h(E.Card, { padding: 'l', className: 'demo-summary' },
          div('demo-summary__row',
            SUMMARY.map(function (s, i) {
              // как на макете: «Добыто» и «Прогноз» — пара, «Сумма к выплате» отделена разделителем
              return h(F, { key: i }, i === 2 && h(E.Divider, { orientation: 'vertical' }),
                div('demo-stat', text('demo-caption', s.label), h(E.Amount, { size: 'l', value: s.value, ticker: 'KAS', fiat: s.fiat, skeleton: LOADING })));
            }),
            h(E.SelectCompact, { label: 'Монета выплаты', options: KAS_OPTIONS, className: 'demo-summary__coin' })),
          h(E.Card, { level: 2, radius: 'inner', border: false, className: 'demo-facts' },
            div('demo-facts__row',
              div('demo-fact', h(E.Coin, { coin: 'kas', size: 's', skeleton: LOADING }), text('demo-fact__key', 'KAS'), val('demo-fact__val', '$0.07', 40), val('demo-delta demo-delta--down', '−3.61 %', 48)),
              div('demo-fact', text('demo-fact__key', 'Дневной доход'), val('demo-fact__val', '0.2243 KAS', 80), text('demo-fact__key', 'за 1 TH/s')),
              div('demo-fact', text('demo-fact__key', 'Сложность сети'), val('demo-fact__val', '61.18 P', 56), val('demo-delta demo-delta--up', '+0.23 %', 48),
                h(E.IconButton, { type: 'ghost', size: 's', label: 'Открыть в эксплорере', icon: h(E.Icon, { name: 'arrow-new-tab' }) })),
              div('demo-fact', text('demo-fact__key', 'Блоков до пересчёта'), val('demo-fact__val', '248', 32), val('demo-fact__key', '~1 д 11 ч 3 м', 88))))),
        div('demo-chart-row', chartCard(false), h(E.StatusSummary, { layout: 'column', offline: 9, unstable: 1, active: 40, skeleton: LOADING, className: 'demo-chart-row__summary' }))));
  }

  function WebWorkers() {
    var cols = [
      { key: 'name', label: 'Имя и статус', sortable: true, width: '19%', render: function (r) { return h(E.Status, { size: 'm', tone: r.tone, label: r.name }); } },
      { key: 'cur', label: 'Текущий хешрейт', sortable: true, width: '17%', render: function (r) { return amt(r.cur, 'TH/s'); } },
      { key: 'h1', label: 'Ср. хешрейт · 1 ч', sortable: true, width: '17%', render: function (r) { return amt(r.h1, 'TH/s'); } },
      { key: 'h24', label: 'Ср. хешрейт · 24 ч', sortable: true, width: '17%', render: function (r) { return amt(r.h24, 'TH/s'); } },
      { key: 'rej', label: 'Реджекты · 24 ч', sortable: true, width: '17%', render: function (r) { return amt(r.rej, '%'); } },
      { key: 'act', label: '', align: 'end', render: function () {
        return div('demo-row-actions',
          h(E.IconButton, { type: 'tertiary', size: 's', label: 'Действия', icon: h(E.Icon, { name: 'more-horizontal' }) }),
          h(E.IconButton, { type: 'tertiary', size: 's', label: 'График', icon: h(E.Icon, { name: 'chart-bar' }) })); } }];
    return h(WebShell, { tab: 'Воркеры' },
      div('demo-menu demo-menu--split', coinSelect(['btc', 'eth'], 'Bitcoin +1'),
        h(E.Segmented, { size: 'm', label: 'Вид', items: [{ value: 'list', label: 'Список' }, { value: 'groups', label: 'Группы' }] })),
      div('demo-blocks',
        h(E.Card, { padding: 'l', className: 'demo-hashbar' },
          div('demo-hashbar__row',
            h(E.ChartMetric, { label: 'Текущий хешрейт', value: '535.15', unit: 'TH/s' }), h(E.Divider, { orientation: 'vertical' }),
            h(E.ChartMetric, { label: 'Средний за 24 часа', value: '628.22', unit: 'TH/s' }), h(E.Divider, { orientation: 'vertical' }),
            h(E.ChartMetric, { label: 'Реджекты за 24 часа', value: '1.16', unit: '%' }),
            h(E.Button, { type: 'tertiary', size: 'm', label: 'Выгрузить отчёт', iconLeft: h(E.Icon, { name: 'file-excel' }), className: 'demo-push' }))),
        h(E.Card, { padding: 'l', className: 'demo-list-card' },
          div('demo-tabs-row',
            h(E.Tabs, { size: 'l', label: 'Статус воркеров', className: 'demo-grow', items: [
              { value: 'all', label: 'Все воркеры', counter: 4 },
              { value: 'on', label: 'Активные', counter: 2, statusDot: true, statusTone: 'success' },
              { value: 'unst', label: 'Нестабильные', counter: 1, statusDot: true, statusTone: 'warning' },
              { value: 'off', label: 'Отключённые', counter: 1, statusDot: true, statusTone: 'danger' }] }),
            h(E.Button, { type: 'text', size: 'l', label: 'Создать группу', iconLeft: h(E.Icon, { name: 'folder-add' }) })),
          h(E.Search, { size: 'm', text: 'Поиск воркеров' }),
          h(E.Table, { label: 'Воркеры', density: 'regular', columns: cols, rows: WORKERS, defaultSort: { key: 'name', dir: 'descending' } }))));
  }

  var HISTORY = [
    ['12 окт 2025', '10:37', 'ltc', '0.00143210', 'LTC', '≈ $64.05', 'PPS+', '29.25 MH/s'],
    ['12 сен 2025', '10:32', 'ltc', '0.00139567', 'LTC', '≈ $62.89', 'PPS+', '29.25 MH/s'],
    ['12 авг 2025', '10:28', 'ltc', '0.00135678', 'LTC', '≈ $61.75', 'PPS+', '29.25 MH/s'],
    ['12 июл 2025', '10:24', 'ltc', '0.00132549', 'LTC', '≈ $60.15', 'PPS+', '29.25 MH/s'],
    ['12 май 2025', '10:16', 'doge', '0.00127012', 'DOGE', '≈ $57.87', 'PPLNS', '25.00 MH/s']].map(function (r, i) {
    return { id: i, date: r[0], time: r[1], coin: r[2], value: r[3], ticker: r[4], fiat: r[5], type: r[6], hash: r[7] };
  });
  function WebHistory() {
    var cols = [
      { key: 'date', label: 'Дата и время', width: '24%', render: function (r) { return twoLines(r.date, r.time); } },
      { key: 'value', label: 'Сумма', width: '24%', render: function (r) { return div('demo-amount-cell', h(E.Coin, { coin: r.coin, size: 's' }), h(E.Amount, { size: 'm', value: r.value, ticker: r.ticker, fiat: r.fiat })); } },
      { key: 'type', label: 'Тип', width: '22%', render: function (r) { return text('demo-two__p', r.type); } },
      { key: 'hash', label: 'Ср. хешрейт', render: function (r) { return text('demo-two__p', r.hash); } },
      { key: 'more', label: '', align: 'end', width: 56, render: function () { return h(E.IconButton, { type: 'tertiary', size: 'xs', label: 'Подробнее', icon: h(E.Icon, { name: 'chevron-down' }) }); } }];
    var coinRow = function (coin, val, fiat) {
      return h(E.ListItem, { size: 'm', inset: false, showDescription: false, leading: h(E.Coin, { coin: coin, size: 'm' }), label: val, trailing: text('demo-muted', fiat) });
    };
    return h(WebShell, { tab: 'История' },
      div('demo-menu demo-menu--split', coinSelect(['ltc', 'eth', 'x'], 'Litecoin + 6', '6'),
        h(E.Segmented, { size: 'm', label: 'Вид истории', className: 'demo-seg-wide', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] })),
      div('demo-blocks',
        div('demo-filters',
          h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Монеты', options: [{ value: 'all', label: 'Все монеты' }, { value: 'ltc', label: 'LTC' }, { value: 'doge', label: 'DOGE' }], defaultValue: 'all', className: 'demo-filters__net' }),
          h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Тип начислений', options: [{ value: 'all', label: 'Все начисления' }, { value: 'pps', label: 'PPS+' }, { value: 'pplns', label: 'PPLNS' }], defaultValue: 'all', className: 'demo-filters__net' }),
          h(E.DateRangeField, { label: 'Период', className: 'demo-filters__period', panel: { isDateDisabled: function (d) { return d > new Date().toISOString().slice(0, 10); } } }),
          h(E.Button, { type: 'tertiary', size: 'm', label: 'Выгрузить', iconLeft: h(E.Icon, { name: 'file-excel' }), className: 'demo-filters__btn' })),
        div('demo-history',
          h(E.Card, { padding: 'm', className: 'demo-history__total' },
            h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Начисления ежедневно с 15:00 до 16:00', primaryAction: false, close: false }),
            div('demo-total', h(E.Amount, { size: 'l', value: '$12 457.89' }), text('demo-caption demo-caption--md', 'Всего начислено')),
            h(E.Divider, null),
            div('demo-group', text('demo-caption demo-caption--md', 'PPS+'), div('emcd-list', coinRow('ltc', '8.9012 LTC', '≈ $78.90'))),
            div('demo-group', text('demo-caption demo-caption--md', 'PPLNS'),
              div('emcd-list', coinRow('doge', '9.0123 DOGE', '≈ $34.56'), coinRow('bel', '123.4567 BEL', '≈ $90.12'), coinRow('lky', '67.8901 LKY', '≈ $89.01'), coinRow('pep', '789.0123 PEP', '≈ $45.67')))),
          h(E.Card, { padding: 'm', className: 'demo-history__table' },
            h(E.Table, { label: 'Начисления', density: 'regular', columns: cols, rows: HISTORY })))));
  }

  // ───────── мобильный веб ─────────
  function MwDashboard() {
    return h(MwShell, { tab: 'Дашборд' },
      coinSelect(['kas', 'eth'], 'KAS + 1', null, 'l', 'm'),
      div('demo-mw-actions',
        h(E.Button, { type: 'tertiary', size: 'l', label: 'Подключить', iconLeft: h(E.Icon, { name: 'plus' }), className: 'demo-grow' }),
        h(E.IconButton, { type: 'tertiary', size: 'l', label: 'Помощь', icon: h(E.Icon, { name: 'question' }) }),
        h(E.IconButton, { type: 'tertiary', size: 'l', label: 'Telegram-бот', icon: h(E.Icon, { name: 'send' }) })),
      h(E.PromoCard, { size: 'm', tone: 'accent', align: 'center', showBadge: true, title: 'Мониторинг', description: 'Следи за площадками, оборудованием и процессами в одном месте', actionLabel: 'Перейти к Мониторингу' }),
      h(E.Card, { padding: 'm', border: false, className: 'demo-mw-summary' },
        h(E.SelectCompact, { label: 'Монета выплаты', options: KAS_OPTIONS, className: 'demo-mw-summary__coin' }),
        SUMMARY.map(function (s, i) { return div('demo-stat', text('demo-caption demo-caption--md', s.label), h(E.Amount, { key: i, size: 'l', value: s.value, ticker: 'KAS', fiat: s.fiat, skeleton: LOADING })); })),
      h(E.Card, { padding: 'm', border: false, className: 'demo-mw-facts' },
        h(E.ListItem, { size: 'm', showDescription: false, divider: true, leading: h(E.Coin, { coin: 'kas', size: 'l', skeleton: LOADING }), label: 'KAS',
          trailing: div('demo-two demo-two--end', val('demo-two__p', '$0.07', 40), val('demo-delta demo-delta--down', '−3.61 %', 48)) }),
        h(E.ListItem, { size: 'm', showDescription: false, divider: true, label: 'Дневной доход', trailing: div('demo-two demo-two--end', val('demo-two__p', '0.2243 KAS', 80), text('demo-two__s', 'за 1 TH/s')) }),
        h(E.ListItem, { size: 'm', showDescription: false, divider: true, label: 'Сложность сети', trailing: div('demo-fact',
          h(E.IconButton, { type: 'ghost', size: 's', label: 'Открыть в эксплорере', icon: h(E.Icon, { name: 'arrow-new-tab' }) }),
          div('demo-two demo-two--end', val('demo-two__p', '61.18 P', 56), val('demo-delta demo-delta--up', '+0.23 %', 48))) }),
        h(E.ListItem, { size: 'm', showDescription: false, label: 'Блоков до пересчёта', trailing: div('demo-two demo-two--end', val('demo-two__p', '248', 32), val('demo-two__s', '~1 д 11 ч 3 м', 88)) })),
      chartCard(true),
      h(E.Card, { padding: 'm', border: false }, h(E.StatusSummary, { layout: 'row', offline: 9, unstable: 1, active: 40, skeleton: LOADING })),
      h(E.PromoCarousel, { slides: [
        h(E.PromoCard, { key: 1, size: 'm', title: 'Забусти свой майнинг с нашей прошивкой', showMedia: true, showClose: false, showDescription: false }),
        h(E.PromoCard, { key: 2, size: 'm', title: 'Coinhold — до 14% годовых', showMedia: true, showClose: false, showDescription: false }),
        h(E.PromoCard, { key: 3, size: 'm', title: 'Калькулятор доходности', showMedia: true, showClose: false, showDescription: false })] }));
  }

  function MwWorkers() {
    var cols = [
      { key: 'name', label: 'Воркер', sortable: true, width: '27%', render: function (r) { return h(E.Status, { size: 'm', tone: r.tone, label: r.name }); } },
      { key: 'cur', label: 'Хешрейт', sortable: true, width: '27%', render: function (r) { return h(E.Amount, { size: 'm', value: r.cur, ticker: 'TH/s' }); } },
      { key: 'h24', label: '24ч', sortable: true, width: '24%', render: function (r) { return h(E.Amount, { size: 'm', value: r.h24, ticker: 'TH/s' }); } },
      { key: 'rej', label: 'Реджекты', sortable: true, render: function (r) { return h(E.Amount, { size: 'm', value: r.rej, ticker: '%' }); } }];
    return h(MwShell, { tab: 'Воркеры', bar: h(E.ActionBar, { actions: [{ label: 'Подключить', iconLeft: 'plus' }, { label: 'Создать группу' }] }) },
      div('demo-mw-row demo-mw-row--labelled', h(E.Select, { size: 'l', labelPosition: 'on-border', label: 'Монета', defaultValue: 'btc', className: 'demo-grow',
        leading: h(E.CoinStack, { coins: ['btc', 'eth'], size: 's' }), options: [{ value: 'btc', label: 'Bitcoin +1' }, { value: 'one', label: 'BTC' }] }),
        h(E.IconButton, { type: 'tertiary', size: 'l', label: 'Выгрузить отчёт', icon: h(E.Icon, { name: 'file-excel' }) })),
      h(E.Card, { padding: 'm', border: false }, h('dl', { className: 'emcd-kv-list' },
        h(E.KeyValueRow, { leader: true, label: 'Текущий хешрейт', value: '535.15 TH/s' }),
        h(E.KeyValueRow, { leader: true, label: 'Хешрейт за 24 часа', value: '628.22 TH/s' }),
        h(E.KeyValueRow, { leader: true, label: 'Реджекты за 1 ч', value: '1.16 %' }))),
      div('demo-mw-row', h(E.Search, { size: 'm', text: 'Поиск воркеров', className: 'demo-grow' }),
        h(E.Segmented, { size: 'm', label: 'Вид', className: 'demo-grow', items: [
          { value: 'list', label: 'Список', showLabel: false, icon: h(E.Icon, { name: 'list' }) },
          { value: 'groups', label: 'Группы', showLabel: false, icon: h(E.Icon, { name: 'folder' }) }] })),
      div('demo-chips',
        h(E.Chip, { size: 's', label: 'Все', metaText: '20', selected: true }),
        h(E.Chip, { size: 's', label: 'Активные', metaText: '14', statusDot: true, statusTone: 'success' }),
        h(E.Chip, { size: 's', label: 'Нестабильные', metaText: '5', statusDot: true, statusTone: 'warning' }),
        h(E.Chip, { size: 's', label: 'Отключённые', metaText: '1', statusDot: true, statusTone: 'danger' })),
      h(E.Table, { label: 'Воркеры', density: 'compact', columns: cols, rows: WORKERS, className: 'demo-mw-table', defaultSort: { key: 'name', dir: 'descending' } }));
  }

  function MwHistory() {
    var rows = ['20', '19', '18', '17', '16'].map(function (d) {
      return h(E.ListItem, { key: d, size: 'm', divider: true, label: 'PPLNS начисление', description: d + ' дек 2025, 11:38',
        trailing: h(E.Amount, { size: 'm', align: 'end', value: '0.00004480', ticker: 'ETC', fiat: '≈ $62.89' }) });
    });
    return h(MwShell, { tab: 'История', bar: h(E.ActionBar, { badge: true, actions: [{ label: 'Фильтры', iconLeft: 'tuning' }, { label: 'Выгрузить', iconLeft: 'file-excel' }] }) },
      h(E.Segmented, { size: 'm', block: true, label: 'Вид истории', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] }),
      h(E.Card, { padding: 'm', border: false, className: 'demo-mw-total' },
        coinSelect(['ltc', 'eth', 'x'], 'Litecoin + 6', '6', 'l'),
        div('demo-mw-total__row',
          div('demo-stat', h(E.Amount, { size: 'l', value: '≈ $35 534.55' }), text('demo-caption demo-caption--md', 'Сумма всех выплат')),
          h(E.CoinStack, { coins: ['ltc', 'eth', 'x'], size: 's', count: 2, more: '6' }),
          h(E.Icon, { name: 'chevron-right', className: 'demo-muted' })),
        h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Выплачиваем ежедневно с 14:00 до 18:00', primaryAction: false, close: false })),
      div('demo-mw-list', rows));
  }

  // ───────── Калькулятор доходности (patterns 3.10a) ─────────
  var CALC_FIELDS = [
    { key: 'hash', label: 'Твой хешрейт', value: '100', unit: 'TH/s' }, { key: 'fee', label: 'Комиссия', value: '1.5', unit: '%' },
    { key: 'power', label: 'Энергопотребление всех устройств', value: '10', unit: 'кВт·ч' }, { key: 'price', label: 'Цена за кВт·ч', value: '1.5', unit: '$' }];
  var CALC_PERIODS = ['1 день', '7 дней', '30 дней', '90 дней', '180 дней', '360 дней'];
  var CALC_SHARES = ['25 %', '50 %', '75 %', '100 %'];
  var CALC_COINS = [
    { coin: 'ltc', value: '537.4296', ticker: 'LTC', fiat: '≈ $50 384.85', mwFiat: '≈ $48 255.72', scheme: 'PPS' },
    { coin: 'doge', value: '1 778 773.453', ticker: 'DOGE', fiat: '≈ $302 391.48', scheme: 'PPLNS' },
    { coin: 'bel', value: '3 738.632399', ticker: 'BEL', fiat: '≈ $635.56', scheme: 'PPLNS' },
    { coin: 'lky', value: '1 503.3672', ticker: 'LKY', fiat: '≈ $255.57', scheme: 'PPLNS' },
    { coin: 'pep', value: '5 036 284.45', ticker: 'PEP', fiat: '≈ $1 007.25', scheme: 'PPLNS' }];
  var CALC_COIN_OPTIONS = [{ value: 'ltc', label: 'LTC +5', coin: 'ltc' }, { value: 'doge', label: 'DOGE', coin: 'doge' }];
  var calcField = function (f, size) {
    return h(E.Input, { key: f.key, size: size || 'm', label: f.label, defaultValue: f.value, inputMode: 'decimal', trailing: text('demo-unit', f.unit), className: 'demo-calc-field demo-calc-field--' + f.key });
  };
  // ряд Chip M — выбор одного (aria-pressed); неуправляемый в прототипе — состояние в странице
  function ChipRow(props) {
    var st = React.useState(props.selected);
    return h('div', { className: 'demo-chip-row' + (props.className ? ' ' + props.className : ''), role: 'group', 'aria-label': props.label },
      props.items.map(function (l) { return h(E.Chip, { key: l, size: 'm', label: l, selected: st[0] === l, onClick: function () { st[1](l); } }); }));
  }
  // тон Progress — по порядку (первый — accent, второй — success), как на макетах Web и мобильного
  var forecast = function (label, tone, pct, value, fiat) {
    return div('demo-forecast',
      h(E.Progress, { size: 's', tone: tone, percent: pct, label: label, showLabel: false }),
      div('demo-forecast__row', text('demo-caption', label), h(E.Amount, { size: 's', align: 'end', value: value, ticker: 'LTC', fiat: fiat, className: 'demo-push' })));
  };
  function coinholdCard(mobile) {
    var mining = ['Майнинг', '537.4296', '≈ $48 255.72'], plus = ['Майнинг + Coinhold', '561.166074', '≈ $50 384.85'];
    var forecasts = (mobile ? [plus, mining] : [mining, plus]).map(function (f, i) { return h(F, { key: i }, forecast(f[0], i ? 'success' : 'accent', i ? 60 : (mobile ? 60 : 59), f[1], f[2])); });
    return h(E.Card, { level: mobile ? 1 : 2, padding: mobile ? 'm' : 'l', border: false, ambientLight: true, className: 'demo-coinhold' + (mobile ? ' demo-coinhold--mw' : '') },
      h(E.SectionHeader, { size: 'm', title: 'Переводить на Coinhold', caption: mobile ? undefined : 'Ещё больше дохода с намайненных монет',
        trailing: h(E.Toggle, { status: !mobile, label: 'до 9% годовых', className: 'demo-coinhold__toggle' }) }),
      div('demo-calc-group', h(E.SectionHeader, { size: 's', level: 4, title: 'Сколько переводить?' }),
        h(ChipRow, { label: 'Сколько переводить', items: CALC_SHARES, selected: '75 %', className: 'demo-chip-row--fill' })),
      div('demo-calc-group', h(E.SectionHeader, { size: 's', level: 4, title: 'Прогноз доходности' }),
        div('demo-forecasts', forecasts),
        text('demo-caption', 'Расчёт основан на сроке майнинга, текущем курсе монеты и условиях Coinhold')),
      h(E.Button, { type: 'secondary', size: 'm', label: 'Открыть Coinhold', className: 'demo-coinhold__btn' }));
  }
  function incomeCard(mobile, app) {
    return h(E.Card, { padding: mobile ? 'm' : 'l', border: false, className: 'demo-income' + (mobile ? ' demo-income--mw' : '') },
      div('demo-income__head',
        text('demo-caption demo-caption--md', mobile ? 'Доход за 360 дней' : 'Ожидаемый доход'),
        !mobile && h(E.SelectCompact, { label: 'Монета', options: CALC_COIN_OPTIONS, className: 'demo-push' })),
      div('demo-income__total',
        // итог дохода — Amount XL Tone=Success (решение 19.11); без Coinhold (мобильный: переключатель выкл.) — без зачёркнутой суммы
        h(E.Amount, { size: mobile ? 'l' : 'xl', tone: 'success', value: mobile ? '≈ $350 536.71' : '≈ $352 665.84' }),
        !mobile && h('s', { className: 'demo-caption demo-caption--md' }, '≈ $350 536.71')),
      div('demo-income__coins', (app ? CALC_COINS.concat([{ coin: 'jkc', value: '4 008.9816', ticker: 'JKC', fiat: '≈ $120.26', scheme: 'PPLNS' }]) : CALC_COINS).map(function (c) {
        return div('demo-income__coin', h(E.Coin, { key: 'c', coin: c.coin, size: 's' }),
          h(E.Amount, { key: 'a', size: mobile ? 'm' : 's', value: c.value, ticker: c.ticker, fiat: (mobile && c.mwFiat ? c.mwFiat : c.fiat) + ' · ' + c.scheme }));
      })),
      div('demo-income__expense', text('demo-caption', 'Расходы на электричество:'), text('demo-danger', '− $120.01')),
      text('demo-caption', 'Расчёт основан на доходности пула в течение последней недели с учётом энергозатрат, без учёта роста сложности сети'),
      h('dl', { className: 'emcd-kv-list demo-income__kv' }, h(E.KeyValueRow, { label: 'Время выплат', value: 'Ежедневно, с 16:00 по 17:00' })),
      !mobile && h(E.Button, { type: 'primary', size: 'l', label: 'Начать майнить', className: 'demo-income__cta' }));
  }
  var vipSuggest = function () {
    return h(E.Suggest, { layout: 'strip', tone: 'neutral', title: 'VIP-условия для большого хешрейта', primaryLabel: 'Оставить заявку', close: false, className: 'demo-vip' });
  };

  function WebCalculator() {
    return h(WebShell, { tab: 'Калькулятор' },
      h(E.PageHeader, { size: 'large', title: 'Калькулятор доходности' }),
      div('demo-calc',
        h(E.Card, { padding: 'l', className: 'demo-calc__form' },
          div('demo-calc__fields', CALC_FIELDS.map(function (f) { return calcField(f); })),
          div('demo-calc-group', text('demo-caption demo-caption--md', 'Укажи срок'), h(ChipRow, { label: 'Срок', items: CALC_PERIODS, selected: '360 дней', className: 'demo-chip-row--fill' })),
          coinholdCard(false)),
        div('demo-calc__side', incomeCard(false), vipSuggest())));
  }

  function MwCalculator() {
    return h(MwShell, { tab: 'Калькулятор', bar: h(E.ActionBar, { actions: [{ label: 'Начать майнить' }] }) },
      h(E.Card, { padding: 'm', border: false, className: 'demo-calc__form demo-calc__form--mw' },
        div('demo-calc__fields demo-calc__fields--mw', CALC_FIELDS.map(function (f) { return calcField(f); })),
        div('demo-calc-group', text('demo-caption demo-caption--md', 'Укажи срок'), h(ChipRow, { label: 'Срок', items: CALC_PERIODS, selected: '360 дней', className: 'demo-chip-row--scroll' }))),
      coinholdCard(true),
      incomeCard(true),
      vipSuggest());
  }

  // ───────── Watcher-link (patterns 3.9a) ─────────
  var LINKS = [
    { name: 'U soseda poka ego net doma', created: 'от 10 декабря 2025', until: 'До 1 января 2026', tone: 'success', pct: 60, account: 'petrovskii', main: true, access: 'Все доступы', export: true, on: true },
    { name: 'Dagestan', created: 'от 28 ноября 2025', until: 'До 28 января 2026', tone: 'success', pct: 60, account: 'jasdknaskjna', access: 'Хешрейт, Воркеры, Начисления', on: true },
    { name: 'Тест', created: 'от 13 ноября 2025', until: 'До 28 января 2026', tone: 'warning', pct: 60, account: 'evgeniibiryukov', access: 'Хешрейт, Воркеры', on: true },
    { name: 'Наш сквад', created: 'от 15 ноября 2025', until: 'До 15 января 2026', tone: 'success', pct: 60, account: 'kk1skdaa', access: 'Выплаты, Начисления', export: true, on: true },
    { name: 'Кефир и булочка', created: 'от 1 октября 2025', until: 'До 31 сентября 2025', tone: 'danger', pct: 60, account: 'jnas123', access: 'Хешрейт, Воркеры, Начисления', export: true, on: true },
    { name: 'Ultimate', created: 'от 5 августа 2025', until: 'Бессрочно', account: 'Все аккаунты', access: 'Все доступы', export: true, on: false }];
  function WebWatcher() {
    return h(WebShell, { tab: 'Watcher-link' },
      h(E.Suggest, { layout: 'strip', tone: 'accent', title: 'Подключай сторонние сервисы с помощью API-ключей', primaryLabel: 'Перейти', close: false }),
      div('demo-menu demo-menu--watcher',
        // Page header Large без действий: 2 Select — фильтры экрана (не Actions), «Создать» стоит с ними в одном ряду меню, как на макете
        h(E.PageHeader, { size: 'large', title: 'Мои Watcher link', className: 'demo-grow' }),
        h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Аккаунт', defaultValue: 'all', className: 'demo-watcher__select',
          options: [{ value: 'all', label: 'Все аккаунты' }, { value: 'petrovskii', label: 'petrovskii' }] }),
        h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Сортировать по', defaultValue: 'date', className: 'demo-watcher__select',
          options: [{ value: 'date', label: 'Дате создания' }, { value: 'name', label: 'Названию' }] }),
        h(E.Button, { type: 'primary', size: 'm', label: 'Создать Watcher link' })),
      div('demo-links', LINKS.map(function (l, i) {
        return h(E.Card, { key: i, padding: 'm', className: 'demo-link' + (l.on ? '' : ' demo-link--off') },
          div('demo-two', text('demo-link__name', l.name), text('demo-two__s', l.created)),
          div('demo-link__term', text('demo-link__text', l.until), l.pct != null && h(E.Progress, { size: 's', tone: l.tone, percent: l.pct, label: 'Срок ссылки', showLabel: false })),
          div('demo-link__account', text('demo-link__text', l.account), l.main && h(E.Badge, { size: 's', label: 'Основной' })),
          div('demo-two', text('demo-link__text', l.access), l.export && text('demo-two__s', 'С выгрузкой')),
          div('demo-link__actions',
            h(E.Toggle, { status: l.on, inputProps: { 'aria-label': 'Ссылка «' + l.name + '» активна' } }),
            h(E.IconButton, { type: 'ghost', size: 's', label: 'Скопировать ссылку', icon: h(E.Icon, { name: 'link' }) }),
            h(E.IconButton, { type: 'ghost', size: 's', label: 'Ещё', icon: h(E.Icon, { name: 'more-horizontal' }) })));
      })));
  }

  // ───────── Настройки → Уведомления (patterns 3.9a) ─────────
  var NOTIFY = [
    { id: 'pay', label: 'Выплаты', mail: true, tg: true }, { id: 'acc', label: 'Начисления', mail: true, tg: false },
    { id: 'status', label: 'Статус майнинга', mail: false, tg: true },
    { id: 'drop', label: 'Снижение хешрейта', desc: 'Чтобы не пропускать снижение хешрейта', action: 'Настроить', mail: true, tg: true }];
  function WebSettings() {
    var cell = function (row, ch) {
      return h(E.Checkbox, { status: row[ch] ? 'on' : 'off', className: 'demo-notify__cell', inputProps: { 'aria-labelledby': 'col-' + ch + ' row-' + row.id } });
    };
    return h(WebShell, { tab: 'Настройки' },
      div('demo-menu demo-menu--split',
        h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Аккаунт', defaultValue: 'main', className: 'demo-settings__account',
          options: [{ value: 'main', label: 'SergeySiminiv1337' }, { value: 'second', label: 'petrovskii' }] }),
        h(E.Segmented, { size: 'l', label: 'Раздел настроек', defaultValue: 'notify', className: 'demo-settings__seg', items: [{ value: 'out', label: 'Вывод' }, { value: 'notify', label: 'Уведомления' }] })),
      h(E.Card, { padding: 'l', className: 'demo-notify' },
        div('demo-notify__row demo-notify__row--head',
          h(E.SectionHeader, { size: 'm', level: 2, title: 'Типы уведомлений', caption: 'Какие уведомления хочешь получать' }),
          h(E.Checkbox, { id: 'col-mail', label: 'Эл. почта', description: 'ruf•••@•••cd.io', className: 'demo-notify__col' }),
          h(E.Checkbox, { id: 'col-tg', label: 'Telegram', description: '@ruf•••', className: 'demo-notify__col' })),
        NOTIFY.map(function (r) {
          return h(F, { key: r.id }, h(E.Divider, null),
            div('demo-notify__row',
              div('demo-two', text('demo-notify__label', h('span', { id: 'row-' + r.id }, r.label)),
                r.desc && div('demo-notify__desc', text('demo-two__s', r.desc), h(E.Button, { type: 'text', size: 'xs', label: r.action }))),
              cell(r, 'mail'), cell(r, 'tg')));
        })));
  }

  // ───────── История → Выплаты (patterns 3.6a) ─────────
  // те же строки, что «Начисления» (HISTORY), + направление выплаты
  var PAY_DIRS = ['На EMCD wallet', 'На внешний кошелёк', 'На внешний кошелёк', 'На EMCD wallet', 'На EMCD wallet'];
  var explorer = function (size) { return h(E.Button, { type: 'text', size: size, label: 'В Explorer', iconRight: h(E.Icon, { name: 'arrow-new-tab' }) }); };
  function WebPayouts() {
    var cols = [
      { key: 'date', label: 'Дата и время', width: '24%', render: function (r) { return twoLines(r.date, r.time); } },
      { key: 'value', label: 'Сумма', width: '26%', render: function (r) { return div('demo-amount-cell', h(E.Coin, { coin: r.coin, size: 's' }), h(E.Amount, { size: 'm', value: r.value, ticker: r.ticker, fiat: r.fiat })); } },
      { key: 'dir', label: 'Направление', width: '28%', render: function (r) { return text('demo-two__p', PAY_DIRS[r.id]); } },
      { key: 'details', label: 'Детали', render: function () { return explorer('s'); } }];
    var coinRow = function (coin, val, fiat) {
      return h(E.ListItem, { size: 'm', inset: false, showDescription: false, leading: h(E.Coin, { coin: coin, size: 'm' }), label: val, trailing: text('demo-muted', fiat) });
    };
    return h(WebShell, { tab: 'История' },
      div('demo-menu demo-menu--split', coinSelect(['ltc', 'eth', 'x'], 'Litecoin + 6', '6'),
        h(E.Segmented, { size: 'm', label: 'Вид истории', defaultValue: 'pay', className: 'demo-seg-wide', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] })),
      div('demo-blocks',
        div('demo-filters',
          // фильтры 3.6a: «Монеты» и «Тип выплат» (на макете — заглушки «Сеть»)
          h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Монеты', options: [{ value: 'all', label: 'Все монеты' }, { value: 'ltc', label: 'LTC' }, { value: 'doge', label: 'DOGE' }], defaultValue: 'all', className: 'demo-filters__net' }),
          h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Тип выплат', options: [{ value: 'all', label: 'Все выплаты' }, { value: 'wallet', label: 'На EMCD wallet' }, { value: 'ext', label: 'На внешний кошелёк' }, { value: 'ch', label: 'На Coinhold' }], defaultValue: 'all', className: 'demo-filters__net' }),
          h(E.DateRangeField, { label: 'Период', className: 'demo-filters__period', panel: { isDateDisabled: function (d) { return d > new Date().toISOString().slice(0, 10); } } }),
          h(E.Button, { type: 'tertiary', size: 'm', label: 'Выгрузить', iconLeft: h(E.Icon, { name: 'file-excel' }), className: 'demo-filters__btn' })),
        div('demo-history',
          h(E.Card, { padding: 'm', className: 'demo-history__total' },
            h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Выплаты ежедневно с 15:00 до 16:00', primaryAction: false, close: false }),
            div('demo-total', h(E.Amount, { size: 'l', value: '$12 457.89' }), text('demo-caption demo-caption--md', 'Всего выплачено')),
            h(E.Divider, null),
            div('demo-group', text('demo-caption demo-caption--md', 'На EMCD wallet'), div('emcd-list', coinRow('ltc', '8.9012 LTC', '≈ $78.90'))),
            div('demo-group', text('demo-caption demo-caption--md', 'На внешний кошелёк'),
              div('emcd-list', coinRow('doge', '9.0123 DOGE', '≈ $34.56'), coinRow('bel', '123.4567 BEL', '≈ $90.12'), coinRow('lky', '67.8901 LKY', '≈ $89.01'), coinRow('pep', '789.0123 PEP', '≈ $45.67')))),
          h(E.Card, { padding: 'm', className: 'demo-history__table' },
            h(E.Table, { label: 'Выплаты', density: 'regular', columns: cols, rows: HISTORY })))));
  }

  function MwPayouts() {
    var rows = [['Кошелёк EMCD', '20', true], ['Кошелёк EMCD', '19', true], ['На Coinhold', '18', false], ['Внешний кошелёк', '17', true], ['Кошелёк EMCD', '16', true]].map(function (r) {
      return h(E.ListItem, { key: r[1], size: 'm', divider: true, label: r[0], description: r[1] + ' дек 2025, 11:38',
        // сумма без фиата; ссылка в Explorer — кроме Coinhold (3.6a)
        trailing: div('demo-two demo-two--end demo-payout', h(E.Amount, { size: 'm', align: 'end', value: '0.00004480', ticker: 'ETC' }), r[2] && explorer('xs')) });
    });
    return h(MwShell, { tab: 'История', bar: h(E.ActionBar, { badge: true, actions: [{ label: 'Фильтры', iconLeft: 'tuning' }, { label: 'Выгрузить', iconLeft: 'file-excel' }] }) },
      h(E.Segmented, { size: 'm', block: true, label: 'Вид истории', defaultValue: 'pay', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] }),
      h(E.Card, { padding: 'm', border: false, className: 'demo-mw-total' },
        coinSelect(['ltc', 'eth', 'x'], 'Litecoin + 6', '6', 'l'),
        div('demo-mw-total__row',
          div('demo-stat', h(E.Amount, { size: 'l', value: '≈ $35 534.55' }), text('demo-caption demo-caption--md', 'Сумма всех выплат')),
          h(E.CoinStack, { coins: ['ltc', 'eth', 'x'], size: 's', count: 2, more: '6' }),
          h(E.Icon, { name: 'chevron-right', className: 'demo-muted' })),
        h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Выплачиваем ежедневно с 14:00 до 18:00', primaryAction: false, close: false })),
      div('demo-mw-list', rows));
  }

  // ───────── Watcher-link · мобильный (3.9a Compact) ─────────
  function MwWatcher() {
    return h(MwShell, { tab: 'Watcher-link', bar: div('demo-fab-dock', h(E.FloatingButton, { layout: 'extended', size: 'l', label: 'Создать Watcher link' })) },
      h(E.Suggest, { layout: 'strip', tone: 'accent', title: 'Подключай сторонние сервисы с помощью API-ключей', primaryLabel: 'Перейти', close: false }),
      div('demo-mw-row demo-mw-head',
        h(E.PageHeader, { size: 'compact', title: 'Мои Watcher link' }),
        h(E.IconButton, { type: 'secondary', size: 'm', label: 'Фильтр', icon: h(E.Icon, { name: 'tuning' }) })),
      div('demo-links', LINKS.map(function (l, i) {
        return h(E.Card, { key: i, padding: 'm', className: 'demo-link demo-link--mw' + (l.on ? '' : ' demo-link--off') },
          div('demo-link__top',
            div('demo-two demo-grow', text('demo-link__name', l.name), text('demo-two__s', l.created)),
            h(E.IconButton, { type: 'ghost', size: 's', label: 'Скопировать ссылку', icon: h(E.Icon, { name: 'link' }) }),
            h(E.IconButton, { type: 'ghost', size: 's', label: 'Ещё', icon: h(E.Icon, { name: 'more-horizontal' }) })),
          div('demo-link__account', text('demo-link__text', l.account), l.main && h(E.Badge, { size: 's', label: 'Основной' })),
          div('demo-two', text('demo-link__text', l.access), l.export && text('demo-two__s', 'С выгрузкой')),
          div('demo-link__term', text('demo-link__text', l.until), l.pct != null && h(E.Progress, { size: 's', tone: l.tone, percent: l.pct, label: 'Срок ссылки', showLabel: false })));
      })));
  }

  // ───────── Настройки · мобильный (3.9a Compact) ─────────
  var SETTINGS_SEG = function (v) {
    return h(E.Segmented, { size: 'm', block: true, label: 'Раздел настроек', defaultValue: v, items: [{ value: 'out', label: 'Вывод' }, { value: 'notify', label: 'Уведомления' }] });
  };
  function MwSettingsNotify() {
    return h(MwShell, { tab: 'Настройки' },
      SETTINGS_SEG('notify'),
      h(E.Card, { padding: 'l', className: 'demo-settings-card' },
        h(E.SectionHeader, { size: 'm', level: 2, title: 'Следи за событиями майнинга' }),
        h(E.Select, { size: 'm', label: 'Аккаунт', hint: 'Уведомления настраиваются для выбранного аккаунта', defaultValue: 'main',
          options: [{ value: 'main', label: 'SergeySiminiv1337' }, { value: 'second', label: 'petrovskii' }] }),
        div('demo-calc-group demo-settings-types', text('demo-caption demo-caption--md', 'Какие уведомления получать'),
          div('emcd-list', NOTIFY.map(function (r, i) {
            // канал настраивается на следующем экране — строка с шевроном, без матрицы чекбоксов
            return h(E.ListItem, { key: r.id, size: 'm', inset: false, href: '#', divider: i < NOTIFY.length - 1, label: r.label, description: r.desc, showDescription: !!r.desc,
              trailing: h(E.Icon, { name: 'chevron-right' }) });
          })))));
  }

  function MwSettingsWithdraw() {
    var btc = function () { return h(E.Coin, { coin: 'btc', size: 's' }); };
    return h(MwShell, { tab: 'Настройки' },
      SETTINGS_SEG('out'),
      h(E.Select, { size: 'm', label: 'Монета майнинга', defaultValue: 'btc', options: [{ value: 'btc', label: 'Bitcoin', leading: btc() }, { value: 'ltc', label: 'Litecoin', leading: h(E.Coin, { coin: 'ltc', size: 's' }) }] }),
      h(E.Card, { padding: 'l', className: 'demo-settings-card' },
        h(E.SectionHeader, { size: 'm', level: 2, title: 'Куда выводить средства?' }),
        h(E.Toggle, { status: true, label: 'На основной счёт', description: 'Выплачиваем ежедневно с 10:00 до 12:00, без ограничений' }),
        h(E.Select, { size: 'm', label: 'Монета', defaultValue: 'btc', options: [{ value: 'btc', label: 'BTC', leading: btc() }, { value: 'usdt', label: 'USDT' }] }),
        h(E.Input, { size: 'm', state: 'readonly', label: 'Внутренний адрес BTC кошелька', defaultValue: 'tb1qy4npsm8wledn07jq5j5yx2276qdszp8w4cy3v' }),
        h(E.Checkbox, { label: 'Автоконвертация начислений', description: 'Автоматически будем менять % от майнинговых начислений на другую крипту по курсу на момент выплаты. Минимальная сумма обмена — 10 USDT в эквиваленте BTC' }),
        h(E.Divider, null),
        h(E.Toggle, { status: false, label: 'На Coinhold', description: 'Дополнительный доход с намайненного — до 8% годовых' }),
        h(E.PromoCard, { size: 'm', tone: 'accent', title: 'Заработай до 8% годовых', description: 'Открой Coinhold и зарабатывай на хранении криптовалют', actionLabel: 'Открыть Coinhold', showClose: false })));
  }

  // ───────── App (iOS, 19.11): Top bar App · Card L1 Surface (лист под шапкой) · Tab bar с Action «E» ─────────
  var APP_TABS = [{ label: 'Главная', icon: 'dots-grid' }, { label: 'Майнинг', icon: 'devices', badgeDot: true }, { label: 'Действия', type: 'action' },
    { label: 'Доход', icon: 'wallet' }, { label: 'P2P', icon: 'history' }];
  function AppShell(props) {
    return div('demo-app',
      // статус-бар iOS — часть устройства, не DS: только высота
      h('div', { className: 'demo-app__status', 'aria-hidden': true }),
      h(E.TopBar, { platform: 'app', account: 'rruuff', coins: props.coins || ['btc', 'eth'], coin: props.coin || 'BTC + 1' }),
      h(E.Card, { level: 1, radius: 'surface', padding: 'm', className: 'demo-app__sheet' + (props.tabs ? ' demo-app__sheet--tabs' : '') }, props.children),
      props.over,
      h(E.TabBar, { className: 'demo-app__tabbar', defaultValue: 'Майнинг', items: APP_TABS }));
  }
  var appRow = function (label, desc, value, fiat, divider) {
    return h(E.ListItem, { size: 'm', inset: false, divider: !!divider, label: label, description: desc, showDescription: !!desc,
      trailing: h(E.Amount, { size: 'm', align: 'end', value: value, ticker: 'BTC', fiat: fiat }) });
  };
  function AppDashboard() {
    return h(AppShell, { over: h(E.FloatingButton, { layout: 'extended', size: 'm', type: 'primary', label: 'Калькулятор', icon: 'calculator', className: 'demo-app__fab' }) },
      div('demo-app-coin', text('demo-caption demo-caption--md', 'Монета отображения'),
        h(E.SelectCompact, { label: 'Монета отображения', text: 'BTC', leading: h(E.Coin, { coin: 'btc', size: 's' }) })),
      h(E.Card, { level: 2, padding: 's', border: true }, appRow('Будет выплачено', 'при достижении 0.0001 BTC', '0.00005797', '≈ $3 172.51')),
      h(E.Card, { level: 2, padding: 's', border: false, className: 'demo-app-account' }, appRow('Майнинг-счёт', 'Ваш остаток средств', '21.4492000', '≈ $14 317.42'),
        h(E.Button, { type: 'secondary', size: 'm', label: 'Вывести', className: 'demo-block' })),
      div('demo-app-totals', appRow('Всего выплат', null, '21.4492000', '≈ $14 317.42', true), appRow('Добыто', 'за 04.09', '0.00008291', '≈ $3.17', true),
        appRow('Прогноз на сегодня', 'на основе данных за 04.09', '0.00005797', '≈ $3.17')));
  }
  function AppWorkers() {
    var num = function (v, u) { return h(E.Amount, { size: 's', align: 'end', value: v, ticker: u }); };
    var cols = [
      { key: 'name', label: 'Воркер', sortable: true, render: function (r) { return h(E.Status, { size: 's', tone: 'success', label: r.name }); } },
      { key: 'cur', label: 'Хешрейт', sortable: true, align: 'end', render: function (r) { return num(r.cur, 'TH/s'); } },
      { key: 'h24', label: 'За 24 ч', sortable: true, align: 'end', render: function (r) { return num(r.h24, 'TH/s'); } },
      { key: 'rej', label: 'Реджекты', sortable: true, align: 'end', render: function (r) { return num(r.rej, '%'); } }];
    var rows = [0, 1, 2, 3, 4, 5, 6].map(function (i) { return { id: i, name: 'worker', cur: '105.28', h24: '118.28', rej: i ? '1.05' : '0' }; });
    return h(AppShell, { tabs: true, over: h(E.FloatingButton, { layout: 'extended', size: 'm', type: 'secondary', label: 'Выгрузить', icon: 'file-excel', className: 'demo-app__fab' }) },
      h(E.Tabs, { size: 'm', fill: true, label: 'Разделы майнинга', defaultValue: 'Воркеры', items: ['Дашборд', 'Воркеры', 'История'].map(function (l) { return { value: l, label: l }; }) }),
      div('demo-chips',
        h(E.Chip, { size: 's', label: 'Все', metaText: '100', selected: true }),
        h(E.Chip, { size: 's', label: 'Активные', metaText: '75', statusDot: true, statusTone: 'success' }),
        h(E.Chip, { size: 's', label: 'Нестабильные', metaText: '2', statusDot: true, statusTone: 'warning' }),
        h(E.Chip, { size: 's', label: 'Отключённые', metaText: '23', statusDot: true, statusTone: 'danger' })),
      div('demo-mw-row', h(E.Search, { size: 'm', text: 'Поиск воркера', className: 'demo-grow' }),
        h(E.Segmented, { size: 'm', label: 'Вид', items: [
          { value: 'list', label: 'Список', showLabel: false, icon: h(E.Icon, { name: 'list' }) },
          { value: 'groups', label: 'Группы', showLabel: false, icon: h(E.Icon, { name: 'folder' }) }] })),
      h(E.Table, { label: 'Воркеры', density: 'compact', columns: cols, rows: rows, className: 'demo-mw-table' }));
  }
  function AppHistory() {
    var tx = ['16 фев 2026, 11:38', '12 фев 2026, 10:35', '29 янв 2026, 15:36', '24 янв 2026, 12:38'].map(function (d) {
      return h(E.Transaction, { key: d, showLeading: false, type: 'reward', status: 'completed', label: 'PPLNS начисление', description: d, value: '0.00004480', ticker: 'LTC', fiat: '≈ $62.89' });
    });
    return h(AppShell, { tabs: true, over: div('demo-app-actions',
        h(E.Button, { type: 'tertiary', size: 'm', label: 'Фильтры', iconLeft: h(E.Icon, { name: 'tuning' }) }),
        h(E.Button, { type: 'tertiary', size: 'm', label: 'Выгрузить', iconLeft: h(E.Icon, { name: 'file-excel' }) })) },
      h(E.Tabs, { size: 'm', fill: true, label: 'Разделы майнинга', defaultValue: 'История', items: ['Дашборд', 'Воркеры', 'История', 'Настройки'].map(function (l) { return { value: l, label: l }; }) }),
      h(E.Segmented, { size: 'l', block: true, label: 'Вид истории', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] }),
      h(E.Card, { level: 2, padding: 'm', border: true, className: 'demo-mw-total' },
        div('demo-mw-total__row',
          div('demo-stat', h(E.Amount, { size: 'l', value: '≈ $35 534.55' }), text('demo-caption demo-caption--md', 'Сумма всех начислений')),
          h(E.CoinStack, { coins: ['ltc', 'eth', 'x'], size: 'm', count: 2, more: '6' }),
          h(E.Icon, { name: 'chevron-right', className: 'demo-muted' })),
        h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Начисляем ежедневно с 14:00 до 18:00', primaryAction: false, close: false })),
      div('demo-app-list', tx));
  }

  function AppPayouts() {
    var rows = [['Кошелёк EMCD', '20', true], ['Кошелёк EMCD', '19', true], ['На Coinhold', '18', false], ['Внешний кошелёк', '17', true]].map(function (r, i, all) {
      return h(E.ListItem, { key: r[1], size: 'm', divider: i < all.length - 1, label: r[0], description: r[1] + ' дек 2025, 11:38',
        trailing: div('demo-two demo-two--end demo-payout', h(E.Amount, { size: 'm', align: 'end', value: '0.00004480', ticker: 'ETC' }), r[2] && explorer('xs')) });
    });
    return h(AppShell, { tabs: true, over: div('demo-app-actions',
        h(E.Button, { type: 'tertiary', size: 'm', label: 'Фильтры', iconLeft: h(E.Icon, { name: 'tuning' }) }),
        h(E.Button, { type: 'tertiary', size: 'm', label: 'Выгрузить', iconLeft: h(E.Icon, { name: 'file-excel' }) })) },
      h(E.Tabs, { size: 'm', fill: true, label: 'Разделы майнинга', defaultValue: 'История', items: ['Дашборд', 'Воркеры', 'История', 'Настройки'].map(function (l) { return { value: l, label: l }; }) }),
      h(E.Segmented, { size: 'l', block: true, label: 'Вид истории', defaultValue: 'pay', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] }),
      h(E.Card, { level: 2, padding: 'm', border: true, className: 'demo-mw-total' },
        div('demo-mw-total__row',
          div('demo-stat', h(E.Amount, { size: 'l', value: '≈ $35 534.55' }), text('demo-caption demo-caption--md', 'Сумма всех выплат')),
          h(E.CoinStack, { coins: ['ltc', 'eth', 'x'], size: 'm', count: 2, more: '6' }),
          h(E.Icon, { name: 'chevron-right', className: 'demo-muted' })),
        h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Выплачиваем ежедневно с 14:00 до 18:00', primaryAction: false, close: false })),
      div('demo-app-list', rows));
  }

  // ───────── App, 20.11: вложенный экран (Top bar Level=Inner), корневые разделы «Настройки» и «Watcher-link», поток «Выгрузка» (Sheet) — patterns 1.5 ─────────
  var APP_SECTIONS = ['Дашборд', 'Воркеры', 'История', 'Watcher-link', 'Настройки'];
  var appTabs = function (v) { return h(E.Tabs, { size: 'm', label: 'Разделы майнинга', defaultValue: v, items: APP_SECTIONS.map(function (l) { return { value: l, label: l }; }), className: 'demo-app__tabs' }); };
  function AppInner(props) {
    return div('demo-app demo-app--inner',
      h('div', { className: 'demo-app__status', 'aria-hidden': true }),
      h(E.TopBar, { platform: 'app', level: 'inner', title: props.title, onBack: function () {} }),
      div('demo-app__inner-content', props.children),
      props.bar);
  }
  function AppCalculator() {
    var coins = h(E.CoinStack, { coins: ['ltc', 'doge'], size: 's' });
    return h(AppInner, { title: 'Калькулятор', bar: h(E.ActionBar, { actions: [{ label: 'Начать майнить' }] }) },
      h(E.Card, { padding: 'm', border: false, className: 'demo-calc__form demo-calc__form--mw' },
        h(E.Select, { size: 'l', labelPosition: 'on-border', label: 'Монета', defaultValue: 'ltc', leading: coins, options: [{ value: 'ltc', label: 'Litecoin + 5' }, { value: 'doge', label: 'Dogecoin' }] }),
        div('demo-calc__fields demo-calc__fields--mw', CALC_FIELDS.map(function (f) { return calcField(f.key === 'power' ? Object.assign({}, f, { label: 'Энергопотребление инфраструктуры' }) : f, 'l'); })),
        div('demo-calc-group', text('demo-caption demo-caption--md', 'Укажи срок'), h(ChipRow, { label: 'Срок', items: CALC_PERIODS, selected: '360 дней', className: 'demo-chip-row--scroll' }))),
      appCoinhold(),
      incomeCard(true, true),
      vipSuggest());
  }
  // Coinhold в App (по production App): ставка — в подписи Section header, Toggle без своей подписи; доли 100 → 25
  function appCoinhold() {
    return h(E.Card, { level: 1, padding: 'm', border: false, ambientLight: true, className: 'demo-coinhold demo-coinhold--mw' },
      h(E.SectionHeader, { size: 'm', title: 'Переводить на Coinhold', caption: 'До 9% годовых на намайненное',
        trailing: h(E.Toggle, { status: false, inputProps: { 'aria-label': 'Переводить на Coinhold' } }) }),
      div('demo-calc-group', h(E.SectionHeader, { size: 's', level: 4, title: 'Сколько переводить?' }),
        h(ChipRow, { label: 'Сколько переводить', items: CALC_SHARES.slice().reverse(), selected: '75 %', className: 'demo-chip-row--fill' })),
      div('demo-calc-group', h(E.SectionHeader, { size: 's', level: 4, title: 'Прогноз доходности' }),
        div('demo-forecasts', forecast('Майнинг + Coinhold', 'accent', 60, '561.166074', '≈ $50 384.85'), forecast('Майнинг', 'success', 60, '537.4296', '≈ $48 255.72')),
        text('demo-caption', 'Расчёт основан на сроке майнинга, текущем курсе монеты и условиях Coinhold')),
      h(E.Button, { type: 'secondary', size: 'm', label: 'Открыть Coinhold', className: 'demo-coinhold__btn' }));
  }
  function AppSettingsWithdraw() {
    return h(AppShell, { tabs: true },
      appTabs('Настройки'),
      h(E.Suggest, { layout: 'strip', tone: 'neutral', title: 'Перенесли настройки вывода на внешний кошелёк в другой раздел', primaryLabel: 'Перейти', close: false }),
      h(E.SectionHeader, { size: 'm', level: 2, title: 'Куда выводить средства?' }),
      h(E.Toggle, { status: true, label: 'На основной счёт', description: 'Выплачиваем ежедневно с 10:00 до 12:00, без ограничений' }),
      h(E.Divider, null),
      h(E.Toggle, { status: false, label: 'На Coinhold', badge: '8% APR', description: 'Дополнительный доход с намайненного' }),
      h(E.PromoCard, { size: 'm', tone: 'accent', title: 'Увеличь намайненное: до 7.5% годовых', description: 'Открой Coinhold и зарабатывай на хранении криптовалют', actionLabel: 'Открыть Coinhold', showClose: false }));
  }
  function AppSettingsNotify() {
    return h(AppShell, { tabs: true },
      appTabs('Настройки'),
      SETTINGS_SEG('notify'),
      h(E.SectionHeader, { size: 'm', level: 2, title: 'Следи за событиями майнинга' }),
      h(E.Select, { size: 'l', labelPosition: 'on-border', label: 'Аккаунт', hint: 'Уведомления настраиваются для выбранного аккаунта', defaultValue: 'main',
        options: [{ value: 'main', label: 'SergeySemenov2' }, { value: 'second', label: 'petrovskii' }] }),
      text('demo-caption demo-caption--md', 'Какие уведомления получать'),
      h(E.Card, { level: 2, padding: 's', border: false }, div('emcd-list', [['Выплаты'], ['Начисления'], ['Статус устройств'], ['Снижение хешрейта', 'Чтобы не пропускать снижение хешрейта']].map(function (r, i, all) {
        return h(E.ListItem, { key: r[0], size: 'm', inset: false, href: '#', divider: i < all.length - 1, label: r[0], description: r[1], showDescription: !!r[1], trailing: h(E.Icon, { name: 'chevron-right' }) });
      }))));
  }
  function AppWatcher() {
    var field = function (label, value, badge) { return div('demo-wl-field', text('demo-wl-field__label', label), div('demo-wl-field__value', text('demo-wl-field__text', value), badge && h(E.Badge, { size: 's', label: badge }))); };
    var card = function (name, access) {
      return h(E.Card, { key: name, padding: 'm', border: true, className: 'demo-wl-card' },
        div('demo-wl-card__top', text('demo-wl-card__name', name),
          h(E.IconButton, { type: 'ghost', size: 's', label: 'Скопировать ссылку', icon: h(E.Icon, { name: 'link' }) }),
          h(E.IconButton, { type: 'ghost', size: 's', label: 'Ещё', icon: h(E.Icon, { name: 'more-horizontal' }) })),
        field('Аккаунт', 'rruuff', 'Основной'), field('Создан', '10 декабря 2025'), field('Выгрузка', access), field('Срок действия', 'до 15 января'));
    };
    return h(AppShell, { tabs: true, over: h(E.FloatingButton, { layout: 'extended', size: 'm', label: 'Создать Watcher link', className: 'demo-app__fab' }) },
      appTabs('Watcher-link'),
      h(E.Suggest, { layout: 'strip', tone: 'accent', title: 'Подключай сторонние сервисы по API', primaryLabel: 'Перейти', close: false }),
      h(E.SectionHeader, { size: 'm', level: 2, title: 'Мои Watcher link', trailing: h(E.IconButton, { type: 'tertiary', size: 'm', label: 'Фильтр', icon: h(E.Icon, { name: 'filter' }) }) }),
      div('demo-wl-list', card('U soseda poka ego net doma i on ne vedaet', 'Все доступы'), card('Dagestan', 'Хешрейт • воркеры • начисления')));
  }
  function AppExport() {
    var sel = function (label, value, leading) { return h(E.Select, { size: 'l', labelPosition: 'on-border', label: label, defaultValue: 'v', leading: leading, options: [{ value: 'v', label: value }] }); };
    return div('demo-app demo-app--sheet',
      h('div', { className: 'demo-app__status', 'aria-hidden': true }),
      h(E.Sheet, { title: 'Выгрузить историю', showGrabber: false, fullHeight: true, scrim: false, onClose: function () {},
        footer: h(E.Button, { type: 'primary', size: 'l', label: 'Сформировать и отправить' }) },
        h('p', { className: 'demo-sheet-text' }, 'Сформируем в выбранном формате и отправим на почту. Что туда включить?'),
        sel('Аккаунт', 'Все аккаунты'),
        sel('Монета', 'Litecoin + 4', h(E.CoinStack, { coins: ['ltc', 'doge', 'x'], size: 's', count: 2, more: '4' })),
        h(E.DateRangeField, { label: 'Период', hint: 'Выгрузить можно за 3 месяца, но в рамках года' }),
        sel('Валюта', 'RUB'),
        sel('Формат выгрузки', 'Таблица CSV', h(E.Icon, { name: 'file-excel' })),
        h(E.Toggle, { status: false, label: 'Автовыгрузка', description: 'В 12:00 формируем отчёт и отправляем его автоматически' })));
  }

  function AppMainDashboard() {
    var sumRow = function (label, desc, value, fiat, divider) { return h(E.ListItem, { key: label, size: 'm', divider: divider, label: label, description: desc, trailing: h(E.Amount, { size: 'm', align: 'end', sign: 'positive', value: value, ticker: 'KAS', fiat: fiat }) }); };
    var fact = function (label, value, sub, cls, leading, divider) { return h(E.ListItem, { key: label, size: 'm', showDescription: false, divider: divider, leading: leading, label: label, trailing: div('demo-two demo-two--end', text('demo-two__p', value), text(cls || 'demo-two__s', sub)) }); };
    return h(AppShell, { tabs: true, coin: 'KAS', coins: ['kas'] },
      h(E.Tabs, { size: 'm', fill: true, label: 'Разделы майнинга', defaultValue: 'Дашборд', items: ['Дашборд', 'Воркеры', 'История', 'Настройки'].map(function (l) { return { value: l, label: l }; }) }),
      h(E.Card, { level: 2, padding: 's', border: false }, div('emcd-list',
        sumRow('Сумма к выплате', 'На внутренний кошелёк', '0.0039123', '≈ $0.00018', true), sumRow('Добыто', 'за 20.09', '0.0029123', '≈ $0.00013', true),
        sumRow('Прогноз на сегодня', 'на основе данных за 20.09', '0.0029124', '≈ $0.00014', false))),
      h(E.Card, { level: 2, padding: 's', border: false }, div('emcd-list',
        fact('KAS', '$0.07', '− 3.61 %', 'demo-delta demo-delta--down', h(E.Coin, { coin: 'kas', size: 'l' }), true), fact('Дневной доход', '0.2243 KAS', 'за 1 TH/s', null, null, true),
        fact('Сложность сети', '61.18 P', '+0.23 %', 'demo-delta demo-delta--up', null, true), fact('Блоков до пересчёта', '248', '~1 д 11 ч 3 м', null, null, false))),
      chartCard(true),
      h(E.Card, { padding: 'm', border: false }, h(E.StatusSummary, { layout: 'row', offline: 9, unstable: 4, active: 90 })),
      h(E.PromoCarousel, { slides: [h(E.PromoCard, { key: 1, size: 'm', title: 'Забусти свой майнинг с нашей прошивкой', actionLabel: 'Подробнее', showMedia: true, showClose: false, showDescription: false })] }));
  }

  var SCREENS = { 'web-dashboard': WebDashboard, 'web-workers': WebWorkers, 'web-history': WebHistory, 'mw-dashboard': MwDashboard, 'mw-workers': MwWorkers, 'mw-history': MwHistory,
    'web-calculator': WebCalculator, 'mw-calculator': MwCalculator, 'web-watcher': WebWatcher, 'web-settings': WebSettings,
    'web-payouts': WebPayouts, 'mw-payouts': MwPayouts, 'mw-watcher': MwWatcher, 'mw-settings-notify': MwSettingsNotify, 'mw-settings-withdraw': MwSettingsWithdraw,
    'app-dashboard': AppDashboard, 'app-workers': AppWorkers, 'app-history': AppHistory, 'app-payouts': AppPayouts,
    'app-calculator': AppCalculator, 'app-settings-withdraw': AppSettingsWithdraw, 'app-settings-notify': AppSettingsNotify, 'app-watcher': AppWatcher, 'app-export': AppExport, 'app-main-dashboard': AppMainDashboard };
  ReactDOM.createRoot(document.getElementById('root')).render(h(SCREENS[screen] || WebDashboard));
})();
