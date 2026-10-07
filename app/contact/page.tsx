import type { Metadata } from 'next';
import { FormReveal, MotionIn, Stagger, StaggerItem } from '@/components/PageMotion';
import EnquiryForm from '@/components/EnquiryForm';
import { SITE } from '@/lib/data/site';
import splitStyles from '@/components/SplitForm.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Connect with THE EVENT CO. (Event Works) on Brigade Road, Bengaluru. Call Nooman (9620508786) or Danish (9035802278) to plan your next event.',
  alternates: { canonical: '/contact' },
};

const DIRECT_CONTACTS = [
  {
    label: 'Executive Partner',
    value: `Nooman — ${SITE.phones.nooman.display}`,
    href: `tel:${SITE.phones.nooman.number}`,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: 'Managing Partner',
    value: `Danish — ${SITE.phones.danish.display}`,
    href: `tel:${SITE.phones.danish.number}`,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: 'Email Consultation',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
  {
    label: 'Instagram Channel',
    value: SITE.instagramHandle,
    href: SITE.instagram,
    external: true,
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
];

export default function ContactPage() {
  return (
    <section>
      <MotionIn y={70} duration={1.2} trigger="mount">
          <div className={splitStyles.panel}>
            <MotionIn x={-90} y={0} duration={1.4} delay={0.15} trigger="mount" className={splitStyles.panelPhoto} />

            <div className={splitStyles.panelInfo}>
              <MotionIn y={16} trigger="mount" delay={0.2}>
                <div className={splitStyles.panelKicker}>Contact</div>
              </MotionIn>
              <h1 className={splitStyles.panelTitle}>
                LET&rsquo;S TALK
                <br />
                ABOUT YOUR EVENT.
              </h1>
              <MotionIn y={24} trigger="mount" delay={0.7}>
                <p className={splitStyles.panelText}>
                  Tell us about your event, date, location and requirements. Our team will get in touch to discuss the
                  possibilities.
                </p>
              </MotionIn>

              <Stagger as="ul" className={splitStyles.panelList} trigger="mount" delay={0.9} gap={0.1}>
                {DIRECT_CONTACTS.map((c) => (
                  <StaggerItem as="li" variant="line" key={c.label}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {c.icon}
                    </svg>
                    <a href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener' : undefined}>
                      {c.value}
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              <div className={splitStyles.locations}>
                {[SITE.studio, SITE.depot].map((place, i) => (
                  <MotionIn y={50} delay={i * 0.06} wipe="up" duration={1.2} className={splitStyles.location} key={place.name}>
                    <div className={splitStyles.locationName}>{place.name}</div>
                    <div className={splitStyles.locationAddr}>{place.address.join(' ')}</div>
                    <iframe
                      className={splitStyles.panelMap}
                      title={`${place.name} on Google Maps`}
                      src={`https://www.google.com/maps?q=${place.mapQuery}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </MotionIn>
                ))}
              </div>
            </div>

            <MotionIn x={90} y={0} duration={1.2} delay={0.3} trigger="mount" className={splitStyles.panelForm}>
              <FormReveal>
                <EnquiryForm idPrefix="c" />
              </FormReveal>
            </MotionIn>
          </div>
      </MotionIn>

    </section>
  );
}
