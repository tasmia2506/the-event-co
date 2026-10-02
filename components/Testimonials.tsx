'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import styles from './Testimonials.module.css';

// Placeholder structure only — replace with real, verified client quotes before launch.
// Deliberately generic (no invented names, events, or specifics) so nothing here reads as a genuine review.
const PLACEHOLDER = {
  quote: '“Add a real client quote here once you have one on file.”',
  name: 'Client Name',
  role: 'Event Type — Bengaluru',
};
const REVIEWS = Array.from({ length: 6 }, () => PLACEHOLDER);

const GAP = 24;
const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(REVIEWS.length - 1);
  const [paused, setPaused] = useState(false);
  const userPaused = false;

  const cardStep = useCallback(() => {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + GAP : 0;
  }, []);

  // Keep the index and the last reachable position in sync with the real scroll position
  const sync = useCallback(() => {
    const el = trackRef.current;
    const step = cardStep();
    if (!el || !step) return;
    const last = Math.max(0, Math.round((el.scrollWidth - el.clientWidth) / step));
    setMaxIndex(last);
    setIndex(Math.min(last, Math.round(el.scrollLeft / step)));
  }, [cardStep]);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const goTo = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el) return;
      const target = Math.max(0, Math.min(maxIndex, i));
      el.scrollTo({ left: target * cardStep(), behavior: reduce ? 'auto' : 'smooth' });
    },
    [cardStep, maxIndex, reduce],
  );

  // Autoplay: advance every few seconds, loop back at the end, stop on hover/focus or reduced motion
  useEffect(() => {
    if (paused || userPaused || reduce) return;
    const id = window.setInterval(() => goTo(index >= maxIndex ? 0 : index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, userPaused, reduce, index, maxIndex, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={styles.track}
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        aria-live="off"
        onKeyDown={onKeyDown}
      >
        {REVIEWS.map((t, i) => (
          <motion.div
            className={styles.card}
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${REVIEWS.length}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.55, delay: Math.min(i, 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.quote}>{t.quote}</p>
            <div className={styles.author}>
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots} role="group" aria-label="Choose a position">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to position ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => goTo(index - 1)} disabled={index <= 0} aria-label="Previous reviews">
            &larr;
          </button>
          <button type="button" className={styles.arrow} onClick={() => goTo(index + 1)} disabled={index >= maxIndex} aria-label="Next reviews">
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
