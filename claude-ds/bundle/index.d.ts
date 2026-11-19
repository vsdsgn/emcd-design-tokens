// EMCD DS 2.0 — типы компонентов React (документация props; Claude DS читает <Comp>Props).
// Значения props — из контрактов docs/components/*.md. Стили — классы emcd-* (components.css), токены — build/css.
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type StatusTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** primary — одно главное действие; secondary — вспомогательное в цвет бренда; tertiary — нейтральное; tertiary-outline — с обводкой; text — ссылка-действие; inverted — на тёмной / промо-подложке. */
  type?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-outline' | 'text' | 'inverted';
  /** danger — разрушающее действие (удалить, отключить). */
  tone?: 'default' | 'danger';
  /** xs 24 — мелкие действия в шапке сайдбара и плотных панелях (только Web, без min-width); s 32 — таблицы, тулбары, фильтры; m 40 — Web по умолчанию;
   *  l 48 — App и мобильный веб по умолчанию, футер Modal; xl 56 — только App: один главный CTA внизу экрана (на Web не используется). */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  label?: ReactNode;
  /** Иконка слева — цвета подписи (currentColor); зазор до подписи 10 (XS — 6). */
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  /** Спиннер вместо иконки, aria-busy. */
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-outline' | 'ghost' | 'text' | 'inverted';
  tone?: 'default' | 'danger';
  /** Квадрат xs 24 (только Web) · s 32 · m 40 · l 48; иконка xs / s 16 · m 20 · l 24. XL снят 2026-11-17. */
  size?: 'xs' | 's' | 'm' | 'l';
  /** Обязательно: доступное имя и тултип на Web. */
  label: string;
  icon?: ReactNode;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

export interface BadgeProps {
  /** s 20 — таблицы; m 24 — карточки; l 32 — крупные заголовки. */
  size?: 's' | 'm' | 'l';
  /** Тона Info нет: Info = цвет бренда → accent. Subtle · Neutral — обводка border-subtle, текст text-secondary. */
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
  /** Инверсная белая плашка (action-inverse-default), подпись text-inverse, metaText — text-inverse-secondary. */
  selected?: boolean;
  label?: ReactNode;
  /** Счётчик или значение справа от подписи. */
  metaText?: ReactNode;
  icon?: ReactNode;
  /** Точка статуса перед подписью — фильтр по статусу. */
  statusDot?: boolean;
  /** Тон точки: success — по умолчанию. */
  statusTone?: StatusTone;
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
  /** m 40 — Web; l 48 — App (XL снят 2026-11-17). */
  size?: 'm' | 'l';
  /** on-border — по умолчанию: в разрыве рамки (короткая подпись, формы вывода и сумм); above — над полем (длинные формы, длинная подпись). */
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
  /** = размер соседних полей формы; меняет шрифт и отступы, высота одинакова. Подпись — только над полем. */
  size?: 'm' | 'l';
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
  /** Кнопки футера: Button size="l" на всю ширину (до 2026-11-17 — xl). */
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

// ───────────── Пачка 2 ─────────────
/** Без value — неуправляемый (прототип кликается); с value + onChange — управляемый. */
type Controlled<T> = { value?: T; defaultValue?: T; onChange?: (value: T, event?: unknown) => void };

export interface CounterProps {
  /** s 16 — в табах M и на иконках; m 20 — в табах L и пунктах меню. */
  size?: 's' | 'm';
  /** neutral — количество (квадрат с обводкой, цифра text-secondary); accent — новое, требует внимания; danger — ошибки и проблемы. */
  tone?: 'neutral' | 'accent' | 'danger';
  value?: ReactNode;
}

export interface StatusProps {
  /** s — таблицы (12); m — карточки и шапки (14). Точка 6 у обоих. */
  size?: 's' | 'm';
  /** success — работает; warning — нестабилен; danger — не работает; info — в процессе; neutral — выключен, нет данных. */
  tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  label?: ReactNode;
  /** false — только точка (ячейка под заголовком «Статус», легенда); подпись уходит в aria-label. */
  showLabel?: boolean;
}

export interface AvatarProps {
  /** xs 20 — таблицы, чипы; s 32 — списки, шапка; m 40 — карточки; l 56 — профиль. */
  size?: 'xs' | 's' | 'm' | 'l';
  /** image — есть фото; text — одна буква имени; icon — нет ни фото, ни имени. По умолчанию — по данным. */
  type?: 'text' | 'icon' | 'image';
  /** Одна заглавная буква. */
  initials?: string;
  /** Доступное имя; без initials — первая буква. */
  name?: string;
  src?: string;
  alt?: string;
  icon?: ReactNode;
  /** Точка «в сети» — только где присутствие имеет смысл. */
  status?: boolean;
  skeleton?: boolean;
}

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Подпись «или» между равноправными способами; только horizontal. */
  label?: boolean;
  labelText?: ReactNode;
  /** solid — по умолчанию. Во Vue — `variant`. */
  style?: 'solid' | 'dotted';
}

