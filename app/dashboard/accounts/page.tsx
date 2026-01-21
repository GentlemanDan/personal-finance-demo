'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { 
  Plus, 
  MoreVertical,
  Wallet,
  CreditCard,
  PiggyBank,
  Building2,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { accounts, currency, categories } = translations;

// Типы счетов
const accountTypes = [
  { id: 'all', label: 'Все счета' },
  { id: 'card', label: accounts.card },
  { id: 'cash', label: accounts.cash },
  { id: 'deposit', label: accounts.deposit },
  { id: 'credit', label: accounts.credit },
];

// Моковые данные счетов
const mockAccounts = [
  { 
    id: 1, 
    name: 'Тинькофф Black', 
    type: 'card', 
    balance: 156420, 
    icon: CreditCard, 
    color: '#1a1a1a',
    cardNumber: '•••• 4521',
    change: +12500,
    changePercent: 8.7,
  },
  { 
    id: 2, 
    name: 'Сбербанк Зарплатная', 
    type: 'card', 
    balance: 45200, 
    icon: CreditCard, 
    color: '#21a038',
    cardNumber: '•••• 7832',
    change: -3200,
    changePercent: -6.6,
  },
  { 
    id: 3, 
    name: 'Наличные', 
    type: 'cash', 
    balance: 12500, 
    icon: Wallet, 
    color: '#f59e0b',
    change: +2500,
    changePercent: 25.0,
  },
  { 
    id: 4, 
    name: 'Накопительный счёт', 
    type: 'deposit', 
    balance: 450000, 
    icon: PiggyBank, 
    color: '#8b5cf6',
    interestRate: 16,
    change: +5800,
    changePercent: 1.3,
  },
  { 
    id: 5, 
    name: 'Вклад "Выгодный"', 
    type: 'deposit', 
    balance: 200000, 
    icon: Building2, 
    color: '#0ea5e9',
    interestRate: 18,
    endDate: '15 июня 2026',
    change: +2700,
    changePercent: 1.4,
  },
];

// Последние операции для выбранного счёта
const mockRecentTransactions = [
  { id: 1, title: 'Пятёрочка', amount: -1850, date: 'Сегодня', category: categories.food },
  { id: 2, title: 'Зарплата', amount: 95000, date: 'Сегодня', category: categories.salary },
  { id: 3, title: 'Яндекс.Такси', amount: -450, date: 'Вчера', category: categories.transport },
];

