import type { MetadataRoute } from 'next'
import { seoPages } from '@/lib/seo-content'
import { locales, localePath, routeLocale } from '@/lib/locales'
import { absoluteUrl } from '@/lib/seo'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  return seoPages.filter(page => routeLocale(page.path).path !== '/search').map(page => ({ url: absoluteUrl(page.path), alternates: { languages: Object.fromEntries(locales.map(locale => [locale, absoluteUrl(localePath(page.path, locale))])) }, ...(page.modified ? { lastModified: page.modified } : {}) }))
}
