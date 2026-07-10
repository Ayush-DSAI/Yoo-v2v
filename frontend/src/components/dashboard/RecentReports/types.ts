export interface Alert {
  id: number;
  type: 'warning' | 'critical' | 'info';
  title: string;
  location: string;
  time: string;
}

export interface RecentReportsProps {
  alerts?: Alert[];
  loading?: boolean;
  error?: string;
  empty?: boolean;
}
