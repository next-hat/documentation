import { DocumentationSearch } from '@/components/documentation-search'
export const metadata = { title: 'Search documentation', robots: { index: false, follow: true, googleBot: { index: false, follow: true } } }
export default function Page() { return <DocumentationSearch /> }
