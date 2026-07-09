import { ButtonVariant, ButtonSize } from './Button.types';

export const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary hover:bg-primary/95 text-white shadow-glow border border-primary/20',
  secondary: 'bg-surface border border-border hover:bg-surface/80 text-text active:bg-surface/90',
  outline: 'border border-primary text-primary hover:bg-primary/10 active:bg-primary/20',
  ghost: 'text-text hover:bg-surface/50 active:bg-surface/80',
  danger: 'bg-danger text-white hover:bg-danger/90 active:bg-danger/95 shadow-md border border-danger/20',
  success: 'bg-safe text-white hover:bg-safe/90 active:bg-safe/95 shadow-md border border-safe/20',
  gradient: 'bg-gradient-to-r from-secondary to-primary text-white hover:brightness-105 active:scale-98',
  glass: 'glass hover:bg-[#131B32]/70 text-[#F3F4F6] border border-white/10 active:bg-[#131B32]/90',
  link: 'text-primary underline hover:opacity-85 p-0 bg-transparent border-none shadow-none h-auto inline-flex',
};

export const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-8 px-3 text-xs gap-1.5 rounded-sm',
  sm: 'h-10 px-4 text-sm gap-2 rounded-md',
  md: 'h-12 px-5 text-sm gap-2 rounded-md', // matches BUTTON.height = 48px, radius = 12px
  lg: 'h-14 px-6 text-base gap-2.5 rounded-lg',
  xl: 'h-16 px-8 text-lg gap-3 rounded-lg',
};

export const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]';
