/**
 * AEGIS v2.0 Motion Design System
 * 
 * @module @aegis/motion
 * @description Enterprise-grade motion token architecture optimized for Next.js, React, and Tailwind CSS.
 * Provides CSS literal types, hardware-accelerated transitions, and semantic motion tokens for components.
 * @version 2.0.3
 */

// ============================================================================
// 1. TYPES & LITERALS
// ============================================================================

export type CssTime = `${number}ms` | `${number}s` | '0ms';

export type CubicBezier = `cubic-bezier(${number | string}, ${number | string}, ${number | string}, ${number | string})` | string;

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

export type AnimationKey = 
  | 'pulse' 
  | 'wave' 
  | 'shimmer' 
  | 'breathing' 
  | 'typing' 
  | 'spinner' 
  | 'progress';

/**
 * Valid CSS transition properties. Excludes layout-breaking 'all' unless explicitly necessary.
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

export interface FramerTransition {
  readonly duration?: number;
  readonly ease?: readonly [number, number, number, number] | string;
  readonly delay?: number;
  readonly type?: 'spring' | 'tween' | 'inertia';
  readonly repeat?: number;
  readonly repeatType?: 'loop' | 'reverse' | 'mirror';
  readonly repeatDelay?: number;
  readonly stiffness?: number;
  readonly damping?: number;
  readonly mass?: number;
}

// ============================================================================
// 2. RAW VALUE TOKENS
// ============================================================================

/**
 * Raw duration values in milliseconds.
 */
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

/**
 * Curated easing functions ensuring zero duplicate curves.
 */
export const EASING_VALUES = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  emphasized: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)', // Elegant Material-style emphasized curve
  accelerate: 'cubic-bezier(0.4, 0.0, 1.0, 1.0)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1.0)', // Safety/incoming items feeling
  smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
  sharp: 'cubic-bezier(0.3, 0.0, 0.8, 0.15)',     // Distinct fast out curve
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.15)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1.0)',
} as const;

/**
 * Normalized cubic bezier control coordinates for Framer Motion interpolation.
 */
export const EASING_COORDINATES: Record<
  EasingKey,
  readonly [number, number, number, number]
> = {
  standard: [0.4, 0.0, 0.2, 1.0],
  emphasized: [0.2, 0.0, 0.0, 1.0],
  accelerate: [0.4, 0.0, 1.0, 1.0],
  decelerate: [0.0, 0.0, 0.2, 1.0],
  smooth: [0.25, 0.1, 0.25, 1.0],
  sharp: [0.3, 0.0, 0.8, 0.15],
  spring: [0.175, 0.885, 0.32, 1.15],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.68, -0.6, 0.32, 1.6],
  overshoot: [0.34, 1.56, 0.64, 1.0],
} as const;

// ============================================================================
// 3. UTILITIES & CONVERTERS
// ============================================================================

/**
 * Formats a millisecond value into a typed CSS time string.
 */
export const ms = (value: number): CssTime => (value === 0 ? '0ms' : `${value}ms`);

/**
 * Formats a millisecond value into a typed CSS seconds string.
 */
export const s = (value: number): `${number}s` => `${value / 1000}s`;

// ============================================================================
// 4. CSS DURATION SPECIFICATIONS (No duplication)
// ============================================================================

export const DURATION_CSS: Record<DurationKey, CssTime> = {
  instant: '0ms',
  ultraFast: '100ms',
  fast: '200ms',
  normal: '300ms',
  medium: '400ms',
  slow: '500ms',
  slower: '700ms',
  dramatic: '1000ms',
} as const;

export const TAILWIND_DURATION_MAP = { ...DURATION_CSS } as const;

export const TAILWIND_EASING_MAP = { ...EASING_VALUES } as const;

// ============================================================================
// 5. TRANSITION FACTORY
// ============================================================================

export interface TransitionOptions {
  properties: TransitionProperty | readonly TransitionProperty[];
  duration?: DurationKey | number;
  easing?: EasingKey | CubicBezier;
  delay?: DurationKey | number;
}

/**
 * Generates robust, highly performant CSS transition values.
 * Avoids 'all' transitions by accepting multiple explicit properties.
 */
