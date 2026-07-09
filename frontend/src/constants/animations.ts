/**
 * AEGIS v2.0 Motion Design System
 * * @module @aegis/motion
 * @description Enterprise-grade motion token architecture optimized for Next.js and Tailwind CSS.
 * @version 2.0.1
 */

// ============================================================================
// 1. TYPES & UTILITIES
// ============================================================================

export type DurationKey = 
  | 'instant' 
  | 'ultraFast' 
  | 'fast' 
  | 'normal' 
  | 'medium' 
  | 'slow' 
  | 'slower' 
  | 'dramatic';

export type EasingKey = 
  | 'standard' 
  | 'emphasized' 
  | 'accelerate' 
  | 'decelerate' 
  | 'smooth' 
  | 'sharp' 
  | 'spring' 
  | 'bounce' 
  | 'elastic' 
  | 'overshoot';

/**
 * Corrected to valid CSS transition properties.
 */
export type TransitionProperty = 
  | 'opacity' 
  | 'transform' 
  | 'color' 
  | 'background-color' 
  | 'border-color' 
  | 'box-shadow' 
  | 'filter' 
  | 'stroke-dashoffset'
  | 'all';

export const ms = (value: number): string => `${value}ms`;
export const s = (value: number): string => `${value / 1000}s`;

// ============================================================================
// 2. TOKENS (RAW VALUES)
// ============================================================================

export const DURATION_VALUES = {
  instant: 0,
  ultraFast: 100,
  fast: 200,
  normal: 300,
  medium: 400,
  slow: 500,
  slower: 700,
  dramatic: 1000,
} as const;

export const EASING_VALUES = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Highly used across AEGIS for safety feeling
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.15)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

// ============================================================================
// 3. TAILWIND CONFIG COMPATIBILITY EXPORTS
// ============================================================================

/**
 * Spread these directly into your tailwind.config.ts file under theme.extend
 */
export const TAILWIND_DURATION_MAP = Object.freeze(
  Object.keys(DURATION_VALUES).reduce((acc, key) => {
    acc[key] = ms(DURATION_VALUES[key as DurationKey]);
    return acc;
  }, {} as Record<string, string>)
);

export const TAILWIND_EASING_MAP = Object.freeze({ ...EASING_VALUES });

// ============================================================================
// 4. FACTORIES & PRESETS
// ============================================================================

export const createTransition = (
  property: TransitionProperty = 'all',
  durationKey: DurationKey = 'normal',
  easingKey: EasingKey = 'standard'
): string => {
  return `${property} ${s(DURATION_VALUES[durationKey])} ${EASING_VALUES[easingKey]}`;
};

export const TRANSITION_PRESETS = {
  fade: createTransition('opacity', 'normal', 'decelerate'),
  fadeFast: createTransition('opacity', 'fast', 'decelerate'),
  fadeScale: createTransition('all', 'medium', 'decelerate'), // Combines transform + opacity seamlessly
  scale: createTransition('transform', 'normal', 'standard'),
  slide: createTransition('transform', 'medium', 'decelerate'),
  rotate: createTransition('transform', 'fast', 'standard'),
  blur: createTransition('filter', 'medium', 'smooth'),
  
  // Interactions (Fixed 'shadow' to 'box-shadow')
  cardHover: createTransition('box-shadow', 'fast', 'standard'), 
  buttonHover: createTransition('all', 'fast', 'standard'),
  buttonPress: createTransition('transform', 'ultraFast', 'accelerate'),
  
  // Layout & Navigation (Optimized sidebar to avoid layout-breaking width shifts)
  modal: createTransition('all', 'medium', 'decelerate'),
  drawer: createTransition('transform', 'medium', 'decelerate'),
  sidebar: createTransition('transform', 'medium', 'standard'), 
  dropdown: createTransition('all', 'fast', 'decelerate'),
  tooltip: createTransition('all', 'ultraFast', 'standard'),
  navbar: createTransition('all', 'medium', 'smooth'),
  pageTransition: createTransition('all', 'slow', 'decelerate'),
} as const;

export const TRANSFORM_VALUES = {
  hoverScale: 'scale(1.02)',
  pressedScale: 'scale(0.98)',
  activeScale: 'scale(0.95)',
  modalScale: 'scale(1)',
  modalEnter: 'scale(0.95)',
  slideUpSmall: 'translateY(-4px)',
  slideUpMedium: 'translateY(-10px)',
  slideUpLarge: 'translateY(-40px)',
  slideRight: 'translateX(100%)',
  slideLeft: 'translateX(-100%)',
  iconRotation: 'rotate(90deg)',
  spinner: 'rotate(360deg)',
  cardLift: 'translateY(-4px)',
  buttonPress: 'translateY(1px)',
  floating: 'translateY(0)',
  floatingHover: 'translateY(-2px)',
} as const;

