/* @ds-bundle: {"format":4,"namespace":"EMCD","components":[{"name":"Button"},{"name":"IconButton"},{"name":"Badge"},{"name":"Chip"},{"name":"Checkbox"},{"name":"Radio"},{"name":"RadioGroup"},{"name":"Toggle"},{"name":"Input"},{"name":"Textarea"},{"name":"Modal"}]} */
/* EMCD DS 2.0 — компоненты React 18. Генерируется scripts/code-build.mjs из packages/react/src/index.js — не править руками. */
(function () {
'use strict';
var React = window.React;
// EMCD DS 2.0 — компоненты React 18 (пилот: 10 наборов beta).
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
const SIZE_MOD = { s: 's', m: '', l: 'l', xl: 'xl' };

/** Button — действие. Одна главная (primary) на экран или блок. */
const Button = React.forwardRef(function Button(
  { type = 'primary', tone = 'default', size = 'm', label, children, iconLeft, iconRight, loading = false, disabled, htmlType = 'button', className, ...rest }, ref) {
  return h('button', {
    ref, type: htmlType, disabled, 'aria-busy': loading || undefined,
    className: cx('emcd-btn', 'emcd-btn--' + BTN_TYPE[type], tone === 'danger' && 'emcd-btn--danger', SIZE_MOD[size] && 'emcd-btn--' + SIZE_MOD[size], className),
    ...rest,
  }, loading ? SPINNER() : iconLeft, h('span', null, label ?? children), !loading && iconRight);
});

/** Icon button — действие иконкой; `label` обязателен (доступное имя и тултип на Web). */
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

/** Chip — фильтр или выбор; `selected` → aria-pressed. `onRemove` — крестик удаления. */
function Chip({ size = 's', selected = false, label, children, metaText, icon, onRemove, removeLabel = 'Убрать', trailingIcon, disabled, onClick, className, ...rest }) {
  const body = [icon, h('span', { key: 'l', className: 'emcd-chip__label' }, label ?? children), metaText != null && h('span', { key: 'm', className: 'emcd-chip__meta' }, metaText), trailingIcon];
  if (onRemove) {
    return h('span', { className: cx('emcd-chip', size === 'm' && 'emcd-chip--m', selected && 'emcd-chip--selected', className), ...rest },
      h('button', { type: 'button', className: 'emcd-chip__action', 'aria-pressed': selected, disabled, onClick }, ...body),
      h('button', { type: 'button', className: 'emcd-chip__remove', 'aria-label': removeLabel, disabled, onClick: onRemove }, CLOSE));
  }
  return h('button', { type: 'button', className: cx('emcd-chip', size === 'm' && 'emcd-chip--m', className), 'aria-pressed': selected, disabled, onClick, title: typeof (label ?? children) === 'string' ? (label ?? children) : undefined, ...rest }, ...body);
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

function Field({ size = 'm', labelPosition = 'above', state = 'default', label, hint, error, counter, className, children, as = 'label' }) {
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
  { size = 'm', labelPosition = 'above', state = 'default', label, hint, error, counter, leading, trailing, suffix, className, ...inputProps }, ref) {
  return h(Field, { size, labelPosition, state: state === 'loading' ? 'default' : state, label, hint, error, counter, className },
    (describedBy, isError) => h('span', { className: 'emcd-input' },
      leading && h('span', { className: 'emcd-input__leading' }, leading),
      h('input', { ref, disabled: state === 'disabled', readOnly: state === 'readonly', 'aria-invalid': isError || undefined, 'aria-describedby': describedBy, 'aria-busy': state === 'loading' || undefined, ...inputProps }),
      suffix && h('span', { className: 'emcd-input__suffix' }, suffix),
      state === 'loading' ? h('span', { className: 'emcd-input__trailing' }, SPINNER('emcd-field__spinner')) : trailing && h('span', { className: 'emcd-input__trailing' }, trailing)));
});

/** Textarea — многострочное поле; растёт по содержимому до max-height, дальше скролл. */
const Textarea = React.forwardRef(function Textarea(
  { state = 'default', label, hint, error, counter, maxLength, className, value, defaultValue, ...rest }, ref) {
  const [len, setLen] = React.useState(String(value ?? defaultValue ?? '').length);
  const shown = counter ?? (maxLength ? `${value != null ? String(value).length : len}/${maxLength}` : undefined);
  return h(Field, { state, label, hint, error, counter: shown, className },
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
window.EMCD = { Button, IconButton, Badge, Chip, Checkbox, Radio, RadioGroup, Toggle, Input, Textarea, Modal };
})();
