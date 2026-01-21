# EdgesPay Dashboard - Visual Component Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EdgesPay Dashboard                          │
│                     /app/dashboard/page.tsx                         │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
    ┌───────────────────────────┐   ┌──────────────────────────────┐
    │        Sidebar            │   │      Main Content Area       │
    │  (Fixed, 220px wide)      │   │  (Fluid, max 1200px)         │
    │                           │   │                              │
    │  ┌─────────────────────┐  │   │  ┌────────────────────────┐ │
    │  │  Logo: EdgesPay     │  │   │  │  DashboardHeader       │ │
    │  └─────────────────────┘  │   │  │  - Greeting           │ │
    │                           │   │  │  - Search bar         │ │
    │  ┌─────────────────────┐  │   │  │  - Notifications      │ │
    │  │  Primary Nav        │  │   │  │  - User avatar        │ │
    │  │  • Главная *        │  │   │  └────────────────────────┘ │
    │  │  • Платежи          │  │   │                              │
    │  │  • Аналитика        │  │   │  ┌────────────────────────┐ │
    │  │  • Карты            │  │   │  │  OverviewCards         │ │
    │  │  • История          │  │   │  │  ┌──────┬──────┬──────┐│ │
    │  │  • Сервисы          │  │   │  │  │ Balance │ Income  ││ │
    │  │  • Помощь           │  │   │  │  │  Expenses          ││ │
    │  └─────────────────────┘  │   │  │  └──────┴──────┴──────┘│ │
    │                           │   │  └────────────────────────┘ │
    │  ┌─────────────────────┐  │   │                              │
    │  │  Secondary Nav      │  │   │  ┌──────────────────────────┐│
    │  │  • Настройки        │  │   │  │  2-Column Grid          ││
    │  │  • Выход            │  │   │  │                         ││
    │  └─────────────────────┘  │   │  │  ┌──────────────────┐  ││
    │                           │   │  │  │ Analytics        │  ││
    └───────────────────────────┘   │  │  │ Section          │  ││
                                    │  │  │ - Period selector│  ││
                                    │  │  │ - Bar chart      │  ││
                                    │  │  └──────────────────┘  ││
                                    │  │                         ││
                                    │  │  ┌──────────────────┐  ││
                                    │  │  │ Transactions     │  ││
                                    │  │  │ List             │  ││
                                    │  │  │ - Filters        │  ││
                                    │  │  │ - Transaction    │  ││
                                    │  │  │   rows           │  ││
                                    │  │  └──────────────────┘  ││
                                    │  └──────────────────────────┘│
                                    │                              │
                                    │  ┌────────────────────────┐ │
                                    │  │  ActionsSection        │ │
                                    │  │  ┌──────┬──────┬──────┐│ │
                                    │  │  │Transfer│Receive│  ││ │
                                    │  │  │Expenses│Favorites ││ │
                                    │  │  └──────┴──────┴──────┘│ │
                                    │  │  ┌──────┬──────┬──────┐│ │
                                    │  │  │Invest│Finance│Piggy││ │
                                    │  │  └──────┴──────┴──────┘│ │
                                    │  └────────────────────────┘ │
                                    │                              │
                                    │  ┌────────────────────────┐ │
                                    │  │  StockPortfolioChart   │ │
                                    │  │  - Area chart          │ │
                                    │  │  - Line graph          │ │
                                    │  │  - Tooltip             │ │
                                    │  └────────────────────────┘ │
                                    └──────────────────────────────┘
```

## Component Hierarchy

```
App
└── DashboardPage
    ├── Sidebar
    │   ├── Logo
    │   ├── PrimaryNavigation (7 items)
    │   └── SecondaryNavigation (2 items)
    │
    └── MainContent
        ├── DashboardHeader
        │   ├── Greeting
        │   ├── SearchBar
        │   ├── NotificationBell
        │   └── UserProfile
        │
        ├── OverviewCards
        │   ├── BalanceCard (gradient, trend)
        │   ├── IncomeCard (gradient, trend)
        │   └── ExpensesCard (gradient, trend)
        │
        ├── TwoColumnGrid
        │   ├── AnalyticsSection
        │   │   ├── PeriodSelector (4 pills)
        │   │   ├── ExpectedIncome (value)
        │   │   └── BarChart (6 months)
        │   │
        │   └── TransactionsList
        │       ├── FilterDropdowns (2)
        │       ├── TodayTransactions (grouped)
        │       └── OlderTransactions (grouped)
        │
        ├── ActionsSection
        │   ├── ActionButtons
        │   │   ├── TransferButton
        │   │   └── ReceiveButton
        │   ├── SummaryCards
        │   │   ├── ExpensesCard (progress bar)
        │   │   └── FavoriteSpendsCard (logos)
        │   └── FeatureCards
        │       ├── InvestmentsCard (image)
        │       ├── FinancesCard (image)
        │       └── PiggyBankCard (image)
        │
        └── StockPortfolioChart
            ├── AxisLabels
            ├── GridLines
            ├── AreaPath
            ├── LinePath
            ├── DataPoints
            └── Tooltip
