import { ReactNode } from 'react';

export interface DashboardGridProps {
  header: ReactNode;
  kpiRow: ReactNode;
  mapAndBrief: ReactNode;
  actionsAndLog: ReactNode;
  footer?: ReactNode;
  className?: string;
}
