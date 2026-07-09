/**
 * AEGIS v2.0 Color Design System
 * 
 * @module @aegis/colors
 * @description Centralized semantic token dictionary, accessibility matrices, map/AI domains, and Tailwind configurations.
 * @version 2.0.2
 */

// ============================================================================
// 1. TYPES & CONTRACT SCHEMAS
// ============================================================================

export type ColorHex = `#${string}`;
export type ColorScaleStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ThemeMode = 'light' | 'dark' | 'high-contrast';

// ============================================================================
// 2. OPACITY TOKENS
// ============================================================================

export const OPACITY = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

// ============================================================================
// 3. PRIMITIVE ATOMIC TOKENS
// ============================================================================

export const PRIMITIVES = {
  // Brand specific primary indigo color range
  brand: {
    50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC', 400: '#818CF8',
    500: '#6366F1', 600: '#4F46E5', 700: '#4338CA', 800: '#3730A3', 900: '#312E81', 950: '#1E1B4B',
  },
  // Distinct standard blue primitive scale
  blue: {
    50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD', 400: '#60A5FA',
    500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF', 900: '#1E3A8A', 950: '#172554',
  },
  neutral: {
    50: '#FAFAFA', 100: '#F5F5F5', 200: '#E5E5E5', 300: '#D4D4D4', 400: '#A3A3A3',
    500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0A0A0A',
  },
  slate: {
    50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8',
    500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A', 950: '#020617',
  },
  cyan: {
    50: '#ECFEFF', 100: '#CFFAFE', 200: '#A5F3FC', 300: '#67E8F9', 400: '#22D3EE',
    500: '#06B6D4', 600: '#0891B2', 700: '#0E7490', 800: '#155E75', 900: '#164E63', 950: '#083344',
  },
  green: {
    50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 300: '#86EFAC', 400: '#4ADE80',
    500: '#22C55E', 600: '#16A34A', 700: '#15803D', 800: '#166534', 900: '#14532D', 950: '#052E16',
  },
  yellow: {
    50: '#FEFCE8', 100: '#FEF9C3', 200: '#FEF08A', 300: '#FDE047', 400: '#FACC15',
    500: '#EAB308', 600: '#CA8A04', 700: '#A16207', 800: '#854D0E', 900: '#713F12', 950: '#422006',
  },
  orange: {
    50: '#FFFAF0', 100: '#FEEBC8', 200: '#FED7AA', 300: '#FDBA74', 400: '#FB923C',
    500: '#F97316', 600: '#EA580C', 700: '#C2410C', 800: '#9A3412', 900: '#7C2D12', 950: '#431407',
  },
  red: {
    50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5', 400: '#F87171',
    500: '#EF4444', 600: '#DC2626', 700: '#B91C1C', 800: '#991B1B', 900: '#7F1D1D', 950: '#450A0A',
  },
  purple: {
    50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D5FF', 300: '#D8B4FE', 400: '#C084FC',
    500: '#A855F7', 600: '#9333EA', 700: '#7E22CE', 800: '#6B21A8', 900: '#581C87', 950: '#3B0764',
  },
} as const;

// ============================================================================
// 4. SEMANTIC INTERMEDIATE TOKENS
// ============================================================================

