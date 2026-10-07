'use client';

import { useState, useSyncExternalStore } from 'react';
import { openBookingModal } from '@/lib/bookingModal';
import styles from './CookieConsent.module.css';

const STORAGE_KEY = 'cookie-consent';

function subscribe() {
  return () => {};
}

function hasStoredConsent() {
  try {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

function hasStoredConsentServer() {
  return true;
}

export default function CookieConsent() {
  const consented = useSyncExternalStore(subscribe, hasStoredConsent, hasStoredConsentServer);
  const [dismissed, setDismissed] = useState(false);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {}
    setDismissed(true);
    openBookingModal();
  };

  const reject = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'rejected');
    } catch {}
    setDismissed(true);
  };

  if (consented || dismissed) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent" aria-live="polite">
      <p className={styles.text}>
        We use cookies to improve your experience on our site and understand how you use it. Accept to continue, or reject to browse with only essential cookies.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={reject}>
          Reject
        </button>
        <button type="button" className={styles.accept} onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
