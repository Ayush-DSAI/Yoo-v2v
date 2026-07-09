export const badgeStyles = {
  base: 'inline-flex items-center rounded-full font-medium transition-colors border',
  variants: {
    default: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20 shadow-[0_0_10px_rgba(52,199,89,0.2)]',
    warning: 'bg-warning/10 text-warning border-warning/20 shadow-[0_0_10px_rgba(255,149,0,0.2)]',
    danger: 'bg-danger/10 text-danger border-danger/20 shadow-[0_0_10px_rgba(255,59,48,0.2)]',
    outline: 'bg-transparent text-text-muted border-border',
    glass: 'bg-surface/50 backdrop-blur-md text-text border-white/10 shadow-sm',
  },
  sizes: {
    sm: 'px-2 py-0.5 text-[10px] uppercase tracking-wider',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  },
};
