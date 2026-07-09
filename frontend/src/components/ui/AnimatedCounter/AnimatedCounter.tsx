import React, { useEffect, useState } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';

export interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2, suffix = '', prefix = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, { duration, ease: 'easeOut' });
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
    return () => { controls.stop(); unsubscribe(); };
  }, [count, rounded, target, duration]);

  return <>{prefix}{displayValue}{suffix}</>;
};
