import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { posts, tags } from './blog'
import type { SeoPage } from './seo'

const plainText = (text: string) => text
  .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/<[^>]*>/g, '').replace(/[*_`\\]/g, '').replace(/\s+/g, ' ').trim()
const excerpt = (text: string) => {
  const clean = plainText(text)
  if (clean.length <= 170) return clean
  return clean.slice(0, 167).replace(/\s+\S*$/, '') + '…'
}

function readContent(directory: string, prefix = ''): SeoPage[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (entry.isDirectory()) return readContent(join(directory, entry.name), `${prefix}/${entry.name}`)
    if (!/\.mdx?$/.test(entry.name)) return []
    const source = readFileSync(join(directory, entry.name), 'utf8')
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
    const metadata = frontmatter ? parse(frontmatter[1]) : {}
    const path = `${prefix}/${entry.name.replace(/\.mdx?$/, '')}`.replace(/\/index$/, '') || '/'
    const post = posts.find(post => post.route === path)
    const body = source.slice(frontmatter?.[0].length || 0)
    const title = path === '/' ? 'Next Hat Documentation' : path.endsWith('/introduction') ? `${metadata.title}: Introduction` : metadata.title
    if (!title) throw new Error(`Missing SEO title: ${path}`)
    const isCommand = prefix === '/references/nanocl/cli' && entry.name !== 'readme.mdx'
    const commandDescription = body.match(/^## DESCRIPTION[ \t]*\r?\n([\s\S]*)/m)?.[1]
      .split(/\r?\n#{1,6}\s/)[0].trim()
    const paragraph = body.replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*$/gm, '')
      .split(/\n\s*\n/).find(block => /^[A-Za-z]/.test(block.trim()) && !/^(?:import|export)\s/.test(block.trim()))
    let description = post?.description || metadata.description
    if (!description && isCommand) {
      const command = entry.name.replace(/\.mdx?$/, '').replace(/-/g, ' ')
      description = `${command}: ${plainText(commandDescription || title).replace(/[.!]$/, '')}. Command syntax, options, and usage reference.`
    }
    description ||= paragraph || `${title}. Learn how to configure and use Nanocl with the Next Hat documentation.`
    return [{
      path, title, description: excerpt(description), keywords: metadata.keywords, post,
      ...(metadata.timestamp ? { modified: new Date(Number(metadata.timestamp)).toISOString() } : {})
    }]
  })
}

export const blogListings: SeoPage[] = [
  { path: '/blog/archive', title: 'Blog archive', description: 'Browse every Next Hat release announcement and infrastructure article, organized by year.' },
  { path: '/blog/tags', title: 'Blog tags', description: 'Explore Next Hat articles by topic, from Nanocl releases to networking, deployment, and self-hosting.' },
  { path: '/blog/authors', title: 'Blog authors', description: 'Meet the contributors writing Next Hat release notes and practical infrastructure guides.' },
  ...tags.map(({ label, slug }) => ({ path: `/blog/tags/${slug}`, title: `Posts tagged ${label}`, description: `Read Next Hat articles tagged ${label}: release notes and practical guides from the team behind Nanocl.` }))
]
export const seoPages = [...readContent(join(process.cwd(), 'content')), ...blogListings]
export function getSeoPage(path: string): SeoPage {
  const page = seoPages.find(page => page.path === path)
  if (!page) throw new Error(`Unknown SEO page: ${path}`)
  return page
}
