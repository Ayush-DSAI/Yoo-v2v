'use client';

import { FileText, MapPin, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface KPICardsProps {
  statistics: {
    totalReports: number;
    reportsThisWeek: number;
    safeSpacesNearby: number;
    sosCount: number;
  };
}

const kpiConfig = [
  {
    title: 'Total Reports',
    value: 'totalReports',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Reports This Week',
    value: 'reportsThisWeek',
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Safe Spaces Nearby',
    value: 'safeSpacesNearby',
    icon: MapPin,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'SOS Alerts',
    value: 'sosCount',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
] as const;

export function KPICards({ statistics }: KPICardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon;
        const value = statistics[kpi.value as keyof typeof statistics];
        
        return (
          <Card key={kpi.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{kpi.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    <AnimatedCounter end={value} />
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <Icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
