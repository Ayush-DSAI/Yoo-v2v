'use client';

import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { Footer } from '../../components/layout/Footer';
import { PageContainer } from '../../components/layout/PageContainer';
import { useSidebar } from '../../hooks';
import { DashboardLayoutProps } from '../../types/layout';

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="flex min-h-screen flex-col bg-background text-text transition-colors duration-300">
      <Navbar onMenuClick={toggle} />
      
      <div className="flex flex-1 pt-[var(--header-height)]">
        <Sidebar isOpen={isOpen} onClose={close} />
        
        <main className="flex-1 transition-all duration-300 lg:pl-[var(--sidebar-width)] w-full flex flex-col">
          <PageContainer className="flex-1">
            {children}
          </PageContainer>
          <Footer />
        </main>
      </div>
    </div>
  );
}
