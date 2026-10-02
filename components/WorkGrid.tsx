'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import styles from './WorkGrid.module.css';

export interface WorkGridItem {
  category: string;
  img: string;
  alt: string;
  location: string;
  eventType?: string;
  service?: string;
  title: string;
  desc: string;
  meta?: string;
}

interface WorkGridProps {
  items: WorkGridItem[];
  filters?: { label: string; value: string }[];
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function WorkGrid({ items, filters }: WorkGridProps) {
  const [active, setActive] = useState<string>('all');
  // Index into the visible list, plus where the thumbnail sat so the preview can grow out of it
  const [open, setOpen] = useState<{ index: number; dx: number; dy: number } | null>(null);
  const reduce = useReducedMotion();
  const pillId = useId();
  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  const visible = active === 'all' ? items : items.filter((i) => i.category === active);
  const current = open ? visible[open.index] : null;

  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus({ preventScroll: true });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((o) => (o ? { ...o, index: (o.index + dir + visible.length) % visible.length } : o));
    },
    [visible.length],
  );

  const isOpen = open !== null;

  // Keyboard: Esc closes, arrows browse, Tab stays inside the dialog
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') {
        const f = overlay.current?.querySelectorAll<HTMLElement>('button');
        if (!f || !f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const stop = (e: Event) => e.preventDefault();
    const node = overlay.current;
    window.addEventListener('keydown', onKey);
    node?.addEventListener('wheel', stop, { passive: false });
    node?.addEventListener('touchmove', stop, { passive: false });
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      node?.removeEventListener('wheel', stop);
      node?.removeEventListener('touchmove', stop);
    };
  }, [isOpen, close, step]);

  const openAt = (index: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    lastTrigger.current = el;
    setOpen({
      index,
      dx: r.left + r.width / 2 - window.innerWidth / 2,
      dy: r.top + r.height / 2 - window.innerHeight / 2,
    });
  };

  return (
    <>
      {filters && (
        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${active === f.value ? styles.active : ''}`}
              onClick={() => setActive(f.value)}
              type="button"
              aria-pressed={active === f.value}
            >
              {active === f.value && (
                <motion.span
                  layoutId={`${pillId}-pill`}
                  className={styles.pill}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className={styles.filterLabel}>{f.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.div
              layout="position"
              key={item.title}
              className={styles.cell}
              initial={{ opacity: 0, scale: reduce ? 1 : 0.84, y: reduce ? 0 : 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.88 }}
              transition={{ duration: reduce ? 0.2 : 0.85, delay: reduce ? 0 : (i % 3) * 0.1, ease: EASE }}
            >
              <button
                type="button"
                className={styles.card}
                onClick={(e) => openAt(i, e.currentTarget)}
                aria-label={`View ${item.title}`}
                aria-haspopup="dialog"
              >
                <Image src={item.img} alt={item.alt} fill sizes="(max-width: 1024px) 50vw, 33vw" />
                <div className={styles.overlay}>
                  {item.eventType && <span className={styles.eventTypeBadge}>{item.eventType}</span>}
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <span className={styles.locationBadge}>
                    &#128205; {item.location}
                    {item.service ? ` • ${item.service}` : ''}
                    {item.meta ? ` • ${item.meta}` : ''}
                  </span>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
                <span className={styles.zoomHint} aria-hidden="true">
                  +
                </span>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {open &&
        createPortal(
          <AnimatePresence>
            {open && current && (
              <motion.div
                ref={overlay}
                key="lightbox"
                className={styles.lightboxOverlay}
                role="dialog"
                aria-modal="true"
                aria-label={current.title}
                data-lenis-prevent
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  className={styles.lightboxContent}
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.4, x: reduce ? 0 : open.dx, y: reduce ? 0 : open.dy }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.4, x: reduce ? 0 : open.dx, y: reduce ? 0 : open.dy }}
                  transition={{ duration: reduce ? 0.2 : 0.65, ease: EASE }}
                >
                  <button ref={closeBtn} className={styles.lightboxClose} onClick={close} aria-label="Close preview" type="button">
                    &times;
                  </button>
                  {visible.length > 1 && (
                    <>
                      <button className={`${styles.navBtn} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous project" type="button">
                        &lsaquo;
                      </button>
                      <button className={`${styles.navBtn} ${styles.next}`} onClick={() => step(1)} aria-label="Next project" type="button">
                        &rsaquo;
                      </button>
                    </>
                  )}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.title}
                      initial={{ opacity: 0, x: reduce ? 0 : 36 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reduce ? 0 : -36 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className={styles.lightboxImgWrap}>
                        <Image src={current.img} alt={current.alt} fill sizes="90vw" />
                      </div>
                      <div className={styles.lightboxCaption}>
                        <strong>{current.title}</strong> &mdash; {current.desc}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  <div className={styles.counter} aria-live="polite">
                    {open.index + 1} / {visible.length}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
