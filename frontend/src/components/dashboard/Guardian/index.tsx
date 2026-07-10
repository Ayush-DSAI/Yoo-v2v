import React from 'react';
import { Share2 } from 'lucide-react';
import { GuardianProps } from './types';
import { styles } from './styles';
import { mockGuardians } from '@/constants/mock/dashboard';

export const Guardian: React.FC<GuardianProps> = ({ guardians = mockGuardians }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
          </svg>
        </div>
        <div>
          <h3 className={styles.title}>Guardian Network</h3>
          <p className={styles.subtitle}>Protected contacts status</p>
        </div>
      </div>

      <div className={styles.list}>
        {guardians.map((g) => (
          <div key={g.id} className={styles.memberCard}>
            <img 
              src={g.avatarUrl} 
              alt={`${g.name}'s Avatar`}
              className={styles.avatar} 
            />
            <div className={styles.memberInfo}>
              <p className={styles.memberName}>{g.name}</p>
              <div className={styles.memberMeta}>
                <span>{g.distance}</span>
                <span>•</span>
                <span>Sync {g.lastUpdated}</span>
              </div>
            </div>
            <span className={styles.statusBadge}>
              {g.status}
            </span>
          </div>
        ))}
      </div>

      <button 
        className={styles.shareBtn} 
        aria-label="Share location with guardian network"
        onClick={() => alert('Encrypted location broadcast enabled.')}
      >
        <Share2 className="w-4 h-4" />
        <span>Share Location</span>
      </button>
    </div>
  );
};

export default Guardian;
