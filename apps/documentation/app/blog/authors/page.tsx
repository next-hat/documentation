import { PageSeo } from '@/components/page-seo'
import posts from '@/lib/blog-posts.json'
import { pageMetadata } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
const page = getSeoPage('/blog/authors')
export const metadata = pageMetadata(page)
export default function Authors() {
  const authors = [...new Map(posts.flatMap(post => post.authors).map(author => [author.id, author])).values()]
  return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index"><PageSeo page={page} /><header className="section-heading"><span className="eyebrow">Next Hat Blog</span><h1>The people behind the posts.</h1></header><ul className="tag-list">{authors.map(author => <li key={author.id}><a href={author.url}>{author.name}<span>{author.title} ↗</span></a></li>)}</ul></main>
}
