import { generateStaticParamsFor } from 'nextra/pages'
import { notFound } from 'next/navigation'
import { isLocale, localePath } from '@/lib/locales'
import { tags } from '@/lib/blog'
import { getSeoPage } from '@/lib/seo-content'
import { pageMetadata } from '@/lib/seo'
import { DocumentationPage } from '@/components/documentation-page'
import { BlogListing } from '@/components/blog-listings'
import { BlogIndex } from '@/components/blog-index'
import { PageSeo } from '@/components/page-seo'
import { DocumentationSearch } from '@/components/documentation-search'
type Props = { params: Promise<{ lang: string; mdxPath?: string[] }> }
export const dynamicParams = false
export async function generateStaticParams({ params }: { params: { lang: string } }) {
  const content = (await generateStaticParamsFor('mdxPath')()).filter(({ mdxPath }) => mdxPath[0] === params.lang).map(({ mdxPath }) => ({ mdxPath: mdxPath.slice(1) }))
  return [...content, ...['blog/archive', 'blog/authors', 'blog/tags', 'search', ...tags.map(tag => `blog/tags/${tag.slug}`)].map(path => ({ mdxPath: path.split('/') }))]
}
export async function generateMetadata({ params }: Props) {
  const { lang, mdxPath = [] } = await params
  if (!isLocale(lang) || lang === 'en') notFound()
  return { ...pageMetadata(getSeoPage(localePath(`/${mdxPath.join('/')}`, lang))), ...(mdxPath[0] === 'search' ? { robots: { index: false, follow: true } } : {}) }
}
export default async function Page({ params }: Props) {
  const { lang, mdxPath = [] } = await params
  if (!isLocale(lang) || lang === 'en') notFound()
  const path = mdxPath.join('/')
  if (path === 'search') return <DocumentationSearch locale={lang} />
  if (['blog/archive', 'blog/tags', 'blog/authors'].includes(path)) return <BlogListing kind={mdxPath[1] as 'archive' | 'tags' | 'authors'} locale={lang} />
  if (path.startsWith('blog/tags/')) {
    const tag = tags.find(tag => tag.slug === mdxPath[2])
    if (!tag) notFound()
    return <main id="nextra-skip-nav" tabIndex={-1}><PageSeo page={getSeoPage(localePath(`/${path}`, lang))} /><BlogIndex locale={lang} tag={tag.label} /></main>
  }
  return <DocumentationPage locale={lang} mdxPath={mdxPath} />
}
