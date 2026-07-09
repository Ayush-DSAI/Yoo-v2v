export const cardStyles = {
  base: 'rounded-2xl border text-text shadow-sm transition-all duration-300 relative overflow-hidden',
  variants: {
    default: 'bg-surface border-border',
    glass: 'bg-surface/30 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]',
    outline: 'bg-transparent border-border',
    gradient: 'bg-gradient-to-br from-surface/80 to-background/50 backdrop-blur-md border-white/5',
  },
  interactive: 'hover:shadow-glow hover:-translate-y-1 hover:border-primary/50 cursor-pointer',
  header: 'flex flex-col space-y-1.5 p-6 z-10 relative',
  title: 'font-semibold leading-none tracking-tight text-xl font-outfit text-white',
  description: 'text-sm text-text-muted mt-2',
  content: 'p-6 pt-0 z-10 relative',
  footer: 'flex items-center p-6 pt-0 z-10 relative',
};
