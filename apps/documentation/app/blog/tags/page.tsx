import Link from 'next/link'
import { posts, tags } from '@/lib/blog'
export const metadata = { title: 'Blog tags', alternates: { canonical: '/blog/tags' } }
export default function Tags() {
  return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index"><header className="section-heading"><span className="eyebrow">Next Hat Blog</span><h1>Explore by topic.</h1><p>Release notes and practical infrastructure guides.</p></header><ul className="tag-list">{tags.map(({ label, slug }) => <li key={slug}><Link href={`/blog/tags/${slug}`}>{label}<span>{posts.filter(post => post.tags.includes(label)).length} posts →</span></Link></li>)}</ul></main>
}
