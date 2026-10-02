/**
 * THE EVENT CO. — Interaction & Experience Engine
 * Navigation, enquiry handling, lightbox, and responsive enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initWorkFilters();
  initLightbox();
  initEnquiryForm();
  initRentalForm();
});

// --- Mobile Navigation ---
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.getElementById('headerNav');

  if (!menuToggle || !headerNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = headerNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  headerNav.querySelectorAll('.header-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      headerNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
}

// --- Header Scroll Effect ---
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// --- Filterable Work Gallery ---
function initWorkFilters() {
  const filterBtns = document.querySelectorAll('.work-filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  if (!filterBtns.length || !workCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      workCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 300ms ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Lightbox Modal ---
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const workCards = document.querySelectorAll('.work-card');

  if (!modal || !lightboxImg) return;

  workCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.work-card-title')?.innerText || '';
      const desc = card.querySelector('.work-card-desc')?.innerText || '';

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${title}</strong> — ${desc}`;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// --- Enquiry Form Handling ---
function initEnquiryForm() {
  const form = document.getElementById('eventEnquiryForm');
  const successBanner = document.getElementById('enquirySuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const eventType = form.querySelector('[name="eventType"]')?.value || '';
    const eventDate = form.querySelector('[name="eventDate"]')?.value || '';
    const venue = form.querySelector('[name="venue"]')?.value || '';
    const guests = form.querySelector('[name="guests"]')?.value || '';
    const message = form.querySelector('[name="message"]')?.value || '';

    // Show on-page confirmation
    if (successBanner) {
      successBanner.style.display = 'block';
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Optional direct WhatsApp handoff to Nooman & Danish
    const whatsappMsg = `Hi Team Event Co.! I would like to plan an event:\n\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email}\n• Event Type: ${eventType}\n• Date: ${eventDate}\n• Venue: ${venue}\n• Estimated Guests: ${guests}\n• Notes: ${message}`;
    const encoded = encodeURIComponent(whatsappMsg);
    
    // Provide WhatsApp link in confirmation banner
    const waLink = `https://wa.me/919620508786?text=${encoded}`;
    if (successBanner) {
      successBanner.innerHTML = `
        <div style="margin-bottom:8px;">✓ Thank you, ${name}! Your event consultation request has been received.</div>
        <div style="font-size:0.9rem;font-weight:400;margin-bottom:12px;">Our team (Nooman & Danish) will connect with you within 2 hours.</div>
        <a href="${waLink}" target="_blank" rel="noopener" class="btn-pill btn-burgundy btn-sm" style="display:inline-flex;">
          Send Instantly via WhatsApp →
        </a>
      `;
    }

    form.reset();
  });
}

// --- Equipment Rental Form Handling ---
function initRentalForm() {
  const form = document.getElementById('equipmentRentalForm');
  const successBanner = document.getElementById('rentalSuccess');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value || '';
    const company = form.querySelector('[name="company"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const eventDate = form.querySelector('[name="eventDate"]')?.value || '';
    const venue = form.querySelector('[name="venue"]')?.value || '';
    const equipment = form.querySelector('[name="equipment"]')?.value || '';

    const whatsappMsg = `Hi THE EVENT CO. Team,\n\nI would like an equipment rental quote:\n• Name: ${name}\n• Organization: ${company}\n• Phone: ${phone}\n• Email: ${email}\n• Event Date: ${eventDate}\n• Venue: ${venue}\n• Equipment Needed: ${equipment}\n\nPlease confirm availability and rate.`;
    const encoded = encodeURIComponent(whatsappMsg);
    const waLink = `https://wa.me/919035802278?text=${encoded}`;

    if (successBanner) {
      successBanner.style.display = 'block';
      successBanner.innerHTML = `
        <div style="margin-bottom:8px;">✓ Thank you, ${name}! Your rental request has been received.</div>
        <div style="font-size:0.9rem;font-weight:400;margin-bottom:12px;">Our production team (Danish) will confirm availability and pricing shortly.</div>
        <a href="${waLink}" target="_blank" rel="noopener" class="btn-pill btn-burgundy btn-sm" style="display:inline-flex;">
          Send Instantly via WhatsApp →
        </a>
      `;
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
  });
}
