'use client';

import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type PointerEvent as ReactPointerEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import styles from './PageMotion.module.css';

type Trigger = 'mount' | 'view';
type Tag = 'div' | 'ul' | 'li' | 'article' | 'h1' | 'h2' | 'h3' | 'p' | 'span';

/* ------------------------------------------------------------------ */
/* Input capability: only fine-pointer devices get the tilt hover FX    */
/* ------------------------------------------------------------------ */
const FINE = '(hover: hover) and (pointer: fine)';

export function usePointerFine() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(FINE);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(FINE).matches,
    () => false,
  );
}

/* ------------------------------------------------------------------ */
/* Shared scroll-reveal: content is ALWAYS visible by default (safe for */
/* SSR, no-JS and crawlers). JS only ever ADDS a transient "pending"     */
/* state, and only for elements it has confirmed are off-screen at      */
/* mount — so a reveal that never fires simply means nothing was ever   */
/* hidden. One IntersectionObserver instance is shared by every caller. */
/* ------------------------------------------------------------------ */
let sharedIO: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();

function getSharedIO() {
  if (sharedIO || typeof IntersectionObserver === 'undefined') return sharedIO;
  sharedIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const reveal = revealCallbacks.get(entry.target);
        if (reveal) {
          reveal();
          revealCallbacks.delete(entry.target);
          sharedIO!.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
  );
  return sharedIO;
}

export function useScrollReveal<T extends HTMLElement>(active = true) {
  const ref = useRef<T>(null);

  // Imperative DOM mutation, not React state: the [data-pending] attribute is
  // purely presentational (read by CSS), so there's no need to re-render the
  // component just to flip it, and it sidesteps setState-in-effect entirely.
  useEffect(() => {
    const el = ref.current;
    if (!active || !el || typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyVisible) return;

    const io = getSharedIO();
    if (!io) return;

    el.dataset.pending = 'true';
    revealCallbacks.set(el, () => {
      delete el.dataset.pending;
    });
    io.observe(el);
    return () => {
      revealCallbacks.delete(el);
      io.unobserve(el);
      delete el.dataset.pending;
    };
  }, [active]);

  return { ref };
}

/* ------------------------------------------------------------------ */
/* SplitText: renders the heading text directly, no word/char reveal    */
/* ------------------------------------------------------------------ */
interface SplitTextProps {
  text: string; // "\n" makes a line break
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  by?: 'word' | 'char';
  trigger?: Trigger;
  delay?: number;
  className?: string;
  accentFrom?: number; // word index from which accentClassName applies
  accentClassName?: string;
}