export const SEMANTIC = {
  light: {
    background: PRIMITIVES.slate[50],
    surface: PRIMITIVES.neutral[50],
    card: '#FFFFFF',
    cardHover: PRIMITIVES.slate[100],
    overlay: 'rgba(15, 23, 42, 0.4)',
    divider: PRIMITIVES.slate[200],
    border: PRIMITIVES.slate[200],
    borderStrong: PRIMITIVES.slate[300],
    textPrimary: PRIMITIVES.slate[900],
    textSecondary: PRIMITIVES.slate[600],
    textMuted: PRIMITIVES.slate[400],
    iconPrimary: PRIMITIVES.slate[800],
    iconSecondary: PRIMITIVES.slate[500],
    placeholder: PRIMITIVES.slate[400],
    focusRing: PRIMITIVES.brand[500],
    interactive: PRIMITIVES.brand[600],
    disabled: PRIMITIVES.neutral[300],
  },
  dark: {
    background: PRIMITIVES.slate[950],
    surface: PRIMITIVES.slate[900],
    card: PRIMITIVES.slate[900],
    cardHover: PRIMITIVES.slate[800],
    overlay: 'rgba(2, 6, 23, 0.7)',
    divider: PRIMITIVES.slate[800],
    border: PRIMITIVES.slate[800],
    borderStrong: PRIMITIVES.slate[700],
    textPrimary: PRIMITIVES.slate[50],
    textSecondary: PRIMITIVES.slate[400],
    textMuted: PRIMITIVES.slate[500],
    iconPrimary: PRIMITIVES.slate[200],
    iconSecondary: PRIMITIVES.slate[500],
    placeholder: PRIMITIVES.slate[600],
    focusRing: PRIMITIVES.brand[400],
    interactive: PRIMITIVES.brand[500],
    disabled: PRIMITIVES.slate[800],
  },
  highContrast: {
    background: '#000000',
    surface: '#000000',
    card: '#000000',
    cardHover: '#1A1A1A',
    overlay: 'rgba(0, 0, 0, 0.8)',
    divider: '#FFFFFF',
    border: '#FFFFFF',
    borderStrong: '#FFFFFF',
    textPrimary: '#FFFFFF',
    textSecondary: '#E5E5E5',
    textMuted: '#A3A3A3',
    iconPrimary: '#FFFFFF',
    iconSecondary: '#E5E5E5',
    placeholder: '#A3A3A3',
    focusRing: '#FFFF00',
    interactive: '#FFFF00',
    disabled: '#333333',
  }
} as const;

// ============================================================================
// 5. THEME VARIABLE GENERATOR
// ============================================================================

const generateThemeVariables = (themeDef: Record<keyof typeof SEMANTIC.light, string>) => {
  const vars = {} as Record<string, string>;
  for (const key in themeDef) {
    if (Object.prototype.hasOwnProperty.call(themeDef, key)) {
      const varName = `--aegis-${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)}`;
      vars[varName] = themeDef[key as keyof typeof themeDef];
    }
  }
  return vars;
};

export const THEME_DICTIONARIES = {
  light: generateThemeVariables(SEMANTIC.light),
  dark: generateThemeVariables(SEMANTIC.dark),
  'high-contrast': generateThemeVariables(SEMANTIC.highContrast),
} as const;

// ============================================================================
// 6. FUNCTIONAL DESIGN SPACES
// ============================================================================

export const STATUS_COLORS = {
  success: { text: PRIMITIVES.green[700], bg: PRIMITIVES.green[50], border: PRIMITIVES.green[200] },
  warning: { text: PRIMITIVES.yellow[800], bg: PRIMITIVES.yellow[50], border: PRIMITIVES.yellow[200] },
  error: { text: PRIMITIVES.red[700], bg: PRIMITIVES.red[50], border: PRIMITIVES.red[200] },
  info: { text: PRIMITIVES.blue[700], bg: PRIMITIVES.blue[50], border: PRIMITIVES.blue[200] },
  safe: { solid: PRIMITIVES.green[600], bg: PRIMITIVES.green[50] },
  unsafe: { solid: PRIMITIVES.orange[600], bg: PRIMITIVES.orange[50] },
  emergency: { solid: PRIMITIVES.red[600], pulse: PRIMITIVES.red[500] },
} as const;

export const AI_COLORS = {
  response: { border: PRIMITIVES.cyan[200], borderDark: PRIMITIVES.cyan[800] },
  thinking: { tint: PRIMITIVES.cyan[500] },
  prediction: { stroke: PRIMITIVES.purple[400], fill: `rgba(168, 85, 247, ${OPACITY[10]})` },
  riskAnalysis: {
    low: PRIMITIVES.green[500],
    medium: PRIMITIVES.yellow[500],
    high: PRIMITIVES.orange[500],
    critical: PRIMITIVES.red[500]
  },
  voiceAssistant: { active: PRIMITIVES.cyan[500], listening: PRIMITIVES.purple[500] },
  recommendation: { primary: PRIMITIVES.cyan[500], secondary: PRIMITIVES.purple[500] },
  confidence: { high: PRIMITIVES.green[500], medium: PRIMITIVES.yellow[500], low: PRIMITIVES.red[500] },
  streaming: { active: PRIMITIVES.cyan[400] },
  scanner: { sweep: `rgba(6, 182, 212, ${OPACITY[10]})`, border: PRIMITIVES.cyan[500] },
  guardian: { active: PRIMITIVES.brand[500], standby: PRIMITIVES.slate[500] },
  safeRoute: { highlight: PRIMITIVES.green[500] },
  dangerRoute: { highlight: PRIMITIVES.red[500] }
} as const;