export interface SpinnerProps {
  /** s 16 · m 20 (как иконка в контроле) · l 24 — по соседней иконке или тексту. */
  size?: 's' | 'm' | 'l';
  /** aria-label; дольше 10 с — добавить видимый текст. */
  label?: string;
}

export interface ProgressProps {
  /** s — дорожка 4 (строки, карточки); m — 8 (отдельный блок). */
  size?: 's' | 'm';
  /** accent — нейтральный; success — цель достигнута; warning — ≥ 80 % лимита; danger — лимит превышен. */
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  /** indeterminate — доля неизвестна; только accent. */
  mode?: 'determinate' | 'indeterminate';
  label?: ReactNode;
  /** Текст справа: «6 000 / 10 000 USDT». */
  value?: ReactNode;
  /** Доля 0–100 — ширина заполнения. */
  percent?: number;
  showLabel?: boolean;
}

export interface AmountProps {
  /** s 12 — строки списков и таблиц на Compact; m 14 — карточки и таблицы Web; l 24 Bold (тикер 24 Medium) — заголовок блока, итоги; xl — главный баланс (один на экран). S / M — шрифт текста с табличными цифрами. */
  size?: 's' | 'm' | 'l' | 'xl';
  /** positive — поступление «+», цвет успеха; negative — списание «−» (U+2212), не красный; none — остаток, цена. */
  sign?: 'none' | 'positive' | 'negative';
  /** Число без знака — знак ставит sign. */
  value?: ReactNode;
  ticker?: ReactNode;
  /** «≈ 2 731,40 $». */
  fiat?: ReactNode;
  showFiat?: boolean;
  /** end — в Trailing строки (выравнивание по правому краю). */
  align?: 'start' | 'end';
}

export interface CardProps {
  /** По вложенности: 1 — на странице; 2 — внутри карточки; 3 — во вложенном блоке; 0 — белая на L1, только с border. */
  level?: 0 | 1 | 2 | 3;
  /** container — карточки в сетке; surface — крупные блоки; inner — вложенные плашки. */
  radius?: 'container' | 'surface' | 'inner';
  /** s 12 · m 16 · l 24 × 32 (сверху-снизу × по бокам) — один на группу карточек. */
  padding?: 's' | 'm' | 'l';
  /** Обводка border-subtle вне раскладки. */
  border?: boolean;
  /** Кликабельная карточка: ссылка на всю площадь. */
  href?: string;
  /** Кликабельная карточка: кнопка на всю площадь. */
  onClick?: () => void;
  as?: string;
  children?: ReactNode;
}

