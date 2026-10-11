import { BlogListing } from '@/components/blog-listings'
import { pageMetadata } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
export const metadata = pageMetadata(getSeoPage('/blog/authors'))
export default function Page() { return <BlogListing kind="authors" /> }
