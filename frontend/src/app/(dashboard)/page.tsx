'use client';

import React from 'react';
import { DashboardGrid } from '../../components/dashboard/DashboardGrid';
import { Header } from '../../components/dashboard/Header';
import { SafetyScore } from '../../components/dashboard/SafetyScore';
import { ThreatLevel } from '../../components/dashboard/ThreatLevel';
import { ActiveAlerts } from '../../components/dashboard/ActiveAlerts';
import { SafeSpaces } from '../../components/dashboard/SafeSpaces';
import { Community } from '../../components/dashboard/Community';
import { MissionBrief } from '../../components/dashboard/MissionBrief';
import { OperationsMap } from '../../components/dashboard/OperationsMap';
import { GuardianStatus } from '../../components/dashboard/GuardianStatus';
import { Weather } from '../../components/dashboard/Weather';
import { Timeline } from '../../components/dashboard/Timeline';
import { RecentReports } from '../../components/dashboard/RecentReports';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { Statistics } from '../../components/dashboard/Statistics';
import { Charts } from '../../components/dashboard/Charts';
import { mockDashboardData } from '../../constants/mockDashboard';

export default function DashboardPage() {
  const data = mockDashboardData;

  return (
    <DashboardGrid>
      {/* Header spanning full width */}
      <div className="col-span-full">
        <Header data={{ version: data.systemStatus.version, isLive: data.systemStatus.isLive }} />
      </div>

      {/* KPI Row */}
      <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <SafetyScore data={data.safetyScore} />
        <ThreatLevel data={data.threatLevel} />
        <ActiveAlerts data={data.activeAlerts} />
        <SafeSpaces data={data.safeSpaces} />
      </div>

      {/* Main Map & Brief Row */}
      <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <OperationsMap data={data.mapData} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-5">
          <MissionBrief data={data.missionBrief} />
          <Weather data={data.weather} />
          <GuardianStatus data={data.guardians} />
        </div>
      </div>

      {/* Additional Stats & Actions */}
      <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 flex flex-col gap-5">
          <QuickActions data={data.quickActions} />
          <Community data={data.communityStats} />
          <Statistics data={{}} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-5">
          <Timeline data={data.timeline} />
          <RecentReports data={data.recentReports} />
          <Charts data={{}} />
        </div>
      </div>
    </DashboardGrid>
  );
}
