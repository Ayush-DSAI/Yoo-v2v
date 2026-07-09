import React, { forwardRef } from 'react';
import { PageContainerProps } from './PageContainer.types';
import { baseStyles, maxWidthStyles } from './PageContainer.styles';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ children, className, maxWidth = 'xl', ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={twMerge(
          clsx(baseStyles, maxWidthStyles[maxWidth], className)
        )}
        {...props}
      >
        {children}
      </main>
    );
  }
);

PageContainer.displayName = 'PageContainer';
