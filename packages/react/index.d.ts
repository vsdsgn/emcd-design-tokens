// EMCD DS 2.0 — типы компонентов React (документация props; Claude DS читает <Comp>Props).
// Значения props — из контрактов docs/components/*.md. Стили — классы emcd-* (components.css), токены — build/css.
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type Size4 = 's' | 'm' | 'l' | 'xl';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** primary — одно главное действие; secondary — вспомогательное в цвет бренда; tertiary — нейтральное; tertiary-outline — с обводкой; text — ссылка-действие; inverted — на тёмной / промо-подложке. */
  type?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-outline' | 'text' | 'inverted';
  /** danger — разрушающее действие (удалить, отключить). */
  tone?: 'default' | 'danger';
  /** s 32 — таблицы; m 40 — Web по умолчанию; l 48 — App по умолчанию; xl 56 — главные действия, футер модалки. */
  size?: Size4;
  label?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Спиннер вместо иконки, aria-busy. */
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-outline' | 'ghost' | 'text' | 'inverted';
  tone?: 'default' | 'danger';
  size?: Size4;
  /** Обязательно: доступное имя и тултип на Web. */
  label: string;
  icon?: ReactNode;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface BadgeProps {
  /** s 20 — таблицы; m 24 — карточки; l 32 — крупные заголовки. */
  size?: 's' | 'm' | 'l';
  /** Тона Info нет: Info = цвет бренда → accent. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  /** subtle — по умолчанию; solid — одна главная метка на карточке. */
  style?: 'subtle' | 'solid';
  label?: ReactNode;
  /** Только смысловая иконка 16. */
  icon?: ReactNode;
  skeleton?: boolean;
}

export interface ChipProps {
  size?: 's' | 'm';
  selected?: boolean;
  label?: ReactNode;
  /** Счётчик или значение справа от подписи. */
  metaText?: ReactNode;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Есть — показывается крестик удаления. */
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
}

interface CheckBase {
  label?: ReactNode;
  description?: ReactNode;
  size?: 'm' | 's';
  disabled?: boolean;
  onChange?: (checked: boolean, event: Event) => void;
}
export interface CheckboxProps extends CheckBase {
  status?: 'off' | 'on' | 'indeterminate';
  tone?: 'default' | 'danger';
  controlPosition?: 'start' | 'end';
}
export interface RadioProps extends CheckBase {
  status?: boolean;
  name?: string;
  value?: string;
  tone?: 'default' | 'danger';
  controlPosition?: 'start' | 'end';
}
export interface RadioGroupProps { legend?: ReactNode; children?: ReactNode; }
export interface ToggleProps extends CheckBase {
  status?: boolean;
  /** end — по умолчанию (настройки); start — в списках с текстом справа. */
  controlPosition?: 'end' | 'start';
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** m 40 — Web; l 48 — App; xl 56 — крупные формы. */
  size?: 'm' | 'l' | 'xl';
  /** above — подпись над полем; on-border — в разрыве рамки (короткая подпись). */
  labelPosition?: 'above' | 'on-border';
  state?: 'default' | 'error' | 'disabled' | 'readonly' | 'loading' | 'skeleton';
  label?: ReactNode;
  hint?: ReactNode;
  /** Текст ошибки — включает state error. */
  error?: ReactNode;
  counter?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  /** Единица или тикер (USDT, %). */
  suffix?: ReactNode;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  state?: 'default' | 'error' | 'disabled' | 'readonly';
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** По умолчанию «N/maxLength», если задан maxLength. */
  counter?: ReactNode;
}

export interface ModalProps {
  open?: boolean;
  /** title — заголовок-действие; coin — монета + название + описание; empty — только крестик. */
  header?: 'title' | 'coin' | 'empty';
  /** single — одна кнопка; stacked — две, главная сверху; horizontal — две в ряд, отмена слева; none — без кнопок. */
  footer?: 'single' | 'stacked' | 'horizontal' | 'none';
  title?: ReactNode;
  description?: ReactNode;
  coin?: ReactNode;
  divider?: boolean;
  showClose?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  /** sm 400 · md 560 · lg 720. */
  width?: 'sm' | 'md' | 'lg';
  /** Кнопки футера: Button size="xl". */
  actions?: ReactNode;
  children?: ReactNode;
  scrim?: boolean;
}

export declare function Button(props: ButtonProps): JSX.Element;
export declare function IconButton(props: IconButtonProps): JSX.Element;
export declare function Badge(props: BadgeProps): JSX.Element;
export declare function Chip(props: ChipProps): JSX.Element;
export declare function Checkbox(props: CheckboxProps): JSX.Element;
export declare function Radio(props: RadioProps): JSX.Element;
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
export declare function Toggle(props: ToggleProps): JSX.Element;
export declare function Input(props: InputProps): JSX.Element;
export declare function Textarea(props: TextareaProps): JSX.Element;
export declare function Modal(props: ModalProps): JSX.Element | null;
