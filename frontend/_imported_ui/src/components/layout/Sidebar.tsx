'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Map,
  FileText,
  Shield,
  BarChart3,
  User,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Maps',
    href: '/dashboard/maps',
    icon: Map,
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
  {
    title: 'Safe Spaces',
    href: '/dashboard/safe-spaces',
    icon: Shield,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
];

const bottomNavigation = [
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => onOpenChange(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full bg-white border-r border-slate-200 transition-all duration-300',
          open ? 'w-64' : 'w-0 lg:w-20'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-slate-200 px-4">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            {open && (
              <span className="ml-3 text-xl font-bold text-slate-900">
                AEGIS
              </span>
            )}
          </div>

          {/* Main navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {open && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom navigation */}
          <div className="border-t border-slate-200 px-3 py-4 space-y-1">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {open && <span>{item.title}</span>}
                </Link>
              );
            })}
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                {open && <span>Logout</span>}
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
