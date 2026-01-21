'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { 
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { analytics, categories, currency, months } = translations;

// Данные по месяцам
const monthlyData = [
  { month: months.aug, income: 95000, expenses: 72000 },
  { month: months.sep, income: 98000, expenses: 68000 },
  { month: months.oct, income: 95000, expenses: 81000 },
  { month: months.nov, income: 102000, expenses: 75000 },
  { month: months.dec, income: 115000, expenses: 95000 },
  { month: months.jan, income: 95000, expenses: 72700 },
];

// Расходы по категориям
const categoryExpenses = [
  { name: categories.housing, amount: 35000, percent: 48, color: '#f59e0b' },
  { name: categories.food, amount: 18500, percent: 25, color: '#10b981' },
  { name: categories.entertainment, amount: 6800, percent: 9, color: '#ef4444' },
  { name: categories.shopping, amount: 4500, percent: 6, color: '#8b5cf6' },
  { name: categories.transport, amount: 4200, percent: 6, color: '#3b82f6' },
  { name: categories.subscriptions, amount: 2500, percent: 4, color: '#06b6d4' },
  { name: categories.health, amount: 1200, percent: 2, color: '#ec4899' },
];

// Топ расходов
const topExpenses = [
  { title: 'Аренда квартиры', amount: 35000, category: categories.housing, date: '1 янв' },
  { title: 'Пятёрочка', amount: 8500, category: categories.food, date: '15 янв' },
  { title: 'Перекрёсток', amount: 6200, category: categories.food, date: '10 янв' },
  { title: 'Развлечения', amount: 4500, category: categories.entertainment, date: '12 янв' },
  { title: 'Спортмастер', amount: 4500, category: categories.shopping, date: '8 янв' },
];