export default function AccountsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showBalances, setShowBalances] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);

  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalChange = mockAccounts.reduce((sum, acc) => sum + acc.change, 0);

  const filteredAccounts = activeFilter === 'all' 
    ? mockAccounts 
    : mockAccounts.filter(acc => acc.type === activeFilter);

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
                {accounts.title}
              </h1>
              <p style={{ color: designTokens.colors.text.secondary, marginTop: '4px' }}>
                Управление всеми вашими счетами
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Toggle Balance Visibility */}
              <button 
                onClick={() => setShowBalances(!showBalances)}
                className="flex items-center gap-2 px-4 py-2"
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.secondary,
                }}
              >
                {showBalances ? <Eye size={18} /> : <EyeOff size={18} />}
                <span className="text-sm">{showBalances ? 'Скрыть' : 'Показать'}</span>
              </button>

              {/* Add Account */}
              <button 
                className="flex items-center gap-2 px-4 py-2 text-white font-medium"
                style={{ 
                  backgroundColor: designTokens.colors.brand.primary,
                  borderRadius: designTokens.borderRadius.lg,
                }}
              >
                <Plus size={18} />
                {accounts.addAccount}
              </button>
            </div>
          </header>

          {/* Total Balance Card */}
          <div 
            className="p-6 mb-8"
            style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: designTokens.borderRadius.xl,
              color: 'white',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="opacity-80 text-sm mb-1">Общий баланс</p>
                <p className="text-4xl font-bold mb-2">
                  {showBalances ? `${formatMoney(totalBalance)} ${currency.rub}` : '••••••••'}
                </p>
                <div className="flex items-center gap-2">
                  {totalChange >= 0 ? (
                    <TrendingUp size={18} className="opacity-80" />
                  ) : (
                    <TrendingDown size={18} className="opacity-80" />
                  )}
                  <span className="opacity-80">
                    {totalChange >= 0 ? '+' : ''}{formatMoney(totalChange)} {currency.rub} за месяц
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="opacity-80 text-sm mb-1">Счетов</p>
                <p className="text-3xl font-bold">{mockAccounts.length}</p>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {accountTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveFilter(type.id)}
                className="px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: activeFilter === type.id 
                    ? designTokens.colors.brand.primary 
                    : '#fff',
                  color: activeFilter === type.id 
                    ? '#fff' 
                    : designTokens.colors.text.primary,
                  borderRadius: designTokens.borderRadius.lg,
                  border: activeFilter === type.id 
                    ? 'none' 
                    : `1px solid ${designTokens.colors.border.light}`,
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Accounts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {filteredAccounts.map((account) => {
              const Icon = account.icon;
              const isPositive = account.change >= 0;
              
              return (
                <div 
                  key={account.id}
                  onClick={() => setSelectedAccount(account.id === selectedAccount ? null : account.id)}
                  className="p-5 bg-white cursor-pointer transition-all hover:shadow-md"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                    border: selectedAccount === account.id 
                      ? `2px solid ${designTokens.colors.brand.primary}` 
                      : '2px solid transparent',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${account.color}15` }}
                    >
                      <Icon size={24} style={{ color: account.color }} />
                    </div>
                    <button 
                      className="p-1 rounded-lg hover:bg-gray-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={18} style={{ color: designTokens.colors.text.muted }} />
                    </button>
                  </div>

                  <div className="mb-3">
                    <p 
                      className="font-medium mb-1"
                      style={{ color: designTokens.colors.text.primary }}
                    >
                      {account.name}
                    </p>
                    {'cardNumber' in account && (
                      <p 
                        className="text-sm"
                        style={{ color: designTokens.colors.text.muted }}
                      >
                        {account.cardNumber}
                      </p>
                    )}
                    {'interestRate' in account && (
                      <p 
                        className="text-sm"
                        style={{ color: designTokens.colors.text.muted }}
                      >
                        {account.interestRate}% годовых
                      </p>
                    )}
                  </div>

                  <p 
                    className="text-2xl font-bold mb-2"
                    style={{ color: designTokens.colors.text.primary }}
                  >
                    {showBalances ? `${formatMoney(account.balance)} ${currency.rub}` : '••••••'}
                  </p>

                  <div 
                    className="flex items-center gap-1 text-sm"
                    style={{ color: isPositive ? '#16a34a' : '#dc2626' }}
                  >
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>
                      {isPositive ? '+' : ''}{formatMoney(account.change)} ({account.changePercent}%)
                    </span>
                  </div>

                  {'endDate' in account && (
                    <p 
                      className="text-sm mt-2"
                      style={{ color: designTokens.colors.text.muted }}
                    >
                      До {account.endDate}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Add Account Card */}
            <div 
              className="p-5 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                border: `2px dashed ${designTokens.colors.border.light}`,
                minHeight: '200px',
              }}
            >
              <div 
                className="p-3 rounded-full mb-3"
                style={{ backgroundColor: designTokens.colors.background.muted }}
              >
                <Plus size={24} style={{ color: designTokens.colors.text.muted }} />
              </div>
              <p 
                className="font-medium"
                style={{ color: designTokens.colors.text.secondary }}
              >
                {accounts.addAccount}
              </p>
            </div>
          </div>

          {/* Selected Account Details */}
          {selectedAccount && (
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
                {mockRecentTransactions.map((tx) => (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: designTokens.colors.background.muted }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ 
                          backgroundColor: tx.amount > 0 ? '#dcfce7' : '#fee2e2',
                        }}
                      >
                        {tx.amount > 0 ? (
                          <ArrowDownLeft size={18} style={{ color: '#16a34a' }} />
                        ) : (
                          <ArrowUpRight size={18} style={{ color: '#dc2626' }} />
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
                          {tx.category} · {tx.date}
                        </p>
                      </div>
                    </div>
                    <p 
                      className="font-semibold"
                      style={{ 
                        color: tx.amount > 0 ? '#16a34a' : '#dc2626',
                      }}
                    >
                      {tx.amount > 0 ? '+' : ''}{formatMoney(tx.amount)} {currency.rub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
