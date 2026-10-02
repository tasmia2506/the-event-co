'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface Props {
  src: string;
  alt: string;
  sizes: string;
  /** Parallax travel in percent of the frame height (differs per image for depth). */
  speed?: number;
  delay?: number;
  /** Curtain direction for the clip-path reveal. */
  from?: 'bottom' | 'left' | 'top' | 'right';
}

// Fills its (relative, overflow-hidden) parent: curtain reveal, a settling scale, and scroll parallax.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ParallaxImage({ src, alt, sizes, speed = 8, delay = 0, from = 'bottom' }: Props) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(frame, { once: true, margin: '0px 0px -8% 0px' });
  const [parallax, setParallax] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const on = () => setParallax(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed}%`, `${speed}%`]);

  if (reduce) {
    return (
      <div ref={frame} style={{ position: 'absolute', inset: 0 }}>
        <Image src={src} alt={alt} fill sizes={sizes} />
      </div>
    );
  }

  // Image is always visible: only a gentle settle-in zoom and desktop parallax, no clip "curtain"
  return (
    <div ref={frame} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.div
        style={{ position: 'absolute', inset: '-12% 0', y: parallax ? y : 0 }}
        initial={{ scale: 1.12 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} />
      </motion.div>
    </div>
  );
}
