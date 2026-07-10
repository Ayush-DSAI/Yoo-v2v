'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReports, useAnalyzeRoute } from '@/hooks/api';
import { KPICards } from '@/components/dashboard/KPICards';
import { SafetyMap } from '@/components/dashboard/SafetyMap';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { Environment } from '@/components/dashboard/Environment';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentReports } from '@/components/dashboard/RecentReports';
import { Alert } from '@/components/dashboard/RecentReports/types';
import { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 25
    }
  }
};

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Synchronize current time on mount to prevent hydration mismatch
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const timer = setInterval(updateTime, 1000);
    const timeout = setTimeout(updateTime, 0);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  const { data: remoteReports, isPending: reportsLoading, error: reportsError } = useReports();
  const { mutate: analyzeRoute, data: routeData, isPending: routeLoading, error: routeError } = useAnalyzeRoute();

  // Test the AI Endpoint on mount
  useEffect(() => {
    analyzeRoute({
      source: { lat: 20.2961, lng: 85.8245 },
      destination: { lat: 20.3010, lng: 85.8400 }
    });
  }, [analyzeRoute]);

  const mappedAlerts: Alert[] | undefined = remoteReports ? remoteReports.map((r, index) => ({
    id: parseInt(r.id) || (1000 + index),
    type: r.type,
    title: r.title,
    location: r.location,
    time: r.time
  })) : undefined;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-2">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Good morning, Alex</h2>
        <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening in your area today</p>
        {currentTime && (
          <p className="text-sm text-gray-400 mt-2">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </motion.div>

      {/* Stats Cards Row */}
      <motion.div variants={itemVariants}>
        <KPICards loading={reportsLoading} error={reportsError?.message} />
      </motion.div>

      {/* Main Grid - Map and AI/Weather Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Safety Map */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SafetyMap error={routeError?.message} />
        </motion.div>

        {/* Side Panels */}
        <motion.div variants={itemVariants} className="space-y-6">
          <AIInsights routeLoading={routeLoading} routeData={routeData || null} error={routeError?.message} />
          <QuickActions />
          <Environment />
        </motion.div>
      </div>

      {/* Bottom Section - Recent Reports and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <RecentReports alerts={mappedAlerts} loading={reportsLoading} error={reportsError?.message} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ActivityFeed loading={reportsLoading} />
        </motion.div>
      </div>
    </motion.div>
  );
}