export const createTransition = ({
  properties,
  duration = 'normal',
  easing = 'standard',
  delay,
}: TransitionOptions): string => {
  const props = Array.isArray(properties) ? properties : [properties];
  
  const durationVal = typeof duration === 'number' 
    ? ms(duration) 
    : DURATION_CSS[duration];
    
  const easingVal = typeof easing === 'string' && easing.startsWith('cubic-bezier')
    ? easing
    : EASING_VALUES[easing as EasingKey] || EASING_VALUES.standard;
    
  const delayVal = delay 
    ? (typeof delay === 'number' ? ms(delay) : DURATION_CSS[delay]) 
    : '';

  return props
    .map(prop => `${prop} ${durationVal} ${easingVal}${delayVal ? ` ${delayVal}` : ''}`)
    .join(', ');
};

/**
 * Generates robust, type-safe Framer Motion transitions.
 */
export const createFramerTransition = (
  easingKey: EasingKey = 'standard',
  durationMs: number = DURATION_VALUES.normal,
  delayMs?: number
): FramerTransition => {
  const ease = EASING_COORDINATES[easingKey];
  return {
    duration: durationMs / 1000,
    ease: ease ? [...ease] : 'easeInOut',
    ...(delayMs !== undefined && { delay: delayMs / 1000 }),
  };
};

// ============================================================================
// 6. TRANSITION PRESETS
// ============================================================================

export const TRANSITION_PRESETS = {
  fade: createTransition({ properties: 'opacity', duration: 'normal', easing: 'decelerate' }),
  fadeFast: createTransition({ properties: 'opacity', duration: 'fast', easing: 'decelerate' }),
  fadeScale: createTransition({ properties: ['opacity', 'transform'], duration: 'medium', easing: 'decelerate' }),
  scale: createTransition({ properties: 'transform', duration: 'normal', easing: 'standard' }),
  slide: createTransition({ properties: 'transform', duration: 'medium', easing: 'decelerate' }),
  rotate: createTransition({ properties: 'transform', duration: 'fast', easing: 'standard' }),
  blur: createTransition({ properties: 'filter', duration: 'medium', easing: 'smooth' }),
  
  // Interaction states
  cardHover: createTransition({ properties: 'box-shadow', duration: 'fast', easing: 'standard' }), 
  buttonHover: createTransition({ properties: ['background-color', 'color', 'border-color', 'box-shadow'], duration: 'fast', easing: 'standard' }),
  buttonPress: createTransition({ properties: 'transform', duration: 'ultraFast', easing: 'accelerate' }),
  
  // Layout components
  modal: createTransition({ properties: ['opacity', 'transform'], duration: 'medium', easing: 'decelerate' }),
  drawer: createTransition({ properties: 'transform', duration: 'medium', easing: 'decelerate' }),
  sidebar: createTransition({ properties: 'transform', duration: 'medium', easing: 'standard' }), 
  dropdown: createTransition({ properties: ['opacity', 'transform'], duration: 'fast', easing: 'decelerate' }),
  tooltip: createTransition({ properties: ['opacity', 'transform'], duration: 'ultraFast', easing: 'standard' }),
  navbar: createTransition({ properties: ['background-color', 'border-color', 'box-shadow'], duration: 'medium', easing: 'smooth' }),
  pageTransition: createTransition({ properties: ['opacity', 'transform'], duration: 'slow', easing: 'decelerate' }),
} as const;

// ============================================================================
// 7. TRANSFORMS & LOADING
// ============================================================================

