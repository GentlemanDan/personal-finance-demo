'use client';

import { ChevronDown } from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

interface Transaction {
  id: string;
  name: string;
  type: string;
  amount: number;
  avatar: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Александра С.',
    type: translations.transactions.paymentForGoods,
    amount: -245.50,
    avatar: 'А',
    date: 'today',
  },
  {
    id: '2',
    name: 'Apple Inc.',
    type: translations.transactions.shares,
    amount: 1200.00,
    avatar: '🍎',
    date: 'today',
  },
  {
    id: '3',
    name: 'Михаил П.',
    type: translations.transactions.transfer,
    amount: -500.00,
    avatar: 'М',
    date: 'today',
  },
  {
    id: '4',
    name: 'Vimeo Pro',
    type: translations.transactions.paymentForGoods,
    amount: -19.99,
    avatar: 'V',
    date: '14 сентября, Сб',
  },
  {
    id: '5',
    name: 'Kotlin Conf',
    type: translations.transactions.paymentForGoods,
    amount: -299.00,
    avatar: 'K',
    date: '14 сентября, Сб',
  },
];

export function TransactionsList() {
  const { transactions } = translations;

  const todayTransactions = mockTransactions.filter((t) => t.date === 'today');
  const olderTransactions = mockTransactions.filter((t) => t.date !== 'today');

  return (
    <section
      className="mb-8"
      style={{
        background: designTokens.colors.background.card,
        borderRadius: designTokens.components.cardSmall.borderRadius,
        boxShadow: designTokens.components.cardSmall.shadow,
        padding: designTokens.components.card.padding,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="font-semibold"
          style={{
            fontSize: designTokens.typography.fontSize.h3,
            color: designTokens.colors.text.primary,
          }}
        >
          {transactions.title}
        </h2>

        {/* Filter Dropdowns */}
        <div className="flex gap-2">
          <FilterDropdown label={transactions.period} />
          <FilterDropdown label={transactions.cardOrAccount} />
        </div>
      </div>

      {/* Today's Transactions */}
      <div className="mb-6">
        <div
          className="mb-3 uppercase tracking-wide"
          style={{
            fontSize: designTokens.typography.fontSize.small,
            color: designTokens.colors.text.muted,
            fontWeight: designTokens.typography.fontWeight.medium,
          }}
        >
          {transactions.today}
        </div>

        <div className="space-y-3">
          {todayTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>

      {/* Older Transactions */}
      {olderTransactions.length > 0 && (
        <div>
          <div
            className="mb-3 uppercase tracking-wide"
            style={{
              fontSize: designTokens.typography.fontSize.small,
              color: designTokens.colors.text.muted,
              fontWeight: designTokens.typography.fontWeight.medium,
            }}
          >
            14 сентября, Сб
          </div>

          <div className="space-y-3">
            {olderTransactions.map((transaction) => (
              <TransactionRow key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button
      className="flex items-center gap-2 transition-colors hover:bg-gray-100"
      style={{
        height: designTokens.components.dropdown.height,
        paddingLeft: designTokens.components.dropdown.paddingX,
        paddingRight: designTokens.components.dropdown.paddingX,
        borderRadius: designTokens.components.dropdown.borderRadius,
        backgroundColor: designTokens.components.dropdown.background,
        fontSize: designTokens.typography.fontSize.small,
        color: designTokens.colors.text.secondary,
        fontWeight: designTokens.typography.fontWeight.medium,
      }}
    >
      {label}
      <ChevronDown size={14} />
    </button>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isNegative = transaction.amount < 0;

  return (
    <div className="flex items-center justify-between py-2">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="flex items-center justify-center font-semibold text-white bg-gradient-to-br from-purple-400 to-pink-400"
          style={{
            width: designTokens.components.avatar.md,
            height: designTokens.components.avatar.md,
            borderRadius: designTokens.borderRadius.circle,
            fontSize: designTokens.typography.fontSize.body,
          }}
        >
          {transaction.avatar}
        </div>

        {/* Name and Type */}
        <div>
          <div
            className="font-semibold"
            style={{
              fontSize: designTokens.typography.fontSize.body,
              color: designTokens.colors.text.primary,
            }}
          >
            {transaction.name}
          </div>
          <div
            style={{
              fontSize: designTokens.typography.fontSize.small,
              color: designTokens.colors.text.muted,
            }}
          >
            {transaction.type}
          </div>
        </div>
      </div>

      {/* Right: Amount */}
      <div
        className="font-semibold"
        style={{
          fontSize: designTokens.typography.fontSize.body,
          color: isNegative
            ? designTokens.colors.text.primary
            : designTokens.colors.semantic.success,
        }}
      >
        {isNegative ? '' : '+'}$
        {Math.abs(transaction.amount).toLocaleString('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}
