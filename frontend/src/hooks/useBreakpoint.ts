import { useState, useEffect } from 'react';
import { type BreakpointKey } from '../contents/breakpoints';

/**
 * SSR-safe React hook that returns the currently active responsive breakpoint.
 * Uses window.matchMedia query listeners to trigger state updates only when
 * crossing breakpoint boundaries, preventing layout thrashing and resize event spam.
 * 
 * @returns The active BreakpointKey ('xs', 'sm', 'md', 'lg', 'xl', '2xl')
 */
export function useBreakpoint(): BreakpointKey {
  const [activeKey, setActiveKey] = useState<BreakpointKey>(() => {
    if (typeof window === 'undefined') return 'xs';
    const width = window.innerWidth;
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'xs';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const queries = [
      { key: '2xl', mql: window.matchMedia('(min-width: 1536px)') },
      { key: 'xl', mql: window.matchMedia('(min-width: 1280px) and (max-width: 1535px)') },
      { key: 'lg', mql: window.matchMedia('(min-width: 1024px) and (max-width: 1279px)') },
      { key: 'md', mql: window.matchMedia('(min-width: 768px) and (max-width: 1023px)') },
      { key: 'sm', mql: window.matchMedia('(min-width: 640px) and (max-width: 767px)') },
      { key: 'xs', mql: window.matchMedia('(max-width: 639px)') },
    ];

    const handleChange = () => {
      const active = queries.find(q => q.mql.matches);
      if (active) {
        setActiveKey(active.key as BreakpointKey);
      }
    };

    // Synchronize layout state on mount
    handleChange();

    // Attach matchMedia listeners
    queries.forEach(q => q.mql.addEventListener('change', handleChange));

    return () => {
      queries.forEach(q => q.mql.removeEventListener('change', handleChange));
    };
  }, []);

  return activeKey;
}

export default useBreakpoint;
