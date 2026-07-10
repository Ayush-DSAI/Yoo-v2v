'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Bell, MapPin, Shield, FileText, User } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

const mockActivities = [
  {
    id: '1',
    type: 'report',
    message: 'New harassment report filed in Downtown',
    time: new Date(Date.now() - 1000 * 60 * 15),
    icon: FileText,
  },
  {
    id: '2',
    type: 'alert',
    message: 'High risk area detected on your route',
    time: new Date(Date.now() - 1000 * 60 * 45),
    icon: Bell,
  },
  {
    id: '3',
    type: 'safe_space',
    message: 'New police station added nearby',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: Shield,
  },
  {
    id: '4',
    type: 'location',
    message: 'You entered a moderate risk zone',
    time: new Date(Date.now() - 1000 * 60 * 60 * 3),
    icon: MapPin,
  },
  {
    id: '5',
    type: 'guardian',
    message: 'Guardian John checked in',
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
    icon: User,
  },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900">{activity.message}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {formatRelativeTime(activity.time)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
