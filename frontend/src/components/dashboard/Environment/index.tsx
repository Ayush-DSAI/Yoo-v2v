import React from 'react';
import { EnvironmentProps } from './types';
import { styles } from './styles';
import { mockEnvironment } from '@/constants/mock/dashboard';

export const Environment: React.FC<EnvironmentProps> = ({ data = mockEnvironment }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        </div>
        <div>
          <h3 className={styles.title}>Environment</h3>
          <p className={styles.subtitle}>Micro-climate sensors</p>
        </div>
      </div>

      <div className={styles.heroSection}>
        <div>
          <p className={styles.temp}>{data.temperature}</p>
          <p className={styles.condition}>{data.condition}</p>
        </div>
        <span className={styles.badge} aria-label={`Weather Risk Level: ${data.riskLevel}`}>
          {data.riskLevel} Risk
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Visibility</span>
          <span className={styles.metricValue}>{data.visibility}</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Precipitation</span>
          <span className={styles.metricValue}>{data.rain}</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Wind Speed</span>
          <span className={styles.metricValue}>{data.wind}</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Air Quality</span>
          <span className={styles.metricValue}>{data.airQuality}</span>
        </div>
      </div>
    </div>
  );
};

export default Environment;
