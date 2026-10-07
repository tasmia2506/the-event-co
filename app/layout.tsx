import type { Metadata } from 'next';
import { Oswald, Quattrocento } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SocialRail from '@/components/SocialRail';
import BookingModal from '@/components/BookingModal';
import CookieConsent from '@/components/CookieConsent';
import { SITE } from '@/lib/data/site';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const quattrocento = Quattrocento({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-quattrocento',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — We Plan. We Design. We Deliver Memories. | Bengaluru`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'THE EVENT CO. is an event management and planning company in Bengaluru, offering wedding planning, event planning, event management and corporate event planning services.',
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} — We Create Events People Remember.`,
    description:
      'Wedding planners, event planners and corporate event planners in Bengaluru — complete event management, planning and production from THE EVENT CO.',
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_IN',
    images: [{ url: '/cat-weddings.jpg', alt: `${SITE.name} — event planning in Bengaluru` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — We Create Events People Remember.`,
    description: 'Wedding, celebration and corporate event planning and production in Bengaluru.',
    images: ['/cat-weddings.jpg'],
  },
  alternates: { canonical: '/' },
};

const LD_JSON = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  image: `${SITE.url}/logo.jpeg`,
  description:
    'Event management and planning company in Bengaluru offering wedding planning, event planning, event management and corporate event planning.',
  slogan: SITE.tagline,
  telephone: SITE.phones.nooman.number,
  email: SITE.email,
  priceRange: '₹₹₹',
  sameAs: [SITE.instagram],
  areaServed: { '@type': 'City', name: 'Bengaluru' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: "No. 19, 1st Floor 'A' Block, St. Patrick's Complex, Brigade Road",
    addressLocality: 'Bengaluru',
    postalCode: '560025',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 12.9719, longitude: 77.6083 },
  contactPoint: [SITE.phones.nooman, SITE.phones.danish].map((p) => ({
    '@type': 'ContactPoint',
    contactType: 'customer service',
    name: p.label,
    telephone: p.number,
    areaServed: 'IN',
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${oswald.variable} ${quattrocento.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <SmoothScroll>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <WhatsAppFloat />
          <SocialRail />
          <Footer />
        </SmoothScroll>

        <BookingModal />
        <CookieConsent />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LD_JSON).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
