'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { 
  Plus, 
  Target,
  Car,
  Plane,
  Home,
  Laptop,
  GraduationCap,
  Gift,
  MoreVertical,
  TrendingUp,
  Calendar,
  Wallet,
  ChevronRight,
  X,
  Check,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { goals, currency } = translations;

// Иконки для целей
const goalIcons: Record<string, React.ElementType> = {
  'car': Car,
  'travel': Plane,
  'home': Home,
  'tech': Laptop,
  'education': GraduationCap,
  'gift': Gift,
  'other': Target,
};

// Моковые цели
const mockGoals = [
  { 
    id: 1, 
    name: 'Новая машина', 
    icon: 'car',
    target: 2000000, 
    saved: 450000,
    color: '#3b82f6',
    deadline: '2026-12-31',
    monthlyContribution: 50000,
    priority: 'high',
  },
  { 
    id: 2, 
    name: 'Отпуск в Таиланде', 
    icon: 'travel',
    target: 250000, 
    saved: 180000,
    color: '#10b981',
    deadline: '2026-06-01',
    monthlyContribution: 20000,
    priority: 'medium',
  },
  { 
    id: 3, 
    name: 'MacBook Pro', 
    icon: 'tech',
    target: 350000, 
    saved: 280000,
    color: '#8b5cf6',
    deadline: '2026-03-15',
    monthlyContribution: 35000,
    priority: 'high',
  },
  { 
    id: 4, 
    name: 'Подушка безопасности', 
    icon: 'other',
    target: 500000, 
    saved: 320000,
    color: '#f59e0b',
    deadline: null,
    monthlyContribution: 30000,
    priority: 'high',
  },
  { 
    id: 5, 
    name: 'Курсы английского', 
    icon: 'education',
    target: 80000, 
    saved: 45000,
    color: '#ec4899',
    deadline: '2026-02-28',
    monthlyContribution: 15000,
    priority: 'medium',
  },
];

