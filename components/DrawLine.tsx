'use client';

import { motion, useReducedMotion } from 'motion/react';

// A thin line that draws itself (scaleX) when it enters the viewport.
export default function DrawLine({ className, delay = 0, origin = 'left' }: { className?: string; delay?: number; origin?: 'left' | 'center' | 'right' }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={className}
      style={{ display: 'block', transformOrigin: origin }}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
