// EMCD DS 2.0 — компоненты React 18 (пачка 1 — пилот из 10 наборов; пачка 2 — ещё 19 наборов; пачка 3 — наборы экранов майнинга и конструкции; пачка 4 — hover графика и выбор периода; пачка 5 — App: Floating button, Tab bar).
// Разметка и классы — те же, что в claude-ds/components/*/style.css (общий CSS для React, Vue и HTML).
// Без JSX и сборщика: React.createElement. Props — по контрактам docs/components/*.md («Props:»).
// Источник для Claude DS (bundle.js → window.EMCD) и для пакета @emcd/react.
import * as React from 'react';

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
export const Button = React.forwardRef(function Button(
  { type = 'primary', tone = 'default', size = 'm', label, children, iconLeft, iconRight, loading = false, disabled, htmlType = 'button', className, ...rest }, ref) {
  return h('button', {
    ref, type: htmlType, disabled, 'aria-busy': loading || undefined,
    className: cx('emcd-btn', 'emcd-btn--' + BTN_TYPE[type], tone === 'danger' && 'emcd-btn--danger', SIZE_MOD[size] && 'emcd-btn--' + SIZE_MOD[size], className),
    ...rest,
  }, loading ? SPINNER() : iconLeft, h('span', null, label ?? children), !loading && iconRight);
});

/** Icon button — действие иконкой; `label` обязателен (доступное имя и тултип на Web). size: xs 24 · s 32 · m 40 · l 48 (XL снят). */
export const IconButton = React.forwardRef(function IconButton(
  { type = 'tertiary', tone = 'default', size = 'm', label, icon, children, loading = false, disabled, htmlType = 'button', className, ...rest }, ref) {
  return h('button', {
    ref, type: htmlType, disabled, 'aria-label': label, title: label, 'aria-busy': loading || undefined,
    className: cx('emcd-btn', 'emcd-icon-btn', 'emcd-btn--' + BTN_TYPE[type], tone === 'danger' && 'emcd-btn--danger', SIZE_MOD[size] && 'emcd-btn--' + SIZE_MOD[size], className),
    ...rest,
  }, loading ? SPINNER() : (icon ?? children));
});

/** Badge — неинтерактивная метка статуса или свойства. Тона Info нет (Info = цвет бренда → accent). */
export function Badge({ size = 'm', tone = 'neutral', style = 'subtle', label, children, icon, skeleton = false, className, ...rest }) {
  return h('span', {
    className: cx('emcd-badge', size !== 'm' && 'emcd-badge--' + size, tone !== 'neutral' && 'emcd-badge--' + tone, style === 'solid' && 'emcd-badge--solid', skeleton && 'emcd-badge--skeleton', className),
    'aria-hidden': skeleton || undefined, ...rest,
  }, icon, h('span', { className: 'emcd-badge__label' }, label ?? children));
}

/** Chip — фильтр или выбор; `selected` → aria-pressed (инверсная белая плашка). `statusDot` — точка статуса перед подписью (statusTone). `onRemove` — крестик удаления.
 *  skeleton — плашка skeleton/base того же размера (подпись задаёт ширину, скрыта), не нажимается и скрыта от читалки. */
