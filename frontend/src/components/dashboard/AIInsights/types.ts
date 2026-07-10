import { AnalyzeRouteResponse } from '@/types/api';

export interface AIInsightsProps {
  routeLoading: boolean;
  routeData: AnalyzeRouteResponse | null;
  error?: string;
  empty?: boolean;
}
