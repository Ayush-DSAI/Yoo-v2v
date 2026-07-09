'use client';

import React, { forwardRef, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { avatarStyles } from './Avatar.styles';
import { AvatarProps } from './Avatar.types';

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = 'md', src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const showFallback = !src || hasError;

    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(avatarStyles.container, avatarStyles.sizes[size], className)
        )}
      >
        {showFallback ? (
          <span className={avatarStyles.fallback}>{fallback || '?'}</span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={src}
            alt={alt || ''}
            className={avatarStyles.image}
            onError={() => setHasError(true)}
            {...props}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
