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
    <div className="dashboard-page flex min-h-screen">
      <Sidebar />

      <main
        className="flex-1"
        style={{
          marginLeft: designTokens.layout.sidebar.width,
          padding: designTokens.layout.content.padding,
        }}
      >
        <div style={{ maxWidth: designTokens.layout.content.maxWidth, margin: '0 auto' }}>
          
          {/* Header with refined animation */}
          <header className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div>
              <h1 
                className="font-semibold"
                style={{ 
                  fontSize: designTokens.typography.fontSize.h2,
                  color: designTokens.colors.text.primary,
                  fontFamily: 'var(--font-space-display)',
                  letterSpacing: '-0.02em',
                }}
              >
                {greeting.goodDay}, Герасим! 👋
              </h1>
              <p style={{ color: designTokens.colors.text.muted, marginTop: '4px' }}>
                {greeting.longTimeNoSee}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search with glass effect */}
              <div 
                className="finance-card flex items-center gap-2 px-4 py-2 stagger-1 animate-fade-in-up"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
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

              {/* Notifications with hover effect */}
              <button 
                className="finance-card relative p-2 hover-lift stagger-2 animate-fade-in-up"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                }}
              >
                <Bell size={20} style={{ color: designTokens.colors.text.secondary }} />
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-white text-xs rounded-full"
                  style={{ 
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  3
                </span>
              </button>

              {/* Add Transaction with glossy effect */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="btn-glossy flex items-center gap-2 px-4 py-2 text-white font-medium stagger-3 animate-fade-in-up"
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

          {/* Overview Cards with premium gradients and animations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Total Balance with dramatic shadow */}
            <div 
              className="p-6 hover-lift animate-fade-in-up stagger-1"
              style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: designTokens.borderRadius.xl,
                color: 'white',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25), 0 4px 8px rgba(16, 185, 129, 0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <p className="opacity-90 text-sm mb-2 font-medium">{overview.totalBalance}</p>
                <p className="text-3xl font-bold mb-3 animate-count-up">{formatMoney(totalBalance)} {currency.rub}</p>
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <TrendingUp size={16} />
                  <span>+12.5% за месяц</span>
                </div>
              </div>
              {/* Decorative circle for depth */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(40px)',
              }} />
            </div>

            {/* Month Income with refined glass effect */}
            <div 
              className="finance-card p-6 hover-lift animate-fade-in-up stagger-2"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.98), rgba(249,250,251,0.95))',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm font-medium">{overview.monthIncome}</p>
                <div 
                  className="p-2.5 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #d4f4dd 0%, #a5e8c5 100%)' }}
                >
                  <ArrowDownLeft size={18} style={{ color: '#16a34a' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold animate-count-up"
                style={{ color: designTokens.colors.text.primary }}
              >
                +{formatMoney(monthIncome)} {currency.rub}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="text-xs font-medium" style={{ color: '#059669' }}>
                  <TrendingUp size={12} className="inline mr-1" />
                  +8.2%
                </div>
                <span style={{ color: designTokens.colors.text.muted, fontSize: '12px' }}>
                  vs прошлый месяц
                </span>
              </div>
            </div>

            {/* Month Expenses with refined glass effect */}
            <div 
              className="finance-card p-6 hover-lift animate-fade-in-up stagger-3"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.98), rgba(249,250,251,0.95))',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm font-medium">{overview.monthExpenses}</p>
                <div 
                  className="p-2.5 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #ffd6d6 0%, #ffb3b3 100%)' }}
                >
                  <ArrowUpRight size={18} style={{ color: '#dc2626' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold animate-count-up"
                style={{ color: designTokens.colors.text.primary }}
              >
                -{formatMoney(monthExpenses)} {currency.rub}
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="text-xs font-medium" style={{ color: '#dc2626' }}>
                  <TrendingUp size={12} className="inline mr-1" />
                  -3.5%
                </div>
                <span style={{ color: designTokens.colors.text.muted, fontSize: '12px' }}>
                  vs прошлый месяц
                </span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Accounts & Budget */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Accounts with refined styling */}
              <div 
                className="finance-card p-6 animate-fade-in-up stagger-4"
                style={{ 
                  borderRadius: designTokens.borderRadius.xl,
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
                        className="flex items-center justify-between p-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        style={{ 
                          background: 'linear-gradient(to right, rgba(255,255,255,0.6), rgba(249,250,251,0.4))',
                          border: '1px solid rgba(226, 232, 240, 0.6)',
                        }}
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

              {/* Budget Progress with refined styling */}
              <div 
                className="finance-card p-6 animate-fade-in-up stagger-5"
                style={{ 
                  borderRadius: designTokens.borderRadius.xl,
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

            {/* Right Column - Transactions with refined styling */}
            <div className="lg:col-span-2">
              <div 
                className="finance-card p-6 animate-fade-in-up stagger-6"
                style={{ 
                  borderRadius: designTokens.borderRadius.xl,
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
