/**
 * AEGIS v2.0 Responsive Design System
 * 
 * @module @aegis/breakpoints
 * @description Single source of truth for responsive tokens, container queries, safe area tokens, fluid sizing utilities, and SSR-safe helpers. Zero React dependencies.
 * @version 2.0.2
 */

// ============================================================================
// 1. TYPES & SCHEMAS
// ============================================================================

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type DeviceCategory = 
  | 'phone'
  | 'foldable'
  | 'tablet'
  | 'laptop'
  | 'desktop'
  | 'tv'
  | 'watch';

export type Orientation = 'portrait' | 'landscape';

export type MediaQueryString = string;

export interface ResponsiveRange {
  min?: BreakpointKey;
  max?: BreakpointKey;
  query: MediaQueryString;
}

// ============================================================================
// 2. RAW BREAKPOINT TOKENS (Strict Source of Truth)
// ============================================================================

export const BREAKPOINT_VALUES = {
  xs: 480,     // Small mobile / phones
  sm: 640,     // Foldables / large phones / small tablets
  md: 768,     // Tablets / small laptops
  lg: 1024,    // Standard laptops / desktop displays
  xl: 1280,    // Large desktops
  '2xl': 1536, // Ultra-wides / TVs
} as const;

/**
 * Maps raw breakpoint values into strictly typed CSS pixels.
 */
const mapBreakpointsToCss = <T extends Record<string, number>>(obj: T): { [K in keyof T]: `${T[K]}px` } => {
  const result = {} as Record<string, string>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = `${obj[key]}px`;
    }
  }
  return result as { [K in keyof T]: `${T[K]}px` };
};

export const BREAKPOINT_CSS = Object.freeze(mapBreakpointsToCss(BREAKPOINT_VALUES));

// ============================================================================
// 3. TAILWIND COMPATIBILITY MAP
// ============================================================================

/**
 * Spread directly into tailwind.config.ts -> theme.extend.screens
 */
export const TAILWIND_SCREENS = { ...BREAKPOINT_CSS } as const;

// ============================================================================
// 4. MEDIA QUERY FACTORY METHODS
// ============================================================================

const subtractPixel = (value: number): number => value - 1;

export const createMinWidth = (key: BreakpointKey): MediaQueryString => 
  `(min-width: ${BREAKPOINT_CSS[key]})`;

export const createMaxWidth = (key: BreakpointKey): MediaQueryString => {
  const maxVal = subtractPixel(BREAKPOINT_VALUES[key]);
  return `(max-width: ${maxVal}px)`;
};

/**
 * Generates an inclusive/exclusive bounded query between two breakpoints with custom offset support.
 */
export const createBetween = (
  minKey: BreakpointKey, 
  maxKey: BreakpointKey,
  options: { inclusive?: boolean; offset?: number } = {}
): MediaQueryString => {
  const inclusive = options.inclusive ?? true;
  const offset = options.offset ?? 0;
  const minVal = BREAKPOINT_VALUES[minKey];
  const maxVal = inclusive 
    ? BREAKPOINT_VALUES[maxKey] - 1 + offset
    : BREAKPOINT_VALUES[maxKey] + offset;
  return `(min-width: ${minVal}px) and (max-width: ${maxVal}px)`;
};

const KEYS_ORDER: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

/**
 * Resolves a media query that strictly matches only the specific breakpoint screen boundary.
 */
export const createOnly = (key: BreakpointKey): MediaQueryString => {
  const idx = KEYS_ORDER.indexOf(key);
  if (idx === -1 || idx === KEYS_ORDER.length - 1) {
    return createMinWidth(key);
  }
  return createBetween(key, KEYS_ORDER[idx + 1]);
};

export const createOrientation = (orientation: Orientation): MediaQueryString => 
  `(orientation: ${orientation})`;

export const createRetina = (): MediaQueryString => 
  '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)';

// ============================================================================
// 5. IMMUTABLE MEDIA QUERIES
// ============================================================================

export const MEDIA_QUERIES = {
  // Upwards Boundaries (Min-Width)
  xsUp: createMinWidth('xs'),
  smUp: createMinWidth('sm'),
  mdUp: createMinWidth('md'),
  lgUp: createMinWidth('lg'),
  xlUp: createMinWidth('xl'),
  '2xlUp': createMinWidth('2xl'),

  // Downwards Boundaries (Max-Width)
  xsDown: createMaxWidth('xs'),
  smDown: createMaxWidth('sm'),
  mdDown: createMaxWidth('md'),
  lgDown: createMaxWidth('lg'),
  xlDown: createMaxWidth('xl'),

  // Strict Enclosures (Exclusive ranges)
  xsOnly: createOnly('xs'),
  smOnly: createOnly('sm'),
  mdOnly: createOnly('md'),
  lgOnly: createOnly('lg'),
  xlOnly: createOnly('xl'),
  '2xlOnly': createMinWidth('2xl'),

  // Device Category Breakpoints
  phone: createMaxWidth('xs'),
  foldable: createBetween('xs', 'sm'),
  tablet: createBetween('sm', 'md'),
  laptop: createBetween('md', 'lg'),
  desktop: createBetween('lg', 'xl'),
  tv: createMinWidth('2xl'),
  watch: '(max-width: 280px)',
} as const;

