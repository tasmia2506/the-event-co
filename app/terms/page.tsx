import type { Metadata } from 'next';
import { SITE } from '@/lib/data/site';
import { MotionIn, SplitText } from '@/components/PageMotion';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms & Conditions governing event planning, production, and equipment rental services provided by THE EVENT CO. (Event Works), Bengaluru.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <section className="section section-white" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className="section-header">
          <MotionIn y={16} trigger="mount">
            <div className="eyebrow">Legal</div>
          </MotionIn>
          <SplitText
            as="h1"
            trigger="mount"
            delay={0.1}
            text="Terms & Conditions"
            className={styles.title}
          />
        </div>

        <div className={styles.legal}>
          <p className={styles.updated}>
            Last updated: 2026. These terms govern engagements with {SITE.name} ({SITE.legalName}), Brigade Road,
            Bengaluru, for event planning, design, production, and equipment rental services.
          </p>

          <h2>1. Engagement &amp; Booking</h2>
          <p>
            A booking is confirmed only upon written agreement (email or signed proposal) and receipt of the agreed
            advance payment. Dates are held on a first-confirmed basis; a verbal or informal enquiry does not reserve
            a date.
          </p>

          <h2>2. Payment Terms</h2>
          <ul>
            <li>A non-refundable advance is required to confirm any wedding, corporate, or celebration booking.</li>
            <li>
              The balance payment schedule is defined in your individual proposal, typically milestone-based
              (confirmation, pre-production, and event-week).
            </li>
            <li>
              Equipment rental payments are due in full prior to dispatch unless a separate credit agreement is in
              place.
            </li>
          </ul>

          <h2>3. Cancellation &amp; Rescheduling</h2>
          <p>
            Cancellations made within 30 days of the event date may forfeit advance payments already committed to
            vendors, venues, and production holds. Rescheduling requests are accommodated subject to venue and crew
            availability and may incur a rebooking fee.
          </p>

          <h2>4. Equipment Rental Terms</h2>
          <p>
            Rented sound, lighting, LED, and trussing equipment remains the property of {SITE.name} at all times. The
            renter is responsible for any damage, loss, or misuse occurring during the rental period beyond normal
            wear. Delivery, installation, and collection timelines are agreed in advance and documented in the rental
            order.
          </p>

          <h2>5. Vendor &amp; Venue Coordination</h2>
          <p>
            Where {SITE.name} coordinates third-party vendors (catering, venues, artistes) on your behalf, our
            liability is limited to coordination and does not extend to the independent contractual obligations of
            those third parties.
          </p>

          <h2>6. Liability</h2>
          <p>
            {SITE.name} carries standard event-production safety practices for rigging, staging, and electrical
            work. We are not liable for delays or losses caused by circumstances outside our reasonable control,
            including weather, venue restrictions, or statutory authority decisions.
          </p>

          <h2>7. Force Majeure</h2>
          <p>
            Neither party is liable for failure to perform obligations due to events beyond reasonable control,
            including natural disasters, government restrictions, or public health emergencies. Affected bookings
            will be rescheduled or adjusted in good faith.
          </p>

          <h2>8. Photography &amp; Portfolio Use</h2>
          <p>
            Unless a client requests confidentiality in writing, {SITE.name} may photograph events for portfolio,
            marketing, and social media use.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of India, with disputes subject to the jurisdiction of courts in
            Bengaluru, Karnataka.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms can be directed to{' '}
            <a href={`mailto:${SITE.email}`} style={{ color: 'var(--accent-burgundy)', fontWeight: 600 }}>
              {SITE.email}
            </a>{' '}
            or our Brigade Road studio.
          </p>
        </div>
      </div>
    </section>
  );
}
