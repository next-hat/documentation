import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@next-hat/ui/components/ui/badge'
import { posts, tagSlug } from '@/lib/blog'

export function BlogIndex({ tag }: { tag?: string }) {
  const filtered = tag ? posts.filter(post => post.tags.includes(tag)) : posts
  return <div className="blog-index" data-pagefind-body>
    <header className="section-heading"><span className="eyebrow">Built in the open</span><h1>{tag ? `Posts tagged “${tag}”` : 'Notes from Next Hat.'}</h1><p>Releases, practical guides, and what we're building next.</p><nav className="blog-navigation" aria-label="Blog"><Link href="/blog">All posts</Link><Link href="/blog/tags">Tags</Link><Link href="/blog/archive">Archive</Link><Link href="/blog/authors">Authors</Link><a href="/blog/rss.xml">RSS ↗</a></nav></header>
    <div className="post-list">{filtered.map(post => <article key={post.slug}><div className="post-meta"><time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time><span>{post.authors.map(author => author.name).join(', ')}</span></div><div><h2><Link href={post.route}>{post.title}<ArrowUpRight aria-hidden="true" className="size-5" /></Link></h2><p>{post.description || post.excerpt}</p><div className="post-tags">{post.tags.map(tag => <Badge key={tag} variant="secondary" asChild><Link href={`/blog/tags/${tagSlug(tag)}`}>{tag}</Link></Badge>)}</div></div></article>)}</div>
  </div>
}