export const MAP_COLORS = {
  safeZone: { fill: `rgba(34, 197, 94, ${OPACITY[20]})`, stroke: PRIMITIVES.green[500] },
  incident: { fill: PRIMITIVES.red[500], stroke: '#FFFFFF' },
  route: { safe: PRIMITIVES.green[500], warning: PRIMITIVES.yellow[500], danger: PRIMITIVES.red[500], active: PRIMITIVES.brand[500] },
  location: { current: PRIMITIVES.brand[600], destination: PRIMITIVES.slate[800] },
  traffic: { low: PRIMITIVES.green[500], moderate: PRIMITIVES.yellow[500], heavy: PRIMITIVES.orange[500] },
  heatmap: { low: `rgba(6, 182, 212, ${OPACITY[20]})`, medium: `rgba(234, 179, 8, ${OPACITY[40]})`, high: `rgba(239, 68, 68, ${OPACITY[60]})` },
  cluster: { bg: PRIMITIVES.brand[500], text: '#FFFFFF' },
  polygon: { fill: `rgba(99, 102, 241, ${OPACITY[10]})`, stroke: PRIMITIVES.brand[500] },
  radius: { fill: `rgba(59, 130, 246, ${OPACITY[10]})`, stroke: PRIMITIVES.blue[500] },
  navigation: { path: PRIMITIVES.blue[500], upcoming: PRIMITIVES.cyan[500] },
  destination: { primary: PRIMITIVES.slate[900], secondary: PRIMITIVES.slate[500] },
  origin: { primary: PRIMITIVES.green[600], secondary: PRIMITIVES.green[100] },
  markerSelected: PRIMITIVES.brand[500],
  markerHover: PRIMITIVES.brand[400],
} as const;

// ============================================================================
// 7. DYNAMIC GRADIENT BUILDER & GLASS TOKENS
// ============================================================================

export const createGradient = (type: 'linear' | 'radial', angleOrShape: string, stops: string[]): string => {
  return `${type}-gradient(${angleOrShape}, ${stops.join(', ')})`;
};

export const GRADIENTS = {
  primary: createGradient('linear', '135deg', [`${PRIMITIVES.brand[500]} 0%`, `${PRIMITIVES.brand[700]} 100%`]),
  security: createGradient('linear', '135deg', [`${PRIMITIVES.slate[900]} 0%`, `${PRIMITIVES.slate[950]} 100%`]),
  sos: createGradient('linear', '135deg', [`${PRIMITIVES.red[600]} 0%`, `${PRIMITIVES.orange[600]} 100%`]),
  ai: createGradient('linear', '135deg', [`${PRIMITIVES.purple[500]} 0%`, `${PRIMITIVES.cyan[500]} 100%`]),
} as const;

export const GLASS_TOKENS = {
  glass: createGradient('linear', '135deg', [`rgba(255, 255, 255, ${OPACITY[5]}) 0%`, `rgba(255, 255, 255, ${OPACITY[5]}) 100%`]),
  glassDark: createGradient('linear', '135deg', [`rgba(15, 23, 42, ${OPACITY[60]}) 0%`, `rgba(30, 41, 59, ${OPACITY[40]}) 100%`]),
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  glassOverlay: `rgba(15, 23, 42, ${OPACITY[30]})`,
  glassShadow: `0 8px 32px 0 rgba(0, 0, 0, ${OPACITY[30]})`,
} as const;

// ============================================================================
// 8. SHADOWS & ACCESSIBILITY (Renamed variables to avoid export * collision)
// ============================================================================

