'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';
import { threatLevels } from '@/constants/status';
import type { ThreatLevel as ThreatLevelType } from '@/types';

interface ThreatLevelProps {
  level: ThreatLevelType;
}

export function ThreatLevel({ level }: ThreatLevelProps) {
  const config = threatLevels[level];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-500">
          Current Threat Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${config.bgColor}`}>
              <AlertTriangle className={`h-6 w-6 ${config.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{config.label}</p>
              <p className="text-sm text-slate-500">Based on recent activity</p>
            </div>
          </div>
          <Badge variant={level === 'severe' || level === 'high' ? 'destructive' : level === 'moderate' ? 'warning' : 'success'}>
            Level {config.value}
          </Badge>
        </div>
        
        {/* Threat level indicator */}
        <div className="mt-4 flex gap-1">
          {Object.entries(threatLevels).map(([key, value]) => (
            <div
              key={key}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                value.value <= config.value ? value.color.replace('text-', 'bg-') : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>Low</span>
          <span>Severe</span>
        </div>
      </CardContent>
    </Card>
  );
}
