import Link from 'next/link';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import CategoryGrid from '@/components/CategoryGrid';
import WorkMasonry from '@/components/WorkMasonry';
import TileGrid from '@/components/TileGrid';
import Testimonials from '@/components/Testimonials';
import FaqList from '@/components/FaqList';
import CTABand from '@/components/CTABand';
import { WORK_ITEMS } from '@/lib/data/work';
import { FAQS } from '@/lib/data/faqs';
import CountUp from '@/components/CountUp';
import ParallaxImage from '@/components/ParallaxImage';
import statStyles from '@/components/StatsBand.module.css';
import lShapeStyles from '@/components/AboutLShape.module.css';
import darkStyles from '@/components/DarkBand.module.css';

const STATS = [
  { num: '500+', label: 'Events Delivered' },
  { num: '12+', label: 'Years of Craft' },
  { num: '100%', label: 'Bespoke Production' },
];

const CATEGORIES = [
  {
    title: 'Weddings',
    desc: 'Wedding planning, ceremony coordination, reception planning and complete wedding execution.',
    img: '/wedding.jpeg',
    href: '/services/wedding-planning',
  },
  {
    title: 'Private Celebrations',
    desc: 'Birthdays, engagements, anniversaries, Haldi, Mehendi and private celebrations.',
    img: '/private celebration.jpeg',
    href: '/services/event-planning',
  },
  {
    title: 'Corporate Events',
    desc: 'Conferences, launches, annual celebrations, brand events and business gatherings.',
    img: '/corporate events.jpeg',
    href: '/services/corporate-event-planning',
  },
  {
    title: 'Large-Scale Events',
    desc: 'Planning, coordination, production and infrastructure for festivals and large gatherings.',
    img: '/cat-large-scale.jpg',
    href: '/services/event-management',
  },
];

