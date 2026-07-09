import { SPACING } from './spacing';

/**
 * AEGIS v2.0 Layout Design System
 * 
 * @module @aegis/layout
 * @description Single source of truth for dimensional bounds, layout boundaries, and z-index contexts.
 * @version 2.0.2
 */

// ============================================================================
// 1. TYPES & SCHEMAS
// ============================================================================

export type RadiusKey = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export type ZIndexKey = 
  | 'hide' 
  | 'base' 
  | 'content' 
  | 'raised' 
  | 'dropdown' 
  | 'sticky' 
  | 'fixed' 
  | 'overlay' 
  | 'modalBackdrop' 
  | 'modal' 
  | 'drawer' 
  | 'popover' 
  | 'tooltip' 
  | 'toast' 
  | 'notification' 
  | 'emergency' 
  | 'max';

export type ContainerSize = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' 
  | 'prose' | 'dashboard' | 'analytics' | 'map' | 'reading';

export type LayoutDimension = 
  | 'header' | 'footer' | 'sidebar' | 'navbar' | 'toolbar' 
  | 'bottomNav' | 'drawer' | 'modal' | 'panel';

export type SidebarState = 'collapsed' | 'expanded';
export type HeaderSize = 'mobile' | 'tablet' | 'desktop';
export type DashboardPanel = 'map' | 'chat' | 'analytics';
export type TouchTarget = 'minimum' | 'recommended' | 'comfortable';

// ============================================================================
// 2. PRIMITIVE STRUCTURAL TOKENS
// ============================================================================

export const BORDER_RADIUS = {
  none: '0px',
  xs: '4px',
  sm: '8px',
  md: '12px',   // Standard interactive default
  lg: '16px',   // Card default
  xl: '24px',   // Panel / Modal default
  '2xl': '32px',
  '3xl': '48px',
  full: '9999px',
} as const;

export const Z_INDEX = {
  hide: -1,
  base: 0,
  content: 10,
  raised: 20,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  overlay: 1035,
  modalBackdrop: 1040,
  modal: 1050,
  drawer: 1055,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
  notification: 1090,
  emergency: 9990, // Reserved for active SOS / MediaRecorder configurations
  max: 9999,
} as const;

// ============================================================================
// 3. LAYOUT COMPONENT SPECIFIC CONFIGURATIONS
// ============================================================================

export const HEADER_CONFIG = {
  height: {
    desktop: '64px',
    tablet: '56px',
    mobile: '56px',
  },
  safeArea: 'env(safe-area-inset-top, 0px)',
  zIndex: Z_INDEX.sticky,
} as const;

export const FOOTER_CONFIG = {
  height: {
    desktop: '80px',
    mobile: '60px',
  },
  safeArea: 'env(safe-area-inset-bottom, 0px)',
  zIndex: Z_INDEX.content,
} as const;

