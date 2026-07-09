import { PageContainerProps } from './PageContainer.types';

export const maxWidthStyles: Record<NonNullable<PageContainerProps['maxWidth']>, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

export const baseStyles = 'w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 min-h-[calc(100vh-var(--header-height))] transition-all duration-300';
