export const inputStyles = {
  container: 'relative flex items-center w-full',
  base: 'flex w-full rounded-2xl border text-sm transition-all duration-300 outline-none placeholder:text-text-muted focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 text-text',
  variants: {
    default: 'bg-surface border-border',
    glass: 'bg-surface/30 backdrop-blur-md border-white/10 shadow-inner focus:bg-surface/50 hover:bg-surface/40',
    filled: 'bg-surface-hover border-transparent',
  },
  sizes: {
    default: 'h-12 px-4 py-2 text-base',
    iconLeft: 'pl-12',
    iconRight: 'pr-12',
  },
  iconWrapper: 'absolute top-1/2 -translate-y-1/2 text-text-muted pointer-events-none flex items-center justify-center w-5 h-5 transition-colors',
  leftIcon: 'left-4',
  rightIcon: 'right-4 pointer-events-auto cursor-pointer hover:text-primary',
  error: 'border-danger focus:border-danger focus:ring-danger/50 text-danger',
};
