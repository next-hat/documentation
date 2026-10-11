import { rss } from '@/lib/feeds'
export const dynamic = 'force-static'
export function GET() {
  return new Response(rss('zh-Hans'), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
