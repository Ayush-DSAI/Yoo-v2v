'use client';

import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface DashboardGridProps {
  children: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const DashboardGrid: React.FC<DashboardGridProps> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={twMerge('grid grid-cols-1 gap-5 p-4 sm:p-6 lg:p-8 pb-24 max-w-[1600px] mx-auto w-full', className)}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const childElement = child as ReactElement<any>;
        return (
          <motion.div
            key={index}
            variants={{
              hidden: { y: 24, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
            }}
            className={childElement.props.className}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};
