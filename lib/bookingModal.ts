export const OPEN_BOOKING_MODAL_EVENT = 'open-booking-modal';

export function openBookingModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(OPEN_BOOKING_MODAL_EVENT));
  }
}
