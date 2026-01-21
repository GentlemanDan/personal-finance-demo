'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { 
  Plus, 
  Search,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRightLeft,
  ChevronDown,
  X,
  Check,
  ShoppingBag,
  Car,
  Utensils,
  Home,
  Heart,
  Gamepad2,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { transactions, categories, currency } = translations;

// Категории с иконками
const categoryIcons: Record<string, React.ElementType> = {
  [categories.food]: Utensils,
  [categories.restaurants]: Utensils,
  [categories.transport]: Car,
  [categories.housing]: Home,
  [categories.health]: Heart,
  [categories.entertainment]: Gamepad2,
  [categories.shopping]: ShoppingBag,
  [categories.education]: GraduationCap,
  [categories.salary]: Briefcase,
};

// Фильтры по типу
const typeFilters = [
  { id: 'all', label: transactions.all, icon: null },
  { id: 'expense', label: transactions.expense, icon: ArrowUpRight },
  { id: 'income', label: transactions.income, icon: ArrowDownLeft },
  { id: 'transfer', label: transactions.transfer, icon: ArrowRightLeft },
];

// Моковые транзакции
const mockTransactions = [
  { 
    id: 1, 
    title: 'Пятёрочка', 
    category: categories.food, 
    amount: -1850, 
    date: '2026-01-18', 
    time: '14:32',
    account: 'Тинькофф Black',
    type: 'expense',
    note: 'Продукты на неделю',
  },
  { 
    id: 2, 
    title: 'Зарплата', 
    category: categories.salary, 
    amount: 95000, 
    date: '2026-01-18', 
    time: '10:00',
    account: 'Сбербанк Зарплатная',
    type: 'income',
  },
  { 
    id: 3, 
    title: 'Яндекс.Такси', 
    category: categories.transport, 
    amount: -450, 
    date: '2026-01-17', 
    time: '19:15',
    account: 'Тинькофф Black',
    type: 'expense',
  },
  { 
    id: 4, 
    title: 'Netflix', 
    category: categories.subscriptions, 
    amount: -799, 
    date: '2026-01-17', 
    time: '12:00',
    account: 'Тинькофф Black',
    type: 'expense',
  },
  { 
    id: 5, 
    title: 'Аптека "Здоровье"', 
    category: categories.health, 
    amount: -1200, 
    date: '2026-01-16', 
    time: '16:45',
    account: 'Наличные',
    type: 'expense',
  },
  { 
    id: 6, 
    title: 'Перевод на накопительный', 
    category: 'Перевод', 
    amount: -10000, 
    date: '2026-01-16', 
    time: '10:00',
    account: 'Тинькофф Black → Накопительный',
    type: 'transfer',
  },
  { 
    id: 7, 
    title: 'Спортмастер', 
    category: categories.shopping, 
    amount: -4500, 
    date: '2026-01-15', 
    time: '15:20',
    account: 'Тинькофф Black',
    type: 'expense',
  },
  { 
    id: 8, 
    title: 'Кинотеатр', 
    category: categories.entertainment, 
    amount: -850, 
    date: '2026-01-15', 
    time: '20:00',
    account: 'Тинькофф Black',
    type: 'expense',
  },
  { 
    id: 9, 
    title: 'Фриланс проект', 
    category: categories.freelance, 
    amount: 25000, 
    date: '2026-01-14', 
    time: '14:30',
    account: 'Тинькофф Black',
    type: 'income',
  },
];

// Группировка по датам
function groupByDate(items: typeof mockTransactions) {
  const groups: Record<string, typeof mockTransactions> = {};
  
  items.forEach(item => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    let dateLabel: string;
    if (item.date === today) {
      dateLabel = transactions.today;
    } else if (item.date === yesterday) {
      dateLabel = transactions.yesterday;
    } else {
      const date = new Date(item.date);
      dateLabel = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    }
    
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(item);
  });
  
  return groups;
}

