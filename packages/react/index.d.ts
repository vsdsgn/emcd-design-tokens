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
  /** Иконка слева — цвета подписи (currentColor); зазор до подписи 4 (XS — 2). */
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
  /** Загрузка (State=Skeleton): плашка skeleton/base того же размера, не нажимается, aria-hidden. */
  skeleton?: boolean;
  onClick?: () => void;
}

interface CheckBase {
  label?: ReactNode;
  description?: ReactNode;
  /** Бейдж после подписи (Badge S Accent Subtle, 21.11): выгода или новизна опции — «8% APR». */
  badge?: ReactNode;
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

export interface SkeletonProps {
  /** По форме будущего контента: text — строка (12), title — заголовок (20), circle — аватар / монета, rect — картинка, блок. */
  shape?: 'text' | 'title' | 'circle' | 'rect';
  /** Ширина ожидаемого контента (число — px). */
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: Record<string, unknown>;
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
  /** Цвет суммы и тикера без знака (только sign none, 19.11): success — итог дохода (Калькулятор); danger — расход. Знак и цвет вместе — sign. */
  tone?: 'default' | 'success' | 'danger';
  /** Число без знака — знак ставит sign. */
  value?: ReactNode;
  ticker?: ReactNode;
  /** «≈ 2 731,40 $». */
  fiat?: ReactNode;
  showFiat?: boolean;
  /** end — в Trailing строки (выравнивание по правому краю). */
  align?: 'start' | 'end';
  /** Загрузка (State=Skeleton): строка значения — плашка высотой строки размера, фиат — короче (если showFiat); sign не применяется. */
  skeleton?: boolean;
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
  /** Ambient light (19.11): пятно light/ambient справа сверху, обрезано радиусом; в Base прозрачное (видно в Expressive). Одна герой-карточка на экран; содержимое не выходит за карточку. */
  ambientLight?: boolean;
  /** Кликабельная карточка: ссылка на всю площадь. */
  href?: string;
  /** Кликабельная карточка: кнопка на всю площадь. */
  onClick?: () => void;
  as?: string;
  children?: ReactNode;
}

export interface SectionHeaderProps {
  /** l — heading/lg, раздел страницы на фоне («Площадки», h2); m — label/lg 16 Medium (секция карточки: «Переводить на Coinhold»); s — label/md 14 Medium (подсекция: «Сколько переводить?»). */
  size?: 'l' | 'm' | 's';
  /** Уровень заголовка: h2–h4 (по умолчанию h3 — секция внутри страницы с h1 / h2). */
  level?: 2 | 3 | 4;
  title: ReactNode;
  /** Строка под заголовком — body/sm text/secondary. */
  caption?: ReactNode;
  /** По умолчанию — есть ли caption. */
  showCaption?: boolean;
  /** Слот справа: Toggle, Button Text, Badge, Select compact (или children). */
  trailing?: ReactNode;
  /** По умолчанию — есть ли trailing / children. */
  showTrailing?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface PageHeaderProps {
  /** large — Web (Large+): Heading/XL, действия справа; compact — под Top bar на корневых экранах App / мобильного веба: Heading/LG, действия рядом под заголовком (переносятся). */
  size?: 'large' | 'compact';
  /** Уровень заголовка: h1–h3 (по умолчанию h1 — заголовок страницы). */
  level?: 1 | 2 | 3;
  title: ReactNode;
  /** Сводка одной строкой (body/md text/secondary), не описание раздела. */
  subtitle?: ReactNode;
  /** По умолчанию — есть ли subtitle. */
  showSubtitle?: boolean;
  /** Слот Breadcrumbs — только на вложенных страницах Web (2+ уровня); оборачивается в nav с aria-label. Нет слота — крошек нет (Figma Breadcrumbs = Off). */
  breadcrumbs?: ReactNode;
  /** aria-label навигации крошек (по умолчанию «Хлебные крошки»). */
  breadcrumbsLabel?: string;
  /** Слот Actions — до двух Button M (Secondary + Primary). Large — справа от текста; Compact — ряд под заголовком с переносом. */
  actions?: ReactNode;
  /** По умолчанию — есть ли actions (на корневых экранах App действия — в Top bar: false). */
  showActions?: boolean;
  /** Слот Tabs — Tabs того же размера, что шапка; всегда последним, контент сразу под ним. */
  tabs?: ReactNode;
  /** По умолчанию — есть ли tabs. */
  showTabs?: boolean;
  className?: string;
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
  /** Icon button XS с шевроном `chevron-right` в правом нижнем углу — плитка ведёт в список (Danger — Secondary Danger, иначе Tertiary). */
  link?: boolean;
  /** aria-label и тултип кнопки-ссылки. */
  linkLabel?: string;
  onLink?: () => void;
  /** Только одна герой-карточка на экран (Expressive). */
  ambientLight?: boolean;
  /** Загрузка дольше 1 с — полосы подписи, числа и дельты (дельта — при delta), высота как у Default; тон в загрузке — neutral. */
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
  /** Compact (мобильный веб, App, 20.11): вкладки делят ширину поровну, если все помещаются без прокрутки. На Web (Large+) — false, по содержимому. */
  fill?: boolean;
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
  /** false (19.11) — без боковых полей и мин. высоты: список внутри Card (край текста = край заголовка карточки; M в одну строку — 48). Отдельный список на экране — true. По умолчанию true. */
  inset?: boolean;
  disabled?: boolean;
  /** Строка открывает детали (Hover / Pressed). */
  href?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export interface TransactionProps {
  /** withdrawal — вывод; deposit — пополнение; reward — начисление за майнинг; exchange — обмен (без знака). */
  type?: 'withdrawal' | 'deposit' | 'reward' | 'exchange';
  /** completed — без Status (19.11): справа сумма и фиат; pending «В обработке», failed «Отклонено» (без знака) — с Status. */
  status?: 'completed' | 'pending' | 'failed';
  /** Действие + монета: «Вывод BTC», «Обмен BTC → USDT». */
  label?: ReactNode;
  /** false — без плашки типа (история начислений App, 17.11). По умолчанию true. */
  showLeading?: boolean;
  /** Дата. */
  description?: ReactNode;
  /** Сумма без знака — знак по type и status. */
  value?: ReactNode;
  ticker?: ReactNode;
  /** Фиат «≈ $12.40» под суммой — только у completed. */
  fiat?: ReactNode;
  /** Своё слово статуса (pending, failed). */
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
  /** above — по умолчанию (формы); on-border — в разрыве рамки: панели фильтров и калькуляторы (patterns.md 0, п. 12; экраны «История» 19.11). */
  labelPosition?: 'above' | 'on-border';
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
export declare function Skeleton(props: SkeletonProps): JSX.Element;
export declare function Progress(props: ProgressProps): JSX.Element;
export declare function Amount(props: AmountProps): JSX.Element;
export declare function Card(props: CardProps): JSX.Element;
/** Section header — заголовок секции внутри карточки или формы (draft). */
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
/** Page header — шапка страницы: заголовок h1, подзаголовок, крошки, действия, табы (beta). */
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
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

// ───────────── Пачка 3 — экраны майнинга ─────────────
type IconSlot = string | ReactNode;
type Series = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface IconProps {
  /** Имя иконки DS (`icons/svg/<name>.svg`; реестр — scripts/icons-code.mjs): sort, sort-line-down, chevron-down, chart-bar, file-excel, wallet, mining-coin… */
  name: string;
  /** sm 16 · md 20 · lg 24 · xl 32 (`icon/size/*`); цвет — currentColor. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Смысловая иконка — role=img + aria-label; без label — декоративная (aria-hidden). */
  label?: string;
  className?: string;
}
export interface CoinProps {
  /** Тикер (btc, kas, ltc, doge) или имя файла Symbols (bitcoin-btc); нет в Symbols — нейтральный круг с первой буквой. */
  coin?: string;
  /** xs 16 · s 20 · m 24 · l 32 · xl 40 — по высоте строки или контрола. */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /** Монета сети в правом нижнем углу (USDT TRC-20 / ERC-20); у XS нет. */
  network?: boolean;
  networkCoin?: string;
  skeleton?: boolean;
  /** Доступное имя; без него монета декоративна — название текстом рядом. */
  label?: string;
  className?: string;
}
export interface CoinStackProps {
  /** Тикеры по значимости: первая — главная. */
  coins: string[];
  /** s — монеты 24 · m — 32 · l — 40; нахлёст size/overlap. */
  size?: 's' | 'm' | 'l';
  /** Сколько монет показать: 2 | 3 | 4 (по умолчанию все, не больше 4). */
  count?: 2 | 3 | 4;
  /** Кружок «+N» — по умолчанию, когда монет больше count. */
  showMore?: boolean;
  more?: ReactNode;
  label?: string;
  className?: string;
}
export interface NavItemProps {
  label: ReactNode;
  /** Имя иконки DS или узел; обязательна, одна стилистика. */
  icon?: IconSlot;
  href?: string;
  /** Текущий раздел — ровно один на сайдбар: aria-current="page". */
  selected?: boolean;
  /** Свёрнутый сайдбар: только иконка, подпись — Tooltip и aria-label. */
  collapsed?: boolean;
  /** Counter Danger (число или true) — только то, что требует действия. */
  counter?: boolean | number | string;
  /** Метка справа: true + badgeLabel / badgeTone → Badge S, или свой узел Badge. С counter не показывается. */
  badge?: boolean | ReactNode;
  badgeLabel?: ReactNode;
  badgeTone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  onClick?: (e: unknown) => void;
  className?: string;
}
export interface KeyValueRowProps {
  /** Total — итог: одна на сводку, последней (линия сверху, Medium); Muted — второстепенная. */
  emphasis?: 'default' | 'total' | 'muted';
  /** Точечная линия от названия к значению — широкая строка. */
  leader?: boolean;
  /** Название (Key в Figma): `key` зарезервирован в React и Vue. До двух строк. */
  label: ReactNode;
  /** Значение в формате локали с единицей; одна строка до 200. */
  value?: ReactNode;
  /** Загрузка (State=Skeleton): название остаётся, значение — плашка той же высоты. */
  skeleton?: boolean;
  className?: string;
}
export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** s 32 · m 40. */
  size?: 's' | 'm';
  /** Подсказка («Поиск воркеров»); то же, что placeholder. */
  text?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: unknown) => void;
  onClear?: (event: unknown) => void;
  clearLabel?: string;
  /** Доступное имя; по умолчанию — подсказка. */
  label?: string;
}
export interface SelectCompactOption { value: string | number; label: string; coin?: string; leading?: ReactNode; description?: ReactNode; disabled?: boolean }
export interface SelectCompactProps {
  /** Подпись значения; по умолчанию — выбранная опция. */
  text?: string;
  /** Что выбирается — доступное имя «Монета: KAS». */
  label?: string;
  /** Список (Menu listbox); без options — только кнопка: свой Menu / Sheet через onOpenChange. */
  options?: SelectCompactOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Coin или Coin stack; по умолчанию — монета опции. */
  leading?: ReactNode;
  showLeading?: boolean;
  disabled?: boolean;
  menuSize?: 'm' | 'l';
  className?: string;
}
/** Дата — ISO «ГГГГ-ММ-ДД» (или Date); период — { from, to }. */
export type DateValue = string | Date;
export interface DateRange { from: DateValue | null; to: DateValue | null }
export interface DateRangeFieldProps {
  label?: ReactNode;
  /** Готовые строки дат в формате локали («01.11.26»); между ними — направленная стрелка. Со встроенной панелью — из value. */
  from?: string;
  to?: string;
  placeholder?: string;
  /** Ограничение периода — до выбора; error — после (вместо hint). */
  hint?: ReactNode;
  error?: ReactNode;
  state?: 'default' | 'error' | 'disabled' | 'skeleton';
  labelPosition?: 'on-border' | 'above';
  /** Панель продукта: нажатие, Enter, Space, ↓. Вызывается и со встроенной панелью. */
  onOpen?: (event: unknown) => void;
  /** Встроенный поповер с Date range panel (true или её props). Без него — только onOpen. */
  panel?: boolean | DateRangePanelProps;
  /** Применённый период (ISO); без value — неуправляемый (defaultValue). onChange — по «Применить». */
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: { from: string; to: string }) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Формат даты в поле; по умолчанию — локаль, дд.мм.гг. */
  formatDate?: (iso: string) => string;
  locale?: string;
  className?: string;
}
export type DateCellState = 'default' | 'today' | 'selected' | 'range-start' | 'range-middle' | 'range-end' | 'outside';
export interface DateCellProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Число дня 1–31 (не переводится, не зеркалится). */
  day?: ReactNode;
  /** Одно смысловое состояние на день; Hover / Pressed / Focus — из платформы. */
  state?: DateCellState;
  /** Недоступен: зачёркнут, без click (aria-disabled, фокус остаётся для клавиатуры). */
  disabled?: boolean;
  /** Полная дата для озвучки («14 октября 2026»). */
  label?: string;
}
export interface CalendarProps {
  /** single — одна дата; range — период (первый выбор — начало, второй — конец). */
  mode?: 'single' | 'range';
  /** single — ISO-дата; range — { from, to }. Без value — неуправляемый. */
  value?: DateValue | DateRange | null;
  defaultValue?: DateValue | DateRange | null;
  /** Выбрана дата (single) или обе даты периода (range). */
  onChange?: (value: any) => void;
  /** Показанный месяц (любая дата месяца). */
  month?: DateValue;
  defaultMonth?: DateValue;
  onMonthChange?: (month: string) => void;
  /** «Сегодня» — обводкой (по умолчанию — текущая дата). */
  today?: DateValue;
  min?: DateValue;
  max?: DateValue;
  /** Недоступные даты (будущие для истории) — Date cell Disabled. */
  isDateDisabled?: (iso: string) => boolean;
  /** Локаль: месяц, дни недели, озвучка; неделя — по CLDR (ru — с понедельника). */
  locale?: string;
  /** 0 — воскресенье … 6; по умолчанию — по локали. */
  weekStart?: number;
  prevLabel?: string;
  nextLabel?: string;
  selectedLabel?: string;
  /** Esc в сетке — закрыть контейнер (Dropdown panel, Sheet). */
  onEscape?: (event: unknown) => void;
  /** Без своей подложки, тени и полей — внутри Date range panel. */
  plain?: boolean;
  label?: string;
  className?: string;
}
export interface DatePreset { value: string; label: ReactNode; days?: number; months?: number; range?: (today: string) => DateRange }
export interface DateRangePanelProps {
  /** true — пресеты слева (Web); false — без них (мобильный, в Sheet). */
  presets?: boolean;
  /** По умолчанию: Сегодня · 7 дней · 30 дней · Квартал · Год · Свой период. */
  presetItems?: DatePreset[];
  preset?: string;
  defaultPreset?: string;
  onPresetChange?: (value: string | undefined) => void;
  /** Период в календаре (черновик до «Применить»). */
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: { from: string; to: string }) => void;
  /** «Применить»; Web — только по кнопке, applyOnSelect — сразу по второй дате (по умолчанию при presets=false). */
  onApply?: (range: { from: string; to: string }) => void;
  applyOnSelect?: boolean;
  onReset?: () => void;
  /** Esc — закрыть без применения. */
  onClose?: (event: unknown) => void;
  showReset?: boolean;
  resetLabel?: string;
  applyLabel?: string;
  /** aria-label диалога. */
  label?: string;
  presetsLabel?: string;
  today?: DateValue;
  min?: DateValue;
  max?: DateValue;
  isDateDisabled?: (iso: string) => boolean;
  locale?: string;
  weekStart?: number;
  id?: string;
  className?: string;
}
export interface PageIndicatorProps {
  /** 2–5 слайдов; больше — счётчик «3 / 12». */
  count?: number;
  /** Номер текущего слайда с 1. */
  selected?: number;
  /** Точки кликабельны (есть свайп или стрелки); без него — декоративны. */
  onSelect?: (n: number, event: unknown) => void;
  label?: string;
  className?: string;
}
export interface LegendSwatchProps {
  /** dot — столбцы, области; line — линии (серии 5–8 пунктиром). */
  marker?: 'dot' | 'line';
  /** 1 — border/accent (основная серия), 2–8 — data/2…8. */
  series?: Series;
  className?: string;
}
export interface LegendItemProps {
  label: ReactNode;
  value?: ReactNode;
  showValue?: boolean;
  selected?: boolean;
  marker?: 'dot' | 'line';
  series?: Series;
  skeleton?: boolean;
  /** Кликабельная легенда — скрыть / показать серию (aria-pressed). */
  onClick?: (e: unknown) => void;
  className?: string;
}
export interface ChartMetricProps {
  /** Смысл значения, не оценка. */
  tone?: 'default' | 'danger' | 'warning' | 'success';
  label: ReactNode;
  value?: ReactNode;
  unit?: ReactNode;
  showUnit?: boolean;
  /** true — lightning; имя иконки DS или узел; цвет — как у значения. */
  icon?: boolean | IconSlot;
  /** Загрузка (State=Skeleton): подпись остаётся, строка значения — плашка той же высоты; value не нужен. */
  skeleton?: boolean;
  className?: string;
}
export type SortDir = 'none' | 'ascending' | 'descending';
export interface TableHeaderCellProps {
  /** start — текст, даты; end — числа и суммы. */
  align?: 'start' | 'end';
  /** Без sort — неуправляемый от defaultSort; клик: None → Descending → Ascending. */
  sort?: SortDir;
  defaultSort?: SortDir;
  onSort?: (sort: SortDir) => void;
  sortable?: boolean;
  label: ReactNode;
  showFilter?: boolean;
  showInfo?: boolean;
  infoLabel?: string;
  skeleton?: boolean;
  width?: number | string;
  className?: string;
}
export interface TableCellProps {
  align?: 'start' | 'end';
  /** Две строки текста по умолчанию; иначе — children (атом DS: Coin, Amount, Status, Icon button…). */
  primary?: ReactNode;
  secondary?: ReactNode;
  children?: ReactNode;
  skeleton?: boolean;
  disabled?: boolean;
  className?: string;
}
export interface TableRowProps {
  /** compact 48 — одна строка; regular 64 — две строки и медиа. Одна плотность на таблицу. */
  density?: 'compact' | 'regular';
  selected?: boolean;
  /** Строка открывает детали: Hover / Pressed, Tab + Enter. */
  onClick?: (e: unknown) => void;
  children?: ReactNode;
  className?: string;
}
export interface TableColumn<R = any> { key: string; label: ReactNode; align?: 'start' | 'end'; sortable?: boolean; width?: number | string; render?: (row: R) => ReactNode }
export interface TableProps<R = any> {
  columns?: TableColumn<R>[];
  rows?: (R & { id?: string | number; selected?: boolean })[];
  density?: 'compact' | 'regular';
  /** Текущая сортировка; данные сортирует продукт. */
  sort?: { key: string; dir: SortDir } | null;
  defaultSort?: { key: string; dir: SortDir } | null;
  onSort?: (sort: { key: string; dir: SortDir }) => void;
  onRowClick?: (row: R, event: unknown) => void;
  skeletonRows?: number;
  label?: string;
  caption?: ReactNode;
  children?: ReactNode;
  className?: string;
}
export interface PromoCardProps {
  /** s — сайдбар (222); m — мобильный веб и App (335); l — дашборд Web (545). */
  size?: 's' | 'm' | 'l';
  /** accent — главная акция экрана: градиентная обводка, действие Primary. */
  tone?: 'neutral' | 'accent';
  /** center — анонс без картинки и закрытия: бейдж над заголовком. */
  align?: 'start' | 'center';
  title: ReactNode;
  description?: ReactNode;
  showDescription?: boolean;
  showAction?: boolean;
  actionLabel?: ReactNode;
  onAction?: (e: unknown) => void;
  showMedia?: boolean;
  /** Картинка: src или узел; alt пустой — смысла без текста не несёт. */
  media?: string | ReactNode;
  showClose?: boolean;
  onClose?: (e: unknown) => void;
  closeLabel?: string;
  showBadge?: boolean;
  badgeLabel?: ReactNode;
  children?: ReactNode;
  className?: string;
}
export interface SidebarNavEntry extends Partial<NavItemProps> { divider?: boolean; key?: string | number }
export interface SidebarProps {
  /** Рейка 72: только иконки, подписи в Tooltip; промо скрыто. */
  collapsed?: boolean;
  /** Кнопка «свернуть / развернуть» (aria-expanded). */
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: ReactNode;
  logo?: ReactNode;
  /** Язык — Button Tertiary XS («RU»). */
  language?: ReactNode;
  onLanguage?: (e: unknown) => void;
  /** Главное действие — Button Primary S на всю ширину. */
  cta?: ReactNode;
  nav?: ReactNode;
  items?: SidebarNavEntry[];
  /** Promo card S; false — без промо. */
  promo?: boolean | ReactNode;
  footer?: ReactNode;
  account?: { name: string; link?: ReactNode; src?: string; onClick?: (e: unknown) => void };
  label?: string;
  className?: string;
}
export interface ChartSeries {
  name?: string;
  data: number[];
  /** Единица в тултипе («TH/s»); format — своё значение. */
  unit?: string;
  format?: (value: number) => string;
  /** Маркер в тултипе — как в легенде. */
  marker?: 'dot' | 'line';
}
export interface ChartCrosshairProps {
  /** line — линии и области (линия + точки серий); bar — столбцы (полоса). */
  target?: 'line' | 'bar';
  /** Положение по X, % ширины области графика. */
  x?: number;
  /** Точки серий: y — % высоты сверху, series — цвет 1–8. */
  points?: { y: number; series?: number }[];
  /** Ширина полосы (bar), %. */
  band?: number;
  className?: string;
  style?: Record<string, unknown>;
}
export interface ChartTooltipRow { label: ReactNode; value: ReactNode; series?: number; marker?: 'dot' | 'line'; tone?: 'default' | 'danger' | 'warning' }
export interface ChartTooltipProps {
  /** 1–4 строки (Figma Rows); больше — первые 4 и «+N». */
  rows?: ChartTooltipRow[];
  date?: ReactNode;
  time?: ReactNode;
  /** Шапка с датой и временем. */
  showDate?: boolean;
  moreLabel?: ReactNode;
  /** role=status + aria-live=polite; false — когда озвучивает график. */
  live?: boolean;
  className?: string;
  style?: Record<string, unknown>;
}
export interface ChartPlotProps {
  /** line-bars — хешрейт + реджекты на второй оси; dual-area — две величины; stacked-bars — доли по статусам. */
  type?: 'bars' | 'line' | 'area' | 'line-bars' | 'multi-line' | 'dual-area' | 'stacked-bars';
  /** Серия 1 — border/accent, далее data/2…8; вторая ось — data/4. */
  series?: ChartSeries[];
  /** Подписи X по точкам; показывается не больше xTicks (Web 6, мобильный 3). */
  labels?: string[];
  xTicks?: number;
  yLeft?: { ticks: number[] };
  yRight?: { ticks: number[] };
  format?: (value: number, axis: 'left' | 'right') => string;
  height?: number;
  state?: 'default' | 'skeleton' | 'empty' | 'disabled';
  emptyText?: string;
  /** Что показывает и за какой период (role=img; интерактивный — role=group «график»). */
  label?: string;
  /** Hover: Chart crosshair + Chart tooltip по указателю, касанию и стрелкам (← / →, Home / End, Enter — закрепить, Esc — скрыть); aria-live озвучивает точку. */
  interactive?: boolean;
  /** Выбранная точка (null — нет); без index — неуправляемый. */
  index?: number | null;
  defaultIndex?: number | null;
  onIndexChange?: (index: number | null) => void;
  /** Шапка тултипа: дата и время по точкам; по умолчанию дата — labels. */
  dates?: string[];
  times?: string[];
  /** Значение в тултипе, если у серии нет format. */
  valueFormat?: (value: number, seriesIndex: number) => string;
  className?: string;
}
export interface ChartCardProps {
  label?: string;
  metrics?: ChartMetricProps[];
  /** Период — ряд Chip (выбранный — белый); не Segmented. */
  periods?: { value: string | number; label: ReactNode }[];
  period?: string | number;
  defaultPeriod?: string | number;
  onPeriodChange?: (value: string | number) => void;
  /** s — Web; m — Compact (на всю ширину равными долями). */
  periodSize?: 's' | 'm';
  periodLabel?: string;
  /** Легенда — над графиком, в конце Top (19.11); две серии на двух осях — по краям. */
  legend?: LegendItemProps[];
  /** Bottom — итог за период. */
  sum?: ReactNode;
  showBottom?: boolean;
  top?: ReactNode;
  bottom?: ReactNode;
  /** Content — Chart plot. */
  children?: ReactNode;
  content?: ReactNode;
  className?: string;
}
export interface TopBarProps {
  /** mobile-web — логотип, аккаунт, баланс, «Меню»; app (19.11) — Select compact аккаунта в начале, Select compact монеты (Coin stack) + Icon button Tertiary M «+» в конце; без логотипа, баланса и меню. */
  platform?: 'mobile-web' | 'app';
  /** root — корневой экран раздела (по умолчанию); inner (20.11) — вложенный: «Назад» · заголовок по центру · одно действие справа. */
  level?: 'root' | 'inner';
  /** inner: заголовок экрана (h1). */
  title?: ReactNode;
  /** inner: «Назад». */
  onBack?: (e?: unknown) => void;
  /** inner: подпись «Назад» для читалки. По умолчанию «Назад». */
  backLabel?: string;
  /** inner: одно действие справа (Icon button Ghost M). */
  action?: ReactNode;
  /** Только mobile-web. По умолчанию — знак EMCD (logo-emcd, 24). */
  logo?: ReactNode;
  /** Имя аккаунта (app — подпись Select compact без leading). */
  account?: ReactNode;
  /** mobile-web — нажатие на аккаунт; app без accountOptions — открыть свой список (Sheet). */
  onAccount?: (e?: unknown) => void;
  /** app: список аккаунтов (Menu listbox Select compact). */
  accountOptions?: SelectCompactOption[];
  accountValue?: string | number;
  onAccountChange?: (value: string | number) => void;
  /** app: подпись монеты («BTC»). */
  coin?: string;
  /** app: тикеры Coin stack в leading монеты; по умолчанию [coin]. */
  coins?: string[];
  coinOptions?: SelectCompactOption[];
  coinValue?: string | number;
  onCoinChange?: (value: string | number) => void;
  /** app без coinOptions — открыть свой список монет. */
  onCoin?: () => void;
  /** app: Icon button Tertiary M «+». */
  onAdd?: (e: unknown) => void;
  /** Доступное имя «+» — «Подключить». */
  addLabel?: string;
  balance?: string;
  /** Копейки — text-tertiary («.78»). */
  cents?: string;
  showBalance?: boolean;
  onBalance?: (e: unknown) => void;
  onMenu?: (e: unknown) => void;
  menuLabel?: string;
  className?: string;
}
export interface StatusSummaryItem { tone: 'danger' | 'warning' | 'neutral' | 'success'; label: string; value?: ReactNode }
export interface StatusSummaryProps {
  /** column — Web (колонка у графика); row — Compact (ряд + «Все воркеры»). */
  layout?: 'column' | 'row';
  offline?: ReactNode;
  unstable?: ReactNode;
  active?: ReactNode;
  items?: StatusSummaryItem[];
  onItem?: (item: StatusSummaryItem, e: unknown) => void;
  showAllLink?: boolean;
  allLinkLabel?: ReactNode;
  onAllLink?: (e: unknown) => void;
  /** Загрузка: плитки Stat card Skeleton, Tone=Neutral, та же высота. */
  skeleton?: boolean;
  className?: string;
}
export interface PromoCarouselProps {
  /** 2–5 Promo card M. */
  slides?: ReactNode[];
  children?: ReactNode;
  label?: string;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}
