'use client';

import { motion, useReducedMotion } from 'motion/react';
import { SplitText } from './PageMotion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <div className="section-header text-center">
      <motion.div className="eyebrow" {...rise(0.25)}>
        {eyebrow}
      </motion.div>
      <SplitText as="h1" text={title} trigger="mount" delay={0.1} />
      {lead && (
        <motion.p className="section-lead" {...rise(0.85)}>
          {lead}
        </motion.p>
      )}
    </div>
  );
}
