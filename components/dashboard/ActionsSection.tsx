'use client';

import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

export function ActionsSection() {
  const { actions } = translations;

  return (
    <section className="mb-8">
      <h2
        className="mb-4 font-semibold"
        style={{
          fontSize: designTokens.typography.fontSize.h3,
          color: designTokens.colors.text.primary,
        }}
      >
        {actions.title}
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {/* Transfer Button */}
        <ActionButton
          icon={<ArrowUpRight size={20} />}
          label={actions.transfer}
        />

        {/* Receive Button */}
        <ActionButton
          icon={<ArrowDownLeft size={20} />}
          label={actions.receive}
        />

        {/* Expenses Card */}
        <ExpensesCard />

        {/* Favorite Spends Card */}
        <FavoriteSpends />
      </div>

      {/* Feature Cards Row */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <FeatureCard
          title={actions.investments}
          imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
        />
        <FeatureCard
          title={actions.yourFinances}
          imageUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
        />
        <FeatureCard
          title={actions.piggyBank}
          imageUrl="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&h=300&fit=crop"
        />
      </div>
    </section>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-2 transition-all hover:shadow-lg"
      style={{
        height: '100px',
        background: designTokens.colors.background.card,
        border: `1px solid ${designTokens.colors.border.default}`,
        borderRadius: designTokens.borderRadius.xl,
        padding: designTokens.spacing.md,
      }}
    >
      <div
        className="flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-50"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: designTokens.borderRadius.circle,
          color: designTokens.colors.brand.primary,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: designTokens.typography.fontSize.body,
          color: designTokens.colors.text.primary,
          fontWeight: designTokens.typography.fontWeight.medium,
        }}
      >
        {label}
      </span>
    </button>
  );
}

function ExpensesCard() {
  const { actions } = translations;

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        height: '100px',
        background: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.xl,
        boxShadow: designTokens.shadows.md,
        padding: designTokens.spacing.md,
      }}
    >
      <div
        style={{
          fontSize: designTokens.typography.fontSize.small,
          color: designTokens.colors.text.secondary,
          fontWeight: designTokens.typography.fontWeight.medium,
        }}
      >
        {actions.expensesInMay}
      </div>

      <div>
        <div
          className="font-bold mb-2"
          style={{
            fontSize: designTokens.typography.fontSize.h4,
            color: designTokens.colors.text.primary,
          }}
        >
          $1,262.22
        </div>

        {/* Progress Bar */}
        <div
          className="relative overflow-hidden"
          style={{
            height: designTokens.components.progressBar.height,
            borderRadius: designTokens.components.progressBar.borderRadius,
            backgroundColor: designTokens.components.progressBar.background,
          }}
        >
          <div className="absolute inset-y-0 left-0 flex">
            <div
              style={{
                width: '35%',
                backgroundColor: designTokens.colors.accent.cyan,
              }}
            />
            <div
              style={{
                width: '30%',
                backgroundColor: designTokens.colors.accent.lime,
              }}
            />
            <div
              style={{
                width: '25%',
                backgroundColor: designTokens.colors.accent.lavender,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoriteSpends() {
  const { actions } = translations;

  const brands = [
    { name: 'Vimeo', color: 'from-blue-400 to-blue-600', initial: 'V' },
    { name: 'Kotlin', color: 'from-orange-400 to-purple-600', initial: 'K' },
    { name: 'Other', color: 'from-orange-400 to-red-500', initial: 'O' },
  ];

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        height: '100px',
        background: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.xl,
        boxShadow: designTokens.shadows.md,
        padding: designTokens.spacing.md,
      }}
    >
      <div
        style={{
          fontSize: designTokens.typography.fontSize.small,
          color: designTokens.colors.text.secondary,
          fontWeight: designTokens.typography.fontWeight.medium,
        }}
      >
        {actions.favoriteSpends}
      </div>

      {/* Brand Icons */}
      <div className="flex -space-x-2">
        {brands.map((brand, index) => (
          <div
            key={index}
            className={`flex items-center justify-center text-white font-semibold bg-gradient-to-br ${brand.color} border-2 border-white`}
            style={{
              width: designTokens.components.avatar.sm,
              height: designTokens.components.avatar.sm,
              borderRadius: designTokens.borderRadius.circle,
              fontSize: designTokens.typography.fontSize.small,
              zIndex: brands.length - index,
            }}
          >
            {brand.initial}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ title, imageUrl }: { title: string; imageUrl: string }) {
  return (
    <div
      className="relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
      style={{
        height: '120px',
        borderRadius: designTokens.borderRadius.xl,
        boxShadow: designTokens.shadows.md,
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
        }}
      />

      {/* Title */}
      <div className="absolute bottom-3 left-3">
        <h3
          className="font-bold text-white"
          style={{
            fontSize: designTokens.typography.fontSize.body,
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  );
}
