'use client';

import { motion, useReducedMotion } from 'motion/react';
import styles from './Divider.module.css';

// Section ornament: two lines draw outward from a diamond that spins into place.
export default function Divider({ dark = false }: { dark?: boolean }) {
  const reduce = useReducedMotion();
  const view = { once: true, margin: '-20px' } as const;
  return (
    <div className={`${styles.wrap} ${dark ? styles.dark : ''}`} aria-hidden="true">
      <motion.span
        className={styles.line}
        style={{ transformOrigin: 'right' }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.span
        className={styles.gem}
        initial={{ scale: reduce ? 1 : 0, rotate: reduce ? 45 : -135 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={view}
        transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className={styles.line}
        style={{ transformOrigin: 'left' }}
        initial={{ scaleX: reduce ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
