'use client';

import { TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

interface KPICardProps {
  type: 'balance' | 'income' | 'expenses';
  value: number;
  trend: number;
  currency?: string;
}

const cardStyles = {
  balance: {
    background: 'linear-gradient(135deg, #E8EDFD 0%, #FFFFFF 100%)',
    decorativeColor: '#B8C5E8',
  },
  income: {
    background: 'linear-gradient(135deg, #C8F5E0 0%, #FFFFFF 100%)',
    decorativeColor: '#A0E7C8',
  },
  expenses: {
    background: 'linear-gradient(135deg, #E8EDFD 0%, #D8DFF8 100%)',
    decorativeColor: '#C8D2F5',
  },
};

export function OverviewCards() {
  const { overview } = translations;

  const cards: KPICardProps[] = [
    { type: 'balance', value: 1655, trend: 12, currency: '$' },
    { type: 'income', value: 2340, trend: 8.5, currency: '$' },
    { type: 'expenses', value: 1262.22, trend: -3.2, currency: '$' },
  ];

  return (
    <section className="mb-8">
      <h2
        className="mb-4 font-semibold"
        style={{
          fontSize: designTokens.typography.fontSize.h3,
          color: designTokens.colors.text.primary,
        }}
      >
        {overview.title}
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {cards.map((card) => (
          <KPICard key={card.type} {...card} />
        ))}
      </div>
    </section>
  );
}

function KPICard({ type, value, trend, currency = '$' }: KPICardProps) {
  const { overview } = translations;
  const labels = {
    balance: overview.balance,
    income: overview.income,
    expenses: overview.expenses,
  };

  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const style = cardStyles[type];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: style.background,
        borderRadius: designTokens.components.card.borderRadius,
        boxShadow: designTokens.components.card.shadow,
        padding: designTokens.components.card.padding,
        minHeight: '160px',
      }}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3">
        {/* Icon placeholder */}
        <div
          className="flex items-center justify-center"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: designTokens.borderRadius.md,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <span
            style={{
              fontSize: '16px',
              color: designTokens.colors.text.secondary,
            }}
          >
            {type === 'balance' ? '💰' : type === 'income' ? '📈' : '💸'}
          </span>
        </div>

        {/* Menu button */}
        <button className="p-1 hover:bg-white/30 rounded-lg transition-colors">
          <MoreVertical
            size={16}
            style={{ color: designTokens.colors.text.muted }}
          />
        </button>
      </div>

      {/* Label */}
      <div
        className="mb-2"
        style={{
          fontSize: designTokens.typography.fontSize.body,
          color: designTokens.colors.text.secondary,
          fontWeight: designTokens.typography.fontWeight.regular,
        }}
      >
        {labels[type]}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-2">
        <span
          className="font-bold"
          style={{
            fontSize: designTokens.typography.fontSize.display,
            color: designTokens.colors.text.primary,
            lineHeight: 1,
          }}
        >
          {currency}
          {value.toLocaleString('ru-RU', {
            minimumFractionDigits: type === 'expenses' ? 2 : 0,
            maximumFractionDigits: type === 'expenses' ? 2 : 0,
          })}
        </span>
      </div>

      {/* Trend */}
      <div className="flex items-center gap-1">
        <TrendIcon
          size={14}
          style={{
            color: isPositive
              ? designTokens.colors.semantic.success
              : designTokens.colors.semantic.error,
          }}
        />
        <span
          style={{
            fontSize: designTokens.typography.fontSize.small,
            color: isPositive
              ? designTokens.colors.semantic.success
              : designTokens.colors.semantic.error,
            fontWeight: designTokens.typography.fontWeight.regular,
          }}
        >
          {isPositive ? '+' : ''}
          {trend}%
        </span>
      </div>

      {/* Decorative element */}
      <div
        className="absolute bottom-0 right-0 opacity-20"
        style={{
          width: '80px',
          height: '80px',
          background: `radial-gradient(circle, ${style.decorativeColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
