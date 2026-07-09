'use client';

import React from 'react';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Footer } from '../Footer';
import { PageContainer } from '../PageContainer';
import { useSidebar, useBreakpoint } from '../../../hooks';
import { DashboardLayoutProps } from './DashboardLayout.types';
import { dashboardLayoutStyles } from './DashboardLayout.styles';
import { AEGIS_LAYOUT } from '../../../contents/layout';

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isOpen, toggle, close } = useSidebar();
  const breakpoint = useBreakpoint();
  
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl';

  // Determine heights and widths based on screen size and sidebar state
  const headerHeight = isDesktop 
    ? AEGIS_LAYOUT.header.height.desktop 
    : AEGIS_LAYOUT.header.height.mobile;

  // Space allocated for content layout offset
  const sidebarWidth = isDesktop
    ? (isOpen ? AEGIS_LAYOUT.sidebar.expanded.width : AEGIS_LAYOUT.sidebar.collapsed.width)
    : '0px';

  // The sidebar's physical width (280px when open, 72px when collapsed on desktop)
  const sidebarWidthActual = isDesktop
    ? (isOpen ? AEGIS_LAYOUT.sidebar.expanded.width : AEGIS_LAYOUT.sidebar.collapsed.width)
    : AEGIS_LAYOUT.sidebar.expanded.width;

  // Layout system variables injected at root of the layout
  const layoutVars = {
    '--header-height': headerHeight,
    '--sidebar-width': sidebarWidth,
    '--sidebar-width-actual': sidebarWidthActual,
    '--z-header': String(AEGIS_LAYOUT.zIndex.sticky),
    '--z-sidebar': String(AEGIS_LAYOUT.zIndex.fixed),
    '--z-modal': String(AEGIS_LAYOUT.zIndex.modal),
  } as React.CSSProperties;

  return (
    <div 
      style={layoutVars}
      className={dashboardLayoutStyles.root}
    >
      {/* 1. Fixed Navbar */}
      <Navbar onMenuClick={toggle} />
      
      <div className={dashboardLayoutStyles.contentWrapper}>
        {/* 2. Fixed Sidebar */}
        <Sidebar isOpen={isOpen} onClose={close} />
        
        {/* 3. Scrollable Main Content */}
        <main className={dashboardLayoutStyles.main}>
          <div className={dashboardLayoutStyles.scrollContainer}>
            <div className="flex-1 flex flex-col pt-[var(--header-height)] lg:pl-[var(--sidebar-width)] transition-all duration-300 ease-in-out">
              <PageContainer className="flex-1">
                {children}
              </PageContainer>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
