import { TranslatedPage, generateTranslatedStaticParams, translatedPageMetadata } from '@/components/translated-page'
type Props = { params: Promise<{ mdxPath?: string[] }> }
export const dynamicParams = false
export function generateStaticParams() { return generateTranslatedStaticParams('ja') }
export async function generateMetadata({ params }: Props) { return translatedPageMetadata('ja', (await params).mdxPath) }
export default async function Page({ params }: Props) { return <TranslatedPage locale="ja" mdxPath={(await params).mdxPath} /> }
