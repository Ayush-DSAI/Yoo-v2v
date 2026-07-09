import { NavigationItem } from '../types/layout';
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  ShieldCheck, 
  UserPlus, 
  BarChart3, 
  Settings 
} from 'lucide-react';

export const SIDEBAR_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'safe-routes',
    title: 'Safe Routes',
    href: '/safe-routes',
    icon: Map,
  },
  {
    id: 'reports',
    title: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    id: 'safe-spaces',
    title: 'Safe Spaces',
    href: '/safe-spaces',
    icon: ShieldCheck,
  },
  {
    id: 'guardian',
    title: 'Guardian',
    href: '/guardian',
    icon: UserPlus,
  },
  {
    id: 'analytics',
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];
