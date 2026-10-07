'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/data/services';
import { ImageCurtain, SplitText, StaggerList, TiltCard } from './PageMotion';
import BookNowButton from './BookNowButton';
import styles from './ServiceCard.module.css';

export function ServicesGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}

interface MediaCardProps {
  title: string;
  badge: string;
  img: string;
  alt: string;
  desc: string;
  features: string[];
  action: ReactNode;
  index?: number;
}

// Shared by service cards and the rental equipment cards
export function MediaCard({ title, badge, img, alt, desc, features, action, index = 0 }: MediaCardProps) {
  return (
    <TiltCard delay={(index % 2) * 0.06} className={styles.tiltWrap}>
      <article className={styles.card}>
        <ImageCurtain className={styles.media}>
          <span className={styles.badge}>{badge}</span>
          <Image src={img} alt={alt} fill sizes="(max-width: 1024px) 50vw, 33vw" />
        </ImageCurtain>
        <div className={styles.body}>
          <SplitText as="h3" className={styles.title} text={title} />
          <p className={styles.desc}>{desc}</p>
          <StaggerList className={styles.features} items={features} />
          {action}
        </div>
      </article>
    </TiltCard>
  );
}

export default function ServiceCard({ service, href, index = 0 }: { service: Service; href: string; index?: number }) {
  return (
    <MediaCard
      index={index}
      title={service.title}
      badge={service.badge}
      img={service.img}
      alt={`${service.title} Bengaluru`}
      desc={service.cardDesc}
      features={service.features}
      action={
        service.slug === 'event-planning' ? (
          <BookNowButton className={`btn-pill btn-burgundy btn-sm ${styles.cta}`}>
            {service.cta} &rarr;
          </BookNowButton>
        ) : (
          <Link href={href} className={`btn-pill btn-burgundy btn-sm ${styles.cta}`}>
            {service.cta} &rarr;
          </Link>
        )
      }
    />
  );
}
