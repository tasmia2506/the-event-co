import { whatsappUrl } from '@/lib/whatsapp';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SplitText, ImageCurtain, MotionIn, StaggerList } from '@/components/PageMotion';
import ServiceCard, { ServicesGrid } from '@/components/ServiceCard';
import { SERVICES, getServiceBySlug } from '@/lib/data/services';
import styles from './page.module.css';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <section className="section section-surface" style={{ paddingTop: 60 }}>
      <div className="container">
        <div className={styles.backLink}>
          <Link href="/services" className="btn-pill btn-outline btn-sm">
            &larr; ALL SERVICES
          </Link>
        </div>

        <div className={styles.grid}>
          <div>
            <MotionIn y={20} trigger="mount" as="div">
              <div className="eyebrow">{service.badge}</div>
            </MotionIn>
            <SplitText as="h1" trigger="mount" delay={0.1} text={service.punchline} />
            <MotionIn y={30} trigger="mount" delay={0.5}>
              <div>
              {service.longDesc.map((p) => (
                <p className="section-lead" style={{ marginTop: 16 }} key={p}>
                  {p}
                </p>
              ))}
              </div>
            </MotionIn>
            <StaggerList className={styles.features} items={service.fullFeatures} />
            <MotionIn y={20} delay={0.1}>
              <div style={{ marginTop: 28 }}>
                <a href={whatsappUrl(`Hi THE EVENT CO.! I am interested in ${service.title}.`)} target="_blank" rel="noopener" className="btn-pill btn-burgundy btn-sm">
                  {service.cta} &rarr;
                </a>
              </div>
            </MotionIn>
          </div>

          <ImageCurtain className={styles.image} trigger="mount" delay={0.2}>
            <Image
              src={service.img}
              alt={`${service.title} in Bengaluru — THE EVENT CO.`}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              priority
            />
          </ImageCurtain>
        </div>

        <div className="section-header text-center" style={{ marginTop: 80 }}>
          <SplitText as="h2" text="Other Services You May Need" />
        </div>

        <ServicesGrid>
          {others.map((s, i) => (
            <ServiceCard key={s.slug} service={s} href={`/services/${s.slug}`} index={i} />
          ))}
        </ServicesGrid>
      </div>
    </section>
  );
}
