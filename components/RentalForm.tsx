'use client';

import { useState, type FormEvent } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import styles from './EnquiryForm.module.css';

export default function RentalForm() {
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get('name') || ''),
      company: String(data.get('company') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      eventDate: String(data.get('eventDate') || ''),
      venue: String(data.get('venue') || ''),
      equipment: String(data.get('equipment') || ''),
    };

    const whatsappMsg = `Hi THE EVENT CO. Team,\n\nI would like an equipment rental quote:\n• Name: ${values.name}\n• Organization: ${values.company}\n• Phone: ${values.phone}\n• Email: ${values.email}\n• Event Date: ${values.eventDate}\n• Venue: ${values.venue}\n• Equipment Needed: ${values.equipment}\n\nPlease confirm availability and rate.`;

    // Send straight to WhatsApp. The link below is the fallback if the browser blocks the pop-up.
    const url = whatsappUrl(whatsappMsg, 'danish');
    setWaLink(url);
    setName(values.name);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener');
    form.reset();
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Equipment Rental Request</h3>
      <p className={styles.cardSub}>Tell us what you need &mdash; we&rsquo;ll confirm availability and a rate within hours.</p>

      {submitted && (
        <div className="form-success-banner" role="alert">
          <div style={{ marginBottom: 8 }}>&#10003; Thanks, {name}! We&rsquo;re opening WhatsApp with your request.</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 400, marginBottom: 12 }}>
            Press <strong>Send</strong> in WhatsApp to deliver it to our production team.
          </div>
          <a href={waLink} target="_blank" rel="noopener" className="btn-pill btn-burgundy btn-sm" style={{ display: 'inline-flex' }}>
            WhatsApp didn&rsquo;t open? Tap here &rarr;
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="rentName">Full Name *</label>
            <input id="rentName" name="name" type="text" placeholder="Your name" required minLength={2} autoComplete="name" />
          </div>
          <div className="form-field">
            <label htmlFor="rentCompany">Organization / Event Name</label>
            <input id="rentCompany" name="company" type="text" autoComplete="organization" placeholder="Company or event name" />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="rentPhone">WhatsApp / Mobile Phone *</label>
            <input id="rentPhone" name="phone" type="tel" placeholder="+91" required pattern="(\+91[ \-]?)?[6-9][0-9]{4}[ \-]?[0-9]{5}" title="Enter a 10-digit Indian mobile number, e.g. 98765 43210" />
          </div>
          <div className="form-field">
            <label htmlFor="rentEmail">Email Address *</label>
            <input id="rentEmail" name="email" type="email" placeholder="you@company.com" required autoComplete="email" />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor="rentDate">Event Date *</label>
            <input id="rentDate" name="eventDate" type="date" required />
          </div>
          <div className="form-field">
            <label htmlFor="rentCity">Event Location / Venue *</label>
            <input id="rentCity" name="venue" type="text" placeholder="e.g. Palace Grounds, Bengaluru" required />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="rentEquipment">Required Equipment / Production Needs</label>
          <textarea
            id="rentEquipment"
            name="equipment"
            rows={4}
            placeholder="List equipment needed (e.g. line array, moving heads, LED wall, truss grid)..."
          />
        </div>

        <button type="submit" className={`btn-pill btn-burgundy btn-lg ${styles.submitBtn}`}>
          REQUEST QUOTE ON WHATSAPP &rarr;
        </button>
      </form>
    </div>
  );
}
