import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import { posts, tagSlug } from '../../lib/blog'
import { getSeoPage } from '../../lib/seo-content'
import { pageMetadata } from '../../lib/seo'
import { PageSeo } from '../../components/page-seo'

export const generateStaticParams = generateStaticParamsFor('mdxPath')
export const dynamicParams = false

type PageProps = { params: Promise<{ mdxPath?: string[] }> }

export async function generateMetadata(props: PageProps) {
  const { mdxPath = [] } = await props.params
  const path = `/${mdxPath.join('/')}`
  return pageMetadata(getSeoPage(path))
}

const Wrapper = getMDXComponents().wrapper
export default async function Page(props: PageProps) {
  const params = await props.params
  const { default: Content, toc, metadata, sourceCode } = await importPage(params.mdxPath)
  const { date } = metadata as typeof metadata & { date: string }
  const seoPage = getSeoPage(`/${(params.mdxPath || []).join('/')}`)
  const isBlogPost = params.mdxPath?.[0] === 'blog' && params.mdxPath.length === 2
  const post = isBlogPost ? posts.find(post => post.slug === params.mdxPath?.[1]) : null
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <PageSeo page={seoPage} />
      {isBlogPost && <header className="article-header">
        <a href="/blog" className="eyebrow">Next Hat / Blog</a>
        <h1>{metadata.title}</h1>
        <p className="article-date"><time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time> · {post?.authors.map(author => <a key={author.id} href={author.url}>{author.name}</a>)}</p>
        <div className="post-tags">{post?.tags.map(tag => <a key={tag} href={`/blog/tags/${tagSlug(tag)}`}>{tag}</a>)}</div>
      </header>}
      <Content {...props} params={params} />
    </Wrapper>
  )
}
