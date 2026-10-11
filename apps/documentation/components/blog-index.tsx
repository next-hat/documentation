import { translate } from '@/lib/translate'
import { localePath, dateLocales, type Locale } from '@/lib/locales'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@next-hat/ui/components/ui/badge'
import { posts, localizedPosts, tagSlug } from '@/lib/blog'

export function BlogIndex({ tag, locale = 'en' }: { tag?: string; locale?: Locale }) {
  const t = (text: string) => translate(locale, text)
  const translatedPosts = localizedPosts(locale)
  const filtered = translatedPosts.filter(post => !tag || posts.find(original => original.slug === post.slug)!.tags.includes(tag))
  return <div className="blog-index" data-pagefind-body>
    <header className="section-heading"><span className="eyebrow">{t("Built in the open")}</span><h1>{tag ? t('Posts tagged {tag}').replace('{tag}', t(tag)) : t('Notes from Next Hat.')}</h1><p>{t("Releases, practical guides, and what we're building next.")}</p><nav className="blog-navigation" aria-label="Blog"><Link href={localePath("/blog", locale)}>{t("All posts")}</Link><Link href={localePath("/blog/tags", locale)}>{t("Tags")}</Link><Link href={localePath("/blog/archive", locale)}>{t("Archive")}</Link><Link href={localePath("/blog/authors", locale)}>{t("Authors")}</Link><a href={localePath("/blog/rss.xml", locale)}>{t("RSS ↗")}</a></nav></header>
    <div className="post-list">{filtered.map(post => <article key={post.slug}><div className="post-meta"><time dateTime={post.date}>{new Date(post.date).toLocaleDateString(dateLocales[locale], { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time><span>{post.authors.map(author => author.name).join(', ')}</span></div><div><h2><Link href={post.route}>{post.title}<ArrowUpRight aria-hidden="true" className="size-5" /></Link></h2><p>{post.description || post.excerpt}</p><div className="post-tags">{post.tags.map(tag => <Badge key={tag} variant="secondary" asChild><Link href={localePath(`/blog/tags/${tagSlug(tag)}`, locale)}>{t(tag)}</Link></Badge>)}</div></div></article>)}</div>
  </div>
}
