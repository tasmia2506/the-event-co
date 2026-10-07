import { Stagger, StaggerItem } from './PageMotion';
import styles from './PrinciplesGrid.module.css';

const PRINCIPLES = [
  {
    title: 'IDEAS',
    desc: 'Creative concepts built around your vision. We transform abstract thoughts into clear, expressive visual identities and guest journeys.',
  },
  {
    title: 'PEOPLE',
    desc: 'The right team behind every detail. Experienced showrunners, master florists, technical directors, and hospitality managers on-ground.',
  },
  {
    title: 'PRODUCTION',
    desc: 'Creative ideas brought to life through seamless execution. State-of-the-art staging, acoustics, LED architecture, and lighting rigs.',
  },
  {
    title: 'PERFECTION',
    desc: 'Attention to the details that guests remember. From custom tablescapes and acoustic balance to timing precision down to the minute.',
  },
];

export default function PrinciplesGrid({ dark = false }: { dark?: boolean }) {
  return (
    <Stagger className={`${styles.grid} ${dark ? styles.dark : ''}`}>
      {PRINCIPLES.map((p, i) => (
        <StaggerItem className={styles.item} key={p.title} variant="pop">
          <span className={styles.rule} aria-hidden="true" />
          <span className={styles.numMask} aria-hidden="true">
            <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
          </span>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.desc}>{p.desc}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
