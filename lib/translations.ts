/**
 * Личные Финансы - UI Translations
 * Приложение для учёта личных финансов
 */

export const translations = {
  // Название приложения
  app: {
    name: 'FinTrack',
    tagline: 'Управление личными финансами',
  },

  // Навигация
  navigation: {
    dashboard: 'Главная',
    accounts: 'Счета',
    transactions: 'Операции',
    budget: 'Бюджет',
    analytics: 'Аналитика',
    goals: 'Цели',
    settings: 'Настройки',
    logout: 'Выход',
    search: 'Поиск',
  },

  // Приветствие
  greeting: {
    goodMorning: 'Доброе утро',
    goodDay: 'Добрый день',
    goodEvening: 'Добрый вечер',
    goodNight: 'Доброй ночи',
    welcome: 'С возвращением',
    longTimeNoSee: 'давно не виделись',
  },

  // Обзор
  overview: {
    title: 'Обзор',
    totalBalance: 'Общий баланс',
    monthIncome: 'Доход за месяц',
    monthExpenses: 'Расходы за месяц',
    savings: 'Накопления',
    netWorth: 'Чистый капитал',
  },

  // Счета
  accounts: {
    title: 'Счета',
    addAccount: 'Добавить счёт',
    cash: 'Наличные',
    card: 'Карта',
    deposit: 'Вклад',
    credit: 'Кредит',
    total: 'Всего',
  },

  // Операции
  transactions: {
    title: 'Операции',
    addTransaction: 'Добавить операцию',
    income: 'Доход',
    expense: 'Расход',
    transfer: 'Перевод',
    all: 'Все',
    today: 'Сегодня',
    yesterday: 'Вчера',
    thisWeek: 'На этой неделе',
    thisMonth: 'В этом месяце',
    noTransactions: 'Нет операций',
  },

  // Бюджет
  budget: {
    title: 'Бюджет',
    monthlyBudget: 'Месячный бюджет',
    setBudget: 'Установить бюджет',
    spent: 'Потрачено',
    remaining: 'Осталось',
    overBudget: 'Превышение',
    onTrack: 'В рамках бюджета',
  },

  // Аналитика
  analytics: {
    title: 'Аналитика',
    week: 'Неделя',
    month: 'Месяц',
    quarter: 'Квартал',
    year: 'Год',
    byCategory: 'По категориям',
    trend: 'Динамика',
    comparison: 'Сравнение',
    topExpenses: 'Топ расходов',
  },

  // Цели накопления
  goals: {
    title: 'Цели',
    addGoal: 'Добавить цель',
    targetAmount: 'Целевая сумма',
    saved: 'Накоплено',
    remaining: 'Осталось',
    deadline: 'Срок',
    progress: 'Прогресс',
    contribute: 'Пополнить',
  },

  // Категории расходов
  categories: {
    food: 'Продукты',
    restaurants: 'Рестораны',
    transport: 'Транспорт',
    housing: 'Жильё',
    utilities: 'Коммунальные',
    health: 'Здоровье',
    entertainment: 'Развлечения',
    shopping: 'Покупки',
    education: 'Образование',
    travel: 'Путешествия',
    subscriptions: 'Подписки',
    other: 'Прочее',
    salary: 'Зарплата',
    freelance: 'Фриланс',
    investments: 'Инвестиции',
    gifts: 'Подарки',
  },

  // Настройки
  settings: {
    title: 'Настройки',
    profile: 'Профиль',
    categories: 'Категории',
    currency: 'Валюта',
    notifications: 'Уведомления',
    export: 'Экспорт данных',
    import: 'Импорт данных',
    theme: 'Тема',
    language: 'Язык',
  },

  // Месяцы
  months: {
    jan: 'Янв', january: 'Январь',
    feb: 'Фев', february: 'Февраль',
    mar: 'Мар', march: 'Март',
    apr: 'Апр', april: 'Апрель',
    may: 'Май', mayFull: 'Май',
    jun: 'Июн', june: 'Июнь',
    jul: 'Июл', july: 'Июль',
    aug: 'Авг', august: 'Август',
    sep: 'Сен', september: 'Сентябрь',
    oct: 'Окт', october: 'Октябрь',
    nov: 'Ноя', november: 'Ноябрь',
    dec: 'Дек', december: 'Декабрь',
  },

  // Дни недели
  days: {
    mon: 'Пн', monday: 'Понедельник',
    tue: 'Вт', tuesday: 'Вторник',
    wed: 'Ср', wednesday: 'Среда',
    thu: 'Чт', thursday: 'Четверг',
    fri: 'Пт', friday: 'Пятница',
    sat: 'Сб', saturday: 'Суббота',
    sun: 'Вс', sunday: 'Воскресенье',
  },

  // Общие действия
  actions: {
    add: 'Добавить',
    edit: 'Редактировать',
    delete: 'Удалить',
    save: 'Сохранить',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    close: 'Закрыть',
    filter: 'Фильтр',
    sort: 'Сортировка',
    search: 'Поиск',
  },

  // Валюты
  currency: {
    rub: '₽',
    usd: '$',
    eur: '€',
  },
} as const;

export type Translations = typeof translations;
