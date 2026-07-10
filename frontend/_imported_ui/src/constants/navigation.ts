export const navigation = {
  main: [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'layout-dashboard',
    },
    {
      title: 'Maps',
      href: '/dashboard/maps',
      icon: 'map',
    },
    {
      title: 'Reports',
      href: '/dashboard/reports',
      icon: 'file-text',
    },
    {
      title: 'Safe Spaces',
      href: '/dashboard/safe-spaces',
      icon: 'shield',
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'bar-chart-3',
    },
  ],
  user: [
    {
      title: 'Profile',
      href: '/dashboard/profile',
      icon: 'user',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
    {
      title: 'Logout',
      href: '/api/auth/logout',
      icon: 'log-out',
    },
  ],
} as const;
