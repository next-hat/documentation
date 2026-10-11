import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import posts from './blog-posts.json'
import { localePath, type Locale } from './locales'
export { posts }
export const tagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const tags = [...new Set(posts.flatMap(post => post.tags))].sort().map(label => ({ label, slug: tagSlug(label) }))
const translatedPosts = new Map<Locale, typeof posts>()
export function localizedPosts(locale: Locale = 'en') {
  if (locale === 'en') return posts
  if (translatedPosts.has(locale)) return translatedPosts.get(locale)!
  const result = posts.map(post => {
    const source = readFileSync(join(process.cwd(), 'content', locale, 'blog', `${post.slug}.mdx`), 'utf8')
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
    const metadata = parse(frontmatter![1])
    const excerpt = source.slice(frontmatter![0].length).split(/\{\/\*\s*truncate\s*\*\/\}/)[0]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/<[^>]*>/g, '').replace(/[*_`]/g, '').trim()
    return { ...post, route: localePath(post.route, locale), title: metadata.title, description: metadata.description || excerpt, excerpt }
  })
  translatedPosts.set(locale, result)
  return result
}
