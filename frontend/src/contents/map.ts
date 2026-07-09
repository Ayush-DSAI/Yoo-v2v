import { MAP_COLORS } from './colors';

/**
 * AEGIS v2.0 Geospatial Design System
 * 
 * @module @aegis/map
 * @description Single source of truth for map parameters, Advanced Marker configurations, safe routing options, and layers.
 * @version 2.0.2
 */

// ============================================================================
// 1. TYPES & SCHEMAS
// ============================================================================

export interface Coordinates {
  readonly lat: number;
  readonly lng: number;
}

export interface Bounds {
  readonly north: number;
  readonly south: number;
  readonly east: number;
  readonly west: number;
}

export type ZoomLevel = 
  | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export type MarkerType = 
  | 'currentLocation'
  | 'destination'
  | 'safeSpace'
  | 'incident'
  | 'sos'
  | 'guardian'
  | 'aiRecommendation'
  | 'voiceAssistant';

export type RouteType = 'safe' | 'fast' | 'recommended' | 'danger' | 'emergency' | 'alternative';

export type MapTheme = 'light' | 'dark' | 'satellite' | 'navigation' | 'emergency';

export type GoogleMapType = 'roadmap' | 'satellite' | 'terrain' | 'hybrid';

export interface AdvancedMarkerConfig {
  readonly background: string;
  readonly borderColor: string;
  readonly glyphColor: string;
  readonly scale: number;
  readonly animationClass: string;
  readonly zIndex: number;
}

export interface RouteStyle {
  readonly strokeColor: string;
  readonly strokeOpacity: number;
  readonly strokeWeight: number;
  readonly icons: readonly unknown[];
  readonly strokeDashGap?: string;
  readonly strokeDashPattern?: string;
}

// ============================================================================
// 2. GEOSPATIAL PRIMITIVES (Reference Stable)
// ============================================================================

export const MAP_PRIMITIVES = {
  // Neutral coordinates - let GPS resolve actual location
  defaultCenter: Object.freeze({
    lat: 0,
    lng: 0,
  }),
  
  defaultZoom: 13 as ZoomLevel,
  minZoom: 3 as ZoomLevel,
  maxZoom: 20 as ZoomLevel,
  earthRadiusMeters: 6371000,
} as const;

// ============================================================================
// 3. GOOGLE MAPS CONSTANTS
// ============================================================================

export const DEFAULT_PADDING = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
} as const;

export const MAX_BOUNDS: Bounds = {
  north: 85,
  south: -85,
  east: 180,
  west: -180,
} as const;

export const EARTH_RADIUS = 6371000; // in meters

export const GPS_ACCURACY_THRESHOLD = 20; // 20 meters acceptable accuracy

export const LOCATION_TIMEOUT = 10000; // 10 seconds geolocation timeout

export const WATCH_POSITION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
} as const;

// ============================================================================
// 4. CLOUD STYLE THEMES & ENV MAPS
// ============================================================================

export const MAP_THEMES: Record<MapTheme, { name: string; mapIdEnv: string; fallbackType: GoogleMapType }> = {
  light: {
    name: 'AEGIS Light Core',
    mapIdEnv: 'NEXT_PUBLIC_GOOGLE_MAP_LIGHT',
    fallbackType: 'roadmap',
  },
  dark: {
    name: 'AEGIS Dark Tactical',
    mapIdEnv: 'NEXT_PUBLIC_GOOGLE_MAP_DARK',
    fallbackType: 'roadmap',
  },
  satellite: {
    name: 'AEGIS Satellite Imagery',
    mapIdEnv: 'NEXT_PUBLIC_GOOGLE_MAP_SATELLITE',
    fallbackType: 'satellite',
  },
  navigation: {
    name: 'AEGIS Smart Navigation',
    mapIdEnv: 'NEXT_PUBLIC_GOOGLE_MAP_NAV',
    fallbackType: 'roadmap',
  },
  emergency: {
    name: 'AEGIS Critical Emergency',
    mapIdEnv: 'NEXT_PUBLIC_GOOGLE_MAP_EMERGENCY',
    fallbackType: 'roadmap',
  },
} as const;

// ============================================================================
// 5. ADVANCED MARKERS SPECIFICATION (Google AdvancedMarkerElement CSS-driven animation)
// ============================================================================