export default function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesFilter = activeFilter === 'all' || tx.type === activeFilter;
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const groupedTransactions = groupByDate(filteredTransactions);

  // Статистика за период
  const totalIncome = mockTransactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = mockTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  return (
    <div className="dashboard-page flex min-h-screen" style={{ backgroundColor: designTokens.colors.background.page }}>
      <Sidebar />

      <main
        className="flex-1"
        style={{
          marginLeft: designTokens.layout.sidebar.width,
          padding: designTokens.layout.content.padding,
        }}
      >
        <div style={{ maxWidth: designTokens.layout.content.maxWidth, margin: '0 auto' }}>
          
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 
                className="font-semibold"
                style={{ 
                  fontSize: designTokens.typography.fontSize.h2,
                  color: designTokens.colors.text.primary,
                }}
              >
                {transactions.title}
              </h1>
              <p style={{ color: designTokens.colors.text.secondary, marginTop: '4px' }}>
                Все ваши доходы и расходы
              </p>
            </div>

            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-white font-medium"
              style={{ 
                backgroundColor: designTokens.colors.brand.primary,
                borderRadius: designTokens.borderRadius.lg,
              }}
            >
              <Plus size={18} />
              {transactions.addTransaction}
            </button>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div 
              className="p-4 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <p style={{ color: designTokens.colors.text.secondary }} className="text-sm mb-1">
                Всего операций
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: designTokens.colors.text.primary }}
              >
                {mockTransactions.length}
              </p>
            </div>

            <div 
              className="p-4 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <p style={{ color: designTokens.colors.text.secondary }} className="text-sm mb-1">
                {transactions.income}
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: '#16a34a' }}
              >
                +{formatMoney(totalIncome)} {currency.rub}
              </p>
            </div>

            <div 
              className="p-4 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <p style={{ color: designTokens.colors.text.secondary }} className="text-sm mb-1">
                {transactions.expense}
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ color: '#dc2626' }}
              >
                -{formatMoney(totalExpenses)} {currency.rub}
              </p>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Search */}
            <div 
              className="flex items-center gap-2 px-4 py-2 flex-1 max-w-md"
              style={{ 
                backgroundColor: '#fff',
                borderRadius: designTokens.borderRadius.lg,
                border: `1px solid ${designTokens.colors.border.light}`,
              }}
            >
              <Search size={18} style={{ color: designTokens.colors.text.muted }} />
              <input
                type="text"
                placeholder="Поиск операций..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none outline-none bg-transparent flex-1"
                style={{ fontSize: designTokens.typography.fontSize.body }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X size={16} style={{ color: designTokens.colors.text.muted }} />
                </button>
              )}
            </div>

            {/* Type Filters */}
            <div className="flex gap-2">
              {typeFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: activeFilter === filter.id 
                        ? designTokens.colors.brand.primary 
                        : '#fff',
                      color: activeFilter === filter.id 
                        ? '#fff' 
                        : designTokens.colors.text.primary,
                      borderRadius: designTokens.borderRadius.lg,
                      border: activeFilter === filter.id 
                        ? 'none' 
                        : `1px solid ${designTokens.colors.border.light}`,
                    }}
                  >
                    {Icon && <Icon size={16} />}
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Date Filter */}
            <button 
              className="flex items-center gap-2 px-4 py-2 text-sm"
              style={{ 
                backgroundColor: '#fff',
                borderRadius: designTokens.borderRadius.lg,
                border: `1px solid ${designTokens.colors.border.light}`,
                color: designTokens.colors.text.primary,
              }}
            >
              <Calendar size={16} />
              Январь 2026
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Transactions List */}
          <div 
            className="bg-white"
            style={{ 
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.shadows.sm,
            }}
          >
            {Object.entries(groupedTransactions).map(([date, items]) => (
              <div key={date}>
                {/* Date Header */}
                <div 
                  className="px-5 py-3 border-b"
                  style={{ 
                    backgroundColor: designTokens.colors.background.muted,
                    borderColor: designTokens.colors.border.light,
                  }}
                >
                  <p 
                    className="text-sm font-medium"
                    style={{ color: designTokens.colors.text.secondary }}
                  >
                    {date}
                  </p>
                </div>

                {/* Transactions */}
                {items.map((tx, index) => {
                  const CategoryIcon = categoryIcons[tx.category] || ShoppingBag;
                  const isLast = index === items.length - 1;
                  
                  return (
                    <div 
                      key={tx.id}
                      className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{ 
                        borderBottom: isLast ? 'none' : `1px solid ${designTokens.colors.border.light}`,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ 
                            backgroundColor: tx.type === 'income' 
                              ? '#dcfce7' 
                              : tx.type === 'transfer' 
                                ? '#e0e7ff' 
                                : '#fee2e2',
                          }}
                        >
                          {tx.type === 'income' ? (
                            <ArrowDownLeft size={22} style={{ color: '#16a34a' }} />
                          ) : tx.type === 'transfer' ? (
                            <ArrowRightLeft size={22} style={{ color: '#6366f1' }} />
                          ) : (
                            <CategoryIcon size={22} style={{ color: '#dc2626' }} />
                          )}
                        </div>
                        <div>
                          <p 
                            className="font-medium"
                            style={{ color: designTokens.colors.text.primary }}
                          >
                            {tx.title}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: designTokens.colors.text.secondary }}
                          >
                            {tx.category} · {tx.account}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p 
                          className="font-semibold"
                          style={{ 
                            color: tx.type === 'income' 
                              ? '#16a34a' 
                              : tx.type === 'transfer' 
                                ? '#6366f1' 
                                : '#dc2626',
                          }}
                        >
                          {tx.type === 'income' ? '+' : tx.type === 'transfer' ? '' : '-'}
                          {formatMoney(Math.abs(tx.amount))} {currency.rub}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: designTokens.colors.text.muted }}
                        >
                          {tx.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="p-10 text-center">
                <p style={{ color: designTokens.colors.text.secondary }}>
                  {transactions.noTransactions}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className="bg-white p-6 w-full max-w-md"
            style={{ borderRadius: designTokens.borderRadius.xl }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 
                className="font-semibold"
                style={{ 
                  fontSize: designTokens.typography.fontSize.h4,
                  color: designTokens.colors.text.primary,
                }}
              >
                Новая операция
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <X size={20} style={{ color: designTokens.colors.text.muted }} />
              </button>
            </div>

            {/* Transaction Type Selector */}
            <div className="flex gap-2 mb-6">
              {[
                { id: 'expense', label: 'Расход', color: '#dc2626' },
                { id: 'income', label: 'Доход', color: '#16a34a' },
                { id: 'transfer', label: 'Перевод', color: '#6366f1' },
              ].map((type) => (
                <button
                  key={type.id}
                  className="flex-1 py-3 rounded-lg font-medium text-sm border-2"
                  style={{
                    borderColor: type.color,
                    color: type.color,
                    backgroundColor: 'transparent',
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Сумма
              </label>
              <input
                type="text"
                placeholder="0"
                className="w-full p-3 text-2xl font-bold text-center outline-none"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Категория
              </label>
              <select
                className="w-full p-3 outline-none appearance-none"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              >
                <option>Продукты</option>
                <option>Транспорт</option>
                <option>Развлечения</option>
                <option>Здоровье</option>
                <option>Покупки</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Описание
              </label>
              <input
                type="text"
                placeholder="Введите описание"
                className="w-full p-3 outline-none"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              />
            </div>

            {/* Submit */}
            <button 
              className="w-full py-3 text-white font-medium flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: designTokens.colors.brand.primary,
                borderRadius: designTokens.borderRadius.lg,
              }}
            >
              <Check size={18} />
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
