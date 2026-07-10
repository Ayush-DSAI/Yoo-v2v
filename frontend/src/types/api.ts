export interface Location {
  lat: number;
  lng: number;
}

export interface AnalyzeRouteRequest {
  source: Location;
  destination: Location;
}

export interface AnalyzeRouteResponse {
  safety_score: number;
  risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  explanation: string;
}

export interface Report {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  location: string;
  time: string;
  description?: string;
  imageUrl?: string;
}

export interface CreateReportRequest {
  type: 'warning' | 'critical' | 'info';
  title: string;
  location: string;
  description?: string;
  image?: File;
}

export interface AnalyticsResponse {
  dailyIncidents: number;
  activeAlerts: number;
  safeSpacesCount: number;
  communityReporters: number;
}

export interface SOSResponse {
  success: boolean;
  message: string;
  dispatched: boolean;
}
