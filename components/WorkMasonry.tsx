'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'motion/react';
import ParallaxImage from './ParallaxImage';
import type { WorkItem } from '@/lib/data/work';
import styles from './WorkMasonry.module.css';

export default function WorkMasonry({ items }: { items: WorkItem[] }) {
  const [lightboxItem, setLightboxItem] = useState<WorkItem | null>(null);
  const [hovering, setHovering] = useState(false);
  const [fine, setFine] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 300, damping: 28, mass: 0.4 });

  useEffect(() => {
    const check = () =>
      setFine(
        window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      );
    check();
  }, []);

  return (
    <>
      <div
        className={styles.masonry}
        onPointerMove={fine ? (e) => { mx.set(e.clientX); my.set(e.clientY); } : undefined}
      >
        {items.map((item, i) => (
          <motion.button
            key={item.title}
            type="button"
            className={styles.item}
            initial={{ opacity: 0, y: 64, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => setHovering(false)}
            onClick={() => setLightboxItem(item)}
            aria-label={`View ${item.title}`}
          >
            <ParallaxImage src={item.img} alt={item.alt} sizes="(max-width: 1024px) 50vw, 33vw" speed={4 + (i % 3) * 2} delay={(i % 3) * 0.06} from={i % 2 ? 'top' : 'bottom'} />
            <div className={styles.overlay}>
              <span className={styles.eventType}>{item.eventType}</span>
              <h3 className={styles.title}>{item.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>
      {fine && (
          <motion.div
            aria-hidden="true"
            className={styles.cursor}
            style={{ x: sx, y: sy }}
            animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            VIEW
          </motion.div>
        )}

      {lightboxItem && (
        <div className={styles.lightboxOverlay} role="dialog" aria-modal="true" onClick={() => setLightboxItem(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightboxItem(null)} aria-label="Close preview">
              &times;
            </button>
            <div className={styles.lightboxImgWrap}>
              <Image src={lightboxItem.img} alt={lightboxItem.alt} fill sizes="90vw" />
            </div>
            <div className={styles.lightboxCaption}>
              <strong>{lightboxItem.title}</strong> &mdash; {lightboxItem.desc}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
