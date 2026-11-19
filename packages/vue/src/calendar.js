// Даты для DsCalendar, DsDateRangePanel, DsDateRangeField — та же логика, что в packages/react/src/index.js (Calendar): строки ISO «ГГГГ-ММ-ДД», арифметика в UTC; на входе — ISO или Date.
export const pad2 = (v) => String(v).padStart(2, '0');
export const toISO = (d) => (d == null || d === '' ? null : typeof d === 'string' ? d.slice(0, 10) : `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`);
const isoUTC = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const fromUTC = (t) => { const d = new Date(t); return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`; };
export const addDays = (s, n) => fromUTC(isoUTC(s) + n * 864e5);
export const addMonths = (s, n) => {
  const [y, m, d] = s.split('-').map(Number); const t = new Date(Date.UTC(y, m - 1 + n, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return fromUTC(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), Math.min(d, last)));
};
export const monthStart = (s) => s.slice(0, 8) + '01';
export const weekday = (s) => new Date(isoUTC(s)).getUTCDay(); // 0 — воскресенье
export const fmtDay = (s, locale, opt) => new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...opt }).format(new Date(isoUTC(s)));
const capital = (t) => t.charAt(0).toUpperCase() + t.slice(1);
// Первый день недели по локали (CLDR, Intl.Locale weekInfo): ru — понедельник
export function weekStartOf(locale) {
  try { const l = new Intl.Locale(locale); const w = (typeof l.getWeekInfo === 'function' && l.getWeekInfo()) || l.weekInfo; if (w && w.firstDay) return w.firstDay % 7; } catch (e) { /* старый движок */ }
  return /^(en-US|he|ja|pt-BR)/.test(locale) ? 0 : 1;
}
export const fullDate = (s, locale) => fmtDay(s, locale, { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s*г\.$/, '');
export const shortDate = (s, locale) => fmtDay(s, locale, { day: '2-digit', month: '2-digit', year: '2-digit' });
export const normRange = (r) => (r ? { from: toISO(r.from), to: toISO(r.to) } : { from: null, to: null });
export const weekdayNames = (locale, ws) => Array.from({ length: 7 }, (_, i) => capital(fmtDay(addDays('2024-01-07', (ws + i) % 7), locale, { weekday: 'short' })));
export const monthTitle = (first, locale) => `${capital(fmtDay(first, locale, { month: 'long' }))} ${first.slice(0, 4)}`;
export const gridDays = (first, ws) => { const start = addDays(first, -((weekday(first) - ws + 7) % 7)); return Array.from({ length: 42 }, (_, i) => addDays(start, i)); };
// Пресеты Date range panel: days — N дней до «сегодня» включительно, months — N месяцев, range(today) — свой расчёт; «Свой период» — ручной выбор (null)
export const DATE_PRESETS = [{ value: 'today', label: 'Сегодня', days: 1 }, { value: '7d', label: '7 дней', days: 7 }, { value: '30d', label: '30 дней', days: 30 },
  { value: 'quarter', label: 'Квартал', months: 3 }, { value: 'year', label: 'Год', months: 12 }, { value: 'custom', label: 'Свой период' }];
export const presetRange = (p, t) => (p.range ? normRange(p.range(t)) : p.days ? { from: addDays(t, 1 - p.days), to: t } : p.months ? { from: addDays(addMonths(t, -p.months), 1), to: t } : null);
