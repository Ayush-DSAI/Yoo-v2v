import React from 'react';
import { ActivityFeedProps } from './types';
import { styles } from './styles';
import { EVENT_ICONS, EVENT_COLORS } from './constants';
import { mockActivities } from '@/constants/mock/dashboard';
import { ReportSkeleton } from '../ui/Skeletons';

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities = mockActivities, loading, error, empty }) => {
  if (loading) return <ReportSkeleton />;

  if (error) {
    return (
      <div className={styles.container}>
        <div className="p-6 text-red-750 text-center font-medium border-b border-gray-100">
          Error loading operational logs: {error}
        </div>
      </div>
    );
  }

  if (empty || activities.length === 0) {
    return (
      <div className={styles.container}>
        <div className="p-10 text-gray-500 text-center font-medium">
          No operations active in the dashboard log.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h3 className={styles.title}>Live Activity</h3>
            <p className={styles.subtitle}>Protected operations feed</p>
          </div>
          <div className={styles.liveWrapper}>
            <span className={styles.liveIndicator}></span>
            <span className={styles.liveText}>LIVE STREAM</span>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {/* Vertical timeline line */}
        <div className={styles.timelineLine} />

        {activities.map((activity) => (
          <div key={activity.id} className={styles.item}>
            <div className={styles.iconWrapper}>
              {EVENT_ICONS[activity.eventType]}
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.actionRow}>
                <p className={styles.actionText}>{activity.action}</p>
                <span className={styles.time}>{activity.time}</span>
              </div>
              <p className={styles.location}>{activity.location} • {activity.user}</p>
              <div className={styles.metaRow}>
                <span className={`${styles.badge} ${EVENT_COLORS[activity.eventType]}`}>
                  {activity.badge}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
