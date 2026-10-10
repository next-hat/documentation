import { BlogIndex } from '@/components/blog-index'
import { tags } from '@/lib/blog'
export const dynamicParams = false
export function generateStaticParams() { return tags.map(({ slug }) => ({ tag: slug })) }
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  return { title: `Posts tagged ${tags.find(item => item.slug === tag)?.label}`, alternates: { canonical: `/blog/tags/${tag}` } }
}
export default async function Tag({ params }: { params: Promise<{ tag: string }> }) { const { tag } = await params; return <main id="nextra-skip-nav" tabIndex={-1}><BlogIndex tag={tags.find(item => item.slug === tag)?.label} /></main> }
