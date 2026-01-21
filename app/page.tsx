'use client';

import * as React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Fab } from '@/components/shared/ui/fab';
import { AddTransactionModal } from '@/components/dashboard/AddTransactionModal';
import { 
  Search, 
  Bell, 
  Plus, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard,
  PiggyBank,
  ChevronRight,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { overview, categories, greeting, accounts, currency } = translations;

// Типы для транзакций
type Transaction = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
};

// Моковые данные
const initialAccounts = [
  { id: 1, name: 'Основная карта', type: 'card', balance: 156420, icon: CreditCard, color: '#10b981' },
  { id: 2, name: 'Наличные', type: 'cash', balance: 12500, icon: Wallet, color: '#f59e0b' },
  { id: 3, name: 'Накопительный', type: 'deposit', balance: 450000, icon: PiggyBank, color: '#8b5cf6' },
];

const initialTransactions: Transaction[] = [
  { id: 1, title: 'Пятёрочка', category: categories.food, amount: -1850, date: 'Сегодня, 14:32', type: 'expense' },
  { id: 2, title: 'Зарплата', category: categories.salary, amount: 95000, date: 'Сегодня, 10:00', type: 'income' },
  { id: 3, title: 'Яндекс.Такси', category: categories.transport, amount: -450, date: 'Вчера, 19:15', type: 'expense' },
  { id: 4, title: 'Netflix', category: categories.subscriptions, amount: -799, date: 'Вчера, 12:00', type: 'expense' },
  { id: 5, title: 'Аптека', category: categories.health, amount: -1200, date: '16 янв, 16:45', type: 'expense' },
];

const mockBudgetProgress = [
  { category: categories.food, spent: 18500, budget: 25000, color: '#10b981' },
  { category: categories.transport, spent: 4200, budget: 8000, color: '#3b82f6' },
  { category: categories.entertainment, spent: 6800, budget: 5000, color: '#ef4444' },
  { category: categories.shopping, spent: 3500, budget: 10000, color: '#f59e0b' },
];

