# Design Specification: AV-TEC India Upgraded Web Platform

**Target:** https://www.avtecindia.com (Upgraded Clone)  
**Date:** 2026-09-29  
**Status:** Approved  
**Author:** Antigravity  

---

## 1. Overview & Business Objectives

AV-TEC is a premier audio-visual solutions, live event technology, and equipment rental company operating out of Bengaluru, India since 1992. 

The objective of this project is to construct a state-of-the-art, high-performance web platform that replicates and upgrades the official AV-TEC website. The implementation directly resolves the performance and UX bottlenecks uncovered during the technical audit:
1. **Zero Blocker Performance:** Instant First Contentful Paint (<0.4s) replacing the blocking synthetic preloader screen.
2. **True Visual Firepower:** High-impact technical aesthetic matching pro audio and concert lighting (Syne & Outfit typography, deep stage blacks, laser accents, and glassmorphic cards).
3. **Interactive Gear Catalog:** Direct technical specs for event directors (d&b audiotechnik line arrays, Robe moving heads, P2.6 fine-pitch LED walls, Prolyte trussing).
4. **Smart Quote & Budget Estimator:** Interactive 3-step calculation tool delivering instant estimates and generating pre-formatted 1-click WhatsApp quote requests.
5. **Authentic Production Showcase:** Categorized media showcase using the company's real event setup photography from the local repository.

---

## 2. Technology Architecture

- **Core Engine:** Semantic HTML5, Modular Vanilla JavaScript (ES6+), Vanilla CSS3 Design System.
- **Dependency Philosophy:** Zero third-party runtime frameworks (no React overhead, no heavy bundlers, zero external vulnerabilities).
- **Hosting & Portability:** Standalone static web architecture that runs natively via any browser, file protocol, or HTTP dev server.
- **Design Tokens:** CSS custom properties (`var(--...)`) with full support for seamless Dark/Light mode switching.

---

## 3. Information Architecture & Navigation

The platform provides a comprehensive multi-page layout with smooth deep linking:

1. **`index.html` (Master Experience):**
   - **Top Announcement Bar:** Bengaluru, India • Live 24/7 Event Technical Support • Est. 1992
   - **Global Header:** Brand logo, navigation menu, theme toggle button, and "Request a Quote" CTA button.
   - **Hero Stage:** High-impact headline ("Audio Visual & Event Technology Since 1992"), subheadline, dual action buttons, and live tech counter metrics (30+ Years, 4,000+ Events Delivered, 40+ Cities Served).
   - **Core Divisions:** Dual service pillars — "Rental & Event Production" vs. "Sales, Installs & Consultancy".
   - **Featured Equipment & Capabilities:** Grid cards with category tags and equipment highlights.
   - **Interactive Quote Estimator:** Live event calculator (select event type, audience size, sound/light/video packages).
   - **Production Gallery Preview:** Curated grid of real concert, conference, and wedding setups with interactive modal inspection.
   - **Client Proof & Testimonials:** Verified client reviews with Google rating badges and venue list.
   - **Call to Action & Footer:** Quick inquiry trigger, address (Bengaluru, Karnataka), direct contact emails, phone numbers, and WhatsApp action.

2. **`services.html` (Detailed AV Services):**
   - Dedicated breakdowns for:
     - Sound Reinforcement (d&b audiotechnik, Martin Audio, Yamaha consoles)
     - Stage Lighting (Moving heads, beams, washes, lasers, Avolites/grandMA control)
     - Video & LED Walls (Fine-pitch P2.6 indoor, P3.9/P4.8 outdoor, Novastar processors)
     - Aluminium Trussing & Rigging (Box truss, goal posts, ground-support towers)
     - Installs & Integrations (Permanent auditoriums, corporate boardrooms)
     - Technical Consultancy (Signal flow, show control, multi-track recording)

3. **`rental.html` (Equipment Inventory & Booking):**
   - Filterable gear matrix (Audio, Lighting, Video, Trussing, Crew).
   - Equipment item cards with detailed technical specs.
   - Dedicated Rental Inquiry form with instant WhatsApp quote trigger.

4. **`gallery.html` (Media & Production Vault):**
   - High-resolution masonry grid using the workspace event photos.
   - Category filtering (Concerts, Corporate, LED Walls, Lighting, Audio).
   - Fullscreen lightbox modal with image navigation.

5. **`about.html` (Heritage & Operations):**
   - Company timeline from 1992 to present.
   - Technical team & warehouse operations.
   - Safety standards, electrical certification, and rigging integrity.

6. **`contact.html` (Inquiry & Location):**
   - Streamlined 2-step quote request form (eliminating the original 10-field mobile friction).
   - Direct WhatsApp, telephone, and email cards.
   - Google Maps location card.

---

## 4. Design System & Tokens (`css/design-system.css`)

### Color Palette (Dark Theme Default)
- `--bg-primary`: `#0a0b0e` (Deep charcoal stage black)
- `--bg-surface`: `#14171f` (Matte tech surface)
- `--bg-card`: `#1a1e29` (Elevated card background with subtle border)
- `--border-subtle`: `rgba(255, 255, 255, 0.08)`
- `--border-focus`: `rgba(235, 60, 40, 0.4)`
- `--accent-crimson`: `#e52b2b` (Signature AV-TEC Crimson)
- `--accent-orange`: `#ff6b35` (Warm amber glow)
- `--accent-emerald`: `#10b981` (WhatsApp & status badges)
- `--text-primary`: `#f3f4f6` (High-contrast bright white)
- `--text-secondary`: `#9ca3af` (Muted technical description text)

### Typography
- Display / Headings: `'Syne', sans-serif` (Bold, structural, high-tech)
- Body & Labels: `'Outfit', 'Inter', system-ui, sans-serif` (Ultra-legible, crisp on mobile)
- Monospace / Specs: `'JetBrains Mono', 'Courier New', monospace` (Gear models, dB ratings, pixel pitch)

---

## 5. Interactive Components & Logic

1. **Theme Manager (`js/app.js`):**
   - Preserves dark/light preference in `localStorage`.
   - Respects OS system color scheme if not explicitly overridden.
2. **Interactive Quote & Budget Calculator (`js/calculator.js`):**
   - Sliders and selectors: Event Type, Expected Guests (50 - 5,000+), Audio Package, Lighting Package, LED Wall Size.
   - Real-time estimated price range display (in INR ₹).
   - "Send Quote to WhatsApp" button that formats all selected parameters into an instant WhatsApp message link.
3. **Gallery Lightbox (`js/gallery.js`):**
   - Category filter pills.
   - Click-to-zoom modal with keyboard (ESC, Left, Right) navigation.
4. **Mobile Navigation Drawer:**
   - Touch-optimized slide-over menu with backdrop blur.

---

## 6. Verification & Quality Gates

- Test in responsive viewports (Mobile 375px, Tablet 768px, Desktop 1440px).
- Verify instant page load without blocking overlays.
- Validate all links, modals, forms, and WhatsApp URL generation.
- Ensure all real workspace assets (`logo.jpeg` and `public/` photos) render crisply.
