import BookNowButton from './BookNowButton';
import Reveal from './Reveal';
import styles from './CTABand.module.css';

export default function CTABand() {
  return (
    <section className={styles.band}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className="container" style={{ position: 'relative' }}>
        <Reveal variant="mask">
          <h2>
            HAVE AN EVENT
            <br />
            IN MIND?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p>Planning a wedding, celebration, corporate event or large-scale production in Bengaluru?</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={styles.actions}>
            <BookNowButton className="btn-pill btn-light btn-lg">
              PLAN YOUR EVENT &rarr;
            </BookNowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
