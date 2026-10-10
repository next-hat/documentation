import type { MetadataRoute } from 'next'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { tags } from '@/lib/blog'
export const dynamic = 'force-static'
export default function sitemap(): MetadataRoute.Sitemap {
  function contentRoutes(directory: string, prefix = ''): string[] {
    return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
      ? contentRoutes(join(directory, entry.name), `${prefix}/${entry.name}`)
      : /\.mdx?$/.test(entry.name) ? [`${prefix}/${entry.name.replace(/\.mdx?$/, '')}`.replace(/\/index$/, '') || '/'] : [])
  }
  return [...contentRoutes(join(process.cwd(), 'content')), '/blog/tags', '/blog/archive', '/blog/authors', ...tags.map(({ slug }) => `/blog/tags/${slug}`)]
    .map(route => ({ url: `https://docs.next-hat.com${route}` }))
}
