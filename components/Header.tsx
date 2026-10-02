'use client';

import { whatsappUrl } from '@/lib/whatsapp';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV, SITE } from '@/lib/data/site';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  // Menu is open only for the route it was opened on, so it closes on navigation
  const navOpen = openPath === pathname;
  const setNavOpen = (v: boolean) => setOpenPath(v ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPath(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  // On the landing page the bar floats over the full-screen hero until the page scrolls
  const isHome = pathname === '/';
  const floating = isHome;
  const clear = isHome && !scrolled && !navOpen;

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <div className={`${floating ? styles.floatWrap : styles.plainWrap} ${clear ? styles.clear : ''} ${isHome && scrolled ? styles.homeScrolled : ''}`}>
      <header className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.headerBar}`}>
          <Link href="/" className={styles.headerBrand} aria-label={`${SITE.name} Home`}>
            <Image src="/logo.jpeg" alt={`${SITE.name} Logo`} width={46} height={46} priority className={styles.headerLogo} />
            <span>
              <span className={styles.headerTitle}>
                THE EVENT <span>CO.</span>
              </span>
              <span className={styles.headerTagline}>{SITE.tagline}</span>
            </span>
          </Link>

          <nav id="main-nav" className={`${styles.headerNav} ${navOpen ? styles.navOpen : ''}`} aria-label="Main Navigation">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`${styles.headerNavLink} ${isActive(item.href) ? styles.active : ''}`}
                onClick={() => setNavOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <a href={`tel:${SITE.phones.nooman.number}`} className={`${styles.headerPhone} ${styles.hideMobile}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 {SITE.phones.nooman.display}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener" className={`btn-pill btn-burgundy btn-sm ${styles.hideMobile}`}>
              PLAN YOUR EVENT →
            </a>
            <button
              className={styles.menuToggle}
              aria-label="Toggle navigation menu"
              aria-expanded={navOpen}
              aria-controls="main-nav"
              onClick={() => setNavOpen(!navOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
