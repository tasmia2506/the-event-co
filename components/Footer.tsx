import Link from 'next/link';
import { NAV, SECONDARY_LINKS, SITE } from '@/lib/data/site';
import { SERVICES } from '@/lib/data/services';
import { whatsappUrl } from '@/lib/whatsapp';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.siteFooter}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.brandTitle}>
              THE EVENT <span>CO.</span>
            </div>
            <div className={styles.tagline}>{SITE.tagline}</div>
            <p className={styles.desc}>Event Management &amp; Planning</p>
            <p className={styles.desc}>Bengaluru, Karnataka</p>
          </div>

          <div>
            <div className={styles.colHeading}>Navigation</div>
            <ul className={styles.navList}>
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              {SECONDARY_LINKS.map((item) => (
                <li key={item.key}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.colHeading}>Services</div>
            <ul className={styles.navList}>
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className={styles.colHeading}>Business Information</div>
            <div className={styles.legalBadge}>
              <div>
                <strong>Legal Entity:</strong> {SITE.legalName}
              </div>
              <div>
                <strong>Studio:</strong> St. Patrick&rsquo;s Complex, Brigade Road, Bengaluru &ndash; 560 025
              </div>
              <div>
                <strong>Production Depot:</strong> Thirumenahalli, Jakkur Post, Yelahanka, Bengaluru &ndash; 560 064
              </div>
            </div>
          </div>
        </div>

        <div className={styles.socialRow}>
          <a href={SITE.instagram} target="_blank" rel="noopener">
            Instagram
          </a>
          <span>&bull;</span>
          <a href={`tel:${SITE.phones.nooman.number}`}>Call Us</a>
          <span>&bull;</span>
          <a href={whatsappUrl()} target="_blank" rel="noopener">
            WhatsApp Us
          </a>
        </div>

        <div className={styles.motto}>{SITE.motto}</div>

        <div className={styles.bottom}>
          <div>
            &copy; 2026 THE EVENT CO. ({SITE.legalName}). All rights reserved. &bull;{' '}
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
          <div>
            Crafted with intention in Bengaluru, India &bull; <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
          <div className={styles.credit}>
            Designed &amp; developed by{' '}
            <a href="https://naazailabs.com" target="_blank" rel="noopener">
              naazailabs.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
