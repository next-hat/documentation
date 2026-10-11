import { atom } from '@/lib/feeds'
export const dynamic = 'force-static'
export function GET() {
  return new Response(atom('zh-Hans'), { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } })
}
