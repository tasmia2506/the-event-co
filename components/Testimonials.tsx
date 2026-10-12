'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import styles from './Testimonials.module.css';

// Placeholder copy only — swap every quote below for a real, verified client
// review before launch. Attribution is deliberately role-based (no invented
// personal names, specific dates, or outcomes) so nothing here reads as a
// genuine testimonial in the meantime.
const REVIEWS = [
  {
    quote: '“Every detail was handled with care, from the first planning call to the last moment of the event.”',
    name: 'Wedding Client',
    role: 'Wedding — Bengaluru',
  },
  {
    quote: '“The team understood our brand and translated it into a space our guests are still talking about.”',
    name: 'Corporate Client',
    role: 'Corporate Event — Bengaluru',
  },
  {
    quote: '“They managed vendors, timing and décor so smoothly that we could just enjoy the celebration.”',
    name: 'Celebration Client',
    role: 'Private Celebration — Bengaluru',
  },
  {
    quote: '“Coordinating a gathering this size could have gone wrong in a dozen ways — it didn’t, thanks to their planning.”',
    name: 'Large-Scale Event Client',
    role: 'Large-Scale Event — Bengaluru',
  },
  {
    quote: '“From the mandap to the reception stage, the production quality was far beyond what we expected.”',
    name: 'Wedding Client',
    role: 'Wedding — Bengaluru',
  },
  {
    quote: '“Professional, responsive and genuinely creative — they made our launch event feel effortless.”',
    name: 'Corporate Client',
    role: 'Corporate Event — Bengaluru',
  },
];

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
          <div className={styles.card} key={i} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${REVIEWS.length}`}>
            <p className={styles.quote}>{t.quote}</p>
            <div className={styles.author}>
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role}</div>
              </div>
            </div>
          </div>
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
