/**
 * FinTrack Dashboard Design Tokens
 * Generated from comprehensive design specification
 */

export const designTokens = {
  theme: {
    name: 'FinTrack Light',
    version: '1.0.0',
    mode: 'light',
    locale: 'ru-RU',
  },

  layout: {
    sidebar: {
      width: '220px',
      padding: '24px 16px',
    },
    content: {
      maxWidth: '1200px',
      padding: '32px',
    },
    grid: {
      columns: 12,
      gutter: '24px',
    },
    breakpoints: {
      mobile: '320px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1440px',
    },
  },

  colors: {
    brand: {
      primary: '#988bee',
      primaryLight: '#e8edfd',
      primaryDark: '#7a6fd4',
      secondary: '#07071b',
    },
    background: {
      page: '#F5F7FB',
      card: '#FFFFFF',
      elevated: '#FFFFFF',
      muted: '#F5F5F7',
    },
    accent: {
      mint: '#C8F5E0',
      cyan: '#5CE5D5',
      lime: '#B8F060',
      lavender: '#D8B4F8',
    },
    text: {
      primary: '#07071b',
      secondary: '#4A4A5A',
      muted: '#8E8E9A',
      disabled: '#C0C0C8',
      inverse: '#FFFFFF',
    },
    border: {
      default: '#E8E8EC',
      light: '#F0F0F4',
      focus: '#988bee',
    },
    semantic: {
      success: '#22C55E',
      error: '#EF4444',
      warning: '#F59E0B',
      info: '#988bee',
    },
  },

  typography: {
    fontFamily: {
      primary: "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    fontSize: {
      display: '32px',
      h1: '28px',
      h2: '24px',
      h3: '20px',
      h4: '16px',
      body: '14px',
      small: '12px',
      tiny: '11px',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.5,
    },
  },

  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
    '4xl': '48px',
  },

  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    pill: '9999px',
    circle: '50%',
  },

  shadows: {
    none: 'none',
    sm: '0 2px 8px rgba(0, 0, 0, 0.04)',
    md: '0 4px 20px rgba(0, 0, 0, 0.06)',
    lg: '0 8px 30px rgba(0, 0, 0, 0.10)',
    xl: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },

  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease-in-out',
    slow: '0.3s ease-in-out',
  },

  components: {
    card: {
      background: '#FFFFFF',
      borderRadius: '20px',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      padding: '20px',
    },
    cardSmall: {
      background: '#FFFFFF',
      borderRadius: '16px',
      shadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      padding: '16px',
    },
    button: {
      height: '44px',
      paddingX: '24px',
      borderRadius: '12px',
      fontWeight: 500,
    },
    buttonPill: {
      height: '36px',
      paddingX: '16px',
      borderRadius: '20px',
      fontWeight: 500,
    },
    input: {
      height: '44px',
      borderRadius: '22px',
      borderColor: '#E8E8EC',
      background: '#FFFFFF',
      paddingX: '16px',
    },
    avatar: {
      sm: '32px',
      md: '40px',
      lg: '48px',
      borderRadius: '50%',
    },
    navItem: {
      height: '48px',
      paddingX: '20px',
      paddingY: '12px',
      borderRadius: '12px',
      iconSize: '20px',
      gap: '12px',
    },
    dropdown: {
      height: '32px',
      paddingX: '12px',
      borderRadius: '20px',
      background: '#F5F5F7',
    },
    progressBar: {
      height: '8px',
      borderRadius: '4px',
      background: '#F0F0F4',
    },
    chart: {
      lineWidth: '2px',
      pointSize: '8px',
      gridColor: '#F0F0F0',
      gridStyle: 'dashed',
    },
  },

  icons: {
    size: {
      sm: '16px',
      md: '20px',
      lg: '24px',
      xl: '32px',
    },
    strokeWidth: '1.5px',
    style: 'outlined',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    tooltip: 1300,
  },
} as const;

export type DesignTokens = typeof designTokens;
