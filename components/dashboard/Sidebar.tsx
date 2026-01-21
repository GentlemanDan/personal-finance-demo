'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  PieChart,
  BarChart3,
  Target,
  Settings,
  LogOut,
} from 'lucide-react';
import { translations } from '@/lib/translations';
import { designTokens } from '@/lib/design-tokens';

const { navigation, app } = translations;

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}

const primaryNavItems: NavItem[] = [
  { id: 'dashboard', label: navigation.dashboard, icon: LayoutDashboard, path: '/' },
  { id: 'accounts', label: navigation.accounts, icon: Wallet, path: '/dashboard/accounts' },
  { id: 'transactions', label: navigation.transactions, icon: Receipt, path: '/dashboard/transactions' },
  { id: 'budget', label: navigation.budget, icon: PieChart, path: '/dashboard/budget' },
  { id: 'analytics', label: navigation.analytics, icon: BarChart3, path: '/dashboard/analytics' },
  { id: 'goals', label: navigation.goals, icon: Target, path: '/dashboard/goals' },
];

const secondaryNavItems: NavItem[] = [
  { id: 'settings', label: navigation.settings, icon: Settings, path: '/dashboard/settings' },
  { id: 'logout', label: navigation.logout, icon: LogOut, path: '/logout' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string, id: string) => {
    if (id === 'logout') {
      console.log('Logging out...');
      return;
    }
    router.push(path);
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen bg-white flex flex-col"
      style={{
        width: designTokens.layout.sidebar.width,
        boxShadow: designTokens.shadows.sm,
        zIndex: designTokens.zIndex.sticky,
      }}
    >
      {/* Logo */}
      <div className="flex items-center px-5 py-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <div 
            className="flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: designTokens.borderRadius.lg,
            }}
          >
            ₽
          </div>
          <span 
            className="font-bold"
            style={{
              color: designTokens.colors.text.primary,
              fontSize: designTokens.typography.fontSize.h4,
            }}
          >
            {app.name}
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === 'dashboard' 
              ? pathname === '/' 
              : pathname === item.path;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path, item.id)}
                  className="w-full flex items-center gap-3 transition-all"
                  style={{
                    height: designTokens.components.navItem.height,
                    paddingLeft: designTokens.components.navItem.paddingX,
                    paddingRight: designTokens.components.navItem.paddingX,
                    paddingTop: designTokens.components.navItem.paddingY,
                    paddingBottom: designTokens.components.navItem.paddingY,
                    borderRadius: designTokens.components.navItem.borderRadius,
                    backgroundColor: isActive
                      ? `${designTokens.colors.brand.primary}15`
                      : 'transparent',
                    color: isActive
                      ? designTokens.colors.brand.primary
                      : designTokens.colors.text.primary,
                    fontSize: designTokens.typography.fontSize.body,
                    fontWeight: isActive
                      ? designTokens.typography.fontWeight.medium
                      : designTokens.typography.fontWeight.regular,
                  }}
                >
                  <Icon
                    size={parseInt(designTokens.components.navItem.iconSize)}
                    strokeWidth={1.5}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Secondary Navigation */}
      <nav className="px-3 pb-6">
        <ul className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path, item.id)}
                  className="w-full flex items-center gap-3 transition-all"
                  style={{
                    height: designTokens.components.navItem.height,
                    paddingLeft: designTokens.components.navItem.paddingX,
                    paddingRight: designTokens.components.navItem.paddingX,
                    paddingTop: designTokens.components.navItem.paddingY,
                    paddingBottom: designTokens.components.navItem.paddingY,
                    borderRadius: designTokens.components.navItem.borderRadius,
                    backgroundColor: isActive
                      ? `${designTokens.colors.brand.primary}15`
                      : 'transparent',
                    color: isActive
                      ? designTokens.colors.brand.primary
                      : designTokens.colors.text.primary,
                    fontSize: designTokens.typography.fontSize.body,
                    fontWeight: isActive
                      ? designTokens.typography.fontWeight.medium
                      : designTokens.typography.fontWeight.regular,
                  }}
                >
                  <Icon
                    size={parseInt(designTokens.components.navItem.iconSize)}
                    strokeWidth={1.5}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