export interface StatCardProps {
  /** neutral — по умолчанию; danger / warning / success — плитки статусной сводки (Отключённые / Нестабильные / Активные): подложка status-*-subtle, значение text-*. */
  tone?: 'neutral' | 'danger' | 'warning' | 'success';
  /** start — по умолчанию; center — плитки-счётчики статусов воркеров: всё по центру, поля 4 по бокам и 32 снизу. */
  align?: 'start' | 'center';
  /** Что и за какой период: «Хешрейт · 24 ч». */
  label?: ReactNode;
  value?: ReactNode;
  unit?: ReactNode;
  info?: boolean;
  /** Определение метрики — тултип у «i». */
  infoText?: ReactNode;
  delta?: boolean;
  /** «+4,2 %» — Badge S. */
  deltaValue?: ReactNode;
  /** success — рост; danger — падение; neutral — без изменений. */
  deltaTone?: 'success' | 'danger' | 'neutral';
  /** «к вчера». */
  deltaCaption?: ReactNode;
  showFooter?: boolean;
  /** Спарклайн, мини-график или ссылка. */
  footer?: ReactNode;
  /** Icon button XS со стрелкой в правом нижнем углу — плитка ведёт в список (Danger — Secondary Danger, иначе Tertiary). */
  link?: boolean;
  /** aria-label и тултип кнопки-ссылки. */
  linkLabel?: string;
  onLink?: () => void;
  /** Только одна герой-карточка на экран (Expressive). */
  ambientLight?: boolean;
  /** Загрузка дольше 1 с — три полосы, высота как у Default. */
  skeleton?: boolean;
}

export interface TooltipProps {
  /** top — по умолчанию; bottom — не помещается сверху; start / end — у бокового края, в вертикальной навигации. */
  placement?: 'top' | 'bottom' | 'start' | 'end';
  tone?: 'neutral' | 'accent';
  /** center — по умолчанию; start / end — элемент у края или широкий. */
  arrow?: 'center' | 'start' | 'end';
  text?: ReactNode;
  /** Триггер. Без него рендерится сам пузырь (макет). */
  children?: ReactNode;
  /** true — показан всегда; false — не показывать. */
  open?: boolean;
}

export interface ToastProps {
  /** card — Web (справа сверху); informer — App (полоса под статус-баром). */
  layout?: 'card' | 'informer';
  /** info — фоновая операция (цвет бренда); success; warning — с оговоркой; danger — не выполнено; neutral — без оценки, без иконки. */
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  title?: ReactNode;
  showTitle?: boolean;
  description?: ReactNode;
  showDescription?: boolean;
  /** true — одна Button (actionLabel / onAction); или свои кнопки Button size="s". Только card. */
  actions?: boolean | ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  close?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  /** Иконка тона (card); у neutral иконки нет. */
  icon?: boolean;
  /** Circle timer у крестика — оставшееся время (нужен duration). */
  timer?: boolean;
  /** Автоскрытие, мс; пауза при наведении. */
  duration?: number;
  /** informer: отступ под статус-бар. */
  safeArea?: boolean;
  /** Управляемый показ. */
  open?: boolean;
}

export interface SuggestProps {
  /** card — в колонке или карточке; strip — вверху страницы на всю ширину: плашка radius-inner, заголовок label-md цвета тона, без иконки. */
  layout?: 'card' | 'strip';
  /** neutral — по умолчанию; accent — предложение, объявление (Info = accent); success / warning / danger — системное объявление. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  title?: ReactNode;
  showTitle?: boolean;
  description?: ReactNode;
  showDescription?: boolean;
  /** По умолчанию: card — вкл; strip — выкл (полоса без иконки, 17.11), если не передан leading. */
  showLeading?: boolean;
  /** Слот Leading: по умолчанию иконка тона; логотип продукта или Coin. */
  leading?: ReactNode;
  /** Основная кнопка: на neutral — Secondary, на остальных тонах — Primary. */
  primaryAction?: boolean;
  primaryLabel?: ReactNode;
  onPrimary?: () => void;
  /** Только вместе с primaryAction. */
  secondaryAction?: boolean;
  secondaryLabel?: ReactNode;
  onSecondary?: () => void;
  close?: boolean;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
}

