'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Stagger, StaggerItem } from './PageMotion';
import styles from './PrinciplesGrid.module.css';

const PRINCIPLES = [
  {
    title: 'IDEAS',
    desc: 'Creative concepts built around your vision. We transform abstract thoughts into clear, expressive visual identities and guest journeys.',
  },
  {
    title: 'PEOPLE',
    desc: 'The right team behind every detail. Experienced showrunners, master florists, technical directors, and hospitality managers on-ground.',
  },
  {
    title: 'PRODUCTION',
    desc: 'Creative ideas brought to life through seamless execution. State-of-the-art staging, acoustics, LED architecture, and lighting rigs.',
  },
  {
    title: 'PERFECTION',
    desc: 'Attention to the details that guests remember. From custom tablescapes and acoustic balance to timing precision down to the minute.',
  },
];

export default function PrinciplesGrid({ dark = false }: { dark?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <Stagger className={`${styles.grid} ${dark ? styles.dark : ''}`} gap={0.16}>
      {PRINCIPLES.map((p, i) => (
        <StaggerItem className={styles.item} key={p.title} variant="pop">
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.numMask} aria-hidden="true">
            <motion.span
              className={styles.num}
              variants={{
                hidden: { y: reduce ? 0 : '110%' },
                show: { y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </motion.span>
          </span>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.desc}>{p.desc}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
