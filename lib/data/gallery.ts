export type GalleryCategory = 'weddings' | 'corporate' | 'celebrations' | 'decor' | 'production';

export interface GalleryItem {
  category: GalleryCategory;
  img: string;
  alt: string;
  location: string;
  title: string;
  desc: string;
}

export const GALLERY_FILTERS: { label: string; value: GalleryCategory | 'all' }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Weddings', value: 'weddings' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Private Celebrations', value: 'celebrations' },
  { label: 'Event Design & Décor', value: 'decor' },
  { label: 'Event Production', value: 'production' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    category: 'weddings',
    img: '/PHOTO-2026-04-09-21-41-09.jpg',
    alt: 'Botanical Wedding Mandap',
    location: 'Bengaluru • Weddings',
    title: 'The Royal Botanical Mandap',
    desc: 'Curated jasmine chandeliers, lotus pillars, and golden wash lighting.',
  },
  {
    category: 'corporate',
    img: '/PHOTO-2026-08-16-13-53-04.jpg',
    alt: 'Keynote Stage Staging',
    location: 'Bengaluru • Corporate',
    title: 'Apex Tech Keynote 2026',
    desc: 'Immersive 4K curved LED walls and precision sound for 1,200 delegates.',
  },
  {
    category: 'celebrations',
    img: '/PHOTO-2025-12-31-18-51-39.jpg',
    alt: 'Starlight Courtyard Celebration',
    location: 'Bengaluru • Private Celebrations',
    title: 'The Starlight Courtyard Banquet',
    desc: 'An evening under hanging lanterns and curated acoustic string performances.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-05-05-18-26-30.jpg',
    alt: 'Grand Sangeet Amphitheatre',
    location: 'Bengaluru • Weddings',
    title: 'Grand Sangeet Amphitheatre',
    desc: 'Illuminated dance floor, synchronized light cues, and floral wings.',
  },
  {
    category: 'corporate',
    img: '/PHOTO-2026-01-17-20-01-59.jpg',
    alt: 'Global Leadership Summit',
    location: 'Bengaluru • Corporate',
    title: 'Global Leadership Summit',
    desc: 'Seamless multi-screen presentation, wireless headsets, and plenary hall.',
  },
  {
    category: 'decor',
    img: '/PHOTO-2026-01-09-00-29-33.jpg',
    alt: 'Rug-Canopy Red Carpet Walkway',
    location: 'Bengaluru • Event Design & Décor',
    title: 'The Heritage Rug Canopy',
    desc: 'Hand-knotted carpets suspended overhead with hanging lanterns along a crimson entrance walk.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-04-09-21-41-09-b.jpg',
    alt: 'Red Draped Reception Hall with Chandeliers',
    location: 'Bengaluru • Weddings',
    title: 'Crimson Reception Pavilion',
    desc: 'Swagged red ceiling drapes, crystal chandeliers, and a rose-lined stage for the newlyweds.',
  },
  {
    category: 'decor',
    img: '/PHOTO-2026-04-12-20-03-05.jpg',
    alt: 'Floral Entrance Tunnel at Night',
    location: 'Bengaluru • Event Design & Décor',
    title: 'Rose Arch Entrance Tunnel',
    desc: 'A fairy-lit floral tunnel in white and red, welcoming guests down the red carpet.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-04-29-19-40-11-b.jpg',
    alt: 'Mughal Arch Stage in Emerald and Ivory',
    location: 'Bengaluru • Weddings',
    title: 'Emerald Mughal Courtyard Stage',
    desc: 'Arched ivory columns, emerald velvet drapes, and a cascading white floral chandelier.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-04-30-20-49-25.jpg',
    alt: 'Mirror Aisle Mughal Stage in Burgundy',
    location: 'Bengaluru • Weddings',
    title: 'Burgundy Mirror-Aisle Mandap',
    desc: 'A reflective mirrored aisle leading to an arched stage dressed in burgundy velvet and gold.',
  },
  {
    category: 'decor',
    img: '/PHOTO-2026-05-05-18-26-30-b.jpg',
    alt: 'Standing Floral Lotus Installations',
    location: 'Bengaluru • Event Design & Décor',
    title: 'Blush Lotus Floral Towers',
    desc: 'Tall lotus-shaped floral towers in blush and lavender, anchoring a banquet hall buffet.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-05-07-21-46-42.jpg',
    alt: 'Black and White Sparkle Stage with Mirror Aisle',
    location: 'Bengaluru • Weddings',
    title: 'Midnight Sparkle Mandap',
    desc: 'A monochrome stage of white draping and star-cloth panels above a mirrored processional aisle.',
  },
  {
    category: 'decor',
    img: '/PHOTO-2026-05-07-21-46-43-b.jpg',
    alt: 'Black Sequin Drape Entrance Walkway',
    location: 'Bengaluru • Event Design & Décor',
    title: 'Noir Sequin Entrance Walk',
    desc: 'Black sequin drapes and gold frames line a red carpet beneath layered white chandeliers.',
  },
  {
    category: 'celebrations',
    img: '/PHOTO-2026-05-07-21-46-44.jpg',
    alt: 'Cream Draped Lounge Tent Interior',
    location: 'Bengaluru • Private Celebrations',
    title: 'Ivory Lounge Tent',
    desc: 'Sand and ivory ceiling drapes over a rattan lounge seating arrangement.',
  },
  {
    category: 'weddings',
    img: '/PHOTO-2026-05-17-11-37-19.jpg',
    alt: 'Floating Pink Mandap on a Lagoon',
    location: 'Bengaluru • Weddings',
    title: 'The Floating Lagoon Mandap',
    desc: 'A blush floral mandap built on a jetty over open water, reached by a petal-lined walkway.',
  },
  {
    category: 'celebrations',
    img: '/PHOTO-2026-08-16-13-52-56.jpg',
    alt: 'Rattan Lounge Seating Under Marquee',
    location: 'Bengaluru • Private Celebrations',
    title: 'Garden Rattan Lounge',
    desc: 'Woven rattan sofas and armchairs arranged beneath a sand-toned draped marquee ceiling.',
  },
];
