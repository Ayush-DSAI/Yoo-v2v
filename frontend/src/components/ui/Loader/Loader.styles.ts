export const loaderStyles = {
  container: 'inline-flex items-center justify-center',
  variants: {
    spinner: 'animate-spin rounded-full border-t-2 border-r-2 border-primary border-b-2 border-b-transparent border-l-2 border-l-transparent',
    dots: 'flex space-x-1.5',
    pulse: 'animate-pulse bg-primary/20 rounded-md',
  },
  sizes: {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  },
  dotSizes: {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  }
};