export const LOADING_TOKENS = {
  pulse: 'aegis-pulse',
  shimmer: 'aegis-shimmer',
  skeleton: 'aegis-skeleton',
  spinner: 'aegis-spinner',
  breathing: 'aegis-breathing',
  typing: 'aegis-typing',
  dots: 'aegis-dots',
} as const;

// ============================================================================
// 5. SEMANTIC COMPONENT CONFIGURATION (Perfect Contract Sync)
// ============================================================================

export const COMPONENT_MOTION = {
  Button: {
    base: TRANSITION_PRESETS.buttonHover,
    press: TRANSITION_PRESETS.buttonPress,
    loading: LOADING_TOKENS.spinner,
  },
  Card: {
    base: TRANSITION_PRESETS.cardHover,
    lift: TRANSFORM_VALUES.cardLift,
    hoverScale: TRANSFORM_VALUES.hoverScale,
  },
  Modal: {
    backdrop: TRANSITION_PRESETS.fade,
    content: TRANSITION_PRESETS.modal,
    enterScale: TRANSFORM_VALUES.modalEnter,
  },
  Sidebar: {
    slide: TRANSITION_PRESETS.sidebar,
  },
  Navbar: {
    scroll: TRANSITION_PRESETS.navbar,
  },
  Tooltip: {
    show: TRANSITION_PRESETS.tooltip,
  },
  Dropdown: {
    open: TRANSITION_PRESETS.dropdown,
  },
  Toast: {
    enter: createTransition('all', 'medium', 'decelerate'),
    exit: createTransition('all', 'fast', 'accelerate'),
  },
  Dialog: {
    transition: TRANSITION_PRESETS.modal,
  },

  // AEGIS AI & Safety Specific (Verified with Backend/AI services)
  AIChat: {
    messageEnter: createTransition('all', 'fast', 'decelerate'),
    typing: LOADING_TOKENS.typing,
  },
  AIThinking: {
    indicator: LOADING_TOKENS.breathing,
    transition: TRANSITION_PRESETS.fade,
  },
  VoiceAssistant: {
    wave: LOADING_TOKENS.pulse,
    active: TRANSITION_PRESETS.scale,
  },
  SafetyScore: {
    update: createTransition('all', 'medium', 'smooth'),
    critical: createTransition('all', 'fast', 'elastic'),
  },
  RouteAnalysis: {
    draw: createTransition('stroke-dashoffset', 'slow', 'smooth'), 
    fade: TRANSITION_PRESETS.fade,
  },
  SOSCountdown: {
    tick: createTransition('transform', 'ultraFast', 'sharp'),
    urgent: createTransition('background-color', 'fast', 'standard'),
  },
  EmergencyAlert: {
    flash: LOADING_TOKENS.pulse,
    slideIn: createTransition('transform', 'medium', 'overshoot'),
  },
  GuardianConnected: {
    status: TRANSITION_PRESETS.fadeScale,
    pulse: LOADING_TOKENS.breathing,
  },
  SafeRoute: {
    highlight: createTransition('all', 'medium', 'smooth'),
  },
  ReportUpload: {
    progress: createTransition('all', 'medium', 'standard'),
    complete: TRANSITION_PRESETS.scale,
  },
  MapMarker: {
    drop: createTransition('transform', 'medium', 'bounce'),
    select: TRANSITION_PRESETS.scale,
  },
} as const;

// ============================================================================
// 6. ACCESSIBILITY & PERFORMANCE REFERENCE
// ============================================================================

export const ACCESSIBILITY = {
  reducedMotion: {
    duration: '0ms',
    transition: 'none',
    transform: 'none',
    animation: 'none',
  },
  safeAnimations: [LOADING_TOKENS.pulse, LOADING_TOKENS.shimmer],
  disabledTransforms: [TRANSFORM_VALUES.slideUpLarge, TRANSFORM_VALUES.slideRight, TRANSFORM_VALUES.slideLeft],
} as const;

export const PERFORMANCE = {
  gpuAccelerated: ['opacity', 'transform', 'filter', 'box-shadow'],
  layoutTriggering: ['width', 'height', 'top', 'left', 'margin', 'padding'],
  willChangeHints: ['transform', 'opacity'],
} as const;

export const AEGIS_MOTION = {
  duration: DURATION_VALUES,
  tailwindDuration: TAILWIND_DURATION_MAP,
  easing: EASING_VALUES,
  tailwindEasing: TAILWIND_EASING_MAP,
  transition: TRANSITION_PRESETS,
  transform: TRANSFORM_VALUES,
  loading: LOADING_TOKENS,
  components: COMPONENT_MOTION,
  accessibility: ACCESSIBILITY,
  performance: PERFORMANCE,
} as const; 
