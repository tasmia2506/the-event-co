'use client';

import { useEffect, useRef } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import MagneticLink from './MagneticLink';
import BookNowButton from './BookNowButton';
import styles from './Hero.module.css';
import m from './HeroMotion.module.css';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      <div className={m.media} aria-hidden="true">
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
          <source src="/landing page vedio.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles.videoShade} aria-hidden="true" />
      <div className={m.glow} aria-hidden="true" />
      <div className={m.grain} aria-hidden="true" />

      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={`eyebrow ${m.eyebrow}`}>THE EVENT CO.</div>
            <h1 className={styles.title} aria-label="Where every detail becomes a memory.">
              WHERE EVERY DETAIL
              <br />
              BECOMES A MEMORY.
            </h1>
            <p className={styles.description}>
              From bespoke weddings and private celebrations to corporate experiences and large-scale events &mdash;
              we design, produce and deliver moments that stay with you.
            </p>
            <div className={styles.actions}>
              <MagneticLink href={whatsappUrl()} target="_blank" rel="noopener" className="btn-pill btn-light btn-lg">
                PLAN YOUR EVENT &rarr;
              </MagneticLink>
              <BookNowButton className="btn-pill btn-burgundy btn-lg">
                BOOK NOW &rarr;
              </BookNowButton>
            </div>
          </div>
        </div>
      </div>

      <div className={m.cue} aria-hidden="true">
        <span className={m.cueText}>SCROLL</span>
        <span className={m.cueTrack}>
          <span className={m.cueDot} />
        </span>
      </div>
    </section>
  );
}
