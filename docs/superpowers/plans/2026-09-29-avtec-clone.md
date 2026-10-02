# AV-TEC India Upgraded Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a state-of-the-art, high-performance web platform that replicates and elevates avtecindia.com, resolving all audit findings with instant rendering, pro-AV aesthetics, real event photography, interactive quote calculator, and equipment catalog.

**Architecture:** Standalone pure modern web application (HTML5, modular CSS3 custom property design tokens, ES6+ JS) with zero heavy build steps, instant FCP, full dark/light theme switching, and multi-page routing.

**Tech Stack:** Semantic HTML5, Vanilla CSS (tokens + component utilities), Vanilla JavaScript (ES6+), Node.js dev server.

**Spec:** `docs/superpowers/specs/2026-09-29-avtec-clone-design.md`

## Global Constraints
- Instant initial paint: Zero blocking synthetic preloader screen.
- Fonts: Google Fonts `Syne` (Headings) and `Outfit` (Body) loaded asynchronously with `font-display: swap`.
- Palette: Dark stage charcoal (`#0a0b0e`), AV-TEC Crimson (`#e52b2b`), Warm Amber (`#ff6b35`), Emerald (`#10b981`).
- Real Assets: Utilize local repository assets (`logo.jpeg` and `public/*.jpg`).
- Mobile & WhatsApp CRO: Streamlined form + 1-click WhatsApp quote generator.

---

### Task 1: Project Scaffolding & Dev Server Setup
**Files:**
- Create: `package.json`
- Test: `npm run dev`

- [ ] Step 1: Create `package.json` with scripts for `dev` and `start`.
- [ ] Step 2: Verify `npm run dev` starts a local server on port 3000.

---

### Task 2: Core CSS Design System & Components
**Files:**
- Create: `css/design-system.css`
- Create: `css/components.css`
- Create: `css/responsive.css`

- [ ] Step 1: Define CSS custom properties for dark and light themes, typography scale, spacing tokens, and border-radii.
- [ ] Step 2: Build component styles: header/navigation, buttons, chips, badges, glass cards, stat counters, and sliders.
- [ ] Step 3: Implement responsive layout utilities, mobile drawer, and container grids.

---

### Task 3: Interactive JavaScript Modules
**Files:**
- Create: `js/app.js`
- Create: `js/calculator.js`
- Create: `js/gallery.js`

- [ ] Step 1: Implement `app.js` (Theme toggle with localStorage, mobile drawer, smooth scroll, sticky header observer).
- [ ] Step 2: Implement `calculator.js` (Live event budget estimator with crowd size slider, gear checkboxes, and WhatsApp link builder).
- [ ] Step 3: Implement `gallery.js` (Category filtering and fullscreen lightbox with image navigation).

---

### Task 4: Master Experience (`index.html`)
**Files:**
- Create: `index.html`

- [ ] Step 1: Build Top bar, Brand Header, and Navigation.
- [ ] Step 2: Build Hero Section with instant paint, value proposition, and live stat counters.
- [ ] Step 3: Build Business Divisions section (Rental vs Installations).
- [ ] Step 4: Build Featured Capabilities and Service highlights.
- [ ] Step 5: Embed Interactive Quote & Budget Calculator.
- [ ] Step 6: Build Production Gallery preview with real event photography.
- [ ] Step 7: Build Testimonials section and Client trust proof.
- [ ] Step 8: Build Conversion CTA Band and Footer with WhatsApp floating button.

---

### Task 5: AV Services Breakdown (`services.html`)
**Files:**
- Create: `services.html`

- [ ] Step 1: Build detailed breakdowns for Audio Systems, Stage Lighting, LED Walls, Trussing/Rigging, Installs, and Consultancy.
- [ ] Step 2: Add technical capability chips and equipment highlights.

---

### Task 6: Equipment Catalog & Booking (`rental.html`)
**Files:**
- Create: `rental.html`

- [ ] Step 1: Build gear matrix (d&b audiotechnik, Robe moving heads, P2.6 LED panels, Prolyte trussing).
- [ ] Step 2: Add interactive category filter tabs and spec lists.
- [ ] Step 3: Embed quick rental quote inquiry.

---

### Task 7: Production Gallery & Media Vault (`gallery.html`)
**Files:**
- Create: `gallery.html`

- [ ] Step 1: Map all high-res stage photos from `public/` into categorized collections (Concerts, Corporate, LED Walls, Lighting, Audio).
- [ ] Step 2: Wire up lightbox view with zoom and navigation.

---

### Task 8: About & Heritage (`about.html`) and Contact Hub (`contact.html`)
**Files:**
- Create: `about.html`
- Create: `contact.html`

- [ ] Step 1: Build `about.html` with company story since 1992, warehouse operations, and quality standards.
- [ ] Step 2: Build `contact.html` with streamlined 2-step quote request form and direct contact cards.

---

### Task 9: Verification & Live Dev Server Launch
- [ ] Step 1: Launch `npm run dev` in background.
- [ ] Step 2: Inspect pages in browser to confirm zero console errors, responsive design, and working calculators.
