# EdgesPay Dashboard - Quick Reference

## 🚀 Quick Start

```bash
# Navigate to project
cd /Users/denis/Projects/Personal_Finance/vibe-coding-starter

# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:6006/dashboard
```

## 📁 File Locations

| What | Where |
|------|-------|
| Main Page | `/app/dashboard/page.tsx` |
| Components | `/components/dashboard/` |
| Design Tokens | `/lib/design-tokens.ts` |
| Translations | `/lib/translations.ts` |
| Styles | `/css/globals.css` |
| Documentation | `/components/dashboard/README.md` |

## 🎨 Design Tokens Quick Access

```typescript
import { designTokens } from '@/lib/design-tokens';

// Colors
designTokens.colors.brand.primary        // #988bee
designTokens.colors.background.page      // #F5F7FB
designTokens.colors.text.primary         // #07071b

// Typography
designTokens.typography.fontSize.h1      // 28px
designTokens.typography.fontWeight.bold  // 700

// Spacing
designTokens.spacing.xl                  // 24px
designTokens.spacing['2xl']              // 32px

// Border Radius
designTokens.borderRadius.xl             // 16px
designTokens.borderRadius['2xl']         // 20px

// Shadows
designTokens.shadows.md                  // 0 4px 20px rgba(0,0,0,0.06)
```

## 🌐 Translations Quick Access

```typescript
import { translations } from '@/lib/translations';

// Navigation
translations.navigation.dashboard        // Главная
translations.navigation.analytics        // Аналитика

// Overview
translations.overview.balance           // Баланс
translations.overview.income            // Доход

// Analytics
translations.analytics.week             // Неделя
translations.analytics.expectedIncome   // Ожидаемый доход

// Months
translations.months.jan                 // Янв
translations.months.feb                 // Фев
```

## 📦 Component Import

```typescript
// Import all at once
import {
  Sidebar,
  DashboardHeader,
  OverviewCards,
  AnalyticsSection,
  TransactionsList,
  ActionsSection,
  StockPortfolioChart,
} from '@/components/dashboard';

// Or individually
import { Sidebar } from '@/components/dashboard/Sidebar';
```

## 🎯 Common Customizations

### Change User Name
```tsx
<DashboardHeader userName="Мария" />
```

### Update KPI Values
```tsx
// In OverviewCards.tsx
{ type: 'balance', value: 2500, trend: 15 }
```

### Modify Chart Data
```tsx
// In AnalyticsSection.tsx
{ month: 'jan', value: 1500, label: translations.months.jan }
```

### Add New Navigation Item
```tsx
// In Sidebar.tsx
{ id: 'reports', label: 'Отчёты', icon: FileText }
```

## 🎨 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary Purple | `#988bee` | Buttons, active states |
| Light Lavender | `#e8edfd` | Card backgrounds |
| Dark Navy | `#07071b` | Text, headings |
| Page Background | `#F5F7FB` | Main background |
| Mint Green | `#C8F5E0` | Income indicators |
| Cyan | `#5CE5D5` | Progress bars |
| Lime | `#B8F060` | Progress bars |

## 📏 Common Sizes

| Component | Width/Height |
|-----------|--------------|
| Sidebar | 220px width |
| Nav Item | 48px height |
| Button | 44px height |
| Avatar (md) | 40px |
| Card Border Radius | 20px |
| Icon Size | 20px |

## 🔧 Troubleshooting

### Components Not Rendering
```bash
# Check for TypeScript errors
npm run lint

# Rebuild
rm -rf .next && npm run dev
```

### Fonts Not Loading
```tsx
// Verify in app/layout.tsx
className={`${rubikFont.variable} ...`}
```

### Translations Not Working
```typescript
// Check import
import { translations } from '@/lib/translations';

// Verify usage
{translations.navigation.dashboard}
```

## 📊 Component Props

### DashboardHeader
```typescript
interface Props {
  userName?: string; // Default: "Габби"
}
```

### KPICard (in OverviewCards)
```typescript
interface Props {
  type: 'balance' | 'income' | 'expenses';
  value: number;
  trend: number;
  currency?: string; // Default: "$"
}
```

### Transaction (in TransactionsList)
```typescript
interface Transaction {
  id: string;
  name: string;
  type: string;
  amount: number;
  avatar: string;
  date: string;
}
```

## 🎓 Key Concepts

1. **Design Tokens** - Centralized design values, never hardcode
2. **Client Components** - Use `'use client'` for interactive components
3. **Responsive** - Built mobile-first, desktop-optimized
4. **TypeScript** - Fully typed props and interfaces
5. **Modular** - Each component is self-contained

## 📱 Responsive Breakpoints

```typescript
// From design-tokens.ts
breakpoints: {
  mobile: '320px',   // sm
  tablet: '768px',   // md
  desktop: '1024px', // lg
  wide: '1440px',    // xl
}
```

## 🔗 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run serve        # Start production server

# Code Quality
npm run lint         # Lint code
npm run pretty       # Format code

# Other
npm run analyze      # Analyze bundle size
```

## 📋 Checklist for Adding New Features

- [ ] Create component in `/components/dashboard/`
- [ ] Add translations to `/lib/translations.ts`
- [ ] Use design tokens from `/lib/design-tokens.ts`
- [ ] Add TypeScript interfaces
- [ ] Import and use in `page.tsx`
- [ ] Update component index exports
- [ ] Test in browser
- [ ] Document in README

## 🎉 Success Indicators

✅ Server running on port 6006  
✅ Dashboard loads without errors  
✅ All components render correctly  
✅ Russian text displays properly  
✅ Rubik font is active  
✅ Colors match design system  
✅ Interactive elements respond  

---

**Need Help?** Check `/components/dashboard/README.md` for detailed documentation.
