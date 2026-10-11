import { TranslatedPage, generateTranslatedStaticParams, translatedPageMetadata } from '@/components/translated-page'
type Props = { params: Promise<{ mdxPath?: string[] }> }
export const dynamicParams = false
export function generateStaticParams() { return generateTranslatedStaticParams('ru') }
export async function generateMetadata({ params }: Props) { return translatedPageMetadata('ru', (await params).mdxPath) }
export default async function Page({ params }: Props) { return <TranslatedPage locale="ru" mdxPath={(await params).mdxPath} /> }
