import { Shield, Hospital, Radio } from 'lucide-react';

export const THREAT_MARKERS = [
  { id: 1, x: '22%', y: '35%', type: 'alert' as const, label: 'Suspicious Activity' },
  { id: 2, x: '68%', y: '52%', type: 'alert' as const, label: 'Low Visibility Zone' },
  { id: 3, x: '45%', y: '72%', type: 'alert' as const, label: 'Reported Incident' },
];

export const SAFE_MARKERS = [
  { id: 4, x: '35%', y: '28%', type: 'safe' as const, icon: Shield, label: 'Police Station' },
  { id: 5, x: '72%', y: '30%', type: 'safe' as const, icon: Hospital, label: 'City Hospital' },
  { id: 6, x: '55%', y: '45%', type: 'safe' as const, icon: Shield, label: 'Fire Dept' },
  { id: 7, x: '28%', y: '65%', type: 'safe' as const, icon: Radio, label: 'Comm Hub' },
];

export const ROUTE_POINTS = [
  { x: 15, y: 80 }, { x: 25, y: 68 }, { x: 35, y: 55 },
  { x: 48, y: 48 }, { x: 60, y: 40 }, { x: 72, y: 35 },
  { x: 82, y: 25 },
];
