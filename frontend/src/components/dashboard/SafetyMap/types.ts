import { LucideIcon } from 'lucide-react';

export interface ThreatMarker {
  id: number;
  x: string;
  y: string;
  type: 'alert';
  label: string;
}

export interface SafeMarker {
  id: number;
  x: string;
  y: string;
  type: 'safe';
  icon: LucideIcon;
  label: string;
}

export interface SafetyMapProps {
  loading?: boolean;
  error?: string;
  empty?: boolean;
}
