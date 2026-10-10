import posts from '@/lib/blog-posts.json'
export const metadata = { title: 'Blog authors', alternates: { canonical: '/blog/authors' } }
export default function Authors() {
  const authors = [...new Map(posts.flatMap(post => post.authors).map(author => [author.id, author])).values()]
  return <main id="nextra-skip-nav" tabIndex={-1} className="blog-index"><header className="section-heading"><span className="eyebrow">Next Hat Blog</span><h1>The people behind the posts.</h1></header><ul className="tag-list">{authors.map(author => <li key={author.id}><a href={author.url}>{author.name}<span>{author.title} ↗</span></a></li>)}</ul></main>
}
