'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './TileGrid.module.css';

export interface Tile {
  title: string;
  desc: string;
  linkLabel?: string;
  linkHref?: string;
  icon?: ReactNode;
}

// Draws the icon's strokes when the tile scrolls into view.
function DrawIcon({ children, delay }: { children: ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const reduce = useReducedMotion();
  const anims = useRef<Animation[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const shapes = el.querySelectorAll<SVGGeometryElement>('path, circle');
    const list: Animation[] = [];
    shapes.forEach((s, i) => {
      const len = s.getTotalLength?.() ?? 0;
      if (!len) return;
      s.style.strokeDasharray = `${len}`;
      const a = s.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
        duration: 1300,
        delay: delay * 1000 + i * 120,
        easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
        fill: 'both',
      });
      a.pause();
      list.push(a);
    });
    anims.current = list;
    return () => {
      list.forEach((a) => a.cancel());
      shapes.forEach((s) => (s.style.strokeDasharray = ''));
    };
  }, [reduce, delay]);

  useEffect(() => {
    if (inView) anims.current.forEach((a) => a.play());
  }, [inView]);

  return (
    <div className={styles.icon} ref={ref}>
      {children}
    </div>
  );
}

export default function TileGrid({ tiles, dark = false }: { tiles: Tile[]; dark?: boolean }) {
  return (
    <div className={`${styles.grid} ${dark ? styles.dark : ''}`}>
      {tiles.map((t, i) => (
        <motion.div
          className={styles.tile}
          key={t.title}
          initial={{ opacity: 0, y: 48, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.icon && <DrawIcon delay={i * 0.06 + 0.3}>{t.icon}</DrawIcon>}
          <h3 className={styles.title}>{t.title}</h3>
          <p className={styles.desc}>{t.desc}</p>
          {t.linkLabel && t.linkHref && (
            <Link href={t.linkHref} className={styles.link}>
              {t.linkLabel} &rarr;
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  );
}
