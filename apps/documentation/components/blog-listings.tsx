import Link from 'next/link'
import { PageSeo } from './page-seo'
import { localizedPosts, tags } from '@/lib/blog'
import { getSeoPage } from '@/lib/seo-content'
import { translate } from '@/lib/translate'
import { localePath, type Locale } from '@/lib/locales'

export function BlogListing({ kind, locale = 'en' }: { kind: 'archive' | 'tags' | 'authors'; locale?: Locale }) {
  const t = (text: string) => translate(locale, text)
  const posts = localizedPosts(locale)
  const page = getSeoPage(localePath(`/blog/${kind}`, locale))
  const authors = [...new Map(posts.flatMap(post => post.authors).map(author => [author.id, author])).values()]
  const years = [...new Set(posts.map(post => post.date.slice(0, 4)))]
  return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index">
    <PageSeo page={page} />
    <header className="section-heading"><span className="eyebrow">{t('Next Hat Blog')}</span>
      <h1>{t(kind === 'archive' ? 'The archive.' : kind === 'tags' ? 'Explore by topic.' : 'The people behind the posts.')}</h1>
      {kind !== 'authors' && <p>{t(kind === 'archive' ? 'Every release and article, in one place.' : 'Release notes and practical infrastructure guides.')}</p>}
    </header>
    {kind === 'archive' && years.map(year => <section className="archive-year" key={year}><h2>{year}</h2><ul className="tag-list">{posts.filter(post => post.date.startsWith(year)).map(post => <li key={post.slug}><Link href={post.route}>{post.title}<time dateTime={post.date}>{post.date.slice(5)}</time></Link></li>)}</ul></section>)}
    {kind === 'tags' && <ul className="tag-list">{tags.map(({ label, slug }) => <li key={slug}><Link href={localePath(`/blog/tags/${slug}`, locale)}>{t(label)}<span>{posts.filter(post => post.tags.includes(label)).length} {t('posts →')}</span></Link></li>)}</ul>}
    {kind === 'authors' && <ul className="tag-list">{authors.map(author => <li key={author.id}><a href={author.url}>{author.name}<span>{t(author.title)} ↗</span></a></li>)}</ul>}
  </main>
}
