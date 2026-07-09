import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { loaderStyles } from './Loader.styles';
import { LoaderProps } from './Loader.types';

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, variant = 'spinner', size = 'md', ...props }, ref) => {
    if (variant === 'dots') {
      return (
        <div ref={ref} className={twMerge(clsx(loaderStyles.container, loaderStyles.variants.dots, className))} {...props}>
          <div className={clsx("rounded-full bg-primary animate-bounce", loaderStyles.dotSizes[size])} style={{ animationDelay: '0ms' }} />
          <div className={clsx("rounded-full bg-primary animate-bounce", loaderStyles.dotSizes[size])} style={{ animationDelay: '150ms' }} />
          <div className={clsx("rounded-full bg-primary animate-bounce", loaderStyles.dotSizes[size])} style={{ animationDelay: '300ms' }} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            loaderStyles.container,
            loaderStyles.variants[variant],
            loaderStyles.sizes[size],
            className
          )
        )}
        {...props}
      />
    );
  }
);
Loader.displayName = 'Loader';
