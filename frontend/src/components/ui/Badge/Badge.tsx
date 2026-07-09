import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { badgeStyles } from './Badge.styles';
import { BadgeProps } from './Badge.types';

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            badgeStyles.base,
            badgeStyles.variants[variant],
            badgeStyles.sizes[size],
            className
          )
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
