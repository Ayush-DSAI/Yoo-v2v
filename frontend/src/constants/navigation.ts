import { NavigationItem } from '../types/layout';
import {
  LayoutDashboard,
  Map,
  FileText,
  ShieldCheck,
  UserPlus,
  BarChart3,
  Settings,
  Radio,
  Shield,
} from 'lucide-react';

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const SIDEBAR_NAVIGATION: NavigationItem[] = [
  { id: 'dashboard', title: 'Command Center', href: '/', icon: LayoutDashboard },
  { id: 'safe-routes', title: 'Safe Routes', href: '/safe-routes', icon: Map },
  { id: 'reports', title: 'Reports', href: '/reports', icon: FileText },
  { id: 'safe-spaces', title: 'Safe Spaces', href: '/safe-spaces', icon: ShieldCheck },
  { id: 'guardian', title: 'Guardian', href: '/guardian', icon: UserPlus },
  { id: 'analytics', title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { id: 'settings', title: 'Settings', href: '/settings', icon: Settings },
];

export const SIDEBAR_NAVIGATION_GROUPED: NavigationGroup[] = [
  {
    label: 'OPERATIONS',
    items: [
      { id: 'dashboard', title: 'Command Center', href: '/', icon: LayoutDashboard },
      { id: 'safe-routes', title: 'Safe Routes', href: '/safe-routes', icon: Map },
      { id: 'safe-spaces', title: 'Safe Spaces', href: '/safe-spaces', icon: Shield },
    ],
  },
  {
    label: 'INTELLIGENCE',
    items: [
      { id: 'reports', title: 'Reports', href: '/reports', icon: FileText },
      { id: 'analytics', title: 'Analytics', href: '/analytics', icon: BarChart3 },
      { id: 'guardian', title: 'Guardian Net', href: '/guardian', icon: Radio },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { id: 'settings', title: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];