export interface TabProps {
  /** s 32 — в виджете; m 48 — App, мобильный веб; l 56 — Web; page 64 — табы-заголовок страницы (было xl до 2026-11-17). По умолчанию — от Tabs. */
  size?: 's' | 'm' | 'l' | 'page';
  /** Внутри Tabs выбор — по value. */
  selected?: boolean;
  value?: string | number;
  label?: ReactNode;
  /** Число в Counter (в Figma — булево Counter). */
  counter?: ReactNode;
  counterTone?: 'neutral' | 'accent' | 'danger';
  /** Только если иконка у всех табов. */
  icon?: ReactNode;
  /** Точка статуса перед подписью — табы-фильтры по статусу («Активные» success, «Нестабильные» warning, «Отключённые» danger). */
  statusDot?: boolean;
  statusTone?: StatusTone;
  disabled?: boolean;
  skeleton?: boolean;
}
export interface TabsProps extends Controlled<string | number> {
  size?: 's' | 'm' | 'l' | 'page';
  /** 2–6 вкладок (в Figma — Tab 3 … Tab 6). Или дети Tab с value. */
  items?: Array<TabProps & { value?: string | number }>;
  /** aria-label бара. */
  label?: string;
  children?: ReactNode;
}

export interface SegmentProps {
  selected?: boolean;
  value?: string | number;
  /** neutral — по умолчанию; accent — режим с промо или главным действием (редко). По умолчанию — от Segmented. */
  tone?: 'neutral' | 'accent';
  label?: ReactNode;
  /** false — только иконка; label уходит в aria-label. */
  showLabel?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
}
export interface SegmentedProps extends Controlled<string | number> {
  /** = размер соседнего поля или кнопки: s 32 · m 40 · l 48 (XL снят 2026-11-17: Web — m, App — l). Сегмент не уже s 64 · m 80 · l 96. */
  size?: 's' | 'm' | 'l';
  /** 2–4 значения (в Figma — Items 2 · 3 · 4). Больше 4 — Select. Или дети Segment. */
  items?: Array<SegmentProps & { value?: string | number }>;
  tone?: 'neutral' | 'accent';
  /** aria-label группы. */
  label?: string;
  /** На всю ширину контейнера. */
  block?: boolean;
  children?: ReactNode;
}