export function Chip({ size = 's', selected = false, label, children, metaText, icon, statusDot = false, statusTone = 'success', onRemove, removeLabel = 'Убрать', trailingIcon, disabled, skeleton = false, onClick, className, ...rest }) {
  if (skeleton) {
    return h('span', { className: cx('emcd-chip', size === 'm' && 'emcd-chip--m', 'emcd-chip--skeleton', className), 'aria-hidden': true, ...rest },
      h('span', { className: 'emcd-chip__label' }, label ?? children), metaText != null && h('span', { className: 'emcd-chip__meta' }, metaText));
  }
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
export function Checkbox({ status = 'off', ...p }) { return h(CheckLike, { kind: 'checkbox', status, ...p }); }
/** Radio — один из группы; оборачивать в RadioGroup. */
export function Radio({ status = false, name, value, ...p }) { return h(CheckLike, { kind: 'radio', status, inputProps: { name, value }, ...p }); }
/** Radio group — fieldset + legend. */
export function RadioGroup({ legend, children, className, ...rest }) {
  return h('fieldset', { className: cx('emcd-radio-group', className), role: 'radiogroup', ...rest }, legend && h('legend', null, legend), children);
}
/** Toggle — мгновенное вкл / выкл без кнопки «Сохранить». По умолчанию переключатель справа (controlPosition = end). */
export function Toggle({ status = false, controlPosition = 'end', ...p }) { return h(CheckLike, { kind: 'toggle', status, controlPosition, ...p }); }

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
export const Input = React.forwardRef(function Input(
  { size = 'm', labelPosition = 'on-border', state = 'default', label, hint, error, counter, leading, trailing, suffix, className, ...inputProps }, ref) {
  return h(Field, { size, labelPosition, state: state === 'loading' ? 'default' : state, label, hint, error, counter, className },
    (describedBy, isError) => h('span', { className: 'emcd-input' },
      leading && h('span', { className: 'emcd-input__leading' }, leading),
      h('input', { ref, disabled: state === 'disabled', readOnly: state === 'readonly', 'aria-invalid': isError || undefined, 'aria-describedby': describedBy, 'aria-busy': state === 'loading' || undefined, ...inputProps }),
      suffix && h('span', { className: 'emcd-input__suffix' }, suffix),
      state === 'loading' ? h('span', { className: 'emcd-input__trailing' }, SPINNER('emcd-field__spinner')) : trailing && h('span', { className: 'emcd-input__trailing' }, trailing)));
});

/** Textarea — многострочное поле; растёт по содержимому до max-height, дальше скролл. size: m | l (меняет шрифт и отступы); подпись только над полем. */
export const Textarea = React.forwardRef(function Textarea(
  { size = 'm', state = 'default', label, hint, error, counter, maxLength, className, value, defaultValue, ...rest }, ref) {
  const [len, setLen] = React.useState(String(value ?? defaultValue ?? '').length);
  const shown = counter ?? (maxLength ? `${value != null ? String(value).length : len}/${maxLength}` : undefined);
  return h(Field, { size, labelPosition: 'above', state, label, hint, error, counter: shown, className },
    (describedBy, isError) => h('textarea', { ref, className: 'emcd-textarea', maxLength, value, defaultValue, disabled: state === 'disabled', readOnly: state === 'readonly', 'aria-invalid': isError || undefined, 'aria-describedby': describedBy,
      onInput: (e) => setLen(e.target.value.length), ...rest }));
});

/** Modal — диалог. header: title | coin | empty; footer: single | stacked | horizontal | none. На Compact — Sheet. */
export function Modal({ open = true, header = 'title', footer = 'single', title, description, coin, divider = false, showClose = true, onClose, closeLabel = 'Закрыть', width = 'md', children, actions, scrim = true, className }) {
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
export function Counter({ size = 's', tone = 'neutral', value, children, className, ...rest }) {
  return h('span', { className: cx('emcd-counter', size === 'm' && 'emcd-counter--m', tone !== 'neutral' && 'emcd-counter--' + tone, className), ...rest }, value ?? children);
}

/** Status — точка + подпись: состояние, которое обновляется само. showLabel=false — только с aria-label (подпись уходит в него). */
export function Status({ size = 's', tone = 'success', label, children, showLabel = true, className, ...rest }) {
  const text = label ?? children;
  return h('span', { className: cx('emcd-status', size === 'm' && 'emcd-status--m', tone !== 'success' && 'emcd-status--' + tone, className),
    role: showLabel ? undefined : 'img', 'aria-label': showLabel ? undefined : (typeof text === 'string' ? text : undefined), ...rest },
  h('span', { className: 'emcd-status__dot', 'aria-hidden': true }), showLabel && h('span', { className: 'emcd-status__label' }, text));
}

/** Avatar — круг: инициал (Text), иконка (Icon) или фото (Image). status — точка «в сети». */
export function Avatar({ size = 'xs', type, initials, name, src, alt = '', icon, status = false, skeleton = false, className, ...rest }) {
  const kind = type ?? (src ? 'image' : (initials || name) ? 'text' : 'icon');
  const letter = (initials ?? (name ? String(name).trim()[0] : '') ?? '').slice(0, 1);
  const inner = kind === 'image' ? h('img', { src, alt }) : kind === 'text' ? h('span', { 'aria-hidden': !!name || undefined }, letter) : (icon ?? I.user());
  return h('span', { className: cx('emcd-avatar', size !== 'xs' && 'emcd-avatar--' + size, kind === 'icon' && 'emcd-avatar--icon', skeleton && 'emcd-avatar--skeleton', className),
    role: name && kind !== 'image' ? 'img' : undefined, 'aria-label': name && kind !== 'image' ? name : undefined, 'aria-hidden': skeleton || undefined, ...rest },
  h('span', { className: 'emcd-avatar__circle' }, inner), status && !skeleton && h('span', { className: 'emcd-avatar__status', 'aria-label': 'В сети', role: 'img' }));
}

/** Divider — линия border-subtle. label=true — подпись «или» (только Horizontal). style: solid | dotted (во Vue — variant). */
export function Divider({ orientation = 'horizontal', label = false, labelText = 'или', style = 'solid', className, ...rest }) {
  const cls = cx('emcd-divider', orientation === 'vertical' && 'emcd-divider--vertical', style === 'dotted' && 'emcd-divider--dotted', className);
  if (orientation === 'vertical') return h('span', { role: 'separator', 'aria-orientation': 'vertical', className: cls, ...rest });
  if (label) return h('div', { role: 'separator', className: cx(cls, 'emcd-divider--label'), ...rest }, labelText);
  return h('hr', { className: cls, ...rest });
}

/** Spinner — неизвестная длительность; цвет от родителя. В блоке — с подписью для скринридера. */
export function Spinner({ size = 's', label = 'Загрузка', className, ...rest }) {
  return h('svg', { className: cx('emcd-spinner', size !== 's' && 'emcd-spinner--' + size, className), viewBox: '0 0 24 24', fill: 'none', role: 'status', 'aria-label': label, ...rest },
    h('circle', { cx: 12, cy: 12, r: 9, stroke: 'currentColor', strokeOpacity: 0.2, strokeWidth: 2 }),
    h('path', { d: 'M21 12a9 9 0 0 0-9-9', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
}

/** Skeleton — кирпич загрузки для текста и блоков без своего State=Skeleton (строки списков, факты). shape: text 12 · title 20 (radius/inner) | circle (radius/full) | rect (radius/container).
 *  width / height — по ожидаемому контенту (число — px). Декоративен (aria-hidden): aria-busy — у контейнера. Все скелетоны экрана пульсируют синхронно; reduced motion — статично (patterns 3.11a). */
export function Skeleton({ shape = 'text', width, height, className, style, ...rest }) {
  return h('span', { className: cx('emcd-skeleton', shape !== 'text' && 'emcd-skeleton--' + shape, className), 'aria-hidden': true,
    style: width != null || height != null ? { width, height, ...style } : style, ...rest });
}

/** Progress — доля выполненного. percent 0–100 — ширина fill; value — текст справа («6 000 / 10 000 USDT»). Indeterminate — только Accent. */
export function Progress({ size = 's', tone = 'accent', mode = 'determinate', label, value, percent = 0, showLabel = true, className, ...rest }) {
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
/** Amount — сумма + тикер (неразрывный пробел) + фиат второй строкой. Sign: positive «+» и цвет успеха; negative «−» (U+2212), не красный.
 *  tone (19.11): default | success | danger — цвет суммы и тикера без знака (только sign none; итог дохода в Калькуляторе — success); со знаком не применяется.
 *  skeleton — загрузка: строка значения → плашка высотой строки размера (на всю доступную ширину, не шире предела размера), фиат → короче, если showFiat; sign не применяется. */
export function Amount({ size = 's', sign = 'none', tone = 'default', value, ticker, fiat, showFiat = true, align = 'start', skeleton = false, className, ...rest }) {
  if (skeleton) {
    return h('span', { className: cx('emcd-amount', size !== 's' && 'emcd-amount--' + size, align === 'end' && 'emcd-amount--end', 'emcd-amount--skeleton', className), 'aria-busy': true, ...rest },
      h('span', { className: 'emcd-amount__row' }, h('span', { className: 'emcd-amount__bone', 'aria-hidden': true })),
      showFiat && h('span', { className: 'emcd-amount__bone emcd-amount__bone--fiat', 'aria-hidden': true }));
  }
  let v = value;
  if (typeof v === 'number' || typeof v === 'string') {
    v = String(v).replace(/^[-+−]\s*/, '');
    if (sign === 'positive') v = '+' + v; else if (sign === 'negative') v = MINUS + v;
  }
  return h('span', { className: cx('emcd-amount', size !== 's' && 'emcd-amount--' + size, sign !== 'none' && 'emcd-amount--' + sign, sign === 'none' && tone !== 'default' && 'emcd-amount--tone-' + tone, align === 'end' && 'emcd-amount--end', className), ...rest },
    h('span', { className: 'emcd-amount__row' }, h('span', { className: 'emcd-amount__value' }, v), ticker != null && ' ', ticker != null && h('span', { className: 'emcd-amount__ticker' }, ticker)),
    showFiat && fiat != null && h('span', { className: 'emcd-amount__fiat' }, fiat));
}

/** Card — подложка: Level по вложенности, Radius, Padding, Border. Кликабельная — href (ссылка) или onClick (кнопка) на всю площадь.
 *  ambientLight (19.11) — фоновое пятно light/ambient справа сверху, обрезано радиусом карточки; в стиле Base прозрачное (видно в Expressive). Одна герой-карточка на экран. */
export function Card({ level = 1, radius = 'container', padding = 's', border = true, ambientLight = false, as, href, onClick, children, className, ...rest }) {
  const tag = as ?? (href ? 'a' : onClick ? 'button' : 'div');
  return h(tag, { href, onClick, type: tag === 'button' ? 'button' : undefined,
    className: cx('emcd-card', Number(level) !== 1 && 'emcd-card--level-' + level, radius !== 'container' && 'emcd-card--radius-' + radius, padding !== 's' && 'emcd-card--padding-' + padding, border && 'emcd-card--border', ambientLight && 'emcd-card--ambient', (href || onClick) && 'emcd-card--interactive', className), ...rest }, children);
}

/** Section header — заголовок секции внутри карточки или формы (draft, 19.11): title (заголовок h2–h4, по умолчанию h3), caption — строка body/sm text/secondary, trailing — слот справа (Toggle, Button Text, Badge, Select compact).
 *  size: m — label/lg 16 Medium (секция карточки) · s — label/md 14 Medium (подсекция). Заголовок страницы — не он (Page header); шапка виджета — Card / Chart card. */
export function SectionHeader({ size = 'm', level = 3, title, caption, showCaption, trailing, showTrailing, children, className, ...rest }) {
  const lv = [2, 3, 4].includes(Number(level)) ? Number(level) : 3;
  const withCaption = (showCaption ?? caption != null) && caption != null;
  const tr = trailing ?? children;
  const withTrailing = (showTrailing ?? tr != null) && tr != null;
  return h('div', { className: cx('emcd-section-header', size === 's' && 'emcd-section-header--s', className), ...rest },
    h('div', { className: 'emcd-section-header__text' },
      h('h' + lv, { className: 'emcd-section-header__title' }, title),
      withCaption && h('p', { className: 'emcd-section-header__caption' }, caption)),
    withTrailing && h('div', { className: 'emcd-section-header__trailing' }, tr));
}

/** Page header — шапка страницы (beta, 19.11). size: large — Web, Heading/XL, действия справа (до двух: Secondary M + Primary M);
 *  compact — под Top bar на корневых экранах App / мобильного веба, Heading/LG, действия рядом под заголовком с переносом.
 *  title — заголовок `level` (по умолчанию h1); subtitle — сводка одной строкой (showSubtitle); breadcrumbs — слот, только на вложенных страницах Web
 *  (оборачивается в nav «Хлебные крошки»); actions — слот (showActions); tabs — слот Tabs того же размера, последним (showTabs). Контракт: docs/components/page-header.md */
export function PageHeader({ size = 'large', level = 1, title, subtitle, showSubtitle, breadcrumbs, breadcrumbsLabel = 'Хлебные крошки', actions, showActions, tabs, showTabs, className, ...rest }) {
  const lv = [1, 2, 3].includes(Number(level)) ? Number(level) : 1;
  const on = (show, v) => (show ?? true) && v != null && v !== false;
  return h('header', { className: cx('emcd-page-header', size === 'compact' && 'emcd-page-header--compact', className), ...rest },
    breadcrumbs != null && breadcrumbs !== false && h('nav', { className: 'emcd-page-header__breadcrumbs', 'aria-label': breadcrumbsLabel }, breadcrumbs),
    h('div', { className: 'emcd-page-header__row' },
      h('div', { className: 'emcd-page-header__text' },
        h('h' + lv, { className: 'emcd-page-header__title' }, title),
        on(showSubtitle, subtitle) && h('p', { className: 'emcd-page-header__subtitle' }, subtitle)),
      on(showActions, actions) && h('div', { className: 'emcd-page-header__actions' }, actions)),
    on(showTabs, tabs) && h('div', { className: 'emcd-page-header__tabs' }, tabs));
}

const DELTA_TONE = { success: 'success', danger: 'danger', neutral: 'neutral' };
/** Stat card — один показатель. skeleton — полосы на месте подписи, числа и дельты (дельта — если delta), высота как у Default; тон в загрузке — neutral (решает родитель). tone: neutral | danger | warning | success (плитки статусной сводки); align: start | center (плитки статусов).
 *  delta + deltaValue («+4,2 %») + deltaTone: success рост · danger падение · neutral без изменений. link — Icon button XS с шевроном chevron-right, как в Figma (onLink): Danger — Secondary Danger, иначе Tertiary. */
export function StatCard({ tone = 'neutral', align = 'start', label, value, unit, info = true, infoText, delta = true, deltaValue, deltaTone = 'success', deltaCaption, showFooter = false, footer,
  link = false, linkLabel = 'Открыть список', onLink, ambientLight = false, skeleton = false, className, ...rest }) {
  const cls = cx('emcd-stat', tone !== 'neutral' && 'emcd-stat--' + tone, align === 'center' && 'emcd-stat--center', ambientLight && 'emcd-stat--ambient', skeleton && 'emcd-stat--skeleton', className);
  if (skeleton) {
    return h('div', { className: cls, 'aria-busy': true, ...rest },
      h('div', { className: 'emcd-stat__label-row' }, h('span', { className: 'emcd-stat__bone', style: { width: 96, height: 12 } })),
      h('div', { className: 'emcd-stat__value-row' }, h('span', { className: 'emcd-stat__bone', style: { width: 140, height: 28 } })),
      // строки — как у Default (та же высота): дельта — только при delta, подвал — при showFooter
      delta && h('div', { className: 'emcd-stat__delta-row' }, h('span', { className: 'emcd-stat__bone', style: { width: 112, height: 16 } })),
      showFooter && footer != null && h('div', { className: 'emcd-stat__footer' }, footer));
  }
  return h('div', { className: cls, ...rest },
    h('div', { className: 'emcd-stat__label-row' }, h('span', { className: 'emcd-stat__label' }, label),
      info && infoText && h(Tooltip, { text: infoText }, h('button', { type: 'button', className: 'emcd-stat__info', 'aria-label': 'Что это' }, I.info()))),
    h('div', { className: 'emcd-stat__value-row' }, h('span', { className: 'emcd-stat__value' }, value), unit != null && h('span', { className: 'emcd-stat__unit' }, unit)),
    delta && deltaValue != null && h('div', { className: 'emcd-stat__delta-row' },
      h(Badge, { size: 's', tone: DELTA_TONE[deltaTone] || 'neutral', label: deltaValue }), deltaCaption != null && h('span', { className: 'emcd-stat__caption' }, deltaCaption)),
    showFooter && footer != null && h('div', { className: 'emcd-stat__footer' }, footer),
    link && h(IconButton, { type: tone === 'danger' ? 'secondary' : 'tertiary', tone: tone === 'danger' ? 'danger' : 'default', size: 'xs', label: linkLabel, className: 'emcd-stat__link', icon: h(Icon, { name: 'chevron-right' }), onClick: onLink }));
}

const TIP_ARROW = h('svg', { className: 'emcd-tooltip__arrow', viewBox: '0 0 26 9', 'aria-hidden': true },
  h('path', { className: 'emcd-tooltip__arrow-fill', d: 'M0 -1.5V.5L10.6 7.9Q13 9.6 15.4 7.9L26 .5V-1.5Z' }),
  h('path', { className: 'emcd-tooltip__arrow-edge', d: 'M0 .5L10.6 7.9Q13 9.6 15.4 7.9L26 .5' }));
/** Tooltip — подсказка к элементу на Web. С children — оборачивает триггер (наведение, фокус, Escape скрывает); без children — сам пузырь (макет). */
export function Tooltip({ placement = 'top', tone = 'neutral', arrow = 'center', text, children, open, className, ...rest }) {
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
export function Toast({ layout = 'card', tone = 'info', title, showTitle = true, description, showDescription = true, actions = false, actionLabel = 'Открыть', onAction,
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
export function Suggest({ layout = 'card', tone = 'neutral', title, showTitle = true, description, showDescription = true, showLeading, leading,
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
export function Tab({ size, selected, value, label, children, counter, counterTone = 'neutral', icon, statusDot = false, statusTone = 'success', disabled, skeleton = false, onClick, className, ...rest }) {
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
export function Tabs({ size = 'm', items, value, defaultValue, onChange, label, children, className, ...rest }) {
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
export function Segment({ size, selected, value, tone, label, children, showLabel = true, icon, disabled, onClick, className, ...rest }) {
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
export function Segmented({ size = 's', items, value, defaultValue, onChange, tone = 'neutral', label, block = false, children, className, ...rest }) {
  const kids = React.Children.toArray(children).filter(React.isValidElement);
  const first = items ? (items[0] && (items[0].value ?? 0)) : kids[0] && kids[0].props.value;
  const [cur, set] = useControllable(value, defaultValue ?? first, onChange);
  return h(SegCtx.Provider, { value: { value: cur, tone, select: (v, e) => set(v, e) } },
    h('div', { role: 'radiogroup', 'aria-label': label, className: cx('emcd-segmented', size !== 's' && 'emcd-segmented--' + size, block && 'emcd-segmented--block', className), onKeyDown: (e) => rovingKeys(e, '[role="radio"]'), ...rest },
      items ? items.map((it, i) => h(Segment, { key: it.value ?? i, ...it, value: it.value ?? i })) : children));
}

/** List item — строка списка. content: text-first | description-first | big-value | description-only; showDescription=false — без описания. href / onClick — строка открывает детали (Hover / Pressed). */
/** List item — строка списка. inset=false (19.11) — без боковых полей и мин. высоты: список внутри Card (край текста = край заголовка карточки; M в одну строку — 48). */
export function ListItem({ size = 'l', content = 'text-first', label, description, showDescription = true, value, subvalue, leading, trailing, divider = false, inset = true, disabled = false, href, onClick, as, className, children, ...rest }) {
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
    className: cx('emcd-list-item', size === 'm' && 'emcd-list-item--m', content !== 'text-first' && 'emcd-list-item--' + content, interactive && 'emcd-list-item--interactive', divider && 'emcd-list-item--divider', !inset && 'emcd-list-item--flush', disabled && 'emcd-list-item--disabled', className), ...rest },
  leading != null && h('span', { className: 'emcd-list-item__leading' }, leading),
  h('span', { className: 'emcd-list-item__content' }, ...body, children),
  trailing != null && h('span', { className: 'emcd-list-item__trailing' }, trailing));
}

const TX_TYPE = { withdrawal: [I.arrowUp, 'Вывод'], deposit: [I.arrowDown, 'Пополнение'], reward: [I.lightning, 'Начисление'], exchange: [I.exchange, 'Обмен'] };
const TX_STATUS = { completed: ['success', 'Выполнено'], pending: ['warning', 'В обработке'], failed: ['danger', 'Отклонено'] };
/** Transaction — строка операции; нажимается вся строка (детали). Знак суммы — по Type и Status: «−» вывод, «+» пополнение и начисление; обмен и Failed — без знака.
 *  Completed (19.11) — статус не показываем: справа сумма и фиат «≈ $…» (fiat); Status — только у незавершённых (pending, failed). */
export function Transaction({ type = 'withdrawal', status = 'completed', label, description, value, ticker, fiat, statusLabel, href, onClick, className, ...rest }) {
  const [icon, word] = TX_TYPE[type] || TX_TYPE.withdrawal;
  const [tone, stWord] = TX_STATUS[status] || TX_STATUS.completed;
  const sign = status === 'failed' || type === 'exchange' ? 'none' : type === 'withdrawal' ? 'negative' : 'positive';
  return h(ListItem, { size: 'm', label: label ?? word, description, href, onClick: onClick ?? (href ? undefined : () => {}),
    className: cx('emcd-tx', 'emcd-tx--' + type, 'emcd-tx--' + status, className),
    leading: h('span', { className: 'emcd-tx__icon' }, icon()),
    trailing: status === 'completed' ? h(Amount, { size: 's', sign, value, ticker, fiat, showFiat: fiat != null, align: 'end' })
      : [h(Amount, { key: 'a', size: 's', sign, value, ticker, showFiat: false, align: 'end' }), h(Status, { key: 's', size: 's', tone, label: statusLabel ?? stWord })], ...rest });
}

const MenuCtx = React.createContext({ size: 'm', role: 'menu' });
/** Menu item — пункт меню. tone danger — разрушающее, последним после разделителя. selected — галочка (одиночный выбор); showSelection — глиф Checkbox (множественный). */
export function MenuItem({ size, tone = 'default', label, description, leading, trailing, selected, defaultSelected = false, showSelection = false, disabled, role, onClick, className, children, ...rest }) {
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
export const Menu = React.forwardRef(function Menu({ size = 'm', search = false, searchPlaceholder = 'Поиск', onSearch, items, role = 'menu', label, className, children, id, ...rest }, ref) {
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
export function Select({ size = 'm', labelPosition = 'above', label, hint, error, state = 'default', placeholder = 'Выберите …', options = [], value, defaultValue, onChange, open, defaultOpen = false, onOpenChange,
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
  return h('div', { ref: root, className: cx('emcd-field', size !== 'm' && 'emcd-field--' + size, labelPosition === 'on-border' && label && 'emcd-field--on-border', isError && 'emcd-field--error', state === 'disabled' && 'emcd-field--disabled', state === 'skeleton' && 'emcd-field--skeleton', className), 'aria-hidden': state === 'skeleton' || undefined },
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
export const PasswordField = React.forwardRef(function PasswordField({ label = 'Пароль', placeholder = 'Придумайте пароль', showRequirements = true, requirements = PASSWORD_RULES,
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
// Иконки: имя → { viewBox, body } (обводка currentColor; logo-* — заливка currentColor). Монеты: тикер → { viewBox, body } (цвета Symbols).
const ICONS = {
  "sort": {"viewBox":"0 0 20 20","body":"<path d=\"M10.8333 13.3333L14.1667 16.6667L17.5 13.3333M14.1667 16.6667L14.1667 3.33333M9.16667 6.66666L5.83333 3.33333L2.5 6.66666M5.83333 3.33333L5.83333 16.6667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "sort-line-down": {"viewBox":"0 0 20 20","body":"<path d=\"M9.16667 13.3333L5.83333 16.6667L2.5 13.3333M5.83333 16.6667L5.83334 3.33333M9.16666 3.33333H17.5M9.16666 6.66667H15M9.16666 10H12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "sort-line-up": {"viewBox":"0 0 20 20","body":"<path d=\"M9.16667 6.66666L5.83333 3.33333L2.5 6.66666M5.83333 3.33333L5.83334 16.6667M9.16666 10H12.5M9.16666 13.3333H15M9.16666 16.6667H17.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "filter": {"viewBox":"0 0 20 20","body":"<path d=\"M8.33334 16.6667C8.33326 16.8215 8.37634 16.9733 8.45774 17.1051C8.53914 17.2368 8.65564 17.3433 8.79417 17.4125L10.4608 18.2458C10.5879 18.3093 10.7291 18.3393 10.871 18.3329C11.013 18.3264 11.1509 18.2838 11.2717 18.2091C11.3925 18.1344 11.4922 18.03 11.5614 17.9059C11.6305 17.7818 11.6667 17.6421 11.6667 17.5V11.6667C11.6669 11.2537 11.8204 10.8554 12.0975 10.5492L18.1167 3.89167C18.2246 3.77213 18.2955 3.6239 18.3209 3.4649C18.3463 3.3059 18.3252 3.14294 18.2599 2.99573C18.1947 2.84851 18.0882 2.72335 17.9533 2.63538C17.8185 2.5474 17.661 2.50038 17.5 2.5H2.5C2.33884 2.50006 2.18115 2.54685 2.04604 2.6347C1.91093 2.72255 1.80419 2.84769 1.73876 2.99497C1.67332 3.14225 1.65199 3.30534 1.67736 3.46449C1.70272 3.62364 1.77369 3.77203 1.88167 3.89167L7.9025 10.5492C8.17962 10.8554 8.33315 11.2537 8.33334 11.6667V16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "info": {"viewBox":"0 0 20 20","body":"<path d=\"M10 13.3333V10M10 6.66666H10.0083M18.3334 10C18.3334 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66669 14.6024 1.66669 10C1.66669 5.39762 5.39765 1.66666 10 1.66666C14.6024 1.66666 18.3334 5.39762 18.3334 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-down": {"viewBox":"0 0 20 20","body":"<path d=\"M5 7.5L10 12.5L15 7.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-up": {"viewBox":"0 0 20 20","body":"<path d=\"M15 12.5L10 7.5L5 12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-left": {"viewBox":"0 0 20 20","body":"<path d=\"M12.5 15L7.5 10L12.5 5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chevron-right": {"viewBox":"0 0 20 20","body":"<path d=\"M7.5 15L12.5 10L7.5 5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "arrow-right": {"viewBox":"0 0 20 20","body":"<path d=\"M4.16666 10H15.8333M10 15.8333L15.8333 10L10 4.16667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "arrow-left": {"viewBox":"0 0 20 20","body":"<path d=\"M9.99999 4.16667L4.16666 10L9.99999 15.8333M4.16666 10L15.8333 10\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "arrow-new-tab": {"viewBox":"0 0 20 20","body":"<path d=\"M17.5 7.5V2.5H12.5M17.5 2.5L8.33334 11.6667M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "close": {"viewBox":"0 0 20 20","body":"<path d=\"M15 5L5 15M5 5L15 15\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "check": {"viewBox":"0 0 20 20","body":"<path d=\"M16.6666 5L7.49998 14.1667L3.33331 10\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "plus": {"viewBox":"0 0 20 20","body":"<path d=\"M4.16666 10H15.8333M10 4.16667V15.8333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "minus": {"viewBox":"0 0 20 20","body":"<path d=\"M4.16667 10H15.8333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "menu": {"viewBox":"0 0 20 20","body":"<path d=\"M3.33325 4.16666H16.6666M3.33325 10H16.6666M3.33325 15.8333H16.6666\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "more-horizontal": {"viewBox":"0 0 20 20","body":"<path d=\"M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53977 10.4602 9.16667 10 9.16667C9.53976 9.16667 9.16666 9.53977 9.16666 10C9.16666 10.4602 9.53976 10.8333 10 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.8333 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 10C16.6667 9.53977 16.2936 9.16667 15.8333 9.16667C15.3731 9.16667 15 9.53977 15 10C15 10.4602 15.3731 10.8333 15.8333 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.16667 10.8333C4.62691 10.8333 5 10.4602 5 10C5 9.53977 4.62691 9.16667 4.16667 9.16667C3.70643 9.16667 3.33334 9.53977 3.33334 10C3.33334 10.4602 3.70643 10.8333 4.16667 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "more-vertical": {"viewBox":"0 0 20 20","body":"<path d=\"M10 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 10C10.8333 9.53977 10.4602 9.16667 10 9.16667C9.53977 9.16667 9.16667 9.53977 9.16667 10C9.16667 10.4602 9.53977 10.8333 10 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 4.99999C10.4602 4.99999 10.8333 4.6269 10.8333 4.16666C10.8333 3.70642 10.4602 3.33333 10 3.33333C9.53977 3.33333 9.16667 3.70642 9.16667 4.16666C9.16667 4.6269 9.53977 4.99999 10 4.99999Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 10 15C9.53977 15 9.16667 15.3731 9.16667 15.8333C9.16667 16.2936 9.53977 16.6667 10 16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "dots-grid": {"viewBox":"0 0 20 20","body":"<path d=\"M10 5C10.4603 5 10.8334 4.62691 10.8334 4.16667C10.8334 3.70643 10.4603 3.33334 10 3.33334C9.53978 3.33334 9.16669 3.70643 9.16669 4.16667C9.16669 4.62691 9.53978 5 10 5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.8333 5C16.2936 5 16.6667 4.62691 16.6667 4.16667C16.6667 3.70643 16.2936 3.33334 15.8333 3.33334C15.3731 3.33334 15 3.70643 15 4.16667C15 4.62691 15.3731 5 15.8333 5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.16665 5C4.62688 5 4.99998 4.62691 4.99998 4.16667C4.99998 3.70643 4.62688 3.33334 4.16665 3.33334C3.70641 3.33334 3.33331 3.70643 3.33331 4.16667C3.33331 4.62691 3.70641 5 4.16665 5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 10.8333C10.4603 10.8333 10.8334 10.4602 10.8334 10C10.8334 9.53976 10.4603 9.16666 10 9.16666C9.53978 9.16666 9.16669 9.53976 9.16669 10C9.16669 10.4602 9.53978 10.8333 10 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.8333 10.8333C16.2936 10.8333 16.6667 10.4602 16.6667 10C16.6667 9.53976 16.2936 9.16666 15.8333 9.16666C15.3731 9.16666 15 9.53976 15 10C15 10.4602 15.3731 10.8333 15.8333 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.16665 10.8333C4.62688 10.8333 4.99998 10.4602 4.99998 10C4.99998 9.53976 4.62688 9.16666 4.16665 9.16666C3.70641 9.16666 3.33331 9.53976 3.33331 10C3.33331 10.4602 3.70641 10.8333 4.16665 10.8333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 16.6667C10.4603 16.6667 10.8334 16.2936 10.8334 15.8333C10.8334 15.3731 10.4603 15 10 15C9.53978 15 9.16669 15.3731 9.16669 15.8333C9.16669 16.2936 9.53978 16.6667 10 16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M15.8333 16.6667C16.2936 16.6667 16.6667 16.2936 16.6667 15.8333C16.6667 15.3731 16.2936 15 15.8333 15C15.3731 15 15 15.3731 15 15.8333C15 16.2936 15.3731 16.6667 15.8333 16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M4.16665 16.6667C4.62688 16.6667 4.99998 16.2936 4.99998 15.8333C4.99998 15.3731 4.62688 15 4.16665 15C3.70641 15 3.33331 15.3731 3.33331 15.8333C3.33331 16.2936 3.70641 16.6667 4.16665 16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "search": {"viewBox":"0 0 20 20","body":"<path d=\"M17.5 17.5L13.8834 13.8833M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "calendar": {"viewBox":"0 0 20 20","body":"<path d=\"M6.66669 1.66667V4.16667M13.3333 1.66667V4.16667M2.5 7.5H17.5M4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "list": {"viewBox":"0 0 20 20","body":"<path d=\"M2.5 4.16666H2.50833M2.5 10H2.50833M2.5 15.8333H2.50833M6.66669 4.16666H17.5M6.66669 10H17.5M6.66669 15.8333H17.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "folder": {"viewBox":"0 0 20 20","body":"<path d=\"M16.6667 16.6667C17.1087 16.6667 17.5326 16.4911 17.8452 16.1785C18.1577 15.866 18.3333 15.442 18.3333 15V6.66667C18.3333 6.22464 18.1577 5.80072 17.8452 5.48816C17.5326 5.17559 17.1087 5 16.6667 5H10.0833C9.8046 5.00273 9.52963 4.93551 9.28359 4.80448C9.03755 4.67346 8.82831 4.48281 8.675 4.25L8.00001 3.25C7.84825 3.01956 7.64165 2.8304 7.39875 2.6995C7.15586 2.56859 6.88426 2.50005 6.60834 2.5H3.33334C2.89131 2.5 2.46739 2.67559 2.15483 2.98816C1.84227 3.30072 1.66667 3.72464 1.66667 4.16667V15C1.66667 15.442 1.84227 15.866 2.15483 16.1785C2.46739 16.4911 2.89131 16.6667 3.33334 16.6667H16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "folder-add": {"viewBox":"0 0 20 20","body":"<path d=\"M10 8.33333V13.3333M7.5 10.8333H12.5M16.6667 16.6667C17.1087 16.6667 17.5326 16.4911 17.8452 16.1785C18.1577 15.866 18.3333 15.442 18.3333 15V6.66667C18.3333 6.22464 18.1577 5.80072 17.8452 5.48816C17.5326 5.17559 17.1087 5 16.6667 5H10.0833C9.8046 5.00273 9.52963 4.93551 9.28359 4.80448C9.03755 4.67346 8.82831 4.48281 8.675 4.25L8.00001 3.25C7.84825 3.01956 7.64165 2.8304 7.39875 2.6995C7.15586 2.56859 6.88426 2.50005 6.60834 2.5H3.33334C2.89131 2.5 2.46739 2.67559 2.15483 2.98816C1.84227 3.30072 1.66667 3.72464 1.66667 4.16667V15C1.66667 15.442 1.84227 15.866 2.15483 16.1785C2.46739 16.4911 2.89131 16.6667 3.33334 16.6667H16.6667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "tuning": {"viewBox":"0 0 20 20","body":"<path d=\"M8.33333 4.16667H2.5M10 15.8333H2.5M11.6667 2.5V5.83333M13.3333 14.1667V17.5M17.5 10H10M17.5 15.8333H13.3333M17.5 4.16667H11.6667M6.66669 8.33333V11.6667M6.66667 10H2.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "eye": {"viewBox":"0 0 20 20","body":"<path d=\"M1.71835 9.71C1.6489 9.8971 1.6489 10.1029 1.71835 10.29C2.39476 11.9301 3.54294 13.3325 5.01732 14.3193C6.4917 15.306 8.22588 15.8328 10 15.8328C11.7741 15.8328 13.5083 15.306 14.9827 14.3193C16.4571 13.3325 17.6053 11.9301 18.2817 10.29C18.3511 10.1029 18.3511 9.8971 18.2817 9.71C17.6053 8.06988 16.4571 6.66754 14.9827 5.68075C13.5083 4.69397 11.7741 4.16718 10 4.16718C8.22588 4.16718 6.4917 4.69397 5.01732 5.68075C3.54294 6.66754 2.39476 8.06988 1.71835 9.71Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "eye-off": {"viewBox":"0 0 20 20","body":"<path d=\"M8.94415 4.23C10.8853 3.99867 12.8488 4.40902 14.5349 5.39838C16.2209 6.38774 17.5368 7.90173 18.2817 9.70917C18.3511 9.89627 18.3511 10.1021 18.2817 10.2892C17.9754 11.0317 17.5707 11.7296 17.0783 12.3642M11.7367 11.7983C11.2652 12.2537 10.6336 12.5057 9.97815 12.5C9.32266 12.4943 8.69563 12.2314 8.23211 11.7679C7.76859 11.3044 7.50567 10.6773 7.49997 10.0218C7.49428 9.36635 7.74626 8.73484 8.20166 8.26334M14.5658 14.5825C13.4604 15.2373 12.2271 15.6467 10.9495 15.7828C9.6719 15.919 8.37997 15.7787 7.16137 15.3716C5.94277 14.9644 4.82601 14.2999 3.88686 13.4231C2.94771 12.5463 2.20814 11.4778 1.71835 10.29C1.6489 10.1029 1.6489 9.89709 1.71835 9.71C2.45721 7.91821 3.75724 6.41437 5.42335 5.42416M1.66669 1.66666L18.3334 18.3333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "copy": {"viewBox":"0 0 20 20","body":"<path d=\"M3.33332 13.3333C2.41666 13.3333 1.66666 12.5833 1.66666 11.6667V3.33333C1.66666 2.41666 2.41666 1.66666 3.33332 1.66666H11.6667C12.5833 1.66666 13.3333 2.41666 13.3333 3.33333M8.33332 6.66666H16.6667C17.5871 6.66666 18.3333 7.41286 18.3333 8.33333V16.6667C18.3333 17.5871 17.5871 18.3333 16.6667 18.3333H8.33332C7.41285 18.3333 6.66666 17.5871 6.66666 16.6667V8.33333C6.66666 7.41286 7.41285 6.66666 8.33332 6.66666Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "link": {"viewBox":"0 0 20 20","body":"<path d=\"M8.33331 10.8333C8.69119 11.3118 9.14778 11.7076 9.6721 11.9941C10.1964 12.2806 10.7762 12.4509 11.3722 12.4936C11.9681 12.5363 12.5663 12.4503 13.1261 12.2415C13.6859 12.0327 14.1942 11.7059 14.6166 11.2833L17.1166 8.78333C17.8756 7.99749 18.2956 6.94498 18.2861 5.85249C18.2766 4.76 17.8384 3.71495 17.0659 2.94242C16.2934 2.16989 15.2483 1.73168 14.1558 1.72219C13.0633 1.71269 12.0108 2.13267 11.225 2.89166L9.79165 4.31666M11.6666 9.16667C11.3088 8.68823 10.8522 8.29235 10.3279 8.00588C9.80353 7.71942 9.22373 7.54907 8.62777 7.50639C8.03182 7.46371 7.43366 7.54969 6.87386 7.75851C6.31406 7.96734 5.80572 8.29411 5.38332 8.71667L2.88332 11.2167C2.12432 12.0025 1.70435 13.055 1.71384 14.1475C1.72334 15.24 2.16154 16.285 2.93407 17.0576C3.70661 17.8301 4.75166 18.2683 5.84415 18.2778C6.93663 18.2873 7.98914 17.8673 8.77498 17.1083L10.2 15.6833\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "refresh": {"viewBox":"0 0 20 20","body":"<path d=\"M2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C12.0967 2.50789 14.1092 3.32602 15.6167 4.78333L17.5 6.66667M13.3333 6.66667H17.5L17.5 2.5M17.5 10C17.5 11.9891 16.7098 13.8968 15.3033 15.3033C13.8968 16.7098 11.9891 17.5 10 17.5C7.90329 17.4921 5.89081 16.674 4.38333 15.2167L2.5 13.3333M2.5 17.5V13.3333L6.66667 13.3333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "chart-bar": {"viewBox":"0 0 20 20","body":"<path d=\"M5 15V12M10 15V5M15 15V9\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "file-excel": {"viewBox":"0 0 20 20","body":"<path d=\"M7.76603 8.53198L5.58663 11.4589M5.58585 8.53198L7.76525 11.4589M10.134 6.87167H17.0832M13.3206 3.37253V9.68009C13.3206 10.0751 13.6403 10.3948 14.0353 10.3948H17.0833M6.74531 13.834V14.491C6.74531 15.741 7.53054 16.6304 8.78851 16.6304H15.0462C16.3042 16.6304 17.0814 15.741 17.0814 14.491V5.50899C17.0814 4.25904 16.3042 3.36965 15.0462 3.36965H8.78851C7.53054 3.36965 6.74531 4.25904 6.74531 5.50899V6.16601M4.9534 6.16723H8.5454C9.80093 6.16723 10.5822 7.05341 10.5822 8.30817V11.6927C10.5822 12.9474 9.80093 13.8336 8.5454 13.8336H4.9534C3.69784 13.8336 2.91663 12.9474 2.91663 11.6927V8.30817C2.91663 7.05341 3.70105 6.16723 4.9534 6.16723Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "download": {"viewBox":"0 0 20 20","body":"<path d=\"M10 12.5V2.5M14.1666 8.33334L10 12.5L5.83331 8.33334M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "send": {"viewBox":"0 0 20 20","body":"<path d=\"M9.09462 10.9044C8.93536 10.7454 8.74555 10.6203 8.53665 10.5367L1.92831 7.88666C1.84941 7.855 1.78208 7.79996 1.73536 7.72893C1.68864 7.65791 1.66477 7.57428 1.66695 7.4893C1.66912 7.40431 1.69725 7.32202 1.74754 7.25347C1.79783 7.18493 1.86789 7.13341 1.94831 7.10583L17.7816 1.68916C17.8555 1.66249 17.9354 1.6574 18.012 1.67449C18.0886 1.69158 18.1588 1.73013 18.2143 1.78564C18.2698 1.84116 18.3084 1.91133 18.3255 1.98796C18.3426 2.06458 18.3375 2.14449 18.3108 2.21833L12.8941 18.0517C12.8666 18.1321 12.815 18.2021 12.7465 18.2524C12.678 18.3027 12.5957 18.3309 12.5107 18.333C12.4257 18.3352 12.3421 18.3113 12.271 18.2646C12.2 18.2179 12.145 18.1506 12.1133 18.0717L9.46331 11.4617C9.3793 11.2529 9.25388 11.0633 9.09462 10.9044ZM9.09462 10.9044L18.2116 1.78917\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "question": {"viewBox":"0 0 20 20","body":"<path d=\"M7.57501 7.5C7.77093 6.94306 8.15764 6.47342 8.66664 6.17428C9.17564 5.87513 9.77409 5.76578 10.356 5.86559C10.9379 5.96541 11.4657 6.26794 11.8459 6.71961C12.2261 7.17128 12.4342 7.74294 12.4333 8.33333C12.4333 10 9.93335 10.8333 9.93335 10.8333M10 14.1667H10.0083M18.3334 10C18.3334 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66669 14.6024 1.66669 10C1.66669 5.39763 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3334 5.39763 18.3334 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "lightning": {"viewBox":"0 0 20 20","body":"<path d=\"M13.2617 3.33333C13.356 3.06614 13.3567 2.77483 13.2637 2.50718C13.1707 2.23952 12.9896 2.0114 12.75 1.8602C12.5103 1.709 12.2264 1.6437 11.9448 1.67501C11.6632 1.70631 11.4006 1.83236 11.2 2.0325L3.70002 9.5325C3.52514 9.70727 3.40601 9.92997 3.35771 10.1724C3.3094 10.4149 3.33409 10.6663 3.42864 10.8947C3.52319 11.1232 3.68337 11.3184 3.88891 11.4558C4.09444 11.5932 4.33611 11.6666 4.58335 11.6667H7.91835C7.98492 11.6668 8.05049 11.6828 8.10959 11.7134C8.16868 11.7441 8.21958 11.7884 8.25801 11.8427C8.29644 11.8971 8.3213 11.9599 8.33049 12.0258C8.33969 12.0917 8.33295 12.1589 8.31085 12.2217L6.73835 16.6667C6.64403 16.934 6.64334 17.2254 6.73642 17.4931C6.82949 17.7608 7.01079 17.989 7.25058 18.1401C7.49037 18.2913 7.7744 18.3564 8.05609 18.3249C8.33778 18.2934 8.60039 18.1671 8.80085 17.9667L16.3009 10.4667C16.4755 10.2918 16.5944 10.0691 16.6425 9.82669C16.6906 9.58428 16.6658 9.33305 16.5712 9.10474C16.4765 8.87644 16.3164 8.6813 16.1109 8.544C15.9054 8.4067 15.6638 8.33339 15.4167 8.33333H12.0859C12.0191 8.33343 11.9533 8.31749 11.894 8.28687C11.8348 8.25624 11.7837 8.21183 11.7451 8.15735C11.7066 8.10288 11.6817 8.03994 11.6725 7.97384C11.6634 7.90774 11.6702 7.8404 11.6925 7.7775L13.2617 3.33333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "trend-up": {"viewBox":"0 0 20 20","body":"<path d=\"M18.3333 10.8333V5.83333H13.3333M18.3333 5.83333L11.25 12.9167L7.08335 8.74999L1.66669 14.1667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "settings": {"viewBox":"0 0 20 20","body":"<path d=\"M8.05918 3.44666C8.10509 2.96361 8.32945 2.51503 8.68843 2.18856C9.0474 1.86209 9.5152 1.68118 10.0004 1.68118C10.4857 1.68118 10.9535 1.86209 11.3124 2.18856C11.6714 2.51503 11.8958 2.96361 11.9417 3.44666C11.9693 3.75871 12.0716 4.05951 12.2401 4.32361C12.4086 4.58771 12.6382 4.80733 12.9096 4.96389C13.1809 5.12045 13.486 5.20933 13.7989 5.22301C14.1119 5.23669 14.4235 5.17477 14.7075 5.04249C15.1484 4.84231 15.6481 4.81334 16.1092 4.96123C16.5703 5.10912 16.9599 5.42329 17.2021 5.84258C17.4443 6.26188 17.5219 6.7563 17.4197 7.22964C17.3175 7.70297 17.0428 8.12134 16.6492 8.40333C16.3928 8.5832 16.1836 8.82217 16.0391 9.10001C15.8946 9.37786 15.8192 9.68642 15.8192 9.99958C15.8192 10.3127 15.8946 10.6213 16.0391 10.8991C16.1836 11.177 16.3928 11.416 16.6492 11.5958C17.0428 11.8778 17.3175 12.2962 17.4197 12.7695C17.5219 13.2429 17.4443 13.7373 17.2021 14.1566C16.9599 14.5759 16.5703 14.89 16.1092 15.0379C15.6481 15.1858 15.1484 15.1568 14.7075 14.9567C14.4235 14.8244 14.1119 14.7625 13.7989 14.7761C13.486 14.7898 13.1809 14.8787 12.9096 15.0353C12.6382 15.1918 12.4086 15.4114 12.2401 15.6755C12.0716 15.9396 11.9693 16.2404 11.9417 16.5525C11.8958 17.0355 11.6714 17.4841 11.3124 17.8106C10.9535 18.1371 10.4857 18.318 10.0004 18.318C9.5152 18.318 9.0474 18.1371 8.68843 17.8106C8.32945 17.4841 8.10509 17.0355 8.05918 16.5525C8.03163 16.2403 7.92926 15.9394 7.76073 15.6752C7.5922 15.411 7.36249 15.1913 7.09104 15.0348C6.81959 14.8782 6.5144 14.7893 6.20133 14.7757C5.88825 14.7621 5.57651 14.8242 5.29251 14.9567C4.85158 15.1568 4.35195 15.1858 3.89084 15.0379C3.42974 14.89 3.04015 14.5759 2.79791 14.1566C2.55567 13.7373 2.47811 13.2429 2.58031 12.7695C2.68251 12.2962 2.95718 11.8778 3.35084 11.5958C3.60719 11.416 3.81645 11.177 3.96092 10.8991C4.10538 10.6213 4.1808 10.3127 4.1808 9.99958C4.1808 9.68642 4.10538 9.37786 3.96092 9.10001C3.81645 8.82217 3.60719 8.5832 3.35084 8.40333C2.95773 8.1212 2.68355 7.70299 2.58159 7.22998C2.47964 6.75697 2.55718 6.26294 2.79916 5.84392C3.04114 5.4249 3.43027 5.11081 3.89092 4.96269C4.35157 4.81458 4.85083 4.84302 5.29168 5.04249C5.57564 5.17477 5.8873 5.23669 6.20026 5.22301C6.51322 5.20933 6.81829 5.12045 7.08962 4.96389C7.36096 4.80733 7.59059 4.58771 7.75906 4.32361C7.92754 4.05951 8.02991 3.75871 8.05751 3.44666M12.5 10C12.5 11.3807 11.3807 12.5 10 12.5C8.61929 12.5 7.5 11.3807 7.5 10C7.5 8.61929 8.61929 7.5 10 7.5C11.3807 7.5 12.5 8.61929 12.5 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "user": {"viewBox":"0 0 20 20","body":"<path d=\"M15.8334 17.5V15.8333C15.8334 14.9493 15.4822 14.1014 14.857 13.4763C14.2319 12.8512 13.3841 12.5 12.5 12.5H7.50002C6.61597 12.5 5.76812 12.8512 5.143 13.4763C4.51788 14.1014 4.16669 14.9493 4.16669 15.8333V17.5M13.3334 5.83333C13.3334 7.67428 11.841 9.16667 10 9.16667C8.15907 9.16667 6.66669 7.67428 6.66669 5.83333C6.66669 3.99238 8.15907 2.5 10 2.5C11.841 2.5 13.3334 3.99238 13.3334 5.83333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "users": {"viewBox":"0 0 20 20","body":"<path d=\"M13.3334 17.5V15.8333C13.3334 14.9493 12.9822 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5.00002C4.11597 12.5 3.26812 12.8512 2.643 13.4763C2.01788 14.1014 1.66669 14.9493 1.66669 15.8333V17.5M13.3333 2.60666C14.0481 2.79197 14.6811 3.20938 15.133 3.79338C15.585 4.37738 15.8301 5.0949 15.8301 5.83333C15.8301 6.57175 15.585 7.28928 15.133 7.87327C14.6811 8.45727 14.0481 8.87468 13.3333 9.05999M18.3333 17.5V15.8333C18.3328 15.0948 18.0869 14.3773 17.6345 13.7936C17.182 13.2099 16.5484 12.793 15.8333 12.6083M10.8334 5.83333C10.8334 7.67428 9.34097 9.16667 7.50002 9.16667C5.65907 9.16667 4.16669 7.67428 4.16669 5.83333C4.16669 3.99238 5.65907 2.5 7.50002 2.5C9.34097 2.5 10.8334 3.99238 10.8334 5.83333Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "bell-notifications": {"viewBox":"0 0 20 20","body":"<path d=\"M8.55664 17.5C8.70293 17.7533 8.91332 17.9637 9.16668 18.11C9.42003 18.2563 9.70743 18.3333 9.99997 18.3333C10.2925 18.3333 10.5799 18.2563 10.8333 18.11C11.0866 17.9637 11.297 17.7533 11.4433 17.5M2.71833 12.7717C2.60947 12.891 2.53763 13.0394 2.51155 13.1988C2.48547 13.3582 2.50627 13.5217 2.57142 13.6695C2.63658 13.8173 2.74328 13.943 2.87855 14.0312C3.01381 14.1195 3.17182 14.1665 3.33333 14.1667H16.6667C16.8282 14.1667 16.9862 14.1199 17.1216 14.0318C17.2569 13.9437 17.3637 13.8181 17.4291 13.6704C17.4944 13.5227 17.5154 13.3592 17.4895 13.1998C17.4637 13.0404 17.392 12.892 17.2833 12.7725C16.175 11.63 15 10.4158 15 6.66667C15 5.34059 14.4732 4.06882 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52679 4.06882 5 5.34059 5 6.66667C5 10.4158 3.82417 11.63 2.71833 12.7717Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "calculator": {"viewBox":"0 0 20 20","body":"<path d=\"M6.66669 5H13.3334M13.3333 11.6667V15M13.3333 8.33333H13.3416M10 8.33333H10.0083M6.66669 8.33333H6.67502M10 11.6667H10.0083M6.66669 11.6667H6.67502M10 15H10.0083M6.66669 15H6.67502M4.99998 1.66667H15C15.9205 1.66667 16.6666 2.41286 16.6666 3.33333V16.6667C16.6666 17.5871 15.9205 18.3333 15 18.3333H4.99998C4.07951 18.3333 3.33331 17.5871 3.33331 16.6667V3.33333C3.33331 2.41286 4.07951 1.66667 4.99998 1.66667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "history": {"viewBox":"0 0 20 20","body":"<path d=\"M2.5 10C2.5 11.4834 2.93987 12.9334 3.76398 14.1668C4.58809 15.4001 5.75943 16.3614 7.12987 16.9291C8.50032 17.4968 10.0083 17.6453 11.4632 17.3559C12.918 17.0665 14.2544 16.3522 15.3033 15.3033C16.3522 14.2544 17.0665 12.918 17.3559 11.4632C17.6453 10.0083 17.4968 8.50032 16.9291 7.12987C16.3614 5.75943 15.4001 4.58809 14.1668 3.76398C12.9334 2.93987 11.4834 2.5 10 2.5C7.90329 2.50789 5.89081 3.32602 4.38333 4.78333L2.5 6.66667M6.66667 6.66667H2.5V2.5M10 5.83334V10L13.3333 11.6667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "wallet": {"viewBox":"0 0 20 20","body":"<path d=\"M15.8333 5.83333V3.33333C15.8333 3.11232 15.7455 2.90036 15.5893 2.74408C15.433 2.5878 15.221 2.5 15 2.5H4.16667C3.72464 2.5 3.30072 2.67559 2.98816 2.98816C2.67559 3.30072 2.5 3.72464 2.5 4.16667M15.8333 5.83333H4.16667C3.72464 5.83333 3.30072 5.65774 2.98816 5.34518C2.67559 5.03262 2.5 4.60869 2.5 4.16667M15.8333 5.83333H16.6667C16.8877 5.83333 17.0996 5.92113 17.2559 6.07741C17.4122 6.23369 17.5 6.44565 17.5 6.66667V10M2.5 4.16667V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H16.6667C16.8877 17.5 17.0996 17.4122 17.2559 17.2559C17.4122 17.0996 17.5 16.8877 17.5 16.6667V13.3333M17.5 10H15C14.558 10 14.134 10.1756 13.8215 10.4882C13.5089 10.8007 13.3333 11.2246 13.3333 11.6667C13.3333 12.1087 13.5089 12.5326 13.8215 12.8452C14.134 13.1577 14.558 13.3333 15 13.3333H17.5M17.5 10C17.721 10 17.933 10.0878 18.0893 10.2441C18.2455 10.4004 18.3333 10.6123 18.3333 10.8333V12.5C18.3333 12.721 18.2455 12.933 18.0893 13.0893C17.933 13.2455 17.721 13.3333 17.5 13.3333\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "card": {"viewBox":"0 0 20 20","body":"<path d=\"M1.875 8.125H18.125M5.625 12.5H8.75M4.475 3.125H15.525C16.961 3.125 18.125 4.289 18.125 5.725V14.275C18.125 15.711 16.961 16.875 15.525 16.875H4.475C3.039 16.875 1.875 15.711 1.875 14.275V5.725C1.875 4.289 3.039 3.125 4.475 3.125Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "mining-coin": {"viewBox":"0 0 20 20","body":"<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1688 12.0907L9.99964 6.75388L6.83146 12.0907H13.1688Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/><path d=\"M18.125 10C18.125 5.51236 14.4876 1.875 10 1.875C5.51236 1.875 1.875 5.51236 1.875 10C1.875 14.4876 5.51236 18.125 10 18.125C14.4876 18.125 18.125 14.4876 18.125 10Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "exchange": {"viewBox":"0 0 20 20","body":"<path d=\"M6.66665 9.16667L3.33331 5.83333L6.66665 2.5M3.33331 5.83333L16.6666 5.83334M13.3333 10.8333L16.6666 14.1667L13.3333 17.5M16.6666 14.1667L3.33331 14.1667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "coinhold-coins": {"viewBox":"0 0 20 20","body":"<path d=\"M16.0938 10C16.0938 11.6822 13.3649 13.0469 9.99942 13.0469C6.6339 13.0469 3.90625 11.6822 3.90625 10M16.0938 4.92188V14.9637C16.0938 16.7103 13.3649 18.125 9.99942 18.125C6.6339 18.125 3.90625 16.7103 3.90625 14.9637V4.92188M16.0938 4.92188C16.0938 6.60403 13.3649 7.96875 9.99942 7.96875C6.6339 7.96875 3.90625 6.60403 3.90625 4.92188M16.0938 4.92188C16.0938 3.23973 13.3649 1.875 9.99942 1.875C6.6339 1.875 3.90625 3.23973 3.90625 4.92188\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "percentage": {"viewBox":"0 0 20 20","body":"<path d=\"M15.8333 4.16667L4.16667 15.8333M7.49999 5.41666C7.49999 6.56725 6.56725 7.49999 5.41666 7.49999C4.26607 7.49999 3.33333 6.56725 3.33333 5.41666C3.33333 4.26607 4.26607 3.33333 5.41666 3.33333C6.56725 3.33333 7.49999 4.26607 7.49999 5.41666ZM16.6667 14.5833C16.6667 15.7339 15.7339 16.6667 14.5833 16.6667C13.4327 16.6667 12.5 15.7339 12.5 14.5833C12.5 13.4327 13.4327 12.5 14.5833 12.5C15.7339 12.5 16.6667 13.4327 16.6667 14.5833Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "suitcase": {"viewBox":"0 0 20 20","body":"<path d=\"M13.3334 16.6667V3.33334C13.3334 2.89131 13.1578 2.46739 12.8452 2.15483C12.5326 1.84227 12.1087 1.66667 11.6667 1.66667H8.33335C7.89133 1.66667 7.4674 1.84227 7.15484 2.15483C6.84228 2.46739 6.66669 2.89131 6.66669 3.33334V16.6667M3.33335 5H16.6667C17.5872 5 18.3334 5.74619 18.3334 6.66667V15C18.3334 15.9205 17.5872 16.6667 16.6667 16.6667H3.33335C2.41288 16.6667 1.66669 15.9205 1.66669 15V6.66667C1.66669 5.74619 2.41288 5 3.33335 5Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "lock": {"viewBox":"0 0 20 20","body":"<path d=\"M5.83331 9.16666V5.83333C5.83331 4.72826 6.2723 3.66845 7.0537 2.88705C7.8351 2.10565 8.89491 1.66666 9.99998 1.66666C11.105 1.66666 12.1649 2.10565 12.9463 2.88705C13.7277 3.66845 14.1666 4.72826 14.1666 5.83333V9.16666M4.16667 9.16667H15.8333C16.7538 9.16667 17.5 9.91286 17.5 10.8333V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V10.8333C2.5 9.91286 3.24619 9.16667 4.16667 9.16667Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "web": {"viewBox":"0 0 20 20","body":"<path d=\"M18.3334 10C18.3334 14.6024 14.6024 18.3333 10 18.3333M18.3334 10C18.3334 5.39763 14.6024 1.66667 10 1.66667M18.3334 10H1.66669M10 18.3333C5.39765 18.3333 1.66669 14.6024 1.66669 10M10 18.3333C7.86022 16.0865 6.66669 13.1027 6.66669 10C6.66669 6.89729 7.86022 3.91347 10 1.66667M10 18.3333C12.1398 16.0865 13.3334 13.1027 13.3334 10C13.3334 6.89729 12.1398 3.91347 10 1.66667M1.66669 10C1.66669 5.39763 5.39765 1.66667 10 1.66667\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "gift": {"viewBox":"0 0 20 20","body":"<path d=\"M10 5.83334V17.5M10 5.83334C9.69856 4.59117 9.17953 3.52922 8.5106 2.78597C7.84168 2.04272 7.05389 1.65266 6.24999 1.66667C5.69746 1.66667 5.16755 1.88616 4.77685 2.27686C4.38615 2.66756 4.16666 3.19747 4.16666 3.75C4.16666 4.30254 4.38615 4.83244 4.77685 5.22314C5.16755 5.61384 5.69746 5.83334 6.24999 5.83334M10 5.83334C10.3014 4.59117 10.8205 3.52922 11.4894 2.78597C12.1583 2.04272 12.9461 1.65266 13.75 1.66667C14.3025 1.66667 14.8324 1.88616 15.2231 2.27686C15.6138 2.66756 15.8333 3.19747 15.8333 3.75C15.8333 4.30254 15.6138 4.83244 15.2231 5.22314C14.8324 5.61384 14.3025 5.83334 13.75 5.83334M16.6667 9.16667V15.8333C16.6667 16.2754 16.4911 16.6993 16.1785 17.0118C15.866 17.3244 15.442 17.5 15 17.5H5.00001C4.55798 17.5 4.13406 17.3244 3.8215 17.0118C3.50894 16.6993 3.33334 16.2754 3.33334 15.8333V9.16667M16.6667 9.16667C17.1269 9.16667 17.5 8.79357 17.5 8.33334V6.66667C17.5 6.20643 17.1269 5.83334 16.6667 5.83334H3.33333C2.8731 5.83334 2.5 6.20643 2.5 6.66667V8.33334C2.5 8.79357 2.87311 9.16667 3.33334 9.16667M16.6667 9.16667H3.33334\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "rocket": {"viewBox":"0 0 20 20","body":"<path d=\"M10 12.5V16.6667C10 16.6667 12.525 16.2083 13.3333 15C14.2333 13.65 13.3333 10.8333 13.3333 10.8333M10 12.5C11.1639 12.057 12.2806 11.4987 13.3333 10.8333M10 12.5L7.5 10M7.5 10C7.94345 8.84952 8.50184 7.74672 9.16667 6.70833C10.1377 5.15582 11.4897 3.87754 13.0942 2.99507C14.6986 2.11261 16.5022 1.65531 18.3333 1.66666C18.3333 3.93333 17.6833 7.91666 13.3333 10.8333M7.5 10L3.33331 10C3.33331 10 3.79165 7.475 4.99998 6.66667C6.34998 5.76667 9.16667 6.70833 9.16667 6.70833M3.74998 13.75C2.49998 14.8 2.08331 17.9167 2.08331 17.9167C2.08331 17.9167 5.19998 17.5 6.24998 16.25C6.84165 15.55 6.83331 14.475 6.17498 13.825C5.85107 13.5158 5.42439 13.3372 4.97683 13.3233C4.52928 13.3095 4.09238 13.4614 3.74998 13.75Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" vector-effect=\"non-scaling-stroke\"/>"},
  "logo-emcd": {"viewBox":"0 0 24 24","body":"<path d=\"M16.7539 21.1553H1.72949L2.99707 17.2539H18.0264L16.7539 21.1553Z\" fill=\"currentColor\"/><path d=\"M21.7344 5.74707H11.5557L10.2549 9.55664H16.8281L15.5059 13.458H8.92285L8.92188 13.4609H4.20215L7.97559 1.8457H23L21.7344 5.74707Z\" fill=\"currentColor\"/>"},
};
const COINS = {
  "btc": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#FF8724\"/><path d=\"M16.8061 8.3457L16.2739 10.5771C16.6294 10.662 16.9871 10.7481 17.3354 10.8389L17.8637 8.62109L19.1889 8.9668L18.6469 11.2441C20.3201 11.8471 21.5436 12.7515 21.3032 14.4326C21.1291 15.6631 20.4766 16.2589 19.6108 16.4678C20.7998 17.1153 21.4049 18.1086 20.8286 19.8301C20.1132 21.9678 18.4135 22.1485 16.1538 21.7012L15.6059 24L14.2807 23.6543L14.8217 21.3857C14.4784 21.2966 14.1275 21.2022 13.7661 21.0996L13.2221 23.3789L11.8989 23.0332L12.4467 20.7295C12.1374 20.6466 11.8231 20.5587 11.5024 20.4746L9.77778 20.0244L10.436 18.4375C10.4503 18.4415 11.412 18.7094 11.3989 18.6895C11.7739 18.7865 11.9406 18.5309 12.0063 18.3604L12.8725 14.7256C12.9212 14.7378 12.969 14.7503 13.0131 14.7617C12.9604 14.7397 12.9124 14.7257 12.8754 14.7158L13.4936 12.1211C13.5098 11.8267 13.4126 11.4557 12.8764 11.3154C12.8944 11.3003 11.9168 11.0652 11.9135 11.0645L12.2661 9.58398L14.0932 10.0615L14.0922 10.0684C14.3669 10.1398 14.6497 10.2077 14.9379 10.2764L15.4819 8L16.8061 8.3457ZM14.2221 19.0889C15.1908 19.3251 18.179 20.2671 18.6206 18.5244C19.0813 16.7076 15.9762 16.2374 15.0073 16L14.2221 19.0889ZM15.1108 15.5752C15.8773 15.7958 18.2406 16.6962 18.6235 14.9248C19.0221 13.0773 16.5545 12.665 15.7875 12.4443L15.1108 15.5752Z\" fill=\"white\"/>"},
  "kas": {"viewBox":"0 0 32 32","body":"<path d=\"M32.0002 15.84C32.0002 17.9802 31.1183 20.041 30.3439 21.9136C29.5426 23.84 28.3663 25.6333 26.9237 27.0771C25.4799 28.5222 23.716 29.7792 21.7922 30.5818C19.9208 31.3574 17.837 32 15.6994 32C13.5618 32 11.4229 31.465 9.55285 30.6893C7.62901 29.8867 6.31957 28.1472 4.84885 26.7021C3.40501 25.2582 1.77429 23.8925 0.973006 21.9405C0.198606 20.0678 0.0373263 17.9802 0.0373263 15.84C0.0373263 13.6998 -0.203314 11.4253 0.545486 9.55264C1.34677 7.62624 3.03125 6.07488 4.50069 4.62976C5.94325 3.18464 7.57397 1.65888 9.49781 0.85632C11.3692 0.08064 13.5605 0 15.6981 0C17.8357 0 19.9208 0.37504 21.7653 1.15072C23.6892 1.95328 25.5605 3.05024 27.0031 4.49536C28.4469 5.94048 29.7295 7.73248 30.5039 9.65888C31.2783 11.5584 32.0002 13.6986 32.0002 15.84Z\" fill=\"#1EBD9E\"/><path d=\"M20.1615 6.71616L16.7669 7.22432L17.7563 13.8061L10.6472 8.32128L8.56209 11.0502L14.7893 15.84L8.56209 20.6554L10.6472 23.3843L17.7563 17.8995L16.7669 24.4813L20.1615 24.9894L21.5246 15.84L20.1615 6.71616Z\" fill=\"white\"/>"},
  "ltc": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#9B9AA9\"/><path d=\"M16.1001 16.9416L18.4635 16.0427L19.0514 13.7429L19.0313 13.6859L16.7049 14.5707L18.3811 8H13.6272L11.4351 16.5749L9.60477 17.271L9 19.6419L10.8289 18.9464L9.5369 24H22.1889L23 20.8548H15.1018L16.1001 16.9416Z\" fill=\"white\"/>"},
  "doge": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#C2A633\"/><path d=\"M18.3555 7.11111C19.0968 7.11111 19.7459 7.3056 20.3945 7.5574C21.7034 8.0496 22.8505 8.81644 23.7656 9.89236C24.5765 10.8539 25.1323 11.9651 25.4219 13.1785C25.9083 15.2846 25.9204 17.4136 25.3066 19.4969C24.4958 22.2099 22.7574 24.0762 19.873 24.7058C19.3751 24.8203 18.8424 24.8884 18.3213 24.8885H8.40527C8.27792 24.877 8.15051 24.8777 8 24.8777V20.6873H10.4785V11.1404H8.01172V7.12283H8.37109C11.7069 7.12283 15.0196 7.134 18.3555 7.11111ZM17.7305 11.1746C17.0354 11.0487 16.2822 11.1404 15.5293 11.1404V20.6765C16.0967 20.6765 16.6413 20.7106 17.1855 20.6648C17.8921 20.5961 18.53 20.3789 19.0049 19.7722C19.4103 19.2571 19.7696 18.7413 19.9434 18.1345C20.3254 16.8068 20.1746 15.4561 19.9082 14.117C19.7576 13.3157 19.3749 12.5831 18.8652 11.9763C18.5641 11.633 18.1474 11.2433 17.7305 11.1746Z\" fill=\"white\"/>"},
  "eth": {"viewBox":"0 0 32 32","body":"<path d=\"M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z\" fill=\"#4664F5\"/><path d=\"M16.0715 25.7396V20.3529L22.5422 16.4642L16.0715 25.7396ZM16.0715 19.2464L9.59982 15.5765L16.0715 12.7533V19.2464ZM22.5422 15.5365L16.0715 12.7396V5.33333L22.5422 15.5365Z\" fill=\"white\" fill-opacity=\"0.602\"/><path d=\"M16.0715 20.3519V25.7396L9.59982 16.4642L16.0715 20.3519ZM16.0705 12.7396L9.59982 15.5365L16.0705 5.33333V12.7396Z\" fill=\"white\"/><path d=\"M16.0714 19.2464L22.5425 15.5764L16.0714 12.7537V19.2464Z\" fill=\"white\" fill-opacity=\"0.2\"/>"},
  "usdt": {"viewBox":"0 0 32 32","body":"<path d=\"M16 0C24.8374 0 32 7.16407 32 16C32 24.8374 24.8374 32 16 32C7.16407 32 0 24.8366 0 16C0 7.16407 7.16407 0 16 0Z\" fill=\"#009393\"/><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.05084 7H23.2291C23.5673 7 23.8799 7.17803 24.0486 7.46686L28.1794 14.5383C28.3935 14.905 28.3299 15.3679 28.0244 15.6652L16.6545 26.7312C16.2862 27.0896 15.6937 27.0896 15.3254 26.7312L3.97091 15.6802C3.65827 15.3759 3.59972 14.8995 3.82963 14.5305L8.24501 7.44417C8.41697 7.16819 8.72212 7 9.05084 7ZM21.3984 10.1571V12.1413H17.3596V13.5169C20.1962 13.6639 22.3243 14.2677 22.3401 14.9914L22.34 16.5001C22.3243 17.2239 20.1962 17.8276 17.3596 17.9746V21.3507H14.6778V17.9746C11.8412 17.8276 9.71301 17.2239 9.69722 16.5001L9.69733 14.9914C9.7131 14.2677 11.8412 13.6639 14.6778 13.5169V12.1413H10.639V10.1571H21.3984ZM16.0187 16.9382C19.0458 16.9382 21.576 16.4276 22.1952 15.7458C21.6701 15.1676 19.7708 14.7126 17.3596 14.5876V16.0279C16.9274 16.0503 16.4788 16.0621 16.0187 16.0621C15.5586 16.0621 15.1099 16.0503 14.6778 16.0279V14.5876C12.2665 14.7126 10.3673 15.1676 9.84217 15.7458C10.4614 16.4276 12.9915 16.9382 16.0187 16.9382Z\" fill=\"white\"/>"},
};
// @icons:end

/** Icon — иконка DS по имени (`icons/svg/<name>.svg`, реестр — scripts/icons-code.mjs). size: sm 16 · md 20 · lg 24 · xl 32 (`icon/size/*`); цвет — currentColor.
 *  label — смысловая иконка (role=img + aria-label); без label — декоративная (aria-hidden). Имени нет в реестре — пустой квадрат того же размера. */
export function Icon({ name, size = 'md', label, className, ...rest }) {
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
export function Coin({ coin = 'btc', size = 'xs', network = false, networkCoin = 'usdt', skeleton = false, label, className, ...rest }) {
  return h('span', { className: cx('emcd-coin', size !== 'xs' && 'emcd-coin--' + size, skeleton && 'emcd-coin--skeleton', className), 'data-coin': coinKey(coin),
    role: label && !skeleton ? 'img' : undefined, 'aria-label': skeleton ? undefined : label, 'aria-hidden': label && !skeleton ? undefined : true, ...rest },
  !skeleton && h(CoinGlyph, { coin }),
  !skeleton && network && size !== 'xs' && h('span', { className: 'emcd-coin__network' }, h(CoinGlyph, { coin: networkCoin })));
}

const STACK_COIN = { s: 'm', m: 'l', l: 'xl' };
/** Coin stack — монеты внахлёст. coins — тикеры по значимости; size: s (монеты 24) · m (32) · l (40); count — сколько показать (2–4, по умолчанию все до 4).
 *  showMore + more — кружок «+N» со скрытыми (по умолчанию — когда монет больше count). Декоративна: список монет — текстом рядом (или label). */
export function CoinStack({ coins = [], size = 's', count, showMore, more, label, className, ...rest }) {
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
export function NavItem({ label, children, icon: ic = 'dots-grid', href, selected = false, collapsed = false, counter = false, badge = false, badgeLabel, badgeTone = 'neutral',
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
 *  emphasis: default | total (итог: одна, последней, линия сверху, Medium) | muted (второстепенная); leader — точечная линия от названия к значению.
 *  skeleton — загрузка: название остаётся, значение — плашка высотой строки. */
export function KeyValueRow({ emphasis = 'default', leader = false, label, value, children, skeleton = false, className, ...rest }) {
  return h('div', { className: cx('emcd-kv', emphasis !== 'default' && 'emcd-kv--' + emphasis, leader && 'emcd-kv--leader', skeleton && 'emcd-kv--skeleton', className), 'aria-busy': skeleton || undefined, ...rest },
    h('dt', { className: 'emcd-kv__key' }, h('span', { className: 'emcd-kv__key-text' }, label)),
    h('dd', { className: 'emcd-kv__value' }, skeleton ? h('span', { className: 'emcd-kv__bone', 'aria-hidden': true }) : value ?? children));
}

/** Search — поле поиска (лупа, текст, крестик «Очистить», когда введено). size: s 32 · m 40. text / placeholder — подсказка. Esc очищает.
 *  Без value — неуправляемое; onChange(value, event). Draft-набор: правила — по Input. */
export const Search = React.forwardRef(function Search({ size = 'm', text, placeholder, value, defaultValue = '', onChange, onClear, clearLabel = 'Очистить', label, disabled = false, className, ...inputProps }, ref) {
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
export function SelectCompact({ text, label = 'Значение', options, value, defaultValue, onChange, open, defaultOpen = false, onOpenChange, leading, showLeading = true,
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

// ───────── Даты (Calendar, Date range panel, Date range field): строки ISO «ГГГГ-ММ-ДД», арифметика в UTC — без часовых поясов; на входе — ISO или Date
const pad2 = (v) => String(v).padStart(2, '0');
const toISO = (d) => (d == null || d === '' ? null : typeof d === 'string' ? d.slice(0, 10) : `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`);
const isoUTC = (s) => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); };
const fromUTC = (t) => { const d = new Date(t); return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`; };
const addDays = (s, n) => fromUTC(isoUTC(s) + n * 864e5);
const addMonths = (s, n) => {
  const [y, m, d] = s.split('-').map(Number); const t = new Date(Date.UTC(y, m - 1 + n, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return fromUTC(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), Math.min(d, last)));
};
const monthStart = (s) => s.slice(0, 8) + '01';
const weekday = (s) => new Date(isoUTC(s)).getUTCDay(); // 0 — воскресенье
const fmtDay = (s, locale, opt) => new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...opt }).format(new Date(isoUTC(s)));
const capital = (t) => t.charAt(0).toUpperCase() + t.slice(1);
// Первый день недели по локали (CLDR, Intl.Locale weekInfo): ru — понедельник; нет данных — понедельник, кроме en-US / he / ja / pt-BR
function weekStartOf(locale) {
  try { const l = new Intl.Locale(locale); const w = (typeof l.getWeekInfo === 'function' && l.getWeekInfo()) || l.weekInfo; if (w && w.firstDay) return w.firstDay % 7; } catch (e) { /* старый движок */ }
  return /^(en-US|he|ja|pt-BR)/.test(locale) ? 0 : 1;
}
const fullDate = (s, locale) => fmtDay(s, locale, { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s*г\.$/, '');
const shortDate = (s, locale) => fmtDay(s, locale, { day: '2-digit', month: '2-digit', year: '2-digit' });
const normRange = (r) => (r ? { from: toISO(r.from), to: toISO(r.to) } : { from: null, to: null });

/** Date cell — ячейка дня в Calendar (вне Calendar не используется): число и одно смысловое состояние.
 *  state: default | today (обводка `border/accent`) | selected | range-start | range-middle | range-end | outside (соседний месяц); disabled — недоступен (зачёркнут, не нажимается).
 *  Hover / Pressed / Focus — из платформы. label — полная дата для озвучки («14 октября 2026»). */
export const DateCell = React.forwardRef(function DateCell({ day, children, state = 'default', disabled = false, label, onClick, className, ...rest }, ref) {
  return h('button', { ref, type: 'button', className: cx('emcd-date-cell', state !== 'default' && 'emcd-date-cell--' + state, disabled && 'emcd-date-cell--disabled', className),
    'aria-label': label, 'aria-disabled': disabled || undefined, 'aria-current': state === 'today' ? 'date' : undefined,
    onClick: disabled ? undefined : onClick, ...rest }, day ?? children);
});

/** Calendar — выбор даты (mode single) или периода (mode range): шапка «Месяц ГГГГ» + стрелки, дни недели по локали (ru — с понедельника), сетка 6 × 7 из Date cell.
 *  value: single — ISO «ГГГГ-ММ-ДД» (или Date); range — { from, to }. Без value — неуправляемый (defaultValue). onChange(value) — выбрана дата или обе даты периода
 *  (Range: первый выбор — начало, второй — конец; раньше начала — меняются местами). month / defaultMonth / onMonthChange — показанный месяц (ISO).
 *  today — «сегодня» (обводка, aria-current=date); min / max / isDateDisabled(iso) — недоступные даты. Клавиатура (role=grid): стрелки — дни, PageUp / PageDown — месяцы
 *  (+ Shift — годы), Home / End — неделя, Enter / Space — выбрать, Esc — onEscape. RTL: сетка справа налево, стрелки листания отражены. plain — без своей подложки (внутри панели). */
export function Calendar({ mode = 'single', value, defaultValue, onChange, month, defaultMonth, onMonthChange, today, min, max, isDateDisabled, locale = 'ru', weekStart,
  prevLabel = 'Предыдущий месяц', nextLabel = 'Следующий месяц', selectedLabel = 'выбрано', onEscape, plain = false, label, className, ...rest }) {
  const range = mode === 'range';
  const [raw, setVal] = useControllable(value, defaultValue ?? (range ? { from: null, to: null } : null), onChange);
  const val = range ? normRange(raw) : toISO(raw);
  const t = toISO(today ?? new Date());
  const lo = toISO(min); const hi = toISO(max);
  const off = (d) => (lo && d < lo) || (hi && d > hi) || (isDateDisabled ? !!isDateDisabled(d) : false);
  const [view, setView] = useControllable(month == null ? undefined : monthStart(toISO(month)), monthStart((range ? val.to || val.from : val) || t), onMonthChange);
  const [anchor, setAnchor] = React.useState(null); // Range: выбрано начало, ждём конец
  const [hover, setHover] = React.useState(null);
  const [focus, setFocus] = React.useState(null);
  const grid = React.useRef(null); const moveFocus = React.useRef(false);
  const ws = weekStart ?? weekStartOf(locale);
  const first = monthStart(view);
  const start = addDays(first, -((weekday(first) - ws + 7) % 7));
  const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
  const inView = (d) => d && d.slice(0, 7) === first.slice(0, 7);
  // диапазон для показа: черновик (начало + наведение) или выбранный
  let a = range ? (anchor || val.from) : null; let b = range ? (anchor ? (hover && hover !== anchor ? hover : null) : val.to) : null;
  if (a && b && b < a) [a, b] = [b, a];
  const stateOf = (d) => {
    if (range) {
      if (a && d === a) return b && b !== a ? 'range-start' : 'selected';
      if (b && d === b) return 'range-end';
      if (a && b && d > a && d < b) return 'range-middle';
    } else if (d === val) return 'selected';
    if (!inView(d)) return 'outside';
    return d === t ? 'today' : 'default';
  };
  const tab = [focus, range ? anchor || val.from : val, t].find(inView) || first;
  const go = (m) => setView(monthStart(m));
  const select = (d) => {
    if (off(d)) return;
    setFocus(d); if (!inView(d)) go(d);
    if (!range) { setVal(d); return; }
    if (!anchor) { setAnchor(d); return; }
    const [from, to] = d < anchor ? [d, anchor] : [anchor, d];
    setAnchor(null); setHover(null); setVal({ from, to });
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape') { if (onEscape) onEscape(e); return; }
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const f = tab; const dow = (weekday(f) - ws + 7) % 7;
    const next = { ArrowLeft: addDays(f, rtl ? 1 : -1), ArrowRight: addDays(f, rtl ? -1 : 1), ArrowUp: addDays(f, -7), ArrowDown: addDays(f, 7),
      PageUp: addMonths(f, e.shiftKey ? -12 : -1), PageDown: addMonths(f, e.shiftKey ? 12 : 1), Home: addDays(f, -dow), End: addDays(f, 6 - dow) }[e.key];
    if (!next) return;
    e.preventDefault(); moveFocus.current = true; setFocus(next); if (!inView(next)) go(next);
    if (anchor) setHover(next);
  };
  React.useEffect(() => {
    if (!moveFocus.current || !grid.current) return;
    moveFocus.current = false; const el = grid.current.querySelector(`[data-date="${tab}"]`); if (el) el.focus();
  });
  const names = Array.from({ length: 7 }, (_, i) => capital(fmtDay(addDays('2024-01-07', (ws + i) % 7), locale, { weekday: 'short' })));
  const title = `${capital(fmtDay(first, locale, { month: 'long' }))} ${first.slice(0, 4)}`;
  return h('div', { className: cx('emcd-calendar', plain && 'emcd-calendar--plain', className), ...rest },
    h('div', { className: 'emcd-calendar__head' },
      h(IconButton, { size: 's', type: 'tertiary', label: prevLabel, className: 'emcd-calendar__nav', icon: h(Icon, { name: 'chevron-left' }), onClick: () => go(addMonths(first, -1)) }),
      h('span', { className: 'emcd-calendar__month', 'aria-live': 'polite' }, title),
      h(IconButton, { size: 's', type: 'tertiary', label: nextLabel, className: 'emcd-calendar__nav', icon: h(Icon, { name: 'chevron-right' }), onClick: () => go(addMonths(first, 1)) })),
    h('div', { ref: grid, role: 'grid', 'aria-label': label ?? title, 'aria-multiselectable': range || undefined, className: 'emcd-calendar__grid', onKeyDown, onMouseLeave: () => setHover(null) },
      h('div', { role: 'row', className: 'emcd-calendar__row emcd-calendar__weekdays' }, names.map((nm, i) => h('span', { key: i, role: 'columnheader', className: 'emcd-calendar__weekday' }, nm))),
      Array.from({ length: 6 }, (_, w) => h('div', { key: w, role: 'row', className: 'emcd-calendar__row' }, days.slice(w * 7, w * 7 + 7).map((d) => {
        const st = stateOf(d); const sel = st === 'selected' || st === 'range-start' || st === 'range-end';
        return h('div', { key: d, role: 'gridcell', 'aria-selected': sel || undefined, className: 'emcd-calendar__cell' },
          h(DateCell, { day: Number(d.slice(8)), state: st, disabled: off(d), 'data-date': d, tabIndex: d === tab ? 0 : -1,
            label: fullDate(d, locale) + (sel ? `, ${selectedLabel}` : ''), 'aria-current': d === t ? 'date' : undefined,
            onClick: () => select(d), onMouseEnter: anchor ? () => setHover(d) : undefined, onFocus: () => { if (d !== focus) setFocus(d); } }));
      })))));
}

const DATE_PRESETS = [{ value: 'today', label: 'Сегодня', days: 1 }, { value: '7d', label: '7 дней', days: 7 }, { value: '30d', label: '30 дней', days: 30 },
  { value: 'quarter', label: 'Квартал', months: 3 }, { value: 'year', label: 'Год', months: 12 }, { value: 'custom', label: 'Свой период' }];
// Пресет → диапазон до «сегодня» включительно: days — N дней, months — N месяцев; range(today) — свой расчёт; «Свой период» — ручной выбор (null)
const presetRange = (p, t) => (p.range ? normRange(p.range(t)) : p.days ? { from: addDays(t, 1 - p.days), to: t } : p.months ? { from: addDays(addMonths(t, -p.months), 1), to: t } : null);

/** Date range panel — панель выбора периода: слева пресеты (Menu item, выбранный с галочкой; presets=false — без них, мобильный в Sheet), справа Calendar Mode=Range, внизу «Сбросить» и «Применить».
 *  value / defaultValue / onChange({ from, to }) — период в календаре (черновик); preset / defaultPreset / onPresetChange — выбранный пресет; presetItems — [{ value, label, days | months | range(today) }].
 *  onApply({ from, to }) — «Применить» (Web — только по кнопке; applyOnSelect — сразу по второй дате, по умолчанию при presets=false); onReset — «Сбросить» (showReset); onClose — Esc.
 *  role=dialog «Период»; пресеты — listbox (↑ / ↓); календарь — grid. today / min / max / isDateDisabled / locale — как у Calendar. RTL: пресеты справа, кнопки меняются местами. */
export function DateRangePanel({ presets = true, presetItems = DATE_PRESETS, preset, defaultPreset, onPresetChange, value, defaultValue, onChange, onApply, onReset, onClose, showReset = true,
  applyOnSelect, resetLabel = 'Сбросить', applyLabel = 'Применить', label = 'Период', presetsLabel = 'Быстрый выбор', today, min, max, isDateDisabled, locale = 'ru', weekStart, className, ...rest }) {
  const id = useId();
  const t = toISO(today ?? new Date());
  const [raw, setRange] = useControllable(value, defaultValue ?? { from: null, to: null }, onChange);
  const r = normRange(raw);
  const match = (x) => { const p = presetItems.find((q) => { const pr = presetRange(q, t); return pr && x.from && pr.from === x.from && pr.to === x.to; }); return p ? p.value : x.from ? 'custom' : undefined; };
  const [pre, setPre] = useControllable(preset, defaultPreset ?? match(r), onPresetChange);
  const [view, setView] = React.useState(() => monthStart(r.to || r.from || t));
  const instant = applyOnSelect ?? !presets;
  const choose = (p) => { setPre(p.value); const pr = presetRange(p, t); if (pr) { setRange(pr); setView(monthStart(pr.to)); } };
  const listKeys = (e) => {
    const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
    if (!d) return;
    e.preventDefault(); const i = presetItems.findIndex((p) => p.value === pre);
    choose(presetItems[i < 0 ? (d > 0 ? 0 : presetItems.length - 1) : (i + d + presetItems.length) % presetItems.length]);
  };
  const done = !!(r.from && r.to);
  return h('div', { role: 'dialog', 'aria-label': label, className: cx('emcd-date-panel', !presets && 'emcd-date-panel--compact', className),
    onKeyDown: (e) => { if (e.key === 'Escape' && onClose) { e.stopPropagation(); onClose(e); } }, ...rest },
  presets && h(MenuCtx.Provider, { value: { size: 'm', role: 'listbox' } },
    h('div', { role: 'listbox', 'aria-label': presetsLabel, tabIndex: 0, className: 'emcd-date-panel__presets', 'aria-activedescendant': pre != null ? `${id}-p-${pre}` : undefined, onKeyDown: listKeys },
      presetItems.map((p) => h(MenuItem, { key: p.value, id: `${id}-p-${p.value}`, label: p.label, selected: p.value === pre, onClick: () => choose(p) })))),
  h('div', { className: 'emcd-date-panel__column' },
    h(Calendar, { mode: 'range', plain: true, value: r, onChange: (x) => { setRange(x); setPre(match(x)); if (instant && onApply) onApply(x); }, month: view, onMonthChange: setView,
      today: t, min, max, isDateDisabled, locale, weekStart }),
    h('div', { className: 'emcd-date-panel__footer' },
      showReset && h(Button, { type: 'text', size: 's', label: resetLabel, className: 'emcd-date-panel__reset', disabled: !r.from && !r.to,
        onClick: () => { setRange({ from: null, to: null }); setPre(undefined); if (onReset) onReset(); } }),
      h(Button, { type: 'primary', size: 's', label: applyLabel, disabled: !done, onClick: () => { if (onApply) onApply(r); } }))));
}

/** Date range field — поле периода на базе Input M (подпись на рамке): «ДД.ММ.ГГ → ДД.ММ.ГГ» + иконка календаря. state: default | error | disabled | skeleton; hint — ограничение периода до выбора, error — после.
 *  Две схемы: панель продукта — onOpen(event) по нажатию, Enter, Space или ↓ (from / to — готовые строки дат); встроенная — panel (true или props Date range panel):
 *  поповер с Date range panel, value / defaultValue / onChange({ from, to } ISO) — применённый период, open / defaultOpen / onOpenChange; формат дат — formatDate(iso) или локаль (дд.мм.гг).
 *  Esc и «Применить» закрывают панель и возвращают фокус на поле; клик вне — закрывает без применения. Не помещается в экран — поповер выравнивается по концу поля. */
export function DateRangeField({ label = 'Период', from, to, placeholder = 'ДД.ММ.ГГ → ДД.ММ.ГГ', hint, error, state = 'default', labelPosition = 'on-border', onOpen,
  panel = false, value, defaultValue, onChange, open, defaultOpen = false, onOpenChange, formatDate, locale = 'ru', className, ...rest }) {
  const id = useId();
  const builtIn = !!panel;
  const [raw, setRange] = useControllable(value, defaultValue ?? { from: null, to: null }, onChange);
  const r = normRange(raw);
  const [isOpen, setOpen] = useControllable(open, defaultOpen, onOpenChange);
  const fmt = (s) => (s ? (formatDate ? formatDate(s) : shortDate(s, locale)) : null);
  const f = from ?? (builtIn ? fmt(r.from) : null); const tt = to ?? (builtIn ? fmt(r.to) : null);
  const val = f || tt ? `${f || '…'} → ${tt || '…'}` : '';
  const off = state === 'disabled' || state === 'skeleton';
  const root = React.useRef(null); const input = React.useRef(null); const pop = React.useRef(null);
  const shown = builtIn && isOpen && !off;
  const close = (refocus = true) => { setOpen(false); if (refocus && input.current) input.current.focus(); };
  const trigger = (e) => { if (off) return; if (onOpen) onOpen(e); if (builtIn) setOpen(!isOpen); };
  React.useEffect(() => {
    if (!shown) return undefined;
    const out = (e) => { if (root.current && !root.current.contains(e.target)) close(false); };
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  });
  // открыли — фокус в панель (пресеты или день); выходит за край экрана — по концу поля (в RTL — тоже)
  useIsoLayoutEffect(() => {
    const p = pop.current; if (!shown || !p) return;
    p.classList.remove('emcd-date-range__popover--end');
    const pr = p.getBoundingClientRect(); if (pr.right > document.documentElement.clientWidth - 8 || pr.left < 8) p.classList.add('emcd-date-range__popover--end');
    const el = p.querySelector('[role="listbox"], [role="grid"] [tabindex="0"]'); if (el) el.focus();
  }, [shown]);
  const panelProps = panel === true ? {} : panel || {};
  return h('div', { ref: root, role: 'group', 'aria-label': typeof label === 'string' ? label : undefined, className: cx('emcd-date-range', shown && 'emcd-date-range--open', className) },
    h(Input, { ref: input, label, labelPosition, state, hint, error, value: val, placeholder, readOnly: true, 'aria-haspopup': 'dialog',
      'aria-expanded': builtIn ? shown : undefined, 'aria-controls': shown ? id : undefined,
      onClick: off ? undefined : trigger,
      onKeyDown: (e) => {
        if (off) return;
        if (e.key === 'Escape' && shown) { e.preventDefault(); close(); return; }
        if ((onOpen || builtIn) && ['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); trigger(e); }
      },
      trailing: h(Icon, { name: 'calendar' }), ...rest }),
    shown && h('div', { ref: pop, className: 'emcd-date-range__popover' },
      h(DateRangePanel, { id, locale, ...panelProps, defaultValue: r,
        onApply: (x) => { setRange(x); close(); if (panelProps.onApply) panelProps.onApply(x); },
        onClose: (e) => { close(); if (panelProps.onClose) panelProps.onClose(e); } })));
}

/** Page indicator — точки карусели (2–5), текущая вытянутая. selected — номер с 1. onSelect(n) — точки кликабельны (есть свайп или стрелки), иначе декоративны. Озвучивается «Слайд 3 из 5». */
export function PageIndicator({ count = 2, selected = 1, onSelect, label = 'Слайд', className, ...rest }) {
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
export function LegendSwatch({ marker = 'dot', series = 1, className, ...rest }) {
  const s = seriesN(series);
  return h('span', { className: cx('emcd-legend-swatch', marker === 'line' && 'emcd-legend-swatch--line', 'emcd-legend-swatch--s' + s, className), 'aria-hidden': true, ...rest },
    marker === 'line' ? h('svg', { viewBox: '0 0 12 12', focusable: 'false' }, h('line', { x1: 0, y1: 6, x2: 12, y2: 6, strokeDasharray: SERIES_DASH[s] })) : h('span', { className: 'emcd-legend-swatch__dot' }));
}

/** Legend item — маркер серии + подпись (+ значение при showValue). selected — серия выбрана / закреплена; onClick — кнопка «скрыть / показать серию» (aria-pressed). skeleton — полоса. */
export function LegendItem({ label, children, value, showValue = false, selected = false, marker = 'dot', series = 1, skeleton = false, onClick, className, ...rest }) {
  if (skeleton) return h('span', { className: cx('emcd-legend-item', 'emcd-legend-item--skeleton', className), 'aria-hidden': true, ...rest }, h('span', { className: 'emcd-legend-item__bone' }));
  const text = label ?? children;
  return h(onClick ? 'button' : 'span', { type: onClick ? 'button' : undefined, 'aria-pressed': onClick ? !!selected : undefined, onClick,
    className: cx('emcd-legend-item', selected && 'emcd-legend-item--selected', onClick && 'emcd-legend-item--interactive', className), title: typeof text === 'string' ? text : undefined, ...rest },
  h(LegendSwatch, { marker, series }), h('span', { className: 'emcd-legend-item__label' }, text),
  showValue && value != null && h('span', { className: 'emcd-legend-item__value' }, value));
}

/** Chart metric — показатель над графиком: подпись (text-tertiary) + крупное значение (heading-lg, display) + единица. tone: default | danger | warning | success — смысл значения.
 *  icon — true (lightning), имя иконки DS или узел: иконка слева от значения цвета тона. role=group с aria-label «Подпись: значение единица».
 *  skeleton — загрузка: подпись остаётся, строка значения — плашка той же высоты; тон не применяется. */
export function ChartMetric({ tone = 'default', label, value, unit, showUnit = true, icon: ic = false, skeleton = false, className, ...rest }) {
  if (skeleton) {
    return h('div', { role: 'group', 'aria-label': typeof label === 'string' ? label : undefined, 'aria-busy': true, className: cx('emcd-chart-metric', 'emcd-chart-metric--skeleton', className), ...rest },
      h('span', { className: 'emcd-chart-metric__label', title: typeof label === 'string' ? label : undefined }, label),
      h('span', { className: 'emcd-chart-metric__value-row', 'aria-hidden': true }, h('span', { className: 'emcd-chart-metric__bone' })));
  }
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
export function TableHeaderCell({ align = 'start', sort, defaultSort = 'none', onSort, sortable = true, label, children, showFilter = false, showInfo = false, infoLabel = 'Пояснение',
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
export function TableCell({ align = 'start', primary, secondary, children, content, skeleton = false, disabled = false, className, ...rest }) {
  const slot = children ?? content;
  const body = skeleton ? h('span', { className: 'emcd-td__bone', 'aria-hidden': true })
    : slot != null ? slot
      : [h('span', { key: 'p', className: 'emcd-td__primary', title: typeof primary === 'string' ? primary : undefined }, primary),
        secondary != null && h('span', { key: 's', className: 'emcd-td__secondary', title: typeof secondary === 'string' ? secondary : undefined }, secondary)];
  return h('td', { className: cx('emcd-td', align === 'end' && 'emcd-td--end', skeleton && 'emcd-td--skeleton', disabled && 'emcd-td--disabled', className), 'aria-busy': skeleton || undefined, ...rest },
    h('div', { className: 'emcd-td__content' }, body));
}

/** Table row — строка (`tr`) из Table cell. density: compact 48 | regular 64 (одна на таблицу). selected — accent-subtle. onClick — строка открывает детали: Hover / Pressed, Tab + Enter. */
export function TableRow({ density = 'compact', selected = false, onClick, children, className, ...rest }) {
  return h('tr', { className: cx('emcd-tr', density === 'regular' && 'emcd-tr--regular', selected && 'emcd-tr--selected', onClick && 'emcd-tr--interactive', className),
    'data-selected': selected ? '' : undefined, tabIndex: onClick ? 0 : undefined, onClick,
    onKeyDown: onClick ? (e) => { if (e.key === 'Enter' && e.target === e.currentTarget) onClick(e); } : undefined, ...rest }, children);
}

/** Table — таблица Web (паттерн, не набор Figma): шапка из Table header cell + строки Table row. columns: [{ key, label, align, sortable, width, render(row) }];
 *  rows: [{ id, selected, …значения по key }]; sort: { key, dir } (dir — ascending | descending), onSort(sort) — данные сортирует продукт. onRowClick(row) — строки открывают детали.
 *  skeletonRows — строки-скелетоны при загрузке. Без columns — children внутри tbody. На Compact таблицу заменяют List item / Transaction. */
export function Table({ columns = [], rows = [], density = 'compact', sort, defaultSort = null, onSort, onRowClick, skeletonRows = 0, label, caption, children, className, ...rest }) {
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
export function PromoCard({ size = 's', tone = 'neutral', align = 'start', title, description, showDescription = true, showAction = true, actionLabel = 'Подробнее', onAction,
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
 *  Header: header (свой узел) или logo + language (Button Tertiary XS, onLanguage) + cta (узел, Button Primary S); onCollapsedChange — кнопка «свернуть» (aria-expanded).
 *  Nav: nav (узел) или items — [{ label, icon, href, selected, counter, badge, badgeLabel, badgeTone, onClick } | { divider: true }]; Selected — ровно один.
 *  promo — true / false или узел (Promo card S с картинкой); при collapsed скрыт. Footer: footer (узел) + account — { name, link: 'Профиль', src, onClick } (Avatar M + имя + ссылка + шеврон). */
export function Sidebar({ collapsed = false, onCollapsedChange, collapseLabel = 'Свернуть меню', expandLabel = 'Развернуть меню', header, logo, language, onLanguage, cta,
  nav, items, promo = true, footer, account, label = 'Основная навигация', className, ...rest }) {
  const head = header ?? [
    h('div', { key: 'b', className: 'emcd-sidebar__brand' },
      onCollapsedChange && h(IconButton, { type: 'tertiary', size: 'xs', label: collapsed ? expandLabel : collapseLabel, 'aria-expanded': !collapsed, className: 'emcd-sidebar__toggle',
        icon: h(Icon, { name: collapsed ? 'chevron-right' : 'chevron-left' }), onClick: () => onCollapsedChange(!collapsed) }),
      !collapsed && h('span', { className: 'emcd-sidebar__logo' }, logo ?? 'EMCD'),
      !collapsed && language != null && h(Button, { type: 'tertiary', size: 'xs', label: language, className: 'emcd-sidebar__language', onClick: onLanguage })),
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
/** Chart crosshair — перекрестие выбранной точки графика: target line — вертикальная линия `border/default` + точки серий (`point` цвета серии, обводка `surface/current`, ореол 0.24);
 *  bar — полоса на ширину столбца (`status/neutral/subtle`). x — положение по X в % ширины области; points: [{ y (%), series (цвет 1–8) }]; band — ширина полосы, %.
 *  Неинтерактивен: положение и видимость выставляет Chart plot (наведение, касание, стрелки). Без анимации движения. */
export function ChartCrosshair({ target = 'line', x = 50, points = [], band = 4, className, style, ...rest }) {
  const bar = target === 'bar';
  return h('div', { className: cx('emcd-chart-crosshair', bar && 'emcd-chart-crosshair--bar', className), 'aria-hidden': true,
    style: { left: x + '%', ...(bar ? { width: band + '%' } : null), ...style }, ...rest },
  bar ? h('span', { className: 'emcd-chart-crosshair__band' }) : h('span', { className: 'emcd-chart-crosshair__line' }),
  !bar && points.map((p, i) => h('span', { key: i, className: cx('emcd-chart-crosshair__point', 'emcd-chart-crosshair__point--s' + seriesN(p.series)), style: { top: p.y + '%' } })));
}

/** Chart tooltip — значения серий в выбранной точке: шапка (date — слева, time — справа; showDate=false — без шапки) и строки «маркер — серия — значение».
 *  rows: [{ label, value, series, marker, tone }] — 1–4 (Figma Rows = длина); больше четырёх — первые 4 и «+N» (moreLabel). tone: danger | warning — значение вне нормы.
 *  Шрифт — текста (моно только у подписей осей, 17.11). role=status + aria-live=polite; live=false — без них (озвучивает Chart plot). Показ и положение — у графика. */
export const ChartTooltip = React.forwardRef(function ChartTooltip({ rows = [], date, time, showDate = true, moreLabel, live = true, className, ...rest }, ref) {
  const list = rows.slice(0, 4);
  const more = rows.length - list.length;
  return h('div', { ref, role: live ? 'status' : undefined, 'aria-live': live ? 'polite' : undefined, className: cx('emcd-chart-tooltip', className), ...rest },
    showDate && (date != null || time != null) && h('div', { className: 'emcd-chart-tooltip__header' },
      h('span', { className: 'emcd-chart-tooltip__date' }, date), time != null && h('span', { className: 'emcd-chart-tooltip__time' }, time)),
    list.map((r, i) => h('div', { key: i, className: 'emcd-chart-tooltip__row' },
      h('span', { className: 'emcd-chart-tooltip__label' }, h(LegendSwatch, { marker: r.marker, series: r.series ?? i + 1 }), h('span', { className: 'emcd-chart-tooltip__series' }, r.label)),
      h('span', { className: cx('emcd-chart-tooltip__value', r.tone && r.tone !== 'default' && 'emcd-chart-tooltip__value--' + r.tone) }, r.value))),
    more > 0 && h('div', { className: 'emcd-chart-tooltip__more' }, moreLabel ?? `+${more}`));
});

// Layout-эффект в браузере, обычный — при SSR (без предупреждения React)
const useIsoLayoutEffect = typeof document !== 'undefined' ? React.useLayoutEffect : React.useEffect;
// Тултип у выбранной точки: справа от перекрестия, не помещается — слева, иначе прижат к краю области; если накрывает точку — в другую половину по высоте
function placeTooltip(box, tip, xPct, yPct) {
  if (!box || !tip) return;
  const bw = box.clientWidth; const bh = box.clientHeight; const tw = tip.offsetWidth; const th = tip.offsetHeight; const gap = 12;
  const px = (xPct / 100) * bw;
  let left = px + gap;
  if (left + tw > bw) left = px - gap - tw >= 0 ? px - gap - tw : Math.max(0, Math.min(bw - tw, px - tw / 2));
  const covers = left < px + gap && left + tw > px - gap;
  const top = covers && yPct != null && yPct < 50 ? Math.max(0, bh - th) : 0;
  tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.visibility = 'visible';
}

const CHART_KIND = { bars: ['bar'], line: ['line'], area: ['area'], 'line-bars': ['line', 'bar'], 'multi-line': ['line'], 'dual-area': ['area', 'area'], 'stacked-bars': ['stack'] };
const chartValue = (s, i, v, valueFormat) => (v == null || v === '' ? '—' : s.format ? s.format(v) : valueFormat ? valueFormat(v, i) : `${v}${s.unit ? ' ' + s.unit : ''}`);
/** Chart plot — область графика (SVG): серии, сетка пунктиром, подписи осей (моно, text-tertiary). type: bars | line | area | line-bars | multi-line | dual-area | stacked-bars.
 *  series: [{ name, data: number[], unit, format, marker }] — серия 1 — `border/accent` (бренд), остальные — `data/2…8` (вторая ось Line + Bars и Dual area — `data/4`); line-bars и dual-area: серия 2 — по правой оси.
 *  labels — подписи X по точкам (показывается не больше xTicks, по умолчанию 6); yLeft / yRight — { ticks: [...] } вместо автошкалы; format(v, axis) — подпись деления.
 *  state: default | skeleton | empty | disabled (emptyText — «Нет данных за период»); label — aria-label «что и за какой период».
 *  Hover (interactive, по умолчанию вкл.): указатель / касание → ближайшая точка: Chart crosshair (линии — точки серий, столбцы — полоса) + Chart tooltip (dates / times — шапка, иначе labels;
 *  значение — series.format(v) | valueFormat(v, i) | «v unit»). Клавиатура: график в фокусе, ← / → — по точкам, Home / End — края, Enter — закрепить, Esc — скрыть; aria-live озвучивает точку.
 *  index / defaultIndex / onIndexChange(k | null) — выбранная точка (управляемо). Тултип: справа от перекрестия, у края — слева или прижат к границе. */
export function ChartPlot({ type = 'bars', series = [], labels = [], xTicks = 6, yLeft, yRight, format, height = 200, state = 'default', emptyText = 'Нет данных за период', label,
  interactive = true, index, defaultIndex = null, onIndexChange, dates, times, valueFormat, className, style, ...rest }) {
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
  const live = interactive && !skeleton && !empty && state !== 'disabled';
  const bars = series.map((s, i) => [s, i]).filter(([, i]) => kindOf(i) === 'bar');
  const marks = [];
  // Skeleton: столбцы — «пила»; линии и области — силуэт. Составные типы — по базовому (Line + Bars как Line, 19.11): данных нет, колонки осей (и правая у Line + Bars) и строка X сохраняют место
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

  // ── Hover: выбранная точка k (Chart crosshair + Chart tooltip)
  const [cur, setCur] = useControllable(index, defaultIndex, onIndexChange);
  const [pinned, setPinned] = React.useState(false);
  const [say, setSay] = React.useState('');
  const root = React.useRef(null); const box = React.useRef(null); const tip = React.useRef(null);
  const k = live && cur != null && cur >= 0 && cur < n ? Math.floor(cur) : null;
  const bandKind = kinds[0] === 'bar' || kinds[0] === 'stack';
  const xPct = k == null ? 0 : ((k + 0.5) / n) * 100;
  const points = k == null || bandKind ? [] : series.map((s, i) => [s, i]).filter(([, i]) => kindOf(i) === 'line' || kindOf(i) === 'area')
    .map(([s, i]) => ({ v: (s.data || [])[k], i })).filter((p) => p.v != null && Number.isFinite(Number(p.v)))
    .map((p) => ({ series: colorOf(p.i), y: (y(p.v, axisOf(p.i) === 'right' ? R : L) / H) * 100 }));
  const rows = k == null ? [] : series.map((s, i) => ({ label: s.name ?? `Серия ${i + 1}`, value: chartValue(s, i, (s.data || [])[k], valueFormat), series: colorOf(i), marker: s.marker }));
  const date = k == null ? null : (dates ? dates[k] : labels[k]);
  const time = k == null || !times ? undefined : times[k];
  const summary = (j) => [dates ? dates[j] : labels[j], times && times[j], ...series.map((s, i) => `${s.name ?? `Серия ${i + 1}`} ${chartValue(s, i, (s.data || [])[j], valueFormat)}`)].filter((t) => t != null && t !== '').join(', ');
  const pick = (e) => { const r = box.current && box.current.getBoundingClientRect(); return r && r.width ? Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n))) : null; };
  const show = (j, speak) => { if (j !== cur) setCur(j); if (speak) setSay(j == null ? '' : summary(j)); };
  useIsoLayoutEffect(() => { if (k != null) placeTooltip(box.current, tip.current, xPct, points.length ? Math.min(...points.map((p) => p.y)) : null); });
  // касание: перекрестие остаётся до тапа вне графика; закреплённое (Enter) — до клика вне
  React.useEffect(() => {
    if (k == null) return undefined;
    const out = (e) => { if (root.current && !root.current.contains(e.target)) { setPinned(false); show(null); } };
    document.addEventListener('pointerdown', out);
    return () => document.removeEventListener('pointerdown', out);
  });
  const onKeyDown = (e) => {
    if (!live) return;
    if (e.key === 'Escape') { if (k != null) { e.preventDefault(); e.stopPropagation(); setPinned(false); show(null, true); } return; }
    if (e.key === 'Enter') { if (k != null) { e.preventDefault(); setPinned(!pinned); } return; }
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    const j = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : d ? (k == null ? (d > 0 ? 0 : n - 1) : Math.min(n - 1, Math.max(0, k + d))) : null;
    if (j == null) return;
    e.preventDefault(); show(j, true);
  };
  const hover = live ? {
    onPointerMove: (e) => { if (!pinned) { const j = pick(e); if (j != null) show(j); } },
    onPointerDown: (e) => { const j = pick(e); if (j != null) { setPinned(false); show(j, e.pointerType !== 'mouse'); } },
    onPointerLeave: (e) => { if (!pinned && e.pointerType === 'mouse') show(null); },
  } : null;
  const crosshair = k != null && h(ChartCrosshair, { key: 'ch', target: bandKind ? 'bar' : 'line', x: xPct, points, band: (bandKind ? 70 : 0) / n });

  return h('div', { ref: root, role: live ? 'group' : 'img', 'aria-roledescription': live ? 'график' : undefined, 'aria-label': label, 'aria-busy': skeleton || undefined,
    tabIndex: live ? 0 : undefined, onKeyDown: live ? onKeyDown : undefined, onBlur: live ? (e) => { if (!pinned && !(root.current && root.current.contains(e.relatedTarget))) show(null); } : undefined,
    style: { '--emcd-chart-h': H + 'px', ...style },
    className: cx('emcd-chart-plot', R && 'emcd-chart-plot--dual', live && 'emcd-chart-plot--interactive', skeleton && 'emcd-chart-plot--skeleton', empty && 'emcd-chart-plot--empty', state === 'disabled' && 'emcd-chart-plot--disabled', className), ...rest },
  axis(L, 'left'),
  h('div', { ref: box, className: 'emcd-chart-plot__area-box', ...hover },
    bandKind && crosshair,
    h('svg', { className: 'emcd-chart-plot__svg', viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', 'aria-hidden': true, focusable: 'false' },
      !(skeleton && kinds[0] !== 'bar' && kinds[0] !== 'stack') && L.ticks.map((t) => h('line', { key: 'g' + t, className: 'emcd-chart-plot__grid', x1: 0, x2: W, y1: y(t, L), y2: y(t, L) })),
      marks),
    !bandKind && crosshair,
    k != null && h(ChartTooltip, { ref: tip, live: false, 'aria-hidden': true, className: 'emcd-chart-plot__tooltip', rows, date, time }),
    empty && h('span', { className: 'emcd-chart-plot__empty' }, emptyText)),
  R ? axis(R, 'right') : null,
  h('div', { className: 'emcd-chart-plot__x-row', 'aria-hidden': true }, !skeleton && !empty && xl),
  live && h('span', { className: 'emcd-chart-plot__live', role: 'status', 'aria-live': 'polite' }, say));
}

/** Chart card — виджет графика: Top (Chart metric × 1–3 + период — ряд Chip, выбранный белый; в конце Top — легенда над графиком), Content (Chart plot — children; hover — у Chart plot, карточка его не обрезает), Bottom — итог за период (sum).
 *  metrics: [{ label, value, unit, icon, tone }]; periods: [{ value, label }] — период (без period — неуправляемый, onPeriodChange(value)); periodSize: s (Web) | m (Compact).
 *  legend: [{ label, series, marker, value, showValue }] — над графиком (19.11, по продукту); showBottom=false — без итога. top / bottom — свои узлы вместо собранных. label — имя группы. */
export function ChartCard({ label, metrics = [], periods, period, defaultPeriod, onPeriodChange, periodSize = 's', periodLabel = 'Период', legend = [], sum, showBottom = true, top, bottom, children, content, className, ...rest }) {
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

/** Top bar (draft) — верхняя панель корневых экранов. platform: mobile-web — логотип, аккаунт (имя + шеврон), баланс (копейки text-tertiary) и «Меню»;
 *  app (19.11) — в начале Select compact аккаунта (без leading), в конце Select compact монеты (Coin stack) + Icon button Secondary M «+» (addLabel «Подключить»); без логотипа, баланса и меню.
 *  mobile-web: onAccount / onBalance / onMenu — нажатия; showBalance=false — без баланса.
 *  app: account — имя; accountOptions + onAccountChange — список аккаунтов (без списка onAccount — открыть свой Sheet); coin — подпись монеты («BTC»), coins — тикеры Coin stack (по умолчанию [coin]);
 *  coinOptions + onCoinChange (или onCoin); onAdd — «Подключить». */
export function TopBar({ platform = 'mobile-web', logo, account, onAccount, balance, cents, showBalance = true, onBalance, onMenu, menuLabel = 'Меню',
  accountOptions, accountValue, onAccountChange, coin, coins, coinOptions, coinValue, onCoinChange, onCoin, onAdd, addLabel = 'Подключить', className, ...rest }) {
  if (platform === 'app') {
    const stack = coins && coins.length ? coins : coin ? [String(coin).toLowerCase()] : [];
    return h('header', { className: cx('emcd-top-bar', 'emcd-top-bar--app', className), 'data-platform-variant': platform, ...rest },
      account != null && h(SelectCompact, { label: 'Аккаунт', text: accountOptions ? undefined : account, options: accountOptions, value: accountValue, onChange: onAccountChange,
        showLeading: false, onOpenChange: accountOptions ? undefined : (o) => { if (o && onAccount) onAccount(); }, open: accountOptions ? undefined : false, className: 'emcd-top-bar__select' }),
      h('div', { className: 'emcd-top-bar__end' },
        coin != null && h(SelectCompact, { label: 'Монета', text: coinOptions ? undefined : coin, options: coinOptions, value: coinValue, onChange: onCoinChange,
          leading: stack.length ? h(CoinStack, { coins: stack, size: 's' }) : undefined, onOpenChange: coinOptions ? undefined : (o) => { if (o && onCoin) onCoin(); },
          open: coinOptions ? undefined : false, className: 'emcd-top-bar__select' }),
        h(IconButton, { type: 'tertiary', size: 'm', label: addLabel, className: 'emcd-top-bar__add', icon: h(Icon, { name: 'plus' }), onClick: onAdd })));
  }
  return h('header', { className: cx('emcd-top-bar', className), 'data-platform-variant': platform, ...rest },
    h('span', { className: 'emcd-top-bar__logo' }, logo ?? h(Icon, { name: 'logo-emcd', label: 'EMCD' })),
    account != null && h('button', { type: 'button', className: 'emcd-top-bar__account', onClick: onAccount },
      h('span', { className: 'emcd-top-bar__name' }, account), h(Icon, { name: 'chevron-down', size: 'sm' })),
    showBalance && balance != null && h('button', { type: 'button', className: 'emcd-top-bar__balance', onClick: onBalance, 'aria-label': `Баланс ${balance}${cents ?? ''}` },
      h('span', { className: 'emcd-top-bar__amount' }, balance, cents != null && h('span', { className: 'emcd-top-bar__cents' }, cents)), h(Icon, { name: 'chevron-down', size: 'sm' })),
    h(IconButton, { type: 'ghost', size: 'm', label: menuLabel, className: 'emcd-top-bar__menu', icon: h(Icon, { name: 'menu' }), onClick: onMenu }));
}

const SUMMARY = [{ tone: 'danger', label: 'Отключённые' }, { tone: 'warning', label: 'Нестабильные' }, { tone: 'neutral', label: 'Активные' }];
/** Status summary (draft) — сводка воркеров: 3 × Stat card Align=Center (Отключённые → Нестабильные → Активные) со стрелкой-ссылкой. layout: column (Web, колонка у графика) | row (Compact, ряд + «Все воркеры»).
 *  offline / unstable / active — числа (или items: [{ tone, label, value }]); onItem(item) — переход в «Воркеры» с фильтром; showAllLink + onAllLink — ссылка «Все воркеры» (только row).
 *  skeleton — загрузка: плитки Stat card Skeleton, тон neutral (до данных неизвестен), та же высота; «Все воркеры» остаётся. */
export function StatusSummary({ layout = 'column', offline, unstable, active, items, onItem, showAllLink = true, allLinkLabel = 'Все воркеры', onAllLink, skeleton = false, className, ...rest }) {
  const list = items ?? SUMMARY.map((d, i) => ({ ...d, value: [offline, unstable, active][i] }));
  return h('div', { className: cx('emcd-status-summary', layout === 'row' && 'emcd-status-summary--row', className), 'aria-busy': skeleton || undefined, ...rest },
    h('div', { className: 'emcd-status-summary__tiles' }, list.map((it, i) => skeleton
      ? h(StatCard, { key: i, tone: 'neutral', align: 'center', delta: false, skeleton: true, className: 'emcd-status-summary__tile' })
      : h(StatCard, { key: i, tone: it.tone, align: 'center', label: it.label, value: it.value, delta: false, info: false,
      link: true, linkLabel: `${it.label}, ${it.value ?? ''}`.replace(/, $/, ''), onLink: (e) => { if (onItem) onItem(it, e); }, className: 'emcd-status-summary__tile' }))),
    layout === 'row' && showAllLink && h(Button, { type: 'text', size: 's', label: allLinkLabel, iconRight: h(Icon, { name: 'chevron-right', size: 'sm' }), onClick: onAllLink, className: 'emcd-status-summary__all' }));
}

/** Promo carousel (draft) — промо внизу мобильного дашборда: слайды (Promo card M, ширина 311, следующая подглядывает) с прокруткой scroll-snap + Page indicator, синхронный с прокруткой.
 *  slides — массив узлов (или children); index / defaultIndex / onIndexChange — текущий слайд (с 0). Регион «Промо», слайд — группа «1 из 3». */
export function PromoCarousel({ slides, children, label = 'Промо', index, defaultIndex = 0, onIndexChange, className, ...rest }) {
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
export function ActionBar({ actions, badge = false, badgeText = 'A', children, className, ...rest }) {
  const list = actions ? actions.slice(0, 2) : null;
  // badge (19.11) — бейдж автодействия (Badge S Neutral Subtle, «A») над последней кнопкой, справа сверху: top −высота / 2, конец −4
  const btns = list ? list.map((a, i) => {
    const b = h(Button, { key: i, size: 'm', type: list.length === 1 ? 'primary' : 'tertiary', ...a, iconLeft: icon(a.iconLeft) });
    return badge && i === list.length - 1
      ? h('span', { key: i, className: 'emcd-action-bar__slot' }, b, h(Badge, { size: 's', tone: 'neutral', label: badgeText, className: 'emcd-action-bar__badge' }))
      : b;
  }) : children;
  return h('div', { className: cx('emcd-action-bar', className), ...rest }, btns);
}

// ───────────── Пачка 5 (19.11): App — Floating button, Tab bar ─────────────
/** Floating button — плавающая кнопка главного действия Compact (одна на экран; справа снизу над Tab bar — позиционирует продукт).
 *  layout: icon — круг 56, только Primary, label → aria-label; extended — иконка + подпись. size (только extended): l 56 (поля 20, зазор 8) · m 40 (поля 16, зазор 6).
 *  type (только extended): primary — главное; secondary — нейтральное («Выгрузить»: action-secondary-default, text-primary, icon-primary). loading — Spinner L, нажатие блокируется. */
export const FloatingButton = React.forwardRef(function FloatingButton({ layout = 'icon', size = 'l', type = 'primary', label, icon: ic = 'plus', loading = false, disabled, htmlType = 'button', onClick, className, ...rest }, ref) {
  const ext = layout === 'extended';
  const m = ext && size === 'm';
  const sec = ext && type === 'secondary';
  return h('button', { ref, type: htmlType, disabled, 'aria-busy': loading || undefined, 'aria-label': ext ? undefined : label,
    className: cx('emcd-fab', ext && 'emcd-fab--extended', m && 'emcd-fab--m', sec && 'emcd-fab--secondary', loading && 'emcd-fab--loading', className),
    onClick: loading ? undefined : onClick, ...rest },
  loading ? h(Spinner, { size: 'l', label: typeof label === 'string' ? label : 'Загрузка', className: 'emcd-fab__icon' }) : h('span', { className: 'emcd-fab__icon', 'aria-hidden': true }, icon(ic)),
  ext && h('span', { className: 'emcd-fab__label' }, label));
});

/** Tab bar item — пункт нижней навигации Compact. type: item — раздел (иконка 24 + подпись); action — центральная мультикнопка App («E» → шит быстрых действий):
 *  плашка 56 × 40 action-secondary-default, обводка border-accent, только иконка / логотип, без подписи и без selected — label обязателен (aria-label).
 *  selected — текущий раздел (aria-current="page", icon-accent + text-accent). badgeDot — в разделе есть то, что требует действия (без числа; badgeLabel — в доступное имя). */
export function TabBarItem({ type = 'item', selected = false, label, icon: icProp, badgeDot = false, badgeLabel = 'есть уведомления', href, onClick, className, ...rest }) {
  const action = type === 'action';
  const ic = icProp ?? (action ? 'logo-emcd' : 'dots-grid');
  const tag = href ? 'a' : 'button';
  return h(tag, { href, type: tag === 'button' ? 'button' : undefined, onClick,
    'aria-current': !action && selected ? 'page' : undefined, 'aria-label': action ? label : undefined,
    className: cx('emcd-tab-bar-item', action && 'emcd-tab-bar-item--action', !action && selected && 'emcd-tab-bar-item--selected', className), ...rest },
  action ? h('span', { className: 'emcd-tab-bar-item__plate', 'aria-hidden': true }, icon(ic))
    : [h('span', { key: 'i', className: 'emcd-tab-bar-item__icon', 'aria-hidden': true }, icon(ic), badgeDot && h('span', { className: 'emcd-tab-bar-item__dot' })),
      h('span', { key: 'l', className: 'emcd-tab-bar-item__label' }, label),
      badgeDot && h('span', { key: 'b', className: 'emcd-sr' }, ', ' + badgeLabel)]);
}

/** Tab bar — нижняя навигация Compact: 3–5 Tab bar item (порядок как в Sidebar), ровно один selected; Action — одна, по центру (items[].type = 'action').
 *  items: [{ value, label, icon, badgeDot, href, type }]; value / defaultValue / onChange(value) — выбранный раздел (Action не выбирается: onAction(item)).
 *  safeArea (по умолчанию вкл.) — нижнее поле os-safe-area-bottom / env(safe-area-inset-bottom). nav aria-label «Основная навигация». */
export function TabBar({ items, value, defaultValue, onChange, onAction, safeArea = true, label = 'Основная навигация', children, className, ...rest }) {
  const first = items && items.find((it) => it.type !== 'action');
  const [own, setOwn] = React.useState(defaultValue ?? (first ? first.value ?? first.label : undefined));
  const cur = value !== undefined ? value : own;
  const body = items ? items.slice(0, 5).map((it, i) => {
    const { value: _v, ...p } = it;
    const v = it.value ?? it.label;
    if (it.type === 'action') return h(TabBarItem, { key: i, ...p, onClick: (e) => { if (it.onClick) it.onClick(e); if (onAction) onAction(it); } });
    return h(TabBarItem, { key: i, ...p, selected: v === cur, onClick: (e) => { if (value === undefined) setOwn(v); if (onChange) onChange(v); if (it.onClick) it.onClick(e); } });
  }) : children;
  return h('nav', { 'aria-label': label, className: cx('emcd-tab-bar', !safeArea && 'emcd-tab-bar--no-safe-area', className), ...rest },
    h('div', { className: 'emcd-tab-bar__items' }, body));
}

export const components = { Button, IconButton, Badge, Chip, Checkbox, Radio, RadioGroup, Toggle, Input, Textarea, Modal,
  Counter, Status, Avatar, Divider, Spinner, Skeleton, Progress, Amount, Card, SectionHeader, PageHeader, StatCard, Tooltip, Toast, Suggest, Tab, Tabs, Segment, Segmented,
  ListItem, Transaction, MenuItem, Menu, Select, PasswordField,
  Icon, Coin, CoinStack, NavItem, KeyValueRow, Search, SelectCompact, DateRangeField, DateCell, Calendar, DateRangePanel, PageIndicator, LegendSwatch, LegendItem, ChartMetric,
  TableHeaderCell, TableCell, TableRow, Table, PromoCard, Sidebar, ChartCrosshair, ChartTooltip, ChartPlot, ChartCard, TopBar, StatusSummary, PromoCarousel, ActionBar,
  FloatingButton, TabBarItem, TabBar };