// Сравнение с прошлым месяцем
const comparison = {
  income: { current: 95000, previous: 115000, change: -17.4 },
  expenses: { current: 72700, previous: 95000, change: -23.5 },
  savings: { current: 22300, previous: 20000, change: 11.5 },
};

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const maxExpense = Math.max(...monthlyData.map(d => Math.max(d.income, d.expenses)));

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
                {analytics.title}
              </h1>
              <p style={{ color: designTokens.colors.text.secondary, marginTop: '4px' }}>
                Детальный анализ ваших финансов
              </p>
            </div>

            {/* Period Selector */}
            <div className="flex gap-2">
              {(['week', 'month', 'quarter', 'year'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className="px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: period === p 
                      ? designTokens.colors.brand.primary 
                      : '#fff',
                    color: period === p 
                      ? '#fff' 
                      : designTokens.colors.text.primary,
                    borderRadius: designTokens.borderRadius.lg,
                    border: period === p 
                      ? 'none' 
                      : `1px solid ${designTokens.colors.border.light}`,
                  }}
                >
                  {analytics[p]}
                </button>
              ))}
            </div>
          </header>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Income */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm">
                  Доходы
                </p>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#dcfce7' }}
                >
                  <ArrowDownLeft size={18} style={{ color: '#16a34a' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold mb-2"
                style={{ color: designTokens.colors.text.primary }}
              >
                {formatMoney(comparison.income.current)} {currency.rub}
              </p>
              <div 
                className="flex items-center gap-1 text-sm"
                style={{ color: comparison.income.change >= 0 ? '#16a34a' : '#dc2626' }}
              >
                {comparison.income.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{comparison.income.change >= 0 ? '+' : ''}{comparison.income.change}% vs прошлый месяц</span>
              </div>
            </div>

            {/* Expenses */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm">
                  Расходы
                </p>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#fee2e2' }}
                >
                  <ArrowUpRight size={18} style={{ color: '#dc2626' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold mb-2"
                style={{ color: designTokens.colors.text.primary }}
              >
                {formatMoney(comparison.expenses.current)} {currency.rub}
              </p>
              <div 
                className="flex items-center gap-1 text-sm"
                style={{ color: comparison.expenses.change <= 0 ? '#16a34a' : '#dc2626' }}
              >
                {comparison.expenses.change <= 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                <span>{comparison.expenses.change}% vs прошлый месяц</span>
              </div>
            </div>

            {/* Savings */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <p style={{ color: designTokens.colors.text.secondary }} className="text-sm">
                  Накопления
                </p>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: '#e0e7ff' }}
                >
                  <PieChart size={18} style={{ color: '#6366f1' }} />
                </div>
              </div>
              <p 
                className="text-2xl font-bold mb-2"
                style={{ color: designTokens.colors.text.primary }}
              >
                {formatMoney(comparison.savings.current)} {currency.rub}
              </p>
              <div 
                className="flex items-center gap-1 text-sm"
                style={{ color: comparison.savings.change >= 0 ? '#16a34a' : '#dc2626' }}
              >
                {comparison.savings.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span>{comparison.savings.change >= 0 ? '+' : ''}{comparison.savings.change}% vs прошлый месяц</span>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* Bar Chart - Income vs Expenses */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <h2 
                className="font-semibold mb-6"
                style={{ 
                  fontSize: designTokens.typography.fontSize.h4,
                  color: designTokens.colors.text.primary,
                }}
              >
                {analytics.trend}
              </h2>

              {/* Legend */}
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }} />
                  <span className="text-sm" style={{ color: designTokens.colors.text.secondary }}>
                    Доходы
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ef4444' }} />
                  <span className="text-sm" style={{ color: designTokens.colors.text.secondary }}>
                    Расходы
                  </span>
                </div>
              </div>

              {/* Chart */}
              <div className="flex items-end justify-between gap-3 h-48">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end" style={{ height: '180px' }}>
                      {/* Income Bar */}
                      <div 
                        className="flex-1 rounded-t-md transition-all"
                        style={{ 
                          height: `${(data.income / maxExpense) * 100}%`,
                          backgroundColor: '#10b981',
                        }}
                      />
                      {/* Expense Bar */}
                      <div 
                        className="flex-1 rounded-t-md transition-all"
                        style={{ 
                          height: `${(data.expenses / maxExpense) * 100}%`,
                          backgroundColor: '#ef4444',
                        }}
                      />
                    </div>
                    <span 
                      className="text-xs"
                      style={{ color: designTokens.colors.text.tertiary }}
                    >
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pie Chart - Category Breakdown */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <h2 
                className="font-semibold mb-6"
                style={{ 
                  fontSize: designTokens.typography.fontSize.h4,
                  color: designTokens.colors.text.primary,
                }}
              >
                {analytics.byCategory}
              </h2>

              {/* Donut Chart Placeholder */}
              <div className="flex items-center gap-6">
                <div 
                  className="relative w-40 h-40 flex-shrink-0"
                  style={{
                    background: `conic-gradient(
                      ${categoryExpenses[0].color} 0% ${categoryExpenses[0].percent}%,
                      ${categoryExpenses[1].color} ${categoryExpenses[0].percent}% ${categoryExpenses[0].percent + categoryExpenses[1].percent}%,
                      ${categoryExpenses[2].color} ${categoryExpenses[0].percent + categoryExpenses[1].percent}% ${categoryExpenses[0].percent + categoryExpenses[1].percent + categoryExpenses[2].percent}%,
                      ${categoryExpenses[3].color} ${categoryExpenses[0].percent + categoryExpenses[1].percent + categoryExpenses[2].percent}% ${categoryExpenses[0].percent + categoryExpenses[1].percent + categoryExpenses[2].percent + categoryExpenses[3].percent}%,
                      ${categoryExpenses[4].color} ${categoryExpenses[0].percent + categoryExpenses[1].percent + categoryExpenses[2].percent + categoryExpenses[3].percent}% 100%
                    )`,
                    borderRadius: '50%',
                  }}
                >
                  <div 
                    className="absolute inset-4 bg-white rounded-full flex items-center justify-center flex-col"
                  >
                    <p className="text-xs" style={{ color: designTokens.colors.text.secondary }}>
                      Всего
                    </p>
                    <p 
                      className="font-bold"
                      style={{ color: designTokens.colors.text.primary }}
                    >
                      72.7K
                    </p>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {categoryExpenses.slice(0, 5).map((cat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: cat.color }} 
                        />
                        <span 
                          className="text-sm"
                          style={{ color: designTokens.colors.text.primary }}
                        >
                          {cat.name}
                        </span>
                      </div>
                      <span 
                        className="text-sm font-medium"
                        style={{ color: designTokens.colors.text.secondary }}
                      >
                        {cat.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top Expenses */}
          <div 
            className="p-5 bg-white"
            style={{ 
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.shadows.sm,
            }}
          >
            <h2 
              className="font-semibold mb-4"
              style={{ 
                fontSize: designTokens.typography.fontSize.h4,
                color: designTokens.colors.text.primary,
              }}
            >
              {analytics.topExpenses}
            </h2>

            <div className="space-y-3">
              {topExpenses.map((expense, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: designTokens.colors.background.secondary }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
                      style={{ backgroundColor: designTokens.colors.brand.primary }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p 
                        className="font-medium"
                        style={{ color: designTokens.colors.text.primary }}
                      >
                        {expense.title}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: designTokens.colors.text.secondary }}
                      >
                        {expense.category} · {expense.date}
                      </p>
                    </div>
                  </div>
                  <p 
                    className="font-semibold"
                    style={{ color: '#dc2626' }}
                  >
                    -{formatMoney(expense.amount)} {currency.rub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
