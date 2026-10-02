import { whatsappUrl } from '@/lib/whatsapp';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { SplitText, Float, ImageCurtain, WordScroll, MotionIn, Orbs } from '@/components/PageMotion';
import PrinciplesGrid from '@/components/PrinciplesGrid';
import { SITE } from '@/lib/data/site';
import styles from '@/components/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'THE EVENT CO. is a Bengaluru-based event management and planning company specialising in weddings, celebrations, corporate events, festivals and large-scale event production.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <Float to={50} distance={700}>
            <SplitText as="h1" by="char" trigger="mount" className={styles.heroTitle} text="About Us" />
            <MotionIn as="p" y={20} trigger="mount" delay={0.7} className={styles.heroSub}>
              Event planners in Bengaluru
            </MotionIn>
          </Float>
        </div>
        <Float className={styles.portrait} to={-120} distance={900} intro>
          <Image src="/about-stairs.jpg" alt="Staircase draped in burgundy and blush roses with candles" fill sizes="300px" priority />
        </Float>
      </section>

      <section className={styles.story}>
        <div className="container">
          <MotionIn y={20}>
            <div className={styles.kicker}>{SITE.name}</div>
          </MotionIn>
          <SplitText
            as="h2"
            className={styles.statement}
            text="We plan. We design. We deliver."
            accentFrom={4}
            accentClassName={styles.accent}
          />

          <div className={styles.pinned}>
            <WordScroll
              text={`${SITE.name} is a Bengaluru-based event management and planning company specialising in weddings, celebrations, corporate events, festivals and large-scale event production.`}
            />
          </div>

          <Reveal delay={0.1}>
            <div className={styles.columns}>
              <p>
                We combine event planning, creative direction, d&eacute;cor coordination, event production and
                on-ground execution to create experiences that are visually distinctive and professionally managed.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className={styles.quoteRow}>
              <ImageCurtain className={styles.quoteImg}>
                <Image src="/about-aisle.jpg" alt="Floral wedding aisle with draped fabric and a chandelier" fill sizes="(max-width: 1024px) 60vw, 30vw" />
              </ImageCurtain>
              <div>
                <SplitText
                  as="p"
                  className={styles.quote}
                  text="Whether you're planning an intimate celebration or a large-scale event, we work from the initial concept through to final execution."
                />
                <a href={whatsappUrl('Hi THE EVENT CO.! I would like to plan an event with you.')} target="_blank" rel="noopener" className="btn-pill btn-burgundy btn-lg">
                  PLAN AN EVENT WITH US &rarr;
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.principles}>
        <Orbs />
        <div className={`container ${styles.principlesInner}`}>
          <div className={styles.principlesGrid}>
            <Reveal>
              <div>
                <h2>Our Four Brand Principles</h2>
                <p>The standard we hold ourselves to for every event we undertake.</p>
                <Link href="/work" className="btn-pill btn-outline-white btn-lg">
                  SEE OUR WORK &rarr;
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <PrinciplesGrid dark />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
