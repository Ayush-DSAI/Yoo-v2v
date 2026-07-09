import { ElementType, ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon: ElementType;
}

export interface NavbarProps {
  onMenuClick: () => void;
  className?: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export interface FooterProps {
  className?: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
}
