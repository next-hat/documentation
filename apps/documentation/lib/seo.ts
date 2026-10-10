import type { Metadata } from 'next'
import type { posts } from './blog'

export const SITE_URL = 'https://docs.next-hat.com'
export const SITE_NAME = 'Next Hat Docs'
export const SITE_DESCRIPTION = 'Practical guides, manuals, and references for deploying containers and virtual machines with Nanocl.'

export type SeoPage = {
  path: string
  title: string
  description: string
  keywords?: string[]
  modified?: string
  post?: (typeof posts)[number]
}

export const absoluteUrl = (path: string) => path === '/' ? SITE_URL : new URL(path, SITE_URL).href
export const socialImagePath = (path: string) => `/social${path === '/' ? '/index' : path}.png`
export const socialImage = (page: SeoPage) => ({
  url: absoluteUrl(socialImagePath(page.path)), width: 1200, height: 630,
  type: 'image/png', alt: `${page.title} — ${SITE_NAME}`
})

export function pageMetadata(page: SeoPage): Metadata {
  const title = `${page.title} — ${SITE_NAME}`
  const image = socialImage(page)
  return {
    title: { absolute: title }, description: page.description, keywords: page.keywords,
    alternates: {
      canonical: absoluteUrl(page.path),
      types: { 'application/rss+xml': '/blog/rss.xml', 'application/atom+xml': '/blog/atom.xml', 'application/feed+json': '/blog/feed.json' }
    },
    authors: page.post?.authors.map(author => ({ name: author.name, url: author.url })),
    openGraph: {
      title, description: page.description, url: absoluteUrl(page.path),
      siteName: SITE_NAME, locale: 'en_US', images: [image],
      ...(page.post ? {
        type: 'article', publishedTime: new Date(page.post.date).toISOString(),
        modifiedTime: page.modified, authors: page.post.authors.map(author => author.url),
        tags: page.post.tags
      } : { type: 'website' })
    },
    twitter: {
      card: 'summary_large_image', site: '@next_hat', creator: '@next_hat',
      title, description: page.description, images: [image]
    }
  }
}

export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': 'https://next-hat.com/#organization',
      name: 'Next Hat', url: 'https://next-hat.com', logo: absoluteUrl('/img/logo3.png'),
      sameAs: ['https://github.com/next-hat', 'https://twitter.com/next_hat']
    },
    {
      '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: SITE_NAME,
      url: absoluteUrl('/'), description: SITE_DESCRIPTION, inLanguage: 'en',
      publisher: { '@id': 'https://next-hat.com/#organization' }
    }
  ]
}

export function pageSchema(page: SeoPage) {
  const url = absoluteUrl(page.path)
  const section = page.path.split('/')[1]
  const sections: Record<string, { name: string, path: string }> = {
    guides: { name: 'Guides', path: '/guides/summary' },
    manuals: { name: 'Manuals', path: '/manuals/summary' },
    references: { name: 'References', path: '/references/summary' },
    blog: { name: 'Blog', path: '/blog' }
  }
  const parent = sections[section]
  const crumbs = [
    { name: SITE_NAME, item: absoluteUrl('/') },
    ...(parent && parent.path !== page.path ? [{ name: parent.name, item: absoluteUrl(parent.path) }] : []),
    { name: page.title, item: url }
  ]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': page.post ? 'BlogPosting' : /^(guides|manuals|references)$/.test(section) ? 'TechArticle' : 'WebPage',
        '@id': `${url}#page`, url, name: page.title, headline: page.title,
        description: page.description, inLanguage: 'en',
        isPartOf: { '@id': absoluteUrl('/#website') }, mainEntityOfPage: url,
        image: socialImage(page).url, publisher: { '@id': 'https://next-hat.com/#organization' },
        ...(page.modified ? { dateModified: page.modified } : {}),
        ...(page.post ? {
          datePublished: new Date(page.post.date).toISOString(),
          author: page.post.authors.map(author => ({ '@type': 'Person', name: author.name, url: author.url })),
          keywords: page.post.tags.join(', ')
        } : {}),
        ...(page.path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {})
      },
      ...(page.path !== '/' ? [{
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb }))
      }] : [])
    ]
  }
}
