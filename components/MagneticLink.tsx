'use client';

import { useRef, type ReactNode } from 'react';
import { animate } from 'motion/react';

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}

// Anchor that leans toward a fine pointer. Inert on touch / reduced motion.
export default function MagneticLink({ href, className = '', children, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const ok = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !ok()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.06;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
    animate(el, { x, y }, { type: 'spring', stiffness: 220, damping: 18, mass: 0.4 });
  };
  const leave = () => {
    if (ref.current) animate(ref.current, { x: 0, y: 0 }, { type: 'spring', stiffness: 220, damping: 14 });
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`${className} btn-shine`}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </a>
  );
}
