import { whatsappUrl } from '@/lib/whatsapp';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import WorkMasonry from '@/components/WorkMasonry';
import CountUp from '@/components/CountUp';
import { Orbs, Stagger, StaggerItem, MotionIn } from '@/components/PageMotion';
import { WORK_ITEMS } from '@/lib/data/work';
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
  return (
    <>
    <PageBanner
      eyebrow="Proof Of Work"
      title="Our Work Across Bengaluru"
      lead="Over a decade of weddings, corporate summits, private celebrations, and heavy technical productions — delivered end to end."
    />

    <section className="section section-surface">
      <div className="container">
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

        <WorkMasonry items={WORK_ITEMS} />
      </div>
    </section>

    <section className={`${ctaStyles.band} ${styles.bandFx}`}>
      <Orbs />
      <div className={`container ${styles.bandInner}`}>
        <h2>
          WANT YOUR PRODUCTION
          <br />
          FEATURED HERE?
        </h2>
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
