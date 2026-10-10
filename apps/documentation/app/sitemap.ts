import type { MetadataRoute } from 'next'
import { seoPages } from '@/lib/seo-content'
import { absoluteUrl } from '@/lib/seo'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  return seoPages.map(page => ({ url: absoluteUrl(page.path), ...(page.modified ? { lastModified: page.modified } : {}) }))
}
