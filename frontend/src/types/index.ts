export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Guardian {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
  createdAt: Date;
}

export interface Report {
  id: string;
  userId: string;
  category: string;
  description: string;
  latitude: string;
  longitude: string;
  address?: string | null;
  imageUrl?: string | null;
  isAnonymous: boolean;
  status: string;
  verified: boolean;
  createdAt: Date;
}

export interface SafeSpace {
  id: string;
  name: string;
  type: string;
  latitude: string;
  longitude: string;
  address: string;
  phone?: string | null;
  rating?: string | null;
  isOpen24Hours: boolean;
  verified: boolean;
  createdAt: Date;
}

export interface Route {
  id: string;
  userId: string;
  origin: Record<string, unknown>;
  destination: Record<string, unknown>;
  waypoints: Record<string, unknown>[];
  safetyScore?: string | null;
  riskLevel?: string | null;
  riskFactors: Record<string, unknown>[];
  alternativeRoutes: Record<string, unknown>[];
  createdAt: Date;
}

export interface SOS {
  id: string;
  userId: string;
  latitude: string;
  longitude: string;
  address?: string | null;
  audioUrl?: string | null;
  guardianNotified: boolean;
  status: string;
  createdAt: Date;
}

export interface Analytics {
  id: string;
  userId: string;
  eventType: string;
  eventData: Record<string, unknown>;
  createdAt: Date;
}

export type ThreatLevel = 'low' | 'moderate' | 'high' | 'severe';

export interface DashboardData {
  threatLevel: ThreatLevel;
  safetyScore: number;
  recentReports: Report[];
  activeAlerts: Alert[];
  guardianStatus: GuardianStatus;
  statistics: Statistics;
}

export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export interface GuardianStatus {
  isOnline: boolean;
  lastActive?: Date;
  guardians: Guardian[];
}

export interface Statistics {
  totalReports: number;
  reportsThisWeek: number;
  safeSpacesNearby: number;
  sosCount: number;
}

export interface RouteAnalysis {
  safetyScore: number;
  riskLevel: ThreatLevel;
  riskFactors: RiskFactor[];
  alternativeRoutes: AlternativeRoute[];
  recommendation: string;
}

export interface RiskFactor {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface AlternativeRoute {
  id: string;
  safetyScore: number;
  duration: number;
  distance: number;
  polyline: string;
}
