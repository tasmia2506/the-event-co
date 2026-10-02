export const SITE = {
  name: 'THE EVENT CO.',
  legalName: 'EVENT WORKS',
  tagline: 'WE PLAN. WE DESIGN. WE DELIVER MEMORIES.',
  motto: 'IDEAS | PEOPLE | PRODUCTION | PERFECTION',
  url: 'https://theeventco.in',
  email: 'theeventcoblr@gmail.com',
  instagram: 'https://instagram.com/theeventcoblr',
  instagramHandle: '@theeventcoblr',
  phones: {
    nooman: { label: 'Nooman', role: 'Executive Partner', number: '+919620508786', display: '96205 08786' },
    danish: { label: 'Danish', role: 'Managing Partner', number: '+919035802278', display: '90358 02278' },
  },
  studio: {
    name: 'Brigade Road Office',
    badge: 'Client Studio & Design Office',
    address: [
      'No. 19, 1st Floor “A” Block,',
      'St. Patrick’s Complex, Brigade Road,',
      'Bengaluru – 560 025, Karnataka',
    ],
    mapQuery: "St.+Patrick's+Complex+Brigade+Road+Bengaluru",
  },
  depot: {
    name: 'Yelahanka Production Facility',
    badge: 'Technical Godown & Yard',
    address: [
      'Survey No. 53/1, Thirumenahalli, Jakkur Post,',
      'Yelahanka Taluk, Hegde Nagar,',
      'Bengaluru – 560 064, Karnataka',
    ],
    mapQuery: 'Thirumenahalli+Jakkur+Post+Hegde+Nagar+Bengaluru',
  },
  whatsappIntro: "Hi THE EVENT CO.! I would like to plan an event with you.",
} as const;

export type NavKey = 'home' | 'about' | 'services' | 'events' | 'work' | 'contact' | 'gallery' | 'rental' | 'faq';

export interface NavItem {
  key: NavKey;
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { key: 'home', href: '/', label: 'Home' },
  { key: 'about', href: '/about', label: 'About' },
  { key: 'services', href: '/services', label: 'Services' },
  { key: 'work', href: '/work', label: 'Our Work' },
  { key: 'contact', href: '/contact', label: 'Contact' },
];

// Footer-only links. Gallery and Rental pages still exist but are no longer linked from the site.
export const SECONDARY_LINKS: NavItem[] = [
  { key: 'faq', href: '/faq', label: 'FAQ' },
];
