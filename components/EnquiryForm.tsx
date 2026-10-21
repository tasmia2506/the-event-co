'use client';

import { useState, type FormEvent } from 'react';
import { whatsappUrl } from '@/lib/whatsapp';
import styles from './EnquiryForm.module.css';

const EVENT_TYPES = ['Wedding', 'Celebration', 'Corporate', 'Festival', 'Large-Scale Event', 'Other'];
const SERVICES_REQUIRED = [
  'Wedding Planning',
  'Event Planning',
  'Event Management',
  'Corporate Event Planning',
  'Event Production',
  'Other',
];

export default function EnquiryForm({ idPrefix = 'enquiry' }: { idPrefix?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const values = {
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      email: String(data.get('email') || ''),
      eventType: String(data.get('eventType') || ''),
      eventDate: String(data.get('eventDate') || ''),
      location: String(data.get('location') || ''),
      servicesRequired: String(data.get('servicesRequired') || ''),
      budget: String(data.get('budget') || ''),
      message: String(data.get('message') || ''),
    };

    const whatsappMsg = `Hi THE EVENT CO. Team!\n\n• Name: ${values.name}\n• Phone: ${values.phone}\n• Email: ${values.email}\n• Event Type: ${values.eventType}\n• Date: ${values.eventDate}\n• Location: ${values.location}\n• Services Required: ${values.servicesRequired}\n• Estimated Budget: ${values.budget}\n• Notes: ${values.message}`;

    // Send straight to WhatsApp. The link below is the fallback if the browser blocks the pop-up.
    const url = whatsappUrl(whatsappMsg, 'nooman');
    setWaLink(url);
    setName(values.name);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener');
    form.reset();
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Event Enquiry</h3>
      <p className={styles.cardSub}>
        Tell us about your event, date, location and requirements. Our team will get in touch to discuss the
        possibilities.
      </p>

      {submitted && (
        <div className="form-success-banner" role="alert">
          <div style={{ marginBottom: 8 }}>&#10003; Thanks, {name}! We&rsquo;re opening WhatsApp with your details.</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 400, marginBottom: 12 }}>
            Press <strong>Send</strong> in WhatsApp to deliver your enquiry to our team.
          </div>
          <a href={waLink} target="_blank" rel="noopener" className="btn-pill btn-burgundy btn-sm" style={{ display: 'inline-flex' }}>
            WhatsApp didn&rsquo;t open? Tap here &rarr;
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor={`${idPrefix}Name`}>Name *</label>
            <input type="text" id={`${idPrefix}Name`} name="name" required minLength={2} autoComplete="name" placeholder="e.g. Rohini Sharma" />
          </div>
          <div className="form-field">
            <label htmlFor={`${idPrefix}Phone`}>Phone Number *</label>
            <input type="tel" id={`${idPrefix}Phone`} name="phone" required pattern="(\+91[ \-]?)?[6-9][0-9]{4}[ \-]?[0-9]{5}" title="Enter a 10-digit Indian mobile number, e.g. 98765 43210" placeholder="e.g. 98765 43210" />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor={`${idPrefix}Email`}>Email *</label>
            <input type="email" id={`${idPrefix}Email`} name="email" required autoComplete="email" placeholder="e.g. rohini@example.com" />
          </div>
          <div className="form-field">
            <label htmlFor={`${idPrefix}Type`}>Event Type *</label>
            <select id={`${idPrefix}Type`} name="eventType" required defaultValue="">
              <option value="" disabled>
                Select event type...
              </option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor={`${idPrefix}Date`}>Event Date</label>
            <input type="date" id={`${idPrefix}Date`} name="eventDate" />
          </div>
          <div className="form-field">
            <label htmlFor={`${idPrefix}Location`}>Event Location</label>
            <input type="text" id={`${idPrefix}Location`} name="location" placeholder="e.g. Palace Grounds, Bengaluru" />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-field">
            <label htmlFor={`${idPrefix}Services`}>Services Required</label>
            <select id={`${idPrefix}Services`} name="servicesRequired" defaultValue="">
              <option value="" disabled>
                Select a service...
              </option>
              {SERVICES_REQUIRED.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor={`${idPrefix}Budget`}>Estimated Budget</label>
            <input type="text" id={`${idPrefix}Budget`} name="budget" placeholder="e.g. ₹5 - 10 Lakhs" />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor={`${idPrefix}Message`}>Tell us about your event</label>
          <textarea id={`${idPrefix}Message`} name="message" rows={4} placeholder="Share your dream aesthetic, specific requirements, themes, or any details..." />
        </div>

        <button type="submit" className={`btn-pill btn-burgundy btn-lg ${styles.submitBtn}`}>
          SEND VIA WHATSAPP &rarr;
        </button>
      </form>
    </div>
  );
}
