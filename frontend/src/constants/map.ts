export const MAP_CONFIG = {
  defaultCenter: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  defaultZoom: 13,
  minZoom: 3,
  maxZoom: 20,
  styles: {
    dark: 'mapbox://styles/mapbox/dark-v11',
    light: 'mapbox://styles/mapbox/light-v11',
    streets: 'mapbox://styles/mapbox/streets-v12',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
  },
  // Map markers configurations
  markers: {
    sos: {
      color: '#FF3B30',
      size: 32,
    },
    safeSpace: {
      color: '#34C759',
      size: 28,
    },
    report: {
      color: '#FFCC00',
      size: 24,
    },
    userLocation: {
      color: '#0A84FF',
      size: 20,
    }
  }
};
