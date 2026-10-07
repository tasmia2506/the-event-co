'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import EnquiryForm from './EnquiryForm';
import { OPEN_BOOKING_MODAL_EVENT } from '@/lib/bookingModal';
import styles from './BookNowButton.module.css';

export default function BookingModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_BOOKING_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BOOKING_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Book your event" onClick={() => setOpen(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close booking form">
          &times;
        </button>
        <EnquiryForm idPrefix="book" />
      </div>
    </div>,
    document.body,
  );
}
