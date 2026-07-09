export const avatarStyles = {
  container: 'relative inline-flex items-center justify-center rounded-full overflow-hidden border border-white/10 bg-surface/50 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] flex-shrink-0 transition-transform hover:scale-105',
  image: 'aspect-square h-full w-full object-cover',
  fallback: 'flex h-full w-full items-center justify-center rounded-full bg-surface text-text font-medium tracking-wider',
  sizes: {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }
};
