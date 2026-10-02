'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Faq } from '@/lib/data/faqs';
import { Stagger, StaggerItem } from './PageMotion';
import styles from './FaqList.module.css';

export default function FaqList({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Stagger className={styles.list} gap={0.07}>
      {items.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <StaggerItem className={`${styles.item} ${isOpen ? styles.open : ''}`} key={f.q}>
            <button
              type="button"
              className={styles.question}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.qText}>{f.q}</span>
              <motion.span
                className={styles.icon}
                aria-hidden="true"
                animate={{ rotate: isOpen ? 135 : 0, scale: isOpen ? 1.15 : 1 }}
                transition={reduce ? { duration: 0.15 } : { type: 'spring', stiffness: 260, damping: 14 }}
              >
                +
              </motion.span>
            </button>
            <div className={styles.answerWrap}>
              <div className={styles.answerInner}>
                <p className={styles.answer}>{f.a}</p>
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