const WHY_US = [
  {
    title: 'Design-Led',
    desc: 'Creative direction built around your event.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5 6.5 12l2.2 4.5h6.6L17.5 12 12 2.5Z" />
        <path d="M12 7.5v5" />
        <circle cx="12" cy="13.5" r="1" />
        <path d="M9.5 16.5V21h5v-4.5" />
      </svg>
    ),
  },
  {
    title: 'End-to-End',
    desc: 'Planning, coordination, production and execution.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="5" r="2" />
        <path d="M7 19h6.5a3.5 3.5 0 0 0 0-7h-3a3.5 3.5 0 0 1 0-7H17" />
      </svg>
    ),
  },
  {
    title: 'Detail-Driven',
    desc: 'Every element considered, from concept to execution.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6.5 3h11L22 9l-10 12L2 9l4.5-6Z" />
        <path d="M2 9h20" />
        <path d="m8.5 9 3.5 12 3.5-12L12 3 8.5 9Z" />
      </svg>
    ),
  },
  {
    title: 'Local Expertise',
    desc: 'Bengaluru-based team with knowledge of venues and event logistics.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.5s-7-5.5-7-11.5a7 7 0 0 1 14 0c0 6-7 11.5-7 11.5Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="section section-white">
        <div className="container" style={{ maxWidth: 1480 }}>
          <Reveal variant="mask">
            <div
              className="section-header text-center"
              style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}
            >
              <div>
                <div className="eyebrow">What We Do</div>
                <h2>Every Event Has Its <span className="heading-serif">Own Story.</span></h2>
              </div>
              <div>
                <Link href="/services" className="btn-pill btn-burgundy btn-lg">
                  VIEW ALL SERVICES &rarr;
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <CategoryGrid categories={CATEGORIES} />
          </Reveal>
        </div>
      </section>

      {/* About Us */}
      <section className={`section ${lShapeStyles.burgundySection}`}>
        <div className="container">
          <div className={lShapeStyles.grid}>
            <div className={lShapeStyles.slotVert1}>
              <div className={lShapeStyles.imgWrap}>
                <ParallaxImage src="/about-2.jpg" alt="Red draped evening reception tent with chandeliers, Bengaluru" sizes="(max-width: 1024px) 50vw, 30vw" delay={0} from="left" />
              </div>
            </div>

            <div className={lShapeStyles.slotVert2}>
              <div className={lShapeStyles.imgWrap}>
                <ParallaxImage src="/about-1.jpg" alt="Red velvet wedding stage with candelabras and floral arch" sizes="(max-width: 1024px) 50vw, 30vw" delay={0.12} from="bottom" />
              </div>
            </div>

            <div className={lShapeStyles.slotVert3}>
              <div className={lShapeStyles.imgWrap}>
                <ParallaxImage src="/about-3.jpg" alt="Burgundy and white floral table setting with candles" sizes="(max-width: 1024px) 50vw, 30vw" delay={0.24} from="right" />
              </div>
            </div>

            <Reveal className={lShapeStyles.slotText}>
              <div>
                <div className="eyebrow">About Us</div>
                <h2>
                  WE CREATE EVENTS
                  <br />
                  <span className="heading-burgundy">PEOPLE REMEMBER.</span>
                </h2>
                <p className={lShapeStyles.quoteDesc} style={{ marginTop: 20 }}>
                  THE EVENT CO. is an event management and planning company in Bengaluru, creating beautifully
                  designed celebrations, weddings, corporate events and large-scale event experiences.
                </p>
                <p className={lShapeStyles.quoteDesc} style={{ marginTop: 14 }}>
                  From wedding planning in Bengaluru to complete event production, our team brings together creative
                  direction, planning, d&eacute;cor, coordination and execution to transform venues into memorable
                  experiences.
                </p>
                <div style={{ marginTop: 24, textAlign: 'right' }}>
                  <Link href="/about" className="btn-pill btn-outline-white btn-sm btn-shine">
                    DISCOVER OUR STORY &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>

            <div className={lShapeStyles.slotHoriz}>
              <div className={lShapeStyles.imgWrap}>
                <ParallaxImage src="/about-4.jpg" alt="Lakeside pavilion with red drapes and string lights at dusk" sizes="(max-width: 1024px) 50vw, 30vw" delay={0.36} from="top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="section section-white" id="work">
        <div className="container">
          <Reveal variant="mask">
            <div
              className="section-header text-center"
              style={{ maxWidth: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}
            >
              <div>
                <div className="eyebrow">Our Work</div>
                <h2>Designed. Built. <span className="heading-serif">Experienced.</span></h2>
              </div>
              <div>
                <Link href="/work" className="btn-pill btn-burgundy btn-lg">
                  VIEW ALL WORK &rarr;
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <WorkMasonry items={WORK_ITEMS.slice(0, 9)} />
          </Reveal>
        </div>
      </section>

      {/* Why Us */}
      <section className={`section ${darkStyles.dark}`}>
        <div className="container">
          <Reveal variant="mask">
            <div className="section-header text-center">
              <div className="eyebrow">Why Us</div>
              <h2>Details Make The <span className="heading-serif">Difference.</span></h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <TileGrid tiles={WHY_US} dark />
          </Reveal>
        </div>
      </section>


      {/* Stats */}
      <section className={`section section-surface ${statStyles.band}`}>
        <div className="container">
          <Reveal>
            <div className={statStyles.stats}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className={statStyles.num}>
                    <CountUp value={s.num} />
                  </div>
                  <div className={statStyles.label}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-band">
        <div className="container">
          <Reveal variant="mask">
            <div className="section-header text-center">
              <div className="eyebrow">Testimonials</div>
              <h2>What Our <span className="heading-serif">Clients Say.</span></h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-surface">
        <div className="container">
          <Reveal variant="mask">
            <div className="section-header text-center section-header-centered">
              <div className="eyebrow">FAQ</div>
              <h2>Questions, <span className="heading-serif">Answered.</span></h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <FaqList items={FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
