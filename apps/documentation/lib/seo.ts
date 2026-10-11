import type { Metadata } from 'next'
import type { posts } from './blog'
import { locales, routeLocale, localePath, ogLocales, type Locale } from './locales'
import { translate } from './translate'

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
  const { locale, path } = routeLocale(page.path)
  const title = `${page.title} — ${SITE_NAME}`
  const image = socialImage(page)
  return {
    title: { absolute: title }, description: page.description, keywords: page.keywords,
    alternates: {
      canonical: absoluteUrl(page.path),
      languages: Object.fromEntries([...locales.map(language => [language, absoluteUrl(localePath(path, language))]), ['x-default', absoluteUrl(path)]]),
      types: { 'application/rss+xml': localePath('/blog/rss.xml', locale), 'application/atom+xml': localePath('/blog/atom.xml', locale), 'application/feed+json': localePath('/blog/feed.json', locale) }
    },
    authors: page.post?.authors.map(author => ({ name: author.name, url: author.url })),
    openGraph: {
      title, description: page.description, url: absoluteUrl(page.path),
      siteName: SITE_NAME, locale: ogLocales[locale], alternateLocale: locales.filter(language => language !== locale).map(language => ogLocales[language]), images: [image],
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
export const siteSchema = (locale: Locale = 'en') => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': 'https://next-hat.com/#organization',
      name: 'Next Hat', url: 'https://next-hat.com', logo: absoluteUrl('/img/logo3.png'),
      sameAs: ['https://github.com/next-hat', 'https://twitter.com/next_hat']
    },
    {
      '@type': 'WebSite', '@id': absoluteUrl(localePath('/', locale)) + '#website', name: SITE_NAME,
      url: absoluteUrl(localePath('/', locale)), description: translate(locale, SITE_DESCRIPTION), inLanguage: locale,
      publisher: { '@id': 'https://next-hat.com/#organization' }
    }
  ]
})

export function pageSchema(page: SeoPage) {
  const url = absoluteUrl(page.path)
  const { locale, path } = routeLocale(page.path)
  const t = (text: string) => translate(locale, text)
  const section = path.split('/')[1]
  const sections: Record<string, { name: string, path: string }> = {
    guides: { name: 'Guides', path: '/guides/summary' },
    manuals: { name: 'Manuals', path: '/manuals/summary' },
    references: { name: 'References', path: '/references/summary' },
    blog: { name: 'Blog', path: '/blog' }
  }
  const parent = sections[section]
  const crumbs = [
    { name: SITE_NAME, item: absoluteUrl(localePath('/', locale)) },
    ...(parent && parent.path !== path ? [{ name: t(parent.name), item: absoluteUrl(localePath(parent.path, locale)) }] : []),
    { name: page.title, item: url }
  ]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': page.post ? 'BlogPosting' : /^(guides|manuals|references)$/.test(section) ? 'TechArticle' : 'WebPage',
        '@id': `${url}#page`, url, name: page.title, headline: page.title,
        description: page.description, inLanguage: locale,
        isPartOf: { '@id': absoluteUrl(localePath('/', locale)) + '#website' }, mainEntityOfPage: url,
        image: socialImage(page).url, publisher: { '@id': 'https://next-hat.com/#organization' },
        ...(page.modified ? { dateModified: page.modified } : {}),
        ...(page.post ? {
          datePublished: new Date(page.post.date).toISOString(),
          author: page.post.authors.map(author => ({ '@type': 'Person', name: author.name, url: author.url })),
          keywords: page.post.tags.join(', ')
        } : {}),
        ...(path !== '/' ? { breadcrumb: { '@id': `${url}#breadcrumb` } } : {})
      },
      ...(path !== '/' ? [{
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb }))
      }] : [])
    ]
  }
}
