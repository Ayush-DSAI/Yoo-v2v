import React from 'react';
import { KPICardsProps, StatCardProps } from './types';
import { CARD_ICONS } from './constants';
import { styles } from './styles';
import { mockStatsData } from '@/constants/mock/dashboard';
import { KPICardSkeleton } from '../ui/Skeletons';
import { AnimatedCounter } from '../../ui/AnimatedCounter';

// Single reusable Card component
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color,
  status = 'info'
}) => {
  const statusClass = styles.cardStatus[status] || styles.cardStatus.info;
  const numValue = parseInt(value.split('/')[0]) || 0;
  const suffix = value.includes('/') ? `/${value.split('/')[1]}` : '';

  return (
    <div className={`${styles.cardBase} ${statusClass}`}>
      <div className={styles.header}>
        <div className={`${styles.iconWrapper} ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className={`${styles.trend} ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
            <svg className={`w-4 h-4 ${trend.positive ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {trend.value}
          </span>
        )}
      </div>
      <h3 className={styles.value}>
        <AnimatedCounter value={numValue} suffix={suffix} />
      </h3>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};

export const KPICards: React.FC<KPICardsProps> = ({ stats, loading, error, empty }) => {
  if (loading) {
    return (
      <div className={styles.grid}>
        {[1, 2, 3, 4].map((n) => <KPICardSkeleton key={n} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl mb-8">
        <h4 className="font-bold">Error loading statistics</h4>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 text-gray-500 rounded-2xl mb-8 text-center font-medium">
        No statistics available.
      </div>
    );
  }

  const displayStats = stats || mockStatsData.map(s => ({
    title: s.title,
    value: s.value,
    subtitle: s.subtitle,
    icon: CARD_ICONS[s.iconKey],
    trend: s.trend,
    color: s.color,
    status: s.status
  }));

  return (
    <div className={styles.grid}>
      {displayStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default KPICards;
