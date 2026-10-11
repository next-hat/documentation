import { DocumentationPage } from '@/components/documentation-page'
import { generateStaticParamsFor } from 'nextra/pages'
import { getSeoPage } from '@/lib/seo-content'
import { pageMetadata } from '@/lib/seo'

import { translatedLocales } from '@/lib/locales'
export async function generateStaticParams() {
  return (await generateStaticParamsFor('mdxPath')()).filter(({ mdxPath }) => !translatedLocales.includes(mdxPath[0] as never))
}
export const dynamicParams = false

type PageProps = { params: Promise<{ mdxPath?: string[] }> }

export async function generateMetadata(props: PageProps) {
  const { mdxPath = [] } = await props.params
  const path = `/${mdxPath.join('/')}`
  return pageMetadata(getSeoPage(path))
}

export default async function Page(props: PageProps) {
  const { mdxPath } = await props.params
  return <DocumentationPage mdxPath={mdxPath} />
}
