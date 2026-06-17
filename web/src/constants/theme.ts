// ============================================
// 🎨 BRAND COLOR PALETTES
// ============================================
export const BRAND_COLORS = {
    ocean: {
        name: 'Ocean Blue',
        primary: '#1976d2',
        primaryDark: '#1565c0',
        primaryLight: '#e3f2fd',
        primaryMuted: '#90caf9',
    },
    emerald: {
        name: 'Emerald Green',
        primary: '#059669',
        primaryDark: '#047857',
        primaryLight: '#d1fae5',
        primaryMuted: '#6ee7b7',
    },
    purple: {
        name: 'Royal Purple',
        primary: '#7c3aed',
        primaryDark: '#6d28d9',
        primaryLight: '#ede9fe',
        primaryMuted: '#a78bfa',
    },
    orange: {
        name: 'Sunset Orange',
        primary: '#ea580c',
        primaryDark: '#c2410c',
        primaryLight: '#fff7ed',
        primaryMuted: '#fb923c',
    },
    teal: {
        name: 'Slate Teal',
        primary: '#0d9488',
        primaryDark: '#0f766e',
        primaryLight: '#ccfbf1',
        primaryMuted: '#5eead4',
    },
    rose: {
        name: 'Rose Pink',
        primary: '#e11d48',
        primaryDark: '#be123c',
        primaryLight: '#ffe4e6',
        primaryMuted: '#fb7185',
    },
} as const;

export type BrandColorKey = keyof typeof BRAND_COLORS;
export type ThemeMode = 'light' | 'dark';

// ============================================
// LIGHT THEME GENERATOR
// ============================================
export const getLightTheme = (brand: typeof BRAND_COLORS[BrandColorKey]) => ({
    // Brand
    primary: brand.primary,
    primaryDark: brand.primaryDark,
    primaryLight: brand.primaryLight,
    primaryMuted: brand.primaryMuted,

    // Status
    success: '#16a34a',
    successLight: '#dcfce7',
    danger: '#dc2626',
    dangerLight: '#fef2f2',
    warning: '#f59e0b',
    warningLight: '#fef3c7',

    // Background
    background: '#f5f7fa',
    card: '#ffffff',
    cardElevated: '#ffffff',

    // Borders
    border: '#e2e8f0',
    borderLight: '#f1f5f9',

    // Text
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    textMuted: '#94a3b8',
    textWhite: '#ffffff',

    // Disabled
    disabled: '#f1f5f9',
    disabledText: '#94a3b8',

    // Welcome screen (hero)
    welcomeBackground: brand.primary,
    welcomeOverlay: 'rgba(255, 255, 255, 0.15)',
    welcomeOverlayBorder: 'rgba(255, 255, 255, 0.2)',
});

// ============================================
// DARK THEME GENERATOR
// ============================================
export const getDarkTheme = (brand: typeof BRAND_COLORS[BrandColorKey]) => ({
    // Brand
    primary: brand.primaryMuted,
    primaryDark: brand.primary,
    primaryLight: `${brand.primary}30`,
    primaryMuted: brand.primaryMuted,

    // Status
    success: '#4ade80',
    successLight: '#052e16',
    danger: '#f87171',
    dangerLight: '#450a0a',
    warning: '#fbbf24',
    warningLight: '#451a03',

    // Background
    background: '#0f172a',
    card: '#1e293b',
    cardElevated: '#334155',

    // Borders
    border: '#334155',
    borderLight: '#1e293b',

    // Text
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    textWhite: '#ffffff',

    // Disabled
    disabled: '#1e293b',
    disabledText: '#475569',

    // Welcome screen (hero)
    welcomeBackground: '#0f172a',
    welcomeOverlay: 'rgba(255, 255, 255, 0.08)',
    welcomeOverlayBorder: 'rgba(255, 255, 255, 0.1)',
});

// ============================================
// APPLY THEME TO DOCUMENT
// ============================================
export const applyTheme = (brandKey: BrandColorKey, mode: ThemeMode) => {
    const brand = BRAND_COLORS[brandKey];
    const colors = mode === 'dark' ? getDarkTheme(brand) : getLightTheme(brand);

    const root = document.documentElement;

    // Apply all colors as CSS variables
    Object.entries(colors).forEach(([key, value]) => {
        const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
    });

    // Set --color-bg as alias for --color-background
    root.style.setProperty('--color-bg', colors.background);

    // Toggle dark class for Tailwind
    if (mode === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
};

// ============================================
// SPACING, FONTS, BORDER RADIUS
// ============================================
export const SPACING = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
};

export const FONT_SIZES = {
    xs: '11px',
    sm: '13px',
    md: '15px',
    lg: '17px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
};

export const BORDER_RADIUS = {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
};

export const SHADOWS = {
    small: '0 1px 3px rgba(0, 0, 0, 0.06)',
    medium: '0 2px 6px rgba(0, 0, 0, 0.1)',
    large: '0 4px 12px rgba(0, 0, 0, 0.12)',
    xlarge: '0 10px 25px rgba(0, 0, 0, 0.15)',
};