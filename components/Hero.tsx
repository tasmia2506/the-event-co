'use client';

import { useEffect, useRef } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import MagneticLink from './MagneticLink';
import styles from './Hero.module.css';
import m from './HeroMotion.module.css';

const EASE = [0.16, 1, 0.3, 1] as const;

const LINE_1 = ['WHERE', 'EVERY', 'DETAIL'];
const LINE_2 = ['BECOMES', 'A', 'MEMORY.'];

function Words({ words, start, reduce }: { words: string[]; start: number; reduce: boolean | null }) {
  return (
    <>
      {words.map((w, i) => (
        <span className={m.wordMask} key={w + i}>
          <motion.span
            className={m.word}
            initial={reduce ? { opacity: 0 } : { y: '115%', rotate: 4 }}
            animate={reduce ? { opacity: 1 } : { y: '0%', rotate: 0 }}
            transition={{ duration: reduce ? 0.3 : 1.0, delay: reduce ? 0 : 0.35 + (start + i) * 0.09, ease: EASE }}
          >
            {w}
          </motion.span>{' '}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pause the video (and its slow zoom) while the hero is off-screen
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      section.dataset.live = entry.isIntersecting ? 'true' : 'false';
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.hero} id="home" ref={sectionRef} data-live="true">
      <motion.div className={m.media} aria-hidden="true">
        <video
          ref={videoRef}
          className={`${styles.video} ${m.kenBurns}`}
          poster="/hero-bg.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero-video-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className={styles.videoShade} aria-hidden="true" />
      <div className={m.glow} aria-hidden="true" />
      <div className={m.grain} aria-hidden="true" />

      <motion.div className="container" style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}>
        <div className={styles.grid}>
          <div>
            <motion.div
              className={`eyebrow ${m.eyebrow}`}
              initial={{ opacity: 0, x: reduce ? 0 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
            >
              THE EVENT CO.
            </motion.div>
            <h1 className={styles.title} aria-label="Where every detail becomes a memory.">
              <span aria-hidden="true" className={m.line}>
                <Words words={LINE_1} start={0} reduce={reduce} />
              </span>
              <span aria-hidden="true" className={m.line}>
                <Words words={LINE_2} start={LINE_1.length} reduce={reduce} />
              </span>
            </h1>
            <motion.p
              className={styles.description}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 1.15, ease: EASE }}
            >
              From bespoke weddings and private celebrations to corporate experiences and large-scale events &mdash;
              we design, produce and deliver moments that stay with you.
            </motion.p>
            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : 1.35, ease: EASE }}
            >
              <MagneticLink href={whatsappUrl()} target="_blank" rel="noopener" className="btn-pill btn-light btn-lg">
                PLAN YOUR EVENT &rarr;
              </MagneticLink>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={m.cue}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 2, duration: 0.55 }}
      >
        <span className={m.cueText}>SCROLL</span>
        <span className={m.cueTrack}>
          <span className={m.cueDot} />
        </span>
      </motion.div>
    </section>
  );
}
