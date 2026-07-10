'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertCircle, MapPin, FileText, Phone, Shield } from 'lucide-react';

const actions = [
  {
    title: 'SOS',
    icon: AlertCircle,
    variant: 'destructive' as const,
    href: '/dashboard/sos',
  },
  {
    title: 'Report Incident',
    icon: FileText,
    variant: 'default' as const,
    href: '/dashboard/reports/new',
  },
  {
    title: 'View Map',
    icon: MapPin,
    variant: 'secondary' as const,
    href: '/dashboard/maps',
  },
  {
    title: 'Safe Spaces',
    icon: Shield,
    variant: 'secondary' as const,
    href: '/dashboard/safe-spaces',
  },
  {
    title: 'Contact Guardian',
    icon: Phone,
    variant: 'outline' as const,
    href: '/dashboard/profile',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-slate-500">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                variant={action.variant}
                className="h-auto py-3 flex flex-col gap-2"
                asChild
              >
                <a href={action.href}>
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{action.title}</span>
                </a>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
