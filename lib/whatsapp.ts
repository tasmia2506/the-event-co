import { SITE } from '@/lib/data/site';

type Contact = keyof typeof SITE.phones;

// Single place that builds every WhatsApp link on the site (enquiry buttons, forms, floating chat).
export function whatsappUrl(message: string = SITE.whatsappIntro, who: Contact = 'nooman'): string {
  const number = SITE.phones[who].number.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
