# AEGIS API & Data Contracts

This document specifies the data contracts, types, and API schemas used across the AEGIS geospatial safety application.

## 1. SOS & Emergency Dispatch

### `POST /api/sos/trigger`
Triggers an emergency alert, notifies contacts, and initiates location tracking.

**Request Payload:**
```typescript
interface SOSTriggerRequest {
  userId: string;
  currentLocation: {
    lat: number;
    lng: number;
    accuracy?: number;
  };
  triggerType: 'manual_button' | 'voice_activation' | 'fall_detection' | 'dead_man_switch';
  timestamp: string; // ISO 8601
}
```

**Response Scheme:**
```typescript
interface SOSTriggerResponse {
  sosId: string;
  status: 'active' | 'dispatched' | 'resolved';
  activeGuardiansNotified: number;
  emergencyServicesContacted: boolean;
  trackingToken: string;
}
```

---

## 2. Safe Spaces & Route Generation

### `POST /api/routes/calculate`
Generates safe routes bypassing active threat zones, high-risk incident clusters, or low-light corridors.

**Request Payload:**
```typescript
interface SafeRouteRequest {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  profile: 'safety_first' | 'fastest_route' | 'well_lit_only';
  riskTolerance: 0 | 1 | 2; // Low, Medium, High
}
```

**Response Scheme:**
```typescript
interface SafeRouteResponse {
  routes: Array<{
    routeId: string;
    type: 'safe' | 'fast' | 'alternative';
    geometry: string; // Encoded polyline path
    safetyScore: number; // 0 to 100
    riskFactors: Array<{
      type: 'poor_lighting' | 'reported_incident' | 'low_foot_traffic';
      severity: 'low' | 'moderate' | 'high';
      location: { lat: number; lng: number };
    }>;
    durationSeconds: number;
    distanceMeters: number;
  }>;
}
```

---

## 3. Incident Logging & Reports

### `POST /api/reports/submit`
Logs a safety threat, hazard, or incident to feed the real-time heatmap.

**Request Payload:**
```typescript
interface IncidentReportRequest {
  reporterId: string;
  category: 'theft' | 'harassment' | 'hazard' | 'poor_lighting' | 'accident' | 'other';
  location: { lat: number; lng: number };
  description: string;
  timestamp: string; // ISO 8601
  evidenceUrls?: string[]; // Supabase storage links
  isAnonymous: boolean;
}
```

**Response Scheme:**
```typescript
interface IncidentReportResponse {
  reportId: string;
  status: 'submitted' | 'verified' | 'dismissed';
  severityIndex: number; // 1 to 5
}
```

---

## 4. Real-time Threat Analysis (AI Feed)

### `GET /api/analytics/threat-stream`
SSE (Server-Sent Events) endpoint pushing live threat scores and anomaly warnings.

**Event Data Schema:**
```typescript
interface ThreatAnalyticsEvent {
  zoneId: string;
  overallThreatScore: number; // 0.0 to 1.0
  activeIncidentsCount: number;
  anomaliesDetected: Array<{
    type: 'crowd_disruption' | 'route_deviation' | 'sudden_speed_change';
    confidence: number; // 0.0 to 1.0
    location: { lat: number; lng: number };
  }>;
  timestamp: string;
}
```
