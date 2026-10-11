import { TranslatedPage, generateTranslatedStaticParams, translatedPageMetadata } from '@/components/translated-page'
type Props = { params: Promise<{ mdxPath?: string[] }> }
export const dynamicParams = false
export function generateStaticParams() { return generateTranslatedStaticParams('zh-Hans') }
export async function generateMetadata({ params }: Props) { return translatedPageMetadata('zh-Hans', (await params).mdxPath) }
export default async function Page({ params }: Props) { return <TranslatedPage locale="zh-Hans" mdxPath={(await params).mdxPath} /> }
