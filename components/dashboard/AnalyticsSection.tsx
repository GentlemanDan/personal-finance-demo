'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

type Period = 'week' | 'month' | 'sixMonths' | 'year';

const monthlyData = [
  { month: 'jan', value: 1200, label: translations.months.jan },
  { month: 'feb', value: 1450, label: translations.months.feb },
  { month: 'mar', value: 1350, label: translations.months.mar },
  { month: 'apr', value: 1600, label: translations.months.apr },
  { month: 'may', value: 1753, label: translations.months.may, active: true },
  { month: 'jun', value: 1500, label: translations.months.jun },
];

export function AnalyticsSection() {
  const { analytics } = translations;
  const [activePeriod, setActivePeriod] = useState<Period>('month');

  const periods: { id: Period; label: string }[] = [
    { id: 'week', label: analytics.week },
    { id: 'month', label: analytics.month },
    { id: 'sixMonths', label: analytics.sixMonths },
    { id: 'year', label: analytics.year },
  ];

  const maxValue = Math.max(...monthlyData.map((d) => d.value));
  const expectedIncome = monthlyData.find((d) => d.active)?.value || 1753;

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
          {analytics.title}
        </h2>

        {/* Period Selector Pills */}
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setActivePeriod(period.id)}
              className="transition-all"
              style={{
                height: designTokens.components.buttonPill.height,
                paddingLeft: designTokens.components.buttonPill.paddingX,
                paddingRight: designTokens.components.buttonPill.paddingX,
                borderRadius: designTokens.components.buttonPill.borderRadius,
                fontSize: designTokens.typography.fontSize.small,
                fontWeight: designTokens.typography.fontWeight.medium,
                backgroundColor:
                  activePeriod === period.id
                    ? designTokens.colors.brand.primary
                    : 'transparent',
                color:
                  activePeriod === period.id
                    ? designTokens.colors.text.inverse
                    : designTokens.colors.text.secondary,
                border:
                  activePeriod === period.id
                    ? 'none'
                    : `1px solid ${designTokens.colors.border.default}`,
              }}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Expected Income */}
      <div className="mb-6">
        <div
          className="mb-1"
          style={{
            fontSize: designTokens.typography.fontSize.body,
            color: designTokens.colors.text.muted,
          }}
        >
          {analytics.expectedIncome}
        </div>
        <div
          className="font-bold"
          style={{
            fontSize: designTokens.typography.fontSize.h1,
            color: designTokens.colors.text.primary,
          }}
        >
          ${expectedIncome.toLocaleString('ru-RU')}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-4" style={{ height: '200px' }}>
        {monthlyData.map((data) => {
          const heightPercent = (data.value / maxValue) * 100;

          return (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              {/* Bar */}
              <div
                className="w-full relative"
                style={{
                  height: `${heightPercent}%`,
                  minHeight: '40px',
                }}
              >
                <div
                  className="w-full h-full relative overflow-hidden"
                  style={{
                    backgroundColor: data.active
                      ? designTokens.colors.brand.primary
                      : designTokens.colors.border.light,
                    borderRadius: `${designTokens.borderRadius.md} ${designTokens.borderRadius.md} 0 0`,
                  }}
                >
                  {/* Diagonal stripe pattern for active month */}
                  {data.active && (
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 10px,
                          rgba(255, 255, 255, 0.5) 10px,
                          rgba(255, 255, 255, 0.5) 20px
                        )`,
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Month Label */}
              <div
                style={{
                  fontSize: designTokens.typography.fontSize.small,
                  color: data.active
                    ? designTokens.colors.brand.primary
                    : designTokens.colors.text.muted,
                  fontWeight: data.active
                    ? designTokens.typography.fontWeight.medium
                    : designTokens.typography.fontWeight.regular,
                }}
              >
                {data.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
