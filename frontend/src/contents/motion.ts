/**
 * AEGIS v2.0 Motion Design System
 * @module @aegis/motion
 * @description Single source of truth for hardware-accelerated animations, Tailwind, and Framer Motion configurations.
 * @version 2.0.1
 */

// ============================================================================
// 1. TYPES & SCHEMAS
// ============================================================================

export type CssTime = `${number}ms` | `${number}s` | '0ms';
export type CubicBezierString = `cubic-bezier(${number}, ${number}, ${number}, ${number})`;
export type DurationKey = 'instant' | 'ultraFast' | 'fast' | 'normal' | 'medium' | 'slow' | 'slower' | 'dramatic';
export type EasingKey = 'standard' | 'emphasized' | 'accelerate' | 'decelerate' | 'smooth' | 'sharp' | 'spring' | 'overshoot';
export type AnimationKey = 'pulse' | 'shimmer' | 'skeleton' | 'spinner' | 'typing' | 'dots' | 'wave' | 'breathing' | 'progress' | 'streaming';

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
  readonly duration: number;
  readonly ease: readonly [number, number, number, number];
  readonly delay?: number;
}

// ============================================================================
// 2. RAW PRIMITIVE DICTIONARIES (Deeply Frozen)
// ============================================================================

export const DURATION_VALUES = Object.freeze({
  instant: 0,
  ultraFast: 100,
  fast: 200,
  normal: 300,
  medium: 400,
  slow: 500,
  slower: 700,
  dramatic: 1000,
});

export const DURATION_CSS = Object.freeze(
  Object.keys(DURATION_VALUES).reduce((acc, key) => {
    acc[key as DurationKey] = `${DURATION_VALUES[key as DurationKey]}ms`;
    return acc;
  }, {} as Record<DurationKey, string>)
);

/**
 * Split coordinates explicitly to serve both CSS strings and Framer Motion arrays cleanly
 */
export const EASING_COORDINATES = Object.freeze({
  standard: [0.4, 0.0, 0.2, 1.0],
  emphasized: [0.2, 0.0, 0.0, 1.0],
  accelerate: [0.4, 0.0, 1.0, 1.0],
  decelerate: [0.0, 0.0, 0.2, 1.0], // Core choice for safety feedback panels
  smooth: [0.25, 0.1, 0.25, 1.0],
  sharp: [0.3, 0.0, 0.8, 0.15],
  spring: [0.175, 0.885, 0.32, 1.15],
  overshoot: [0.34, 1.56, 0.64, 1.0],
}) as Record<EasingKey, readonly [number, number, number, number]>;

export const EASING_VALUES = Object.freeze(
  Object.keys(EASING_COORDINATES).reduce((acc, key) => {
    const coords = EASING_COORDINATES[key as EasingKey];
    acc[key as EasingKey] = `cubic-bezier(${coords[0]}, ${coords[1]}, ${coords[2]}, ${coords[3]})`;
    return acc;
  }, {} as Record<EasingKey, CubicBezierString>)
);

// ============================================================================
// 3. UTILITY FACTORIES (SSR-Safe & Multi-Engine Ready)
// ============================================================================

export const ms = (value: number): CssTime => (value === 0 ? '0ms' : `${value}ms`);
export const s = (value: number): number => value / 1000;

export const createTransition = (
  properties: TransitionProperty | TransitionProperty[],
  durationKey: DurationKey = 'normal',
  easingKey: EasingKey = 'standard'
): string => {
  const props = Array.isArray(properties) ? properties : [properties];
  const duration = DURATION_CSS[durationKey];
  const ease = EASING_VALUES[easingKey];
  return props.map(prop => `${prop} ${duration} ${ease}`).join(', ');
};

/**
 * Explicit factory transforming design system tokens directly into Framer Motion parameters
 */
export const createFramerTransition = (
  durationKey: DurationKey = 'normal',
  easingKey: EasingKey = 'standard',
  delayMs?: number
): FramerTransition => ({
  duration: s(DURATION_VALUES[durationKey]),
  ease: [...EASING_COORDINATES[easingKey]],
  ...(delayMs && { delay: s(delayMs) }),
});

// ============================================================================
// 4. HARDWARE-ACCELERATED TRANSFORMS (Forced 3D Composite Layers)
// ============================================================================

export const TRANSFORM_VALUES = Object.freeze({
  hoverScale: 'scale3d(1.02, 1.02, 1)',
  pressedScale: 'scale3d(0.98, 0.98, 1)',
  activeScale: 'scale3d(0.95, 0.95, 1)',
  modalEnter: 'scale3d(0.95, 0.95, 1) translate3d(0, 10px, 0)',
  modalExit: 'scale3d(1.02, 1.02, 1) translate3d(0, -10px, 0)',
  
  translateSmall: 'translate3d(0, -4px, 0)',
  translateMedium: 'translate3d(0, -10px, 0)',
  translateLarge: 'translate3d(0, -40px, 0)',
  
  slideLeft: 'translate3d(-100%, 0, 0)',
  slideRight: 'translate3d(100%, 0, 0)',
  slideUp: 'translate3d(0, -100%, 0)',
  slideDown: 'translate3d(0, 100%, 0)',
  
  rotate90: 'rotate3d(0, 0, 1, 90deg)',
  rotate180: 'rotate3d(0, 0, 1, 180deg)',
  
  cardLift: 'translate3d(0, -4px, 0)',
  buttonPress: 'translate3d(0, 1px, 0)',
  floatingHover: 'translate3d(0, -2px, 0)',
});