export const TRANSFORM_VALUES = {
  hoverScale: 'scale(1.02)',
  pressedScale: 'scale(0.98)',
  activeScale: 'scale(0.95)',
  modalScale: 'scale(1)',
  modalEnter: 'scale(0.95)',
  translate: {
    sm: 'translateY(-4px)',
    md: 'translateY(-10px)',
    lg: 'translateY(-40px)',
  },
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
// 8. AI & REALTIME PRESETS (AEGIS Specific)
// ============================================================================

export const AI_PRESETS = {
  streamingResponse: createTransition({ properties: 'opacity', duration: 'ultraFast', easing: 'decelerate' }),
  tokenReveal: createTransition({ properties: ['opacity', 'transform'], duration: 'fast', easing: 'spring' }),
  thinkingDots: LOADING_TOKENS.dots,
  voiceWave: LOADING_TOKENS.pulse,
  heatMapReveal: createTransition({ properties: 'opacity', duration: 'slow', easing: 'smooth' }),
  routeScanning: createTransition({ properties: 'stroke-dashoffset', duration: 'dramatic', easing: 'standard' }),
  predictionSweep: createTransition({ properties: 'transform', duration: 'slower', easing: 'smooth' }),
  dangerPulse: LOADING_TOKENS.pulse,
} as const;

// ============================================================================
// 9. LOWERCASE COMPONENT CONFIGURATIONS
// ============================================================================

export const COMPONENT_MOTION = {
  button: {
    base: TRANSITION_PRESETS.buttonHover,
    press: TRANSITION_PRESETS.buttonPress,
    loading: LOADING_TOKENS.spinner,
  },
  card: {
    base: TRANSITION_PRESETS.cardHover,
    lift: TRANSFORM_VALUES.cardLift,
    hoverScale: TRANSFORM_VALUES.hoverScale,
  },
  modal: {
    backdrop: TRANSITION_PRESETS.fade,
    content: TRANSITION_PRESETS.modal,
    enterScale: TRANSFORM_VALUES.modalEnter,
  },
  sidebar: {
    slide: TRANSITION_PRESETS.sidebar,
  },
  navbar: {
    scroll: TRANSITION_PRESETS.navbar,
  },
  tooltip: {
    show: TRANSITION_PRESETS.tooltip,
  },
  dropdown: {
    open: TRANSITION_PRESETS.dropdown,
  },
  toast: {
    enter: createTransition({ properties: ['opacity', 'transform'], duration: 'medium', easing: 'decelerate' }),
    exit: createTransition({ properties: ['opacity', 'transform'], duration: 'fast', easing: 'accelerate' }),
  },
  dialog: {
    transition: TRANSITION_PRESETS.modal,
  },
  aiChat: {
    messageEnter: createTransition({ properties: ['opacity', 'transform'], duration: 'fast', easing: 'decelerate' }),
    typing: LOADING_TOKENS.typing,
    stream: AI_PRESETS.streamingResponse,
  },
  aiThinking: {
    indicator: LOADING_TOKENS.breathing,
    transition: TRANSITION_PRESETS.fade,
  },
  voiceAssistant: {
    wave: LOADING_TOKENS.pulse,
    active: TRANSITION_PRESETS.scale,
  },
  safetyScore: {
    update: createTransition({ properties: ['opacity', 'transform'], duration: 'medium', easing: 'smooth' }),
    critical: createTransition({ properties: ['opacity', 'transform'], duration: 'fast', easing: 'elastic' }),
  },
  routeAnalysis: {
    draw: createTransition({ properties: 'stroke-dashoffset', duration: 'slow', easing: 'smooth' }), 
    fade: TRANSITION_PRESETS.fade,
  },
  sosCountdown: {
    tick: createTransition({ properties: 'transform', duration: 'ultraFast', easing: 'sharp' }),
    urgent: createTransition({ properties: 'background-color', duration: 'fast', easing: 'standard' }),
  },
  emergencyAlert: {
    flash: LOADING_TOKENS.pulse,
    slideIn: createTransition({ properties: 'transform', duration: 'medium', easing: 'overshoot' }),
  },
  guardianConnected: {
    status: TRANSITION_PRESETS.fadeScale,
    pulse: LOADING_TOKENS.breathing,
  },
  safeRoute: {
    highlight: createTransition({ properties: ['background-color', 'border-color'], duration: 'medium', easing: 'smooth' }),
  },
  reportUpload: {
    progress: createTransition({ properties: 'stroke-dashoffset', duration: 'medium', easing: 'standard' }),
    complete: TRANSITION_PRESETS.scale,
  },
  mapMarker: {
    drop: createTransition({ properties: 'transform', duration: 'medium', easing: 'bounce' }),
    select: TRANSITION_PRESETS.scale,
  },
} as const;

// ============================================================================
// 10. ACCESSIBILITY
// ============================================================================

export const ACCESSIBILITY = {
  prefersReducedMotionMediaQuery: '(prefers-reduced-motion: reduce)',
  disableAnimations: {
    duration: '0ms' as CssTime,
    transition: 'none',
    transform: 'none',
    animation: 'none',
  },
  essentialAnimations: [
    LOADING_TOKENS.pulse,
    LOADING_TOKENS.shimmer,
  ] as const,
  motionScale: 0.5,
} as const;

// ============================================================================
// 11. PERFORMANCE & REFLOW REDUCTION
// ============================================================================

export const PAINT_PROPERTIES = ['background-color', 'color', 'border-color', 'box-shadow', 'visibility'] as const;
export const COMPOSITE_PROPERTIES = ['opacity', 'transform', 'filter'] as const;
export const LAYOUT_PROPERTIES = ['width', 'height', 'top', 'left', 'margin', 'padding', 'display', 'position'] as const;

export const PERFORMANCE = {
  gpuAccelerated: COMPOSITE_PROPERTIES,
  paintOnly: PAINT_PROPERTIES,
  layoutTriggering: LAYOUT_PROPERTIES,
  willChangeHints: ['transform', 'opacity'] as const,
} as const;

// ============================================================================
// 12. TAILWIND ANIMATION MAP & KEYFRAMES
// ============================================================================

export const TAILWIND_ANIMATION_MAP: Record<AnimationKey, string> = {
  pulse: 'aegis-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  wave: 'aegis-wave 1.6s ease-in-out infinite',
  shimmer: 'aegis-shimmer 2.5s infinite linear',
  breathing: 'aegis-breathing 3s ease-in-out infinite',
  typing: 'aegis-typing 1.4s infinite',
  spinner: 'aegis-spinner 1s linear infinite',
  progress: 'aegis-progress 2s ease-in-out infinite',
} as const;

export const KEYFRAMES = {
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '.5' },
  },
  wave: {
    '0%, 100%': { transform: 'scaleY(0.3)' },
    '50%': { transform: 'scaleY(1.0)' },
  },
  typing: {
    '0%, 100%': { transform: 'translateY(0)' },
    '28%': { transform: 'translateY(-5px)' },
    '44%': { transform: 'translateY(0)' },
  },
  shimmer: {
    '100%': { transform: 'translateX(100%)' },
  },
  spinner: {
    '100%': { transform: 'rotate(360deg)' },
  },
  breathing: {
    '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
    '50%': { transform: 'scale(1.05)', opacity: '1' },
  },
} as const;

