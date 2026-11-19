/* @ds-bundle: {"format":4,"namespace":"EMCD","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Badge"},{"name":"Chip"},{"name":"Checkbox"},{"name":"Radio"},{"name":"RadioGroup"},{"name":"Toggle"},{"name":"Input"},{"name":"Textarea"},{"name":"Modal"},{"name":"Counter"},{"name":"Status"},{"name":"Avatar"},{"name":"Divider"},{"name":"Spinner"},{"name":"Progress"},{"name":"Amount"},{"name":"Card"},{"name":"StatCard"},{"name":"Tooltip"},{"name":"Toast"},{"name":"Suggest"},{"name":"Tab"},{"name":"Tabs"},{"name":"Segment"},{"name":"Segmented"},{"name":"ListItem"},{"name":"Transaction"},{"name":"MenuItem"},{"name":"Menu"},{"name":"Select"},{"name":"PasswordField"},{"name":"Icon"},{"name":"Coin"},{"name":"CoinStack"},{"name":"NavItem"},{"name":"KeyValueRow"},{"name":"Search"},{"name":"SelectCompact"},{"name":"DateRangeField"},{"name":"PageIndicator"},{"name":"LegendSwatch"},{"name":"LegendItem"},{"name":"ChartMetric"},{"name":"TableHeaderCell"},{"name":"TableCell"},{"name":"TableRow"},{"name":"Table"},{"name":"PromoCard"},{"name":"Sidebar"},{"name":"ChartPlot"},{"name":"ChartCard"},{"name":"TopBar"},{"name":"StatusSummary"},{"name":"PromoCarousel"},{"name":"ActionBar"}]} */
/* EMCD DS 2.0 — компоненты React 18. Генерируется scripts/code-build.mjs из packages/react/src/index.js — не править руками. */
(function () {
'use strict';
var React = window.React;
// EMCD DS 2.0 — компоненты React 18 (пачка 1 — пилот из 10 наборов; пачка 2 — ещё 19 наборов; пачка 3 — наборы экранов майнинга и конструкции).
// Разметка и классы — те же, что в claude-ds/components/*/style.css (общий CSS для React, Vue и HTML).
// Без JSX и сборщика: React.createElement. Props — по контрактам docs/components/*.md («Props:»).
// Источник для Claude DS (bundle.js → window.EMCD) и для пакета @emcd/react.

const h = React.createElement;
const cx = (...a) => a.filter(Boolean).join(' ');
const useId = React.useId || (() => React.useMemo(() => 'emcd-' + Math.random().toString(36).slice(2, 8), []));

const SPINNER = (cls) => h('svg', { className: cls, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
  h('circle', { cx: 12, cy: 12, r: 9, stroke: 'currentColor', strokeOpacity: 0.24, strokeWidth: 2 }),
  h('path', { d: 'M21 12a9 9 0 0 0-9-9', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
const CLOSE = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', 'aria-hidden': true },
  h('path', { d: 'M6 6l12 12M18 6L6 18' }));

// Button / Icon button: type → класс (tertiary-outline = outline в CSS)
const BTN_TYPE = { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary', 'tertiary-outline': 'outline', text: 'text', inverted: 'inverted', ghost: 'ghost' };
const SIZE_MOD = { xs: 'xs', s: 's', m: '', l: 'l', xl: 'xl' };
// Точка статуса _Dot S (Status dot у Tab и Chip): success | warning | danger | neutral
const DOT = (tone, k) => h('span', { key: k, className: cx('emcd-dot', tone && tone !== 'success' && 'emcd-dot--' + tone), 'aria-hidden': true });

/** Button — действие. Одна главная (primary) на экран или блок. size: xs 24 (Web) · s 32 · m 40 (Web) · l 48 (App) · xl 56 (только App: главный CTA внизу экрана). Иконки — цвета подписи. */
const Button = React.forwardRef(function Button(
  { type = 'primary', tone = 'default', size = 'm', label, children, iconLeft, iconRight, loading = false, disabled, htmlType = 'button', className, ...rest }, ref) {
  return h('button', {
    ref, type: htmlType, disabled, 'aria-busy': loading || undefined,
    className: cx('emcd-btn', 'emcd-btn--' + BTN_TYPE[type], tone === 'danger' && 'emcd-btn--danger', SIZE_MOD[size] && 'emcd-btn--' + SIZE_MOD[size], className),
    ...rest,
  }, loading ? SPINNER() : iconLeft, h('span', null, label ?? children), !loading && iconRight);
});

/** Icon button — действие иконкой; `label` обязателен (доступное имя и тултип на Web). size: xs 24 · s 32 · m 40 · l 48 (XL снят). */
const IconButton = React.forwardRef(function IconButton(
  { type = 'tertiary', tone = 'default', size = 'm', label, icon, children, loading = false, disabled, htmlType = 'button', className, ...rest }, ref) {
  return h('button', {
    ref, type: htmlType, disabled, 'aria-label': label, title: label, 'aria-busy': loading || undefined,
    className: cx('emcd-btn', 'emcd-icon-btn', 'emcd-btn--' + BTN_TYPE[type], tone === 'danger' && 'emcd-btn--danger', SIZE_MOD[size] && 'emcd-btn--' + SIZE_MOD[size], className),
    ...rest,
  }, loading ? SPINNER() : (icon ?? children));
});

/** Badge — неинтерактивная метка статуса или свойства. Тона Info нет (Info = цвет бренда → accent). */
function Badge({ size = 'm', tone = 'neutral', style = 'subtle', label, children, icon, skeleton = false, className, ...rest }) {
  return h('span', {
    className: cx('emcd-badge', size !== 'm' && 'emcd-badge--' + size, tone !== 'neutral' && 'emcd-badge--' + tone, style === 'solid' && 'emcd-badge--solid', skeleton && 'emcd-badge--skeleton', className),
    'aria-hidden': skeleton || undefined, ...rest,
  }, icon, h('span', { className: 'emcd-badge__label' }, label ?? children));
}

/** Chip — фильтр или выбор; `selected` → aria-pressed (инверсная белая плашка). `statusDot` — точка статуса перед подписью (statusTone). `onRemove` — крестик удаления. */
function Chip({ size = 's', selected = false, label, children, metaText, icon, statusDot = false, statusTone = 'success', onRemove, removeLabel = 'Убрать', trailingIcon, disabled, onClick, className, ...rest }) {
  const body = [icon, statusDot && DOT(statusTone, 'dot'), h('span', { key: 'l', className: 'emcd-chip__label' }, label ?? children), metaText != null && h('span', { key: 'm', className: 'emcd-chip__meta' }, metaText), trailingIcon];
  if (onRemove) {
    return h('span', { className: cx('emcd-chip', size === 'm' && 'emcd-chip--m', selected && 'emcd-chip--selected', className), ...rest },
      h('button', { type: 'button', className: 'emcd-chip__action', 'aria-pressed': selected, disabled, onClick }, ...body),
      h('button', { type: 'button', className: 'emcd-chip__remove', 'aria-label': removeLabel, disabled, onClick: onRemove }, CLOSE));
  }
  return h('button', { type: 'button', className: cx('emcd-chip', size === 'm' && 'emcd-chip--m', selected && 'emcd-chip--selected', className), 'aria-pressed': selected, disabled, onClick, title: typeof (label ?? children) === 'string' ? (label ?? children) : undefined, ...rest }, ...body);
}

function CheckLike({ kind, status, tone = 'default', size = 'm', controlPosition = 'start', label, description, children, disabled, onChange, className, inputProps, ...rest }) {
  const ref = React.useRef(null);
  const checked = kind === 'checkbox' ? status === 'on' || status === true : !!status;
  React.useEffect(() => { if (ref.current && kind === 'checkbox') ref.current.indeterminate = status === 'indeterminate'; }, [status, kind]);
  const isToggle = kind === 'toggle';
  const base = isToggle ? 'emcd-toggle' : 'emcd-check';
  const endMod = isToggle ? (controlPosition === 'start' && 'emcd-toggle--start') : (controlPosition === 'end' && 'emcd-check--end');
  return h('label', { className: cx(base, size === 's' && base + '--s', endMod, tone === 'danger' && 'emcd-check--danger', className), ...rest },
    // Без onChange — неуправляемый (кликается в прототипе), с onChange — управляемый.
    h('input', { ref, type: kind === 'radio' ? 'radio' : 'checkbox', role: isToggle ? 'switch' : undefined, disabled,
      ...(onChange ? { checked, onChange: (e) => onChange(e.target.checked, e) } : { defaultChecked: checked }),
      'aria-invalid': tone === 'danger' || undefined, ...inputProps }),
    h('span', { className: base + '__text' }, h('span', null, label ?? children), description && h('span', { className: base + '__desc' }, description)));
}

/** Checkbox — независимый выбор; status: off | on | indeterminate. onChange(checked, event). */
function Checkbox({ status = 'off', ...p }) { return h(CheckLike, { kind: 'checkbox', status, ...p }); }
/** Radio — один из группы; оборачивать в RadioGroup. */
function Radio({ status = false, name, value, ...p }) { return h(CheckLike, { kind: 'radio', status, inputProps: { name, value }, ...p }); }
/** Radio group — fieldset + legend. */
function RadioGroup({ legend, children, className, ...rest }) {
  return h('fieldset', { className: cx('emcd-radio-group', className), role: 'radiogroup', ...rest }, legend && h('legend', null, legend), children);
}
/** Toggle — мгновенное вкл / выкл без кнопки «Сохранить». По умолчанию переключатель справа (controlPosition = end). */
function Toggle({ status = false, controlPosition = 'end', ...p }) { return h(CheckLike, { kind: 'toggle', status, controlPosition, ...p }); }

function Field({ size = 'm', labelPosition = 'on-border', state = 'default', label, hint, error, counter, className, children, as = 'label' }) {
  const isError = state === 'error' || !!error;
  const msg = error || hint;
  const id = useId();
  return h(as, { className: cx('emcd-field', size !== 'm' && 'emcd-field--' + size, labelPosition === 'on-border' && 'emcd-field--on-border', isError && 'emcd-field--error', state === 'disabled' && 'emcd-field--disabled', state === 'readonly' && 'emcd-field--readonly', state === 'skeleton' && 'emcd-field--skeleton', className), 'aria-hidden': state === 'skeleton' || undefined },
    label && h('span', { className: 'emcd-field__label' }, label),
    children(msg ? id : undefined, isError),
    (msg || counter != null) && h('span', { className: 'emcd-field__row' }, msg && h('span', { className: 'emcd-field__hint', id }, msg), counter != null && h('span', { className: 'emcd-field__counter' }, counter)));
}

/** Input — однострочное поле. state: default | error | disabled | readonly | loading | skeleton. */
const Input = React.forwardRef(function Input(
  { size = 'm', labelPosition = 'on-border', state = 'default', label, hint, error, counter, leading, trailing, suffix, className, ...inputProps }, ref) {
  return h(Field, { size, labelPosition, state: state === 'loading' ? 'default' : state, label, hint, error, counter, className },
    (describedBy, isError) => h('span', { className: 'emcd-input' },
      leading && h('span', { className: 'emcd-input__leading' }, leading),
      h('input', { ref, disabled: state === 'disabled', readOnly: state === 'readonly', 'aria-invalid': isError || undefined, 'aria-describedby': describedBy, 'aria-busy': state === 'loading' || undefined, ...inputProps }),
      suffix && h('span', { className: 'emcd-input__suffix' }, suffix),
      state === 'loading' ? h('span', { className: 'emcd-input__trailing' }, SPINNER('emcd-field__spinner')) : trailing && h('span', { className: 'emcd-input__trailing' }, trailing)));
});

/** Textarea — многострочное поле; растёт по содержимому до max-height, дальше скролл. size: m | l (меняет шрифт и отступы); подпись только над полем. */
const Textarea = React.forwardRef(function Textarea(
  { size = 'm', state = 'default', label, hint, error, counter, maxLength, className, value, defaultValue, ...rest }, ref) {
  const [len, setLen] = React.useState(String(value ?? defaultValue ?? '').length);
  const shown = counter ?? (maxLength ? `${value != null ? String(value).length : len}/${maxLength}` : undefined);
  return h(Field, { size, labelPosition: 'above', state, label, hint, error, counter: shown, className },
    (describedBy, isError) => h('textarea', { ref, className: 'emcd-textarea', maxLength, value, defaultValue, disabled: state === 'disabled', readOnly: state === 'readonly', 'aria-invalid': isError || undefined, 'aria-describedby': describedBy,
      onInput: (e) => setLen(e.target.value.length), ...rest }));
});

/** Modal — диалог. header: title | coin | empty; footer: single | stacked | horizontal | none. На Compact — Sheet. */
function Modal({ open = true, header = 'title', footer = 'single', title, description, coin, divider = false, showClose = true, onClose, closeLabel = 'Закрыть', width = 'md', children, actions, scrim = true, className }) {
  const id = useId();
  React.useEffect(() => {
    if (!open || !onClose) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const close = showClose && h(IconButton, { type: 'ghost', label: closeLabel, className: 'emcd-modal__close', onClick: onClose, icon: CLOSE });
  const head = header === 'coin'
    ? h('div', { className: 'emcd-modal__heading' }, coin ?? h('span', { className: 'emcd-modal__coin' }), h('div', null, h('h2', { className: 'emcd-modal__title', id }, title), description && h('p', { className: 'emcd-modal__desc' }, description)))
    : header === 'title' ? h('h2', { className: 'emcd-modal__title', id }, title) : null;
  const dialog = h('div', { className: cx('emcd-modal', width !== 'md' && 'emcd-modal--' + width, footer === 'none' && 'emcd-modal--no-footer', className), role: 'dialog', 'aria-modal': true, 'aria-labelledby': head ? id : undefined, 'aria-label': head ? undefined : title, 'data-open': '' },
    h('div', { className: 'emcd-modal__header' }, head, close),
    divider && h('hr', { className: 'emcd-modal__divider' }),
    h('div', { className: 'emcd-modal__body' }, typeof children === 'string' ? h('p', null, children) : children),
    footer !== 'none' && h('div', { className: cx('emcd-modal__footer', footer === 'horizontal' && 'emcd-modal__footer--horizontal') }, actions));
  return scrim ? h('div', { className: 'emcd emcd-modal-scrim', onClick: (e) => { if (e.target === e.currentTarget && onClose) onClose(); } }, dialog) : dialog;
}

// ───────────── Пачка 2 ─────────────
// Иконки (24, обводка 1.5, currentColor) — минимальный набор для компонентов; в продукте — иконки DS.
const ICO = (...kids) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }, ...kids);
const P = (d, k) => h('path', { d, key: k });
const C = (r = 9, cy = 12, k = 'c') => h('circle', { cx: 12, cy, r, key: k });
const I = {
  chevronDown: () => ICO(P('M6 9l6 6 6-6')),
  check: () => ICO(P('M5 12.5l4.5 4.5L19 7.5')),
  minus: () => ICO(P('M7 12h10')),
  eye: () => ICO(P('M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0', 'p'), C(3)),
  eyeOff: () => ICO(P('M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61M9.88 9.88a3 3 0 1 0 4.24 4.24M3 3l18 18')),
  info: () => ICO(C(), P('M12 11v5M12 8h.01', 'p')),
  checkCircle: () => ICO(C(), P('M8.5 12.5l2.5 2.5 4.5-5', 'p')),
  alertTriangle: () => ICO(P('M10.3 4.2L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0zM12 10v4M12 17h.01')),
  alertCircle: () => ICO(C(), P('M12 8v4.5M12 16h.01', 'p')),
  arrowUp: () => ICO(P('M12 19V5M6 11l6-6 6 6')),
  arrowDown: () => ICO(P('M12 5v14M18 13l-6 6-6-6')),
  lightning: () => ICO(P('M13 2.5L4.5 13.5H12l-1 8 8.5-11H12l1-8z')),
  exchange: () => ICO(P('M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7')),
  user: () => ICO(C(4, 8), P('M4 21a8 8 0 0 1 16 0', 'p')),
  search: () => ICO(h('circle', { cx: 11, cy: 11, r: 7, key: 'c' }), P('M20 20l-3.5-3.5', 'p')),
};

// Неуправляемый по умолчанию: без value — своё состояние (прототип кликается), с value — управляемый.
function useControllable(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const set = React.useCallback((v, ...a) => { if (!controlled) setInner(v); if (onChange) onChange(v, ...a); }, [controlled, onChange]);
  return [controlled ? value : inner, set];
}
const ARROW_KEYS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
// Перемещение по группе стрелками (Tabs, Segmented): фокус + выбор, Home / End; в RTL ← и → меняются местами.
function rovingKeys(e, selector) {
  const list = [...e.currentTarget.querySelectorAll(selector)].filter((el) => !el.disabled);
  const i = list.indexOf(document.activeElement);
  if (i < 0) return;
  let step = ARROW_KEYS[e.key];
  if (step && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && getComputedStyle(e.currentTarget).direction === 'rtl') step = -step;
  const next = e.key === 'Home' ? list[0] : e.key === 'End' ? list[list.length - 1] : step ? list[(i + step + list.length) % list.length] : null;
  if (!next) return;
  e.preventDefault(); next.focus(); next.click();
}

/** Counter — число у таба, пункта меню, иконки. Не статус. */
function Counter({ size = 's', tone = 'neutral', value, children, className, ...rest }) {
  return h('span', { className: cx('emcd-counter', size === 'm' && 'emcd-counter--m', tone !== 'neutral' && 'emcd-counter--' + tone, className), ...rest }, value ?? children);
}

/** Status — точка + подпись: состояние, которое обновляется само. showLabel=false — только с aria-label (подпись уходит в него). */
function Status({ size = 's', tone = 'success', label, children, showLabel = true, className, ...rest }) {
  const text = label ?? children;
  return h('span', { className: cx('emcd-status', size === 'm' && 'emcd-status--m', tone !== 'success' && 'emcd-status--' + tone, className),
    role: showLabel ? undefined : 'img', 'aria-label': showLabel ? undefined : (typeof text === 'string' ? text : undefined), ...rest },
  h('span', { className: 'emcd-status__dot', 'aria-hidden': true }), showLabel && h('span', { className: 'emcd-status__label' }, text));
}

/** Avatar — круг: инициал (Text), иконка (Icon) или фото (Image). status — точка «в сети». */
function Avatar({ size = 'xs', type, initials, name, src, alt = '', icon, status = false, skeleton = false, className, ...rest }) {
  const kind = type ?? (src ? 'image' : (initials || name) ? 'text' : 'icon');
  const letter = (initials ?? (name ? String(name).trim()[0] : '') ?? '').slice(0, 1);
  const inner = kind === 'image' ? h('img', { src, alt }) : kind === 'text' ? h('span', { 'aria-hidden': !!name || undefined }, letter) : (icon ?? I.user());
  return h('span', { className: cx('emcd-avatar', size !== 'xs' && 'emcd-avatar--' + size, kind === 'icon' && 'emcd-avatar--icon', skeleton && 'emcd-avatar--skeleton', className),
    role: name && kind !== 'image' ? 'img' : undefined, 'aria-label': name && kind !== 'image' ? name : undefined, 'aria-hidden': skeleton || undefined, ...rest },
  h('span', { className: 'emcd-avatar__circle' }, inner), status && !skeleton && h('span', { className: 'emcd-avatar__status', 'aria-label': 'В сети', role: 'img' }));
}

/** Divider — линия border-subtle. label=true — подпись «или» (только Horizontal). style: solid | dotted (во Vue — variant). */
function Divider({ orientation = 'horizontal', label = false, labelText = 'или', style = 'solid', className, ...rest }) {
  const cls = cx('emcd-divider', orientation === 'vertical' && 'emcd-divider--vertical', style === 'dotted' && 'emcd-divider--dotted', className);
  if (orientation === 'vertical') return h('span', { role: 'separator', 'aria-orientation': 'vertical', className: cls, ...rest });
  if (label) return h('div', { role: 'separator', className: cx(cls, 'emcd-divider--label'), ...rest }, labelText);
  return h('hr', { className: cls, ...rest });
}

/** Spinner — неизвестная длительность; цвет от родителя. В блоке — с подписью для скринридера. */
function Spinner({ size = 's', label = 'Загрузка', className, ...rest }) {
  return h('svg', { className: cx('emcd-spinner', size !== 's' && 'emcd-spinner--' + size, className), viewBox: '0 0 24 24', fill: 'none', role: 'status', 'aria-label': label, ...rest },
    h('circle', { cx: 12, cy: 12, r: 9, stroke: 'currentColor', strokeOpacity: 0.2, strokeWidth: 2 }),
    h('path', { d: 'M21 12a9 9 0 0 0-9-9', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
}

/** Progress — доля выполненного. percent 0–100 — ширина fill; value — текст справа («6 000 / 10 000 USDT»). Indeterminate — только Accent. */
function Progress({ size = 's', tone = 'accent', mode = 'determinate', label, value, percent = 0, showLabel = true, className, ...rest }) {
  const ind = mode === 'indeterminate';
  const pct = Math.max(0, Math.min(100, Number(percent) || 0));
  return h('div', { className: cx('emcd-progress', size === 'm' && 'emcd-progress--m', !ind && tone !== 'accent' && 'emcd-progress--' + tone, ind && 'emcd-progress--indeterminate', className), ...rest },
    showLabel && (label != null || value != null) && h('div', { className: 'emcd-progress__row' },
      h('span', { className: 'emcd-progress__label' }, label), !ind && value != null && h('span', { className: 'emcd-progress__value' }, value)),
    h('div', { className: 'emcd-progress__track', role: 'progressbar', 'aria-label': typeof label === 'string' ? label : undefined,
      'aria-valuemin': ind ? undefined : 0, 'aria-valuemax': ind ? undefined : 100, 'aria-valuenow': ind ? undefined : pct, 'aria-valuetext': !ind && typeof value === 'string' ? value : undefined },
    h('span', { className: 'emcd-progress__fill', style: ind ? undefined : { width: pct + '%' } })));
}

const MINUS = '−';
/** Amount — сумма + тикер (неразрывный пробел) + фиат второй строкой. Sign: positive «+» и цвет успеха; negative «−» (U+2212), не красный. */
function Amount({ size = 's', sign = 'none', value, ticker, fiat, showFiat = true, align = 'start', className, ...rest }) {
  let v = value;
  if (typeof v === 'number' || typeof v === 'string') {
    v = String(v).replace(/^[-+−]\s*/, '');
    if (sign === 'positive') v = '+' + v; else if (sign === 'negative') v = MINUS + v;
  }
  return h('span', { className: cx('emcd-amount', size !== 's' && 'emcd-amount--' + size, sign !== 'none' && 'emcd-amount--' + sign, align === 'end' && 'emcd-amount--end', className), ...rest },
    h('span', { className: 'emcd-amount__row' }, h('span', { className: 'emcd-amount__value' }, v), ticker != null && ' ', ticker != null && h('span', { className: 'emcd-amount__ticker' }, ticker)),
    showFiat && fiat != null && h('span', { className: 'emcd-amount__fiat' }, fiat));
}

/** Card — подложка: Level по вложенности, Radius, Padding, Border. Кликабельная — href (ссылка) или onClick (кнопка) на всю площадь. */
function Card({ level = 1, radius = 'container', padding = 's', border = true, as, href, onClick, children, className, ...rest }) {
  const tag = as ?? (href ? 'a' : onClick ? 'button' : 'div');
  return h(tag, { href, onClick, type: tag === 'button' ? 'button' : undefined,
    className: cx('emcd-card', Number(level) !== 1 && 'emcd-card--level-' + level, radius !== 'container' && 'emcd-card--radius-' + radius, padding !== 's' && 'emcd-card--padding-' + padding, border && 'emcd-card--border', (href || onClick) && 'emcd-card--interactive', className), ...rest }, children);
}

const DELTA_TONE = { success: 'success', danger: 'danger', neutral: 'neutral' };
const ARROW_RIGHT = () => ICO(P('M5 12h14M13 6l6 6-6 6'));
/** Stat card — один показатель. tone: neutral | danger | warning | success (плитки статусной сводки); align: start | center (плитки статусов).
 *  delta + deltaValue («+4,2 %») + deltaTone: success рост · danger падение · neutral без изменений. link — Icon button XS со стрелкой (onLink): Danger — Secondary Danger, иначе Tertiary. */
function StatCard({ tone = 'neutral', align = 'start', label, value, unit, info = true, infoText, delta = true, deltaValue, deltaTone = 'success', deltaCaption, showFooter = false, footer,
  link = false, linkLabel = 'Открыть список', onLink, ambientLight = false, skeleton = false, className, ...rest }) {
  const cls = cx('emcd-stat', tone !== 'neutral' && 'emcd-stat--' + tone, align === 'center' && 'emcd-stat--center', ambientLight && 'emcd-stat--ambient', skeleton && 'emcd-stat--skeleton', className);
  if (skeleton) {
    return h('div', { className: cls, 'aria-busy': true, ...rest },
      h('div', { className: 'emcd-stat__label-row' }, h('span', { className: 'emcd-stat__bone', style: { width: 96, height: 12 } })),
      h('div', { className: 'emcd-stat__value-row' }, h('span', { className: 'emcd-stat__bone', style: { width: 140, height: 28 } })),
      h('div', { className: 'emcd-stat__delta-row' }, h('span', { className: 'emcd-stat__bone', style: { width: 112, height: 16 } })));
  }
  return h('div', { className: cls, ...rest },
    h('div', { className: 'emcd-stat__label-row' }, h('span', { className: 'emcd-stat__label' }, label),
      info && infoText && h(Tooltip, { text: infoText }, h('button', { type: 'button', className: 'emcd-stat__info', 'aria-label': 'Что это' }, I.info()))),
    h('div', { className: 'emcd-stat__value-row' }, h('span', { className: 'emcd-stat__value' }, value), unit != null && h('span', { className: 'emcd-stat__unit' }, unit)),
    delta && deltaValue != null && h('div', { className: 'emcd-stat__delta-row' },
      h(Badge, { size: 's', tone: DELTA_TONE[deltaTone] || 'neutral', label: deltaValue }), deltaCaption != null && h('span', { className: 'emcd-stat__caption' }, deltaCaption)),
    showFooter && footer != null && h('div', { className: 'emcd-stat__footer' }, footer),
    link && h(IconButton, { type: tone === 'danger' ? 'secondary' : 'tertiary', tone: tone === 'danger' ? 'danger' : 'default', size: 'xs', label: linkLabel, className: 'emcd-stat__link', icon: ARROW_RIGHT(), onClick: onLink }));
}

const TIP_ARROW = h('svg', { className: 'emcd-tooltip__arrow', viewBox: '0 0 26 9', 'aria-hidden': true },
  h('path', { className: 'emcd-tooltip__arrow-fill', d: 'M0 -1.5V.5L10.6 7.9Q13 9.6 15.4 7.9L26 .5V-1.5Z' }),
  h('path', { className: 'emcd-tooltip__arrow-edge', d: 'M0 .5L10.6 7.9Q13 9.6 15.4 7.9L26 .5' }));
/** Tooltip — подсказка к элементу на Web. С children — оборачивает триггер (наведение, фокус, Escape скрывает); без children — сам пузырь (макет). */
function Tooltip({ placement = 'top', tone = 'neutral', arrow = 'center', text, children, open, className, ...rest }) {
  const id = useId();
  const [hidden, setHidden] = React.useState(false);
  const bubble = h('span', { role: 'tooltip', id, className: cx('emcd-tooltip', 'emcd-tooltip--' + placement, tone === 'accent' && 'emcd-tooltip--accent', arrow !== 'center' && 'emcd-tooltip--arrow-' + arrow, className), ...rest }, text, TIP_ARROW);
  if (children == null) return bubble;
  const trigger = React.isValidElement(children) ? React.cloneElement(children, { 'aria-describedby': id }) : children;
  return h('span', { className: 'emcd-tooltip-anchor', 'data-open': open ? '' : undefined, 'data-hidden': hidden ? '' : undefined,
    onKeyDown: (e) => { if (e.key === 'Escape') setHidden(true); }, onMouseLeave: () => setHidden(false), onBlur: () => setHidden(false) }, trigger, open === false ? null : bubble);
}

const TOAST_GLYPH = { info: 'M12 11v5M12 7.8h.01', success: 'M8 12.3l2.8 2.8 5.2-5.6', warning: 'M12 7.5v5M12 16.2h.01', danger: 'M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6' };
/** Toast — отклик на действие, исчезает сам (duration, мс). Card — Web; Informer — App. Без onClose крестик скрывает сам Toast. */
function Toast({ layout = 'card', tone = 'info', title, showTitle = true, description, showDescription = true, actions = false, actionLabel = 'Открыть', onAction,
  close = true, onClose, closeLabel = 'Закрыть уведомление', icon = true, timer = false, duration, safeArea = true, open, className, children, ...rest }) {
  const [shown, setShown] = React.useState(true);
  const visible = open ?? shown;
  const left = React.useRef(duration);
  const started = React.useRef(0);
  const tm = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  const hide = React.useCallback(() => { setShown(false); if (closeRef.current) closeRef.current(); }, []);
  const start = React.useCallback(() => { if (!left.current) return; started.current = Date.now(); clearTimeout(tm.current); tm.current = setTimeout(hide, left.current); }, [hide]);
  const pause = () => { if (!tm.current) return; clearTimeout(tm.current); tm.current = null; left.current = Math.max(0, left.current - (Date.now() - started.current)); };
  React.useEffect(() => { left.current = duration; if (visible && duration) start(); return () => clearTimeout(tm.current); }, [visible, duration, start]);
  if (!visible) return null;
  const card = layout !== 'informer';
  const btns = actions === true ? h(Button, { type: 'secondary', size: 's', label: actionLabel, onClick: onAction }) : actions || null;
  return h('div', { role: tone === 'danger' ? 'alert' : 'status', 'aria-live': tone === 'danger' ? 'assertive' : 'polite',
    className: cx('emcd-toast', !card && 'emcd-toast--informer', tone !== 'info' && 'emcd-toast--' + tone, !card && safeArea && 'emcd-toast--safe-area', className),
    style: timer && duration ? { '--emcd-toast-duration': duration + 'ms' } : undefined, onMouseEnter: duration ? pause : undefined, onMouseLeave: duration ? start : undefined, ...rest },
  card && icon && tone !== 'neutral' && h('span', { className: 'emcd-toast__icon' },
    h('svg', { viewBox: '0 0 24 24', 'aria-hidden': true }, h('circle', { cx: 12, cy: 12, r: 12 }), h('path', { d: TOAST_GLYPH[tone] }))),
  h('div', { className: 'emcd-toast__content' },
    showTitle && title != null && h('p', { className: 'emcd-toast__title' }, title),
    card && showDescription && description != null && h('p', { className: 'emcd-toast__desc' }, description),
    children,
    card && btns && h('div', { className: 'emcd-toast__actions' }, btns)),
  (close || (card && timer)) && h('div', { className: 'emcd-toast__tools' },
    card && timer && h('svg', { className: 'emcd-toast__timer', viewBox: '0 0 16 16', 'aria-hidden': true }, h('circle', { cx: 8, cy: 8, r: 6 }), h('circle', { cx: 8, cy: 8, r: 6 })),
    close && h(IconButton, { type: 'ghost', size: 's', label: closeLabel, className: 'emcd-toast__close', icon: CLOSE, onClick: hide })));
}

const SUGGEST_ICON = { neutral: I.info, accent: I.info, success: I.checkCircle, warning: I.alertTriangle, danger: I.alertCircle };
/** Suggest — сообщение внутри страницы (Card — в колонке; Strip — вверху на всю ширину). 0–2 кнопки; крестик скрывает. */
function Suggest({ layout = 'card', tone = 'neutral', title, showTitle = true, description, showDescription = true, showLeading, leading,
  primaryAction = true, primaryLabel = 'Подробнее', onPrimary, secondaryAction = false, secondaryLabel = 'Позже', onSecondary,
  close = true, onClose, closeLabel = 'Скрыть', className, children, ...rest }) {
  const [shown, setShown] = React.useState(true);
  if (!shown) return null;
  const strip = layout === 'strip';
  // Strip (17.11, по продукту) — без иконки: левый блок только если явно передан leading или showLeading
  const lead = showLeading ?? (strip ? leading != null : true);
  return h('section', { className: cx('emcd-suggest', strip && 'emcd-suggest--strip', tone !== 'neutral' && 'emcd-suggest--' + tone, !close && 'emcd-suggest--no-close', className), ...rest },
    lead && h('span', { className: 'emcd-suggest__leading' }, leading ?? (SUGGEST_ICON[tone] || I.info)()),
    h('div', { className: 'emcd-suggest__content' },
      h('div', { className: 'emcd-suggest__text' },
        showTitle && title != null && h('p', { className: 'emcd-suggest__title' }, title),
        showDescription && description != null && h('p', { className: 'emcd-suggest__desc' }, description), children),
      primaryAction && h('div', { className: 'emcd-suggest__actions' },
        // Основная: на Neutral — Secondary, на Accent и тонах — Primary (на тонированной подложке Secondary сливается)
        h(Button, { type: tone === 'neutral' ? 'secondary' : 'primary', size: 's', label: primaryLabel, onClick: onPrimary }),
        secondaryAction && h(Button, { type: 'tertiary-outline', size: 's', label: secondaryLabel, onClick: onSecondary }))),
    close && h(IconButton, { type: 'ghost', size: 's', label: closeLabel, className: 'emcd-suggest__close', icon: CLOSE, onClick: () => { setShown(false); if (onClose) onClose(); } }));
}

const TabsCtx = React.createContext(null);
/** Tab — вкладка Tabs. size: s | m | l | page (табы-заголовок страницы, было xl). counter — число в Counter (Neutral; counterTone accent / danger — только если требует действия).
 *  statusDot — точка статуса перед подписью (табы-фильтры по статусу), тон — statusTone. */
function Tab({ size, selected, value, label, children, counter, counterTone = 'neutral', icon, statusDot = false, statusTone = 'success', disabled, skeleton = false, onClick, className, ...rest }) {
  const ctx = React.useContext(TabsCtx);
  const sz = size ?? (ctx && ctx.size) ?? 'm';
  const sel = ctx && value !== undefined ? ctx.value === value : !!selected;
  return h('button', { type: 'button', role: 'tab', 'aria-selected': sel, tabIndex: ctx ? (sel ? 0 : -1) : undefined, disabled: disabled || skeleton, 'aria-hidden': skeleton || undefined,
    className: cx('emcd-tab', sz !== 'm' && 'emcd-tab--' + sz, skeleton && 'emcd-tab--skeleton', className),
    onClick: (e) => { if (ctx && value !== undefined) ctx.select(value, e); if (onClick) onClick(e); }, ...rest },
  icon, statusDot && DOT(statusTone), h('span', { className: 'emcd-tab__label' }, label ?? children),
  counter != null && counter !== false && h(Counter, { size: sz === 'l' || sz === 'page' ? 'm' : 's', tone: counterTone, value: counter }),
  h('span', { className: 'emcd-tab__ring', 'aria-hidden': true }));
}
/** Tabs — бар вкладок (2–6). items: [{ value, label, counter, icon, disabled }] или дети Tab с value. Без value — неуправляемый (первая выбрана). */
function Tabs({ size = 'm', items, value, defaultValue, onChange, label, children, className, ...rest }) {
  const kids = React.Children.toArray(children).filter(React.isValidElement);
  const first = items ? (items[0] && (items[0].value ?? 0)) : kids[0] && kids[0].props.value;
  const [cur, set] = useControllable(value, defaultValue ?? first, onChange);
  const ref = React.useRef(null);
  React.useEffect(() => { // выбранная вкладка — в зоне видимости при открытии
    const bar = ref.current; const el = bar && bar.querySelector('[aria-selected="true"]');
    if (el && (el.offsetLeft < bar.scrollLeft || el.offsetLeft + el.offsetWidth > bar.scrollLeft + bar.clientWidth)) bar.scrollLeft = el.offsetLeft - 16;
  }, []);
  return h(TabsCtx.Provider, { value: { size, value: cur, select: (v, e) => set(v, e) } },
    h('div', { ref, role: 'tablist', 'aria-label': label, className: cx('emcd-tabs', size !== 'm' && 'emcd-tabs--' + size, className), onKeyDown: (e) => rovingKeys(e, '[role="tab"]'), ...rest },
      items ? items.map((it, i) => h(Tab, { key: it.value ?? i, ...it, value: it.value ?? i })) : children));
}

const SegCtx = React.createContext(null);
/** Segment — сегмент Segmented. showLabel=false — только иконка, label уходит в aria-label. */
function Segment({ size, selected, value, tone, label, children, showLabel = true, icon, disabled, onClick, className, ...rest }) {
  const ctx = React.useContext(SegCtx);
  const sel = ctx && value !== undefined ? ctx.value === value : !!selected;
  const t = tone ?? (ctx && ctx.tone) ?? 'neutral';
  const text = label ?? children;
  return h('button', { type: 'button', role: 'radio', 'aria-checked': sel, tabIndex: ctx ? (sel ? 0 : -1) : undefined, disabled,
    'aria-label': showLabel ? undefined : (typeof text === 'string' ? text : undefined), title: showLabel ? undefined : (typeof text === 'string' ? text : undefined),
    className: cx('emcd-segment', t === 'accent' && 'emcd-segment--accent', !showLabel && 'emcd-segment--icon-only', className),
    onClick: (e) => { if (ctx && value !== undefined) ctx.select(value, e); if (onClick) onClick(e); }, ...rest },
  icon, showLabel && h('span', { className: 'emcd-segment__label' }, text));
}
/** Segmented — один из 2–4, применяется сразу. items: [{ value, label, icon, disabled }] или дети Segment. label — aria-label группы. */
function Segmented({ size = 's', items, value, defaultValue, onChange, tone = 'neutral', label, block = false, children, className, ...rest }) {
  const kids = React.Children.toArray(children).filter(React.isValidElement);
  const first = items ? (items[0] && (items[0].value ?? 0)) : kids[0] && kids[0].props.value;
  const [cur, set] = useControllable(value, defaultValue ?? first, onChange);
  return h(SegCtx.Provider, { value: { value: cur, tone, select: (v, e) => set(v, e) } },
    h('div', { role: 'radiogroup', 'aria-label': label, className: cx('emcd-segmented', size !== 's' && 'emcd-segmented--' + size, block && 'emcd-segmented--block', className), onKeyDown: (e) => rovingKeys(e, '[role="radio"]'), ...rest },
      items ? items.map((it, i) => h(Segment, { key: it.value ?? i, ...it, value: it.value ?? i })) : children));
}

/** List item — строка списка. content: text-first | description-first | big-value | description-only; showDescription=false — без описания. href / onClick — строка открывает детали (Hover / Pressed). */
function ListItem({ size = 'l', content = 'text-first', label, description, showDescription = true, value, subvalue, leading, trailing, divider = false, disabled = false, href, onClick, as, className, children, ...rest }) {
  const interactive = !!(href || onClick);
  const tag = as ?? (href ? 'a' : onClick ? 'button' : 'div');
  const L = label != null && h('span', { key: 'l', className: 'emcd-list-item__label' }, label);
  // showDescription=false (19.11) — строка из одного названия (во всех Content, кроме description-only)
  const D = showDescription && description != null && h('span', { key: 'd', className: 'emcd-list-item__desc' }, description);
  const body = content === 'description-first' ? [D, L]
    : content === 'big-value' ? [D, h('span', { key: 'v', className: 'emcd-list-item__value-row' }, h('span', { className: 'emcd-list-item__value' }, value ?? label), subvalue != null && h('span', { className: 'emcd-list-item__subvalue' }, subvalue))]
      : content === 'description-only' ? [h('span', { key: 'l', className: 'emcd-list-item__label' }, label ?? description)] : [L, D];
  return h(tag, { href: disabled ? undefined : href, onClick: disabled ? undefined : onClick, type: tag === 'button' ? 'button' : undefined, disabled: tag === 'button' ? disabled : undefined,
    'aria-disabled': tag !== 'button' && disabled ? true : undefined,
    className: cx('emcd-list-item', size === 'm' && 'emcd-list-item--m', content !== 'text-first' && 'emcd-list-item--' + content, interactive && 'emcd-list-item--interactive', divider && 'emcd-list-item--divider', disabled && 'emcd-list-item--disabled', className), ...rest },
  leading != null && h('span', { className: 'emcd-list-item__leading' }, leading),
  h('span', { className: 'emcd-list-item__content' }, ...body, children),
  trailing != null && h('span', { className: 'emcd-list-item__trailing' }, trailing));
}

const TX_TYPE = { withdrawal: [I.arrowUp, 'Вывод'], deposit: [I.arrowDown, 'Пополнение'], reward: [I.lightning, 'Начисление'], exchange: [I.exchange, 'Обмен'] };
const TX_STATUS = { completed: ['success', 'Выполнено'], pending: ['warning', 'В обработке'], failed: ['danger', 'Отклонено'] };
/** Transaction — строка операции; нажимается вся строка (детали). Знак суммы — по Type и Status: «−» вывод, «+» пополнение и начисление; обмен и Failed — без знака. */
function Transaction({ type = 'withdrawal', status = 'completed', label, description, value, ticker, fiat, statusLabel, href, onClick, className, ...rest }) {
  const [icon, word] = TX_TYPE[type] || TX_TYPE.withdrawal;
  const [tone, stWord] = TX_STATUS[status] || TX_STATUS.completed;
  const sign = status === 'failed' || type === 'exchange' ? 'none' : type === 'withdrawal' ? 'negative' : 'positive';
  return h(ListItem, { size: 'm', label: label ?? word, description, href, onClick: onClick ?? (href ? undefined : () => {}),
    className: cx('emcd-tx', 'emcd-tx--' + type, 'emcd-tx--' + status, className),
    leading: h('span', { className: 'emcd-tx__icon' }, icon()),
    trailing: [h(Amount, { key: 'a', size: 's', sign, value, ticker, fiat, showFiat: false, align: 'end' }), h(Status, { key: 's', size: 's', tone, label: statusLabel ?? stWord })], ...rest });
}

const MenuCtx = React.createContext({ size: 'm', role: 'menu' });
/** Menu item — пункт меню. tone danger — разрушающее, последним после разделителя. selected — галочка (одиночный выбор); showSelection — глиф Checkbox (множественный). */
function MenuItem({ size, tone = 'default', label, description, leading, trailing, selected, defaultSelected = false, showSelection = false, disabled, role, onClick, className, children, ...rest }) {
  const ctx = React.useContext(MenuCtx);
  const sz = size ?? ctx.size;
  const [on, setOn] = React.useState(defaultSelected);
  const isOn = selected ?? on;
  const r = role ?? (ctx.role === 'listbox' ? 'option' : showSelection ? 'menuitemcheckbox' : 'menuitem');
  return h(r === 'option' ? 'div' : 'button', { type: r === 'option' ? undefined : 'button', role: r, disabled: r === 'option' ? undefined : disabled, 'aria-disabled': r === 'option' && disabled ? true : undefined,
    'aria-selected': r === 'option' ? !!isOn : undefined, 'aria-checked': r === 'menuitemcheckbox' ? !!isOn : undefined, tabIndex: r === 'option' ? -1 : undefined,
    className: cx('emcd-menu-item', sz === 'l' && 'emcd-menu-item--l', tone === 'danger' && 'emcd-menu-item--danger', className),
    onClick: (e) => { if (disabled) return; if (showSelection && selected === undefined) setOn(!on); if (onClick) onClick(e); }, ...rest },
  showSelection && h('span', { className: 'emcd-menu-item__box', 'aria-hidden': true }, I.check()),
  leading != null && h('span', { className: 'emcd-menu-item__leading' }, leading),
  h('span', { className: 'emcd-menu-item__content' }, h('span', { className: 'emcd-menu-item__label' }, label ?? children), description != null && h('span', { className: 'emcd-menu-item__desc' }, description)),
  trailing != null && h('span', { className: 'emcd-menu-item__trailing' }, trailing),
  !showSelection && isOn && h('span', { className: 'emcd-menu-item__check' }, I.check()));
}
/** Menu — всплывающий список. items: [{ label, description, leading, trailing, tone, disabled, selected, onClick } | { group: 'Подпись' } | { divider: true }] или дети. search — от 10 пунктов. */
const Menu = React.forwardRef(function Menu({ size = 'm', search = false, searchPlaceholder = 'Поиск', onSearch, items, role = 'menu', label, className, children, id, ...rest }, ref) {
  const keys = (e) => {
    const list = [...e.currentTarget.querySelectorAll('.emcd-menu-item:not(:disabled)')];
    const i = list.indexOf(document.activeElement);
    const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!step || !list.length) return;
    e.preventDefault(); list[(i + step + list.length) % list.length].focus();
  };
  return h(MenuCtx.Provider, { value: { size, role } },
    h('div', { ref, className: cx('emcd-menu', className), ...rest },
      search && h(Input, { placeholder: searchPlaceholder, 'aria-label': searchPlaceholder, leading: I.search(), onChange: onSearch ? (e) => onSearch(e.target.value, e) : undefined }),
      h('div', { id, role, 'aria-label': label, className: 'emcd-menu__items', onKeyDown: role === 'menu' ? keys : undefined },
        items ? items.map((it, i) => it.divider ? h('hr', { key: i, className: 'emcd-menu__line', role: 'separator' })
          : it.group ? h('div', { key: i, className: 'emcd-menu__group', role: 'presentation' }, it.group)
            : h(MenuItem, { key: it.value ?? i, ...it })) : children)));
});

/** Select — поле выбора одного значения (5+ вариантов). options: [{ value, label, description, leading, disabled }]. Без value — неуправляемый. На Compact — Sheet (в продукте). */
function Select({ size = 'm', label, hint, error, state = 'default', placeholder = 'Выберите …', options = [], value, defaultValue, onChange, open, defaultOpen = false, onOpenChange,
  leading, menuSize = 'm', className, ...rest }) {
  const id = useId();
  const [cur, setCur] = useControllable(value, defaultValue, onChange);
  const [isOpen, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const [active, setActive] = React.useState(-1);
  const root = React.useRef(null);
  const btn = React.useRef(null);
  const isError = state === 'error' || !!error;
  const blocked = state === 'disabled' || state === 'skeleton';
  const msg = error || hint;
  const sel = options.find((o) => o.value === cur);
  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  React.useEffect(() => {
    if (!isOpen) return undefined;
    const out = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  }, [isOpen, setOpen]);
  const openMenu = () => { setOpen(true); const i = options.indexOf(sel); setActive(i >= 0 ? i : enabled[0] ?? -1); };
  const choose = (o) => { if (o.disabled) return; setCur(o.value); setOpen(false); if (btn.current) btn.current.focus(); };
  const onKey = (e) => {
    if (blocked) return;
    if (!isOpen) { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openMenu(); } return; }
    if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault(); const k = enabled.indexOf(active); const n = enabled.length;
      setActive(enabled[(k + (e.key === 'ArrowDown' ? 1 : -1) + n) % n]);
    } else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); setActive(e.key === 'Home' ? enabled[0] : enabled[enabled.length - 1]); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (options[active]) choose(options[active]); }
  };
  return h('div', { ref: root, className: cx('emcd-field', size !== 'm' && 'emcd-field--' + size, isError && 'emcd-field--error', state === 'disabled' && 'emcd-field--disabled', state === 'skeleton' && 'emcd-field--skeleton', className), 'aria-hidden': state === 'skeleton' || undefined },
    label && h('span', { className: 'emcd-field__label', id: id + '-l' }, label),
    h('div', { className: cx('emcd-select', isOpen && 'emcd-select--open') },
      h('button', { ref: btn, type: 'button', role: 'combobox', className: 'emcd-input emcd-select__trigger', disabled: blocked, 'aria-haspopup': 'listbox', 'aria-expanded': !!isOpen, 'aria-controls': id + '-lb',
        'aria-labelledby': label ? id + '-l ' + id + '-v' : undefined, 'aria-invalid': isError || undefined, 'aria-describedby': msg ? id + '-h' : undefined, 'aria-busy': state === 'loading' || undefined,
        'aria-activedescendant': isOpen && active >= 0 ? id + '-o' + active : undefined, onClick: () => (isOpen ? setOpen(false) : openMenu()), onKeyDown: onKey, ...rest },
      (sel && sel.leading) || leading ? h('span', { className: 'emcd-input__leading' }, (sel && sel.leading) || leading) : null,
      h('span', { id: id + '-v', className: cx('emcd-select__value', !sel && 'emcd-select__value--placeholder') }, sel ? sel.label : placeholder),
      state === 'loading' && SPINNER('emcd-field__spinner'),
      h('span', { className: 'emcd-select__chevron' }, I.chevronDown())),
      isOpen && !blocked && h(Menu, { size: menuSize, role: 'listbox', id: id + '-lb', label: typeof label === 'string' ? label : undefined, className: 'emcd-select__menu' },
        state === 'loading' ? h('div', { className: 'emcd-menu__empty' }, 'Загружаем варианты…')
          : options.map((o, i) => h(MenuItem, { key: o.value ?? i, id: id + '-o' + i, label: o.label, description: o.description, leading: o.leading, disabled: o.disabled, selected: o.value === cur,
            'data-active': i === active ? '' : undefined, onMouseDown: (e) => e.preventDefault(), onMouseEnter: () => setActive(i), onClick: () => choose(o) })))),
    msg && h('span', { className: 'emcd-field__row' }, h('span', { className: 'emcd-field__hint', id: id + '-h' }, msg)));
}

const PASSWORD_RULES = [
  { label: 'Не короче 8 символов', test: (v) => v.length >= 8 },
  { label: 'Цифра', test: (v) => /\d/.test(v) },
  { label: 'Заглавная и строчная буквы', test: (v) => /\p{Lu}/u.test(v) && /\p{Ll}/u.test(v) },
  { label: 'Спецсимвол: ! @ # $ %', test: (v) => /[^\p{L}\p{N}\s]/u.test(v) },
];
/** Password field — поле пароля + «глаз» + требования (отмечаются по мере ввода). showRequirements=false — вход. Ошибку показывать после отправки, не на каждый символ. */
const PasswordField = React.forwardRef(function PasswordField({ label = 'Пароль', placeholder = 'Придумайте пароль', showRequirements = true, requirements = PASSWORD_RULES,
  state = 'default', error, hint, value, defaultValue = '', onChange, visible, defaultVisible = false, onVisibleChange, size = 'm', className, ...inputProps }, ref) {
  const [val, setVal] = useControllable(value, defaultValue, onChange ? (v, e) => onChange(e) : undefined);
  const [shown, setShown] = useControllable(visible, defaultVisible, onVisibleChange);
  const disabled = state === 'disabled';
  const v = String(val ?? '');
  return h('div', { className: cx('emcd-password', disabled && 'emcd-password--disabled', className) },
    h(Input, { ref, size, label, placeholder, state, error, hint, type: shown ? 'text' : 'password', autoComplete: showRequirements ? 'new-password' : 'current-password', value: v,
      onChange: (e) => setVal(e.target.value, e),
      trailing: h(IconButton, { type: 'ghost', size: 's', label: shown ? 'Скрыть пароль' : 'Показать пароль', 'aria-pressed': !!shown, disabled, icon: shown ? I.eyeOff() : I.eye(), onClick: (e) => { e.preventDefault(); setShown(!shown); } }),
      ...inputProps }),
    showRequirements && h('ul', { className: 'emcd-password__reqs', 'aria-label': 'Требования к паролю', 'aria-live': 'polite' },
      requirements.map((r, i) => { const met = !!r.test(v); return h('li', { key: i, className: cx('emcd-password__req', met && 'emcd-password__req--met') },
        met ? I.check() : I.minus(), h('span', null, r.label), h('span', { className: 'emcd-sr' }, met ? ' — выполнено' : ' — не выполнено')); })));
});

// ───────────── Пачка 3 — экраны майнинга (атомы, молекулы, организмы, конструкции) ─────────────
// @icons:begin — генерирует scripts/icons-code.mjs из icons/svg и icons/symbols/coin; не править руками.
// Иконки: имя → { viewBox, body } (обводка currentColor). Монеты: тикер → { viewBox, body } (цвета Symbols).
const ICONS = {
  "sort": {"viewBox":"0 0 20 20","body":"<path d=\"M11.6074 9.63183H18.3326M1.66667 3.71002H18.3333M11.6074 15.7534H18.3326\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M5.04907 16.2898V8.37718M8.22803 13.0991L5.05054 16.29L1.87216 13.0991\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "sort-line-down": {"viewBox":"0 0 20 20","body":"<path d=\"M12.7387 15.7208H7.84931M14.9766 10.0005L4.87352 10.0005M18.3333 4.27918L1.66667 4.27917\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M12.7387 15.7208H7.84931M14.9766 10.0005L4.87352 10.0005M18.3333 4.27918L1.66667 4.27917\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "sort-line-up": {"viewBox":"0 0 20 20","body":"<path d=\"M7.26129 4.27918L12.1507 4.27918M5.02343 9.99953L15.1265 9.99953M1.66665 15.7208L18.3333 15.7208\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M7.26129 4.27918L12.1507 4.27918M5.02343 9.99953L15.1265 9.99953M1.66665 15.7208L18.3333 15.7208\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "filter": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.14851 2.91666C3.46844 2.91666 2.91666 3.47771 2.91666 4.16837V4.90507C2.91666 5.41666 3.11121 5.90865 3.45921 6.2787L7.27299 10.334L7.27467 10.3314C8.01093 11.0852 8.42518 12.1041 8.42518 13.1665V16.7647C8.42518 17.0052 8.67675 17.1587 8.88555 17.0452L11.0574 15.8618C11.3853 15.6827 11.5899 15.3348 11.5899 14.9571V13.1571C11.5899 12.1007 11.9983 11.086 12.7278 10.334L16.5416 6.2787C16.8888 5.90865 17.0833 5.41666 17.0833 4.90507V4.16837C17.0833 3.47771 16.5324 2.91666 15.8523 2.91666H4.14851Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "info": {"viewBox":"0 0 20 20","body":"<path d=\"M10 17.7083C14.2572 17.7083 17.7084 14.2572 17.7084 10C17.7084 5.7428 14.2572 2.29166 10 2.29166C5.74283 2.29166 2.29169 5.7428 2.29169 10C2.29169 14.2572 5.74283 17.7083 10 17.7083Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 9.16666V13.75\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 7.375C10.5063 7.375 10.9167 6.96459 10.9167 6.45833C10.9167 5.95207 10.5063 5.54166 10 5.54166C9.49378 5.54166 9.08337 5.95207 9.08337 6.45833C9.08337 6.96459 9.49378 7.375 10 7.375Z\" fill=\"currentColor\"/>"},
  "chevron-down": {"viewBox":"0 0 20 20","body":"<path d=\"M15 7.5L10 12.5L5 7.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-up": {"viewBox":"0 0 20 20","body":"<path d=\"M5 12.5L10 7.5L15 12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-left": {"viewBox":"0 0 20 20","body":"<path d=\"M12.5 15L7.5 10L12.5 5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-right": {"viewBox":"0 0 20 20","body":"<path d=\"M7.5 5L12.5 10L7.5 15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "arrow-right": {"viewBox":"0 0 20 20","body":"<path d=\"M15.8333 9.99992L4.16666 9.99992M11.1279 14.6857L15.8333 9.99992L11.1279 5.31428\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "arrow-left": {"viewBox":"0 0 20 20","body":"<path d=\"M8.87213 14.6857L4.16664 10.0004L8.87213 5.31434\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.1668 10.0001L15.8333 10.0001\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "arrow-new-tab": {"viewBox":"0 0 20 20","body":"<path d=\"M13.8378 2.91667H17.0833V6.16225M17.0833 2.91667L10 10\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M8.43378 2.91667H6.68027C4.36716 2.91667 2.91666 4.55449 2.91666 6.87232V13.1276C2.91666 15.4455 4.36008 17.0833 6.68027 17.0833H13.3182C15.6391 17.0833 17.0833 15.4455 17.0833 13.1276V11.7575\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "close": {"viewBox":"0 0 20 20","body":"<path d=\"M15 5L5 15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M5 5L15 15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "check": {"viewBox":"0 0 20 20","body":"<path d=\"M16.25 5.86397L7.97794 14.136L3.75 9.90809\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "plus": {"viewBox":"0 0 20 20","body":"<path d=\"M10 4.16667V15.8333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.16666 10H15.8333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "minus": {"viewBox":"0 0 20 20","body":"<path d=\"M5 10H15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "menu": {"viewBox":"0 0 20 20","body":"<path d=\"M2.46527 10L17.5347 10\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M2.46527 16.4583H17.5347\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M2.46527 3.54166H17.5347\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "more-horizontal": {"viewBox":"0 0 20 20","body":"<path d=\"M4.98457 11.2346C5.6664 11.2346 6.21914 10.6818 6.21914 9.99999C6.21914 9.31816 5.6664 8.76543 4.98457 8.76543C4.30273 8.76543 3.75 9.31816 3.75 9.99999C3.75 10.6818 4.30273 11.2346 4.98457 11.2346Z\" fill=\"currentColor\"/><path d=\"M10 11.2346C10.6818 11.2346 11.2346 10.6818 11.2346 9.99999C11.2346 9.31816 10.6818 8.76543 10 8.76543C9.31817 8.76543 8.76543 9.31816 8.76543 9.99999C8.76543 10.6818 9.31817 11.2346 10 11.2346Z\" fill=\"currentColor\"/><path d=\"M15.0154 11.2346C15.6973 11.2346 16.25 10.6818 16.25 9.99999C16.25 9.31816 15.6973 8.76543 15.0154 8.76543C14.3336 8.76543 13.7809 9.31816 13.7809 9.99999C13.7809 10.6818 14.3336 11.2346 15.0154 11.2346Z\" fill=\"currentColor\"/>"},
  "more-vertical": {"viewBox":"0 0 20 20","body":"<circle cx=\"10\" cy=\"15.1471\" r=\"0.75\" transform=\"rotate(90 10 15.1471)\" stroke=\"currentColor\" stroke-width=\"0.705882\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><circle cx=\"10\" cy=\"9.99999\" r=\"0.75\" transform=\"rotate(90 10 9.99999)\" stroke=\"currentColor\" stroke-width=\"0.705882\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><circle cx=\"10\" cy=\"4.85294\" r=\"0.75\" transform=\"rotate(90 10 4.85294)\" stroke=\"currentColor\" stroke-width=\"0.705882\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "dots-grid": {"viewBox":"0 0 20 20","body":"<path d=\"M13.0169 4.41022H12.9575M13.0041 4.65094C12.8704 4.65094 12.762 4.54246 12.762 4.40873C12.762 4.27501 12.8704 4.16666 13.0041 4.16666C13.1378 4.16666 13.2462 4.27501 13.2462 4.40873C13.2462 4.54246 13.1378 4.65094 13.0041 4.65094Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.0169 9.99955H12.9575M13.0041 10.2403C12.8704 10.2403 12.762 10.1318 12.762 9.99806C12.762 9.86436 12.8704 9.756 13.0041 9.756C13.1378 9.756 13.2462 9.86436 13.2462 9.99806C13.2462 10.1318 13.1378 10.2403 13.0041 10.2403Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.0169 15.5927H12.9575M13.0041 15.8333C12.8704 15.8333 12.762 15.7249 12.762 15.5912C12.762 15.4574 12.8704 15.3491 13.0041 15.3491C13.1378 15.3491 13.2462 15.4574 13.2462 15.5912C13.2462 15.7249 13.1378 15.8333 13.0041 15.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M7.00868 4.41022H6.94928M6.99592 4.65094C6.86219 4.65094 6.75378 4.54246 6.75378 4.40873C6.75378 4.27501 6.86219 4.16666 6.99592 4.16666C7.12963 4.16666 7.23804 4.27501 7.23804 4.40873C7.23804 4.54246 7.12963 4.65094 6.99592 4.65094Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M7.00868 9.99955H6.94928M6.99592 10.2403C6.86219 10.2403 6.75378 10.1318 6.75378 9.99806C6.75378 9.86436 6.86219 9.756 6.99592 9.756C7.12963 9.756 7.23804 9.86436 7.23804 9.99806C7.23804 10.1318 7.12963 10.2403 6.99592 10.2403Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M7.00868 15.5927H6.94928M6.99592 15.8333C6.86219 15.8333 6.75378 15.7249 6.75378 15.5912C6.75378 15.4574 6.86219 15.3491 6.99592 15.3491C7.12963 15.3491 7.23804 15.4574 7.23804 15.5912C7.23804 15.7249 7.12963 15.8333 6.99592 15.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "search": {"viewBox":"0 0 20 20","body":"<path d=\"M8.84219 14.7676C12.1147 14.7676 14.7676 12.1146 14.7676 8.84211C14.7676 5.56958 12.1147 2.91667 8.84219 2.91667C5.56966 2.91667 2.91675 5.56958 2.91675 8.84211C2.91675 12.1146 5.56966 14.7676 8.84219 14.7676Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.6097 13.6098L17.0832 17.0833\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "calendar": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.0021 4.03529H7.00443C4.92427 4.03529 3.625 5.19407 3.625 7.32409V13.7342C3.625 15.8978 4.92427 17.0833 7.00443 17.0833H12.9955C15.0822 17.0833 16.375 15.9179 16.375 13.7878V7.32409C16.3815 5.19407 15.0888 4.03529 13.0021 4.03529Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M7.14233 2.91667V5.24763\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M12.8643 2.91667V5.24763\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M3.69067 8.16136H16.3159\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "list": {"viewBox":"0 0 20 20","body":"<path d=\"M1.93569 16.1391V16.2048M2.20157 16.1533C2.20157 16.301 2.08174 16.4207 1.93405 16.4207C1.78636 16.4207 1.66669 16.301 1.66669 16.1533C1.66669 16.0055 1.78636 15.8858 1.93405 15.8858C2.08174 15.8858 2.20157 16.0055 2.20157 16.1533Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M1.93569 10.1181V10.1837M2.20157 10.1323C2.20157 10.2799 2.08174 10.3996 1.93405 10.3996C1.78636 10.3996 1.66669 10.2799 1.66669 10.1323C1.66669 9.98458 1.78636 9.86479 1.93405 9.86479C2.08174 9.86479 2.20157 9.98458 2.20157 10.1323Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M1.93569 3.83266V3.89827M2.20157 3.84676C2.20157 3.99446 2.08174 4.11419 1.93405 4.11419C1.78636 4.11419 1.66669 3.99446 1.66669 3.84676C1.66669 3.69907 1.78636 3.57934 1.93405 3.57934C2.08174 3.57934 2.20157 3.69907 2.20157 3.84676Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M6.02625 3.84774H18.3334\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M6.02625 10.001H18.3334\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M6.02625 16.1542H18.3334\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "folder": {"viewBox":"0 0 20 20","body":"<path d=\"M6.79446 16.52C4.354 16.52 2.91667 15.0858 2.91667 12.6514V7.34551C2.91667 4.91423 3.81108 3.47997 6.24541 3.47997H7.60616C8.09471 3.47997 8.5542 3.71046 8.84667 4.101L9.46774 4.92725C9.76178 5.31702 10.222 5.54675 10.7105 5.54827H11.8591C13.9627 5.54827 14.9222 6.47101 15.1465 8.31648\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M6.99013 14.5493C6.75275 15.5831 5.55281 16.6291 4.26328 15.7776C4.26328 15.7776 5.09822 16.5196 6.7941 16.5196H14.192C15.1156 16.5196 15.9142 15.8757 16.1103 14.9728L17.0353 10.4235C17.3102 8.99835 16.3698 8.32222 15.1179 8.32222H9.92376C9.0025 8.32222 8.20462 8.96317 8.00705 9.86293L6.99013 14.5493Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "folder-add": {"viewBox":"0 0 20 20","body":"<path d=\"M1.5 5.5C1.5 4.96957 1.71071 4.46086 2.08579 4.08579C2.46086 3.71071 2.96957 3.5 3.5 3.5H7.1L9.1 5.5H16.5C17.0304 5.5 17.5391 5.71071 17.9142 6.08579C18.2893 6.46086 18.5 6.96957 18.5 7.5V14.5C18.5 15.0304 18.2893 15.5391 17.9142 15.9142C17.5391 16.2893 17.0304 16.5 16.5 16.5H3.5C2.96957 16.5 2.46086 16.2893 2.08579 15.9142C1.71071 15.5391 1.5 15.0304 1.5 14.5V5.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 8.75V13.75M7.5 11.25H12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "tuning": {"viewBox":"0 0 20 20","body":"<path d=\"M9.99847 10.9349V3.23019\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.5493 5.46456V3.23019\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.44928 5.79842V3.23019\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.5493 16.7694V8.66721\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.44928 16.769V9.00076\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 16.7698V14.138\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M14.0167 8.66721H17.0833\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M2.91669 9.00076H5.9834\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M8.46588 14.138H11.5326\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "eye": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.7985 9.99856C12.7985 8.45355 11.5454 7.20044 10.0004 7.20044C8.45631 7.20044 7.20319 8.45355 7.20319 9.99856C7.20319 11.5427 8.45631 12.7958 10.0004 12.7958C11.5454 12.7958 12.7985 11.5427 12.7985 9.99856Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M1.81573 10C1.81573 13.2937 5.716 16.4583 10 16.4583C14.2849 16.4583 18.1843 13.2937 18.1843 10C18.1843 6.70626 14.2504 3.54166 10 3.54166C5.75056 3.54166 1.81573 6.70626 1.81573 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "eye-off": {"viewBox":"0 0 20 20","body":"<path d=\"M16.5143 7.14001C17.1862 8.01657 17.5794 8.99923 17.5794 10.0063C17.5794 13.0519 13.968 15.9838 10.0054 15.9838C9.29304 15.9838 8.59668 15.8937 7.93317 15.7211\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M12.4848 10.7122C12.2402 11.5668 11.5709 12.2377 10.7166 12.4845\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M16.4589 3.54166L3.54211 16.4583\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M8.16805 11.827C7.68052 11.3445 7.40771 10.6877 7.41023 10.0023C7.40771 8.57342 8.56379 7.41226 9.99271 7.40974C10.6806 7.40805 11.3408 7.68087 11.8275 8.16672\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M5.38531 14.6161C3.61621 13.4693 2.42053 11.7583 2.42053 10.0061C2.42053 6.95114 6.06481 4.02847 10.003 4.02847C11.6736 4.02847 13.2945 4.55221 14.6047 5.39593\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "copy": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.4908 7.38712H9.94718C8.36414 7.38712 7.37091 8.50794 7.37091 10.0948V14.3757C7.37091 15.9625 8.35879 17.0833 9.94718 17.0833H14.4901C16.0793 17.0833 17.0672 15.9625 17.0672 14.3757V10.0948C17.0672 8.50794 16.0793 7.38712 14.4908 7.38712Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M12.5855 5.07961C12.3853 3.78842 11.4555 2.91666 10.0543 2.91666H5.50912C3.92683 2.91666 2.93283 4.04054 2.93283 5.62818V9.90897C2.93283 11.3553 3.75951 12.4211 5.11488 12.5892\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "refresh": {"viewBox":"0 0 20 20","body":"<path d=\"M1.875 6.03499L3.50858 9.89861L7.35091 8.27409\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M3.7337 9.80304C3.83216 5.92218 7.01564 2.80434 10.9293 2.80434C14.9005 2.80434 18.125 6.02884 18.125 9.99997C18.125 13.9793 14.9005 17.1957 10.9293 17.1957C8.46792 17.1957 6.30181 15.9649 4.99725 14.086\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chart-bar": {"viewBox":"0 0 20 20","body":"<path d=\"M5 15V12M10 15V5M15 15V9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "file-excel": {"viewBox":"0 0 20 20","body":"<path d=\"M7.766 8.53198L5.5866 11.4589M5.58582 8.53198L7.76522 11.4589\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10.1339 6.87167H17.0831\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.3207 3.37254V9.68009C13.3207 10.0751 13.6403 10.3948 14.0353 10.3948H17.0833\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.9534 6.16723H8.5454C9.80093 6.16723 10.5822 7.05341 10.5822 8.30816V11.6927C10.5822 12.9474 9.80093 13.8336 8.5454 13.8336H4.9534C3.69784 13.8336 2.91663 12.9474 2.91663 11.6927V8.30816C2.91663 7.05341 3.70105 6.16723 4.9534 6.16723Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M6.74536 13.834V14.491C6.74536 15.741 7.53059 16.6304 8.78856 16.6304H15.0463C16.3042 16.6304 17.0815 15.741 17.0815 14.491V5.50899C17.0815 4.25904 16.3042 3.36965 15.0463 3.36965H8.78856C7.53059 3.36965 6.74536 4.25904 6.74536 5.50899V6.16601\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "download": {"viewBox":"0 0 20 20","body":"<path d=\"M2.91754 12.3611V12.4239C2.91754 14.0549 2.91754 14.8704 3.23495 15.4934C3.51412 16.0413 3.95958 16.4868 4.50751 16.7659C5.13045 17.0833 5.94591 17.0833 7.5768 17.0833H12.4232C14.0541 17.0833 14.8696 17.0833 15.4925 16.7659C16.0405 16.4868 16.4859 16.0413 16.7651 15.4934C17.0825 14.8704 17.0825 14.0549 17.0825 12.4239V12.3611M13.319 9.37556L9.99893 12.7947L6.67886 9.37556M9.99893 12.7947L9.99933 2.91666\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "send": {"viewBox":"0 0 20 20","body":"<path d=\"M17.2914 7.23416H8.52813C5.19766 7.23416 2.49786 9.9339 2.49786 13.2633V16.4583\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.8118 10.9224L17.5022 7.232L13.8118 3.54167\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "question": {"viewBox":"0 0 20 20","body":"<path d=\"M9.95144 11.5795C9.94087 10.7749 10.6726 10.4341 11.2163 10.124C11.8795 9.7586 12.3284 9.17622 12.3284 8.36895C12.3284 7.17264 11.3612 6.21257 10.1728 6.21257C8.97643 6.21257 8.01636 7.17264 8.01636 8.36895\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M9.95239 13.8138V13.7883\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M18.125 10C18.125 5.51236 14.4876 1.875 10 1.875C5.51236 1.875 1.875 5.51236 1.875 10C1.875 14.4867 5.51236 18.125 10 18.125C14.4876 18.125 18.125 14.4867 18.125 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "lightning": {"viewBox":"0 0 20 20","body":"<path d=\"M4.77233 10.354L7.67786 2.61473C7.74314 2.42067 7.91237 2.29166 8.10164 2.29166H11.9967C12.3082 2.29166 12.5262 2.62802 12.4224 2.94866L10.6998 7.36188C10.596 7.68253 10.8139 8.01888 11.1255 8.01888H14.8033C15.1913 8.01888 15.3986 8.51783 15.143 8.83638L8.1595 17.5378C7.84485 17.9299 7.26081 17.5898 7.38376 17.0861L8.71505 11.6362C8.79138 11.3234 8.57551 11.0165 8.27883 11.0165H5.19614C4.88232 11.0165 4.66426 10.6756 4.77233 10.354Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "trend-up": {"viewBox":"0 0 20 20","body":"<path d=\"M13.7883 5.45545H18.3334V10.0005M18.3334 5.45448L11.1361 12.6518L7.34867 8.86346L1.66669 14.5455\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "settings": {"viewBox":"0 0 20 20","body":"<path d=\"M9.99945 12.4978C11.3793 12.4978 12.4975 11.3796 12.4975 9.99964C12.4975 8.61966 11.3793 7.5015 9.99945 7.5015C8.61946 7.5015 7.50128 8.61966 7.50128 9.99964C7.50128 11.3796 8.61946 12.4978 9.99945 12.4978Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M17.3741 7.19716V12.8021C17.3741 13.7026 16.8936 14.5344 16.1136 14.985L11.2605 17.787C10.4804 18.2377 9.51953 18.2377 8.73953 17.787L3.88553 14.985C3.10639 14.5344 2.62592 13.7026 2.62592 12.8021V7.19716C2.62592 6.29681 3.10639 5.46497 3.88553 5.01525L8.73953 2.2123C9.51953 1.76257 10.4804 1.76257 11.2605 2.2123L16.1136 5.01525C16.8936 5.46497 17.3741 6.29681 17.3741 7.19716Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "user": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M12.4538 9.36911C12.4538 10.7244 11.355 11.8233 9.99964 11.8233C8.6443 11.8233 7.54547 10.7244 7.54547 9.36911C7.54547 8.01378 8.6443 6.91493 9.99964 6.91493C11.355 6.91493 12.4538 8.01378 12.4538 9.36911Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M5.76111 16.912C5.92976 15.6005 7.09624 14.1442 9.99317 14.1442C12.9208 14.1442 14.0793 15.6085 14.241 16.9357\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M18.125 10C18.125 5.51324 14.4876 1.875 10 1.875C5.51236 1.875 1.875 5.51324 1.875 10C1.875 14.4876 5.51236 18.125 10 18.125C14.4876 18.125 18.125 14.4876 18.125 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "users": {"viewBox":"0 0 20 20","body":"<path d=\"M13.5157 4.91991C14.6321 5.1527 15.4683 6.14357 15.4645 7.32818C15.4606 8.37649 14.7998 9.26938 13.8717 9.61625\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M14.2501 12.3617C16.421 12.8074 17.0833 14.3787 17.0833 15.5848\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.4034 6.89365C11.4034 8.72069 9.92243 10.2016 8.09535 10.2016C6.26904 10.2016 4.78809 8.72069 4.78809 6.89365C4.78809 5.06658 6.26904 3.58563 8.09535 3.58563C9.92243 3.58563 11.4034 5.06658 11.4034 6.89365Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M2.91669 16.4144C2.91669 14.7237 4.25062 12.6186 8.09543 12.6186C11.9395 12.6186 13.2734 14.7083 13.2734 16.3999\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "bell-notifications": {"viewBox":"0 0 20 20","body":"<path d=\"M7.36456 15.0174C7.36456 16.4728 8.54438 17.6534 9.99971 17.6534C11.4559 17.6534 12.6357 16.4728 12.6357 15.0174\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4.4161 7.93048C4.4161 4.84605 6.91641 2.34657 9.99997 2.34657C13.0836 2.34657 15.5839 4.84605 15.5839 7.93048C15.5847 8.9772 15.5541 9.99582 16.0133 10.9694C16.6693 12.3634 16.876 14.5793 14.6531 14.5793H5.34689C3.12408 14.5793 3.33073 12.3634 3.98669 10.9694C4.44494 9.99514 4.41533 8.97754 4.4161 7.93048Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "calculator": {"viewBox":"0 0 20 20","body":"<path d=\"M14 1.5H6C4.61929 1.5 3.5 2.61929 3.5 4V16C3.5 17.3807 4.61929 18.5 6 18.5H14C15.3807 18.5 16.5 17.3807 16.5 16V4C16.5 2.61929 15.3807 1.5 14 1.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13 4.5H7C6.58579 4.5 6.25 4.83579 6.25 5.25V6.75C6.25 7.16421 6.58579 7.5 7 7.5H13C13.4142 7.5 13.75 7.16421 13.75 6.75V5.25C13.75 4.83579 13.4142 4.5 13 4.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M7 12C7.55228 12 8 11.5523 8 11C8 10.4477 7.55228 10 7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12Z\" fill=\"currentColor\"/><path d=\"M10 12C10.5523 12 11 11.5523 11 11C11 10.4477 10.5523 10 10 10C9.44772 10 9 10.4477 9 11C9 11.5523 9.44772 12 10 12Z\" fill=\"currentColor\"/><path d=\"M13 12C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10C12.4477 10 12 10.4477 12 11C12 11.5523 12.4477 12 13 12Z\" fill=\"currentColor\"/><path d=\"M7 15.5C7.55228 15.5 8 15.0523 8 14.5C8 13.9477 7.55228 13.5 7 13.5C6.44772 13.5 6 13.9477 6 14.5C6 15.0523 6.44772 15.5 7 15.5Z\" fill=\"currentColor\"/><path d=\"M10 15.5C10.5523 15.5 11 15.0523 11 14.5C11 13.9477 10.5523 13.5 10 13.5C9.44772 13.5 9 13.9477 9 14.5C9 15.0523 9.44772 15.5 10 15.5Z\" fill=\"currentColor\"/><path d=\"M13 15.5C13.5523 15.5 14 15.0523 14 14.5C14 13.9477 13.5523 13.5 13 13.5C12.4477 13.5 12 13.9477 12 14.5C12 15.0523 12.4477 15.5 13 15.5Z\" fill=\"currentColor\"/>"},
  "history": {"viewBox":"0 0 20 20","body":"<path d=\"M7.27753 12.3195L10.143 10.6069V6.90733\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><circle cx=\"10\" cy=\"10\" r=\"8.125\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "wallet": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.80135 3.45932H13.1985C15.3441 3.45932 17.0831 5.19834 17.0831 7.34398V12.656C17.0831 14.8016 15.3441 16.5407 13.1985 16.5407H6.80135C4.65571 16.5407 2.91669 14.8016 2.91669 12.656V7.34398C2.91669 5.19834 4.65571 3.45932 6.80135 3.45932Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.9395 9.85872H13.9302\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M17.0834 11.8952H13.6567C12.7936 11.8952 12.0953 11.1961 12.0953 10.3339V9.47236C12.0953 8.61016 12.7936 7.911 13.6567 7.911H17.0834\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "card": {"viewBox":"0 0 20 20","body":"<path d=\"M2.20874 8.1256H17.7913M5.82455 12.7449H8.39441M14.3589 3.54167H5.64027C3.53115 3.54167 2.20874 5.03506 2.20874 7.1484V12.8516C2.20874 14.9658 3.52441 16.4583 5.64027 16.4583H14.3581C16.4747 16.4583 17.7913 14.9658 17.7913 12.8516V7.1484C17.7913 5.03506 16.4747 3.54167 14.3589 3.54167Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "mining-coin": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1687 12.0907L9.9996 6.75388L6.83142 12.0907H13.1687Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M18.125 10C18.125 5.51236 14.4876 1.875 10 1.875C5.51236 1.875 1.875 5.51236 1.875 10C1.875 14.4876 5.51236 18.125 10 18.125C14.4876 18.125 18.125 14.4876 18.125 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "exchange": {"viewBox":"0 0 20 20","body":"<path d=\"M7.63892 14.7229H12.3611C14.9694 14.7229 17.0834 12.6089 17.0834 10.0006C17.0834 8.49582 16.3774 7.15862 15.281 6.29366\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M12.3611 5.27912H7.63891C5.03067 5.27912 2.91669 7.39389 2.91669 10.0013C2.91669 11.5062 3.62266 12.8433 4.719 13.7083\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10.2875 7.3524L12.3621 5.27777L10.2875 3.20393\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M9.71355 12.5629L7.63892 14.7221L9.71355 16.7961\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "coinhold-coins": {"viewBox":"0 0 20 20","body":"<path d=\"M16.0938 10C16.0938 11.6822 13.3649 13.0469 9.99942 13.0469C6.6339 13.0469 3.90625 11.6822 3.90625 10\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M16.0938 4.92188V14.9637C16.0938 16.7103 13.3649 18.125 9.99942 18.125C6.6339 18.125 3.90625 16.7103 3.90625 14.9637V4.92188\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16.0937 4.92184C16.0937 6.604 13.3649 7.96875 9.99942 7.96875C6.6339 7.96875 3.90625 6.604 3.90625 4.92184C3.90625 3.23969 6.6339 1.875 9.99942 1.875C13.3649 1.875 16.0937 3.23969 16.0937 4.92184Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "percentage": {"viewBox":"0 0 20 20","body":"<circle cx=\"13.9192\" cy=\"14.1565\" r=\"1.93951\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><circle cx=\"5.60618\" cy=\"6.33249\" r=\"1.93951\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M2.91667 16.846L17.0833 3.15397\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "suitcase": {"viewBox":"0 0 20 20","body":"<path d=\"M13.1482 6.06482V5.75001C13.1482 4.1852 11.8796 2.91667 10.3148 2.91667H9.6852C8.12039 2.91667 6.85187 4.1852 6.85187 5.75001V6.06482\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M6.85187 10H13.1482\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.80141 6.06482H13.1986C15.3443 6.06482 17.0834 7.94812 17.0834 10.2718V12.8764C17.0834 15.2 15.3443 17.0833 13.1986 17.0833H6.80141C4.65574 17.0833 2.91669 15.2 2.91669 12.8764V10.2718C2.91669 7.94812 4.65574 6.06482 6.80141 6.06482Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "lock": {"viewBox":"0 0 20 20","body":"<path d=\"M10.0001 11.8359V13.6868\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1838 17.7083H6.81622C5.0712 17.7083 3.65619 16.2941 3.65619 14.5483V10.9741C3.65619 9.22825 5.0712 7.81407 6.81622 7.81407H13.1838C14.9288 7.81407 16.3438 9.22825 16.3438 10.9741V14.5483C16.3438 16.2941 14.9288 17.7083 13.1838 17.7083Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M13.8006 7.87346V6.08427C13.8006 3.99009 12.1023 2.2917 10.0081 2.2917C7.91389 2.28257 6.20887 3.97259 6.19971 6.06761V6.08427V7.87346\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "web": {"viewBox":"0 0 20 20","body":"<path d=\"M17.2131 13.7498C15.8437 13.3273 14.3557 13.0401 12.8256 12.8793C10.9573 12.6843 9.03802 12.6843 7.17851 12.8793C5.64838 13.0401 4.1604 13.3273 2.79102 13.7498\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M2.79102 6.24783C4.1604 6.67033 5.64838 6.95756 7.17851 7.11831C9.03802 7.31331 10.9573 7.31331 12.8256 7.11831C14.3557 6.95756 15.8437 6.67033 17.2131 6.24783\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.99937 1.87502C11.67 1.87502 13.0237 5.51237 13.0237 10C13.0237 14.4876 11.67 18.125 9.99937 18.125C8.32869 18.125 6.97516 14.4876 6.97516 10C6.97516 5.51237 8.32869 1.87502 9.99937 1.87502Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 1.87502C14.4876 1.87502 18.125 5.51237 18.125 10C18.125 14.4876 14.4876 18.125 10 18.125C5.51236 18.125 1.875 14.4876 1.875 10C1.875 5.51237 5.51236 1.87502 10 1.87502Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "gift": {"viewBox":"0 0 20 20","body":"<path d=\"M10.0005 17.0833V10.0768\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.6852 10.0153V15.1374C15.6852 16.211 14.8153 17.0817 13.7417 17.0817H6.26032C5.18673 17.0817 4.31607 16.211 4.31607 15.1374V10.0153\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.49463 6.4798H15.4218C16.2382 6.4798 16.8998 7.14141 16.8998 7.9577V8.60017C16.8998 9.37051 16.2749 9.99462 15.5054 9.99462H4.57809C3.7618 9.99462 3.10019 9.33297 3.10019 8.51745V7.87347C3.10019 7.10389 3.72428 6.4798 4.49463 6.4798Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.002 6.45826H13.1888C14.1674 6.45826 14.9599 5.66571 14.9599 4.68708C14.9599 3.70998 14.1674 2.91666 13.1888 2.91666C10.7101 2.91666 10.002 6.45826 10.002 6.45826Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10.0007 6.45826H6.81357C5.83494 6.45826 5.04239 5.66571 5.04239 4.68708C5.04239 3.70998 5.83494 2.91666 6.81357 2.91666C9.29233 2.91666 10.0007 6.45826 10.0007 6.45826Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "rocket": {"viewBox":"0 0 20 20","body":"<path d=\"M8.03087 6.32699L4.45301 6.60246L2.92407 8.13139C3.88198 8.70058 4.80355 9.32863 5.6837 10.012C7.29136 11.268 8.7394 12.7156 9.99543 14.3233C10.6805 15.2022 11.3086 16.1243 11.876 17.0833L13.4049 15.5544L13.6879 11.9761M5.46269 10.4553C6.22197 8.79308 7.21597 7.24845 8.41381 5.86844C8.41381 5.86844 12.4119 1.61028 16.6699 3.32269C18.3824 7.47377 14.1242 11.5714 14.1242 11.5714C12.7425 12.767 11.1982 13.76 9.53738 14.5217C9.00598 14.8055 8.44112 15.0219 7.85577 15.1645L4.79789 12.1066C4.97936 11.5409 5.20136 10.9889 5.46269 10.4553Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M3.39136 14.5756L5.23375 16.4103\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M11.7916 3.80411L16.2103 8.22276\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M11.4032 9.78238C12.0281 9.78238 12.5346 9.27585 12.5346 8.65095C12.5346 8.02612 12.0281 7.51955 11.4032 7.51955C10.7783 7.51955 10.2718 8.02612 10.2718 8.65095C10.2718 9.27585 10.7783 9.78238 11.4032 9.78238Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
};
const COINS = {
  "btc": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#FF8724\"/><path d=\"M16.8061 8.3457L16.2739 10.5771C16.6294 10.662 16.9871 10.7481 17.3354 10.8389L17.8637 8.62109L19.1889 8.9668L18.6469 11.2441C20.3201 11.8471 21.5436 12.7515 21.3032 14.4326C21.1291 15.6631 20.4766 16.2589 19.6108 16.4678C20.7998 17.1153 21.4049 18.1086 20.8286 19.8301C20.1132 21.9678 18.4135 22.1485 16.1538 21.7012L15.6059 24L14.2807 23.6543L14.8217 21.3857C14.4784 21.2966 14.1275 21.2022 13.7661 21.0996L13.2221 23.3789L11.8989 23.0332L12.4467 20.7295C12.1374 20.6466 11.8231 20.5587 11.5024 20.4746L9.77778 20.0244L10.436 18.4375C10.4503 18.4415 11.412 18.7094 11.3989 18.6895C11.7739 18.7865 11.9406 18.5309 12.0063 18.3604L12.8725 14.7256C12.9212 14.7378 12.969 14.7503 13.0131 14.7617C12.9604 14.7397 12.9124 14.7257 12.8754 14.7158L13.4936 12.1211C13.5098 11.8267 13.4126 11.4557 12.8764 11.3154C12.8944 11.3003 11.9168 11.0652 11.9135 11.0645L12.2661 9.58398L14.0932 10.0615L14.0922 10.0684C14.3669 10.1398 14.6497 10.2077 14.9379 10.2764L15.4819 8L16.8061 8.3457ZM14.2221 19.0889C15.1908 19.3251 18.179 20.2671 18.6206 18.5244C19.0813 16.7076 15.9762 16.2374 15.0073 16L14.2221 19.0889ZM15.1108 15.5752C15.8773 15.7958 18.2406 16.6962 18.6235 14.9248C19.0221 13.0773 16.5545 12.665 15.7875 12.4443L15.1108 15.5752Z\" fill=\"white\"/>"},
  "kas": {"viewBox":"0 0 32 32","body":"<path d=\"M32.0002 15.84C32.0002 17.9802 31.1183 20.041 30.3439 21.9136C29.5426 23.84 28.3663 25.6333 26.9237 27.0771C25.4799 28.5222 23.716 29.7792 21.7922 30.5818C19.9208 31.3574 17.837 32 15.6994 32C13.5618 32 11.4229 31.465 9.55285 30.6893C7.62901 29.8867 6.31957 28.1472 4.84885 26.7021C3.40501 25.2582 1.77429 23.8925 0.973006 21.9405C0.198606 20.0678 0.0373263 17.9802 0.0373263 15.84C0.0373263 13.6998 -0.203314 11.4253 0.545486 9.55264C1.34677 7.62624 3.03125 6.07488 4.50069 4.62976C5.94325 3.18464 7.57397 1.65888 9.49781 0.85632C11.3692 0.08064 13.5605 0 15.6981 0C17.8357 0 19.9208 0.37504 21.7653 1.15072C23.6892 1.95328 25.5605 3.05024 27.0031 4.49536C28.4469 5.94048 29.7295 7.73248 30.5039 9.65888C31.2783 11.5584 32.0002 13.6986 32.0002 15.84Z\" fill=\"#1EBD9E\"/><path d=\"M20.1615 6.71616L16.7669 7.22432L17.7563 13.8061L10.6472 8.32128L8.56209 11.0502L14.7893 15.84L8.56209 20.6554L10.6472 23.3843L17.7563 17.8995L16.7669 24.4813L20.1615 24.9894L21.5246 15.84L20.1615 6.71616Z\" fill=\"white\"/>"},
  "ltc": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#9B9AA9\"/><path d=\"M16.1001 16.9416L18.4635 16.0427L19.0514 13.7429L19.0313 13.6859L16.7049 14.5707L18.3811 8H13.6272L11.4351 16.5749L9.60477 17.271L9 19.6419L10.8289 18.9464L9.5369 24H22.1889L23 20.8548H15.1018L16.1001 16.9416Z\" fill=\"white\"/>"},
  "doge": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#C2A633\"/><path d=\"M18.3555 7.11111C19.0968 7.11111 19.7459 7.3056 20.3945 7.5574C21.7034 8.0496 22.8505 8.81644 23.7656 9.89236C24.5765 10.8539 25.1323 11.9651 25.4219 13.1785C25.9083 15.2846 25.9204 17.4136 25.3066 19.4969C24.4958 22.2099 22.7574 24.0762 19.873 24.7058C19.3751 24.8203 18.8424 24.8884 18.3213 24.8885H8.40527C8.27792 24.877 8.15051 24.8777 8 24.8777V20.6873H10.4785V11.1404H8.01172V7.12283H8.37109C11.7069 7.12283 15.0196 7.134 18.3555 7.11111ZM17.7305 11.1746C17.0354 11.0487 16.2822 11.1404 15.5293 11.1404V20.6765C16.0967 20.6765 16.6413 20.7106 17.1855 20.6648C17.8921 20.5961 18.53 20.3789 19.0049 19.7722C19.4103 19.2571 19.7696 18.7413 19.9434 18.1345C20.3254 16.8068 20.1746 15.4561 19.9082 14.117C19.7576 13.3157 19.3749 12.5831 18.8652 11.9763C18.5641 11.633 18.1474 11.2433 17.7305 11.1746Z\" fill=\"white\"/>"},
};
// @icons:end

/** Icon — иконка DS по имени (`icons/svg/<name>.svg`, реестр — scripts/icons-code.mjs). size: sm 16 · md 20 · lg 24 · xl 32 (`icon/size/*`); цвет — currentColor.
 *  label — смысловая иконка (role=img + aria-label); без label — декоративная (aria-hidden). Имени нет в реестре — пустой квадрат того же размера. */
function Icon({ name, size = 'md', label, className, ...rest }) {
  const ic = ICONS[name];
  return h('svg', { className: cx('emcd-icon', size !== 'md' && 'emcd-icon--' + size, className), viewBox: ic ? ic.viewBox : '0 0 20 20', fill: 'none',
    role: label ? 'img' : undefined, 'aria-label': label, 'aria-hidden': label ? undefined : true, focusable: 'false', 'data-icon': name,
    dangerouslySetInnerHTML: { __html: ic ? ic.body : '' }, ...rest });
}
// Слот иконки: строка — имя иконки DS, иначе — узел как есть
const icon = (x, k) => (typeof x === 'string' ? h(Icon, { key: k, name: x }) : x);

const COIN_ALIAS = { bitcoin: 'btc', kaspa: 'kas', litecoin: 'ltc', dogecoin: 'doge', tether: 'usdt' };
const coinKey = (c) => { const k = String(c ?? '').trim().toLowerCase().replace(/^[a-z]+-([a-z0-9]+)$/, '$1'); return COIN_ALIAS[k] || k; };
function CoinGlyph({ coin }) {
  const s = COINS[coinKey(coin)];
  if (s) return h('svg', { className: 'emcd-coin__glyph', viewBox: s.viewBox, 'aria-hidden': true, focusable: 'false', dangerouslySetInnerHTML: { __html: s.body } });
  // Монеты нет в Symbols — нейтральный круг с первой буквой тикера
  return h('span', { className: 'emcd-coin__glyph emcd-coin__fallback', 'aria-hidden': true }, (String(coin ?? '?').trim()[0] || '?').toUpperCase());
}
/** Coin — монета из Symbols (`symbol/coin/*`). coin — тикер (btc, kas, ltc, doge) или имя файла (bitcoin-btc); нет в Symbols — нейтральный круг с буквой.
 *  size: xs 16 · s 20 · m 24 · l 32 · xl 40 (`size/media/*`). network + networkCoin — монета сети в правом нижнем углу (не у XS). Декоративна: название — текстом рядом (или label). */
function Coin({ coin = 'btc', size = 'xs', network = false, networkCoin = 'usdt', skeleton = false, label, className, ...rest }) {
  return h('span', { className: cx('emcd-coin', size !== 'xs' && 'emcd-coin--' + size, skeleton && 'emcd-coin--skeleton', className), 'data-coin': coinKey(coin),
    role: label && !skeleton ? 'img' : undefined, 'aria-label': skeleton ? undefined : label, 'aria-hidden': label && !skeleton ? undefined : true, ...rest },
  !skeleton && h(CoinGlyph, { coin }),
  !skeleton && network && size !== 'xs' && h('span', { className: 'emcd-coin__network' }, h(CoinGlyph, { coin: networkCoin })));
}

const STACK_COIN = { s: 'm', m: 'l', l: 'xl' };
/** Coin stack — монеты внахлёст. coins — тикеры по значимости; size: s (монеты 24) · m (32) · l (40); count — сколько показать (2–4, по умолчанию все до 4).
 *  showMore + more — кружок «+N» со скрытыми (по умолчанию — когда монет больше count). Декоративна: список монет — текстом рядом (или label). */
function CoinStack({ coins = [], size = 's', count, showMore, more, label, className, ...rest }) {
  const shown = coins.slice(0, Math.max(1, Math.min(4, count ?? coins.length)));
  const hidden = coins.length - shown.length;
  const moreOn = showMore ?? hidden > 0;
  return h('span', { className: cx('emcd-coin-stack', size !== 's' && 'emcd-coin-stack--' + size, className),
    role: label ? 'img' : undefined, 'aria-label': label, 'aria-hidden': label ? undefined : true, ...rest },
  shown.map((c, i) => h(Coin, { key: i, coin: c, size: STACK_COIN[size] || 'm', className: 'emcd-coin-stack__coin' })),
  moreOn && h('span', { className: 'emcd-coin-stack__more' }, more ?? '+' + hidden));
}

/** Nav item — пункт сайдбара Web: иконка 20 + подпись 16. selected — текущий раздел (aria-current="page", плашка + полоса border-accent); collapsed — только иконка, подпись в Tooltip и aria-label.
 *  counter — Counter Danger (число или true): только то, что требует действия; badge — метка справа (true + badgeLabel → Badge S, или свой узел Badge). Badge и Counter вместе не включаем. */
function NavItem({ label, children, icon: ic = 'dots-grid', href, selected = false, collapsed = false, counter = false, badge = false, badgeLabel, badgeTone = 'neutral',
  disabled, onClick, className, ...rest }) {
  const text = label ?? children;
  const name = typeof text === 'string' ? text : undefined;
  const tag = href ? 'a' : 'button';
  const badgeNode = !collapsed && !counter && badge ? (badge === true ? h(Badge, { size: 's', tone: badgeTone, label: badgeLabel, className: 'emcd-nav-item__badge' }) : badge) : null;
  const item = h(tag, { href: disabled ? undefined : href, type: tag === 'button' ? 'button' : undefined, disabled: tag === 'button' ? disabled : undefined, 'aria-disabled': tag === 'a' && disabled ? true : undefined,
    'aria-current': selected ? 'page' : undefined, 'aria-label': collapsed ? name : undefined, onClick,
    className: cx('emcd-nav-item', collapsed && 'emcd-nav-item--collapsed', className), ...rest },
  h('span', { className: 'emcd-nav-item__icon' }, icon(ic)),
  !collapsed && h('span', { className: 'emcd-nav-item__label' }, text),
  badgeNode,
  counter !== false && counter != null && h(Counter, { tone: 'danger', value: counter === true ? undefined : counter, className: 'emcd-nav-item__counter' }));
  return collapsed && name ? h(Tooltip, { text: name, placement: 'end' }, item) : item;
}

/** Key-value row — «название — значение» в сводке (dt + dd; ряд строк оборачивать в <dl class="emcd-kv-list">). label — название (Key в Figma: `key` занят в React и Vue).
 *  emphasis: default | total (итог: одна, последней, линия сверху, Medium) | muted (второстепенная); leader — точечная линия от названия к значению. */
function KeyValueRow({ emphasis = 'default', leader = false, label, value, children, className, ...rest }) {
  return h('div', { className: cx('emcd-kv', emphasis !== 'default' && 'emcd-kv--' + emphasis, leader && 'emcd-kv--leader', className), ...rest },
    h('dt', { className: 'emcd-kv__key' }, h('span', { className: 'emcd-kv__key-text' }, label)),
    h('dd', { className: 'emcd-kv__value' }, value ?? children));
}

/** Search — поле поиска (лупа, текст, крестик «Очистить», когда введено). size: s 32 · m 40. text / placeholder — подсказка. Esc очищает.
 *  Без value — неуправляемое; onChange(value, event). Draft-набор: правила — по Input. */
const Search = React.forwardRef(function Search({ size = 'm', text, placeholder, value, defaultValue = '', onChange, onClear, clearLabel = 'Очистить', label, disabled = false, className, ...inputProps }, ref) {
  const [val, setVal] = useControllable(value, defaultValue, onChange);
  const ph = placeholder ?? text ?? 'Поиск';
  const clear = (e) => { setVal('', e); if (onClear) onClear(e); };
  return h('div', { role: 'search', className: cx('emcd-search', size === 's' && 'emcd-search--s', disabled && 'emcd-search--disabled', className) },
    h(Icon, { name: 'search', className: 'emcd-search__icon' }),
    h('input', { ref, type: 'search', className: 'emcd-search__input', value: val ?? '', placeholder: ph, 'aria-label': label ?? ph, disabled,
      onChange: (e) => setVal(e.target.value, e), onKeyDown: (e) => { if (e.key === 'Escape' && val) { e.preventDefault(); clear(e); } }, ...inputProps }),
    !!val && !disabled && h(IconButton, { type: 'ghost', size: 's', label: clearLabel, className: 'emcd-search__clear', icon: h(Icon, { name: 'close' }), onClick: clear }));
});

/** Select compact — компактный селектор без лейбла «на месте» («KAS ▾»): монета, сеть, валюта. Высота 36, ширина по содержимому до 200.
 *  options: [{ value, label, coin, leading, disabled }] — список (Menu listbox); без options — только кнопка (свой Menu / Sheet через onOpenChange).
 *  text — подпись (по умолчанию — выбранная опция); leading — Coin / Coin stack (по умолчанию — монета опции); label — что выбирается (доступное имя «Монета: KAS»). */
function SelectCompact({ text, label = 'Значение', options, value, defaultValue, onChange, open, defaultOpen = false, onOpenChange, leading, showLeading = true,
  disabled = false, menuSize = 'm', className, ...rest }) {
  const id = useId();
  const [cur, setCur] = useControllable(value, defaultValue ?? (options && options[0] ? options[0].value : undefined), onChange);
  const [isOpen, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const [active, setActive] = React.useState(-1);
  const root = React.useRef(null);
  const btn = React.useRef(null);
  const list = options || [];
  const sel = list.find((o) => o.value === cur);
  const enabled = list.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  React.useEffect(() => {
    if (!isOpen) return undefined;
    const out = (e) => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  }, [isOpen, setOpen]);
  const shownText = text ?? (sel ? sel.label : '');
  const lead = showLeading ? (leading ?? (sel && (sel.leading ?? (sel.coin ? h(Coin, { coin: sel.coin, size: 'm' }) : null)))) : null;
  const openMenu = () => { setOpen(true); const i = list.indexOf(sel); setActive(i >= 0 ? i : enabled[0] ?? -1); };
  const choose = (o) => { if (o.disabled) return; setCur(o.value); setOpen(false); if (btn.current) btn.current.focus(); };
  const onKey = (e) => {
    if (disabled) return;
    if (!isOpen) { if (['ArrowDown', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openMenu(); } return; }
    if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); return; }
    if (!enabled.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const k = enabled.indexOf(active); const n = enabled.length; setActive(enabled[(k + (e.key === 'ArrowDown' ? 1 : -1) + n) % n]); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (list[active]) choose(list[active]); }
  };
  return h('div', { ref: root, className: cx('emcd-select-compact', isOpen && 'emcd-select-compact--open', className) },
    h('button', { ref: btn, type: 'button', className: 'emcd-select-compact__trigger', disabled, 'aria-haspopup': 'listbox', 'aria-expanded': !!isOpen,
      'aria-controls': options ? id + '-lb' : undefined, 'aria-label': typeof shownText === 'string' ? `${label}: ${shownText}` : label,
      'aria-activedescendant': isOpen && active >= 0 ? id + '-o' + active : undefined, onClick: () => (isOpen ? setOpen(false) : openMenu()), onKeyDown: onKey, ...rest },
    h('span', { className: 'emcd-select-compact__value' }, lead && h('span', { className: 'emcd-select-compact__leading' }, lead), h('span', { className: 'emcd-select-compact__text' }, shownText)),
    h(Icon, { name: 'chevron-down', size: 'sm', className: 'emcd-select-compact__chevron' })),
    isOpen && options && !disabled && h(Menu, { size: menuSize, role: 'listbox', id: id + '-lb', label, className: 'emcd-select-compact__menu' },
      list.map((o, i) => h(MenuItem, { key: o.value ?? i, id: id + '-o' + i, label: o.label, description: o.description, disabled: o.disabled, selected: o.value === cur,
        leading: o.leading ?? (o.coin ? h(Coin, { coin: o.coin, size: 'm' }) : undefined),
        'data-active': i === active ? '' : undefined, onMouseDown: (e) => e.preventDefault(), onMouseEnter: () => setActive(i), onClick: () => choose(o) }))));
}

/** Date range field — поле периода на базе Input M (подпись на рамке): «ДД.ММ.ГГ → ДД.ММ.ГГ» + иконка календаря. from / to — даты в формате локали.
 *  Панель (Calendar Mode=Range + пресеты) — у продукта: onOpen(event) по нажатию, Enter, Space или ↓. state: default | error | disabled | skeleton; hint — ограничение периода до выбора, error — после. */
function DateRangeField({ label = 'Период', from, to, placeholder = 'ДД.ММ.ГГ → ДД.ММ.ГГ', hint, error, state = 'default', labelPosition = 'on-border', onOpen, className, ...rest }) {
  const val = from || to ? `${from || '…'} → ${to || '…'}` : '';
  const off = state === 'disabled' || state === 'skeleton';
  return h('div', { role: 'group', 'aria-label': typeof label === 'string' ? label : undefined, className: cx('emcd-date-range', className) },
    h(Input, { label, labelPosition, state, hint, error, value: val, placeholder, readOnly: true, 'aria-haspopup': 'dialog',
      onClick: off ? undefined : onOpen, onKeyDown: (e) => { if (!off && onOpen && ['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); onOpen(e); } },
      trailing: h(Icon, { name: 'calendar' }), ...rest }));
}

/** Page indicator — точки карусели (2–5), текущая вытянутая. selected — номер с 1. onSelect(n) — точки кликабельны (есть свайп или стрелки), иначе декоративны. Озвучивается «Слайд 3 из 5». */
function PageIndicator({ count = 2, selected = 1, onSelect, label = 'Слайд', className, ...rest }) {
  const n = Math.max(1, Number(count) || 1);
  const cur = Math.min(n, Math.max(1, Number(selected) || 1));
  return h('div', { className: cx('emcd-page-indicator', className), role: onSelect ? 'group' : 'img', 'aria-label': `${label} ${cur} из ${n}`, ...rest },
    Array.from({ length: n }, (_, i) => (onSelect
      ? h('button', { key: i, type: 'button', className: 'emcd-page-dot', 'aria-current': i + 1 === cur ? 'true' : undefined, 'aria-label': `${label} ${i + 1} из ${n}`, onClick: (e) => onSelect(i + 1, e) })
      : h('span', { key: i, className: 'emcd-page-dot', 'aria-current': i + 1 === cur ? 'true' : undefined }))));
}

const SERIES_DASH = { 5: '4 2', 6: '2 2', 7: '6 2 2 2', 8: '1 2' };
const seriesN = (s) => Math.min(8, Math.max(1, Number(s) || 1));
/** Legend swatch — маркер серии графика: dot (столбцы, области) · line (линии; серии 5–8 пунктиром). series 1 — `border/accent` (основная, бренд), 2–8 — `data/2…8`. Декоративен. */
function LegendSwatch({ marker = 'dot', series = 1, className, ...rest }) {
  const s = seriesN(series);
  return h('span', { className: cx('emcd-legend-swatch', marker === 'line' && 'emcd-legend-swatch--line', 'emcd-legend-swatch--s' + s, className), 'aria-hidden': true, ...rest },
    marker === 'line' ? h('svg', { viewBox: '0 0 12 12', focusable: 'false' }, h('line', { x1: 0, y1: 6, x2: 12, y2: 6, strokeDasharray: SERIES_DASH[s] })) : h('span', { className: 'emcd-legend-swatch__dot' }));
}

/** Legend item — маркер серии + подпись (+ значение при showValue). selected — серия выбрана / закреплена; onClick — кнопка «скрыть / показать серию» (aria-pressed). skeleton — полоса. */
function LegendItem({ label, children, value, showValue = false, selected = false, marker = 'dot', series = 1, skeleton = false, onClick, className, ...rest }) {
  if (skeleton) return h('span', { className: cx('emcd-legend-item', 'emcd-legend-item--skeleton', className), 'aria-hidden': true, ...rest }, h('span', { className: 'emcd-legend-item__bone' }));
  const text = label ?? children;
  return h(onClick ? 'button' : 'span', { type: onClick ? 'button' : undefined, 'aria-pressed': onClick ? !!selected : undefined, onClick,
    className: cx('emcd-legend-item', selected && 'emcd-legend-item--selected', onClick && 'emcd-legend-item--interactive', className), title: typeof text === 'string' ? text : undefined, ...rest },
  h(LegendSwatch, { marker, series }), h('span', { className: 'emcd-legend-item__label' }, text),
  showValue && value != null && h('span', { className: 'emcd-legend-item__value' }, value));
}

/** Chart metric — показатель над графиком: подпись (text-tertiary) + крупное значение (heading-lg, display) + единица. tone: default | danger | warning | success — смысл значения.
 *  icon — true (lightning), имя иконки DS или узел: иконка слева от значения цвета тона. role=group с aria-label «Подпись: значение единица». */
function ChartMetric({ tone = 'default', label, value, unit, showUnit = true, icon: ic = false, className, ...rest }) {
  const iconNode = ic === true ? h(Icon, { name: 'lightning' }) : icon(ic || null);
  const aria = typeof label === 'string' && value != null && typeof value !== 'object' ? `${label}: ${value}${showUnit && unit ? ' ' + unit : ''}` : undefined;
  return h('div', { role: 'group', 'aria-label': aria, className: cx('emcd-chart-metric', tone !== 'default' && 'emcd-chart-metric--' + tone, className), ...rest },
    h('span', { className: 'emcd-chart-metric__label', title: typeof label === 'string' ? label : undefined }, label),
    h('span', { className: 'emcd-chart-metric__value-row', 'aria-hidden': aria ? true : undefined },
      iconNode && h('span', { className: 'emcd-chart-metric__icon' }, iconNode),
      h('span', { className: 'emcd-chart-metric__value' }, value),
      showUnit && unit != null && h('span', { className: 'emcd-chart-metric__unit' }, unit)));
}

const SORT_NEXT = { none: 'descending', descending: 'ascending', ascending: 'descending' };
const SORT_ICON = { none: 'sort', descending: 'sort-line-down', ascending: 'sort-line-up' };
/** Table header cell — заголовок колонки (`th scope=col`, `aria-sort`). align: start (текст) | end (числа). sortable — кнопка сортировки: None → Descending → Ascending (onSort(sort)).
 *  sort: none | ascending | descending (без sort — неуправляемый от defaultSort). showFilter / showInfo — иконки перед / после подписи. skeleton — полоса. */
function TableHeaderCell({ align = 'start', sort, defaultSort = 'none', onSort, sortable = true, label, children, showFilter = false, showInfo = false, infoLabel = 'Пояснение',
  skeleton = false, width, className, style, ...rest }) {
  const [cur, set] = useControllable(sort, defaultSort, onSort);
  const text = label ?? children;
  const inner = [
    showFilter && h(Icon, { key: 'f', name: 'filter', size: 'sm', className: 'emcd-th__filter' }),
    sortable && h(Icon, { key: 's', name: SORT_ICON[cur] || 'sort', size: 'sm', className: 'emcd-th__sort' }),
    h('span', { key: 'l', className: 'emcd-th__label', title: typeof text === 'string' ? text : undefined }, text),
    showInfo && h(Icon, { key: 'i', name: 'info', size: 'sm', label: infoLabel, className: 'emcd-th__info' })];
  return h('th', { scope: 'col', 'aria-sort': sortable && !skeleton ? cur : undefined, style: width != null ? { width, ...style } : style,
    className: cx('emcd-th', align === 'end' && 'emcd-th--end', sortable && cur !== 'none' && 'emcd-th--sorted', skeleton && 'emcd-th--skeleton', className), ...rest },
  skeleton ? h('span', { className: 'emcd-th__bone', 'aria-hidden': true })
    : sortable ? h('button', { type: 'button', className: 'emcd-th__button', onClick: (e) => set(SORT_NEXT[cur] || 'descending', e) }, ...inner)
      : h('span', { className: 'emcd-th__content' }, ...inner));
}

/** Table cell — ячейка (`td`). align: start | end (числа, суммы, действия). Содержимое — children (атом DS: Coin, Amount, Status, Icon button…) или primary + secondary (две строки текста).
 *  skeleton — одна полоса; disabled — текст text-disabled (атомы гасить их disabled). */
function TableCell({ align = 'start', primary, secondary, children, content, skeleton = false, disabled = false, className, ...rest }) {
  const slot = children ?? content;
  const body = skeleton ? h('span', { className: 'emcd-td__bone', 'aria-hidden': true })
    : slot != null ? slot
      : [h('span', { key: 'p', className: 'emcd-td__primary', title: typeof primary === 'string' ? primary : undefined }, primary),
        secondary != null && h('span', { key: 's', className: 'emcd-td__secondary', title: typeof secondary === 'string' ? secondary : undefined }, secondary)];
  return h('td', { className: cx('emcd-td', align === 'end' && 'emcd-td--end', skeleton && 'emcd-td--skeleton', disabled && 'emcd-td--disabled', className), 'aria-busy': skeleton || undefined, ...rest },
    h('div', { className: 'emcd-td__content' }, body));
}

/** Table row — строка (`tr`) из Table cell. density: compact 48 | regular 64 (одна на таблицу). selected — accent-subtle. onClick — строка открывает детали: Hover / Pressed, Tab + Enter. */
function TableRow({ density = 'compact', selected = false, onClick, children, className, ...rest }) {
  return h('tr', { className: cx('emcd-tr', density === 'regular' && 'emcd-tr--regular', selected && 'emcd-tr--selected', onClick && 'emcd-tr--interactive', className),
    'data-selected': selected ? '' : undefined, tabIndex: onClick ? 0 : undefined, onClick,
    onKeyDown: onClick ? (e) => { if (e.key === 'Enter' && e.target === e.currentTarget) onClick(e); } : undefined, ...rest }, children);
}

/** Table — таблица Web (паттерн, не набор Figma): шапка из Table header cell + строки Table row. columns: [{ key, label, align, sortable, width, render(row) }];
 *  rows: [{ id, selected, …значения по key }]; sort: { key, dir } (dir — ascending | descending), onSort(sort) — данные сортирует продукт. onRowClick(row) — строки открывают детали.
 *  skeletonRows — строки-скелетоны при загрузке. Без columns — children внутри tbody. На Compact таблицу заменяют List item / Transaction. */
function Table({ columns = [], rows = [], density = 'compact', sort, defaultSort = null, onSort, onRowClick, skeletonRows = 0, label, caption, children, className, ...rest }) {
  const [cur, set] = useControllable(sort, defaultSort, onSort);
  return h('div', { className: cx('emcd-table-wrap', className), ...rest },
    h('table', { className: 'emcd-table', 'aria-label': caption ? undefined : label },
      caption && h('caption', { className: 'emcd-table__caption' }, caption),
      columns.length > 0 && h('colgroup', null, columns.map((c, i) => h('col', { key: c.key ?? i, style: c.width != null ? { width: c.width } : undefined }))),
      columns.length > 0 && h('thead', null, h('tr', { className: 'emcd-table__head' }, columns.map((c, i) => h(TableHeaderCell, { key: c.key ?? i, label: c.label, align: c.align, sortable: !!c.sortable,
        sort: c.sortable ? (cur && cur.key === c.key ? cur.dir : 'none') : undefined, onSort: (dir) => set({ key: c.key, dir }) })))),
      h('tbody', null,
        columns.length ? rows.map((r, ri) => h(TableRow, { key: r.id ?? ri, density, selected: !!r.selected, onClick: onRowClick ? (e) => onRowClick(r, e) : undefined },
          columns.map((c, ci) => h(TableCell, { key: c.key ?? ci, align: c.align }, c.render ? c.render(r) : r[c.key])))) : children,
        Array.from({ length: skeletonRows }, (_, i) => h(TableRow, { key: 'sk' + i, density }, columns.map((c, ci) => h(TableCell, { key: ci, align: c.align, skeleton: true })))))));
}

/** Promo card — промо: заголовок, описание, одно действие, картинка справа. size: s (сайдбар 222) · m (мобильный, 335) · l (дашборд Web, 545); tone: neutral | accent (главная акция: градиентная обводка, Primary);
 *  align: start | center (анонс без картинки и закрытия, бейдж над заголовком). Действие — Button S: в S — Text, в M / L — Primary (Accent) / Secondary (Neutral).
 *  showMedia + media (src или узел) — картинка со свечением, обрезается краем; showClose — крестик (onClose), закрытая не возвращается; showBadge — Badge S Accent («Новое»). */
function PromoCard({ size = 's', tone = 'neutral', align = 'start', title, description, showDescription = true, showAction = true, actionLabel = 'Подробнее', onAction,
  showMedia = false, media, showClose = true, onClose, closeLabel = 'Скрыть', showBadge = false, badgeLabel = 'Новое', className, children, ...rest }) {
  const [shown, setShown] = React.useState(true);
  if (!shown) return null;
  const center = align === 'center';
  const withMedia = showMedia && !center;
  const badge = showBadge && h(Badge, { size: 's', tone: 'accent', label: badgeLabel, className: 'emcd-promo__badge' });
  return h('section', { 'aria-label': typeof title === 'string' ? title : undefined,
    className: cx('emcd-promo', size !== 's' && 'emcd-promo--' + size, tone === 'accent' && 'emcd-promo--accent', center && 'emcd-promo--center', withMedia && 'emcd-promo--media', className), ...rest },
  withMedia && h('div', { className: 'emcd-promo__media', 'aria-hidden': true }, h('span', { className: 'emcd-promo__glow' }),
    typeof media === 'string' ? h('img', { className: 'emcd-promo__image', src: media, alt: '' }) : media ?? h('span', { className: 'emcd-promo__image emcd-promo__image--placeholder' })),
  h('div', { className: 'emcd-promo__column' },
    h('div', { className: 'emcd-promo__text' },
      center && badge,
      h('div', { className: 'emcd-promo__title-row' }, h('p', { className: 'emcd-promo__title' }, title), !center && badge),
      showDescription && description != null && h('p', { className: 'emcd-promo__desc' }, description), children),
    showAction && h(Button, { type: size === 's' ? 'text' : tone === 'accent' ? 'primary' : 'secondary', size: 's', label: actionLabel, onClick: onAction, className: 'emcd-promo__action' })),
  showClose && !center && h(IconButton, { type: 'ghost', size: 's', label: closeLabel, className: 'emcd-promo__close', icon: h(Icon, { name: 'close' }), onClick: (e) => { setShown(false); if (onClose) onClose(e); } }));
}

/** Sidebar — основная навигация Web (Large+): плавающая панель L1. collapsed — рейка 72 (только иконки, подписи в Tooltip), иначе 240.
 *  Header: header (свой узел) или logo + language (Button Secondary XS, onLanguage) + cta (узел, Button Primary S); onCollapsedChange — кнопка «свернуть» (aria-expanded).
 *  Nav: nav (узел) или items — [{ label, icon, href, selected, counter, badge, badgeLabel, badgeTone, onClick } | { divider: true }]; Selected — ровно один.
 *  promo — true / false или узел (Promo card S с картинкой); при collapsed скрыт. Footer: footer (узел) + account — { name, link: 'Профиль', src, onClick } (Avatar M + имя + ссылка + шеврон). */
function Sidebar({ collapsed = false, onCollapsedChange, collapseLabel = 'Свернуть меню', expandLabel = 'Развернуть меню', header, logo, language, onLanguage, cta,
  nav, items, promo = true, footer, account, label = 'Основная навигация', className, ...rest }) {
  const head = header ?? [
    h('div', { key: 'b', className: 'emcd-sidebar__brand' },
      onCollapsedChange && h(IconButton, { type: 'tertiary', size: 'xs', label: collapsed ? expandLabel : collapseLabel, 'aria-expanded': !collapsed, className: 'emcd-sidebar__toggle',
        icon: h(Icon, { name: collapsed ? 'chevron-right' : 'chevron-left' }), onClick: () => onCollapsedChange(!collapsed) }),
      !collapsed && h('span', { className: 'emcd-sidebar__logo' }, logo ?? 'EMCD'),
      !collapsed && language != null && h(Button, { type: 'secondary', size: 'xs', label: language, className: 'emcd-sidebar__language', onClick: onLanguage })),
    !collapsed && cta ? h('div', { key: 'c', className: 'emcd-sidebar__cta' }, cta) : null];
  const navBody = nav ?? (items || []).map((it, i) => (it.divider ? h('hr', { key: 'd' + i, className: 'emcd-sidebar__divider' })
    : h(NavItem, { key: it.key ?? i, ...it, collapsed })));
  const acc = account && h('button', { type: 'button', className: 'emcd-sidebar__account', onClick: account.onClick, 'aria-label': collapsed ? account.name : undefined },
    h(Avatar, { size: 'm', name: account.name, src: account.src }),
    !collapsed && h('span', { className: 'emcd-sidebar__account-text' }, h('span', { className: 'emcd-sidebar__account-name' }, account.name),
      h('span', { className: 'emcd-sidebar__account-link' }, account.link ?? 'Профиль')),
    !collapsed && h(Icon, { name: 'chevron-down', className: 'emcd-sidebar__account-chevron' }));
  return h('aside', { className: cx('emcd-sidebar', collapsed && 'emcd-sidebar--collapsed', className), ...rest },
    h('div', { className: 'emcd-sidebar__header' }, head),
    h('nav', { className: 'emcd-sidebar__nav', 'aria-label': label }, navBody),
    !collapsed && promo && promo !== true && h('div', { className: 'emcd-sidebar__promo' }, promo),
    (footer || acc) && h('div', { className: 'emcd-sidebar__footer' }, footer, acc));
}

// Геометрия графика: шкала «круглых» делений 0…max (по умолчанию 4 интервала) и подписи с нужным числом знаков
function chartScale(max, ticks = 4, fixed) {
  if (fixed && fixed.length) { const m = Math.max(...fixed); return { max: m || 1, ticks: fixed, digits: Math.max(0, ...fixed.map((t) => (String(t).split('.')[1] || '').length)) }; }
  const raw = (Number(max) > 0 ? Number(max) : 1) / ticks; // нет данных — шкала 0…1
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * p).find((s) => s >= raw - 1e-12) || 10 * p;
  const digits = step >= 1 ? 0 : (String(+step.toFixed(6)).split('.')[1] || '').length;
  return { max: step * ticks, ticks: Array.from({ length: ticks + 1 }, (_, i) => +(i * step).toFixed(6)), digits };
}
const CHART_KIND = { bars: ['bar'], line: ['line'], area: ['area'], 'line-bars': ['line', 'bar'], 'multi-line': ['line'], 'dual-area': ['area', 'area'], 'stacked-bars': ['stack'] };
/** Chart plot — область графика (SVG): серии, сетка пунктиром, подписи осей (моно, text-tertiary). type: bars | line | area | line-bars | multi-line | dual-area | stacked-bars.
 *  series: [{ name, data: number[] }] — серия 1 — `border/accent` (бренд), остальные — `data/2…8` (вторая ось Line + Bars и Dual area — `data/4`); line-bars и dual-area: серия 2 — по правой оси.
 *  labels — подписи X по точкам (показывается не больше xTicks, по умолчанию 6); yLeft / yRight — { ticks: [...] } вместо автошкалы; format(v, axis) — подпись деления.
 *  state: default | skeleton | empty | disabled (emptyText — «Нет данных за период»); label — aria-label «что и за какой период». Hover (Chart crosshair + Chart tooltip) — пока не в коде. */
function ChartPlot({ type = 'bars', series = [], labels = [], xTicks = 6, yLeft, yRight, format, height = 200, state = 'default', emptyText = 'Нет данных за период', label, className, style, ...rest }) {
  const W = 1000; const H = Number(height) || 200;
  const kinds = CHART_KIND[type] || CHART_KIND.bars;
  const n = Math.max(1, ...series.map((s) => (s.data || []).length), labels.length);
  const slot = W / n;
  const dual = type === 'line-bars' || type === 'dual-area';
  const kindOf = (i) => (type === 'stacked-bars' ? 'stack' : kinds[Math.min(i, kinds.length - 1)]);
  const axisOf = (i) => (dual && i === 1 ? 'right' : 'left');
  const colorOf = (i) => (dual && i === 1 ? 4 : i + 1);
  const maxOf = (axis) => (type === 'stacked-bars'
    ? Math.max(0, ...Array.from({ length: n }, (_, k) => series.reduce((a, s) => a + (Number((s.data || [])[k]) || 0), 0)))
    : Math.max(0, ...series.filter((_, i) => axisOf(i) === axis).flatMap((s) => (s.data || []).map(Number).filter(Number.isFinite))));
  const L = chartScale(maxOf('left'), 4, yLeft && yLeft.ticks);
  const R = dual ? chartScale(maxOf('right'), 4, yRight && yRight.ticks) : null;
  const fmt = (v, axis, sc) => (format ? format(v, axis) : v === 0 ? '0' : v.toFixed(sc.digits));
  const y = (v, sc) => H - (Math.max(0, Number(v) || 0) / sc.max) * H;
  const x = (k) => (k + 0.5) * slot;
  const skeleton = state === 'skeleton';
  const empty = state === 'empty' || (!skeleton && !series.some((s) => (s.data || []).length));
  const bars = series.map((s, i) => [s, i]).filter(([, i]) => kindOf(i) === 'bar');
  const marks = [];
  if (skeleton) {
    if (kinds[0] === 'bar' || kinds[0] === 'stack') { const m = n > 1 ? Math.min(n, 24) : 12; for (let k = 0; k < m; k++) { const w = W / m; const v = 0.35 + 0.25 * ((k % 4) / 3); marks.push(h('rect', { key: 'k' + k, className: 'emcd-chart-plot__bone', x: k * w + w * 0.3, y: H * (1 - v), width: w * 0.4, height: H * v })); } }
    else marks.push(h('path', { key: 'k', className: 'emcd-chart-plot__bone', d: `M0 ${H * 0.55} C ${W * 0.2} ${H * 0.25}, ${W * 0.35} ${H * 0.75}, ${W * 0.55} ${H * 0.45} S ${W * 0.85} ${H * 0.3}, ${W} ${H * 0.5} L ${W} ${H} L 0 ${H} Z` }));
  } else if (!empty) {
    const bw = slot * (type === 'stacked-bars' ? 0.5 : 0.45) / Math.max(1, bars.length);
    const base = new Array(n).fill(0);
    series.forEach((s, i) => {
      const kind = kindOf(i); const sc = axisOf(i) === 'right' ? R : L; const d = s.data || [];
      const cls = cx('emcd-chart-plot__series', 'emcd-chart-plot__series--' + colorOf(i));
      if (kind === 'bar') { const j = bars.findIndex(([, bi]) => bi === i); d.forEach((v, k) => { const top = y(v, sc); marks.push(h('rect', { key: `b${i}-${k}`, className: cls + ' emcd-chart-plot__bar', x: x(k) - (bw * bars.length) / 2 + j * bw, y: top, width: bw, height: H - top })); }); }
      else if (kind === 'stack') d.forEach((v, k) => { const top = y(base[k] + (Number(v) || 0), sc); const bot = y(base[k], sc); base[k] += Number(v) || 0; marks.push(h('rect', { key: `s${i}-${k}`, className: cls + ' emcd-chart-plot__bar', x: x(k) - bw / 2, y: top, width: bw, height: bot - top })); });
      else {
        const pts = d.map((v, k) => `${x(k).toFixed(1)} ${y(v, sc).toFixed(1)}`);
        if (!pts.length) return;
        if (kind === 'area') marks.push(h('path', { key: `a${i}`, className: cls + ' emcd-chart-plot__area', d: `M${x(0).toFixed(1)} ${H} L${pts.join(' L')} L${x(d.length - 1).toFixed(1)} ${H} Z` }));
        marks.push(h('path', { key: `l${i}`, className: cx(cls, 'emcd-chart-plot__line', i >= 4 && 'emcd-chart-plot__line--dash-' + (i + 1)), d: 'M' + pts.join(' L') }));
      }
    });
  }
  // линии — поверх столбцов и областей
  const isLine = (el) => (/__line/.test(el.props.className) ? 1 : 0);
  marks.sort((a, b) => isLine(a) - isLine(b));
  // подписи X: только непустые, не больше xTicks — равномерно
  const filled = labels.map((t, k) => (t != null && t !== '' ? k : -1)).filter((k) => k >= 0);
  const step = Math.max(1, Math.ceil(filled.length / Math.max(1, xTicks)));
  const xl = filled.filter((_, j) => j % step === 0).map((k) => h('span', { key: k, className: 'emcd-chart-plot__x', style: { left: ((k + 0.5) / n) * 100 + '%' } }, labels[k]));
  const axis = (sc, side) => h('div', { className: 'emcd-chart-plot__axis emcd-chart-plot__axis--' + side, 'aria-hidden': true },
    !skeleton && !empty && sc.ticks.map((t) => h('span', { key: t, className: 'emcd-chart-plot__tick', style: { top: (1 - t / sc.max) * 100 + '%' } }, fmt(t, side, sc))));
  return h('div', { role: 'img', 'aria-label': label, 'aria-busy': skeleton || undefined, style: { '--emcd-chart-h': H + 'px', ...style },
    className: cx('emcd-chart-plot', R && 'emcd-chart-plot--dual', skeleton && 'emcd-chart-plot--skeleton', empty && 'emcd-chart-plot--empty', state === 'disabled' && 'emcd-chart-plot--disabled', className), ...rest },
  axis(L, 'left'),
  h('div', { className: 'emcd-chart-plot__area-box' },
    h('svg', { className: 'emcd-chart-plot__svg', viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', 'aria-hidden': true, focusable: 'false' },
      !(skeleton && kinds[0] !== 'bar' && kinds[0] !== 'stack') && L.ticks.map((t) => h('line', { key: 'g' + t, className: 'emcd-chart-plot__grid', x1: 0, x2: W, y1: y(t, L), y2: y(t, L) })),
      marks),
    empty && h('span', { className: 'emcd-chart-plot__empty' }, emptyText)),
  R ? axis(R, 'right') : null,
  h('div', { className: 'emcd-chart-plot__x-row', 'aria-hidden': true }, !skeleton && !empty && xl));
}

/** Chart card — виджет графика: Top (Chart metric × 1–3 + период — ряд Chip, выбранный белый; в конце Top — легенда над графиком), Content (Chart plot — children), Bottom — итог за период (sum).
 *  metrics: [{ label, value, unit, icon, tone }]; periods: [{ value, label }] — период (без period — неуправляемый, onPeriodChange(value)); periodSize: s (Web) | m (Compact).
 *  legend: [{ label, series, marker, value, showValue }] — над графиком (19.11, по продукту); showBottom=false — без итога. top / bottom — свои узлы вместо собранных. label — имя группы. */
function ChartCard({ label, metrics = [], periods, period, defaultPeriod, onPeriodChange, periodSize = 's', periodLabel = 'Период', legend = [], sum, showBottom = true, top, bottom, children, content, className, ...rest }) {
  const [cur, set] = useControllable(period, defaultPeriod ?? (periods && periods[0] ? periods[0].value : undefined), onPeriodChange);
  const headNode = (metrics.length || periods) ? h('div', { className: 'emcd-chart-card__top' },
    metrics.length > 0 && h('div', { className: 'emcd-chart-card__metrics' }, metrics.map((m, i) => h(ChartMetric, { key: i, ...m }))),
    periods && h('div', { className: cx('emcd-chart-card__periods', periodSize === 'm' && 'emcd-chart-card__periods--m'), role: 'group', 'aria-label': periodLabel },
      periods.map((p) => h(Chip, { key: p.value, size: periodSize, label: p.label, selected: p.value === cur, onClick: (e) => set(p.value, e) })))) : null;
  const legendNode = legend.length > 0 ? h('ul', { className: 'emcd-legend emcd-chart-card__legend' }, legend.map((l, i) => h('li', { key: i }, h(LegendItem, { ...l })))) : null;
  const topNode = top ?? ((headNode || legendNode) ? h('div', { className: 'emcd-chart-card__head' }, headNode, legendNode) : null);
  const bottomNode = bottom ?? (sum != null ? h('div', { className: 'emcd-chart-card__bottom' }, h('span', { className: 'emcd-chart-card__sum' }, sum)) : null);
  return h('section', { role: 'group', 'aria-label': label, className: cx('emcd-chart-card', className), ...rest },
    topNode, h('div', { className: 'emcd-chart-card__content' }, children ?? content), showBottom && bottomNode);
}

/** Top bar (draft) — шапка мобильного веба: логотип, аккаунт (имя + шеврон), баланс (копейки text-tertiary) и «Меню». platform: mobile-web (App — следующим вариантом).
 *  onAccount / onBalance / onMenu — нажатия; showBalance=false — без баланса. */
function TopBar({ platform = 'mobile-web', logo, account, onAccount, balance, cents, showBalance = true, onBalance, onMenu, menuLabel = 'Меню', className, ...rest }) {
  return h('header', { className: cx('emcd-top-bar', className), 'data-platform-variant': platform, ...rest },
    h('span', { className: 'emcd-top-bar__logo' }, logo ?? 'E'),
    account != null && h('button', { type: 'button', className: 'emcd-top-bar__account', onClick: onAccount },
      h('span', { className: 'emcd-top-bar__name' }, account), h(Icon, { name: 'chevron-down', size: 'sm' })),
    showBalance && balance != null && h('button', { type: 'button', className: 'emcd-top-bar__balance', onClick: onBalance, 'aria-label': `Баланс ${balance}${cents ?? ''}` },
      h('span', { className: 'emcd-top-bar__amount' }, balance, cents != null && h('span', { className: 'emcd-top-bar__cents' }, cents)), h(Icon, { name: 'chevron-down', size: 'sm' })),
    h(IconButton, { type: 'ghost', size: 'm', label: menuLabel, className: 'emcd-top-bar__menu', icon: h(Icon, { name: 'menu' }), onClick: onMenu }));
}

const SUMMARY = [{ tone: 'danger', label: 'Отключённые' }, { tone: 'warning', label: 'Нестабильные' }, { tone: 'neutral', label: 'Активные' }];
/** Status summary (draft) — сводка воркеров: 3 × Stat card Align=Center (Отключённые → Нестабильные → Активные) со стрелкой-ссылкой. layout: column (Web, колонка у графика) | row (Compact, ряд + «Все воркеры»).
 *  offline / unstable / active — числа (или items: [{ tone, label, value }]); onItem(item) — переход в «Воркеры» с фильтром; showAllLink + onAllLink — ссылка «Все воркеры» (только row). */
function StatusSummary({ layout = 'column', offline, unstable, active, items, onItem, showAllLink = true, allLinkLabel = 'Все воркеры', onAllLink, className, ...rest }) {
  const list = items ?? SUMMARY.map((d, i) => ({ ...d, value: [offline, unstable, active][i] }));
  return h('div', { className: cx('emcd-status-summary', layout === 'row' && 'emcd-status-summary--row', className), ...rest },
    h('div', { className: 'emcd-status-summary__tiles' }, list.map((it, i) => h(StatCard, { key: i, tone: it.tone, align: 'center', label: it.label, value: it.value, delta: false, info: false,
      link: true, linkLabel: `${it.label}, ${it.value ?? ''}`.replace(/, $/, ''), onLink: (e) => { if (onItem) onItem(it, e); }, className: 'emcd-status-summary__tile' }))),
    layout === 'row' && showAllLink && h(Button, { type: 'text', size: 's', label: allLinkLabel, iconRight: h(Icon, { name: 'chevron-right', size: 'sm' }), onClick: onAllLink, className: 'emcd-status-summary__all' }));
}

/** Promo carousel (draft) — промо внизу мобильного дашборда: слайды (Promo card M, ширина 311, следующая подглядывает) с прокруткой scroll-snap + Page indicator, синхронный с прокруткой.
 *  slides — массив узлов (или children); index / defaultIndex / onIndexChange — текущий слайд (с 0). Регион «Промо», слайд — группа «1 из 3». */
function PromoCarousel({ slides, children, label = 'Промо', index, defaultIndex = 0, onIndexChange, className, ...rest }) {
  const list = slides ?? React.Children.toArray(children);
  const [cur, set] = useControllable(index, defaultIndex, onIndexChange);
  const track = React.useRef(null);
  const raf = React.useRef(0);
  const go = (i, smooth = true) => {
    const t = track.current; const el = t && t.children[i];
    if (el) t.scrollTo({ left: el.offsetLeft - t.firstElementChild.offsetLeft, behavior: smooth ? 'smooth' : 'auto' });
  };
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const t = track.current; if (!t || !t.children.length) return;
      const x0 = t.firstElementChild.offsetLeft;
      let best = 0; let dist = Infinity;
      [...t.children].forEach((el, i) => { const d = Math.abs(el.offsetLeft - x0 - t.scrollLeft); if (d < dist) { dist = d; best = i; } });
      if (best !== cur) set(best);
    });
  };
  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return h('section', { className: cx('emcd-promo-carousel', className), 'aria-roledescription': 'карусель', 'aria-label': label, ...rest },
    h('div', { ref: track, className: 'emcd-promo-carousel__track', onScroll },
      list.map((s, i) => h('div', { key: i, className: 'emcd-promo-carousel__slide', role: 'group', 'aria-roledescription': 'слайд', 'aria-label': `${i + 1} из ${list.length}`,
        onFocus: () => { if (i !== cur) set(i); } }, s))),
    list.length > 1 && h(PageIndicator, { count: list.length, selected: cur + 1, onSelect: (k) => { set(k - 1); go(k - 1); }, className: 'emcd-promo-carousel__dots' }));
}

/** Action bar (draft) — нижняя панель действий Compact: 1–2 Button M поровну, подложка surface-level-0, прилипает к низу (над safe area).
 *  actions — [{ label, type, iconLeft, onClick }]: одно — Primary, два — Tertiary (переопределяется type); или свои Button в children. На экранах с Tab bar и на Web не используем. */
function ActionBar({ actions, children, className, ...rest }) {
  const btns = actions ? actions.slice(0, 2).map((a, i) => h(Button, { key: i, size: 'm', type: actions.length === 1 ? 'primary' : 'tertiary', ...a, iconLeft: icon(a.iconLeft) })) : children;
  return h('div', { className: cx('emcd-action-bar', className), ...rest }, btns);
}
window.EMCD = { Button, IconButton, Badge, Chip, Checkbox, Radio, RadioGroup, Toggle, Input, Textarea, Modal, Counter, Status, Avatar, Divider, Spinner, Progress, Amount, Card, StatCard, Tooltip, Toast, Suggest, Tab, Tabs, Segment, Segmented, ListItem, Transaction, MenuItem, Menu, Select, PasswordField, Icon, Coin, CoinStack, NavItem, KeyValueRow, Search, SelectCompact, DateRangeField, PageIndicator, LegendSwatch, LegendItem, ChartMetric, TableHeaderCell, TableCell, TableRow, Table, PromoCard, Sidebar, ChartPlot, ChartCard, TopBar, StatusSummary, PromoCarousel, ActionBar };
})();
