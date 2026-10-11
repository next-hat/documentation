import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'
import { localizedPosts, tagSlug } from '@/lib/blog'
import { getSeoPage } from '@/lib/seo-content'
import { localePath, dateLocales, type Locale } from '@/lib/locales'
import { translate } from '@/lib/translate'
import { PageSeo } from './page-seo'
import { LocalizedCopyPage } from './localized-copy-page'
const Wrapper = getMDXComponents().wrapper
export async function DocumentationPage({ mdxPath = [], locale = 'en' }: { mdxPath?: string[]; locale?: Locale }) {
  const contentPath = locale === 'en' ? mdxPath : [locale, ...mdxPath]
  const { default: Content, toc, metadata, sourceCode } = await importPage(contentPath)
  const { date } = metadata as typeof metadata & { date: string }
  const seoPage = getSeoPage(localePath(`/${mdxPath.join('/')}`, locale))
  const isBlogPost = mdxPath[0] === 'blog' && mdxPath.length === 2
  const post = isBlogPost ? localizedPosts(locale).find(post => post.slug === mdxPath[1]) : null
  return <Wrapper toc={toc} metadata={metadata} sourceCode={locale === 'en' ? sourceCode : ''}>
    {locale !== 'en' && <LocalizedCopyPage sourceCode={sourceCode} locale={locale} />}
    <PageSeo page={seoPage} />
    {isBlogPost && <header className="article-header">
      <a href={localePath('/blog', locale)} className="eyebrow">Next Hat / {translate(locale, 'Blog')}</a>
      <h1>{metadata.title}</h1>
      <p className="article-date"><time dateTime={date}>{new Date(date).toLocaleDateString(dateLocales[locale], { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time> · {post?.authors.map(author => <a key={author.id} href={author.url}>{author.name}</a>)}</p>
      <div className="post-tags">{post?.tags.map(tag => <a key={tag} href={localePath(`/blog/tags/${tagSlug(tag)}`, locale)}>{translate(locale, tag)}</a>)}</div>
    </header>}
    <Content params={{ mdxPath: contentPath }} />
  </Wrapper>
}