// ============================================================================
// 5. SEMANTIC PRESETS & COMPONENT CONFIGURATIONS
// ============================================================================

export const TRANSITION_PRESETS = Object.freeze({
  fade: createTransition('opacity', 'normal', 'decelerate'),
  fadeFast: createTransition('opacity', 'fast', 'decelerate'),
  fadeScale: createTransition(['opacity', 'transform'], 'medium', 'decelerate'),
  slide: createTransition('transform', 'medium', 'decelerate'),
  scale: createTransition('transform', 'normal', 'standard'),
  blur: createTransition('filter', 'medium', 'smooth'),
  
  buttonHover: createTransition('all', 'fast', 'standard'),
  buttonPress: createTransition('transform', 'ultraFast', 'accelerate'),
  cardHover: createTransition(['transform', 'box-shadow'], 'fast', 'standard'),
  
  modal: createTransition(['opacity', 'transform'], 'medium', 'decelerate'),
  drawer: createTransition('transform', 'medium', 'decelerate'),
  sidebar: createTransition('transform', 'medium', 'standard'),
  dropdown: createTransition(['opacity', 'transform'], 'fast', 'decelerate'),
  tooltip: createTransition(['opacity', 'transform'], 'ultraFast', 'standard'),
  navbar: createTransition(['background-color', 'box-shadow'], 'medium', 'smooth'),
  routeTransition: createTransition(['stroke-dashoffset', 'opacity'], 'slow', 'smooth'),
});

export const COMPONENT_MOTION = Object.freeze({
  button: { css: TRANSITION_PRESETS.buttonHover, framer: createFramerTransition('fast', 'standard') },
  card: { css: TRANSITION_PRESETS.cardHover, framer: createFramerTransition('fast', 'standard') },
  modal: { css: TRANSITION_PRESETS.modal, framer: createFramerTransition('medium', 'decelerate') },
  drawer: { css: TRANSITION_PRESETS.drawer, framer: createFramerTransition('medium', 'decelerate') },
  sidebar: { css: TRANSITION_PRESETS.sidebar, framer: createFramerTransition('medium', 'standard') },
  tooltip: { css: TRANSITION_PRESETS.tooltip, framer: createFramerTransition('ultraFast', 'standard') },
  
  // Safety Features Mappings (FastAPI & Google Maps Context Boundaries)
  aiChat: {
    messageEnter: createTransition(['opacity', 'transform'], 'fast', 'decelerate'),
    framer: createFramerTransition('fast', 'decelerate'),
    typing: 'aegis-typing',
  },
  voiceAssistant: {
    wave: 'aegis-wave',
    active: createTransition('transform', 'fast', 'standard'),
  },
  routeAnalysis: {
    scan: createTransition('stroke-dashoffset', 'dramatic', 'standard'),
    progress: 'aegis-progress',
  },
  sos: {
    pulse: 'aegis-pulse',
    press: createTransition('transform', 'ultraFast', 'sharp'),
  },
});

// ============================================================================
// 6. ENGINE COMPATIBILITY TARGET MATRICES
// ============================================================================

export const TAILWIND_DURATION_MAP = { ...DURATION_CSS } as const;
export const TAILWIND_EASING_MAP = { ...EASING_VALUES } as const;

export const TAILWIND_ANIMATION_MAP = Object.freeze({
  pulse: 'aegis-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  shimmer: 'aegis-shimmer 2s linear infinite',
  skeleton: 'aegis-skeleton 1.5s ease-in-out infinite',
  spinner: 'aegis-spinner 1s linear infinite',
  typing: 'aegis-typing 1s steps(4) infinite',
  dots: 'aegis-dots 1.5s ease-in-out infinite',
  wave: 'aegis-wave 2s ease-in-out infinite',
  breathing: 'aegis-breathing 3s ease-in-out infinite',
  progress: 'aegis-progress 2s ease-out infinite',
  streaming: 'aegis-streaming 0.5s ease-in-out infinite',
});

export const ACCESSIBILITY = Object.freeze({
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  disableAnimations: {
    duration: '0ms' as CssTime,
    transition: 'none',
    transform: 'none',
    animation: 'none',
  },
  essentialAnimations: ['aegis-pulse', 'aegis-shimmer'],
});

export const PERFORMANCE = Object.freeze({
  gpuAccelerated: ['opacity', 'transform', 'filter'],
  layoutTriggering: ['width', 'height', 'top', 'left', 'margin', 'padding'],
  willChangeHints: ['transform', 'opacity'],
});

// ============================================================================
// 7. PUBLIC SYSTEM AGGREGATION OBJECT
// ============================================================================

export const AEGIS_MOTION = {
  duration: DURATION_VALUES,
  durationCss: DURATION_CSS,
  easing: EASING_VALUES,
  easingCoordinates: EASING_COORDINATES,
  transforms: TRANSFORM_VALUES,
  presets: TRANSITION_PRESETS,
  components: COMPONENT_MOTION,
  tailwind: {
    duration: TAILWIND_DURATION_MAP,
    easing: TAILWIND_EASING_MAP,
    animation: TAILWIND_ANIMATION_MAP,
  },
  accessibility: ACCESSIBILITY,
  performance: PERFORMANCE,
  utilities: { ms, s, createTransition, createFramerTransition },
} as const;

export default AEGIS_MOTION;
