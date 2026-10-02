import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/data/site';
import { SERVICES } from '@/lib/data/services';

// Public, linked routes only. /gallery and /rental still exist but are not linked from the site.
const STATIC_ROUTES = ['', '/about', '/services', '/work', '/contact', '/faq', '/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_ROUTES, ...SERVICES.map((s) => `/services/${s.slug}`)];
  return paths.map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : p.startsWith('/services/') ? 0.7 : 0.8,
  }));
}
