'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useScrollReveal } from './PageMotion';
import styles from './Reveal.module.css';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  variant?: 'fade' | 'mask';
}

export default function Reveal({ children, delay = 0, y = 24, className, variant = 'fade' }: RevealProps) {
  const { ref } = useScrollReveal<HTMLDivElement>();
  const vars = {
    '--reveal-delay': `${delay}s`,
    '--reveal-y': `${y}px`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${variant === 'mask' ? styles.mask : ''} ${className ?? ''}`}
      style={vars}
    >
      {children}
    </div>
  );
}
