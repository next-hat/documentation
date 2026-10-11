import { generateStaticParamsFor } from 'nextra/pages'
import { notFound } from 'next/navigation'
import { localePath, type Locale } from '@/lib/locales'
import { tags } from '@/lib/blog'
import { getSeoPage } from '@/lib/seo-content'
import { pageMetadata } from '@/lib/seo'
import { DocumentationPage } from '@/components/documentation-page'
import { BlogListing } from '@/components/blog-listings'
import { BlogIndex } from '@/components/blog-index'
import { PageSeo } from '@/components/page-seo'
import { DocumentationSearch } from '@/components/documentation-search'

type TranslatedLocale = Exclude<Locale, 'en'>

export async function generateTranslatedStaticParams(locale: TranslatedLocale) {
  const content = (await generateStaticParamsFor('mdxPath')())
    .filter(({ mdxPath }) => mdxPath[0] === locale)
    .map(({ mdxPath }) => ({ mdxPath: mdxPath.slice(1) }))
  return [...content, ...['blog/archive', 'blog/authors', 'blog/tags', 'search', ...tags.map(tag => `blog/tags/${tag.slug}`)].map(path => ({ mdxPath: path.split('/') }))]
}

export function translatedPageMetadata(locale: TranslatedLocale, mdxPath: string[] = []) {
  return { ...pageMetadata(getSeoPage(localePath(`/${mdxPath.join('/')}`, locale))), ...(mdxPath[0] === 'search' ? { robots: { index: false, follow: true } } : {}) }
}

export async function TranslatedPage({ locale, mdxPath = [] }: { locale: TranslatedLocale; mdxPath?: string[] }) {
  const path = mdxPath.join('/')
  if (path === 'search') return <DocumentationSearch locale={locale} />
  if (['blog/archive', 'blog/tags', 'blog/authors'].includes(path)) return <BlogListing kind={mdxPath[1] as 'archive' | 'tags' | 'authors'} locale={locale} />
  if (path.startsWith('blog/tags/')) {
    const tag = tags.find(tag => tag.slug === mdxPath[2])
    if (!tag) notFound()
    return <main id="nextra-skip-nav" tabIndex={-1}><PageSeo page={getSeoPage(localePath(`/${path}`, locale))} /><BlogIndex locale={locale} tag={tag.label} /></main>
  }
  return <DocumentationPage locale={locale} mdxPath={mdxPath} />
}
