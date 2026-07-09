import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cardStyles } from './Card.styles';
import { 
  CardProps, 
  CardHeaderProps, 
  CardTitleProps, 
  CardDescriptionProps, 
  CardContentProps, 
  CardFooterProps 
} from './Card.types';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'glass', interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        clsx(
          cardStyles.base,
          cardStyles.variants[variant],
          interactive && cardStyles.interactive,
          className
        )
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(clsx(cardStyles.header, className))}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={twMerge(clsx(cardStyles.title, className))}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={twMerge(clsx(cardStyles.description, className))}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx(cardStyles.content, className))} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge(clsx(cardStyles.footer, className))} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