export const ORIENTATION_QUERIES = {
  portrait: createOrientation('portrait'),
  landscape: createOrientation('landscape'),
  retina: createRetina(),
} as const;

export const ACCESSIBILITY_QUERIES = {
  reducedMotion: '(prefers-reduced-motion: reduce)',
  noMotion: '(prefers-reduced-motion: no-preference)',
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',
  highContrast: '(prefers-contrast: more)',
  reducedData: '(prefers-reduced-data: reduce)',
  print: 'print',
} as const;

// ============================================================================
// 6. SAFE AREAS & CONTAINER QUERY TOKENS
// ============================================================================

export const SAFE_AREAS = {
  top: 'env(safe-area-inset-top, 0px)',
  bottom: 'env(safe-area-inset-bottom, 0px)',
  left: 'env(safe-area-inset-left, 0px)',
  right: 'env(safe-area-inset-right, 0px)',
} as const;

export const CONTAINER_QUERIES = {
  card: {
    inlineSize: 'inline-size',
    sm: '@container card (min-width: 320px)',
    md: '@container card (min-width: 480px)',
    lg: '@container card (min-width: 640px)',
  },
  dashboard: {
    split: '@container dashboard (min-width: 768px)',
  },
  sidebar: {
    collapsed: '@container sidebar (max-width: 80px)',
  },
  map: {
    wide: '@container map (min-width: 1024px)',
  }
} as const;

// ============================================================================
// 7. FLUID SIZES (Clamp & Fluid Sizing Builders)
// ============================================================================

/**
 * Builds a CSS clamp sizing expression.
 */
export const clamp = (min: string, val: string, max: string): string => `clamp(${min}, ${val}, ${max})`;

/**
 * Builds an optimized fluid typography, container, or spacing clamp definition.
 */
export const createFluidSize = (
  minPx: number, 
  maxPx: number, 
  minViewport: number = 320, 
  maxViewport: number = 1200
): string => {
  const slope = (maxPx - minPx) / (maxViewport - minViewport);
  const yIntersection = -minViewport * slope + minPx;
  return `clamp(${minPx}px, ${yIntersection.toFixed(2)}px + ${(slope * 100).toFixed(2)}vw, ${maxPx}px)`;
};

// ============================================================================
// 8. LAYOUT CONSTRAINTS & FLUID GRIDS
// ============================================================================

export const CONTAINERS = {
  sm: BREAKPOINT_CSS.sm,
  md: BREAKPOINT_CSS.md,
  lg: BREAKPOINT_CSS.lg,
  xl: BREAKPOINT_CSS.xl,
  '2xl': BREAKPOINT_CSS['2xl'],
  full: '100%',
} as const;

export const GRID = {
  columns: { mobile: 4, tablet: 8, desktop: 12 },
  gutters: { mobile: '1rem', tablet: '1.5rem', desktop: '2rem' },
  margins: { mobile: '1rem', tablet: '2rem', desktop: 'auto' },
  sidebar: { collapsed: '4rem', expanded: '16rem', desktop: '20rem' },
  contentWidth: { prose: '65ch', dashboard: '100%', map: '100%' },
} as const;

// ============================================================================
// 9. IMPERATIVE RESPONSE HELPERS (SSR Safe)
// ============================================================================

export const Responsive = {
  matchesMedia: (query: MediaQueryString): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  },
  isPhone: (): boolean => Responsive.matchesMedia(MEDIA_QUERIES.phone),
  isTablet: (): boolean => Responsive.matchesMedia(MEDIA_QUERIES.tablet),
  isLaptop: (): boolean => Responsive.matchesMedia(MEDIA_QUERIES.laptop),
  isDesktop: (): boolean => Responsive.matchesMedia(MEDIA_QUERIES.desktop),
  isPortrait: (): boolean => Responsive.matchesMedia(ORIENTATION_QUERIES.portrait),
  isRetina: (): boolean => Responsive.matchesMedia(ORIENTATION_QUERIES.retina),
} as const;

// ============================================================================
// 10. ENGINE PERFORMANCE RULES
// ============================================================================

export const PERFORMANCE_GUIDELINES = {
  mobileFirst: true,
  clsPreventionEnabled: true,
  gpuAcceleratedProperties: ['opacity', 'transform', 'filter'],
  layoutBoundaries: ['card', 'dashboard', 'sidebar', 'map'],
} as const;

// ============================================================================
// 11. CONSOLIDATED EXPORT ARCHITECTURE
// ============================================================================

export const AEGIS_BREAKPOINTS = {
  values: BREAKPOINT_VALUES,
  css: BREAKPOINT_CSS,
  screens: TAILWIND_SCREENS,
  media: MEDIA_QUERIES,
  orientation: ORIENTATION_QUERIES,
  containers: CONTAINERS,
  grid: GRID,
  safeAreas: SAFE_AREAS,
  containerQueries: CONTAINER_QUERIES,
  accessibility: ACCESSIBILITY_QUERIES,
  performance: PERFORMANCE_GUIDELINES,
  helpers: Responsive,
  factories: {
    createMinWidth,
    createMaxWidth,
    createBetween,
    createOnly,
    createOrientation,
    createRetina,
  },
  utilities: {
    clamp,
    createFluidSize,
  }
} as const;

export default AEGIS_BREAKPOINTS;