export const SIDEBAR_CONFIG = {
  collapsed: {
    width: '72px',
    padding: '16px',
  },
  expanded: {
    width: '280px',
    padding: '20px',
  },
  animationTarget: 'transform',
  transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const MODAL_CONFIG = {
  widths: {
    sm: '400px',
    md: '600px',
    lg: '800px',
    xl: '1000px',
  },
  maxHeight: 'calc(100vh - 64px)',
  padding: '24px',
  backdropBlur: '8px',
  safeArea: true,
  animationPreset: 'scale',
} as const;

export const DRAWER_CONFIG = {
  widths: {
    voiceAssistant: '400px',
    notifications: '360px',
    aiChat: '380px',
  },
  animationPreset: 'slide',
  safeArea: true,
} as const;

// ============================================================================
// 4. LAYOUT STRUCTURES & FEATURE REAL ESTATE
// ============================================================================

export const LAYOUT_DIMENSIONS = {
  header: HEADER_CONFIG.height,
  footer: FOOTER_CONFIG.height,
  sidebar: {
    collapsed: SIDEBAR_CONFIG.collapsed.width,
    expanded: SIDEBAR_CONFIG.expanded.width,
    minimum: '240px',
  },
  bottomNav: {
    height: '64px',
    safeArea: 'env(safe-area-inset-bottom)',
  },
  modal: MODAL_CONFIG.widths,
  drawer: DRAWER_CONFIG.widths,
  
  // AEGIS Interface Splitting (Gemini response feeds, etc.)
  mapPanel: {
    minimum: '400px',
    preferred: '600px',
  },
  chatPanel: {
    collapsed: '64px',
    expanded: DRAWER_CONFIG.widths.aiChat,
  },
  analyticsPanel: {
    preferred: '400px',
  },
  voiceAssistant: {
    triggerSize: '56px',
  },
  pagePadding: {
    desktop: '32px',
    tablet: '24px',
    mobile: '16px',
  },
  viewportHeight: {
    full: '100dvh', // Fixed mobile clipping issues globally
    content: 'calc(100dvh - 64px)',
    overlay: '100svh',
  },
} as const;

export const CONTAINERS = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
  prose: '65ch',
  dashboard: '1400px',
  analytics: '1200px',
  map: '100%',
} as const;

// ============================================================================
// 5. FUNCTIONAL GRID DISTRIBUTIONS
// ============================================================================

export const GRID = {
  columns: { mobile: 4, tablet: 8, desktop: 12 },
  gutters: { mobile: '16px', tablet: '24px', desktop: '32px' },
  dashboard: {
    columns: 12,
    gap: '24px',
  },
  cards: {
    gap: '24px',
    minCardWidth: '280px',
  },
  templates: {
    analytics: 'repeat(auto-fit, minmax(320px, 1fr))',
    reports: '1fr',
    safeSpaces: 'repeat(auto-fill, minmax(280px, 1fr))',
    dashboard: 'grid-template-areas: "sidebar header" "sidebar content"',
    forms: 'repeat(12, 1fr)',
    map: '1fr',
  }
} as const;

export const SEMANTIC_RADIUS = {
  button: BORDER_RADIUS.md,
  card: BORDER_RADIUS.lg,
  modal: BORDER_RADIUS.xl,
  avatar: BORDER_RADIUS.full,
  badge: BORDER_RADIUS.full,
  input: BORDER_RADIUS.md,
  mapMarker: BORDER_RADIUS.full,
  floatingPanel: BORDER_RADIUS.xl,
  toast: BORDER_RADIUS.md,
  sidebar: BORDER_RADIUS.none,
  header: BORDER_RADIUS.none,
} as const;

// ============================================================================
// 6. COMPONENT DESCRIPTOR MAPPINGS
// ============================================================================

export const DASHBOARD_COMPONENTS = {
  map: {
    container: '100%',
    minHeight: '500px',
  },
  sos: {
    size: '64px',
    zIndex: Z_INDEX.emergency,
  },
  gridTemplateLayout: `${LAYOUT_DIMENSIONS.sidebar.expanded} 1fr ${LAYOUT_DIMENSIONS.analyticsPanel.preferred}`,
} as const;

export const MOBILE_SAFETY_CONSTRAINTS = {
  bottomNavigation: {
    height: LAYOUT_DIMENSIONS.bottomNav.height,
    safeArea: LAYOUT_DIMENSIONS.bottomNav.safeArea,
  },
  floatingSOS: {
    size: '64px',
    zIndex: Z_INDEX.emergency,
    safeAreaOffset: 'calc(env(safe-area-inset-bottom) + 24px)',
  },
  touchTargets: {
    minimum: '44px',     // WCAG AA Threshold compliance boundary
    recommended: '48px', // iOS layout guideline matching
    comfortable: '56px', // Enhanced emergency tap targeted bounds
  },
} as const;