export const ADVANCED_MARKERS: Record<MarkerType, AdvancedMarkerConfig> = {
  currentLocation: {
    background: '#3B82F6',
    borderColor: '#FFFFFF',
    glyphColor: '#FFFFFF',
    scale: 1.0,
    animationClass: 'aegis-pulse',
    zIndex: 1000,
  },
  destination: {
    background: '#10B981',
    borderColor: '#FFFFFF',
    glyphColor: '#FFFFFF',
    scale: 1.2,
    animationClass: 'aegis-bounce',
    zIndex: 900,
  },
  safeSpace: {
    background: '#22C55E',
    borderColor: '#DCFCE7',
    glyphColor: '#FFFFFF',
    scale: 1.1,
    animationClass: 'aegis-none',
    zIndex: 850,
  },
  incident: {
    background: '#F59E0B',
    borderColor: '#FEF3C7',
    glyphColor: '#FFFFFF',
    scale: 1.1,
    animationClass: 'aegis-none',
    zIndex: 800,
  },
  sos: {
    background: '#EF4444',
    borderColor: '#FEE2E2',
    glyphColor: '#FFFFFF',
    scale: 1.4,
    animationClass: 'aegis-pulse',
    zIndex: 9990,
  },
  guardian: {
    background: '#8B5CF6',
    borderColor: '#F3E8FF',
    glyphColor: '#FFFFFF',
    scale: 1.0,
    animationClass: 'aegis-pulse',
    zIndex: 850,
  },
  aiRecommendation: {
    background: '#A855F7',
    borderColor: '#F3E8FF',
    glyphColor: '#FFFFFF',
    scale: 1.1,
    animationClass: 'aegis-pulse',
    zIndex: 750,
  },
  voiceAssistant: {
    background: '#06B6D4',
    borderColor: '#CFFAFE',
    glyphColor: '#FFFFFF',
    scale: 1.0,
    animationClass: 'aegis-none',
    zIndex: 950,
  },
} as const;

// ============================================================================
// 6. VECTOR ROUTE RENDERERS (Typed & Synced to Design Tokens)
// ============================================================================

export const ROUTE_POLYLINES: Record<RouteType, RouteStyle> = {
  safe: {
    strokeColor: MAP_COLORS.route.safe,
    strokeOpacity: 0.9,
    strokeWeight: 6,
    icons: [],
  },
  fast: {
    strokeColor: '#3B82F6',
    strokeOpacity: 0.9,
    strokeWeight: 6,
    icons: [],
  },
  recommended: {
    strokeColor: MAP_COLORS.route.active,
    strokeOpacity: 1.0,
    strokeWeight: 8,
    icons: [],
  },
  danger: {
    strokeColor: MAP_COLORS.route.danger,
    strokeOpacity: 0.7,
    strokeWeight: 5,
    strokeDashGap: '10px',
    strokeDashPattern: '10px 10px',
    icons: [],
  },
  emergency: {
    strokeColor: '#DC2626',
    strokeOpacity: 1.0,
    strokeWeight: 8,
    icons: [],
  },
  alternative: {
    strokeColor: '#64748B',
    strokeOpacity: 0.5,
    strokeWeight: 4,
    strokeDashPattern: '5px 5px',
    icons: [],
  },
} as const;

// ============================================================================
// 7. GOOGLE MAPS INSTANCE DEFAULT OPTIONS
// ============================================================================

export const MAP_OPTIONS = {
  disableDefaultUI: false,
  fullscreenControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  zoomControl: true,
  gestureHandling: 'cooperative',
  keyboardShortcuts: true,
  clickableIcons: false,
} as const;

// ============================================================================
// 8. GEOSPATIAL FEATURE LAYERS
// ============================================================================

export const LAYERS = {
  incidentLayer: { visible: true, opacity: 1.0 },
  safeSpaceLayer: { visible: true, opacity: 0.9 },
  heatmapLayer: { visible: false, opacity: 0.6 },
  analyticsLayer: { visible: false, opacity: 0.8 },
  guardianLayer: { visible: true, opacity: 1.0 },
  riskLayer: { visible: true, opacity: 0.5 },
  routeLayer: { visible: true, opacity: 0.95 },
  predictionLayer: { visible: false, opacity: 0.7 },
} as const;

