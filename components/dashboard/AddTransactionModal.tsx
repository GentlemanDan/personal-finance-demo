'use client';

import * as React from 'react';
import { 
  Dialog,
  DialogContent,
} from '@/components/shared/ui/dialog';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  ShoppingCart,
  Coffee,
  Car,
  Home,
  Smartphone,
  Heart,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import { designTokens } from '@/lib/design-tokens';
import { translations } from '@/lib/translations';

const { categories } = translations;

type TransactionType = 'expense' | 'income';

interface AddTransactionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (transaction: {
    title: string;
    category: string;
    amount: number;
    date: string;
    type: TransactionType;
  }) => void;
}

// Категории с иконками
const expenseCategories = [
  { id: 'food', label: categories.food, icon: ShoppingCart, color: '#10b981' },
  { id: 'entertainment', label: categories.entertainment, icon: Coffee, color: '#f59e0b' },
  { id: 'transport', label: categories.transport, icon: Car, color: '#3b82f6' },
  { id: 'housing', label: categories.housing, icon: Home, color: '#8b5cf6' },
  { id: 'subscriptions', label: categories.subscriptions, icon: Smartphone, color: '#ec4899' },
  { id: 'health', label: categories.health, icon: Heart, color: '#ef4444' },
];

const incomeCategories = [
  { id: 'salary', label: categories.salary, icon: Briefcase, color: '#10b981' },
  { id: 'other', label: 'Другое', icon: DollarSign, color: '#3b82f6' },
];

export function AddTransactionModal({ 
  open, 
  onOpenChange, 
  onAddTransaction 
}: AddTransactionModalProps) {
  const [activeTab, setActiveTab] = React.useState<TransactionType>('expense');
  const [amount, setAmount] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const currentCategories = activeTab === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = () => {
    if (!amount || !selectedCategory) {
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    const categoryObj = currentCategories.find(c => c.id === selectedCategory);

    onAddTransaction({
      title: categoryObj?.label || 'Транзакция',
      category: categoryObj?.label || '',
      amount: activeTab === 'expense' ? -amountNum : amountNum,
      date: new Date().toLocaleString('ru-RU', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: activeTab,
    });

    // Reset form
    setAmount('');
    setSelectedCategory('');
    onOpenChange(false);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Автоматически переключаем на поле суммы
    setTimeout(() => {
      const amountInput = document.getElementById('amount-input');
      amountInput?.focus();
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        style={{ 
          maxWidth: '460px',
          borderRadius: '24px',
          backgroundColor: '#fff',
          padding: '32px',
        }}
      >
        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => {
              setActiveTab('expense');
              setSelectedCategory('');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-all font-medium"
            style={{
              backgroundColor: activeTab === 'expense' ? '#fee2e2' : designTokens.colors.background.muted,
              color: activeTab === 'expense' ? '#dc2626' : designTokens.colors.text.secondary,
            }}
          >
            <ArrowUpRight size={20} />
            Расход
          </button>
          <button
            onClick={() => {
              setActiveTab('income');
              setSelectedCategory('');
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl transition-all font-medium"
            style={{
              backgroundColor: activeTab === 'income' ? '#dcfce7' : designTokens.colors.background.muted,
              color: activeTab === 'income' ? '#16a34a' : designTokens.colors.text.secondary,
            }}
          >
            <ArrowDownLeft size={20} />
            Доход
          </button>
        </div>

        {/* Categories Grid */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3" style={{ color: designTokens.colors.text.secondary }}>
            Выберите категорию
          </p>
          <div className="grid grid-cols-3 gap-3">
            {currentCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
                  style={{
                    backgroundColor: isSelected ? `${cat.color}15` : designTokens.colors.background.muted,
                    border: `2px solid ${isSelected ? cat.color : 'transparent'}`,
                  }}
                >
                  <Icon size={24} style={{ color: cat.color }} />
                  <span 
                    className="text-xs font-medium text-center"
                    style={{ color: designTokens.colors.text.primary }}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Input - Large and centered */}
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <input
              id="amount-input"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              step="1"
              min="0"
              className="text-center outline-none font-bold w-full"
              style={{
                fontSize: '48px',
                color: designTokens.colors.text.primary,
                backgroundColor: 'transparent',
                border: 'none',
              }}
              autoComplete="off"
            />
            <span 
              className="text-2xl font-medium"
              style={{ color: designTokens.colors.text.muted }}
            >
              ₽
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 py-3 px-4 font-medium rounded-xl transition-colors"
            style={{
              backgroundColor: designTokens.colors.background.muted,
              color: designTokens.colors.text.secondary,
            }}
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={!amount || !selectedCategory}
            className="flex-1 py-3 px-4 font-medium text-white rounded-xl transition-all"
            style={{
              backgroundColor: (!amount || !selectedCategory) 
                ? designTokens.colors.text.muted 
                : designTokens.colors.brand.primary,
              cursor: (!amount || !selectedCategory) ? 'not-allowed' : 'pointer',
              opacity: (!amount || !selectedCategory) ? 0.5 : 1,
            }}
          >
            Добавить
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
