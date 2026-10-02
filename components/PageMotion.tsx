'use client';

import {
  Fragment,
  useEffect,
  useRef,
  useSyncExternalStore,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PageMotion.module.css';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, margin: '0px 0px -8% 0px' } as const;
// Mount-triggered animations wait a beat so the route wipe can lift first
const BASE = 0.25;

type Trigger = 'mount' | 'view';
type Tag = 'div' | 'ul' | 'li' | 'article' | 'h1' | 'h2' | 'h3' | 'p' | 'span';

const TAGS: Record<Tag, typeof motion.div> = {
  div: motion.div,
  ul: motion.ul as unknown as typeof motion.div,
  li: motion.li as unknown as typeof motion.div,
  article: motion.article as unknown as typeof motion.div,
  h1: motion.h1 as unknown as typeof motion.div,
  h2: motion.h2 as unknown as typeof motion.div,
  h3: motion.h3 as unknown as typeof motion.div,
  p: motion.p as unknown as typeof motion.div,
  span: motion.span as unknown as typeof motion.div,
};

/* ------------------------------------------------------------------ */
/* Input capability: only fine-pointer devices get tilt / cursor FX     */
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
/* SplitText: masked word / letter reveal for headings                  */
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

export function SplitText({
  text,
  as = 'h2',
  by = 'word',
  trigger = 'view',
  delay = 0,
  className,
  accentFrom,
  accentClassName,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const M = TAGS[as];
  const lines = text.split('\n');
  let wi = 0;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: by === 'char' ? 0.045 : 0.09,
        delayChildren: delay + (trigger === 'mount' ? BASE : 0),
      },
    },
  };
  const chip = {
    hidden: reduce ? { opacity: 0 } : { y: '118%', rotate: by === 'char' ? 7 : 3 },
    show: { y: 0, rotate: 0, opacity: 1, transition: { duration: reduce ? 0.3 : 1, ease: EASE } },
  };

  return (
    <M
      className={className}
      aria-label={text.replace(/\n/g, ' ')}
      variants={container}
      initial="hidden"
      {...(trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT })}
    >
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
                  {by === 'char' ? (
                    <span className={styles.nowrap} aria-hidden="true">
                      {word.split('').map((c, ci) => (
                        <span className={styles.word} key={ci}>
                          <motion.span className={`${styles.chip} ${accent ?? ''}`} variants={chip}>
                            {c}
                          </motion.span>
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className={styles.word} aria-hidden="true">
                      <motion.span className={`${styles.chip} ${accent ?? ''}`} variants={chip}>
                        {word}
                      </motion.span>
                    </span>
                  )}{' '}
                </Fragment>
              );
            })}
        </Fragment>
      ))}
    </M>
  );
}

/* ------------------------------------------------------------------ */
/* MotionIn: slide / scale / wipe a block into place                    */
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
  y = 40,
  scale = 1,
  delay = 0,
  duration = 1,
  trigger = 'view',
  wipe,
  as = 'div',
}: MotionInProps) {
  const reduce = useReducedMotion();
  const M = TAGS[as];
  const hidden = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x,
        y,
        scale,
        ...(wipe === 'left' ? { clipPath: 'inset(0 100% 0 0)' } : wipe === 'up' ? { clipPath: 'inset(100% 0 0 0)' } : {}),
      };
  const shown = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    ...(wipe ? { clipPath: 'inset(0% 0% 0% 0%)' } : {}),
  };
  return (
    <M
      className={className}
      initial={hidden}
      {...(trigger === 'mount' ? { animate: shown } : { whileInView: shown, viewport: VIEWPORT })}
      transition={{ duration: reduce ? 0.3 : duration, delay: delay + (trigger === 'mount' ? BASE : 0), ease: EASE }}
    >
      {children}
    </M>
  );
}

/* ------------------------------------------------------------------ */
/* Stagger / StaggerItem / StaggerList                                  */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  as = 'div',
  gap = 0.1,
  delay = 0,
  trigger = 'view',
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  gap?: number;
  delay?: number;
  trigger?: Trigger;
}) {
  const M = TAGS[as];
  return (
    <M
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay + (trigger === 'mount' ? BASE : 0) } },
      }}
      {...(trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT })}
    >
      {children}
    </M>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  variant = 'rise',
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  variant?: 'rise' | 'line' | 'pop';
}) {
  const reduce = useReducedMotion();
  const M = TAGS[as];
  const hidden = reduce
    ? { opacity: 0 }
    : variant === 'line'
      ? { opacity: 0, x: -26 }
      : variant === 'pop'
        ? { opacity: 0, scale: 0.88, y: 30 }
        : { opacity: 0, y: 56, scale: 0.97 };
  return (
    <M
      className={className}
      variants={{
        hidden,
        show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: reduce ? 0.3 : 0.9, ease: EASE } },
      }}
    >
      {children}
    </M>
  );
}

