'use client';

import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { DashboardLayoutProps } from '../../types/layout';

export default function DashboardLayoutWrapper({ children }: DashboardLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