export default function GoalsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const totalTarget = mockGoals.reduce((s, g) => s + g.target, 0);
  const totalSaved = mockGoals.reduce((s, g) => s + g.saved, 0);
  const overallProgress = Math.round((totalSaved / totalTarget) * 100);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Без срока';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getDaysRemaining = (dateStr: string | null) => {
    if (!dateStr) return null;
    const target = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
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
                {goals.title}
              </h1>
              <p style={{ color: designTokens.colors.text.secondary, marginTop: '4px' }}>
                Ваши финансовые цели и накопления
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
              {goals.addGoal}
            </button>
          </header>

          {/* Overview Card */}
          <div 
            className="p-6 mb-8"
            style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              borderRadius: designTokens.borderRadius.xl,
              color: 'white',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="opacity-80 text-sm mb-1">Общий прогресс</p>
                <p className="text-4xl font-bold mb-4">{overallProgress}%</p>
                
                <div 
                  className="w-full h-3 rounded-full mb-4"
                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${overallProgress}%`,
                      backgroundColor: 'white',
                    }}
                  />
                </div>

                <div className="flex gap-8">
                  <div>
                    <p className="opacity-80 text-sm">{goals.saved}</p>
                    <p className="text-xl font-bold">{formatMoney(totalSaved)} {currency.rub}</p>
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">{goals.targetAmount}</p>
                    <p className="text-xl font-bold">{formatMoney(totalTarget)} {currency.rub}</p>
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">{goals.remaining}</p>
                    <p className="text-xl font-bold">{formatMoney(totalTarget - totalSaved)} {currency.rub}</p>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <Target size={120} className="opacity-20" />
              </div>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockGoals.map((goal) => {
              const Icon = goalIcons[goal.icon] || Target;
              const progress = Math.round((goal.saved / goal.target) * 100);
              const daysLeft = getDaysRemaining(goal.deadline);
              
              return (
                <div 
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id === selectedGoal ? null : goal.id)}
                  className="p-5 bg-white cursor-pointer transition-all hover:shadow-md"
                  style={{ 
                    borderRadius: designTokens.borderRadius.xl,
                    boxShadow: designTokens.shadows.sm,
                    border: selectedGoal === goal.id 
                      ? `2px solid ${goal.color}` 
                      : '2px solid transparent',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${goal.color}15` }}
                    >
                      <Icon size={24} style={{ color: goal.color }} />
                    </div>
                    <button 
                      className="p-1 rounded-lg hover:bg-gray-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical size={18} style={{ color: designTokens.colors.text.muted }} />
                    </button>
                  </div>

                  <h3 
                    className="font-semibold mb-2"
                    style={{ 
                      color: designTokens.colors.text.primary,
                      fontSize: designTokens.typography.fontSize.body,
                    }}
                  >
                    {goal.name}
                  </h3>

                  {/* Progress Bar */}
                  <div 
                    className="w-full h-2 rounded-full mb-3"
                    style={{ backgroundColor: designTokens.colors.background.muted }}
                  >
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${progress}%`,
                        backgroundColor: goal.color,
                      }}
                    />
                  </div>

                  {/* Amount Info */}
                  <div className="flex items-center justify-between mb-3">
                    <p 
                      className="font-bold"
                      style={{ color: goal.color }}
                    >
                      {formatMoney(goal.saved)} {currency.rub}
                    </p>
                    <p 
                      className="text-sm"
                      style={{ color: designTokens.colors.text.secondary }}
                    >
                      из {formatMoney(goal.target)} {currency.rub}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div 
                    className="flex items-center justify-between text-sm pt-3 border-t"
                    style={{ borderColor: designTokens.colors.border.light }}
                  >
                    <div className="flex items-center gap-1">
                      <Calendar size={14} style={{ color: designTokens.colors.text.muted }} />
                      <span style={{ color: designTokens.colors.text.secondary }}>
                        {daysLeft !== null ? `${daysLeft} дн.` : 'Без срока'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} style={{ color: designTokens.colors.text.muted }} />
                      <span style={{ color: designTokens.colors.text.secondary }}>
                        {progress}%
                      </span>
                    </div>
                  </div>

                  {/* Contribute Button (shown when selected) */}
                  {selectedGoal === goal.id && (
                    <button 
                      className="w-full mt-4 py-2 font-medium flex items-center justify-center gap-2"
                      style={{ 
                        backgroundColor: goal.color,
                        color: 'white',
                        borderRadius: designTokens.borderRadius.lg,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle contribution
                      }}
                    >
                      <Wallet size={16} />
                      {goals.contribute}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Add Goal Card */}
            <div 
              onClick={() => setShowAddModal(true)}
              className="p-5 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-gray-50"
              style={{ 
                borderRadius: designTokens.borderRadius.xl,
                border: `2px dashed ${designTokens.colors.border.light}`,
                minHeight: '240px',
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
                {goals.addGoal}
              </p>
            </div>
          </div>

          {/* Tips */}
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
              🎯 Ближайшие цели
            </h3>
            <div className="space-y-3">
              {mockGoals
                .filter(g => g.deadline)
                .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
                .slice(0, 3)
                .map((goal) => {
                  const Icon = goalIcons[goal.icon] || Target;
                  const progress = Math.round((goal.saved / goal.target) * 100);
                  
                  return (
                    <div 
                      key={goal.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: designTokens.colors.background.muted }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${goal.color}15` }}
                        >
                          <Icon size={20} style={{ color: goal.color }} />
                        </div>
                        <div>
                          <p 
                            className="font-medium"
                            style={{ color: designTokens.colors.text.primary }}
                          >
                            {goal.name}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ color: designTokens.colors.text.secondary }}
                          >
                            {formatDate(goal.deadline)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p 
                          className="font-semibold"
                          style={{ color: goal.color }}
                        >
                          {progress}%
                        </p>
                        <p 
                          className="text-sm"
                          style={{ color: designTokens.colors.text.secondary }}
                        >
                          осталось {formatMoney(goal.target - goal.saved)} {currency.rub}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>

      {/* Add Goal Modal */}
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
                Новая цель
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <X size={20} style={{ color: designTokens.colors.text.muted }} />
              </button>
            </div>

            {/* Goal Name */}
            <div className="mb-4">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Название цели
              </label>
              <input
                type="text"
                placeholder="Например: Новая машина"
                className="w-full p-3 outline-none"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              />
            </div>

            {/* Target Amount */}
            <div className="mb-4">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Целевая сумма
              </label>
              <input
                type="text"
                placeholder="0"
                className="w-full p-3 outline-none"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              />
            </div>

            {/* Deadline */}
            <div className="mb-4">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Срок достижения
              </label>
              <input
                type="date"
                className="w-full p-3 outline-none"
                style={{ 
                  borderRadius: designTokens.borderRadius.lg,
                  border: `1px solid ${designTokens.colors.border.light}`,
                  color: designTokens.colors.text.primary,
                }}
              />
            </div>

            {/* Icon Selection */}
            <div className="mb-6">
              <label 
                className="block text-sm mb-2"
                style={{ color: designTokens.colors.text.secondary }}
              >
                Иконка
              </label>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(goalIcons).map(([key, Icon]) => (
                  <button
                    key={key}
                    className="p-3 rounded-lg border-2 transition-colors"
                    style={{ 
                      borderColor: designTokens.colors.border.light,
                    }}
                  >
                    <Icon size={20} style={{ color: designTokens.colors.text.secondary }} />
                  </button>
                ))}
              </div>
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
              Создать цель
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
