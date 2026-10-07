'use client';

import {
  Fragment,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
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
/* MotionIn: renders children directly, no slide / scale / wipe         */
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

export function MotionIn({ children, className, as = 'div' }: MotionInProps) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

/* ------------------------------------------------------------------ */
/* Stagger / StaggerItem / StaggerList                                  */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  trigger?: Trigger;
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  variant?: 'rise' | 'line' | 'pop';
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
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
/* Float: static wrapper, no scroll-linked drift                        */
/* ------------------------------------------------------------------ */
export function Float({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  to?: number;
  distance?: number;
  intro?: boolean;
}) {
  return <div className={className}>{children}</div>;
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
