import { jsonFeed } from '@/lib/feeds'
export const dynamic = 'force-static'
export function GET() { return Response.json(jsonFeed()) }