// ============================================================================
// 9. CAMERA ANGLE PRESETS
// ============================================================================

export const CAMERA_PRESETS = {
  default: { zoom: 12, tilt: 0, bearing: 0 },
  navigation: { zoom: 16, tilt: 45, bearing: 0 },
  overview: { zoom: 8, tilt: 0, bearing: 0 },
  followUser: { zoom: 15, tilt: 30, bearing: 0 },
  emergency: { zoom: 17, tilt: 0, bearing: 0 },
  analytics: { zoom: 10, tilt: 0, bearing: 0 },
} as const;

// ============================================================================
// 10. ACCESSIBILITY RULES
// ============================================================================

export const ACCESSIBILITY = {
  REDUCED_MOTION: {
    disableMarkerAnimations: true,
    smoothPanning: false,
  },
  HIGH_CONTRAST: {
    outlineWidth: 3,
    outlineColor: '#FFFFFF',
    textGlow: true,
  },
  LARGE_MARKERS: {
    scaleMultiplier: 1.25,
  },
  KEYBOARD_NAVIGATION: true,
  VOICE_NAVIGATION: true,
} as const;

// ============================================================================
// 11. SPATIAL STREAMING ENGINE & PERFORMANCE TUNING
// ============================================================================

export const PERFORMANCE = {
  markerPooling: true,
  vectorRendering: true,
  tileCaching: true,
  lazyRoutes: true,
  debounce: {
    boundsChangeMs: 150,
  },
  throttle: {
    gpsTrackMs: 1000,
  },
  workerSupport: true,
  maxVisibleMarkers: 250,
  clusterRadius: 60,
  GPUHints: {
    willReadFrequently: false,
    alpha: false,
  },
} as const;

// ============================================================================
// 12. MAP FEATURE TOGGLE FLAGS
// ============================================================================

export const FEATURES = {
  traffic: true,
  heatmap: true,
  clustering: true,
  drawing: false,
  geofencing: true,
  streetView: false,
  indoorMaps: false,
  places: true,
  directions: true,
  distanceMatrix: true,
} as const;

// ============================================================================
// 13. TAILWIND ENGINE MAPPINGS
// ============================================================================

export const TAILWIND_MAP = {
  'map-h': 'calc(100dvh - 64px)',
  'map-canvas-min': '500px',
} as const;

export const TAILWIND_MARKERS = {
  'marker-sos-glow': '0 0 24px rgba(239, 68, 68, 0.6)',
  'marker-ai-glow': '0 0 20px rgba(168, 85, 247, 0.5)',
} as const;

export const TAILWIND_ROUTE = {
  'route-safe': MAP_COLORS.route.safe,
  'route-active': MAP_COLORS.route.active,
  'route-danger': MAP_COLORS.route.danger,
} as const;

export const TAILWIND_LAYERS = {
  'layer-opacity-heatmap': String(LAYERS.heatmapLayer.opacity),
  'layer-opacity-risk': String(LAYERS.riskLayer.opacity),
} as const;

export const TAILWIND_CAMERA = {
  'camera-tilt-nav': `${CAMERA_PRESETS.navigation.tilt}deg`,
  'camera-tilt-follow': `${CAMERA_PRESETS.followUser.tilt}deg`,
} as const;

// ============================================================================
// 14. CONSOLIDATED GEOSPATIAL MASTER EXPORT
// ============================================================================

export const AEGIS_MAP = {
  primitives: MAP_PRIMITIVES,
  themes: MAP_THEMES,
  markers: ADVANCED_MARKERS,
  routes: ROUTE_POLYLINES,
  camera: CAMERA_PRESETS,
  layers: LAYERS,
  performance: PERFORMANCE,
  accessibility: ACCESSIBILITY,
  options: MAP_OPTIONS,
  features: FEATURES,
  tailwind: {
    map: TAILWIND_MAP,
    markers: TAILWIND_MARKERS,
    route: TAILWIND_ROUTE,
    layers: TAILWIND_LAYERS,
    camera: TAILWIND_CAMERA,
  },
} as const;

export default AEGIS_MAP;
