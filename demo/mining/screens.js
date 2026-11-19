/* Демо K4: 6 экранов майнинга из компонентов репо (window.EMCD — claude-ds/bundle/bundle.js, React 18 UMD из vendor/).
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
        div('demo-web__content', props.children)));
  }

  function MwShell(props) {
    return div('demo-mw',
      h(E.TopBar, { logo: text('demo-logo demo-logo--mw', 'E'), account: 'Alexandrewang', balance: '$123 456', cents: '.78' }),
      h(E.Tabs, { size: 'm', label: 'Разделы майнинга', defaultValue: props.tab, className: 'demo-mw__tabs',
        items: ['Дашборд', 'Воркеры', 'История', 'Настройки', 'Калькулятор', 'Watcher-link'].map(function (l) { return { value: l, label: l }; }) }),
      div('demo-mw__content', props.children),
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
      metrics: METRICS, periods: PERIODS, periodSize: 'm', legend: LEGEND, showBottom: false },
    h(E.ChartPlot, { type: 'line-bars', labels: HOURS, dates: DATES, times: TIMES, xTicks: compact ? 3 : 6,
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
                div('demo-stat', text('demo-caption', s.label), h(E.Amount, { size: 'l', value: s.value, ticker: 'KAS', fiat: s.fiat })));
            }),
            h(E.SelectCompact, { label: 'Монета выплаты', options: KAS_OPTIONS, className: 'demo-summary__coin' })),
          h(E.Card, { level: 2, radius: 'inner', border: false, className: 'demo-facts' },
            div('demo-facts__row',
              div('demo-fact', h(E.Coin, { coin: 'kas', size: 's' }), text('demo-fact__key', 'KAS'), text('demo-fact__val', '$0.07'), text('demo-delta demo-delta--down', '−3.61 %')),
              div('demo-fact', text('demo-fact__key', 'Дневной доход'), text('demo-fact__val', '0.2243 KAS'), text('demo-fact__key', 'за 1 TH/s')),
              div('demo-fact', text('demo-fact__key', 'Сложность сети'), text('demo-fact__val', '61.18 P'), text('demo-delta demo-delta--up', '+0.23 %'),
                h(E.IconButton, { type: 'ghost', size: 's', label: 'Открыть в эксплорере', icon: h(E.Icon, { name: 'arrow-new-tab' }) })),
              div('demo-fact', text('demo-fact__key', 'Блоков до пересчёта'), text('demo-fact__val', '248'), text('demo-fact__key', '~1 д 11 ч 3 м'))))),
        div('demo-chart-row', chartCard(false), h(E.StatusSummary, { layout: 'column', offline: 9, unstable: 1, active: 40, className: 'demo-chart-row__summary' }))));
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
  var NETWORKS = [{ value: 'trc', label: 'TRC-20 · Tron' }, { value: 'erc', label: 'ERC-20 · Ethereum' }];
  function WebHistory() {
    var cols = [
      { key: 'date', label: 'Дата и время', width: '24%', render: function (r) { return twoLines(r.date, r.time); } },
      { key: 'value', label: 'Сумма', width: '24%', render: function (r) { return div('demo-amount-cell', h(E.Coin, { coin: r.coin, size: 's' }), h(E.Amount, { size: 'm', value: r.value, ticker: r.ticker, fiat: r.fiat })); } },
      { key: 'type', label: 'Тип', width: '22%', render: function (r) { return text('demo-two__p', r.type); } },
      { key: 'hash', label: 'Ср. хешрейт', render: function (r) { return text('demo-two__p', r.hash); } },
      { key: 'more', label: '', align: 'end', width: 56, render: function () { return h(E.IconButton, { type: 'tertiary', size: 'xs', label: 'Подробнее', icon: h(E.Icon, { name: 'chevron-down' }) }); } }];
    var coinRow = function (coin, val, fiat) {
      return h(E.ListItem, { size: 'm', showDescription: false, leading: h(E.Coin, { coin: coin, size: 'm' }), label: val, trailing: text('demo-muted', fiat) });
    };
    return h(WebShell, { tab: 'История' },
      div('demo-menu demo-menu--split', coinSelect(['ltc', 'eth', 'x'], 'Litecoin + 6', '6'),
        h(E.Segmented, { size: 'm', label: 'Вид истории', className: 'demo-seg-wide', items: [{ value: 'acc', label: 'Начисления' }, { value: 'pay', label: 'Выплаты' }] })),
      div('demo-blocks',
        div('demo-filters',
          h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Сеть', hint: 'Комиссия сети 1 USDT', options: NETWORKS, defaultValue: 'trc', className: 'demo-filters__net' }),
          h(E.Select, { size: 'm', labelPosition: 'on-border', label: 'Сеть', hint: 'Комиссия сети 1 USDT', options: NETWORKS, defaultValue: 'trc', className: 'demo-filters__net' }),
          h(E.DateRangeField, { label: 'Период', className: 'demo-filters__period', panel: { isDateDisabled: function (d) { return d > new Date().toISOString().slice(0, 10); } } }),
          h(E.Button, { type: 'tertiary', size: 'm', label: 'Выгрузить', iconLeft: h(E.Icon, { name: 'file-excel' }), className: 'demo-filters__btn' })),
        div('demo-history',
          h(E.Card, { padding: 'm', className: 'demo-history__total' },
            h(E.Suggest, { layout: 'strip', tone: 'warning', title: 'Начисления ежедневно с 15:00 до 16:00', primaryAction: false, close: false }),
            div('demo-total', h(E.Amount, { size: 'l', value: '$12 457.89' }), text('demo-caption demo-caption--md', 'Всего начислено')),
            h(E.Divider, null),
            div('demo-group', text('demo-caption demo-caption--md', 'PPS+'), coinRow('ltc', '8.9012 LTC', '≈ $78.90')),
            div('demo-group', text('demo-caption demo-caption--md', 'PPLNS'),
              coinRow('doge', '9.0123 DOGE', '≈ $34.56'), coinRow('bel', '123.4567 BEL', '≈ $90.12'), coinRow('lky', '67.8901 LKY', '≈ $89.01'), coinRow('pep', '789.0123 PEP', '≈ $45.67'))),
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
        SUMMARY.map(function (s, i) { return div('demo-stat', text('demo-caption demo-caption--md', s.label), h(E.Amount, { key: i, size: 'l', value: s.value, ticker: 'KAS', fiat: s.fiat })); })),
      h(E.Card, { padding: 'm', border: false, className: 'demo-mw-facts' },
        h(E.ListItem, { size: 'm', showDescription: false, divider: true, leading: h(E.Coin, { coin: 'kas', size: 'l' }), label: 'KAS',
          trailing: div('demo-two demo-two--end', text('demo-two__p', '$0.07'), text('demo-delta demo-delta--down', '−3.61 %')) }),
        h(E.ListItem, { size: 'm', showDescription: false, divider: true, label: 'Дневной доход', trailing: div('demo-two demo-two--end', text('demo-two__p', '0.2243 KAS'), text('demo-two__s', 'за 1 TH/s')) }),
        h(E.ListItem, { size: 'm', showDescription: false, divider: true, label: 'Сложность сети', trailing: div('demo-fact',
          h(E.IconButton, { type: 'ghost', size: 's', label: 'Открыть в эксплорере', icon: h(E.Icon, { name: 'arrow-new-tab' }) }),
          div('demo-two demo-two--end', text('demo-two__p', '61.18 P'), text('demo-delta demo-delta--up', '+0.23 %'))) }),
        h(E.ListItem, { size: 'm', showDescription: false, label: 'Блоков до пересчёта', trailing: div('demo-two demo-two--end', text('demo-two__p', '248'), text('demo-two__s', '~1 д 11 ч 3 м')) })),
      chartCard(true),
      h(E.Card, { padding: 'm', border: false }, h(E.StatusSummary, { layout: 'row', offline: 9, unstable: 1, active: 40 })),
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
    return h(MwShell, { tab: 'История', bar: h(E.ActionBar, { actions: [{ label: 'Фильтры', iconLeft: 'tuning' }, { label: 'Выгрузить', iconLeft: 'file-excel' }] }) },
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

  var SCREENS = { 'web-dashboard': WebDashboard, 'web-workers': WebWorkers, 'web-history': WebHistory, 'mw-dashboard': MwDashboard, 'mw-workers': MwWorkers, 'mw-history': MwHistory };
  ReactDOM.createRoot(document.getElementById('root')).render(h(SCREENS[screen] || WebDashboard));
})();
