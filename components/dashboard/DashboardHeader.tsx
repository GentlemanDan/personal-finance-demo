'use client';

import { Search, Bell } from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName = 'Герасим' }: DashboardHeaderProps) {
  const { greeting } = translations;

  return (
    <header className="flex items-center justify-between mb-8">
      {/* Greeting Section */}
      <div>
        <h1
          className="font-bold"
          style={{
            fontSize: designTokens.typography.fontSize.display,
            color: designTokens.colors.text.primary,
            lineHeight: designTokens.typography.lineHeight.tight,
          }}
        >
          {greeting.goodMorning}, {userName}
        </h1>
        <p
          className="mt-1"
          style={{
            fontSize: designTokens.typography.fontSize.body,
            color: designTokens.colors.text.muted,
          }}
        >
          {greeting.longTimeNoSee}
        </p>
      </div>

      {/* Right Section: Search + Notifications + User */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div
          className="relative flex items-center"
          style={{
            width: '280px',
          }}
        >
          <input
            type="text"
            placeholder={translations.navigation.search}
            className="w-full pr-10 border transition-colors"
            style={{
              height: designTokens.components.input.height,
              borderRadius: designTokens.components.input.borderRadius,
              borderColor: designTokens.colors.border.default,
              background: designTokens.colors.background.card,
              paddingLeft: designTokens.components.input.paddingX,
              paddingRight: '40px',
              fontSize: designTokens.typography.fontSize.body,
              color: designTokens.colors.text.secondary,
            }}
          />
          <Search
            className="absolute right-4"
            size={20}
            style={{ color: designTokens.colors.text.muted }}
          />
        </div>

        {/* Notification Bell */}
        <button
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Уведомления"
        >
          <Bell
            size={20}
            strokeWidth={1.5}
            style={{ color: designTokens.colors.text.secondary }}
          />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <span
            className="font-medium"
            style={{
              fontSize: designTokens.typography.fontSize.body,
              color: designTokens.colors.text.primary,
            }}
          >
            {userName} K.
          </span>
          <div
            className="bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold border-2 border-white"
            style={{
              width: designTokens.components.avatar.md,
              height: designTokens.components.avatar.md,
              borderRadius: designTokens.borderRadius.circle,
              boxShadow: designTokens.shadows.sm,
            }}
          >
            {userName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