export function StaggerList({ items, className }: { items: string[]; className?: string }) {
  return (
    <Stagger as="ul" className={className} gap={0.08}>
      {items.map((f) => (
        <StaggerItem as="li" variant="line" key={f}>
          {f}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
/* ImageCurtain: burgundy curtain lifts while the image settles         */
/* ------------------------------------------------------------------ */
export function ImageCurtain({
  children,
  className,
  delay = 0,
  trigger = 'view',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: Trigger;
}) {
  const reduce = useReducedMotion();
  const play = trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT };
  const d = delay + (trigger === 'mount' ? BASE : 0);
  return (
    <motion.div className={`${styles.curtainBox} ${className ?? ''}`} initial="hidden" {...play}>
      <motion.div
        className={styles.fill}
        variants={{
          hidden: { scale: reduce ? 1 : 1.35, opacity: reduce ? 0 : 1 },
          show: { scale: 1, opacity: 1, transition: { duration: 0.55, delay: d, ease: EASE } },
        }}
      >
        {children}
      </motion.div>
      <motion.span
        className={styles.curtain}
        aria-hidden="true"
        variants={{
          hidden: { scaleY: 1 },
          show: { scaleY: 0, transition: { duration: 0.55, delay: d, ease: [0.76, 0, 0.24, 1] } },
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Float: scroll-linked drift (parallax), optional intro                */
/* ------------------------------------------------------------------ */
export function Float({
  children,
  className,
  to = -90,
  distance = 900,
  intro = false,
}: {
  children: ReactNode;
  className?: string;
  to?: number; // px of travel over `distance` px of page scroll
  distance?: number;
  intro?: boolean;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, distance], [0, reduce ? 0 : to]);
  return (
    <motion.div
      className={className}
      style={{ y }}
      initial={intro ? { opacity: 0, scale: reduce ? 1 : 0.86, rotate: reduce ? 0 : -3 } : false}
      animate={intro ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
      transition={{ duration: 0.55, delay: BASE + 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* TiltCard: reveal on scroll + pointer tilt (fine pointers only)       */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className,
  delay = 0,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  max?: number;
}) {
  const fine = usePointerFine();
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 18 });
  const tilt = fine && !reduce;

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!tilt) return;
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
      style={tilt ? { rotateX, rotateY, transformPerspective: 1100 } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: reduce ? 0 : 80, scale: reduce ? 1 : 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: reduce ? 0.3 : 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* WordScroll: statement that lights up word by word as you scroll,     */
/* pinned on large fine-pointer screens                                 */
/* ------------------------------------------------------------------ */
gsap.registerPlugin(ScrollTrigger);

export function WordScroll({ text, className }: { text: string; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const text = el.querySelector<HTMLElement>('[data-words]');
      if (!text) return;
      text.setAttribute('data-armed', 'true');
      const words = text.querySelectorAll<HTMLElement>('[data-w]');
      const bar = el.querySelector<HTMLElement>('[data-bar]');
      const pin = false; // pinning caused scroll jank with Lenis

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: pin ? 'center center' : 'top 78%',
          end: pin ? '+=100%' : 'bottom 42%',
          scrub: 0.5,
          pin,
          anticipatePin: 1,
        },
      });
      tl.fromTo(words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.1, duration: 0.3 }, 0);
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 0.55 }, 0);
      return () => {
        text.removeAttribute('data-armed');
        words.forEach((w) => (w.style.opacity = ''));
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className={styles.wordScrollWrap}>
      <p className={`${styles.wordScroll} ${className ?? ''}`} data-words>
        {text.split(' ').map((w, i) => (
          <Fragment key={i}>
            <span className={styles.w} data-w>
              {w}{' '}
            </span>
          </Fragment>
        ))}
      </p>
      <span className={styles.wordProgress} aria-hidden="true">
        <i data-bar />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FormReveal: wraps a form card so its rows rise in once in view       */
/* ------------------------------------------------------------------ */
export function FormReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  return (
    <div ref={ref} className={styles.formReveal} data-in={inView ? 'true' : 'false'}>
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
