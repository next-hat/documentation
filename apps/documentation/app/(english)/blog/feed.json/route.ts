import { jsonFeed } from '@/lib/feeds'
export const dynamic = 'force-static'
export function GET() { return Response.json(jsonFeed(), { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } }) }
