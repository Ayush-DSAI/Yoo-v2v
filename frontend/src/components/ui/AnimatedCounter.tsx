import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1.5, suffix = '' }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      }
    });
    return () => controls.stop();
  }, [value, duration, count]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
