# AEGIS Codebase Rules & Style Guidelines

This document outlines the strict rules and constraints developers and AI assistants must follow when working on the AEGIS codebase.

## 1. Directory Structure Conventions

- **Clean Boundaries**: Keep `src/tokens/` framework-agnostic. No React imports, `window` checks, or component hooks are allowed in this directory.
- **Hooks Allocation**: All custom responsive hooks (`useMediaQuery`, `useBreakpoint`) must live inside `src/hooks/` and export from `src/hooks/index.ts`.
- **Contract Models**: Shared interfaces and type definitions must reside in `src/types/` and export from `src/types/index.ts`.

## 2. JavaScript & TypeScript Coding Standards

- **Named Exports Only**: Always use named exports instead of default exports across all modules. This encourages clean tree-shaking and avoids import naming discrepancies.
  - *Correct*: `export const BORDER_RADIUS = ...`
  - *Incorrect*: `export default BORDER_RADIUS`
- **Type Safety**: Avoid using the `any` type keyword. Use strictly defined typings, unions, or `unknown` where fallback is necessary.
- **No Unused Imports**: Keep modules tidy. Unused import warnings must be completely eliminated.

## 3. Motion & Animation Standards

- **Avoid Animating Reflow Properties**: Animating CSS layout properties like `width`, `height`, `left`, `top`, `margin`, or `padding` is strictly forbidden as it triggers page reflows.
- **Animate Composited Elements**: Only animate GPU-compositor properties like `transform`, `opacity`, and `filter` for UI states.
- **Explicit Transition Declarations**: Transition presets must specify explicit properties instead of utilizing `transition: all`.
  - *Correct*: `transition: opacity 200ms ease, transform 200ms ease;`
  - *Incorrect*: `transition: all 200ms ease;`

## 4. Responsive & Layout Rules

- **Native Resize Adaptations**: Responsive states must hook into window `matchMedia` event listeners (`change`) instead of window `resize` polling.
- **Fluid Layout Intersecting**: Implement viewport scaling using CSS `clamp()` or the `createFluidSize()` utility instead of defining rigid media queries for small element spacing differences.
- **Safe Area Insets**: Support safe-area inset environment boundaries (`env(safe-area-inset-top)`) across header, footer, drawer, and modal spacing.

## 5. Map Integration Rules

- **Neutral Default Center**: Never hardcode default coordinate systems to specific cities. Initialize `defaultCenter` as `{ lat: 0, lng: 0 }` and let Geolocation resolve the active viewport.
- **Google Cloud Map IDs**: Read map style IDs from environment variables (`mapIdEnv: "NEXT_PUBLIC_GOOGLE_MAP_LIGHT"`) rather than typing static strings inside code files.
- **Marker Animations**: Avoid using legacy bounce/pulse map marker indicators. Animate `AdvancedMarkerElement` pins using CSS variables and transition class animations.
- **Performance Safeguards**: Enforce marker clustering, viewport culling, and GPS throttle boundaries to limit DOM complexity on high-density map feeds.
