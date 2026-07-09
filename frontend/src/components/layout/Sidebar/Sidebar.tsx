'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProps } from './Sidebar.types';
import { sidebarStyles } from './Sidebar.styles';
import { SIDEBAR_NAVIGATION } from '../../../constants/navigation';
import { X, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, className }) => {
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className={sidebarStyles.overlay} 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={twMerge(
          sidebarStyles.container,
          isOpen ? sidebarStyles.open : sidebarStyles.closed,
          className
        )}
        aria-label="Main Navigation"
      >
        {/* Mobile Header */}
        <div className={sidebarStyles.header}>
          <div className={sidebarStyles.logoText}>AEGIS</div>
          <button 
            onClick={onClose} 
            className={sidebarStyles.closeButton}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={sidebarStyles.nav}>
          {SIDEBAR_NAVIGATION.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={clsx(
                  sidebarStyles.link,
                  isActive && sidebarStyles.linkActive
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={sidebarStyles.icon} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className={sidebarStyles.footer}>
          <button className={sidebarStyles.logoutButton}>
            <LogOut className={sidebarStyles.icon} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

Sidebar.displayName = 'Sidebar';
