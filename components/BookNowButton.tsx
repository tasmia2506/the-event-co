'use client';

import type { ReactNode } from 'react';
import { openBookingModal } from '@/lib/bookingModal';

interface Props {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function BookNowButton({ className, children, onClick }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openBookingModal();
      }}
    >
      {children}
    </button>
  );
}