// ============================================================================
// 13. CSS VARIABLES MAPPING
// ============================================================================

export const CSS_VARIABLES = {
  '--motion-duration-instant': DURATION_CSS.instant,
  '--motion-duration-fast': DURATION_CSS.fast,
  '--motion-duration-normal': DURATION_CSS.normal,
  '--motion-duration-slow': DURATION_CSS.slow,
  '--motion-ease-standard': EASING_VALUES.standard,
  '--motion-ease-emphasized': EASING_VALUES.emphasized,
  '--motion-ease-decelerate': EASING_VALUES.decelerate,
} as const;

// ============================================================================
// 14. AEGIS MOTION EXPORTS OBJECT
// ============================================================================

export const AEGIS_MOTION = {
  duration: DURATION_VALUES,
  durationCss: DURATION_CSS,
  easing: EASING_VALUES,
  easingCoordinates: EASING_COORDINATES,
  tailwindEasing: TAILWIND_EASING_MAP,
  transition: TRANSITION_PRESETS,
  transform: TRANSFORM_VALUES,
  loading: LOADING_TOKENS,
  ai: AI_PRESETS,
  component: COMPONENT_MOTION,
  accessibility: ACCESSIBILITY,
  performance: PERFORMANCE,
  tailwindAnimation: TAILWIND_ANIMATION_MAP,
  keyframes: KEYFRAMES,
  variables: CSS_VARIABLES,
  utilities: {
    ms,
    s,
    createTransition,
    createFramerTransition,
  }
} as const;
