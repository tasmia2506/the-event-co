import { Fragment } from 'react';
import styles from './PageBanner.module.css';

// Full-bleed dark hero banner: dark overlay over a photo, white eyebrow/title/lead.
// The title is plain (not SplitText) because its gradient background-clip:text
// doesn't render through SplitText's per-character `will-change: transform` layers.
export default function PageBanner({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</div>
        <h1 className={styles.title} aria-label={title.replace(/\n/g, ' ')}>
          {title.split('\n').map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </section>
  );
}
