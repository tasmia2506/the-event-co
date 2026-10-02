'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  if (reduce) return null;
  return <motion.div aria-hidden="true" className="scroll-progress" style={{ scaleX }} />;
}
