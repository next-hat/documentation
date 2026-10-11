import { jsonFeed } from '@/lib/feeds'
export const dynamic = 'force-static'
export function GET() {
  return new Response(JSON.stringify(jsonFeed('zh-Hans')), { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } })
}
