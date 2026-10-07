'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface Props {
  src: string;
  alt: string;
  sizes: string;
  delay?: number;
  /** Curtain direction for the clip-path reveal. */
  from?: 'bottom' | 'left' | 'top' | 'right';
}

// Fills its (relative, overflow-hidden) parent: a gentle settle-in zoom, no scroll-linked parallax.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ParallaxImage({ src, alt, sizes, delay = 0, from = 'bottom' }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(frame, { once: true, margin: '0px 0px -8% 0px' });

  if (reduce) {
    return (
      <div ref={frame} style={{ position: 'absolute', inset: 0 }}>
        <Image src={src} alt={alt} fill sizes={sizes} />
      </div>
    );
  }

  return (
    <div ref={frame} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        initial={{ scale: 1.12 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} />
      </motion.div>
    </div>
  );
}