export const ACCESSIBILITY_TOKENS = {
  touchTarget: { ...MOBILE_SAFETY_CONSTRAINTS.touchTargets },
  safeAreaInsets: {
    top: 'env(safe-area-inset-top)',
    right: 'env(safe-area-inset-right)',
    bottom: 'env(safe-area-inset-bottom)',
    left: 'env(safe-area-inset-left)',
  },
  keyboardFocus: {
    ringOffset: '2px',
    ringWidth: '3px',
  },
} as const;

// ============================================================================
// 7. PERFORMANCE & REFLOW MITIGATION
// ============================================================================

export const PERFORMANCE = {
  gpuFriendlyProperties: [
    'transform',
    'opacity',
  ],
  avoidAnimating: [
    'width',
    'height',
    'left',
    'top',
    'margin',
  ],
  preferredLayouts: [
    'CSS Grid',
    'Flexbox',
  ],
  containerQueries: true,
  layoutShiftPrevention: true,
} as const;

// ============================================================================
// 8. RUNTIME CSS CUSTOM PROPERTIES MAPPING
// ============================================================================

export const LAYOUT_VARIABLES = {
  '--aegis-header-height': HEADER_CONFIG.height.desktop,
  '--aegis-sidebar-width': SIDEBAR_CONFIG.expanded.width,
  '--aegis-radius': BORDER_RADIUS.md,
  '--aegis-modal-width': MODAL_CONFIG.widths.md,
} as const;

// ============================================================================
// 9. TAILWIND ENGINE COMPATIBILITY SCHEMAS
// ============================================================================

export const TAILWIND_RADIUS = { ...BORDER_RADIUS } as const;

export const TAILWIND_Z_INDEX = Object.freeze(
  Object.keys(Z_INDEX).reduce((acc, key) => {
    acc[key] = String(Z_INDEX[key as ZIndexKey]);
    return acc;
  }, {} as Record<string, string>)
);

const buildTailwindLayout = (spacing: typeof SPACING) => {
  return {
    0: '0px',
    1: spacing.xxs, // derived 4px
    2: spacing.xs,  // derived 8px
    3: spacing.sm,  // derived 12px
    4: spacing.md,  // derived 16px
    5: '20px',
    6: spacing.lg,  // derived 24px
    8: spacing.xl,  // derived 32px
    12: spacing.xxl, // derived 48px
    16: spacing.xxxl, // derived 64px
    
    // Positional Extensions
    'header-h': LAYOUT_DIMENSIONS.header.desktop,
    'sidebar-w-collapsed': LAYOUT_DIMENSIONS.sidebar.collapsed,
    'sidebar-w-expanded': LAYOUT_DIMENSIONS.sidebar.expanded,
    
    // Containers
    'container-dashboard': CONTAINERS.dashboard,
    'container-analytics': CONTAINERS.analytics,
    
    // Application Specific
    'sos-target': MOBILE_SAFETY_CONSTRAINTS.floatingSOS.size,
  } as const;
};

export const TAILWIND_LAYOUT = buildTailwindLayout(SPACING);

// ============================================================================
// 10. SYSTEM EXPORT CONSOLIDATION
// ============================================================================

export const AEGIS_LAYOUT = {
  radius: BORDER_RADIUS,
  semanticRadius: SEMANTIC_RADIUS,
  zIndex: Z_INDEX,
  header: HEADER_CONFIG,
  footer: FOOTER_CONFIG,
  modal: MODAL_CONFIG,
  drawer: DRAWER_CONFIG,
  dimensions: LAYOUT_DIMENSIONS,
  containers: CONTAINERS,
  grid: GRID,
  sidebar: SIDEBAR_CONFIG,
  dashboard: DASHBOARD_COMPONENTS,
  mobile: MOBILE_SAFETY_CONSTRAINTS,
  accessibility: ACCESSIBILITY_TOKENS,
  performance: PERFORMANCE,
  variables: LAYOUT_VARIABLES,
  tailwind: {
    radius: TAILWIND_RADIUS,
    zIndex: TAILWIND_Z_INDEX,
    layout: TAILWIND_LAYOUT,
  }
} as const;

export default AEGIS_LAYOUT;
