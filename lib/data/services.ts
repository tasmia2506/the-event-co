export interface Service {
  slug: string;
  badge: string;
  title: string;
  img: string;
  punchline: string;
  cardDesc: string;
  longDesc: string[];
  features: string[];
  fullFeatures: string[];
  cta: string;
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'wedding-planning',
    badge: 'Bespoke Weddings',
    title: 'Wedding Planning',
    img: '/cat-celebrations.jpg',
    punchline: 'Wedding planning that brings every detail together.',
    cardDesc: 'Create a wedding celebration that feels as special as the occasion itself.',
    longDesc: [
      'Create a wedding celebration that feels as special as the occasion itself.',
      'We provide wedding planning services in Bengaluru, including concept development, vendor coordination, venue planning, décor coordination, guest management, timeline planning and complete wedding execution.',
    ],
    features: ['Complete Wedding Planning', 'Venue & Vendor Coordination', 'Wedding Timeline Management'],
    fullFeatures: [
      'Complete Wedding Planning',
      'Wedding Coordination',
      'Venue Planning',
      'Vendor Coordination',
      'Wedding Timeline Management',
      'Guest Experience Planning',
      'Wedding Décor Coordination',
      'Ceremony Planning',
      'Reception Planning',
      'On-Ground Wedding Management',
    ],
    cta: 'Explore Wedding Planning',
    metaDescription:
      "THE EVENT CO. is a wedding planner in Bengaluru offering complete wedding planning, coordination, venue and vendor management, and on-ground wedding execution for Bangalore weddings.",
  },
  {
    slug: 'event-planning',
    badge: 'Private Celebrations',
    title: 'Event Planning',
    img: '/cat-weddings.jpg',
    punchline: 'Planning designed around your celebration.',
    cardDesc: 'From intimate gatherings to vibrant celebrations, we plan events that reflect the mood, occasion and personality of your event.',
    longDesc: [
      'From intimate gatherings to vibrant celebrations, we plan events that reflect the mood, occasion and personality of your event.',
      'Our event planning services in Bengaluru cover private celebrations, engagements, birthdays, anniversaries, Haldi, Mehendi and other special occasions.',
    ],
    features: ['Birthday & Anniversary Planning', 'Engagement, Haldi & Mehendi Planning', 'Event Day Coordination'],
    fullFeatures: [
      'Event Concept Planning',
      'Event Coordination',
      'Birthday Planning',
      'Engagement Planning',
      'Haldi Planning',
      'Mehendi Planning',
      'Anniversary Planning',
      'Private Event Planning',
      'Guest Management',
      'Event Day Coordination',
    ],
    cta: 'Plan Your Celebration',
    metaDescription:
      'Event planning in Bengaluru for birthdays, engagements, Haldi, Mehendi, anniversaries and private celebrations — full event coordination from THE EVENT CO.',
  },
  {
    slug: 'event-management',
    badge: 'Full-Service Management',
    title: 'Event Management',
    img: '/cat-large-scale.jpg',
    punchline: 'From planning to execution.',
    cardDesc: 'Great events require more than a good idea — we bring together planning, creative direction, vendor coordination, production and on-ground execution.',
    longDesc: [
      'Great events require more than a good idea.',
      'Our event management services in Bengaluru bring together planning, creative direction, vendor coordination, production and on-ground execution to keep every element moving together.',
    ],
    features: ['Venue & Vendor Management', 'Production Coordination', 'On-Ground Event Management'],
    fullFeatures: [
      'Event Planning',
      'Event Coordination',
      'Venue Management',
      'Vendor Management',
      'Production Coordination',
      'Guest Experience',
      'Event Scheduling',
      'On-Ground Event Management',
    ],
    cta: 'Plan Your Event',
    metaDescription:
      'THE EVENT CO. is an event management company in Bengaluru handling venue, vendor and production coordination with full on-ground event execution.',
  },
  {
    slug: 'corporate-event-planning',
    badge: 'Corporate',
    title: 'Corporate Event Planning',
    img: '/cat-corporate.jpg',
    punchline: 'Built for purposeful experiences.',
    cardDesc: 'From conferences and launches to annual celebrations and brand events, we plan professional experiences that connect people and support your objectives.',
    longDesc: [
      'From conferences and launches to annual celebrations and brand events, we plan professional experiences that connect people and support your objectives.',
      'Our corporate event planning services in Bengaluru include concept development, venue coordination, production planning, guest management, scheduling and complete event execution.',
    ],
    features: ['Conference & Product Launch Planning', 'Annual Day & Brand Event Planning', 'Venue & Production Coordination'],
    fullFeatures: [
      'Corporate Event Planning',
      'Conference Planning',
      'Product Launch Planning',
      'Annual Day Planning',
      'Brand Event Planning',
      'Venue Coordination',
      'Production Management',
      'Guest Experience Planning',
    ],
    cta: 'Explore Corporate Event Planning',
    metaDescription:
      'Corporate event planning in Bengaluru — conferences, product launches, annual days and brand events managed end-to-end by THE EVENT CO.',
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
