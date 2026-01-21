'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { 
  Plus, 
  Edit2,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Utensils,
  Car,
  Home,
  Heart,
  Gamepad2,
  ShoppingBag,
  GraduationCap,
  Smartphone,
  Plane,
  MoreHorizontal,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { budget, categories, currency, months } = translations;

// Категории бюджета с иконками
const budgetCategories = [
  { 
    id: 1, 
    name: categories.food, 
    icon: Utensils, 
    color: '#10b981',
    spent: 18500, 
    budget: 25000,
  },
  { 
    id: 2, 
    name: categories.transport, 
    icon: Car, 
    color: '#3b82f6',
    spent: 4200, 
    budget: 8000,
  },
  { 
    id: 3, 
    name: categories.housing, 
    icon: Home, 
    color: '#f59e0b',
    spent: 35000, 
    budget: 35000,
  },
  { 
    id: 4, 
    name: categories.entertainment, 
    icon: Gamepad2, 
    color: '#ef4444',
    spent: 6800, 
    budget: 5000,
  },
  { 
    id: 5, 
    name: categories.shopping, 
    icon: ShoppingBag, 
    color: '#8b5cf6',
    spent: 4500, 
    budget: 10000,
  },
  { 
    id: 6, 
    name: categories.health, 
    icon: Heart, 
    color: '#ec4899',
    spent: 1200, 
    budget: 5000,
  },
  { 
    id: 7, 
    name: categories.subscriptions, 
    icon: Smartphone, 
    color: '#06b6d4',
    spent: 2500, 
    budget: 3000,
  },
  { 
    id: 8, 
    name: categories.education, 
    icon: GraduationCap, 
    color: '#6366f1',
    spent: 0, 
    budget: 5000,
  },
];

