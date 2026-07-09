import React, { forwardRef } from 'react';
import { ButtonProps } from './Button.types';
import { baseStyles, variantStyles, sizeStyles } from './Button.styles';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isPending = loading;
    const isBtnDisabled = disabled || isPending;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isBtnDisabled}
        className={twMerge(
          clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && 'w-full',
            className
          )
        )}
        aria-busy={isPending}
        {...props}
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {!isPending && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!isPending && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
