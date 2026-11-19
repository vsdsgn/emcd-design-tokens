/* @ds-bundle: {"format":4,"namespace":"EMCD","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Badge"},{"name":"Chip"},{"name":"Checkbox"},{"name":"Radio"},{"name":"RadioGroup"},{"name":"Toggle"},{"name":"Input"},{"name":"Textarea"},{"name":"Modal"},{"name":"Counter"},{"name":"Status"},{"name":"Avatar"},{"name":"Divider"},{"name":"Spinner"},{"name":"Progress"},{"name":"Amount"},{"name":"Card"},{"name":"StatCard"},{"name":"Tooltip"},{"name":"Toast"},{"name":"Suggest"},{"name":"Tab"},{"name":"Tabs"},{"name":"Segment"},{"name":"Segmented"},{"name":"ListItem"},{"name":"Transaction"},{"name":"MenuItem"},{"name":"Menu"},{"name":"Select"},{"name":"PasswordField"}]} */
/* EMCD DS 2.0 — компоненты React 18. Генерируется scripts/code-build.mjs из packages/react/src/index.js — не править руками. */
(function () {
'use strict';
var React = window.React;
// EMCD DS 2.0 — компоненты React 18 (пачка 1 — пилот из 10 наборов; пачка 2 — ещё 19 наборов; все beta).
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
window.EMCD = { Button, IconButton, Badge, Chip, Checkbox, Radio, RadioGroup, Toggle, Input, Textarea, Modal, Counter, Status, Avatar, Divider, Spinner, Progress, Amount, Card, StatCard, Tooltip, Toast, Suggest, Tab, Tabs, Segment, Segmented, ListItem, Transaction, MenuItem, Menu, Select, PasswordField };
})();