export default function BudgetPage() {
  const [selectedMonth, setSelectedMonth] = useState('january');

  const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);
  const remaining = totalBudget - totalSpent;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const getStatus = (spent: number, budget: number) => {
    const percent = (spent / budget) * 100;
    if (percent >= 100) return 'over';
    if (percent >= 80) return 'warning';
    return 'ok';
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
                {budget.title}
              </h1>
              <p style={{ color: designTokens.colors.text.secondary, marginTop: '4px' }}>
                Планирование и контроль расходов
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Month Selector */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 bg-white outline-none cursor-pointer"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              >
                <option value="january">{months.january} 2026</option>
                <option value="february">{months.february} 2026</option>
                <option value="march">{months.march} 2026</option>
              </select>

              <button 
                className="flex items-center gap-2 px-4 py-2 text-white font-medium"
                style={{ 
                  backgroundColor: designTokens.colors.brand.primary,
                  borderRadius: designTokens.borderRadius.lg,
                }}
              >
                <Plus size={18} />
                Добавить категорию
              </button>
            </div>
          </header>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Total Budget */}
            <div 
              className="p-5"
              style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                borderRadius: designTokens.borderRadius.xl,
                color: 'white',
              }}
            >
              <p className="opacity-80 text-sm mb-1">{budget.monthlyBudget}</p>
              <p className="text-3xl font-bold mb-2">{formatMoney(totalBudget)} {currency.rub}</p>
              <div 
                className="w-full h-2 rounded-full mt-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
              >
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`,
                    backgroundColor: 'white',
                  }}
                />
              </div>
              <p className="text-sm opacity-80 mt-2">
                Использовано {Math.round((totalSpent / totalBudget) * 100)}%
              </p>
            </div>

            {/* Spent */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <p style={{ color: designTokens.colors.text.secondary }} className="text-sm mb-1">
                {budget.spent}
              </p>
              <p 
                className="text-3xl font-bold mb-2"
                style={{ color: designTokens.colors.text.primary }}
              >
                {formatMoney(totalSpent)} {currency.rub}
              </p>
              <p 
                className="text-sm"
                style={{ color: designTokens.colors.text.secondary }}
              >
                из {formatMoney(totalBudget)} {currency.rub}
              </p>
            </div>

            {/* Remaining */}
            <div 
              className="p-5 bg-white"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                boxShadow: designTokens.shadows.sm,
              }}
            >
              <p style={{ color: designTokens.colors.text.secondary }} className="text-sm mb-1">
                {budget.remaining}
              </p>
              <p 
                className="text-3xl font-bold mb-2"
                style={{ color: remaining >= 0 ? '#16a34a' : '#dc2626' }}
              >
                {remaining >= 0 ? '' : '-'}{formatMoney(Math.abs(remaining))} {currency.rub}
              </p>
              <p 
                className="text-sm flex items-center gap-1"
                style={{ color: remaining >= 0 ? '#16a34a' : '#dc2626' }}
              >
                {remaining >= 0 ? (
                  <><CheckCircle size={14} /> {budget.onTrack}</>
                ) : (
                  <><AlertTriangle size={14} /> {budget.overBudget}</>
                )}
              </p>
            </div>
          </div>

          {/* Budget Categories */}
          <div 
            className="bg-white"
            style={{ 
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.shadows.sm,
            }}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: designTokens.colors.border.light }}>
              <h2 
                className="font-semibold"
                style={{ 
                  fontSize: designTokens.typography.fontSize.h4,
                  color: designTokens.colors.text.primary,
                }}
              >
                Категории бюджета
              </h2>
              <button 
                className="text-sm font-medium flex items-center gap-1"
                style={{ color: designTokens.colors.brand.primary }}
              >
                Настроить <ChevronRight size={16} />
              </button>
            </div>

            <div className="divide-y" style={{ borderColor: designTokens.colors.border.light }}>
              {budgetCategories.map((category) => {
                const Icon = category.icon;
                const progress = Math.min((category.spent / category.budget) * 100, 100);
                const status = getStatus(category.spent, category.budget);
                
                return (
                  <div 
                    key={category.id}
                    className="p-5 flex items-center gap-5 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon size={24} style={{ color: category.color }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p 
                          className="font-medium"
                          style={{ color: designTokens.colors.text.primary }}
                        >
                          {category.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p 
                            className="text-sm"
                            style={{ 
                              color: status === 'over' ? '#dc2626' : 
                                     status === 'warning' ? '#f59e0b' : 
                                     designTokens.colors.text.secondary 
                            }}
                          >
                            {formatMoney(category.spent)} / {formatMoney(category.budget)} {currency.rub}
                          </p>
                          {status === 'over' && (
                            <AlertTriangle size={16} style={{ color: '#dc2626' }} />
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div 
                        className="w-full h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: designTokens.colors.background.muted }}
                      >
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${progress}%`,
                            backgroundColor: status === 'over' ? '#dc2626' : 
                                            status === 'warning' ? '#f59e0b' : 
                                            category.color,
                          }}
                        />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between mt-2">
                        <p 
                          className="text-sm"
                          style={{ color: designTokens.colors.text.muted }}
                        >
                          {Math.round(progress)}% использовано
                        </p>
                        <p 
                          className="text-sm"
                          style={{ 
                            color: status === 'over' ? '#dc2626' : '#16a34a' 
                          }}
                        >
                          {status === 'over' 
                            ? `Превышено на ${formatMoney(category.spent - category.budget)} ${currency.rub}`
                            : `Осталось ${formatMoney(category.budget - category.spent)} ${currency.rub}`
                          }
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <button 
                      className="p-2 rounded-lg hover:bg-gray-100 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit2 size={18} style={{ color: designTokens.colors.text.muted }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tips Section */}
          <div 
            className="mt-8 p-5 bg-white"
            style={{ 
              borderRadius: designTokens.borderRadius.xl,
              boxShadow: designTokens.shadows.sm,
            }}
          >
            <h3 
              className="font-semibold mb-4"
              style={{ 
                fontSize: designTokens.typography.fontSize.h4,
                color: designTokens.colors.text.primary,
              }}
            >
              💡 Советы по бюджету
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#fef3c7' }}
              >
                <p className="font-medium mb-1" style={{ color: '#92400e' }}>
                  Превышение в "Развлечения"
                </p>
                <p className="text-sm" style={{ color: '#a16207' }}>
                  Вы превысили бюджет на 1 800 ₽. Рассмотрите перераспределение средств из других категорий.
                </p>
              </div>
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: '#dcfce7' }}
              >
                <p className="font-medium mb-1" style={{ color: '#166534' }}>
                  Отличная экономия!
                </p>
                <p className="text-sm" style={{ color: '#15803d' }}>
                  В категории "Здоровье" осталось 76% бюджета. Продолжайте в том же духе!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
