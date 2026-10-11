import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { localizedPosts, tags } from './blog'
import { locales, routeLocale, localePath } from './locales'
import { translate } from './translate'
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
    const { locale, path: originalPath } = routeLocale(path)
    const t = (text: string) => translate(locale, text)
    const post = localizedPosts(locale).find(post => post.route === path)
    const body = source.slice(frontmatter?.[0].length || 0)
    const title = originalPath === '/' ? t('Next Hat Documentation') : originalPath.endsWith('/introduction') ? `${metadata.title}: ${t('Introduction')}` : metadata.title
    if (!title) throw new Error(`Missing SEO title: ${path}`)
    const isCommand = routeLocale(prefix).path === '/references/nanocl/cli' && entry.name !== 'readme.mdx'
    const commandDescription = body.match(/^## (?:DESCRIPTION|DESCRIPTION DE LA COMMANDE|ОПИСАНИЕ|説明|描述|说明)(?:[ \t]+\[#[^\]]+\])?[ \t]*\r?\n([\s\S]*)/m)?.[1]
      .split(/\r?\n#{1,6}\s/)[0].trim()
    const paragraph = body.replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*$/gm, '')
      .split(/\n\s*\n/).find(block => /^[\p{L}]/u.test(block.trim()) && !/^(?:import|export)\s/.test(block.trim()))
    let description = post?.description || metadata.description
    if (!description && isCommand) {
      const command = entry.name.replace(/\.mdx?$/, '').replace(/-/g, ' ')
      description = `${command}: ${plainText(commandDescription || title).replace(/[.!]$/, '')}. ${t('Command syntax, options, and usage reference.')}`
    }
    description ||= paragraph || `${title}. ${t('Learn how to configure and use Nanocl with the Next Hat documentation.')}`
    return [{
      path, title, description: excerpt(description), keywords: metadata.keywords, post,
      ...(metadata.timestamp ? { modified: new Date(Number(metadata.timestamp)).toISOString() } : {})
    }]
  })
}

export const blogListings: SeoPage[] = locales.flatMap(locale => {
  const t = (text: string) => translate(locale, text)
  return [
    { path: localePath('/blog/archive', locale), title: t('Blog archive'), description: t('Browse every Next Hat release announcement and infrastructure article, organized by year.') },
    { path: localePath('/blog/tags', locale), title: t('Blog tags'), description: t('Explore Next Hat articles by topic, from Nanocl releases to networking, deployment, and self-hosting.') },
    { path: localePath('/blog/authors', locale), title: t('Blog authors'), description: t('Meet the contributors writing Next Hat release notes and practical infrastructure guides.') },
    { path: localePath('/search', locale), title: t('Search documentation'), description: t('Search guides, commands, examples, and release notes.') },
    ...tags.map(({ label, slug }) => ({ path: localePath(`/blog/tags/${slug}`, locale), title: t('Posts tagged {tag}').replace('{tag}', t(label)), description: t('Read Next Hat articles tagged {tag}: release notes and practical guides from the team behind Nanocl.').replace('{tag}', t(label)) }))
  ]
})
export const seoPages = [...readContent(join(process.cwd(), 'content')), ...blogListings]
export function getSeoPage(path: string): SeoPage {
  const page = seoPages.find(page => page.path === path)
  if (!page) throw new Error(`Unknown SEO page: ${path}`)
  return page
}