export interface ActionBarProps {
  /** 1 — Primary; 2 — Tertiary поровну. */
  actions?: (Omit<ButtonProps, 'iconLeft'> & { iconLeft?: IconSlot })[];
  /** Бейдж автодействия (Badge S Neutral Subtle) над последней кнопкой, справа сверху (19.11; только с actions). По умолчанию false. */
  badge?: boolean;
  /** Текст бейджа. По умолчанию «A». */
  badgeText?: string;
  /** Доступное описание кнопки с бейджем (aria-describedby). По умолчанию «Автодействие включено». */
  badgeLabel?: string;
  children?: ReactNode;
  className?: string;
}

// ───────────── Пачка 5 (19.11) — App ─────────────
export interface FloatingButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** icon — круг 56 (только Primary L), однозначная иконка; extended — иконка + подпись до 20 знаков, при прокрутке вниз продукт сворачивает в icon. */
  layout?: 'icon' | 'extended';
  /** Только extended: l 56 — главное действие экрана-списка (поля 20, зазор 8); m 40 — вспомогательное поверх списка или дашборда (поля 16, зазор 6). */
  size?: 'l' | 'm';
  /** Только extended: primary — главное; secondary — нейтральное («Выгрузить»): action-secondary-default, подпись text-primary, иконка icon-primary. */
  type?: 'primary' | 'secondary';
  /** Подпись extended; у icon — доступное имя (aria-label). Обязательна. */
  label: string;
  /** Имя иконки DS или узел. По умолчанию plus. */
  icon?: IconSlot;
  /** Spinner L вместо иконки, нажатие блокируется. */
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}
export interface TabBarItemProps {
  /** item — раздел (иконка 24 + подпись); action — центральная мультикнопка App («E» → шит быстрых действий): плашка 56 × 40, только иконка, без selected; одна на Tab bar, по центру. */
  type?: 'item' | 'action';
  /** Текущий раздел: aria-current="page", icon-accent + text-accent. Ровно один в Tab bar. */
  selected?: boolean;
  /** Подпись — одно слово; у action — доступное имя (обязательно). */
  label: string;
  /** Имя иконки DS или узел (логотип у action). По умолчанию: item — dots-grid, action — logo-emcd (знак EMCD). */
  icon?: IconSlot;
  /** Точка без числа: в разделе есть то, что требует действия. */
  badgeDot?: boolean;
  /** Добавка к доступному имени при badgeDot. По умолчанию «есть уведомления». */
  badgeLabel?: string;
  href?: string;
  onClick?: (event: unknown) => void;
  className?: string;
}
export interface TabBarProps {
  /** 3–5 пунктов, порядок как в Sidebar; action — одна, по центру. value — ключ раздела (по умолчанию label). */
  items?: (TabBarItemProps & { value?: string | number })[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  /** Нажатие на пункт type="action". */
  onAction?: (item: TabBarItemProps) => void;
  /** Нижнее поле safe area (os-safe-area-bottom / env(safe-area-inset-bottom)). Off — только если safe area отдал родитель. По умолчанию true. */
  safeArea?: boolean;
  /** aria-label nav. По умолчанию «Основная навигация». */
  label?: string;
  children?: ReactNode;
  className?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
export declare function Coin(props: CoinProps): JSX.Element;
export declare function CoinStack(props: CoinStackProps): JSX.Element;
export declare function NavItem(props: NavItemProps): JSX.Element;
export declare function KeyValueRow(props: KeyValueRowProps): JSX.Element;
export declare function Search(props: SearchProps): JSX.Element;
export declare function SelectCompact(props: SelectCompactProps): JSX.Element;
export declare function DateRangeField(props: DateRangeFieldProps): JSX.Element;
export declare function DateCell(props: DateCellProps): JSX.Element;
export declare function Calendar(props: CalendarProps): JSX.Element;
export declare function DateRangePanel(props: DateRangePanelProps): JSX.Element;
export declare function PageIndicator(props: PageIndicatorProps): JSX.Element;
export declare function LegendSwatch(props: LegendSwatchProps): JSX.Element;
export declare function LegendItem(props: LegendItemProps): JSX.Element;
export declare function ChartMetric(props: ChartMetricProps): JSX.Element;
export declare function TableHeaderCell(props: TableHeaderCellProps): JSX.Element;
export declare function TableCell(props: TableCellProps): JSX.Element;
export declare function TableRow(props: TableRowProps): JSX.Element;
export declare function Table<R = any>(props: TableProps<R>): JSX.Element;
export declare function PromoCard(props: PromoCardProps): JSX.Element | null;
export declare function Sidebar(props: SidebarProps): JSX.Element;
export declare function ChartCrosshair(props: ChartCrosshairProps): JSX.Element;
export declare function ChartTooltip(props: ChartTooltipProps): JSX.Element;
export declare function ChartPlot(props: ChartPlotProps): JSX.Element;
export declare function ChartCard(props: ChartCardProps): JSX.Element;
export declare function TopBar(props: TopBarProps): JSX.Element;
export interface SheetProps {
  open?: boolean;
  /** Заголовок шторки (h2, heading/md Bold). */
  title?: ReactNode;
  /** Грабер сверху. По умолчанию true. */
  showGrabber?: boolean;
  showClose?: boolean;
  onClose?: (e?: unknown) => void;
  closeLabel?: string;
  /** До двух Icon button в шапке. */
  headerActions?: ReactNode;
  /** Кнопки L на всю ширину. */
  footer?: ReactNode;
  /** Во всю высоту (поток формы, кнопка внизу). */
  fullHeight?: boolean;
  /** Подложка surface-overlay; тап по ней — onClose. По умолчанию true. */
  scrim?: boolean;
  children?: ReactNode;
  className?: string;
}
export declare function Sheet(props: SheetProps): JSX.Element | null;
export declare function StatusSummary(props: StatusSummaryProps): JSX.Element;
export declare function PromoCarousel(props: PromoCarouselProps): JSX.Element;
export declare function ActionBar(props: ActionBarProps): JSX.Element;
export declare function FloatingButton(props: FloatingButtonProps): JSX.Element;
export declare function TabBarItem(props: TabBarItemProps): JSX.Element;
export declare function TabBar(props: TabBarProps): JSX.Element;