export default function Page() {
  const [transactions, setTransactions] = React.useState(initialTransactions);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const totalBalance = initialAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const monthExpenses = Math.abs(transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0));

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const handleAddTransaction = (transaction: { title: string; category: string; amount: number; date: string; type: 'income' | 'expense' }) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      title: transaction.title,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    };
    setTransactions([newTransaction, ...transactions]);
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
                {greeting.goodDay}, Герасим! 👋
              </h1>
              <p style={{ color: designTokens.colors.text.muted, marginTop: '4px' }}>
                {greeting.longTimeNoSee}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div 
                className="flex items-center gap-2 px-4 py-2"
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                }}
              >
                <Search size={18} style={{ color: designTokens.colors.text.muted }} />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="border-none outline-none bg-transparent"
                  style={{ width: '180px', fontSize: designTokens.typography.fontSize.body }}
                />
              </div>

              {/* Notifications */}
              <button 
                className="relative p-2"
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                }}
              >
                <Bell size={20} style={{ color: designTokens.colors.text.secondary }} />
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-white text-xs rounded-full"
                  style={{ backgroundColor: '#ef4444' }}
                >
                  3
                </span>
              </button>

              {/* Add Transaction */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-white font-medium"
                style={{ 
                  backgroundColor: designTokens.colors.brand.primary,
                  borderRadius: designTokens.borderRadius.lg,
                  cursor: 'pointer',
                }}
              >
                <Plus size={18} />
                Добавить
              </button>
            </div>
          </header>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Total Balance */}
            <div 
              className="p-5"
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: designTokens.borderRadius.xl,
                color: 'white',
              }}
            >
              <p className="opacity-80 text-sm mb-1">{overview.totalBalance}</p>
              <p className="text-3xl font-bold mb-3">{formatMoney(totalBalance)} {currency.rub}</p>
              <div className="flex items-center gap-1 text-sm opacity-80">
                <TrendingUp size={16} />
                <span>+12.5% за месяц</span>
              </div>
            </div>

            {/* Month Income */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm">{overview.monthIncome}</p>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#dcfce7' }}
                >
                  <ArrowDownLeft size={18} style={{ color: '#16a34a' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold"
                style={{ color: designTokens.colors.text.primary }}
              >
                +{formatMoney(monthIncome)} {currency.rub}
              </p>
            </div>

            {/* Month Expenses */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm">{overview.monthExpenses}</p>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#fee2e2' }}
                >
                  <ArrowUpRight size={18} style={{ color: '#dc2626' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold"
                style={{ color: designTokens.colors.text.primary }}
              >
                -{formatMoney(monthExpenses)} {currency.rub}
              </p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Accounts & Budget */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Accounts */}
              <div 
                className="p-5 bg-white"
                style={{ 
                  borderRadius: designTokens.borderRadius.xl,
                  boxShadow: designTokens.shadows.sm,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 
                    className="font-semibold"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    {accounts.title}
                  </h2>
                  <button 
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: designTokens.colors.brand.primary }}
                  >
                    Все <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  {initialAccounts.map((account) => {
                    const Icon = account.icon;
                    return (
                      <div 
                        key={account.id}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ backgroundColor: designTokens.colors.background.muted }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${account.color}20` }}
                          >
                            <Icon size={20} style={{ color: account.color }} />
                          </div>
                          <span style={{ color: designTokens.colors.text.primary }}>
                            {account.name}
                          </span>
                        </div>
                        <span 
                          className="font-medium"
                          style={{ color: designTokens.colors.text.primary }}
                        >
                          {formatMoney(account.balance)} {currency.rub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget Progress */}
              <div 
                className="p-5 bg-white"
                style={{ 
                  borderRadius: designTokens.borderRadius.xl,
                  boxShadow: designTokens.shadows.sm,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 
                    className="font-semibold"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    Бюджет на январь
                  </h2>
                  <button 
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: designTokens.colors.brand.primary }}
                  >
                    Все <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  {mockBudgetProgress.map((item, index) => {
                    const progress = Math.min((item.spent / item.budget) * 100, 100);
                    const isOver = item.spent > item.budget;
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            className="text-sm"
                            style={{ color: designTokens.colors.text.primary }}
                          >
                            {item.category}
                          </span>
                          <span 
                            className="text-sm"
                            style={{ color: isOver ? '#ef4444' : designTokens.colors.text.secondary }}
                          >
                            {formatMoney(item.spent)} / {formatMoney(item.budget)} {currency.rub}
                          </span>
                        </div>
                        <div 
                          className="w-full h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: designTokens.colors.background.muted }}
                        >
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${progress}%`,
                              backgroundColor: isOver ? '#ef4444' : item.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Transactions */}
            <div className="lg:col-span-2">
              <div 
                className="p-5 bg-white h-full"
                style={{ 
                  borderRadius: designTokens.borderRadius.xl,
                  boxShadow: designTokens.shadows.sm,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 
                    className="font-semibold"
                    style={{ 
                      fontSize: designTokens.typography.fontSize.h4,
                      color: designTokens.colors.text.primary,
                    }}
                  >
                    Последние операции
                  </h2>
                  <button 
                    className="text-sm font-medium flex items-center gap-1"
                    style={{ color: designTokens.colors.brand.primary }}
                  >
                    Все операции <ChevronRight size={16} />
                  </button>
                </div>

                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div 
                      key={tx.id}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      style={{ backgroundColor: designTokens.colors.background.muted }}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ 
                            backgroundColor: tx.type === 'income' ? '#dcfce7' : '#fee2e2',
                          }}
                        >
                          {tx.type === 'income' ? (
                            <ArrowDownLeft size={20} style={{ color: '#16a34a' }} />
                          ) : (
                            <ArrowUpRight size={20} style={{ color: '#dc2626' }} />
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
                            {tx.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p 
                          className="font-semibold"
                          style={{ 
                            color: tx.type === 'income' ? '#16a34a' : '#dc2626',
                          }}
                        >
                          {tx.type === 'income' ? '+' : ''}{formatMoney(tx.amount)} {currency.rub}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: designTokens.colors.text.muted }}
                        >
                          {tx.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB Button */}
      <Fab onClick={() => setIsModalOpen(true)} />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}
