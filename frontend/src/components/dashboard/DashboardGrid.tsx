'use client';

import { useQuery } from '@tanstack/react-query';
import { ThreatLevel } from './ThreatLevel';
import { GuardianStatus } from './GuardianStatus';
import { KPICards } from './KPICards';
import { SafetyScore } from './SafetyScore';
import { RecentReports } from './RecentReports';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { AIInsights } from './AIInsights';
import { Environment } from './Environment';
import { cn } from '@/lib/utils';

export function DashboardGrid() {
  // Fetch dashboard data
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // Mock data for now - will be replaced with actual API calls
      return {
        threatLevel: 'moderate' as const,
        safetyScore: 72,
        statistics: {
          totalReports: 156,
          reportsThisWeek: 12,
          safeSpacesNearby: 24,
          sosCount: 3,
        },
        recentReports: [],
        activeAlerts: [],
        guardianStatus: {
          isOnline: true,
          guardians: [],
        },
      };
    },
    refetchInterval: 30000, // 30 seconds
  });

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 h-96 rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-96 rounded-xl bg-slate-100 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900">Failed to load dashboard</h2>
          <p className="text-sm text-slate-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back! Here&apos;s your safety overview.</p>
      </div>

      {/* Top Row - KPI Cards */}
      <KPICards statistics={data?.statistics || { totalReports: 0, reportsThisWeek: 0, safeSpacesNearby: 0, sosCount: 0 }} />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Threat Level & Safety Score */}
          <div className="grid gap-6 md:grid-cols-2">
            <ThreatLevel level={data?.threatLevel || 'low'} />
            <SafetyScore score={data?.safetyScore || 0} />
          </div>

          {/* Recent Reports */}
          <RecentReports reports={data?.recentReports || []} />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <GuardianStatus status={data?.guardianStatus || { isOnline: false, guardians: [] }} />
          <QuickActions />
          <AIInsights />
          <Environment />
        </div>
      </div>
    </div>
  );
}