export interface ListItemProps {
  /** l — Web (16 / 14); m — Compact (14 / 12). Один размер в списке. */
  size?: 'l' | 'm';
  /** text-first — название, под ним описание; description-first — наоборот; big-value — описание над крупным значением; description-only — одна строка. */
  content?: 'text-first' | 'description-first' | 'big-value' | 'description-only';
  label?: ReactNode;
  description?: ReactNode;
  /** false — строка из одного названия (19.11; во всех content, кроме description-only). По умолчанию true. */
  showDescription?: boolean;
  /** big-value: крупное значение. */
  value?: ReactNode;
  /** big-value: единица. */
  subvalue?: ReactNode;
  /** Иконка, монета, аватар. */
  leading?: ReactNode;
  /** Сумма (Amount), Badge, шеврон, Toggle — справа. */
  trailing?: ReactNode;
  divider?: boolean;
  disabled?: boolean;
  /** Строка открывает детали (Hover / Pressed). */
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export interface TransactionProps {
  /** withdrawal — вывод; deposit — пополнение; reward — начисление за майнинг; exchange — обмен (без знака). */
  type?: 'withdrawal' | 'deposit' | 'reward' | 'exchange';
  /** completed «Выполнено»; pending «В обработке»; failed «Отклонено» (без знака). */
  status?: 'completed' | 'pending' | 'failed';
  /** Действие + монета: «Вывод BTC», «Обмен BTC → USDT». */
  label?: ReactNode;
  /** Дата. */
  description?: ReactNode;
  /** Сумма без знака — знак по type и status. */
  value?: ReactNode;
  ticker?: ReactNode;
  statusLabel?: ReactNode;
  href?: string;
  /** Открыть детали (Side panel / Sheet). */
  onClick?: () => void;
}

export interface MenuItemProps {
  /** m 44 — действия и списки; l 56 — монета, кошелёк, сеть. По умолчанию — от Menu. */
  size?: 'm' | 'l';
  /** danger — разрушающее; последним, после разделителя. */
  tone?: 'default' | 'danger';
  label?: ReactNode;
  description?: ReactNode;
  /** Иконка 20 / 24, монета 32 (только l), аватар. */
  leading?: ReactNode;
  /** Badge, Counter, значение, шеврон подменю. */
  trailing?: ReactNode;
  /** Галочка у выбранного (одиночный выбор). С showSelection — состояние глифа Checkbox. */
  selected?: boolean;
  defaultSelected?: boolean;
  /** Множественный выбор — глиф Checkbox слева. */
  showSelection?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
export type MenuEntry = (MenuItemProps & { value?: string | number }) | { group: ReactNode } | { divider: true };
export interface MenuProps {
  size?: 'm' | 'l';
  /** Поиск — от 10 пунктов. */
  search?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  /** Пункты, подписи групп ({ group }) и разделители ({ divider: true }). Или дети MenuItem. */
  items?: MenuEntry[];
  /** menu — действия; listbox — список выбора (Select). */
  role?: 'menu' | 'listbox';
  label?: string;
  children?: ReactNode;
}

export interface SelectOption { value: string | number; label: ReactNode; description?: ReactNode; leading?: ReactNode; disabled?: boolean; }
export interface SelectProps extends Controlled<string | number> {
  /** = размер соседних полей формы (XL снят 2026-11-17). */
  size?: 'm' | 'l';
  /** Лейбл всегда над полем. */
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  state?: 'default' | 'error' | 'disabled' | 'loading' | 'skeleton';
  /** «Выберите …» — что выбрать. */
  placeholder?: ReactNode;
  /** 5+ вариантов; 2–4 — Segmented или Radio. */
  options?: SelectOption[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Монета / сеть выбранного значения (если у option нет своего leading). */
  leading?: ReactNode;
  menuSize?: 'm' | 'l';
}

export interface PasswordRequirement { label: ReactNode; test: (value: string) => boolean; }
export interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue'> {
  label?: ReactNode;
  placeholder?: string;
  /** true — создание и смена пароля; false — вход (поле и «Забыли пароль?»). */
  showRequirements?: boolean;
  /** По умолчанию: 8 символов, цифра, заглавная и строчная, спецсимвол. */
  requirements?: PasswordRequirement[];
  /** error — только после отправки или ухода из поля. */
  state?: 'default' | 'error' | 'disabled';
  error?: ReactNode;
  hint?: ReactNode;
  value?: string;
  defaultValue?: string;
  /** Пароль показан («глаз»). */
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  size?: 'm' | 'l';
  labelPosition?: 'above' | 'on-border';
}

export declare function Counter(props: CounterProps): JSX.Element;
export declare function Status(props: StatusProps): JSX.Element;
export declare function Avatar(props: AvatarProps): JSX.Element;
export declare function Divider(props: DividerProps): JSX.Element;
export declare function Spinner(props: SpinnerProps): JSX.Element;
export declare function Progress(props: ProgressProps): JSX.Element;
export declare function Amount(props: AmountProps): JSX.Element;
export declare function Card(props: CardProps): JSX.Element;
export declare function StatCard(props: StatCardProps): JSX.Element;
export declare function Tooltip(props: TooltipProps): JSX.Element;
export declare function Toast(props: ToastProps): JSX.Element | null;
export declare function Suggest(props: SuggestProps): JSX.Element | null;
export declare function Tab(props: TabProps): JSX.Element;
export declare function Tabs(props: TabsProps): JSX.Element;
export declare function Segment(props: SegmentProps): JSX.Element;
export declare function Segmented(props: SegmentedProps): JSX.Element;
export declare function ListItem(props: ListItemProps): JSX.Element;
export declare function Transaction(props: TransactionProps): JSX.Element;
export declare function MenuItem(props: MenuItemProps): JSX.Element;
export declare function Menu(props: MenuProps): JSX.Element;
export declare function Select(props: SelectProps): JSX.Element;
export declare function PasswordField(props: PasswordFieldProps): JSX.Element;
