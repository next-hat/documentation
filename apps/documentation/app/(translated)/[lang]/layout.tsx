import { notFound } from 'next/navigation'
import { DocumentationLayout, documentationMetadata } from '@/components/documentation-layout'
import { translatedLocales, isLocale } from '@/lib/locales'
export const dynamicParams = false
export function generateStaticParams() { return translatedLocales.map(lang => ({ lang })) }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang) || lang === 'en') notFound()
  return documentationMetadata(lang)
}
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang) || lang === 'en') notFound()
  return <DocumentationLayout locale={lang}>{children}</DocumentationLayout>
}
