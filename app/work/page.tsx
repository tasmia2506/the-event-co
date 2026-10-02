import { whatsappUrl } from '@/lib/whatsapp';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import WorkGrid from '@/components/WorkGrid';
import CountUp from '@/components/CountUp';
import { Orbs, SplitText, Stagger, StaggerItem, MotionIn } from '@/components/PageMotion';
import { WORK_ITEMS, WORK_FILTERS } from '@/lib/data/work';
import ctaStyles from '@/components/CTABand.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Featured productions by THE EVENT CO.: weddings, corporate summits, and technical stage builds across Bengaluru, with scale and outcomes.',
  alternates: { canonical: '/work' },
};

const STATS = [
  { num: '500+', label: 'Events Delivered' },
  { num: '12+', label: 'Years of Craft' },
  { num: '2', label: 'Bengaluru Facilities' },
  { num: '1,200+', label: 'Peak Guest Count Served' },
];

export default function WorkPage() {
  const items = WORK_ITEMS.map((w) => ({
    ...w,
    meta: [w.year, w.scale].filter(Boolean).join(' • '),
  }));

  return (
    <>
    <section className="section section-surface" style={{ paddingTop: 60 }}>
      <div className="container">
        <PageHero
          eyebrow="Proof Of Work"
          title="Our Work Across Bengaluru"
          lead="Over a decade of weddings, corporate summits, private celebrations, and heavy technical productions — delivered end to end."
        />

        <Stagger className={styles.stats} gap={0.12}>
          {STATS.map((s) => (
            <StaggerItem variant="pop" className={styles.statItem} key={s.label}>
              <div className={styles.statNum}>
                <CountUp value={s.num} />
              </div>
              <div className={styles.statLabel}>{s.label}</div>
            </StaggerItem>
          ))}
        </Stagger>

        <WorkGrid items={items} filters={WORK_FILTERS} />
      </div>
    </section>

    <section className={`${ctaStyles.band} ${styles.bandFx}`}>
      <Orbs />
      <div className={`container ${styles.bandInner}`}>
        <SplitText as="h2" text={'WANT YOUR PRODUCTION' + String.fromCharCode(10) + 'FEATURED HERE?'} />
        <MotionIn y={26} delay={0.35}>
          <p>
            Tell us about the event you&rsquo;re planning and let&rsquo;s build the next case study together.
          </p>
          <div className={ctaStyles.actions}>
            <a href={whatsappUrl('Hi THE EVENT CO.! I would like a quote for my event.')} target="_blank" rel="noopener" className="btn-pill btn-light btn-lg">
              GET A QUOTE &rarr;
            </a>
            <Link href="/services" className="btn-pill btn-outline-white btn-lg">
              OUR SERVICES &rarr;
            </Link>
          </div>
        </MotionIn>
      </div>
    </section>
    </>
  );
}
