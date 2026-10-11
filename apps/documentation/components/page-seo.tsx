import { pageSchema, serializeJsonLd, type SeoPage } from '@/lib/seo'

export function PageSeo({ page }: { page: SeoPage }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema(page)) }} />
}
