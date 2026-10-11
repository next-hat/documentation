import { BlogListing } from '@/components/blog-listings'
import { pageMetadata } from '@/lib/seo'
import { getSeoPage } from '@/lib/seo-content'
export const metadata = pageMetadata(getSeoPage('/blog/archive'))
export default function Page() { return <BlogListing kind="archive" /> }
