import { notFound } from 'next/navigation'
import { BlogIndex } from '@/components/blog-index'
import { PageSeo } from '@/components/page-seo'
import { tags } from '@/lib/blog'
import { pageMetadata } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
export const dynamicParams = false
export function generateStaticParams() { return tags.map(({ slug }) => ({ tag: slug })) }
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  if (!tags.some(item => item.slug === tag)) notFound()
  return pageMetadata(getSeoPage(`/blog/tags/${tag}`))
}
export default async function Tag({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  const topic = tags.find(item => item.slug === tag)
  if (!topic) notFound()
  const page = getSeoPage(`/blog/tags/${tag}`)
  return <main id="nextra-skip-nav" tabIndex={-1}><PageSeo page={page} /><BlogIndex tag={topic.label} /></main>
}
