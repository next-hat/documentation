import Link from 'next/link'
import { PageSeo } from '@/components/page-seo'
import posts from '@/lib/blog-posts.json'
import { pageMetadata } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
const page = getSeoPage('/blog/archive')
export const metadata = pageMetadata(page)
export default function Archive() {
  const years = [...new Set(posts.map(post => post.date.slice(0, 4)))]
  return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index"><PageSeo page={page} /><header className="section-heading"><span className="eyebrow">Next Hat Blog</span><h1>The archive.</h1><p>Every release and article, in one place.</p></header>{years.map(year => <section className="archive-year" key={year}><h2>{year}</h2><ul className="tag-list">{posts.filter(post => post.date.startsWith(year)).map(post => <li key={post.slug}><Link href={post.route}>{post.title}<time dateTime={post.date}>{post.date.slice(5)}</time></Link></li>)}</ul></section>)}</main>
}
