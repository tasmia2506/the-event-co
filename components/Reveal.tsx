'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  variant?: 'fade' | 'mask';
}

export default function Reveal({ children, delay = 0, y = 24, className, variant = 'fade' }: RevealProps) {
  const reduce = useReducedMotion();

  if (variant === 'mask' && !reduce) {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: 'inset(0 0 100% 0)', y: 28, opacity: 0 }}
        whileInView={{ clipPath: 'inset(0 0 -8% 0)', y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
