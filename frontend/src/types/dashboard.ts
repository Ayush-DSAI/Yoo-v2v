export type ThreatSeverity = 'low' | 'moderate' | 'high' | 'critical';

export interface SafetyScore {
  score: number;
  maxScore: number;
  trend: number; // e.g. +2.3
  trendPeriod: string; // e.g. '7d'
  confidence: number;
  lastUpdated: string;
}

export interface ThreatLevel {
  level: number; // 0-100
  severity: ThreatSeverity;
  label: string;
}

export interface Alert {
  id: string;
  type: string;
  message: string;
  severity: ThreatSeverity;
  timestamp: string;
}

export interface SafeSpace {
  id: string;
  name: string;
  type: string;
  distance: string;
  capacity: string;
  isVerified: boolean;
}

export interface CommunityStats {
  activeReporters: number;
  reportsToday: number;
  trustScore: number;
  trendingArea: string;
}

export interface MissionBrief {
  brief: string;
  explanation: string;
  confidence: number;
  riskReduction: number;
  eta: string;
  signalsProcessed: number;
  actionLabel: string;
}

export interface GuardianStatus {
  id: string;
  name: string;
  avatarUrl: string;
  status: 'active' | 'standby' | 'offline';
  eta?: string;
  distance?: string;
  lastSync: string;
}

export interface WeatherInfo {
  temperature: number;
  unit: 'C' | 'F';
  condition: string;
  visibility: string;
  alert?: {
    type: 'warning' | 'danger' | 'success' | 'default' | 'outline' | 'glass';
    message: string;
  };
}

export interface TimelineEvent {
  id: string;
  type: 'ai' | 'community' | 'system' | 'guardian';
  title: string;
  detail: string;
  timestamp: string;
  iconType: 'alert' | 'safe' | 'route' | 'update';
}

export interface Report {
  id: string;
  author: string;
  avatarUrl: string;
  type: string;
  location: string;
  timeAgo: string;
  severity: ThreatSeverity;
  upvotes: number;
  verified: boolean;
}

export interface MapMarker {
  id: string;
  x: string | number; // % or px
  y: string | number;
  type: 'threat' | 'safe' | 'user' | 'destination';
  label: string;
  icon?: string; // name of lucide icon if safe
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  type: 'primary' | 'danger' | 'safe' | 'secondary' | 'outline';
}

export interface HeatMapPoint {
  x: string | number;
  y: string | number;
  radius: number;
  severity: ThreatSeverity;
}

export interface DashboardData {
  safetyScore: SafetyScore;
  threatLevel: ThreatLevel;
  missionBrief: MissionBrief;
  guardians: GuardianStatus[];
  weather: WeatherInfo;
  timeline: TimelineEvent[];
  mapData: {
    markers: MapMarker[];
    heatmaps: HeatMapPoint[];
    route: { x: number; y: number }[];
  };
  quickActions: QuickAction[];
  recentReports: Report[];
  activeAlerts: Alert[];
  safeSpaces: SafeSpace[];
  communityStats: CommunityStats;
  systemStatus: {
    isLive: boolean;
    activeFeeds: number;
    version: string;
  };
}
