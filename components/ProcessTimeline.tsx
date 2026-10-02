'use client';

import { Stagger, StaggerItem } from './PageMotion';
import styles from './ProcessTimeline.module.css';

const STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Tell us about your event, venue, date, style and requirements.',
  },
  {
    num: '02',
    title: 'DESIGN',
    desc: 'We develop the creative direction and event plan around your vision.',
  },
  {
    num: '03',
    title: 'PLAN',
    desc: 'Our team coordinates the people, vendors, materials, production and setup requirements.',
  },
  {
    num: '04',
    title: 'EXECUTE',
    desc: 'We bring everything together on the day of your event with focused on-ground execution.',
  },
];

export default function ProcessTimeline() {
  return (
    <Stagger className={styles.timeline} gap={0.14}>
      {STEPS.map((step) => (
        <StaggerItem className={styles.step} key={step.num} variant="pop">
          <div className={styles.header}>
            <div className={styles.num}>{step.num}</div>
            <div className={styles.pill} />
          </div>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.desc}>{step.desc}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
