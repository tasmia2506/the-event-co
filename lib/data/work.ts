export type WorkCategory = 'weddings' | 'celebrations' | 'corporate' | 'large-scale';

export interface WorkItem {
  category: WorkCategory;
  img: string;
  alt: string;
  location: string;
  eventType: string;
  service: string;
  title: string;
  desc: string;
  year?: string;
  scale?: string;
}

export const WORK_FILTERS: { label: string; value: WorkCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Weddings', value: 'weddings' },
  { label: 'Celebrations', value: 'celebrations' },
  { label: 'Corporate Events', value: 'corporate' },
  { label: 'Large-Scale Events', value: 'large-scale' },
];

export const WORK_ITEMS: WorkItem[] = [
  {
    category: 'weddings',
    img: '/PHOTO-2026-04-09-21-41-09.jpg',
    alt: 'Botanical Wedding Mandap',
    location: 'Bengaluru',
    eventType: 'Wedding Ceremony',
    service: 'Wedding Planning & Coordination',
    title: 'The Royal Botanical Mandap',
    desc: 'Curated jasmine chandeliers, lotus pillars, and golden wash lighting for a heritage courtyard wedding.',
    year: '2026',
    scale: '450 Guests',
  },
  {
    category: 'corporate',
    img: '/PHOTO-2026-08-16-13-53-04.jpg',
    alt: 'Keynote Stage Staging',
    location: 'Bengaluru',
    eventType: 'Corporate Event',
    service: 'Corporate Event Planning',
    title: 'Apex Tech Keynote 2026',
    desc: 'Immersive 4K curved LED walls, precision sound, and multi-camera live telecast for a tech leadership summit.',
    year: '2026',
    scale: '1,200 Delegates',
  },
  {
    category: 'large-scale',
    img: '/PHOTO-2026-04-05-20-48-00.jpg',
    alt: 'Luxury Floral Entrance Canopy',
    location: 'Bengaluru',
    eventType: 'Large-Scale Production',
    service: 'Event Production',
    title: 'Opulent Entrance Canopy',
    desc: 'Layered exotic botanicals, crystal drops, and bespoke candle installations at a Brigade Road venue.',
    year: '2026',
    scale: 'Full Venue Build',
  },
  {
    category: 'celebrations',
    img: '/PHOTO-2025-12-31-18-51-39.jpg',
    alt: 'Starlight Courtyard Celebration',
    location: 'Bengaluru',
    eventType: 'Private Celebration',
    service: 'Event Planning & Management',
    title: 'The Starlight Courtyard Banquet',
    desc: 'An evening under hanging lanterns and curated acoustic string performances for a milestone anniversary.',
    year: '2025',
    scale: '180 Guests',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-05-05-18-26-30.jpg',
    alt: 'Grand Sangeet Amphitheatre',
    location: 'Bengaluru',
    eventType: 'Wedding Sangeet',
    service: 'Wedding Planning & Coordination',
    title: 'Grand Sangeet Amphitheatre',
    desc: 'Illuminated dance floor, synchronized light cues, and floral wings for a sangeet night performance.',
    year: '2026',
    scale: '600 Guests',
  },
  {
    category: 'large-scale',
    img: '/PHOTO-2026-08-16-13-51-21.jpg',
    alt: 'Concert Audio & Lighting Setup',
    location: 'Bengaluru',
    eventType: 'Large-Scale Production',
    service: 'Event Production',
    title: 'Outdoor Arena Staging',
    desc: 'Rigid ground support grid, delay audio towers, and backstage power backup.',
  },
  {
    category: 'corporate',
    img: '/PHOTO-2026-01-17-20-01-59.jpg',
    alt: 'Global Leadership Summit',
    location: 'Bengaluru',
    eventType: 'Corporate Event',
    service: 'Corporate Event Planning',
    title: 'Global Leadership Summit',
    desc: 'Seamless multi-screen presentation, wireless headsets, and plenary hall.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-05-17-11-37-19.jpg',
    alt: 'Floating Pink Mandap on a Lagoon',
    location: 'Bengaluru',
    eventType: 'Wedding Ceremony',
    service: 'Wedding Planning & Coordination',
    title: 'The Floating Lagoon Mandap',
    desc: 'A blush floral mandap built on a jetty over open water, reached by a petal-lined walkway spanning the lake.',
    year: '2026',
    scale: 'Waterfront Build',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-08-16-13-53-02-b.jpg',
    alt: 'Ivory Arched Processional Aisle, Wide View',
    location: 'Bengaluru',
    eventType: 'Wedding Reception',
    service: 'Wedding Planning & Coordination',
    title: 'The Ivory Archway Aisle',
    desc: 'The full processional run of ivory arches and blooms, shot from the guest seating looking toward the mandap.',
    year: '2026',
    scale: '400 Guests',
  },
];
