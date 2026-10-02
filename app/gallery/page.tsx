import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import WorkGrid from '@/components/WorkGrid';
import { GALLERY_ITEMS, GALLERY_FILTERS } from '@/lib/data/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Visual portfolio of THE EVENT CO.: Weddings, Corporate Summits, Private Celebrations, Floral Décor & Event Production in Bengaluru.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <section className="section section-surface" style={{ paddingTop: 60 }}>
      <div className="container">
        <PageHero
          eyebrow="Visual Production Archive"
          title="Our Work in Bengaluru"
          lead="Click any project to inspect high-resolution staging, floral installations, and backstage lighting cues."
        />

        <WorkGrid items={GALLERY_ITEMS} filters={GALLERY_FILTERS} />
      </div>
    </section>
  );
}
