import React from 'react';

export const Shimmer: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className || ''}`} />
);

export const KPICardSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-4">
    <div className="flex items-start justify-between">
      <Shimmer className="w-12 h-12 rounded-xl" />
      <Shimmer className="w-12 h-5 rounded-full" />
    </div>
    <Shimmer className="w-2/3 h-8" />
    <Shimmer className="w-1/2 h-4" />
    <Shimmer className="w-1/3 h-3" />
  </div>
);

export const MapSkeleton = () => (
  <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden flex flex-col h-[400px]">
    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
      <div className="space-y-2 w-1/3">
        <Shimmer className="h-6" />
        <Shimmer className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2 w-1/4 justify-end">
        <Shimmer className="h-9 w-20 rounded-lg" />
        <Shimmer className="h-9 w-24 rounded-lg" />
      </div>
    </div>
    <div className="flex-1 bg-gray-50 flex items-center justify-center">
      <Shimmer className="w-16 h-16 rounded-full" />
    </div>
  </div>
);

export const InsightSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-6 min-h-[360px] flex flex-col justify-between">
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Shimmer className="w-10 h-10 rounded-xl" />
        <Shimmer className="w-1/3 h-6" />
      </div>
      <Shimmer className="w-full h-20 rounded-xl" />
      <Shimmer className="w-full h-12 rounded-xl" />
    </div>
    <Shimmer className="w-full h-12 rounded-xl" />
  </div>
);

export const ReportSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden">
    <div className="p-6 border-b border-gray-100 flex justify-between">
      <div className="space-y-2 w-1/3">
        <Shimmer className="h-6" />
        <Shimmer className="h-4 w-2/3" />
      </div>
      <Shimmer className="h-5 w-12" />
    </div>
    <div className="divide-y divide-gray-100 p-4 space-y-4">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex gap-4 items-start py-2">
          <Shimmer className="w-5 h-5 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-4 w-2/3" />
            <Shimmer className="h-3 w-1/2" />
          </div>
          <Shimmer className="w-12 h-3" />
        </div>
      ))}
    </div>
  </div>
);
