'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProps } from './Sidebar.types';
import { sidebarStyles } from './Sidebar.styles';
import { SIDEBAR_NAVIGATION_GROUPED } from '../../../constants/navigation';
import { X, LogOut, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { useBreakpoint } from '../../../hooks';

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, className }) => {
  const pathname = usePathname();

  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';
  const isCollapsed = isDesktop && !isOpen;

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={sidebarStyles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={twMerge(
          sidebarStyles.container,
          isOpen ? sidebarStyles.open : sidebarStyles.closed,
          isCollapsed && 'items-center',
          className
        )}
        aria-label="Main Navigation"
      >
        {/* Mobile header */}
        <div className={sidebarStyles.header}>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <div className={sidebarStyles.logoText}>AEGIS</div>
          </div>
          <button
            onClick={onClose}
            className={sidebarStyles.closeButton}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation groups */}
        <nav className={clsx(sidebarStyles.nav, isCollapsed && 'px-2')}>
          {SIDEBAR_NAVIGATION_GROUPED.map((group) => (
            <div key={group.label} className="mb-5">
              <div className={clsx("px-3 mb-2 transition-all duration-300", isCollapsed && "opacity-0 h-0 overflow-hidden mb-0")}>
                <span className="text-[10px] font-bold text-text-muted/60 tracking-[0.15em] uppercase">
                  {group.label}
                </span>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={clsx(
                        sidebarStyles.link,
                        isCollapsed && 'justify-center px-2',
                        isActive && sidebarStyles.linkActive
                      )}
                      aria-current={isActive ? 'page' : undefined}
                      title={isCollapsed ? item.title : undefined}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active-indicator"
                          className={sidebarStyles.activeIndicator}
                          transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                        />
                      )}
                      <Icon className={clsx(sidebarStyles.icon, isActive && sidebarStyles.iconActive)} />
                      <span className={clsx(sidebarStyles.linkText, isCollapsed && 'hidden')}>{item.title}</span>
                      {isActive && !isCollapsed && (
                        <motion.div
                          layoutId="sidebar-active-dot"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-primary relative z-10"
                          transition={{ type: 'spring' as const, stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className={clsx(sidebarStyles.footer, isCollapsed && 'px-2 items-center')}>
          <div className={clsx("flex justify-between items-center px-3 mb-3 w-full", isCollapsed && "hidden")}>
            <span className="text-[10px] text-text-muted/50 font-mono tracking-wider">v2.0.3</span>
            <Link href="/support" className="text-[10px] text-text-muted/50 hover:text-white transition-colors">
              Support
            </Link>
          </div>
          <button 
            className={clsx(sidebarStyles.logoutButton, isCollapsed && 'justify-center px-2')} 
            aria-label="Logout"
            title={isCollapsed ? 'Logout' : undefined}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className={isCollapsed ? 'hidden' : 'block'}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

Sidebar.displayName = 'Sidebar';
