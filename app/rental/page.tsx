import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import RentalForm from '@/components/RentalForm';
import { MediaCard } from '@/components/ServiceCard';
import { FormReveal, MotionIn, SplitText } from '@/components/PageMotion';
import { EQUIPMENT } from '@/lib/data/equipment';
import { SITE } from '@/lib/data/site';
import svcStyles from '@/components/ServiceCard.module.css';
import splitStyles from '@/components/SplitForm.module.css';

export const metadata: Metadata = {
  title: 'Equipment Rental',
  description:
    'Rent professional sound systems, LED video walls, moving-head stage lighting, and aluminium trussing — owned and crewed by THE EVENT CO. from our Yelahanka facility in Bengaluru.',
  alternates: { canonical: '/rental' },
};

export default function RentalPage() {
  return (
    <>
      <section className="section section-surface" style={{ paddingTop: 60 }}>
        <div className="container">
          <PageHero
            eyebrow="Production Gear Inventory"
            title="Equipment Rental & Event Production"
            lead="Owned and maintained at our Yelahanka facility: concert sound, moving-beam lighting, high-refresh LED screens, and structural trussing — delivered, rigged, and crewed by our own technical team."
          />

          <div className={svcStyles.grid}>
            {EQUIPMENT.map((e, i) => (
              <MediaCard
                key={e.title}
                index={i}
                title={e.title}
                badge={e.badge}
                img={e.img}
                alt={e.title}
                desc={e.desc}
                features={e.features}
                action={
                  <a href="#rentalForm" className={`btn-pill btn-outline-burgundy btn-sm ${svcStyles.cta}`}>
                    INQUIRE RENTAL &rarr;
                  </a>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="rentalForm" className="section section-white">
        <div className="container">
          <div className={splitStyles.wrap}>
            <MotionIn x={-70} y={0}>
              <div className={splitStyles.infoPanel}>
                <div>
                  <SplitText
                    as="h2"
                    className={splitStyles.bigStatement}
                    text={'REQUEST AN' + String.fromCharCode(10) + 'EQUIPMENT QUOTE.'}
                    accentFrom={2}
                    accentClassName={splitStyles.accent}
                  />
                  <p className={splitStyles.supportText}>
                    Share your event date and desired equipment &mdash; our production team will reply with gear
                    availability and pricing.
                  </p>
                </div>

                <div className={splitStyles.directCard}>
                  <div className={splitStyles.directItem}>
                    <div className={splitStyles.directIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <div className={splitStyles.directLabel}>Production Enquiries</div>
                      <div className={splitStyles.directVal}>
                        <a href={`tel:${SITE.phones.danish.number}`}>Danish &mdash; {SITE.phones.danish.display}</a>
                      </div>
                    </div>
                  </div>

                  <div className={splitStyles.directItem}>
                    <div className={splitStyles.directIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <div className={splitStyles.directLabel}>Email</div>
                      <div className={splitStyles.directVal}>
                        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionIn>

            <MotionIn x={70} y={0} delay={0.1}>
              <FormReveal>
                <RentalForm />
              </FormReveal>
            </MotionIn>
          </div>
        </div>
      </section>
    </>
  );
}
