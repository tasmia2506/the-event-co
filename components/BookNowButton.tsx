'use client';

import type { ReactNode } from 'react';
import { openBookingModal } from '@/lib/bookingModal';

export default function BookNowButton({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={openBookingModal}>
      {children}
    </button>
  );
}