export function SplitText({ text, as = 'h2', className, accentFrom, accentClassName }: SplitTextProps) {
  const Tag = as;
  const lines = text.split('\n');
  let wi = 0;

  return (
    <Tag className={className}>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line
            .split(' ')
            .filter(Boolean)
            .map((word, i) => {
              const idx = wi++;
              const accent = accentFrom !== undefined && idx >= accentFrom ? accentClassName : undefined;
              return (
                <Fragment key={`${li}-${i}`}>
                  <span className={accent ?? undefined}>{word}</span>{' '}
                </Fragment>
              );
            })}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* MotionIn: a clean fade + rise reveal. "mount" plays immediately via  */
/* a pure CSS @keyframes animation (works even with JS disabled).      */
/* "view" (the default) only animates once scrolled into view, using    */
/* the visible-by-default useScrollReveal hook above.                   */
/* ------------------------------------------------------------------ */
interface MotionInProps {
  children?: ReactNode;
  className?: string;
  x?: number;
  y?: number;
  scale?: number;
  delay?: number;
  duration?: number;
  trigger?: Trigger;
  wipe?: 'left' | 'up';
  as?: Tag;
}

export function MotionIn({
  children,
  className,
  x = 0,
  y = 24,
  delay = 0,
  duration = 0.6,
  trigger = 'view',
  as = 'div',
}: MotionInProps) {
  const Tag = as as ElementType;
  const { ref } = useScrollReveal<HTMLElement>(trigger === 'view');
  const vars = {
    '--mi-x': `${x}px`,
    '--mi-y': `${y}px`,
    '--mi-delay': `${delay}s`,
    '--mi-duration': `${duration}s`,
  } as CSSProperties;

  if (trigger === 'mount') {
    return (
      <Tag className={`${styles.motionMount} ${className ?? ''}`} style={vars}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`${styles.motionView} ${className ?? ''}`} style={vars}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger / StaggerItem / StaggerList                                  */
/* Children are cloned with an --i custom property so each item can     */
/* delay itself by index via CSS — no per-count rule list to maintain.  */
/* ------------------------------------------------------------------ */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  trigger?: Trigger;
}

export function Stagger({ children, className, as = 'div', gap = 0.08, delay = 0, trigger = 'view' }: StaggerProps) {
  const Tag = as as ElementType;
  const { ref } = useScrollReveal<HTMLElement>(trigger === 'view');
  const vars = { '--stagger-gap': `${gap}s`, '--stagger-base-delay': `${delay}s` } as CSSProperties;
  const indexed = Children.map(children, (child, i) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<{ style?: CSSProperties }>, {
          style: { ...(child.props as { style?: CSSProperties }).style, '--i': i } as CSSProperties,
        })
      : child,
  );

  if (trigger === 'mount') {
    return (
      <Tag className={`${styles.stagger} ${styles.staggerMount} ${className ?? ''}`} style={vars}>
        {indexed}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`${styles.stagger} ${className ?? ''}`} style={vars}>
      {indexed}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  variant = 'rise',
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  variant?: 'rise' | 'line' | 'pop';
  style?: CSSProperties;
}) {
  const Tag = as as ElementType;
  return (
    <Tag className={`${styles.staggerItem} ${className ?? ''}`} data-variant={variant} style={style}>
      {children}
    </Tag>
  );
}

export function StaggerList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* ImageCurtain: renders the image directly, no curtain wipe            */
/* ------------------------------------------------------------------ */
export function ImageCurtain({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: Trigger;
}) {
  return <div className={`${styles.curtainBox} ${className ?? ''}`}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Float: a gentle scroll-linked drift. Only ever offsets position —    */
/* never opacity — so it can't leave content hidden if JS never runs.   */
/* ------------------------------------------------------------------ */
export function Float({
  children,
  className,
  to = 40,
}: {
  children: ReactNode;
  className?: string;
  to?: number;
  distance?: number;
  intro?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [-to / 2, to / 2]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.4 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard: static card with a subtle pointer-tilt hover (no entrance)  */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  max?: number;
}) {
  const fine = usePointerFine();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 18 });

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className={`${styles.tilt} ${className ?? ''}`}
      style={fine ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* WordScroll: renders the statement at full opacity, no scrub reveal   */
/* ------------------------------------------------------------------ */
export function WordScroll({ text, className }: { text: string; className?: string }) {
  return (
    <div className={styles.wordScrollWrap}>
      <p className={`${styles.wordScroll} ${className ?? ''}`} data-words data-armed="true">
        {text.split(' ').map((w, i) => (
          <span className={styles.w} data-w key={i} style={{ opacity: 1 }}>
            {w}{' '}
          </span>
        ))}
      </p>
      <span className={styles.wordProgress} aria-hidden="true">
        <i data-bar style={{ transform: 'scaleX(1)' }} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FormReveal: renders children directly, no in-view rise               */
/* ------------------------------------------------------------------ */
export function FormReveal({ children }: { children: ReactNode }) {
  return (
    <div className={styles.formReveal} data-in="true">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Orbs: slow drifting rose glow for dark bands (parent: relative)      */
/* ------------------------------------------------------------------ */
export function Orbs() {
  return (
    <div className={styles.orbs} aria-hidden="true">
      <span className={styles.orb} />
      <span className={styles.orb} />
    </div>
  );
}
