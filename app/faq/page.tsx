import { whatsappUrl } from '@/lib/whatsapp';
import type { Metadata } from 'next';
import { MotionIn } from '@/components/PageMotion';
import PageHero from '@/components/PageHero';
import FaqList from '@/components/FaqList';
import { FAQS } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    "Answers to common questions about THE EVENT CO.'s wedding planning, corporate events, and in-house production & rental services in Bengaluru.",
  alternates: { canonical: '/faq' },
};

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <section className="section section-surface" style={{ paddingTop: 60 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD).replace(/</g, '\\u003c') }}
      />
      <div className="container">
        <PageHero
          eyebrow="Help & Knowledge"
          title="Frequently Asked Questions"
          lead="Clear answers about our event planning process, technical production capabilities, booking timelines, and service coverage across Bengaluru."
        />

        <FaqList items={FAQS} />

        <MotionIn className="text-center" y={30}>
          <div style={{ marginTop: 56 }}>
          <a href={whatsappUrl('Hi THE EVENT CO.! I have a question about planning an event.')} target="_blank" rel="noopener" className="btn-pill btn-burgundy btn-lg">
            STILL HAVE QUESTIONS? CHAT ON WHATSAPP &rarr;
          </a>
          </div>
        </MotionIn>
      </div>
    </section>
  );
}
