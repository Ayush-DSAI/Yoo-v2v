import React from 'react';
import { AlertTriangle, Navigation, UserCheck, ShieldAlert, CheckCircle } from 'lucide-react';

export const EVENT_ICONS: Record<string, React.ReactNode> = {
  'report-submitted': <AlertTriangle className="w-4 h-4 text-amber-500" />,
  'route-generated': <Navigation className="w-4 h-4 text-blue-500" />,
  'guardian-connected': <UserCheck className="w-4 h-4 text-violet-500" />,
  'sos-cancelled': <ShieldAlert className="w-4 h-4 text-emerald-500" />,
  'space-verified': <CheckCircle className="w-4 h-4 text-emerald-500" />
};

export const EVENT_COLORS: Record<string, string> = {
  'report-submitted': 'bg-amber-50 border-amber-100 text-amber-800',
  'route-generated': 'bg-blue-50 border-blue-100 text-blue-800',
  'guardian-connected': 'bg-violet-50 border-violet-100 text-violet-800',
  'sos-cancelled': 'bg-emerald-50 border-emerald-100 text-emerald-800',
  'space-verified': 'bg-emerald-50 border-emerald-100 text-emerald-800'
};