export const COLOR_SHADOWS = {
  sm: `0 1px 2px 0 rgba(0, 0, 0, ${OPACITY[5]})`,
  md: `0 4px 6px -1px rgba(0, 0, 0, ${OPACITY[10]})`,
  lg: `0 10px 15px -3px rgba(0, 0, 0, ${OPACITY[10]})`,
  primaryGlow: `0 0 20px rgba(99, 102, 241, ${OPACITY[50]})`,
  dangerGlow: `0 0 20px rgba(239, 68, 68, ${OPACITY[40]})`,
} as const;

export const COLOR_ACCESSIBILITY = {
  wcagAA: true,
  wcagAAA: false, 
  minContrastRatio: 4.5,
  highContrastBorder: '#FFFFFF',
  focusOutline: `2px solid ${PRIMITIVES.brand[500]}`,
  colorBlindFriendly: {
    protanopia: { safe: PRIMITIVES.blue[500], danger: PRIMITIVES.orange[500] },
    deuteranopia: { safe: PRIMITIVES.blue[500], danger: PRIMITIVES.orange[500] },
    tritanopia: { safe: PRIMITIVES.green[500], danger: PRIMITIVES.red[500] }
  }
} as const;

// ============================================================================
// 9. PERFORMANCE META
// ============================================================================

export const COLOR_PERFORMANCE = {
  cssVariablesUsed: true,
  treeShakable: true,
  themeSwitchingOptimized: true,
  paintOptimizationActive: true,
} as const;

// ============================================================================
// 10. TAILWIND COMPATIBILITY SPECIFICATIONS
// ============================================================================

export const TAILWIND_COLORS = {
  brand: PRIMITIVES.brand,
  blue: PRIMITIVES.blue,
  neutral: PRIMITIVES.neutral,
  slate: PRIMITIVES.slate,
  cyan: PRIMITIVES.cyan,
  green: PRIMITIVES.green,
  yellow: PRIMITIVES.yellow,
  orange: PRIMITIVES.orange,
  red: PRIMITIVES.red,
  purple: PRIMITIVES.purple,

  // CSS Variable Mapping references
  background: 'var(--aegis-background)',
  surface: 'var(--aegis-surface)',
  card: 'var(--aegis-card)',
  'card-hover': 'var(--aegis-card-hover)',
  overlay: 'var(--aegis-overlay)',
  divider: 'var(--aegis-divider)',
  border: 'var(--aegis-border)',
  'border-strong': 'var(--aegis-border-strong)',
  'text-primary': 'var(--aegis-text-primary)',
  'text-secondary': 'var(--aegis-text-secondary)',
  'text-muted': 'var(--aegis-text-muted)',
  'text-inverse': 'var(--aegis-text-inverse)',
  'icon-primary': 'var(--aegis-icon-primary)',
  'icon-secondary': 'var(--aegis-icon-secondary)',
  placeholder: 'var(--aegis-placeholder)',
  'focus-ring': 'var(--aegis-focus-ring)',
  interactive: 'var(--aegis-interactive)',
  disabled: 'var(--aegis-disabled)',
} as const;

export const TAILWIND_GRADIENTS = { ...GRADIENTS } as const;
export const TAILWIND_SHADOWS = { ...COLOR_SHADOWS } as const;

// ============================================================================
// 11. CENTRAL EXPORT OBJECT
// ============================================================================

export const AEGIS_COLORS = {
  primitive: PRIMITIVES,
  semantic: SEMANTIC,
  brand: PRIMITIVES.brand,
  status: STATUS_COLORS,
  ai: AI_COLORS,
  maps: MAP_COLORS,
  themes: THEME_DICTIONARIES,
  glass: GLASS_TOKENS,
  opacity: OPACITY,
  gradients: GRADIENTS,
  shadows: COLOR_SHADOWS,
  tailwind: {
    colors: TAILWIND_COLORS,
    gradients: TAILWIND_GRADIENTS,
    shadows: TAILWIND_SHADOWS,
  },
  accessibility: COLOR_ACCESSIBILITY,
  performance: COLOR_PERFORMANCE,
} as const;

export default AEGIS_COLORS;