import { rss } from '@/lib/feeds'
import { isLocale, translatedLocales } from '@/lib/locales'
export const dynamic = 'force-static'
export const dynamicParams = false
export function generateStaticParams() { return translatedLocales.map(lang => ({ lang })) }
export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang) || lang === 'en') return new Response('Not found', { status: 404 })
  return new Response(rss(lang), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
