import React from 'react';
import { motion } from 'framer-motion';
import { QuickActionsProps } from './types';
import { styles } from './styles';
import { DEFAULT_ACTIONS } from './constants';

export const QuickActions: React.FC<QuickActionsProps> = ({ actions = DEFAULT_ACTIONS }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Quick Actions</h3>
      <div className={styles.grid}>
        {actions.map((action) => {
          const Icon = action.icon;
          const variant = styles.variants[action.type] || styles.variants.secondary;

          return (
            <motion.button
              key={action.id}
              whileHover={{ 
                y: -4, 
                scale: 1.02, 
                boxShadow: `0 10px 20px ${action.glowColor}`,
                borderColor: 'currentColor'
              }}
              whileTap={{ scale: 0.96 }}
              className={`${styles.btnBase} ${variant.btn}`}
              onClick={() => alert(`Action Triggered: ${action.label}`)}
            >
              <div className={`${styles.iconWrapper} ${variant.icon}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={styles.labelText}>{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
