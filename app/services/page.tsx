import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ServiceCard, { ServicesGrid } from '@/components/ServiceCard';
import { SERVICES } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Event management & planning services in Bengaluru from THE EVENT CO.: wedding planning, event planning, event management and corporate event planning — from the first idea to the final detail.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner eyebrow="Our Event Management & Planning Services" title="From The First Idea To The Final Detail." />

      <section className="section section-surface">
        <div className="container">
          <ServicesGrid>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.slug} service={s} href={`/services/${s.slug}`} index={i} />
            ))}
          </ServicesGrid>
        </div>
      </section>
    </>
  );
}
