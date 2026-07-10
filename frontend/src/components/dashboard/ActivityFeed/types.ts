export interface Activity {
  id: number;
  eventType: 'report-submitted' | 'route-generated' | 'guardian-connected' | 'sos-cancelled' | 'space-verified';
  user: string;
  action: string;
  location: string;
  time: string;
  badge: string;
}

export interface ActivityFeedProps {
  activities?: Activity[];
  loading?: boolean;
  error?: string;
  empty?: boolean;
}