```

## Data Flow

```
┌─────────────────────┐
│  Design Tokens      │
│  /lib/design-       │
│  tokens.ts          │
│                     │
│  • Colors           │───┐
│  • Typography       │   │
│  • Spacing          │   │
│  • Shadows          │   │
│  • BorderRadius     │   │
└─────────────────────┘   │
                          │
┌─────────────────────┐   │
│  Translations       │   │
│  /lib/              │   │
│  translations.ts    │   │
│                     │   │
│  • navigation       │───┼──────────────┐
│  • overview         │   │              │
│  • analytics        │   │              │
│  • transactions     │   │              │
│  • actions          │   │              │
└─────────────────────┘   │              │
                          │              │
                          ▼              ▼
                    ┌─────────────────────────┐
                    │   Dashboard Components   │
                    │                          │
                    │  Import and use tokens   │
                    │  and translations        │
                    └─────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────────┐
                    │    Rendered UI          │
                    │                          │
                    │  • Styled with tokens   │
                    │  • Labeled in Russian   │
                    │  • Interactive          │
                    └─────────────────────────┘
```

## Style Application Pattern

```typescript
// Every component follows this pattern:

import { designTokens } from '@/lib/design-tokens';
import { translations } from '@/lib/translations';

function Component() {
  return (
    <div
      style={{
        backgroundColor: designTokens.colors.background.card,
        borderRadius: designTokens.borderRadius.xl,
        padding: designTokens.spacing.xl,
        boxShadow: designTokens.shadows.md,
      }}
    >
      <h2 style={{ fontSize: designTokens.typography.fontSize.h2 }}>
        {translations.section.title}
      </h2>
      {/* Component content */}
    </div>
  );
}
```

## Color Distribution Map

```
┌───────────────────────────────────────────────────────────┐
│  Page Background: #F5F7FB (Light Blue-Gray)               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Sidebar: #FFFFFF (White)                          │  │
│  │  Shadow: rgba(0,0,0,0.04)                          │  │
│  │                                                     │  │
│  │  Active Nav: #988bee15 (Purple 15% opacity)        │  │
│  │  Active Text: #988bee (Purple)                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  Main Content                                       │  │
│  │                                                     │  │
│  │  ┌───────────────────────────────────────────────┐ │  │
│  │  │ Card: #FFFFFF (White)                        │ │  │
│  │  │ Shadow: rgba(0,0,0,0.06)                     │ │  │
│  │  │ Border Radius: 20px                          │ │  │
│  │  └───────────────────────────────────────────────┘ │  │
│  │                                                     │  │
│  │  ┌──────────────┬──────────────┬──────────────┐   │  │
│  │  │ Balance      │ Income       │ Expenses     │   │  │
│  │  │ Gradient:    │ Gradient:    │ Gradient:    │   │  │
│  │  │ Blue→White   │ Green→White  │ Purple→Lav   │   │  │
│  │  │ #E8EDFD      │ #C8F5E0      │ #E8EDFD      │   │  │
│  │  └──────────────┴──────────────┴──────────────┘   │  │
│  │                                                     │  │
│  │  Button Primary: #988bee (Purple)                  │  │
│  │  Button Border: #E8E8EC (Light Gray)               │  │
│  │  Text Primary: #07071b (Dark Navy)                 │  │
│  │  Text Muted: #8E8E9A (Gray)                        │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────┘
```

## Typography Hierarchy

```
Display (32px, Bold)
└── Greeting: "Доброе утро, Габби"

H1 (28px, Bold)
└── Analytics expected income: "$1753"

H2 (24px, Bold)
└── Card values: "$1,655"

H3 (20px, SemiBold)
├── Section titles: "Аналитика"
└── Card titles

Body (14px, Regular)
├── Navigation items
├── Input fields
└── Transaction names

Small (12px, Regular)
├── Labels: "Баланс"
├── Captions
└── Month labels: "Янв"

Tiny (11px, Regular)
└── Chart axis labels
```

## Interactive States

```
Navigation Item:
  Default:    transparent bg, #07071b text
  Hover:      #F5F7FB bg
  Active:     #988bee15 bg, #988bee text
  
Button:
  Default:    #988bee bg, white text
  Hover:      #7a6fd4 bg (darker)
  Active:     Scale 0.98

Card:
  Default:    shadow-md
  Hover:      shadow-lg
  
Input:
  Default:    #E8E8EC border
  Focus:      #988bee border, ring
```

---

**Legend:**
- `*` = Active/Selected state
- `┌─┐` = Component boundary
- `•` = List item
- `→` = Gradient direction
