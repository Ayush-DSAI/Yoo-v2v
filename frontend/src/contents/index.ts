/**
 * AEGIS Design System v2.0
 * 
 * @module @aegis/design-system
 * @description Official public entry point for the AEGIS Design System.
 * Framework-agnostic tokens optimized for Next.js App Router tree-shaking.
 * @version 2.0.2
 */

// ============================================================================
// 1. LOCAL IMPORTS (Only imports symbols needed locally for AEGIS_CONFIG definition)
// ============================================================================

import {
  AEGIS_COLORS,
  COLOR_SHADOWS,
  MAP_COLORS,
} from './colors';

import {
  AEGIS_BREAKPOINTS,
} from './breakpoints';

import {
  AEGIS_MOTION,
} from './motion';

import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';
import { AEGIS_LAYOUT } from './layout';
import { STATUS } from './status';

// ============================================================================
// 2. DESIGN TOKENS EXPORTS (Pure Constants - 100% Server Component Safe)
// ============================================================================

export {
  AEGIS_COLORS,
  PRIMITIVES,
  THEME_DICTIONARIES,
  STATUS_COLORS,
  AI_COLORS,
  MAP_COLORS,
  GRADIENTS,
  COLOR_SHADOWS as SHADOWS, // Aliased to expose SHADOWS publicly
  TAILWIND_COLORS,
} from './colors';

export {
  AEGIS_BREAKPOINTS,
  BREAKPOINT_VALUES,
  BREAKPOINT_CSS,
  TAILWIND_SCREENS,
  MEDIA_QUERIES,
  ORIENTATION_QUERIES,
  ACCESSIBILITY_QUERIES,
  CONTAINERS,
  GRID,
  Responsive as CLIENT_HELPERS, // Aliased for client helper compatibility
} from './breakpoints';

export {
  AEGIS_MOTION,
  DURATION_VALUES,
  TAILWIND_DURATION_MAP,
  EASING_VALUES,
  TAILWIND_EASING_MAP,
  TRANSITION_PRESETS,
  TRANSFORM_VALUES,
  COMPONENT_MOTION,
  PERFORMANCE as MOTION_PERFORMANCE,
} from './motion';

export { SPACING } from './spacing';
export { TYPOGRAPHY } from './typography';
export { AEGIS_LAYOUT as LAYOUT } from './layout';
export { STATUS } from './status';

// ============================================================================
// 3. SHARED TYPES & SCHEMAS
// ============================================================================

export type {
  ColorHex,
  ColorScaleStep,
  ThemeMode,
} from './colors';

export type {
  BreakpointKey,
  DeviceCategory,
  Orientation,
  MediaQueryString,
  ResponsiveRange,
} from './breakpoints';

export type {
  DurationKey,
  EasingKey,
  TransitionProperty,
  AnimationKey,
  FramerTransition,
} from './motion';

export type {
  RadiusKey,
  ZIndexKey,
  ContainerSize,
  LayoutDimension,
  SidebarState,
  HeaderSize,
  DashboardPanel,
  TouchTarget,
} from './layout';

export type {
  Coordinates,
  Bounds,
  ZoomLevel,
  MarkerType,
  RouteType,
  MapTheme,
  GoogleMapType,
  AdvancedMarkerConfig,
  RouteStyle,
} from './map';

// ============================================================================
// 4. REACT HOOKS (Imported from hooks and cleanly re-exported)
// ============================================================================

export { useMediaQuery, useBreakpoint } from '../hooks';

// ============================================================================
// 5. SYSTEM CONSOLIDATION CONFIG (Named Export Only)
// ============================================================================

export const AEGIS_CONFIG = {
  version: '2.0.2',
  colors: AEGIS_COLORS,
  motion: AEGIS_MOTION,
  breakpoints: AEGIS_BREAKPOINTS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  layout: AEGIS_LAYOUT,
  shadows: COLOR_SHADOWS,
  map: MAP_COLORS,
  status: STATUS,
} as const;
