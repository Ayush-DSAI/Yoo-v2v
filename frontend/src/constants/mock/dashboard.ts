import { Shield, Navigation, UserPlus, AlertOctagon, MapPin, Mic } from 'lucide-react';

export const dashboardStats = {
  safetyScore: 94,
  activeAlerts: 3,
  safeSpaces: 12,
  reports: 156,
};

export const mockStatsData = [
  {
    title: 'Safety Score',
    value: '94/100',
    subtitle: 'Excellent status',
    trend: { value: '+2%', positive: true },
    color: 'from-emerald-500 to-teal-600',
    iconKey: 'shield',
    status: 'safe' as const
  },
  {
    title: 'Active Alerts',
    value: '3',
    subtitle: 'Moderate risk in sector 7',
    trend: { value: '-1', positive: true },
    color: 'from-amber-500 to-orange-600',
    iconKey: 'alert',
    status: 'warning' as const
  },
  {
    title: 'Safe Spaces',
    value: '12',
    subtitle: 'Within 2km radius',
    color: 'from-blue-500 to-indigo-600',
    iconKey: 'mapPin',
    status: 'info' as const
  },
  {
    title: 'Community',
    value: '156',
    subtitle: 'Active reporters nearby',
    trend: { value: '+12', positive: true },
    color: 'from-violet-500 to-purple-600',
    iconKey: 'users',
    status: 'info' as const
  }
];

export const mockAlerts = [
  { id: 1, type: 'warning' as const, title: 'Unusual Activity Detected', location: 'Sector 7, Avenue 12', time: '2 min ago' },
  { id: 2, type: 'info' as const, title: 'Road Closure', location: 'Main Street Bridge', time: '15 min ago' },
  { id: 3, type: 'critical' as const, title: 'Emergency Response', location: 'Central Park Area', time: '32 min ago' }
];

export const mockActivities = [
  { id: 1, eventType: 'report-submitted', user: 'System Sensor', action: 'Report submitted', location: 'Sector 7 Intersection', time: '2m ago', badge: 'Warning' },
  { id: 2, eventType: 'route-generated', user: 'AEGIS AI', action: 'Safe Route Generated', location: 'Home to Headquarters Corridor', time: '8m ago', badge: 'Route Optimised' },
  { id: 3, eventType: 'guardian-connected', user: 'Sarah Jenkins', action: 'Guardian Connected', location: 'Linked via encrypted signal', time: '15m ago', badge: 'Encrypted' },
  { id: 4, eventType: 'sos-cancelled', user: 'Marcus Vance', action: 'SOS Cancelled', location: 'Sector 12 Safe Haven', time: '30m ago', badge: 'Secured' },
  { id: 5, eventType: 'space-verified', user: 'Community Inspector', action: 'Safe Space Verified', location: 'Central Library Shelter', time: '1h ago', badge: 'Verified' }
];

export const mockEnvironment = {
  temperature: '68°F',
  condition: 'Light Rain',
  visibility: 'Low (0.8 mi)',
  rain: '4.2 mm/hr',
  wind: '14 mph ENE',
  airQuality: '42 AQI (Good)',
  riskLevel: 'Moderate'
};

export const mockGuardians = [
  { id: 1, name: 'Sarah Jenkins', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80', status: 'Active Sync', distance: '0.4 mi away', lastUpdated: '10s ago' },
  { id: 2, name: 'Michael Torres', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80', status: 'Standby Sync', distance: '1.8 mi away', lastUpdated: '3m ago' }
];
