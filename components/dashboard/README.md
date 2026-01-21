# EdgesPay Dashboard Implementation

## Overview

This is a comprehensive implementation of the EdgesPay Dashboard based on a detailed design brief. The dashboard features a modern, soft UI with subtle neumorphic influences and is fully translated to Russian.

## 🎨 Design System

### Design Tokens
All design values are centralized in `/lib/design-tokens.ts` including:
- Colors (brand, semantic, backgrounds, text)
- Typography (Rubik font family with multiple weights)
- Spacing system
- Border radius values
- Shadow styles
- Component-specific tokens

### Translations
Russian translations are managed in `/lib/translations.ts` with complete UI text coverage.

## 📦 Components

All components are located in `/components/dashboard/`:

### 1. **Sidebar** (`Sidebar.tsx`)
- Fixed left navigation
- Logo branding
- Primary and secondary navigation items
- Active state highlighting with purple accent
- Icon + label layout

### 2. **DashboardHeader** (`DashboardHeader.tsx`)
- Personalized greeting ("Доброе утро, Габби")
- Search bar with icon
- Notification bell
- User avatar and name

### 3. **OverviewCards** (`OverviewCards.tsx`)
- Three KPI cards: Balance, Income, Expenses
- Gradient backgrounds (unique per card)
- Trend indicators with icons
- Decorative elements

### 4. **AnalyticsSection** (`AnalyticsSection.tsx`)
- Period selector (Week, Month, 6 Months, Year)
- Expected income display
- Monthly bar chart
- Active month highlighting with diagonal stripe pattern
- Russian month abbreviations

### 5. **TransactionsList** (`TransactionsList.tsx`)
- Filterable transaction list
- Date grouping (Today, specific dates)
- Transaction type labels
- Avatar display
- Amount formatting with +/- indicators

### 6. **ActionsSection** (`ActionsSection.tsx`)
- Quick action buttons (Transfer, Receive)
- Expenses summary card with progress bar
- Favorite spends with overlapping brand icons
- Feature cards with image backgrounds (Investments, Finances, Piggy Bank)

### 7. **StockPortfolioChart** (`StockPortfolioChart.tsx`)
- Area chart with line overlay
- SVG-based rendering
- 24-hour time format
- Gradient fill under line
- Tooltip at peak value
- Grid lines

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

The dashboard is already integrated into the Next.js project. To view:

```bash
npm run dev
```

Then navigate to: `http://localhost:6006/dashboard`

### Font Loading

The Rubik font (with Cyrillic support) is automatically loaded from Google Fonts in `/app/layout.tsx`:

```typescript
const rubikFont = Rubik({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rubik',
});
```

## 🎯 Design Specifications

### Color Palette

#### Brand Colors
- **Primary Purple**: `#988bee`
- **Primary Light**: `#e8edfd`
- **Dark Navy**: `#07071b`

#### Accent Colors
- **Mint Green**: `#C8F5E0` (Income)
- **Cyan**: `#5CE5D5` (Progress bars)
- **Lime**: `#B8F060` (Progress bars)
- **Lavender**: `#D8B4F8` (Progress bars)

#### Background
- **Page**: `#F5F7FB`
- **Card**: `#FFFFFF`

### Typography

- **Font Family**: Rubik (400, 500, 600, 700)
- **Display**: 32px / Bold
- **H1**: 28px / Bold
- **H2**: 24px / SemiBold
- **Body**: 14px / Regular
- **Small**: 12px / Regular

### Spacing
Follows an 8px grid system with named tokens (xxs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl).

### Border Radius
- **Cards**: 20px (large), 16px (medium)
- **Buttons**: 12px (standard), 20px+ (pill)
- **Inputs**: 22px (pill)

### Shadows
Four elevation levels from subtle to prominent:
- `sm`: `0 2px 8px rgba(0, 0, 0, 0.04)`
- `md`: `0 4px 20px rgba(0, 0, 0, 0.06)`
- `lg`: `0 8px 30px rgba(0, 0, 0, 0.10)`
- `xl`: `0 12px 40px rgba(0, 0, 0, 0.15)`

## 📱 Responsive Design

The layout is optimized for desktop-first (1440px+). The sidebar is fixed at 220px width. On mobile:
- Sidebar should collapse to hamburger menu
- Cards stack vertically
- Grid columns reduce

## 🔧 Customization

### Changing User Name
Edit the `DashboardHeader` component call in `/app/dashboard/page.tsx`:

```tsx
<DashboardHeader userName="Your Name" />
```

### Modifying KPI Values
Update the cards array in `OverviewCards.tsx`:

```tsx
const cards: KPICardProps[] = [
  { type: 'balance', value: 1655, trend: 12, currency: '$' },
  // ... more cards
];
```

### Updating Chart Data
Modify the `monthlyData` array in `AnalyticsSection.tsx` or `portfolioData` in `StockPortfolioChart.tsx`.

### Adding Translations
Extend the translations object in `/lib/translations.ts`:

```typescript
export const translations = {
  // ... existing translations
  newSection: {
    newLabel: 'Новая Метка',
  },
};
```

## 🎨 Design Assets

The design uses:
- **Icons**: Lucide React (outlined style, 1.5px stroke)
- **Images**: Unsplash stock photos for feature cards
- **Emojis**: Used as icon placeholders in KPI cards

## 📊 Data Structure

### Transaction Interface
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

### Chart Data Point
```typescript
{
  time: string;  // e.g., "10:00"
  value: number; // e.g., 4216
}
```

## 🚦 Best Practices

1. **Use Design Tokens**: Always reference `designTokens` instead of hardcoded values
2. **Maintain Consistency**: Follow the established spacing and sizing patterns
3. **Accessibility**: Add proper ARIA labels to icon-only buttons
4. **Performance**: Components are client-side only (use 'use client')

## 🐛 Known Limitations

- No dark mode implemented (design brief shows light mode only)
- Mobile responsive layout not fully implemented
- No loading/error states
- Charts use simplified SVG rendering (consider recharts for production)
- Static data (no API integration)

## 📝 Future Enhancements

- [ ] Dark mode support
- [ ] Mobile responsive sidebar
- [ ] Real-time data integration
- [ ] Loading skeletons
- [ ] Error handling
- [ ] Animations and micro-interactions
- [ ] Accessibility audit
- [ ] Unit tests
- [ ] Storybook documentation

## 📄 License

This implementation is part of the Personal Finance project.

---

**Last Updated**: January 18, 2026  
**Version**: 1.0.0
