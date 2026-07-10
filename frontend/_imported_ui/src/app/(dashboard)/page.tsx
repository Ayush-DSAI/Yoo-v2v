'use client';

import { Suspense } from 'react';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { Loader } from '@/components/ui/Loader';

export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader size="lg" className="h-96" />}>
      <DashboardGrid />
    </Suspense>
  );
}
