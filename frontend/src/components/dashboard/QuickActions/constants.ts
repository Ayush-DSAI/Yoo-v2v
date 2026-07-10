import { Navigation, AlertOctagon, ShieldAlert, UserCheck, MapPin, Mic } from 'lucide-react';

export const DEFAULT_ACTIONS = [
  { id: 'qa-route', label: 'Safe Route', icon: Navigation, type: 'primary' as const, glowColor: 'rgba(59, 130, 246, 0.15)' },
  { id: 'qa-sos', label: 'SOS', icon: AlertOctagon, type: 'danger' as const, glowColor: 'rgba(239, 68, 68, 0.15)' },
  { id: 'qa-report', label: 'Report Incident', icon: ShieldAlert, type: 'danger' as const, glowColor: 'rgba(239, 68, 68, 0.15)' },
  { id: 'qa-guardian', label: 'Guardian Sync', icon: UserCheck, type: 'secondary' as const, glowColor: 'rgba(139, 92, 246, 0.15)' },
  { id: 'qa-space', label: 'Safe Space', icon: MapPin, type: 'safe' as const, glowColor: 'rgba(16, 185, 129, 0.15)' },
  { id: 'qa-voice', label: 'Voice Assistant', icon: Mic, type: 'secondary' as const, glowColor: 'rgba(99, 102, 241, 0.15)' }
];
export type QuickActionsList = typeof DEFAULT_ACTIONS;
