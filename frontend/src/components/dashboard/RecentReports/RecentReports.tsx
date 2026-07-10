import React from 'react';
import { RecentReportsProps } from './types';
import { styles } from './styles';
import { getAlertColor, getAlertIcon } from './constants';
import { mockAlerts } from '@/constants/mock/dashboard';
import { ReportSkeleton } from '../ui/Skeletons';

export const RecentReports: React.FC<RecentReportsProps> = ({ alerts = mockAlerts, loading, error, empty }) => {
  if (loading) return <ReportSkeleton />;

  if (error) {
    return (
      <div className={styles.container}>
        <div className="p-6 text-red-700 bg-red-50 text-center font-medium border-b border-gray-100">
          Error loading alerts: {error}
        </div>
      </div>
    );
  }

  if (empty || alerts.length === 0) {
    return (
      <div className={styles.container}>
        <div className="p-10 text-gray-500 text-center font-medium">
          No recent alerts found in your area.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h3 className={styles.title}>Recent Alerts</h3>
            <p className={styles.subtitle}>Active incidents in your area</p>
          </div>
          <button className={styles.viewAllBtn} aria-label="View all active reports">View All</button>
        </div>
      </div>
      <div className={styles.list}>
        {alerts.map((alert) => (
          <div key={alert.id} className={`${styles.item} ${getAlertColor(alert.type)}`}>
            <div className={styles.iconWrapper}>
              {getAlertIcon(alert.type)}
            </div>
            <div className={styles.contentWrapper}>
              <p className={styles.itemTitle}>{alert.title}</p>
              <p className={styles.location}>{alert.location}</p>
            </div>
            <span className={styles.time}>{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReports;
