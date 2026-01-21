'use client';

import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

// Mock data for the stock portfolio chart
const portfolioData = [
  { time: '10:00', value: 4216 },
  { time: '13:00', value: 4280 },
  { time: '16:00', value: 4320 },
  { time: '19:00', value: 4380 },
  { time: '22:00', value: 4462 },
  { time: '01:00', value: 4420 },
  { time: '04:00', value: 4350 },
  { time: '07:00', value: 4400 },
  { time: '10:00', value: 4380 },
];

export function StockPortfolioChart() {
  const { portfolio } = translations;

  const minValue = Math.min(...portfolioData.map((d) => d.value));
  const maxValue = Math.max(...portfolioData.map((d) => d.value));
  const valueRange = maxValue - minValue;

  // Find the peak point for the tooltip
  const peakIndex = portfolioData.findIndex((d) => d.value === maxValue);
  const peakData = portfolioData[peakIndex];

  return (
    <section
      style={{
        background: designTokens.colors.background.card,
        borderRadius: designTokens.components.cardSmall.borderRadius,
        boxShadow: designTokens.components.cardSmall.shadow,
        padding: designTokens.components.card.padding,
      }}
    >
      {/* Header */}
      <h2
        className="mb-6 font-semibold"
        style={{
          fontSize: designTokens.typography.fontSize.h3,
          color: designTokens.colors.text.primary,
        }}
      >
        {portfolio.stockPortfolio}
      </h2>

      {/* Chart Container */}
      <div className="relative" style={{ height: '240px' }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between">
          {[maxValue, (maxValue + minValue) / 2, minValue].map((value, index) => (
            <div
              key={index}
              style={{
                fontSize: designTokens.typography.fontSize.tiny,
                color: designTokens.colors.text.muted,
              }}
            >
              ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="ml-16 h-full relative">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full" style={{ height: 'calc(100% - 32px)' }}>
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  style={{
                    stopColor: designTokens.colors.brand.primary,
                    stopOpacity: 0.15,
                  }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: designTokens.colors.brand.primary,
                    stopOpacity: 0,
                  }}
                />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {[0, 33, 67, 100].map((percent) => (
              <line
                key={percent}
                x1="0"
                y1={`${percent}%`}
                x2="100%"
                y2={`${percent}%`}
                stroke={designTokens.colors.border.light}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area chart */}
            <path
              d={generateAreaPath(portfolioData, minValue, valueRange)}
              fill="url(#areaGradient)"
            />

            {/* Line chart */}
            <path
              d={generateLinePath(portfolioData, minValue, valueRange)}
              fill="none"
              stroke={designTokens.colors.brand.primary}
              strokeWidth={designTokens.components.chart.lineWidth}
            />

            {/* Data points */}
            {portfolioData.map((data, index) => {
              const x = (index / (portfolioData.length - 1)) * 100;
              const y =
                ((maxValue - data.value) / valueRange) * 100;

              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r={index === peakIndex ? '4' : '0'}
                  fill="white"
                  stroke={designTokens.colors.brand.primary}
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* Tooltip at peak */}
          {peakData && (
            <div
              className="absolute"
              style={{
                left: `${(peakIndex / (portfolioData.length - 1)) * 100}%`,
                top: '10%',
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div
                className="relative"
                style={{
                  background: designTokens.colors.background.card,
                  borderRadius: designTokens.borderRadius.md,
                  boxShadow: designTokens.shadows.lg,
                  padding: '8px 12px',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  className="font-bold"
                  style={{
                    fontSize: designTokens.typography.fontSize.body,
                    color: designTokens.colors.text.primary,
                  }}
                >
                  ${peakData.value.toLocaleString('en-US')}
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{
                    fontSize: designTokens.typography.fontSize.small,
                    color: designTokens.colors.semantic.success,
                  }}
                >
                  ↗ +5.2%
                </div>

                {/* Arrow pointer */}
                <div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: '-6px',
                    width: '12px',
                    height: '12px',
                    background: designTokens.colors.background.card,
                    transform: 'translateX(-50%) rotate(45deg)',
                    boxShadow: designTokens.shadows.md,
                  }}
                />
              </div>
            </div>
          )}

          {/* X-axis labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {portfolioData.map((data, index) => (
              <div
                key={index}
                style={{
                  fontSize: designTokens.typography.fontSize.tiny,
                  color: designTokens.colors.text.muted,
                }}
              >
                {data.time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function generateLinePath(data: typeof portfolioData, minValue: number, valueRange: number): string {
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((Math.max(...data.map((p) => p.value)) - d.value) / valueRange) * 100;
    return `${x},${y}`;
  });

  return `M ${points.join(' L ')}`;
}

function generateAreaPath(data: typeof portfolioData, minValue: number, valueRange: number): string {
  const linePath = generateLinePath(data, minValue, valueRange);
  const lastX = ((data.length - 1) / (data.length - 1)) * 100;
  return `${linePath} L ${lastX},100 L 0,100 Z`;
}
