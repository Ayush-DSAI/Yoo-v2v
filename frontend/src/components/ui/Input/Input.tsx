import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { inputStyles } from './Input.styles';
import { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'glass', leftIcon, rightIcon, isInvalid, ...props }, ref) => {
    return (
      <div className={inputStyles.container}>
        {leftIcon && (
          <div className={twMerge(clsx(inputStyles.iconWrapper, inputStyles.leftIcon))}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={twMerge(
            clsx(
              inputStyles.base,
              inputStyles.variants[variant],
              inputStyles.sizes.default,
              leftIcon && inputStyles.sizes.iconLeft,
              rightIcon && inputStyles.sizes.iconRight,
              isInvalid && inputStyles.error,
              className
            )
          )}
          {...props}
        />
        {rightIcon && (
          <div className={twMerge(clsx(inputStyles.iconWrapper, inputStyles.rightIcon))}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
